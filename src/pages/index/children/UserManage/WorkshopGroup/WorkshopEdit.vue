<template>
  <div>
    <el-button @click="back" icon="el-icon-back" type="primary">返回</el-button>
    <el-form :model="ruleForm" style="width: 50%;" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="微信用户名" prop="wxName">
        <el-input disabled="" v-model="ruleForm.wxName"></el-input>
      </el-form-item>

      <el-form-item label="真实姓名" prop="userName">
        <el-input v-model="ruleForm.userName"></el-input>
      </el-form-item>

      <el-form-item label="公司全称" prop="companyName">
        <el-input v-model="ruleForm.companyName"></el-input>
      </el-form-item>

      <el-form-item label="公司简称" prop="companyShortName">
        <el-input v-model="ruleForm.companyShortName"></el-input>
      </el-form-item>

      <el-form-item label="区域" prop="addressInfo">
        <el-cascader
          :options="addressInfo"
          filterable
          style="width: 100%"
          :props="props"
          v-model="ruleForm.addressInfo"
        ></el-cascader>
      </el-form-item>

      <el-form-item label="详细地址" prop="doorCode">
        <el-input v-model="ruleForm.doorCode"></el-input>
      </el-form-item>

      <el-form-item label="联系方式">
        <el-button @click="addContact" type="primary">增加联系方式</el-button>
        <el-form-item v-for="(contact,index) in ruleForm.contacts" :label="`联系方式${index+1}`" :key="index+1">
          <div class="flexBox">
            <el-input class="flexItem" placeholder="电话、手机" v-model="contact.phone"></el-input>
            <el-input class="flexItem" placeholder="称呼" v-model="contact.name"></el-input>
            <el-button type="danger" @click="removeContact(contact)">删除</el-button>
          </div>
        </el-form-item>
      </el-form-item>

      <el-form-item label="基础运费" prop="addFare">
        <el-input v-model.number="ruleForm.addFare"></el-input>
      </el-form-item>

      <el-form-item label="等级设置" prop="level">
        <el-radio-group v-model="ruleForm.level">
          <el-radio label="1">普通</el-radio>
          <el-radio label="2">偏远</el-radio>
          <el-radio label="3">拉黑</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        num: this.$store.state.num,
        props: {
          value: 'name',
          label: 'name',
          children: 'childs'
        },// 存储级联动prop的信息
        addressInfo: this.$store.state.addressInfo, //存储地址信息
        ruleForm: {
          addressInfo: [],//['广东省','深圳市','罗湖区','桂园街道']
          contacts: [
            {
              phone: '',
              name: ''
            }
          ],
          addFare: ''
        }, //存储发送的信息（初始化的信息）
        rules: {
          companyName: [
            { required: true, message: '请输入名称' }
          ],
          companyShortName: [
            { required: true, message: '请输入简称' }
          ],
          addressInfo: [
            { required: true, message: '请选择地址信息' }
          ],
          doorCode: [
            { required: true, message: '请填写详细地址信息' }
          ],
          addFare: [
            { required: true, message: '请输入费用' },
            { type: 'number', message: '请输入数字' }
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$message({
              message: '提交成功',
              type: 'success'
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      /* 增加联系方式 */
      addContact() {
        this.ruleForm.contacts.push({
          value: ''
        })
      },
      /* 删除联系方式 */
      removeContact(item) {
        let index = this.ruleForm.contacts.indexOf(item);
        this.ruleForm.contacts.splice(index,1);
      },
      back() {
        this.$router.go(-1);
      }
    },
    activated() {
      console.log(1)
    }
  }
</script>

<style scoped>
  .flexBox {
    display: flex;
    /*margin: 5px 0;*/
  }
  .flexBox .flexItem {
    flex: 1;
    margin-right: 5px;
  }
  .el-form-item .el-form-item {
    margin-bottom: 10px;
  }
</style>
