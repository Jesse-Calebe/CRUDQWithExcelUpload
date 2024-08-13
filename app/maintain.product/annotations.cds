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

annotate service.Product with @(
    UI.HeaderInfo         : {
        TypeName      : '{i18n>Product}',
        TypeNamePlural: '{i18n>Products}',
        Title         : {
            $Type: 'UI.DataField',
            Value: '{i18n>Product}: {productId}',
        },
    },
    UI.Facets             : [{
        $Type : 'UI.ReferenceFacet',
        Label : '{i18n>details}',
        ID    : 'details',
        Target: '@UI.FieldGroup#Details',
    }, ],
    UI.FieldGroup #Details: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Value: name,
            },
            {
                $Type: 'UI.DataField',
                Value: weight,
            },
            {
                $Type: 'UI.DataField',
                Value: uom,
            },
        ]
    },
    UI.LineItem           : [
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
            Value: uom,
        },
    ]
);
