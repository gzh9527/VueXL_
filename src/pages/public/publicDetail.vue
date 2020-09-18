<template>
  <div class="sina_page" v-if="personItem">
    <div class="head-title">
      <span v-if="personItem.riskCode == 'XL001'">大病互助计划</span>
      <span v-if="personItem.riskCode == 'XL002'">意外医疗计划</span>
      <span v-if="personItem.riskCode == 'XL003'">新冠互助计划</span>
      <span v-if="personItem.riskCode == 'XL004'">意外伤害计划</span>
      <span v-if="personItem.riskCode == 'XL005'">老年防癌计划</span>
    </div>
    <div class="head-wrap">
      <img src="../images/publicBanner2_2x.png">
      <div class="public-number">{{personItem.insuredName}}<span>{{personItem.insuredAge}}岁</span><span>{{personItem.insuredSex ==0 ?'男':'女'}}</span>
      </div>
      <div class="public-date">
        <span v-if="personItem.riskCode == 'XL003'">{{personItem.joinDate}}加入</span>
        {{personItem.riskName}}
      </div>
    </div>
    <div class="sina_cont">
      <div class="comm_title">申请互助金{{personItem.amnt}}元</div>
      <div class="plan_name" v-if="personItem.riskCode == 'XL003'">新冠肺炎住院津贴</div>
      <div class="comm_title">审核结果</div>
      <div class="detail_con1">
        <p>会员{{personItem.name}}本次<span v-if="personItem.riskCode == 'XL003'">肺炎互助</span><span v-if="personItem.riskCode == 'XL002'">意外医疗</span><span v-if="personItem.riskCode == 'XL001'">大病互助</span>申请符合互助条件，经审核给付互助金{{personItem.amnt}}元</p>

      </div>
    </div>
    <div class="sina_cont">
      <div class="comm_title">案件详情</div>
      <div class="detail_con2">
        <p>会员姓名：{{personItem.insuredName}}</p>
        <p>性别：{{personItem.insuredSex ==0 ?'男':'女'}}</p>
        <p>身份证号：{{personItem.idNo}}</p>
        <p v-if="personItem.riskCode == 'XL003'">凭证号：{{personItem.contNo}}</p>
        <p>加入互助计划名称：{{personItem.riskName}}</p>
        <p v-if="personItem.riskCode == 'XL003'">加入计划日期：{{personItem.joinDate}}</p>
        <p v-if="personItem.riskCode == 'XL003'">计划生效时间：{{personItem.cvaliDate}}</p>
        <p v-html="personItem.accdentDesc"></p>
        <table border="0" style="text-align: center;" v-if="personItem.riskCode == 'XL003'">
          <tbody>
          <tr>
            <td>ICU病房住院天数（入住满24小时）</td>
            <td>普通病房住院天数（入住满24小时）</td>
          </tr>
          <tr>
            <td>{{personItem.icuhospiDays}}天</td>
            <td>{{personItem.hospiDays}}天</td>
          </tr>
          <tr>
            <td colspan="2"> 互助金额：<span v-if="personItem.icuhospiDays>0">{{personItem.icuunitMoney}}元×{{personItem.icuhospiDays}}天+</span>
              {{personItem.unitMoney}}元×{{personItem.hospiDays}}天 = {{personItem.amnt}}元
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="sina_cont" v-if="1==2&&personItem.riskCode == 'XL002'">
      <div class="comm_title">核算结果</div>
      <div>会员花费共计{{personItem.billMoney || 0}}元，扣除已报销金额{{personItem.reimbMoney ||0}}元，不属于当地社会基本医疗保险支付范围的自费医疗费用{{personItem.selfPay ||0}}元以及互助金起付额{{personItem.getLimit ||0}}元后，本次互助金额上限为{{personItem.amnt ||0}}元。</div>
    </div>
    <div class="sina_cont">
      <div class="comm_title">核实过程</div>
      <div v-if="personItem.riskCode == 'XL003'">
        经过对成员本人随访跟进、电话了解医院和医生、检核成员肺炎就医的相关资料，确认符合加入条件及互助条件。
      </div>
      <div v-else>
        经过向成员本人了解情况、当地侧访了解情况、医院等排查，确认符合加入条件及互助条件。
      </div>
    </div>
    <div class="sina_cont">
      <div class="comm_title">公示材料</div>
      <div class="publicity-img">
        <template v-for="(item,idx) in publicImgs">
          <img @click="showImage(item)" :src="item.url?item.url+'_thumb':item" alt="" :key="idx">
        </template>
      </div>
    </div>
    <div class="toast-mask" v-if="imgAlert" @click="imgAlert=!imgAlert">
      <div class="toast-img">
        <img :src="imgUrl"/>
      </div>
    </div>
    <my-service hasMoreBtn="true"></my-service>
  </div>
</template>

<script>
  import myService from '../../components/myService';
  import Api from "../../utils/apiConfig";

  export default {
    name: "publicDetail",
    components: {
      myService,
    },
    data() {
      return {
        publicId: null,
        contNo: null,
        clmNo:'',
        personList:[
          {
            insuredName:'徐汉',
            insuredSex:0,
            insuredAge:'24',
            joinDate:'2020年2月3日',
            cvaliDate:'2020年2月4日',
            amnt:'5300.00',
            result:'',
            riskCode:'XL003',
            riskName:'新浪新型冠状病毒互助计划',
            idNo:'42112219951015****',
            contNo:'P2031198912854109417964',
            unitMoney:'15',
            hospiDays:'300',
            icuunitMoney:'1',
            icuhospiDays:'800',
            accdentDesc:`
                    <p>会员于2020年2月11日经武汉市武东医院核酸检测阳性，确诊患有新型冠状病毒。2020年2月13日入住华中科技大学附属梨园医院ICU病房，2020年2月15日转入武汉市青山方舱医院（即武汉市第九医院）普通病房继续治疗，2020年2月29日治愈出院。</p>
                    <p>事件属实,经核定互助金额上限为5300.00元。</p>
                    `,
            imgsList:[
              'https://sinaoss.bihubao.com/publicity/feiyan/202003/1_1.jpg?x-oss-process=image/resize,w_400/watermark,size_20,text_5paw5rWq5LqS5YqpDQo=,color_FFFFFF,shadow_50,t_100,g_se,x_10,y_10',
              'https://sinaoss.bihubao.com/publicity/feiyan/202003/1_2.jpg?x-oss-process=image/resize,w_400/watermark,size_20,text_5paw5rWq5LqS5YqpDQo=,color_FFFFFF,shadow_50,t_100,g_se,x_10,y_10',
              'https://sinaoss.bihubao.com/publicity/feiyan/202003/1_3.jpg?x-oss-process=image/resize,w_400/watermark,size_20,text_5paw5rWq5LqS5YqpDQo=,color_FFFFFF,shadow_50,t_100,g_se,x_10,y_10',
              'https://sinaoss.bihubao.com/publicity/feiyan/202003/1_4.jpg?x-oss-process=image/resize,w_400/watermark,size_20,text_5paw5rWq5LqS5YqpDQo=,color_FFFFFF,shadow_50,t_100,g_se,x_10,y_10'
            ],
          },
          {
            insuredName:'陈祥曾',
            insuredSex:0,
            insuredAge:'51',
            joinDate:'2020年2月5日',
            cvaliDate:'2020年2月6日',
            amnt:'5400.00',
            result:'',
            riskCode:'XL003',
            riskName:'新浪新型冠状病毒互助计划',
            idNo:'42010719690713****',
            contNo:'P2053922153111112208607',
            unitMoney:'18',
            hospiDays:'300',
            icuunitMoney:'0',
            icuhospiDays:'800',
            accdentDesc: `
                    <p>会员于2020年2月9日出现发热，于2月12日在隔离点被检测出核酸阳性，确诊感染新型冠状病毒。2020年2月12日入住武汉经济开发区体育中心方舱医院普通病房，2020年3月1日治愈出院。</p>
                    <p>事件属实,经核定互助金额上限为5400.00元。</p>
                     `,
            imgsList:[
              'https://imgs.bihubao.com/Public/images/insureAdView/fenyan/202003/2_1.jpg',
              'https://imgs.bihubao.com/Public/images/insureAdView/fenyan/202003/2_2.jpg',
              'https://imgs.bihubao.com/Public/images/insureAdView/fenyan/202003/2_3.jpg',
              'https://imgs.bihubao.com/Public/images/insureAdView/fenyan/202003/2_4.jpg'

            ],
          }
        ],
        personItem: null,
        publicImgs:null,
        imgAlert: false,
        imgUrl: null
      }
    },
    created() {
      this.publicId = this.$route.query.publicId;
      this.contNo = this.$route.query.contNo;
      this.clmNo = this.$route.query.clmNo;
      if(this.$route.query.id){
        this.personItem = this.personList[this.$route.query.id];
        this.publicImgs = this.personItem.imgsList;
      }else{
        if (sessionStorage.getItem('_PublicUserInfo')) {
          this.personItem = JSON.parse(sessionStorage.getItem('_PublicUserInfo'));
          this.getEnterAffixs();
        } else {
          this.getPublicDescList();
        }
      }

    },
    methods: {
      showImage(item) {
        this.imgAlert = true;
        this.imgUrl = item.url ? item.url : item;
      },
      getPublicDescList() {
        this.$get(Api.getPublicDescList, {public_id: this.publicId},true).then(ret => {
          if (ret.code == 0) {
            let planCode = this.$route.query.planCode;
            ret.data.data_list[planCode].forEach(item => {

              if ((this.contNo&&item.contNo == this.contNo) || (this.clmNo&&item.clmNo == this.clmNo)) {
                let peopleDetail = item;
                if (item.riskCode == 'XL003') {
                  let hos = {
                    unitMoney: 300,
                    hospiDays: 0,
                    icuunitMoney: 800,
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
                this.personItem = peopleDetail;
                this.getEnterAffixs();
              }
            })

          }
        })
      },
      getEnterAffixs() {
        let baseUrl ='https://tpa.bihubao.com/api/common/img/';
        this.$post(Api.getEnterAffixs,{
          rgtNo:this.personItem.clmNo,
          pubFlagDto:"0"},true).then(ret=>{
           if(ret&&ret.length>0){
             let imgList = [];
             ret.forEach(item=>{
               let imgitem = {
                 url : baseUrl +`${item.imgId}.${item.fileType}`
               };
               imgList.push(imgitem);
             });
             this.publicImgs = imgList;
           }
        })
      },

    },
    destroyed() {
      sessionStorage.removeItem('_PublicUserInfo')
    }
  }
</script>
<style>
  table {
    width: 100%;
    margin-top: 10px;
    border-right: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
  }

  table th, table td {
    padding: 10px 6px;
    border-left: 1px solid #e6e6e6;
    border-top: 1px solid #e6e6e6;
    text-align: center;

  }

  .detail_con2 p {
    padding: 4px 0;
    line-height: 1.6;
  }

</style>
<style lang="scss" scoped>
  @import "../css/mixin";

  .sina_page {
    .head-title {
      font-size: 36px;
      height: 100px;
      line-height: 100px;
      padding-left: 30px;
      background: #fff;
    }

    .head-wrap {
      position: relative;
      color: #fff;

      .public-number {
        position: absolute;
        left: 36px;
        top: 40px;
        font-size: 38px;
        line-height: 54px;

        span {
          padding-left: 24px;
          font-size: 24px;
        }
      }

      .public-date {
        position: absolute;
        left: 30px;
        top: 104px;
      }
    }

    .sina_cont {
      background: #fff;
      margin-bottom: 20px;
      padding-bottom: 40px;

      .comm_title {
        font-size: 32px;
        font-weight: bold;
        padding: 30px 0 20px;
      }

      .plan_name {
        font-size: 32px;
        color: $primary;
        font-weight: bold;
        padding-bottom: 20px;
      }

      .detail_con1 {
        padding: 30px 20px 30px 30px;
        background: #F9F9FC;
        border-radius: 20px;
      }

      .detail_con2 {
        padding: 0 30px;

        p {
          padding: 4px 0;
          line-height: 1.6;
        }
      }

      .publicity-img {
        display: flex;
        flex-wrap: wrap;
        margin-top: 10px;

        img {
          width: 148px;
          height: 148px;
          margin-right: 26px;
          margin-bottom: 26px;

          &:nth-child(4n) {
            margin-right: 0px;
          }
        }
      }


    }

    .toast-img {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
  }
</style>
