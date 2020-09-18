<template>
  <div class="sina_page">
    <div class="join_intro">
      <!-- 背景切换 swiper-->
      <div class="swiper-container" ref="swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="@/assets/images/image_banner1.png" alt />
          </div>
          <div class="swiper-slide">
            <img src="@/assets/images/image_banner2.png" alt />
          </div>
        </div>
        <div class="swiper-pagination" id="parent" ref="pagination"></div>
      </div>
      <!-- 页面导入图片布局 -->
      <div class="imgTips" :style="switchImage?'margin-top:77%;':'margin-top:90%;'">
        <img src="@/assets/images/renzheng.png" alt />
        <img src="@/assets/images/details.png" alt />
        <img src="@/assets/images/anli.png" alt />
        <div class="sina_img_cell hasiconBg qa">
          <div class="ketang">
            <img src="@/assets/images/xiaoketang.png" alt />
          </div>
          <div class="QA-cells">
            <template v-for="(item,idx) in introQAlist">
              <div class="QA-cell" :key="idx">
                <div
                  class="qa-title cell-arrow"
                  :ref="'qaTitle'+idx"
                  :class="{open:item.isShowAn, hot:item.isHot}"
                  @click="showIntoAn(idx)"
                >{{item.question}}</div>
                <div class="qa-con" v-if="item.isShowAn" v-html="item.answer"></div>
              </div>
            </template>
          </div>
        </div>
      </div>
      <!-- 文本输入 -->
      <div class="sina_radius_bg join_form">
        <div class="add_form">
          <div class="switch">
            <img :src="switchImage?imgCont[3]:imgCont[0]" @click="switchImg(1)" alt />
            <img :src="switchImage?imgCont[1]:imgCont[2]" @click="switchImg(2)" alt />
          </div>
          <div class="add_title">{{switchImage?'本人信息':'家人信息 (选填)'}}</div>
          <!-- 本人信息输入 -->
          <div class="input_cells" v-show="switchImage">
            <div
              class="sina_input_normal radius"
              style="background:#F5F5F9;border:none;color:#333;font-weight: 500;"
            >
              <span class="label" style="font-weight:500;">真实姓名:</span>
              <input
                autocomplete="off"
                v-model.trim="userInfo.userName"
                maxlength="10"
                type="text"
                class="input_css"
                placeholder="请输入真实姓名"
                value
                style="background:#F5F5F9;color:#000;font-weight: 500;"
              />
            </div>
            <div
              class="sina_input_normal radius"
              style="background:#F5F5F9;border:none;color:#333;font-weight: 500;"
            >
              <span class="label" style="font-weight:500;">身份证号:</span>
              <input
                type="text"
                autocomplete="off"
                maxlength="18"
                v-model.trim="userInfo.idNo"
                class="input_css"
                placeholder="申请互助金唯一凭证 严格保密"
                value
                style="background:#F5F5F9;color:#000;font-weight: 500;"
              />
            </div>
            <div
              class="sina_input_normal radius"
              style="background:#F5F5F9;border:none;color:#333;font-weight: 500;"
            >
              <span class="label" style="font-weight:500;">手机号:</span>
              <input
                type="number"
                pattern="[0-9]*"
                autocomplete="off"
                maxlength="11"
                v-model.trim="userInfo.mobile"
                class="input_css"
                placeholder="用于分摊公示提醒"
                value
                style="background:#F5F5F9;color:#000;font-weight: 500;"
              />
            </div>
          </div>
          <!-- 家人信息输入 -->
          <div class="input_cells" id="familyBox" v-show="!switchImage">
            <div class="switch_btn">
              <p>选择关系：</p>
              <div class="switch_box">
                <span
                  v-for="(item,index) in switchArray"
                  :key="index"
                  v-bind:class="isActived==index?'actived':''"
                  @click="switchClick(index)"
                >{{item}}</span>
              </div>
            </div>
            <div
              class="sina_input_normal radius"
              style="background:#F5F5F9;border:none;color:#333;font-weight: 500;"
            >
              <span class="label" style="font-weight:500;">真实姓名:</span>
              <input
                autocomplete="off"
                v-model.trim="userInfo.familyName"
                maxlength="10"
                type="text"
                class="input_css"
                placeholder="请输入家人真实姓名"
                value
                style="background:#F5F5F9;color:#000;font-weight: 500;"
              />
            </div>
            <div
              class="sina_input_normal radius"
              style="background:#F5F5F9;border:none;color:#333;font-weight: 500;"
            >
              <span class="label" style="font-weight:500;">身份证号:</span>
              <input
                type="text"
                pattern="[0-9]*"
                autocomplete="off"
                maxlength="18"
                v-model.trim="userInfo.idCard"
                class="input_css"
                placeholder="申请互助金唯一凭证 严格保密"
                value
                style="background:#F5F5F9;color:#000;font-weight: 500;"
              />
            </div>
            <p>加入成功后可在个人中心添加更多家人</p>
          </div>
          <div class="join_desc" style="margin-top:30px;">
            <i
              class="checkbox"
              @click.stop="alertChecked=!alertChecked"
              :class="{checked:alertChecked}"
            ></i>
            <b>我已阅读并同意</b>
            <a href="javascript:;" @click="showAlert(3)" class="col_a">《授权代扣委托书》</a>
            <a href="javascript:;" @click="showAlert(7)" class="col_a">《会员隐私政策》</a>
            <a href="javascript:;" @click="showAlert(0)" class="col_a">《健康告知》</a>
            <a href="javascript:;" @click="showAlert(1)" class="col_a">《会员公约》</a>
            <a href="javascript:;" @click="showAlert(2)" class="col_a">《计划章程》</a>
          </div>
          <div
            class="check_box primary bg3"
            :class="{checked:isChecked}"
            @click="isChecked=!isChecked"
          >发微博邀请更多好友共享互助</div>
        </div>
      </div>
    </div>
    <div class="sina_page_bot" @click="addJoin()" v-if="ishasbot">
      <div class="bot_btns">
        <div class="bot_desc">
          <img src="@/assets/images/hb.png" alt /> 开通免密支付即送3元红包
        </div>
        <div class="btn">3元开通</div>
      </div>
    </div>
    <clause-alert
      v-if="alertShow"
      :alertShow="alertShow"
      :alertIndex="alertIndex"
      @closeClauseAlert="alertShow=false"
    ></clause-alert>
    <!-- <div class="toast-mask" v-if="authAlertShow">
      <div class="img_bg">
        <img src="../pages/images/sinaJoinAlertImg_2x.png" />
        <div class="closebtn" @click="noAuthEvent"></div>
        <button class="sina_btn primary radius auth_btn" @click="authEvent()">一键加入</button>
        <button class="noauth_btn" @click="noAuthEvent()">手动填写</button>
      </div>
    </div>-->
  </div>
</template>

<script>
import { checkPhone, isChn, isIdNumber } from "../assets/js/common";
import Api from "../utils/apiConfig";
import clauseAlert from "./clause/clauseAlert";
import myAd from "../components/sinaAd";
import img1 from "@/assets/images/jiaren2.png";
import img2 from "@/assets/images/jiaren1.png";
import img3 from "@/assets/images/actived1.png";
import img4 from "@/assets/images/actived2.png";

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
        familyName: "",
        idCard: "",
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
      introQAlist: [
        {
          isShowAn: false,
          isHot: true,
          question: "新浪互助是保险吗？",
          answer: `<p>新浪互助不是保险，而是会员之间互帮互助的互益组织，加入互助社群后，当互助事件发生时，其他会员向符合互助条件的会员进项单项赠与，会员分摊金额不是保险费，不能预期获得确定的风险保障回报。</p>`,
        },
        {
          isShowAn: false,
          isHot: true,
          question: "加入新浪互助有没有年龄限制？",
          answer: `<p>重疾计划加入年龄是出生30天(含)至59周岁(含) 意外医疗加入计划的年龄是18周岁(含)至65周岁(含)</p>`,
        },
        {
          isShowAn: false,
          isHot: false,
          question: "加新浪互助最高的互助额度是多少?",
          answer: `<p>重大疾病： 30天-35周岁30万，36周岁-50周岁15万，51-55周岁7.5万，56-60周岁5万 意外医疗：18-65周岁5万/年，累计15万。</p>`,
        },
      ],
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
      familyBox: false,
      switchArray: ["父母", "配偶", "子女"],
      isActived: 0,
      isflage: true,
      workTypeIndex: 0,
      mountedFlag: false,
      checkStart: "",
      switchImage: true,
      imgCont: [img1, img2, img3, img4],
      fontSize: "16",
      ishasbot: false,
      isFixed: false,
    };
  },
  created() {
    this.getPlanState("XL001", "join");
    let clientWidth = document.documentElement.clientWidth;
    if (!clientWidth) return;
    if (clientWidth > 1366) {
      clientWidth = 1366;
    }
    this.fontSize = ((clientWidth * 2) / 750) * 16;
    document.addEventListener("scroll", this.getScroll);
  },
  mounted() {
    //swiper
    let mySwiper = new Swiper(this.$refs.swiper, {
      autoplay: 3000, //可选选项，自动滑动
      effect: "fade",
      fade: {
        crossFade: true,
      },
      pagination: this.$refs.pagination,
    });
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
      if (this.userInfo.familyName || this.userInfo.idCard) {
        //添加家人信息
        if (!this.userInfo.familyName) {
          this.$toast("请填写家人真实姓名");
          return false;
        }
        if (!isChn(this.userInfo.familyName.replace(/\s/g, ""))) {
          this.$toast("只支持中文姓名");
          return false;
        }
        if (this.userInfo.familyName.length < 2) {
          this.$toast("家人姓名不得少于两个字符");
          return false;
        }
        if (!this.userInfo.idCard) {
          this.$toast("请输入家人身份证号码");
          return false;
        }
        if (!isIdNumber(this.userInfo.idCard.replace(/\s/g, ""))) {
          this.$toast("请输入家人正确的身份证号码");
          return false;
        }
        if (!this.alertChecked) {
          this.$toast("请勾选我已阅读并同意");
          return false;
        }
        //添加本人和家人
        this.userInfo.helpType = this.helpTypeIndex * 1 + 1;
        this.actionCount("myFamilyClick");
        this.actionCount("click");
        let channel = localStorage.getItem("channel") || "10000";
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
                //添加家人
                this.checkStart = ret.data.state;
                this.addFamily();
              });
            } else {
              //添加家人
              this.checkStart = ret.data.state;
              this.addFamily();
            }
          } else {
            this.$toast(ret.msg || "请求失败，请刷新重试");
          }
        });
      } else {
        //只添加本人
        this.userInfo.helpType = this.helpTypeIndex * 1 + 1;
        this.actionCount("click");
        let channel = localStorage.getItem("channel") || "10000";
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
      }
    },
    bindWallet() {
      this.$post(Api.bindWallet, { plan_code: this.planCode }).then((ret) => {
        if (ret.code == 0) {
          if (ret.data.state && ret.data.state == "not_bind") {
            window.location.href = ret.data.url;
            setTimeout(() => {
              this.$router.replace("/weibo/note-redpacket");
            }, 500);
          } else {
            if (this.planCode == "XL001") {
              this.$router.replace("/weibo/insure-paysuc");
              //this.$router.replace("/weibo/join_plansuccess");
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
    //switch选择
    switchClick(index) {
      console.log(index);
      this.isActived = index;
    },
    showIntoAn(index) {
      this.introQAlist[index].isShowAn = !this.introQAlist[index].isShowAn;
      if (index == 4) {
        if (this.introQAlist[4].isShowAn) {
          let scrolltop =
            document.documentElement.scrollTop ||
            window.pageYOffset ||
            document.body.scrollTop;
          scrolltop += 98;
          setTimeout(() => {
            window.scrollTo(0, scrolltop);
          }, 100);
        }
      }
    },
    destroyed() {
      clearTimeout(this.lastJoinTimer);
      this.lastJoinTimer = null;
    },
    //添加家人接口请求
    addFamily() {
      let relation = 0;
      switch (this.isActived) {
        case 0:
          relation = 53;
          break;
        case 1:
          relation = 51;
          break;
        case 2:
          relation = 52;
          break;
      }
      let code = "XL001";
      console.log(
        this.userInfo.helpType,
        ".this.userInfo.helpTypethis.userInfo.helpType"
      );
      this.$post(Api.addPolicy, {
        user_name: this.userInfo.familyName,
        certi_no: this.userInfo.idCard,
        help_type: 1,
        certi_type: "00", //证件类型
        work_type: this.workTypeIndex * 1 + 1,
        relation: relation.toString(), //关系
        plan_code: code,
        channel:
          this.$route.query.channel ||
          localStorage.getItem("channel") ||
          "10000",
      }).then((ret) => {
        if (ret.code === 0) {
          sessionStorage.removeItem("myPlanInfo");
          if (ret.data.state == 0) {
            this.$post(Api.bindWallet, { plan_code: "XL001" }).then((ret) => {
              if (ret.code == 0) {
                if (ret.data.state == "not_bind") {
                  //去激活
                  this.checkJoin(this.checkStart);
                  //window.location.href = ret.data.url;
                } else if (ret.data.state == "has_activated") {
                  this.actionCount("insure-write_click");
                  this.router.push("/weibo/insure-plan");
                }
              } else {
                this.$toast(ret.msg || "请求失败，请刷新重试");
              }
            });
          } else {
            this.actionCount("insure-write_click");
            this.router.push("/weibo/insure-plan");
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
        //去激活
        this.$router.push("/weibo/insure-paysuc");
        if (this.planCode == "XL001") {
          //this.$router.replace("/weibo/join_plansuccess");
          this.$router.push("/weibo/insure-paysuc");
        } else {
          this.$router.push("/weibo/feiyan-paysuc");
        }
      }
    },
    switchImg(e) {
      if (e == 1) {
        this.switchImage = true;
      } else {
        this.switchImage = false;
      }
    },
    //监听滚动
    getScroll() {
      let scrolltop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
      if (scrolltop > (104 / 16) * this.fontSize) {
        this.ishasbot = true;
        if (scrolltop >= (108 / 16) * this.fontSize) {
          this.isFixed = true;
        } else {
          this.isFixed = false;
        }
      } else {
        this.ishasbot = false;
        this.isFixed = false;
      }
    },
  },
  beforeDestroy() {
    document.removeEventListener("scroll", this.getScroll);
  },
};
</script>

<style lang="scss" scoped>
@import "./css/mixin";
.sina_page {
  position: relative;
  padding-bottom: 174px;
  background: #fff;
  .join_intro {
    background: #fff;
    position: relative;
    padding-bottom: 106px;
    .imgTips {
      overflow: hidden;
      margin-top: 590px;
      .img {
        width: 100%;
        height: auto;
      }
    }
    .sina_img_cells {
      .sina_img_cell {
        background: #fff;
        &.hasiconBg {
          background-repeat: no-repeat;
          background-position: center 58px;
          &.qa {
            padding: 126px 0 60px;
            background-image: url("./images/DBicon1_2x.png");
            background-size: 154px 68px;
          }
          &.case {
            padding: 176px 0px 58px;
            background-image: url("./images/DBicon2_2x.png");
            background-size: 200px 68px;
          }
        }
      }
    }
    .ketang {
      width: 100%;
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 58px;
      margin-bottom: 30px;
      > img {
        width: 238px;
        height: 80px;
      }
    }
    .QA-cells {
      padding: 16px 50px 0;
      .QA-cell {
        .qa-title {
          margin-top: 40px;
          font-size: 28px;
          line-height: 40px;
          padding: 0 56px;
          position: relative;
          font-weight: 600;
          @include bg-image("DBQAIcon2");
          background-size: 36px 40px;
          background-position: left top;
          &.hot {
            background: url("../../src/assets/images/hot.png") no-repeat;
            background-size: 1.125rem 1.25rem;
            background-position: left top;
          }
        }
        .qa-con {
          padding: 14px 56px 0;
          color: #666;
        }
      }
    }

    .cell-arrow {
      &::after {
        content: "";
        @include ct;
        right: 0;
        width: 30px;
        height: 30px;
        @include bg-image("DBQAArrow");
        background-size: 30px 30px;
        transition: transform 0.3s;
      }
      &.open:after {
        transform: rotate(180deg) translateY(50%);
      }
    }
    input::-webkit-input-placeholder {
      color: #b7b6b6 !important;
    }
    .swiper-container {
      width: 100%;
      height: 840px;
      overflow: auto;
      position: normal !important;
      .swiper-wrapper {
        width: 100%;
        height: 100%;
        .swiper-slide {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .swiper-pagination {
        top: 430px;
        bottom: 0;
      }
    }
    #parent >>> .swiper-pagination-bullet {
      width: 10px !important;
      height: 10px !important;
      background: #fff !important;
      border-radius: 5px !important;
    }
    #parent >>> .swiper-pagination-bullet-active {
      width: 40px !important;
      height: 10px !important;
      background: #fff !important;
    }
    .sina_radius_bg {
      margin: 0;
      padding: 30px 0 40px 40px;
      position: absolute;
      top: 490px;
      left: 0%;
      z-index: 98;
      &.join_form {
        width: 90%;
        margin-left: 5%;
        box-shadow: 0px 7px 30px 0px rgba(183, 182, 182, 0.24);
        padding: 6px;
        .add_form {
          background: #fff;
          padding: 40px 30px;
          border-radius: 30px;
        }
        .join_desc {
          width: auto;
          margin: 56px 0px 0 0px;
          font-size: 22px;
          b {
            font-weight: normal;
            color: #b7b6b6;
          }
        }
      }
    }
    .sina_hasbg {
      background-repeat: no-repeat;
      background-size: 100% auto;
      position: relative;
      padding: 0px 40px 0px;
      .sroll_cells {
        text-align: center;
        height: 36px;
        line-height: 36px;
        overflow: hidden;
        margin-bottom: 30px;
        color: #fff;
      }

      .intro_img {
        margin-top: 44px;
      }
    }
    .switch {
      width: 100%;
      display: flex;
      justify-content: space-between;
      img {
        width: 260px;
        height: 80px;
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
    // margin: 16px 30px 6px;
    margin-top: 20px;
    color: #b7b6b6 !important;
  }

  .add_form {
    padding: 20px 0px 20px 30px;

    .add_title {
      margin-top: 68px;
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
      display: flex;
      background: #fff8ed;
      height: 54px;
      line-height: 54px;
      justify-content: center;
      align-items: center;
      font-size: 26px;
      font-family: "PingFangSC-Medium, PingFang SC";
      font-weight: 500;
      color: #ff8200;
      padding: 29px 0;
      img {
        width: 30px;
        height: 35px;
        margin-right: 10px;
      }
    }

    .bot_btns {
      width: 100%;
      border-top: 1px solid #e6e6e6;
      background: #fff;
      .btn {
        width: 100%;
        height: 120px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 40px;
        font-family: "PingFangSC-Medium, PingFang SC";
        font-weight: 500;
        background: linear-gradient(270deg, #ff4469 0%, #ff6546 100%);
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
  }

  .auth_btn {
    width: 448px;
    height: 100px;
    line-height: 100px;
    border-radius: 51px;
    font-size: 40px;
    border: 0;
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
    background-size: cover;
    background-position: center 0;
  }
}
@-webkit-keyframes myfirst {
  0% {
    height: 0px;
  }
  100% {
    height: 650px;
  }
}
@-webkit-keyframes myfirst2 {
  0% {
    height: 650px;
  }
  100% {
    height: 0px;
  }
}
.isDown {
  animation: myfirst 0.5s;
  animation-fill-mode: forwards; /*停留在最bai后一du帧*/
}
.islolper {
  animation: myfirst2 0.5s;
  animation-fill-mode: forwards; /*停留在最bai后一du帧*/
}
#familyBox {
  margin-top: 30px;
  padding: 0;
  > p {
    text-align: center;
    font-size: 22px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #b7b6b6;
    margin-top: 30px;
  }
  .switch_btn {
    width: 100%;
    p {
      font-size: 28px;
      font-family: "PingFangSC-Medium, PingFang SC";
      font-weight: 500;
      color: #333333;
    }
    .switch_box {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-top: 37px;
      span {
        padding: 10px 57px;
        font-size: 28px;
        font-family: "PingFangSC-Medium, PingFang SC";
        font-weight: 500;
        border-radius: 30px;
        border: 1px solid #e6e6e6;
        -webkit-transform: scale(0.5);
        -webkit-transform-origin: 0 0;
        transform: scale(1);
        transform-origin: 0 0;
        color: #939393;
      }
      .actived {
        background: #ffeeee;
        color: #f14b58;
        border: 1px solid #ffb6bc;
        -webkit-transform: scale(0.5);
        -webkit-transform-origin: 0 0;
        transform: scale(1);
        transform-origin: 0 0;
      }
    }
  }
}
</style>
