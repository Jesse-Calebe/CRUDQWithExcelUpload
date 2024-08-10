using {db as schema} from '../db/schema';

@path: 'ProductSrv'
service ProductSrv {

    @odata.draft.enabled
    entity SingletonSet as projection on schema.Singleton;

}
