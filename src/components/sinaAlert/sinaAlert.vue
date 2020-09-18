<template>
  <transition name="fadeIn">
    <div class="toastbox sinaalertbox" v-show="isShow" ref="alertbox">
      <div class="toast-mask"></div>
        <div class="msgbox" :class="{max :size =='medium'}" >
          <div class="msgbox_cont" :class="{[addClass]:addClass!=''}">
            <div class="title" v-if="title!=''" :class="{onlytitle:onlyHasTitle}">{{title}}</div>
            <div class="desc" v-if="desc!=''" v-html="desc"></div>
            <slot></slot>
            <div class="cont_btns" v-if="!btnOnlyLine">
              <button class="sina_btn primary radius cont_btn" v-if="cancelButtonText!=''" @click="cancalAction()">{{cancelButtonText}}</button>
              <button class="sina_btn  radius cont_btn" :class="{default:!onlyBtn, primary:onlyBtn}" v-if="confirmButtonText!=''" @click="sumbitAction()">{{confirmButtonText}}</button>
            </div>
            <div class="cont_btns onlyLine" v-if="btnOnlyLine">
              <button class="sina_btn default  radius cont_btn" v-if="cancelButtonText!=''" @click="cancalAction()">{{cancelButtonText}}</button>
              <button class="sina_btn primary radius cont_btn"  v-if="confirmButtonText!=''" @click="sumbitAction()">{{confirmButtonText}}</button>
            </div>
          </div>
          <div class="closebtn" v-if="showClose" @click="closeAlert"></div>
        </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "sinaAlert",
    props:{
      isComponents:false,
      alertTitle:{
        type:String,
        default: '',
      },
      sumbitBtn:{
        type:String,
        default: '确认',
      },
      closeBtnShow:false,
      className:{
        type:String,
        default: '',
      },

    },
    data() {
      return {
        isShow: true,        //是否显示此toast
        title: '',        //提醒文字
        onlyHasTitle: false, // 是否只有标题
        desc: ``,          //描述文字
        callback: null,          //回调函数
        showClose: false,        // 关闭按钮
        confirmButtonText: '', //确认文字
        cancelButtonText: '',//取消文字
        cancelCallback:null,
        onlyBtn: false,
        btnOnlyLine:false,
        size:'small ', // 尺寸	string	medium / small
        addClass:'',
      }
    },
    created(){
      if (this.isComponents) {
        this.title = this.alertTitle;
        this.cancelButtonText = this.sumbitBtn;
        this.showClose = this.closeBtnShow;
        this.addClass = this.className;
      }
    },
    methods:{
      closeAlert() {
        if (this.isComponents) {
          this.$emit('closeEvt')
        } else {
          this.isShow = false;
          this.$refs.alertbox.remove();
        }
      },
      cancalAction() {
        if (this.isComponents) {
          this.$emit('sumbitEvt')
        } else {
          typeof this.cancelCallback == 'function'&&  this.cancelCallback();
          this.closeAlert();
        }
      },
      sumbitAction(){
        this.closeAlert();
        setTimeout(()=>{
          (this.callback && typeof this.callback === 'function') && this.callback();
        },200);

      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../pages/css/mixin";
  .msgbox {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 10017;
    width: 570px;
    height: auto;
    box-sizing: content-box;
    &.max{
      width: 670px;
    }
    @include transForm(translate(-50%, -50%));
    .msgbox_cont{
      padding: 0px 40px 56px;
      border-radius: 20px;
      background: #fff;
      width: 100%;
      .title{
        font-size: 36px;
        line-height: 50px;
        padding: 36px 0 20px;
        font-weight: 600;
        border-bottom: 1px solid #e6e6e6;
        text-align: center;
        &.onlytitle{
          font-weight: normal;
          line-height: 1.6;
          padding: 76px 0 50px;
          border: 0;
          text-align: left;
        }
      }
      .desc{
        padding-top: 40px;
        font-size: 24px;
        line-height: 1.6;
      }
      .cont_btns{
        &.onlyLine{
          display: flex;
          .cont_btn{
            flex: 1;
            &:first-child{
              margin-right: 10px;
            }
          }
        }
        .cont_btn{
          margin-top: 30px;
          height: 84px;
          line-height: 84px;
        }
      }
    }
    .give_alert{
      background: url("http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/newValent/welfareAlertBg.png") transparent no-repeat ;
      background-size: 570px 560px;
      height: 560px;
      padding: 0 25px 56px;
      .title{
        border: 0px;
      }
      .cont_btns{
        padding: 0 25px;
      }
    }
    .closebtn{
      width: 64px;
      height: 64px;
      margin: 100px auto 0;
      @include level-bg-image('sinaDialogClose');
      background-size: cover;
      background-position: center 0;
    }
  }



  .toast-mask {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, .8);
    z-index: 9999;
  }
  /*.translate-middle-enter-active, .translate-middle-leave-active{*/
  /*  transition: all 0.3s cubic-bezier(.36,.66,.04,1);*/
  /*}*/
  /*.translate-middle-enter, .translate-middle-leave-active{*/
  /*  transform: scale();*/
  /*  opacity: 0;*/
  /*}*/
</style>
