import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { YzTableStructComponent } from './yz-table-struct.component';
import { YzTableStructDetailComponent } from './yz-table-struct-detail.component';
import { YzTableStructPopupComponent } from './yz-table-struct-dialog.component';
import { YzTableStructDeletePopupComponent } from './yz-table-struct-delete-dialog.component';

export const yzTableStructRoute: Routes = [
    {
        path: 'yz-table-struct',
        component: YzTableStructComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'YzTableStructs'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'yz-table-struct/:id',
        component: YzTableStructDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'YzTableStructs'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const yzTableStructPopupRoute: Routes = [
    {
        path: 'yz-table-struct-new',
        component: YzTableStructPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'YzTableStructs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'yz-table-struct/:id/edit',
        component: YzTableStructPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'YzTableStructs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'yz-table-struct/:id/delete',
        component: YzTableStructDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'YzTableStructs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
