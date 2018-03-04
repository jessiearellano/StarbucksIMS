import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CapstoneSKUMySuffixModule } from './sku-my-suffix/sku-my-suffix.module';
import { CapstoneStoreMySuffixModule } from './store-my-suffix/store-my-suffix.module';
import { CapstoneStoreSKUMySuffixModule } from './store-sku-my-suffix/store-sku-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        CapstoneSKUMySuffixModule,
        CapstoneStoreMySuffixModule,
        CapstoneStoreSKUMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CapstoneEntityModule {}
