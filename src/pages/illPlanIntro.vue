<template>
  <div class="sina_page haspagebot">
    <div class="sina_hasbg">
      <div class="user_card">
        <div class="user_cont" v-if="weiboInfo">
          <div class="user_img">
            <img
              :src="weiboInfo.profile_image_url||'https://imgs.bihubao.com/Public/images/insureAdView/images/logo.png'">
          </div>
          <div class="user_info">
            <div class="name">{{userName}} | <span class="col_primary">大病互助计划</span></div>
            <div class="state" v-if="!addState">你还没有加入大病互助计划</div>
          </div>
        </div>
        <div class="state_cont">
          <div class="state_bg">
            新冠病毒互助计划
            <i class="icon"></i>
            大病互助计划
          </div>
        </div>
      </div>
    </div>
    <div class="upgrade">
      <div class="upgrade_title">升级互助权益</div>
      <div class="upgrade_cells">
        <template v-for="item of joinUserList">
          <div class="upgrade_cell " :class="{checked:item.checked}" @click="item.checked = !item.checked">
            <div class="user_relatype">{{item.relation_name}}</div>
            <div class="user_name">{{item.name}}</div>
            <div class="user_plan">大病互助计划</div>
          </div>
        </template>
      </div>
      <div class="upgrade_bot">
        <button class="sina_btn primary radius" @click.stop="oneBtnJoinEvt()">立即升级</button>
        <div class="join_desc">
          升级权益前请阅读
          <a href="javascript:;" @click="showAlert(1)" class="col_a">《会员公约》</a>
          <a href="javascript:;" @click="showAlert(0)" class="col_a">《健康告知》</a>
          <a href="javascript:;" @click="showAlert(3)" class="col_a">《授权代扣委托书》</a>
          <a href="javascript:;" @click="showAlert(2)" class="col_a">《计划章程》</a>
        </div>
      </div>
    </div>
    <img src="http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/DBillIntroImg.png"/>
    <div class="sina_join_bot" v-if="ishasbot">
      <button class="sina_btn primary radius" @click.stop="oneBtnJoinEvt()">立即升级</button>
      <div class="join_desc">
        升级权益前请阅读
        <a href="javascript:;" @click="showAlert(1)" class="col_a">《会员公约》</a>
        <a href="javascript:;" @click="showAlert(0)" class="col_a">《健康告知》</a>
        <a href="javascript:;" @click="showAlert(3)" class="col_a">《授权代扣委托书》</a>
        <a href="javascript:;" @click="showAlert(2)" class="col_a">《计划章程》</a>
      </div>
    </div>
    <clause-alert v-if="alertShow" :alertShow="alertShow" :alertIndex="alertIndex"
                  @closeClauseAlert="alertShow=false"></clause-alert>
  </div>
</template>

<script>
  import clauseAlert from './clause/clauseAlert'
  import Api from "../utils/apiConfig";

  export default {
    name: "illPlanIntro",
    components: {
      clauseAlert
    },
    data() {
      return {
        alertChecked: false, //协议勾选
        alertShow: false, // 协议弹框
        alertIndex: 0, //协议弹框显示的index
        ishasbot: false,
        fontSize: 16,
        joinUserList: [],
        weiboInfo: null,
        addState: true, // 本人加入状态
        addSuc: true,
        userName: '',
      }
    },
    created() {
      this.actionCount('pv');
      this.getPolicyList();
      this.getWeiboInfo();
      let clientWidth = document.documentElement.clientWidth;
      if (!clientWidth) return;
      if (clientWidth > 1366) {
        clientWidth = 1366;
      }
      this.fontSize = (clientWidth * 2) / 750 * 16;
      document.addEventListener('scroll', this.getScroll);
    },
    methods: {
      async getPolicyList() {
        this.joinUserList = [];
        let planList = [];
        let myPlanInfo = sessionStorage.getItem('myPlanInfo') ? JSON.parse(sessionStorage.getItem('myPlanInfo')) : null;
        if (myPlanInfo) {
          planList = myPlanInfo.dataList;
        } else {
          let res = await this.$get(Api.getPolicyList, {});
          if (res.code == 0) {
            planList = res.data.policy_list;
          }
        }
        planList.forEach((item) => {
          let plancode = [];
          item.plans.map(plan => {
            plancode.push(plan.plan_code)
          });
          if (item.insured.relatype == '00') {
            this.userName = item.insured.name;
          }
          if (plancode.length > 0 && plancode.indexOf('XL001') == -1) {
            let age = this.getIdCardAge(item.insured.idno_init);
            if (age < 60) {
              let params = {checked: true};
              if (item.insured.relatype == '00') {
                this.addState = false;
              }
              this.joinUserList.push(Object.assign({}, item.insured, params))
            }
          }
        });
        if (this.joinUserList.length == 0) {
          this.$router.push('/weibo/insure-plan')
        }
      },
      getScroll() {
        let scrolltop = document.documentElement.scrollTop ||
          window.pageYOffset ||
          document.body.scrollTop;
        if (scrolltop > 474 / 16 * this.fontSize) {
          this.ishasbot = true;
        } else {
          this.ishasbot = false;
        }

      },
      oneBtnJoinEvt() {
        let addPersons = Object.assign([], this.joinUserList);
        addPersons = addPersons.filter(item => item.checked);
        if (addPersons.length == 0) {
          this.$toast('请选择升级互助权益人员');
          return false;
        }
        this.actionCount('click');
        let evtList = [];
        addPersons.forEach(item => {
          evtList.push(this.addPolicy(item))
        });
        Promise.all(evtList).then((res) => {
          if (this.addSuc) {
            this.$router.push('/weibo/upgrade-suc')
          } else {
            this.getPolicyList();
          }
        })
      },
      addPolicy(addPerson) {
        let channel = localStorage.getItem('channel') || '810000';
        let that = this;
        return new Promise(function(resolve, reject){        //做一些异步操作
          that.$post(Api.addPolicy, {
            user_name: addPerson.name,
            certi_no: addPerson.idno_init,
            help_type: '1',
            work_type: '1',
            certi_type: "00",  //证件类型
            relation: addPerson.relatype, //关系
            mobile: addPerson.mobile || '',
            plan_code: 'XL001',
            channel: channel
          }).then(ret => {
            if (ret.code === 0) {
              sessionStorage.removeItem('myPlanInfo');
              //你先添加的"XL003"，成功后，完成了钱包签约。
              //调用create的时候，XL001和XL002直接加入成功了。
              resolve('成功')
            } else {
              that.addSuc = false;
              that.$toast(ret.msg ? addPerson.name+ret.msg :"请求超时，请刷新重试");
              resolve('失败');
            }
          })
        });
      },
      showAlert(idx) {
        this.alertIndex = idx;
        this.alertShow = true;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./css/mixin";

  .sina_page {
    &.haspagebot {
      padding-bottom: 248px;
    }

    .sina_hasbg {
      padding: 30px 20px 40px;
      background: url("http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/DBillIntroshow.png") #FF9A2F no-repeat left 260px;
      background-size: 100% 148px;

      .user_card {
        width: 100%;
        height: 338px;
        padding: 40px 40px 30px;
        background-image: url("http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/DBillIntrobg.png");
        background-size: 100% 338px;
        position: relative;

        &::before {
          content: "";
          width: 109px;
          height: 94px;
          position: absolute;
          right: 24px;
          top: -10px;
          background: url("./images/DBillIntroIcon.png") no-repeat;
          background-size: 109px 94px;
        }

        .user_cont {
          display: flex;
          align-items: center;

          .user_img {
            width: 120px;
            height: 120px;
            margin-right: 28px;
            overflow: hidden;
            border-radius: 50%;
            background: #fff;
            border: 4px solid rgba(255, 231, 192, 1);

            img {
              width: 100%;
              vertical-align: middle;
            }
          }

          .user_info {
            flex: 1;

            .name {
              font-size: 32px;
              line-height: 46px;
              font-weight: bold;
            }

            .state {
              color: #865F3D;
              padding-top: 10px;
            }
          }
        }

        .state_cont {
          padding: 80px 25px 0;

          .state_bg {
            height: 68px;
            padding: 12px 30px;
            text-align: center;
            line-height: 42px;
            background: rgba(255, 255, 255, 1);
            border-radius: 34px;
            color: #8B6447;
            font-size: 30px;
            font-weight: bold;
            position: relative;

            .icon {
              display: inline-block;
              vertical-align: middle;
              margin: 0 10px;
              width: 30px;
              height: 38px;
              background: url("./images/DBillIntroIcon2.png") no-repeat center 2px;
              background-size: 30px 30px;
            }
          }
        }
      }
    }

    .upgrade {
      background: #fff;
      padding: 0 30px 50px;
      margin-bottom: 20px;

      .upgrade_title {
        font-size: 32px;
        font-weight: bold;
      }

      .upgrade_cells {
        padding: 48px 0 76px;
        overflow-x: auto;
        white-space: nowrap;

        .upgrade_cell {
          width: 188px;
          border: 2PX solid transparent;
          padding: 30px 14px 27px;
          position: relative;
          text-align: center;
          display: inline-block;
          background: rgba(245, 245, 249, 1);
          color: #939393;
          border-radius: 20px;
          margin-right: 20px;

          &:last-child {
            margin-right: 0;
          }

          .user_name {
            padding: 20px 0 28px;
            font-size: 38px;
            font-weight: bold;
            color: #333;
            @include single-line;
          }

          .user_plan {
            font-size: 20px;
          }

          &.checked {
            border-color: #F8B558;
            background: #FFF3E3;
            color: #333;

            &::before {
              content: '';
              position: absolute;
              top: -2PX;
              left: -2PX;
              width: 58px;
              height: 34px;
              background: url("./images/sinaIconChecked4_2x.png") no-repeat;
              background-size: 58px 34px;
            }
          }
        }
      }
    }

    .sina_join_bot {
      width: 100%;
      position: fixed;
      left: 0;
      bottom: 0;
      background: #fff;
      padding: 40px 30px 34px;
    }

    .join_desc {
      padding-left: 28px;
      color: #939393;
    }

    .checkbox {
      left: 70px;
    }
  }
</style>
