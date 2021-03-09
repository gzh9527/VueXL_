 <template>
  <div class="sina_page">
      <div class="notice_wrap">
      <scroller :on-refresh="refresh" :on-infinite="infinite" ref="myscroller">
           <!-- <ul class="noticeUl"  @click.stop="handleHtml($event)" id='parent'> -->
             <!-- <li v-html="to_do" >{{to_do}}</li> -->
              <!-- <top-notice :html="to_do"></top-notice> -->
             <!-- <top-content v-html='to_do'>{{to_do}}</top-content> -->
           <!-- </ul> -->
           <ul v-for='(item,index) in noticeList' class="noticeUl">
              <!-- <li @click.stop="addPlanAlert(planInfo.insured)" v-html="item.content" >{{item.content}}</li> -->
              <topNotice :html="item.content"></topNotice>
               <!-- <top-content  @click.stop="addPlanAlert(planInfo.insured)" v-html="item.content" >{{item.content}}</top-content> -->
            </ul>
        </scroller>

      </div>

<!--  22222222222-->
<oneBtnJoin v-if="addPerson" :addAlertShow="addAlertShow" :addPerson="addPerson"
@cancalAdd="cancalAdd" @showClauseAlert="showClauseAlert" @addPlanSuc="addPlanSuc"></oneBtnJoin>
  <clause-alert v-if='alertClauseShow'  :alertShow="alertClauseShow" :alertIndex="alertIndex" @closeClauseAlert="alertClauseShow=false"></clause-alert>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Api from "../utils/apiConfig"
  import oneBtnJoin from '../components/oneBtnJoin'
  import clauseAlert from './clause/clauseAlert'
      // var MyComponent = Vue.extend({
      //     template: '<a @click="show(1)">我是大魔王</a>',
      //     mounted(){
      //       console.log()
      //     },
      //
      //       methods: {
      //         show(i) {
      //             console.log(i);
      //         },
      //     }
      // });
      // var component = new MyComponent().$mount();
  export default {
    components: {
      oneBtnJoin,clauseAlert
      ,
      'topNotice':{//用来解析html片段
       props:{
         html:String
       },
       render(h){
         const com=Vue.extend({
           template:`<li>${this.html}</li>`,
           methods:{
             toOpenning(acthref){
               console.log(1)
               console.log(acthref+111)
               // this.$router.push({
               //   path: acthref
               // })
               window.open(acthref,'_self')
             }
           }
         });
         return h(com,{});
       }
     }
      // ,
      // 'top-content':{
      //   props:{
      //     html:String
      //   },
      //   render(h){
      //     const com = Vue.extend({
      //       template:`<li>${this.html}</li>`,
      //       methods:{
      //         toOpenning(acthref){
      //           console.log(acthref+111)
      //           this.$router.push({
      //             path: acthref
      //           })
      //         }
      //       }
      //     });
      //     return h(com,{});
      //   }
      // }
    },
    name: "noticeList",
    data(){
      return{
        id:null,
        tabName: 'XL002',
        redFlag:true,
        // page:1,
         noDate:false,//判断是否加载
         pageIndex:1, // 页码
         start_id:0, //第一条的id
         // pageSize:10,
         per_count:20, //每页多少条
         noticeList:[],
        flag:0 ,//第一个消息有按钮
        imgSrc: null,
        planInfo: null,
        addAlertShow:false,
        addPerson:null,
        alertIndex:null,
        alertClauseShow:false,
        to_do:null

      }
    },
    computed: {

    },
    created(){
    },
    mounted() {
      this.actionCount("notice_page");
        console.log(this)
       this.getPublicList();
       // document.getElementById('parent').appendChild(component.$el);



   console.log(sessionStorage.getItem('myPlanInfo')+123)
       if (!sessionStorage.getItem('myPlanInfo')) {
         console.log(123)
         this.getPlanList();
       }else{
         let myPlanInfo = JSON.parse(sessionStorage.getItem('myPlanInfo'));
         console.log(myPlanInfo)
         myPlanInfo.dataList.forEach(item=>{
           item.plans.forEach(plan=>{
             // if(plan.son_policy_no == this.id){
               let itemPolicy = {}
               itemPolicy['insured'] = item.insured;
               itemPolicy['plan'] = plan;
               this.planInfo = itemPolicy;
               return;
             // }
           })
         });
         if(!this.planInfo){
           this.$router.replace(`/weibo/insure-plan`);
         }
       }
    },

    created(){

    },
    methods: {
      handleHtml($event){
// 　　　　  console.log($event.target)
//          console.log(this.to_do)
//          let idx1 = this.to_do.indexOf('(')
//          console.log(idx1)
//          let idx2 = this.to_do.indexOf(')')
//          console.log(idx2)
//          let link = this.to_do.substring(idx1+1,idx2)
//          console.log(link)
//           this.toOpenning(link)
        },
handleHtml2($event){
　　　　console.log($event.target)
　　},
      toOpenning(acthref){
        console.log(1)
        console.log(acthref+111)
        this.$router.push({
          path: acthref
        })
      },
      cancalAdd(){
        this.addAlertShow = false;
        this.addPerson = null;
      },
      addPlanSuc(){
        this.getPlanList();
        this.cancalAdd();
      },
      showClauseAlert(idx){
        this.alertClauseShow = true;
        this.alertIndex =idx;
      },
      addPlanAlert(item){
        this.actionCount('addPlan_click2', () => {
          if (item.notHaveCode == 'XL001') {
            this.$router.push('/weibo/insure-illIntro');
          } else {
            this.addAlertShow = true;
            this.addPerson = item;
          }
        });
      },
      getPlanList() {
        console.log(111)
        this.$get(Api.getMyPolicy, {}).then(ret => {
          if (ret.code == 0) {
            console.log(ret)
            this.$get(Api.getPolicyList, {}).then(res => {
              if (res.code == 0) {
                console.log(ret)
                let dataList =  res.data.policy_list.map(item=>{
                  let notHaveCode = '';
                  let plancode =[];
                  item.plans.map(plan=>{
                    plancode.push(plan.plan_code)
                  })
                  if (plancode.length>0&&plancode.indexOf('XL003') ==-1) {
                    notHaveCode = 'XL003'
                  }
                  if (plancode.length>0&&plancode.indexOf('XL001') ==-1) {
                    let age = this.getIdCardAge(item.insured.idno_init);
                    if (age < 60) {
                      notHaveCode = 'XL001'
                    }
                  }

                  item.insured['notHaveCode'] = notHaveCode;
                  return item;
                });
                let myPlanInfo = {
                  fromUrl: 'plan',
                  validCount: res.data.policy_list.length,
                  dataList: dataList,
                  planStatus : ret.data.plan_list_state['XL001'] == 'activated'  || ret.data.plan_list_state['XL002'] == 'activated'? 1 : 0,
                  planStatusFY : ret.data.plan_list_state['XL003'] == 'activated' ? 1 : 0,
                  totalMoney: ret.data.total_amnt
                }
                sessionStorage.setItem('myPlanInfo',JSON.stringify(myPlanInfo));
                myPlanInfo.dataList.forEach(item=>{
                  item.plans.forEach(plan=>{
                    if(plan['son_policy_no'] == this.id){
                      let itemPolicy = {}
                      itemPolicy['insured'] = item.insured;
                      itemPolicy['plan'] = plan;
                      this.planInfo = itemPolicy;
                      return;
                    }
                  })
                })
                if(!this.planInfo){
                  this.$router.replace(`/weibo/insure-plan`);
                }
              } else {
                this.$toast(res.msg || "请求超时，请刷新重试");
              }
            })
          } else {
            this.$toast(ret.msg || "请求超时，请刷新重试");
          }
        })

      },
      // getPublicList(){
      //   this.$get(Api.getNoticeList,{
      //     start_id:0,
      //     per_count:5
      //   },true).then((res)=>{
      //     if(res.code == 0){
      //        console.log(res)
      //       this.noticeList=res.data.msg_list
      //
      //
      //     }
      //   })
      // },
      // 下拉刷新
       　　refresh(){
        　　let _this=this;
        　　_this.pageIndex=1;      //重置页数刷新每次页数都是第一页
             _this.start_id=0;
         　　_this.noDate=false;          //重置数据判断
        　　_this.getPublicList();
     　　},
         // 上拉加载
         infinite(done){
               console.log('shanglajiazai')
               console.log(this.start_id)
          　　let _this=this;
             setTimeout(() => {
                 if(_this.noDate){
                     _this.$refs.myscroller.finishInfinite(true);//finishInfinite函数为scroller实例的方法，当参数为false时，上拉获取数据可以重新调用。当参数为true，上拉获取数据回调函数停止使用,下拉下部不再显示loading，会显示‘’暂无更多数据
                 }else{
                     _this.pageIndex++;
                     _this.start_id= _this.noticeList[_this.noticeList.length-1]['id']
                     if(_this.noticeList){
                       console.log(_this.noticeList[_this.noticeList.length-1].id)
                     }

                     if(_this.noticeList){
                       _this.start_id == _this.noticeList[_this.noticeList.length-1]['id']
                       console.log(_this.start_id)
                     }


                     _this.getPublicList(done);

                 }
             }, 1000);
         },
         //获取重要通知列表
         getPublicList(done){
           console.log('获取分页消息列表数据')
             let _this=this;
    _this.$get(Api.getNoticeList,{
      start_id:_this.start_id,
      per_count:_this.per_count
    }).then((response)=>{
      //停止下拉刷新
   _this.$refs.myscroller.finishPullToRefresh();
      if(response.code == 0){
         console.log(response)
  　　　　　　　if(typeof (done)=="function"){
    　　　　　　　　　　　　　done();
    　　　　　　　　　　　 }

                     if(response.data.msg_list.length==0){ // 没有下一页
                       console.log("没有数据了~~~~~~~~~~~~~~~~~~~")
                        _this.noDate=true;
                       // return;
                     }else{
                         _this.noDate=false;
                     }
                     // 判断是下拉刷新还是上拉加载
                     if(_this.start_id==0){
                       console.log('diyiye')
                        _this.noticeList=response.data.msg_list
                     }else{
                       console.log('dinye')
                         _this.noticeList=_this.noticeList.concat(response.data.msg_list);
                         if(response.data.msg_list.length>0){
                           _this.start_id = response.data.msg_list[response.data.msg_list.length-1]['id']
                         }

                     }

                 }else{
                       this.$toast(response.msg || "请求超时，请刷新重试");
                     return;
                 }
             });
         　}
    }

  }
</script>
<style lang="scss">
  .noticeUl{
    padding: 30px;
    li{
        width: 690px;
        height: auto;
        padding: 40px;
        padding-bottom: 50px;
        background: #FFFFFF;
        border-radius: 20px;
        margin-bottom: 30px;
        .notice_wrap{
          h2{
            font-size: 32px;
            font-weight: 500;
            color: #333333;
            line-height: 45px;
            border-bottom: 2px solid #E6E6E6;
            margin-bottom: 30px;
            padding-bottom: 25px;
            span{
            font-size: 24px;
            font-weight: 400;
            color: #939393;
            float: right;
            }
          }
          h3{
            font-size: 28px;
            font-weight: 500;
            color: #FF8200;
            line-height: 38px;
            margin-bottom: 24px;
          }
          p{
          font-size: 26px;
          font-weight: 400;
          color: #333333;
          line-height: 38px;
          }
          div.grey{
            p{
            font-size: 24px;
            font-weight: 400;
            color: #939393;
            line-height: 33px;
            margin-bottom: 10px;
            }
            p:last-child{
              margin-bottom: 0;
            }
          }
          h5{
          font-size: 42px;
          font-weight: 500;
          color: #333333;
          line-height: 59px;
          margin-bottom: 20px;
          }
          button{
            width: 520px;
            height: 78px;
            background: linear-gradient(270deg, #FF4469 0%, #FF6546 100%);
            border-radius: 39px;
            display: block;
            margin: 0 auto;
            margin-top: 34px;
            border: 0;
            font-size: 32px;
            font-weight: 400;
            color: #FFFFFF;
          }
          section{
            width: 130px;
            float: right;
            display: flex;
            align-items: center;
            img{
              width: 24px;
              height: 24px;
              margin-left: 4px;
            }
          }
        }

    }

  }

</style>
