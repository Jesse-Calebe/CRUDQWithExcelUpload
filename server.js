const cds = require("@sap/cds");
if (process.env.NODE_ENV !== "production") {
  const { cds_launchpad_plugin } = require("cds-launchpad-plugin");
  // Enable launchpad plugin
  cds.once("bootstrap", (app) => {
    const handler = new cds_launchpad_plugin();
    app.use(handler.setup());
  });
}
