using {
    cuid,
    managed
} from '@sap/cds/common';

namespace db;


entity Product : cuid, managed {
    name   : String(255)
    @Common.Label : '{i18n>name}';
    weight : Decimal(10, 3)
    @Measures.Unit: uom
    @Common.Label : '{i18n>weight}';
    uom    : String(3)
    @Common.Label : '{i18n>uom}';
}

entity File : cuid, managed {
    @Core.MediaType  : mediaType
    content   : LargeBinary;

    @Core.IsMediaType: true
    mediaType : String;
    fileName  : String;
    size      : Integer;
    url       : String;
}