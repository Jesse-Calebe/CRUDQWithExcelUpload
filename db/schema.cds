using {
    cuid,
    managed
} from '@sap/cds/common';

namespace db;


entity Product : cuid, managed {
    name : String(255);
    peso : Decimal(10, 3) @Measures.Unit: 'uom';
    uom  : String(3);
}
