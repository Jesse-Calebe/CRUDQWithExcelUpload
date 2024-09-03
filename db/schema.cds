using {managed} from '@sap/cds/common';

namespace db;


entity Singleton {
    key id      : String(5);
        product : Composition of many Product
                      on product.singleton = $self;
}

entity Product : managed {
    key productId : String(20);
        name      : String(255);
        weight    : Decimal(10, 3);
        uom       : String(3);
        singleton : Association to one Singleton default 'dummy';
}

// Base annotations
annotate Product with {
    productId  @mandatory  @Common.Label: '{i18n>productId}';
    name       @Common.Label: '{i18n>name}';
    weight     @Common.Label: '{i18n>weight}';
    uom        @Common.Label: '{i18n>uom}';
    singleton  @UI.Hidden;
}
