<template>
  <div class="sina_page" :class="{ hasclause_bot: type == '1', nocansroll:alertShow}">
    <p  class="pagetitle" v-if="cid"><b>{{clauseNames[cid]}}</b></p>
    <transition name="fade">
      <sina-health v-if="cid == 0"></sina-health>
      <sina-member v-if="cid == 1"></sina-member>
      <paln-rule v-if="cid == 2"></paln-rule>
      <template v-if="cid == 3">
        <div class="sina_clause">
          <p>微梦创科网络科技（中国）有限公司（下称“微梦公司”）</p>
          <p>本人授权北京必互科技有限公司，根据本人加入的“新浪互助”相关保障计划公布的每期分摊金额，代本人向微梦公司发起的扣款指令，从微梦公司提供的扣款渠道中扣款，用于支付本人应分摊的金额。</p>
        </div>
      </template>
      <accident-rule v-if="cid == 4"></accident-rule>
      <acc-health v-if="cid == 5"></acc-health>
      <feiyan-rule v-if="cid== 6"></feiyan-rule>
    </transition>
    <div class="clause_bot" v-if="type == '1'">
      <div class="txtcont">
        请认真阅读文件内容，特别是责任免除、争议解决条款我已阅读并同意
        <a href="javascript:;" @click="showAlert(1)" class="col_a">《成员规则》</a>
        <!--                <a href="javascript:;" @click="showAlert(0)" class="col_a">《健康要求》</a>-->
        <a href="javascript:;" @click="showAlert(3)" class="col_a">《授权代扣委托书》</a>
        <a href="javascript:;" @click="showAlert(2)" class="col_a">《计划条款》</a>
      </div>
      <div class="bot_btns">
        <div class="bot_btn" @click="noagree()">不符合要求</div>
        <div class="bot_btn primary" @click="agree()">符合要求，签约加入</div>
      </div>
    </div>
    <transition name="fade">
      <div class="sina_mark" v-if="alertShow && alertClause ">
        <div class="clause-alert">
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
          <div class="alertbtn">
            <button class="sina_btn primary radius " @click="alertShow=!alertShow">已阅读并同意</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import sinaHealth from './health'
  import sinaMember from './member'
  import palnRule from './planRule'
  import accidentRule from './accidentRule'
  import accHealth from './accHealth'
  import feiyanRule from './feiyanRule'
  import Api from "../../utils/apiConfig";
  import {mixinActions} from '../../assets/js/mixinActions'

  export default {
    name: 'clauseMain',
    components: {
        feiyanRule,accHealth,
      sinaHealth, sinaMember, palnRule,accidentRule
    },
    mixins: [mixinActions],
    data() {
      return {
        headOpt: {
          name: "健康要求",
          backBtn: true
        },
        type: '0',
        cid: '0', //条约id 0 健康要求 1 成员规则 2计划条款 3付款授权
        clauseNames: ['重疾计划健康告知', '新浪互助会员公约', '新浪互助重疾计划章程', '授权代扣委托书','新浪互助意外医疗计划章程','意外医疗健康告知','新浪-新型冠状病毒互助计划章程'],
        alertShow: false,
        alertClause: null
      }
    },
    mounted() {
      this.cid = this.$route.query.cid || '0';
      this.getName();
      this.type = this.$route.query.type || '0';
      // if (this.type == '1') {
      //   this.actionCount('pv')
      //   sessionStorage.setItem('_planisOver', 'join');
      // }
    },
    computed: {
      headerShow() {
        return this.$store.state.headerShow;
      }
    },
    methods: {
      getName() {
        this.headOpt.name = this.clauseNames[this.cid];
        document.title = this.headOpt.name;
      },
      showAlert(id) {
        this.alertShow = true;
        this.alertClause = {
          id: id,
          title: this.clauseNames[id]
        }
      },
      noagree() {
        this.actionCount('no_click');
        this.$sinaAlert({
          title: '非常抱歉，申请人不符合 健康要求，暂不能加入',        //提醒文字
          onlyHasTitle: true, // 是否只有标题
          showClose: false,        // 关闭按钮
          cancelButtonText: '重新确认', //确认文字
        })
      },
      agree() {
        this.actionCount('yes_click');
        sessionStorage.setItem('_planisOver', 'agree');
        this.$post(Api.bindWallet).then(ret => {
          if (ret.code == 0) {
            if (ret.data.state == 'not_bind') {
              window.location.href = ret.data.url;
            } else if (ret.data.state == 'has_activated') {
              this.$router.push('/weibo/insure-paysuc');
            }
          } else {
            this.$toast(ret.msg || "请求失败，请刷新重试");
          }

        })
      }

    },
    destroyed() {
      this.$clearsinaAlert()
    }
  }
</script>

<style lang="scss" scoped>
  @import "../css/mixin";

  .sina_page {
    background: #fff;
    .pagetitle{
      padding: 20px 0 12px;
      font-size: 28px;
      text-align: center;
    }
    .sina_clause {
      font-size: 24px;
      padding: 0 30px ;
      line-height: 1.5;

      p {
        padding: 8px 0;
      }

      .strong {
        font-weight: 600;
      }
    }

    &.hasclause_bot {
      padding-bottom: 226px;
    }

    &.nocansroll {
      overflow-y: hidden;
    }

    .clause_bot {
      position: fixed;
      bottom: 0;
      left: 0;
      background: #fff;
      background: $col_bg;

      .txtcont {
        padding: 26px 30px;
        line-height: 1.6;
      }

      .bot_btns {
        width: 100%;
        @include fj();

        .bot_btn {
          @include flex(1);
          height: 98px;
          line-height: 98px;
          font-size: 32px;
          text-align: center;
          color: #939393;
          background: #fff;

          &.primary {
            background: $primary;
            color: #fff;
          }
        }
      }

    }

    .sina_mark {
      position: fixed;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      background: rgba(0, 0, 0, .8);

      .clause-alert {
        width: 100%;
        height: 70%;
        padding-bottom: 104px;
        position: fixed;
        bottom: 0;
        left: 0;
        background: #fff;
        border-radius: 20px 20px 0px 0px;
        overflow-y: auto;

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
  }
</style>
