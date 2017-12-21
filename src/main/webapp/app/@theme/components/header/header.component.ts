import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { environment } from '../../../../environments/environment';
import { ThemeSwitherPos } from '../../../../environments/globalTypes';
import { NbThemeService } from '@nebular/theme';
import { NbJSThemeOptions } from '@nebular/theme/services/js-themes/theme.options';

@Component({
  selector: 'yz-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  title = '授信小工具';

  user: any;

  userMenu = [{ title: 'Profile', index: 2 }, { title: 'Log out', index: 3 }];

  private theme: NbJSThemeOptions;

  public showThemeSwither = environment.showThemeSwither;

  public showSideBar = environment.showSideBar;

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService) {

    if (this.showThemeSwither === ThemeSwitherPos.profile) {
      this.userMenu = [{ title: 'switch theme', index: 1 }, ...this.userMenu];
    }

  }

  ngOnInit() {
    this.user = { name: '系统管理员', picture: '../../assets/images/logo-jhipster.png'};
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
