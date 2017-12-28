import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../../shared/yz-service/auth';
import { PasswordComponent } from './password.component';

export const passwordRoute: Route = {
    path: 'password',
    component: PasswordComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Password'
    },
    canActivate: [UserRouteAccessService]
};
