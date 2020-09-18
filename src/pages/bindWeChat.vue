<template>
  <div class="sina_page">
    <div class="head_card">
      <img class="bg_img" src="./images/bindWeChatCard_2x.png">
      <div class="icon"></div>
      <div class="user_info">
        <img class="headimg" :src="weiboInfo&&weiboInfo.profile_image_url">
        <div class="nickname">{{weiboInfo&&weiboInfo.screen_name}}</div>
      </div>
      <div class="user_info right">
        <img class="headimg" :src="weChatInfo&&weChatInfo.headimg">
        <div class="nickname">{{weChatInfo&&weChatInfo.nickname}}</div>
      </div>
    </div>
    <div class="sina_cont">
      <div class="txt-intro">以下家人将绑定到此微博账户下，后续扣费将从微博支付扣费</div>
      <div class="person_cells" v-if="weChatInfo">
        <template v-for="(item,idx) of weChatInfo.contract_info">
          <div class="person_cell" :key="idx">{{item.name}} <span class="icon">{{item.relation}}</span></div>
        </template>

      </div>
      <div class="check_box primary bg3" :class="{checked:isChecked}" @click.stop="isChecked=!isChecked">
        关注@新浪互助 获取互助公示、章程等信息
      </div>
      <button class="sina_btn primary radius bind_btn" @click="payBind">绑定并授权支付</button>
    </div>
    <div class="sina_bot_ab">
      <my-service></my-service>
    </div>

  </div>
</template>

<script>
  import myService from "../components/myService";
  import Api from "../utils/apiConfig";

  export default {
    name: "bindWeChat",
    components: {
        myService,
    },
    data(){
      return{
        isChecked:true,
        weiboInfo:null,
        weChatInfo:null
      }
    },
    created() {
      this.getWeiboInfo();
      this.getContractInfo();
    },
    methods:{       
      getContractInfo(){
        this.$get(Api.getContractInfo, {contract_no:this.$route.query.contno},true).then(res => {
          this.weChatInfo = res;
        })
      },
      followEvt(){
        //关注新浪互助
        if(this.isChecked){
          this.$post(Api.subscribe);
        }
      },
      payBind(){
        this.followEvt();
        this.$post(Api.payAuth, {contno:this.$route.query.contno,e_uid:this.$route.query.e_uid}).then(ret => {
          if (ret.code == 0) {
            if (ret.data.state == 'not_bind') {
              window.location.href = ret.data.url;
            } else if (ret.data.state == 'has_activated') {
              this.$router.push('/weibo/insure-paysuc');
            }
          } else {
            this.$toast(ret.msg || "请求超时，请刷新重试");
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./css/mixin";

  .sina_page {
    background: #fff;
    padding-bottom: 204px;
    .head_card{
      position: relative;
      margin: 30px 30px 40px;
      min-height: 260px;
      .bg_img{
        position: absolute;
        width: 100%;
        top: 0;
      }
      .icon{
        @include center;
        width: 120px;
        height: 60px;
        @include bg-image('bindWeChatIcon');
        background-size: 120px 60px;
      }
      .user_info{
        position: absolute;
        left: 90px;
        top:40px;
        width: 120px;
        .headimg{
          width: 120px;
          height: 120px;
          border-radius: 50%;
        }
        .nickname{
          text-align: center;
          font-size: 30px;
          color: #fff;
          padding-top: 14px;
          @include single-line
        }
        &.right{
          right: 90px;
          left: auto;
        }
      }
    }
    .txt-intro{
      padding-top: 50px;
      color: #B7B6B6;
    }
    .person_cells{
      .person_cell{
        padding: 38px 0 52px;
        border-bottom: 1px solid #E6E6E6;
        font-size: 34px;
        font-weight: bold;
        &:last-child{
          border-bottom:0;
        }
        .icon{
          display: inline-block;
          height:36px;
          line-height: 36px;
          color: $primary;
          padding: 0 22px;
          font-size: 22px;
          border-radius:18px;
          border:1px solid $primary;
          margin-left: 30px;
        }
      }
    }
    .check_box {
      margin: 124px 0 20px 100px;
      color: #507DAF;
    }
    .sina_btn.bind_btn{
      height: 100px;
      line-height: 100px;
      font-size: 40px;
      border-radius:50px;
    }

  }
</style>
