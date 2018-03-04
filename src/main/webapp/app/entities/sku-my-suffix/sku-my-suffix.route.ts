import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SKUMySuffixComponent } from './sku-my-suffix.component';
import { SKUMySuffixDetailComponent } from './sku-my-suffix-detail.component';
import { SKUMySuffixPopupComponent } from './sku-my-suffix-dialog.component';
import { SKUMySuffixDeletePopupComponent } from './sku-my-suffix-delete-dialog.component';

export const sKURoute: Routes = [
    {
        path: 'sku-my-suffix',
        component: SKUMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SKUS'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'sku-my-suffix/:id',
        component: SKUMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SKUS'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sKUPopupRoute: Routes = [
    {
        path: 'sku-my-suffix-new',
        component: SKUMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SKUS'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sku-my-suffix/:id/edit',
        component: SKUMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SKUS'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sku-my-suffix/:id/delete',
        component: SKUMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SKUS'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
