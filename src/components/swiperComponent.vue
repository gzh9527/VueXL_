<template>
  <transition name="fade">
    <div class="my-plan-swiper" v-if="myPlanInfo">
      <div class="swiper-container swiper-thumbs">
        <div class="swiper-wrapper">
          <div class="swiper-slide swiper-thumbs-slide" v-for=" (item) in myPlanInfo.dataList">
            <i class="hasimg" v-if="item.insured.relatype =='00' ">
              <img src="https://www.baidu.com/img/bd_logo1.png">
            </i>
            <i class="husband" v-else-if="item.insured.relatype =='01' "></i>
            <i class="wife" v-else-if="item.insured.relatype =='02' "></i>
            <i class="parents" v-else-if="item.insured.relatype =='03' ||item.insured.relatype =='04' "></i>
            <i class="children" v-else-if="item.insured.relatype =='05' || item.insured.relatype =='06' "></i>
            <span class="txt">{{item.insured.name}}</span>
          </div>
          <div class="swiper-slide" @click="addFrimly">
            <i class="adduser"></i>
            <span class="txt">添加家人</span>
          </div>
        </div>
      </div>

      <div class="swiper-container swiper-container-horizontal swiper-plan" :class="{onlyone:hasOnly}" ref="Swiper">

        <div class="swiper-wrapper" v-if="myPlanInfo">
          <template v-for=" (item,index) in myPlanInfo.dataList" v-if="myPlanInfo.dataList.length>0">
            <div class="swiper-slide">
              <div class="sina_radius_bg" @click="checkDetail(item.plan['son_policy_no'])">
                <div class="hasborTitle">{{item.insured.name}} | {{item.plan.plan_name || '大病互助计划'}}</div>
                <div class="plan_con">

                  <div class="plan_desc" v-if="planStatus ==0">互助权益待激活</div>
                  <div class="plan_desc" v-if="planStatus ==1">已保障
                    {{item.plan.join_day || 0}} 天
                  </div>
                  <div class="plan_money">
                    <span><span class="money">{{item.plan.amnt}}</span>万</span>元互助金
                    <button class="sina_btn primary radius medium plan_add" @click.stop="activePlan"
                            v-if="planStatus ==0 ">立即激活权益
                    </button>
                    <button class="sina_btn primary radius medium plan_add" @click.stop="addFrimly"
                            v-if="planStatus ==1 ">为家人保障
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>

    </div>
  </transition>

</template>

<script>
  import Swiper from 'swiper/js/swiper.min.js';
  import 'swiper/css/swiper.css'

  export default {
    name: "swiperCompont",
    props: {
      myPlanInfo: null,
    },
    data() {
      return {
        mySwiper: '',
        hasOnly: false,
        offsetWidth: 0,
        planStatus: null
      }
    },
    mounted() {
      if (!this.myPlanInfo) {
        return;
      }
      this.offsetWidth = document.documentElement.offsetWidth;
      this.planStatus = this.myPlanInfo.dataList[0].plan.state;
      if (this.myPlanInfo.dataList.length == 1) {
        this.hasOnly = true;
      }
      if (this.myPlanInfo.dataList.length > 0) {
        let that = this;
        this.mySwiper = new Swiper('.swiper-plan', {
          paginationClickable: true,
          parallax: true,
          speed: 600,
          slidesPerView: 'auto',
          thumbs: {
            swiper: {
              el: '.swiper-thumbs',
              slidesPerView: 5,
              watchSlidesVisibility: true, /* 避免出现bug */
            },
            slideThumbActiveClass: 'swiper-slide-thumb-active',
            thumbsContainerClass: 'swiper-container-thumbs',
          },
          on: {
            transitionEnd: function () {
              if (that.myPlanInfo.dataList.length > 4 && this.activeIndex > 3) {
                let warpper = document.getElementsByClassName('swiper-wrapper')[0]
                warpper.style.transform = 'translate3d(' + this.thumbs.swiper.translate - 200 + 'px, 0px, 0px)';
                console.log(warpper.style);
              }

            },
          }
        });

      }
    },
    methods: {
      activePlan() {
        if (!this.myPlanInfo) {
          return;
        }
        if (this.planStatus == 0) {
          if (sessionStorage.getItem('_planisOver') && sessionStorage.getItem('_planisOver') == 'agree') {
            this.$router.push('/weibo/insure-active')
          } else {
            this.$router.push('/weibo/clause?type=1')
          }
        }
      },
      checkDetail(id) {
        if (this.planStatus == 1) {
          this.$router.push(`/weibo/insure-detail?id=${id}`)
        }
      },
      addFrimly() {
        if (this.planStatus == 1) {
          this.$router.push('/weibo/insure-add')
        }

      }
    }
  }
</script>


<style lang="scss" scoped>
  @import "../pages/css/mixin";

  .my-plan-swiper {
    width: 100%;
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

      .swiper-slide {
        display: inline-block;
        vertical-align: middle;
        width: 102px;
        top: 30px;

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
            @include page-bg-image('iconRelation1');
          }

          &.wife {
            @include page-bg-image('iconRelation2');
          }

          &.parents {
            @include page-bg-image('iconRelation3');
          }

          &.children {
            @include page-bg-image('iconRelation4');
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
      border: 1px #e6e6e6 solid;
      padding: 40px 0;
      font-size: 24px;
      background: #fff;
      margin: 0 0 0 30px;

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
          line-height: 70px;

          span {
            color: $primary;

            .money {
              font-size: 50px;
            }

            &.icon {
              margin-left: 40px;
            }
          }

          .plan_add {
            float: right;
          }
        }
      }
    }

  }


</style>
