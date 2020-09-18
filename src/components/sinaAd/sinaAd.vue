<template>
  <div class="sina_ad" v-if="adInfoShow && adInfo">
    <img-alert v-if="isAlert" :adInfo="adInfo" ></img-alert>
    <div class="page_ad" v-else>
      <div :class="titleClass ? titleClass : 'normalTitle'" v-if="title">{{title}}</div>
      <div class="sina_ad_img">
        <img :src="adInfo.img_url" @click="fnclick">
        <div class="sina_ad_btn" @click="closeAd" v-if="hasCloseBtn">
          <i class="close"></i>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import imgAlert from '../imgAlert';
  import Api from '../../utils/apiConfig';
  import {mixinActions} from '../../assets/js/mixinActions'

  export default {
    name: "sinaAd",
    components:{
      imgAlert
    },
    mixins:[mixinActions],
    props:{
      id:String,
      isShow:{
        type:Boolean,
        default:true
      }, // 是否显示
      isAlert:false,
      title:String,
      titleClass:String,
      hasCloseBtn:false
    },
    data(){
      return{
        adInfo:null,
        adInfoShow:true
      }
    },
    created(){
      //2020/8/3  谭川要求不显示泰康广告
      //2020/9/9  小雪要求显示添加家人广告
      if(sessionStorage.getItem(this.id.toString())){
        return;
      }
      this.getAdView();

    },
    methods:{
      getAdView() {
        if (this.id == 'weibo-insure-plan-10') {
          this.actionCount('adAlert_show');
          this.adInfo = {
            img_url: 'http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/planAddUserAlert.png',
            urlLink: '/weibo/insure-add?channel=50004',
            sessionName: 'weibo-insure-plan-10',
          }
        }else {
          // this.$get(Api.getAdView, {pos: this.id}).then(ret => {
          //   if (ret.code == 0) {
          //     if(ret.data){
          //       let uid = sessionStorage.getItem('weiboInfo') ? JSON.parse(sessionStorage.getItem('weiboInfo'))['uid'] : '';
          //       ret.data.link = ret.data.link+ uid;
          //       ret.data['sessionName'] = this.id;
          //       this.adInfo = ret.data;
          //     }
          //   }
          // })
        }

      },
      fnclick(){
        if (localStorage.getItem('_userToken')) {
          this.actionCount('ad_click',this.gotoUrl);
        } else {
          this.setActionCount('ad_click', '-1',null,this.gotoUrl); //未授权埋点
        }
      },
      gotoUrl(){
        if (this.adInfo.link) {
          window.location.href = this.adInfo.link;
        }
      },
      closeAd(){
        this.adInfoShow = false;
        sessionStorage.setItem(this.id.toString(),'hidden');
      }
    }
  }
</script>

<style lang="scss" scoped>
 .sina_ad{
   .sina_ad_img{
     position: relative;
   }
   .sina_ad_btn{
     .close{
       position: absolute;
       top: 30px;
       right: 32px;
       width: 36px;
       height: 36px;
       background-image: url("../../pages/images/sinaDialogClose_2x.png");
       background-size: 36px 36px;
     }
     position: absolute;
     top: 0;
     right: 0;
     width: 72px;
     height: 72px;
   }
   .normalTitle{
     padding-left: 12px;
     padding-right: 12px;
   }
 }
</style>
