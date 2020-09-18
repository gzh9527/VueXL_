<template>
  <div class="sina_page">
    <div class="sina_hasbg">
      <div class="has_frimly">
        <div class="left flex1">
          {{myPlanInfo&&(myPlanInfo.validCount-1)}}位家人保障中
          <i class="arrow"></i>
        </div>
        <!--        <div class="right info_icon" @click="showInfoAlert">{{myPlanInfo&&myPlanInfo.totalMoney}}万元互助金(合计)</div>-->
        <div @click="moneyClick" class="redpackge">红包余额</div>
      </div>
      <div class="plan_cont">
        <div class="plan_detail">
          <plan-swiper
            v-if="myPlanInfo&&weiboInfo"
            :myPlanInfo="myPlanInfo"
            :weiboInfo="weiboInfo"
            @oneBtnJoinAlert="oneBtnJoinAlert"
          ></plan-swiper>
        </div>
        <div class="plan_peoples" v-if="validCount">
          <span class="num" v-for="(item,index) of validCount" :key="index">{{item}}</span>
          人已加入
        </div>
        <div class="plan_funcs">
          <div @click="iconClick(1,'/weibo/public-list')" class="plan_func func1">
            <div class="text">公示</div>
          </div>
          <div @click="iconClick(2,'/weibo/share-list')" class="plan_func func2">
            <div class="text">分摊</div>
          </div>
          <div @click="iconClick(3,'/weibo/activity-valent?channel=30058')" class="plan_func func3">
            <div class="text">邀请好友</div>
          </div>
          <div class="plan_func func4" @click="iconClick(4,null)">
            <div class="text">申请互助</div>
          </div>
        </div>
      </div>
    </div>
    <div class="show_intro" v-if="introShow">
      <div class="normalTitle">新会员必读</div>
      <div class="sina_radius_bg">
        <div class="intro_item" v-if="introIndex == 1">
          <div class="intro_title">听说国家已经报销新冠病毒的治疗费用了，为什么还需要互助？</div>
          <div class="intro_txt">此互助的目的主要是对于因新冠病毒救治而产生的误工等生活上的费用进行补充，并对患者身故后的家庭进行经济援助，和国家的医疗费用报销不冲突。</div>
        </div>
        <div class="intro_item" v-if="introIndex == 2">
          <div class="intro_title">怎么判断我是不是符合加入条件？</div>
          <div
            class="intro_txt"
          >因为这次的疫情非常严重，新冠病毒互助计划的会员主要是以利他心态加入，所以是次日生效；无年龄、地域、职业限制，只要现在没有被确诊为新型冠状病毒感染或被列入疑似新型冠状病毒感染的都可以加入。</div>
        </div>
        <div class="intro_item" v-if="introIndex == 3">
          <div class="intro_title">为什么医护人员可以获得3倍的互助额度？</div>
          <div
            class="intro_txt"
          >因为医护人员是抵御病疫的根本防线，他们冒着生命危险奋战在一线救助已经遭受感染的患者，他们肩负更重要的使命也承担着更高的风险，我们应该给与医护人员更多的守护，因此我们为其设定了更高的互助上限。向医护人员致敬！</div>
        </div>
        <div class="intro_item" v-if="introIndex == 4">
          <div class="intro_title">加入新冠病毒互助以后要花多少钱？</div>
          <div
            class="intro_txt"
          >当发生互助事件并完成公示后平台会自动划扣互助金。新冠互助计划的总计分摊额以200元为限。用来救助包括自己在内可能患病的同胞。我们不收取任何管理费，互助金将100%用于救助患病者。</div>
        </div>
        <div class="intro_bot">
          <div class="intro_btn left" v-if="introIndex>1" @click="introShowEvt('pre')">上一个</div>
          <span>{{introIndex}}/4</span>
          <div
            class="intro_btn"
            @click="introShowEvt('next')"
            v-if="introIndex<=4"
          >{{introIndex == 4 ?'我知道了':'下一个'}}</div>
        </div>
      </div>
    </div>
    <div class="plan_share">
      <my-ad id="weibo-insure-plan-1" v-if="sinaAdShow" title="让保障更加全面"></my-ad>
    </div>
    <div class="publicity" v-if="totalNum">
      <div class="normalTitle">疫情发展统计</div>
      <div class="sina_radius_bg">
        <div class="public_title">{{dateLimit}}</div>
        <div class="public_cells">
          <div class="public_cell">
            <div class="nums">
              {{totalNum.confirmedCount}}
              <i>例</i>
            </div>
            <div class="feiyantxt">确诊</div>
          </div>
          <div class="public_cell">
            <div class="nums">
              {{totalNum.suspectedCount}}
              <i>例</i>
            </div>
            <div class="feiyantxt">疑似</div>
          </div>
          <div class="public_cell">
            <div class="nums">
              {{totalNum.deadCount}}
              <i>例</i>
            </div>
            <div class="feiyantxt">死亡</div>
          </div>
          <div class="public_cell">
            <div class="nums">
              {{totalNum.curedCount}}
              <i>例</i>
            </div>
            <div class="feiyantxt">治愈</div>
          </div>
        </div>
      </div>
    </div>

    <my-fqas planShow="true"></my-fqas>

    <oneBtnJoin
      v-if="addPerson"
      :addAlertShow="addAlertShow"
      :addPerson="addPerson"
      @cancalAdd="cancalAdd"
      @showClauseAlert="showClauseAlert"
      @addPlanSuc="addPlanSuc"
    ></oneBtnJoin>
    <clause-alert
      v-if="alertClauseShow"
      :alertShow="alertClauseShow"
      :alertIndex="alertIndex"
      @closeClauseAlert="alertClauseShow=false"
    ></clause-alert>
    <!--    引导加入大病弹窗-->
    <!--    <div class="toast-mask" v-if="daBingAlert" @click="closeDabingAlert">-->
    <!--      <div class="dabing-alert">-->
    <!--        <img src="./images/daBingAlert_3x.png" />-->
    <!--        <div class="alert-cont">-->
    <!--          <div class="alert-desc">全网首个100种重疾保障+意外医疗互助</div>-->
    <!--          <button class="sina_btn primary radius" @click.stop="addDabingPlan()">一键升级 0元加入大病互助</button>-->
    <!--        </div>-->
    <!--      </div>-->

    <!--    </div>-->
    <my-service></my-service>
    <my-ad id="weibo-insure-plan-10" v-if="sinaAlertAdShow" isAlert="true"></my-ad>
  </div>
</template>

<script>
import myService from "../components/myService";
import planSwiper from "../components/planSwiper";
import myFqas from "../components/FQAs";
import Api from "../utils/apiConfig";
import oneBtnJoin from "../components/oneBtnJoin";
import clauseAlert from "./clause/clauseAlert";
import myAd from "../components/sinaAd";
export default {
  components: {
    planSwiper,
    myService,
    myFqas,
    oneBtnJoin,
    clauseAlert,
    myAd,
  },
  name: "plan",
  data() {
    return {
      myPlanInfo: null,
      validCount: null,
      weiboInfo: null,
      adInfo: null,
      planStatus: null,
      planStatusFY: null,
      totalAmnt: null,
      addAlertShow: false,
      addPerson: null,
      alertClauseShow: false,
      alertIndex: null,
      totalNum: null,
      dateLimit: null,
      introIndex: 1, // 必读展示index
      introShow: false, // 必读的展示与否
      daBingAlert: false, // 大病弹窗显示与否
      sinaAdShow: false, // 新浪页面中间广告位
      sinaAlertAdShow: false, // 新浪弹窗广告位
    };
  },
  computed: {},
  watch: {
    daBingAlert(val) {
      if (val) {
        this.addAlertShow = true;
        this.addPerson = {
          notHaveCode: "XL001",
        };
      }
    },
  },
  mounted() {
    if (localStorage.getItem("introShow")) {
      this.introShow = false;
    } else {
      this.introShow = true;
    }
    this.getWeiboInfo();
    this.getPlanStatus();
    // this.getValidCount();
  },
  methods: {
    getPlanStatus() {
      this.$get(Api.getMyPolicy, {}).then((ret) => {
        if (ret.code === 0) {
          if (
            ret.data.plan_list_state &&
            ret.data.plan_list_state["XL001"] == "not_join" &&
            ret.data.plan_list_state["XL002"] == "not_join" &&
            ret.data.plan_list_state["XL003"] == "not_join"
          ) {
            sessionStorage.removeItem("myPlanInfo");
            this.$router.replace("/weibo/insure-join");
          } else {
            this.myPlanInfo = sessionStorage.getItem("myPlanInfo")
              ? JSON.parse(sessionStorage.getItem("myPlanInfo"))
              : null;
            this.daBingAlert =
              !sessionStorage.getItem("_dabingAlert") &&
              ret.data.plan_list_state["XL003"] == "activated" &&
              ret.data.plan_list_state["XL001"] == "not_join";
            if (!this.myPlanInfo) {
              this.planStatus =
                ret.data.plan_list_state["XL001"] == "activated" ||
                ret.data.plan_list_state["XL002"] == "activated"
                  ? 1
                  : 0;
              this.planStatusFY =
                ret.data.plan_list_state["XL003"] == "activated" ? 1 : 0;

              this.totalAmnt = ret.data.total_amnt;
              this.getPlanList(ret);
            }

            this.actionCount("pv");
            this.getFyData();
            this.sinaAdShow = true;
            this.sinaAlertAdShow =
              !this.daBingAlert && ret.data.max_state == "activated";
          }
        } else {
          this.$toast("请求失败，请刷新重试");
        }
      });
    },
    getPlanList() {
      this.$get(Api.getPolicyList, {}).then((res) => {
        if (res.code == 0) {
          let dataList = res.data.policy_list.map((item) => {
            let notHaveCode = "";
            let plancode = [];
            item.plans.map((plan) => {
              plancode.push(plan.plan_code);
            });
            if (plancode.length > 0 && plancode.indexOf("XL003") == -1) {
              notHaveCode = "XL003";
            }
            if (plancode.length > 0 && plancode.indexOf("XL001") == -1) {
              let age = this.getIdCardAge(item.insured.idno_init);
              if (age < 60) {
                notHaveCode = "XL001";
              }
            }
            item.insured["notHaveCode"] = notHaveCode;
            return item;
          });
          this.myPlanInfo = {
            fromUrl: "plan",
            validCount: res.data.policy_list.length,
            dataList: dataList,
            planStatus: this.planStatus,
            planStatusFY: this.planStatusFY,
            totalMoney: this.totalAmnt,
          };
          sessionStorage.setItem("myPlanInfo", JSON.stringify(this.myPlanInfo));
        } else {
          this.$toast(res.msg || "请求超时，请刷新重试");
        }
      });
    },
    getValidCount() {
      this.$get(Api.getJoinCount, {}).then((ret) => {
        if (ret.code == 0) {
          let count = ret.data;
          for (let i = 0; count.toString().split("").length < 7; i++) {
            count = "0" + count;
          }
          this.validCount = count;
        }
      });
    },
    getFyData() {
      this.$get(Api.bridgeFeiyan, {}).then((ret) => {
        if (ret.data) {
          this.totalNum = ret.data.total;
          this.dateLimit = ret.data.date_limit;
        }
      });
    },
    showInfoAlert() {
      this.$sinaAlert({
        title: "什么是互助金（合计）", //提醒文字
        onlyHasTitle: false,
        desc: `<p>当前新浪支付账户下，已加入新浪互助所有家庭成员（含本人）的互助金总和，每位成员的互助金额度是独立的，成员之间不共享</p>`, //
        showClose: true, // 关闭按钮
      });
    },
    oneBtnJoinAlert(item) {
      this.addAlertShow = true;
      this.addPerson = item;
    },
    cancalAdd() {
      if (this.addPerson.notHaveCode == "XL001") {
        this.closeDabingAlert();
      }
      this.addAlertShow = false;
      this.addPerson = null;
    },
    addPlanSuc() {
      this.myPlanInfo = null;

      this.$get(Api.getMyPolicy, {}).then((ret) => {
        if (ret.code === 0) {
          this.planStatus =
            ret.data.plan_list_state["XL001"] == "activated" ||
            ret.data.plan_list_state["XL002"] == "activated"
              ? 1
              : 0;
          this.planStatusFY =
            ret.data.plan_list_state["XL003"] == "activated" ? 1 : 0;
          this.totalAmnt = ret.data.total_amnt;
          this.getPlanList();
        } else {
          this.$toast("请求失败，请刷新重试");
        }
      });
      this.cancalAdd();
    },
    showClauseAlert(idx) {
      this.alertClauseShow = true;
      this.alertIndex = idx;
    },
    introShowEvt(type) {
      if (this.introIndex == 4 && type == "next") {
        this.introShow = false;
        localStorage.setItem("introShow", "1");
        this.actionCount("IKonw_click");
        return;
      }
      if (type == "pre") {
        this.introIndex--;
      } else {
        this.introIndex++;
      }
    },
    closeDabingAlert() {
      this.daBingAlert = false;
      this.actionCount("cancelPlan_click1");
      sessionStorage.setItem("_dabingAlert", "1");
    },
    addDabingPlan() {
      this.closeDabingAlert();
      this.actionCount("addPlan_click1", () => {
        this.$router.push({
          path: "/weibo/insure-illIntro",
        });
      });
    },
    iconClick(index, page) {
      this.actionCount("icon_click" + index, () => {
        if (page) {
          this.$router.push(page);
        } else {
          this.addReport();
        }
      });
    },
    addReport() {
      let { hostname } = window.location;
      let url =
        hostname == "sina.bihubao.com"
          ? "https://tpa.bihubao.com"
          : "http://tpatest.bihubao.com";
      window.location.href = `${url}/mobile/login?mid=${this.weiboInfo.uid}&companyid=BXL`;
    },
    moneyClick() {
      this.actionCount("money_click", () => {
        this.$router.push({
          path: "/weibo/redpacket",
        });
      });
    },
  },
  destroyed() {
    this.$clearsinaAlert();
  },
};
</script>

<style scoped lang="scss">
@import "./css/mixin";

.sina_page {
  .sina_hasbg {
    background-color: #fff;
    @include bg-image("sinaBanner2");
    background-size: auto 440px;

    .has_frimly {
      padding: 30px 200px 22px 30px;
      color: #fff;
      font-size: 26px;
      font-weight: bold;
      line-height: 38px;
      position: relative;
      @include fj();
      .arrow {
        width: 16px;
        height: 16px;
        margin-left: 12px;
        display: inline-block;
        border: 2px solid #fff;
        border-bottom-width: 0;
        border-left-width: 0;
        transform: rotate(45deg);
      }

      .info_icon {
        padding-left: 36px;
        display: inline-block;
        background-size: 24px 24px;
        background-position: left center;
        @include bg-image("sinaIconInfo1");
      }
      .redpackge {
        position: absolute;
        right: 30px;
        top: 28px;
        width: 202px;
        height: 58px;
        background: url("./images/planCenterIcon.png") no-repeat 26px 15px;
        background-size: 30px 28px;
        border-radius: 34px;
        border: 2px solid #ffffff;
        padding-left: 64px;
        font-size: 28px;
        line-height: 58px;
      }
    }

    .plan_cont {
      width: 100%;

      .plan_detail {
        min-height: 540px;
      }

      .plan_peoples {
        margin: 40px auto 0;
        text-align: center;
        color: #b7b6b6;

        .num {
          width: 46px;
          height: 46px;
          line-height: 46px;
          display: inline-block;
          border: 1px solid rgba(183, 182, 182, 1);
          font-size: $font28;
          margin-right: 16px;
          color: #333;
        }
      }

      .plan_funcs {
        padding: 60px 64px 52px;
        @include fj;

        a:active {
          color: #333;
        }
        .plan_func {
          @include flex(1);
          margin-right: 60px;
          padding-top: 90px;
          background-size: 80px 80px;
          background-position: center top;

          &:last-child {
            margin-right: 0;
          }

          &.func1 {
            @include bg-image("sinaPlanFunc1");
          }

          &.func2 {
            @include bg-image("sinaPlanFunc2");
          }

          &.func3 {
            @include bg-image("sinaPlanFunc3");
          }

          &.func4 {
            @include bg-image("sinaPlanFunc4");
          }
          .text {
            text-align: center;
          }
        }
      }
    }
  }

  .plan_share {
    margin: 0px 18px 0;
    .hasborTitle {
      font-size: 24px;
      font-weight: normal;
      margin-bottom: 24px;
      position: relative;
      left: -40px;
    }
  }
  .publicity {
    .sina_radius_bg {
      padding: 28px 0;
    }
    .public_cells .public_cell .nums {
      font-size: 40px;
    }
    .public_title {
      padding-left: 40px;
      color: $grey;
      font-size: 20px;
      padding-bottom: 42px;
    }
    .public_cells .public_cell .txt_col {
      color: #333;
    }
  }
  .show_intro {
    .sina_radius_bg {
      padding: 30px;
      .intro_title {
        font-weight: 600;
        font-size: 28px;
        padding-bottom: 20px;
      }
      .intro_bot {
        position: relative;
        text-align: center;
        margin-top: 30px;
        padding: 10px 0;
        .intro_btn {
          width: 160px;
          position: absolute;
          top: 0;
          right: 0;
          background: $primary;
          height: 50px;
          line-height: 50px;
          border-radius: 25px;
          color: #fff;
          &.left {
            left: 0;
            right: auto;
          }
        }
      }
    }
  }
  .login_icon {
    @include bg-image("sinaLogo");
  }
  .dabing-alert {
    width: 600px;
    @include center;
    background: rgba(255, 255, 255, 1);
    border-radius: 20px;
    .alert-cont {
      margin: 0 40px;
      padding-bottom: 58px;
      .alert-desc {
        padding: 40px 0;
        text-align: center;
        color: #939393;
      }
      .sina_btn {
        font-size: 30px;
      }
    }
  }
}
</style>
