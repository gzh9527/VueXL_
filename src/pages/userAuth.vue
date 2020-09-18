<template>
  <div class="sina_page">
  </div>
</template>

<script>
  export default {
    name: "userAuth",
    created() {
      if (this.$route.query.returnUrl) {
        localStorage.setItem('returnUrl', this.$route.query.returnUrl);
      }
      let returnUrl = localStorage.getItem('returnUrl') || '/weibo/insure-join';
      if (localStorage.getItem('_userToken') || this.$route.query.access_token) {
        this.$route.query.access_token && localStorage.setItem('_userToken', 'Bearer ' + this.$route.query.access_token);
        localStorage.removeItem('returnUrl');
        this.$router.replace(returnUrl);
      } else {
        let returl = window.location.origin + '/weibo/userauth';
        window.location.href = window.location.origin + '/api/web/index.php/v1/auth-user/login?reful_url=' + returl;
      }
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
