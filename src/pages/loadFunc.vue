<template>
  <div class="sina_page" :class="{hasbg:type == 3}">
     <div class="loadFuc"  v-if="type!=3">
        <div v-if="type==0">
          <div class="load_cont" >
            <div class="load_title">目前还没有互助案例，当出现可公示的互助案例时您可在此处查看事件详情信息</div>
          </div>
          <div class="normalTitle">互助流程</div>
          <div class="banner_cont">
                  <img src="./images/FYjoinbanner3_2x.png" />
          </div>
        </div>
        <div class="load_cont" v-if="type==1">
          <div class="load_title">目前还没有发生互助分摊，当出现已完成分摊的互助事件时您可在此处查看您的分摊详情</div>
          <button class="sina_btn primary radius" @click="gotomy">查看个人中心</button>
        </div>
        <div v-if="type==2">
          <div class="load_cont" >
            <div class="load_title">目前还没有待评审事件，当出现评审事件时您可在此处报名参与评审或查看相关信息</div>
            <div class="class_room">
              <div class="title">小课堂</div>
              <div class="cont">评审团负责对互助计划实施过程中的争议事件进行评审，包括是否符合互助金申领条件的认定、互助计划公约条款内容修改建议等，使互助计划更能体现全体会员的意志，符合全体会员的利益，保证计划实施的公平、公正。</div>
            </div>
            <!-- <div>
              <router-link to="/weibo/clause?type=0&cid=6" class="col_a">《新浪互助预审委员会章程》</router-link>
              <router-link to="/weibo/clause?type=0&cid=1" class="col_a">《新浪互助预审委员会章程》</router-link>
            </div> -->
          </div>

        </div>
      </div>
      <div v-if="type==3">
          <img src="./images/loadHuzhuIntro.png" />
        </div>
    <my-service bottom="true"></my-service>
  </div>
</template>

<script>
  import myService from '../components/myService'

  export default {
    name: "loadFunc",
    components: {
      myService
    },
    data() {
      return {
        titleData:['公示','分摊','评审团','申请互助'],
        type:null,
      }
    },
    computed: {

    },
    created(){
        this.type = this.$route.query.type || 0;
        document.title = this.titleData[this.type];
    },
    methods: {
      gotomy() {
        this.$router.push('/weibo/insure-plan')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./css/mixin";

  .sina_page {
    background: #fff;
    padding-bottom: 204px;
    &.hasbg{
      background: #f9f9f9;
    }
    .loadFuc {
      padding: 426px 0px 0px;
      background-size: 366px 366px;
      background-position: center top;
      @include bg-image('sinaLoadFun');
      .load_cont{
        margin:  0 30px;
      }
      .banner_cont{
        margin: 20px 30px 0;
      }
      .normalTitle{
        background: #E6E6E6;
        padding-top: 10px;
        padding-bottom: 10px;
      }
      .load_title{
        font-size: 28px;
        padding: 0 60px 60px;
      }
      .sina_btn{
        margin-top: 100px;
      }
      .class_room{
        border-radius: 20px;
        border: 1px solid #e6e6e6;
        padding: 30px;
        margin-top: 20px;
        .title{
          color: #ff8200;
          font-size: 30px;
          text-align: center;
          padding-bottom: 20px;
        }
        .cont{
          font-size: 28px;
        }
      }
    }
  }
</style>
