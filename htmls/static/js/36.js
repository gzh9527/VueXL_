webpackJsonp([36],{"Zsh+":function(e,r,t){var o=t("mwN4");"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);t("FIqI")("f9dede34",o,!0,{})},d4Dh:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var o={name:"userAuth",created:function(){this.$route.query.returnUrl&&localStorage.setItem("returnUrl",this.$route.query.returnUrl);var e=localStorage.getItem("returnUrl")||"/weibo/insure-join";if(localStorage.getItem("_userToken")||this.$route.query.access_token)this.$route.query.access_token&&localStorage.setItem("_userToken","Bearer "+this.$route.query.access_token),localStorage.removeItem("returnUrl"),this.$router.replace(e);else{var r=window.location.origin+"/weibo/userauth";window.location.href=window.location.origin+"/api/web/index.php/v1/auth-user/login?reful_url="+r}}},n={render:function(){var e=this.$createElement;return(this._self._c||e)("div",{staticClass:"sina_page"})},staticRenderFns:[]};var a=t("C7Lr")(o,n,!1,function(e){t("Zsh+")},"data-v-757de072",null);r.default=a.exports},mwN4:function(e,r,t){var o=t("L4zZ");(e.exports=t("UTlt")(!1)).push([e.i,"\n.sina_page[data-v-757de072]{background-color:#fff;background-image:url("+o(t("RlrV"))+");background-repeat:no-repeat;background-size:6.25rem 6.25rem;background-position:center;z-index:99999\n}\n",""])}});