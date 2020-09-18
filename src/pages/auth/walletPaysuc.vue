<template>

</template>

<script>

  export default {
    name: "walletPaysuc",
    created() {
      this.actionCount('pv');
      this.$sinaAlert({
        title: '代扣协议签约成功，请在个人中心页查看您的互助计划凭证',        //提醒文字
        onlyHasTitle: true,
        callback: this.sumbitEvt,
        showClose: false,        // 关闭按钮
        confirmButtonText: '到个人中心查看',
        onlyBtn: true
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
