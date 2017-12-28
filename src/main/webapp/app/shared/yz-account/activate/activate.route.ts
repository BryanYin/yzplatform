import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../../shared/yz-service/auth';
import { ActivateComponent } from './activate.component';

export const activateRoute: Route = {
    path: 'activate',
    component: ActivateComponent,
    data: {
        authorities: [],
        pageTitle: 'Activation'
    },
    canActivate: [UserRouteAccessService]
};
