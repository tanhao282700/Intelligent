<template>
  <div class="echartBox">
    <div :id="this.datas.id" class="myChart" :style="this.datas.style"></div>
  </div>
</template>

<script>
  // import echarts from 'echarts'
  export default {
    props:['datas'],
    name: "echartsBar",
    data(){
      return{
        color:[
          {color1:'rgba(229,81,80,1)',color3:'rgba(229,81,80,0.5)'},
          {color1:'rgba(45,240,224,1)',color3:'rgba(45,240,224,0.5)'},
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
            type: 'bar',
            smooth: true,
            symbol: 'circle',
            symbolSize: 9,
            showSymbol: false,
            // itemStyle:{
            //   color:datas.colorArr[i].color1,
            //   // shadowColor: datas.colorArr[i].color1,
            //   // shadowBlur: 1,
            // },
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: datas.colorArr[i].color2},
                    {offset: 1, color: datas.colorArr[i].color1}
                  ]
                )
              },
              // emphasis: {
              //   color: new this.$echarts.graphic.LinearGradient(
              //     0, 0, 0, 1,
              //     [
              //       {offset: 0, color: '#2378f7'},
              //       {offset: 0.7, color: '#2378f7'},
              //       {offset: 1, color: '#83bff6'}
              //     ]
              //   )
              // }
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
                color: '#8ebbff',
                //opacity:0
              },
              data: [
                {
                  symbol: 'none',
                  name: 'Y 轴值为 x 的水平线',
                  yAxis: 5,
                  x: '1.5%'
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
            itemWidth:12,
            itemHeight:12,
            top:'3%',
            right:datas.legendsC==true?'auto':'3%',
          },
          tooltip:{
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            backgroundColor: "#fff",
            formatter:function(params){
              //console.log(params)
              let attrs = params;
              let span0 = ``;
              let lens = attrs.length;
              for(let i = 0 ;i<lens;i++){
                let span = `<span style = "padding:0 4px;color:${params[i].color.colorStops[1].color}">${params[i].value}</span>`;
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
            left: '0%',
            right: '0%',
            bottom: '6%',
            containLabel: true
          },
          dataZoom: [{
            type: 'inside',
            start: 0,
            end: 100
          }],
          xAxis: {
            type: 'category',
            data:datas.time,
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
              // formatter: function (value, index) {
              //   // 格式化成月/日，只在第一个刻度显示年份
              //   let date = new Date(value);
              //   let hours = date.getHours()<10?('0'+date.getHours()):(''+date.getHours());
              //   let minutes = date.getMinutes()<10?('0'+date.getMinutes()):(''+date.getMinutes());
              //   return hours+':'+minutes;
              // }
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
            splitArea:{
              show:true,
              areaStyle:{
                color:['rgba(142,187,255,0.05)','rgba(142,187,255,0.08)'],
              }
            },
            splitLine:{
              show:false
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
    },
    updated(){
      this.drawLine();
    }
  }
</script>

<style lang="less" scoped type="text/less">

</style>
