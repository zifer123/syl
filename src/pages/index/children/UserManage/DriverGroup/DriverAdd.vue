<template>
  <div>
    <el-form :model="ruleForm" style="width: 50%;" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="微信用户名" prop="wxName">
        <el-input disabled="" v-model="ruleForm.wxName"></el-input>
      </el-form-item>

      <el-form-item label="真实姓名" prop="userName">
        <el-input v-model="ruleForm.userName"></el-input>
      </el-form-item>

      <el-form-item label="联系方式" prop="contact">
        <el-input v-model="ruleForm.contact"></el-input>
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

      <el-form-item label="类型选择" prop="level">
        <el-select v-model="ruleForm.level" placeholder="请选择">
          <el-option label="直线" :value="3"></el-option>
          <el-option label="干线" :value="1"></el-option>
          <el-option label="支线" :value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="线路选择" prop="level">
        <el-checkbox-group v-model="ruleForm.lines">
          <el-checkbox v-for="line in lines" :label="line.value" :key="line.value">{{ line.label }}</el-checkbox>
        </el-checkbox-group>
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
        lines: [],//线路
        ruleForm: {
          addressInfo: [],//['广东省','深圳市','罗湖区','桂园街道']
          level: 3,
          lines: [23,24]
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    activated() {
      console.log(55);
      this.lines = [
        {
          value: 23,
          label: '观澜线'
        },
        {
          value: 24,
          label: '凤岗线'
        },
        {
          value: 25,
          label: '淡水线'
        },
        {
          value: 26,
          label: '坪山线'
        },
        {
          value: 27,
          label: '龙岗线'
        },
        {
          value: 28,
          label: '布吉线'
        },
        {
          value: 29,
          label: '南山线'
        },
      ];
      console.log(66)
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
