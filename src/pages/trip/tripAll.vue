<template>
  <div class="sina_page trip_page">
    <tripUserinfo></tripUserinfo>
    <tripTravellist></tripTravellist>
    <div class="add_trip_btn" @click="addTrip">登记我的行程</div>
    <div class="bot_btn">
      <div class="sina_btn primary radius" @click="compeleteEvt">完成</div>
      <div class="check_box"  :class="{checked:sendchecked}" @click.stop="sendchecked=!sendchecked">
        转发微博，帮助更多人
      </div>
    </div>
  </div>
</template>

<script>
    import tripUserinfo from '../../components/tripUserinfo';
    import tripTravellist from '../../components/tripTravelList';
    import Api from "../../utils/apiConfig";
    export default {
        components:{
          tripUserinfo,tripTravellist
        },
        name: "tripIntro",
        data() {
            return {
             sendchecked:true
            }
        },
        computed: {},
        mounted() {


        },
        created(){

        },
        methods:{
           addTrip(){
             this.$router.push('/weibo/trip-add');
           },
           compeleteEvt(){
              this.actionCount('click');
              if (this.sendchecked) {
                this.$post(Api.shareNotice,{action:'travel'});
                this.actionCount('send_click');
                this.$router.push('/weibo/feiyan-intro?channel=810005');
              }else{
                this.$router.push('/weibo/feiyan-intro?channel=810005');
              }
          },

        }

    }
</script>

<style scoped lang="scss">
  @import "../css/trip";
  @import "../css/mixin";
  .trip_page{
    padding-bottom: 238px;
    .trip_cells{
      .sina_radius_bg.trip_cell{
        padding: 50px 30px 74px 154px;
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
        .delbtn{
          position: absolute;
          right: 0px;
          bottom: 0px;
          color: #B7B6B6;
          padding: 20px 30px;
        }
      }
    }

    .add_trip_btn{
      margin: 40px auto 0;
    }
    .bot_btn{
      width: 100%;
      position: fixed;
      left: 0;
      bottom: 0;
      background: #fff;
      padding: 30px 30px 40px;
      .check_box {
        margin-top: 30px;
        margin-left: 204px;
        color: #507DAF;
      }
    }
  }


</style>
