<template>
    <transition :name="fadeIn">
        <div class="toastbox" v-show="show">
            <div class="toast-mask" v-show="isShowMask"></div>
            <transition :name="translate">
                <div class="msgbox" :class="[position,{'maxwidth': maxwidth}]" v-show="show">
                    <i :class="iconClass" v-show="iconIsShow"></i>
                    <div class="tag">{{message}}</div>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
export default {
  data() {
    return {
      show: false,        //是否显示此toast
      message: '',    //提醒文字
      position: 'center',  //提醒容器位置
      isShowMask: true,   //是否显示遮罩层
      time: 2000,           //显示时间
      transition: true,      //是否开启动画
      iconClass: '',         //背景icon(success 、warning、error)
      callback: '',          //回调函数
    }
  },
  computed: {
    // 用于判断icon是否显示
    iconIsShow() {
         let iconClass = this.iconClass;

         if (iconClass === 'success' || iconClass === 'error' || iconClass === 'warning') {
            return true;
         }
         else {
            return false;
        }
    },
    maxwidth(){
      return this.message.length > 24;
    },

      // 根据data，生成相对应的动画
    translate() {
      if(!this.transition) {
        return ''
      }else{
        if (this.position === 'top') {
          return 'translate-top';
        }else if (this.position === 'middle') {
          return 'translate-middle';
        }else if (this.position === 'bottom') {
          return 'translate-bottom';
        }
      }
    },
    fadeIn() { // 同上
      if (!this.transition) {
          return ''
      }else{
        return 'fadeIn'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  @mixin transForm($value...) {
    -webkit-transform: $value;
    -moz-transform: $value;
    -ms-transform: $value;
    -o-transform: $value;
    transform: $value;
  }
 .msgbox{
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 10017;
    max-width: (600px);
     height: auto;
    box-sizing: content-box;
    padding: (18px 22px);
    @include transForm(translate(-50%,-50%));
    background: rgba(0,0,0,.62);
    border-radius: (10px);
    text-align: center;
     white-space: nowrap;
    color: #fff;
    font-size: (28px);
    &.maxwidth{
      width: (600px);
      white-space: normal;
    }
    &.top{
      top: (60px);
      margin-top: 0;
    }
    &.center{
      top: 50%;
      @include transForm(translate(-50%,-50%));
    }
    &.bottom{
      top: auto;
      bottom: (60px);
      margin-top: 0;
    }
 }
 .msgbox i{
    width: 100px;
    height: 100px;
    display: block;
    margin: 5px auto 20px;
    background: no-repeat center center;
    background-size: 100% 100%;
   &.success{
    //  background-images: url('data:images/png;base64,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');
      background-image: url('data:image/png;base64,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');
   }
    &.warning{
      background-image: url('data:image/png;base64,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');
    }
    &.error{
       background-image: url('data:image/png;base64,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');
    }
 }

 .toast-mask{
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0,0,0,0);
    z-index: 9999;
 }
 .fadeIn-enter-active, .fadeIn-leave-active{
    transition: opacity .3s;
 }
 .fadeIn-enter, .fadeIn-leave-active{
    opacity: 0;
 }
 .translate-top-enter-active, .translate-top-leave-active{
    transition: all 0.3s ;
 }
 .translate-top-enter, .translate-top-leave-active{
    top: -10% !important;
    opacity: 0;
 }
 .translate-middle-enter-active, .translate-middle-leave-active{
    transition: all 0.3s cubic-bezier(.36,.66,.04,1);
 }
 .translate-middle-enter, .translate-middle-leave-active{
    transform: translateY(80%);
    opacity: 0;
 }
 .translate-bottom-enter-active, .translate-bottom-leave-active{
    transition: all 0.3s cubic-bezier(.36,.66,.04,1);
 }
 .translate-bottom-enter, .translate-bottom-leave-active{
    bottom: -10% !important;
    opacity: 0;
 }
</style>
