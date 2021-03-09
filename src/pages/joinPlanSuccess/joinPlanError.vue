<template>
  <div class="bg_box">
    <div class="wrapper">
      <div class="iconError">
        <img src="@/assets/images/iconerror.png" alt />
      </div>
      <h6>加入失败</h6>
      <p>您未能成功开通新浪互助权益</p>
      <p>请确保您的支付宝账户余额充足</p>
      <div class="tips">
        <h5>
          <img src="@/assets/images/jg.png" alt />
          开通帮助
        </h5>
        <p>
          <em></em>
          预付3元会充值到账户余额，当期分摊抵现金
        </p>
      </div>
      <button class="btn1" @click="link()">前往个人中心</button>
      <button class="btn2" @click="back()">再次激活权益</button>
    <div class="text">确保支付宝余额充足后可再次激活或稍后在个人中心激活</div>
    </div>
  </div>
</template>

<script>
import Api from "../../utils/apiConfig";
export default {
  name: "joinPlanError",
  data() {
    return {};
  },
  created() {},
  mounted() {
       this.actionCount("pv");
  },
  methods: {
    link(){
       this.$router.push("/weibo/insure-plan");
    },
    back(){
        this.$router.push("/weibo/note-redpacket");
    },
  },
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
  .iconError {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      margin-top: 92px;
      margin-bottom: 28px;
      width: 76px;
      height: 76px;
    }
  }
  h6 {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 34px;
    font-family: "PingFangSC-Medium, PingFang SC";
    font-weight: 500;
    color: #333333;
    margin-bottom: 28px;
  }
  p {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 26px;
    font-family: "PingFangSC-Medium, PingFang SC";
    font-weight: 400;
    color: #333333;
    margin-top: 10px;
  }
  .tips {
    width: 90%;
    height: 240px;
    background: #f5f5f9;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 5%;
    margin-top: 44px;
    h5 {
      font-size: 26px;
      font-family: "PingFangSC-Medium, PingFang SC";
      font-weight: 500;
      color: #333333;
      padding: 40px 0 22px 0;
      img {
        width: 40px;
        height: 40px;
        display: inline-block;
      }
    }
    p {
      width: 100%;
      display: flex;
      font-size: 26px;
      font-family: "PingFangSC-Regular, PingFang SC";
      font-weight: 400;
      color: #333333;
      margin-top: 20px;
      em {
        width: 14px;
        height: 14px;
        background: #ff8200;
        border-radius: 50%;
        margin-right: 13px;
      }
    }
  }
  .btn1 {
    width: 90%;
    margin-left: 5%;
    background: #ffffff;
    border-radius: 50px;
    border: 1px solid #ff8200;
    transform: rotateZ(360deg);
    font-size: 40px;
    font-family: "PingFangSC-Medium, PingFang SC";
    font-weight: 500;
    color: #ff8200;
    padding: 22px 0;
    text-align: center;
    outline: none;
    margin-top: 80px;
  }
  .btn2 {
    width: 90%;
    margin-left: 5%;
    text-align: center;
    background: linear-gradient(270deg, #ff4469 0%, #ff6546 100%);
    border-radius: 50px;
    font-size: 40px;
    font-family: "PingFangSC-Medium, PingFang SC";
    font-weight: 500;
    color: #ffffff;
    padding: 22px 0;
    outline: none;
    margin-top: 40px;
    border: none;
  }
  .text {
    width: 100%;
    text-align: center;
    margin-top: 20px;
    font-size: 22px;
    font-family: "PingFangSC-Regular, PingFang SC";
    font-weight: 400;
    color: #b7b6b6;
  }
}
</style>
