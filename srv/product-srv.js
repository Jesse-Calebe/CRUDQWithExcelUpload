const cds = require("@sap/cds");

class ProductImpl extends cds.ApplicationService {
  init() {
    this.on("UploadExcelFile", async (req) => {
      if (req.data.file) {
        let content;

        req.data.file.on("data", (dataChunk) => {
          console.log(dataChunk);
          content += dataChunk;
        });

        req.data.file.on("end", () => {
          console.log("Stream ended");
          console.log(content);
        });
      } else {
        return next();
      }
    });

    super.init();
  }
}

module.exports = ProductImpl;
