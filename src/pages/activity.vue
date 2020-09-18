<template>
  <div class="sina_page" @click="jumptoUrl">
    <div class="total_money">
      <span class="money">3.00</span> 元
    </div>
    <div class="money_desc">已存入互助金余额，可抵扣分摊 <span class="hasarrow right"></span></div>
    <div  class="btn">立刻激活账户，获取更多权益</div>
  </div>
</template>

<script>
  import Api from '../utils/apiConfig'
  export default {
    name: "activity",
    data() {
      return {
        planStatus: null,
      }
    },
    mounted() {
      localStorage.setItem('channel', this.$route.query.channel || '30002');
      if (localStorage.getItem('_userToken')) {
        this.getPlanStatus();
        this.actionCount('pv');
      } else {
        this.setActionCount('pv', '-1')
      }

    },
    methods: {
      getPlanStatus() {
        this.$get(Api.getMyPolicy, {}).then(ret => {
          if (ret.code === 0) {
            if (ret.data.plan_list_state && (ret.data.plan_list_state['XL001'] == 'activated'||ret.data.plan_list_state['XL002'] == 'activated')) {
              this.planStatus = 1;
            } else {
              this.planStatus = 0;
            }
          }
          this.createTicket();
        })
      },
      createTicket() {
        this.$post(Api.createTicket, {
          sign: "3f0ce9fbe24931fb6bbdddae907263a7"
        }).then(() => {
          if (this.planStatus == 1) {
            this.useTicket();
          }else{
            this.checkedJump();
          }
        })
      },
      useTicket() {
        this.$post(Api.useTicket).then(() => {
          this.checkedJump();
        })
      },
      checkedJump(){
        //授权成功后再次进入页面 接口走完直接跳转其他页面
        if(this.$route.query.acount&&localStorage.getItem('_ACTIVECOUNT')){
          localStorage.removeItem('_ACTIVECOUNT')
          this.jumptoUrl();
        }
      },
      jumptoUrl() {
        if (!localStorage.getItem('_userToken')) {
          this.setActionCount('click', '-1');
          let returnUrl = this.$route.path +`?channel=${this.$route.query.channel}&acount=1`;
          localStorage.setItem('_ACTIVECOUNT','3f0ce');
          localStorage.setItem('returnUrl',returnUrl);
          this.$router.push('/weibo/userauth');
        } else {
          this.actionCount('click');
          this.$router.push('/weibo/insure-plan');
        }

      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./css/mixin";

  .sina_page {
    background-color: #D00018;
    @include bg-image('redPacketBg');
    background-size: 100% auto;
    background-position: center top;
    color: #000;
    position: relative;
    padding-top: 203px;
    text-align: center;

    .total_money {
      width: 100%;

      font-size: 30px;
      line-height: 140px;

      .money {
        font-size: 100px;
        color: #FF8200;
      }
    }

    .money_desc {
      padding-top: 14px;

      .hasarrow::after {
        width: 12px;
        height: 12px;
        margin-top: -6px;
        border-color: #000;
      }
    }

    .btn {
      @include cl;
      top: 50%;
      margin-top: 100px;
      width: 560px;
      height: 100px;
      display: inline-block;
      background: rgba(255, 222, 161, 1);
      box-shadow: 0px 4px 12px 0px rgba(214, 3, 3, 1);
      border-radius: 50px;
      color: #FF551A;
      font-size: 32px;
      text-align: center;
      line-height: 100px;
    }
  }
</style>
