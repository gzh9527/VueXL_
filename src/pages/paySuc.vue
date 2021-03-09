<template>
  <div class="sina_page back_fff">
    <div class="sina_cont" v-if="isShow">
      <div class="suc_cont" :class="{success:isActive,error:!isActive}">
        <div class="txt">{{isActive?'已加入成功':'互助权益激活失败'}}</div>
        <div class="active_info" v-if="activeInfoShow">完成任务后，可在“我”-“钱包”-“福利”页面领取积分</div>
         <div class="check_box primary bg3" v-if="isActive" :class="{checked:sendchecked}" @click.stop="sendchecked=!sendchecked">
          发微博邀请更多好友共享互助
        </div>

<!--        <div class="fy_plan" v-if="fyPlanInfo">附赠新冠病毒互助计划，请到<span class="" @click="jumpUrl('plan')">个人中心</span>查看详情</div>-->
<!--        <div class="fy_info" v-if="fyPlanInfo">-->
<!--          <div class="plan_name">新冠病毒互助计划</div>-->
<!--          <div class="plan_info">生效时间：{{fyPlanInfo.valid_date}}</div>-->
<!--          <div class="plan_info">互助凭证：{{fyPlanInfo.son_policy_no}}</div>-->
<!--        </div>-->
        <div class="sina_btn radius primary line cenbtn" @click="jumpUrl('plan')" v-if="isActive">查看我的计划</div>
        <router-link to="/weibo/insure-active?planCode=XL001" class="href" v-else>立即激活</router-link>
        <div class="myAd" v-if="isActive" >
          <finance-login :financeMobile="financeMobile"
                         v-if="financeMobile"
                         :subSource="subSource"
          ></finance-login>
          <img src="http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/DBPaysucAd.png"
               v-else
               @click="jumpUrl('add')">
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import Api from "../utils/apiConfig";
  import myAd from '../components/sinaAd';
  import financeLogin from '../components/financeLogin'
  export default {
    name: "paySuc",
    components: {
      financeLogin,
      myAd
    },
    data() {
      return {
        headOpt: {
          name: '加入计划成功',
          backBtn: true
        },
        isShow: false,
        isActive: false,
        sendchecked: true,
        fyPlanState:null, // 肺炎计划状态
        fyPlanInfo:null, // 肺炎计划信息
        activeInfoShow:false, //钱包福利提示显示与否
        bannerShow: false,
        subSource: 61339711,
        financeMobile: null, // 借钱接口返回--用户手机号
        financeShow: false,
      }
    },
    watch:{
      isActive(value){
        if(value&&localStorage.getItem('_sendNotice')){
          this.sendSinaEvent();
        }
        // 判断是否是借钱老用户
        // this.bannerShow = true;   //删除判断时需显示
        this.checkFinanceReceive();

      }
    },
    computed: {},
    mounted() {
      sessionStorage.removeItem("myPlanInfo");
      sessionStorage.removeItem("_planisOver");
      sessionStorage.removeItem("_planState");
      let channel = window.localStorage.getItem("channel");
      // 成功页||成功挽留页埋点
      if (
        localStorage.getItem("_AgainActive") ||
        localStorage.getItem("_ActiveChannel")
      ) {
        //借钱渠道
        if (channel == "55001") {
          this.actionCount("borrowPv1");
        } else {
          //本人加入放弃支付授权再次激活 埋点
          this.actionCount("pv1");
        }
      } else {
        //借钱渠道
        if (channel == "55001") {
          this.actionCount("borrowPv");
        } else {
          this.actionCount("pv");
        }
      }
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", function () {
        history.pushState(null, null, document.URL);
      });
      if(this.$route.query.type){
        this.paySign();
      }else{
        this.getPlanStatus();
      }
      this.activeInfoShow = localStorage.getItem('channel')&&localStorage.getItem('channel').toString().substring(0,2)=="39";
    },
    methods: {
      getPlanStatus() {
        this.$get(Api.getMyPolicy, {plan_code:'XL001'}).then(ret => {
          if (ret.code === 0) {
            this.fyPlanState =ret.data.plan_list_state && ret.data.plan_list_state['XL003'];
            if (ret.data.plan_list_state && (ret.data.plan_list_state['XL001'] == 'activated' || ret.data.plan_list_state['XL002'] == 'activated')) {
              this.isShow = true;
              this.addFYPlan();
            } else {
              this.sinaActive();
            }
          } else {
            this.$toast("请求失败，请刷新重试");
          }
        })

      },
      sinaActive() {
        this.$post(Api.activationPolicy, {tran_no: 'aaa'}).then(ret => {
          this.isShow = true;
          if (ret.code === 0) {
            this.addFYPlan();
            this.isActive = true;
          } else {
            this.isActive = false;
            this.$toast(ret.msg || "请求失败，请刷新重试");
          }
        })
      },
      paySign(){
        let tranNo = this.$route.query.tran_no;
        if (!tranNo) {
          this.$toast("请求失败，请刷新重试");
          this.isShow = true;
          this.isActive = false;
          return;
        }
        this.$post(Api.paySign, {tran_no: tranNo}).then(ret => {
          this.isShow = true;
          if (ret.code === 0) {
            this.isActive = true;
          } else {
            this.isActive = false;
            this.$toast(ret.msg || "请求失败，请刷新重试");
          }
        })
      },
      jumpUrl(type) {
        if (this.sendchecked && this.isActive && !localStorage.getItem('_sendNotice')) {
          this.sendSinaEvent();
        }
        localStorage.removeItem('_sendNotice');
        let url = '/weibo/insure-plan';
        let action = 'center_click';
        if (type&&type=='add') {
          action = 'add';
          url = '/weibo/insure-add';
        }else if (type&&type=='share') {
          action = 'share_click';
          url = '/weibo/activity-valent?channel=30056';
        }
        this.actionCount(action,()=>{
          this.$router.replace(url);
        })
      },
      sendSinaEvent() {
        this.$post(Api.sendJoinNotice, {plan_code: 'XL001'});
        this.actionCount('send_click');
      },
      addFYPlan(){
        if(this.fyPlanState=='not_join'){
          this.$get(Api.getPolicyList, {}).then(res => {
            if (res.code == 0) {
              if(res.data.policy_list.length>0){
                let item = res.data.policy_list[0].insured
                this.$post(Api.addPolicy, {
                  user_name: item.name,
                  certi_no: item.idno_init,
                  help_type:'1',
                  work_type:'1',
                  certi_type: "00",  //证件类型
                  relation: '00', //关系
                  mobile: item.mobile || '' ,
                  plan_code: 'XL003',
                  channel: '810028',
                  amount: 0,
                }).then(ret => {
                  this.getPlanList();
                })
              }
            } else {
              this.$toast(res.msg || "请求超时，请刷新重试");
            }
          })
        }else{
          this.getPlanList();
        }


      },
      getPlanList() {
        this.isShow = true;
        this.isActive = true;
        // this.$get(Api.getPolicyList, {}).then(res => {
        //   if (res.code == 0) {
        //     if(res.data.policy_list.length>0){
        //       let myPlans = res.data.policy_list[0].plans;
        //       myPlans.forEach(item=>{
        //         if(item.plan_code=='XL003'){
        //           this.fyPlanInfo = item;
        //         }
        //       })
        //       this.isShow = true;
        //       this.isActive = true;
        //     }
        //   } else {
        //     this.$toast(res.msg || "请求超时，请刷新重试");
        //   }
        // })
      },
      // 判断是否是借钱老用户
      checkFinanceReceive(){
        setTimeout(() => {
          this.bannerShow = true;
        }, 2000);
        this.$post(Api.get_finance_receive, {subSource: this.subSource}).then(ret => {
          this.bannerShow = true;
          if (ret.code == 0 && ret.msg.mobile) {
            this.financeMobile = ret.msg.mobile;
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "css/mixin";

  .suc_cont {
    margin: 0px auto 64px;
    text-align: center;
    padding-top: 166px;

    background-size: 76px 76px;
    background-position: center 90px;

    &.success {
      @include bg-image('sinaPaySuc');
    }

    &.error {
      @include bg-image('sinaPlanError');
    }

    .suc_icon {
      width: 76px;
    }
    .active_info{
      color: #939393;
      font-size: 22px;
      text-align: center;
      padding-bottom: 20px;
    }
    .check_box {
      margin: 30px 0 32px 170px;
      text-align: left;
    }

    .cenbtn {
      width:336px;
      height:68px;
      margin: 0 auto 30px;
      font-size: 28px;
      line-height: 68px;
      display: block;
      border-radius:34px;
    }

    .txt {
      padding: 28px 0 20px;
      font-size: 34px;
      line-height: 48px;
      font-weight: 600;
    }

    .href {
      color: $primary;
    }
    .fy_plan{
      font-size: 24px;
      font-weight: bold;
      span{
        color: $primary;
      }
    }
    .fy_info{
      padding: 40px 180px 40px 184px;
      margin-bottom: 70px;
      text-align: left;
      position: relative;
      background-color:rgba(255,255,255,1);
      box-shadow:0px 5px 8px 0px rgba(206,197,191,0.2);
      border-radius:20px;
      border:1px solid rgba(255,130,0,1);
      @include bg-image('DBPaySucIcon1');
      background-size: 130px 130px;
      background-position: 30px center;
      color: #B7B6B6;
      &:after{
        content: '';
        @include ct;
        right: 30px;
        width: 130px;
        height: 130px;
        @include bg-image('DBPaySucIcon2');
        background-size: 130px 130px;
      }
      .plan_name{
        font-size: 30px;
        color: #333;
        padding-bottom: 8px;
      }
      .plan_info{
        @include single-line;
      }
    }
    .myAd{
      margin: 50px 40px 0;
    }
  }

  .add_frimly {
    img {
      width: 100%;
    }

  }
</style>
