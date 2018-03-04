import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CapstoneSharedModule } from '../../shared';
import {
    SKUMySuffixService,
    SKUMySuffixPopupService,
    SKUMySuffixComponent,
    SKUMySuffixDetailComponent,
    SKUMySuffixDialogComponent,
    SKUMySuffixPopupComponent,
    SKUMySuffixDeletePopupComponent,
    SKUMySuffixDeleteDialogComponent,
    sKURoute,
    sKUPopupRoute,
} from './';

const ENTITY_STATES = [
    ...sKURoute,
    ...sKUPopupRoute,
];

@NgModule({
    imports: [
        CapstoneSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SKUMySuffixComponent,
        SKUMySuffixDetailComponent,
        SKUMySuffixDialogComponent,
        SKUMySuffixDeleteDialogComponent,
        SKUMySuffixPopupComponent,
        SKUMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        SKUMySuffixComponent,
        SKUMySuffixDialogComponent,
        SKUMySuffixPopupComponent,
        SKUMySuffixDeleteDialogComponent,
        SKUMySuffixDeletePopupComponent,
    ],
    providers: [
        SKUMySuffixService,
        SKUMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CapstoneSKUMySuffixModule {}
