<template>
  <div class="sina_page">
    <div class="sina_btn_con">
      <button class="sina_btn primary radius" @click="delCache()">清除个人登录信息</button>
    </div>

  </div>
</template>

<script>
  export default {
    name: "userAuth",
    created() {
      
    },
    methods:{
      delCache(){
        localStorage.clear();
        sessionStorage.clear();
        this.$toast('清除成功')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sina_page{
    background: #fff;
    .sina_btn_con{
     padding: 400px 30px 0;
    }
  }
</style>
