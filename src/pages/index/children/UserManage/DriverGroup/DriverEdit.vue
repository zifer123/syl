<template>
  <div>
    {{ num }}
    <el-form :model="ruleForm" style="width: 50%;" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="名称">
        <el-input v-model="ruleForm.sn"></el-input>
      </el-form-item>

      <el-form-item label="简称">
        <el-input v-model="ruleForm.driverShortName"></el-input>
      </el-form-item>

      <el-form-item label="区域">
        <el-cascader
          :options="addressInfo"
          filterable
          style="width: 100%"
          :props="props"
          v-model="ruleForm.addressInfo"
        ></el-cascader>
      </el-form-item>

      <el-form-item label="详细地址">
        <el-input v-model="ruleForm.doorCode"></el-input>
      </el-form-item>

      <el-form-item label="联系方式">
        <el-button @click="addContact" type="primary">增加联系方式</el-button>
        <el-form-item v-for="(contact,index) in ruleForm.contacts" :label="`联系方式${index+1}`" :key="index+1">
          <div class="flexBox">
            <el-input class="flexItem" v-model="contact.value"></el-input>
            <el-button type="danger" @click="removeContact(contact)">删除</el-button>
          </div>
        </el-form-item>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交并打印</el-button>
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
          addressInfo: ['广东省','深圳市','罗湖区','桂园街道'],
          contacts: [
            {
              value: ''
            }
          ]
        }, //存储发送的信息（初始化的信息）
        rules: {

        }
      }
    },
    methods: {
      handleItemChange(row) {
        console.log(row);
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
