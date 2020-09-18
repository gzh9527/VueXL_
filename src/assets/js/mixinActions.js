// 埋点
import Api from "../../utils/apiConfig";

export const mixinActions = {
  methods: {
    actionCount(action,callback) {
      let userInfo = sessionStorage.getItem('weiboInfo')
      if (userInfo) {
        this.setActionCount(action, JSON.parse(userInfo).uid || 0,null,callback);
      } else {
        this.getSinaUid(action,callback);
      }
    },
    setActionCount(action, uid,page,callback) {
      let posturl = 'http://bdtest.bihubao.com/index.php/api/misc/out_action_count';
      if (window.location.origin == "https://sina.bihubao.com") {
        posturl = 'https://bdplan.bihubao.com/index.php/api/misc/out_action_count';
      }
      let channel = this.getUrlKey('channel') || localStorage.getItem('channel') || '10000';
      if (this.$route.path == '/weibo/insure-paysuc' && action == 'pv1') {
        //个人中心 立即激活 激活成功
        channel = localStorage.getItem('_ActiveChannel') || localStorage.getItem('channel') || '10000';
      }else if (this.$route.path == '/weibo/action-count') {
        channel = sessionStorage.getItem('_countChannel') || '10000'
      } else {
        if (this.$route.path.indexOf('feiyan') > -1) {
          channel = localStorage.getItem('channel') || '810000';
        }
        channel = this.getUrlKey('insuchannel') ? this.getUrlKey('insuchannel').replace(/[^0-9]/ig, "") : channel;
      }
      let baidu_uid = this.getUrlKey('uid') || '0';
      if (localStorage.getItem('_ValentQuery') && (this.$route.path =='/weibo/insure-join' || this.$route.path=='/weibo/insure-write')) {
        baidu_uid = JSON.parse(localStorage.getItem('_ValentQuery')).uid;
      }
      this.$post(posturl, {
        page: page || this.$route.path.replace('/', ''),
        from: "sina",
        action: action,
        app_uid: uid,
        plan_code: 'XL001',
        baidu_uid: baidu_uid,
        channel: channel,
        isNotshowLoad:'noshow'
      }, 'notoken').then(()=>{
        if(callback &&typeof callback=== 'function'){
          callback();
        }
      })
    },
    getSinaUid(action,callpack) {
      this.$get(Api.getweiboInfo, {isNotshowLoad:'noshow'}).then(res => {
        if (res.code == 0) {
          let weiboInfo = res.data.user;
          this.setActionCount(action, weiboInfo.uid,null,callpack);
          sessionStorage.setItem('weiboInfo', JSON.stringify(weiboInfo))
        } else {
          this.$toast(res.msg || "请求超时，请刷新重试");
        }
      })

    },
    getUrlKey(name){
      return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;
    },
    getIdCardAge(userCard){
      let yearBirth = userCard.substring(6,10);
      let monthBirth = userCard.substring(10,12);
      let dayBirth = userCard.substring(12,14);
      //获取当前年月日并计算年龄
      let myDate = new Date();
      let monthNow = myDate.getMonth() + 1;
      let dayNow = myDate.getDay();
      let age = myDate.getFullYear() - yearBirth;
      if(monthNow < monthBirth || (monthNow == monthBirth && dayNow < dayBirth)) {
        age--;
      }
      return age;
    },
    /** 判断当前计划的状态
     * state  join 加入状态判断 active 激活状态  detail 判断详情是否存在
     * not_join 加入 not_active 未激活 activated 已激活
     *
     * */
    async getPlanState(planCode, state) {
      planCode ? '' : planCode = 'XL001';
      state ? '' : state = 'active';
      let stateList = {};
      if (sessionStorage.getItem('_planState')) {
        stateList = JSON.parse(sessionStorage.getItem('_planState'));
      } else {
        let ret = await this.$get(Api.getMyPolicy);
        if (ret.code === 0) {
          stateList = ret.data.plan_list_state;
          // sessionStorage.setItem('_planState', JSON.stringify(stateList));
        }
      }
      let joinState = stateList && stateList[planCode] || 'not_join';
      let isTrue = false;
      switch (state) {
        case 'join':
          isTrue = joinState != 'not_join';
          break;
        case 'active':
          isTrue = joinState == 'activated'
          break;
        case 'detail':
          isTrue = joinState != 'activated'
          break;
      }
      this['planState'] = isTrue;
      isTrue ? this.$router.replace('/weibo/insure-plan') : this.pageLoad();
    },
    getWeiboInfo(callback) {
      this['weiboInfo'] = sessionStorage.getItem('weiboInfo') ? JSON.parse(sessionStorage.getItem('weiboInfo')) : null;
      if (!this.weiboInfo) {
        this.$get(Api.getweiboInfo, {}).then(res => {
          if (res.code == 0) {
            this['weiboInfo'] = res.data.user;
            sessionStorage.setItem('weiboInfo', JSON.stringify(this.weiboInfo))
            if(callback &&typeof callback=== 'function'){
              callback();
            }
          } else {
            this.$toast(res.msg || "请求超时，请刷新重试");
          }
        })
      }else{
        if(callback &&typeof callback=== 'function'){
          callback();
        }
      }
    },

  }
}
