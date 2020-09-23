<template>
    <div class="resource-run-bar" style="height:95%;width:100%" ></div>
</template>

<script>
  import echarts from 'echarts';
  export default {
    name: "ResourceRunBar",
    props:['resourceRunData'],
    data(){
      return{
        chart:null,
      }
    },
    mounted() {
      let that=this;
      this.$nextTick(() => {
        this.initChart();
      })
    },
    methods:{
      initChart(){
        this.chart = echarts.init(this.$el)
        let dataZoom=[];
        //数据大于10个的时候显示滚动条，可以横向滑动
        if(this.resourceRunData.category.length>10){
          dataZoom=[{
            type: 'slider',
            xAxisIndex: 0,
            zoomLock: true,
            width:"50%",
            height:8,
            handleSize: 0,
            startValue: 0,
            left:'center',
            bottom:'2%',
            endValue: 9,
            borderColor: "#C7D0DA",
            fillerColor: '#C7D0DA',
            showDataShadow: false,//是否显示数据阴影 默认auto
            showDetail: false,//即拖拽时候是否显示详细数值信息 默认true
            realtime:true, //是否实时更新
            filterMode: 'filter'
          }, {
            type: 'inside',
            id: 'dataZoomX',
            xAxisIndex: 0,
            startValue: 0,
            endValue: 9,
            orient:'vertical',
            zoomOnMouseWheel: false,
            moveOnMouseMove: true,
            moveOnMouseWheel: true
          }]
        }else {
          dataZoom=[]
        }
        this.chart.setOption({
          title: {
            text: '资源运行情况统计',
            textStyle: {
              fontSize: 18,
              color:'#282D32',
              fontWeight:'normal'
            },
            padding:[5,0,0,10]
          },
          dataZoom: dataZoom,
          tooltip: {
            show:true,
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
              shadowStyle:{
                color:"transparent"
              }
            },
            showContent:false
          },
          legend: {
            data: ['监控在线率', '图像可用率', '录像正常率'],
            itemGap: 30,
            right:'1%',
            icon: 'rect',
            itemWidth: 32, // 图例图形宽度
            itemHeight: 4, // 图例图形高度
            textStyle: {
              color: "#555555",
              fontSize: 14
            }
          },
          grid: {
            left: '0.5%',
            right: '2%',
            bottom: '5s%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            data: this.resourceRunData.category,
            axisLabel: {
              padding: [10, 0, 10, 0],
              color: "#666666",
              fontSize: 12
            },
            axisTick: {
              show:false
            },
            axisLine: {
              show:false
            }
          }],
          yAxis: [{
            type: 'value',
            axisLabel: {
              // inside: true,
              padding: [0, 15, 0, 0],
              textStyle: {
                color: '#666666',
                fontSize: 12,
              },
              formatter: '{value}%'
            },
            axisTick: {
              show:false
            },
            axisLine: {
              show:false
            },
            splitLine: {
              lineStyle: {
                color: '#EDEDED'
              },
              show:true,
            },
          }],
          series: [{
            name: '监控在线率',
            type: 'bar',
            barWidth: '15%',
            barMaxWidth: '15',
            data: this.resourceRunData.onlineData,
            label:{
              normal:{
                show: false,
                position: "top",
                distance:5,
                formatter: function(params) {
                  return params.data.value;
                },
                textStyle: {
                  color: "#4C5967",
                  fontSize: 12
                }
              }
            },
            itemStyle: {
              normal: {
                color:'#2E5BFF',
                barBorderRadius: [4, 4, 0, 0]
              }
            },
            emphasis: {
              label: {
                show: true
              }
            }
          },{
            name: '图像可用率',
            type: 'bar',
            barWidth: '15%',
            barMaxWidth: '15',
            data: this.resourceRunData.imageRateData,
            label:{
              normal:{
                show: false,
                position: "top",
                distance:5,
                formatter: function(params) {
                  return params.data.value;
                },
                textStyle: {
                  color: "#4C5967",
                  fontSize: 12
                }
              }
            },
            itemStyle: {
              normal: {
                color:'#F06161',
                barBorderRadius: [4, 4, 0, 0]
              }
            },
            emphasis: {
              label: {
                show: true
              }
            }
          },{
            name: '录像正常率',
            type: 'bar',
            barWidth: '15%',
            barMaxWidth: '15',
            data: this.resourceRunData.recordRateData,
            label:{
              normal:{
                show: false,
                position: "top",
                distance:5,
                formatter: function(params) {
                  return params.data.value;
                },
                textStyle: {
                  color: "#4C5967",
                  fontSize: 12
                }
              }
            },
            itemStyle: {
              normal: {
                color:'#24CCDD',
                barBorderRadius: [4, 4, 0, 0]
              }
            },
            emphasis: {
              label: {
                show: true
              }
            }
          }]
        })
      }
    }
  }
</script>

<style scoped>

</style>
