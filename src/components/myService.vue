<template>
  <div class="page_bot" :class="{bottom:bottom,hasintro:introShow}">
    <router-link to="/intro-view" class="intro_txt" v-if="introShow"><i class="icon"></i>如何找到我的全面互助计划</router-link>
    <div class="btns" :class="{hasotherCss:hasMoreBtn}">
      <div class="btn" v-if="hasOtherbtn" @click="scrolltop">返回顶部</div>
      <div class="btn" id="service" data-clipboard-text="`我想咨询下关于【新浪互助】的问题`" @click="openService">我的客服</div>
      <div class="btn" v-if="hasMoreBtn" @click="joinPlan">0元加入</div>
    </div>
    <div :class="{mbot180:fixedBotBtn}">
      <div class="login_icon" ></div>
    </div>
    <div class="fixed_bot" v-if="fixedBotBtn">
      <button class="sina_btn primary radius max"  @click="joinPlan()">0 元 加 入</button>
    </div>

  </div>
</template>

<script>
  import Api from '../utils/apiConfig'
  import callService from '../assets/js/callService';
  export default {
    name: "myService",
    props: {
      bottom: false,
      hasOtherbtn: false,
      hasMoreBtn: false,
      hasService: true,
      introShow: false,
      fixedBotBtn:false,
    },
    mixins:[callService],
    methods:{
      scrolltop(){
        window.scroll(0,0)
      },
      myservice(){
        let openid = sessionStorage.getItem('openid');
        if (openid) {
          this.getUrl(openid);
        } else {
          this.$get(Api.getUserMid).then(ret=>{
            openid = ret['assemble_openid'];
           if(openid){
             sessionStorage.setItem('openid',openid);
             this.getUrl(openid);
           }else{
             window.location.href = 'https://bh.udesk.cn/im_client/?web_plugin_id=61521&group_id=32483';
           }

          })

        }
      },
      getUrl(openid){
        this.$getByJosn(Api.getCustomerServerLink, {
          openid: openid
        }).then(ret => {
          if (ret.code == 0) {
            window.location.href = ret.msg;
          } else {
            this.$toast(ret.msg || "请求失败，请刷新重试");
          }

        })
      },
      openService(){
        let path = this.$route.path;
        path == '/weibo/insure-plan' ? this.actionCount('myService_click', () => {
          this.callService();
        }) : this.callService();
      },
      joinPlan(){
        this.$router.push('/weibo/insure-plan?channel=30046');
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../pages/css/mixin";

  .page_bot {
    background: #fff;
    width: 100%;
    border-top: 40px solid #f2f2f2;
    margin-top: 0;

    &.bottom {
      position: fixed;
      bottom: 0;
      left: 0;
      margin-top: 0px;
      &.hasintro{
        position: absolute;
      }
    }
    .intro_txt{
      .icon{
        width: 36px;
        height: 36px;
        display: inline-block;
        vertical-align: bottom;
        margin-right: 8px;
        @include bg-image('introIcon');
        background-size: cover;
      }
      width: 100%;
      display: block;
      line-height: 38px;
      background: $col_bg;
      font-size: 26px;
      font-weight: 600;
      text-align: center;
      padding: 90px 0 30px;
      color: $primary;
    }
    .btns{
      height: 82px;
      line-height: 82px;
      color: $primary;
      text-align: center;
      border-top: 1px solid #e6e6e6;
      @include fj();
      .btn{
        @include flex(1);
        border-left: 1px solid #e6e6e6;
        &:first-child{
          border: 0;
        }
      }
      &.hasotherCss{
        padding: 30px 40px;
        height: 140px;
        line-height: 82px;
        border-top: 0;
        .btn{
          @include flex(1);
          color: #fff;
          background:$primary;
          border-radius:40px;
          border:1px solid $primary;
          &:first-child{
            color: $primary;
            background:rgba(255,255,255,1);
            border-radius:40px;
            border:1px solid $primary;
            margin-right: 40px;

          }
        }
      }
    }


    .login_icon {
      width: 100%;
      height: 102px;
      background-color: #fff;
      background-position: center;
      background-size: 350px 38px;
      border-top: 1px solid #e6e6e6;
      @include page-bg-image('sinaLogo');

    }
    .mbot180{
      padding-bottom: 180px;
    }
    .fixed_bot{
      position: fixed;
      border-top: 1px solid #efefef;
      bottom: 0;
      left: 0;
      background: #fff;
      width: 100%;
      box-sizing: border-box;
      padding: 30px 20px 50px 40px;
    }
  }
</style>
