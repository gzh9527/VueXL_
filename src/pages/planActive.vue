<template>
    <div class="sina_page back_fff">
        <div class="sina_cont">
            <div class="suc_cont">
                <div class="txt">互助权益待激活</div>
                <div class="href">你尚未开通新浪支付<br/>开通新浪支付并授权免密代扣才能生效互助权益</div>
            </div>
            <div class="active_btn">
                <button class="sina_btn primary radius" @click="sinaActive">立即激活</button>
            </div>
        </div>
        <my-service bottom="true"></my-service>
    </div>
</template>

<script>


    import myService from '../components/myService'
    import Api from "../utils/apiConfig";

    export default {
        name: "planActive",
        components: {
             myService
        },
        data() {
            return {
              planCode: null,
            }
        },

        mounted() {
          this.planCode = this.$route.query.planCode ? this.$route.query.planCode : 'XL001';
          this.actionCount('pv');
        },
        methods:{
            sinaActive(){
              this.actionCount('click');
              this.$post(Api.bindWallet,{plan_code:this.planCode,insuchannel:this.$route.query.insuchannel}).then(ret=>{
                if (ret.code == 0) {
                  if (ret.data.state == 'not_bind') {
                    window.location.href = ret.data.url;
                  } else if (ret.data.state == 'has_activated') {
                      if(this.planCode == 'XL003'){
                          this.$router.push('/weibo/feiyan-paysuc?insuchannel='+this.$route.query.insuchannel);
                      }else{
                          this.$router.push('/weibo/insure-paysuc');
                      }

                  }
                } else {
                  this.$toast(ret.msg || "请求失败，请刷新重试");
                }
              })
            }

        }
    }
</script>

<style lang="scss" scoped>
    @import "css/mixin";

    .suc_cont {
        margin: 0px auto 64px;
        text-align: center;
        padding-top: 166px;
        @include bg-image('sinaPlanActive');
        background-size: 76px 76px;
        background-position: center 90px;

        .suc_icon {
            width: 76px;
        }

        .txt {
            padding: 28px 0 20px;
            font-size: 34px;
            line-height: 48px;
            font-weight: 600;
        }

        .href {
            color: $primary;
            line-height: 1.6;
        }

    }

    .active_btn{
        margin: 140px 0  30px;
    }
</style>
