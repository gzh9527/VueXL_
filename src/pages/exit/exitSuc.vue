<template>
  <div class="sina_page back_fff">
    <div class="sina_cont" >
      <div class="suc_cont success" >
        <div class="txt">{{sucText}}</div>
        <div class="sina_btn primary radius line medium" @click="jumpUrl('editAmnt')" v-if="type=='editAmnt'">查看调额记录</div>
        <div class="href" @click="jumpUrl('plan')" v-else>到个人中心查看 ></div>
        <div class="myAd" @click="jumpUrl('adduser')">
          <img src="http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/sinaAddFamily.png"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "upgradeSuc",
    data() {
      return {
        sucText: '',
        actionName: null,
        type: '',
      }
    },
    watch:{

    },
    computed: {},
    created() {
      sessionStorage.removeItem('_planState');

      let planCode = this.$route.query.planCode || 'XL001';
      this.actionName = planCode == 'XL001' ? '' : '2';
      let path = this.$route.path;
      if (path == '/weibo/amnt-suc') {
        this.sucText = '大病互助计划调额成功';
        this.type = 'editAmnt';
      }else{
        history.pushState(null, null, document.URL);
        window.addEventListener('popstate', function () {
          history.pushState(null, null, document.URL);
        });
        if (path == '/weibo/upgrade-suc') {
          this.sucText = '大病互助权益已生效';
        } else if (path == '/weibo/exit-suc') {
          this.sucText = planCode == 'XL001' ? '已退出大病互助计划' : '已退出意外医疗计划';
        }
      }

      this.actionCount('pv' + this.actionName)
    },
    methods: {
      jumpUrl(type) {
        let url = '/weibo/insure-plan';
        let action = 'center_click';
        if (type=='adduser') {
          action = 'add_click';
          url = '/weibo/insure-add';
        }else if (type=='editAmnt'){
          action = 'amntList_click';
          url = '/weibo/amnt-list';
        }
        this.actionCount(action + this.actionName,()=>{
          if(url == '/weibo/amnt-list'){
            this.$router.replace({path: '/weibo/amnt-list', query: this.$route.query})
          }else{
            this.$router.replace(url)
          }

        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "../css/mixin";

  .suc_cont {
    margin: 0px auto 64px;
    text-align: center;
    padding-top: 166px;
    background-size: 76px 76px;
    background-position: center 90px;
    @include level-bg-image('sinaPaySuc');
    .txt {
      padding: 28px 0 20px;
      font-size: 34px;
      line-height: 48px;
      font-weight: 600;
    }
    .href {
      color: $primary;
    }
    .myAd{
      margin: 64px 0 0;
    }
    .sina_btn.medium{
      width: 270px;
      height: 58px;
      line-height: 58px;
    }
  }
</style>
