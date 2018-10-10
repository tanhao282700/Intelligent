<template>
    <div  class="myChartBox">
           <div :id="echartCirData.id" :style = "echartCirData.style" class="myChart"></div>   
    </div>
</template>

<script>
export default {
  props:['echartCirData'],
  data () {
    return {

    }
  },
  computed:{
        
  },
  methods:{
      drawLine(data){
        //   let winHei = document.body.clientWidth;
          let echartCirData = this.echartCirData;
         
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById(echartCirData.id));

        let option = {
             dataZoom: [
                {
                show: false,
                },
                {
                type: 'inside',
                realtime: true,
                start: 0,
                end: 100
                }
            ],
            xAxis: {
                data: echartCirData.xData,
                // name: '单位 %',
                position :'top',
                axisLine: {  //坐标线
                    lineStyle: {
                        color: 'rgba(150,150,150,0.2)',//左边线的颜色
                    }
                },
                splitLine:{ //分割线
                    show : true,
                    lineStyle: {
                        type: 'solid',
                        color: 'rgba(150,150,150,0.2)',//左边线的颜色
                    }
                },
                axisLabel:{
                    color:'#708fbe',
                },
                nameTextStyle:{
                    color:'#fff',
                    fontSize:10,
                    shadowColor:'#ccc'
                }
            },
             tooltip: {
                 formatter: '{c}%',
                 trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
             },
            yAxis: {
                // inverse: true,
                splitArea: {show: false},
                axisLine :{
                    show:false
                },
                splitLine:{
                    show:false
                }
            },
            grid: {
                left: 0,
                right:0,
                bottom:10,
                top:30
            },  
            series: [
                {
                    name: 'bar',
                    type: 'bar',
                    stack: 'one',
                    barMaxWidth:'37.5%',
                    itemStyle: {
                        normal: {
                            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#fde6ba'
                            }, {
                                offset: 1,
                                color: '#f9c376'
                            }])
                        },
                        emphasis: {
                            barBorderWidth: 1,
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            shadowColor: 'rgba(0,0,0,0.5)'
                        }
                    },
                    data: echartCirData.data,
                    
                },              
            ]
        };
        // 绘制图表
       myChart.setOption(option); 
    }
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
.myChartBox{
   height: 100%;
   width: 100%;
   position:relative;  
   .myChart{
      height: 100%;
        width: 100%; 
   }
}

</style>
