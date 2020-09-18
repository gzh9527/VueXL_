<template>
  <transition name="fadeIn">
    <div class="toastbox" v-show="show" ref="alertbox">
      <div class="toast-mask" @click="closeProp"></div>
      <transition name="translate-bottom">
        <div class="prop_cont"  v-show="show">
          <div class="prop_top">
            <span class="cancel_btn" @click="closeProp">{{cancelButtonText}}</span>
            <span class="title">{{title}}</span>
            <span class="confirm_btn" @click="confirmProp">{{confirmButtonText}}</span>
          </div>
          <div class="prop_cells" v-if="dataList">
            <template v-for="(item,index) of dataList">
              <div class="prop_cell" :class="{active:index == currentIndex }" @click="currentIndex=index">
                <span class="icon"></span>
                <span class="prop_cell_name">{{item.name}}</span>
                <span class="prop_cell_desc" v-if="item.desc">{{item.desc}}</span>
              </div>
            </template>

          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "sinaAlert",
    props:{
      show:{
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: '标题'
      },
      confirmButtonText:  {
        type: String,
        default: '确认'
      }, //确认文字
      cancelButtonText: {
        type: String,
        default: '取消'
      },//取消文字
      checkedIndex:{
        type:Number,
        default:0,
      },
      dataList:{
        type:Array,
        default:null
      }
    },
    data() {
      return {
        isSHow:true,
        currentIndex:null,
      }
    },
    mounted(){
      this.currentIndex = this.checkedIndex;
    },
    methods:{
      closeProp() {
        this.isSHow = false;
        setTimeout(() => {
          this.$emit('closeProp');
          this.currentIndex = this.checkedIndex;
          this.isSHow = true;
        }, 200)
      },
      confirmProp() {
        this.isSHow = false;
        setTimeout(() => {
          this.$emit('confirmProp', this.currentIndex);
          this.isSHow = true;
        }, 200)
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../pages/css/mixin";
  .toast-mask {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, .8);
    z-index: 998;
  }
  .prop_cont{
    width:100%;
    min-height: 324px;
    position: fixed;
    bottom: 0;
    left:0;
    padding: 0 30px;
    background:#fff;
    border-radius:20px 20px 0px 0px;
    z-index: 999;
    .prop_top{
      display: flex;
      height: 106px;
      line-height: 106px;
      border-bottom: 1px solid #e6e6e6;
      .title{
        flex:1;
        font-size: 36px;
        text-align: center;
        padding: 0 30px;
      }
      .cancel_btn{
        color: $grey;
      }
      .confirm_btn{
        color: $primary;
      }
    }
    .prop_cells{
      padding: 16px 0;
      .prop_cell{
        height: 100px;
        line-height: 100px;
        border-bottom: 1px solid #e6e6e6;
        color: $grey;
        text-align: center;
        position: relative;
        span{display: inline-block;}
        .icon{
          width: 20px;
          height: 20px;
          display: none;
          @include page-bg-image('sinaStart');
          background-size: 20px 20px;
          background-position: center left;

        }
        .prop_cell_name{
        }
        .prop_cell_desc{
          font-size: 20px;
        }
        &.active{
          .icon {
            display: inline-block;
          }
          .prop_cell_name{
            font-size: 28px;
            color: #333;
          }
          .prop_cell_desc{
            font-size: 24px;
          }
        }
        &:last-child{
          border: 0;
        }
      }
    }
  }
  .translate-bottom-enter-active, .translate-bottom-leave-active{
    transition: all 0.3s cubic-bezier(.36,.66,.04,1);
  }
  .translate-bottom-enter, .translate-bottom-leave-active{
    bottom: -10% !important;
    opacity: 0;
  }
</style>
