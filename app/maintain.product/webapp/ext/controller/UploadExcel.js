sap.ui.define(["sap/ui/export/Spreadsheet"], function (Spreadsheet) {
  "use strict";
  var oMainDialog, oListReportMetadata;

  const oDialogController = {
    onAfterItemAdded: function (oEvent) {
      var item = oEvent.getParameter("item");
      this._createEntity(item)
        .then((id) => {
          this._uploadContent(item, id);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onUploadCompleted: function (oEvent) {
      var oUploadSet = sap.ui.getCore().byId("uploadSet");
      oUploadSet.removeAllIncompleteItems();
      oUploadSet.getBinding("items").refresh();
    },
    _createEntity: function (item) {
      var data = {
        mediaType: item.getMediaType(),
        fileName: item.getFileName(),
        size: item.getFileObject().size,
      };

      var settings = {
        url: "/odata/v4/ProductSrv/Files",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        data: JSON.stringify(data),
      };

      return new Promise((resolve, reject) => {
        $.ajax(settings)
          .done((results, textStatus, request) => {
            resolve(results.ID);
          })
          .fail((err) => {
            reject(err);
          });
      });
    },

    _uploadContent: function (item, id) {
      var url = `/odata/v4/ProductSrv/Files(${id})/content`;
      item.setUploadUrl(url);
      var oUploadSet = sap.ui.getCore().byId("uploadSet");
      oUploadSet.setHttpRequestMethod("PUT");
      oUploadSet.uploadItem(item);
    },
    onUploadButtonPress: async function (oEvent) {
      debugger;
    },
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
    onCancelButtonPress: function (oEvent) {
      let oDialog = oEvent.getSource().getParent().getParent();

      oDialog.close();
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
