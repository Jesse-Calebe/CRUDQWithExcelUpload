sap.ui.define(
  ["sap/ui/core/mvc/ControllerExtension"],
  function (ControllerExtension) {
    "use strict";

    var oUploadCsvFragment, oFileToRead, oProduct, that;

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
        onUploadCsvPress: async function (oEvent) {
          let oModel = this.base.getModel();
          that = this;
          oProduct = oModel.bindList(
            "/SingletonSet(id='dummy',IsActiveEntity=false)/product"
          );

          if (!oUploadCsvFragment) {
            oUploadCsvFragment = await this.base
              .getExtensionAPI()
              .loadFragment({
                id: "idUploadCsvFrag",
                name: "jcss.maintain.product.ext.view.dialogs.UploadCsv",
                controller: this,
              });
          }

          if (oUploadCsvFragment) {
            oUploadCsvFragment.open();
          }
        },
        onFileUploaderChange: function (oEvent) {
          oFileToRead = oEvent.getParameters().files["0"];
        },
        onUploadButtonPress: function (oEvent) {
          let oReader = new FileReader();

          oReader.readAsText(oFileToRead);
          oReader.onload = this._handleFileOnLoad;
          oReader.onerror = this._handleFileOnError;
        },
        onDownloadTemplateButtonPress: function (oEvent) {
          const aContent = [["Name;Weight;Unit of Measure"], ["Café;200;g"]];
          const sContent = aContent.join("\r\n");
          const sCsvType = "text/csv;charset=utf-8,%EF%BB%BF,SEP=";

          let oCsvData = new Blob(["\ufeff" + sContent], { type: sCsvType });

          let sTextFileURL = URL.createObjectURL(oCsvData);

          let oLink = document.createElement("a");

          oLink.href = sTextFileURL;
          oLink.download = "Template";
          oLink.click();
        },
        onCancelButtonPress: function (oEvent) {
          let oFileUploader = oUploadCsvFragment
            .getContent()[0]
            .getContent()[0];

          oFileUploader.clear();
          oUploadCsvFragment.close();
        },
        _handleFileOnLoad: async function (oEvent) {
          debugger
          let sCsv = oEvent.target.result;

          var aTextLines = sCsv.split(/\r\n|\n/);
          aTextLines.shift();

          await aTextLines.forEach(async (oLineData) => {
            let aLineData = oLineData.split(";");

            if (!(aLineData.length === 0) && !(aLineData[0] === "")) {
              let oCreated = await oProduct.create({
                name: aLineData[0],
                weight: aLineData[1],
                uom: aLineData[2],
              });
            }
          });

          let oFileUploader = oUploadCsvFragment
            .getContent()[0]
            .getContent()[0];

          oFileUploader.clear();
          oUploadCsvFragment.close();

          await that.base.getExtensionAPI().refresh();
        },
        _handleFileOnError: function (oEvent) {
          if (oEvent.target.error.name == "NotReadableError") {
            alert("Cannot read");
          }
        },
      }
    );
  }
);
