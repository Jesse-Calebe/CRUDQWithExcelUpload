using {db as schema} from '../db/schema';

@path: 'ProductSrv'
service ProductSrv {

    @odata.draft.enabled
    entity Products as projection on schema.Product;

    entity Files    as projection on schema.File;

}
