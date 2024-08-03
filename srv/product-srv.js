const cds = require("@sap/cds");

class ProductImpl extends cds.ApplicationService {
  init() {
    this.on("UploadExcelFile", async (req) => {
        
    });

    super.init();
  }
}

module.exports = ProductImpl;
