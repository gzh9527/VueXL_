webpackJsonp([30],{"3yYf":function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=s("aA9S"),n=s.n(i),a=s("WHfE"),o=s("Zq1L"),r={name:"publicDetail",components:{myService:a.a},data:function(){return{publicId:null,contNo:null,clmNo:"",personList:[{insuredName:"徐汉",insuredSex:0,insuredAge:"24",joinDate:"2020年2月3日",cvaliDate:"2020年2月4日",amnt:"5300.00",result:"",riskCode:"XL003",riskName:"新浪新型冠状病毒互助计划",idNo:"42112219951015****",contNo:"P2031198912854109417964",unitMoney:"15",hospiDays:"300",icuunitMoney:"1",icuhospiDays:"800",accdentDesc:"\n                  <p>会员于2020年2月11日经武汉市武东医院核酸检测阳性，确诊患有新型冠状病毒。2020年2月13日入住华中科技大学附属梨园医院ICU病房，2020年2月15日转入武汉市青山方舱医院（即武汉市第九医院）普通病房继续治疗，2020年2月29日治愈出院。</p>\n                  <p>事件属实,经核定互助金额上限为5300.00元。</p>\n                  ",imgsList:["https://sinaoss.bihubao.com/publicity/feiyan/202003/1_1.jpg?x-oss-process=image/resize,w_400/watermark,size_20,text_5paw5rWq5LqS5YqpDQo=,color_FFFFFF,shadow_50,t_100,g_se,x_10,y_10","https://sinaoss.bihubao.com/publicity/feiyan/202003/1_2.jpg?x-oss-process=image/resize,w_400/watermark,size_20,text_5paw5rWq5LqS5YqpDQo=,color_FFFFFF,shadow_50,t_100,g_se,x_10,y_10","https://sinaoss.bihubao.com/publicity/feiyan/202003/1_3.jpg?x-oss-process=image/resize,w_400/watermark,size_20,text_5paw5rWq5LqS5YqpDQo=,color_FFFFFF,shadow_50,t_100,g_se,x_10,y_10","https://sinaoss.bihubao.com/publicity/feiyan/202003/1_4.jpg?x-oss-process=image/resize,w_400/watermark,size_20,text_5paw5rWq5LqS5YqpDQo=,color_FFFFFF,shadow_50,t_100,g_se,x_10,y_10"]},{insuredName:"陈祥曾",insuredSex:0,insuredAge:"51",joinDate:"2020年2月5日",cvaliDate:"2020年2月6日",amnt:"5400.00",result:"",riskCode:"XL003",riskName:"新浪新型冠状病毒互助计划",idNo:"42010719690713****",contNo:"P2053922153111112208607",unitMoney:"18",hospiDays:"300",icuunitMoney:"0",icuhospiDays:"800",accdentDesc:"\n                  <p>会员于2020年2月9日出现发热，于2月12日在隔离点被检测出核酸阳性，确诊感染新型冠状病毒。2020年2月12日入住武汉经济开发区体育中心方舱医院普通病房，2020年3月1日治愈出院。</p>\n                  <p>事件属实,经核定互助金额上限为5400.00元。</p>\n                   ",imgsList:["https://imgs.bihubao.com/Public/images/insureAdView/fenyan/202003/2_1.jpg","https://imgs.bihubao.com/Public/images/insureAdView/fenyan/202003/2_2.jpg","https://imgs.bihubao.com/Public/images/insureAdView/fenyan/202003/2_3.jpg","https://imgs.bihubao.com/Public/images/insureAdView/fenyan/202003/2_4.jpg"]}],personItem:null,publicImgs:null,imgAlert:!1,imgUrl:null}},created:function(){this.publicId=this.$route.query.publicId,this.contNo=this.$route.query.contNo,this.clmNo=this.$route.query.clmNo,this.$route.query.id?(this.personItem=this.personList[this.$route.query.id],this.publicImgs=this.personItem.imgsList):sessionStorage.getItem("_PublicUserInfo")?(this.personItem=JSON.parse(sessionStorage.getItem("_PublicUserInfo")),this.getEnterAffixs()):this.getPublicDescList()},methods:{showImage:function(e){this.imgAlert=!0,this.imgUrl=e.url?e.url:e},getPublicDescList:function(){var e=this;this.$get(o.a.getPublicDescList,{public_id:this.publicId},!0).then(function(t){if(0==t.code){var s=e.$route.query.planCode;t.data.data_list[s].forEach(function(t){if(e.contNo&&t.contNo==e.contNo||e.clmNo&&t.clmNo==e.clmNo){var s=t;if("XL003"==t.riskCode){var i={unitMoney:300,hospiDays:0,icuunitMoney:800,icuhospiDays:0};s.dutyDetailDto.forEach(function(e){204==e.getDutyKind?(i.unitMoney=e.unitMoney||0,i.hospiDays=e.hospiDays||0):205==e.getDutyKind&&(i.icuunitMoney=e.unitMoney||0,i.icuhospiDays=e.hospiDays||0)}),s=n()({},s,i)}e.personItem=s,e.getEnterAffixs()}})}})},getEnterAffixs:function(){var e=this;this.$post(o.a.getEnterAffixs,{rgtNo:this.personItem.clmNo,pubFlagDto:"0"},!0).then(function(t){if(t&&t.length>0){var s=[];t.forEach(function(e){var t={url:"https://tpa.bihubao.com/api/common/img/"+e.imgId+"."+e.fileType};s.push(t)}),e.publicImgs=s}})}},destroyed:function(){sessionStorage.removeItem("_PublicUserInfo")}},p={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return e.personItem?i("div",{staticClass:"sina_page"},[i("div",{staticClass:"head-title"},["XL001"==e.personItem.riskCode?i("span",[e._v("大病互助计划")]):e._e(),e._v(" "),"XL002"==e.personItem.riskCode?i("span",[e._v("意外医疗计划")]):e._e(),e._v(" "),"XL003"==e.personItem.riskCode?i("span",[e._v("新冠互助计划")]):e._e(),e._v(" "),"XL004"==e.personItem.riskCode?i("span",[e._v("意外伤害计划")]):e._e(),e._v(" "),"XL005"==e.personItem.riskCode?i("span",[e._v("老年防癌计划")]):e._e()]),e._v(" "),i("div",{staticClass:"head-wrap"},[i("img",{attrs:{src:s("e2za")}}),e._v(" "),i("div",{staticClass:"public-number"},[e._v(e._s(e.personItem.insuredName)),i("span",[e._v(e._s(e.personItem.insuredAge)+"岁")]),i("span",[e._v(e._s(0==e.personItem.insuredSex?"男":"女"))])]),e._v(" "),i("div",{staticClass:"public-date"},["XL003"==e.personItem.riskCode?i("span",[e._v(e._s(e.personItem.joinDate)+"加入")]):e._e(),e._v("\n      "+e._s(e.personItem.riskName)+"\n    ")])]),e._v(" "),i("div",{staticClass:"sina_cont"},[i("div",{staticClass:"comm_title"},[e._v("申请互助金"+e._s(e.personItem.amnt)+"元")]),e._v(" "),"XL003"==e.personItem.riskCode?i("div",{staticClass:"plan_name"},[e._v("新冠肺炎住院津贴")]):e._e(),e._v(" "),i("div",{staticClass:"comm_title"},[e._v("审核结果")]),e._v(" "),i("div",{staticClass:"detail_con1"},[i("p",[e._v("会员"+e._s(e.personItem.name)+"本次"),"XL003"==e.personItem.riskCode?i("span",[e._v("肺炎互助")]):e._e(),"XL002"==e.personItem.riskCode?i("span",[e._v("意外医疗")]):e._e(),"XL001"==e.personItem.riskCode?i("span",[e._v("大病互助")]):e._e(),e._v("申请符合互助条件，经审核给付互助金"+e._s(e.personItem.amnt)+"元")])])]),e._v(" "),i("div",{staticClass:"sina_cont"},[i("div",{staticClass:"comm_title"},[e._v("案件详情")]),e._v(" "),i("div",{staticClass:"detail_con2"},[i("p",[e._v("会员姓名："+e._s(e.personItem.insuredName))]),e._v(" "),i("p",[e._v("性别："+e._s(0==e.personItem.insuredSex?"男":"女"))]),e._v(" "),i("p",[e._v("身份证号："+e._s(e.personItem.idNo))]),e._v(" "),"XL003"==e.personItem.riskCode?i("p",[e._v("凭证号："+e._s(e.personItem.contNo))]):e._e(),e._v(" "),i("p",[e._v("加入互助计划名称："+e._s(e.personItem.riskName))]),e._v(" "),"XL003"==e.personItem.riskCode?i("p",[e._v("加入计划日期："+e._s(e.personItem.joinDate))]):e._e(),e._v(" "),"XL003"==e.personItem.riskCode?i("p",[e._v("计划生效时间："+e._s(e.personItem.cvaliDate))]):e._e(),e._v(" "),i("p",{domProps:{innerHTML:e._s(e.personItem.accdentDesc)}}),e._v(" "),"XL003"==e.personItem.riskCode?i("table",{staticStyle:{"text-align":"center"},attrs:{border:"0"}},[i("tbody",[e._m(0),e._v(" "),i("tr",[i("td",[e._v(e._s(e.personItem.icuhospiDays)+"天")]),e._v(" "),i("td",[e._v(e._s(e.personItem.hospiDays)+"天")])]),e._v(" "),i("tr",[i("td",{attrs:{colspan:"2"}},[e._v(" 互助金额："),e.personItem.icuhospiDays>0?i("span",[e._v(e._s(e.personItem.icuunitMoney)+"元×"+e._s(e.personItem.icuhospiDays)+"天+")]):e._e(),e._v("\n            "+e._s(e.personItem.unitMoney)+"元×"+e._s(e.personItem.hospiDays)+"天 = "+e._s(e.personItem.amnt)+"元\n          ")])])])]):e._e()])]),e._v(" "),e._e(),e._v(" "),i("div",{staticClass:"sina_cont"},[i("div",{staticClass:"comm_title"},[e._v("核实过程")]),e._v(" "),"XL003"==e.personItem.riskCode?i("div",[e._v("\n      经过对成员本人随访跟进、电话了解医院和医生、检核成员肺炎就医的相关资料，确认符合加入条件及互助条件。\n    ")]):i("div",[e._v("\n      经过向成员本人了解情况、当地侧访了解情况、医院等排查，确认符合加入条件及互助条件。\n    ")])]),e._v(" "),i("div",{staticClass:"sina_cont"},[i("div",{staticClass:"comm_title"},[e._v("公示材料")]),e._v(" "),i("div",{staticClass:"publicity-img"},[e._l(e.publicImgs,function(t,s){return[i("img",{key:s,attrs:{src:t.url?t.url+"_thumb":t,alt:""},on:{click:function(s){return e.showImage(t)}}})]})],2)]),e._v(" "),e.imgAlert?i("div",{staticClass:"toast-mask",on:{click:function(t){e.imgAlert=!e.imgAlert}}},[i("div",{staticClass:"toast-img"},[i("img",{attrs:{src:e.imgUrl}})])]):e._e(),e._v(" "),i("my-service",{attrs:{hasMoreBtn:"true"}})],1):e._e()},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("tr",[t("td",[this._v("ICU病房住院天数（入住满24小时）")]),this._v(" "),t("td",[this._v("普通病房住院天数（入住满24小时）")])])}]};var m=s("C7Lr")(r,p,!1,function(e){s("OT2s"),s("vZ/e")},"data-v-79247666",null);t.default=m.exports},OT2s:function(e,t,s){var i=s("fY9c");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);s("FIqI")("48d5a9fb",i,!0,{})},fY9c:function(e,t,s){(e.exports=s("UTlt")(!1)).push([e.i,"\ntable {\n  width: 100%;\n  margin-top: 0.3125rem;\n  border-right: 0.03125rem solid #e6e6e6;\n  border-bottom: 0.03125rem solid #e6e6e6;\n}\ntable th, table td {\n  padding: 0.3125rem 0.1875rem;\n  border-left: 0.03125rem solid #e6e6e6;\n  border-top: 0.03125rem solid #e6e6e6;\n  text-align: center;\n}\n.detail_con2 p {\n  padding: 0.125rem 0;\n  line-height: 1.6;\n}\n\n",""])},"vZ/e":function(e,t,s){var i=s("xXF4");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);s("FIqI")("b2e0e060",i,!0,{})},xXF4:function(e,t,s){(e.exports=s("UTlt")(!1)).push([e.i,"\n.sina_page .head-title[data-v-79247666]{font-size:1.125rem;height:3.125rem;line-height:3.125rem;padding-left:0.9375rem;background:#fff\n}\n.sina_page .head-wrap[data-v-79247666]{position:relative;color:#fff\n}\n.sina_page .head-wrap .public-number[data-v-79247666]{position:absolute;left:1.125rem;top:1.25rem;font-size:1.1875rem;line-height:1.6875rem\n}\n.sina_page .head-wrap .public-number span[data-v-79247666]{padding-left:0.75rem;font-size:0.75rem\n}\n.sina_page .head-wrap .public-date[data-v-79247666]{position:absolute;left:0.9375rem;top:3.25rem\n}\n.sina_page .sina_cont[data-v-79247666]{background:#fff;margin-bottom:0.625rem;padding-bottom:1.25rem\n}\n.sina_page .sina_cont .comm_title[data-v-79247666]{font-size:1rem;font-weight:bold;padding:0.9375rem 0 0.625rem\n}\n.sina_page .sina_cont .plan_name[data-v-79247666]{font-size:1rem;color:#ff8200;font-weight:bold;padding-bottom:0.625rem\n}\n.sina_page .sina_cont .detail_con1[data-v-79247666]{padding:0.9375rem 0.625rem 0.9375rem 0.9375rem;background:#F9F9FC;border-radius:0.625rem\n}\n.sina_page .sina_cont .detail_con2[data-v-79247666]{padding:0 0.9375rem\n}\n.sina_page .sina_cont .detail_con2 p[data-v-79247666]{padding:0.125rem 0;line-height:1.6\n}\n.sina_page .sina_cont .publicity-img[data-v-79247666]{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;margin-top:0.3125rem\n}\n.sina_page .sina_cont .publicity-img img[data-v-79247666]{width:4.625rem;height:4.625rem;margin-right:0.8125rem;margin-bottom:0.8125rem\n}\n.sina_page .sina_cont .publicity-img img[data-v-79247666]:nth-child(4n){margin-right:0\n}\n.sina_page .toast-img[data-v-79247666]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;height:100%\n}\n",""])}});