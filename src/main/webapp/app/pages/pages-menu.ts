import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: '首页',
    icon: 'nb-home',
    link: '/pages/firstpage',
    home: true,
  },
  // {
  //   title: 'FEATURES',
  //   group: true,
  // },
  {
    title: 'Example Page',
    icon: 'nb-bar-chart',
    link: '/pages/example',
    children: [
      {
        title: 'example',
        link: '/pages/example/page1',
      },
    ],
  },
  {
    title: '智能报表',
    icon: 'nb-bar-chart',
    // link: '/pages/smart-report',
    children: [
      {
        title: '自动报表',
        link: '/pages/smart-report',
      },
    ],
  },
  {
    title: 'Auth',
    icon: 'nb-locked',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
];
