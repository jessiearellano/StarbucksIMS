import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CapstoneSharedModule } from '../../shared';
import {
    StoreSKUMySuffixService,
    StoreSKUMySuffixPopupService,
    StoreSKUMySuffixComponent,
    StoreSKUMySuffixDetailComponent,
    StoreSKUMySuffixDialogComponent,
    StoreSKUMySuffixPopupComponent,
    StoreSKUMySuffixDeletePopupComponent,
    StoreSKUMySuffixDeleteDialogComponent,
    storeSKURoute,
    storeSKUPopupRoute,
} from './';

const ENTITY_STATES = [
    ...storeSKURoute,
    ...storeSKUPopupRoute,
];

@NgModule({
    imports: [
        CapstoneSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        StoreSKUMySuffixComponent,
        StoreSKUMySuffixDetailComponent,
        StoreSKUMySuffixDialogComponent,
        StoreSKUMySuffixDeleteDialogComponent,
        StoreSKUMySuffixPopupComponent,
        StoreSKUMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        StoreSKUMySuffixComponent,
        StoreSKUMySuffixDialogComponent,
        StoreSKUMySuffixPopupComponent,
        StoreSKUMySuffixDeleteDialogComponent,
        StoreSKUMySuffixDeletePopupComponent,
    ],
    providers: [
        StoreSKUMySuffixService,
        StoreSKUMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CapstoneStoreSKUMySuffixModule {}
