sap.ui.define(
  ["sap/fe/core/AppComponent", "sap/ui/core/routing/History"],
  function (Component, History) {
    "use strict";

    return Component.extend("jcss.maintain.product.Component", {
      metadata: {
        manifest: "json",
      },
      /**
       * Initializes the component and navigates to the object page. Considering whether you have a draft or not.
       *
       * This function is called when the component is instantiated. It makes a request to the SingletonSet
       * service to determine if the entity has a draft, builds a route key based on this state and navigates
       * to the corresponding object page.
       *
       * @async
       * @function init
       * @memberOf jcss.maintain.product.Component
       * @returns {Promise<void>} Returns a Promise that is resolved when navigation is complete.
       * @author Jesse-Calebe
       */
      init: async function () {
        // Call init function of base class (Component)
        Component.prototype.init.apply(this, arguments);

        var oRouter = this.getRouter();

        oRouter.getRoute("SingletonSetList").attachMatched(async (oEvent) => {
          debugger;

          var sDirection =
            oEvent.getParameters().targetControl._sTransitionDirection;

          if (sDirection === "back") {
            var oHistory, sPreviousHash;

            oHistory = History.getInstance();
            sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
              window.history.go(-1);
            } else {
              this.getRouter().navTo("appHome", {});
            }
            return;
          }

          // GET request to SingletonSet service in backend
          let oSingletonSetContext = this.getModel().bindContext(
            "/SingletonSet?$expand=DraftAdministrativeData"
          );
          let oDataResult = await oSingletonSetContext.requestObject();

          // Determine active entity state based on draft existence
          let bActiveEntity = oDataResult.value[0].HasDraftEntity
            ? !oDataResult.value[0].DraftAdministrativeData.DraftIsCreatedByMe
            : true;

          // Build key for route
          let sKey = `id='dummy',IsActiveEntity=${bActiveEntity}`;

          // Navigate to object page
          this.getRouter().navTo("SingletonSetObjectPage", { key: sKey });
        });
      },
    });
  }
);
