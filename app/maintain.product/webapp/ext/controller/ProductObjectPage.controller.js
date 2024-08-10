sap.ui.define(
  ["sap/ui/core/mvc/ControllerExtension"],
  function (ControllerExtension) {
    "use strict";

    var oUploadCsvFragment;

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

        onCancelButtonPress: function (oEvent) {
          debugger;
        },
        onUploadButtonPress: function (oEvent) {
          debugger;
        },
        onDownloadTemplateButtonPress: function (oEvent) {
          debugger;
        },
      }
    );
  }
);
