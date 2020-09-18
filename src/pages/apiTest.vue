<template>
  <div class="sina_page">
    <div class="sina_hasbg"></div>
  </div>
</template>

<script>
  import Api from "../utils/apiConfig";
  export default {
    name: "apiTest",
    created() {
      let ua = navigator.userAgent.toLowerCase();
      if (ua.match(/WeiBo/i) == "weibo") {
        //在新浪微博客户端打开
        let script = document.createElement('script');
        script.type = "text/javascript";
        let that = this;
        if (script.readyState) {
          script.onreadystatechange = function () {
            if (script.readyState == "loaded" || script.readyState == "complete") {
              script.onreadystatechange = null;
              that.pageLoad();
            }
          }
        } else {
          script.onload = function () {
            that.pageLoad();
          }
        }
        script.src = "https://tjs.sjs.sinajs.cn/open/thirdpart/js/jsapi/mobile.js";
        document.body.appendChild(script);
      }

    },
    methods:{
      pageLoad(){
        let that = this;
        this.$post(Api.getWbjsInfo,{
          mark:'sina_help',
          url: window.location.origin +'/weibo/api-test'
        }).then(ret=>{
          if(ret.code==0){
            let {appkey,noncestr,signature,timestamp} =ret.data;
            window.WeiboJS.init({
              'appkey' : appkey,
              'debug': false,
              'timestamp':timestamp,
              'noncestr': noncestr,
              'signature':signature,
              'scope': [
                'getNetworkType',
                'networkTypeChanged',
                'getBrowserInfo',
                'checkAvailability',
                'setBrowserTitle',
                'openMenu',
                'setMenuItems',
                'menuItemSelected',
                'setSharingContent',
                'openImage',
                'scanQRCode',
                'pickImage',
                'getLocation',
                'pickContact',
                'apiFromTheFuture'
              ]
            }, function(ret){
              alert('init done\n' + JSON.stringify(ret));
              if (ret.code == 200) {
                that.shareEvt();
              }
            });

          }else{
            alert('jiekouerr')
          }

        })
      },
      shareEvt(){
        WeiboJS.invoke("checkAvailability", {
          api_list: ["openImage", "getNetworkType", "scanQRCode", "pickImage", "getLocation", "queryPreloadCache", "deletePreloadCache", "setBrowserTitle", "getBrowserInfo", "openMenu", "setMenuItems", "loginWeiboAccount", "setSharingContent", "checkAvailability", "networkTypeChanged", "menuItemSelected"]
        }, function(e) {
          alert("API可用性结果：\n" + JSON.stringify(e))
        });
        WeiboJS.invoke("setMenuItems", {
          menus: ["shareToWeibo", "follow", "shareToMessage", "shareToWeixin", "shareToPYQ", "shareToQQ", "shareToQzone", "openInBrowser", "copyURL"],
          content: "测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据",
          icon: "https://imgs.bihubao.com/Public/images/insureAdView/images/logo.png",
          title: "新浪互助",
        }, function(e) {
          alert("setMenuItems 返回数据：" + JSON.stringify(e))
        });

      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./css/mixin";

  .sina_page {
    background-color: #fff;

    .sina_hasbg {
      background: url("http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/noteActivebg.png") no-repeat #fff center;
      background-size: 100% auto;
      min-height: 1206px;
    }

  }
</style>
