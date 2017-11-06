/* 注意，由于微信菜单，微信API设置....等路由为第三级路由，Index.vue的router-view只显示第二级路由，需要第三级router-view作跳板，显示第三级路由 */
let allRoutes = [
  {
    path: 'wxSet',
    title: '微信设置',
    component: resolve => require(['@/components/commonRoute.vue'],resolve),
    children: [
      {
        path: 'wxMenu',
        title: '微信菜单',
        component: resolve => require(['../children/Wxset/WxMenu.vue'],resolve)
      },
      {
        path: 'wxApiSet',
        title: '微信API设置',
        component: resolve => require(['../children/Wxset/WxApiSet.vue'],resolve)
      }
    ]
  },

  {
    path: 'userManage',
    title: '用户管理',
    component: resolve => require(['@/components/commonRoute.vue'],resolve),
    children: [
      {
        path: 'userList',
        title: '用户列表',
        component: resolve => require(['../children/UserManage/UserList.vue'],resolve)
      },
      {
        path: 'driverGroup',
        title: '司机组',
        component: resolve => require(['../children/UserManage/DriverGroup.vue'],resolve)
      },
      {
        path: 'userVerify',
        title: '用户审核',
        component: resolve => require(['../children/UserManage/UserVerify.vue'],resolve)
      },
      {
        path: 'merchatGroup',
        title: '商家组',
        component: resolve => require(['../children/UserManage/MerchatGroup.vue'],resolve)
      },
      {
        path: 'workshopGroup',
        title: '维修厂组',
        component: resolve => require(['../children/UserManage/WorkshopGroup.vue'],resolve)
      }
    ]
  },

  {
    path: 'orderManage',
    title: '订单管理',
    component: resolve => require(['@/components/commonRoute.vue'],resolve),
    children: [
      {
        path: 'orderList',
        title: '订单查询',
        component: resolve => require(['../children/OrderManage/OrderList.vue'],resolve)
      },
      {
        path: 'orderVerify',
        title: '订单审核',
        component: resolve => require(['../children/OrderManage/OrderVerify.vue'],resolve)
      },
      {
        path: 'orderTemp',
        title: '临时订单',
        component: resolve => require(['../children/OrderManage/OrderTemp.vue'],resolve)
      },
      {
        path: 'orderEdit',
        title: '订单录入',
        component: resolve => require(['../children/OrderManage/OrderEdit.vue'],resolve)
      },
      {
        path: 'orderCustomerService',
        title: '客服审单',
        component: resolve => require(['../children/OrderManage/OrderCustomerService.vue'],resolve)
      },
      {
        path: 'settleAccountsModeSet',
        title: '结算模式设置',
        component: resolve => require(['../children/OrderManage/SettleAccountsModeSet.vue'],resolve)
      }
    ]
  },

  {
    path: 'areaManage',
    title: '区域管理',
    component: resolve => require(['@/components/commonRoute.vue'],resolve),
    children: [
      {
        path: 'lineList',
        title: '线路列表',
        component: resolve => require(['../children/AreaManage/LineList.vue'],resolve)
      },
      {
        path: 'areaEdit',
        title: '区域编辑',
        component: resolve => require(['../children/AreaManage/AreaEdit.vue'],resolve)
      }
    ]
  },

  {
    path: 'finance',
    title: '财务',
    component: resolve => require(['@/components/commonRoute.vue'],resolve),
    children: [
      {
        path: 'receiptVerify',
        title: '回单审核',
        component: resolve => require(['../children/Finance/ReceiptVerify.vue'],resolve)
      },
      {
        path: 'paymentVerify',
        title: '交款审核',
        component: resolve => require(['../children/Finance/PaymentVerify.vue'],resolve)
      },
      {
        path: 'billMake',
        title: '账单生成',
        component: resolve => require(['../children/Finance/BillMake.vue'],resolve)
      },
      {
        path: 'merchatSettleAccounts',
        title: '商家结算',
        component: resolve => require(['../children/Finance/MerchatSettleAccounts.vue'],resolve)
      }
    ]
  },

  {
    path: 'adminSet',
    title: '管理员设置',
    component: resolve => require(['@/components/commonRoute.vue'],resolve),
    children: [
      {
        path: 'adminList',
        title: '管理员列表',
        component: resolve => require(['../children/AdminSet/AdminList.vue'],resolve)
      },
      {
        path: 'authoritySet',
        title: '权限设置',
        component: resolve => require(['../children/AdminSet/AuthoritySet.vue'],resolve)
      },
      {
        path: 'opLog',
        title: '操作日志',
        component: resolve => require(['../children/AdminSet/OpLog.vue'],resolve)
      },
      {
        path: 'fareSet',
        title: '费用设置',
        component: resolve => require(['../children/AdminSet/FareSet.vue'],resolve)
      }
    ]
  },

  {
    path: 'echart',
    title: 'echart',
    component: resolve => require(['@/components/commonRoute.vue'],resolve),
    children: [
      {
        path: 'bar',
        title: '柱状图',
        component: resolve => require(['../children/Echart/Bar.vue'],resolve)
      }
    ]
  },

  {
    path: 'editor',
    title: '富文本',
    component: resolve => require(['@/components/commonRoute.vue'],resolve),
    children: [
      {
        path: 'markDown',
        title: 'markDown编辑器',
        component: resolve => require(['../children/Editor/MarkDown.vue'],resolve)
      }
    ]
  }
];
import Index from '../main/Index.vue'
const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    redirect: '/home/dashBoard',
    children: allRoutes
  },
  {
    path: '/404',
    name: '404',
    component: resolve => require(['@/components/404.vue'],resolve)
  },
  {
    path: '*',
    redirect: '/404'
  }
];
export default routes

