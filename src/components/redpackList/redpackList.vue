<template>
  <div class="packet_list">
    <div class="packet_cells">
      <div class="nodata" :class="{invaild:tabName == 0}" v-if="ticketList&&ticketList.length==0">暂无优惠券</div>
      <template v-for="item of ticketList">
        <div class="packet_cell" :class="{used:item.state == '1',out:item.state == '2'}">
          <div class="icon_img">
            <img :src="item.state=='0' ? item.unused_icon :item.used_icon">
          </div>
          <div class="right_cont">
            <div class="oneline txtline">{{item.name}}<span class="flex1 textr col_primary">￥<span
              class="max_font">{{item.worth}}</span></span></div>
            <div class="two_line txtline">可用时间：{{item.start_date}}{{item.expires_date?'-'+item.expires_date : '之后'}}
              <span class="flex1 textr col_grey" @click="showAlert(item.state)">分摊可用</span></div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  import Api from '@/utils/apiConfig'
  export default {
    name: "redpackList",
    props:{
      ticketType:{
        type:String,
        default:'invalid'
      }
    },

    data() {
      return {
        tabName:1,
        ticketList:null,
        invalidList:null,
      }
    },
    created(){
      this.ticketType =='invalid' ? this.tabName =0 : null;
      this.getTicketList();
    },
    methods:{
      getTicketList() {
        let apiName =['getInvalidTicketList','getTicketList'];
        this.$get(Api[apiName[this.tabName]],{page:1}).then(ret => {
          if (ret.code == 0) {
            this.ticketList =  ret.data.list;
          }
        })
      },
      showAlert(state) {
        if(state!='0'){
          return;
        }
        this.$sinaAlert({
          title: '红包使用细则',        //提醒文字
          onlyHasTitle: false,
          desc: `<p>1. 在可用时间内互助金分摊可抵扣，超出可用时间则红包失效；</p>
                 <p>2. 每次分摊最多使用一个红包，不可叠加使用；</p>
                 <p>3. 分摊抵扣时优先使用可使用红包中金额最高的红包。</p>
                  `,
          showClose: false,        // 关闭按钮
          cancelButtonText: '关闭',
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .packet_list {
    padding: 0 30px;
    position: relative;
    .nodata {
      color: #9FAAC1;
      text-align: center;
      font-size: 30px;
      background: url("http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/myRedpackNoDataBg.png") no-repeat center;
      background-size: 340px 311px;
      padding-top: 321px;
      margin-top: 50px;
      &.invaild{
        position: absolute;
        width: 100%;
        top: 230px;
        margin-top: 0px;
      }
    }

    .packet_cells {
      position: relative;
      font-size: 22px;
      .packet_cell {
        margin-top: 20px;
        height: 182px;
        border-radius:10px;
        padding: 16px  30px 16px 16px;
        display: flex;
        background: #fff;
        .icon_img{
          width: 150px;
          margin-right: 20px;
          font-size: 0;
        }
        .right_cont{
          flex: 1;
          .txtline{
            display: flex;
          }
          .oneline{
            font-size: 32px;
            line-height: 74px;
            padding-bottom: 18px;
            .max_font{
              font-size: 52px;
            }
          }
          .two_line{
            font-size: 22px;
          }
        }

        &.used, &.out {
          color: #ccc;
          position: relative;
          .col_primary,.col_grey{
            color: #ccc;
          }
          &:after{
            width: 100px;
            height: 100px;
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            background-repeat: no-repeat;
            background-size: 100px 100px;
          }
        }
        &.used:after {
          background-image: url("http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/redpack/redpacketStateIcon2.png");
        }
        &.out:after {
          background-image: url("http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/redpack/redpacketStateIcon1.png");
        }

      }
    }
  }
</style>
