"use strict";

// require dependencies
const chai = require("chai");
chai.use(require("chai-shallow-deep-equal"));

const ProductSrv = require("../test/product-srv/product-srv-test");

// launch cds server
const cds = require("@sap/cds/lib");
const TestClass = require("./Test.class");
if (cds.User.default)
  cds.User.default = cds.User.Privileged; // hardcode monkey patch
else cds.User = cds.User.Privileged;
const { GET, POST, PATCH, DELETE, test, expect, axios } = cds.test(
  "serve",
  __dirname + "/../srv",
  "--in-memory"
);

// run tests
const oTest = new TestClass(GET, POST, PATCH, DELETE, test, expect, axios, cds);
ProductSrv.test(oTest);
