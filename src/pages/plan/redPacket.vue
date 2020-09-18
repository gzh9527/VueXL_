<template>
  <div class="sina_page">
    <div class="money_bg">
      <div class="desc">互助金余额（分摊优先抵扣）</div>
      <div class="money">￥<span class="max">{{money}}</span></div>
    </div>
    <div class="redpackge_title">领券中心</div>
    <div class="banner_cells">
      <img class="banner_cell" @click="jumpUrl('add')"
           src="http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/redpack/myRedpackBanner1.png">
      <img class="banner_cell" @click="jumpUrl('share')"
           src="http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/redpack/myRedpackBanner2.png">
    </div>
    <div class="redpackge_title hasarrow min right">可用优惠券 <span class="right_txt fr " @click="showInvalid">已失效</span></div>
    <redpack-list ticketType="valid"></redpack-list>
    <div class="fixed_bot">
      <button class="sina_btn primary radius max" @click="joinPlan()">查看我的互助</button>
    </div>
  </div>
</template>

<script>
  import Api from '@/utils/apiConfig'
  import redpackList from '@/components/redpackList/redpackList'

  export default {
    name: "redPacket",
    components: {
      redpackList
    },
    data() {
      return {
        ticketList: null,
        invalidList: null,
        useList: null,
        tabName: '1',
        money: '0',
      }
    },
    created() {
      this.getTicketList();
      this.getBalance();
    },
    methods: {
      getBalance() {
        this.$get(Api.getBalance).then(ret => {
          if (ret.code == 0) {
            this.money = ret.data ? parseFloat(ret.data).toFixed(2) : '0.00';
          }
        })
          this.actionCount('pv');
      },
      getTicketList() {
        let apiName = ['getInvalidTicketList', 'getTicketList'];
        this.$get(Api[apiName[this.tabName]], {page: 1}).then(ret => {
          if (ret.code == 0) {
            this.ticketList = ret.data.list;
            this.tabName == '1' ? this.useList = this.ticketList : this.invalidList = this.ticketList;
          }
        })
      },
      changTab(type) {
        this.tabName = type;
        this.ticketList = null;
        this.tabName == '1' ?
          this.ticketList = this.useList :
          this.invalidList ? this.ticketList = this.invalidList : this.getTicketList();
      },

      jumpUrl(type) {
        if (type == 'add') {
          this.actionCount('AddFamily_click1');
          this.$router.push('/weibo/insure-add?channel=50002');
        } else if (type == 'share') {
          this.actionCount('AddFriend_click1');
          this.$router.push('/weibo/activity-valent?channel=30057');
        }
      },
      showInvalid(){
       this.actionCount('invalid_coupon');
        this.$router.push('/weibo/invalid-ticket')
      },
      joinPlan() {
        this.actionCount('look_mySina');
        this.$router.push('/weibo/insure-plan');
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../css/mixin";

  .sina_page {
    padding-bottom: 200px;

    .money_bg {
      min-height: 260px;
      background: url("http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/redpack/redpackTopBg.jpg") $primary no-repeat;
      background-size: 100% auto;
      padding: 50px 0 0 50px;
      color: #fff;
      font-size: 26px;

      .money {
        padding-top: 18px;
        font-size: 32px;
        line-height: 116px;
        .max {
          font-size: 82px;
        }

      }
    }

    .redpackge_title {
      width: 100%;
      height: 100px;
      line-height: 100px;
      padding: 0 50px 0 30px;
      font-size: 32px;
      background: #fff;
      border-bottom: 1px solid #e6e6e6;
      position: relative;
      .right_txt {
        font-size: 24px;
        color: #939393;
        position: absolute;
        top: 0;
        right: 0;
        width: 150px;
        padding-left: 20px;
      }
    }

    .banner_cells {
      background: #fff;
      padding: 40px 30px 50px;
      white-space: nowrap;
      width: 100%;
      overflow-x: auto;
      border-bottom: 1px solid #e6e6e6;

      .banner_cell {
        margin-right: 30px;
        display: inline-block;
        width: 260px;

        &:last-child {
          margin-right: 0;
        }
      }
    }

    .fixed_bot {
      position: fixed;
      border-top: 1px solid #efefef;
      bottom: 0;
      left: 0;
      background: #fff;
      width: 100%;
      box-sizing: border-box;
      padding: 30px 20px 50px 40px;
    }
  }

</style>
