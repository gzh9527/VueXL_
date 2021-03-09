<template>
  <div class="sina_page">
    <div class="join_intro">
      <transition name="fade">
        <img :src="adImg.img_url" v-if="adImg" />
      </transition>
      <div class="sina_hasbg write_bg">
        <!--        <div class="sroll_cells">-->
        <!--          <transition name="translate-bottom">-->
        <!--            <div class="sroll_cell" v-if="lastJoinList[lastJoinIndex]">刚刚  {{lastJoinList[lastJoinIndex].name}} {{lastJoinList[lastJoinIndex].id_no}} 完成认证</div>-->
        <!--          </transition>-->
        <!--        </div>-->
        <div class="sina_radius_bg join_form">
          <div class="add_form">
            <div class="add_title">请填写您的信息</div>
            <div class="input_cells">
              <div class="sina_input_normal radius">
                <span class="label">真实姓名:</span>
                <input
                  autocomplete="off"
                  v-model.trim="userInfo.userName"
                  maxlength="10"
                  type="text"
                  class="input_css"
                  placeholder="请输入真实姓名"
                  value=""
                />
              </div>
              <div class="sina_input_normal radius">
                <span class="label">身份证号:</span>
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
            </div>
            <div class="join_desc">
              <i
                class="checkbox"
                @click.stop="alertChecked = !alertChecked"
                :class="{ checked: alertChecked }"
              >
              </i>
              我已阅读并同意
              <a href="javascript:;" @click="showAlert(1)" class="col_a"
                >《会员公约》</a
              >
              <a href="javascript:;" @click="showAlert(3)" class="col_a"
                >《授权代扣委托书》</a
              >
              <a href="javascript:;" @click="showAlert(0)" class="col_a"
                >《健康告知》</a
              >
              <a href="javascript:;" @click="showAlert(2)" class="col_a"
                >《计划章程》</a
              >
              <a href="javascript:;" @click="showAlert(7)" class="col_a"
                >《会员隐私政策》</a
              >
            </div>
            <div
              class="check_box primary bg3"
              :class="{ checked: isChecked }"
              @click="isChecked = !isChecked"
            >
              发微博邀请更多好友共享互助
            </div>
          </div>
        </div>
        <img
          class="intro_img"
          src="http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/DBWriteIntro.png"
        />
      </div>
    </div>
    <div class="sina_img_cells">
      <template v-for="(item, index) in imgsList">
        <div class="sina_img_cell" :key="'img' + index">
          <img v-lazy="item.url" :src="item.url" />
        </div>
      </template>
    </div>
    <div class="sina_page_bot">
      <div class="bot_desc" v-if="channelFlag == 1">
        <!-- 新增新浪微博抽奖对应活动 2021/1/12 -->
        {{(channel == '30002'||channel == '40005')?'预存1元并开通免密支付 返3元互助金':'预存3元并开通免密支付 返3元互助金'}}
        <!-- 限时0.01元并开通免密支付 返3元红包 -->
      </div>
      <div class="bot_desc" v-else>预存0.01元并开通免密支付 返2088积分</div>
      <div class="bot_btns">
        <div class="bot_btn">
          <!-- <span class="firstLine">预存 <i>{{amount}}</i> 元加入</span> -->
          <span class="firstLine"
            >预存 <i>{{ amount }}</i> 元加入</span
          >
          <span class="twoLine">预估首期分摊{{ lastUnitAmount }}元</span>
        </div>
        <div class="bot_btn primary flex1" @click="addJoin()">立即加入</div>
      </div>
    </div>
    <clause-alert
      v-if="alertShow"
      :alertShow="alertShow"
      :alertIndex="alertIndex"
      @closeClauseAlert="alertShow = false"
    ></clause-alert>
    <div class="toast-mask" v-if="authAlertShow">
      <div class="img_bg">
        <img src="../pages/images/sinaJoinAlertImg_2x.png" />
        <div class="closebtn" @click="noAuthEvent"></div>
        <button class="sina_btn primary radius auth_btn" @click="authEvent()">
          一键加入
        </button>
        <button class="noauth_btn" @click="noAuthEvent()">手动填写</button>
      </div>
    </div>
  </div>
</template>

<script>
import { checkPhone, isChn, isIdNumber } from "../assets/js/common";
import Api from "../utils/apiConfig";
import clauseAlert from "./clause/clauseAlert";
import myAd from "../components/sinaAd";

export default {
  name: "join",
  components: {
    clauseAlert,
    myAd,
  },
  data() {
    return {
      userInfo: {
        userName: "",
        idNo: "",
        mobile: "",
        helpType: "1",
      },
      planCode: "XL001",
      alertShow: false,
      alertIndex: 0,
      alertChecked: true,
      isChecked: true,
      adImg: null,
      authAlertShow: false, //新浪认证弹窗
      channelType: null, //渠道类型
      lastUnitAmount: "0.00", //上次分摊金额
      lastJoinList: [], // 最新加入人
      lastJoinIndex: 0,
      lastJoinTimer: null,
      channel: 10000,
      channelFlag: 1,
      imgsList: [
        {
          url:
            "http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/DBintroImg10_2x.png?v=1",
        },
        {
          url:
            "https://imgs.bihubao.com/Public/images/insureAdView/images/DBintroImg4_2x.png",
        },
        {
          url:
            "https://imgs.bihubao.com/Public/images/insureAdView/images/DBintroImg3_2x.png",
        },
      ],
      userPhone: null,
      amount: 3,
    };
  },
  created() {
    this.getPlanState("XL001", "join");
    if (this.$route.query.channel) {
      this.channel = this.$route.query.channel;
      localStorage.setItem("channel", this.channel);
    } else if (
      localStorage.getItem("channel") != "undefined" &&
      localStorage.getItem("channel") != "null"
    ) {
      this.channel = localStorage.getItem("channel");
      localStorage.setItem("channel", this.channel);
    }
    //
    if (this.channel == "30002") {
      this.channelFlag = 1;
      this.amount = 1;
    } else if (this.channel == "40005") {
      this.channelFlag = 1;
      this.amount = 1;
    } else {
      //区分 积分 或者 红包
      this.$get(Api.checkRedPacketChannel, {
        channel: this.channel,
        isNotshowLoad: "noshow",
      }).then((ret) => {
        if (ret.code == 0) {
          let typeList = ret.data.type_list;
          if (typeList.length > 0 && typeList.indexOf("give_score") > -1) {
            //积分
            this.channelFlag = 2;
            this.amount = 0.01;
          } else {
            //红包
            this.channelFlag = 1;
            this.amount = 3;
            // this.amount = 0.01;
          }
        }
      });
    }
  },
  methods: {
    pageLoad() {
      this.actionCount("pv");
      this.checkChannel();
      let hasChecked = this.$route.query.hasChecked;
      if (hasChecked == 1) {
        //关注新浪互助
        this.$post(Api.subscribe);
      }
      this.userPhone =
        this.$route.query.phone || localStorage.getItem("_userPhone");
      this.userInfo.userName = this.$route.query.name || "";
      if (!sessionStorage.getItem("myPlanInfo")) {
        this.getPlanList();
      } else {
        let myPlanInfo = JSON.parse(sessionStorage.getItem("myPlanInfo"));
        let item = myPlanInfo.dataList[0].insured;
        this.userInfo = {
          userName: item.name,
          idNo: item.idno_init,
          mobile: this.userPhone || item.mobile,
          helpType: "1",
        };
        this.authAlertShow = false;
      }
      this.saveUserPhone();
      this.getLastUnitAmount();
      // this.getLastJoinList();
    },
    //渠道号判断
    checkChannel() {
      //  2020/8/20 所有渠道都送红包
      this.$post(Api.joinTicket, {
        sign: "898c4f832a7337c11dfcd8223afcf07c",
      });
    },
    getPlanList() {
      this.$get(Api.getPolicyList, {}).then((res) => {
        if (res.code == 0) {
          if (res.data.policy_list.length > 0) {
            let item = res.data.policy_list[0].insured;
            this.userInfo = {
              userName: item.name,
              idNo: item.idno_init,
              mobile: this.userPhone || item.mobile,
              helpType: "1",
            };
          } else {
            this.checkSinaAuth();
          }
        } else {
          this.$toast(res.msg || "请求超时，请刷新重试");
        }
      });
    },
    //保存手机号码
    saveUserPhone() {
      this.userInfo.mobile = this.userPhone;
      if (this.userPhone) {
        this.$post(Api.saveUserPhone, { mobile: this.userPhone });
      } else {
        this.$get(Api.getPhone).then((ret) => {
          if (ret.code == 0) {
            this.userInfo.mobile = ret.data;
          }
        });
      }
    },
    //获取上次分摊金额
    getLastUnitAmount() {
      this.$get(Api.getLastUnitAmount, { plan_code: "XL001" }).then((ret) => {
        if (ret.code == 0) {
          this.lastUnitAmount = ret.data;
        }
      });
    },
    //获取最新加入人数
    getLastJoinList() {
      this.$get(Api.getLastJoinList).then((ret) => {
        if (ret.code == 0) {
          this.lastJoinList = ret.data.last_join_list;
          this.txtSrollUp();
        }
      });
    },
    txtSrollUp() {
      clearTimeout(this.lastJoinTimer);
      this.lastJoinTimer = null;
      this.lastJoinTimer = setTimeout(() => {
        if (this.lastJoinIndex == 7) {
          this.lastJoinIndex = 0;
        } else {
          this.lastJoinIndex++;
        }
        this.txtSrollUp();
      }, 1500);
    },
    // 新浪实名认证
    checkSinaAuth() {
      if (this.$route.query.msg || this.$route.query.button) {
        this.noAuthEvent();
        // 获取微博认证信息
        this.getSinaUserInfo();
      } else {
        if (sessionStorage.getItem("_authAlert")) {
          this.authAlertShow = false;
        } else {
          this.authAlertShow = false;
        }
      }
    },
    showAlert(idx) {
      this.alertIndex = idx;
      this.alertShow = true;
    },
    cancelJoin() {
      this.$router.push("/weibo/insure-join");
    },
    addJoin() {
      if (!this.userInfo.userName) {
        this.$toast("请填写本人真实姓名");
        return false;
      }
      if (!isChn(this.userInfo.userName.replace(/\s/g, ""))) {
        this.$toast("只支持中文姓名");
        return false;
      }
      if (this.userInfo.userName.length < 2) {
        this.$toast("本人姓名不得少于两个字符");
        return false;
      }
      if (!this.userInfo.mobile) {
        this.$toast("请输入手机号");
        return false;
      }
      if (!checkPhone(this.userInfo.mobile.replace(/\s/g, ""))) {
        this.$toast("手机号格式不正确");
        return false;
      }
      if (!this.userInfo.idNo) {
        this.$toast("请输入本人身份证号码");
        return false;
      }
      if (!isIdNumber(this.userInfo.idNo.replace(/\s/g, ""))) {
        this.$toast("请输入本人正确的身份证号码");
        return false;
      }
      if (!this.alertChecked) {
        this.$toast("请勾选我已阅读并同意");
        return false;
      }
      //只添加本人
      this.userInfo.helpType = this.helpTypeIndex * 1 + 1;
      this.actionCount("click");
      let channel = this.channel;
      let params = {
        user_name: this.userInfo.userName.replace(/\s/g, ""),
        certi_no: this.userInfo.idNo.replace(/\s/g, ""),
        mobile: this.userInfo.mobile.replace(/\s/g, ""),
        help_type: 1,
        certi_type: "00", //证件类型
        relation: "00", //关系
        plan_code: this.planCode,
        work_type: this.workTypeIndex * 1 + 1,
        channel: channel,
        amount: this.amount,
      };
      if (this.planCode == "XL001") {
        delete params.work_type;
      }
      this.$post(Api.addPolicy, params).then((ret) => {
        if (ret.code === 0) {
          if (this.isChecked) {
            localStorage.setItem("_sendNotice", "join");
          } else {
            localStorage.removeItem("_sendNotice");
          }
          localStorage.removeItem("_userPhone");
          sessionStorage.removeItem("myPlanInfo");
          let shareInfo = localStorage.getItem("_ValentQuery")
            ? JSON.parse(localStorage.getItem("_ValentQuery"))
            : null;
          if (shareInfo && shareInfo.uid) {
            this.$post(Api.createRecomRelation, {
              recommend_id: shareInfo.messId || "1",
              share_uid: shareInfo.uid,
            }).then(() => {
              this.checkStart = ret.data.state;
              this.checkJoin(ret.data.state);
            });
          } else {
            this.checkStart = ret.data.state;
            this.checkJoin(ret.data.state);
          }
        } else {
          this.$toast(ret.msg || "请求失败，请刷新重试");
        }
      });
    },
    //判断激活状态
    checkJoin(state) {
      if (state == 0) {
        this.bindWallet();
      } else {
        if (this.planCode == "XL001") {
          this.$router.replace("/weibo/insure-paysuc");
        } else {
          this.$router.push("/weibo/feiyan-paysuc");
        }
      }
    },
    bindWallet() {
      this.$post(Api.bindWallet, { plan_code: this.planCode }).then((ret) => {
        if (ret.code == 0) {
          if (ret.data.state && ret.data.state == "not_bind") {
            window.location.href = ret.data.url;
            setTimeout(() => {
              //跳转到 支付空白页 支付3元
              this.$router.replace("/weibo/note-redpacket");
            }, 500);
          } else {
            if (this.planCode == "XL001") {
              this.$router.replace("/weibo/insure-paysuc");
            } else {
              this.$router.replace("/weibo/feiyan-paysuc");
            }
          }
        } else {
          this.$toast(ret.msg || "请求失败，请刷新重试");
        }
      });
    },

    authEvent() {
      this.actionCount("sinaAd_click");
      let { hostname, origin } = window.location;
      let returnUrl =
        hostname == "localhost"
          ? "http://sinatest.bihubao.com/weibo/insure-write"
          : origin + this.$route.path;
      this.$get(
        "https://saas.bihubao.com/contract/misc/getWeiboAuth",
        {
          redirect_url: returnUrl,
        },
        true
      ).then((ret) => {
        window.location.href = ret.url;
      });
    },
    noAuthEvent() {
      this.authAlertShow = false;
      sessionStorage.setItem("_authAlert", "hidden");
    },
    getSinaUserInfo() {
      let uid = sessionStorage.getItem("weiboInfo")
        ? JSON.parse(sessionStorage.getItem("weiboInfo"))["uid"]
        : "";
      this.$jsonp(
        "https://finance.sc.weibo.com/api/authority/request?Appkey=3040890735&uid=" +
          uid
      ).then((ret) => {
        if (ret.code == 100000) {
          let param = new FormData();
          param.append("Appkey", "3040890735");
          param.append("uid", uid);
          param.append("verify", ret.data.verify);
          this.$post(
            "https://saas.bihubao.com/contract/misc/weiboAuthInfo",
            param,
            true,
            true
          ).then((ret) => {
            if (ret.code == 100000) {
              let userMsg = ret.data.userinfo;
              if (userMsg.name.code == 100000) {
                this.userInfo.userName = ret.data.userinfo.name.msg || "";
              }
              if (userMsg.idnum.code == 100000) {
                this.userInfo.idNo = ret.data.userinfo.idnum.msg || "";
                this.actionCount("sinaAuth_idNo");
              }
              if (userMsg.mobile.code == 100000) {
                this.userInfo.mobile = ret.data.userinfo.mobile.msg || "";
              }
            }
          });
        }
      });
    },
  },
  destroyed() {
    clearTimeout(this.lastJoinTimer);
    this.lastJoinTimer = null;
  },
};
</script>

<style lang="scss" scoped>
@import "../pages/css/mixin";

.sina_page {
  position: relative;
  padding-bottom: 174px;

  .join_intro {
    background: #fff;

    .sina_hasbg {
      background-repeat: no-repeat;
      background-size: 100% auto;
      position: relative;
      padding: 244px 40px 0px;

      .sroll_cells {
        text-align: center;
        height: 36px;
        line-height: 36px;
        overflow: hidden;
        margin-bottom: 30px;
        color: #fff;
      }

      .sina_radius_bg {
        margin: 0;
        padding: 30px 0 40px 40px;

        &.join_form {
          background: linear-gradient(
            360deg,
            rgba(165, 220, 255, 1),
            rgba(255, 221, 132, 1)
          );
          padding: 6px;

          .add_form {
            background: #fff;
            padding: 40px 30px;
            border-radius: 20px;
          }

          .join_desc {
            width: auto;
            margin: 46px 30px 0 30px;
          }
        }
      }

      .intro_img {
        margin-top: 44px;
      }
    }
  }

  .sina_img_cells {
    .sina_img_cell {
      margin-top: 20px;
      background: #fff;

      &.txt_infos {
        margin-top: 30px;
        padding: 0 20px 43px;

        .txt_title {
          padding: 40px 0 18px;
          text-align: center;
          font-size: 32px;
        }

        .txt_desc {
          background: rgba(245, 245, 249, 1);
          border-radius: 20px;
          padding: 20px 40px;
          font-size: 26px;
          line-height: 40px;
        }
      }
    }
  }

  .check_box {
    margin: 16px 30px 6px;
    color: $col_a;
  }

  .add_form {
    padding: 20px 0px 20px 30px;

    .add_title {
      text-align: center;
      font-size: 40px;
      padding-bottom: 24px;
    }
  }

  .myAd {
    padding: 28px 18px 0;
  }

  .sina_page_bot {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;

    .bot_desc {
      background: rgba(255, 248, 237, 1);
      height: 54px;
      line-height: 54px;
      text-align: center;
      color: $primary;
      font-size: 26px;
    }

    .bot_btns {
      width: 100%;
      border-top: 1px solid #e6e6e6;
      background: #fff;
      @include fj();

      .bot_btn {
        width: 350px;
        height: 120px;
        padding: 10px 0;
        font-size: 24px;
        text-align: center;
        color: #939393;
        background: #fff;

        .firstLine {
          line-height: 50px;
          color: #333;
          display: block;

          i {
            font-style: normal;
            font-size: 40px;
            color: $primary;
          }
        }

        &.primary {
          background: $primary;
          color: #fff;
          line-height: 100px;
          font-size: 40px;
        }
      }
    }
  }

  .hasarrow {
    padding-right: 78px;

    &.right::after {
      right: 36px;
    }

    .type_name {
      text-align: right;
      color: #333;
    }
  }
}

.toast-mask {
  .img_bg {
    width: 570px;
    @include center;
  }

  .auth_btn {
    width: 448px;
    height: 100px;
    line-height: 100px;
    border-radius: 51px;
    font-size: 40px;
    border: 0;
    @include cl;
    bottom: 118px;
  }

  .noauth_btn {
    width: 100%;
    height: 100px;
    line-height: 100px;
    position: absolute;
    left: 0;
    bottom: 0;
    background: transparent;
    color: #939393;
    font-size: 28px;
    border: 0;
  }

  .closebtn {
    width: 64px;
    height: 64px;
    position: absolute;
    top: -88px;
    right: 0;
    @include page-bg-image("sinaDialogClose");
    background-size: cover;
    background-position: center 0;
  }
}
</style>
