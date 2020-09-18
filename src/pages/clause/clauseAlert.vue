<template>
  <transition name="fade">
    <div class="sina_mark" v-if="alertShow && alertClause ">
      <div class="clause-alert" :class="{hastabs:show}">
        <div class="clause_tabs" v-if="show">
          <div class="clause_tab" :class="{active:tabIndex==0}" @click="clickTab(0)">大病互助计划</div>
          <div class="clause_tab" :class="{active:tabIndex==1}" @click="clickTab(1)">意外互助计划</div>
        </div>
        <div class="title">{{alertClause.title}}</div>
        <sina-health v-if="alertClause.id == 0"></sina-health>
        <sina-member v-if="alertClause.id == 1"></sina-member>
        <paln-rule v-if="alertClause.id == 2"></paln-rule>
        <template v-if="alertClause.id == 3">
          <div class="sina_clause">
            <p>微梦创科网络科技（中国）有限公司（下称“微梦公司”）</p>
            <p>本人授权北京必互科技有限公司，根据本人加入的“新浪互助”相关保障计划公布的每期分摊金额，代本人向微梦公司发起的扣款指令，从微梦公司提供的扣款渠道中扣款，用于支付本人应分摊的金额。</p>
          </div>
        </template>
        <accident-rule v-if="alertClause.id == 4"></accident-rule>
        <acc-health v-if="alertClause.id == 5"></acc-health>
        <feiyan-rule v-if="alertClause.id == 6"></feiyan-rule>
        <privacy-policy v-if="alertClause.id == 7"></privacy-policy>
        <div class="alertbtn">
          <button class="sina_btn primary radius " @click="closeClauseAlert">已阅读并同意</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import sinaHealth from './health'
  import sinaMember from './member'
  import palnRule from './planRule'
  import accidentRule from './accidentRule'
  import AccHealth from "./accHealth";
  import feiyanRule from './feiyanRule'
  import privacyPolicy from './privacyPolicy'
  export default {
    name: "clauseAlert",
    components: {
      AccHealth,feiyanRule,
      sinaHealth, sinaMember, palnRule,accidentRule,privacyPolicy
    },
    props:{
      alertShow: false,
      alertIndex: null,

    },
    data() {
      return {
        clauseNames: ['重疾计划健康告知', '新浪互助会员公约', '新浪互助重疾计划章程', '授权代扣委托书','新浪互助意外医疗计划章程','意外医疗健康告知','新浪-新型冠状病毒互助计划章程',"会员隐私政策"],
        alertClause: null,
        show:false,
        tabIndex : 0
      }
    },
    mounted() {
      if (this.alertIndex == 2||this.alertIndex == 4) {
        this.show = true
      }
      if (this.alertIndex == 0||this.alertIndex == 5) {
        this.show = true
      }
      this.alertClause = {
        id: this.alertIndex,
        title: this.clauseNames[this.alertIndex]
      }
    },
    methods:{
      closeClauseAlert(){
        this.$emit('closeClauseAlert')
      },
      clickTab(idx){
        this.tabIndex = idx;
        if(this.alertIndex==2 || this.alertIndex==2){
          if (this.tabIndex == 0) {
            this.alertClause = {
              id: 2,
              title: this.clauseNames[2]
            }
          }
          if (this.tabIndex == 1) {
            this.alertClause = {
              id: 4,
              title: this.clauseNames[4]
            }
          }
        }
        if(this.alertIndex==0 || this.alertIndex==5){
          if (this.tabIndex == 0) {
            this.alertClause = {
              id: 0,
              title: this.clauseNames[0]
            }
          }
          if (this.tabIndex == 1) {
            this.alertClause = {
              id: 5,
              title: this.clauseNames[5]
            }
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sina_mark {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 9998;
    background: rgba(0, 0, 0, .8);

    .clause-alert {
      width: 100%;
      height: 90%;
      padding-bottom: 104px;
      position: fixed;
      bottom: 0;
      left: 0;
      background: #fff;
      border-radius: 20px 20px 0px 0px;
      z-index: 9999;
      overflow-y: auto;
      &.hastabs{
        padding-top: 126px;
      }

      .clause_tabs{
        width: 100%;
        background: #fff;
        position: fixed;
        top: 10%;
        left: 0;
        font-size: 36px;
        text-align: center;
        padding: 26px 0;
        display: flex;
        .clause_tab{
          flex: 1;
          padding: 10px 0;
          position: relative;
          &:after{
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width:0px;
            height:6px;
            background:transparent;
            transition: all .3s;
          }
          &.active{
            color: #ff8200;
            &:after{
              width:56px;
              background: #ff8200;
            }

          }
        }
      }
      .title {
        font-size: 36px;
        text-align: center;
        padding: 36px 0;
      }

      .sina_clause {
        padding: 0 30px 30px;
        overflow-y: auto;
      }

      .alertbtn {
        position: fixed;
        padding: 0 30px 20px;
        width: 100%;
        left: 0;
        bottom: 0;
        background: #fff;
      }
    }
  }
</style>
