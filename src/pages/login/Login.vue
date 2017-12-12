<template>
  <div class="loginBox">
    <div>
      账户：
      <el-input
        placeholder="账户名"
        v-model="userName">
      </el-input>
    </div>

    <div>
      密码：
      <el-input
        placeholder="密码"
        type="password"
        v-model="userPwd">
      </el-input>
    </div>

    <div class="text-right">
      <el-button @click="register" type="info">登录</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userName: '',
        userPwd: ''
      }
    },
    methods: {
      register() {
        this.$http.get('/api/users').then(function(data) {
          console.log(data);
        });
        let routes = [
          {
            path: 'WxSet',
            title: '微信设置',
            show: true,
            children: [
              {
                path: 'WxMenu',
                show: true,
                title: '微信菜单',
                children: [
                  {
                    path: 'MenuCheck',
                    show: true,
                    title: '查看'
                  },
                  {
                    path: 'MenuAdd',
                    show: true,
                    title: '添加'
                  },
                  {
                    path: 'MenuEdit',
                    show: true,
                    title: '编辑'
                  },
                  {
                    path: 'MenuDelete',
                    show: true,
                    title: '删除'
                  }
                ]
              },
              {
                path: 'WxApiSet',
                show: true,
                title: '微信API设置'
              }
            ]
          },

          {
            path: 'UserManage',
            title: '用户管理',
            show: true,
            children: [
              {
                path: 'DriverGroup',
                show: true,
                title: '司机组',
                children: [
                  {
                    path: 'DriverCheck',
                    show: true,
                    title: '查看'
                  },
                  {
                    path: 'DriverAdd',
                    show: true,
                    title: '添加'
                  },
                  {
                    path: 'DriverEdit',
                    show: true,
                    title: '编辑'
                  },
                  {
                    path: 'DriverDelete',
                    show: true,
                    title: '删除'
                  }
                ]
              },
              {
                path: 'MerchatGroup',
                show: true,
                title: '商家组',
                children: [
                  {
                    path: 'MerchatCheck',
                    show: true,
                    title: '查看'
                  },
                  {
                    path: 'MerchatAdd',
                    show: true,
                    title: '添加'
                  },
                  {
                    path: 'MerchatEdit',
                    show: true,
                    title: '编辑'
                  },
                  {
                    path: 'MerchatDelete',
                    show: true,
                    title: '删除'
                  }
                ]
              },
              {
                path: 'WorkshopGroup',
                show: true,
                title: '维修厂组',
                children: [
                  {
                    path: 'WorkshopCheck',
                    show: true,
                    title: '查看'
                  },
                  {
                    path: 'WorkshopAdd',
                    show: true,
                    title: '添加'
                  },
                  {
                    path: 'WorkshopEdit',
                    show: true,
                    title: '编辑'
                  },
                  {
                    path: 'WorkshopDelete',
                    show: true,
                    title: '删除'
                  }
                ]
              },
              {
                path: 'UserVerify',
                show: true,
                title: '用户审核',
              }
            ]
          },

          {
            path: 'OrderManage',
            title: '订单管理',
            show: true,
            children: [
              {
                path: 'OrderManage',
                show: true,
                title: '订单管理',
                children: [
                  {
                    path: 'OrderCheck',
                    show: true,
                    title: '查看'
                  },
                  {
                    path: 'OrderAdd',
                    show: true,
                    title: '添加'
                  },
                  {
                    path: 'OrderEdit',
                    show: true,
                    title: '编辑'
                  },
                  {
                    path: 'OrderDelete',
                    show: true,
                    title: '删除'
                  }
                ]
              },
              {
                path: 'OrderVerify',
                show: true,
                title: '订单审核'
              },
              {
                path: 'OrderTemp',
                show: true,
                title: '临时订单',
                children: [
                  {
                    path: 'OrderTempCheck',
                    show: true,
                    title: '查看'
                  },
                  {
                    path: 'OrderTempAdd',
                    show: true,
                    title: '添加'
                  },
                  {
                    path: 'OrderTempEdit',
                    show: true,
                    title: '编辑'
                  },
                  {
                    path: 'OrderTempDelete',
                    show: true,
                    title: '删除'
                  }
                ]
              },
              {
                path: 'OrderCustomerService',
                show: true,
                title: '客服审单'
              },
              {
                path: 'SettleAccountsModeSet',
                show: true,
                title: '结算模式设置'
              }
            ]
          },

          {
            path: 'AreaManage',
            show: true,
            title: '区域管理',
            children: [
              {
                path: 'LineList',
                show: true,
                title: '线路列表',
                children: [
                  {
                    path: 'LineCheck',
                    show: true,
                    title: '查看'
                  },
                  {
                    path: 'LineAdd',
                    show: true,
                    title: '添加'
                  },
                  {
                    path: 'LineEdit',
                    show: true,
                    title: '编辑'
                  },
                  {
                    path: 'LineDelete',
                    show: true,
                    title: '删除'
                  }
                ]
              },
              {
                path: 'AreaEdit',
                show: true,
                title: '区域编辑',
                children: [
                  {
                    path: 'AreaCheck',
                    show: true,
                    title: '查看'
                  },
                  {
                    path: 'AreaAdd',
                    show: true,
                    title: '添加'
                  },
                  {
                    path: 'AreaEdit',
                    show: true,
                    title: '编辑'
                  },
                  {
                    path: 'AreaDelete',
                    show: true,
                    title: '删除'
                  }
                ]
              }
            ]
          },

          {
            path: 'Finance',
            title: '财务',
            show: true,
            children: [
              {
                path: 'ReceiptVerify',
                show: true,
                title: '回单审核'
              },
              {
                path: 'PaymentVerify',
                show: true,
                title: '交款审核'
              },
              {
                path: 'BillMake',
                show: true,
                title: '账单生成'
              },
              {
                path: 'MerchatSettleAccounts',
                show: true,
                title: '商家结算'
              }
            ]
          },

          {
            path: 'AdminSet',
            title: '管理员设置',
            show: true,
            children: [
              {
                path: 'AdminList',
                show: true,
                title: '管理员列表'
              },
              {
                path: 'AuthoritySet',
                show: true,
                title: '权限设置'
              },
              {
                path: 'OpLog',
                show: true,
                title: '操作日志'
              },
              {
                path: 'FareSet',
                show: false,
                title: '费用设置'
              }
            ]
          },

          {
            path: 'Echart',
            title: 'echart',
            show: false,
            icon: 'icon-adminSet',
            children: [
              {
                path: 'Bar',
                show: true,
                title: '柱状图'
              }
            ]
          }
        ];
        /* 过滤路由，把要显示了路由存储（权限管理），前端增加图标 */
        for(let i = routes.length-1; i!=-1 ;i--) {
          if(!routes[i].show) {
            routes.splice(i,1);
            continue;
          }
          routes[i].meta = {
            name: routes[i].title
          };
          routes[i].children.forEach( (it,ind) => {
            it.meta = {
              name: it.title
            };
            // 利用一级不存在但不会报错的特性
            if(it.children && it.children.length) {
              it.children.forEach((item,index) => {
                item.meta = {
                  name: item.title
                }
              })
            }
          });
          switch(routes[i].path) {
            case 'WxSet':
              routes[i].icon = 'iconfont icon-wxSet';
              break;
            case 'UserManage':
              routes[i].icon = 'iconfont icon-userManage';
              break;
            case 'OrderManage':
              routes[i].icon = 'iconfont icon-orderManage';
              break;
            case 'AreaManage':
              routes[i].icon = 'iconfont icon-areaManage';
              break;
            case 'Finance':
              routes[i].icon = 'iconfont icon-finance';
              break;
            case 'AdminSet':
              routes[i].icon = 'iconfont icon-adminSet';
              break;
          }
        }
        localStorage.setItem('routes',JSON.stringify(routes));
        location.href = 'index.html';
      }
    }
  }
</script>

<style>
  html,body {
    width: 100%;
    height: 100%;
  }
  body {
    display: flex;
    background: #ccc;
  }
  .loginBox {
    width: 400px;
    margin: auto;
  }
  .loginBox > div {
    margin: 10px 0;
  }
  .text-right {
    text-align: right;
  }
</style>
