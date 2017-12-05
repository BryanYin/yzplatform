import { Component } from '@angular/core';

import { environment } from '../../../../environments/environment';

// TODO: move layouts into the framework
@Component({
  selector: 'do-common-layout',
  styleUrls: ['./common.layout.scss'],
  templateUrl: 'common.layout.html',
})
export class CommonLayoutComponent {
  showSideBar = environment.showSideBar;
  showNavBar = environment.showNavBar;
}
