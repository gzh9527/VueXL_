<template>
  <div id="app">
<!--    <transition name="fade">-->
<!--      <router-view class="router-animate" />-->
<!--    </transition>-->
    <transition name="fade">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" class="router-animate"></router-view>
      </keep-alive>
    </transition>
    <transition name="fade">
      <router-view v-if="!$route.meta.keepAlive" class="router-animate"></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'App',
    mounted() {
      let setScrollTop = function() {
        let top =
          document.documentElement.scrollTop ||
          window.pageYOffset ||
          document.body.scrollTop;

        window.scrollTo(0, top + 1);
        setTimeout(() => {
          window.scrollTo(0, top);
        }, 50);
      };

      this.$nextTick(function() {
        // fix ios 键盘收起页面不回位
        document.addEventListener("focusout", setScrollTop, false);
      });
    }
  }
</script>

<style lang="scss">
  #app{
    width: 100%;
    height: 100%;
  }
  .router-animate {
    width: 100%;
    transition: opacity 0.1s cubic-bezier(0.55, 0, 0.1, 1);
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.1s ease-in-out;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>
