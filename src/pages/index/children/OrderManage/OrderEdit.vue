<template>
  <el-row>
    <el-col :span="12">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="订单编号">
          <el-input v-model="ruleForm.sn"></el-input>
        </el-form-item>
        <el-form-item label="汽配商" prop="merchat">
          <el-autocomplete v-model="ruleForm.merchat"
            :fetch-suggestions="filterMerchat"
            placeholder="选择汽配商"
            @select="merchatSelect">
            <template slot-scope="props">
              <div>{{ props.item.name }}</div>
            </template>
          </el-autocomplete>
          <div v-show="state.merchatMessage">
            <el-tag v-text="merchatMessage.phone"></el-tag>
            <el-tag v-text="merchatMessage.address">广东省汕尾市陆河县岁宝百货12号街旁边</el-tag>
            <el-tag v-text="merchatMessage.fare">￥15</el-tag>
          </div>
        </el-form-item>

        <el-form-item label="维修厂" prop="workshop">
          <el-autocomplete v-model="ruleForm.workshop"
            :fetch-suggestions="filterWorkshop"
            placeholder="选择维修厂"
            @select="workshopSelect">
            <template slot-scope="props">
              <div>{{ props.item.name }}</div>
            </template>
          </el-autocomplete>
          <div v-show="state.workshopMessage">
            <el-tag v-text="workshopMessage.phone"></el-tag>
            <el-tag v-text="workshopMessage.address">广东省汕尾市陆河县岁宝百货12号街旁边</el-tag>
            <el-tag v-text="workshopMessage.fare">￥15</el-tag>
          </div>
        </el-form-item>

        <el-form-item label="货物" required>
          <el-col :span="8">
            <el-input placeholder="总金额"></el-input>
          </el-col>
          <el-col :span="8">
            <el-input placeholder="数量"></el-input>
          </el-col>
          <el-col :span="8">

          </el-col>
        </el-form-item>
        <el-form-item label="即时配送" prop="delivery">
          <el-switch v-model="ruleForm.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="活动性质" prop="type">
          <el-checkbox-group v-model="ruleForm.type">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源" prop="resource">
          <el-radio-group v-model="ruleForm.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-col :span="12"></el-col>
  </el-row>
</template>

<script>
  export default {
    data() {
      return {
        merchatInfo: [],// 汽配商信息
        workshopInfo: [],// 汽配商信息
        state: {
          merchatMessage: false,
          workshopMessage: false
        },// 存储状态
        merchatMessage: {
          phone: '',
          address: '',
          fare: 15
        },// 选择汽配商之后的详细信息
        workshopMessage: {
          phone: '',
          address: '',
          fare: 15
        },// 选择维修厂之后的详细信息
        ruleForm: {
          name: '',
          merchat: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          sn: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      /* 过滤汽配商 */
      filterMerchat(queryString,cb) {
        let filterDatas = '';
        if(queryString) {
          filterDatas = this.merchatInfo.filter(function(item) {
            return item.name.toLowerCase().indexOf(queryString.toLowerCase())!=-1;
          });
        }else {
          this.state.merchatMessage = false;
          filterDatas = this.merchatInfo;
        }
        cb(filterDatas);
      },
      /* ajax加载汽配商信息 */
      loadMerchatInfo() {
        this.merchatInfo = [
          {
            name: "新锐",
            id: 1,
            address: "广东",
            fare: 15,
            phone: 13851461798
          },
          {
            name: "鹏达",
            id: 2,
            fare: 15,
            address: "汕尾",
            phone: 13826459871
          },
          {
            name: "长丰",
            id: 3,
            fare: 15,
            address: "汕头",
            phone: 1385461178
          },
        ]
      },
      /* 选择汽配商 */
      merchatSelect(row) {
        this.ruleForm.merchat = row.name;
        this.ruleForm.merchatId = row.id;
        this.state.merchatMessage = true;
        this.merchatMessage.phone = row.phone?row.phone:'#';
        this.merchatMessage.address = row.address?row.address:'#';
        this.merchatMessage.fare = row.fare?row.fare:'#';
      },

      /* 过滤维修厂 */
      filterWorkshop(queryString,cb) {
        let filterDatas = '';
        if(queryString) {
          filterDatas = this.workshopInfo.filter(function(item) {
            return item.name.toLowerCase().indexOf(queryString.toLowerCase())!=-1;
          });
        }else {
          this.state.workshopMessage = false;
          filterDatas = this.workshopInfo;
        }
        cb(filterDatas);
      },
      /* ajax加载汽配商信息 */
      loadWorkshopInfo() {
        this.workshopInfo = [
          {
            name: "小林汽修",
            id: 1,
            address: "广东",
            phone: 13851461798
          },
          {
            name: "爱的汽修",
            id: 2,
            address: "汕尾",
            phone: 13826459871
          },
          {
            name: "或二大汽修",
            id: 3,
            address: "汕头",
            phone: 1385461178
          },
        ]
      },
      /* 选择汽配商 */
      workshopSelect(row) {
        this.ruleForm.workshop = row.name;
        this.ruleForm.workshopId = row.id;
        this.state.workshopMessage = true;
        this.workshopMessage.phone = row.phone?row.phone:'#';
        this.workshopMessage.address = row.address?row.address:'#';
        this.workshopMessage.fare = row.fare?row.fare:'#';
      },

      /* 表单提交 */
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.ruleForm);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    created() {
      this.loadMerchatInfo();
      this.loadWorkshopInfo();
    }
  }
</script>
