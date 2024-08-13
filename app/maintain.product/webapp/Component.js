sap.ui.define(["sap/fe/core/AppComponent"], function (Component) {
  "use strict";

  return Component.extend("jcss.maintain.product.Component", {
    metadata: {
      manifest: "json",
    },
    init: async function () {
      Component.prototype.init.apply(this, arguments);

      // GET request to SingletonSet service in backend
      let oSingletonSetContext = this.getModel().bindContext("/SingletonSet");
      let oDataResult = await oSingletonSetContext.requestObject();

      // Determine active entity state based on draft existence
      let bActiveEntity = !oDataResult.value[0].HasDraftEntity;

      // Build key for route
      let sKey = `id='dummy',IsActiveEntity=${bActiveEntity}`;

      // Navigate to object page
      this.getRouter().navTo("SingletonSetObjectPage", { key: sKey });
    },
  });
});
