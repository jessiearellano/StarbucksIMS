import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { StoreMySuffixComponent } from './store-my-suffix.component';
import { StoreMySuffixDetailComponent } from './store-my-suffix-detail.component';
import { StoreMySuffixPopupComponent } from './store-my-suffix-dialog.component';
import { StoreMySuffixDeletePopupComponent } from './store-my-suffix-delete-dialog.component';

export const storeRoute: Routes = [
    {
        path: 'store-my-suffix',
        component: StoreMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Stores'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'store-my-suffix/:id',
        component: StoreMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Stores'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const storePopupRoute: Routes = [
    {
        path: 'store-my-suffix-new',
        component: StoreMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Stores'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'store-my-suffix/:id/edit',
        component: StoreMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Stores'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'store-my-suffix/:id/delete',
        component: StoreMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Stores'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
