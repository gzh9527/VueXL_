<template>
  <div class="sina_page">
    <img src="http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/newValent/activeValentBg2.png">
    <div class="top_txt" @click="showDesc">活动规则</div>
    <div class="valent_from">
      <div class="valent_bg">
        <div class="input_cells">
          <input autocomplete="off" maxlength="10" type="text" class="sina_input" v-model="relaInfo.name"
                 placeholder="好友姓名"/>
          <div class="sina_input icon down"  @click="showRelat">
            <input autocomplete="off" type="text" class="input_css" readonly v-model="relaInfo.relation_name"
                   placeholder="选择关系">
          </div>
        </div>
        <button class="sina_btn primary radius max" @click="addRelat"></button>
        <div class="rule_btn" @click="showDesc">好友加入成功，你和好友都可获得3元红包</div>
      </div>
    </div>
    <div class="img_cont">
      <div class="title">好友可获得的互助权益</div>
      <img src="./images/activeValentRlue.png">
    </div>
    <sina-alert v-if="alertShow" alertTitle="选择关系"
                isComponents="true"
                @sumbitEvt="sumbitEvt">
      <div class="rela_cells">
        <template v-for="item of relaList">
          <div class="rela_cell"
               :class="{hasBg:item.id==1 ||item.id==2 , bg1:item.id==1, bg2:item.id==2,checked:item.id == relaInfo.relation_id }"
               @click="checkRela(item.id,item.name)">
            {{item.name}}
          </div>
        </template>
      </div>
    </sina-alert>
    <div class="toast-mask" v-if="addMarkShow || shareMarkShow" @click.stop="closeMark">
      <div class="add_mark" v-if="addMarkShow">
        <div class="add_btn" @click.stop="addPlan">立即加入</div>
      </div>
      <div class="share_mark" v-if="shareMarkShow">
        <img src="./images/sinaValentMakimg1.png" class="img1">
        <img src="./images/sinaValentMakimg2.png" class="img2">
      </div>
    </div>
  </div>
</template>

<script>
  import Api from "@/utils/apiConfig";
  import sinaAlert from "../../components/sinaAlert/sinaAlert.vue";

  export default {
    name: "activityValent",
    components: {
      sinaAlert,
    },
    data() {
      return {
        weiboInfo: null,
        uid: null,
        alertShow: false,
        relaList: null,
        relaInfo: {
          relation_id: null,
          relation_name: null,
          name: '',
          recommender_name:''
        },
        planState: null,
        shareMarkShow: false,
        addMarkShow: false,
      }
    },
    created() {
      this.uid = this.$route.query.uid;
      if (localStorage.getItem('_userToken')) {
        this.getWeiboInfo(() => {
          this.checkUid();
        });
      } else {
        if (this.$route.query.messId) {
          this.$router.push({
            path: '/weibo/userauth', query: {
              returnUrl: this.$route.fullPath
            }
          });
        } else {
          this.pageLoad();
        }
      }
    },
    methods: {
      checkUid() {
        if (this.uid) {
          if (this.uid != this.weiboInfo.uid) {
            this.$router.replace({path: '/weibo/insure-join', query: this.$route.query});
          } else {
            this.pageLoad();
          }
        } else {
          let query = this.$route.query;
          query = Object.assign({}, query, {uid: this.weiboInfo.uid});
          this.pageLoad();
          this.$router.replace({path: this.$route.path, query: query});
        }
      },
      pageLoad() {
        if (localStorage.getItem('_userToken')) {
          this.actionCount('pv');
          this.getRelation();
        } else {
          this.setActionCount('pv', '-1');
          this.getRelation();
        }
      },
      getRelation() {
        !this.relaList && this.$get(Api.getRelation).then(ret => {
          this.relaList = ret;
        })
      },
      showRelat() {
        this.alertShow = true;
      },
      checkRela(id, name) {
        this.relaInfo.relation_id = id;
        this.relaInfo.relation_name = name;
      },
      sumbitEvt() {
        if (!this.relaInfo.relation_id) {
          this.$toast('请选择关系');
          return;
        }
        this.alertShow = false;
      },
      showDesc() {
        this.$sinaAlert({
          onlyHasTitle: false,
          desc: `<div class="alert_ul"><p class="alert_li">填写必填信息后发送给好友，好友激活权益后本人和好友均可获得3元红包，可到我的红包页面查看。</p>
                <p class="alert_li"> 邀请好友越多获得红包越多，上不封顶。</p></div>`,
          showClose: false,        // 关闭按钮
          cancelButtonText: '知道了',
        })
      },
      addRelat() {
        this.$get(Api.getPolicyList, {}).then(ret => {
          if (ret.code === 0) {
            if (ret.data.policy_list.length==0 ) {
              this.addMarkShow = true;
              this.shareMarkShow = false;
              this.actionCount('click');
            } else {
              this.relaInfo.recommender_name = ret.data.policy_list[0].insured.name;
              this.gotoShare();
            }
          }
        })
      },
      gotoShare() {
        if (!this.relaInfo.name || this.relaInfo.name == '') {
          this.$toast('请输入好友名字');
          return;
        }
        if (!this.relaInfo.relation_id) {
          this.$toast('请选择好友关系');
          return;
        }
        this.actionCount('click');
        let query = this.$route.query;
        this.$post(Api.createRecommender, {
          relation_id: this.relaInfo.relation_id,
          name: this.relaInfo.name,
          recommender_name : this.relaInfo.recommender_name || this.weiboInfo.name
        }).then(ret => {
          if (ret.code == 0) {
            let messId = ret.msg;
            this.addMarkShow = false;
            this.shareMarkShow = true;
            query = Object.assign({}, query, {messId: messId});
            this.$router.replace({path: this.$route.path, query: query});
          }

        })
      },
      closeMark(){
        // this.addMarkShow = false;
        this.shareMarkShow = false;
      },
      addPlan() {
        this.actionCount('join_click',()=>{
          this.$router.push('/weibo/insure-plan?channel=10024');
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../css/mixin";

  .sina_page {
    position: relative;
    .top_txt {
      position: absolute;
      top: 10px;
      right: 30px;
      color: #fff;
      line-height: 30px;
      padding: 8px 0;
      &.icon {
        padding-right: 40px;
        &::after {
          content: '';
          position: absolute;
          top: 8px;
          right: 0;
          width: 30px;
          height: 30px;
          background: url("/static/images/sinaIconInfo.png") no-repeat;
          background-size: 30px 30px;
        }
      }
    }
    .valent_from {
      position: absolute;
      top: 852px;
      left: 0;
      width: 100%;
      .valent_bg {
        padding: 0 85px;
        .active_rule{
          text-align: center;
          color: #939393;
          font-size: 26px;
          margin-top: 30px;
          line-height: 20px;

        }
        .sina_input{
          height: 100px;
          border-radius: 50px;
          border:1PX solid #5378FF;
          padding: 28px 40px;
          line-height: 40px;
          .input_css{
            height: 40px;
            line-height: 40px;
          }
        }
        .max{
          margin-top: 12px;
          position: relative;
          background: url("./images/sinaActivityValentBtn.png") rgba(181,0,255,1);
          background-size: 100% auto;
        }
        .rule_btn{
          height: 54px;
          text-align: center;
          margin-top: 32px;
        }
      }
    }
    .img_cont{
      margin-top: 20px;
      padding: 64px 30px 40px;
      background: #fff;
      .title{
        font-size: 38px;
        padding-bottom: 30px;
        text-align: center;
        font-weight: bold;
      }
    }
    .share_mark {
      .img1 {
        width: 256px;
        height: 279px;
        position: absolute;
        top: 46px;
        right: 32px;
      }

      .img2 {
        width: 310px;
        height: 140px;
        @include cl;
        top: 354px;
      }
    }

    .add_mark {
      @include center;
      width: 626px;
      background: url("./images/sinaValentMakimg4.png") no-repeat;
      background-size: 100% auto;
      padding: 390px 113px 0;

      .add_btn {
        width: 100%;
        height: 100px;
        background: #FFEBD6;
        border-radius: 60px;
        font-size: 40px;
        color: #FF8242;
        text-align: center;
        line-height: 100px;
      }
    }
  }

  .rela_cells {
    padding-top: 50px;
    display: flex;
    flex-wrap: wrap;

    .rela_cell {
      width: 150px;
      height: 80px;
      border-radius: 20px;
      border: 2px solid rgba(230, 230, 230, 1);
      color: #939393;
      font-size: 28px;
      line-height: 80px;
      text-align: center;
      margin: 0 20px 20px 0;
      display: inline-block;

      &:nth-child(3n) {
        margin-right: 0;
      }

      &.checked {
        background: rgba(255, 241, 219, 1);
        border: 2px solid $primary;
        color: $primary;
      }

      &.hasBg {
        background-size: 150px 80px;
        border: 0;
        color: #464646;

        &.checked {
          color: #fff;
        }

        &.bg1 {
          background-image: url("./images/sinaActivityValentIcon1.png");

          &.checked {
            background-image: url("./images/sinaActivityValentIcon2.png");
          }
        }

        &.bg2 {
          background-image: url("./images/sinaActivityValentIcon3.png");

          &.checked {
            background-image: url("./images/sinaActivityValentIcon4.png");
          }

        }
      }
    }

  }
</style>
