"use strict";

module.exports = {
  test: function (oTestClass) {
    describe("Product Service", () => {
      const { GET, POST, test, expect } = oTestClass;
      beforeAll(async () => {});
      beforeEach(async () => {
        await test.data.reset();
      });

      it("Product create", async () => {
        // Arrange
        const inputDraftEdit = { PreserveChanges: true };

        // Draft edit
        await POST(
          "/odata/v4/ProductSrv/SingletonSet(id='dummy',IsActiveEntity=true)/ProductSrv.draftEdit?$select=HasActiveEntity,HasDraftEntity,IsActiveEntity,id&$expand=DraftAdministrativeData($select=DraftIsCreatedByMe,DraftUUID,InProcessByUser)",
          inputDraftEdit
        );

        // -----------------------------------
        const inputProduct = { productId: "teste" };

        // Create product line
        await POST(
          "/odata/v4/ProductSrv/SingletonSet(id='dummy',IsActiveEntity=false)/product",
          inputProduct
        );

        // -----------------------------------
        // Arrange
        const inputDraftPrepare = { SideEffectsQualifier: "" };

        await POST(
          "/odata/v4/ProductSrv/SingletonSet(id='dummy',IsActiveEntity=false)/ProductSrv.draftPrepare",
          inputDraftPrepare
        );

        // -----------------------------------
        // Act
        const { status } = await POST(
          "/odata/v4/ProductSrv/SingletonSet(id='dummy',IsActiveEntity=false)/ProductSrv.draftActivate?$select=HasActiveEntity,HasDraftEntity,IsActiveEntity,id&$expand=DraftAdministrativeData($select=DraftIsCreatedByMe,DraftUUID,InProcessByUser)",
          {}
        );
        // Assert
        expect(status).to.equal(200);
      });
    });
  },
};
