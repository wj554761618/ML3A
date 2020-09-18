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
          let that=this
          this.chart = echarts.init(this.$el);
          this.chart.setOption({
            color: ['#3B6AF6', '#F06161', '#BEC9DE','#24CCDD','#F47E4B'],
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
                radius: '50%',
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
                  },
                  labelLine: {
                    show: true
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
                        padding: [-2, 5, 0, -3],
                      },
                      name: {
                        fontSize: 12,
                        color: '#666666',
                        padding: [0, 0, 0, 0],
                      }
                    }
                  }
                },
                labelLine: {
                  length: 18,
                  lineStyle: {
                    color: "rgba(164, 177, 189, 1)"
                  }
                }
              }
            ]
          })
          //设置默认选中高亮部分
          this.chart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: 0
          });
          this.chart.on('mouseover', function(e) {
            //当检测到鼠标悬停事件，取消默认选中高亮
            that.chart.dispatchAction({
              type: 'downplay',
              seriesIndex: 0,
              dataIndex: 0
            });
            //高亮显示悬停的那块
            that.chart.dispatchAction({
              type: 'highlight',
              seriesIndex: 1,
              dataIndex: e.dataIndex
            });
          });
          //检测鼠标移出后显示之前默认高亮的那块
          this.chart.on('mouseout', function(e) {
            that.chart.dispatchAction({
              type: 'highlight',
              seriesIndex: 0,
              dataIndex: 0
            });
          });
        }
      }
    }
</script>

<style scoped>

</style>
