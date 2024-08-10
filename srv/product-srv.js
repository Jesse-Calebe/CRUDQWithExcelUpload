const cds = require("@sap/cds");

class ProductImpl extends cds.ApplicationService {
  init() {
    this.before("CREATE", "SingletonSet", async (req) => {
      console.log(req.data);
    });

    super.init();
  }
}

module.exports = ProductImpl;
