using {db as schema} from '../db/schema';

@path: 'ProductSrv'
service ProductSrv {

    @odata.draft.enabled
    entity SingletonSet as projection on schema.Singleton;
    entity Uoms         as projection on schema.Uom;

}

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
