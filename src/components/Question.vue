<template>
  <div class="myfqas">
    <div class="normalTitle">大家都在问 <section @click='toMoreQuestion()'>更多问题<img src="../pages/images/notice_arrow_r.png" class="more"/></section> </div>
    <!-- <div class="sina_radius_bg"> -->
      <div class="psp_cells">
        <div class="psp_cell " v-for="(item,index) in dataList" :key="index">
          <div class="psp_qa  right" :class="{bottom:item.isShowAn}" @click="showAn(index)">
              <img v-if='index==0'  src="../pages/images/qustionHotIcon_2x.png" class="qustionIcon"/>
              <img v-else  src="../pages/images/qustionIcon_2x.png" class="qustionIcon"/>
              {{item.question}}
              <span v-if="!item.isShowAn"><img src="http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/question_up.png" alt=""></span>
              <span v-if="item.answer!=''&&item.isShowAn"> <img src="http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/question_down.png" alt=""> </span>
          </div>
          <transition name="fade">
            <div class="psp_answer" v-if="item.answer!=''&&item.isShowAn" v-html="item.answer"></div>
          </transition>

        </div>
      </div>
    <!-- </div> -->
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
                dataList: [
                    {
                        isShowAn: false,
                        question: '新浪互助有什么好处？',
                        answer: `<p>• 保障100种重疾，最高可申领30万</p>
                        <p>• 意外医疗互助，新冠病毒互助</p>`
                    },
                    {
                        isShowAn: false,
                        question: '有社保或商保，还能加入新浪互助吗？',
                        answer: `<p>• 加入新浪互助的用户，只要符合申请互助金的申领条件，都可以申请互助金。新浪互助与社会医疗保险、商业保险、其他互助不冲突。</p>`

                    },
                    {
                        isShowAn: false,
                        question: '如果互助成员生病了，如何申领互助金？',
                        answer: `  <p>• 如果互助成员罹患大病，经二级甲等及以上公立医院确诊为保障计划内的大病后，可以通过计划详情->申领互助金入口，依据提示和要求提交所需材料（证件信息、二级甲等及以上公立医院确诊证明及其他资料），通过核查并公示无异议后，即可申领互助金。</p>`
                    },
                    {
                        isShowAn: false,
                        question: '分摊费有多少？怎么计算？',
                        answer: `<p> • 成员申请互助金并通过平台审核及公示后，才会进行分摊。因成员处于等待期，新浪互助2020年7月14日前不会有任何分摊。</p>
                        <p>• 当期每2.5万互助额度的分摊金额=（当期公示通过案件的总申请互助金+管理费）/（公示日互助成员总额度/2.5）。</p>
                        <p>• 每位用户分摊金额=当期每2.5万互助额度的分摊金额 × （该用户受助额度/2.5）</p>`
                    }
                ]

            }
        },
        created() {


        },
        methods: {
          showAn(index) {
            this.dataList[index].isShowAn = !this.dataList[index].isShowAn;
            if(this.dataList[index].isShowAn){
              this.actionCount('QA_click')
            }
          },
          toMoreQuestion(){
            this.$router.push({
              path: '/weibo/moreQuestion'
            })

          }
        }
    }
</script>

<style lang="scss" scoped>
  @import "../pages/css/mixin";

  .myfqas {
     margin-top: 20px;
     width: 100%;
     height: 100%;
     background: #fff;
     padding-bottom: 20px;
      .normalTitle{
         display: flex;
         justify-content: space-between;
         align-items: center;
        section{
          display: flex;
          font-size: 24px;
          font-weight: 400;
          color: #939393;
          align-items: center;
          .more{
            width: 30px;
            height: 30px;
            margin-left: 12px;
          }
        }
      }
      .psp_cells {
        padding: 0 40px;
        .psp_cell {
          padding: 18px 0;
          .qustionIcon{
            width: 36px;
            height: 45px;
            margin-right: 20px;
          }
          .psp_qa {
            position: relative;
            font-size: 28px;
            font-weight: 600;
            display: flex;
            span{
              position: absolute;
              right: 0;
              top: 0;
              width: 30px;
              height: 30px;
              line-height: 30px;
              text-align: center;
              border: 1px solid #B0B0B0;
              border-radius: 50%;
              color: #B0B0B0;
              img{
                display: inline-block;
                width: 30px;
                height: 30px;
              }
            }
          }

          .psp_answer {
            padding: 18px 0 0 24px;
            color: $grey;
            line-height: 1.6;
          }
        }
      }

  }

</style>
