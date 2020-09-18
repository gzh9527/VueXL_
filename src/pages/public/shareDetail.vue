<template>
  <div class="sina_page">
    <div class="head-wrap">
      <img src="../images/publicBanner1_2x.png">
      <div class="public-number">{{helpInfo&&helpInfo.publicName}}</div>

      <router-link to="/weibo/share-list" class="past_public hasarrow col_fff right">
        全部分摊
      </router-link>
    </div>
    <div class="plan_types">
      <div class="plan_type" :class="{active:planCode =='XL001'}" @click="checkedTab('XL001')">大病互助</div>
      <div class="plan_type" :class="{active:planCode =='XL002'}" @click="checkedTab('XL002')">意外医疗</div>
      <div class="plan_type" :class="{active:planCode =='XL003'}" @click="checkedTab('XL003')">新冠互助</div>
    </div>
    <div class="share_cont" v-if="headNums">
      <div class="public_cells share_radiusbg hasarrow right" @click="checkPublic">
        <div class="public_cell">
          <div class="nums">{{headNums.total_persons}}<i>万人</i></div>
          <div class="feiyantxt">分摊人数</div>
        </div>
        <div class="public_cell">
          <div class="nums">{{headNums.help_count}}<i>人</i></div>
          <div class="feiyantxt">已帮助</div>
        </div>
        <div class="public_cell">
          <div class="nums">{{headNums.unit_amount}}<i>元</i></div>
          <div class="feiyantxt" v-if="planCode == 'XL001'">分摊基数</div>
          <div class="feiyantxt" v-else>分摊金额</div>
        </div>
      </div>

    </div>
    <div class="share_cont">
      <div class="share_radiusbg my_share" v-if="planInfo&&planInfo.addState&&helpNums">
        <div class="share_tl">我用<span class="col_primary">{{helpNums.amount}}元</span>延续了保障</div>
        <div class="share_info">
          <div class="plan_name">新浪互助 ·
            <span v-if="planCode =='XL001'">大病互助计划</span>
            <span v-if="planCode =='XL002'">意外医疗互助计划</span>
            <span v-if="planCode =='XL003'">新冠互助计划</span>
          </div>
          <div class="plan_money">{{planInfo&&planInfo.amnt}}<span class="small">万元</span></div>
          <div class="plan_people">{{helpInfo&&helpInfo.name}}</div>
        </div>
        <router-link to="/weibo/insure-add" class="share_intro icon1">爱家人就加入新浪互助，0元添加家人</router-link>
      </div>
      <div class="share_radiusbg not_join" v-if="planInfo&&!planInfo.addState&&planCode !='XL002'">
        <div class="" v-if="planCode =='XL001'">
          <img src="../images/shareNoJoin1_2x.png">
          <div class="join_intro">你尚未加入大病互助计划<br/> 加入后可享受最高30万元重大疾病互助金</div>
        </div>
        <div class="" v-if="planCode =='XL002'">
          <img src="../images/shareNoJoin2_2x.png">
          <div class="join_intro">你尚未加入意外医疗互助计划<br/> 加入后因意外伤害在医院治疗，可享受最高5万元互助金</div>
        </div>
        <div class="" v-if="planCode =='XL003'">
          <img src="../images/shareNoJoin3_2x.png">
          <div class="join_intro">你尚未加入新冠病毒互助计划<br/> 加入后因新型冠状病毒(2019-nCoV)感染所致肺炎<br/> 可享受最高10万元（医护人员30万元）互助金</div>
        </div>
        <button class="sina_btn primary radius addbtn"  @click="oneBtnJoinAlert">0元加入</button>
      </div>
    </div>
    <div class="share_cont" v-if="helpNums">
      <div class="share_radiusbg my_share">
        <div class="share_tl ">本期帮助了<span class="col_primary">{{helpNums.help_count}}人</span></div>
        <div class="share_intro icon2">不到一毛钱我就能帮助一个家庭度过难关</div>
      </div>
    </div>
    <div class="share-QA">
      <my-fqas shareShow="true"></my-fqas>
    </div>
    <div class="sina_bot_ab">
      <my-service></my-service>
    </div>
    <oneBtnJoin v-if="addPerson" :addAlertShow="addAlertShow" :addPerson="addPerson"
                @cancalAdd="cancalAdd" @showClauseAlert="showClauseAlert" @addPlanSuc="addPlanSuc"></oneBtnJoin>
    <clause-alert v-if='alertClauseShow'  :alertShow="alertClauseShow" :alertIndex="alertIndex" @closeClauseAlert="alertClauseShow=false"></clause-alert>
  </div>
</template>

<script>
  import myService from '../../components/myService'
  import myFqas from "../../components/FQAs";
  import Api from "../../utils/apiConfig";
  import oneBtnJoin from "../../components/oneBtnJoin";
  import clauseAlert from "../clause/clauseAlert";
  export default {
    name: "shareDetail",
    components: {
      myService,myFqas,oneBtnJoin,clauseAlert
    },
    data(){
      return{
        planCode:'XL001',
        helpInfo:null, // 公司信息
        helpId:null, //公示id
        uuid:null,
        plansList:null, // 加入的计划信息
        planInfo:null,  //当前展示的计划信息
        dealData:null,  //公示数据
        headNums:null, // 三个分摊数据
        helpNums:null, //本期家人分摊信息
        addPerson:null, //立即加入 - 用户信息
        addAlertShow:false,
        alertClauseShow:false,
        alertIndex:null,
        totalNum:null,
      }
    },
    created() {
      this.helpId = this.$route.query.anno_id;
      this.uuid = this.$route.query.uuid;
      this.getHelpDealList();
      this.gethelpDealData();
      if (!sessionStorage.getItem('myPlanInfo')) {
        this.getPlanList();
      }else{
        let myPlanInfo = JSON.parse(sessionStorage.getItem('myPlanInfo'));
        myPlanInfo.dataList.forEach(item=>{
          if(item.insured.customerno == this.uuid){
            this.plansList = {insured:item.insured};
            item.plans.forEach(item=>{
              item.addState = true;
              this.plansList[item.plan_code] = item;
            });
          }
        });
        this.getPlanItem()
      }
    },
    methods:{
      getPlanList(){
        this.$get(Api.getPolicyList, {}).then(res => {
          if (res.code == 0) {
            res.data.policy_list.forEach(item=>{
              if(item.insured.customerno == this.uuid){
                this.plansList = {insured:item.insured};
                item.plans.forEach(item=>{
                  item.addState = true;
                  this.plansList[item.plan_code] = item;
                });
              }
            });
            this.getPlanItem()
          }
        })
      },
      getPlanItem(){
        if(this.plansList&&this.plansList[this.planCode]){
          this.planInfo = this.plansList[this.planCode]
        }else{
          this.planInfo = {
            addState : false
          }
        };
        this.headNums= null;
        this.helpNums = null;
        if(this.dealData){
          if(this.dealData.sub_list&&this.dealData.sub_list[this.planCode]){
            this.headNums = this.dealData.sub_list[this.planCode][0]
          }
          if(this.dealData.sub_list&&this.dealData.deal_list[this.planCode]){
            this.helpNums = this.dealData.deal_list[this.planCode][0]
          }
        }
      },
      checkedTab(code){
        this.planCode = code;
        this.getPlanItem();
      },
      checkPublic(){
        this.$router.push(`/weibo/public-member?id=${this.helpInfo.publicId}&planCode=${this.planCode}`)
      },
      // 获取公示信息
      getHelpDealList(){
        let params = {
          year:this.$route.query.year
        }
        this.$get(Api.helpDealList,params ).then(res => {
          if (res.code == 0) {
            let helpList = res.data.deal_list;
            helpList&&helpList.forEach(item=>{
              if(item.announcement_id == this.helpId){

                item.child_list.forEach(peoitem=>{
                  if(peoitem.e_uid == this.uuid){
                    let memInfo = {
                      announcement_id:item.announcement_id,
                      alias_name:item.alias_name,
                      year:item.year,
                      month:item.month,
                      publicName:item.name,
                      publicId:item.public_id
                    }
                    this.helpInfo = Object.assign({},memInfo,peoitem)
                  }
                })
              }
            })
          } else {
            this.$toast(res.msg || "请求超时，请刷新重试");
          }
        })
      },
      //获取三个数据
      gethelpDealData(){
        this.$get(Api.helpDealData,{
          e_uid:this.uuid,
          anno_id:this.helpId
        } ).then(res => {
          if (res.code == 0) {
            this.dealData = res.data;
            if(this.dealData){
              if(this.dealData.sub_list&&this.dealData.sub_list[this.planCode]){
                this.headNums = this.dealData.sub_list[this.planCode][0]
              }
              if(this.dealData.sub_list&&this.dealData.deal_list[this.planCode]){
                this.helpNums = this.dealData.deal_list[this.planCode][0]
              }
            }
          }
        })
      },
      oneBtnJoinAlert(){
        if(this.plansList){
          this.addAlertShow =true;
          this.plansList.insured['notHaveCode'] = this.planCode;
          this.addPerson = this.plansList.insured;
        }else{
          this.$router.push('/weibo/insure-illIntro');
        }
      },
      cancalAdd(){
        this.addAlertShow = false;
        this.addPerson = null;
      },
      addPlanSuc(){
        this.cancalAdd();
        sessionStorage.removeItem('myPlanInfo');
        this.getPlanList();

      },
      showClauseAlert(idx){
        this.alertClauseShow = true;
        this.alertIndex =idx;

      },
    }
  }
</script>
<style>
  .share-QA .myfqas .sina_radius_bg{
    margin: 0 20px;
    box-shadow:none;
  }
</style>
<style lang="scss" scoped>
  @import "../css/mixin";
  .sina_page{
    padding-bottom: 204px;
    .head-wrap{
      position: relative;
      color: #fff;
      .public-number{
        position: absolute;
        left: 0;
        top: 30px;
        min-width: 420px;
        height: 72px;
        line-height:72px;
        font-size: 38px;
        text-align: center;
        background: #ffa500;
        border-radius: 0 36px 36px 0;
        padding: 0 30px;
      }
      .public-date{
        position: absolute;
        left: 30px;
        top: 120px;
      }
      .past_public{
        position: absolute;
        top: 40px;
        right: 30px;
        font-size: 24px;
        color: #fff;

      }
    }
    .plan_types{
      color: #939393;
      background: #fff;
      font-size: 28px;
      display: flex;
      text-align: center;
      .plan_type{
        position: relative;
        padding: 30px 0;
        flex: 1;
        &:after {
          content: "";
          @include cl;
          bottom: 16px;
          width: 0px;
          height: 4px;
          background-color: transparent;
          transition: all .3s;
        }
        &.active {
          font-weight: bold;
          color: $primary;
          &:after {
            width: 50px;
            background-color: $primary;
          }
        }
      }
    }

    .share_cont{
      margin: 20px 20px 0;
      .share_radiusbg{
        background: #fff;
        border-radius:20px;
        &.public_cells {
          padding: 40px 0;
          .public_cell {
            position: relative;
            .nums{
              font-size: 38px;
              font-weight: bold;
              line-height: 54px;
            }
            .feiyantxt{
              color: #939393;
            }
          }
          &.hasarrow{
            padding-right: 30px;
          }
          &.right::after{
            right: 30px;
          }
        }
        &.not_join{
          padding: 34px 80px 50px;
          text-align: center;
          img{
            width: 320px;
            margin: 0 auto;
            text-align: center;
          }
          .join_intro{
            padding: 32px 0 36px;
            color: #88A5C7;
            font-size: 22px;
          }
          .addbtn{
            font-size: 40px;
            height:88px;
            line-height: 88px;
            border-radius:50px;
          }
        }
        &.my_share{
          padding: 30px 40px 34px;
          .share_tl{
            font-size: 32px;
            font-weight: bold;
          }
          .share_info{
            margin: 34px 0;
            background:#F9F9FC;
            padding: 16px 30px;
            border-radius:20px;
            position: relative;
            font-weight: bold;
            .plan_name{
              color: #B7B6B6;
              font-size: 28px;
              padding-bottom: 24px;
            }
            .plan_money{
              font-size: 44px;
              .small{
                font-size: 24px;
              }
            }
            .plan_people{
              position: absolute;
              top: 20px;
              right: 30px;
              padding-left: 42px;
              @include level-bg-image('shareIcon1');
              background-size: 28px 30px;
              background-position: left center;
              font-size: 36px;

            }
          }
          .share_intro{
            padding-left: 34px;
            background-size: 24px 24px;
            background-position: left center;
            &.icon1{
              @include level-bg-image('shareIcon3');
            }
            &.icon2{
              margin-top: 26px;
              @include level-bg-image('shareIcon2');
            }
          }
        }
      }

    }

    .pl20{
      padding-left: 20px;
    }
  }
</style>
