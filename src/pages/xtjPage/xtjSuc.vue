<template>
  <div class="wrapper">
    <!-- <div class="banner">
      <p>
        <img
          src="http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/tips.png"
          alt=""
        />
        <b>最后一步</b>
      </p>
      <div class="cardBox" @touchstart="getclick" @touchend="getclickEnd">
        <img src="../../assets/images/ca.png" alt="" />
        <div class="leftBox">
          <img src="../../assets/images/code1.jpg" alt="" />
        </div>
        <div class="rightBox">
          <img src="../../assets/images/zw.png" alt="" />
          <p>[长按] 保存二维码<br>微信扫码添加听课</p>
        </div>
        <div class="img_bz">
          <img src="../../assets/images/lc.png" alt="" />
        </div>
      </div>
    </div> -->
    <div class="box"></div>
    <div class="banner2">
      <div class="code_msg" @touchstart="getclick" @touchend="getclickEnd">
        <img :src="imgSrc" alt="" />
      </div>
      <p>保存图片，微信扫码加好友，领取课程</p>
    </div>
    <div class="msg_enter">
      <p><em></em>填写您的信息，我们送课上门<em></em></p>
      <div class="formData">
        <label for="name">姓名</label>
        <input
          type="text"
          v-model="name"
          id="name"
          placeholder="请输入您的姓名"
        />
      </div>
      <div class="formData">
        <label for="phone">电话</label>
        <input
          type="number"
          pattern="\d*"
          id="phone"
          v-model="phone"
          placeholder="请输入您的电话号码"
        />
      </div>
    </div>
    <button @click="submit">提交</button>
  </div>
</template>
<script>
import Api from "../../utils/apiConfig";
import { checkPhone } from "../../assets/js/common";
export default {
  name: "xtjSuc",
  props: {},
  data() {
    return {
      cont: 0,
      name: "",
      phone: "",
      customerServer: 1,
      randomArrray: [1, 2, 3, 4],
      imgSrc:
        "http://sinahuzhu.oss-cn-beijing.aliyuncs.com/images/sina_publicity_temp/kefu1.png",
    };
  },
  created() {},
  mounted() {
    //随机展示两种二维码
    // var init = Math.floor(Math.random() * this.randomArrray.length);
    // //产品码
    // if (init % 2 == 0) {
    //   this.imgSrc =
    //     "http://sinahuzhu.oss-cn-beijing.aliyuncs.com/images/sina_publicity_temp/codeM.png";
    // } else {
    //   //客服码
    //   this.$get(Api.get_qrcode).then((res) => {
    //     console.log(res.msg.show);
    //     if (res.msg.show == 1) {
    //       this.imgSrc =
    //         "http://sinahuzhu.oss-cn-beijing.aliyuncs.com/images/sina_publicity_temp/kefu1.png";
    //     } else {
    //       this.imgSrc =
    //         "http://sinahuzhu.oss-cn-beijing.aliyuncs.com/images/sina_publicity_temp/kefu2.png";
    //     }
    //   });
    // }
     //客服码
      this.$get(Api.get_qrcode).then((res) => {
        console.log(res.msg.show);
        if (res.msg.show == 1) {
          this.imgSrc =
            "http://sinahuzhu.oss-cn-beijing.aliyuncs.com/images/sina_publicity_temp/kefu1.png";
        } else {
          this.imgSrc =
            "http://sinahuzhu.oss-cn-beijing.aliyuncs.com/images/sina_publicity_temp/kefu2.png";
        }
      });
    this.actionCount("pv");
    let info = window.sessionStorage.getItem("myPlanInfo");
    info = JSON.parse(info);
    if (info.dataList[0].insured.name) {
      this.name = info.dataList[0].insured.name;
    }
    if (info.dataList[0].insured.mobile) {
      this.phone = info.dataList[0].insured.mobile;
    }
  },
  methods: {
    getclick() {
      this.cont = 0;
      clearInterval(timeInt);
      let timeInt = setInterval(() => {
        this.cont += 1;
      }, 1000);
    },
    getclickEnd() {
      console.log(this.cont);
      if (this.cont >= 1) {
        this.actionCount("userPreserve");
      }
    },
    submit() {
      if (this.name == "") {
        this.$toast("请输入您的姓名");
        return false;
      }
      if (!this.phone || this.phone == "") {
        this.$toast("请输入您的手机号码");
        return false;
      }
      if (!checkPhone(this.phone)) {
        this.$toast("请输入正确的手机号码");
        return false;
      }
      this.$post(Api.get_create_insurance_information, {
        name: this.name,
        mobile: this.phone,
      }).then((res) => {
        this.actionCount("submitMsg");
        if (res.code == 0) {
          this.$toast("提交成功");
        } else if (res.code == "-1001") {
          this.$toast("您已提交");
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  .banner {
    width: 100%;
    height: 320px;
    background: linear-gradient(180deg, #007aff 0%, rgba(0, 122, 255, 0) 100%)
      no-repeat 100% 100%;
    background-size: cover;
    p {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 36px;
      font-family: "PingFangSC-Semibold, PingFang SC";
      font-weight: 600;
      color: #ffffff;
      padding: 32px 0;
      img {
        width: 48px;
        height: 48px;
        margin-right: 20px;
      }
    }
  }
  .cardBox {
    width: 686px;
    height: 540px;
    background: #ffffff;
    border-radius: 8px;
    display: flex;
    flex-wrap: wrap;
    margin-left: 50%;
    transform: translateX(-50%);
    justify-content: center;
    > img {
      width: 97%;
      margin: 1.5%;

      height: 280px;
    }
    .leftBox {
      width: 45%;
      height: 280px;
      background: #ffeed6;
      margin-top: 18px;
      margin-left: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 248px;
        height: 248px;
      }
    }
    .rightBox {
      width: 49%;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #ffeed6;
      height: 280px;
      margin-top: 18px;
      margin-right: 18px;
      img {
        width: 144px;
        height: 144px;
        margin-top: 15px;
      }
      p {
        // width: 256px;
        width: 100%;
        height: 88px;
        font-size: 32px;
        font-family: "PingFangSC-Semibold, PingFang SC";
        font-weight: 600;
        color: #fe7a00;
        line-height: 44px;
        margin-top: 16px;
      }
    }
    .img_bz {
      width: 100%;
      margin-top: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 616px;
        height: auto;
      }
    }
  }
}
.box {
  width: 100%;
  height: 400px;
  background: linear-gradient(180deg, #007aff 0%, rgba(0, 122, 255, 0) 100%);
  overflow: hidden;
}
.banner2 {
  width: 686px;
  height: 746px;
  background: #ffffff;
  border-radius: 32px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 32px;
  flex-wrap: wrap;
  .code_msg {
    width: 590px;
    height: 590px;
    margin-top: 45px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  p {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    font-family: "PingFangSC-Semibold, PingFang SC";
    font-weight: 600;
    color: #007aff;
    padding: 26px 0;
  }
}
.msg_enter {
  width: 686px;
  height: 316px;
  background: #ffffff;
  border-radius: 32px;
  margin-top: 24px;
  // position: absolute;
  // top: 197%;
  margin-top: 410px;
  margin-left: 50%;
  transform: translateX(-50%);
  p {
    font-size: 32px;
    height: 92px;
    font-family: "PingFangSC-Semibold, PingFang SC";
    font-weight: 600;
    color: #333333;
    display: flex;
    justify-content: center;
    align-items: center;
    em:nth-child(1) {
      width: 32px;
      height: 4px;
      background: #333333;
      margin-right: 10px;
    }
    em:nth-child(2) {
      width: 32px;
      height: 4px;
      background: #333333;
      margin-left: 10px;
    }
  }
  .formData {
    width: 90%;
    height: 112px;
    display: flex;
    align-items: center;
    margin-left: 5%;
    label {
      width: 20%;
      height: 100%;
      font-size: 28px;
      font-family: "PingFangSC-Regular, PingFang SC";
      font-weight: 400;
      color: #666666;
      text-align: center;
      line-height: 112px;
    }
    input {
      width: 60%;
      height: 100%;
      border: none;
      outline: none;
      font-size: 28px;
    }
  }
  .formData:nth-child(3) {
    border-top: solid 1px #eeeeee;
    transform: rotateZ(360deg);
  }
}
button {
  width: 686px;
  height: 96px;
  border-radius: 48px;
  border: 2px solid #5aabff;
  font-size: 36px;
  font-family: "PingFangSC-Medium, PingFang SC";
  font-weight: 500;
  color: #5aabff;
  position: absolute;
  bottom: 48px;
  left: 50%;
  transform: translateX(-50%);
  background: #f5f5f5;
}
</style>