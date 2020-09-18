<template>
  <div class="sina_page back_fff">
    <div class="sina_cont" v-if="isShow">
      <div class="suc_cont" :class="{success:isActive,error:!isActive}">
        <div class="txt">{{isActive?'已加入成功':'互助权益激活失败'}}</div>
        <div class="check_box" v-if="isActive" :class="{checked:sendchecked}" @click.stop="sendchecked=!sendchecked">
          发微博邀请更多好友共享互助
        </div>
        <div class="sina_btn radius primary cenbtn" @click="jumpUrl('adduser')" v-if="isActive">继续添加家人</div>
        <div class="sina_btn radius default cenbtn" @click="jumpUrl('plan')" v-if="isActive">到个人中心查看</div>
        <router-link to="/weibo/insure-active?planCode=XL003" class="href" v-else>立即激活</router-link>

      </div>
      <div class="add_frimly" @click="jumpUrl('ad')">
                <!-- <img src="../images/sinaImgAdduser_2x.png"  v-if="isActive"> -->
        <template v-if="adInfo" >
          <img  :src="adInfo.img_url">
          <div class="gift_add">{{this.timeCounts}}秒后投保</div>
        </template>

      </div>
    </div>
    <suc-alert v-if="isActive"></suc-alert>
  </div>
</template>

<script>
    import sucAlert from '../paysucAlert.vue'
    import Api from "../../utils/apiConfig";

    export default {
        name: "paySuc",
        components: {
            sucAlert
        },
        data() {
            return {
                planCode:'XL001',
                isShow: false,
                isActive: false,
                adInfo: null,
                sendchecked: true,
                timeInterval:null,
                timeCounts:5
            }
        },
        computed: {},
        mounted() {
            sessionStorage.removeItem('myPlanInfo');
            sessionStorage.removeItem('_planisOver');
            this.getPlanStatus();
        },
        methods: {
            getPlanStatus() {
                this.$get(Api.getMyPolicy,{plan_code:'XL003'}).then(ret => {
                    if (ret.code === 0) {
                        if (ret.data.plan_list_state && ret.data.plan_list_state['XL003'] == 'activated') {
                            this.isShow = true;
                            this.isActive = true;
                            this.getGiftAdView();
                            this.actionCount('pv');
                        } else {
                            this.sinaActive();
                        }
                    } else {
                        this.$toast("请求失败，请刷新重试");
                    }
                })

            },
            sinaActive() {
                let tranNo = this.$route.query.tran_no;
                if (!tranNo) {
                    this.$toast("请求失败，请刷新重试");
                    this.isShow = true;
                    this.isActive = false;
                    return;
                }
                this.$post(Api.activationPolicy, {tran_no: tranNo}).then(ret => {
                    if (ret.code === 0) {
                        this.isShow = true;
                        this.isActive = true;
                        this.actionCount('pv');
                        this.getGiftAdView();
                    } else {
                        this.isShow = true;
                        this.isActive = false;
                        this.$toast(ret.msg || "请求失败，请刷新重试");
                    }
                })
            },
            getGiftAdView() {
                if(!this.$route.query.insuchannel){
                    return false;
                }
                this.$get(Api.getAdView, {pos: 'weibo-insure-paysuc-2'}).then(ret => {
                    if (ret.code == 0) {
                        this.adInfo = ret.data;
                        this.timeInterval = setInterval(()=>{
                           if(this.timeCounts>1){
                               this.timeCounts--;
                           }else{
                               this.jumpUrl('ad');
                               clearInterval(this.timeInterval)
                           }
                        }, 1000)
                    }
                })
            },
            jumpUrl(type) {
                this.sendSinaEvent();
                clearInterval(this.timeInterval)
                if (type&&type=='plan') {
                  this.$router.push('/weibo/insure-plan')
                }else if (type&&type=='adduser') {
                  this.$router.push('/weibo/insure-add')
                } else if (type&&type=='ad'){
                    if (this.adInfo.link) {
                        this.actionCount('banner_click');
                        window.location.href = this.adInfo.link +'&channel='+this.$route.query.insuchannel
                    }
                }else {
                    if (this.isActive) {
                        this.actionCount('add_click');
                        this.$router.push('/weibo/insure-add')
                    }
                }
            },
            sendSinaEvent(){
                if (this.sendchecked && this.isActive) {
                    this.$post(Api.sendJoinNotice,{plan_code:'XL003'});
                    this.actionCount('send_click');
                }
            },
        },
        destroyed() {
            clearInterval(this.timeInterval)
        }
    }
</script>

<style lang="scss" scoped>
  @import "../css/mixin";

  .suc_cont {
    margin: 0px auto 64px;
    text-align: center;
    padding-top: 166px;

    background-size: 76px 76px;
    background-position: center 90px;

    &.success {
      @include level-bg-image('sinaPaySuc');
    }

    &.error {
      @include level-bg-image('sinaPlanError');
    }

    .suc_icon {
      width: 76px;
    }

    .check_box {
      margin: 20px 0 50px;
      &.checked::before {
        @include level-bg-image('sinaIconChecked2');

      }
    }

    .cenbtn {
      width:336px;
      height:68px;
      font-size: 28px;
      line-height: 68px;
      display: block;
      margin: 0 auto 30px;
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

  }

  .add_frimly {
    min-height: 450px;
    img {
      width: 100%;
    }
    position: relative;
    .gift_add{
      @include cl;
      bottom: 40px;
      width:420px;
      height:84px;
      line-height: 84px;
      color: #fff;
      text-align: center;
      font-size: 34px;
      background:linear-gradient(270deg,rgba(255,188,51,1) 0%,rgba(255,130,0,1) 100%);
      border-radius:45px;
    }

  }
</style>
