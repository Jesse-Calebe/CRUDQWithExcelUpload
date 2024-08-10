sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'jcss/maintain/product/test/integration/FirstJourney',
		'jcss/maintain/product/test/integration/pages/SingletonSetList',
		'jcss/maintain/product/test/integration/pages/SingletonSetObjectPage',
		'jcss/maintain/product/test/integration/pages/ProductObjectPage'
    ],
    function(JourneyRunner, opaJourney, SingletonSetList, SingletonSetObjectPage, ProductObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('jcss/maintain/product') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheSingletonSetList: SingletonSetList,
					onTheSingletonSetObjectPage: SingletonSetObjectPage,
					onTheProductObjectPage: ProductObjectPage
                }
            },
            opaJourney.run
        );
    }
);