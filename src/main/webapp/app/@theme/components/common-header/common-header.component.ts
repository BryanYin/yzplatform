import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { environment } from '../../../../environments/environment';
import { ThemeSwitherPos } from '../../../../environments/globalTypes';
import { NbThemeService } from '@nebular/theme';
import { NbJSThemeOptions } from '@nebular/theme/services/js-themes/theme.options';

@Component({
  selector: 'do-common-header',
  styleUrls: ['./common-header.component.scss'],
  templateUrl: './common-header.component.html',
})
export class CommonHeaderComponent implements OnInit {


  @Input() position: string = 'normal';

  title = 'Maintitle';

  user: any;

  userMenu = [{ title: 'Profile', index: 2 }, { title: 'Log out', index: 3 }];

  private theme: NbJSThemeOptions;

  private showThemeSwither = environment.showThemeSwither;

  private showSideBar = environment.showSideBar;

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private userService: UserService,
    private analyticsService: AnalyticsService,
    private themeService: NbThemeService) {

    if (this.showThemeSwither === ThemeSwitherPos.profile) {
      this.userMenu = [{ title: 'switch theme', index: 1 }, ...this.userMenu];
    }

  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe((users: any) => this.user = users.nick);
    this.themeService.getJsTheme()
      .subscribe((theme: NbJSThemeOptions) => this.theme = theme);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }

  showNavSwitcher() {
    return this.showThemeSwither === ThemeSwitherPos.navbar;
  }

  menuClicked(item) {
    if (item.index === 1) {
      if (this.theme.name === 'cosmic') {
        this.themeService.changeTheme('default');
      } else {
        this.themeService.changeTheme('cosmic');
      }
    }
  }

  onNotificationClicked() {

  }
}
