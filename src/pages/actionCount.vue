<template>
  <div class="sina_page"></div>
</template>

<script>

  export default {
    name: "actionCount",
    data(){
      return{
        returnUrl:null
      }
    },
    created() {
      let fullPath = this.$route.fullPath;
      this.returnUrl = fullPath.substring(fullPath.indexOf('returnUrl='),fullPath.length).replace('returnUrl=','');
      if (this.returnUrl) {
        let channel = this.returnUrl.substring(this.returnUrl.indexOf('subC'),this.returnUrl.indexOf('_cId'));
        sessionStorage.setItem('_countChannel',channel);
      }
      this.actionCount('pv',this.gotoUrl);

    },
    methods:{
      gotoUrl(){
        if (this.returnUrl) {
          let userInfo = sessionStorage.getItem('weiboInfo');
          if (userInfo) {
            this.returnUrl = this.returnUrl + JSON.parse(userInfo).uid || 0;
          }
          location.replace(unescape(this.returnUrl.toString()))
        }else{
          this.$router.replace('/weibo/insure-join');
        }
      }
    },
    destroyed() {
      sessionStorage.removeItem('_countChannel');
    }

  }
</script>

<style lang="scss" scoped>
  .sina_page {
    background-color: #fff;
    background-image: url("./images/loading.gif");
    background-repeat: no-repeat;
    background-size: 200px 200px;
    background-position: center;
    z-index: 99999;
  }
</style>
