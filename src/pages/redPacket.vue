<template>
  <div class="sina_page">
    <div class="money_bg">
      <div class="desc">互助金余额（分摊优先抵扣）</div>
      <div class="money">{{money}}</div>
    </div>
    <div class="plan_types">
      <div class="plan_type" :class="{active:tabName=='1'}" @click="changTab('1')">可使用</div>
      <div class="plan_type" :class="{active:tabName=='0'}" @click="changTab('0')">已失效</div>
    </div>
    <div class="packet_list">
      <div class="nodata" v-if="ticketList&&ticketList.length==0">暂无红包</div>
      <div v-if="tabName=='0'" class="out_intro">失效红包仅显示半年内数据</div>
      <div class="packet_cells" v-if="ticketList&&ticketList.length>0">
        <template v-for="item of ticketList">
          <div class="packet_cell" :class="{used:item.state == '1',out:item.state == '2'}">
            <div class="redpacket_info" >
              <div class="money_info">
                <div class="money"><span class="num">{{item.worth}}</span>元</div>
                <div class="time">{{item.create_date}}</div>
              </div>
              <div class="time_info">
                <div class="name">{{item.name}}</div>
                <div class="time">可用时间：{{item.start_date}}{{item.expires_date?'-'+item.expires_date : '之后'}}</div>
              </div>
            </div>
            <div v-if="item.state == '0'" class="state_info hasarrow right" @click="showAlert">分摊可用（优先使用红包抵扣）</div>
            <div v-if="item.state == '1'" class="state_info">已过期</div>
            <div v-if="item.state == '2'" class="state_info">已使用</div>
          </div>
        </template>
      </div>
    </div>
    <div class="fixed_bot">
      <button class="sina_btn primary radius max"  @click="joinPlan()">查看我的互助</button>
    </div>
  </div>
</template>

<script>
  import Api from '../utils/apiConfig'

  export default {
    name: "redPacket",
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
      getBalance(){
        this.$get(Api.getBalance).then(ret => {
          if (ret.code == 0) {
            this.money = ret.data ?parseFloat(ret.data).toFixed(2) : '0.00';
          }
        })
      },
      getTicketList() {
        let apiName =['getInvalidTicketList','getTicketList'];
        this.$get(Api[apiName[this.tabName]],{page:1}).then(ret => {
          if (ret.code == 0) {
            this.ticketList =  ret.data.list;
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
      showAlert() {
        this.$sinaAlert({
          title: '红包使用细则',        //提醒文字
          onlyHasTitle: false,
          desc: `<p>1. 在可用时间内互助金分摊可抵扣，超出可用时间则红包失效；</p>
                 <p>2. 每次分摊最多使用一个红包，不可叠加使用；</p>
                 <p>3. 分摊抵扣时优先使用可使用红包中金额最高的红包。</p>
                  `,
          showClose: false,        // 关闭按钮
          cancelButtonText: '关闭',
        })
      },
      joinPlan(){
        this.$router.push('/weibo/insure-plan');
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./css/mixin";

  .sina_page {
    padding-bottom: 180px;
    .money_bg{
      min-height: 260px;
      background: url("http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/myRedpackTopBg.png") $primary no-repeat;
      background-size: 100% auto;
      padding: 50px;
      color: #fff;
      font-size: 26px;
      .money{
        padding-top: 30px;
        font-size: 36px;
      }
    }
    .plan_types {
      border-bottom: 1px solid #e6e6e6;

      .plan_type.active {
        color: #333;
      }
    }

    .packet_list {
      padding: 0 30px;
      position: relative;

      .nodata {
        @include cl;
        top: 230px;
        width: 340px;
        background: url("http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/myRedpackNoDataBg.png") no-repeat;
        background-size: 340px 311px;
        padding-top: 321px;
        color: #9FAAC1;
        text-align: center;
        font-size: 30px;
      }
      .out_intro{
        padding-top: 24px;
        text-align: center;
        color: #939393;
      }
      .packet_cells {
        position: relative;
        font-size: 22px;

        .packet_cell {
          margin-top: 30px;
          height: 230px;
          background: url("http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/myRedpackCellBg1.png") no-repeat;
          background-size: 100% 230px;

          .redpacket_info {
            display: flex;
            height: 160px;
            padding: 24px 0;

            .money_info {
              width: 214px;
              text-align: center;
              color: #fff;

              .money {
                height: 76px;
                line-height: 76px;
                font-size: 24px;

                .num {
                  font-size: 54px;
                }
              }

              .time {
                font-size: 22px;
                padding-top: 6px;
              }
            }

            .time_info {
              flex: 1;
              padding: 10px 30px 0 26px;

              .name {
                font-size: 32px;
              }

              .time {
                padding-top: 24px;
              }
            }
          }

          .state_info {
            padding: 0 40px;
            height: 70px;
            line-height: 70px;
            color: #939393;
            position: relative;

            &.hasarrow.right::after {
              right: 50px;
            }
          }

          &.used {
            background-image: url("http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/myRedpackCellBg2.png");
          }

          &.out {
            background-image: url("http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/myRedpackCellBg3.png");
          }

          &.used, &.out {
            .redpacket_info, .redpacket_info .money_info {
              color: #939393;
            }

            .state_info {
              text-align: center;
            }
          }

        }
      }
    }
    .fixed_bot{
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
