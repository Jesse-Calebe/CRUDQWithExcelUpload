using ProductSrv as service from '../../srv/product-srv';

annotate service.Products with @(
    UI.HeaderInfo                : {
        TypeName      : '{i18n>Product}',
        TypeNamePlural: '{i18n>Products}',
        Title         : {
            $Type: 'UI.DataField',
            Value: '{i18n>Product}: {ID}',
        },
    },
    UI.FieldGroup #GeneratedGroup: {
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
        ],
    },
    UI.Facets                    : [{
        $Type : 'UI.ReferenceFacet',
        ID    : 'GeneratedFacet1',
        Label : '{i18n>GeneralInformation}',
        Target: '@UI.FieldGroup#GeneratedGroup',
    }, ],
    UI.LineItem                  : [
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
    ],
);
