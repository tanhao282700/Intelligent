<template>
  <div class="agentComponent">
    <div class="title">
      <span class="titleIcon"></span>
      <span class="txt">设备情况</span>
    </div>
    <div class="con">
      <div class="chart" id="equipmentOne"></div>
      <div class="chart" id="equipmentTwo"></div>
      <div class="chart" id="equipmentThree"></div>
    </div>
  </div>
</template>
<script>

  export default{
    props:{
      isResize:{
        type:Number
      }
    },
    data(){
        return{
          dataAxis:['今日','本月','本年'],
          data:[{
              time:'今日',
              data1:20,
              data2:30
          },{
            time:'本月',
            data1:30,
            data2:40
          },{
            time:'本年',
            data1:699,
            data2:499
          }],
          equipmentChartOne:{},
          equipmentChartTwo:{}
        }
    },
    components:{

    },
    mounted(){
      this.drawEchartOne()
      this.drawEchartTwo()
    },
    watch:{
      isResize(){
        this.equipmentChartOne.resize()
      }
    },
    methods:{
      drawEchartTwo(){
        let equipmentChartTwo = this.$echarts.init(document.getElementById("equipmentTwo"));
        this.equipmentChartTwo = equipmentChartTwo
        let option2 = {
          tooltip : {
            formatter: "{a} <br/>{c} {b}"
          },
          toolbox: {
            show: true,
            feature: {
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          series : [
            {
              name: '速度',
              type: 'gauge',
              z: 3,
              min: 0,
              max: 220,
              splitNumber: 11,
              radius: '40%',
              axisLine: {   show:false,
              },
              axisTick: {  show:false
              },
              splitLine: {     show:false
              },
              axisLabel: {show:false
              },
              title : {show:false
              },
              pointer : {
                show:false
              },
              detail :{show:false
              },
              data:[{value: 40, name: 'km/h'}]
            }, {
              name: '速度',
              type: 'gauge',
              z: 3,
              min: 0,
              max: 220,
              splitNumber: 11,
              radius: '45%',
              axisLine: {
                lineStyle: { // 属性lineStyle控制线条样式
                  color: [
                    [ 0.5,  this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                      offset: 1,
                      color: "#E75F25" // 50% 处的颜色
                    }, {
                      offset: 0.8,
                      color: "#D9452C" // 40% 处的颜色
                    }], false) ], // 100% 处的颜色
                    [ 0.7,  this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                      offset: 1,
                      color: "#FFC539" // 70% 处的颜色
                    }, {
                      offset: 0.8,
                      color: "#FE951E" // 66% 处的颜色
                    }, {
                      offset: 0,
                      color: "#E75F25" // 50% 处的颜色
                    }], false) ],
                    [ 0.9,  this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 1,
                      color: "#C7DD6B" // 90% 处的颜色
                    }, {
                      offset: 0.8,
                      color: "#FEEC49" // 86% 处的颜色
                    }, {
                      offset: 0,
                      color: "#FFC539" // 70% 处的颜色
                    }], false) ],
                    [1,  this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [ {
                      offset: 0.2,
                      color: "#1CAD52" // 92% 处的颜色
                    }, {
                      offset: 0,
                      color: "#C7DD6B" // 90% 处的颜色
                    }], false) ]
                  ],
                  width: 10
                }
              },
              axisTick: {   show:false
              },
              splitLine: {   show:false
              },
              axisLabel: {
                color: '#eee',
                distance: -10,
              },
              pointer : { //指针样式
                show:false
              },
              title : {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: 'bolder',
                fontSize: 20,
                fontStyle: 'italic'
              },
              detail : {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                formatter: function (value) {
                  value = (value + '').split('.');
                  value.length < 2 && (value.push('00'));
                  return ('00' + value[0]).slice(-2)
                    + '.' + (value[1] + '00').slice(0, 2);
                },
              },
              data:[{value: 40, name: 'km/h'}]
            }
          ]
        };

        /*equipmentChartTwo.setOption(option2);*/
      },
      drawEchartOne(){
        let equipmentChartOne = this.$echarts.init(document.getElementById("equipmentOne"));
        this.equipmentChartOne = equipmentChartOne
        let option1 = {
          legend: {
            itemWidth:15,
            itemHeight:15,
            data:['故障总数','设备总数'],
            textStyle:{
                color:'#f2f0f1',
            },
            right:0
          },
          yAxis: {
            show:false,
            data: ["设备"],
            splitLine:{
              show:false,
            },
          },
          xAxis: {
            type:'value',
            show:false,
            data:[150],
            name:150,
            nameLocation:'center',
            nameTextStyle:{
                color:'#f2f0f1',
            },
            nameGap:-5,
            splitNumber:10,
            splitLine:{
              show:false,
            },
          },
          series: [{
            name: '设备总数',
            type: 'bar',
            barGap:'-100%',
            barWidth:30,
            data: [150],
            itemStyle:{
              color:"#3b89f8",
              barBorderRadius: [4,4,4,4],
            },
            z:1
          },{
            name: '故障总数',
            type: 'bar',
            barGap:'-100%',
            barWidth:30,
            data: [40],
            itemStyle:{
              color:"#f96074",
              barBorderRadius: [4,0,0,4],
            },
            z:2
          }]
        };



        // 绘制图表
        equipmentChartOne.setOption(option1);
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .agentComponent{
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
    .title{
      height:8.9%;
      background:#0e2340;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      border-top-right-radius:8px;
      border-top-left-radius:8px;
      .titleIcon{
        width:22px;
        height:22px;
        background:url(../../assets/img/home/equipment.png) no-repeat center 2px;
        background-size:cover;
        margin-right:12px;
      }
      .txt{
        color:white;
        font-size:16px;
      }
    }
  .con{
    flex:1;
    /*padding:0 5.976%;*/
    display:flex;
    flex-direction: column;
    padding:0 3.187%;
    .chart{
      flex-basis: 33.333%;
    }
    #equipmentTwo{

    }
  }
  }
</style>
