<template>
  <div class="myChartBox">
    <div :id="echartBarData.id" :style = "echartBarData.style" class="myChart"></div>
  </div>
</template>

<script>
  export default {
    props:['echartBarData'],
    data () {
      return {

      }
    },
    computed:{

    },
    methods:{
      drawLine(data){
        //   let winHei = document.body.clientWidth;
        let echartBarData = this.echartBarData;

        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById(echartBarData.id));

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
            data: echartBarData.xData,
            axisLine: {  //坐标线
              show:false
            },
            splitLine:{ //分割线
              show : false,
            },
            axisLabel:{
              interval:0,
              fontSize:10,
              color:'#708fbe',
              margin:20,
            },
            axisTick:{
              show:false
            },
          },
          tooltip: {
            formatter: '{c}',
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
              shadowStyle:{
                color:'rgba(0,0,0,0.3)'
              }
            },
            backgroundColor:'#fff',
            padding:[10,12],
            textStyle:{
              color:'#2866fe'
            }
          },
          yAxis: {
            name:(echartBarData.xData.length===0?'':'单位：辆'),
            nameGap:20,
            nameTextStyle:{
              fontSize:12,
              color:'#008aff',
            },
            type : 'value',
            axisLine:{
              show:false
            },
            axisTick:{
              show:false
            },
            splitLine:{
              show:false
            },
            axisLabel:{
              fontSize:10,
              color:'#708fbe',
              margin:10
            },
            splitArea:{
              show:true,
              areaStyle:{
                color:['rgba(255,255,255,0.05)','rgba(255,255,255,0.08)']
              }
            }
          },
          grid: {
            top:50,
            left: 16,
            right:11,
            bottom:20,
            containLabel: true
          },
          series: [
            {
              barMinHeight:1,
              name: 'bar',
              type: 'bar',
              barMaxWidth:18,
              itemStyle: {
                normal: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#2866fe'
                  }, {
                    offset: 1,
                    color: '#2866fd'
                  }]),
                  shadowBlur:4,
                  shadowOffsetX: 1,
                  shadowOffsetY: 0,
                  shadowColor: '#2866fd'
                },
                emphasis: {
                  barBorderWidth: 1,
                  shadowBlur: 4,
                  shadowOffsetX: 1,
                  shadowOffsetY: 0,
                  shadowColor: '#2866fd'
                }
              },
              data: echartBarData.data,

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
<style lang="less" scoped type="text/less">
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
