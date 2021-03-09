<template>
  <div class="wrapper">
    <div class="mask" v-show="flag" @click="hideMask()">
      <img
        src="http://sinahuzhu.oss-cn-beijing.aliyuncs.com/images/sina_publicity_temp/xtjtoast111.png"
        alt=""
        data-type="22"
        @click.stop="linkPage()"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "xtjToast",
  data() {
    return {
      flag: true,
      getData: this.sendData
    };
  },
  props: {
    sendData: {
      type: null,
    },
  },
  watch: {
    sendData: (newVal, oldVal) => {
      this.getData = newVal;
      console.log(this.getData);
    },
  },
  created() {},
  mounted() {
  },
  methods: {
    hideMask() {
      this.flag = false;
    },
    linkPage() {
      if (this.getData == "plan") {
        this.actionCount("xtj_clickPlan");
        this.actionCount("pvPlan");
        console.log('首页渠道')
      } else if(this.getData == "sucPage"){
        this.actionCount("xtj_clickSuc");
        this.actionCount("pvSuc");
        console.log('本人成功页渠道')
      }else{
        this.actionCount("xtj_clickFamilySuc");
        this.actionCount("pvFamily");
        console.log('家人渠道')
      }
      this.$router.push("/weibo/xtjIndex");
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  .mask {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    img {
      width: 510px;
      height: auto;
    }
  }
}
</style>