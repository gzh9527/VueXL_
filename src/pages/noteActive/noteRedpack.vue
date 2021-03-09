<template style="height:100%;">
  <div class="sina_page" style="height: 100%" ref="htmlMain">
    <div class="user_info">
      <img
        class="user_img"
        v-if="weiboInfo"
        :src="
          weiboInfo.profile_image_url ||
          'https://imgs.bihubao.com/Public/images/insureAdView/images/logo.png'
        "
      />
      <div class="user_name">
        <span>{{ userName }}</span>
        <span>开通新浪免密支付</span>
        <span>权益立即激活</span>
      </div>
    </div>
    <div class="sina_bot" @click="payActive()">
      <!-- <img
        style="margin-top: 70px"
        v-if="channelFlag == 1"
        src="@/assets/images/buttonhb.png"
      />
      <img style="margin-top: 70px" v-else src="@/assets/images/jfbutton.png" /> -->
      <!-- http://sinahuzhu.oss-cn-beijing.aliyuncs.com/images/sina_publicity_temp/buttonhb.png -->
      <img
        style="margin-top: 70px"
        v-if="channelFlag == 1 && sex == 1"
        :src="'http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/hb1yuan.png'"
      />
      <img
        style="margin-top: 70px"
        v-else
        :src="'http://sinahuzhu.oss-cn-beijing.aliyuncs.com/images/sina_publicity_temp/hbsex1.png'"
      />
      <img
        style="margin-top: 70px"
        v-show="channelFlag == 2"
        src="http://sinahuzhu.oss-cn-beijing.aliyuncs.com/images/sina_publicity_temp/jf.png"
      />
      <img
        style="margin-top: 70px"
        v-show="channelFlag == 3"
        src="http://bihu-sina-project.oss-cn-beijing.aliyuncs.com/imgs/JQbtn.png"
      />
      <div class="sina_btn_bind"></div>
      <div class="daojishi" style="margin-top: 20px">
        剩余时间 {{ getTimeValue(timeHH) }}：{{ getTimeValue(timeMM) }}：{{
          getTimeValue(timeSS)
        }}
      </div>
    </div>
  </div>
</template>

<script>
import Api from "../../utils/apiConfig";
export default {
  name: "noteRedpack",
  data() {
    return {
      planCode: null,
      userName: null,
      weiboInfo: null,
      joinState: null,
      isHasredpack: false,
      planState: false,
      timeHH: 23,
      timeMM: 59,
      timeSS: 59,
      imgurl:
        "http://bihu-sina-project.oss-cn-beijing.aliyuncs.com/imgs/noteActiveRedpacketAlert.png",
      timeInterval: null,
      channelFlag: "",
      channel: localStorage.getItem("channel"),
      sex: 1,
    };
  },
  created() {
    localStorage.removeItem("_AgainActive");
    localStorage.removeItem("_ActiveChannel");
    this.planCode = this.$route.query.planCode
      ? this.$route.query.planCode
      : "XL001";
    this.pageLoad();
    this.getPlanState(this.planCode);
    var channel = localStorage.getItem("channel");
    if (
      JSON.parse(sessionStorage.getItem("myPlanInfo")).dataList[0].insured.sex >
      0
    ) {
      //女性
      this.sex = 2;
    } else {
      //男性
      this.sex = 1;
    }
    //区分借钱渠道
    //如果是微博借钱加入得用户
    let infoData = "";
    if (channel == "55001") {
      //红包
      this.channelFlag = 3;
      this.imgurl =
        "http://bihu-sina-project.oss-cn-beijing.aliyuncs.com/imgs/jqToast.png";
    } else {
      //区分 积分 或者 红包
      this.$get(Api.checkRedPacketChannel, {
        channel,
        isNotshowLoad: "noshow",
      }).then((ret) => {
        if (ret.code == 0) {
          let typeList = ret.data.type_list;
          if (typeList.length > 0 && typeList.indexOf("give_score") > -1) {
            //积分
            this.channelFlag = 2;
            this.imgurl =
              "http://bihu-sina-project.oss-cn-beijing.aliyuncs.com/imgs/jftext.png";
            // this.imgurl =
            //   "http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/jftext2088.png";
          } else {
            //红包
            this.channelFlag = 1;
            this.imgurl =
              "http://bihu-sina-project.oss-cn-beijing.aliyuncs.com/imgs/noteActiveRedpacketAlert.png";
          }
          //this.imgurl =  "http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/hb001.png"
        }
      });
    }
  },
  mounted() {},
  methods: {
    pageLoad() {
      this.planCode = this.$route.query.planCode
        ? this.$route.query.planCode
        : "XL001";
      this.isHasredpack = localStorage.getItem("_isHasredpack") ? true : false;
      this.actionCount("pv");

      this.getWeiboInfo();
      let planInfo = sessionStorage.getItem("myPlanInfo")
        ? JSON.parse(sessionStorage.getItem("myPlanInfo"))
        : null;
      if (!planInfo) {
        this.getPlanList();
      } else if (planInfo.dataList.length > 0) {
        this.userName = planInfo.dataList[0].insured.name;
      }
      this.startInterval();
    },
    getPlanList() {
      this.$get(Api.getPolicyList, {}).then((res) => {
        if (res.code == 0) {
          let dataList = res.data.policy_list;
          if (dataList.length > 0) {
            this.userName = dataList[0].insured.name;
          }
        }
      });
    },
    createRedpacket() {
      if (!this.isHasredpack) {
        this.$post(Api.createTicket, {
          sign: "3f0ce9fbe24931fb6bbdddae907263a7",
        }).then((ret) => {
          this.isHasredpack = true;
          localStorage.setItem("_isHasredpack", "263a7");
          if (ret.code == 0) {
            if (ret.data.state == "not_bind") {
              window.location.href = ret.data.url;
            } else if (ret.data.state == "has_activated") {
              if (this.planCode == "XL003") {
                this.$router.replace(
                  "/weibo/feiyan-paysuc?insuchannel=" +
                    this.$route.query.insuchannel
                );
              } else {
                this.$router.push("/weibo/insure-paysuc");
                //this.$router.replace('/weibo/insure-paysuc');
              }
            }
          } else {
            this.$toast("已领取");
          }
        });
      }
    },
    //开通免密支付
    payActive() {
      this.actionCount("bind_click", () => {
        if (this.sex == 1) {
          //男性送红包
          this.$post(Api.joinTicket, {
            sign: "898c4f832a7337c11dfcd8223afcf07c",
          });
        }
        this.bindWallet();
      });
    },
    bindWallet() {
      let path = this.$route.path;
      path == "/weibo/insure-active"
        ? localStorage.setItem("_ActiveChannel", "10029")
        : localStorage.setItem("_AgainActive", "10029");
      this.$post(Api.bindWallet, {
        plan_code: this.planCode,
        insuchannel: this.$route.query.insuchannel,
      }).then((ret) => {
        if (ret.code == 0) {
          console.log(ret.data.state);
          if (ret.data.state == "not_pay") {
            console.log(ret.data.url);
            // this.$router.push(ret.data.url)
            window.location.href = ret.data.url;
          } else if (ret.data.state == "not_bind") {
            window.location.href = ret.data.url;
          } else if (ret.data.state == "has_activated") {
            if (this.planCode == "XL003") {
              this.$router.replace(
                "/weibo/feiyan-paysuc?insuchannel=" +
                  this.$route.query.insuchannel
              );
            } else {
              // this.$router.replace("/weibo/insure-paysuc");
            }
          }
        } else {
          this.$toast(ret.msg || "请求失败，请刷新重试");
        }
      });
    },
    //开始定时器
    startInterval() {
      this.closeInterval();
      this.timeInterval = setInterval(() => {
        --this.timeSS;
        if (this.timeSS < 0) {
          --this.timeMM;
          this.timeSS = 59;
        }
        if (this.timeMM < 0) {
          --this.timeHH;
          this.timeMM = 59;
        }
        if (this.timeHH < 0) {
          this.timeSS = 0;
          this.timeMM = 0;
        }
      }, 1000);
    },
    //结束定时器
    closeInterval() {
      clearInterval(this.timeInterval);
      this.timeInterval = null;
    },
    getTimeValue(value) {
      return value > 9 ? value : "0" + value;
    },
  },
  beforeRouteLeave(to, from, next) {
    if (this["planState"]) {
      next();
    } else if (
      to.path != "/weibo/insure-paysuc" &&
      to.path != "/weibo/feiyan-paysuc" &&
      to.path != "/weibo/pay-blank"
    ) {
      this.$sinaConfirm({
        title: "风险提示", //提醒文字
        onlyHasTitle: false,
        desc: `<p><img src="${this.imgurl}"></p>`,
        showClose: false, // 关闭按钮
        confirmButtonText: "放弃红包，退出",
        cancelButtonText: "继续开通",
        size: "medium",
      })
        .then(() => {
          this.closeInterval();
          this.actionCount("cancal_click", () => {
            next();
          });
        })
        .catch(() => {
          this.closeInterval();
          this.actionCount("sumbit_click", () => {
            next(false);
            this.bindWallet();
          });
        });
    } else {
      next();
    }
  },
};
</script>

<style lang="scss" scoped>
.sina_page {
  background: url("http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/noteActiveRedpacketBg.png?v=1")
    #ce1f1f no-repeat;
  background-size: 100% auto;
  min-height: 1206px;
  height: 100%;
  .user_info {
    padding: 282px 0 0;
    text-align: center;
    line-height: 58px;
    .user_img {
      width: 78px;
      height: 78px;
      border-radius: 50%;
      overflow: hidden;
      margin: 0 auto;
    }
    .user_name {
      padding-top: 20px;
      font-size: 22px;
      span {
        margin-left: 20px;
        &:first-child {
          margin-left: 0px;
        }
      }
    }
  }

  .sina_bot {
    width: 100%;
    position: absolute;
    top: 838px;
    left: 0;
    padding: 20px 38px 0px 38px;
    .sina_btn_bind {
      position: absolute;
      left: 0px;
      bottom: 76px;
      width: 100%;
      height: 116px;
    }
    .daojishi {
      padding: 0px 0px 0px 0px;
      text-align: center;
      line-height: 34px;
      color: #fff;
    }
  }
}
</style>
