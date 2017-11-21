<template>
  <div>
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
  </div>
</template>
