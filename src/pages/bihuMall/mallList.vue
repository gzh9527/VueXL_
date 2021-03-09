<template>
  <div class="sina_page">
    <img src="https://mall.bihubao.com/common/img/LOCAL_20180120141946_0shyskuu6s54" class="detail_img" />
    <div class="shop_title">自营甄品</div>
    <div v-for="(good,index) in goodsList">
      <div class="shop_list"   @click='checkdetail(good.prodId)'>
        <div class="shop-media-box shop-media-box_appmsg">
          <div class="shop-media-box__hd">
            <img class="shop-media-box__thumb" v-lazy="good.prodImg+'_thumb'" alt=""/>
          </div>
          <div class="shop-media-box__bd">
            <span class='shop-media_title single-line'>{{good.prodName}}</span>
            <div class='shop-media_tags'>
              <span v-for="item  in good.prodLabels" class='shop-media_tag'>{{item}}</span>
            </div>
            <div class='shop-media_money'>
              <span class='col_prim'>￥
                <span class='money'>{{good.prodPrice}}</span>
              </span>
              <span class='remark' v-if="good.prodbihujin">返{{good.prodbihujin}}元互助金</span>
            </div>
            <div class='shop-media_btn'>
              <button v-if="good.prodScore>0" class='shopbtn'>{{good.prodScore}}分</button>
              <button class='shopbtn primary'>甄品详情</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class='nomore'  >我可是有底线的哦～</div>
  </div>
</template>

<script>
  import Api from "../../utils/apiConfig";

  export default {
    name: "mallList",
    data() {
      return {
        goodsList: null,
      }
    },
    created(){
      sessionStorage.setItem('_openId','oYQlt5SYene_NnfNtHOavmQ6uje8')
      this.getList();
    },
    methods:{
      getList(){
        this.$get(Api.getProds +'?prodState=1&prodType=1&from=sina').then(ret=>{
          ret.map(item => {
            item.prodLabels = item.prodLabels.split(',');
            item.prodPrice = (item.prodPrice).toFixed(2);
            return item;
          });
          this.goodsList = ret;
        })
      },
      checkdetail(id){
        this.$router.push(`/weibo/mall-detail?id=${id}`)
      }
    }
  }
</script>

<style scoped>
  .detail_img {
    width: 100%;
  }
  .shop_title {
    display: block;
    padding: 0 30px;
    height: 60px;
    line-height: 60px;
    background: #e5e5e5;
    font-size: 24px;
  }
  .shop-media-box_appmsg {
    padding: 10px;
    display: flex;
    align-items: center;
    border-bottom: 2px solid #e5e5e5;
  }

  .shop-media-box__hd {
    margin-right: 32px;
    width: 240px;
    height: 240px;
    line-height: 240px;
    text-align: center;
  }

  .shop-media-box__thumb {
    width: 100%;
    max-height: 100%;
    vertical-align: top;
  }

  .shop-media-box__bd {
    flex: 1;
    min-width: 0;
  }

  .col_prim {
    color: #f52f2f
  }

  .shop-media_title {
    font-size: 30px;
    padding-bottom: 8px;
    display: block;
    color: #000;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .shop-media_tag {
    border-radius: 8px;
    display: inline-block;
    border: 1px solid #505050;
    padding: 0 10px;
    margin-right: 8px;
    font-size: 20px;
    line-height: 30px;
  }

  .shop-media_money {
    height: 80px;
    line-height: 80px;
    position: relative;
  }

  .shop-media_money .money {
    font-size: 50px;
  }

  .shop-media_money .remark {
    color: #b2b2b2;
    font-size: 26px;
    margin-left: 10px;
    position: relative;
    top: -6px;
  }

  .shopbtn {
    min-width: 140px;
    text-align: center;
    padding: 10px 8px;
    border-radius: 4px;
    border: 2px solid #f52f2f;
    color: #f52f2f;
    display: inline-block;
    font-size: 26px;
    line-height: 1.2;
    margin-right: 10px;
  }

  .shopbtn.primary {
    background-color: #f52f2f;
    border: 2px solid #f52f2f;
    color: #fff;
  }

  .nomore {
    width: 100%;
    display: block;
    font-size: 28px;
    color: #a0a0a0;
    padding: 20px;
    text-align: center;
  }
</style>
