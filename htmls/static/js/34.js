webpackJsonp([34],{"8lF0":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("3cXf"),o=n.n(a),i=n("Zq1L"),s={name:"apiTest",created:function(){if("weibo"==navigator.userAgent.toLowerCase().match(/WeiBo/i)){var e=document.createElement("script");e.type="text/javascript";var t=this;e.readyState?e.onreadystatechange=function(){"loaded"!=e.readyState&&"complete"!=e.readyState||(e.onreadystatechange=null,t.pageLoad())}:e.onload=function(){t.pageLoad()},e.src="https://tjs.sjs.sinajs.cn/open/thirdpart/js/jsapi/mobile.js",document.body.appendChild(e)}},methods:{pageLoad:function(){var e=this;this.$post(i.a.getWbjsInfo,{mark:"sina_help",url:window.location.origin+"/weibo/api-test"}).then(function(t){if(0==t.code){var n=t.data,a=n.appkey,i=n.noncestr,s=n.signature,r=n.timestamp;window.WeiboJS.init({appkey:a,debug:!1,timestamp:r,noncestr:i,signature:s,scope:["getNetworkType","networkTypeChanged","getBrowserInfo","checkAvailability","setBrowserTitle","openMenu","setMenuItems","menuItemSelected","setSharingContent","openImage","scanQRCode","pickImage","getLocation","pickContact","apiFromTheFuture"]},function(t){alert("init done\n"+o()(t)),200==t.code&&e.shareEvt()})}else alert("jiekouerr")})},shareEvt:function(){WeiboJS.invoke("checkAvailability",{api_list:["openImage","getNetworkType","scanQRCode","pickImage","getLocation","queryPreloadCache","deletePreloadCache","setBrowserTitle","getBrowserInfo","openMenu","setMenuItems","loginWeiboAccount","setSharingContent","checkAvailability","networkTypeChanged","menuItemSelected"]},function(e){alert("API可用性结果：\n"+o()(e))}),WeiboJS.invoke("setMenuItems",{menus:["shareToWeibo","follow","shareToMessage","shareToWeixin","shareToPYQ","shareToQQ","shareToQzone","openInBrowser","copyURL"],content:"测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据",icon:"https://imgs.bihubao.com/Public/images/insureAdView/images/logo.png",title:"新浪互助"},function(e){alert("setMenuItems 返回数据："+o()(e))})}}},r={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"sina_page"},[t("div",{staticClass:"sina_hasbg"})])}]};var c=n("C7Lr")(s,r,!1,function(e){n("pU3x")},"data-v-88044838",null);t.default=c.exports},fIjS:function(e,t,n){(e.exports=n("UTlt")(!1)).push([e.i,'\n.sina_page[data-v-88044838]{background-color:#fff\n}\n.sina_page .sina_hasbg[data-v-88044838]{background:url("http://bihu-oss.oss-cn-beijing.aliyuncs.com/images/sina_weibo/noteActivebg.png") no-repeat #fff center;background-size:100% auto;min-height:37.6875rem\n}\n',""])},pU3x:function(e,t,n){var a=n("fIjS");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);n("FIqI")("0c8bceb4",a,!0,{})}});