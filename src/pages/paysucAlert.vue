<template>
  <!--ui-mask-->
  <div class="mask" id="mask" v-if="showmask&&adInfo">
    <!--支付成功 弹层-->
    <transition name="fade">
      <div class="layer" v-if="showAlertFlag && adInfo">
        <div class="contents">
          <img :src="adInfo.img_url +'?v=200'"  @click="fnclickAlert">
<!--          <div class="check_box" :class="{checked:sendSina}" @click.stop="sendSina=!sendSina">-->
<!--            发微博邀请更多好友共享互助-->
<!--          </div>-->
          <div class="close" @click="closeAlert"></div>
        </div>
      </div>
    </transition>
    <!--支付成功 弹层 end-->
  </div>
</template>
<script>
  import Api from "../utils/apiConfig";
  export default {
    name: 'paysucAlert',
    data() {
      return {
        showmask: true,
        showAlertFlag: false,
        adInfo:null,
        sendSina:true,
      }
    },
    computed: {},
    created() {
      this.showAlert();
      const mask = document.getElementById('mask');
      mask && this.preventDefaults(mask);
      this.getAdView();
    },
    methods: {
      showAlert() { //展示弹层
        this.showmask = true;
        setTimeout(() => {
          this.showAlertFlag = true
        }, 60)
      },
      preventDefaults(mask) {
        mask.addEventListener('touchmove', function (e) {
          e.preventDefault();
        }, false);
      },
      closeAlert() { //关闭弹层
        this.showAlertFlag = false;
        setTimeout(() => {
          this.showmask = false
        }, 300)
      },
      fnclickAlert() { //弹层点击
        this.actionCount('banner_click');
        setTimeout(() => {
          // this.sendSinaEvent();
          if (this.adInfo.link) {
            window.location.href = this.adInfo.link;
          } else {
            this.$router.push({
              path: '/weibo/loadpage'
            })
          }
        }, 300)
      },
      sendSinaEvent(){
        if (this.sendSina) {
          this.$post(Api.sendJoinNotice)
          this.actionCount('send_click');
        }
        this.closeAlert();
      },
      getAdView(){
        this.$get(Api.getAdView,{pos:'weibo-insure-paysuc-1'}).then(ret=>{
          if(ret.code==0){
            this.adInfo = ret.data;
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "./css/mixin";

  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    z-index: 1111;
    transition: opacity 0.8s;
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.8);
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .layer {
    width: 100%;
    height: 100%;
    z-index: 999;
    position: relative;

    .contents {
      width:600px;
      @include center;
      padding-bottom: 120px;
      .suc_alert_cont{
        width:100%;
        @include bg-image('alertLogo');
        background-position:  center 56px;
        background-size: 150px 164px;
        background-color:rgba(255,255,255,1);
        border-radius:20px;
        padding-top: 264px;
        text-align: center;
        .suc_txt{
          font-size: 40px;
          font-weight: 600;
        }
        .suc_desc{
          padding: 30px 0 60px;
          color: #646464;
        }



        .bot_btn{
          padding: 46px 55px;
          border-radius:0 0 20px 20px;
          background: $primary;

        }
      }
    }
    .check_box {
      position: absolute;
      bottom: 270px;
      left: 0;
      width: 100%;
      text-align: center;
      &.checked::before{
        @include bg-image('sinaIconChecked2');

      }
    }
    .close {
      position: absolute;
      bottom: 0px;
      @include cl;
      width: 64px;
      height: 64px;
      @include bg-image('sinaDialogClose');
      background-size: cover;
      background-position: center 0;
    }
  }

  /*弹层 动画 end*/
</style>
