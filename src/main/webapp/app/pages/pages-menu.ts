import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  // {
  //   title: '首页',
  //   icon: 'nb-home',
  //   link: '/pages/firstpage',
  //   home: true,
  // },
  // {
  //   title: 'FEATURES',
  //   group: true,
  // },
  {
    title: '授信数据管理',
    icon: 'nb-bar-chart',
    link: '/pages/example',
    children: [
      {
        title: '授信填报',
        link: '/pages/example/page1',
      },
    ],
  },
  // {
  //   title: 'Auth',
  //   icon: 'nb-locked',
  //   children: [
  //     {
  //       title: 'Login',
  //       link: '/auth/login',
  //     },
  //     {
  //       title: 'Register',
  //       link: '/auth/register',
  //     },
  //     {
  //       title: 'Request Password',
  //       link: '/auth/request-password',
  //     },
  //     {
  //       title: 'Reset Password',
  //       link: '/auth/reset-password',
  //     },
  //   ],
  // },
];
