using ProductSrv as service from '../../srv/product-srv';

annotate service.SingletonSet with @(
    UI.Facets  : [{
        $Type : 'UI.ReferenceFacet',
        Label : 'teste',
        ID    : 'teste',
        Target: 'product/@UI.LineItem'
    }],
    UI.LineItem: [{
        $Type: 'UI.DataField',
        Label: 'id',
        Value: id,
    }, ],
);

annotate service.Product with @(UI.LineItem: [
    {
        $Type: 'UI.DataField',
        Value: name
    },
    {
        $Type: 'UI.DataField',
        Value: weight
    },
]);
