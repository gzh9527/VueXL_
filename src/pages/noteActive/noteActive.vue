<template>
  <div class="sina_page">
    <div class="sina_hasbg">
      <img class="user_img" v-if="weiboInfo"
           :src="weiboInfo.profile_image_url||'https://imgs.bihubao.com/Public/images/insureAdView/images/logo.png'">
      <div class="btn" @click="btnClick"></div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "noteActive",
    data() {
      return {
        weiboInfo: null,
      }
    },
    created() {
      this.actionCount('pv');
      this.getWeiboInfo();
    },
    methods: {
      btnClick() {
        this.actionCount('clcik', () => {
          this.getPlanState('XL001', 'join');
        })
      },
      pageLoad() {
        this.$router.push('/weibo/insure-write');
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../css/mixin";

  .sina_page {
    background-color: #fff;
    .sina_hasbg{
      background: url("http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/noteActivePagebg.png?v=1") no-repeat;
      background-size: 100% auto;
      min-height: 1206px;
      .user_img{
        @include cl;
        top: 110px;
        width:120px;
        height:120px;
        border-radius: 50%;
        background:rgba(216,216,216,1);
        border:4px solid rgba(255,255,255,1);
      }
      .btn{
        width: 430px;
        height: 90px;
        @include cl;
        top: 1016px;
      }
    }

  }
</style>
