<template>
  <!--ui-mask-->
  <div class="mask" id="mask" v-if="showmask&&adInfo">
    <!--支付成功 弹层-->
    <transition name="fade">
      <div class="layer" v-if="showAlertFlag && adInfo">
        <div class="contents">
          <div class="alert_img_cont"  @click="fnclickAlert">
            <img :src="adInfo.img_url +'?v=200'" >
            <img :src="adInfo.btn_url" v-if="adInfo.btn_url" class="alert_img_btn">
          </div>

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
    export default {
        name: 'imgAlert',
        props:{
            adInfo:null,
        },
        data() {
            return {
                showmask: true,
                showAlertFlag: false,
                sendSina:true,
            }
        },
        computed: {},
        created() {
            this.showAlert();
            const mask = document.getElementById('mask');
            mask && this.preventDefaults(mask);
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
              this.showmask = false;
              sessionStorage.setItem(this.adInfo['sessionName'], 'hidden');
            },
            fnclickAlert() { //弹层点击
                if(!this.adInfo['noRecordClick']){
                  if (localStorage.getItem('_userToken')) {
                    this.actionCount('banner_click');
                  } else {
                    this.setActionCount('banner_click', '-1'); //未授权埋点
                  }
                }
                setTimeout(() => {
                    this.closeAlert();
                    if (this.adInfo.link) {
                      window.location.href = this.adInfo.link;
                    } else if (this.adInfo.urlLink) {
                      this.$router.push(this.adInfo.urlLink);
                    }
                }, 100)
            },


        }
    }
</script>
<style lang="scss" scoped>
  @import "../pages/css/mixin";

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
      width:100%;
      @include center;
      padding-bottom: 120px;
      .alert_img_cont{
        position: relative;
        .alert_img_btn{
          width: 360px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 14px;
        }
      }

    }
    .close {
      position: absolute;
      bottom: 0px;
      @include cl;
      width: 64px;
      height: 64px;
      @include page-bg-image('sinaDialogClose');
      background-size: cover;
      background-position: center 0;
    }
  }

  /*弹层 动画 end*/
</style>
