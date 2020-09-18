<template>
  <div class="sina_page trip_page" :class="{ hasbot: ishasbot }">
    <div class="top_bg"></div>
    <div class="sina_cont no_token" v-if="!hasToken">
      <div class="trip_top_title">登记行程 接收提醒</div>
      <div class="trip_desc">登记过的飞机、火车等班次，一旦出现疫情，会第一时间收到提醒信息，拟出行信息可预先登记。</div>
      <div class="sina_radius_bg trip_cell train">
        <div class="trip_cell__bd">
          <div class="date">2020年2月1日</div>
          <div class="shifts">G217</div>
        </div>
        <div class="trip_cell__rd">
          <img src="../images/iconRelation1_3x.png" />
        </div>
      </div>
      <div class="total_shifts" >{{travelCount}} 班次已登记</div>
      <div class="check_box"  :class="{checked:isChecked}" @click.stop="isChecked=!isChecked">
          关注 @新浪互助 获取更多肺炎信息
      </div>
      <div class="sina_btn primary radius" @click="addTrip">登记我的行程</div>
    </div>
    <div class="has_token" v-if="hasToken">
      <trip-userinfo :topBgShow="false"></trip-userinfo>
      <tripTravellist  v-if="hasToken"></tripTravellist>
      <div class="add_trip_btn" @click="addTrip">登记我的行程</div>
    </div>
    <div class="sina_cont">
      <div class="ES_trips">
        <div class="sina_radius_bg ES_trips_cont">
          <div class="es_trips_title">以下班次已发现疫情</div>
          <div class="es_trips_date">
            <div class="date_pre" @click="getEsList('pre')">前一天</div>
            <!-- <div class="selected_date">{{searchDate}}</div> -->
            <input type="date" class="selected_date" v-model="searchDate" />
            <div class="date_next" @click="getEsList('next')">后一天</div>
          </div>
          <div class="es_trips_update">更新时间：{{dateLimit}}</div>
          <div class="es_trips_cells"  v-if="esList&&esList.length>0">
            <div class="es_trips_cell" v-for="(item,index) in esList" :key='index'>
              <span>{{item.t_date}}</span>
              <span>{{item.t_type_name}}</span>
              <span>{{item.t_no}}</span>
              <span>{{item.t_no_sub}}</span>
            </div>
          </div>
          <div class="es_trips_cells"  v-if="esList&&esList.length==0">
            <div class="es_trips_cell no_list">没有疫情班次记录</div>
          </div>
        </div>
      </div>
    </div>
    <div class="page_bot" v-if="ishasbot">
        <div class="sina_btn primary" @click="addTrip">登记我的行程</div>
    </div>

  </div>
</template>

<script>
    import tripUserinfo from '../../components/tripUserinfo';
    import tripTravellist from '../../components/tripTravelList';
    import Api from "../../utils/apiConfig";
    export default {
        name: "tripMy",
        components:{
          tripUserinfo,tripTravellist
        },
        data() {
            return {
                fontSize: 16,
                isChecked:true,
                ishasbot:false,
                hasToken:true,
                travelCount:null,
                esList: null, // 疫情班次
                dateLimit: null,  //疫情更新时间
                searchDate:null,
            }
        },
        computed: {},
        watch:{
          searchDate(val){
             console.log(val);
             this.$get(Api.getEsList,{date:val}).then(ret=>{
                if(ret.code==0){
                  this.esList = ret.data.list;
                  this.dateLimit = ret.data.date_limit;
                }else{

                }
              })
          }
        },
        mounted() {
            if (localStorage.getItem('_userToken')) {
                this.hasToken = true;
                this.actionCount('pv');
            }else{
                this.hasToken = false;
                this.gettravelCount();
                this.setActionCount('pv', '-1'); //未授权埋点
            }
            this.getvaildDate();
            // this.getEsList();
        },
        created(){
            let clientWidth = document.documentElement.clientWidth;
            if (!clientWidth) return;
            if (clientWidth > 1366) {
              clientWidth = 1366;
            }
            this.fontSize = (clientWidth * 2) / 750 * 16;
            document.addEventListener('scroll', this.getScroll);
        },
        methods:{
            getScroll() {
              let scrolltop = document.documentElement.scrollTop ||
                window.pageYOffset ||
                document.body.scrollTop;
              if (scrolltop > 800 / 32 * this.fontSize) {
                this.ishasbot = true;
              } else {
                this.ishasbot = false;
              }
            },
            addTrip(){
               let hasChecked = 0;
              if (!localStorage.getItem('_userToken')) {
                hasChecked = this.isChecked ? 1:0
              }
              this.$router.push('/weibo/trip-add?hasChecked='+hasChecked);
            },
            gettravelCount(){
              this.$get(Api.gettravelCount).then(ret=>{
                 if(ret.code==0){
                   this.travelCount = ret.data;
                }else{
                }
              })
            },
            getvaildDate(){
              this.$get(Api.getvaildDate).then(ret=>{
                if(ret.code == 0){
                  this.searchDate = ret.data;
                  this.getEsList();
                }
              })
            },
            getEsList(type){
              let date = new Date(this.searchDate);
              if(type){
                if(type=='pre'){
                  date= new Date(date.setDate(date.getDate()-1)) ;
                }else{
                  date= new Date(date.setDate(date.getDate()+1)) ;
                }
              }
              this.searchDate = this.formatDate(date);

            },

            formatDate(time) {
              var y = time.getFullYear();
              var m = time.getMonth()+1;
              var d = time.getDate();
              return y+'-'+this.isZero(m)+'-'+this.isZero(d);
            },
             isZero(m){
              return m<10?'0'+m:m
          }



        }

    }
</script>

<style scoped lang="scss">
  @import "../css/trip";
  @import "../css/mixin";
  .trip_page{
    padding-bottom: 40px;
    &.hasbot{
      padding-bottom: 148px;
    }
    .page_bot{
      position: fixed;
      width: 100%;
      left: 0;
      bottom: 0;
      background: #F7F9FD;

    }
    .top_bg{
     @include level-bg-image('tripBanner');
    }
    .trip_cell{

        &.plane{
          @include level-bg-image('tripIcon1');
        }
          &.train{
          @include level-bg-image('tripIcon2');
        }
        &.bus{
          @include level-bg-image('tripIcon3');
        }
        &.ship{
            @include level-bg-image('tripIcon4');
        }
    }
    .no_token{
      .trip_cell{
        background-position:  30px center;

      }
      .trip_top_title{
        font-size: 44px;
        text-align: center;
        padding: 32px 0 8px;
      }
      .trip_desc{
        background:rgba(230,235,255,1);
        border-radius:20px;
        padding: 16px 30px;

      }
      .total_shifts{
        padding: 30px 0 40px;
        text-align: center;
        font-size: 20px;
        color: #B7B6B6;
      }
      .ES_trips{
        margin-top: 86px;
      }
    }
    .has_token{

      .add_trip_btn{
        margin: 40px auto 0;
      }
    }
    .check_box {
      margin-bottom: 30px;
      margin-left: 130px;
      color: #507DAF;
    }
    .ES_trips{
      margin-top: 50px;
    }
    .ES_trips_cont{
      padding:  40px;
      .es_trips_title{
        font-size: 44px;
        text-align: center;
        padding-bottom: 30px;
      }
      .es_trips_date{
        display: flex;
        line-height: 50px;
        .date_pre,.date_next{
          flex: 1;
        }
        .date_next{
          text-align: right;
        }
        .selected_date{
          width: 270px;
          height:50px;
          padding: 0 20px 0 40px;
          background:rgba(255,255,255,1);
          border-radius:30px;
          border:1px solid #B7B6B6;

        }
      }
      .es_trips_update{
        padding: 62px 0 20px;
        color: #B7B6B6;
      }
      .es_trips_cells{
        padding: 0 30px;
        background:rgba(255,255,255,1);
        border-radius:20px;
        border:1px solid rgba(183,182,182,1);
        padding-bottom: 60px;
        .es_trips_cell{
          height: 86px;
          line-height: 86px;
          border-bottom: 1px solid #B7B6B6;
          padding: 0 6px;
          display: flex;
          &:last-child{
            border: 0;
          }
          &.no_list{
            width: 100%;
            display: block;
            margin: 40px 0 0;
            text-align: center;
          }
          span{
            @include single-line;
              flex: 1;
          }

        }
      }
    }

  }


</style>
