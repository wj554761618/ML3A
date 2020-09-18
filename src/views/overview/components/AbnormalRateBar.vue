<template>
  <div class="abnormalRateBar" style="width:100%;height:100%">

  </div>
</template>

<script>
  import echarts from 'echarts';
    export default {
      name: "AbnormalRateBar",
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
              text: '巡检异常项',
              left:'center',
              top:'10%',
              textStyle: {
                fontSize: 14,
                color:'#282D32',
                fontWeight:'normal'
              },
              backgroundColor:'#F7F8F9',
              padding:[8,20,5,20]
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
              data: []
            },
            series: [
              {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                  {value: 335, name: '登录失败'},
                  {value: 310, name: '邮件营销'},
                  {value: 234, name: '联盟广告'},
                ],
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                },
                label: {
                  normal: {
                    formatter: params => {
                      return '{icon|●}{name|' + params.name + '}'
                    },
                    rich: {
                      icon: {
                        fontSize: 8,
                        padding: [-3, 5, 0, 0],
                      },
                      name: {
                        fontSize: 12,
                        color: '#666666',
                        padding: [0, 0, 0, 3],
                      }
                    }
                  }
                },
                labelLine: {
                  normal: {
                    length: 10,
                    length2: 20,
                    lineStyle: {
                      color: '#e6e6e6',
                    },

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
