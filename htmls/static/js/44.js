webpackJsonp([44],{E47V:function(t,e,n){(t.exports=n("UTlt")(!1)).push([t.i,"\n.bg_box[data-v-89458008]{width:100%;height:auto;background-size:cover;padding-bottom:4.6875rem;background-position:start;position:relative\n}\n.wrapper[data-v-89458008]{width:100%;height:100%;position:relative;overflow:hidden\n}\n",""])},qKW8:function(t,e,n){var o=n("E47V");"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);n("FIqI")("5aab6d17",o,!0,{})},wWPu:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n("Zq1L"),a={name:"blankPage",data:function(){return{}},created:function(){},mounted:function(){var t=this;this.$get(o.a.payJoin,{}).then(function(e){console.log(e),console.log(e.code),0==e.code&&1==e.data.state?t.$router.push("/weibo/insure-paysuc"):t.$router.push("/weibo/join_planerror")})},methods:{}},i={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"bg_box"},[e("div",{staticClass:"wrapper"})])}]};var r=n("C7Lr")(a,i,!1,function(t){n("qKW8")},"data-v-89458008",null);e.default=r.exports}});