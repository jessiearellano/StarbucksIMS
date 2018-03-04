import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CapstoneSharedModule } from '../../shared';
import { CapstoneAdminModule } from '../../admin/admin.module';
import {
    StoreMySuffixService,
    StoreMySuffixPopupService,
    StoreMySuffixComponent,
    StoreMySuffixDetailComponent,
    StoreMySuffixDialogComponent,
    StoreMySuffixPopupComponent,
    StoreMySuffixDeletePopupComponent,
    StoreMySuffixDeleteDialogComponent,
    storeRoute,
    storePopupRoute,
} from './';

const ENTITY_STATES = [
    ...storeRoute,
    ...storePopupRoute,
];

@NgModule({
    imports: [
        CapstoneSharedModule,
        CapstoneAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        StoreMySuffixComponent,
        StoreMySuffixDetailComponent,
        StoreMySuffixDialogComponent,
        StoreMySuffixDeleteDialogComponent,
        StoreMySuffixPopupComponent,
        StoreMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        StoreMySuffixComponent,
        StoreMySuffixDialogComponent,
        StoreMySuffixPopupComponent,
        StoreMySuffixDeleteDialogComponent,
        StoreMySuffixDeletePopupComponent,
    ],
    providers: [
        StoreMySuffixService,
        StoreMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CapstoneStoreMySuffixModule {}
