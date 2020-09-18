<template>
  <div class="sina_page">
    <div class="intro">
      <div class="user_plan_info">
        <div class="name">亲爱的{{userName}}：</div>
        <div class="info">你在新浪互助已保障 <span class="col_primary">{{joinInfo.join_day}}</span> 天，
          已帮助 <span class="col_primary">{{joinInfo.help_count}}</span> 人, <span class="col_primary">{{joinInfo.total_person}}</span> 人还在共同守护，你舍得离开吗？
        </div>
      </div>
    </div>
    <div class="intro">
      <img src="http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/exitPlanIntro1_2x.png?v=1.2" v-if="planCode == 'XL001'">
      <img src="http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/exitAccPlanIntro1_2x.png?v=2.2" v-if="planCode == 'XL002'">

    </div>
    <div class="intro exit-infos">
      <div class="exit_txt_tips"><i>特别提醒</i> 公示当天退出，如当期有案件公示，也需要进行费用分摊</div>
      <div class="exit_now">如果现在退出：</div>
      <div class="exit_cells" v-if="planCode == 'XL001'">
        <div class="exit_cell">最高30万互助金<span class="col_primary">将失效</span></div>
        <div class="exit_cell">再加入将重新计算<span class="col_primary">180天观察期</span></div>
        <div class="exit_cell">再加入需<span class="col_primary">重新确认健康要求</span></div>
      </div>
      <div class="exit_cells" v-if="planCode == 'XL002'">
        <div class="exit_cell">最高5万互助金<span class="col_primary">将失效</span></div>
        <div class="exit_cell">再加入将重新计算<span class="col_primary">30天等待期</span></div>
        <div class="exit_cell">再加入需<span class="col_primary">重新确认健康要求</span></div>
      </div>
      <div class="footer_btns">
        <div class="sina_btn default radius line medium" @click="giveupEvt" >我还想放弃</div>
        <div class="sina_btn primary radius medium" @click="cancalGiveup">我再想想</div>
      </div>
    </div>
  </div>
</template>

<script>
  import Api from "../../utils/apiConfig";
  export default {
    name: "exitPlan",
    data(){
      return {
        joinInfo:{
          join_day:'0',
          help_count:'0',
          total_person:'0'
        },
        userName:'',
        planCode:null,
        actionName:'', //埋点action
      }
    },
    created(){
      if(!this.$route.query.id || this.$route.query.id == '' ||!this.$route.query.uuid || this.$route.query.uuid == ''){
        this.$router.push(`/weibo/insure-plan`);
        return;
      }
      this.planCode = this.$route.query.planCode || 'XL001';
      this.actionName = this.planCode == 'XL001' ? '' : '2';
      this.actionCount('pv' + this.actionName);
      this.getjoinInfo();
      this.getJoinCount();
      if (!sessionStorage.getItem('myPlanInfo')) {
        this.getPlanList();
      }else {
        let myPlanInfo = JSON.parse(sessionStorage.getItem('myPlanInfo'));
        myPlanInfo.dataList.forEach(item=>{
          item.plans.forEach(plan=>{
            if(plan['son_policy_no'] == this.$route.query.id){
              this.userName = item.insured.name;
              this.joinInfo.join_day = plan.join_day;
              return;
            }
          })
        })
      }
    },
    methods:{
      getjoinInfo(){
        this.$get(Api.getjoinInfo,{customerno:this.$route.query.uuid,plan_code:this.planCode}).then(ret=>{
          if(ret.code==0){
            this.joinInfo.help_count = ret.data.help_count || '0';
          }
        })
      },
      // 总加入人数
      getJoinCount(){
        this.$get(Api.getJoinCount).then(ret => {
          if (ret.code == 0) {
            this.joinInfo.total_person = ret.data;

          }
        })
      },
       getPlanList(){
        this.$get(Api.getPolicyList, {}).then(ret => {
          if(ret.data.policy_list){
            ret.data.policy_list.forEach(item=>{
              item.plans.forEach(plan=>{
                if(plan['son_policy_no'] == this.$route.query.id){
                  this.userName = item.insured.name;
                  this.joinInfo.join_day = plan.join_day;
                  return;
                }
              })
            })
          }
        })
      },
      cancalGiveup(){
        this.actionCount('cancelBtn_click' + this.actionName ,()=> {
          this.$router.push(`/weibo/insure-detail?id=${this.$route.query.id}`);
        })
      },
      giveupEvt(){
        this.actionCount('sumbitBtn_click' + this.actionName,()=>{
          this.$router.push({path:'/weibo/exit-ques',query:this.$route.query})
        });

      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../css/mixin";

  .sina_page {
    .intro{
      margin-top: 20px;
      &:first-child{
        margin: 0;
        padding: 20px 20px 0;
        .user_plan_info{
          height: 240px;
          background: url("./images/exitPlanBg.png") no-repeat;
          background-size: cover;
          padding: 40px 40px 54px;
          font-size: 30px;
          line-height: 50px;
          .name{
            padding-left: 52px;
            padding-bottom: 20px;
            position: relative;
            font-size: 34px;
            line-height: 48px;
            font-weight: bold;
            &::before{
              content: '';
              position: absolute;
              top: 6px;
              left: 0;
              width: 42px;
              height: 36px;
              background: url("./images/exitPlanIcon.png") no-repeat;
              background-size: 42px 36px;
            }
            .info{
              font-size: 26px;
            }

          }
        }

      }

    }

  }

</style>
