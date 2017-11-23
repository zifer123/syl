<template>
  <div>
    <h4 class="page-header">
      <el-button type="text" icon="el-icon-zoom-in">筛选</el-button>
      <el-radio-group v-model="group" @change="fetchDatas">
        <el-radio-button :label="0">所有</el-radio-button>
        <el-radio-button :label="2">司机组</el-radio-button>
        <el-radio-button :label="4">汽配商组</el-radio-button>
        <el-radio-button :label="5">司机组</el-radio-button>
      </el-radio-group>
    </h4>

    <el-input v-model="keyWord" placeholder="输入可筛选姓名"></el-input>
    <el-table
      :data="newDatas"
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
          <el-button @click="editDeiver(scope.row)" type="primary" size="small">编辑</el-button>
          <el-button @click="deleteDeiver(scope.row)" type="primary" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="page.currentPage"
      :page-sizes="page.sizes"
      layout="total, sizes, prev, pager, next, jumper"
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
        tableLoading: false,
        datas: [],
        postData: {
          startTime: `${year}-${month}-${date} 00:00:00`,
          endTime: `${year}-${month}-${date} 23:59:59`,
          userName: '',
          companyShortName: '',
          contact: ''
        },
        group: 0,//筛选组值
        keyWord: '',// 关键词
        page: {
          currentPage: 1,
          totalPage: 100,
          sizes: [20, 40, 60, 80,100],
          size: 20
        }
      }
    },
    methods: {
      /* 获取信息 */
      fetchDatas(currentPage=1,size=20) {
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
            currentPage,
            size
          }
        }).then(function(body) {
          _this.driverInfo = body.data.results;
        });
      },
      /* 审核信息 */
      editDeiver(row) {
        this.$router.push({
          path: '/UserManage/DriverGroup/DriverEdit',
          query: {
            id: row.id
          }
        })
      },
      /* 删除信息 */
      deleteDeiver(row) {
        console.log(row.id)
      },

      /* 分页 */
      handleSizeChange(size) {
        /* 因为element没有提供currentChange能拿到size的api，所以只能通过这样获取 */
        this.page.size = size;
        let currentPage = this.page.currentPage;
        this.fetchDatas(currentPage,size);
      },
      handleCurrentChange(currentPage) {
        let size = this.page.size;
        this.fetchDatas(currentPage,size);
      }
    },
    computed: {
      newDatas() {
        return this.datas.filter((item) => {
          return item.userName.toLowerCase().indexOf(this.keyWord.toLowerCase())!=-1;
        })
      }
    },
    created() {
      let currentPage = this.page.currentPage;
      let size = this.page.size;
      this.fetchDatas(currentPage,size);
    }
  }
</script>

<style scoped>
  .page-header {
    border-bottom: 1px solid #ccc;
    font-weight: 100;
    margin-bottom: 10px;
  }
</style>
