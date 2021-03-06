import { Component, OnInit, Renderer, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { JhiEventManager } from 'ng-jhipster';

import { LoginService } from '../yz-service/auth/login.service';
import { StateStorageService } from '../yz-service/auth/state-storage.service';
import { PAGES_PATH } from '../../app-routing.module';

@Component({
    selector: 'yz-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class YzLoginComponent {
    authenticationError: boolean;
    pwd: string;
    email: string;
    rememberMe: boolean;
    username: string;
    credentials: any;
    showMessages: any;
    messages: string[];
    errors: string[];
    submitted: boolean = false;

    constructor(
        private eventManager: JhiEventManager,
        private loginService: LoginService,
        private stateStorageService: StateStorageService,
        private elementRef: ElementRef,
        private renderer: Renderer,
        private router: Router,
        // public activeModal: NgbActiveModal
    ) {
        this.credentials = {};
        this.showMessages = {};
    }

    cancel() {
        this.credentials = {
            username: null,
            password: null,
            rememberMe: true
        };
        this.authenticationError = false;
        // this.activeModal.dismiss('cancel');
    }

    login() {
        this.submitted = true;
        this.loginService.login({
            username: this.username,
            password: this.pwd,
            rememberMe: this.rememberMe
        }).then(() => {
            this.authenticationError = false;
            this.submitted = false;
            // this.activeModal.dismiss('login success');
            if (this.router.url === '/register' || (/^\/activate\//.test(this.router.url)) ||
                (/^\/reset\//.test(this.router.url))) {
                this.router.navigate(['']);
            }

            this.eventManager.broadcast({
                name: 'authenticationSuccess',
                content: 'Sending Authentication Success'
            });

            // // previousState was set in the authExpiredInterceptor before being redirected to login modal.
            // // since login is succesful, go to stored previousState and clear previousState
            const redirect = this.stateStorageService.getUrl();
            if (redirect) {
                this.stateStorageService.storeUrl(null);
                this.router.navigate([redirect]);
            }
            this.router.navigate(['/pages']);
        }).catch(() => {
            this.authenticationError = true;
            this.submitted = false;
            this.username = null;
            this.pwd = null;
        });
    }

    register() {
        // this.activeModal.dismiss('to state register');
        // this.router.navigate(['/register']);
    }

    requestResetPassword() {
        // this.activeModal.dismiss('to state requestReset');
        // this.router.navigate(['/reset', 'request']);
    }
}
