<template>
  <div class="monitor-type-bar" style="width: 100%;height: 95%">1111</div>
</template>

<script>
  import echarts from 'echarts';
    export default {
      name: "MonitorTypeBar",
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
          this.chart.setOption({
            title: {
              text: '资源类型统计',
              textStyle: {
                fontSize: 18,
                color:'#282D32',
                fontWeight:'normal'
              },
              padding:[5,0,0,10]
            },
            legend: {
              data: []
            },
            grid: {
              left: '1%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              type: 'value',
              axisLabel: {
                textStyle: {
                  color: '#666666',
                  fontSize: 12,
                }
              },
              axisTick: {
                show:false
              },
              axisLine: {
                show:false
              },
              splitLine: {
                lineStyle: {
                  color: '#EDEDED',
                  type:'dashed'
                },
                show:true,
              },
            },
            yAxis: {
              type: 'category',
              data: ['三类视频','二类视频','一类视频'],
              axisLabel: {
                // inside: true,
                padding: [0, 15, 0, 0],
                textStyle: {
                  color: '#666666',
                  fontSize: 12,
                }
              },
              axisTick: {
                show:false
              },
              axisLine: {
                lineStyle:{
                  color:'#EDEDED'
                }
              }
            },
            series: [
              {
                name: '2011年',
                type: 'bar',
                data: [18203, 23489, 29034],
                barWidth: '30%',
                label: {
                  normal: {
                    show: true,
                    position: "right",
                    distance: 10,
                    formatter: function (params) {
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
                    color: (params) => {
                      let colors = ['#F06161', '#00C1D4', '#2E5BFF']
                      return colors[params.dataIndex]
                    }
                  }
                },
              }
            ]
          })
        }
      }
    }
</script>

<style scoped>

</style>
