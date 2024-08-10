sap.ui.define(["sap/fe/core/AppComponent"], function (Component) {
  "use strict";

  return Component.extend("jcss.maintain.product.Component", {
    metadata: {
      manifest: "json",
    },
    init: function () {
      debugger;
      Component.prototype.init.apply(this, arguments);

      let bActiveEntity = true;

      let sKey = `id='dummy',IsActiveEntity=${bActiveEntity}`;
      this.getRouter().navTo("SingletonSet", { key: sKey });
    },
  });
});
