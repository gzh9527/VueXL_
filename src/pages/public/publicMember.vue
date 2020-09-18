<template>
  <div class="sina_page">
    <div class="head-wrap">
      <img src="../images/publicBanner1_2x.png">
      <div class="public-number">{{publicData&&publicData.name}}</div>
      <div class="public-date">公示期间 {{publicData&&publicData.start_date}}至{{publicData&&publicData.end_date}} </div>
      <router-link to="/weibo/public-list" class="past_public hasarrow col_fff right">
        往期公示
      </router-link>
    </div>
    <div class="plan_types">
      <div class="plan_type" :class="{active:tabName == 'XL001'}"
           @click="changeTab('XL001')">大病互助
      </div>
      <div class="plan_type" :class="{active:tabName == 'XL002'}"
           @click="changeTab('XL002')">意外医疗
      </div>
      <div class="plan_type" :class="{active:tabName == 'XL003'}"
           @click="changeTab('XL003')">新冠互助
      </div>
      <div class="plan_type" :class="{active:tabName == 'XL005'}"
           @click="changeTab('XL005')">老年防癌</div>
      <div class="plan_type" :class="{active:tabName == 'XL004'}"
           @click="changeTab('XL004')">意外伤害</div>
    </div>

    <div class="data-cont">
      <div class="public_cells" >
        <div class="public_cell" >
          <div class="nums">{{showPublicData['help_count']}} <i>人</i></div>
          <div class="feiyantxt">受助人数</div>
        </div>
        <div class="public_cell">
          <div class="nums">{{toThousands(showPublicData['total_persons_init'])}} <i>人</i></div>
          <div class="feiyantxt">分摊人数</div>
        </div>
        <div class="public_cell">
          <div class="nums">{{showPublicData['unit_amount']}} <i>元</i></div>
          <div class="feiyantxt " @click="alertShow=true" v-if="tabName == 'XL001'">预计分摊基数<i class="has_icon"></i></div>
          <div class="feiyantxt" v-else>预计分摊金额</div>
        </div>
      </div>
      <div class="txt-intro" v-if="tabName == 'XL003'">您享有4月30日前免分摊权益，不参与本次分摊。</div>
    </div>
    <div class="com-title">受助成员名单</div>

    <div class="publicm_cells" v-if="peopleInfos">
      <div class="no-data" v-if="!peopleInfos[tabName] || peopleInfos[tabName].length==0">
        <img src="../images/shareNoData.png" />
        <div class="txt">本期没有需要帮助的成员</div>
      </div>
      <template v-else v-for="(item,idx) of peopleInfos[tabName]">
        <div class="publicm_cell" @click="checkDetail(item.contNo,idx)" :key="idx">
          <div class="userName hasarrow right">{{item.insuredName_mask}}<span class="pl20">{{item.riskShortName}}</span></div>
          <div class="user_info">{{item.insuredAge}}岁<span>{{item.insuredSex==0 ? '男' :'女'}}</span>申领互助金{{item.amnt}}元</div>
        </div>
      </template>

      <!--        <div class="publicm_cell" @click="checkDetail(2)">-->
      <!--          <div class="userName hasarrow right">李清<span class="pl20">新冠肺炎</span></div>-->
      <!--          <div class="user_info">52岁<span>男</span>申领互助金7800元</div>-->
      <!--        </div>-->
    </div>
    <my-service fixedBotBtn="true"></my-service>
    <sina-alert v-if="alertShow"
                classSize="medium" @sumbitEvt="alertShow=false"
                isComponents="true">
      <template>
        <div class="alert_cont">
          <div class="clause_tabs" >
            <div class="clause_tab" :class="{active:tabIndex==0}" @click="tabIndex=0">报销型</div>
            <div class="clause_tab" :class="{active:tabIndex==1}" @click="tabIndex=1">给付型</div>
          </div>
          <table class="table_css" v-if="tabIndex==0">
            <tr>
              <th class="hasline"><span class="left">保额</span><span class="right">年龄</span></th>
              <th>0-35</th>
              <th>36-50</th>
              <th>51-55</th>
              <th>56-60</th>
            </tr>
            <tr>
              <td>5万</td>
              <td>￥{{getVal(1)}}</td>
              <td>￥{{getVal(2)}}</td>
              <td>￥{{getVal(4)}}</td>
              <td>￥{{getVal(6)}}</td>
            </tr>
            <tr>
              <td>7.5万</td>
              <td>￥{{getVal(1.5)}}</td>
              <td>￥{{getVal(3)}}</td>
              <td>￥{{getVal(6)}}</td>
              <td>￥{{getVal(9)}}</td>
            </tr>
            <tr>
              <td>10万</td>
              <td>￥{{getVal(2)}}</td>
              <td>￥{{getVal(4)}}</td>
              <td>￥{{getVal(8)}}</td>
              <td>￥{{getVal(12)}}</td>
            </tr>
            <tr>
              <td>15万</td>
              <td>￥{{getVal(3)}}</td>
              <td>￥{{getVal(6)}}</td>
              <td>￥{{getVal(12)}}</td>
              <td>￥{{getVal(18)}}</td>
            </tr>
            <tr>
              <td>20万</td>
              <td>￥{{getVal(4)}}</td>
              <td>￥{{getVal(8)}}</td>
              <td>￥{{getVal(16)}}</td>
              <td>￥{{getVal(24)}}</td>
            </tr>
            <tr>
              <td>25万</td>
              <td>￥{{getVal(5)}}</td>
              <td>￥{{getVal(10)}}</td>
              <td>￥{{getVal(20)}}</td>
              <td>￥{{getVal(30)}}</td>
            </tr>
            <tr>
              <td>30万</td>
              <td>￥{{getVal(6)}}</td>
              <td>￥{{getVal(12)}}</td>
              <td>￥{{getVal(24)}}</td>
              <td>￥{{getVal(36)}}</td>
            </tr>
            <tr>
              <td>35万</td>
              <td>￥{{getVal(7)}}</td>
              <td>￥{{getVal(14)}}</td>
              <td>￥{{getVal(28)}}</td>
              <td>￥{{getVal(42)}}</td>
            </tr>
            <tr>
              <td>40万</td>
              <td>￥{{getVal(8)}}</td>
              <td>￥{{getVal(16)}}</td>
              <td>￥{{getVal(32)}}</td>
              <td>￥{{getVal(48)}}</td>
            </tr>
          </table>
          <table class="table_css" v-if="tabIndex==1">
            <tr>
              <th class="hasline"><span class="left">保额</span><span class="right">年龄</span></th>
              <th>0-35</th>
              <th>36-50</th>
              <th>51-55</th>
              <th>56-60</th>
            </tr>
            <tr>
              <td>5万</td>
              <td>￥{{getVal(2)}}</td>
              <td>￥{{getVal(4)}}</td>
              <td>￥{{getVal(8)}}</td>
              <td>￥{{getVal(12)}}</td>
            </tr>
            <tr>
              <td>7.5万</td>
              <td>￥{{getVal(3)}}</td>
              <td>￥{{getVal(6)}}</td>
              <td>￥{{getVal(12)}}</td>
              <td>￥{{getVal(18)}}</td>
            </tr>
            <tr>
              <td>10万</td>
              <td>￥{{getVal(4)}}</td>
              <td>￥{{getVal(8)}}</td>
              <td>￥{{getVal(16)}}</td>
              <td>￥{{getVal(24)}}</td>
            </tr>
            <tr>
              <td>15万</td>
              <td>￥{{getVal(6)}}</td>
              <td>￥{{getVal(12)}}</td>
              <td>￥{{getVal(24)}}</td>
              <td>￥{{getVal(36)}}</td>
            </tr>
            <tr>
              <td>20万</td>
              <td>￥{{getVal(8)}}</td>
              <td>￥{{getVal(16)}}</td>
              <td>￥{{getVal(32)}}</td>
              <td>￥{{getVal(48)}}</td>
            </tr>
            <tr>
              <td>25万</td>
              <td>￥{{getVal(10)}}</td>
              <td>￥{{getVal(20)}}</td>
              <td>￥{{getVal(40)}}</td>
              <td>￥{{getVal(60)}}</td>
            </tr>
            <tr>
              <td>30万</td>
              <td>￥{{getVal(12)}}</td>
              <td>￥{{getVal(24)}}</td>
              <td>￥{{getVal(48)}}</td>
              <td>￥{{getVal(72)}}</td>
            </tr>
            <tr>
              <td>35万</td>
              <td>￥{{getVal(14)}}</td>
              <td>￥{{getVal(28)}}</td>
              <td>￥{{getVal(56)}}</td>
              <td>￥{{getVal(84)}}</td>
            </tr>
            <tr>
              <td>40万</td>
              <td>￥{{getVal(16)}}</td>
              <td>￥{{getVal(32)}}</td>
              <td>￥{{getVal(64)}}</td>
              <td>￥{{getVal(96)}}</td>
            </tr>
          </table>
        </div>

      </template>
    </sina-alert>
  </div>
</template>

<script>
  import myService from '../../components/myService'
  import Api from "../../utils/apiConfig";
  import sinaAlert from "@/components/sinaAlert/sinaAlert.vue";
  export default {
    name: "publicMember",
    components: {
      myService,sinaAlert
    },
    data() {
      return {
        tabName: 'XL001',
        publicData:null, //顶部公示内容
        publicSubData:null,//三个分摊数目
        showPublicData:{
          help_count:0,
          total_persons_init:0,
          unit_amount:0,
        },
        peopleInfos:null,  //受助人信息
        publicId: null,
        alertShow:false,
        tabIndex:0
      }
    },
    created() {
      this.tabName = sessionStorage.getItem('planCode') ? sessionStorage.getItem('planCode') : this.$route.query.planCode || 'XL003';
      this.publicId = this.$route.query.id || 1;
      this.getPublicData();
      this.getPublicDescList();
    },
    methods: {
      getPublicData(){
        this.$get(Api.getPublicData,{public_id:this.publicId},true).then(ret=>{
          if(ret.code ==0 ){
            this.publicData = ret.data.public_data;
            this.publicSubData = ret.data.sub_list;
            this.showPublicData = this.publicSubData[this.tabName] ?  this.publicSubData[this.tabName] : {
              help_count:0,
              total_persons_init:0,
              unit_amount:0,
            };

          }
        })
      },
      getPublicDescList(){
        this.$get(Api.getPublicDescList,{public_id:this.publicId},true).then(ret=>{
          if(ret.code ==0 ){
            this.peopleInfos = ret.data.data_list;
          }
        })
      },
      changeTab(name) {
        this.tabName = name;
        this.showPublicData = this.publicSubData[this.tabName] ?  this.publicSubData[this.tabName] : {
          help_count:0,
          total_persons_init:0,
          unit_amount:0,
        };

      },
      checkDetail(id,idx) {
        let peopleDetail = this.peopleInfos[this.tabName][idx];
        if (peopleDetail.riskCode) {
          let hos = {
            unitMoney: 0,
            hospiDays: 0,
            icuunitMoney: 0,
            icuhospiDays: 0,
          };
          peopleDetail.dutyDetailDto.forEach(item => {
            if (item.getDutyKind == 204) {
              hos.unitMoney = item.unitMoney || 0;
              hos.hospiDays = item.hospiDays || 0;
            } else if (item.getDutyKind == 205) {
              hos.icuunitMoney = item.unitMoney || 0;
              hos.icuhospiDays = item.hospiDays || 0;
            }
          });
          peopleDetail = Object.assign({}, peopleDetail, hos);
        }
        sessionStorage.setItem('planCode',this.tabName);
        sessionStorage.setItem('_PublicUserInfo', JSON.stringify(peopleDetail));
        this.$router.push(`/weibo/public-detail?publicId=${this.publicId}&planCode=${this.tabName}&contNo=${id}`);
      },
      toThousands(num) {
        if (num) {
          let result = [];
          let counter = 0;
          num = (num || 0).toString().split('');
          for (let i = num.length - 1; i >= 0; i--) {
            counter++;
            result.unshift(num[i]);
            if (!(counter % 3) && i != 0) {
              result.unshift(',');
            }
          }
          return result.join('');
        } else {
          return '0'
        }

      },
      getVal(val){
        return (val*this.showPublicData['unit_amount']).toFixed(2);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../css/mixin";

  .sina_page {
    .head-wrap {
      position: relative;
      color: #fff;

      .public-number {
        position: absolute;
        left: 0;
        top: 30px;
        min-width: 367px;
        height: 72px;
        line-height:72px;
        font-size: 38px;
        text-align: center;
        background: #ffa500;
        border-radius: 0 36px 36px 0;
        padding: 0 30px;

      }

      .public-date {
        position: absolute;
        left: 30px;
        top: 120px;
      }
      .past_public{
        position: absolute;
        top: 30px;
        right: 30px;
        font-size: 24px;
        color: #fff;

      }
    }

    .plan_types {
      color: #939393;
      background: #fff;
      font-size: 28px;
      display: flex;
      text-align: center;

      .plan_type {
        position: relative;
        padding: 30px 0;
        flex: 1;

        &:after {
          content: "";
          @include cl;
          bottom: 16px;
          width: 0px;
          height: 4px;
          background-color: transparent;
          transition: all .3s;
        }

        &.active {
          font-weight: bold;
          color: $primary;

          &:after {
            width: 50px;
            background-color: $primary;
          }
        }
      }
    }

    .data-cont {
      margin: 20px 0;
      padding-bottom: 40px;
      background: #fff;

      .public_cells {
        padding: 50px 0;

        .public_cell {
          position: relative;

          &:after {
            content: "";
            position: absolute;
            top: 30px;
            right: 0;
            width: 2px;
            height: 36px;
            background: rgba(230, 230, 230, 1);
          }

          &:last-child {
            &:after {
              width: 0;
            }
          }

          .nums {
            font-size: 38px;
            font-weight: bold;
            line-height: 54px;
          }

          .feiyantxt {
            color: #939393;
            .has_icon{
               width: 24px;
              height: 24px;
              display: inline-block;
              background: url("../images/sinaIconInfo_2x.png");
              background-size: 24px 24px;
              margin-left: 10px;
              vertical-align: middle;
            }
          }
        }
      }

      .txt-intro {
        margin: 0px 30px;
        padding: 30px;
        background: #F9F9FC;
        border-radius: 20px;

      }
    }

    .com-title {
      position: relative;
      height: 92px;
      line-height: 92px;
      font-size: 32px;
      padding-left: 30px;
      background: #fff;
      border-bottom: 1px solid #e6e6e6;

      &:before {
        content: '';
        position: absolute;
        width: 8px;
        height: 32px;
        background: rgba(255, 130, 0, 1);
        top: 30px;
        left: 0px;

      }
    }

    .publicm_cells {
      padding: 0 30px;
      text-align: left;
      background: #fff;

      .publicm_cell {
        padding: 40px 0;
        border-bottom: 1px solid #e6e6e6;
        &:last-child{
          border-bottom: 0;
        }
        .userName {
          font-size: 32px;
          font-weight: bold;
        }

        .hasarrow::after {
          right: 6px;
        }

        .user_info {
          padding-top: 20px;
          color: #939393;

          span {
            padding: 0 24px 0 28px;
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

    .pl20 {
      padding-left: 20px;
    }
    .alert_cont{
      .clause_tabs{
        width: 100%;
        padding: 26px 0;
        display: flex;
        font-size: 30px;
        text-align: center;
        .clause_tab{
          flex: 1;
          padding: 10px 0;
          position: relative;
          &:after{
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width:0px;
            height:6px;
            background:transparent;
            transition: all .3s;
          }
          &.active{
            color: #ff8200;
            &:after{
              width:56px;
              background: #ff8200;
            }

          }
        }
      }
    }
    .table_css {
      margin-top: 10px;
      width: 100%;
      display: inline-table;
      border-right: 1px solid #e6e6e6;
      border-bottom: 1px solid #e6e6e6;
      th, td {
        padding: 10px 6px;
        font-size: 26px;
        border-left: 1px solid #e6e6e6;
        border-top: 1px solid #e6e6e6;
        text-align: center;

      }
      th{
        height: 100px;
      }
      .hasline{
        width: 100px;
        font-size: 22px;
        position: relative;
        font-weight: normal;
        &::before{
          content: "";
          position: absolute;
          width: 1px;
          height:140px;/*这里需要自己调整，根据td的宽度和高度*/
          top:0;
          left:0;
          background-color: #e6e6e6;
          display: block;
          transform: rotate(-45deg);/*这里需要自己调整，根据线的位置*/
          transform-origin: top;
        }
        .left{
          position: absolute;
          left: 10px;
          bottom: 10px;
        }
        .right{
          position: absolute;
          right: 10px;
          top: 10px;
        }
      }
    }


  }
</style>
