import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { YzSchemaTableComponent } from './yz-schema-table.component';
import { YzSchemaTableDetailComponent } from './yz-schema-table-detail.component';
import { YzSchemaTablePopupComponent } from './yz-schema-table-dialog.component';
import { YzSchemaTableDeletePopupComponent } from './yz-schema-table-delete-dialog.component';

export const yzSchemaTableRoute: Routes = [
    {
        path: 'yz-schema-table',
        component: YzSchemaTableComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'YzSchemaTables'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'yz-schema-table/:id',
        component: YzSchemaTableDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'YzSchemaTables'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const yzSchemaTablePopupRoute: Routes = [
    {
        path: 'yz-schema-table-new',
        component: YzSchemaTablePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'YzSchemaTables'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'yz-schema-table/:id/edit',
        component: YzSchemaTablePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'YzSchemaTables'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'yz-schema-table/:id/delete',
        component: YzSchemaTableDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'YzSchemaTables'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
