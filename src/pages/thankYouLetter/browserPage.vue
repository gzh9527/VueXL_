<template>
  <div class="wrapper">
    <div class="tipsIssue">
      <h6>{{PublicData.name}}</h6>
      <p>公示期间 {{PublicData.start_date}}至 {{PublicData.end_date}}</p>
    </div>
    <div class="linkDetail">
      <span>大病互助计划</span>
      <div class="linkBtn">
        <a @click="linkSina(1)">了解更多</a>
        <img src="../images/rightlink.png" alt />
      </div>
    </div>
    <div class="huzhuTable">
      <div class="tableBox">
        <p>
          {{publicDataXl001.help_count}}
          <span>人</span>
        </p>
        <span>受助人数</span>
        <div class="line"></div>
      </div>
      <div class="tableBox">
        <p>
          {{Xl001_persons}}
          <span>人</span>
        </p>
        <span>分摊人数</span>
        <div class="line"></div>
      </div>
      <div class="tableBox">
        <p>
          {{publicDataXl001.unit_amount}}
          <span>元</span>
        </p>
        <span>预计分摊基数</span>
      </div>
    </div>
    <div class="card">
      <h6>您未参与本次分摊！</h6>
      <div class="cardText">
        <p>开通新浪免密支付,方便您参与每期互助分摊扣款，避免权益失效。</p>
        <button @click="linkSina(2)">开通权益</button>
      </div>
    </div>
    <h5>往期会员故事</h5>
    <div class="huzhuCase">
      <div class="caseBox">
        <div class="hederImg">
          <img src="../images/tou.png" alt />
          <div class="headerText">
            <p>
              <b>刘*青</b>
              <a>49岁</a>
              <a>左乳浸润性导管癌</a>
            </p>
            <span>新浪互助成员</span>
          </div>
        </div>
        <div class="caseImg">
          <img src="../images/caseimg.png" alt />
        </div>
        <div
          class="caseDetail"
        >目前我定期于深圳第三人民医院化疗治疗，当我在为化疗费用发愁时，是新浪互助伸出援手，缓解了我的经济压力。感谢新浪互助这个大家庭的爱心和温暖，今后的日子我会更加热爱生活，也会让更多的人加入到这个大家庭中，继续传播这份大爱。</div>
        <h5>帮助进展</h5>
        <div class="huzhuTable">
          <div class="tableBox">
            <p>
              <span>￥</span>
              300000.00
            </p>
            <span>已获得互助金</span>
            <div class="line"></div>
          </div>
          <div class="tableBox">
            <p>
              262,943
              <span>人</span>
            </p>
            <span>本期相助人数</span>
          </div>
        </div>
        <div class="iconS">
          <span>
            <img src="../images/successcase.png" alt />
            <b>身份证明</b>
          </span>
          <span>
            <img src="../images/successcase.png" alt />
            <b>病情证明</b>
          </span>
          <span>
            <img src="../images/successcase.png" alt />
            <b>实地调查</b>
          </span>
        </div>
      </div>
    </div>
    <div class="footerBtn">
      <span @click="linkSina(3)">我的权益</span>
      <span @click="linkSina(4)">我的互助</span>
    </div>
  </div>
</template>

<script>
import Api from '../../utils/apiConfig'
export default {
  name: "browserPage",
  data() {
    return {
      publicId:'',
      PublicData:'',
      publicDataXl001:'',
      Xl001_persons:0,
      channel:'10030'
    };
  },
  created() {
    if (localStorage.getItem("_userToken")) {
      this.actionCount("pv", () => {
        this.linkSina();
      });
    } else {
      this.setActionCount("pv", "-1", null, () => {
        this.linkSina();
      }); //未授权埋点
    }
  },
  mounted(){
    //获取publicid
    this.$get(Api.getPublicList,{
    page:this.page,
    per_count:10
      },true).then((ret)=>{
      console.log(ret.data.public_list.XL001[0].public_id)
      this.publicId = ret.data.public_list.XL001[0].public_id
      this.$get(Api.getPublicData, {public_id: this.publicId},true).then(res=>{
      console.log(res,'.....res')
      this.PublicData = res.data.public_data
      this.publicDataXl001 = res.data.sub_list.XL001
      this.Xl001_persons =  res.data.sub_list.XL001.total_persons_init
      var b = parseInt(this.Xl001_persons).toString();
          var len = b.length;
          if (len <= 3) { return b; }
            var r = len % 3;
            this.Xl001_persons =   r > 0 ? b.slice(0, r) + "," + b.slice(r, len).match(/\d{3}/g).join(",") : b.slice(r, len).match(/\d{3}/g).join(",");
            console.log(this.Xl001_persons)
      })
          })
    },
  methods: {
    linkSina(cont) {
      if (cont == 1) {
        this.setActionCount("Learn_more",'click',null,()=>{});
      } else if (cont == 2) {
        this.setActionCount("open_qy",'click',null,()=>{});
      } else if (cont == 3) {
        this.setActionCount("my_sina_vip_click1",'click',null,()=>{});
      } else {
        this.setActionCount("my_sina_click1",'click',null,()=>{});
      }
      let ua = navigator.userAgent.toLowerCase();
      let channel = this.$route.query.channel || "10030";
      localStorage.setItem("channel", channel);
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        //在微信中打开
        this.$router.replace("/weibo/note-active");
      } else {
        if (window.location.hostname == "sina.bihubao.com") {
          window.location.href =
            "sinaweibo://browser?url=https%3A%2F%2Fsina.bihubao.com%2Fweibo%2Fsina-page%3Fchannel%3D" +
            channel;
        } else {
          window.location.href =
            "sinaweibo://browser?url=http%3A%2F%2Fsinatest.bihubao.com%2Fweibo%2Fsina-page%3Fchannel%3D" +
            channel;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  position: relative;
  .tipsIssue {
    width: 100%;
    height: 259px;
    background: url("../images/tipsISS.png") 100% 100% no-repeat;
      background-size: cover;
    overflow: hidden;
    h6 {
      width: 100%;
      color: #fff;
      font-size: 38px;
      font-family: "PingFangSC-Medium, PingFang SC";
      font-weight: 500;
      color: #ffffff;
      margin-top: 32px;
      margin-left: 30px;
    }
    p {
      width: 100%;
      color: #fff;
      font-size: 24px;
      font-family: "PingFangSC-Regular, PingFang SC";
      font-weight: 500;
      color: #ffffff;
      margin-top: 34px;
      margin-left: 30px;
    }
  }
  .linkDetail {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: solid #e6e6e6 1.125px;
    span {
      font-size: 32px;
      font-family: "PingFangSC-Medium, PingFang SC";
      font-weight: 500;
      color: #333333;
      margin-left: 30px;
    }
    .linkBtn {
      display: flex;
      align-items: center;
      margin-right: 30px;
      a {
        font-size: 24px;
        font-family: "PingFangSC-Regular, PingFang SC";
        font-weight: 400;
        color: #ff8200;
      }
      img {
        width: 24px;
        height: 24px;
        margin-left: 10px;
      }
    }
  }
  .huzhuTable {
    width: 100%;
    display: flex;
    .tableBox {
      width: 33.3%;
      display: flex;
      flex-direction: column;
      position: relative;
      p {
        width: 100%;
        display: flex;
        justify-content: center;
        font-size: 38px;
        font-family: "PingFangSC-Medium, PingFang SC";
        font-weight: 500;
        color: #333333;
        align-items: center;
        margin: 50px 0 10px 0;
        > span {
          font-size: 28px;
          font-family: "PingFangSC-Medium, PingFang SC";
          font-weight: 500;
          color: #333333;
          margin-top: 3px;
          margin-left: 2px;
        }
      }
      > span {
        width: 100%;
        display: flex;
        justify-content: center;
        font-size: 24px;
        font-family: "PingFangSC-Regular, PingFang SC";
        font-weight: 400;
        color: #939393;
      }
      .line {
        width: 3px;
        height: 36px;
        background: #e6e6e6;
        position: absolute;
        left: 100%;
        top: 54%;
      }
    }
  }
  .card {
    width: 690px;
    height: 200px;
    background: url("../images/imagebg.png") 100% 100% no-repeat;
      background-size: cover;
    border-radius: 20px;
    margin-left: 30px;
    overflow: hidden;
    margin-top: 56px;
    margin-right: 30px;
    h6 {
      width: 90%;
      height: 45px;
      font-size: 32px;
      font-family: "PingFangSC-Medium, PingFang SC";
      font-weight: 500;
      color: #7c512d;
      margin: 32px 0 21px 5%;
    }
    .cardText {
      width: 100%;
      overflow: hidden;
      display: flex;
      justify-content: space-between;
      padding-right: 60px;
      margin-left: 5%;
      p {
        font-size: 22px;
        font-family: "PingFangSC-Regular, PingFang SC";
        font-weight: 400;
        color: #333333;
        width: 60%;
      }
      button {
        width: 180px;
        height: 68px;
        background: linear-gradient(180deg, #fff9f1 0%, #fff0de 100%);
        border-radius: 34px;
        font-size: 26px;
        font-family: "PingFangSC-Medium, PingFang SC";
        font-weight: 500;
        color: #906444;
        text-align: center;
        border: none;
        outline: none;
      }
    }
  }
  h5 {
    width: 100%;
    padding: 28px 0;
    text-indent: 30px;
    font-size: 32px;
    font-family: "PingFangSC-Medium, PingFang SC";
    font-weight: 500;
    color: #333333;
    margin-top: 56px;
  }
  .huzhuCase {
    width: 100%;
    background: #f2f2f2;
    overflow: hidden;
    padding-bottom: 150px;
    .caseBox {
      width: 94%;
      margin-left: 3%;
      background: #fff;
      margin-top: 20px;
      margin-bottom: 50px;
      border-radius: 20px;
      .hederImg {
        width: 100%;
        display: flex;
        align-items: center;
        img {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          margin: 50px 50px 70px 20px;
        }
      }
      .headerText {
        display: flex;
        flex-direction: column;
        p {
          b {
            font-size: 36px;
            font-family: "PingFangSC-Semibold, PingFang SC";
            font-weight: 600;
            color: #464646;
          }
          a {
            font-size: 24px;
            font-family: "PingFangSC-Medium, PingFang SC";
            font-weight: 500;
            color: #464646;
            margin-left: 20px;
          }
        }
        > span {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 194px;
          height: 36px;
          border-radius: 18px;
          border: 1px solid #ff8200;
          font-size: 24px;
          font-family: "PingFangSC-Regular, PingFang SC";
          font-weight: 400;
          color: #ff8200;
          margin-top: 23px;
        }
      }
      .huzhuTable {
        width: 100%;
        display: flex;
        .tableBox {
          width: 50%;
          display: flex;
          flex-direction: column;
          position: relative;
          p {
            width: 100%;
            display: flex;
            justify-content: center;
            font-size: 38px;
            font-family: "PingFangSC-Medium, PingFang SC";
            font-weight: 500;
            color: #333333;
            align-items: center;
            margin: 50px 0 10px 0;
            > span {
              font-size: 28px;
              font-family: "PingFangSC-Medium, PingFang SC";
              font-weight: 500;
              color: #333333;
              margin-top: 3px;
              margin-left: 2px;
            }
          }
          > span {
            width: 100%;
            display: flex;
            justify-content: center;
            font-size: 24px;
            font-family: "PingFangSC-Regular, PingFang SC";
            font-weight: 400;
            color: #939393;
          }
          .line {
            width: 3px;
            height: 36px;
            background: #e6e6e6;
            position: absolute;
            left: 100%;
            top: 54%;
          }
        }
      }
      .caseDetail {
        width: 610px;
        margin-left: 50px;
        font-size: 26px;
        font-family: "PingFangSC-Regular, PingFang SC";
        font-weight: 400;
        color: #333333;
        line-height: 40px;
        margin-top: 30px;
      }
      .caseImg {
        width: 610px;
        display: flex;
        justify-self: center;
        align-items: center;
        margin-left: 50px;
        img {
          width: 100%;
          height: auto;
        }
      }
      > h5 {
        width: 610px;
        margin-left: 50px;
        padding: 0;
        text-indent: 0;
        margin-top: 50px;
      }
      .iconS {
        width: 610px;
        margin-left: 50px;
        display: flex;
        justify-content: space-between;
        padding: 58px 0 62px 0;
        span {
          display: flex;
          align-items: center;
          img {
            width: 32px;
            height: 32px;
          }
          b {
            font-size: 28px;
            font-family: "PingFangSC-Medium, PingFang SC";
            font-weight: 500;
            color: #333333;
            margin-left: 10px;
          }
        }
      }
    }
  }
  .footerBtn {
    width: 100%;
    background: #fff;
    display: flex;
    height: 120px;
    position: fixed;
    left: 0;
    bottom: 0;
    span {
      width: 50%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 36px;
      font-family: "PingFangSC-Medium, PingFang SC";
      font-weight: 500;
      color: #333333;
    }
    span:nth-child(2) {
      width: 50%;
      background: #ff8200;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 36px;
      font-family: "PingFangSC-Medium, PingFang SC";
      font-weight: 500;
      color: #fff;
    }
  }
}
</style>
