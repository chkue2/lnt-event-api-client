import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      {
        path: '',
        redirect: { name: 'signin' },
      },
      {
        path: 'signin',
        name: 'signin',
        component: () => import('pages/SigninPage.vue'),
      },
      {
        path: 'signup',
        name: 'signup',
        component: () => import('pages/SignupPage.vue'),
      },
      {
        path: 'change-password',
        name: 'change-password',
        component: () => import('pages/ChangePasswordPage.vue'),
      },
    ],
  },

  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: '/auth',
        name: 'auth',
        redirect: { name: 'dashboard' },
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('pages/DashboardPage.vue'),
      },
      {
        path: 'document',
        name: 'document',
        component: () => import('pages/DocumentPage.vue'),
      },
      {
        path: 'webconnection',
        name: 'webconnection',
        component: () => import('pages/WebConnectionPage.vue'),
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('pages/UserPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
