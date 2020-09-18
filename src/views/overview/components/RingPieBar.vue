<template>
  <div :class="className" :style="{height:height,width:width}" ref="ref"/>
</template>

<script>
  import echarts from 'echarts';
  require('echarts/theme/macarons');
  //import resize from './mixins/resize';
  export default {
    name:"RingPieBar",
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      index:{
        type:Number
      },
      barData:{
        type:Object
      }
    },
    data() {
      return {
        chart: null,
        width:'100%',
        height:'250px',
        ref:'chart'+this.index
      }
    },
    mounted() {
      let clientHeight=this.$refs.ref.clientWidth-80
      this.height=clientHeight+'px'
      this.$nextTick(() => {
        this.initChart()
      })
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      //每三位数字加个逗号
      formatNumber:function(num) {
        let reg = /(?=(\B)(\d{3})+$)/g;
        return num.toString().replace(reg, ',');
      },
      initChart() {
        let data=this.barData
        let total='';
        let color=['#3B6AF6', '#F06161', '#BEC9DE'];
        if(data.Total.toString().indexOf("%")>-1){
          total=data.Total;
          color=['#3B6AF6', '#24CCDD', '#BEC9DE']
        }else {
          total=this.formatNumber(data.Total)
        }
        this.chart = echarts.init(this.$el, 'macarons')
        this.chart.setOption({
          color: color,
          title: [{
            text: `{val|${total}}\n{name|${data.innerName}}`,
            top: 'center',
            left: 'center',
            textStyle: {
              rich: {
                name: {
                  fontSize: 16,
                  fontWeight: 'normal',
                  color: '#282D32',
                  padding: [10, 0]
                },
                val: {
                  fontSize:20,
                  fontFamily:'PingFangZhonghei',
                  color: '#282D32',
                  padding: [0, 0,25,0]
                }
              }
            }
          }],
          series: [{
            type: 'pie',
            radius: ['45%', '65%'],
            data: data.Value,
            hoverAnimation: false,
            silent:true,
            labelLine: {
              normal: {
                length: 10,
                length2: 20,
                lineStyle: {
                  color: '#e6e6e6',
                },

              }
            },
            label: {
              normal: {
                formatter: params => {
                  if(data.Total.toString().indexOf("%")>-1){
                    return (
                      '{icon|●}{value|' +params.value+ '%\n}{name|' + params.name + '}'
                    );
                  }else {
                    return (
                      '{icon|●}{value|' +params.value+ '\n}{name|' + params.name + '}'
                    );
                  }

                },
                rich: {
                  icon: {
                    fontSize: 8,
                    padding: [-3, 5, 0, 0],
                  },
                  name: {
                    fontSize: 12,
                    color: '#666666',
                    padding: [-40, 0, 0, 10],
                  },
                  value: {
                    fontSize: 12,
                    color: '#4C5967',
                    padding: [-5, 0, 0, 0],
                  }
                }
              }
            },
          }]
        })
      }
    }
  }
</script>

