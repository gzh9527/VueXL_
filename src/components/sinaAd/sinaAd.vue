<template>
  <div class="sina_ad" v-if="adInfoShow && adInfo">
    <img-alert v-if="isAlert" :adInfo="adInfo" ></img-alert>
    <div class="page_ad" v-else>
      <div :class="titleClass ? titleClass : 'normalTitle'" v-if="title">{{title}}</div>
      <div class="sina_ad_img">
        <img :src="adInfo.content" @click="fnclick">
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
          let placeId;
          switch (this.id) {
            case 'weibo-insure-plan-1':
              placeId = '64ea4c9ccab54f8a9e2084e4a02a4832';
              break;
            case 'weibo-insure-add-1':
              placeId = 'a3e4914c6d504480aefa8650ecbc4672';
              break;
            case 'weibo-public-list-1':
              placeId = '01599494c432497382e0bcc3084c59cc';
              break;
          }
          this.$post(Api.getAdvertList, {placeId: placeId}).then(ret => {
            if (ret&&ret.length>0) {
              let uid = sessionStorage.getItem('weiboInfo') ? JSON.parse(sessionStorage.getItem('weiboInfo'))['uid'] : '';
              let adDetail = ret[0];
              adDetail.url = ret[0].url + uid;
              adDetail['sessionName'] = this.id;
              adDetail['adType'] = 'withoutAd';
              this.adInfo = adDetail;
              this.advertNum('1');
            }
          })
        }

      },
      // 广告图埋点-春博接口
      advertNum(type,callback){
        let params = {
          type:type,
          advertId:this.adInfo.id,
          placeId:this.adInfo.placeId
        };
        if (localStorage.getItem('_userToken')) {
          this.adActionNum(params,callback);
        } else {
          this.setAdActionNum(params, '-1',callback); //未授权埋点
        }
      },
      fnclick(){
        if (localStorage.getItem('_userToken')) {
          this.actionCount('ad_click');
        } else {
          this.setActionCount('ad_click', '-1',null); //未授权埋点
        }
        this.advertNum('2',this.gotoUrl)
      },
      gotoUrl(){
        if (this.adInfo.url) {
          window.location.href = this.adInfo.url;
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
