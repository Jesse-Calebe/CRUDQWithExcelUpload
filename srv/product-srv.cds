using {db as schema} from '../db/schema';

@path: 'ProductSrv'
service ProductSrv {

    @odata.draft.enabled
    entity SingletonSet as projection on schema.Singleton;

};

annotate ProductSrv.SingletonSet with @(restrict: [
    {
        grant: ['READ'],
        to   : ['viewer']
    },
    {
        grant: ['*'],
        to   : ['admin']
    }
]);
