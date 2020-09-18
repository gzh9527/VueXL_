<template>
  <div class="sina_page">
    <div class="sina_hasbg">
      <img src="./images/editAmntTopBg.jpg">
      <div class="money"><span class="value">{{planAmnt}}</span>万</div>
      <div class="edit_banner">
        <div class="bg">
          <div class="title">设置大病互助金额度</div>
          <div class="btns">
            <div class="btn sub" @click="updateVal('sub')"></div>
            <div class="txt_con"><span class="value">{{updateAmnt}}</span>万</div>
            <div class="btn add" @click="updateVal('add')"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="sina_cont">
      <button class="sina_btn primary radius max" @click="showAlert">调整额度</button>
      <div class="edit_desc">
        <p>*降额立即生效，升额部分需重新计算180天观察期</p>
        <p>*分摊金额与受助额度成比例增加或减少</p>
      </div>
    </div>
    <div class="bot_href" @click="checkDetail">调额记录</div>
  </div>
</template>

<script>
  import Api from "@/utils/apiConfig";

  export default {
    name: "editAmnt",
    data() {
      return {
        planCode: 'XL001',
        customerNo: '',
        alertShow: true,
        planAmnt: 0,
        updateAmnt: 0,
      }
    },
    created() {
      // this.actionCount('pv');
      this.planCode = this.$route.query.planCode || 'XL001';
      this.customerNo = this.$route.query.customerNo;
      if (this.customerNo) {
        if (!sessionStorage.getItem('myPlanInfo')) {
          this.getPlanList();
        } else {
          let myPlanInfo = JSON.parse(sessionStorage.getItem('myPlanInfo'));
          myPlanInfo.dataList.forEach(item => {
            if (item.insured.customerno == this.customerNo) {
              item.plans.forEach(plan => {
                if (plan.plan_code == this.planCode) {
                  this.planAmnt = plan.amnt;
                  this.updateAmnt = plan.amnt;
                  return;
                }
              })
            }
          });
        }
      } else {
        this.$router.replace(`/weibo/insure-plan`);
      }

    },
    methods: {
      getPlanList() {
        this.$get(Api.getPolicyList, {}).then(ret => {
          if (ret.code == 0) {
            let myPlanInfo = ret.data.policy_list;
            myPlanInfo.forEach(item => {
              if (item.insured.customerno == this.customerNo) {
                item.plans.forEach(plan => {
                  if (plan.plan_code == this.planCode) {
                    this.planAmnt = plan.amnt;
                    this.updateAmnt = plan.amnt;
                    return;
                  }
                })
              }
            });
          }
        })
      },
      updateVal(type) {
        let val = this.updateAmnt;
        if (type == 'sub') {
          val -= 2.5;
          val < 5 ? val = 5 : null;
        } else {
          val += 2.5;
          val > 40 ? val = 40 : null;
        }
        this.updateAmnt = val;
      },
      showAlert() {
        if (this.updateAmnt == this.planAmnt) {
          this.$toast('额度没有修改，请修改额度');
          return;
        }
        this.$sinaAlert({
          title: '调整额度',        //提醒文字
          onlyHasTitle: false,
          desc: `<div class="alert_ul edit_amnt">
                  <p class="alert_li">分摊费用从<span class="col_primary">2020年09月14日</span>起按新的互助金额度进行分摊 </p>
                  <p class="alert_li">降额立即生效，升额部分需重新计算180天观察期</p>
                </div>`,
          cancelCallback: this.sumbitEdit,
          showClose: false,        // 关闭按钮
          confirmButtonText: '我再想想',
          cancelButtonText: '立即调额',
        })
      },
      sumbitEdit() {
        let op_type = '';
        if (this.updateAmnt > this.planAmnt) {
          op_type = 'up';
        } else {
          op_type = 'down';
        }
        this.$post(Api.adjustCoverage, {
          "plan_code": this.planCode,
          "customerno": this.customerNo,
          "amnt": this.updateAmnt * 10000,
          "op_type": op_type
        }).then(ret => {
          if (ret.code == 0) {
            this.$router.push({
              path:'/weibo/amnt-suc',
              query:this.$route.query
            })
          } else {
            this.$toast(ret.msg || "请求超时，请刷新重试");
          }
        })
      },
      checkDetail() {
        this.$router.push('/weibo/amnt-list')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../css/mixin";

  .sina_page {
    background: #fff;

    .sina_hasbg {
      padding-bottom: 254px;
      background: url("./images/editAmntTopShadow.png") no-repeat center bottom;
      background-size: 100% auto;
      position: relative;

      .money {
        width: 100%;
        height: 140px;
        line-height: 140px;
        font-size: 26px;
        color: #fff;
        text-align: center;
        @include cl;
        top: 160px;

        .value {
          font-size: 100px;
        }
      }

      .edit_banner {
        position: absolute;
        top: 444px;
        left: 0;
        width: 100%;

        .bg {
          border-radius: 20px;
          padding: 30px 40px 58px;
          margin: 0 30px;
          background: #fff;
          font-size: 26px;

          .title {
            font-size: 32px;
          }

          .btns {
            padding: 44px 110px 0;
            display: flex;
            align-items: center;

            .btn {
              width: 50px;
              height: 50px;
              background-size: 50px 50px;

              &.add {
                background-image: url("./images/editAmntAddBtn.png");
              }

              &.sub {
                background-image: url("./images/editAmntSubBtn.png");
              }
            }

            .txt_con {
              flex: 1;
              height: 112px;
              line-height: 112px;
              text-align: center;
              font-size: 26px;

              .value {
                font-size: 80px;
              }
            }
          }
        }
      }
    }

    .edit_desc {
      line-height: 34px;
      padding-top: 20px;
      padding-left: 20px;
      color: #939393;
      font-size: 22px;

      p {
        padding-bottom: 6px;
      }
    }

    .bot_href {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      padding: 40px 0;
      color: $primary;
      font-size: 26px;
      text-align: center;
    }
  }
</style>
