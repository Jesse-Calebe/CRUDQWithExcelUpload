using {db as schema} from '../db/schema';

service ProductSrv {

    @odata.draft.enabled
    entity Products as projection on schema.Product;

}
