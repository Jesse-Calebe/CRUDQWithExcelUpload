sap.ui.define(
  ["sap/ui/core/mvc/ControllerExtension"],
  function (ControllerExtension) {
    "use strict";

    // Globals
    var that, oUploadCsvFragment, oFileToRead, oProduct, oI18nBundle;

    return ControllerExtension.extend(
      "jcss.maintain.product.ext.controller.ProductObjectPage",
      {
        // this section allows to extend lifecycle hooks or hooks provided by Fiori elements
        override: {
          /**
           * Called when a controller is instantiated and its View controls (if available) are already created.
           * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
           * @memberOf jcss.maintain.product.ext.controller.ProductObjectPage
           */
          onInit: function () {
            // you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
            var oModel = this.base.getExtensionAPI().getModel();
          },
        },
        /**
         * Handles the CSV upload button click event.
         *
         * This function is called when the CSV upload button is pressed. It creates a "bindList" based on
         * the SingletonSet context, loads a dialog fragment for the CSV upload (if it isn't already loaded), and
         * then opens the upload dialog.
         *
         * @async
         * @function onUploadCsvPress
         * @param {sap.ui.base.Event} oEvent - The click event that triggered the function.
         * @memberOf jcss.maintain.product.ext.controller.ProductObjectPage
         * @returns {Promise<void>} Retorna uma Promise que é resolvida quando o diálogo de upload é aberto.
         * @author Jesse-Calebe
         */
        onUploadCsvPress: async function (oEvent) {
          // Gets the model associated with the base component.
          let oModel = this.base.getModel();

          // Transfers "this" to a global object, to be accessed in the "_handleFileOnLoad" function.
          that = this;

          // Creates a "bindList" based on the SingletonSet context
          oProduct = oModel.bindList(
            "/SingletonSet(id='dummy',IsActiveEntity=false)/product"
          );

          // Initialize i18n bundle
          if (!oI18nBundle) {
            oI18nBundle = this.base
              .getExtensionAPI()
              .getModel("i18n")
              .getResourceBundle();
          }

          // Loads the CSV upload dialog fragment if it is not already loaded.
          if (!oUploadCsvFragment) {
            oUploadCsvFragment = await this.base
              .getExtensionAPI()
              .loadFragment({
                id: "idUploadCsvFrag",
                name: "jcss.maintain.product.ext.view.dialogs.UploadCsv",
                controller: this,
              });
          }

          // Opens the CSV upload dialog.
          if (oUploadCsvFragment) {
            oUploadCsvFragment.open();
          }
        },
        /**
         * Handles the file selection event in the file uploader.
         *
         * This function is triggered when a file is selected in the file uploader. It retrieves the selected file
         * from the event parameters and stores it for further processing.
         *
         * @function onFileUploaderChange
         * @param {sap.ui.base.Event} oEvent - The event object containing details about the file selection.
         * @memberOf jcss.maintain.product.ext.controller.ProductObjectPage
         * @author Jesse-Calebe
         */
        onFileUploaderChange: function (oEvent) {
          // Retrieves the selected file from the event parameters.
          oFileToRead = oEvent.getParameters().files["0"];
        },
        /**
         * Handles the upload button press event.
         *
         * This function reads the selected file as text and sets up event handlers for load and error events.
         *
         * @function onUploadButtonPress
         * @param {sap.ui.base.Event} oEvent - The click event that triggered the function.
         * @memberOf jcss.maintain.product.ext.controller.ProductObjectPage
         * @author Jesse-Calebe
         */
        onUploadButtonPress: function (oEvent) {
          // Creates a new FileReader to read the selected file.
          let oReader = new FileReader();

          // Reads the selected file as text. Sets up the onload event handler and the onerror event handler.
          oReader.readAsText(oFileToRead);
          oReader.onload = this._handleFileOnLoad;
          oReader.onerror = this._handleFileOnError;
        },
        /**
         * Handles the download template button press event.
         *
         * This function generates a CSV template file and triggers the download process.
         *
         * @function onDownloadTemplateButtonPress
         * @param {sap.ui.base.Event} oEvent - The click event that triggered the function.
         * @memberOf jcss.maintain.product.ext.controller.ProductObjectPage
         * @author Jesse-Calebe
         */
        onDownloadTemplateButtonPress: function (oEvent) {
          // Creates the content for the CSV template.
          const aContent = this._getTemplateContent();
          const sContent = aContent.join("\r\n");
          const sCsvType = "text/csv;charset=utf-8,%EF%BB%BF,SEP=";

          // Creates a Blob object with the CSV content.
          let oCsvData = new Blob(["\ufeff" + sContent], { type: sCsvType });

          // Generates a URL for the Blob object.
          let sTextFileURL = URL.createObjectURL(oCsvData);

          // Creates a temporary link element to trigger the download.
          let oLink = document.createElement("a");

          // Sets the download URL and filename.
          oLink.href = sTextFileURL;
          oLink.download = "Template";

          // Triggers the download.
          oLink.click();

          // Free blob object URL from memory
          URL.revokeObjectURL(sTextFileURL);
        },
        /**
         * Handles the cancel button press event.
         *
         * This function clears the file uploader and closes the upload dialog.
         *
         * @function onCancelButtonPress
         * @param {sap.ui.base.Event} oEvent - The click event that triggered the function.
         * @memberOf jcss.maintain.product.ext.controller.ProductObjectPage
         * @author Jesse-Calebe
         */
        onCancelButtonPress: function (oEvent) {
          // Close dialog, and refresh list report
          this._closeUploadCsvDialog();
        },
        /**
         * Handles the file load event after the file is read.
         *
         * This function processes the CSV file content, creates product entries based on the data,
         * clears the file uploader, closes the upload dialog, and refreshes the model.
         *
         * @async
         * @function _handleFileOnLoad
         * @param {ProgressEvent<FileReader>} oEvent - The file reader event that contains the loaded file data.
         * @memberOf jcss.maintain.product.ext.controller.ProductObjectPage
         * @author Jesse-Calebe
         */
        _handleFileOnLoad: async function (oEvent) {
          // Retrieves the CSV file content.
          let sCsv = oEvent.target.result;

          // Splits the CSV content into lines, and removes header line.
          var aTextLines = sCsv.split(/\r\n|\n/);
          aTextLines.shift(); // Removes the header line.

          // Iterates over each line of the CSV file and creates product entries.
          await aTextLines.forEach(async (oLineData) => {
            let aLineData = oLineData.split(";");

            // Checks if the line is not empty before creating the product entry.
            if (!(aLineData.length === 0) && !(aLineData[0] === "")) {
              // let oCreated = await oProduct.create({
              oProduct.create({
                productId: aLineData[0],
                name: aLineData[1],
                weight: aLineData[2],
                uom_uom: aLineData[3],
              });
            }
          });

          // Close dialog, and refresh list report
          that._closeUploadCsvDialog();
        },
        /**
         * Handles the file reader error event.
         *
         * This function is triggered if an error occurs while reading the file.
         *
         * @function _handleFileOnError
         * @param {ProgressEvent<FileReader>} oEvent - The file reader error event.
         * @memberOf jcss.maintain.product.ext.controller.ProductObjectPage
         * @author Jesse-Calebe
         */
        _handleFileOnError: function (oEvent) {
          // Displays an alert if the file could not be read.
          if (oEvent.target.error.name == "NotReadableError") {
            let oMessageStrip = oUploadCsvFragment
              .getContent()[0]
              .getContent()[0];

            oMessageStrip.setType(sap.ui.core.MessageType.Error);
            oMessageStrip.setText("Cannot read file.");
            oMessageStrip.setVisible(true);
          }
        },
        /**
         * Closes the CSV upload dialog and clears the file uploader.
         *
         * This function clears the file uploader input field, closes the CSV upload dialog,
         * and refreshes the model data to ensure any changes are reflected.
         *
         * @async
         * @function _closeUploadCsvDialog
         * @memberOf jcss.maintain.product.ext.controller.ProductObjectPage
         * @returns {Promise<void>} Resolves when the model data is refreshed.
         * @author Jesse-Calebe
         */
        _closeUploadCsvDialog: async function () {
          // Gets the file uploader from the upload dialog fragment.
          let oFileUploader = oUploadCsvFragment
            .getContent()[0]
            .getContent()[1];

          // Clears the file uploader.
          oFileUploader.clear();

          // Closes the upload dialog.
          oUploadCsvFragment.close();

          // Refreshes the model data.
          try {
            await that.base.getExtensionAPI().refresh();
          } catch (oError) {
            that.base.getModel().resetChanges();
            await that.base.getExtensionAPI().refresh();
          }
        },

        _getTemplateContent: function () {
          return [[this._getCsvColumns().join(";")]];
        },
        _getCsvColumns() {
          return [
            this._getI18nText("productId"),
            this._getI18nText("name"),
            this._getI18nText("weight"),
            this._getI18nText("uom"),
          ];
        },
        _getI18nText(sTextId) {
          if (oI18nBundle) {
            return oI18nBundle.getText(sTextId);
          }

          return sTextId;
        },
      }
    );
  }
);
