<template>
  <div class="sina_page">
    <div  class="out_intro">失效红包仅显示半年内数据</div>
    <redpack-list ticketType="invalid"></redpack-list>

  </div>
</template>

<script>
  import redpackList from '@/components/redpackList/redpackList'
  export default {
    name: "invalidTicket",
    components:{
      redpackList
    }
  }
</script>

<style lang="scss" scoped>
  .sina_page{
    background: #F2F2F2;
    .out_intro{
      padding-top: 24px;
      padding-bottom: 10px;
      text-align: center;
      color: #939393;
    }
  }
</style>
