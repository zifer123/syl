<template>
  <div>
    <div style="width: 400px;">
      <el-select filterable @change="addConditions" v-model="optionsSelected" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-row>
        <template v-for="i in conditions">
          <el-col :span="6">
            {{ i.label }}
          </el-col>
          <el-col :span="18">
            <el-input v-model="postData[i.name]"></el-input>
          </el-col>
        </template>
      </el-row>
    </div>
    <el-table
      :data="tableData6"
      border
      height="200"
      show-summary
      style="width: 100%; margin-top: 20px">
      <el-table-column
        prop="id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="amount1"
        label="数值 1（元）">
      </el-table-column>
      <el-table-column
        prop="amount2"
        sortable
        label="数值 2（元）">
      </el-table-column>
      <el-table-column
        prop="amount3"
        sortable
        label="数值 3（元）">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    methods: {
      handleClick(row) {
        console.log(row);
      },
      addConditions(val) {
        /* 判断已经选择过的，然后去除 */
        this.conditions.push({
          name: val
        })
      }
    },

    data() {
      return {
        optionsSelected: '',
        conditions: [],
        postData: {},
        options: [
          {
            label: '手机号',
            value: 'phone'
          },
          {
            label: '爱的号',
            value: 'love'
          },
          {
            label: '是否活跃',
            value: 'isActive'
          }
        ],
        tableData6: [{
          id: '12987122',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        }, {
          id: '12987123',
          name: '王小虎',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        }, {
          id: '12987124',
          name: '王小虎',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        }, {
          id: '12987125',
          name: '王小虎',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        }, {
          id: '12987126',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }]
      }
    }
  }
</script>
