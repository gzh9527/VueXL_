<template>
  <transition name="fade">
      <div v-if="addAlertShow">
        <div class="toast-mask"></div>
        <div class="msgbox">
          <div class="msgbox_cont">
            <div class="title">{{addPerson.notHaveCode =='XL003'?'新冠病毒互助计划':'恭喜你获得升级保障特权'}}</div>
            <img src="../pages/images/FYdetailTable_2x.png" v-if="addPerson.notHaveCode =='XL003'">
            <img src="../pages/images/DBdetailTable_2x.png" v-if="addPerson.notHaveCode =='XL001'">

             <div class="join_desc" v-if="addPerson.notHaveCode =='XL003'">
               <i class="checkbox"  :class="{checked:alertChecked}" @click.stop="alertChecked=!alertChecked"></i>
              我已阅读并同意
              <a href="javascript:;" @click="showAlert(1)" class="col_a">《会员公约》</a>
<!--             <a href="javascript:;" @click="showAlert(0)" class="col_a" v-if="addPerson.notHaveCode =='XL001'">《健康告知》</a>-->
              <a href="javascript:;" @click="showAlert(6)" class="col_a">《计划章程》</a>
              <a href="javascript:;" @click="showAlert(3)" class="col_a">《授权代扣委托书》</a>
<!--              <a href="javascript:;" @click="showAlert(2)" class="col_a"  v-if="addPerson.notHaveCode =='XL001'">《计划章程》</a>-->

            </div>
            <div class="cont_btns">
              <button class="sina_btn default  radius cont_btn" @click="cancalAdd">忍痛放弃</button>
              <button class="sina_btn  primary radius cont_btn" @click="addPlan()">{{addPerson.notHaveCode =='XL003'?'立即加入':'立即领取'}}</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
</template>

<script>
import Api from '../utils/apiConfig'
  export default {
    name: "sinaAlert",
    props:{
      addAlertShow:{
        type: Boolean,
        default: false
      },
      addPerson:null,

    },
    data() {
     return{
        alertChecked:true
     }
    },
    created(){
    },
    methods:{
      cancalAdd(){
        this.$emit('cancalAdd')
      },
      showAlert(idx){
        this.$emit('showClauseAlert',idx);
      },
      addPlan(){
        if(this.addPerson.notHaveCode=='XL001'){
          this.actionCount('addPlan_click1',()=>{
            this.$router.push('/weibo/insure-illIntro');
          });
          sessionStorage.setItem('_dabingAlert','1');
          return;
        }
         if(!this.alertChecked){
            this.$toast('请勾选我已阅读并同意');
            return false;
         }
         this.actionCount('add_click');
         let channel = localStorage.getItem('channel') || '810000';
         if(this.addPerson.notHaveCode == 'XL001'){
           channel = 40003;
         }
         this.$post(Api.addPolicy, {
          user_name: this.addPerson.name,
          certi_no: this.addPerson.idno_init,
          help_type:'1',
          work_type:'1',
          certi_type: "00",  //证件类型
          relation: this.addPerson.relatype, //关系
          mobile: this.addPerson.mobile || '' ,
          plan_code: this.addPerson.notHaveCode,
          channel: channel
        }).then(ret => {
          if (ret.code === 0) {
             if(ret.data.state==0){
                this.bindWallet();
             }else{
               this.$emit('addPlanSuc')
             }

          } else {
            this.$toast(ret.msg || "请求失败，请刷新重试");
          }
        })
        //  this.cancalAdd();
      },
      bindWallet() {
          this.$post(Api.bindWallet,{plan_code:'XL001'}).then(ret => {
              if (ret.code == 0) {
                  if (ret.data.state == 'not_bind') {
                      window.location.href = ret.data.url;
                  } else if (ret.data.state == 'has_activated') {
                      this.$emit('addPlanSuc')
                  }
              } else {
                  this.$toast(ret.msg || "请求失败，请刷新重试");
              }
          })
      },
    }

  }
</script>
<style lang="scss" scoped>
  @import "../pages/css/mixin";

  .msgbox {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 9997;
    width: 690px;
    height: auto;
    box-sizing: content-box;
    @include transForm(translate(-50%, -50%));

    .msgbox_cont {
      padding: 0px 50px 56px;
      border-radius: 20px;
      background: #fff;
      width: 100%;

      .title {
        font-size: 36px;
        line-height: 50px;
        padding: 36px 0 20px;
        font-weight: 600;
        text-align: center;

      }

      .cont_btns {
        width: 100%;
        display: flex;
        margin-top: 32px;

        .cont_btn {
          flex: 1;

          height: 84px;
          line-height: 84px;

          &:first-child {
            margin-right: 30px;
          }
        }
      }
    }
  }
   .join_desc {
        margin-top: 12px;
      }
</style>
