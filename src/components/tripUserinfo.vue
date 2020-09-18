<template>
  <transition name="fade">
      <div class="top_common">
        <div class="top_bg" v-if="topBgShow"></div>
        <div class="user_info">
          <div class="user_img">
            <img v-if="weiboInfo&&weiboInfo.profile_image_url" :src="weiboInfo.profile_image_url" >
          </div>
          <div class="user_name">{{weiboInfo&&weiboInfo.screen_name}}</div>
        </div>
      </div>      
    </transition>
</template>

<script>
import Api from '../utils/apiConfig'
  export default {
    name: "sinaAlert",
    props:{
      topBgShow:{
        type: Boolean,
        default: true
      },      
    },
     
    data() {
     return{
        weiboInfo:null,
     }
    },
    created(){
      if (localStorage.getItem('_userToken')) {
          if(sessionStorage.getItem('weiboInfo')){
            this.weiboInfo = JSON.parse(sessionStorage.getItem('weiboInfo'));
          }else{
            this.getSinaInfo();
          }
      } 
    },
    methods:{
       getSinaInfo() {
          this.$get(Api.getweiboInfo, {}).then(res => {
            if (res.code == 0) {
              this.weiboInfo = res.data.user;                  
              sessionStorage.setItem('weiboInfo', JSON.stringify(this.weiboInfo))
            } else {
              this.$toast(res.msg || "请求超时，请刷新重试");
            }
          })

        }
    }
    
  }
</script>
<style lang="scss" scoped>
  @import "../pages/css/mixin";
  .top_common{
    .top_bg{
      @include page-bg-image('tripBanner');
      width: 100%;
      height: 120px;
      background-position: center;
      background-size: 100% auto;
    }
  }
  .user_info{
    padding: 50px 0 40px;
    text-align: center;
    background: #fff;
    .user_img{
      width: 150px;
      height: 150px;
      margin: 0 auto 40px;
      background: #efefef;
      border-radius: 50%;
      overflow: hidden;
      img{
        width:100%;
      }
    }
    .user_name{
      width: 100%;
      font-size: 34px;
      text-align: center;
    }
  }
</style>
