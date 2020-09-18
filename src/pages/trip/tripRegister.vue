<template>
  <div class="sina_page trip_page">
    <tripUserinfo></tripUserinfo>
    <div class="add_form">
      <div class="add_form_title">选择交通工具</div>
      <div class="add_form_checks">
        <div class="add_form_check plane" :class="{checked:checkedIndex ==0}" @click="checkedIndex = 0">飞机</div>
        <div class="add_form_check train" :class="{checked:checkedIndex ==1}" @click="checkedIndex = 1">火车</div>
        <div class="add_form_check bus" :class="{checked:checkedIndex ==2}" @click="checkedIndex = 2">大巴</div>
        <div class="add_form_check ship" :class="{checked:checkedIndex ==3}" @click="checkedIndex = 3">轮船</div>

      </div>
      <div class="add_label">选择出行日期</div>
      <input type="date" class="add_input" v-model.trim="tripInfo.t_date" placeholder="请选择出行日期" />
      <div class="add_label">登记班次</div>
      <input type="text" class="add_input" v-model.trim="tripInfo.t_no" placeholder="请输入班次" />
      <div class="sina_btn primary radius sumbtn" @click="createTrip">提交</div>
    </div>
  </div>
</template>

<script>
    import tripUserinfo from '../../components/tripUserinfo';
    import Api from "../../utils/apiConfig";
    export default {
        components:{
          tripUserinfo
        },
        name: "tripIntro",
        data() {
            return {
              checkedIndex:0,
              tripInfo:{
                t_type: null,
                t_date: null,
                t_no: null
              }
            }
        },
        computed: {},
        mounted() {


        },
        created(){
          this.actionCount('pv');
          let hasChecked = this.$route.query.hasChecked;
          if(hasChecked== 1){
            this.$post(Api.subscribe);
          }
        },
        methods:{
           createTrip(){
             if (!this.tripInfo.t_date) {
                this.$toast('请选择出行日期');
                return false;
             }
             if (!this.tripInfo.t_no) {
                this.$toast('请输入登记班次');
                return false;
             }
             let type = 1;
             switch(this.checkedIndex){
               case 0:
                 type = 1;
                 break;
                case 1:
                 type = 2;
                 break;
                case 2:
                 type = 4;
                 break;
                case 3:
                 type = 7;
                 break;
             }
             this.actionCount('click');
             this.tripInfo.t_type = type.toString();
             this.$post(Api.createTravel,this.tripInfo).then(ret=>{
                if(ret.code==0){
                  sessionStorage.removeItem('myTravelList');
                  this.$router.push('/weibo/trip-all')
                }else{
                  this.$toast(ret.msg || "请求失败，请刷新重试");
                }
             })
           }

        }

    }
</script>

<style scoped lang="scss">
  @import "../css/trip";
  @import "../css/mixin";
  .trip_page{
    background: #fff;
    .add_form{
      background: #fff;
      margin-top: 10px;
      border-top: 10px solid #F7F9FD;
      padding: 40px 30px;
      .add_form_title{
        font-size: 32px;
        padding-bottom: 8px;
      }
      .add_form_checks{
          display: flex;
          justify-content: space-between;
          flex-direction: row;
          flex-wrap: wrap;
          .add_form_check{
            width:210px;
            height:90px;
            line-height: 90px;
            margin-top: 30px;
            position: relative;
            padding-left: 140px;
            border-radius:20px;
            border:1px solid rgba(151,151,151,1);
            background-size: 86px 86px;
            background-position: 30px top;
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
            &.checked{
              border-color: #2779F4;
              border-width: 2px;
              &::after{
                content: '';
                position: absolute;
                right: 0;
                bottom: 0;
                width: 47px;
                height: 24px;
                background-size: cover;
                @include level-bg-image('tripCheckIcon1');
              }
            }
          }
      }
      .add_label{
        font-size: 32px;
        padding-top: 70px;
      }
      .add_input{
        width: 100%;
        height:88px;
        padding: 22px 30px;
        margin-top: 40px;
        line-height: 44px;
        background:rgba(255,255,255,1);
        border-radius:20px;
        font-size: 32px;
        border:1px solid rgba(183,182,182,1);
      }
      .sumbtn{
        margin: 64px 0;
      }
    }
  }

</style>
