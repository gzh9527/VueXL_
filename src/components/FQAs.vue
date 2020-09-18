<template>
  <div class="myfqas">
    <div class="normalTitle">小课堂</div>
    <div class="sina_radius_bg">
      <div class="psp_title">
        <!--        <div class="psp_cells">-->
        <!--          <div class="psp_cell ">-->
        <!--            <div class="psp_qa hasarrow right" >加入微博互助对健康有什么要求？</div>-->
        <!--          </div>-->
        <!--        </div>-->
      </div>
      <div class="psp_cells">
        <div class="psp_cell " v-for="(item,index) in dataList" :key="index">
          <div class="psp_qa hasarrow right" :class="{bottom:item.isShowAn}" @click="showAn(index)">{{item.question}}
          </div>
          <transition name="fade">
            <div class="psp_answer" v-if="item.answer!=''&&item.isShowAn" v-html="item.answer"></div>
            <div class="psp_answer" v-if="item.showIndex&&item.isShowAn&&item.showIndex == 'fy1'">
              <p>新冠病毒是为新型冠状病毒(2019-nCoV)疫情下普通民众及医护人员提供互助互爱、共同抵抗风险的平台，本计划不承诺会员能够获得确定的风险保证；本计划运营是出于对人们生命安全和身体健康的关怀，不收取管理费，没有商业利益，是企业社会责任感使然。新冠病毒互助不是保险。 </p>
              <p><router-link to="/weibo/clause?type=0&cid=1" class="col_a">《会员公约》</router-link>
                 <router-link to="/weibo/clause?type=0&cid=6" class="col_a">《计划章程》</router-link>
               </p>
            </div>
            <div class="psp_answer" v-if="item.showIndex&&item.isShowAn&&item.showIndex == 'fy5'">
              除新冠病毒互助计划外，新浪互助还推出了重疾互助计划和意外医疗互助计划，可以
              <router-link to="/weibo/insure-join?channel=31000" class="col_a">点此了解加入</router-link>。
            </div>
          </transition>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "FQAs",
        props: {
            FYshow: false,
            planShow:false,
            shareShow:false,
        },
        data() {
            return {
                dataList: null,
                qAlist: [
                    {
                        isShowAn: false,
                        question: '新浪互助是保险吗？',
                        answer: `<p>新浪互助不是保险，而是会员之间互帮互助的互益型组织。加入互助社群后，当互助事件发生时，其他会员向符合互助条件的会员进行单向赠予。会员分摊金额不是保险费，不能预期获得确定的风险保障回报</p>`
                    },
                    {
                        isShowAn: false,
                        question: '加入新浪互助有没有年龄限制？',
                        answer: `<p>重疾计划加入年龄是出生30天(含)至59周岁(含)</p>
                      <p>意外医疗计划加入年龄是出生18周岁(含)至65周岁(含)</p>`
                    },
                    {
                        isShowAn: false,
                        question: '加入新浪互助可获得的最高互助额度是多少？',
                        answer: `  <p>重大疾病：</p>
                        <p>30天-35周岁——30万元</p>
                        <p>36周岁-50周岁——15万元</p>
                        <p>51周岁-55周岁——7.5万元</p>
                        <p>56周岁-60周岁——5万元</p>
                        <p>意外医疗：</p>
                        <p>18周岁-65周岁  5万/年， 累计 15万</p>`
                    },
                    {
                        isShowAn: false,
                        question: '新浪互助的互助范围是什么？',
                        answer: '100种重大疾病+意外医疗'
                    },
                    {
                        isShowAn: false,
                        question: '加入新浪互助后，是不是可以马上申请互助金？',
                        answer: `<p>为了防止已患病或者即将患病的人加入，即常说的逆选择风险，我们设置了重疾180天、意外30天的观察期。在观察期内，若患病或意外不可以申请互助金，但须履行分摊义务。观察期过后，会员如不幸罹患重疾或意外，可以发起互助金申请。</p>`
                    }
                ],
                fyQA: [
                    {
                        isShowAn: false,
                        question: '新冠病毒互助是保险吗？',
                        answer: '新冠病毒互助不是保险，而为新型冠状病毒(2019-nCoV)疫情下普通民众及医护人员提供互助互爱、共同抵抗风险的平台，本计划不承诺会员能够获得确定的风险保证；本计划运营是出于对人们生命安全和身体健康的关怀，不收取管理费，没有商业利益，是企业社会责任感使然。'
                    },
                    {
                        isShowAn: false,
                        question: '新冠病毒国家已经全部报销还互助什么？',
                        answer: '新冠病毒互助的是住院津贴，作为患者住院期间的误工费及生活补贴费用，如果不幸因新冠病毒身故，还将给付身故互助金。'
                    },
                    {
                        isShowAn: false,
                        question: '加入新冠病毒互助有没有限制？',
                        answer: '新冠病毒互助计划以人道主义关怀的形式，不分地域、年龄，只要没有确诊或被疑似患有新型冠状病毒(2019-nCoV)，都可以加入此计划。'
                    },
                    {
                        isShowAn: false,
                        question: '加入新冠病毒互助可获得的最高互助额度是多少？',
                        answer: `  <p>a、一般会员</p>
                                 <p>住院津贴-常规住院：300元/天 最高60天</p>
                                 <p>住院津贴-ICU：800元/天 最高30天</p>
                                 <p>身故互助金：10万</p>
                                 <p>b、医护人员</p>
                                 <p>住院津贴-常规住院：900元/天 最高60天</p>
                                 <p>住院津贴-ICU：2400元/天 最高30天</p>
                                 <p>身故互助金：30万</p>`
                    },
                    {
                        isShowAn: false,
                        question: '加入新冠病毒互助后，是不是可以马上申请互助金？',
                        answer: '<p>加入新冠病毒次日生效，生效后如果不幸确诊为新型冠状病毒(2019-nCoV)，就可以申请互助金</p>'
                    }
                ],
                planQA:[

                    {
                        isShowAn: false,
                        question: '新冠病毒互助是什么？',
                        answer: ``,
                        showIndex:'fy1'
                    },
                    {
                        isShowAn: false,
                        question: '新冠病毒国家已经全部报销还互助什么？',
                        answer: '新冠病毒互助的是住院津贴，作为患者住院期间的误工费及生活补贴费用，如果不幸因新冠病毒身故，还将给付身故互助金。'
                    },
                    {
                        isShowAn: false,
                        question: '加入新冠病毒互助有没有限制？',
                        answer: `<p>新冠病毒互助计划以人道主义关怀的形式，不分地域、年龄，只要没有确诊或被疑似患有新型冠状病毒(2019-nCoV)，都可以加入此计划。</p>`
                    },
                    {
                        isShowAn: false,
                        question: '加入新冠病毒互助可获得的最高互助额度是多少？',
                        answer: `
                          <p>a、一般会员</p>
                          <p>住院津贴-常规住院：300元/天 最高60天</p>
                          <p>住院津贴-ICU：800元/天 最高30天</p>
                          <p>身故互助金：10万</p>
                          <p>b、医护人员</p>
                          <p>住院津贴-常规住院：900元/天 最高60天</p>
                          <p>住院津贴-ICU：2400元/天 最高30天</p>
                          <p>身故互助金：30万</p>
                        `
                    },
                    {
                        isShowAn: false,
                        question: '加入新冠病毒互助后，是不是可以马上申请互助金？',
                        answer: `<p>加入新冠病毒次日生效，生效后如果不幸确诊为新型冠状病毒(2019-nCoV)，就可以申请互助金。</p>`
                    },
                    {
                        isShowAn: false,
                        question: '更多互助计划',
                        answer: ``,
                        showIndex:'fy5'
                    },
                ],
                shareQA: [
                  {
                    isShowAn: false,
                    question: '为什么会自动代扣分摊费用？',
                    answer: `<p>加入新浪互助计划享受保障同时，也须参与其他受助会员的互助金分摊。</p>
                            <p>加入时由会员本人授权同意，每月分摊日（14日和28日）由微博钱包自动代扣互助金，退出计划后代扣会自动取消。</p>`
                  },
                  {
                    isShowAn: false,
                    question: '新浪互助每月分摊几次？每次扣多少钱？',
                    answer: `<p>新浪互助每月有两次分摊（14号和28号），具体扣费金额可以在每次公示日查看（每月7日和21日）。</p>
                               <p>扣费成功后，请您留意查看扣费私信通知。</p>`
                  },
                  {
                    isShowAn: false,
                    question: '肺炎互助如何扣费？',
                    answer: '<p>肺炎互助计划针对微博加入会员4月30日前免费；2020年肺炎互助计划总扣费金额不超过200元。</p>'
                  },
                ]
            }
        },
        created() {
            this.$nextTick(()=>{
                if(this.FYshow){
                  this.dataList = this.fyQA;
                }else if(this.planShow){
                  this.dataList = this.planQA;
                }else if(this.shareShow){
                  this.dataList = this.shareQA;
                } else{
                  this.dataList = this.qAlist;
                }
            })

        },
        methods: {
          showAn(index) {
            this.dataList[index].isShowAn = !this.dataList[index].isShowAn;
            if(this.dataList[index].isShowAn){
              this.actionCount('QA_click')
            }
          },
        }
    }
</script>

<style lang="scss" scoped>
  @import "../pages/css/mixin";

  .myfqas {
    .sina_radius_bg {
      padding: 0 0 40px;
      overflow: hidden;

      .psp_title {
        padding: 100px 0px 0;

        background-color: #FFF5EC;
        @include page-bg-image('sinaPlanClass');
        background-size: 94px 60px;
        background-position: center 20px;

        .psp_cells .psp_cell .psp_qa {
          width: 100%;
          display: inline-block;
          font-size: 30px;
        }
      }

      .psp_cells {
        padding: 0 40px;

        .psp_cell {
          padding: 12px 0;

          .psp_qa {
            font-size: 28px;
            font-weight: 600;
          }

          .psp_answer {
            padding: 18px 0 0 24px;
            color: $grey;
            line-height: 1.6;
          }
        }
      }
    }

  }
</style>
