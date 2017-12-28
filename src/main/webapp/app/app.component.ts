import { Component, OnInit } from '@angular/core';
import { Account } from './shared';
import { Principal } from './shared/yz-service/auth';
import { JhiEventManager } from 'ng-jhipster';

@Component({
  selector: 'yz-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  account: Account;
  constructor(private principal: Principal, private eventManager: JhiEventManager) {
  }

  ngOnInit() {
    this.principal.identity().then((account) => {
      this.account = account;
    });
    this.registerAuthenticationSuccess();
  }

  registerAuthenticationSuccess() {
    this.eventManager.subscribe('authenticationSuccess', (message) => {
      this.principal.identity().then((account) => {
        this.account = account;
      });
    });
  }

  isAuthenticated() {
    return this.principal.isAuthenticated();
  }
}
