<template>
  <div class="sina_page">
    <div class="sina_radius_bg noboxshow">
      <div class="ques_title">一定要离开新浪互助大家庭吗？ </div>
      <div class="ques_infos">哪里做得不够好，告诉我们，我们愿意改进 </div>
      <div class="ques_list">
        <template v-for="item of checkboxList">
          <label class="bh-checkbox " :class="{checked:item.checked} ">
            <span class="bh-checkbox__input">
              <span class="bh-checkbox__inner"></span>
              <input type="checkbox" class="bh-checkbox__original"
                     v-model="item.checked"  :value="item.label" @change="changeValue">
            </span>
              <span class="bh-checkbox__label">
              {{item.label}}
            </span>
          </label>
        </template>
        <div class="sina_textarea hascount" :class="{disabled:remarkDisabled}" v-if="!remarkDisabled">
          <textarea v-model="remark" maxlength="100" :disabled="remarkDisabled" class="" placeholder="最多输入100字" ></textarea>
          <span class="counts">{{remark.length}}/100</span>
        </div>
      </div>
      <div class="footer_btns">
        <div class="sina_btn default radius line medium" @click="giveupEvt">我还想放弃</div>
        <div class="sina_btn primary radius medium" @click="cancalGiveup">我再想想</div>
      </div>
    </div>
  </div>
</template>

<script>
  import Api from "../../utils/apiConfig";
  export default {
    name: "exitQues",
    data() {
      return {
        checkboxList:[],
        checkedIds: [],
        remarkDisabled: true,
        remark:'',
        planCode:null,
        actionName:'', //埋点action
      }
    },
    watch:{
      checkedIds(val){
        if(val.indexOf('其他')>-1){
          this.remarkDisabled = false;
        }else{
		      this.remark ='';
          this.remarkDisabled = true;
        }
      }
    },
    created(){
      if(!this.$route.query.id || this.$route.query.id == '' ||!this.$route.query.uuid || this.$route.query.uuid == ''){
        this.$router.push(`/weibo/insure-plan`);
        return;
      }
      this.getLeaveReason();
      this.planCode = this.$route.query.planCode || 'XL001';
      this.actionName = this.planCode == 'XL001' ? '' : '2';
      this.actionCount('pv' + this.actionName)
    },
    methods: {
      changeValue(ev) {
        let checked = ev.target.checked;
        let value = ev.target.value;
        let idx = this.checkedIds.indexOf(value);
        if (checked) {
          idx > -1 ? null : this.checkedIds.push(value)
        } else {
          idx > -1 ? this.checkedIds.splice(idx, 1) : null
        }
        this.$emit('change', checked, ev);
      },
      getLeaveReason(){
        this.$get(Api.getLeaveReason).then(ret=>{
          if(ret.code==0){
            let data = ret.data.reason_list;
            data = data.map(item=>{
              item = {
                label:item,
                checked:false
              }
              return item;
            })
            this.checkboxList =data;
          }
        })
      },
      cancalGiveup() {
        this.actionCount('cancelBtn_click' + this.actionName,()=> {
          this.$router.push(`/weibo/insure-detail?id=${this.$route.query.id}`);
        })
      },
      giveupEvt() {
        if(this.checkedIds.length==0){
          this.$toast('请选择退出原因');
          return
        }
        let ids = Object.assign([],this.checkedIds);
        let idx = ids.indexOf('其他');
        if(idx>-1){
          this.remark!='' ?   ids.splice(idx,1,this.remark) : null;
        }
        this.$post(Api.addLeaveReason, {reason_list: ids, plan_code: this.planCode}).then(ret => {
          if(ret.code==0){
            this.actionCount('sumbitBtn_click' + this.actionName,()=> {
              this.$router.push({path: '/weibo/exit-redPacket', query: this.$route.query})
            })
          }
        })
        //
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../css/mixin";

  .sina_page {
    padding: 20px;

    .sina_radius_bg {
      margin: 0;
      padding: 40px;
      .ques_title{
        font-size: 36px;
        font-weight: bold;
      }
      .ques_infos{
        font-size: 26px;
        padding-top: 20px;
      }
      .ques_list{
        padding: 50px 20px 10px;
        .bh-checkbox {
          position: relative;
          cursor: pointer;
          display: flex;
          margin-bottom: 30px;
          .bh-checkbox__input {
            position: relative;

            .bh-checkbox__inner {
              width: 40px;
              height: 40px;
              background: rgba(255, 255, 255, 1);
              border: 1px solid rgba(147, 147, 147, 1);
              border-radius: 50%;
              display: inline-block;
              position: relative;
            }

            .bh-checkbox__original {
              opacity: 0;
              position: absolute;
              top: 0;
              left: 0;
              width: 40px;
              height: 40px;
            }
          }

          .bh-checkbox__label {
            display: inline-block;
            margin-left: 30px;
            flex: 1;
            font-size: 30px;
            font-weight: bold;
            line-height: 40px;
          }

          &.checked {
            .bh-checkbox__inner {
              border-color: #4ACE98;

              &::after {
                content: '';
                width: 30px;
                height: 30px;
                background: rgba(74, 206, 152, 1);
                border-radius: 50%;
                @include center;
              }
            }
          }
          &.group-item{
            padding-bottom: 30px;
          }
        }
      }
      .footer_btns{
        padding-top: 40px;
        .sina_btn{margin-right: 30px;}
      }
    }



  }

</style>
