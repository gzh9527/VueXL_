webpackJsonp([41],{"6j2f":function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=e("Zq1L"),a={name:"walletAuth",created:function(){var n=this;this.actionCount("pv");var t=window.location.origin+"/weibo/wallet-paysuc";this.$get(i.a.walletSign,{return_url:t}).then(function(t){0==t.code&&(n.$sinaAlert({title:"请在个人中心页查看您的互助计划凭证",onlyHasTitle:!0,callback:n.sumbitEvt,showClose:!1,confirmButtonText:"到个人中心查看",onlyBtn:!0}),0==t.data.bind_state&&t.data.url&&(window.location.href=t.data.url))})},methods:{sumbitEvt:function(){this.$router.push("/weibo/insure-plan")}}},o={render:function(){var n=this.$createElement;return(this._self._c||n)("div")},staticRenderFns:[]};var r=e("C7Lr")(a,o,!1,function(n){e("TcgS")},"data-v-291d32d3",null);t.default=r.exports},EMhD:function(n,t,e){(n.exports=e("UTlt")(!1)).push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},TcgS:function(n,t,e){var i=e("EMhD");"string"==typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals);e("FIqI")("1b4323fc",i,!0,{})}});