<template>
  <div class="sina_page">
    <div class="head-wrap">
<!--      <p>超过 <span>8526</span> 万人 在新浪互助守望相助</p>-->
      <p>已公布 <span>{{publicHeadNum&&publicHeadNum.public_count}}</span> 次公示，共 <span>{{publicHeadNum&&publicHeadNum.help_count}}</span> 位受助成员</p>
    </div>
    <div class="plan_types">
      <div class="plan_type" :class="{active:tabName == 'XL001'}"
           @click="changeTab('XL001')">大病互助</div>
      <div class="plan_type" :class="{active:tabName == 'XL002'}"
           @click="changeTab('XL002')">意外医疗</div>
      <div class="plan_type" :class="{active:tabName == 'XL003'}"
           @click="changeTab('XL003')">新冠互助</div>
      <div class="plan_type" :class="{active:tabName == 'XL005'}"
           @click="changeTab('XL005')">老年防癌</div>
      <div class="plan_type" :class="{active:tabName == 'XL004'}"
           @click="changeTab('XL004')">意外伤害</div>
    </div>
    <div class="my-ad">
      <my-ad id="weibo-public-list-1"  hasCloseBtn="true"></my-ad>
    </div>

    <div class="loadcont" ref="loadcont" :style="{maxHeight:contentH+'px'}">
      <div class="public_list"  >

        <load-more   :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
          <div class="public_nums_cells" v-if="publicList">
            <template v-for="(item,idx) of publicList">
              <div class="public_nums_cell" v-if="item.state!='0'&&item.state!='2'" :key="idx" @click="checkDetail(item.public_id)" :class="{active:item.state==1&&getpublicState(item.end_date)}">
                <div class="public_nums_title" >
                  <div class="num_name">{{item.name}}</div>

                  <div class="num_state" v-if="item.state==1">
                    <span v-if="getpublicState(item.end_date)">公示中</span>
                    <span v-else>互助成功</span>
                  </div>
                  <div class="num_state" v-else>{{item.state_name}}</div>
                </div>
                <div class="public_nums_cont">
                  <div class="nums_cont">
                    <div class="public_cells">
                      <div class="public_cell">
                        <div class="nums">{{item.help_count}}<i>人</i></div>
                        <div class="feiyantxt">帮助成员</div>
                      </div>
                      <div class="public_cell">
                        <div class="nums">{{item.total_persons}}<i>人</i></div>
                        <div class="feiyantxt">分摊人数</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </load-more>
        <!--      <div class="nodata" v-if="allLoaded">没有更多了哦…</div>-->

      </div>
      <my-service fixedBotBtn="true"></my-service>
    </div>

  </div>
</template>

<script>
  import myService from '../../components/myService'
  import Api from "../../utils/apiConfig";
  import loadMore from '../../components/loadmore/index'
  import myAd from "../../components/sinaAd";
  export default {
    name: "publicList",
    components: {
      myService,loadMore,myAd
    },
    data(){
      return{
        tabName: 'XL002',
        dataList:null,
        publicList: null,
        publicHeadNum:null,

        page:1,
        contentH:0,
        allLoaded :true,
      }
    },
    computed: {

    },
    created(){
      this.tabName = this.$route.query.planCode || 'XL002';
      sessionStorage.removeItem('planCode');
      this.getPublicList();
      if (localStorage.getItem('_userToken')) {
        this.actionCount('pv');
      } else {
        this.setActionCount('pv', '-1'); //未授权埋点
      }
    },
    methods: {
      changeTab(name){
        this.tabName = name;
        this.publicList =this.dataList && this.dataList[name];
      },
      getPublicList(){
        this.$get(Api.getPublicList,{
          page:this.page,
          per_count:10
        },true).then((ret)=>{

          if(ret.code == 0){
            if (this.page == 1) {
              this.dataList = ret.data.public_list;
              this.publicHeadNum = ret.data.total;
              this.$nextTick(function () {
                this.contentH = document.documentElement.clientHeight -
                  this.$refs.loadcont.getBoundingClientRect().top;
              })
            } else {
              let newData = ret.data['public_list'];
              Object.keys(this.dataList).forEach(key=>{
                this.dataList[key] = this.dataList[key].concat(newData[key]||[])
              })
            }

            if (this.dataList[this.tabName]&&this.dataList[this.tabName].length<= 10 ) {
              this.allLoaded = true;
            }

            this.publicList = this.dataList[this.tabName];
          }

        })
      },
      loadBottom(){
        this.page++;
        this.getPublicList();
        this.$refs.loadmore.onBottomLoaded();
      },
      checkDetail(id) {
        this.$router.push(`/weibo/public-member?id=${id}&planCode=${this.tabName}`)
      },
      getpublicState(endDate){
        endDate =endDate.replace('.', '/').replace('.', '/') + ' 23:59:59';
        return  new Date(endDate).getTime() > new Date().getTime()
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
      height: 260px;
      background-image: url("../images/publicBanner2_2x.png");
      background-size: 100% auto;
      /*padding: 36px 30px 0px;*/
      padding: 80px 30px 0px;
      span {
        font-size: 38px;
      }

      p {
        height: 54px;
        font-size: 28px;
        line-height: 54px;
      }

      p:nth-child(2) {
        margin-top: 16px;
      }

    }
    .loadcont{

      touch-action: none;
    }
    .my-ad{
      padding: 10px 18px 0px;
    }
    .public_list{
      margin-top: 6px;
      background: #fff;
      padding: 40px 40px 0 54px;
      overflow-y: auto;
      .public_nums_cells{
        .public_nums_cell{
          .public_nums_title{
            position: relative;
            border-left: 4px solid #e6e6e6;
            color: #939393;
            font-size: 28px;
            font-weight: bold;

            &:before{
              content: '';
              position: absolute;
              left: -21px;
              bottom: 0;
              width:26px;
              height:26px;
              border-radius: 50%;
              background:rgba(255,255,255,1);
              border:4px solid $primary;
            }
            .num_name{
              border-bottom: 1PX solid $primary;
              padding: 0 4px 0 24px;
              display: inline-block;
              line-height: 40px;
            }
            .num_state{
              float: right;

            }
          }
          .public_nums_cont{
            border-left: 4px solid #e6e6e6;
            padding: 50px 0 80px 40px;
           .nums_cont{
             padding: 32px 0;
             background: #F9F9FC;
             border-radius:20px;
             border:1PX solid #F9F9FC;
             .public_cells {
               .public_cell {
                 position: relative;
                 &:after{
                   content: "";
                   position: absolute;
                   top: 30px;
                   right: 0;
                   width:2px;
                   height:36px;
                   background:rgba(230,230,230,1);
                 }
                 &:last-child{
                   &:after{
                     width: 0;
                   }
                 }
                 .nums{
                   font-size: 42px;
                   font-weight: bold;
                   line-height: 60px;
                   padding-bottom:0;
                 }
                 .feiyantxt{
                   color: #939393;
                 }
               }
             }
           }
          }
          &.active{
            .public_nums_title{
              border-color: transparent;
              color: #333;
              .num_state{
                color: $primary;
              }
              &:after{
                content: '';
                position: absolute;
                bottom:10px;
                left: -11px;
                width:14px;
                height:14px;
                border-radius: 50%;
                background: $primary;
              }
            }
            .public_nums_cont .nums_cont{
              border-color: #FFD4A4;
              background: #FFF9F0;
            }
          }
          &:last-child{
            .public_nums_cont {
              border: 0;
            }
          }
        }
      }
      .nodata{
        padding: 30px;
        font-size: 24px;
        text-align: center;
      }
    }

  }
</style>
