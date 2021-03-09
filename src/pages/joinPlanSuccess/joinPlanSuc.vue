<template>
  <div class="bg_box">
    <div class="wrapper">
      <div class="iconError">
        <img
          src="http://sinahuzhu.oss-cn-beijing.aliyuncs.com/images/sina_publicity_temp/dh%402x.png"
          alt
        />
      </div>
      <h6>已成功加入</h6>
      <p>
        <span>
          <img
            src="http://sinahuzhu.oss-cn-beijing.aliyuncs.com/images/sina_publicity_temp/xdh.png"
            alt=""
          /> </span
        >发微博邀请更多好友共享互助
      </p>
      <button @click="linkUrl(1)">查看我的计划</button>
      <div class="img_box" @click="linkUrl(2)">
        <img
          src="http://sinahuzhu.oss-cn-beijing.aliyuncs.com/images/sina_publicity_temp/addf.png"
          alt=""
        />
      </div>
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
    //发微博
    this.$post(Api.sendJoinNotice, { plan_code: "XL001" });
  },
  methods: {
    linkUrl(type) {
      if(type == 1){
      this.$router.replace("/weibo/insure-plan");
      }else{
      this.$router.replace("/weibo/insure-add");
      }
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
    color: #B7B6B6;
    margin-top: 10px;
    span {
      width: 28px;
      height: 28px;
      background: #FFFFFF;
      border: 1px solid #B7B6B6;
      border-radius: 6px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 15px;
      img {
        width: 18px;
        height: 18px;
      }
    }
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
  button {
    width: 270px;
    height: 58px;
    background: #FFFFFF;
    border-radius: 33px;
    border: 1px solid #FE7F38;
    font-size: 24px;
    font-family: "PingFangSC-Regular, PingFang SC";
    font-weight: 400;
    color: #FF8200;
    margin: 45px 0;
    margin-left: 50%;
    transform: translateX(-50%);
  }
  .img_box {
    width: 610px;
    height: 624px;
    margin-left: 50%;
    transform: translateX(-50%);
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
