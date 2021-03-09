<template>
  <div class="myfqas">
      <div class="psp_cells">
        <div class="psp_cell " v-for="(item,index) in dataList" :key="index">
          <div class="psp_qa  right" :class="{bottom:item.isShowAn}" @click="showAn(index)">
              <img src="../pages/images/qustionIcon_2x.png" class="qustionIcon"/>
              <p>{{item.question}}</p>
              <span v-if="!item.isShowAn"><img src="http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/question_up.png" alt=""></span>
              <span v-if="item.answer!=''&&item.isShowAn"><img src="http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/question_down.png" alt=""></span>
          </div>
          <transition name="fade">
            <div class="psp_answer" v-if="item.answer!=''&&item.isShowAn" v-html="item.answer"></div>
          </transition>

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
                dataList: [
                    {
                        isShowAn: true,
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
                    },
                    {
                        isShowAn: false,
                        question: '互助不是保险，两者区别是什么？',
                        answer: `<p> • 保险是由商业保险公司根据自身经营策略提供的商业产品。</p>
                        <p>• 互助是基于“守护自己，帮助他人”的精神，一人生病大家共同分摊的公益捐赠行为。</p>`
                    },
                    {
                        isShowAn: false,
                        question: '新浪互助是什么？有什么优势？',
                        answer: `<p> • 新浪互助是基于“一份互助，万千帮助”的互助精神，通过搭建公开、透明、便捷的互相帮助平台，为新浪30天-59周岁的用户提供高性价比及公益性的大病保障服务。</p>
                        <p>• 新浪互助会在专业团队指导下持续提升覆盖病种，并严格审核每一个互助申请，保持公平及公正。</p>
                        <p>• 可在新浪微博APP中“我-我的钱包-新浪互助”查看详细内容。</p>`
                    },
                    {
                        isShowAn: false,
                        question: '是不是可以随时退出？什么是180天等待期？什么是激活日？',
                        answer: `<p> • 用户可随时加入及随时退出，退出即计划终止。若退出之前已有公示案件，需要支付当期的分摊金额，退出后再次申请加入需重新计算等待期。</p>
                        <p>• 为了防范带病加入等风险，保障互助成员的利益，等待期内客户发生大病无法申请互助。</p>
                        <p>• 新浪互助等待期是180天，从激活日开始计算。完善个人信息后即可激活，次日凌晨为激活日。</p>`
                    },
                    {
                        isShowAn: false,
                        question: '互助分摊怎么扣费？',
                        answer: `<p>• 每月7、21日为公示日，若当期公示存在审核通过案件，则分别会在当月14、28日进行费用扣除，会向您授权的支付宝账户发起扣款。</p>`
                    },
                    {
                        isShowAn: false,
                        question: '加入新浪互助为什么还要收取管理费？',
                        answer: `<p>• 新浪互助在实际管理过程中会产生相关的运营成本和支出。管理费用于分摊金额收支、案件调查审核、诉讼仲裁公正、计划日常运营维护等，我们将持续为新浪互助成员提供优质、长期、高质量的服务。</p>
                        <p>• 秉承透明运作的理念，管理费用将会在个人页面进行公示。</p>`
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
        padding-top: 50px;
        .psp_cell {
          padding: 20px 0;
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
            p{
              width: 560px;
            }
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
