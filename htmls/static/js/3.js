webpackJsonp([3],{"oZx/":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("Zq1L"),i={name:"noteRedpack",data:function(){return{planCode:null,userName:null,weiboInfo:null,joinState:null,isHasredpack:!1,planState:!1,timeHH:23,timeMM:59,timeSS:59,imgurl:"http://bihu-sina-project.oss-cn-beijing.aliyuncs.com/imgs/noteActiveRedpacketAlert.png",timeInterval:null,channelFlag:"",channel:localStorage.getItem("channel"),sex:1}},created:function(){var e=this;localStorage.removeItem("_AgainActive"),localStorage.removeItem("_ActiveChannel"),this.planCode=this.$route.query.planCode?this.$route.query.planCode:"XL001",this.pageLoad(),this.getPlanState(this.planCode);var t=localStorage.getItem("channel");JSON.parse(sessionStorage.getItem("myPlanInfo")).dataList[0].insured.sex>0?this.sex=2:this.sex=1;"55001"==t?(this.channelFlag=3,this.imgurl="http://bihu-sina-project.oss-cn-beijing.aliyuncs.com/imgs/jqToast.png"):this.$get(n.a.checkRedPacketChannel,{channel:t,isNotshowLoad:"noshow"}).then(function(t){if(0==t.code){var a=t.data.type_list;a.length>0&&a.indexOf("give_score")>-1?(e.channelFlag=2,e.imgurl="http://bihu-sina-project.oss-cn-beijing.aliyuncs.com/imgs/jftext.png"):(e.channelFlag=1,e.imgurl="http://bihu-sina-project.oss-cn-beijing.aliyuncs.com/imgs/noteActiveRedpacketAlert.png")}})},mounted:function(){},methods:{pageLoad:function(){this.planCode=this.$route.query.planCode?this.$route.query.planCode:"XL001",this.isHasredpack=!!localStorage.getItem("_isHasredpack"),this.actionCount("pv"),this.getWeiboInfo();var e=sessionStorage.getItem("myPlanInfo")?JSON.parse(sessionStorage.getItem("myPlanInfo")):null;e?e.dataList.length>0&&(this.userName=e.dataList[0].insured.name):this.getPlanList(),this.startInterval()},getPlanList:function(){var e=this;this.$get(n.a.getPolicyList,{}).then(function(t){if(0==t.code){var a=t.data.policy_list;a.length>0&&(e.userName=a[0].insured.name)}})},createRedpacket:function(){var e=this;this.isHasredpack||this.$post(n.a.createTicket,{sign:"3f0ce9fbe24931fb6bbdddae907263a7"}).then(function(t){e.isHasredpack=!0,localStorage.setItem("_isHasredpack","263a7"),0==t.code?"not_bind"==t.data.state?window.location.href=t.data.url:"has_activated"==t.data.state&&("XL003"==e.planCode?e.$router.replace("/weibo/feiyan-paysuc?insuchannel="+e.$route.query.insuchannel):e.$router.push("/weibo/insure-paysuc")):e.$toast("已领取")})},payActive:function(){var e=this;this.actionCount("bind_click",function(){1==e.sex&&e.$post(n.a.joinTicket,{sign:"898c4f832a7337c11dfcd8223afcf07c"}),e.bindWallet()})},bindWallet:function(){var e=this;"/weibo/insure-active"==this.$route.path?localStorage.setItem("_ActiveChannel","10029"):localStorage.setItem("_AgainActive","10029"),this.$post(n.a.bindWallet,{plan_code:this.planCode,insuchannel:this.$route.query.insuchannel}).then(function(t){0==t.code?(console.log(t.data.state),"not_pay"==t.data.state?(console.log(t.data.url),window.location.href=t.data.url):"not_bind"==t.data.state?window.location.href=t.data.url:"has_activated"==t.data.state&&"XL003"==e.planCode&&e.$router.replace("/weibo/feiyan-paysuc?insuchannel="+e.$route.query.insuchannel)):e.$toast(t.msg||"请求失败，请刷新重试")})},startInterval:function(){var e=this;this.closeInterval(),this.timeInterval=setInterval(function(){--e.timeSS,e.timeSS<0&&(--e.timeMM,e.timeSS=59),e.timeMM<0&&(--e.timeHH,e.timeMM=59),e.timeHH<0&&(e.timeSS=0,e.timeMM=0)},1e3)},closeInterval:function(){clearInterval(this.timeInterval),this.timeInterval=null},getTimeValue:function(e){return e>9?e:"0"+e}},beforeRouteLeave:function(e,t,a){var n=this;this.planState?a():"/weibo/insure-paysuc"!=e.path&&"/weibo/feiyan-paysuc"!=e.path&&"/weibo/pay-blank"!=e.path?this.$sinaConfirm({title:"风险提示",onlyHasTitle:!1,desc:'<p><img src="'+this.imgurl+'"></p>',showClose:!1,confirmButtonText:"放弃红包，退出",cancelButtonText:"继续开通",size:"medium"}).then(function(){n.closeInterval(),n.actionCount("cancal_click",function(){a()})}).catch(function(){n.closeInterval(),n.actionCount("sumbit_click",function(){a(!1),n.bindWallet()})}):a()}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{ref:"htmlMain",staticClass:"sina_page",staticStyle:{height:"100%"}},[a("div",{staticClass:"user_info"},[e.weiboInfo?a("img",{staticClass:"user_img",attrs:{src:e.weiboInfo.profile_image_url||"https://imgs.bihubao.com/Public/images/insureAdView/images/logo.png"}}):e._e(),e._v(" "),a("div",{staticClass:"user_name"},[a("span",[e._v(e._s(e.userName))]),e._v(" "),a("span",[e._v("开通新浪免密支付")]),e._v(" "),a("span",[e._v("权益立即激活")])])]),e._v(" "),a("div",{staticClass:"sina_bot",on:{click:function(t){return e.payActive()}}},[1==e.channelFlag&&1==e.sex?a("img",{staticStyle:{"margin-top":"70px"},attrs:{src:"http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/hb1yuan.png"}}):a("img",{staticStyle:{"margin-top":"70px"},attrs:{src:"http://sinahuzhu.oss-cn-beijing.aliyuncs.com/images/sina_publicity_temp/hbsex1.png"}}),e._v(" "),a("img",{directives:[{name:"show",rawName:"v-show",value:2==e.channelFlag,expression:"channelFlag == 2"}],staticStyle:{"margin-top":"70px"},attrs:{src:"http://sinahuzhu.oss-cn-beijing.aliyuncs.com/images/sina_publicity_temp/jf.png"}}),e._v(" "),a("img",{directives:[{name:"show",rawName:"v-show",value:3==e.channelFlag,expression:"channelFlag == 3"}],staticStyle:{"margin-top":"70px"},attrs:{src:"http://bihu-sina-project.oss-cn-beijing.aliyuncs.com/imgs/JQbtn.png"}}),e._v(" "),a("div",{staticClass:"sina_btn_bind"}),e._v(" "),a("div",{staticClass:"daojishi",staticStyle:{"margin-top":"20px"}},[e._v("\n      剩余时间 "+e._s(e.getTimeValue(e.timeHH))+"："+e._s(e.getTimeValue(e.timeMM))+"："+e._s(e.getTimeValue(e.timeSS))+"\n    ")])])])},staticRenderFns:[]};var o=a("C7Lr")(i,s,!1,function(e){a("tQ3I")},"data-v-3f17e636",null);t.default=o.exports},tQ3I:function(e,t,a){var n=a("ztUy");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a("FIqI")("5fc6e790",n,!0,{})},ztUy:function(e,t,a){(e.exports=a("UTlt")(!1)).push([e.i,'\n.sina_page[data-v-3f17e636]{background:url("http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/noteActiveRedpacketBg.png?v=1") #ce1f1f no-repeat;background-size:100% auto;min-height:37.6875rem;height:100%\n}\n.sina_page .user_info[data-v-3f17e636]{padding:8.8125rem 0 0;text-align:center;line-height:1.8125rem\n}\n.sina_page .user_info .user_img[data-v-3f17e636]{width:2.4375rem;height:2.4375rem;border-radius:50%;overflow:hidden;margin:0 auto\n}\n.sina_page .user_info .user_name[data-v-3f17e636]{padding-top:0.625rem;font-size:0.6875rem\n}\n.sina_page .user_info .user_name span[data-v-3f17e636]{margin-left:0.625rem\n}\n.sina_page .user_info .user_name span[data-v-3f17e636]:first-child{margin-left:0\n}\n.sina_page .sina_bot[data-v-3f17e636]{width:100%;position:absolute;top:26.1875rem;left:0;padding:0.625rem 1.1875rem 0 1.1875rem\n}\n.sina_page .sina_bot .sina_btn_bind[data-v-3f17e636]{position:absolute;left:0;bottom:2.375rem;width:100%;height:3.625rem\n}\n.sina_page .sina_bot .daojishi[data-v-3f17e636]{padding:0 0 0 0;text-align:center;line-height:1.0625rem;color:#fff\n}\n',""])}});