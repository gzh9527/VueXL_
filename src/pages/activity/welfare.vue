<template>
  <div class="sina_page">
    <div class="welfare_bg">
      <img src="http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/valent/activityWelfareBg_2x.png">
      <img src="./images/activeWelfareIcon.png" class="walfare_icon" @click="gotoshare">
      <div class="welfare_btn one" @click="getTask(1)"></div>
      <div class="welfare_btn two" @click="getTask(2)"></div>
      <div class="welfare_btn three"@click="getTask(3)"></div>
      <div class="welfare_btn four" @click="gotomore"></div>
    </div>
    <sina-alert v-if="alertShow" alertTitle="领取任务"
                isComponents="true"
                closeBtnShow="true"
                sumbitBtn="立即前往"
                className = "give_alert"
                @closeEvt="alertShow=false"
                @sumbitEvt="sumbitEvt">
      <div class="alert_info">
        <span v-if="taskId==1">前往钱包福利页—新手任务—领取45万互助保障，即可获得相应积分。</span>
        <span v-if="taskId==2">前往钱包福利页—限时任务—邀请好友加互助，即可获得相应积分。</span>
        <span v-if="taskId==3">前往钱包福利页—每日任务—守护家人领福利，即可获得相应积分。</span>
      </div>
      <div class="alert_desc">
        <div class="txt_desc">
          <div class="title">
            <span v-if="taskId==1">领取45万互助保障</span>
            <span v-if="taskId==2">邀请好友加互助</span>
            <span v-if="taskId==3">守护家人领福利</span>

          </div>
          <div class="desc">
            <span v-if="taskId==1">奖励+1888积分</span>
            <span v-if="taskId==2">奖励+2088积分</span>
            <span v-if="taskId==3">奖励+888积分</span>
          </div>
        </div>
        <div class="btn_desc" @click="sumbitEvt">立即前往</div>
      </div>
    </sina-alert>
  </div>

</template>

<script>
  import sinaAlert from "../../components/sinaAlert/sinaAlert.vue";
  export default {
    name: "welfare",
    components: {
      sinaAlert,
    },
    data(){
      return{
        alertShow: false,
        taskId:1,
      }
    },
    created() {
      if(!this.$route.query.channel){
        localStorage.setItem('channel','39000')
      }
      if (localStorage.getItem('_userToken')) {
        this.actionCount('pv');
      }else{
        this.setActionCount('pv', '-1'); //未授权埋点
      }
    },
    methods: {
      getTask(id){
        this.taskId = id;
        this.alertShow = true;
      },
      sumbitEvt(){
        window.location.href = 'https://pay.sc.weibo.com/center/mobile/task/index?source=huzhu';
        this.alertShow = false;
      },
      gotomore() {
        window.location.href = 'https://pay.sc.weibo.com/center/mobile/task/index?source=huzhu';
      },
      gotoshare(){
        window.location.href='https://weibo.com/7357622820/JhpmSbmgs'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sina_page {
    background:  #f48aa2;

    .welfare_bg {
      position: relative;
      .walfare_icon {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 96px;
        height: 96px;
      }
      .welfare_btn {
        width: 150px;
        height: 76px;
        position: absolute;
        right: 48px;
        &.one {
          top: 670px;
        }

        &.two {
          top: 830px;
          right: 60px;
        }

        &.three {
          width: 170px;
          top: 1004px;
          right: 68px;
        }
        &.four {
          width: 656px;
          height: 138px;
          bottom: 94px;
          right: 22px;
        }
      }

    }
    .alert_info{
      padding: 0 25px;
    }
    .alert_desc{
      margin: 18px 0 10px;
      border-radius:20px;
      border:1px solid rgba(244,138,162,1);
      padding: 26px 16px 26px 30px;
      display: flex;
      align-items:center;
      .txt_desc{
        flex: 1;
        .title{
          font-size: 28px;
        }
        .desc{
          font-size: 22px;
          color: #FF8503;
        }
      }
      .btn_desc{
        width:160px;
        height:54px;
        background:linear-gradient(270deg,rgba(255,188,51,1) 0%,rgba(255,130,0,1) 100%);
        border-radius:45px;
        text-align: center;
        line-height: 54px;
        color: #fff;
      }
    }



  }
</style>
