<template>
  <el-container>
    <h4 class="page-header">
      <el-button @click="showHeader" type="primary" plain>筛选条件<i class="el-icon-zoom-in el-icon--right"></i></el-button>
    </h4>

    <el-header height="" v-show="headerShow">
      <el-row :gutter="20">
        <el-col :span="4">
          起始时间：
          <el-select v-model="value8" filterable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>

        <el-col :span="4">
          结束时间：
          <el-select v-model="value8" filterable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>

        <el-col :span="4">
          汽配商名称：
          <el-select v-model="value8" filterable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>

        <el-col :span="4">
          维修厂名称：
          <el-select v-model="value8" filterable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>

        <el-col :span="4">
          订单状态：
          <el-select v-model="value8" filterable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>



        <el-col :span="4">
          货物付款方式：
          <el-select v-model="value8" filterable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>

        <el-col :span="4">
          运费付款方式：
          <el-select v-model="value8" filterable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>

        <el-col :span="4">
          配送状态：
          <el-select v-model="value8" filterable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>

        <el-col :span="4">
          回单状态：
          <el-select v-model="value8" filterable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>

        <el-col :span="4">
          交款状态：
          <el-select v-model="value8" filterable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>

        <el-col :span="4">
          账单状态：
          <el-select v-model="value8" filterable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>

        <el-col :span="4">
          结算状态：
          <el-select v-model="value8" filterable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>

        <el-col :span="4">
          录单员：
          <el-select v-model="value8" filterable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>

        <el-col :span="4">
          目的地：
          <el-cascader
            expand-trigger="hover"
            :options="destination"
            v-model="selectedOptions2">
          </el-cascader>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-table
        :data="orderInfo"
        height="750px"
        style="width: 100%;">
        <el-table-column
          fixed
          prop="date"
          sortable
          label="日期"
          width="150">
        </el-table-column>
        <el-table-column
          prop="sn"
          label="单号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="merchat"
          label="汽配商"
          width="120">
        </el-table-column>
        <el-table-column
          prop="workshop"
          label="维修厂"
          width="120">
        </el-table-column>
        <el-table-column
          prop="allPrice"
          label="货款金额"
          width="300">
        </el-table-column>
        <el-table-column label="支付方式">
          <el-table-column
            prop="cash"
            label="现金"
            width="120">
          </el-table-column>
          <el-table-column
            prop="guazhang"
            label="挂账"
            width="120">
          </el-table-column>
        </el-table-column>
        <el-table-column
          prop="yunfei"
          label="运费"
          width="120">
        </el-table-column>
        <el-table-column label="运费支付方式">
          <el-table-column
            prop="xianfu"
            label="现付"
            width="120">
          </el-table-column>
          <el-table-column
            prop="dapfu"
            label="到付"
            width="120">
          </el-table-column>
          <el-table-column
            prop="yuejie"
            label="月结"
            width="120">
          </el-table-column>
        </el-table-column>
        <el-table-column
          prop="tuihuojine"
          label="退货金额"
          width="120">
        </el-table-column>
        <el-table-column
          prop="order_status"
          label="订单状态"
          width="120">
        </el-table-column>
        <el-table-column
          prop="peisong_status"
          label="配送状态"
          width="120">
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        headerShow: false,
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        destination: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }],
        selectedOptions2: [],
        value8: '',
        orderInfo: [
          {
            date: '2001-11-02 17:03:57',
            sn: 17110217035968,
            merchat: '新锐汽配',
            workshop: '大兴哈哈',
            allPrice: 250,
            cash: '',
            guazhang: 85,
            yunfei: 30
          },
          {
            date: '2001-11-02 17:03:57',
            sn: 17110217035968,
            merchat: '新锐汽配',
            workshop: '大兴哈哈',
            allPrice: 250,
            cash: '',
            guazhang: 85
          },
          {
            date: '2001-11-02 17:03:57',
            sn: 17110217035968,
            merchat: '新锐汽配',
            workshop: '大兴哈哈',
            allPrice: 250,
            cash: '',
            guazhang: 85
          },
          {
            date: '2001-11-02 17:03:57',
            sn: 17110217035968,
            merchat: '新锐汽配',
            workshop: '大兴哈哈',
            allPrice: 250,
            cash: '',
            guazhang: 85
          },
          {
            date: '2001-11-02 17:03:57',
            sn: 17110217035968,
            merchat: '新锐汽配',
            workshop: '大兴哈哈',
            allPrice: 250,
            cash: '',
            guazhang: 85
          },
          {
            date: '2001-11-02 17:03:57',
            sn: 17110217035968,
            merchat: '新锐汽配',
            workshop: '大兴哈哈',
            allPrice: 250,
            cash: '',
            guazhang: 85
          },
          {
            date: '2001-11-02 17:03:57',
            sn: 17110217035968,
            merchat: '新锐汽配',
            workshop: '大兴哈哈',
            allPrice: 250,
            cash: '',
            guazhang: 85
          },
          {
            date: '2001-11-02 17:03:57',
            sn: 17110217035968,
            merchat: '新锐汽配',
            workshop: '大兴哈哈',
            allPrice: 250,
            cash: '',
            guazhang: 85
          }
        ]
      }
    },
    methods: {
      showHeader() {
          console.log(this.headerShow);
        this.headerShow = !this.headerShow;
      }
    }
  }
</script>

<style>
  .el-col {
    margin: 10px 0;
  }
</style>
