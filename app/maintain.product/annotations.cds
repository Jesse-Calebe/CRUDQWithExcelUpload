using ProductSrv as service from '../../srv/product-srv';


annotate service.SingletonSet with @(
    UI.DeleteHidden: true,
    UI.CreateHidden: true,
    UI.HeaderInfo  : {
        TypeName      : '{i18n>Product}',
        TypeNamePlural: '{i18n>Products}',
        Title         : {Value: '{i18n>maintainProducts}', }
    },
    UI.Facets      : [{
        $Type : 'UI.ReferenceFacet',
        Label : '{i18n>Products}',
        ID    : 'idProduct',
        Target: 'product/@UI.LineItem'
    }],
    UI.LineItem    : [{
        $Type: 'UI.DataField',
        Label: 'id',
        Value: id,
    }, ],
);

annotate service.Product with @(UI.LineItem: [
    {
        $Type: 'UI.DataField',
        Value: productId,
    },
    {
        $Type: 'UI.DataField',
        Value: name
    },
    {
        $Type: 'UI.DataField',
        Value: weight,
    },
    {
        $Type: 'UI.DataField',
        Value: uom_uom,
    },
]);

annotate service.Product with {
    uom @Common.Text: uom.description;
};
