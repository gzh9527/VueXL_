<template>
  <div class="sina_page">
    <div class="join_intro" v-if="planCode=='XL001'">
      <transition name="fade">
        <img :src="adImg.img_url" v-if="adImg">
      </transition>

      <div class="sina_hasbg"  :class="{join_bg:channelType=='giveChannel',
                        channel_nogive:channelType=='otherChannel',
                        channel_default:channelType=='defChannel' }">
        <div class="sina_join_cont">
          <div class="sina_radius_bg">
            <img v-if="channelType=='giveChannel'" src="http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/DBWriteFormIntro_2x.png?v=1.0"  />
            <img v-if="channelType=='otherChannel'"  src="http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/DBWriteFormIntro1_2x.png?v=1.0" />
            <img v-if="channelType=='defChannel'"  src="http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/DBWriteFormIntro2_2x.png?v=1.0" />
          </div>
        </div>
      </div>
    </div>
    <img src="../pages/images/fyJoin2banner.png" v-if="planCode =='XL003'" />
    <div class="add_form">
      <div class="input_cells">
        <div class="sina_input_normal">
          <span class="label">真实姓名</span>
          <input autocomplete="off" v-model.trim="userInfo.userName" maxlength="10" type="text" class="input_css"
                 placeholder="请输入真实姓名" value=""/>
        </div>
        <div class="sina_input_normal">
          <span class="label">身份证号</span>
          <input type="text" autocomplete="off" maxlength="18" v-model.trim="userInfo.idNo" class="input_css"
                 placeholder="请输入身份证号" value=""/>
        </div>
        <div class="sina_input_normal">
          <span class="label">手机号</span>
          <input type="tel" autocomplete="off" maxlength="11" class="input_css"
                 v-model.trim="userInfo.mobile" placeholder="请输入手机号"/>
        </div>
        <div class="sina_input_normal hasarrow right" @click="workTypeShow=true" v-if="planCode=='XL003'">
          <span class="label">职业</span>
          <span class="flex1 type_name">{{workTypeList[workTypeIndex].name}}</span>
        </div>
      </div>
    </div>
    <!--    <div class="myAd">-->
    <!--      <my-ad id="weibo-insure-write-1"></my-ad>-->
    <!--    </div>-->
    <div class="sina_page_bot">
      <div class="join_desc" v-if="planCode=='XL001'" @click="isChecked=!isChecked">
        <i class="checkbox" :class="{checked:alertChecked}"></i> 加入成功后发送微博邀请更多好友共享互助
      </div>
      <div class="join_desc" >
        <i class="checkbox" @click.stop="alertChecked=!alertChecked" :class="{checked:alertChecked}"></i>
        我已阅读并同意
        <a href="javascript:;" @click="showAlert(1)" class="col_a" >《会员公约》</a>
        <a href="javascript:;" @click="showAlert(6)" class="col_a" v-if="planCode=='XL003'">《计划章程》</a>
        <a href="javascript:;" @click="showAlert(3)" class="col_a" >《授权代扣委托书》</a>
        <br/>
        <a href="javascript:;" @click="showAlert(0)" class="col_a" v-if="planCode=='XL001'">《健康告知》</a>
        <a href="javascript:;" @click="showAlert(2)" class="col_a" v-if="planCode=='XL001'">《计划章程》</a>
        <a href="javascript:;" @click="showAlert(7)" class="col_a" v-if="planCode=='XL001'">《会员隐私政策》</a>
      </div>
      <div class="bot_btns">
        <div class="bot_btn " @click="cancelJoin()">取消</div>
        <div class="bot_btn primary flex1" @click="addJoin()">0元加入</div>
      </div>
    </div>
    <clause-alert v-if="alertShow" :alertShow="alertShow" :alertIndex="alertIndex" @closeClauseAlert="alertShow=false"></clause-alert>
    <prop-helptype :title="'职业'" :show="workTypeShow"
                   @closeProp="workTypeShow=false"
                   @confirmProp="confirmProp"
                   :checkedIndex="workTypeIndex"
                   :dataList="workTypeList">

    </prop-helptype>
    <div class="toast-mask" v-if="planCode=='XL001'&&authAlertShow">
      <div class="img_bg">
        <img src="../pages/images/sinaJoinAlertImg_2x.png">
        <div class="closebtn" @click="noAuthEvent"></div>
        <button class="sina_btn primary radius auth_btn" @click="authEvent()">一键加入</button>
        <button class="noauth_btn" @click="noAuthEvent()">手动填写</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {checkPhone, isChn, isIdNumber} from "../assets/js/common";
  import Api from '../utils/apiConfig'
  import clauseAlert from '../pages/clause/clauseAlert'
  import propHelptype from'./propHelptype'
  import myAd from './sinaAd';
  export default {
    name: "join",
    props:{
      planCode:{
        type: String,
        default: 'XL001'
      }
    },
    components: {
      clauseAlert,propHelptype,myAd
    },
    data() {
      return {
        userInfo: {
          userName: '',
          idNo: '',
          mobile: '',
          helpType: '1'
        },
        alertShow:false,
        alertIndex:0,
        alertChecked:true,
        isChecked:true,
        workTypeShow: false,
        workTypeIndex: 0,
        workTypeList: [
          {name: '普通会员', desc: ''},
          {name: '医护会员', desc: ''}
        ],
        adImg:null,
        authAlertShow:false,
        channelType:null,
      }
    },
    created(){
      this.getPlanStatus();
    },
    methods:{
      getPlanStatus() {
        this.$get(Api.getMyPolicy, {}).then(ret => {
          if (ret.code === 0) {
            if (ret.data.plan_list_state&&(ret.data.plan_list_state[this.planCode] != 'not_join')) {
              this.$router.replace('/weibo/insure-plan');
            } else {
              this.loadPage();
            }
          }
        })
      },
      loadPage(){
        this.checkChannel();
        let hasChecked = this.$route.query.hasChecked;
        if(hasChecked== 1){
          //关注新浪互助
          this.$post(Api.subscribe);
        }
        if (!sessionStorage.getItem('myPlanInfo')) {
          this.getPlanList();
        }else{
          let myPlanInfo = JSON.parse(sessionStorage.getItem('myPlanInfo'));
          let item = myPlanInfo.dataList[0].insured
          this.userInfo ={
            userName: item.name,
            idNo: item.idno_init,
            mobile:item.mobile,
            helpType: '1'
          }
          this.authAlertShow = false;
        }
        this.actionCount('pv');
      },
      //渠道号判断
      checkChannel(){
        let channel = this.$route.query.channel || localStorage.getItem('channel') || 10000;
        if (this.planCode == 'XL001') {
          //广告图片是否替换
          this.$get(Api.checkRedPacketChannel,{
            channel:channel
          }).then(ret=>{
            if(ret.code==0) {
              let typeList = ret.data.type_list;
              //添加三元红包
              // 2020/7/17 非积分渠道送3元红包
              if( typeList.length > 0&&typeList.join(',').indexOf('give_score') > -1){
                this.channelType = 'giveChannel';
              }else{
                this.channelType = 'otherChannel';
                this.$post(Api.joinTicket, {
                  sign: "898c4f832a7337c11dfcd8223afcf07c"
                })
              }
              if(channel=='30012'){
                this.channelType = 'defChannel'
              }
              //根据渠道--页面广告图
              let adList = ret.data.ad_list;
              if(adList&&adList.length>0){
                adList.forEach(item=>{
                  if(item.pos =='weibo-insure-write-11'){
                    this.adImg = item;
                  }
                })
              }
            }else{
              this.channelType = 'giveChannel';
            }

          })
        }
      },
      getPlanList() {
        this.$get(Api.getPolicyList, {}).then(res => {
          if (res.code == 0) {
            if(res.data.policy_list.length>0){
              let item = res.data.policy_list[0].insured
              this.userInfo ={
                userName: item.name,
                idNo: item.idno_init,
                mobile:item.mobile,
                helpType: '1'
              }
            }else{
              this.checkSinaAuth();
            }
          } else {
            this.$toast(res.msg || "请求超时，请刷新重试");
          }
        })
      },

      // 新浪实名认证
      checkSinaAuth(){
        if (this.$route.query.msg || this.$route.query.button) {
          this.noAuthEvent();
          // 获取微博认证信息
          this.getSinaUserInfo();
        } else {
          if (sessionStorage.getItem('_authAlert')) {
            this.authAlertShow = false;
          } else {
            this.authAlertShow = false;
          }
        }
      },
      showAlert(idx){
        this.alertIndex = idx;
        this.alertShow = true;
      },
      cancelJoin(){
        if(this.planCode=='XL001'){
          this.$router.push('/weibo/insure-join');
        }else{
          this.$router.push('/weibo/feiyan-intro');
        }
      },
      addJoin(){
        if (!this.userInfo.userName) {
          this.$toast('请填写真实姓名');
          return false;
        }
        if (!isChn(this.userInfo.userName.replace(/\s/g, ""))) {
          this.$toast('只支持中文姓名');
          return false;
        }
        if (this.userInfo.userName.length < 2) {
          this.$toast('姓名不得少于两个字符');
          return false;
        }
        if (!this.userInfo.mobile) {
          this.$toast('请输入手机号');
          return false;
        }
        if (!checkPhone(this.userInfo.mobile.replace(/\s/g, ""))) {
          this.$toast('手机号格式不正确');
          return false;
        }
        if (!this.userInfo.idNo) {
          this.$toast('请输入身份证号码');
          return false;
        }
        if (!isIdNumber(this.userInfo.idNo.replace(/\s/g, ""))) {
          this.$toast('请输入正确的身份证号码');
          return false;
        }
        if (!this.alertChecked) {
          this.$toast('请勾选我已阅读并同意');
          return false;
        }
        this.userInfo.helpType = this.helpTypeIndex*1+1;
        this.actionCount('click');
        let channel = localStorage.getItem('channel') || '10000';
        if(this.planCode=='XL003'){
          channel = localStorage.getItem('channel') || '810000';
        }
        let params ={
          user_name: this.userInfo.userName.replace(/\s/g, ""),
          certi_no: this.userInfo.idNo.replace(/\s/g, ""),
          mobile: this.userInfo.mobile.replace(/\s/g, ""),
          help_type: 1,
          certi_type: "00",  //证件类型
          relation: "00", //关系
          plan_code: this.planCode,
          work_type:this.workTypeIndex*1+1,
          channel: localStorage.getItem('channel') || '810000',
          amount: 0,
        };
        if(this.planCode =='XL001'){
          delete  params.work_type;
        }
        this.$post(Api.addPolicy,params).then(ret=>{
          if (ret.code === 0) {
            if (this.isChecked) {
              localStorage.setItem('_sendNotice','join');
            }else{
              localStorage.removeItem('_sendNotice');
            }
            sessionStorage.removeItem('myPlanInfo');
            sessionStorage.removeItem('_authAlert');
            sessionStorage.removeItem('_redpackAdShow');
            if(ret.data.state == 0){
              this.bindWallet();
            }else{
              if(this.planCode=='XL001'){
                this.$router.push('/weibo/insure-paysuc');
              }else{
                this.$router.push('/weibo/feiyan-paysuc');
              }

            }
          } else {
            this.$toast(ret.msg || "请求失败，请刷新重试");
          }
        })
      },
      bindWallet() {
        this.$post(Api.bindWallet,{plan_code:this.planCode}).then(ret => {
          if (ret.code == 0) {
            if (ret.data.state && ret.data.state == 'not_bind') {
              window.location.href = ret.data.url;
              if(this.planCode=='XL001') {
                setTimeout(() => {
                  this.$router.push('/weibo/note-redpacket');
                }, 500)
              }
            } else {
              if(this.planCode=='XL001'){
                this.$router.push('/weibo/insure-paysuc');
              }else{
                this.$router.push('/weibo/feiyan-paysuc');
              }
            }
          } else {
            this.$toast(ret.msg || "请求失败，请刷新重试");
          }
        })
      },
      confirmProp(index){
        this.workTypeIndex = index;
        this.workTypeShow = false;
      },
      authEvent(){
        this.actionCount('sinaAd_click');
        let {hostname, origin} = window.location;
        let returnUrl = hostname == 'localhost' ? 'http://sinatest.bihubao.com/weibo/insure-write' : origin + this.$route.path;
        this.$get('https://saas.bihubao.com/contract/misc/getWeiboAuth',{
          redirect_url:returnUrl
        },true).then(ret=>{
          window.location.href = ret.url;
        });

      },
      noAuthEvent(){
        this.authAlertShow = false;
        sessionStorage.setItem('_authAlert','hidden')
      },
      getSinaUserInfo() {
        let uid = sessionStorage.getItem('weiboInfo') ? JSON.parse(sessionStorage.getItem('weiboInfo'))['uid'] : '';
        this.$jsonp("https://finance.sc.weibo.com/api/authority/request?Appkey=3040890735&uid=" + uid).then(ret => {
          if (ret.code == 100000) {
            let param = new FormData();
            param.append("Appkey", "3040890735");
            param.append("uid", uid);
            param.append("verify", ret.data.verify);
            this.$post("https://saas.bihubao.com/contract/misc/weiboAuthInfo", param, true,true).then(ret => {
              if(ret.code == 100000){
                let userMsg = ret.data.userinfo;
                if (userMsg.name.code == 100000) {
                  this.userInfo.userName = ret.data.userinfo.name.msg || '';
                }
                if (userMsg.idnum.code == 100000) {
                  this.userInfo.idNo = ret.data.userinfo.idnum.msg || '';
                  this.actionCount('sinaAuth_idNo');
                }
                if (userMsg.mobile.code == 100000) {
                  this.userInfo.mobile = ret.data.userinfo.mobile.msg || '';
                }
              }
            })
          }
        })

      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../pages/css/mixin";

  .sina_page {
    background: #fff;
    position: relative;
    padding-bottom: 300px;
    .join_intro{
      border-bottom: 20px solid #f9f9f9;
      .sina_hasbg {
        background-repeat: no-repeat;
        background-size: 100% auto;
        background-color: #fff;
        position: relative;
        .sina_join_cont {
          padding: 325px 0px 0px;
          .sina_radius_bg {
            margin: 0;
            min-height: 366px;
            padding:54px 40px 56px;
            box-shadow: none;
            border-radius:60px 60px 0px 0px;
            position: relative;
          }
        }
      }
    }
    .add_form{
      padding: 20px 0px  20px 30px;
      .sina_input_normal .input_css{
        padding-right: 30px;
      }
    }
    .myAd{
      padding: 28px 18px 0;
    }
    .sina_page_bot{
      width: 100%;
      position: fixed;
      left: 0;
      bottom: 0;
      background: #fff;
      .join_desc {
        margin-top: 12px;
        padding-left: 95px;
        padding-right: 50px;
        .checkbox{
          left: 54px;
        }
      }
      .bot_btns {
        width: 100%;
        margin-top: 30px;
        border-top: 1px solid #e6e6e6;
        @include fj();

        .bot_btn {
          width: 280px;
          height: 98px;
          line-height: 98px;
          font-size: 32px;
          text-align: center;
          color: #939393;
          background: #fff;

          &.primary {
            background: $primary;
            color: #fff;
          }
        }
      }
    }
    .hasarrow {
      padding-right: 78px;

      &.right::after {
        right: 36px;
      }

      .type_name {
        text-align: right;
        color: #333;
      }
    }
  }
  .toast-mask{
    .img_bg{
      width: 570px;
      @include center;
    }
    .auth_btn{
      width: 448px;
      height: 100px;
      line-height: 100px;
      border-radius:51px;
      font-size: 40px;
      border: 0;
      @include cl;
      bottom: 118px;
    }
    .noauth_btn{
      width: 100%;
      height: 100px;
      line-height: 100px;
      position: absolute;
      left: 0;
      bottom: 0;
      background: transparent;
      color: #939393;
      font-size: 28px;
      border: 0;
    }
    .closebtn{
      width: 64px;
      height: 64px;
      position: absolute;
      top: -88px;
      right: 0;
      @include page-bg-image('sinaDialogClose');
      background-size: cover;
      background-position: center 0;
    }
  }
</style>
