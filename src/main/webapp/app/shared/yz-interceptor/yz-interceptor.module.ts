import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ErrHandlerInterceptor } from './errhandler.interceptor';
import { AuthExpiredInterceptor } from './auth-expired.interceptor';

@NgModule({
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: ErrHandlerInterceptor,
        multi: true,
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthExpiredInterceptor,
        multi: true,
    }],
})
export class YzInterceptorModule { }
