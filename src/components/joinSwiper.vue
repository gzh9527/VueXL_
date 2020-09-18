<template>
  <div class="swiper-container join_swiper" ref="join_swiper">
    <div class="swiper-wrapper" v-if="showOnlyImg">
      <div class="swiper-slide">
        <img src="../pages/images/safeguardImg0.png">
      </div>
      <div class="swiper-slide">
        <img src="../pages/images/safeguardImg1.png">
      </div>
    </div>
    <div class="swiper-wrapper" v-else>
      <div class="swiper-slide">
        <img src="../pages/images/joinLetterBg_2x.png">
        <div class="letter_con">
          <div class="txt">
            <span>单位体检时大勇发现肺部癌变，多年积蓄花光了，才想到加入过互助…</span>
          </div>
        </div>
      </div>
      <div class="swiper-slide">
        <img src="../pages/images/joinLetterBg2_2x.png">
        <div class="letter_con">
          <div class="txt">
            <span>利民加入互助的时候只想帮助别人，没想到自己也有用得上的一天…</span>
          </div>
        </div>
      </div>
      <div class="swiper-slide">
        <img src="../pages/images/joinLetterBg3_2x.png">
        <div class="letter_con">
          <div class="txt">
            <span>互助给予我的帮助，让我一个病人 活得有尊严…</span>
          </div>
        </div>
      </div>
    </div>

    <div class="swiper-pagination"></div>
  </div>

</template>

<script>
  import Swiper from 'swiper/js/swiper.min.js';
  import 'swiper/css/swiper.css'

  export default {
    name: "joinSwiper",
    props: {
      showOnlyImg:{
        type:Boolean,
        default:false
      }
    },
    data() {
      return {
         hasLength:3
      }
    },
    created() {
      let that = this;
      if(this.showOnlyImg){
        this.hasLength=2
      }
      this.$nextTick(() => {
        let contWidth = this.$refs.join_swiper.getBoundingClientRect().width*.96 *.945;
        let mySwiper = new Swiper('.swiper-container', {
          speed: that.hasLength*200,
          slidesPerView: 'auto',
          loop: true,
          touchRatio : 1,
          autoplay: false,
          watchSlidesProgress: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          on: {
            progress: function() {
              for (let i = 0; i < this.slides.length; i++) {
                let slide = this.slides.eq(i);
                let slideProgress = this.slides[i].progress;
                let scale =1 - Math.abs(slideProgress) / that.hasLength *0.2;
                let translate = '0';
                if (that.showOnlyImg) {
                  translate = slideProgress * contWidth * .96 + 'px';
                } else {
                  translate = slideProgress * contWidth + 'px';
                }
                let zIndex = 999 - Math.abs(Math.round(10 * slideProgress));

                slide.transform('translateX(' + translate + ') scale(' + scale + ')');
                slide.css('zIndex', zIndex);
                slide.css('opacity', 1);
                if (Math.abs(slideProgress) > this.hasLength) {
                  slide.css('opacity', 0);
                }
              }
            },
            setTransition: function(transition) {
              for (var i = 0; i < this.slides.length; i++) {
                var slide = this.slides.eq(i)
                slide.transition(transition);
              }

            }
          }

        })
      })

    }
  }
</script>
<style>
  .swiper-container-horizontal > .swiper-pagination-bullets{
    bottom: 20px;
  }
  .swiper-pagination-bullet {
    width: 20px;
    height: 8px;
    border-radius: 0;
    background: rgba(170, 170, 170, 1);
  }

  .swiper-pagination-bullet-active {
    width: 38px;
    height: 8px;
    border-radius: 0;
    background: rgba(255, 130, 0, 1);
  }
</style>
<style lang="scss" scoped>
  @import "../pages/css/mixin";

  .swiper-container,
  .swiper-wrapper,
  .swiper-slide,
  .swiper-slide {
    width: 100%;
    border-radius: 20px;
    position: relative;
  }

  .join_swiper {
    .swiper-slide {

      width: 96%;
      box-shadow: 0px 3px 12px 0px rgba(183, 182, 182, 0.3);
      margin-bottom: 12px;
      border-radius: 20px;
      background-color: #fff;
      overflow: hidden;

      .letter_con {
        margin: 40px;
        padding-left: 160px;
        @include page-bg-image('joinLetterIcon');
        background-size: 126px 148px;

        .txt {
          padding: 32px 30px;
          background: rgba(255, 250, 238, 1);
          font-size: 22px;
          border-radius: 85px;
          border: 1px solid rgba(251, 167, 44, 1);

          span {
            @include multi-line;
          }
        }
      }
    }

  }
</style>
