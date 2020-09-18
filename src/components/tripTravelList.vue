<template>
  <transition name="fade">
    <div class="sina_cont trip_cells">
      <template v-for="(item,index) in mytravelList">
        <div class="sina_radius_bg trip_cell" 
          :class="{plane: item.t_type ==1,train: item.t_type ==2 ,bus: item.t_type ==4,ship: item.t_type ==7}"
          :key="index">           
        <div class="trip_cell__bd">
          <div class="date">{{item.date}}</div>
          <div class="shifts">{{item.t_no}}</div>
        </div>
        <div class="trip_cell__state">
          <img src="../pages/images/tripStateIcon1_3x.png" v-if="item.state==0" />
          <img src="../pages/images/tripStateIcon2_3x.png" v-else />
        </div>
        <div class="delbtn" @click="delTrip(item.sign)">删除</div>
      </div>
      </template>
    </div>       
  </transition>
</template>

<script>
import Api from '../utils/apiConfig'
  export default {
    name: "sinaAlert",
    props:{
           
    },
     
    data() {
     return{
       mytravelList:null,
     }
    },
    created(){
      if(sessionStorage.getItem('myTravelList')){
        this.mytravelList = JSON.parse(sessionStorage.getItem('myTravelList'));
      }else{
        if (localStorage.getItem('_userToken')) {
          this.getmyTravelList();
        }
      }
     
    },
    methods:{
        getmyTravelList(){
          this.$get(Api.getmyTravelList).then(ret=>{
            if(ret.code==0){
              this.mytravelList = ret.data.travel_list;
              sessionStorage.setItem('myTravelList',JSON.stringify(this.mytravelList));
            }else{
             this.$toast(ret.msg || "请求失败，请刷新重试"); 
            }
          })
        },
        delTrip(sign){
          this.$post(Api.delTravel,{sign:sign}).then(ret=>{
            if(ret.code==0){
              this.$toast('删除成功！')
              this.getmyTravelList();
            }else{
              this.$toast(ret.msg || "请求失败，请刷新重试");
            }
          })
        }
    }
    
  }
</script>
<style lang="scss" scoped>
  @import "../pages/css/mixin";
  @import "../pages/css/trip";
  .trip_cells{
    .sina_radius_bg.trip_cell{
      padding: 50px 30px 74px 154px;    
      .delbtn{
        position: absolute;
        right: 0px;
        bottom: 0px;
        color: #B7B6B6;
        padding: 20px 30px;
      }
      &.plane{
        @include page-bg-image('tripIcon1');
      }
        &.train{
        @include page-bg-image('tripIcon2');
      }
      &.bus{
        @include page-bg-image('tripIcon3');
      }
      &.ship{
          @include page-bg-image('tripIcon4');
      }
    }
  }
  
</style>
