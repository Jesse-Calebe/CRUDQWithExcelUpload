sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'jcss.maintain.product',
            componentId: 'ProductObjectPage',
            contextPath: '/SingletonSet/product'
        },
        CustomPageDefinitions
    );
});