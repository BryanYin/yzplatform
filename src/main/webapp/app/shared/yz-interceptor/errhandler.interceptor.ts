
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import { YzToastService, ToastType, ToastPosition, ToastAnimation } from '../yz-service/yz-toast.service';

@Injectable()
export class ErrHandlerInterceptor implements HttpInterceptor {
  constructor(private toaster: YzToastService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).catch((err: any, caught) => {
      if (err instanceof HttpErrorResponse) {
        // console.log(err);
        switch (err.status) {
          case 401:
            if (err.url.indexOf('/api/authentication') !== -1) {
              this.toaster.showToast('登录失败!', '请检查您的用户名密码', ToastType.TYPE_ERROR, ToastPosition.TOP_CENTER);
            } else if (err.url.indexOf('/api/account') === -1) {
              this.toaster.showToast('未授权访问', err.message, ToastType.TYPE_WARNING, ToastPosition.TOP_CENTER);
            }
            break;
          case 403:
            this.toaster.showToast('权限不够', '访问这个资源的权限不够', ToastType.TYPE_ERROR, ToastPosition.TOP_CENTER);
            break;
          case 404:
            this.toaster.showToast('资源不存在', '无法找到您查找的数据', ToastType.TYPE_ERROR, ToastPosition.CENTER, ToastAnimation.FADE, 5000);
            break;
          case 500:
            this.toaster.showToast('后台程序错误', '后台程序错误<br>请联系管理员', ToastType.TYPE_ERROR, ToastPosition.CENTER);
            break;
          case 504:
            this.toaster.showToast('连接超时', '连接后台程序超时<br>请联系管理员', ToastType.TYPE_ERROR, ToastPosition.CENTER);
            break;
          default:
            this.toaster.showToast('未知错误', err.message, ToastType.TYPE_ERROR, ToastPosition.TOP_CENTER);
            break;
        }
        return Observable.throw(err);
      }
    });
  }
}
