<template>
  <div class="financeLogin">
    <img src="http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/adImgs/financeAlert.gif"
         v-if="subSource=='61339711'"
         @click="showFinanceAlert" />
    <div class="hasTitle" v-if="subSource=='73965531'">
      <!-- <div class="title">互助用户专享福利</div> -->
      <img src="http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/adImgs/financeImg.png"
           @click="showFinanceAlert">
    </div>
    <div class="financeAlert" v-if="financeShow">
      <div class="toast-mask"></div>
      <div class="finance_cont">
        <div class="close_btn" @click="cancalAction"></div>
        <!-- <div class="title">手机号码绑定授权</div> -->
        <div class="text-desc">
          <p>新浪互助用户专享借钱平台</p>
          <p>申请授权您新浪互助账号绑定的手机号：</p>
          <div class="mobile">{{financeMobile}}</div>
        </div>
        <div class="cont_btns" >
          <button class="sina_btn default  radius cont_btn"  @click="cancalAction()">暂不授权</button>
          <button class="sina_btn primary radius cont_btn"  @click="sumbitAction()">确认授权</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import Api from '../../utils/apiConfig';
  export default {
    name: "financeLogin",
    props:{
      financeMobile:null,
      subSource:null,
    },
    data(){
      return{
        financeShow:false,
      }
    },
    created(){
      this.actionCount(`finance_pv_${this.subSource}`);
    },
    methods:{
      showFinanceAlert(){
        this.actionCount(`financeBanner_click_${this.subSource}`);
        this.financeShow = true;
      },
      cancalAction(){
        this.financeShow = false;
      },
      sumbitAction(){
        this.actionCount(`finance_sumbit_click_${this.subSource}`);
        this.$post(Api.finance_login,{subSource: this.subSource}).then(ret=>{
          if (ret.code == '0') {
            this.cancalAction();
            window.location.href = ret.login_url;
          }else{
            this.$toast(ret.msg)
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .hasTitle{
    padding: 0 12px 0;
    .title{
      font-size: 32px;
      padding-bottom: 30px;
    }
  }
  .finance_cont{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #FFFFFF;
    border-radius: 20px 20px 0px 0px;
    z-index: 9998;
    padding: 50px 50px 65px;
    text-align: left;
    .close_btn{
      position: absolute;
      top: 30px;
      right: 30px;
      width: 28px;
      height: 28px;
      background: url("../images/sinaAlertClose_2x.png") center;
      background-size: 28px 28px;
    }
    .title{
      text-align: center;
      font-size: 30px;
      font-weight: bold;
    }
    .text-desc{
      padding-top: 36px;
      p{
        padding-top: 10px;
      }
      .mobile{
        padding-top: 42px;
        font-size: 56px;
        font-weight: bold;
      }
    }
    .cont_btns{
      display: flex;
      margin-top: 70px;
      .cont_btn{
        flex: 1;
        height: 78px;
        line-height:78px;
        &:first-child{
          margin-right: 70px;
        }
      }
    }
  }
</style>
