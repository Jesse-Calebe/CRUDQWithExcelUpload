sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'excel/upload/maintain/product/test/integration/FirstJourney',
		'excel/upload/maintain/product/test/integration/pages/ProductsList',
		'excel/upload/maintain/product/test/integration/pages/ProductsObjectPage'
    ],
    function(JourneyRunner, opaJourney, ProductsList, ProductsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('excel/upload/maintain/product') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheProductsList: ProductsList,
					onTheProductsObjectPage: ProductsObjectPage
                }
            },
            opaJourney.run
        );
    }
);