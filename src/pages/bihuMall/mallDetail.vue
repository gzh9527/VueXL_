<template>
  <div class="container hasbot">
    <div class='good_detail' v-if="goodDetail">
      <img mode='widthFix' class="detail_img" v-lazy='goodDetail.prodImg'/>
      <div class='good_info'>
        <span class='good-media_title'>{{goodDetail.prodName}}</span>
        <div class='good-media_money'>
          <span class='col_prim'>￥<span class='good-money'>{{ goodDetail.prodPrice}}</span></span>
          <span class='remark' v-if="goodDetail.bihuMoney">返{{goodDetail.bihuMoney}}元互助金</span>
          <span class='yyj col_grey'>限时包邮</span>
        </div>
      </div>
      <template v-if="goodDetail.remaks">
        <span class='shop_title'>特别说明</span>
        <span class='good_remark col_grey'>{{goodDetail.remaks}}</span>
      </template>

      <template v-if="goodDetail.expressarea.length>0">
        <span class='shop_title'>不能配送的区域</span>
        <div class='good_tags'>
          <span class='good_tag col_grey' v-for="item in goodDetail.expressarea">{{item}}</span>
        </div>
      </template>
      <template v-if="goodDetail.params.length>0">
        <span class='shop_title'>规格参数</span>
        <div class='good_sizes'>
          <span class="good_size oneline" v-for="item in goodDetail.params">{{item}}</span>
        </div>
      </template>

      <!-- <span class='shop_title'>会员评价</span>
      <good-rate ratelength="{{1}}"></good-rate>
      <div class='rate_btns'><button class='line-btn'>查看全部评价</button></div> -->
      <div class='shop_title'>商品详情</div>
      <div class='detail_imgs'>
        <template v-for="item in goodDetail.detailsImg">
          <img v-lazy="item"/>
        </template>

      </div>
    </div>


  </div>
</template>

<script>
  import Api from "../../utils/apiConfig";

  export default {
    name: "mallDetail",
    data() {
      return {
        goodDetail: null,
      }
    },
    created() {
      this.getproduct();
    },
    methods: {
      getproduct() {
        this.$get(Api.getProdsDetail, {prodId: this.$route.query.id, from: 'sina'}).then(ret => {
          ret.expressarea = ret.expressarea == '' ? [] : ret.expressarea.split(',');
          ret.params = ret.params == '' ? [] : ret.params.split(',').reverse();
          ret.prodPrice = (ret.prodPrice).toFixed(2)
          this.goodDetail = ret;
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .detail_img {
    width: 100%;
    height: 700px;
  }

  .detail_img image {
    width: 100%;
    max-height: 700px;
  }

  .good_remark {
    display: block;
    padding: 12px 30px;
    font-size: 26px;
  }

  .good_tags {
    padding: 12px 30px;
  }

  .good_tags .good_tag {
    padding: 6px 16px;
    background-color: #e5e5e5;
    font-size: 24px;
    margin-right: 30px;
    display: inline-block;
  }

  .good_info {
    padding: 12px 30px;
  }

  .good-media_title {
    font-size: 30px;
    display: block;
    color: #000;
    font-weight: 600;
  }

  .col_prim {
    color: #f52f2f
  }

  .good-media_money {
    height: 80px;
    line-height: 80px;
    position: relative;
  }

  .good-media_money .good-money {
    font-size: 50px;
  }

  .good-media_money .remark {
    font-size: 26px;
    margin-left: 10px;
    position: relative;
    top: -6px;
  }

  .good-media_money .yyj {
    font-size: 26px;
    position: absolute;
    top: 0;
    right: 0
  }

  .good_sizes {
    padding: 30px 30px 20px;
  }

  .good_size {
    display: inline-block;
    width: 49%;
    font-size: 28px;
  }

  .oneline {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .shop_title {
    display: block;
    padding: 0 30px;
    height: 60px;
    line-height: 60px;
    background: #e5e5e5;
    font-size: 24px;
  }

  .detail_imgs image {
    width: 100%;
  }

  .rate_btns {
    margin: 0 auto 40px;
    text-align: center;
  }

  .line-btn {
    min-width: 200px;
    line-height: 56px;
    text-align: center;
    border-radius: 50px;
    border: 2px solid #f52f2f;
    color: #f52f2f;
    display: inline-block;
    font-size: 28px;
  }


</style>
