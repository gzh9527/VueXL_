<template>
  <div class="sina_page " :class="{ hasfyBot: ishasbot }" >
    <div class="sina_hasbg">
      <div class="sina_join_cont">
        <div class="plan_peoples" v-if="validCount">
          已有
          <span class="num" v-for="(item,index) of validCount" :key="index">{{item}}</span>
           人加入计划,携手抗击疫情！
        </div>
        <div class="sina_bg">
          <div class="sina_btn_cont">
            <div class="sina_btn primary radius" @click="addPlan">立即0元加入！携手抗击疫情！</div>
            <div class="join_desc" @click="isChecked=!isChecked">
              <i class="checkbox"><i v-if="isChecked" class="checked"></i></i> 关注@新浪互助，参与互助事件、章程审议等。
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="normalTitle">计划简介</div>
    <div class="sina_cont help_intro">
      <div class="sina_radius_bg">
        <div class="intro_cont">
           <img src="../images/FYjoinbanner5_2x.png" />
        </div>
         <img src="../images/FYjoinbanner4_2x.png" />
        <div class="txt_desc">本计划由北京必互科技有限公司实际运营</div>

      </div>
    </div>
     <div class="normalTitle">互助流程</div>
     <div class="banner_cont">
            <img src="../images/FYjoinbanner3_2x.png" />
     </div>
    <my-fqas :FYshow="true"></my-fqas>
    <transition name="translate-bottom">
      <div class="sina_join_bot " v-if="ishasbot">

        <button class="sina_btn primary radius" @click="addPlan()">立即0元加入！携手抗击疫情！</button>
        <div class="join_desc" @click="isChecked=!isChecked">
          <i class="checkbox"><i v-if="isChecked" class="checked"></i></i> 关注@新浪互助，以参与互助事件、章程审议等。
        </div>
      </div>
    </transition>
    <div class="loading" v-if="loadShow"></div>
  </div>
</template>

<script>
    import myFqas from '../../components/FQAs';
    import Api from "../../utils/apiConfig";
    export default {
        components: {
            myFqas
        },
        name: "joinHlep",
        data() {
            return {
                fontSize:16,
                loadShow:true,
                ishasbot:false,
                totalNum:null,
                dateLimit:null,
                validCount:null,
                isChecked:true
            }
        },
        computed: {},
        mounted() {
            if (localStorage.getItem('_userToken')) {
                this.getPlanStatus();
            }else{
                this.loadShow = false;
                this.getValidCount();
                this.setActionCount('pv', '-1'); //未授权埋点
                // this.$router.push({
                //     path: '/weibo/userauth',
                //     query: {
                //         returnUrl: this.$route.path
                //     }
                // });
            }

        },
        created(){
            let clientWidth = document.documentElement.clientWidth;
            if (!clientWidth) return;
            if (clientWidth > 1366) {
                clientWidth = 1366;
            }
            this.fontSize = (clientWidth * 2) / 750 * 16;
            document.addEventListener('scroll', this.getScroll);
        },
        methods:{
            //监听滚动
            getScroll() {
                let scrolltop = document.documentElement.scrollTop ||
                    window.pageYOffset ||
                    document.body.scrollTop;
                if (scrolltop > 430 / 16 * this.fontSize) {
                    this.ishasbot = true;
                } else {
                    this.ishasbot = false;
                }
            },
            getPlanStatus() {
            this.$get(Api.getMyPolicy).then(ret=>{
              if (ret.code === 0) {
                if (ret.data.plan_list_state&&(ret.data.plan_list_state['XL003'] != 'not_join' )) {
                  this.$router.push('/weibo/insure-plan');
                } else {
                  this.loadShow = false;
                  this.actionCount('pv');
                  // this.getData();
                  this.getValidCount();
                }
              }
            })
            },
            getValidCount() {
                this.$get(Api.getJoinCount, {plan_code:'XL003'}).then(ret => {
                    if (ret.code == 0) {
                        let count = ret.data;
                        for (let i = 0; count.toString().split('').length < 7; i++) {
                            count = '0' + count;
                        }
                        this.validCount = count;
                    }
                })
            },
            getData() {
                this.$get(Api.bridgeFeiyan, {}).then(ret => {
                    if (ret.data) {
                        this.totalNum = ret.data.total;
                        this.dateLimit = ret.data.date_limit;
                    }
                })
            },
            addPlan(){
                if (localStorage.getItem('_userToken')) {
                  this.actionCount('click');
                }else{
                  this.setActionCount('click', '-1'); //未授权埋点
                }
                let hasChecked = this.isChecked ? 1:0
                this.$router.push('/weibo/feiyan-join?hasChecked='+hasChecked);
            }
        }

    }
</script>

<style scoped lang="scss">
  @import "../css/mixin";

  .sina_page {
    .sina_btn{
      font-size: 30px;
    }
    .public_cells .public_cell .nums{
      font-size: 40px ;
    }
    .banner_cont{
      margin: 0 20px;
    }
    &.hasfyBot{
      padding-bottom: 246px;
    }
    .plan_peoples {
      width: 100%;
      position: absolute;
      left: 0;
      top:338px;
      margin: 0px auto;
      text-align: center;
      color: #fff;
      line-height: 36px;
      .num {
        width: 36px;
        height: 36px;
        line-height: 36px;
        display: inline-block;
        background:#fff;
        border-radius:8px;
        font-size: 22px;
        margin-right: 8px;
        color: #333;
        &:last-child{
          margin-right: 0;
        }
      }
    }
    .txt_desc{
              font-size: 20px;
              padding-left: 40px;
              color: $grey;
            }
    .sina_hasbg {
      position: relative;
      @include level-bg-image('FYjoinbanner');
      background-size: 100% auto;
      padding-top: 420px;
      .sina_join_cont {
        .sina_bg{
          margin: 0 20px;
          padding:460px 0 60px;
          @include level-bg-image('FYjoinbanner2');
          background-size: 100% 624px;
          .sina_btn_cont{
            margin: 0 50px;
            text-align: center;
            .sina_btn{
              display: block;
            }

          }
        }

      }
    }

    .help_intro{
      .sina_radius_bg{
        padding: 56px 0 32px;
        margin: 0;
        .intro_cont{
          padding: 0 40px;
          .intro_desc{
            padding: 0px 0 40px;
            font-size: 20px;
            color: #939393;
          }
        }
        table {
          width: 100%;
            margin-bottom: 30px;
          border-right: 1px solid #e6e6e6;
          border-bottom: 1px solid #e6e6e6;
        }

        table th, table td {
          padding:10px 6px;
          border-left: 1px solid #e6e6e6;
          border-top: 1px solid #e6e6e6;
          text-align: center;

        }
      }
    }



    .sina_join_bot {
      width: 100%;
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 99;
      background: $col_bg;
      padding: 52px 0;
      @include plr30;
      .join_desc {
        margin-top: 10px;
        padding-left:105px;
        padding-right: 50px;
        .checkbox {
          left: 60px;
        }
      }
    }
    .join_desc {
      width: 100%;
      margin-top: 10px;
      padding-left: 65px;
      position: relative;
      color: $col_a;
      .checkbox{
        width: 26px;
        height: 26px;
        display: block;
        position: absolute;
        top: 6px;
        left: 20px;
        border: 1px solid #979797;
        background: #fff;
        .checked{
          width: 18px;
          height: 18px;
          @include center;
          @include level-bg-image('sinaIconChecked1');
          background-size: cover;
        }
      }
    }
    .loading{
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 99999;
      background-color: #fff;
      background-image: url("../images/loading.gif");
      background-repeat: no-repeat;
      background-size: 200px 200px;
      background-position: center;
    }
    .help_info{
      text-align: right;
      margin: 20px 30px 44px 0;
      padding-right: 40px;
      line-height: 30px;
      color: $grey;
      @include level-bg-image('sinaIconInfo');
      background-size: 30px 30px;
      background-position: right center ;
      vertical-align: middle;
    }
  }

</style>
