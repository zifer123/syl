<template>
  <div class="loginBox">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="pwd">
        <el-input v-model="ruleForm.pwd" @keyup.enter.native="submit"></el-input>
      </el-form-item>
    </el-form>
    <p style="text-align: right;">
      <el-button type="danger" @click="submit">登录</el-button>
    </p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          pwd: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 个字符以上', trigger: 'blur'}
          ],
          pwd: [
            {required: true, message: '请输入密码', trigger: 'blue'}
          ]
        }
      }
    },
    methods: {
      submit() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.register();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      register() {
        this.$http.get('/api/users',{
          params: this.ruleForm
        }).then((body) => {
          var data = body.data;
          if(!data.status) {
            this.$message.error('用户名或密码错误，请重试');
            return;
          }
          console.log('成功');
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
            if(!routes[i].show) {
              routes.splice(i,1);
              continue;
            }
            routes[i].meta = {
              name: routes[i].title,
              icon: routes[i].icon
            };
            routes[i].children.forEach( (it,ind) => {
              it.meta = {
                name: it.title,
                icon: routes[i].icon
              };
              // 利用一级不存在但不会报错的特性
              if(it.children && it.children.length) {
                it.children.forEach((item,index) => {
                  item.meta = {
                    name: item.title,
                    icon: routes[i].icon,
                  }
                  /* 为列表级页面添加keep-alive属性，让页面缓存起来 */
                  switch (item.path) {
                    case 'DriverCheck':
                      item.meta.keepAlive = true;
                      break;
                  }
                })
              }
            });
          }
          localStorage.setItem('routes',JSON.stringify(routes));
          location.href = 'index.html';
        });
      }
    }
  }
</script>

<style>
  html,body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
  body {
    display: flex;
    background-image: url(./assets/bg2.jpg);
    background-size: cover;
  }
  .loginBox {
    width: 400px;
    padding: 50px;
    background: url(./assets/bg2.jpg) center;
    border-radius: 10px;
    margin: auto;
  }
  .loginBox > div {
    margin: 10px 0;
  }
  .text-right {
    text-align: right;
  }
</style>
