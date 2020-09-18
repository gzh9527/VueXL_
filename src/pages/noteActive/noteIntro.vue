<template>
  <div class="sina_page" @click="jumpUrl">
    <div class="sina_hasbg"></div>
  </div>
</template>

<script>
  export default {
    name: "noteActive",
    created() {
      if (localStorage.getItem('_userToken')) {
       this.actionCount('pv',()=>{
         this.jumpUrl();
       })
      } else {
        this.setActionCount('pv', '-1',null,()=>{
          this.jumpUrl();
        }); //未授权埋点
      }

    },
    methods:{
      jumpUrl() {
        let ua = navigator.userAgent.toLowerCase();
        let channel = this.$route.query.channel || '10030';
        localStorage.setItem('channel',channel);
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
          //在微信中打开
          this.$router.replace('/weibo/note-active');
        } else {
          if (window.location.hostname == 'sina.bihubao.com') {
            window.location.href = 'sinaweibo://browser?url=https%3A%2F%2Fsina.bihubao.com%2Fweibo%2Fnote-active%3Fchannel%3D' + channel
          } else {
            window.location.href = 'sinaweibo://browser?url=http%3A%2F%2Fsinatest.bihubao.com%2Fweibo%2Fnote-active%3Fchannel%3D' + channel
          }
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "../css/mixin";
  .sina_page{
    background-color: #fff;
    .sina_hasbg {
      background:url("http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/noteActivebg.png") no-repeat #fff center;
      background-size: 100% auto;
      min-height: 1206px;
    }

  }
</style>
