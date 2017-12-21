/**
 * @license
 * Copyright DataOcean. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { ThemeSwitherPos, RegistedThemes } from './globalTypes';

export const environment = {
  production: true,
  showSideBar: true,
  showNavBar: true,
  useMock: false,
  showThemeSwither: ThemeSwitherPos.navbar,
  defaultTheme: RegistedThemes.default,
};
