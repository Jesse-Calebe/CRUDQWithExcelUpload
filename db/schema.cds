using {managed} from '@sap/cds/common';

namespace db;


entity Singleton {
    key id      : String(5);
        product : Composition of many Product
                      on product.singleton = $self;
};

entity Product : managed {
    key productId : String(20);
        name      : String(255);
        weight    : Decimal(10, 3);
        uom       : Association to Uom;
        singleton : Association to one Singleton default 'dummy';
};

@cds.odata.valuelist
entity Uom {
    key uom         : String(5);
        description : String(255);
};

// Base annotations
annotate Product with {
    productId  @mandatory                   @Common.Label                   : '{i18n>productId}';
    name       @Common.Label: '{i18n>name}';
    weight     @Common.Label: '{i18n>weight}';
    uom        @Common.Label: '{i18n>uom}'  @Common.ValueListWithFixedValues: true;
    singleton  @UI.Hidden;
};

annotate Uom with {
    uom
    @Common.Label: '{i18n>uom}';
    description
    @Common.Label: '{i18n>uomDescription}';
};
