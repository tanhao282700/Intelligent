<template>
  <div class="echartBox">
    <div :id="this.datas.id" class="myChart" :style="this.datas.style"></div>
  </div>
</template>

<script>
  export default {
    props:['datas'],
    name: "lineEcharts4",
    data(){
      return{
        color:[
          {color1:'rgba(253,153,27,1)',color2:'rgba(253,153,27,0)',color3:'rgba(253,153,27,0.35)'},
          {color1:'rgba(45,240,224,1)',color2:'rgba(45,240,224,0)',color3:'rgba(45,240,224,0.35)'},
        ],

      }
    },
    methods:{
      drawLine(){
        // console.log(this.datas)
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById(this.datas.id));
        let series=[],xAxis = [],legends=[];
        let datas = this.datas;
        let lens = datas.list.length;
        for(let i=0;i<lens;i++) {
          let obj = {
            name: datas.list[i].name,
            data: datas.list[i].data,
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 9,
            showSymbol: false,
            itemStyle:{
              color:this.color[i].color1,
              shadowColor: this.color[i].color1,
              shadowBlur: 1,
            },
            lineStyle:{
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0, color: this.color[i].color2 // 0% 处的颜色
                  },
                  {
                    offset: 0.2, color: this.color[i].color1 // 25% 处的颜色
                  },
                  {
                    offset: 0.8, color: this.color[i].color1 // 25% 处的颜色
                  },
                  {
                    offset: 1, color: this.color[i].color2 // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              },
              shadowColor: this.color[i].color3,
              shadowBlur: 5,
              shadowOffsetX:2,
              shadowOffsetY:6
            },

          }
          if (datas.showMarkL==true){
            obj.markLine = {
              silent: true,
              symbol:'none',
              label: {
                position: 'start',
                formatter: (params) => {
                  return params.value
                }
              },
              lineStyle: {
                width: 1,
                type:'solid',
                color: '#2df0e0',
                //opacity:0
              },
              data: [
                {
                  symbol: 'none',
                  name: 'Y 轴值为 x 的水平线',
                  yAxis: 5,
                  x: '4.5%'
                },
              ]
            }
          }
          if (datas.showLegends==true){
            legends.push(datas.list[i].name)
          }
          series.push(obj);
        }
        let option = {
          legend:{
            data:legends,
            textStyle:{
              color:'#f8fbff',
              fontSize:10,
            },
          },
          tooltip:{
            trigger: 'axis',
            axisPointer: {
              snap: true,
              lineStyle:{
                opacity:1,
                color:'#fff'
              }
            },
            backgroundColor: "#fff",
            formatter:function(params){
              let attrs = params;
              let span0 = ``;
              let lens = attrs.length;
              for(let i = 0 ;i<lens;i++){
                let span = `<span style = "padding:0 4px;color:${params[i].color}">${params[i].value[1]}</span>`;
                span0 += span;
              }

              return `<span>${span0}</span>`;
            },
            confine: true,
            padding: [6, 12],
            textStyle: {
              fontFamily: "PingFangSC-Regular",
              fontSize: '0.14rem',
              color: "#000"
            },
            extraCssText: 'box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.5);border-radius:4px'
          },
          grid: {
            top:datas.showLegends==true?'16%':'2%',
            left: '3%',
            right: '4%',
            bottom: '2%',
            containLabel: true
          },
          dataZoom: [{
            type: 'inside',
            start: 0,
            end: 100
          }],
          xAxis: {
            type: 'time',
            splitLine: {
              show: false
            },
            axisLine:{
              show:false
            },
            axisTick:{
              show:false
            },
            axisLabel:{
              color: function (value, index) {
                return value >= 0 ? '#f8fbff' : '#f8fbff';
              },
              fontSize:10,
              formatter: function (value, index) {
                // 格式化成月/日，只在第一个刻度显示年份
                let date = new Date(value);
                let hours = date.getHours()<10?('0'+date.getHours()):(''+date.getHours());
                let minutes = date.getMinutes()<10?('0'+date.getMinutes()):(''+date.getMinutes());
                return hours+':'+minutes;
              }
            }
          },
          yAxis: {
            show:true,
            type: 'value',
            axisLine:{
              show:false
            },
            axisTick:{
              show:false
            },
            axisLabel:{
              show:false
            },
            splitLine:{
              lineStyle:{
                color:['#2df0e0'],
                opacity:0.1
              }
            }
          },
          series: series
        };

        // 绘制图表
        myChart.setOption(option);
      },
    },
    mounted(){
      this.drawLine();
    }
  }
</script>

<style lang="less" scoped type="text/less">

</style>
