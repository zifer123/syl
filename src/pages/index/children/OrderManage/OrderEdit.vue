<template>
  <el-row>
    <el-col :span="16">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="订单编号">
          <el-input v-model="ruleForm.sn"></el-input>
        </el-form-item>
        <el-form-item label="汽配商" prop="merchat">
          <el-autocomplete v-model="ruleForm.merchat"
            :fetch-suggestions="filterMerchat"
            placeholder="选择汽配商"
            style="width: 100%;"
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
            style="width: 100%;"
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
          <el-col :span="5">
            <el-form-item prop="totalPrice" :rules="[
              { required: true, message: '请输入'},
              { type: 'number', message: '请输入正确的数值'}
            ]"
            >
              <el-input  placeholder="总金额" v-model.number="ruleForm.totalPrice"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2" style="text-align: center;">-</el-col>
          <el-col :span="5">
            <el-form-item prop="productNum" :rules="[
              { required: true, message: '请输入'},
              { type: 'number', message: '请输入正确的数值'}
            ]">
              <el-input placeholder="数量" v-model.number="ruleForm.productNum"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-radio v-model="ruleForm.paymentMode" label="cash">现金</el-radio>
            <el-radio v-model="ruleForm.paymentMode" label="onAccount">挂账</el-radio>
          </el-col>
        </el-form-item>

        <el-form-item label="特殊选项" prop="options">
          <el-checkbox-group v-model="ruleForm.options">
            <el-checkbox v-for="option in options" :label="option.id" :key="option.id">{{option.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="运费明细" prop="freight">
          <el-tag>总价: {{ allPrice }}元</el-tag>
          <el-tag>手续费: <span v-text="state.handFare"></span>元</el-tag>
          <el-tag>偏远地区: <span v-text="state.remoteAreaFare"></span>元</el-tag>
          <el-tag>汽配商: <span v-text="state.merchatFare"></span>元</el-tag>
          <el-tag>维修厂: <span v-text="state.workshopFare"></span>元</el-tag>
          <el-tag>特殊: <span v-text="state.optionsFare"></span>元</el-tag>
        </el-form-item>

        <el-form-item label="结算方式" prop="freightPaymentMode">
          <el-radio v-model="ruleForm.freightPaymentMode" label="1">月结</el-radio>
          <el-radio v-model="ruleForm.freightPaymentMode" label="2">现付</el-radio>
          <el-radio v-model="ruleForm.freightPaymentMode" label="2">到付</el-radio>
        </el-form-item>

        <el-form-item label="仓库选择" prop="desc">
          <el-radio v-model="ruleForm.warehouse" label="1">淡水仓</el-radio>
          <el-radio v-model="ruleForm.warehouse" label="2">奥特仓</el-radio>
          <el-radio v-model="ruleForm.warehouse" label="2">远古仓</el-radio>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交并打印</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-col :span="8">
      快速通道
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data() {
      return {
        merchatInfo: [],// 汽配商信息
        workshopInfo: [],// 汽配商信息
        state: {
          merchatMessage: false,// 选择汽配商之后的信息
          workshopMessage: false,// 选择维修厂之后的信息
          handFare: 0,// 手续费
          remoteAreaFare: 0,// 偏远费
          merchatFare: 0,// 汽配商费用
          workshopFare: 0,// 维修厂费用
          optionsFare: 0// 特殊费用
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
        options: [
          {
            id: 1,
            name: "前叶子板",
            fare: 15
          },
          {
            id: 2,
            name: "保险杠",
            fare: 15
          },
          {
            id: 3,
            name: "机盖",
            fare: 15
          },
          {
            id: 4,
            name: "车门",
            fare: 15
          },
          {
            id: 5,
            name: "重、大、多",
            fare: 15
          },
          {
            id: 6,
            name: "偏重、偏大、偏多",
            fare: 15
          },
          {
            id: 7,
            name: "超大、超重、超多",
            fare: 15
          },
          {
            id: 8,
            name: "特殊件",
            fare: 15
          }
        ],
        ruleForm: {
          name: '',
          merchat: '',
          date1: '',
          date2: '',
          paymentMode: 'cash',
          options: [],
          freightPaymentMode: '1',
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          merchat: [
            { required: true, message: '请选择汽配商', trigger: 'blur' }
          ],
          workshop: [
            { required: true, message: '请选择维修厂', trigger: 'blur' }
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
    computed: {
      allPrice() {
        return this.state.handFare+this.state.remoteAreaFare+this.state.merchatFare+this.state.workshopFare+this.state.optionsFare;
      }
    },
    created() {
      this.loadMerchatInfo();
      this.loadWorkshopInfo();
    }
  }
</script>

<style scoped>
  .flexBox {
    display: flex;
  }
  .flexBox .flexItem {
    flex: 1;
  }
</style>
