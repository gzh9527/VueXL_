let base = '/api';
let bihubase = '/bihuapi';
let prodUrl = '/prodapi/api/web/index.php/';
let tpaBase = 'http://sinatest.bihubao.com/tpa_api/';
let baseUrl2='http://sinatest.bihubao.com/api/web/index.php/';
let bihuMallUrl = '/mallapi/';
let adApi = '/adApi/'
if (window.location.hostname != 'localhost') {
  base = window.location.origin;
  bihubase = 'https://www.bihubao.com';
  tpaBase = window.location.origin + '/tpa_api/';
  baseUrl2 = window.location.origin + '/api/web/index.php/';
  prodUrl = 'https://sina.bihubao.com/api/web/index.php/';
  bihuMallUrl = base + '/shop/api/';
}

//origin
const baseUrl = base + '/api/web/index.php/';
const bihuUrl = bihubase;
export default {
  'addPolicy': baseUrl + 'v1/policy/create',               //加入保险
  'activationPolicy': baseUrl + 'v1/policy/activate',             //激活保单
  'getPolicyList': baseUrl + 'v1/policy/index',                //获取计划列表 1
  'getMyPolicy': baseUrl + 'v1/policy/my-policy',            //我的互助 1
  'getRelationLimit': baseUrl + 'v1/policy/relation-limit',       //家人数量限制
  'getJoinCount': baseUrl + 'v1/policy/join-count',           //计划总的有效人数
  'getweiboInfo': baseUrl + 'v1/policy/weibo-info',           //获取微博用户信息
  'bindWallet': baseUrl + 'v1/policy/bind-wallet',          //绑定微博钱包
  'policyDetail': baseUrl + 'v1/policy/view',                 //计划详情
  'deletePolicy': baseUrl + 'v1/policy/delete',               // 放弃保障
  'userToken': baseUrl + 'v1/auth-user/login',             //获取token
  'createTicket': baseUrl + 'v1/ticket/create',               //创建红包
  'joinTicket': baseUrl + 'v1/ticket/join_award',
  'useTicket': baseUrl + 'v1/ticket/use_help_ticket',      //使用互助金卡券
  'getTicketList': baseUrl + 'v1/ticket/index',                //有用卡卷列表
  'getInvalidTicketList': baseUrl + 'v1/ticket/invalid_list',         //无效卡卷列表
  'getBalance': baseUrl + 'v1/account/balance',                //余额
  'getAdView': baseUrl + 'v1/ad/view',                     //获取广告图
  'getAdvertList': base + '/advert/micro-service/advert/list',    //获取广告图-春博接口
  'setAdvertTotalNum': base + '/advert/micro-service/advert-total/num',         //广告图埋点-春博接口
  'sendJoinNotice': baseUrl + 'v1/user/send-join-notice',       //发微博
  'bridgeFeiyan': prodUrl + 'v1/bridge/feiyan',
  'feiyanNotice': baseUrl + 'v1/user/feiyan-notice',
  'subscribe': baseUrl + 'v1/user/subscribe',               // 引导页 关注
  //公示
  'memberHelpData': prodUrl + 'v1/publicity/memberHelpData',     //公示列表-top数据
  'helpDealList': prodUrl + 'v1/publicity/newHelpDealList',       //公示列表
  'helpDealData': prodUrl + 'v1/publicity/helpDealData',        //gongshi


  'gettravelCount': baseUrl + 'v1/travel/count',                //同程登记人数
  'getEsList': baseUrl + 'v1/travel/feiyan-list',          //获取疫情班次
  'getmyTravelList': baseUrl + 'v1/travel/index',                //查询我的行程
  'createTravel': baseUrl + 'v1/travel/create',               //添加行程
  'delTravel': baseUrl + 'v1/travel/delete',               //删除行程
  'shareNotice': baseUrl + 'v1/user/share-notice',           //分享
  'getvaildDate': baseUrl + 'v1/travel/vaild-date',           //获取有效期

  'postPaySign': baseUrl + 'v1/policy/paySign',              //判断用户是否完成了支付绑定。


  'payAuth': baseUrl + 'v1/policy/payAuth',                //绑定微信用户 - 授权支付
  'paySign': baseUrl + 'v1/policy/paySign',               ////绑定微信用户 -  支付签约
  'getContractInfo': bihuUrl + '/index.php/Test/Sina/getContractInfo',    //绑定微信用户 - 获取微信用户信息


  'getPublicList': prodUrl + 'v1/publicity/publicList',           // 公示列表
  'getPublicData': prodUrl + 'v1/publicity/publicData',           // 公示数据
  'getPublicDescList': prodUrl + 'v1/publicity/publicDescList',           // 公示数据
  'getEnterAffixs': tpaBase + 'affixdef/enterAffixs',                   // 公示材料
  'checkRedPacketChannel': baseUrl + 'v1/ticket/check_red_packet_channel',   //大病引导页-红包广告位的显示与否
  'walletSign': baseUrl + 'v1/wallet/sign',                       //支付签约

  'changeHelpType': baseUrl + 'v1/policy/changeHelpType',               //更改受助类型

  'getjoinInfo': baseUrl + 'v1/policy/join-info',                    //退出拦截 第一页
  'getLeaveReason': baseUrl + 'v1/policy/leave-reason_list',            //退回拦截 调查问卷 原因列表
  'addLeaveReason': baseUrl + 'v1/policy/add-leave-reason',             //退回拦截 调查问卷 保存原因
  'getLeaveReasonState': baseUrl + 'v1/policy/leave-reason-state',           //退回拦截 调查问卷 保存状态
  'getLeaveTicketShow': baseUrl + 'v1/policy/show-leave-ticket',            //是否显示挽留红包
  'createLeaveTicket': baseUrl + 'v1/policy/create-leave-ticket',          // 创建红包

  'getPhone': baseUrl + 'v1/user/mobile',                         // 获取用户手机号码
  'saveUserPhone': baseUrl + 'v1/user/save-mobile',                    //保存用户手机号码
  'getLastUnitAmount': baseUrl + 'v1/user/last_unit_amount',               // 获取上次分摊金额
  'getLastJoinList': baseUrl + 'v1/user/last-join-list',                 // 获取最新加入人
  'getWbjsInfo': base + '/api/web/index.php/v1/user/wbjs-info',      // 获取微博API的签名

  //  分享
  'getRelation': baseUrl + 'v1/recommend/get_relation',              //分享关系
  'createRecommender': baseUrl + 'v1/recommend/create_recommender',        // 创建关系
  'getRecommend': baseUrl + 'v1/recommend/get_recommend_relation',    //获取关系
  'createRecomRelation': baseUrl + 'v1/recommend/create_recommender_relation', //建立分享之间的关系

  // 调整额度
  'adjustCoverage': baseUrl + 'v1/policy/adjust-coverage',                //调整额度
  'adjustCoverageList': baseUrl + 'v1/policy/adjust-coverage-list',           //调整额度列表

  //加入流程 支付3元
  'payJoin': baseUrl + 'v1/policy/pay-join',              //支付3元

  // 商城api
  'getProds': bihuMallUrl + 'prod/getProds',  //商品列表
  'getProdsDetail': bihuMallUrl + 'prod/getproduct', //商品详情

  //借钱渠道加入
  'borrowJoinPlan': baseUrl + 'v1/policy/channel-join', //借钱加入互助

  //调查问卷
  'createAnswer': baseUrl + 'v1/question/create_answer',//调查问卷

  //判断是否已经填写过问卷
  'questionnaire_record': baseUrl + 'v1/question/get_questionnaire_record',

  //长投二维码展示
  'get_qrcode': baseUrl + 'v1/question/get_qrcode',

  //长投页面信息提交
  'get_create_insurance_information': baseUrl + 'v1/question/create_insurance_information',
  // 新浪借钱
  'get_finance_receive':              baseUrl + 'v1/sina-finance/get_finance_receive', //判断是否是借钱老用户
  'finance_login':                    baseUrl + 'v1/sina-finance/finance_login', //新浪借钱授权登录
  // 消息列表
  'getNoticeList':      baseUrl+'v1/user-msg/list'
}
