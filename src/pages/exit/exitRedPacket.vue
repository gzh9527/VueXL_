<template>
  <div class="sina_page">
    <div class="red_top_bg" >
      <div class="mess_status" ><span v-if="saveState">已收到你的反馈</span></div>
    </div>
    <div class="give_tips exit-infos">
      <div class="exit_txt_tips"><i>特别提醒</i> 公示当天退出，如当期有案件公示，也需要进行费用分摊</div>
      <div class="exit_now">如果现在退出：</div>
      <div class="exit_cells" >
        <div class="exit_cell" v-if="planCode == 'XL001'">再加入将重新计算<span class="col_primary">180天观察期</span></div>
        <div class="exit_cell" v-if="planCode == 'XL002'">再加入将重新计算<span class="col_primary">30天等待期</span></div>
        <div class="exit_cell">再加入需<span class="col_primary">重新确认健康要求</span></div>
      </div>
      <div class="tips_info">
        <div class="tips_title">仍然要离开新浪互助大家庭吗？</div>
        <div class="footer_btns">
          <div class="sina_btn default radius line medium" @click="giveupEvt">确认放弃</div>
          <div class="sina_btn primary radius medium" @click="cancalGiveup">我再想想</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Api from "../../utils/apiConfig";

  export default {
    name: "exitRedPacket",
    data() {
      return {
        redPacketShow: false, // 红包是否显示
        alertShow: false,
        redOpen: false,
        id: null, // 保单号
        policyUuid: null,
        saveState: false, // 调查问卷 保存状态
        planCode: null,
        actionName: '', //埋点action
      }
    },
    created() {
      this.id = this.$route.query.id;
      if (!this.$route.query.id || this.$route.query.id == '' || !this.$route.query.uuid || this.$route.query.uuid == '') {
        this.$router.replace(`/weibo/insure-plan`);
        return;
      }
      this.getLeaveReasonState();
      this.planCode = this.$route.query.planCode || 'XL001';
      this.actionName = this.planCode == 'XL001' ? '' : '2';
      this.policyUuid = this.$route.query.uuid;
      this.actionCount('pv' + this.actionName);
    },
    methods: {
      // 调查问卷 保存状态
      getLeaveReasonState() {
        this.$get(Api.getLeaveReasonState).then(ret => {
          if (ret.code == 0) {
            ret.data.state_list.forEach(item => {
              if (item.plan_code == this.planCode) {
                this.saveState = true;
              }
            })
          }
        })
      },
      //领取红包
      getRedpacket() {
        this.redOpen = true;
      },
      //我再想想
      cancalGiveup() {
        this.actionCount('cancelBtn_click' + this.actionName, () => {
          if (this.id) {
            this.$router.push(`/weibo/insure-detail?id=${this.id}`);
          } else {
            this.$router.push(`/weibo/insure-plan`);
          }
        })
      },
      //我还想放弃 退出计划
      giveupEvt() {
        this.$get(Api.getLeaveTicketShow, {plan_code: this.planCode, customerno: this.policyUuid}).then(ret => {
          if (ret.code == 0) {
            this.actionCount('sumbitBtn_click' + this.actionName, () => {
              if (ret.data.is_show && ret.data.is_show == 1) {
                this.$sinaConfirm({
                  title: '守望相助，依依不舍',        //提醒文字
                  onlyHasTitle: false,
                  desc: '<div class="exit_redPacketBg"></div>',
                  showClose: false,        // 关闭按钮
                  confirmButtonText: '忍痛弃领，退出',
                  cancelButtonText: '去领红包',
                }).then(() => {
                  this.actionCount('oneCancel_click' + this.actionName);
                  this.delPolicy();
                }).catch(() => {
                  //去领红包
                  this.createLeaveTicket();
                  this.actionCount('oneSumbit_click' + this.actionName);
                });
              } else {
                this.delPolicy();
              }
            });
          } else {
            this.$toast(ret.msg || "请求失败，请刷新重试");
          }
        })

      },
      //创建红包
      createLeaveTicket() {
        this.$sinaConfirm({
          title: '恭喜获得分摊红包',        //提醒文字
          onlyHasTitle: false,
          desc: `<div class="exit_money"><div class="exit_redPacketBg"></div></div>`,
          showClose: false,        // 关闭按钮
          confirmButtonText: '关闭',
          cancelButtonText: '查看我的红包',
        }).then(() => {
          this.actionCount('twoCancel_click' + this.actionName)
        }).catch(() => {
          this.actionCount('twoSumbit_click' + this.actionName,()=>{
            this.$router.push('/weibo/redpacket')
          });
        });
        this.$post(Api.createLeaveTicket, {customerno: this.policyUuid}).then(ret => {
          if (ret.code == 0) {
            let money = ret.data.worth;
            document.getElementsByClassName('exit_money')[0].innerHTML = `<div  class="exit_redPacketBg bg2 "><span class="money ">${money}</span>元</div>`;
          } else {
            this.$toast(ret.msg || "请求失败，请刷新重试");
          }
        })
      },
      //退出计划
      delPolicy() {
        let uuid = this.$route.query.uuid;
        this.$post(Api.deletePolicy, {
          policy_uuid: uuid,
          plan_code: this.planCode
        }).then(ret => {
          if (ret.code === 0) {
            sessionStorage.removeItem('myPlanInfo');
            this.$router.replace(`/weibo/exit-suc?planCode=${this.planCode}`);
          } else {
            this.$toast(ret.msg || "请求失败，请刷新重试");
          }
        })

      }
    },
    destroyed() {
    }
  }
</script>

<style lang="scss" scoped>
  @import "../css/mixin";

  .sina_page {
    background: #fff;

    .red_top_bg {
      background: #f2f2f2;
      padding: 20px 20px 30px;

      .mess_status {
        margin: 20px auto 0;
        height: 48px;
        width: 210px;
        line-height: 48px;
        font-size: 22px;
        color: #fff;
        span{
          text-align: center;
          width: 210px;
          background: rgba(210, 210, 210, 1);
          border-radius: 24px;
          display: inline-block;
          margin: 0 auto;
        }
      }
    }

    .give_tips {
      .tips_info {
        padding: 0 10px;

        .tips_title {
          padding-top: 60px;
          font-size: 36px;
          font-weight: bold;
          padding-bottom: 36px;
        }
        .footer_btns {
          padding-top: 0px;
          padding-left: 0px;
        }
      }

    }

  }


</style>
