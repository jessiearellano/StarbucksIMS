import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { StoreSKUMySuffixComponent } from './store-sku-my-suffix.component';
import { StoreSKUMySuffixDetailComponent } from './store-sku-my-suffix-detail.component';
import { StoreSKUMySuffixPopupComponent } from './store-sku-my-suffix-dialog.component';
import { StoreSKUMySuffixDeletePopupComponent } from './store-sku-my-suffix-delete-dialog.component';

export const storeSKURoute: Routes = [
    {
        path: 'store-sku-my-suffix',
        component: StoreSKUMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'StoreSKUS'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'store-sku-my-suffix/:id',
        component: StoreSKUMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'StoreSKUS'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const storeSKUPopupRoute: Routes = [
    {
        path: 'store-sku-my-suffix-new',
        component: StoreSKUMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'StoreSKUS'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'store-sku-my-suffix/:id/edit',
        component: StoreSKUMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'StoreSKUS'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'store-sku-my-suffix/:id/delete',
        component: StoreSKUMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'StoreSKUS'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
