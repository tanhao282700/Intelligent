<template>
  <div class="echartBox">
    <div :id="this.datas.id" class="myChart" :style="this.datas.style"></div>
    <div class="airQunitBox">
      单位：{{datas.unit}}
    </div>
  </div>
</template>

<script>
  export default {
    props:['datas'],
    name: "airQLineEcharts",
    data(){
      return{
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
              color:datas.color[i].color1,
              shadowColor: datas.color[i].color1,
              shadowBlur: 1,
            },
            /*lineStyle:{
              color:datas.color[i].color1,
              shadowColor: datas.color[i].color2,
              shadowBlur: 5,
              shadowOffsetX:2,
              shadowOffsetY:6
            },*/

          }
          if (datas.showMarkL==true){
            obj.markLine = {
              silent: true,
              symbol:'none',
              label: {
                position: 'start',
                formatter: (params) => {
                  console.log(params)
                  return params.value
                }
              },
              lineStyle: {
                width: 1,
                type:'dashed',
                color: '#2df0e0',
                //opacity:0
              },
              data: [
                {
                  symbol: 'none',
                  name: '标准值',
                  yAxis: datas.markLineVal,
                  x: 50
                },
              ]
            }
          }
          series.push(obj);
        }
        let option = {
          axisPointer: {
            snap: true,
            lineStyle:{
              width:8,
              color:'rgba(61, 138, 247, 0.7)',
              // shadowColor: 'rgba(74,144,226,0.22)',
              // shadowBlur: 10,
              // shadowOffsetY:4
              //opacity:1,
            }
          },
          tooltip:{
            trigger: 'axis',
            axisPointer: {
              snap: true,
              lineStyle:{
                opacity:1,
                color:'#2d69bd'
              }
            },
            backgroundColor: "#081e49",
            formatter:function(params){
              let attrs = params;
              let span0 = ``;
              let lens = attrs.length;
              for(let i = 0 ;i<lens;i++){
                let span = `<span style = "padding:0 4px;color:#fff">${params[i].value[1]}</span>`;
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
            top:34,
            left: '1.5%',
            right: '1.5%',
            bottom: '2%',
            containLabel: true
          },
          dataZoom: [{
            type: 'inside',
            start: 0,
            end: 100
          }],
          xAxis: {
            interval:60*60*1000,
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
                return value >= 0 ? '#708fbe' : '#708fbe';
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
            splitNumber:22,
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
              show:false
            },
            splitArea:{
              show:true,
              areaStyle:{
                color:['rgba(255,255,255,0.08)','rgba(255,255,255,0.05)']
              }
            }
          },
          visualMap: {
            show:false,
            seriesIndex:0,
            top: 10,
            right: 10,
            pieces: [
              {
                gte: 0,
                lte: datas.showMarkL?datas.markLineVal:100000,
                color: 'rgba(74,144,226,1)',
              }
              /*{
                  gte: 0,
                  lte: this.props.exceeding,
                  color: this.props.lineColor,

              },
              {
                  gt: this.props.exceeding,
                  lte: this.props.threshold,
                  color: '#ffa414'
              },
              {
                  gt: this.props.threshold,
                  color: '#ff3636'
              }*/
            ],
            outOfRange: {
              color: '#ed4949'
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
    /*updated(){
      this.drawLine();
    }*/
    /*watch:{
      datas:{
        handler: function(){
          this.drawLine();
        },
        deep:true,
      }
    }*/
  }
</script>

<style lang="less" scoped type="text/less">
  .echartBox{
    position: relative;
  }
  .airQunitBox{
    position: absolute;
    left: 0.2rem;
    top:0;
    font-family: PingFangSC-Regular;
    font-size: 0.14rem;
    line-height: 1;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #6d8cbb;
  }
</style>
