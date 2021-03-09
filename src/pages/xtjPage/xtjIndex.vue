<template>
  <div class="wrapper" ref="setHeight">
    <div class="banner" v-for="(item, index) in imgSrc" :key="index">
      <!-- <img
        :src="require(`../../assets/images/xtjbanner${index + 1}.png`)"
        alt=""
      /> -->
       <img
        :src="item"
        alt=""
      />
      <p style="height: 0">&nbsp;</p>
    </div>
    <div class="btn">
      <button @click="order()">免费领取</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "xtjIndex",
  props: {},
  data() {
    return {
      imgSrc: [
        "http://sinahuzhu.oss-cn-beijing.aliyuncs.com/images/sina_publicity_temp/xtjBanner_2.png",
        "http://sinahuzhu.oss-cn-beijing.aliyuncs.com/images/sina_publicity_temp/xtjBanner_3.png",
      ],
    };
  },
  created() {},
  mounted() {
     this.actionCount("pv");
  },
  methods: {
    order() {
      this.actionCount("xtj_clickIndex1");
      this.$router.push("/weibo/xtjSuc");
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  .banner {
    width: 100%;
    img {
      width: 100%;
      height: auto;
    }
  }
  .btn {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 200px;
    background: #007aff;
    button {
      width: 686px;
      height: 100px;
      margin-left: 50%;
      margin-top: 50px;
      transform: translateX(-50%);
      background: linear-gradient(180deg, #ffcc02 0%, #ff9500 100%);
      box-shadow: 0px 8px 16px -4px #005aff;
      border-radius: 48px;
      border: none;
      outline: none;
      text-align: center;
      line-height: 50px;
      font-size: 40px;
      font-family: "PingFangSC-Semibold, PingFang SC";
      font-weight: 600;
      color: #ffffff;
      text-shadow: 0px 4px 4px rgba(249, 113, 47, 0.3);
    }
  }
}
</style>