
export default  [
  {
    path: '/weibo/userauth',
    name: 'userAuth',
    meta: {
      title: '用户授权',
      keepAlive: false,
    },
    component: (resolve) => require(['@/pages/userAuth.vue'], resolve)
  },
  {
    path: '/weibo/insure-join',
    name: 'joinHelp',
    meta: {
      title: '加入新浪互助',
      keepAlive: false,
    },
    component: (resolve) => require(['@/pages/insure-join.vue'], resolve)
  },
  {
    path: '/weibo/insure-write',
    name: 'insureWrite',
    meta: {
      title: '填写信息',
      keepAlive: false,
    },
    component: (resolve) => require(['@/pages/insure-write.vue'], resolve)
  },
  {
    path: '/weibo/insure-plan',
    name: 'plan',
    meta: {
      title: '新浪互助计划',
      keepAlive: false,
    },
    component: (resolve) => require(['@/pages/plan.vue'], resolve)
  },
  {
    path: '/weibo/insure-illIntro',
    name: 'illPlanIntro',
    meta: {
      title: '升级大病互助',
      keepAlive: false,
    },
    component: (resolve) => require(['@/pages/illPlanIntro.vue'], resolve)
  },
  {
    path: '/weibo/clause',
    name: 'clause',
    meta: {
      title: '健康要求',
      keepAlive: false,
    },
    component: (resolve) => require(['@/pages/clause/clauseMain.vue'], resolve)
  },
  {
    path: '/weibo/insure-detail',
    name: 'planDetail',
    meta: {
      title: '计划详情',
      keepAlive: false,
    },
    component: (resolve) => require(['@/pages/planDetail.vue'], resolve)
  },
  {
    path: '/weibo/insure-paySuc',
    name: 'paySuc',
    meta: {
      title: '加入计划成功',
      keepAlive: false,
    },
    component: (resolve) => require(['@/pages/joinPlanSuccess/joinPlanSuccess.vue'], resolve)
  },
  {
    path: '/weibo/insure-active',
    name: 'insure-active',
    meta: {
      title: '权益待激活',
      keepAlive: false,
    },
    component: (resolve) => require(['@/pages/noteActive/noteRedpack.vue'], resolve)
  },
  {
    path: '/weibo/insure-add',
    name: 'insure-add',
    meta: {
      title: '添加家人',
      keepAlive: false,
    },
    component: (resolve) => require(['@/pages/planAddUser.vue'], resolve)
  },
  {
    path: '/weibo/activity/:year/:id',
    name: 'activity',
    meta: {
      title: '互助红包',
      keepAlive: false,
    },
    component: (resolve) => require(['@/pages/activity.vue'], resolve)
  },
  {
    path: '/weibo/redpacket',
    name: 'redPacket',
    meta: {
      title: '我的红包',
      keepAlive: false,
    },
    component: (resolve) => require(['@/pages/plan/redPacket.vue'], resolve)
  },
  {
    path: '/weibo/invalid-ticket',
    name: 'invalidTicket',
    meta: {
      title: '失效优惠券',
      keepAlive: false,
    },
    component: (resolve) => require(['@/pages/plan/invalidTicket.vue'], resolve)
  },
  {
    path: '/weibo/loadpage',
    name: 'loadpage',
    meta: {
      title: '新浪互助',
      keepAlive: false,
    },
    component: (resolve) => require(['@/pages/loadFunc.vue'], resolve)
  },
  {
    path: '/weibo/pneumonia',
    name: 'pneumonia',
    meta: {
      title: '新型肺炎疫情地图',
      keepAlive: false,
    },
    component: (resolve) => require(['@/pages/pneumonia.vue'], resolve)
  },
  {
    path: '/weibo/feiyan-intro',
    name: 'feiyanInfo',
    meta: {
      title: '加入新浪新冠病毒互助计划',
      keepAlive: false,
    },
    component: (resolve) => require(['@/pages/feiyan/intro.vue'], resolve)
  },
  {
    path: '/weibo/feiyan-intro-app',
    name: 'feiyanInfoApp',
    meta: {
      title: '加入新浪新冠病毒互助计划',
      keepAlive: false,
    },
    component: (resolve) => require(['@/pages/feiyan/introApp.vue'], resolve)
  },
  {
    path: '/weibo/feiyan-join',
    name: 'feiyanJoin',
    meta: {
      title: '加入新浪新冠病毒互助计划',
      keepAlive: false,
    },
    component: (resolve) => require(['@/pages/feiyan/join.vue'], resolve)
  },
  {
    path: '/weibo/feiyan-paySuc',
    name: 'feiyanPaySuc',
    meta: {
      title: '加入计划成功',
      keepAlive: false,
    },
    component: (resolve) => require(['@/pages/feiyan/paySuc.vue'], resolve)
  },
  {
    path: '/weibo/del-cache',
    name: 'delCache',
    meta: {
      title: '新浪互助',
      keepAlive: false,
    },
    component: (resolve) => require(['@/pages/delCache.vue'], resolve)
  },
  {
    path: '/weibo/trip-my',
    name: 'tripMy',
    meta: {
      title: '同程登记',
      keepAlive: false,
    },
    component: (resolve) => require(['@/pages/trip/tripMy.vue'], resolve)
  },
  {
    path: '/weibo/trip-add',
    name: 'tripRegister',
    meta: {
      title: '同程登记',
      keepAlive: false,
    },
    component: (resolve) => require(['@/pages/trip/tripRegister.vue'], resolve)
  },
  {
    path: '/weibo/trip-all',
    name: 'tripAll',
    meta: {
      title: '同程登记',
      keepAlive: false,
    },
    component: (resolve) => require(['@/pages/trip/tripAll.vue'], resolve)
  },
  {
    path: '/weibo/public-list',
    name: 'publicList',
    meta: {
      title: '公示记录',
      keepAlive: false,
    },
    component: (resolve) => require(['@/pages/public/publicList.vue'], resolve)
  },
  {
    path: '/weibo/public-member',
    name: 'publicMember',
    meta: {
      title: '互助成员清单',
      keepAlive: false,
    },
    component: (resolve) => require(['@/pages/public/publicMember.vue'], resolve)
  },
  {
    path: '/weibo/public-detail',
    name: 'publicDetail',
    meta: {
      title: '公示详情',
      keepAlive: false,
    },
    component: (resolve) => require(['@/pages/public/publicDetail.vue'], resolve)
  },
  {
    path: '/weibo/share-list',
    name: 'shareList',
    meta: {
      title: '互助成员清单',
      keepAlive: false,
    },
    component: (resolve) => require(['@/pages/public/shareList.vue'], resolve)
  },
  {
    path: '/weibo/share-detail',
    name: 'shareDetail',
    meta: {
      title: '分摊明细',
      keepAlive: false,
    },
    component: (resolve) => require(['@/pages/public/shareDetail.vue'], resolve)
  },
  {
    path: '/weibo/bind-WeChat',
    name: 'bindWeChat',
    meta: {
      title: '绑定微信用户',
      keepAlive: false,
    },
    component: (resolve) => require(['@/pages/bindWeChat.vue'], resolve)
  },
  {
    path: '/weibo/activity-welfare',
    name: 'welfare',
    meta: {
      title: '钱包福利',
      keepAlive: false,
    },
    component: (resolve) => require(['@/pages/activity/welfare.vue'], resolve)
  },
  {
    path: '/weibo/wallet-auth',
    name: 'walletAuth',
    meta: {
      title: '支付签约',
      keepAlive: false,
    },
    component: (resolve) => require(['@/pages/auth/walletAuth.vue'], resolve)
  },
  {
    path: '/weibo/wallet-paysuc',
    name: 'walletPaysuc',
    meta: {
      title: '签约成功',
      keepAlive: false,
    },
    component: (resolve) => require(['@/pages/auth/walletPaysuc.vue'], resolve)
  },
  {
    path: '/weibo/action-count',
    name: 'actionCount',
    meta: {
      title: '新浪互助',
      keepAlive: false,
    },
    component: (resolve) => require(['@/pages/actionCount.vue'], resolve)
  },
  {
    path: '/weibo/exit-paln',
    name: 'exitPlan',
    meta: {
      title: '新浪互助',
      keepAlive: false,
    },
    component: (resolve) => require(['@/pages/exit/exitPlan.vue'], resolve)
  },
  {
    path: '/weibo/exit-ques',
    name: 'exitQues',
    meta: {
      title: '调查问卷',
      keepAlive: false,
    },
    component: (resolve) => require(['@/pages/exit/exitQues.vue'], resolve)
  },
  {
    path: '/weibo/exit-redPacket',
    name: 'exitRedPacket',
    meta: {
      title: '新浪互助',
      keepAlive: false,
    },
    component: (resolve) => require(['@/pages/exit/exitRedPacket.vue'], resolve)
  },
  {
    path: '/weibo/exit-suc',
    name: 'exitSuc',
    meta: {
      title: '大病互助计划退出成功',
      keepAlive: false,
    },
    component: (resolve) => require(['@/pages/exit/exitSuc.vue'], resolve)
  },
  {
    path: '/weibo/upgrade-suc',
    name: 'upgradeSuc',
    meta: {
      title: '权益已生效',
      keepAlive: false,
    },
    component: (resolve) => require(['@/pages/exit/exitSuc.vue'], resolve)
  },
  {
    path: '/weibo/note-intro',
    name: 'noteIntro',
    meta: {
      title: '激活权益',
      keepAlive: false,
    },
    component: (resolve) => require(['@/pages/noteActive/noteIntro.vue'], resolve)
  },
  {
    path: '/weibo/note-active',
    name: 'noteActive',
    meta: {
      title: '激活权益',
      keepAlive: false,
    },
    component: (resolve) => require(['@/pages/noteActive/noteActive.vue'], resolve)
  },
  {
    path: '/weibo/note-redpacket',
    name: 'noteRedpacket',
    meta: {
      title: '激活权益',
      keepAlive: false,
    },
    component: (resolve) => require(['@/pages/noteActive/noteRedpack.vue'], resolve)
  },
  {
    path: '/weibo/api-test',
    name: 'apiTest',
    meta: {
      title: '新浪互助',
      keepAlive: false,
    },
    component: (resolve) => require(['@/pages/apiTest.vue'], resolve)
  },
  {
    path: '/weibo/activity-valent',
    name: 'activityValent',
    meta: {
      title: '送你一份互助保障',
      keepAlive: false,
    },
    component: (resolve) => require(['@/pages/activity/activityValent.vue'], resolve)
  },
  {
    path: '/weibo/amnt-edit',
    name: 'planEditAmnt',
    meta: {
      title: '互助金调额',
      keepAlive: false,
    },
    component: (resolve) => require(['@/pages/plan/editAmnt.vue'], resolve)
  },
  {
    path: '/weibo/amnt-list',
    name: 'amntList',
    meta: {
      title: '调额记录',
      keepAlive: false,
    },
    component: (resolve) => require(['@/pages/plan/editAmintList.vue'], resolve)
  },
  {
    path: '/weibo/amnt-suc',
    name: 'amntSuc',
    meta: {
      title: '调额成功',
      keepAlive: false,
    },
    component: (resolve) => require(['@/pages/exit/exitSuc.vue'], resolve)
  },
  {
    path: '/weibo/browser-page',
    meta: {
      title: '互助分摊',
      keepAlive: false,
    },
    component: (resolve) => require(['@/pages/thankYouLetter/browserPage.vue'], resolve)
  },
  {
    path: '/weibo/sina-page',
    meta: {
      title: '互助分摊',
      keepAlive: false,
    },
    component: (resolve) => require(['@/pages/thankYouLetter/sinaPage.vue'], resolve)
  },
  {
    path: '/weibo/join_plansuccess',
    meta: {
      title: '加入计划成功',
      keepAlive: false,
    },
    component: (resolve) => require(['@/pages/joinPlanSuccess/joinPlanSuccess.vue'], resolve)
  },
  //{path: '*', redirect: '/weibo/browser-page'}
  {path: '*', redirect: '/weibo/insure-join'}
];
