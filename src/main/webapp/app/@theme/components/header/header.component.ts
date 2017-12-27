import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { environment } from '../../../../environments/environment';
import { ThemeSwitherPos } from '../../../../environments/globalTypes';
import { NbThemeService } from '@nebular/theme';
import { NbJSThemeOptions } from '@nebular/theme/services/js-themes/theme.options';
import { Principal, AuthServerProvider } from '../../../shared';
import { Router } from '@angular/router';

class UserMenu {
  static switchTheme = { title: '更换主题', index: 1 };
  static profile = { title: '我的资料', index: 2 };
  static logOut = { title: '退出', index: 3 };
  public static getUserMenu(showSwitcher: boolean) {
    return showSwitcher ? [this.switchTheme, this.profile, this.logOut] : [this.profile, this.logOut];
  }
}

@Component({
  selector: 'yz-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  title = '授信小工具';

  user: any;

  userMenu: any;

  private theme: NbJSThemeOptions;

  public showThemeSwither = environment.showThemeSwither;

  public showSideBar = environment.showSideBar;

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private principal: Principal,
    private authServerProvider: AuthServerProvider,
    private router: Router) {
    this.userMenu = UserMenu.getUserMenu(this.showThemeSwither === ThemeSwitherPos.profile);
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

    switch (item.index) {
      case 1:
        if (this.theme.name === 'cosmic') {
          this.themeService.changeTheme('default');
        } else {
          this.themeService.changeTheme('cosmic');
        }
        break;
      case 2:

        break;
      case 3:
        this.logout();
        break;
      default:
        break;
    }
  }

  onNotificationClicked() {

  }

  logout() {
    this.authServerProvider.logout().subscribe();
    this.principal.authenticate(null);
    this.router.navigate(['']);
  }
}
