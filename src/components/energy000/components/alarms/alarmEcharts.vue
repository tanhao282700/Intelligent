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

        const  itemStyle={
                        normal: {
                           
                        },
                        emphasis: {
                            barBorderWidth: 1,
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            shadowColor: 'rgba(0,0,0,0.5)'
                        }
                    };
        let option = {
            color:echartCirData.color,
            xAxis: {              
                data: echartCirData.xData,
                // name: '单位 %',
                position :'top',
                axisLine: {  //坐标线
                    lineStyle: {
                        color: 'rgba(150,150,150,0.2)',//左边线的颜色
                    }
                },
                // splitLine:{ //分割线
                //     show : true,
                //     lineStyle: {
                //         type: 'solid',
                //         color: 'rgba(150,150,150,0.2)',//左边线的颜色
                //     }
                // },
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
                 formatter: '{c}条',
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
                left: 10,
                right:10,
                bottom:0,
                top:40
            },  
            series: [
                {
                    name: 'bar1',
                    type: 'bar',
                    stack: 'three',
                    barMaxWidth:'48%',
                    itemStyle:itemStyle,
                    data: echartCirData.data1,                  
                },   
                {
                    name: 'bar2',
                    type: 'bar',
                    stack: 'three',
                    barMaxWidth:'48%',
                    itemStyle:itemStyle,
                    data: echartCirData.data2,
                    
                },
                {
                    name: 'bar3',
                    type: 'bar',
                    stack: 'three',
                    barMaxWidth:'48%',
                    itemStyle:itemStyle,
                    data: echartCirData.data3,
                    
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
