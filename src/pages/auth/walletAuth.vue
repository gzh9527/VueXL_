<template>
</template>

<script>
  import Api from '../../utils/apiConfig';

  export default {
    name: "walletAuth",
    created() {
      this.actionCount('pv');
      let url = window.location.origin + '/weibo/wallet-paysuc';
      this.$get(Api.walletSign, {return_url: url}).then(ret => {
        if (ret.code == 0) {
          this.$sinaAlert({
            title: '请在个人中心页查看您的互助计划凭证',        //提醒文字
            onlyHasTitle: true,
            callback: this.sumbitEvt,
            showClose: false,        // 关闭按钮
            confirmButtonText: '到个人中心查看',
            onlyBtn: true
          });
          if (ret.data.bind_state == 0 && ret.data.url) {
            window.location.href =  ret.data.url;
          }
        }
      })
    },
    methods: {
      sumbitEvt() {
        this.$router.push('/weibo/insure-plan');
      }
    }
  }
</script>

<style scoped>

</style>
