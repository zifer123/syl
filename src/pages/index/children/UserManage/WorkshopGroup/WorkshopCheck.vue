<template>
  <div>
    <h4 class="page-header">
      <el-button @click="showHeader" type="primary" plain>查询<i class="el-icon-zoom-in el-icon--right"></i></el-button>
    </h4>

    <el-dialog
      title="司机组筛选"
      :visible.sync="headerShow"
      width="80%">
      <el-row :gutter="20">
        <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
          <div class="flexBox">
            <label>开始日期:</label>
            <el-date-picker
              class="item"
              v-model="postData.startTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间">
            </el-date-picker>
          </div>
        </el-col>

        <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
          <div class="flexBox">
            <label>结束日期:</label>
            <el-date-picker
              class="item"
              v-model="postData.endTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="注册时间">
            </el-date-picker>
          </div>
        </el-col>

        <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
          <div class="flexBox">
            <label>姓名:</label>
            <el-input class="item" v-model="postData.userName" placeholder="姓名"></el-input>
          </div>
        </el-col>

        <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
          <div class="flexBox">
            <label>公司简称:</label>
            <el-input class="item" v-model="postData.companyShortName" placeholder="公司简称"></el-input>
          </div>
        </el-col>

        <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
          <div class="flexBox">
            <label>联系方式:</label>
            <el-input class="item" v-model="postData.contact" placeholder="手机、电话"></el-input>
          </div>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="search">确 定</el-button>
      </span>
    </el-dialog>

    <el-input v-model="keyWord" placeholder="输入可筛选姓名"></el-input>
    <el-table
      :data="newdatas"
      border
      v-loading="tableLoading"
      height="450"
      style="width: 100%;">
      <el-table-column
        fixed="left"
        type="index">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="role"
        label="角色"
        width="120">
      </el-table-column>
      <el-table-column
        prop="addTime"
        label="注册时间"
        width="200">
      </el-table-column>
      <el-table-column
        prop="level"
        label="等级"
        width="120">
      </el-table-column>
      <el-table-column
        prop="companyName"
        label="公司全称"
        width="200">
      </el-table-column>
      <el-table-column
        prop="companyShortName"
        label="公司简称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="relatedAccount"
        label="关联账号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="contact"
        label="联系方式"
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        width="400">
        <template slot-scope="scope">
          <el-tag type="success" v-text="scope.row.province"></el-tag>
          <el-tag type="info" v-text="scope.row.city"></el-tag>
          <el-tag type="warning" v-text="scope.row.district"></el-tag>
          <el-tag type="danger" v-text="scope.row.street"></el-tag>
          <el-tag v-text="scope.row.doorCode"></el-tag>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="primary" size="small">编辑</el-button>
          <el-button @click="delete(scope.row)" type="primary" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="page.currentPage"
      layout="total, prev, pager, next, jumper"
      :total="page.totalPage">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      let newDate = new Date();
      let year = newDate.getFullYear();
      let month = newDate.getMonth()+1;
      let date = newDate.getDate();
      return {
        headerShow: false,
        tableLoading: false,
        datas: [],
        postData: {
          startTime: `${year}-${month}-${date} 00:00:00`,
          endTime: `${year}-${month}-${date} 23:59:59`,
          accountName: '',
          companyShortName: '',
          contact: ''
        },
        keyWord: '',
        page: {
          currentPage: 1,
          totalPage: 100
        }
      }
    },
    methods: {
      /* 显示筛选条件 */
      showHeader() {
        this.headerShow = true;
      },
      /* 搜索 */
      search() {
        this.headerShow = false;
        console.log(this.postData);
        this.tableLoading = true;
        this.fetchDatas();
        setTimeout(function() {
          this.tableLoading = false;
          this.datas = [];
        }.bind(this),2000);
      },
      /* 获取信息 */
      fetchDatas(currentPage=1) {
        let _this = this;
        _this.datas = [
          {
            "id": 1,
            "accountName": "一笑而过",
            "userName": "沈培行",
            "role": 2,
            "addTime": "2017-11-19 11:29:59",
            "level": 1,
            "companyName": "时运来物流公司",
            "companyShortName": "时运来",
            "contact": "175039609083",
            "address": "",
            "province": "河南省",
            "city": "驻马店市",
            "district": "密阳县",
            "street": "爱而化街道",
            "doorCode": "82栋501"
          },
          {
            "id": 2,
            "accountName": "撒大声道",
            "userName": "朱德胜",
            "role": 2,
            "addTime": "2017-11-19 11:29:59",
            "level": 1,
            "companyName": "长丰爱得利公司",
            "companyShortName": "长丰",
            "contact": "15368495681",
            "address": "",
            "province": "广东省",
            "city": "深圳市",
            "district": "龙华区",
            "street": "奥德利",
            "doorCode": "82栋501"
          },
          {
            "id": 3,
            "accountName": "发现所谓",
            "userName": "李白白",
            "role": 2,
            "addTime": "2017-11-19 11:29:59",
            "level": 1,
            "companyName": "瑞星的得利公司",
            "companyShortName": "瑞星",
            "contact": "13417055555",
            "address": "",
            "province": "广东省",
            "city": "汕尾市",
            "district": "陆河县",
            "street": "其他街道",
            "doorCode": "82栋501"
          },
          {
            "id": 3,
            "accountName": "发现所谓",
            "userName": "李白白",
            "role": 2,
            "addTime": "2017-11-19 11:29:59",
            "level": 1,
            "companyName": "瑞星的得利公司",
            "companyShortName": "瑞星",
            "contact": "13417055555",
            "address": "",
            "province": "广东省",
            "city": "汕尾市",
            "district": "陆河县",
            "street": "其他街道",
            "doorCode": "82栋501"
          },
          {
            "id": 3,
            "accountName": "发现所谓",
            "userName": "李白白",
            "role": 2,
            "addTime": "2017-11-19 11:29:59",
            "level": 1,
            "companyName": "瑞星的得利公司",
            "companyShortName": "瑞星",
            "contact": "13417055555",
            "address": "",
            "province": "广东省",
            "city": "汕尾市",
            "district": "陆河县",
            "street": "其他街道",
            "doorCode": "82栋501"
          },
          {
            "id": 3,
            "accountName": "发现所谓",
            "userName": "李白白",
            "role": 2,
            "addTime": "2017-11-19 11:29:59",
            "level": 1,
            "companyName": "瑞星的得利公司",
            "companyShortName": "瑞星",
            "contact": "13417055555",
            "address": "",
            "province": "广东省",
            "city": "汕尾市",
            "district": "陆河县",
            "street": "其他街道",
            "doorCode": "82栋501"
          },
          {
            "id": 3,
            "accountName": "发现所谓",
            "userName": "李白白",
            "role": 2,
            "addTime": "2017-11-19 11:29:59",
            "level": 1,
            "companyName": "瑞星的得利公司",
            "companyShortName": "瑞星",
            "contact": "13417055555",
            "address": "",
            "province": "广东省",
            "city": "汕尾市",
            "district": "陆河县",
            "street": "其他街道",
            "doorCode": "82栋501"
          },
          {
            "id": 3,
            "accountName": "发现所谓",
            "userName": "李白白",
            "role": 2,
            "addTime": "2017-11-19 11:29:59",
            "level": 1,
            "companyName": "瑞星的得利公司",
            "companyShortName": "瑞星",
            "contact": "13417055555",
            "address": "",
            "province": "广东省",
            "city": "汕尾市",
            "district": "陆河县",
            "street": "其他街道",
            "doorCode": "82栋501"
          },
          {
            "id": 3,
            "accountName": "发现所谓",
            "userName": "李白白",
            "role": 2,
            "addTime": "2017-11-19 11:29:59",
            "level": 1,
            "companyName": "瑞星的得利公司",
            "companyShortName": "瑞星",
            "contact": "13417055555",
            "address": "",
            "province": "广东省",
            "city": "汕尾市",
            "district": "陆河县",
            "street": "其他街道",
            "doorCode": "82栋501"
          },
          {
            "id": 3,
            "accountName": "发现所谓",
            "userName": "李白白",
            "role": 2,
            "addTime": "2017-11-19 11:29:59",
            "level": 1,
            "companyName": "瑞星的得利公司",
            "companyShortName": "瑞星",
            "contact": "13417055555",
            "address": "",
            "province": "广东省",
            "city": "汕尾市",
            "district": "陆河县",
            "street": "其他街道",
            "doorCode": "82栋501"
          },
          {
            "id": 3,
            "accountName": "发现所谓",
            "userName": "李白白",
            "role": 2,
            "addTime": "2017-11-19 11:29:59",
            "level": 1,
            "companyName": "瑞星的得利公司",
            "companyShortName": "瑞星",
            "contact": "13417055555",
            "address": "",
            "province": "广东省",
            "city": "汕尾市",
            "district": "陆河县",
            "street": "其他街道",
            "doorCode": "82栋501"
          },
          {
            "id": 3,
            "accountName": "发现所谓",
            "userName": "李白白",
            "role": 2,
            "addTime": "2017-11-19 11:29:59",
            "level": 1,
            "companyName": "瑞星的得利公司",
            "companyShortName": "瑞星",
            "contact": "13417055555",
            "address": "",
            "province": "广东省",
            "city": "汕尾市",
            "district": "陆河县",
            "street": "其他街道",
            "doorCode": "82栋501"
          },
          {
            "id": 3,
            "accountName": "发现所谓",
            "userName": "李白白",
            "role": 2,
            "addTime": "2017-11-19 11:29:59",
            "level": 1,
            "companyName": "瑞星的得利公司",
            "companyShortName": "瑞星",
            "contact": "13417055555",
            "address": "",
            "province": "广东省",
            "city": "汕尾市",
            "district": "陆河县",
            "street": "其他街道",
            "doorCode": "82栋501"
          },
          {
            "id": 3,
            "accountName": "发现所谓",
            "userName": "李白白",
            "role": 2,
            "addTime": "2017-11-19 11:29:59",
            "level": 1,
            "companyName": "瑞星的得利公司",
            "companyShortName": "瑞星",
            "contact": "13417055555",
            "address": "",
            "province": "广东省",
            "city": "汕尾市",
            "district": "陆河县",
            "street": "其他街道",
            "doorCode": "82栋501"
          },
          {
            "id": 3,
            "accountName": "发现所谓",
            "userName": "李白白",
            "role": 2,
            "addTime": "2017-11-19 11:29:59",
            "level": 1,
            "companyName": "瑞星的得利公司",
            "companyShortName": "瑞星",
            "contact": "13417055555",
            "address": "",
            "province": "广东省",
            "city": "汕尾市",
            "district": "陆河县",
            "street": "其他街道",
            "doorCode": "82栋501"
          },
          {
            "id": 3,
            "accountName": "发现所谓",
            "userName": "李白白",
            "role": 2,
            "addTime": "2017-11-19 11:29:59",
            "level": 1,
            "companyName": "瑞星的得利公司",
            "companyShortName": "瑞星",
            "contact": "13417055555",
            "address": "",
            "province": "广东省",
            "city": "汕尾市",
            "district": "陆河县",
            "street": "其他街道",
            "doorCode": "82栋501"
          },
          {
            "id": 3,
            "accountName": "发现所谓",
            "userName": "李白白",
            "role": 2,
            "addTime": "2017-11-19 11:29:59",
            "level": 1,
            "companyName": "瑞星的得利公司",
            "companyShortName": "瑞星",
            "contact": "13417055555",
            "address": "",
            "province": "广东省",
            "city": "汕尾市",
            "district": "陆河县",
            "street": "其他街道",
            "doorCode": "82栋501"
          },
        ];
        this.$http.get('/api/xxxx',{
          params: {
            ..._this.postData,
            currentPage
          }
        }).then(function(body) {
          _this.datas = body.data.results;
        });
      },
      /* 编辑信息 */
      edit(row) {
        this.$router.push({
          path: '/UserManage/WorkshopGroup/WorkshopEdit',
          query: {
            id: row.id
          }
        })
      },
      /* 删除信息 */
      delete(row) {
        console.log(row.id)
      },

      handleCurrentChange(currentPage) {
        this.fetchDatas(currentPage);
      }
    },
    computed: {
      newdatas() {
        return this.datas.filter((item) => {
          return item.userName.toLowerCase().indexOf(this.keyWord.toLowerCase())!=-1;
        })
      }
    },
    created() {
      let currentPage = this.page.currentPage;
      this.fetchDatas(currentPage);
    }
  }
</script>

<style scoped>
  .flexBox {
    line-height: 35px;
    display: flex;
    margin: 10px 0;
  }
  .flexBox label {
    width: 100px;
  }
  .flexBox .item {
    flex: 1;
  }
</style>
