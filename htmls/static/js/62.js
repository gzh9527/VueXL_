webpackJsonp([62],{"09nm":function(t,i,n){var e=n("W7Rb");"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);n("FIqI")("0638d69b",e,!0,{})},W7Rb:function(t,i,n){(t.exports=n("UTlt")(!1)).push([t.i,'\n.sina_page[data-v-0192bdf0]{background-color:#fff\n}\n.sina_page .sina_hasbg[data-v-0192bdf0]{background:url("http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/noteActivePagebg.png?v=1") no-repeat;background-size:100% auto;min-height:37.6875rem\n}\n.sina_page .sina_hasbg .user_img[data-v-0192bdf0]{position:absolute;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);top:3.4375rem;width:3.75rem;height:3.75rem;border-radius:50%;background:#d8d8d8;border:0.125rem solid #fff\n}\n.sina_page .sina_hasbg .btn[data-v-0192bdf0]{width:13.4375rem;height:2.8125rem;position:absolute;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);top:31.75rem\n}\n',""])},mJlH:function(t,i,n){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var e={render:function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"sina_page"},[i("div",{staticClass:"sina_hasbg"},[this.weiboInfo?i("img",{staticClass:"user_img",attrs:{src:this.weiboInfo.profile_image_url||"https://imgs.bihubao.com/Public/images/insureAdView/images/logo.png"}}):this._e(),this._v(" "),i("div",{staticClass:"btn",on:{click:this.btnClick}})])])},staticRenderFns:[]};var a=n("C7Lr")({name:"noteActive",data:function(){return{weiboInfo:null}},created:function(){this.actionCount("pv"),this.getWeiboInfo()},methods:{btnClick:function(){var t=this;this.actionCount("clcik",function(){t.getPlanState("XL001","join")})},pageLoad:function(){this.$router.push("/weibo/insure-write")}}},e,!1,function(t){n("09nm")},"data-v-0192bdf0",null);i.default=a.exports}});