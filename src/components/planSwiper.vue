<template>
  <div>
    <transition name="fade">
      <div class="my-plan-swiper" v-if="myPlanInfo">
        <div class="swiper-container swiper-container-thumbs">
          <div class="swiper-wrapper">
            <div class="swiper-slide"
                 v-for=" (item,idx) in myPlanInfo.dataList"
                 :class="{'swiper-slide-thumb-active':idx ==tabIndex}"
                 @click="checkTab(idx)"
            >
              <i class="hasimg" v-if="item.insured.relatype =='00' ">
                <img :src="weiboInfo.profile_image_url||'https://imgs.bihubao.com/Public/images/insureAdView/images/logo.png'">
              </i>
              <i class="husband" v-else-if="item.insured.relatype =='01' "></i>
              <i class="wife" v-else-if="item.insured.relatype =='02' "></i>
              <i class="parents" v-else-if="item.insured.relatype =='03' ||item.insured.relatype =='04' "></i>
              <i class="children" v-else-if="item.insured.relatype =='05' || item.insured.relatype =='06' "></i>
              <span class="txt">{{item.insured.name}}</span>
            </div>
            <div class="swiper-slide" @click="addFrimly(1)">
              <i class="adduser"></i>
              <span class="txt">添加家人</span>
            </div>
          </div>
        </div>

        <div class="swiper-container swiper-container-horizontal swiper-plan" ref="Swiper">

          <div class="swiper-wrapper" v-if="myPlanInfo">
            <template v-for=" (item,index) in myPlanInfo.dataList">
              <template v-for="plan in item.plans">
                <div class="swiper-slide">
                  <div class="sina_radius_bg" @click="checkDetail(plan['son_policy_no'],plan.state)">
                    <div class="hasborTitle">{{item.insured.name}} | {{plan.plan_name || '意外医疗计划'}}</div>
                    <div class="plan_con">

                      <div class="plan_desc"
                           v-if="plan.state == '0'">
                        互助权益待激活
                      </div>
                      <div class="plan_desc" v-else >已保障
                        {{plan.join_day || 0}} 天
                      </div>
                      <div class="plan_money icon">
                        <span><span class="money">{{plan.amnt}}</span>万</span>元互助金<i v-if="item.insured.notHaveCode!=''" class="icon"></i>
                      </div>
                      <div class="plan_btns">
                        <button class="sina_btn primary radius medium plan_add" @click.stop="activePlan(plan.plan_code)"
                                v-if="plan.state == '0'">立即激活权益
                        </button>
                        <button v-if="plan.state == '1'&&item.insured.notHaveCode =='XL001'" class="sina_btn primary radius wauto plan_add hasicon"
                                @click.stop="addPlanAlert(item.insured)" >0元升级保障
                        </button>
                        <button v-if="plan.state == '1'&&item.insured.notHaveCode =='XL003'" class="sina_btn primary radius wauto plan_add hasicon"
                                @click.stop="addPlanAlert(item.insured)" >0元升级保障
                        </button>
                        <button v-if="plan.state == '1'&&item.insured.notHaveCode ==''" class="sina_btn primary radius wauto plan_add"
                                @click.stop="addFrimly(2)" >为家人保障
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </template>

            </template>
          </div>
        </div>

      </div>
    </transition>

  </div>

</template>
<script>
    import Swiper from 'swiper/js/swiper.min.js';
    import 'swiper/css/swiper.css'
    export default {
        name: "planSwiper",
        props: {
            myPlanInfo: null,
            weiboInfo: null
        },
        data() {
            return {
                mySwiper: '',
                hasOnly: false,
                offsetWidth: 0,
                tabIndex: 0,
            }
        },
        mounted() {
            let that = this;
            if (!this.myPlanInfo) {
                return;
            }
            this.offsetWidth = document.documentElement.offsetWidth;
            if (this.myPlanInfo) {
                this.mySwiper = new Swiper('.swiper-plan', {
                    speed: 600,
                    slidesPerView: 'auto',
                    on: {
                        transitionEnd: function () {
                            let totalCount = 0;
                            let tabidx = 0;
                            for (let i = 0; i < that.myPlanInfo.dataList.length; i++) {
                                let item = that.myPlanInfo.dataList[i];
                                if (this.activeIndex >= totalCount && this.activeIndex < totalCount + item.plans.length) {
                                    tabidx = i;
                                    break;
                                }
                                totalCount += item.plans.length;
                            }
                            that.tabIndex = tabidx;
                            let paginCustom = document.getElementsByClassName('swiper-container-thumbs')[0];
                            let left = that.tabIndex < 4 ? 0 : (that.tabIndex - 3) * 75;
                            paginCustom.style.transform = `translate3d(-${left}px, 0, 0)`;
                        },
                    },
                });

            }
        },
        methods: {
            checkTab(idx) {
                this.tabIndex = idx;
                let activeIndex = 0;
                for (let i = 0; i < idx; i++) {
                    activeIndex += this.myPlanInfo.dataList[i].plans.length;
                }
                this.mySwiper.slideTo(activeIndex, 1200, false);
                let paginCustom = document.getElementsByClassName('swiper-container-thumbs')[0];
                let left = this.tabIndex < 4 ? 0 : (this.tabIndex - 3) * 75;
                paginCustom.style.transform = `translate3d(-${left}px, 0, 0)`;
            },
            activePlan(code) {
                if (!this.myPlanInfo) {
                    return;
                }
                this.actionCount('nowActivation')
                this.$router.push('/weibo/insure-active?planCode='+code)
            },
            checkDetail(id,state) {
                if (state == '1') {
                    this.$router.push(`/weibo/insure-detail?id=${id}`)
                }
            },
            addFrimly(index) {
              if (this.myPlanInfo.planStatus == 1 || this.myPlanInfo.planStatusFY == 1) {
                this.actionCount('addFrimly_click' + index, () => {
                  let channel = '50006';
                  if (index == '2') {
                    channel = '50007';
                  }
                  this.$router.push('/weibo/insure-add?channel=' + channel)
                });
              }else{
                this.$toast('您需先激活权益')
              }
            },
            addPlanAlert(item) {
              this.actionCount('addPlan_click2', () => {
                if(item.notHaveCode =='XL001'){
                  this.$router.push('/weibo/insure-illIntro');
                }else{
                  this.$emit('oneBtnJoinAlert', item)
                }

              });
            },

        }
    }
</script>


<style lang="scss" scoped>
  @import "../pages/css/mixin";

  .my-plan-swiper {
    width: 100%;
    overflow: hidden;
    padding-top: 256px;
    position: relative;

    .swiper-container {
      width: 100%;

      &.swiper-plan {
        .swiper-slide {
          width: 90%;

          &:last-child {
            width: 100%;

            .sina_radius_bg {
              margin-right: 30px;
            }
          }
        }

      }

    }

    .swiper-container-thumbs {
      position: absolute;
      top: 10px;
      left: 0;
      width: 200%;

      .swiper-slide {
        display: inline-block;
        vertical-align: middle;
        width: 102px;
        top: 30px;
        margin: 0 18px;

        &:first-child {
          margin-left: 30px;
        }

        &:last-child {
          margin-right: 30px;
        }

        i {
          border-radius: 50%;
          width: 102px;
          height: 102px;
          display: block;
          margin: 0 auto;
          text-align: center;
          background-size: cover;
          overflow: hidden;
          border: 6px solid #ff9933;

          &.hasimg {
            background-color: #fff;

            img {
              width: 100%;
              vertical-align: middle
            }
          }

          &.adduser {
            @include page-bg-image('iconAddUser');
          }

          &.husband {
            @include page-bg-image('addIconRelation1');
          }

          &.wife {
            @include page-bg-image('addIconRelation1');
          }

          &.parents {
            @include page-bg-image('addIconRelation3');
          }

          &.children {
            @include page-bg-image('addIconRelation2');
          }
        }

        .txt {
          padding-top: 16px;
          text-align: center;
          display: block;
          font-size: 24px;
          color: #fff;
        }
      }

      /*自定义分页器激活时的样式表现*/
      .swiper-slide-thumb-active {
        width: 152px;
        top: 0;

        i {
          width: 152px;
          height: 152px;
          border-width: 16px;
        }

        .txt {
          padding-top: 10px;
          font-size: 30px;
        }
      }
    }

    .sina_radius_bg {
      padding: 40px 0;
      font-size: 24px;
      background: #fff;
      margin: 0 0 12px 30px;

      .hasborTitle {
        margin-left: -1px;
      }

      .plan_con {
        margin: 0 40px;

        .plan_desc {
          color: $grey;
          margin-top: 12px;
        }

        .plan_money {
          margin-top: 48px;
          height: 70px;
          line-height: 70px;

          span {
            color: $primary;
            .money {
              font-size: 50px;
            }
          }
          .icon {
            width:170px;
            height: 60px;
            margin-left: 30px;
            display: inline-block;
            vertical-align: middle;
            background: url("../pages/images/sinaPlanCnterIcon2.png") no-repeat  right center;
            background-size: 170px 60px;
          }

        }
        .plan_btns{
          padding-top: 20px;
          .plan_add {
            width: 288px;
            &.hasicon{
              padding-right:86px;
              position: relative;
              &::after{
                width: 52px;
                height: 60px;
                content: "";
                position: absolute;
                right: 38px;
                top: 4px;
                background: url("../pages/images/sinaPlanCnterIcon1.png")  no-repeat;
                background-size: 52px 60px;
              }
            }

          }
        }
      }
    }

  }



</style>
