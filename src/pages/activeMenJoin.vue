<template>
  <!-- give_bg: channelType == 'giveChannel', 老的送红包页面 -->
  <div class="sina_page" :class="{ haspagebot: ishasbot }" ref="sinaPage">
    <div
      class="sina_hasbg maxbg"
      v-if="channelType == 'valentChannel'"
      :class="{
        share_bg: channelType == 'valentChannel',
      }"
    >
      <div class="sina_join_cont">
        <div class="share_desc">
          <span v-if="shareInfo.name"
            >你的{{ shareInfo.relation }}{{ shareInfo.name }}送你互助红包</span
          >
        </div>
        <div class="join_btn">
          <input
            type="tel"
            autocomplete="off"
            maxlength="11"
            class="input_css"
            v-model.trim="mobile"
            placeholder="请输入手机号"
          />
          <button class="sina_btn NewYear radius max" @click="addPlan()">
            立即领取
          </button>
          <div
            class="check_box bg1"
            :class="{ checked: isChecked }"
            @click.stop="isChecked = !isChecked"
          >
            关注@新浪互助，参与互助事件、章程审议等
          </div>
        </div>
      </div>
    </div>
    <!--红包-->
    <div
      class="sina_hasbg maxbg"
      v-show="
        channelType &&
        channelType == 'redChannel' &&
        sinaActived == 'ActivedVer1'
      "
      style="
        width: 100%;
        background: url('http://sinahuzhu.oss-cn-beijing.aliyuncs.com/images/sina_publicity_temp/h0.png')
          no-repeat;
        background-size: cover;
      "
    >
      <div class="sina_join_cont">
        <div class="join_btn" style="margin-top: 60px">
          <input
            type="tel"
            autocomplete="off"
            maxlength="11"
            class="input_css"
            v-model.trim="mobile"
            placeholder="请输入手机号"
          />
          <button class="sina_btn NewYear radius max" @click="addPlan()">
            立即领取
          </button>
          <div
            class="check_box bglx"
            :class="{ checked: isChecked }"
            @click.stop="isChecked = !isChecked"
          >
            关注@新浪互助，以参与互助事件、章程审议等
          </div>
        </div>
      </div>
    </div>
       <!--积分-->
    <div
      class="sina_hasbg maxbg"
      v-show="
        channelType &&
        channelType == 'giveChannel' &&
        sinaActived == 'ActivedVer2'
      "
      style="
        width: 100%;
        background: url('http://sinahuzhu.oss-cn-beijing.aliyuncs.com/images/sina_publicity_temp/h1.png')
          no-repeat;
        background-size: cover;
      "
    >
      <div class="sina_join_cont">
        <div class="join_btn" style="margin-top: 60px">
          <input
            type="tel"
            autocomplete="off"
            maxlength="11"
            class="input_css"
            v-model.trim="mobile"
            placeholder="请输入手机号"
          />
          <button class="sina_btn NewYear radius max" @click="addPlan()">
            立即领取
          </button>
          <div
            class="check_box bglx"
            :class="{ checked: isChecked }"
            @click.stop="isChecked = !isChecked"
          >
            关注@新浪互助，参与互助事件、章程审议等
          </div>
        </div>
      </div>
    </div>
    <div class="sina_img_cells">
      <template v-for="(item, index) in imgsList">
        <div class="sina_img_cell" :key="'img' + index">
          <img v-lazy="item.url" :src="item.url" />
        </div>
      </template>
      <div class="sina_img_cell hasiconBg qa">
        <div class="QA-cells">
          <template v-for="(item, idx) in introQAlist">
            <div class="QA-cell" :key="idx">
              <div
                class="qa-title cell-arrow"
                :ref="'qaTitle' + idx"
                :class="{ open: item.isShowAn, hot: item.isHot }"
                @click="showIntoAn(idx)"
              >
                {{ item.question }}
              </div>
              <div
                class="qa-con"
                v-if="item.isShowAn"
                v-html="item.answer"
              ></div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <transition name="translate-bottom">
      <div class="sina_join_bot" v-if="ishasbot">
        <button
          class="sina_btn NewYear radius max"
          v-if="sinaActived != 'normalActived'"
          @click="addPlan()"
        >
          {{
            channelType == "redChannel" || channelType == "defChannel"
              ? "领取3元红包"
              : "立即领取"
          }}
        </button>
        <button v-else class="sina_btn NewYear radius max" @click="addPlan()">
          立即领取
        </button>
        <div
          class="check_box primary bg3"
          :class="{ checked: isChecked }"
          @click.stop="isChecked = !isChecked"
        >
          关注@新浪互助，参与互助事件、章程审议等
        </div>
      </div>
    </transition>
    <div class="loading" v-if="loadShow"></div>
    <img-alert :adInfo="adInfo" v-if="adInfoShow"></img-alert>
  </div>
</template>

<script>
import Api from "../utils/apiConfig";
import myFqas from "../components/FQAs";
import imgAlert from "../components/imgAlert";
import { checkPhone } from "../assets/js/common";
export default {
  components: {
    myFqas,
    imgAlert,
  },
  name: "insure-join",
  data() {
    return {
      isChecked: true,
      loadShow: true,
      fontSize: "16",
      ishasbot: false,
      isFixed: false,
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
        {
          isShowAn: false,
          isHot: false,
          question: "新浪互助的互助范围是什么？",
          answer: `<p>新浪互助是给自己或家人的一份大病、意外医疗保障，保障范围包括100种重大疾病(包含恶性肿瘤)以及发生意外住院180天内的治疗报销费用。加入新浪互助不幸患病，可以申请最高30万互助金用于疾病治疗和后期康复，不幸发生意外伤害，180天内住院治疗费用在合理范围内可以得到后续互助，减轻经济负担。</p>`,
        },
        {
          isShowAn: false,
          isHot: false,
          question: "加入新浪互助后是不是马上可以申请互助？",
          answer: `<p>为了防止已患病或者即将患病的人加入，即通常所说的逆选择风险，我们设置了重疾180天，意外30天的观察期，在观察期内患病或发生意外不可以申请互助金，观察期过后，会员若不幸罹患重疾或意外，可以发生互助金申请。</p>`,
        },
      ],
      imgsList: [
        {
          url:
            "http://sinahuzhu.oss-cn-beijing.aliyuncs.com/images/sina_publicity_temp/img2.png",
        },
        {
          url:
            "http://sinahuzhu.oss-cn-beijing.aliyuncs.com/images/sina_publicity_temp/img3.png",
        },
        {
          url:
            "http://sinahuzhu.oss-cn-beijing.aliyuncs.com/images/sina_publicity_temp/img4.png",
        },
      ],
      adInfo: {
        img_url:
          "https://imgs.bihubao.com/Public/images/insureAdView/insureAdRedpack1.png",
        btn_url:
          "https://imgs.bihubao.com/Public/images/insureAdView/insureRedpackBtn.gif",
        sessionName: "_redpackAdShow",
        noRecordClick: true,
      }, //弹窗广告
      adInfoShow: false, //弹窗广告
      adImg: null, //页面图片广告
      validCount: null, // 加入人数
      channelType: null,
      mobile: "",
      messId: null, // 分享
      shareInfo: {
        relation: null,
        name: null,
        recommendName: null,
      }, // 分享者信息
      sinaActived: "normalActived", //新增新浪微博抽奖对应活动 2021/1/12
    };
  },
  computed: {},
  mounted() {
    // debugger
    if (localStorage.getItem("_userToken")) {
      this.getPlanStatus();
    } else {
      this.pageShow();
      this.setActionCount("pv", "-1"); //未授权埋点
    }
    //特殊处理 新增新浪微博抽奖对应活动 30002 = 3元红包，40005=30万新冠
    let channel = localStorage.getItem("channel");
    console.log(channel);
  },
  created() {
    let clientWidth = document.documentElement.clientWidth;
    if (!clientWidth) return;
    if (clientWidth > 1366) {
      clientWidth = 1366;
    }
    this.fontSize = ((clientWidth * 2) / 750) * 16;
    document.addEventListener("scroll", this.getScroll);
  },
  methods: {
    pageShow() {
      this.messId = this.$route.query.messId;
      localStorage.removeItem("_ValentQuery");
      if (this.$route.query.uid) {
        localStorage.setItem("_ValentQuery", JSON.stringify(this.$route.query));
      }
      this.getValidCount();
      this.checkChannel();
      if (this.messId) {
        //获取分享关系
        this.getRecommend();
      }
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
    //监听滚动
    getScroll() {
      let scrolltop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
      if (scrolltop > (474 / 16) * this.fontSize) {
        this.ishasbot = true;
        if (scrolltop >= (568 / 16) * this.fontSize) {
          this.isFixed = true;
        } else {
          this.isFixed = false;
        }
      } else {
        this.ishasbot = false;
        this.isFixed = false;
      }
    },
    getPlanStatus() {
      this.$get(Api.getMyPolicy).then((ret) => {
        if (ret.code === 0) {
          if (
            ret.data.plan_list_state &&
            (ret.data.plan_list_state["XL001"] != "not_join" ||
              ret.data.plan_list_state["XL002"] != "not_join")
          ) {
            this.$router.replace("/weibo/insure-plan");
          } else {
            this.pageShow();
            this.getPhone();
            this.actionCount("pv");
          }
        } else {
          this.pageShow();
          this.getPhone();
          this.actionCount("pv");
        }
      });
    },
    //获取用户手机号码
    getPhone() {
      this.$get(Api.getPhone).then((ret) => {
        this.mobile = localStorage.getItem("_userPhone");
        if (ret.code == 0) {
          this.mobile = ret.data || localStorage.getItem("_userPhone");
        }
      });
    },
    addPlan() {
      if (!this.mobile || this.mobile == "") {
        this.$toast("请输入手机号码");
        return false;
      }
      if (!checkPhone(this.mobile)) {
        this.$toast("请输入正确的手机号码");
        return false;
      }
      localStorage.setItem("_userPhone", this.mobile);
      if (localStorage.getItem("_userToken")) {
        this.actionCount("click");
      } else {
        this.setActionCount("click", "-1"); //未授权埋点
      }
      let hasChecked = this.isChecked ? 1 : 0;
      let channel = localStorage.getItem("channel");
      if (channel && channel == 10021) {
        window.location.href =
          "sinaweibo://browser?url=https%3A%2F%2Fsina.bihubao.com%2Fweibo%2Finsure-write%3Fchannel%3D10021";
      } else {
        this.$router.push(
          `/weibo/insure-write?hasChecked=${hasChecked}&phone=${
            this.mobile
          }&name=${this.shareInfo.name || ""}`
        );
      }
    },

    checkChannel() {
      let channel =
        this.$route.query.channel || localStorage.getItem("channel") || 10000;
      if (channel == null) {
        localStorage.setItem("channel", 10000);
      }
      this.$get(Api.checkRedPacketChannel, {
        channel: channel,
        isNotshowLoad: "noshow",
      }).then((ret) => {
        if (ret.code == 0) {
          let typeList = ret.data.type_list;
          if (typeList.length > 0 && typeList.indexOf("give_score") > -1) {
            this.channelType = "giveChannel";
            this.sinaActived = "ActivedVer2";
          } else {
            this.channelType = "redChannel";
            this.sinaActived = "ActivedVer1";
          }
          if (this.messId) {
            this.channelType = "valentChannel";
          }
          let adList = ret.data.ad_list;
          if (adList && adList.length > 0) {
            adList.forEach((item) => {
              if (item.pos == "weibo-insure-join-11") {
                this.adImg = item;
              }
              if (item.pos == "weibo-insure-join-12") {
                if (!sessionStorage.getItem(this.adInfo.sessionName)) {
                  this.adInfoShow = true;
                  this.adInfo.img_url = item.img_url;
                }
              }
            });
          }
        } else {
          this.channelType = "redChannel";
        }
        this.loadShow = false;
        if (this.adInfoShow) {
          if (localStorage.getItem("_userToken")) {
            this.actionCount("banner_show");
          } else {
            this.setActionCount("banner_show", "-1"); //未授权埋点
          }
        }
      });
    },
    getValidCount() {
      //加入人数
      this.$get(Api.getJoinCount).then((ret) => {
        if (ret.code == 0) {
          let count = ret.data;
          for (let i = 0; count.toString().split("").length < 6; i++) {
            count = "0" + count;
          }
          this.validCount = count.toString().split("");
        }
      });
    },
    adClick() {
      if (this.adImg.link) {
        let uid = sessionStorage.getItem("weiboInfo")
          ? JSON.parse(sessionStorage.getItem("weiboInfo"))["uid"]
          : "";
        window.location.href = this.adImg.link + uid;
      }
    },
    getRecommend() {
      this.$get(Api.getRecommend, { recommend_id: this.messId }).then((ret) => {
        if (ret.code == 0) {
          this.shareInfo.relation = ret.msg.relation;
          this.shareInfo.name = ret.msg.relation_name;
          this.shareInfo.recommendName = ret.msg.recommend_name;
        }
      });
    },
  },

  beforeDestroy() {
    document.removeEventListener("scroll", this.getScroll);
  },
};
</script>

<style scoped lang="scss">
@import "./css/mixin";

.sina_page {
  padding-bottom: 70px;
  background: #fff;
  &.haspagebot {
    padding-bottom: 246px;
  }
  .sina_hasbg {
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-color: #fff;
    position: relative;
    .sina_join_cont {
      padding: 334px 30px 0px;
      position: relative;
      .share_desc {
        position: absolute;
        top: 82px;
        left: 40px;
        font-size: 28px;
        color: #e74977;
        font-weight: bold;
      }
      .join_btn {
        width: 570px;
        padding: 38px 0;
        margin-left: 50%;
        transform: translateX(-50%);
        .input_css {
          width: 570px;
          height: 100px;
          padding: 26px 0;
          line-height: 48px;
          margin-bottom: 30px;
          font-size: 36px;
          text-align: center;
          background: rgba(255, 255, 255, 1);
          border-radius: 50px;
          border: 1px solid rgba(230, 230, 230, 1);
          color: #333;
        }
        input::-webkit-input-placeholder {
          font-size: 36px;
          font-family: 'PingFangSC-Regular, PingFang SC';
          font-weight: 400;
          color: #ff9e71;
        }
      }
      .max {
        height: 100px;
        background: linear-gradient(270deg, #ff4469 0%, #ff6546 100%);
        box-shadow: none;
        color: #ffffff;
        border-radius: 50px;
        font-size: 40px;
        line-height: 100px;
        border: 0;
        /*-webkit-animation-name: scaleDraw; !*关键帧名称*!*/
        /*-webkit-animation-timing-function: ease-in-out; !*动画的速度曲线*!*/
        /*-webkit-animation-iteration-count: infinite;  !*动画播放的次数*!*/
        /*-webkit-animation-duration: 1s; !*动画所花费的时间*!*/
      }
      ::-webkit-input-placeholder {
        color: #fff;
      }
      .check_box {
        color: #333;
      }
      .redPackBg {
        margin: 0 10px;
        min-height: 654px;
        background: transparent no-repeat;
        background-size: 100% auto;
        padding: 300px 30px 40px;
        .input_css {
          background: rgba(255, 198, 198, 1);
          color: #fff;
          border-color: rgba(255, 198, 198, 1);
        }
        &.redpack {
          background-image: url("http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/DBJoinFormBg.png?v=1.0");
        }
        &.valent {
          background-image: url("http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/valent/DBJoinFormBg2.png?v=1.0");
        }
      }

      .intro_bg {
        padding: 20px 10px 14px;
      }
    }
    padding-bottom: 26px;
    &.maxbg {
      min-height: 1536px;
      &.share_bg {
        background-image: url("http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/DBFormShareBg.png");
      }
      &.give_bg {
        background-image: url("http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/DBFormGiveBg.png");
      }
      .share_desc {
        position: absolute;
        width: 100%;
        top: 300px;
        left: 0px;
        font-size: 32px;
        text-align: center;
        color: $primary;
      }
      .sina_join_cont {
        padding: 700px 70px 0;
        .input_css {
          background: #fff;
          border: 1px solid #ff9e71;
          color: #FF9E71;
        }
      }
    }
  }
  @keyframes scaleDraw {
    0% {
      transform: scale(0.9);
    }
    50% {
      transform: scale(1);
    }
    100% {
      transform: scale(0.9);
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
          @include bg-image("DBQAIcon1");
        }
      }
      .qa-con {
        padding: 14px 56px 0;
        color: #666;
      }
    }
  }

  .sina_join_bot {
    width: 100%;
    border-top: 1px solid #e6e6e6;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 99;
    background: #fff;
    padding: 42px 0 48px;
    @include plr30;
    .check_box {
      margin-left: 98px;
    }
    .sina_btn {
      font-size: 40px;
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
  .loading {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999;
    background-color: #fff;
    background-image: url("./images/loading.gif");
    background-repeat: no-repeat;
    background-size: 200px 200px;
    background-position: center;
  }
  .class_icon {
    position: fixed;
    right: 16px;
    bottom: 150px;
    width: 126px;
    height: 126px;
    z-index: 101;
    @include bg-image("DBClassIcon");
    background-size: 126px 126px;
  }
  .check_box {
    margin-top: 24px;
    color: #b7b6b6;
    margin-left: 10px;
  }

  .sina_btn.hasicon {
    position: relative;
    &:after {
      content: "";
      position: absolute;
      top: -8px;
      right: 48px;
      width: 100px;
      height: 50px;
      background: url("./images/DBJoinBtnIcon_2x.png") no-repeat;
      background-size: 100px 50px;
    }
  }
}
</style>
