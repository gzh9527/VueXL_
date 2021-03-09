<template>
  <div class="sina_page">
    <div class="sina_hasbg">
      <!-- <xtjToast :sendData="typePage" /> -->
      <!-- <div class="plan_info">
        <img src="./images/sinaBanner4_2x.png">
      </div> -->
      <div class="title_cont">
        <div class="hasborTitle">
          为谁加入
          <span class="col_grey desc">点击头像选择家人</span>
        </div>
      </div>
      <div class="sina_cont">
        <div class="who_cells">
          <div class="who_cell">
            <div
              class="who_btn"
              v-if="relationLimit && relationLimit.spouseShow"
              @click="relation = 51"
              :class="{ active: relation == 51 }"
            >
              <i class="who_icon spouse"></i>
              <i class="checkbox"></i>配偶
            </div>
            <div
              class="who_btn"
              v-if="relationLimit && relationLimit.parentShow"
              @click="relation = 53"
              :class="{ active: relation == 53 }"
            >
              <i class="who_icon parents"></i>
              <i class="checkbox"></i>父母
            </div>
            <div
              class="who_btn"
              @click="relation = 52"
              :class="{ active: relation == 52 }"
            >
              <i class="who_icon children"></i>
              <i class="checkbox"></i>子女
            </div>
          </div>
        </div>
        <div class="input_cells">
          <div class="sina_input_normal">
            <span class="label">姓名</span>
            <input
              autocomplete="off"
              v-model.trim="userInfo.userName"
              maxlength="10"
              type="text"
              class="input_css"
              placeholder="请输入姓名"
              value=""
            />
          </div>
          <div class="sina_input_normal">
            <span class="label">身份证号</span>
            <input
              type="text"
              autocomplete="off"
              maxlength="18"
              v-model.trim="userInfo.idNo"
              class="input_css"
              placeholder="请输入身份证号"
              value=""
            />
          </div>
          <div
            class="sina_input_normal hasarrow right"
            @click="workTypeShow = true"
          >
            <span class="label">职业</span>
            <span class="flex1 type_name">{{
              workTypeList[workTypeIndex].name
            }}</span>
          </div>
          <!--          <div class="help_info" @click="alertHelpType">受助类型说明</div>-->
        </div>
        <div class="join_intro">
          <div class="join_desc hasradius_bg">
            <i class="checkbox" @click.stop="isCheckedFY = !isCheckedFY"
              ><i v-if="isCheckedFY" class="checked"></i
            ></i>
            <div class="plan_title">新冠病毒互助最高10万</div>
            <div class="plan_desc">不限年龄，医护人员最高30万</div>
            <div class="plan_clause">
              <a href="javascript:;" @click.stop="showAlert(1)" class="col_a"
                >《会员公约》</a
              >
              <a href="javascript:;" @click.stop="showAlert(6)" class="col_a"
                >《计划章程》</a
              >
            </div>
          </div>
          <div class="join_desc hasradius_bg">
            <i class="checkbox" @click="isChecked = !isChecked"
              ><i v-if="isChecked" class="checked"></i
            ></i>
            <div class="plan_title">大病互助+意外互助最高35万</div>
            <div class="plan_desc">重疾最高30万+意外医疗最高5万</div>
            <div class="plan_clause">
              <a href="javascript:;" @click.stop="showAlert(1)" class="col_a"
                >《会员公约》</a
              >
              <a href="javascript:;" @click.stop="showAlert(0)" class="col_a"
                >《健康告知》</a
              >
              <a href="javascript:;" @click.stop="showAlert(2)" class="col_a"
                >《计划章程》</a
              >
            </div>
          </div>
        </div>
      </div>
      <!--      2020/8/13-->
      <!--      <div class="title_cont myAd">-->
      <!--        <div class="hasborTitle">让保障更加全面</div>-->
      <!--      </div>-->
      <div class="sina_cont myAd">
        <div class="join_btn">
          <button class="sina_btn primary radius" @click="addUserEvent">
            0元加入
          </button>
        </div>
         <my-ad id="weibo-insure-add-1" v-if="advertShow"></my-ad>
      </div>
    </div>
    <clause-alert
      v-if="alertShow"
      :alertShow="alertShow"
      :alertIndex="alertIndex"
      @closeClauseAlert="alertShow = false"
    ></clause-alert>

    <prop-helptype
      :title="'职业'"
      :show="workTypeShow"
      @closeProp="workTypeShow = false"
      @confirmProp="confirmProp"
      :checkedIndex="workTypeIndex"
      :dataList="workTypeList"
    >
    </prop-helptype>
    <div class="toast-mask add_suc" v-if="addSucAlert">
      <div class="add_suc_con">
        <div class="sina_radius_bg">
          <div class="add_suc_cont">
            <div class="add_suc_name">
              {{ userInfo.userName }}
              <span class="icon" v-if="relation == 51">配偶</span>
              <span class="icon" v-if="relation == 53">父母</span>
              <span class="icon" v-if="relation == 52">子女</span>
            </div>
            <div class="add_suc_txt">已加入成功</div>
            <div
              class="check_box bg"
              :class="{ checked: sendchecked }"
              @click.stop="sendchecked = !sendchecked"
            >
              发微博邀请更多好友共享互助
            </div>
          </div>
          <div class="add_bot_btns">
            <div
              class="add_bot_btn sina_btn radius default"
              @click="jumpUrl('plan')"
            >
              返回个人中心
            </div>
            <div
              class="add_bot_btn sina_btn radius primary"
              @click="jumpUrl('adduser')"
            >
              继续添加家人
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "../utils/apiConfig";
import { checkPhone, isChn, isIdNumber } from "../assets/js/common";
import propHelptype from "../components/propHelptype";
import clauseAlert from "./clause/clauseAlert";
import myAd from "../components/sinaAd";
import xtjToast from "../components/xtjToast/xtjToast";
export default {
  name: "planAddUser",
  components: {
    propHelptype,
    clauseAlert,
    myAd,
    xtjToast,
  },
  data() {
    return {
      addUserShow: false,
      relation: 52, // 51：配偶  52：子女 53：父母
      relationLimit: {
        spouseShow: false,
        parentShow: false,
      },
      spouseSex: "1", // 1-男 0女
      userInfo: {
        userName: "",
        idNo: "",
        helpType: "1",
      },
      workTypeShow: false,
      workTypeIndex: 0,
      workTypeList: [
        { name: "普通会员", desc: "" },
        { name: "医护会员", desc: "" },
      ],
      isChecked: true,
      isCheckedFY: true,
      alertShow: false,
      alertIndex: 0,
      sendchecked: true, // 发微博复选框
      addSucAlert: false,
      typePage: "addFamilySuc",
      advertShow: false, // 保险广告显示与否
    };
  },
  watch: {
    relation(val) {
      if (val == "53") {
        this.isChecked = false;
      } else {
        this.isChecked = true;
      }
    },
  },

  computed: {},
  mounted() {
    this.getPlanStatus();
  },
  methods: {
    getPlanStatus() {
      this.$get(Api.getMyPolicy, {}).then((ret) => {
        if (ret.code === 0) {
          if (
            ret.data.plan_list_state &&
            ret.data.plan_list_state["XL001"] != "activated" &&
            ret.data.plan_list_state["XL002"] != "activated" &&
            ret.data.plan_list_state["XL003"] != "activated"
          ) {
            this.$router.replace("/weibo/insure-plan");
          } else {
            this.getLimit();
            this.actionCount("pv");
          }
        } else {
          this.getLimit();
          this.actionCount("pv");
        }
      });
    },
    getLimit() {
      this.advertShow = true;
      this.$get(Api.getRelationLimit, {}).then((ret) => {
        if (ret.code == 0) {
          let res = ret.data;
          if (res["spouse_count"] > 0) {
            this.relationLimit.spouseShow = false;
          } else {
            this.relation = 51;
            this.relationLimit.spouseShow = true;
            if (res["self_sex"] == "f") {
              this.spouseSex = "1";
            } else {
              this.spouseSex = "0";
            }
          }
          if (
            (res["spouse_count"] > 0 && res["parent_count"] < 4) ||
            (res["spouse_count"] == 0 && res["parent_count"] < 2)
          ) {
            this.relationLimit.parentShow = true;
            if (!this.relationLimit.spouseShow) {
              this.relation = 53;
            }
          } else {
            this.relationLimit.parentShow = false;
          }
        } else {
          this.$toast(ret.msg || "请求失败，请刷新重试");
        }
      });
    },
    addUserEvent() {
      if (!this.userInfo.userName) {
        this.$toast("请填写真实姓名");
        return false;
      }
      if (!isChn(this.userInfo.userName.replace(/\s/g, ""))) {
        this.$toast("只支持中文姓名");
        return false;
      }
      if (this.userInfo.userName.length < 2) {
        this.$toast("姓名不得少于两个字符");
        return false;
      }
      if (!this.userInfo.idNo) {
        this.$toast("请输入身份证号码");
        return false;
      }
      if (!isIdNumber(this.userInfo.idNo.replace(/\s/g, ""))) {
        this.$toast("请输入正确的身份证号码");
        return false;
      }
      if (!this.isChecked && !this.isCheckedFY) {
        this.$toast("请勾选至少一种互助计划");
        return false;
      }
      let code = "";
      if (this.isChecked && this.isCheckedFY) {
        code = "XL001,XL003";
      } else if (this.isChecked) {
        code = "XL001";
      } else if (this.isCheckedFY) {
        code = "XL003";
      }
      // this.actionCount('click');
      this.$post(Api.addPolicy, {
        user_name: this.userInfo.userName.replace(/\s/g, ""),
        certi_no: this.userInfo.idNo.replace(/\s/g, ""),
        help_type: this.userInfo.helpType,
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
                  this.$router.push("/weibo/insure-paysuc");
                }
              } else {
                this.$toast(ret.msg || "请求失败，请刷新重试");
              }
            });
          } else {
            this.createTicket();
            this.addSucAlert = true;
          }
        } else {
          this.$toast(ret.msg || "请求失败，请刷新重试");
        }
      });
    },
    createTicket() {
      let channel = this.$route.query.channel;
      if (channel && (channel == "50002" || channel == "50004")) {
        this.$post(Api.createTicket, {
          sign: "340961d0ee6a76bf1ece4b46f3ff4324",
        });
      }
    },
    alertHelpType() {
      this.$sinaAlert({
        title: "受助类型说明", //提醒文字
        onlyHasTitle: false,
        desc: `<p class="help_type"><span class="help_type_name">给付型</span><span class="help_type_desc flex1">一次性定额赔付</span></p>
                <p>确诊且通过审核，一次性领取全额互助金，最高不超过章程中规定最高互助额度。</p>
                <p class="help_type"><span class="help_type_name">报销型</span><span class="help_type_desc flex1">提供医疗凭证实报实销</span></p>
                <p>确诊且通过审核，医疗花费实报实销，可多次申领，最高不超过章程所规定最高互助额度。</p>
                <p>每期分摊金额较低，同等条件下报销型为给付型的1/2。</p>
                <p class="help_type_info">*受助类型确认之后不可更改</p> `, //
        showClose: true, // 关闭按钮
      });
    },
    confirmProp(index) {
      this.workTypeIndex = index;
      this.workTypeShow = false;
    },
    showAlert(idx) {
      this.alertIndex = idx;
      this.alertShow = true;
    },
    jumpUrl(type) {
      this.addSucAlert = false;
      this.sendSinaEvent();
      if (type == "adduser") {
        this.userInfo = {
          userName: "",
          idNo: "",
          helpType: "1",
        };
        this.getLimit();
      } else {
        this.$router.push("/weibo/insure-plan");
      }
    },
    sendSinaEvent() {
      if (this.sendchecked) {
        this.$post(Api.sendJoinNotice, { plan_code: "XL003" });
        this.actionCount("send_click");
      }
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
  background: #fff;
  .sina_hasbg {
    .plan_info {
      width: 100%;
      border-bottom: 20px solid $col_bg;
    }

    .title_cont {
      background: #fff;
      padding: 30px 0;
      border-bottom: 1px solid #e6e6e6;
      &.myAd {
        margin: 50px 0 30px;
      }
      .desc {
        float: right;
        font-size: 28px;
        padding-right: 30px;
        font-weight: normal;
      }
    }

    .sina_cont {
      background: #fff;
      &.myAd {
        padding: 0 18px;
      }
    }

    .who_cell {
      padding: 40px 0 52px;
      @include fj();

      .who_btn {
        @include flex(1);
        margin: 0 40px;
        padding-top: 166px;
        text-align: center;
        position: relative;

        .who_icon {
          width: 146px;
          height: 146px;
          background-size: cover;
          border-radius: 50%;
          border: 1px solid #e6e6e6;
          @include cl;
          top: 0;

          &.husband {
            @include bg-image("iconRelation1");
          }

          &.wife {
            @include bg-image("iconRelation2");
          }
          &.spouse {
            @include bg-image("addIconRelation1");
          }
          &.parents {
            @include bg-image("addIconRelation3");
          }

          &.children {
            @include bg-image("addIconRelation2");
          }
        }

        .checkbox {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          @include cl;
          top: 126px;
          @include bg-image("sinaIconChecked3");
          background-size: 40px 40px;
        }

        &.active {
          color: $primary;
          .who_icon {
            border-color: #4ace98;
          }
          .checkbox {
            @include bg-image("sinaPaySuc");
          }
        }
      }
    }

    .hasarrow {
      padding-right: 48px;

      &.right::after {
        right: 6px;
      }

      .type_name {
        text-align: right;
        color: #333;

        .desc {
          color: $grey;
          margin-left: 16px;
        }
      }
    }

    .help_info {
      text-align: right;
      margin: 20px 0px 52px 0;
      padding-right: 40px;
      color: $grey;
      line-height: 30px;
      @include bg-image("sinaIconInfo");
      background-size: 30px 30px;
      background-position: right center;
      vertical-align: middle;
    }
    .join_btn {
      padding: 66px 12px 64px;
    }
  }
  .join_intro {
    margin-top: 20px;
    .join_desc {
      margin-top: 30px;
      &.hasradius_bg {
        background: rgba(255, 255, 255, 1);
        border-radius: 20px;
        border: 1px solid #d0d0d0;
        padding: 18px 113px;
        text-align: center;
        &:first-child {
          border-color: rgba(255, 130, 0, 1);
        }
        .plan_title {
          font-size: 34px;
          color: #333;
        }
        .plan_desc {
          padding: 6px 0 18px;
          color: #939393;
        }
      }
      .checkbox {
        left: 34px;
        top: 50%;
        transform: translateY(-50%);
        .checked {
          width: 18px;
          height: 18px;
          @include center;
          background-size: 18px 18px;
          background-image: url("/static/images/sinaIconChecked1_2x.png");
        }
      }
    }
  }
  .add_suc {
    .add_suc_con {
      @include center;
      width: 100%;
      .add_suc_cont {
        @include bg-image("addUserSucIcon");
        background-position: top right;
        background-size: 130px 130px;
        .add_suc_name {
          font-size: 30px;
          .icon {
            width: 88px;
            height: 28px;
            line-height: 28px;
            font-size: 20px;
            color: #fff;
            text-align: center;
            margin-left: 20px;
            background: rgba(255, 130, 0, 1);
            border-radius: 14px;
            display: inline-block;
          }
        }
        .add_suc_txt {
          font-size: 38px;
          color: $primary;
          padding-top: 18px;
          padding-bottom: 20px;
        }
        .check_box {
          padding-left: 46px;
          color: #507daf;
          &::before {
            left: 0;
            margin: 0;
          }
          &.checked::before {
            @include bg-image("sinaIconChecked2");
          }
        }
      }
      .add_bot_btns {
        display: flex;
        padding: 40px 0 10px;
        .add_bot_btn {
          flex: 1;
          margin-left: 40px;
          &:first-child {
            margin: 0;
          }
        }
      }
    }
  }
}
</style>
