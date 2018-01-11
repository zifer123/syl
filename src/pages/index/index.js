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

import './assets/css/reset.css'
import './assets/iconfont/iconfont.css'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import Router from 'vue-router'
Vue.use(Router)

import Axios from 'axios'
Vue.prototype.$http = Axios

import store from './store'

Vue.config.productionTip = false

/* 判断是否登录过 */
if(localStorage.getItem('routes')) {
  let routes = JSON.parse(localStorage.getItem('routes'));
  for(let i = 0;i<routes.length;i++) {
    routes[i].path = '/'+routes[i].path;
    routes[i].component = () => import('./CommonView.vue');
    for(let j = 0;j<routes[i].children.length;j++) {
      /* 先判断是否为true，再往下走 */
      if(routes[i].children[j].show) {
        routes[i].children[j].component = () => import('./CommonView.vue');
        /* 判断是否还有children */
        if(routes[i].children[j].children&&routes[i].children[j].children.length) {
          /* 如果还有在循环，顺便加上group */
          routes[i].children[j].group = true;
          for(let k = 0;k<routes[i].children[j].children.length;k++) {
            if(routes[i].children[j].children[k].show) {
              let first = routes[i].path;
              let second = routes[i].children[j].path;
              let third = routes[i].children[j].children[k].path;
              routes[i].children[j].children[k].component = () => import(`./children${first}/${second}/${third}`);
            }
          }
        }else {
          routes[i].children[j].component = () => import(`./children${routes[i].path}/${routes[i].children[j].path}`);
        }
      }
    }
  }

  let newRoutes = [
    {
      path: '/',
      title: '首页',
      icon: 'iconfont icon-home',
      meta: {
        name: '首页'
      },
      component: resolve => require(['./children/Home/DashBoard.vue'],resolve)
    },
    ...routes
  ];

  /* App.vue需要 */
  localStorage.setItem('newRoutes',JSON.stringify(newRoutes));
  let router = new Router({
    routes: newRoutes
  });

  /* 全局路由钩子,全局进度条 */
  router.beforeEach((to,from,next) => {
    NProgress.start();
    next();
  });
  // 此处操作APP.vue里面的rightRoutes,
  router.afterEach((to) => {
    let arr = [];
    let routeInfo = {
      name: ''
    };
    to.matched.forEach((item,index) => {
      arr.push(item.meta.name);
      if(index >= 1) {
        routeInfo.name += item.meta.name+'/';
      }
    });
    /* 去除最后一个的 '/' */
    routeInfo.name = routeInfo.name.substr(0,routeInfo.name.length-1);
    document.title = "时运来物流：" + routeInfo.name;
    // 改变面包屑
    store.commit('changeBreadcrumb',arr);
    // 改变左边导航状态
    store.commit('changeActiveNav',to.path);
    NProgress.done() // 结束Progress
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


