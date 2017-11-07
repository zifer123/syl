<template>
  <div>
    <el-table
      v-show="tableShow"
      :data="userInfo"
      border>
      <el-table-column
        fixed
        prop="name"
        label="用户名"
        width="150">
      </el-table-column>
      <el-table-column
        prop="group"
        label="组名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="state"
        label="状态"
        width="120">
      </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="outBox" v-show="treeShow">
      <h4 class="userPage">用户名：{{ userName }}</h4>
      <el-tree
        :data="data2"
        show-checkbox
        node-key="path"
        :default-expanded-keys="titleRoutes"
        :default-checked-keys="checkedRoutes"
        :props="defaultProps">
      </el-tree>
      <el-button @click="sure">提交</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userName: '',
        tableShow: true,
        treeShow: false,
        titleRoutes: ['wxSet','userManage','orderManage','areaManage','finance','adminSet','editor','echart'],
        checkedRoutes: ['wxSet','userManage','orderManage','areaManage','finance','adminSet','editor','echart'],
        userInfo: [
          {
            id: 1,
            name: '呀呀',
            group: '管理员',
            state: 1?"启用":"禁用"
          },
          {
            id: 2,
            name: '哈哈',
            group: '司机',
            state: 1?"启用":"禁用"
          },
          {
            id: 3,
            name: '哒哒',
            group: '商家',
            state: 1?"启用":"禁用"
          },
          {
            id: 4,
            name: '嚯嚯',
            group: '维修厂',
            state: 1?"启用":"禁用"
          },
        ],
        data2: [
          {
            path: 'wxSet',
            label: '微信设置',
            children: [
              {
                path: 'wxMenu',
                label: '微信菜单'
              },
              {
                path: 'wxApiSet',
                label: '微信API设置'
              }
            ]
          },

          {
            path: 'userManage',
            label: '用户管理',
            children: [
              {
                path: 'userList',
                label: '用户列表'
              },
              {
                path: 'driverGroup',
                label: '司机组'
              },
              {
                path: 'userVerify',
                label: '用户审核'
              },
              {
                path: 'merchatGroup',
                label: '商家组'
              },
              {
                path: 'workshopGroup',
                label: '维修厂组'
              }
            ]
          },

          {
            path: 'orderManage',
            label: '订单管理',
            children: [
              {
                path: 'orderList',
                label: '订单查询'
              },
              {
                path: 'orderVerify',
                label: '订单审核'
              },
              {
                path: 'orderTemp',
                label: '临时订单'
              },
              {
                path: 'orderEdit',
                label: '订单录入'
              },
              {
                path: 'orderCustomerService',
                label: '客服审单'
              },
              {
                path: 'settleAccountsModeSet',
                label: '结算模式设置'
              }
            ]
          },

          {
            path: 'areaManage',
            label: '区域管理',
            children: [
              {
                path: 'lineList',
                label: '线路列表'
              },
              {
                path: 'areaEdit',
                label: '区域编辑'
              }
            ]
          },

          {
            path: 'finance',
            label: '财务',
            children: [
              {
                path: 'receiptVerify',
                label: '回单审核'
              },
              {
                path: 'paymentVerify',
                label: '交款审核'
              },
              {
                path: 'billMake',
                label: '账单生成'
              },
              {
                path: 'merchatSettleAccounts',
                label: '商家结算'
              }
            ]
          },

          {
            path: 'adminSet',
            label: '管理员设置',
            children: [
              {
                path: 'adminList',
                label: '管理员列表'
              },
              {
                path: 'authoritySet',
                label: '权限设置'
              },
              {
                path: 'opLog',
                label: '操作日志'
              },
              {
                path: 'fareSet',
                label: '费用设置'
              }
            ]
          },

          {
            path: 'echart',
            label: 'echart',
            children: [
              {
                path: 'bar',
                label: '柱状图'
              }
            ]
          },

          {
            path: 'editor',
            label: '富文本',
            children: [
              {
                path: 'markDown',
                label: 'markDown编辑器'
              }
            ]
          }
        ],
        defaultProps: {
          label: 'label',
          children: 'children'
        }
      }
    },
    methods: {
      handleClick(row) {
        let id = row.id;
        /* 假装模拟数据 */
        this.userName = row.name;
        this.treeShow = true;
        this.tableShow = false;
      },
      sure() {
        this.$message({
          message: '修改成功',
          type: 'success'
        });
        /* 跟计算属性获取path级路由去重， */
        this.tableShow = true;
        this.treeShow = false;
      }
    },
    computed: {
      pathRoutes() {
        let pathRoutes = [];
        this.data2.map(function(item) {
          pathRoutes.push(item.path);
        });
      }
    }
  }
</script>

<style>
  .outBox {
    padding: 10px;
  }
  .userPage {
    border-bottom: 1px solid #ccc;
    color: #ccc;
    padding: 5px;
  }
</style>
