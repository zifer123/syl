// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
/* 按需引入element-ui,暂时不知道引入什么，就引入全部（注意，配置按需引入loader之后不可能全部引入，即不能直接引入一个elementui，需要像下面一样引入才不会报错） */
import {
  Pagination,
  Dialog,
  Autocomplete,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Breadcrumb,
  BreadcrumbItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
  Popover,
  Tooltip,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Tree,
  Alert,
  Slider,
  Icon,
  Row,
  Col,
  Upload,
  Progress,
  Badge,
  Card,
  Rate,
  Steps,
  Step,
  Carousel,
  CarouselItem,
  Collapse,
  CollapseItem,
  Cascader,
  ColorPicker,
  Transfer,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Loading,
  MessageBox,
  Message,
  Notification
} from 'element-ui'
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Autocomplete)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Switch)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(DatePicker)
Vue.use(TimeSelect)
Vue.use(TimePicker)
Vue.use(Popover)
Vue.use(Tooltip)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Alert)
Vue.use(Slider)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Upload)
Vue.use(Progress)
Vue.use(Badge)
Vue.use(Card)
Vue.use(Rate)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Cascader)
Vue.use(ColorPicker)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message


/* 按需引入，先引入基本的echarts，然后如果各组件想要引用某个，可以引入单独的 */
import echarts from 'echarts/lib/echarts'
Vue.prototype.$echarts = echarts
/* （好多页面可能会用到 ） */
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

import store from './store'

import './assets/css/reset.css'
import './assets/iconfont/iconfont.css'

import Router from 'vue-router'
Vue.use(Router)
import routes from './router'

Vue.config.productionTip = false

/* 判断是否登录过 */
if(localStorage.getItem('routes')) {
  alert('拿到权限');
  let personalRoutes = localStorage.getItem('routes');
  personalRoutes = JSON.parse(personalRoutes);
  /* 筛选第一级 */
  let firstRoutes = routes[0].children.filter(function (item) {
    for(let i=0;i<personalRoutes.length;i++) {
      if(item.path == personalRoutes[i].path) {
        item.meta = personalRoutes[i].meta||[];
        item.icon = personalRoutes[i].icon;
        return true;
        break;
      }
    }
  });
  console.log(firstRoutes);
  /* 先排序，然后比较（比较好比较） */
  personalRoutes.sort();
  firstRoutes.sort();
  /* 筛选第二级 */
  console.log(firstRoutes);
  console.log(personalRoutes);
  for(let i=0;i<firstRoutes.length;i++) {
    let childrens = firstRoutes[i].children;
    for(let j=0;j<childrens.length;j++) {
      /* 利用对象访问第一级不会报错的特性 */
      if(personalRoutes[i].children[j]) {
        if(!personalRoutes[i].children[j].show) {
          /* 把对应的删除掉 */
          childrens.splice(j,1);
        }
      }else {
        /* 如果对应的children不存在，则删掉 */
        childrens.splice(j,1);
      }
    }
  }
  /* 先删除routes[0]的children的路由，在补充最新的路由 */
  routes[0].children.length = 0;
  /* 添加，首页路由（右边的首页），所有用户拥有首页路由（） */
  firstRoutes.unshift({
    path: 'home',
    title: '首页',
    icon: 'icon-home',
    component: resolve => require(['@/components/commonRoute.vue'],resolve),
    children: [
      {
        path: 'dashBoard',
        title: '主页面板',
        component: resolve => require(['./children/Home/DashBoard.vue'],resolve)
      }
    ]
  });
  routes[0].children.push(...firstRoutes);
  console.log(routes);
  /* 存取，为了循环菜单的那个vue能拿到.vue能获取到 */
  localStorage.setItem('newRoutes',JSON.stringify(firstRoutes));
  let router = new Router({
    routes: routes
  });
  /* 初始化应用 */
  new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
  });
}else {
  location.href='login.html';
}


