<template>
  <div class="sina_page">
    <div class="sina_hasbg">
      <div class="detail_cont">
        <div class="sina_radius_bg">
          <div class="detail_box">
            <div class="detail_info">
              <div class="hasborTitle">
                {{ planInfo && planInfo.insured.name }} |
                {{ (planInfo && planInfo.plan.plan_name) || "意外医疗计划 " }}
              </div>
              <div class="info_cont">
                <div class="days">
                  已保障 {{ planInfo && planInfo.plan.join_day }} 天<span
                    v-if="
                      planInfo &&
                      planInfo.plan.valid_state != '1' &&
                      planInfo.plan.plan_code != 'XL003'
                    "
                    @click="showInfoAlert"
                    >(未过{{
                      this.planInfo.plan.plan_code == "XL001"
                        ? "观察期"
                        : "等待期"
                    }})<i class="info_icon"></i
                  ></span>
                </div>
                <div class="label">计划编号</div>
              </div>
            </div>
            <!--            <div class="state_icon"></div>-->
          </div>
          <div class="plan_no">
            {{ planInfo && planInfo.plan.son_policy_no }}
          </div>
        </div>
        <div class="sina_cont sina_btns flex">
          <div
            class="sina_btn primary radius line medium"
            v-if="planInfo && planInfo.insured.notHaveCode == 'XL001'"
            @click.stop="addPlanAlert(planInfo.insured)"
          >
            0元升级保障
          </div>

          <!--          <div class="sina_btn primary radius line medium" v-if="planInfo&&planInfo.insured.notHaveCode =='XL003'"-->
          <!--               @click.stop="addPlanAlert(planInfo.insured)">升级新冠病毒互助</div>-->
          <div
            class="sina_btn primary radius medium"
            v-if="planInfo && planInfo.plan.plan_code == 'XL001'"
            @click="updateAmnt"
          >
            互助金调额
          </div>
          <div
            class="sina_btn primary radius medium"
            v-if="planInfo && planInfo.plan.plan_code == 'XL001'"
            @click="updateTypeName"
          >
            调整受助类型
          </div>
          <div class="sina_btn primary radius line medium" @click="addReport">
            申领互助金
          </div>
        </div>
      </div>
    </div>
    <div class="plan_hasback">
      <div class="title_cont">
        <div class="hasborTitle">计划详情</div>
      </div>
      <div class="user_cells sina_cont">
        <div class="user_cell flex">
          <div class="label">计划编号</div>
          <div class="info flex1">
            {{ planInfo && planInfo.plan.son_policy_no }}
          </div>
        </div>
        <div class="user_cell flex">
          <div class="label">加入时间</div>
          <div class="info flex1">
            {{ planInfo && planInfo.plan.join_date }}
          </div>
        </div>
        <div class="user_cell flex">
          <div class="label">生效时间</div>
          <div class="info flex1">
            {{
              planInfo && (planInfo.plan.obsdate || planInfo.plan.valid_date)
            }}
          </div>
        </div>
        <div class="user_cell flex">
          <div class="label">身份证号</div>
          <div class="info flex1">{{ planInfo && planInfo.insured.idno }}</div>
        </div>
        <div class="user_cell flex">
          <div class="label">互助额度</div>
          <div class="info flex1">{{ planInfo && planInfo.plan.amnt }}万</div>
        </div>
        <div
          class="user_cell flex"
          v-if="planInfo && planInfo.plan.plan_code == 'XL001'"
        >
          <div class="label">受助类型</div>
          <div class="info flex1">
            {{ (planInfo && planInfo.plan.duty_type_name) || "报销型" }}
          </div>
        </div>
        <table
          class="term_table"
          v-if="planInfo && planInfo.plan.plan_code == 'XL001'"
        >
          <tr>
            <th colspan="2">互助范围</th>
            <th class="wid_50">对应互助额度</th>
          </tr>
          <tr>
            <td rowspan="2">重度重症</td>
            <td>一般</td>
            <td>互助额度</td>
          </tr>
          <tr>
            <td>一类恶性肿瘤</td>
            <td>互助额度的1/3</td>
          </tr>
          <tr>
            <td rowspan="2">轻度重症</td>
            <td>单项</td>
            <td>互助额度的1/6</td>
          </tr>
          <tr>
            <td>累计</td>
            <td>互助额度的1/3</td>
          </tr>
          <tr>
            <td colspan="2">身故</td>
            <td class="twoline">
              互助额度的1/12或既往支出的所分摊互助金额，取两者之中最大值。
            </td>
          </tr>
        </table>
        <table
          class="term_table"
          v-if="planInfo && planInfo.plan.plan_code == 'XL002'"
        >
          <tr>
            <th colspan="3">报销由意外引起的住院费用</th>
          </tr>
          <tr>
            <td>终身累计报销上限</td>
            <td>15万元</td>
          </tr>
          <tr>
            <td>年度累计报销上限</td>
            <td>5万元</td>
          </tr>
          <tr>
            <td>有社保起付线</td>
            <td>3000元</td>
          </tr>
          <tr>
            <td>无社保报销起付线</td>
            <td>5000元</td>
          </tr>
        </table>
        <img
          src="./images/FYdetailTable_2x.png"
          v-if="planInfo && planInfo.plan.plan_code == 'XL003'"
        />
      </div>
      <div class="join_clause" v-if="planInfo">
        <router-link
          v-if="planInfo.plan.plan_code != 'XL003'"
          :to="
            planInfo.plan.plan_code == 'XL001'
              ? '/weibo/clause?type=0&cid=0'
              : '/weibo/clause?type=0&cid=5'
          "
          class="col_a"
          >《健康告知》</router-link
        >
        <router-link to="/weibo/clause?type=0&cid=1" class="col_a"
          >《会员公约》</router-link
        >
        <router-link
          :to="
            planInfo.plan.plan_code == 'XL001'
              ? '/weibo/clause?type=0&cid=2'
              : planInfo.plan.plan_code == 'XL002'
              ? '/weibo/clause?type=0&cid=4'
              : '/weibo/clause?type=0&cid=6'
          "
          class="col_a"
          >《计划章程》</router-link
        >
        <router-link to="/weibo/clause?type=0&cid=3" class="col_a"
          >《授权代扣委托书》</router-link
        >
      </div>
    </div>
    <div class="sina_cont">
      <button class="sina_btn primary radius max"  @click="gotoCenter()">查看个人中心</button>
      <div class="plan_delbtn" @click="giveupPlanAlert" v-if="!isProd">放弃保障</div>
     <!-- <div class="plan_delbtn" @click="giveupPlanAlert">_____</div> -->
    </div>

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
      @closeClauseAlert="alertClauseShow = false"
    ></clause-alert>
    <plan-type
      v-if="isShowPlanType"
      :policy_uuid="planInfo.plan.policy_uuid"
      :plan_code="planInfo.plan.plan_code"
      :help_type="planInfo.plan.duty_type"
      :help_type_name="planInfo.plan.duty_type_name"
      @closeTypeAlert="closeTypeAlert"
    ></plan-type>
    <my-service></my-service>
    <confirm @send="confirmBackFun" v-show="confirmFlag" />
  </div>
</template>

<script>
import myService from "../components/myService";
import Api from "../utils/apiConfig";
import { mixinActions } from "../assets/js/mixinActions";
import oneBtnJoin from "../components/oneBtnJoin";
import clauseAlert from "./clause/clauseAlert";
import planType from "../components/planType";
import confirm from "../components/confirm/confirm";
export default {
  components: {
    myService,
    oneBtnJoin,
    clauseAlert,
    planType,
    confirm,
  },
  mixins: [mixinActions],
  name: "planDetail",
  data() {
    return {
      id: null,
      planInfo: null,
      addAlertShow: false,
      addPerson: null,
      alertClauseShow: false,
      alertIndex: null,
      isShowPlanType: false,
      confirmFlag: false,
      confirmData: "",
      isProd:true, // 是否是生成环境
    };
  },
  mounted() {
    this.actionCount("pv");
    this.id = this.$route.query.id;
    this.isProd = window.location.hostname == 'sina.bihubao.com'; // 是否是生成环境
    if (!sessionStorage.getItem("myPlanInfo")) {
      this.getPlanList();
    } else {
      let myPlanInfo = JSON.parse(sessionStorage.getItem("myPlanInfo"));
      myPlanInfo.dataList.forEach((item) => {
        item.plans.forEach((plan) => {
          if (plan.son_policy_no == this.id) {
            let itemPolicy = {};
            itemPolicy["insured"] = item.insured;
            itemPolicy["plan"] = plan;
            this.planInfo = itemPolicy;
            return;
          }
        });
      });
      if (!this.planInfo) {
        this.$router.replace(`/weibo/insure-plan`);
      }
    }
  },
  methods: {
    getPlanList() {
      this.$get(Api.getMyPolicy, {}).then((ret) => {
        if (ret.code == 0) {
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
              let myPlanInfo = {
                fromUrl: "plan",
                validCount: res.data.policy_list.length,
                dataList: dataList,
                planStatus:
                  ret.data.plan_list_state["XL001"] == "activated" ||
                  ret.data.plan_list_state["XL002"] == "activated"
                    ? 1
                    : 0,
                planStatusFY:
                  ret.data.plan_list_state["XL003"] == "activated" ? 1 : 0,
                totalMoney: ret.data.total_amnt,
              };
              sessionStorage.setItem("myPlanInfo", JSON.stringify(myPlanInfo));
              myPlanInfo.dataList.forEach((item) => {
                item.plans.forEach((plan) => {
                  if (plan["son_policy_no"] == this.id) {
                    let itemPolicy = {};
                    itemPolicy["insured"] = item.insured;
                    itemPolicy["plan"] = plan;
                    this.planInfo = itemPolicy;
                    return;
                  }
                });
              });
              if (!this.planInfo) {
                this.$router.replace(`/weibo/insure-plan`);
              }
            } else {
              this.$toast(res.msg || "请求超时，请刷新重试");
            }
          });
        } else {
          this.$toast(ret.msg || "请求超时，请刷新重试");
        }
      });
    },
    showInfoAlert() {
      let alertDesc = "";
      let title = "";
      if (this.planInfo.plan.plan_code == "XL001") {
        title = "什么是观察期";
        alertDesc = `<p>自成员加入计划生效日零时起180日内（含180天）为观察期。</p>
                  <p> 在观察期内，大病互助计划成员遭遇意外伤害而产生重症疾病，经二级合格及以上公立医院确诊，可以申请互助金。</p>
                  <p>为保障全体会员利益，防范带病加入等风险,非意外确诊患病不能申请互助金。</p>`;
      } else if (this.planInfo.plan.plan_code == "XL002") {
        title = "什么是等待期";
        alertDesc =
          "<p>自成员加入计划生效日零时起30日内（含30天）为等待期。</p>";
      }
      this.$sinaAlert({
        title: title, //提醒文字
        onlyHasTitle: false,
        desc: alertDesc, //
        showClose: true, // 关闭按钮
      });
    },
    giveupPlanAlert() {
      if (
        this.planInfo.plan.plan_code == "XL001" ||
        this.planInfo.plan.plan_code == "XL002"
      ) {
        this.actionCount("delBtn_click", () => {
          this.$router.push(
            `/weibo/exit-paln?id=${this.id}&uuid=${this.planInfo.plan.policy_uuid}&planCode=${this.planInfo.plan.plan_code}`
          );
        });
      } else {
        this.actionCount("delBtn_click");
        let alertTitle = "";
        if (this.planInfo.plan.plan_code == "XL001") {
          alertTitle =
            "现在退出，最高30万重疾互助金将失效，再加入将重新确认健康要求，并重新计算180天观察期。本人放弃保障家人也将失去守护，你要离开吗";
        } else if (this.planInfo.plan.plan_code == "XL002") {
          alertTitle =
            "现在退出，最高5万意外医疗互助金将失效，再加入将重新确认健康要求，并重新计算30天等待期。你要离开吗";
        } else if (this.planInfo.plan.plan_code == "XL003") {
          alertTitle = "现在退出，最高10万新冠病毒互助将失效，你要离开吗？";
        }

        this.$sinaAlert({
          title: alertTitle, //提醒文字
          onlyHasTitle: true,
          callback: this.giveupPlan,
          showClose: false, // 关闭按钮
          confirmButtonText: "我还想放弃",
          cancelButtonText: "我再想想",
        });
      }
    },
    giveupPlan() {
      this.actionCount("giveBtn_click");
      this.$post(Api.deletePolicy, {
        policy_uuid: this.planInfo.plan.policy_uuid,
        plan_code: this.planInfo.plan.plan_code,
      }).then((ret) => {
        if (ret.code === 0) {
          sessionStorage.removeItem("myPlanInfo");
          this.$router.replace("/weibo/insure-plan");
        } else {
          this.$toast(ret.msg || "请求失败，请刷新重试");
        }
      });
    },
    addPlanAlert(item) {
      this.actionCount("addPlan_click2", () => {
        if (item.notHaveCode == "XL001") {
          this.$router.push("/weibo/insure-illIntro");
        } else {
          this.addAlertShow = true;
          this.addPerson = item;
        }
      });
    },
    cancalAdd() {
      this.addAlertShow = false;
      this.addPerson = null;
    },
    addPlanSuc() {
      this.getPlanList();
      this.cancalAdd();
    },
    showClauseAlert(idx) {
      this.alertClauseShow = true;
      this.alertIndex = idx;
    },
    addReport() {
      if (this.planInfo.plan.valid_state == "1") {
        let weiboInfo = sessionStorage.getItem("weiboInfo")
          ? JSON.parse(sessionStorage.getItem("weiboInfo"))
          : null;
        let { hostname } = window.location;
        let url =
          hostname == "sina.bihubao.com"
            ? "https://tpa.bihubao.com"
            : "http://tpatest.bihubao.com";
        if (weiboInfo) {
          window.location.href = `${url}/mobile/login?mid=${weiboInfo.uid}&companyid=BXL`;
        }
      } else {
        let planCode = this.planInfo.plan.plan_code;
        let desc = "未过观察期";
        if (planCode == "XL002") {
          desc = "未过等待期";
        } else if (planCode == "XL003") {
          desc = "未到生效时间";
        }
        this.$toast(`申请人${desc}，暂不能申领互助金`);
      }
    },
    updateTypeName() {
      this.isShowPlanType = true;
    },
    //confirm 组件回参
    confirmBackFun(data) {
      this.confirmData = data;
      console.log(this.confirmData);
      if (this.confirmData == "no") {
        console.log("用户点击了取消");
        this.confirmFlag = false;
      } else if (this.confirmData == "ok") {
        console.log("用户点击了确认");
        this.confirmFlag = false;
        this.$router.push("/weibo/amnt-edit?planCode=XL001&id=" + this.id);
      }
    },
    updateAmnt() {
      //如果是微博借钱加入得用户
      let infoData = JSON.parse(window.sessionStorage.getItem('myPlanInfo'))
      console.log(infoData.dataList[0].insured.channel)
      if (infoData.dataList[0].insured.channel == '55001') {
        //微博借钱渠道加入互助的用户
         this.actionCount("updateAmntJQ_click");
        this.confirmFlag = true;
      } else {
        this.$router.push("/weibo/amnt-edit?planCode=XL001&id=" + this.id);
      }
    },
    closeTypeAlert(type) {
      this.isShowPlanType = false;
      if (type) {
        this.getPlanList();
      }
    },
    gotoCenter() {
      this.$router.push("/weibo/insure-plan");
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
    background: #fff;
    @include bg-image("sinaBanner2");
    background-size: 100% auto;
    padding-bottom: 40px;

    .detail_cont {
      width: 100%;
      padding-top: 32px;

      .plan_no {
        padding: 10px 40px 52px;
        font-size: 36px;
        line-height: 56px;
      }

      .sina_radius_bg {
        padding: 32px 30px 0 0;
      }

      .detail_box {
        position: relative;
        .detail_info {
          position: relative;
          .hasborTitle {
            padding-left: 32px;
            padding-right: 40px;
            border-left-width: 6px;
            height: 40px;
            line-height: 40px;
            @include single-line;
          }

          .info_cont {
            padding-left: 40px;

            .days {
              padding-top: 12px;
              line-height: 30px;
              color: $grey;

              .info_icon {
                width: 30px;
                height: 30px;
                margin-left: 12px;
                vertical-align: middle;
                display: inline-block;
                background-size: cover;
                @include bg-image("sinaIconInfo");
              }
            }

            .label {
              margin-top: 72px;
            }
          }
        }

        &::after {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          width: 174px;
          height: 174px;
          @include bg-image("sinaStateIcon");
          background-size: 174px 174px;
          margin-left: 20px;
        }
      }

      .sina_btn.medium {
        &.primary {
          background: $primary;
        }
        &.line {
          background: #fff;
        }
        flex: 1;
        max-width: 300px;
        margin: 48px 0 12px 20px;
        &:first-child {
          margin-left: 0;
        }
      }
    }
  }

  .plan_hasback {
    margin-bottom: 40px;

    .title_cont {
      margin-bottom: 0;
    }

    .hasborTitle {
      font-weight: normal;
    }

    .user_cells {
      padding-top: 24px;
      font-size: 28px;

      .user_cell {
        padding: 16px 0;

        .label {
          margin-right: 24px;
        }

        .info {
          color: $grey;
          text-align: right;
        }

        .info_desc {
          width: 100%;
          color: $grey;
          padding-top: 16px;
        }
      }

      .imgtable {
        margin-top: 24px;
      }
    }

    .join_clause {
      padding: 16px 30px 0;
      text-align: center;

      a {
        font-size: 24px;
        text-decoration: none;
      }
    }
  }
  .term_table {
    margin: 24px 0;
    width: 100%;
    border-right: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;

    th,
    td {
      border-left: 1px solid #e6e6e6;
      border-top: 1px solid #e6e6e6;
      text-align: center;
      height: 96px;
      line-height: 96px;
      font-weight: normal;

      .wid_50 {
        width: 50%;
      }
    }
    td {
      padding: 0 20px;
      font-size: 24px;
      border-right: 1px solid #e6e6e6;
    }
    .twoline {
      line-height: 1.8;
      padding-top: 20px;
      padding-bottom: 20px;
    }
    th {
      font-size: 28px;
      width: 33.3%;
    }
  }
  .plan_delbtn {
    margin: 24px auto 0;
    text-align: center;
    color: #939393;
  }
  .msgbox {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 10017;
    width: 690px;
    height: auto;
    box-sizing: content-box;
    @include transForm(translate(-50%, -50%));

    .msgbox_cont {
      padding: 0px 50px 56px;
      border-radius: 20px;
      background: #fff;
      width: 100%;

      .title {
        font-size: 36px;
        line-height: 50px;
        padding: 36px 0 20px;
        font-weight: 600;
        text-align: center;
      }

      .cont_btns {
        width: 100%;
        display: flex;
        margin-top: 70px;

        .cont_btn {
          flex: 1;

          height: 84px;
          line-height: 84px;

          &:first-child {
            margin-right: 30px;
          }
        }
      }
    }
  }
  .mtop20 {
    margin-top: 20px;
  }
}
</style>
