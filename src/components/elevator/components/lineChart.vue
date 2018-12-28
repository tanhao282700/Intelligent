<template>
  <div class="myChartBox" :id="this.datas.id">
  </div>
</template>

<script>
  export default {
    props:["datas"],
    computed:{
     
    },
    data () {
      return {
               
      }
    },
    methods:{
      drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById(this.datas.id));
        let option = {
            title : {
            },
            tooltip : {
                trigger: 'axis'
            },
            color:[this.datas.lineC],
            legend: {
               data:[this.datas.title],
               textStyle:{
                   color:'#ffffff',
                   fontSize:'.14rem',
                   height:'.14rem',
               },

            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : this.datas.x,
                    axisLine:{                           
                        lineStyle:{                          
                            color:'#ffffff',                    
                            width:1,                      
                        }
                    },
                    nameTextStyle: {
                      color: ['#0087ED']
                    },
                }
            ],
            yAxis : [
                {  axisLine:{                           
                        lineStyle:{                          
                            color:'#ffffff',                    
                            width:0,                      
                        }
                    },
                    axisTick: {
                     show: false
                    },
                    axisLabel:{
                      show:false
                    },
                    splitLine: {
                      show: true,
                      lineStyle:{
                        color:'#2df0e0',
                        width:0.5
                      }
                    }
                }
            ],
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            series : [
                {
                    name:this.datas.title,
                    type:'line',
                    smooth: true,
                    symbol:'none',
                    lineStyle: {
                    normal: {
                        color: this.datas.lineC,
                        width: 2
                      }
                    },
                    data:this.datas.y,
                    markLine: {
                     symbol:'none',
                     lineStyle:{
                         color:'#2df0e0',
                         height:'2px',
                         type:'solid',
                     },
                     data: [
                     
                      [{name: '标线1起点',value:this.datas.average, x: '10%', yAxis: this.datas.average
                       ,label:{show:true,position:'start'}        
                      },{
                           symbol: 'none',
                           x: '95%',
                           yAxis: this.datas.average
                       }
                       ]
                      
                    ]
                  }
                }
            ]
        };
                            
        let _this = this;
        // 绘制图表
        myChart.setOption(option);
      },

    },
    created() {
    },
    mounted() {
      this.drawLine();
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped="" type="text/less">
@import './../../../assets/css/comon.less';
  .myChartBox{
    width: 100%;
    height:100%;
    
  }

</style>
