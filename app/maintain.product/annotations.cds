using ProductSrv as service from '../../srv/product-srv';


annotate service.SingletonSet with @(
    UI.DeleteHidden: true,
    UI.CreateHidden: true,
    UI.HeaderInfo  : {
        TypeName      : '{i18n>Product}',
        TypeNamePlural: '{i18n>Products}',
        Title         : {
            $Type: 'UI.DataField',
            Value: '{i18n>maintainProducts}',
        },
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
        $Type                : 'UI.DataField',
        Value                : productId,
        ![@HTML5.CssDefaults]: {
            $Type: 'HTML5.CssDefaultsType',
            width: '10%',
        },
    },
    {
        $Type                : 'UI.DataField',
        Value                : name,
        ![@HTML5.CssDefaults]: {
            $Type: 'HTML5.CssDefaultsType',
            width: '40%',
        },
    },
    {
        $Type                : 'UI.DataField',
        Value                : weight,
        ![@HTML5.CssDefaults]: {
            $Type: 'HTML5.CssDefaultsType',
            width: '10%',
        },
    },
    {
        $Type                : 'UI.DataField',
        Value                : uom_uom,
        ![@HTML5.CssDefaults]: {
            $Type: 'HTML5.CssDefaultsType',
            width: '20%',
        },
    },
    {
        $Type                  : 'UI.DataField',
        Value                  : status_status,
        ![@HTML5.CssDefaults]  : {
            $Type: 'HTML5.CssDefaultsType',
            width: '20%',
        },
        ![@Common.FieldControl]: {$edmJson: {$If: [
            {$Eq: [
                {$Path: 'HasActiveEntity'},
                true
            ]},
            3,
            1
        ]}},
    },
]);

annotate service.Product with {
    uom    @Common.Text: uom.description;
    status @Common.Text: status.description;
};
