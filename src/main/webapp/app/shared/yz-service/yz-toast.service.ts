import { Injectable } from '@angular/core';

import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';

export enum ToastType {
    TYPE_DEFAULT = 'default',
    TYPE_INFO = 'info',
    TYPE_SUCCESS = 'success',
    TYPE_WARNING = 'warning',
    TYPE_ERROR = 'error',
    DEFAULT = TYPE_INFO
}

export enum ToastAnimation {
    FADE = 'fade',
    FLY_LEFT = 'flyLeft',
    FLY_RIGHT = 'flyRight',
    SLIDE_DOWN = 'slideDown',
    SLIDE_UP = 'slideUp',
    DEFAULT = FADE
}

export enum ToastPosition {
    TOP_FULL_WIDTH = 'toast-top-full-width',
    BOTTOM_FULL_WIDTH = 'toast-bottom-full-width',
    TOP_LEFT = 'toast-top-left',
    TOP_CENTER = 'toast-top-center',
    TOP_RIGHT = 'toast-top-right',
    BOTTOM_RIGHT = 'toast-bottom-right',
    BOTTOM_CENTER = 'toast-bottom-center',
    BOTTOM_LEFT = 'toast-bottom-left',
    CENTER = 'toast-center',
    DEFAULT = TOP_RIGHT
}

@Injectable()
export class YzToastService {

    public config: ToasterConfig;

    timeout: number = 3000;
    toastsLimit: number = 5;

    isNewestOnTop: boolean = true;
    isHideOnClick: boolean = true;
    isDuplicatesPrevented: boolean = true;
    isCloseButton: boolean = true;

    constructor(private toasterService: ToasterService) { }

    public showToast(
        title: string,
        body: string,
        type?: ToastType,
        position?: ToastPosition,
        animation?: ToastAnimation,
        timeout?: number,
        showCloseButton?: boolean
        ) {
        this.config = new ToasterConfig({
            positionClass: position || ToastPosition.DEFAULT,
            timeout: timeout || this.timeout,
            newestOnTop: this.isNewestOnTop,
            tapToDismiss: this.isHideOnClick,
            preventDuplicates: this.isDuplicatesPrevented,
            animation: animation || ToastAnimation.DEFAULT,
            limit: this.toastsLimit,
        });
        const toast: Toast = {
            type: type || ToastType.DEFAULT,
            title,
            body,
            timeout: timeout || this.timeout,
            showCloseButton: showCloseButton || this.isCloseButton,
            bodyOutputType: BodyOutputType.TrustedHtml,
        };
        this.toasterService.popAsync(toast);
    }

}
