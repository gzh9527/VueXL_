<template>
  <div class="sina_page">
    <div class="amnt_cells">
      <template v-for="item of editList">
        <div class="amnt_cell">
          <div class="title">{{item.amnt/10000}}万元互助金 （大病互助计划）</div>
          <div class="desc">调整时间 {{item.create_date}}</div>
          <div class="infos">
            <p>互助金：{{item.amnt/10000}}万元</p>
            <p>观察期：{{item.valid_date}} 至 {{item.obs_end_date}}</p>
            <p>生效原因：<span class="col_primary">手动调额</span></p>
          </div>
        </div>
      </template>

    </div>
    <div class="page_amnt_bot">
      <button class="sina_btn primary radius max" @click="goback()">返回个人中心</button>
    </div>
  </div>
</template>

<script>
  import Api from "@/utils/apiConfig";
  export default {
    name: "editAmintList",
    data(){
      return{
        editList:null,
      }
    },
    created(){
      this.$get(Api.adjustCoverageList).then(ret=>{
        if(ret.code==0){
          this.editList = ret.data.adjust_list;
        }
      })
    },
    methods:{
      goback(){
        this.$router.push('/weibo/insure-plan')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sina_page{
    background: #fff;
    position: relative;
    .amnt_cells{
      .amnt_cell{
        padding: 42px 40px 46px;
        color: #939393;
        border-bottom: 20px solid #F2F2F2;
        &:last-child{
          border-bottom:0;
        }
        .title{
          font-size: 32px;
          color: #333333;
          padding-bottom: 16px;
        }
        .desc{
          font-size: 22px;
          color: #333;
        }
        .infos{
          padding-top: 30px;
          p{
            padding-bottom: 12px;
            &:last-child{
              padding-bottom: 0px;
            }
          }
        }
      }
    }
    .page_amnt_bot{
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 40px 30px;
      border-top: 1px solid #E6E6E6;
    }
  }
</style>
