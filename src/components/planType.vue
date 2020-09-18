<template>
  <transition name="fadeIn">
    <div class="toastbox" >
      <div class="toast-mask" @click="closeAlert"></div>
      <transition name="fadeIn">
        <div class="msgbox">
          <div class="msgbox_cont">
            <div class="title">调整受助类型</div>
            <div class="desc">
              <div class="type_name">当前大病受助类型为：<span class="col_ffb93c">{{help_type_name}}</span></div>
              <div class="sina_check_box">
                <div class="label">选择受助类型</div>
                <div class="check_cells">
                  <div class="check_cell" :class="{checked:helpType==3}"  @click="helpType=3"><i class="check"></i>报销型</div>
                  <div class="check_cell" :class="{checked:helpType==2}" @click="helpType=2"><i class="check"></i>给付型</div>
                </div>
              </div>
              <div class="tips col_primary">提示：报销型和给付型的扣款比例为1:2，具体参见大病互助章程</div>
            </div>
            <div class="cont_btns" >
              <button class="sina_btn default radius cont_btn" @click="closeAlert">取消</button>
              <button class="sina_btn primary radius cont_btn" @click="updateTypeAlert">立即调整</button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
  import Api from '../utils/apiConfig'
  export default {
    name: "sinaAlert",
    props:{
      policy_uuid:null,
      plan_code:null,
      help_type:null,
      help_type_name:{
        type: String,
        default:'报销型'
      },
    },
    data() {
      return {
        helpType:null,
      }
    },
    created(){
      this.helpType = this.help_type || 3;
    },
    methods:{
      updateTypeAlert(){
        if(this.help_type!=this.helpType){
          let desc =`受助类型由${this.help_type_name}改为`;
          if(this.helpType == '3'){
          //  报销型
            desc += '报销型，<span style="color:#FFB93C">请确认是否修改？</span>'
          }else{
          //  给付型
            desc += '给付型，<span style="color:#FFB93C">修改后扣费金额增加1倍，请确认是否修改？</span>'
          }
          this.$sinaAlert({
            title: '调整提示',        //提醒文字
            onlyHasTitle: false,
            callback: this.updateType,
            desc:desc,
            showClose: false,        // 关闭按钮
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            btnOnlyLine:true
          })
        }else{
          this.closeAlert();
        }

      },
      closeAlert(){
        this.$emit('closeTypeAlert')
      },
      updateType(){
        this.$post(Api.changeHelpType, {
          policy_uuid: this.policy_uuid,
          plan_code: this.plan_code,
          duty_type:this.helpType
        }).then(ret=>{
          if(ret.code==0){
            this.$emit('closeTypeAlert',true)
          }else{
            this.$toast(ret.msg);
          }

        })

      }

    }
  }
</script>
<style lang="scss" scoped>
  @import "../pages/css/mixin";
  .toast-mask {
    z-index: 9994;
  }
  .msgbox {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 9995;
    width: 690px;
    height: auto;
    box-sizing: content-box;

    @include transForm(translate(-50%, -50%));
    .msgbox_cont{
      padding: 0px 42px 50px;
      border-radius: 20px;
      background: #fff;
      width: 100%;
      .title{
        font-size: 36px;
        line-height: 50px;
        padding: 36px 0 20px;
        font-weight: 600;
        text-align: center;
      }
      .desc{
        margin-top: 30px;
        font-size: 24px;
        line-height: 1.6;
        .type_name{
          text-align: center;
          padding-bottom: 54px;
        }
        .tips{
          padding-top: 40px;
          text-align: center;
        }
      }
      .cont_btns{
        display: flex;
        margin-top: 60px;
        .cont_btn{
          flex: 1;
          height: 84px;
          line-height: 84px;
          &:first-child{
            margin-right: 10px;
          }

        }
      }
    }
  }

  .sina_check_box{
    font-size: 30px;
    .label{
       padding-bottom: 40px;
    }
    .check_cells{
      padding: 0 57px;
      display: flex;
      line-height: 42px;
      .check_cell{
        padding-left: 66px;
        position: relative;
        flex: 1;
        .check{
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border:1PX solid rgba(151,151,151,1);
        }
        &.checked{
          .check::before{
            content: "";
            @include center;
            width:30px;
            height:30px;
            background:rgba(83,196,75,1);
            border-radius: 50%;
          }
        }
      }
    }
  }
</style>
