// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/js/pxtorem'

Vue.config.productionTip = false
import './pages/css/base.css'
import './pages/css/comm.scss'
import VueResource from 'vue-resource'
import loading from './components/loading/index'
import toast from './components/toast/index'
import sinaAlert from './components/sinaAlert'
import VueLazyload from 'vue-lazyload'
import MintUI from 'mint-ui'
import '../src/pages/css/mint.css'
Vue.use(MintUI)
/*使用VueResource插件*/
Vue.use(VueResource);
Vue.use(loading);
Vue.use(toast);
Vue.use(sinaAlert);
Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1,
  listenEvents: [ 'scroll' ]
});
//全局混入
import {mixinActions} from './assets/js/mixinActions'
Vue.mixin(mixinActions);
// //vconsole
// import Vconsole from 'vconsole';
// let vConsole = new Vconsole();
// Vue.use(vConsole)
import {POST, GET,GETBYJSON, PUT, DELETE,JSONP} from './utils/index'
//定义全局变量
Vue.prototype.$post = POST;
Vue.prototype.$get = GET;
Vue.prototype.$getByJosn = GETBYJSON;
Vue.prototype.$put = PUT;
Vue.prototype.$delete = DELETE;
Vue.prototype.$jsonp = JSONP;
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
