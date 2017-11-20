<template>
  <div>
    <h4 class="page-header">
      <el-button @click="showHeader" type="primary" plain>查询<i class="el-icon-zoom-in el-icon--right"></i></el-button>
    </h4>

    <el-dialog
      title="提示"
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
              placeholder="选择日期时间">
            </el-date-picker>
          </div>
        </el-col>

        <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
          <div class="flexBox">
            <label>单号:</label>
            <el-input class="item" v-model="postData.sn" placeholder="请输入单号"></el-input>
          </div>
        </el-col>

        <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
          <div class="flexBox">
            <label>汽配商:</label>
            <el-autocomplete
              class="item"
              :fetch-suggestions="filterMerchat"
              v-model="postData.merchat"
              placeholder="请输入汽配商名称"
              :trigger-on-focus="false"
              @select="merChatSelect"
            ></el-autocomplete>
          </div>
        </el-col>

        <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
          <div class="flexBox">
            <label>维修厂:</label>
            <el-autocomplete
              class="item"
              v-model="postData.workshop"
              :fetch-suggestions="filterWorkShop"
              placeholder="请输入维修厂名称"
              :trigger-on-focus="false"
              @select="workShopSelect"
            ></el-autocomplete>
          </div>
        </el-col>

        <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
          <div class="flexBox">
            <label>订单状态:</label>
            <el-select class="item" v-model="postData.orderStatus" placeholder="请选择">
              <el-option label="全部" value="2"></el-option>
              <el-option label="正常" value="1"></el-option>
              <el-option label="异常" value="0"></el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
          <div class="flexBox">
            <label>货款支付:</label>
            <el-select class="item" v-model="postData.payType" placeholder="请选择">
              <el-option label="全部" value="2"></el-option>
              <el-option label="现金" value="1"></el-option>
              <el-option label="挂账" value="0"></el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
          <div class="flexBox">
            <label>运费支付:</label>
            <el-select class="item" multiple v-model="postData.freightType" placeholder="请选择">
              <el-option label="现付" :value="2"></el-option>
              <el-option label="到付" :value="1"></el-option>
              <el-option label="月结" :value="0"></el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
          <div class="flexBox">
            <label>配送状态:</label>
            <el-select class="item" v-model="postData.dispatchStatus" placeholder="请选择">
              <el-option label="全部" value="2"></el-option>
              <el-option label="已配送" value="1"></el-option>
              <el-option label="未配送" value="0"></el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
          <div class="flexBox">
            <label>回单状态:</label>
            <el-select class="item" v-model="postData.receiptStatus" placeholder="请选择">
              <el-option label="全部" value="2"></el-option>
              <el-option label="已回单" value="1"></el-option>
              <el-option label="未回单" value="0"></el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
          <div class="flexBox">
            <label>交款状态:</label>
            <el-select class="item" v-model="postData.paymentStatus" placeholder="请选择">
              <el-option label="全部" value="2"></el-option>
              <el-option label="已交款" value="1"></el-option>
              <el-option label="未交款" value="0"></el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
          <div class="flexBox">
            <label>账单状态:</label>
            <el-select class="item" v-model="postData.billStatus" placeholder="请选择">
              <el-option label="全部" value="2"></el-option>
              <el-option label="已生成" value="1"></el-option>
              <el-option label="未生成" value="0"></el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
          <div class="flexBox">
            <label>结算状态:</label>
            <el-select class="item" v-model="postData.settlementStatus" placeholder="请选择">
              <el-option label="全部" value="2"></el-option>
              <el-option label="已结算" value="1"></el-option>
              <el-option label="未结算" value="0"></el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
          <div class="flexBox">
            <label>录单员:</label>
            <el-autocomplete
              class="item"
              v-model="postData.recordStaff"
              :fetch-suggestions="filterRecordStaff"
              placeholder="请输入录单员"
              :trigger-on-focus="false"
              @select="recordStaffSelect"
            ></el-autocomplete>
          </div>
        </el-col>

        <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
          <div class="flexBox">
            <label>目的地:</label>
            <el-cascader
              class="item"
              expand-trigger="hover"
              :options="destination"
              v-model="postData.destination"
              @change="destinationChange">
            </el-cascader>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="orderSearch">搜索</el-button>
      </span>
    </el-dialog>

    <el-input v-model="filterMW" placeholder="筛选汽配商/维修厂"></el-input>
    <el-table
      :data="newOrderInfo"
      v-loading="tableLoading"
      height="450"
      style="width: 100%;">
      <el-table-column
        fixed
        type="index">
      </el-table-column>
      <el-table-column
        prop="date"
        sortable
        label="日期"
        width="150">
      </el-table-column>
      <el-table-column
        prop="sn"
        label="单号"
        width="150">
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

      <el-table-column label="联系方式">
        <el-table-column
          prop="xianfu"
          label="维修厂"
          width="120">
        </el-table-column>
        <el-table-column
          prop="dapfu"
          label="汽配商"
          width="120">
        </el-table-column>
        <el-table-column
          prop="yuejie"
          label="月结"
          width="120">
        </el-table-column>
      </el-table-column>

      <el-table-column label="扫描时间">
        <el-table-column
          prop="xianfu"
          label="第一次扫描"
          width="120">
        </el-table-column>
        <el-table-column
          prop="dapfu"
          label="第二次扫描"
          width="120">
        </el-table-column>
        <el-table-column
          prop="yuejie"
          label="第三次扫描"
          width="120">
        </el-table-column>
        <el-table-column
          prop="yuejie"
          label="第四次扫描"
          width="120">
        </el-table-column>
      </el-table-column>

      <el-table-column
        prop="detination"
        width="150"
        label="目的地">
      </el-table-column>

      <el-table-column
        prop="detination"
        width="150"
        label="配送地址">
      </el-table-column>

      <el-table-column
        prop="detination"
        width="150"
        label="录单员结算">
      </el-table-column>

      <el-table-column
        prop="detination"
        width="150"
        label="配送员结算">
      </el-table-column>

      <el-table-column
        prop="detination"
        width="150"
        label="账单生成">
      </el-table-column>

      <el-table-column
        prop="detination"
        width="150"
        label="汽配商结算">
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="220">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, scope.row)"
            type="primary"
            size="small">
            编辑
          </el-button>
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData4)"
            type="info"
            size="small">
            打印
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        filterMW: '',
        postData: {
          freightType: '',
        },// 发送的数据
        merchatInfo: [],// 汽配商所有信息
        workShopInfo: [],// 维修厂所有信息
        recordStaffInfo: [],// 维修厂所有信息
        headerShow: false,// 控制筛选条件是否显示
        destination: [
          {
            value: 'zhinan',
            label: '指南',
            children: [
              {
                value: 'shejiyuanze',
                label: '设计原则',
                children: [
                  {
                    value: 'yizhi',
                    label: '一致'
                  },
                  {
                    value: 'fankui',
                    label: '反馈'
                  },
                  {
                    value: 'xiaolv',
                    label: '效率'
                  },
                  {
                    value: 'kekong',
                    label: '可控'
                  }
                ]
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
          },

          {
            value: 'zujian',
            label: '组件',
            children: [
              {
                value: 'basic',
                label: 'Basic',
                children: [
                  {
                    value: 'layout',
                    label: 'Layout 布局'
                  },
                  {
                    value: 'color',
                    label: 'Color 色彩'
                  },
                  {
                    value: 'typography',
                    label: 'Typography 字体'
                  },
                  {
                    value: 'icon',
                    label: 'Icon 图标'
                  },
                  {
                    value: 'button',
                    label: 'Button 按钮'
                  }
                ]
              },

              {
                value: 'form',
                label: 'Form',
                children: [
                  {
                    value: 'radio',
                    label: 'Radio 单选框'
                  },
                  {
                    value: 'checkbox',
                    label: 'Checkbox 多选框'
                  },
                  {
                    value: 'input',
                    label: 'Input 输入框'
                  },
                  {
                    value: 'input-number',
                    label: 'InputNumber 计数器'
                  },
                  {
                    value: 'select',
                    label: 'Select 选择器'
                  },
                  {
                    value: 'cascader',
                    label: 'Cascader 级联选择器'
                  },
                  {
                    value: 'switch',
                    label: 'Switch 开关'
                  },
                  {
                    value: 'slider',
                    label: 'Slider 滑块'
                  },
                  {
                    value: 'time-picker',
                    label: 'TimePicker 时间选择器'
                  },
                  {
                    value: 'date-picker',
                    label: 'DatePicker 日期选择器'
                  },
                  {
                    value: 'datetime-picker',
                    label: 'DateTimePicker 日期时间选择器'
                  },
                  {
                    value: 'upload',
                    label: 'Upload 上传'
                  },
                  {
                    value: 'rate',
                    label: 'Rate 评分'
                  },
                  {
                    value: 'form',
                    label: 'Form 表单'
                  }
                ]
              },

              {
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
          }],// 目的地信息
        orderInfo: [
          {
            date: '2001-11-02 17:03:57',
            sn: 17110217035968,
            merchat: '请问我企鹅',
            workshop: '而特瑞特',
            allPrice: 250,
            cash: '',
            guazhang: 85,
            yunfei: 30
          },
          {
            date: '2001-11-02 17:03:57',
            sn: 17110217035968,
            merchat: '是电饭锅电饭锅',
            workshop: '太容易投入',
            allPrice: 250,
            cash: '',
            guazhang: 85
          },
          {
            date: '2001-11-02 17:03:57',
            sn: 17110217035968,
            merchat: '阿加西邪恶',
            workshop: '他是个很反感',
            allPrice: 250,
            cash: '',
            guazhang: 85
          },
          {
            date: '2001-11-02 17:03:57',
            sn: 17110217035968,
            merchat: '故环境规划',
            workshop: '我二哥好吧',
            allPrice: 250,
            cash: '',
            guazhang: 85
          },
          {
            date: '2001-11-02 17:03:57',
            sn: 17110217035968,
            merchat: '撒的而为',
            workshop: '热退热的',
            allPrice: 250,
            cash: '',
            guazhang: 85
          },
          {
            date: '2001-11-02 17:03:57',
            sn: 17110217035968,
            merchat: '他用他的粉丝',
            workshop: '遇到广泛的',
            allPrice: 250,
            cash: '',
            guazhang: 85
          },
          {
            date: '2001-11-02 17:03:57',
            sn: 17110217035968,
            merchat: '突然又太容易',
            workshop: '而额外人',
            allPrice: 250,
            cash: '',
            guazhang: 85
          },
          {
            date: '2001-11-02 17:03:57',
            sn: 17110217035968,
            merchat: '法国和法规和',
            workshop: '阿斯顿撒点',
            allPrice: 250,
            cash: '',
            guazhang: 85
          }
        ],// 订单信息
        tableLoading: false// 订单加载状态
      }
    },
    methods: {
      merChatSelect(a) {
        /* 选择汽配商，a为一行数据 */
      },
      workShopSelect(a) {
        /* 选择维修厂，a为一行数据 */
      },
      recordStaffSelect(a) {
        /* 选择录单员，a为一行数据 */
      },
      destinationChange(a) {
        // 目的地
      },
      deleteRow(a,b) {
        console.log(a);
        console.log(b);
      },
      showHeader() {
        // 控制筛选条件是否显示
        this.headerShow = !this.headerShow;
      },
      getResults() {
        this.$http.get('/api/test.json').then(function(data) {
          console.log(data);
        })
      },
      /* 订单查询 */
      orderSearch() {
        this.headerShow = false;
        this.tableLoading = true;
        setTimeout(function() {
          this.tableLoading = false;
        }.bind(this),2000)
      },
      /* 筛选汽配商 */
      filterMerchat(queryString,cb) {
        cb(this.merchatInfo.filter(function(item) {
          return item.value.toLowerCase().indexOf(queryString.toLowerCase())!=-1;
        }))
      },
      // 筛选维修厂
      filterWorkShop(queryString,cb) {
        cb(this.merchatInfo.filter(function(item) {
          return item.value.toLowerCase().indexOf(queryString.toLowerCase())!=-1;
        }))
      },
      // 筛选录单员
      filterRecordStaff(queryString,cb) {
        cb(this.recordStaffInfo.filter(function(item) {
          return item.value.toLowerCase().indexOf(queryString.toLowerCase())!=-1;
        }))
      },
      // ajax加载维修厂信息
      loadMerchatInfo() {
        return [
          { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
          { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
          { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
          { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
          { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
          { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
          { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
          { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
          { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
          { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
          { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
          { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
          { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
          { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
          { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
          { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
          { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
          { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
          { "value": "枪会山", "address": "上海市普陀区棕榈路" },
          { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
          { "value": "钱记", "address": "上海市长宁区天山西路" },
          { "value": "壹杯加", "address": "上海市长宁区通协路" },
          { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
          { "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
          { "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
          { "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
          { "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
          { "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
          { "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
          { "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
          { "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
          { "value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
          { "value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
          { "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
          { "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
          { "value": "浏阳蒸菜", "address": "天山西路430号" },
          { "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
          { "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
          { "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
          { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
          { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
          { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
          { "value": "阳阳麻辣烫", "address": "天山西路389号" },
          { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
        ];
      },
      // ajax加载汽配商信息
      loadWorkShopInfo() {
        return [
          { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
          { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
          { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
          { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
          { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
          { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
          { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
          { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
          { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
          { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
          { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
          { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
          { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
          { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
          { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
          { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
          { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
          { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
          { "value": "枪会山", "address": "上海市普陀区棕榈路" },
          { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
          { "value": "钱记", "address": "上海市长宁区天山西路" },
          { "value": "壹杯加", "address": "上海市长宁区通协路" },
          { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
          { "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
          { "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
          { "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
          { "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
          { "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
          { "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
          { "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
          { "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
          { "value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
          { "value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
          { "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
          { "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
          { "value": "浏阳蒸菜", "address": "天山西路430号" },
          { "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
          { "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
          { "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
          { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
          { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
          { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
          { "value": "阳阳麻辣烫", "address": "天山西路389号" },
          { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
        ];
      },
      // ajax加载录单员信息
      loadRecordStaffInfo() {
        return [
          { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
          { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
          { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
          { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
          { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
          { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
          { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
          { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
          { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
          { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
          { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
          { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
          { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
          { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
          { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
          { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
          { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
          { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
          { "value": "枪会山", "address": "上海市普陀区棕榈路" },
          { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
          { "value": "钱记", "address": "上海市长宁区天山西路" },
          { "value": "壹杯加", "address": "上海市长宁区通协路" },
          { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
          { "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
          { "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
          { "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
          { "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
          { "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
          { "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
          { "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
          { "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
          { "value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
          { "value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
          { "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
          { "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
          { "value": "浏阳蒸菜", "address": "天山西路430号" },
          { "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
          { "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
          { "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
          { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
          { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
          { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
          { "value": "阳阳麻辣烫", "address": "天山西路389号" },
          { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
        ];
      },
    },
    computed: {
      newOrderInfo() {
        let _this = this;
        return this.orderInfo.filter(function(item) {
          return item.merchat.toLowerCase().indexOf(_this.filterMW.toLowerCase())!=-1||item.workshop.toLowerCase().indexOf(_this.filterMW.toLowerCase())!=-1;
        });
      }
    },
    created() {
      this.getResults();
      this.merchatInfo = this.loadMerchatInfo();
      this.workShopInfo = this.loadWorkShopInfo();
      this.recordStaffInfo = this.loadRecordStaffInfo();
    }
  }
</script>

<style scoped>
  .flexBox {
    line-height: 35px;
    display: flex;
  }
  .flexBox label {
    width: 100px;
  }
  .flexBox .item {
    flex: 1;
  }
  .el-table--border td, .el-table--border th {
    border-right: 1px solid #e6ebf5 !important;
  }
  .el-col {
    margin: 10px 0;
  }
</style>
