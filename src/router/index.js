import Vue from 'vue'
import Router from 'vue-router'

import routes from "./routes";
Vue.use(Router)
const router = new Router({
  mode: 'history',
  linkActiveClass: "active",
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    /* 滚动行为
    方法接收 to 和 from 路由对象。
    第三个参数 savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。*/
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});
let urls = ['/weibo/trip-my', '/weibo/del-cache', '/weibo/pneumonia', '/weibo/feiyan-intro',
  '/weibo/feiyan-intro-app', '/weibo/userauth', '/weibo/insure-join', '/weibo/public-list',
  '/weibo/public-member', '/weibo/public-detail', '/weibo/activity-welfare',
  '/weibo/activity/2020/redpacket01', '/weibo/clause', '/weibo/note-intro',
  '/weibo/activity-valent', '/weibo/browser-page','/weibo/mall-list','/weibo/mall-detail'];
router.beforeEach((to, from, next) => {
  //50002我的红包 50004个人中心banner 50006个人中心顶部 50007个人中心banner
  let addFrimlyChannel = ['50002', '50004', '50006', '50007']; // 添加家人页面的渠道只用于当前页面埋点
  let channel = to.query.channel;
  if (channel && (to.path != '/weibo/activity-valent') && addFrimlyChannel.indexOf(channel || '10000') == -1) {
    localStorage.setItem('channel', channel.toString())
  }
  if (urls.indexOf(to.path) == -1 && !localStorage.getItem('_userToken')) {
    next({
      path: '/weibo/userauth', query: {
        returnUrl: to.fullPath
      }
    });
  }
  // if (to.path == '/weibo/insure-join') {
  //   next({
  //     path: '/weibo/insure-write'
  //   });
  // }
  if (to.fullPath == '/weibo/loadpage?channel=20003') {
    next({
      path: '/weibo/public-list'
    });
  } else {
    /*路由发生变化改变标题*/
    if (to.meta.title) {
      document.title = to.meta.title;
    }
    if (to.path == '/weibo/clause') {
      if (to.query.cid) {
        let clauseNames = ['健康要求', '成员规则', '计划条款', '授权代扣委托书'];
        document.title = clauseNames[to.query.cid];
      }
    } else if (to.path == '/weibo/exit-suc') {
      if (to.query.planCode && to.query.planCode == 'XL002') {
        document.title = '意外医疗计划退出成功';
      }
    }
    next();
  }


});

//  * 重写路由的push方法
//  */
const routerPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return routerPush.call(this, location, onResolve, onReject);
  return routerPush.call(this, location).catch(error => error);
};
export default router;
