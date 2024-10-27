"use strict";

module.exports = class Test {
  constructor(GET, POST, PATCH, DELETE, test, expect, axios, cds) {
    this.cds = cds;
    this.POST = POST;
    this.PATCH = PATCH;
    this.DELETE = DELETE;
    this.test = test;
    this.expect = expect;
    this.axios = axios;
    this.cds = cds;
    this.GET = GET;
  }
};
