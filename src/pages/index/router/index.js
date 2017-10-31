const routes = [
  {
    path: '/',
    name: 'Index',
    children: [
      {
        path: 'wxSet',
        children: [
          {
            path: 'wxMenu',
            component: resolve => require(['../children/WxSet/WxMenu.vue'],resolve)
          },
          {
            path: 'wxApiSet',
            component: resolve => require(['../children/WxSet/WxMenu.vue'],resolve)
          }
        ]
      },
      {
        path: 'userManaage',
        children: [
          {
            path: 'userList',
            component: resolve => require(['../children/userManaage/userList.vue'],resolve)
          },
          {
            path: 'merchatGroup',
            component: resolve => require(['../children/userManaage/merchatGroup.vue'],resolve)
          }
        ]
      },
    ]
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

