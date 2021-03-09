<template>
  <div class="sina_page">
    <div class="head-wrap">
      <div class="public_cells ">
        <div class="public_cell">
          <div class="nums"><i>我家</i>{{headNums&&headNums.share_count || 0}}<i>人</i></div>
          <div class="feiyantxt">已参与分摊</div>
        </div>
        <div class="public_cell">
          <div class="nums">{{headNums&&headNums.plan_count || 0}}<i>个</i></div>
          <div class="feiyantxt">已参与计划</div>
        </div>
        <div class="public_cell">
          <div class="nums">{{headNums&&headNums.help_count || 0}}<i>人</i></div>
          <div class="feiyantxt">已帮助人数</div>
        </div>
      </div>
    </div>
    <div class="search_cont">
      <div class="plan_tabs">
        <div class="plan_tab hasarrow bottom" @click="checkedTab(0)">{{searchInfo.people.name}}</div>
        <div class="plan_tab hasarrow bottom" @click="checkedTab(1)">{{searchInfo.year}}</div>
        <div class="plan_tab hasarrow bottom" @click="checkedTab(2)">{{searchInfo.planName==''?'全部':searchInfo.planName}}</div>
      </div>
      <div class="total_share">累计已分摊 <span class="money">{{headNums&&headNums.total_help_amount || 0}} 元</span></div>
      <div class="check_tabs" v-if="checkTabShow">
        <div class="plan_icons" v-if="checkTabIndex==0">
          <div class="plan_icon medium" :class="{active:searchInfo.people.name =='全部'}" @click="checkedIcon({
            uuid: '',
            name:'全部'
          })">全部</div>
          <template v-if="insuredPeoples" v-for="(item,idx) of insuredPeoples">
            <div class="plan_icon medium" :key="idx" :class="{active:searchInfo.people.uuid == item.uuid}" @click="checkedIcon(item)">{{item.name}}</div>
          </template>
        </div>
        <div class="plan_icons" v-if="checkTabIndex==1">
          <template v-for="year of years">
            <div class="plan_icon medium" :class="{active:searchInfo.year == year}" @click="checkedIcon(year)">
              {{year}}
            </div>
          </template>
        </div>
        <div class="plan_icons" v-if="checkTabIndex==2">
          <div class="plan_icon" :class="{active:searchInfo.planName =='大病互助计划'}"  @click="checkedIcon('大病互助计划')">大病互助计划</div>
          <div class="plan_icon" :class="{active:searchInfo.planName =='意外医疗互助计划'}"  @click="checkedIcon('意外医疗互助计划')">意外医疗互助计划</div>
          <div class="plan_icon" :class="{active:searchInfo.planName =='新冠病毒互助计划'}"  @click="checkedIcon('新冠病毒互助计划')">新冠病毒互助计划</div>
        </div>
      </div>
    </div>

    <div class="share_num_cells">
      <template v-if="helpList&&helpList.length>0" v-for="(item,idx) of helpList">
        <div class="share_num_cell">
          <div class="num_title">
            <div class="name">{{item.name}}</div>
            <div class=" hasarrow right"
                 @click="checkPublic(item.public_id,item.child_list)">查看公示</div>
          </div>
          <div class="people_cells">
            <div class="people_cell" v-for="(peoitem,index) of item.child_list" :key="'peo'+index"
                 @click="checkDetail(item.announcement_id,peoitem.e_uid)">
              <div class="left_cont">
                <div class="people_info">{{peoitem.name}}</div>
                <div class="plan_icons">
                  <div class="plan_icon" v-for="plan of peoitem.plan_list">{{plan}}</div>
                </div>
              </div>
              <div class="right_cont">
                <div class="money_info hasarrow right">
                  <span class="total_money">{{peoitem.should_deduct}}元</span>
                  <span class="rel_money">{{peoitem.real_deduct}}元</span>
                </div>
                <div class="free_cells">
                  <div class="free_cell" v-if="peoitem.balance_subsidy>0">互助金余额抵扣{{peoitem.balance_subsidy}}元</div>
                  <div class="free_cell" v-if="peoitem.ticket_subsidy>0">红包抵扣{{peoitem.ticket_subsidy}}元</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <div class="no-data" v-if="helpList&&helpList.length==0">
        <img src="../images/shareNoData.png" />
        <div class="txt">没有参与该条件下的分摊</div>
      </div>
    </div>
    <div class="sina_bot_ab">
      <my-service></my-service>
    </div>

  </div>
</template>

<script>
  import myService from '../../components/myService'
  import Api from "../../utils/apiConfig";
  export default {
    name: "shareList",
    components: {
      myService
    },
    data(){
      return{
        checkTabShow:false,
        checkTabIndex:0,
        searchInfo:{
          year:'2021',
          planName:'',
          people:{
            uuid: '',
            name:'全部'
          }
        },
        years: [],
        insuredPeoples:null,
        headNums:null,
        helpList:null,
      }
    },
    created() {
      let nowYear = new Date().getFullYear();
      this.searchInfo.year = nowYear;
      this.years = [];
      for (let i = nowYear; i >= 2019; i--) {
        this.years.push(i);
      }
      this.getMemberHelpData();
      this.getHelpDealList();
      if (!sessionStorage.getItem('myPlanInfo')) {
        this.getPlanList();
      }else{
        let myPlanInfo = JSON.parse(sessionStorage.getItem('myPlanInfo'));
        let dataList = [];
        myPlanInfo.dataList.forEach(item=>{
          item.insured['uuid'] = item.insured.customerno;
          dataList.push(item.insured)
        })
        this.insuredPeoples = dataList;
      }
    },

    methods:{

      getHelpDealList(){
        let params = {
          year:this.searchInfo.year
        }
        if(this.searchInfo.people.uuid!=''){
          params['e_uid'] = this.searchInfo.people.uuid;
        }
        if(this.searchInfo.planName=='大病互助计划'){
          params['plan_code'] = 'XL001'
        }else  if(this.searchInfo.planName=='意外医疗互助计划'){
          params['plan_code'] = 'XL002'
        }else  if(this.searchInfo.planName=='新冠病毒互助计划'){
          params['plan_code'] = 'XL003'
        }
        this.$get(Api.helpDealList,params ).then(res => {
          if (res.code == 0) {
            this.helpList = res.data.deal_list;
          } else {
            this.$toast(res.msg || "请求超时，请刷新重试");
          }
        })
      },
      getMemberHelpData(){
        this.$get(Api.memberHelpData, {}).then(res => {
          if (res.code == 0) {
            this.headNums = res.data;
          } else {
            this.$toast(res.msg || "请求超时，请刷新重试");
          }
        })
      },
      getPlanList(){
        this.$get(Api.getPolicyList, {}).then(res => {
          if (res.code == 0) {
            let dataList = [];
            res.data.policy_list.forEach(item=>{
              item.insured['uuid'] = item.insured.customerno;
              dataList.push(item.insured)
            })
            this.insuredPeoples = dataList;
          }
        })
      },
      checkedTab(idx){
        if(idx==this.checkTabIndex){
          this.checkTabShow = !this.checkTabShow ;
        }else{
          this.checkTabShow =true ;
        }
         this.checkTabIndex = idx;
      },
      checkedIcon(item){
        if(this.checkTabIndex==0){
          this.searchInfo.people = {
            uuid:item.uuid,
            name:item.name
          };
        } else  if(this.checkTabIndex==1){
          this.searchInfo.year = item;
        }else  if(this.checkTabIndex==2){
          if(item == this.searchInfo.planName){
            this.searchInfo.planName = '';
          }else{
            this.searchInfo.planName = item;
          }
        }
        this.checkTabShow = false;
        this.getHelpDealList();
      },
      checkDetail(anno_id,uuid){
        this.$router.push(`/weibo/share-detail?year=${this.searchInfo.year}&anno_id=${anno_id}&uuid=${uuid}`)
      },
      checkPublic(id,child){
        let planName =child[0].plan_list ?  child[0].plan_list[0] :'';
        let planCode = 'XL002';
        if(planName){
          switch (planName) {
            case "大病互助计划" :
              planCode = 'XL001';
              break;
            case "意外医疗互助计划" :
              planCode = 'XL002';
              break;
            case "新冠病毒互助计划" :
              planCode = 'XL003';
              break;
            case "意外伤害互助计划" :
              planCode = 'XL004';
              break;
            case "老年防癌互助计划" :
              planCode = 'XL005';
              break;
            default:
              break;
          }
        }
        this.$router.push(`/weibo/public-member?id=${id}&planCode=${planCode}`)
      }
    }
  }
</script>
<style>
  .share-QA .myfqas .sina_radius_bg{
    margin: 0 20px;
    box-shadow:none;
  }
</style>
<style lang="scss" scoped>
  @import "../css/mixin";
  .sina_page{
    padding-bottom: 204px;
    .head-wrap{
      position: relative;
      color: #fff;
      height: 220px;
      padding: 46px 0 56px;
      background-image: url("../images/publicBanner2_2x.png");
      background-repeat: no-repeat;
      background-size: 100% auto;
      .public_cells {
        .public_cell {
          position: relative;
          .nums{
            line-height: 78px;
            height: 78px;
          }
        }
      }
    }
    .search_cont{
      color: #B7B6B6;
      background: #fff;
      font-size: 28px;
      padding: 30px;
      position: relative;
      .plan_tabs{
        display: flex;
        text-align: center;
        font-size: 22px;
        color: #333;
        .plan_tab{
          position: relative;
          width:210px;
          height:46px;
          line-height: 46px;
          background:rgba(255,255,255,1);
          border-radius:27px;
          border:1px solid rgba(183,182,182,1);
          flex: 1;
          margin-right: 30px;
          padding-right: 40px;
          padding-left: 24px;
          @include  single-line;
          &:last-child{
            margin-right: 0;
          }
          &.hasarrow::after{
            right:20px;
            margin-top: -12px;
          }

        }
      }
      .total_share{
        padding-top: 40px;
        .money{
          color: $primary;
        }
      }
      .check_tabs{
        position: absolute;
        top: 96px;
        left: 30px;
        right: 30px;
        padding: 16px 24px;
        background:rgba(255,255,255,1);
        box-shadow:0px 6px 16px 0px rgba(171,187,211,0.3);
        border-radius:10px;
      }
    }
    .plan_icons{
      .plan_icon{
        height:36px;
        line-height: 36px;
        border-radius:18px;
        padding: 0 22px;
        font-size: 22px;
        color: $primary;
        display: inline-block;
        border:1px solid $primary;
        &.medium{
          margin-right: 24px;
        }
        &:last-child{
          margin-right: 0;
        }
        &.active{
          background:rgba(255,241,227,1);
          border-radius:27px;
          border:1px solid rgba(255,130,0,1);
        }
      }
    }
    .share_num_cells{
      margin-top: 20px;
      background: #fff;
      .share_num_cell{

        padding: 40px 0 10px 30px;
        .num_title{
          color: #939393;
          display: flex;
          line-height: 46px;
          .name{
            flex: 1;
            font-size: 32px;
            font-weight: bold;
          }
          .hasarrow{
            padding-right: 50px;
            font-size: 24px;
            &::after{
              width: 12px;
              height: 12px;
              right: 30px;
            }
          }
        }
        .people_cells{
          .people_cell{
            padding: 30px 30px 14px 0;
            border-bottom: 1px solid #e6e6e6;
            display: flex;
            align-items: center;
            .people_info{
              font-size: 34px;
              font-weight: bold;
              margin-bottom: 10px;
              .money{
                font-weight: normal;
              }
            }

            .left_cont{
              flex: 1;

            }
            .right_cont{
               text-align: right;
              .money_info{
                line-height: 48px;
                .total_money{
                  text-decoration:line-through;
                  color: #939393;
                  padding-right: 20px;
                }
                .rel_money{
                  font-size: 34px;
                }
              }
              .free_cells{
                padding-top: 10px;
                color: #F14B58;
                .free_cell{
                  padding-bottom: 18px;
                  &:last-child{
                    padding-bottom: 0;
                  }
                }
              }
              .hasarrow {
                &::after{
                  width: 12px;
                  height: 12px;
                }
              }
            }
            .plan_icons {
              .plan_icon {
                margin-right: 10px;
                margin-bottom: 16px;
              }
            }
            &:last-child{
              /*border-bottom: 0;*/
            }
          }
        }
      }
    }
    .no-data{
      width: 316px;
      margin: 0px auto;
      padding: 80px 0 40px;
      color: #939393;
      text-align: center;
      .txt{
        padding-top: 20px;
      }
    }
  }
</style>
