<template>
  <div class="bg_box">
    <div class="wrapper">
      <!-- <xtjToast :sendData="typePage" /> -->
      <div class="wraper_box">
        <h6><img src="../images/icon_ok.png" /> 加入成功</h6>
        <h5>您的家庭保障评测</h5>
        <div class="cont_match">
          <img
            v-show="isCountMatch == '60branch'"
            src="../images/image_60.png"
            alt
          />
          <img
            v-show="isCountMatch == '70branch'"
            src="../images/image_70.png"
            alt
          />
          <img
            v-show="isCountMatch == '80branch'"
            src="../images/image_80.png"
            alt
          />
          <img
            v-show="isCountMatch == '90branch'"
            src="../images/image_90.png"
            alt
          />
          <img
            v-show="isCountMatch == '100branch'"
            src="../images/image_100.png"
            alt
          />
        </div>
      </div>
      <div class="content_from">
        <img src="../images/successBanner.png" alt />
        <h3>保障家人</h3>
        <div class="box_from">
          <div class="from_son">
            <span>关系：</span>
            <div class="piker">
              <span @click="openPicker()">{{ switch_name }}</span>
              <img @click="openPicker()" src="../images/downL.png" alt />
            </div>
          </div>
          <div class="from_son">
            <span>真实姓名：</span>
            <input
              v-model.trim="userName"
              autocomplete="off"
              type="text"
              maxlength="10"
              placeholder="请输入家人真实姓名"
            />
          </div>
          <div class="from_son">
            <span>身份证号：</span>
            <input
              v-model.trim="idCard"
              autocomplete="off"
              type="text"
              maxlength="18"
              name
              placeholder="申请互助金唯一凭证 严格保密"
            />
          </div>
        </div>
        <div class="content_fot">
          <span @click="routerLink()">查看我的计划</span>
          <span @click="Add()">立即添加</span>
        </div>
      </div>
    </div>
    <div class="mask" v-show="mask_show">
      <div class="btn_switch">
        <span @click="btn_switch('hide')">取消</span>
        <span @click="btn_switch('ok')">确定</span>
      </div>
      <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
    </div>
  </div>
</template>

<script>
import Api from "../../utils/apiConfig";
//引入 享投君
import xtjToast from "../../components/xtjToast/xtjToast";
import { checkPhone, isChn, isIdNumber } from "../../assets/js/common";
export default {
  name: "paySuc",
  components: {
    xtjToast,
  },
  data() {
    return {
      isCountMatch: "60branch",
      switch_name: "父母",
      mask_show: false,
      slots: [{ values: ["父母", "配偶", "子女"] }],
      userName: "",
      idCard: "",
      helpType: "1",
      workTypeIndex: 0,
      relation: 53,
      myPlanInfo: null,
      typePage: "sucPage",
    };
  },
  created() {},
  mounted() {
    this.typePage = "sucPage";
    sessionStorage.removeItem("myPlanInfo");
    sessionStorage.removeItem("_planisOver");
    sessionStorage.removeItem("_planState");
    let channel = window.localStorage.getItem("channel");
    // 成功页||成功挽留页埋点
    if (
      localStorage.getItem("_AgainActive") ||
      localStorage.getItem("_ActiveChannel")
    ) {
      //借钱渠道
      if (channel == "55001") {
        this.actionCount("borrowPv1");
      } else {
        //本人加入放弃支付授权再次激活 埋点
        this.actionCount("pv1");
      }
    } else {
      //借钱渠道
      if (channel == "55001") {
        this.actionCount("borrowPv");
      } else {
        this.actionCount("pv");
      }
    }
    history.pushState(null, null, document.URL);
    window.addEventListener("popstate", function () {
      history.pushState(null, null, document.URL);
    });
    console.log(this.$route.query.type);
    this.sinaActive();
    this.getPlanStatus();
    //发微博
    if (localStorage.getItem("_sendNotice")) {
      this.sendSinaEvent();
    }
    this.activeInfoShow =
      localStorage.getItem("channel") &&
      localStorage.getItem("channel").toString().substring(0, 2) == "39";
    //家人列表
    this.$get(Api.getPolicyList, {}).then((res) => {
      console.log(res);
      if (res.code == 0) {
        this.myPlanInfo = {
          fromUrl: "plan",
          validCount: res.data.policy_list.length,
        };
        if (this.myPlanInfo.validCount - 1 == 0) {
          this.isCountMatch = "60branch";
        } else if (this.myPlanInfo.validCount - 1 == 1) {
          this.isCountMatch = "70branch";
        } else if (this.myPlanInfo.validCount - 1 == 2) {
          this.isCountMatch = "80branch";
        } else if (this.myPlanInfo.validCount - 1 == 3) {
          this.isCountMatch = "90branch";
        } else if (this.myPlanInfo.validCount - 1 == 4) {
          this.isCountMatch = "100branch";
        } else {
          this.isCountMatch = "100branch";
        }
        console.log(this.isCountMatch);
        //sessionStorage.setItem("myPlanInfo", JSON.stringify(this.myPlanInfo));
      } else {
        this.$toast(res.msg || "请求超时，请刷新重试");
      }
    });
  },
  methods: {
    getPlanStatus() {
      this.$get(Api.getMyPolicy, { plan_code: "XL001" }).then((ret) => {
        if (ret.code === 0) {
          this.fyPlanState =
            ret.data.plan_list_state && ret.data.plan_list_state["XL003"];
          if (
            ret.data.plan_list_state &&
            (ret.data.plan_list_state["XL001"] == "activated" ||
              ret.data.plan_list_state["XL002"] == "activated")
          ) {
            this.addFYPlan();
          } else {
          }
        } else {
          this.$toast("请求失败，请刷新重试");
        }
      });
    },
    sinaActive() {
      this.$post(Api.activationPolicy, { tran_no: "aaa" }).then((ret) => {
        if (ret.code === 0) {
          this.addFYPlan();
        } else {
          this.isShow = true;
          this.isActive = false;
          this.$toast(ret.msg || "请求失败，请刷新重试");
        }
      });
    },
    paySign() {
      let tranNo = this.$route.query.tran_no;
      if (!tranNo) {
        this.$toast("请求失败，请刷新重试");
        this.isShow = true;
        this.isActive = false;
        return;
      }
      this.$post(Api.paySign, { tran_no: tranNo }).then((ret) => {
        if (ret.code === 0) {
          this.isShow = true;
          this.isActive = true;
        } else {
          this.isShow = true;
          this.isActive = false;
          this.$toast(ret.msg || "请求失败，请刷新重试");
        }
      });
    },
    //发微博
    sendSinaEvent() {
      this.$post(Api.sendJoinNotice, { plan_code: "XL001" });
      this.actionCount("send_click");
    },
    addFYPlan() {
      if (this.fyPlanState == "not_join") {
        this.$get(Api.getPolicyList, {}).then((res) => {
          if (res.code == 0) {
            if (res.data.policy_list.length > 0) {
              let item = res.data.policy_list[0].insured;
              this.$post(Api.addPolicy, {
                user_name: item.name,
                certi_no: item.idno_init,
                help_type: "1",
                work_type: "1",
                certi_type: "00", //证件类型
                relation: "00", //关系
                mobile: item.mobile || "",
                plan_code: "XL003",
                channel: "810028",
                amount: 0,
              }).then((ret) => {});
            }
          } else {
            this.$toast(res.msg || "请求超时，请刷新重试");
          }
        });
      } else {
      }
    },
    //picker 滑动值
    onValuesChange(picker, values) {
      console.log(picker, values);
      this.switch_name = values[0];
    },
    //打开picker
    openPicker() {
      this.mask_show = true;
    },
    //确定与取消
    btn_switch(type) {
      if (type == "hide") {
        this.mask_show = false;
        this.switch_name = "父母";
      } else {
        //51：配偶  52：子女 53：父母
        if (this.switch_name == "父母") {
          this.relation = 53;
        } else if (this.switch_name == "子女") {
          this.relation = 52;
        } else if (this.switch_name == "配偶") {
          this.relation = 51;
        }
        this.mask_show = false;
      }
    },

    Add() {
      if (this.userName == "") {
        this.$toast("请输入姓名");
      } else if (!isChn(this.userName.replace(/\s/g, ""))) {
        this.$toast("只支持中文姓名");
      } else if (this.userName.length < 2) {
        this.$toast("姓名不得少于两个字符");
      } else if (this.idCard == "") {
        this.$toast("请输入身份证号码");
      } else if (!isIdNumber(this.idCard.replace(/\s/g, ""))) {
        this.$toast("请输入正确的身份证号码");
      } else {
        //获取年龄
        let myDate = new Date();
        let month = myDate.getMonth() + 1;
        let day = myDate.getDate();
        let age = myDate.getFullYear() - this.idCard.substring(6, 10) - 1;
        if (
          this.idCard.substring(10, 12) < month ||
          (this.idCard.substring(10, 12) == month &&
            this.idCard.substring(12, 14) <= day)
        ) {
          age++;
        }
        console.log(age);
        if (age >= 59) {
          this.$toast(
            "用户不符合大病互助计划，被保人超出最大投保年龄，不符合投保规则要求！"
          );
          return false;
        }
        let code = "XL001";
        this.$post(Api.addPolicy, {
          user_name: this.userName,
          certi_no: this.idCard,
          help_type: this.helpType,
          certi_type: "00", //证件类型
          work_type: this.workTypeIndex * 1 + 1,
          relation: this.relation.toString(), //关系
          plan_code: code,
          channel:
            this.$route.query.channel ||
            localStorage.getItem("channel") ||
            "10000",
          amount: 0,
        }).then((ret) => {
          if (ret.code === 0) {
            sessionStorage.removeItem("myPlanInfo");
            if (ret.data.state == 0) {
              this.$post(Api.bindWallet, { plan_code: "XL001" }).then((ret) => {
                if (ret.code == 0) {
                  if (ret.data.state == "not_bind") {
                    window.location.href = ret.data.url;
                  } else if (ret.data.state == "has_activated") {
                    this.actionCount("joinSuccess_click");
                    // this.$router.push("/weibo/insure-paysuc");
                    this.$router.push("/weibo/insure-plan");
                  }
                } else {
                  this.$toast(ret.msg || "请求失败，请刷新重试");
                }
              });
            } else {
              this.actionCount("joinSuccess_click");
              this.$router.push("/weibo/insure-plan");
            }
          } else {
            this.$toast(ret.msg || "请求失败，请刷新重试");
          }
        });
      }
    },
    //routerLink
    routerLink() {
      this.actionCount("joinLinkplan_click");
      this.$router.push("/weibo/insure-plan");
    },
  },
};
</script>

<style lang="scss" scoped>
.bg_box {
  width: 100%;
  height: auto;
  background: url("http://sinahuzhu.oss-cn-beijing.aliyuncs.com/images/sina_publicity_temp/successBg.png")
    100% no-repeat;
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
  .wraper_box {
    width: 100%;
    display: flex;
    flex-direction: column;
    h6 {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 32px;
      font-family: "PingFangSC-Medium, PingFang SC";
      font-weight: 500;
      color: #ffffff;
      padding: 35px 0 38px 0;
      img {
        width: 40px;
        height: 40px;
        margin-right: 20px;
      }
    }
    h5 {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 36px;
      font-family: "PingFangSC-Medium, PingFang SC";
      font-weight: 500;
      color: #ffffff;
      padding-bottom: 28px;
    }
    .cont_match {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 10px;
      img {
        width: 576px;
        height: auto;
      }
    }
  }
  .content_from {
    width: 94%;
    margin-left: 3%;
    background: #fff;
    box-shadow: 0px 7px 30px 0px rgba(183, 182, 182, 0.24);
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 54px;
    //margin-top: 10px;
    > img {
      width: 650px;
      height: auto;
      margin: 30px 0 40px 0;
    }
    h3 {
      width: 100%;
      display: flex;
      justify-content: center;
      font-size: 40px;
      font-family: "PingFangSC-Medium, PingFang SC";
      font-weight: 500;
      color: #333333;
      padding-bottom: 46px;
    }
    .from_son {
      width: 650px;
      height: 110px;
      background: #ffffff;
      border-radius: 55px;
      border: 1px solid #e6e6e6;
      -webkit-transform: scale(0.5);
      -webkit-transform-origin: 0 0;
      transform: scale(1);
      transform-origin: 0 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 40px;
      margin-bottom: 30px;
      .piker {
        width: 66%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        span {
          font-size: 28px;
          font-family: "PingFangSC-Medium, PingFang SC";
          font-weight: 500;
          color: #333333;
          margin-right: 30px;
        }
        img {
          width: 30px;
          height: 30px;
        }
      }
      span {
        display: flex;
        font-size: 28px;
        font-family: "PingFangSC-Medium, PingFang SC";
        font-weight: 500;
        color: #333333;
      }
      input {
        font-size: 28px;
        font-family: "PingFangSC-Medium, PingFang SC";
        font-weight: 500;
        color: #333333;
        border: none;
        outline: none;
        width: 66%;
        text-align: right;
      }
    }
    .content_fot {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0 30px;
      margin-top: 30px;
      margin-bottom: 58px;
      span {
        width: 270px;
        height: 100px;
        background: #ffffff;
        border-radius: 50px;
        border: 1px solid #ff8200;
        -webkit-transform: scale(0.5);
        -webkit-transform-origin: 0 0;
        transform: scale(1);
        transform-origin: 0 0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 32px;
        font-family: "PingFangSC-Medium, PingFang SC";
        font-weight: 500;
        color: #ff8200;
      }
      span:nth-child(2) {
        width: 350px;
        background: linear-gradient(270deg, #ff4469 0%, #ff6546 100%);
        color: #fff;
      }
    }
  }
  .picker-items {
    margin-top: 5% !important;
  }
}
.mask {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  bottom: 0;
  left: 0;
  overflow-y: hidden;
  .btn_switch {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 20px 50px;
    position: absolute;
    top: 61%;
    left: 0;
    z-index: 999;
    span {
      font-size: 28px;
      font-family: "PingFangSC-Medium, PingFang SC";
      font-weight: 500;
      color: #333333;
    }
    span:nth-child(2) {
      font-size: 28px;
      font-family: "PingFangSC-Medium, PingFang SC";
      font-weight: 500;
      color: #ff8200;
    }
  }
}
.picker {
  width: 100%;
  height: 40%;
  background: #fff;
  position: absolute;
  z-index: 99;
  bottom: 0;
  left: 0;
}
.picker-items {
  margin-top: 50px;
}
</style>
