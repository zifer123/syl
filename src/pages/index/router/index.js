const routes = [
  {
    path: '/',
    name: 'Hello',
    component: resolve => require(['@/components/Hello.vue'],resolve)
  },
  {
    path: '/admin',
    name: 'Admin',
    component: resolve => require(['@/components/Admin.vue'],resolve)
  },
  {
    path: '/user',
    name: 'User',
    component: resolve => require(['@/components/User.vue'],resolve)
  }
];
export default routes

