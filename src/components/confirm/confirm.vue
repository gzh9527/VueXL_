<template>
  <div class="wrapper">
    <div class="mask">
      <div class="maskBox">
        <h5>{{title}}</h5>
        <p>
         {{textArea}}
        </p>
        <div class="boxBtn">
          <span @click="btnFun(2)">{{btn1}}</span>
          <span @click="btnFun(1)">{{btn2}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// next step 时确认和取消的 confirm弹框组件
export default {
  name: "confirm",
  data() {
    return {
      title:'微博借钱用户调额须知',
      textArea:'调额即按照正常互助用户参与每期分摊，享受更高额度互助金保障',
      btn1:'暂不调额',
      btn2:'确认调额'
    };
  },
  props: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    btnFun(type) {
      if (type == 1) {
        this.$emit("send", "ok");
      } else {
        this.$emit("send", "no");
      }
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
    .maskBox {
      width: 500px;
      height: auto;
      background: #fff;
      border-radius: 20px;
      overflow: hidden;
      h5 {
        font-size: 36px;
        font-weight: normal;
        font-weight: 500;
        width: 100%;
        text-align: center;
        color: #000;
        padding: 30px 0;
        margin-top: 30px;
      }
      p {
        font-size: 28px;
        width: 90%;
        margin-left: 5%;
        text-align: center;
        color: #939393;
        font-weight: normal;
        padding: 20px 0;
      }
      .boxBtn {
        width: 100%;
        display: flex;
        margin-top: 30px;
        border-top: 1px #ccc solid;
        height: 100px;
        transform: rotateZ(360deg);
        span {
          width: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 28px;
          width: 100%;
          color: #333;
          height: 100px;
          color: #2472cc;
        }
        span:nth-child(1) {
          border-right: 1px #ccc solid;
        }
      }
    }
  }
}
</style>