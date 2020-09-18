<template>
  <div class="sina_page">
    <div class="user_info">
      <img class="user_img" v-if="weiboInfo" :src="weiboInfo.profile_image_url||'https://imgs.bihubao.com/Public/images/insureAdView/images/logo.png'">
      <div class="user_name"><span>{{userName}}</span><span>开通新浪免密支付</span><span>权益立即激活</span></div>
    </div>
    <div class="sina_bot ">
      <img src="http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/noteActiveRedpacketBtn.png?v=1">
      <div class="sina_btn_bind" @click="payActive()"></div>
      <div class="daojishi">剩余时间   {{getTimeValue(timeHH) }}：{{getTimeValue(timeMM) }}：{{getTimeValue(timeSS) }}</div>
    </div>
  </div>
</template>

<script>
  import Api from "../../utils/apiConfig";
  export default {
    name: "noteRedpack",
    data(){
      return{
        planCode: null,
        userName:null,
        weiboInfo:null,
        joinState:null,
        isHasredpack:false,
        planState: false,
        timeHH:23,
        timeMM:59,
        timeSS:59,
        timeInterval:null,
      }
    },
    created(){
      localStorage.removeItem('_AgainActive');
      localStorage.removeItem('_ActiveChannel');
      this.planCode = this.$route.query.planCode ? this.$route.query.planCode : 'XL001';
      this.getPlanState(this.planCode);
    },
    methods:{
      pageLoad(){
        this.planCode = this.$route.query.planCode ? this.$route.query.planCode : 'XL001';
        this.isHasredpack = localStorage.getItem('_isHasredpack') ? true : false;
        this.actionCount('pv');

        this.getWeiboInfo();
        let planInfo = sessionStorage.getItem('myPlanInfo') ? JSON.parse(sessionStorage.getItem('myPlanInfo')) : null;
        if(!planInfo){
          this.getPlanList();
        }else if(planInfo.dataList.length>0){
          this.userName =planInfo.dataList[0].insured.name;
        }
        this.startInterval();
      },
      getPlanList(){
        this.$get(Api.getPolicyList, {}).then(res => {
          if (res.code == 0) {
            let dataList = res.data.policy_list;
            if(dataList.length>0){
              this.userName =dataList[0].insured.name;
            }
          }
        })
      },
      createRedpacket(){
        if (!this.isHasredpack) {
          this.$post(Api.createTicket, {
            sign: "3f0ce9fbe24931fb6bbdddae907263a7"
          }).then(ret=>{
            this.isHasredpack = true;
            localStorage.setItem('_isHasredpack','263a7');
            if(ret.code==0){
              this.$toast("领取成功")
            }else{
              this.$toast("已领取")
            }
          })
        }
      },
      //开通免密支付
      payActive(){
        this.actionCount('bind_click', () => {
          this.$post(Api.joinTicket, {
            sign: "898c4f832a7337c11dfcd8223afcf07c"
          })
          this.bindWallet();
        })
      },
      bindWallet(){
        let path = this.$route.path;
        path == '/weibo/insure-active' ? localStorage.setItem('_ActiveChannel', '10029') : localStorage.setItem('_AgainActive', '10029');
        this.$post(Api.bindWallet,{plan_code:this.planCode,insuchannel:this.$route.query.insuchannel}).then(ret=>{
          if (ret.code == 0) {
            if (ret.data.state == 'not_bind') {
              window.location.href = ret.data.url;
            } else if (ret.data.state == 'has_activated') {
              if(this.planCode == 'XL003'){
                this.$router.replace('/weibo/feiyan-paysuc?insuchannel='+this.$route.query.insuchannel);
              }else{
                this.$router.replace('/weibo/insure-paysuc');
              }
            }
          } else {
            this.$toast(ret.msg || "请求失败，请刷新重试");
          }
        })
      },
      //开始定时器
      startInterval(){
        this.closeInterval();
        this.timeInterval = setInterval(() => {
          --this.timeSS;
          if (this.timeSS < 0) {
            --this.timeMM;
            this.timeSS = 59;
          }
          if (this.timeMM < 0) {
            --this.timeHH;
            this.timeMM = 59
          }
          if (this.timeHH < 0) {
            this.timeSS = 0;
            this.timeMM = 0;
          }
        }, 1000)
      },
      //结束定时器
      closeInterval(){
        clearInterval(this.timeInterval);
        this.timeInterval = null;
      },
      getTimeValue(value) {
        return value > 9 ? value : '0' + value;
      }
    },
    beforeRouteLeave(to, from, next) {
      if (this['planState']) {
        next();
      } else if (to.path != '/weibo/insure-paysuc' && to.path != '/weibo/feiyan-paysuc') {
        this.$sinaConfirm({
          title: '风险提示',        //提醒文字
          onlyHasTitle: false,
          desc: '<p><img src="http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/noteActiveRedpacketAlert.png?v=2"></p>',
          showClose: false,        // 关闭按钮
          confirmButtonText: '放弃红包，退出',
          cancelButtonText: '继续开通',
          size:'medium'
        }).then(() => {
          this.closeInterval();
          this.actionCount('cancal_click', () => {
            next();
          });
        }).catch(() => {
          this.closeInterval();
          this.actionCount('sumbit_click', () => {
            next(false);
            this.bindWallet();
          });

        });
      } else {
        next()
      }
    },


  }
</script>

<style lang="scss" scoped>
  @import "../css/mixin";
  .sina_page{
    background: url("http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/noteActiveRedpacketBg.png?v=1") #ce1f1f no-repeat;
    background-size: 100% auto;
    min-height: 1206px;
    height: 100%;
    .user_info{
      padding: 282px 0 0;
      text-align: center;
      line-height: 58px;
      .user_img{
        width: 78px;
        height: 78px;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 auto;

      }
      .user_name{
        padding-top: 20px;
        font-size: 22px;
        span{
          margin-left: 20px;
          &:first-child{
            margin-left: 0px;
          }
        }
      }
    }

    .sina_bot{
      width: 100%;
      position: absolute;
      top: 948px;
      left: 0;
      padding: 0px 38px;
      .sina_btn_bind{
        position: absolute;
        left: 0px;
        bottom:76px;
        width: 100%;
        height: 116px;
      }
      .daojishi{
        padding: 12px 0 30px;
        text-align: center;
        line-height: 34px;
        color: #fff;
      }
    }
  }
</style>
