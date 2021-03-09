<template>
  <div class="sina_page">
    <div class="banner">
      <img src="http://sinahuzhu.oss-cn-beijing.aliyuncs.com/images/sina_publicity_temp/wjtop.png" alt="">
    </div>
    <div class="list">
      <div class="listSon" v-for="(item, index) in list" :key="index">
        <h6>{{ item.title }}</h6>
        <div
          class="listChoose"
          v-for="(data, ind) in item.listChoose"
          :key="ind"
          data-type="false"
          @click="chooseBtn(index, ind, item.type, $event)"
        >
          <div
            :class="
              data.flag
                ? item.type == 'radio'
                  ? 'radioBox'
                  : 'checkbox'
                : item.type == 'radio'
                ? 'box'
                : 'box2'
            "
            data-type="false"
          >
            <img
              v-show="item.type == 'radio' && data.flag"
              src="../../static/images/che2.png"
              alt=""
            />
            <img
              v-show="item.type == 'checkbox' && data.flag"
              src="../../static/images/che1.png"
              alt=""
            />
          </div>
          <p data-type="false">{{ data.textArea }}</p>
        </div>
      </div>
      <div class="btnBox">
        <button @click="submit()">提交</button>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "../utils/apiConfig";
import { mixinActions } from "../assets/js/mixinActions";
export default {
  components: {},
  mixins: [mixinActions],
  name: "questionnaire",
  data() {
    return {
      contL: false,
      list: [
        {
          title: "1.您是因为什么加入的新浪互助？",
          listChoose: [
            {
              textArea:
                "互助计划便宜，得病可以赔",
              flag: false,
            },
            { textArea: "可以限时免费领取新冠保障", flag: false },
            { textArea: "参与微博活动（微博积分、微博打卡、限时福利、领取3元红包）", flag: false },
            { textArea: "其他", flag: false },
          ],
          type: "radio",
        },
        {
          title: "2.您知道新浪互助计划的保障内容是什么吗？",
          listChoose: [
            { textArea: "新浪互助是啥？完全不知道", flag: false },
            { textArea: "简单看过，但是没深入研究", flag: false },
            { textArea: "知道互助计划怎么用", flag: false },
          ],
          type: "radio",
        },
        {
          title: "3.如果目前发生大病，您的应对方式有哪些？（多选）",
          listChoose: [
            { textArea: "动用辛苦打工攒下的血汗钱", flag: false },
            { textArea: "含泪变卖车、房等资产", flag: false },
            { textArea: "找亲友借钱、贷款等", flag: false },
            { textArea: "我有新浪互助", flag: false },
            { textArea: "我有医保（新农合、社保、城镇居民医疗）", flag: false },
            { textArea: "我有商业保险", flag: false },
            { textArea: "别的不多，就是钱多，不愁医药费", flag: false },
            { textArea: "其他", flag: false },
          ],
          type: "checkbox",
        },
        {
          title: "4.请问您或您身边的人对保险的看法？（多选）",
          listChoose: [
            { textArea: "保险是有用的，但是年轻时不需要", flag: false },
            { textArea: "生病的时候才需要，到时候再买吧", flag: false },
            { textArea: "保险是个好东西，能返钱", flag: false },
            { textArea: "啥也别说了，保险都是骗人的", flag: false },
            { textArea: "保险能转移风险，要趁早买好", flag: false },
            { textArea: "其他", flag: false },
          ],
          type: "checkbox",
        },
        {
          title: "5.业余时间您使用最多的获取知识的方式是哪一个？",
          listChoose: [
            { textArea: "线下面对面教学", flag: false },
            { textArea: "视频课程学习", flag: false },
            { textArea: "线上社群学习", flag: false },
            { textArea: "网络直播学习", flag: false },
            { textArea: "其他", flag: false },
          ],
          type: "radio",
        },
      ],
      sendData: {
        q1: "",
        q2: "",
        q3: [],
        q4: [],
        q5: "",
      },
    };
  },
  mounted() {
    this.actionCount("pv");
    //判断是否已经提交过问卷
    this.$get(Api.questionnaire_record, {}).then((res) => {
      if (res.code == 0) {
      } else {
       this.$router.replace("/weibo/joinPlanSuccess/questSuc");
      }
    });
  },
  methods: {
    //单双多选
    chooseBtn(index, index2, type, e) {
      console.log(e.currentTarget.getAttribute("data-type"));
      console.log(index, index2, type);
      //获取 选择项 实现单选 多选
      this.list[index].listChoose.forEach((item, ind) => {
        if (index2 == ind) {
          console.log(item);
          item.flag = !item.flag;
        } else {
          //处理单选
          if (type == "radio") {
            item.flag = false;
          }
        }
      });
    },
    //提交
    submit() {
      this.actionCount("click");
      this.sendData = {
        q1: "",
        q2: "",
        q3: [],
        q4: [],
        q5: "",
      };
      this.list.forEach((item, index) => {
        item.listChoose.forEach((data, ind) => {
          if (data.flag) {
            switch (index) {
              case 0:
                this.sendData.q1 = data.textArea;
                break;
              case 1:
                this.sendData.q2 = data.textArea;
                break;
              case 2:
                this.sendData.q3.push(data.textArea);
                break;
              case 3:
                this.sendData.q4.push(data.textArea);
                break;
              case 4:
                this.sendData.q5 = data.textArea;
                break;
            }
          }
        });
      });
      let ObjArr = [];
      ObjArr = Object.values(this.sendData);
      ObjArr.forEach((val, inx) => {
        if (val == "" || val.length <= 0) {
          this.$toast("您还有未选项请选择");
          this.contL = false;
        } else {
          this.contL = true;
        }
      });
      console.log(this.sendData);
      if (this.contL) {
        this.$post(Api.createAnswer, this.sendData).then((res) => {
          console.log(res.code);
          if (res.code == 0) {
            this.actionCount("clickSuc");
            this.$router.replace("/weibo/joinPlanSuccess/questSuc");
          } else {
            this.$toast(res.msg);
          }
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.sina_page{
background:#fff;
}
.banner{
  width:100%;
  height: auto;
  img{
    width:100%;
    height:auto;
  }
}
.list {
  width: 100%;
  height: 100%;
  background: #fff;
  margin-top: 30px;
  h6 {
    width: 90%;
    margin-left: 5%;
    padding: 32px 0;
    font-size: 32px;
    font-weight: normal;
    font-family: "PingFangSC-Semibold, PingFang SC";
    font-weight: 600;
    color: #333333;
  }
  .listChoose {
    width: 90%;
    margin-left: 5%;
    padding: 32px 0;
    display: flex;
    .box {
      width: 48px;
      height: 48px;
      display: flex;
      flex-shrink: 0;
      border-radius: 50%;
      border: solid 2px #ccc;
      transform: rotateZ(360deg);
      img {
        width: 48px;
        height: 48px;
      }
    }
    .box2 {
      width: 48px;
      height: 48px;
      display: flex;
      flex-shrink: 0;
      border-radius: 0.2rem;
      border: solid 2px #ccc;
      transform: rotateZ(360deg);
      img {
        width: 43px;
        height: 43px;
      }
    }
    .radioBox {
      width: 48px;
      height: 48px;
      display: flex;
      flex-shrink: 0;
      border-radius: 50%;
      img {
        width: 48px;
        height: 48px;
      }
    }
    .checkbox {
      width: 46px;
      height: 46px;
      display: flex;
      flex-shrink: 0;
      img {
        width: 46px;
        height: 46px;
      }
    }
    p {
      font-size: 30px;
      font-family: "PingFangSC-Regular, PingFang SC";
      font-weight: 400;
      color: #333333;
      margin-left: 14px;
    }
  }
  .btnBox {
    width: 100%;
    margin: 60px 0;
    overflow: hidden;
    button {
      width: 490px;
      height: 80px;
      background: linear-gradient(90deg, #87c2ff 0%, #5aabff 100%);
      border-radius: 48px;
      font-size: 32px;
      font-family: "PingFangSC-Medium, PingFang SC";
      font-weight: 500;
      color: #ffffff;
      text-align: center;
      line-height: 80px;
      border: none;
      outline: none;
      margin-left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
