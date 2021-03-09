<template>
  <div class="bg_box">
    <div class="wrapper"></div>
  </div>
</template>

<script>
import Api from "../utils/apiConfig";
export default {
  name: "blankPage",
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.$get(Api.payJoin, {}).then((res) => {
      console.log(res);
      console.log(res.code);
      if (res.code == 0) {
        if (res.data.state == 1) {
          //成功
          this.$router.push("/weibo/insure-paysuc");
        } else {
          //失败
          this.$router.push("/weibo/join_planerror");
        }
      } else {
        //失败
        this.$router.push("/weibo/join_planerror");
      }
    });
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.bg_box {
  width: 100%;
  height: auto;
  background-size: cover;
  padding-bottom: 150px;
  background-position: start;
  position: relative;
}
.wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
</style>
