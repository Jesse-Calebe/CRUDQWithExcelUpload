using {managed} from '@sap/cds/common';

namespace db;


entity Singleton {
    key id      : String(5);
        product : Composition of many Product
                      on product.singleton = $self;
}

entity Product : managed {
    key productId : String(20)
        @mandatory
        @Common.Label: '{i18n>productId}';
        name      : String(255)
        @Common.Label: '{i18n>name}';
        weight    : Decimal(10, 3)
        @Common.Label: '{i18n>weight}';
        uom       : String(3)
        @Common.Label: '{i18n>uom}';
        singleton : Association to one Singleton;
}
