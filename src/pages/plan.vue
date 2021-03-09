<template>
  <div class="sina_page">
    <div class="sina_hasbg">
      <!-- <xtjToast :sendData="typePage" /> -->
      <div class="has_frimly">
        <!-- <div class="left flex1">
          {{ myPlanInfo && myPlanInfo.validCount - 1 }}位家人保障中
          <i class="arrow"></i>
        </div> -->
        <!--        <div class="right info_icon" @click="showInfoAlert">{{myPlanInfo&&myPlanInfo.totalMoney}}万元互助金(合计)</div>-->
        <div @click="moneyClick" class="redpackge">红包余额</div>
      </div>
      <div class="plan_cont">
        <div class="plan_detail" ref='swiperWrap'>
          <plan-swiper
            v-if="myPlanInfo && weiboInfo"
            :myPlanInfo="myPlanInfo"
            :weiboInfo="weiboInfo"
            @oneBtnJoinAlert="oneBtnJoinAlert"
          ></plan-swiper>
        </div>
        <div class="plan_peoples" v-if="validCount">
          <span class="num" v-for="(item, index) of validCount" :key="index">{{
            item
          }}</span>
          人已加入
        </div>
        <div class="plan_funcs">
          <div
            @click="iconClick(1, '/weibo/public-list')"
            class="plan_func func1"
          >
            <div class="text">公示</div>
          </div>
          <div
            @click="iconClick(2, '/weibo/share-list')"
            class="plan_func func2"
          >
            <div class="text">分摊</div>
          </div>
          <div
            @click="iconClick(3, '/weibo/activity-valent?channel=30058')"
            class="plan_func func3"
          >
            <div class="text">邀请好友</div>
          </div>
          <div class="plan_func func4" @click="iconClick(4, null)">
            <div class="text">申请互助</div>
          </div>
        </div>
      </div>
    </div>

    <!--  消息通知-->
    <div class="notice" @click="toNoticeList()" v-if ="notice_list.length>2">
 <img src="./images/notice_icon.png" class="notice_icon"/>
 <ul >
   <li><p>{{notice_list[1].title}}</p><span>{{notice_list[1].pass_time}}</span> </li>
   <li><p>{{notice_list[2].title}}</p> <span>{{notice_list[2].pass_time}}</span></li>
 </ul>
 <img src="./images/notice_arrow_r.png" class="notice_arrow_r"/>
</div>
  <div class="notice" @click="toNoticeList()" v-if ="notice_list.length==2&&notice_list[0].id==-1">
    <img src="./images/notice_icon.png" class="notice_icon"/>
    <ul >
      <li><p>{{notice_list[1].title}}</p><span>{{notice_list[1].pass_time}}</span></li>
    </ul>
    <img src="./images/notice_arrow_r.png" class="notice_arrow_r"/>
  </div>
  <div class="notice" @click="toNoticeList()" v-if ="notice_list.length==1&&notice_list[0].id==-1">
    <img src="./images/notice_icon.png" class="notice_icon"/>
    <ul >
      <li><p>{{notice_list[0].title}}</p></li>
    </ul>
    <img src="./images/notice_arrow_r.png" class="notice_arrow_r"/>
  </div>

    <!-- 如何找到新浪互助 -->
    <div class="toFind">
      <h2>如何找到新浪互助？</h2>
      <img src="http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/howToFind.png" class="howToFind"/>
    </div>

    <!-- 如何让互助计划永久生效 -->
    <div class="toFind permanent_effect">
      <h2>如何让互助计划永久生效</h2>
      <img src="http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/permanent_effect.png" class="howToFind"/>
    </div>

    <div class="show_intro" v-if="introShow">
      <div class="normalTitle">新会员必读</div>
      <div class="sina_radius_bg">
        <div class="intro_item" v-if="introIndex == 1">
          <div class="intro_title">
            听说国家已经报销新冠病毒的治疗费用了，为什么还需要互助？
          </div>
          <div class="intro_txt">
            此互助的目的主要是对于因新冠病毒救治而产生的误工等生活上的费用进行补充，并对患者身故后的家庭进行经济援助，和国家的医疗费用报销不冲突。
          </div>
        </div>
        <div class="intro_item" v-if="introIndex == 2">
          <div class="intro_title">怎么判断我是不是符合加入条件？</div>
          <div class="intro_txt">
            因为这次的疫情非常严重，新冠病毒互助计划的会员主要是以利他心态加入，所以是次日生效；无年龄、地域、职业限制，只要现在没有被确诊为新型冠状病毒感染或被列入疑似新型冠状病毒感染的都可以加入。
          </div>
        </div>
        <div class="intro_item" v-if="introIndex == 3">
          <div class="intro_title">为什么医护人员可以获得3倍的互助额度？</div>
          <div class="intro_txt">
            因为医护人员是抵御病疫的根本防线，他们冒着生命危险奋战在一线救助已经遭受感染的患者，他们肩负更重要的使命也承担着更高的风险，我们应该给与医护人员更多的守护，因此我们为其设定了更高的互助上限。向医护人员致敬！
          </div>
        </div>
        <div class="intro_item" v-if="introIndex == 4">
          <div class="intro_title">加入新冠病毒互助以后要花多少钱？</div>
          <div class="intro_txt">
            当发生互助事件并完成公示后平台会自动划扣互助金。新冠互助计划的总计分摊额以200元为限。用来救助包括自己在内可能患病的同胞。我们不收取任何管理费，互助金将100%用于救助患病者。
          </div>
        </div>
        <div class="intro_bot">
          <div
            class="intro_btn left"
            v-if="introIndex > 1"
            @click="introShowEvt('pre')"
          >
            上一个
          </div>
          <span>{{ introIndex }}/4</span>
          <div
            class="intro_btn"
            @click="introShowEvt('next')"
            v-if="introIndex <= 4"
          >
            {{ introIndex == 4 ? "我知道了" : "下一个" }}
          </div>
        </div>
      </div>
    </div>
    <div class="plan_share" v-if="sinaAdShow">
      <finance-login :financeMobile="financeMobile"
                     v-if="financeMobile"
                     :subSource="subSource"
      ></finance-login>
      <my-ad id="weibo-insure-plan-1" v-else  ></my-ad>

    </div>


    <!-- <div class="publicity" v-if="totalNum">
      <div class="normalTitle">疫情发展统计</div>
      <div class="sina_radius_bg">
        <div class="public_title">{{ dateLimit }}</div>
        <div class="public_cells">
          <div class="public_cell">
            <div class="nums">
              {{ totalNum.confirmedCount }}
              <i>例</i>
            </div>
            <div class="feiyantxt">确诊</div>
          </div>
          <div class="public_cell">
            <div class="nums">
              {{ totalNum.suspectedCount }}
              <i>例</i>
            </div>
            <div class="feiyantxt">疑似</div>
          </div>
          <div class="public_cell">
            <div class="nums">
              {{ totalNum.deadCount }}
              <i>例</i>
            </div>
            <div class="feiyantxt">死亡</div>
          </div>
          <div class="public_cell">
            <div class="nums">
              {{ totalNum.curedCount }}
              <i>例</i>
            </div>
            <div class="feiyantxt">治愈</div>
          </div>
        </div>
      </div>
    </div> -->


    <div class="publicity" v-if="publicDataList" @click="publicity_fn()">
      <div class="normalTitle">最新公示</div>
      <div class="">
        <div class="public_title">{{latestPublicDate}}</div>
        <div class="public_cells">
          <div class="public_cell">
            <div class="nums">{{publicDataList.help_count}}<i>人</i></div>
            <div class="feiyantxt">本期受助会员</div>
          </div>
          <div class="public_cell">
            <div class="nums">{{total_money}}<i>万元</i></div>
            <div class="feiyantxt">分摊总额</div>
          </div>
          <div class="public_cell">
            <div class="nums">{{total_persons}}<i>万人</i></div>
            <div class="feiyantxt">分摊会员</div>
          </div>
        </div>
      </div>
    </div>

    <!-- <my-fqas planShow="true"></my-fqas> -->
    <!-- 大家都在问 -->
    <Question></Question>
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
    <my-ad
      id="weibo-insure-plan-10"
      v-if="sinaAlertAdShow"
      isAlert="true"
    ></my-ad>
    <!-- 调查问卷 -->
    <div class="questionnaire" @click="linkQuestion()">
      <img src="../../static/images/dcwq.png" alt="" />
    </div>
    <div class="footer_instead"></div>
    <!--  footer-->
    <div :class="['footer', {'fixed':showFixedFooter == true}]"  v-if='footer_btn_txt'>
      <button  @click.stop="click_change()" >{{footer_btn_txt}}</button>
        <!-- <button  @click.stop="click_change()"
                v-if="plan_footer.plans[0].state == '0'">立即激活权益
        </button>
        <button v-if="plan_footer.plans[0].state == '1'&&plan_footer.insured.notHaveCode =='XL001'"
                @click.stop="click_change()" >0元升级保障
        </button>
        <button v-if="plan_footer.plans[0].state == '1'&&plan_footer.insured.notHaveCode =='XL003'"
                @click.stop="click_change()" >0元升级保障
        </button>
        <button v-if="plan_footer.plans[0].state == '1'&&plan_footer.insured.notHaveCode ==''"
                @click.stop="click_change()" >为家人保障
        </button> -->

    </div>
  </div>
</template>

<script>
import myService from "../components/myService";
import planSwiper from "../components/planSwiper";
import myFqas from "../components/FQAs";
import Question from "../components/Question";
import Api from "../utils/apiConfig";
import oneBtnJoin from "../components/oneBtnJoin";
import clauseAlert from "./clause/clauseAlert";
import myAd from "../components/sinaAd";
//引入 享投君
import xtjToast from "../components/xtjToast/xtjToast";
import financeLogin from '../components/financeLogin'
export default {
  components: {
    planSwiper,
    myService,
    myFqas,
    oneBtnJoin,
    clauseAlert,
    myAd,
    Question,
    xtjToast,
    financeLogin
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
      typePage: "plan",
      subSource:73965531,  //新浪借钱
      financeMobile: null, //新浪借钱-手机号
      notice_list:[],    //消息通知
      publicDataList:null, //大病互助公示数据
      plan_footer:null,
      showFixedFooter:false, //底部是否显示
      footer_btn_txt:null,
      public_id:null
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
  created(){

  },
  mounted() {
    // 监听页面滚动事件
     window.addEventListener("scroll", this.showFooter)
      this.getPublicList()
      this.getNoticeList()
    this.typePage = "plan";
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
            // 判断是否是借钱老用户
            // this.sinaAdShow = true;   //删除判断时需显示
            this.checkFinanceReceive();
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
    linkQuestion(){
        this.actionCount("quest_click");
      this.$router.push({path:"/weibo/questionnaire"})
    },
    // 判断是否是借钱老用户
    checkFinanceReceive(){
      setTimeout(() => {
        this.sinaAdShow = true;
      }, 2000);
      this.$post(Api.get_finance_receive, {subSource: this.subSource}).then(ret => {
        this.sinaAdShow = true;
        if (ret.code == 0 && ret.msg.mobile) {
          this.financeMobile = ret.msg.mobile;
        }
      })
    },
    getNoticeList(){
      let _this= this
     this.$get(Api.getNoticeList,{
      start_id:0,
      per_count:5
    }).then((res)=>{
      if(res.code == 0){
         console.log(res)
            _this.$nextTick(()=>{
              _this.notice_list=res.data.msg_list
            })
      }
    })
  },
  getPublicList(){
    this.$get(Api.getPublicList,{
      page:this.page,
      per_count:10
    },true).then((res)=>{

      if(res.code == 0){
        console.log(res)
         this.publicDataList = res.data.public_list["XL001"][0];
         this.public_id = res.data.public_list["XL001"][0].public_id
         console.log(this.public_id)
         this.total_money=res.data.public_list["XL001"][0].total_money
         console.log(this.total_money)
         this.total_money=Math.floor((this.total_money/10000) * 100) / 100
         console.log(this.total_money)
         this.total_persons=res.data.public_list["XL001"][0].total_persons.toString().replace(/,/g, "");
           console.log(this.total_persons)
         this.total_persons=Math.floor((this.total_persons/10000) * 100) / 100
          console.log(this.total_persons)
         console.log(this.publicDataList)
         this.latestPublicDate=res.data.public_list["XL001"][0].name+`  (`+res.data.public_list["XL001"][0].start_date.slice(5)+`~`+res.data.public_list["XL001"][0].end_date.slice(5)+`)`
      }

    })
  },
  activePlan(code) {
      if (!this.myPlanInfo) {
          return;
      }
      this.actionCount('nowActivation')
      this.$router.push('/weibo/insure-active?planCode='+code)
  },
  addFrimly(index) {
    if (this.myPlanInfo.planStatus == 1 || this.myPlanInfo.planStatusFY == 1) {
      this.actionCount('addFrimly_click' + index, () => {
        let channel = '50006';
        if (index == '2') {
          channel = '50007';
        }
        this.$router.push('/weibo/insure-add?channel=' + channel)
      });
    }else{
      this.$toast('您需先激活权益')
    }
  },
  addPlanAlert(item) {
    this.actionCount('addPlan_click2', () => {
      if(item.notHaveCode =='XL001'){
        this.$router.push('/weibo/insure-illIntro');
      }else{
        this.$emit('oneBtnJoinAlert', item)
      }

    });
  },
  showFooter(){
         if(this.myPlanInfo)
         this.footer_btn_txt = document.getElementsByClassName('plan_add')[0].innerText;
          // console.log(this.footer_btn_txt)
      let winHeight = document.documentElement.clientHeight || document.body.clientHeight;
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                // 当页面滚动到高度300px处时，显示搜索框
                if (scrollTop > winHeight/2) {
                    this.showFixedFooter = true;
                } else {
                    this.showFixedFooter = false;
                }

  },
  click_change(){
    var don_btn= document.getElementsByClassName('plan_add')[0];
    don_btn.click()
    window.scroll(0,0)
  },
  toNoticeList(){
    this.actionCount("noticeList");
    this.$router.push('/weibo/noticeList')
  },
   publicity_fn(){
     this.actionCount("publicity_ill");
     this.$router.push({path:`/weibo/public-member?id=${this.public_id}&planCode=XL001`})
   }
  },
  destroyed() {
    this.$clearsinaAlert();
    window.removeEventListener("scroll", this.showFooter)
  },
};
</script>

<style scoped lang="scss">
@import "./css/mixin";

.sina_page {
  .questionnaire {
      position: fixed;
      z-index: 101;
      right: 50px;
      bottom: 150px;
      img{
        width: 130px;
        height: 130px;
      }
  }
  .sina_hasbg {
    background-color: #fff;
    // @include bg-image("sinaBanner2New");
    background:#fff url(http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/sinaBanner2New.png) no-repeat;
    // width: 750px;
    // height:570px;
    background-size: 100% 570px;
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
        margin-top: 70px;
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
            @include bg-image("sinaPlanFunc1New");
          }

          &.func2 {
            @include bg-image("sinaPlanFunc2New");
          }

          &.func3 {
            @include bg-image("sinaPlanFunc3New");
          }

          &.func4 {
            @include bg-image("sinaPlanFunc4New");
          }
          .text {
            text-align: center;
          }
        }
      }
    }
  }

  .plan_share {
    margin: 20px 18px 0;
    .hasborTitle {
      font-size: 24px;
      font-weight: normal;
      margin-bottom: 24px;
      position: relative;
      left: -40px;
    }
  }
  .publicity {
    background: #fff;
    padding-bottom: 50px;
    margin-top: 20px;
     .normalTitle{
      font-size: 32px;
      font-weight: 500;
      color: #333333;
      padding-bottom: 0;
     }
    .sina_radius_bg {
      padding: 28px 0;
    }
    .public_cells .public_cell .nums {
      font-size: 44px;
      font-weight: 500;
      color: #333333;
    }
    .public_cells .public_cell .feiyantxt{
      font-size: 24px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 33px;
    }
    .public_title {
      padding-left: 30px;
      padding-top: 20px;
      padding-bottom: 36px;
      font-size: 24px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #939393;
    }
    .public_cells .public_cell .txt_col {
      color: #333;
    }
  }
  .notice{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 690px;
  height: 168px;
  background: #fff;
  border-radius: 20px;
  margin: 20px auto 0;
  padding: 34px;
  .notice_icon{
    width: 100px;
  }
  ul{
     width: 420px;
    li{
      display: flex;
      align-items: center;
      list-style-type: disc;
      line-height: 46px;
      font-size: 26px;
      font-weight: 400;
      color: #333333;
        span{
        color:  #939393;
        }
        p{
          max-width: 300px;
          display: inline-block;
          margin-right: 25px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
    }
  }
  .notice_arrow_r{
    width: 30px;
  }
}
.toFind{
  margin-top: 20px;
   width: 750px;
   height: auto;
   background: #fff;
   padding: 50px 30px 58px 30px;
   h2{
     padding-bottom: 50px;
   }
   img{
     width: 690px;
     height: 580px;
   }
}
.permanent_effect{
  img{
    height: 232px;
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
  .footer_instead{
    height: 180px;
  }
  .footer{
    width: 750px;
    height: 180px;
    background: #FFFFFF;
    padding: 40px 30px;
    // border: 1px solid #E6E6E6;
    button{
      width: 690px;
      height: 100px;
      background: linear-gradient(270deg, #FF4469 0%, #FF6546 100%);
      border-radius: 50px;
      font-size: 34px;
      border: 0;
      color: #fff;
    }
  }
  .fixed{
    position: fixed;
    z-index: 100;
    left: 0;
    bottom: 0;
  }
}
</style>
