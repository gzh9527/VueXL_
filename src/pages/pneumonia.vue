<template>
  <div class="sina_page">
    <div class="sina_hasbg" ref="topcont">
      <div class="pneumonia_top_desc">关注新浪互助，获取最新疫情信息【关注】</div>
      <div class="sina_radius_bg">
        <div class="es_title">疫情介绍</div>
        <div class="es_list">
          <div class="es_li"><b>传染源：</b>尚不明确，可能来自蛇或蝙蝠</div>
          <div class="es_li"><b>病毒传：</b>新型冠状病毒2019-nCoV</div>
          <div class="es_li"><b>传播途径：</b>未完全掌握，存在人传人、医务 人员感染、一定范围社区传播</div>
          <div class="es_li"><b>是否变异：</b>存在变异可能</div>
          <div class="es_li"><b>是否扩散：</b>是，疫情已扩散</div>
        </div>
      </div>
      <div class="date_end">{{limtDate}}</div>
    </div>
    <div class="es_tabs" :class="{fixed:isFixed}">
      <div class="es_tab" :class="{active:tabName=='es'}" @click="getTab('es')">疫情地图</div>
      <div class="es_tab" :class="{active:tabName=='cast'}" @click="getTab('cast')">实时播报</div>
      <div class="es_tab" :class="{active:tabName=='info'}" @click="getTab('info')">权威信息</div>
    </div>
    <div ref="es" id="es">
      <div class="pneumonia_title" >疫情地图</div>
      <my-echart :provinceList="provinceList" v-if="provinceList"></my-echart>
      <div class="es_table" v-if="provinceList">
        <div class="es_table_clum" v-if="totalNum">
          <span>全国</span>{{totalNum.countRemark.replace('全国 ','')}}
        </div>
        <div class="es_table_clum" v-for=" (item,index) of provinceList" :key="'p'+index">
          <span>{{item.provinceName}}</span>
         <span v-if="item.confirmedCount">确诊{{item.confirmedCount}}例</span>
        <span v-if="item.curedCount"> 治愈{{item.curedCount}}例</span>
        <span v-if="item.deadCount"> 死亡{{item.deadCount}}例</span>

        </div>
      </div>
    </div>
    <div ref="cast" id="cast">
      <div class="pneumonia_title">实时播报</div>
      <div class="recordlist" v-if="newLists">
        <div class="record_cell" v-for="(item,index) of newLists" :key="'n'+index">
          <div class="record_title">
            <i class="checkbox"><i class="active"></i></i>
            <span class="hasicon">{{formatDate(item.pubDate)}}</span>
          </div>
          <div class="record_con">
            <div class="record_radius_bg" @click="jumUrl(item.sourceUrl)">
              <div class="broad_title">{{item.title}}</div>
              <div class="broad_txt">{{item.summary}}</div>
              <div class="broad_href">查看详细报道</div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div ref="info" id="info">
      <div class="pneumonia_title hasbor">权威信息</div>
      <div class="info_cont">
        <div class="info_con">
          <div class="info_title">关于新型冠状病毒</div>
          <div class="info_two_title">钟南山院士这样说</div>
          <div class="info_cells">
            <div class="info_cell">
              <i>1</i>新型冠状病毒肺炎是肯定的人传人
            </div>
            <div class="info_cell">
              <i>2</i>近期尽量避免前往武汉
            </div>
            <div class="info_cell">
              <i>3</i>随时佩戴口罩，但不一定必须是N95口罩
            </div>
            <div class="info_cell">
              <i>4</i>病毒很可能来自野味，如竹鼠、獾等
            </div>
            <div class="info_cell">
              <i>5</i>没有特效药，春节期间得病人数估计会增加
            </div>
          </div>
          <div class="info_two_title">李兰娟院士这样说</div>
          <div class="info_cells ">
            <div class="info_cell">
              <i>1</i>目前没有特效抗毒药物，包括奥司他韦
            </div>
            <div class="info_cell">
              <i>2</i>病毒的潜伏期为14天，期间可能有传染性
            </div>
            <div class="info_cell">
              <i>3</i>56℃才能杀死病毒，但开空调和暖气不管用
            </div>
            <div class="info_cell">
              <i>4</i>75%的酒精可以杀死病毒
            </div>
            <div class="info_cell">
              <i>5</i>免疫功能差的老年人更容易感染病毒
            </div>
            <div class="info_cell">
              <i>6</i>过年不宜吃野味，尤其是哺乳动物
            </div>
            <div class="info_cell">
              <i>7</i>新型冠状病毒致死率暂时低于H7N9禽流感
            </div>
            <div class="info_cell">
              <i>8</i>病毒检测试剂已发放，全国均有能力检测
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bot_btn" @click="shareBtn">关注并分享</div>
  </div>
</template>

<script>
  // import
    import Api from '../utils/apiConfig'
    import myEchart from "../components/myEcharts"
    export default {
        name: "pneumonia",
        data() {
            return {
                tabName: 'es',
                newLists: null,
                provinceList: null,
                totalNum:null,
                isFixed: false,
                fontSize: 16,
                castTop: null,
                infoTop: null,
                limtDate:null,

            }
        },
        components:{
            myEchart
        },
        created() {
            this.getDate();
            if (localStorage.getItem('_userToken')) {
                this.actionCount('pv');
            }else{
                this.setActionCount('pv', '-1'); //未授权埋点
            }
            let clientWidth = document.documentElement.clientWidth;
            if (!clientWidth) return;
            if (clientWidth > 1366) {
                clientWidth = 1366;
            }
            this.fontSize = (clientWidth * 2) / 750 * 16;
            this.$nextTick(() => {
                setTimeout(() => {
                    document.addEventListener('scroll', this.getScroll);
                }, 500)
            });

        },
        methods: {
            getDate() {
                this.$get(Api.bridgeFeiyan, {}).then(ret => {
                    if (ret.data) {
                        this.newLists = ret.data.news;
                        this.provinceList = ret.data.province;
                        this.limtDate = ret.data.date_limit;
                        this.totalNum = ret.data.total;
                    }
                })
            },

            getTab(name) {
                this.tabName = name;
                let id = "#" + name;
                let anchor = document.querySelector(id);
                let sTop = 0;
                if (name == 'es') {
                    sTop = 0;
                } else if (name == 'cast') {
                    this.castTop = this.castTop || anchor.offsetTop - 108 / 32 * this.fontSize;
                    sTop = this.castTop;
                } else if (name == 'info') {
                    this.infoTop = this.infoTop || anchor.offsetTop - 108 / 32 * this.fontSize;
                    sTop = this.infoTop;
                }
                document.body.scrollTop = sTop;
                document.documentElement.scrollTop = sTop
            },
            //监听滚动
            getScroll() {
                let scrolltop = document.documentElement.scrollTop ||
                    window.pageYOffset ||
                    document.body.scrollTop;
                if (scrolltop > 467 / 16 * this.fontSize) {
                    this.isFixed = true;
                } else {
                    this.isFixed = false;
                }

                let cast_top = this.$refs.es.offsetHeight + this.$refs.topcont.offsetHeight;
                let info_top = this.$refs.cast.offsetHeight + cast_top;
                this.castTop = this.castTop || cast_top;
                this.infoTop = this.infoTop || info_top;
                if (scrolltop + 1 <= this.castTop) {
                    this.tabName = 'es';
                } else if (scrolltop + 1 <= this.infoTop) {
                    this.tabName = 'cast';
                } else {
                    this.tabName = 'info';
                }
            },
            isZero(m) {
                return m < 10 ? '0' + m : m
            },
            shareBtn(){
                if (localStorage.getItem('_userToken')) {
                    this.actionCount('click');
                    this.$get(Api.feiyanNotice,{}).then(ret=>{
                      if(ret.code==0){
                          this.$toast("分享成功");
                      }
                    })
                }else{
                    this.setActionCount('click', '-1'); //未授权埋点
                    this.$router.push('/weibo/userauth?returnUrl='+this.$route.path);
                }
            },
            formatDate(shijianchuo) {
                let time = new Date(shijianchuo);
                let y = time.getFullYear();
                let m = time.getMonth() + 1;
                let d = time.getDate();
                let h = time.getHours();
                let mm = time.getMinutes();
                let s = time.getSeconds();
                return y + '.' + this.isZero(m) + '.' + this.isZero(d) + ' ' + this.isZero(h) + ':' + this.isZero(mm) + ':' + this.isZero(s);

            },
            jumUrl(url) {
                window.location.href = url;
            }
        }
    }
</script>

<style lang="scss" scoped>
  @import "./css/mixin";

  .sina_page {
    color: #000;

    .sina_hasbg {
      background-color: #fff;
      padding-bottom: 30px;
      @include bg-image('sinaBanner6');
      background-size: auto 320px;
      background-position: center 70px;

      .pneumonia_top_desc {
        background: #fff;
        height: 70px;
        line-height: 70px;
        text-align: center;
        color: $primary;
      }

      .sina_radius_bg {
        margin: 262px 40px 0;
        padding: 36px 40px 30px;

        .es_title {
          font-size: 26px;
          color: $primary;
          padding-bottom: 36px;
          text-align: center;
        }

        .es_list {
          .es_li {
            padding: 20px 0 20px 38px;
            font-size: 26px;
            position: relative;

            &:before {
              content: "";
              position: absolute;
              top: 32px;
              left: 0;
              width: 14px;
              height: 14px;
              border-radius: 50%;
              background: $primary;

            }
          }
        }
      }

    }
    .date_end{
      padding: 20px 20px 0px 60px;
      color: #2c2c2c;

    }
    .es_tabs {
      display: flex;
      position: relative;
      background: #fff;
      width: 100%;

      &.fixed {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
      }

      .es_tab {
        padding: 30px 0;
        position: relative;
        flex: 1;
        text-align: center;
        font-size: 32px;

        &:after {
          content: "";
          @include cl;
          bottom: 12px;
          width: 0px;
          height: 4px;
          background-color: transparent;
          transition: all .3s;
        }

        &.active {
          color: $primary;

          &:after {
            width: 84px;
            background-color: $primary;
          }
        }

      }
    }

    .pneumonia_title {
      margin-top: 20px;
      position: relative;
      height: 98px;
      line-height: 98px;
      background: #fff;
      padding-left: 42px;
      font-size: 32px;

      &:before {
        content: "";
        position: absolute;
        left: 10px;
        top: 0;
        width: 8px;
        height: 20px;
        border-left: 6px solid $primary;
        border-right: 6px solid $primary;

      }

      &.hasbor {
        border-bottom: 1px solid #D1D1D1;
      }
    }
    .echarts{
      background: #fff;
      padding: 30px;
      .echart{
        width: 100%;
        height: 800px;
      }

    }
    .es_table {
      padding: 10px 30px 50px;
      background: #fff;

      .es_table_clum {
        height: 80px;
        line-height: 80px;
        padding: 0 24px 0 32px;
        border: 1px solid #D1D1D1;
        border-top-width: 0;
        background: #fff;
        @include single-line;

        span:first-child {
          min-width: 100px;
          display: inline-block;
          font-size: 28px;
          padding-right: 16px;
        }

        &:first-child {
          border-top-width: 1px;
        }

        &:nth-child(2n+1) {
          background: #F2F4FA;
        }
      }
    }

    .recordlist {
      padding: 30px 30px 60px;

      .record_cell {
        padding-left: 24px;
        padding-right: 6px;

        &:first-child {
          .record_title {
            padding-top: 0;
            margin-top: 36px;
          }

          .hasicon:after {
            content: "最新";
            position: absolute;
            top: 0;
            right: -30px;
            width: 82px;
            height: 30px;
            line-height: 30px;
            font-size: 20px;
            background: rgba(250, 57, 27, 1);
            border-radius: 10px;
            color: #fff;
            text-align: center;
          }
        }

        &:last-child {
          .record_con {
            padding-bottom: 0;
          }
        }

        .record_title {
          border-left: 4px solid #FF8200;
          padding-left: 30px;
          line-height: 30px;
          position: relative;

          .hasicon {
            position: relative;
            padding-right: 70px;
          }

          .checkbox {
            position: absolute;
            top: 0px;
            left: -16px;
            width: 30px;
            height: 30px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(255, 130, 0, 1);
            border-radius: 50%;

            .active {
              @include center;
              width: 19px;
              height: 19px;
              background: $primary;
              border: 1px solid rgba(255, 130, 0, 1);
              border-radius: 50%;
            }
          }
        }

        .record_con {
          border-left: 4px solid #FF8200;
          padding: 36px 0 36px 30px;

          .record_radius_bg {
            padding: 30px 40px 40px 30px;
            background: #fff;
            border-radius: 10px;
            border: 1px solid rgba(230, 230, 230, 1);

            .broad_title {
              font-size: 32px;
              padding-bottom: 32px;
            }

            .broad_txt {

            }

            .broad_href {
              color: $col_a;
              padding-top: 32px;
            }
          }
        }
      }

    }

    .info_cont {
      background: #fff;
      padding: 30px 30px 120px;

      .info_con {
        background: #F2F4FA;
        padding: 50px 30px 54px;

        .info_title {
          text-align: center;
        }

        .info_two_title {
          margin: 30px 0 68px;
          height: 78px;
          line-height: 78px;
          font-size: 50px;
          text-align: center;
          color: #fff;
          background: $primary;
        }

        .info_cells {
          .info_cell {
            position: relative;
            height: 50px;
            line-height: 50px;
            padding-left: 74px;
            margin-bottom: 32px;
            background: rgba(255, 255, 255, 1);
            border-radius: 25px;

            i {
              position: absolute;
              top: 0;
              left: 0;
              width: 50px;
              height: 50px;
              background: rgba(251, 129, 42, 1);
              border-radius: 50%;
              color: #fff;
              text-align: center;
              font-style: normal;
              font-size: 38px;
            }
          }
        }
      }
    }
    .bot_btn{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100px;
      line-height: 100px;
      text-align: center;
      font-size: 50px;
      background: $primary;
    color:#fff;
    }
  }
</style>
