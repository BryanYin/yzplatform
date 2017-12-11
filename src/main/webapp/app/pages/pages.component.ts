import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'yz-pages',
  template: `
    <yz-common-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </yz-common-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;
}
