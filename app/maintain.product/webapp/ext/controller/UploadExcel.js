sap.ui.define(["sap/ui/export/Spreadsheet"], function (Spreadsheet) {
  "use strict";
  var oMainDialog, oListReportMetadata;

  const oDialogController = {
    onDownloadTemplateButtonPress: function (oEvent) {
      let aExcelCols = [];
      let oDataSource = {};

      for (let sKey in oListReportMetadata) {
        // Ignore metadata attributes
        if (sKey[0] === "$") {
          continue;
        }

        // Ignore columns from managed artifact
        if (
          sKey === "createdAt" ||
          sKey === "createdBy" ||
          sKey === "modifiedAt" ||
          sKey === "modifiedBy"
        ) {
          continue;
        }

        // Ignore columns from cuid artifact
        if (sKey === "ID") {
          continue;
        }

        // Ignore columns from draft annotation
        if (
          sKey === "IsActiveEntity" ||
          sKey === "HasActiveEntity" ||
          sKey === "HasDraftEntity" ||
          sKey === "DraftAdministrativeData" ||
          sKey === "SiblingEntity"
        ) {
          continue;
        }

        let oColAttribute = {
          label: sKey,
          type: oListReportMetadata[sKey].$Type,
          property: sKey,
        };

        aExcelCols.push(oColAttribute);
        oDataSource[sKey] = null;
      }

      let oSettings = {
        workbook: {
          columns: aExcelCols,
          hierarchyLevel: "Level",
        },
        dataSource: [oDataSource],
        fileName: "Template.xlsx",
      };

      let oSheet = new Spreadsheet(oSettings);

      oSheet.build().finally(function () {
        oSheet.destroy();
      });
    },
    onUploadButtonPress: function (oEvent) {
      let oFileUploader = sap.ui.getCore().byId("id.FileUploader");
    },
    onCancelButtonPress: function (oEvent) {
      oEvent.getSource().getParent().getParent().close();
    },
  };

  return {
    onActionUploadExcel: function (oEvent) {
      oListReportMetadata = this.getModel()
        .getMetaModel()
        .getObject("/ProductSrv.Products");

      if (!oMainDialog) {
        oMainDialog = sap.ui.xmlfragment(
          "excel.upload.maintain.product.ext.view.DialogUploadExcel",
          oDialogController
        );
      }

      oMainDialog.open();
    },
  };
});
