<template>
  <div class="echart_cont">
    <div id="main" class="echart"></div>
  </div>
</template>

<script>
  export default {
    name: "myEcharts",
    props: {
      provinceList: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        old_data: [],
        max_num: 0,
      }
    },
    created() {
      this.addJs('https://imgs.bihubao.com/Public/js/echarts/echarts2.min.js');
      this.addJs('https://imgs.bihubao.com/Public/js/echarts/china2.js');
      this.$nextTick(() => {
        this.getEchart();
      })

    },
    methods: {
     addJs(src){
       const s = document.createElement('script');
       s.type = 'text/javascript';
       s.src = src;
       document.body.appendChild(s);
     } ,
      getEchart() {
        this.provinceList.forEach(val => {
          this.old_data[val.provinceShortName] = val.confirmedCount;
          if (this.max_num < val.confirmedCount) {
            this.max_num = val.confirmedCount;
          }
        });
        let myChart = echarts.init(document.getElementById('main'));
        let dataList = [
          {name: '北京', value: this.get_area_num('北京')},
          {name: '天津', value: this.get_area_num('天津')},
          {name: '上海', value: this.get_area_num('上海')},
          {name: '上海', value: this.get_area_num('上海')},
          {name: '重庆', value: this.get_area_num('重庆')},
          {name: '河北', value: this.get_area_num('河北')},
          {name: '河南', value: this.get_area_num('河南')},
          {name: '云南', value: this.get_area_num('云南')},
          {name: '辽宁', value: this.get_area_num('辽宁')},
          {name: '黑龙江', value: this.get_area_num('黑龙江')},
          {name: '湖南', value: this.get_area_num('湖南')},
          {name: '安徽', value: this.get_area_num('安徽')},
          {name: '山东', value: this.get_area_num('山东')},
          {name: '新疆', value: this.get_area_num('新疆')},
          {name: '江苏', value: this.get_area_num('江苏')},
          {name: '浙江', value: this.get_area_num('浙江')},
          {name: '江西', value: this.get_area_num('江西')},
          {name: '湖北', value: this.get_area_num('湖北')},
          {name: '广西', value: this.get_area_num('广西')},
          {name: '甘肃', value: this.get_area_num('甘肃')},
          {name: '山西', value: this.get_area_num('山西')},
          {name: '内蒙古', value: this.get_area_num('内蒙古')},
          {name: '陕西', value: this.get_area_num('陕西')},
          {name: '吉林', value: this.get_area_num('吉林')},
          {name: '福建', value: this.get_area_num('福建')},
          {name: '贵州', value: this.get_area_num('贵州')},
          {name: '广东', value: this.get_area_num('广东')},
          {name: '青海', value: this.get_area_num('青海')},
          {name: '西藏', value: this.get_area_num('西藏')},
          {name: '四川', value: this.get_area_num('四川')},
          {name: '宁夏', value: this.get_area_num('宁夏')},
          {name: '海南', value: this.get_area_num('海南')},
          {name: '台湾', value: this.get_area_num('台湾')},
          {name: '香港', value: this.get_area_num('香港')},
          {name: '澳门', value: this.get_area_num('澳门')}
        ];
        let option = {
          tooltip: {
            formatter: function (params, ticket, callback) {
              return params.seriesName + '<br />' + params.name + '：' + params.value
            }
          },
          visualMap: {
            left: 'left',
            min: 0,
            max: this.max_num,
            type: 'piecewise',
            pieces: [
              {min: 1, max: 9, label: '1-9', color: '#ffaa85'},
              {min: 10, max: 99, label: '10-99', color: '#ff7b69'},
              {min: 100, max: 999, label: '100-999', color: '#bf2121'},
              {min: 1000, max: 1000000, label: '>1000', color: '#7f1818'}
            ],
            inRange: {
              color: ['#ffffff', '#7f1818']
            }
          },
          geo: {
            map: 'china',
            roam: false,//不开启缩放和平移
            zoom: 1.23,//视角缩放比例
            label: {
              normal: {
                show: true,
                fontSize: '12',
                color: 'rgba(0,0,0,0.7)'
              }
            },
            itemStyle: {
              normal: {
                borderColor: 'rgba(0, 0, 0, 0.5)',
              },
              emphasis: {
                areaColor: '#F3B329',//鼠标选择区域颜色
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          series: [
            {
              name: '确诊',
              type: 'map',
              geoIndex: 0,
              data: dataList
            }
          ]
        };
        myChart.setOption(option);
      },
      get_area_num(str) {
        return this.old_data[str] > 0 ? this.old_data[str] : 0
      }
    }
  }
</script>

<style lang="scss" scoped>
  .echart_cont {
    background: #fff;
    padding: 30px;

    .echart {
      width: 100%;
      height: 800px;
      background: #F2EBE7;
    }

  }
</style>
