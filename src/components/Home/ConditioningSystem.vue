<template>
  <div class="conditioningComponent">
    <div class="title">
      <span class="titleIcon"></span>
      <span class="txt">中央空调系统</span>
      <img src="../../assets/img/home/close.png" alt="">
    </div>
    <div class="con">
      <div class="con-top">
        <div class="revenueEcharts1" id="revenueEcharts1"></div>
        <div class="revenueEcharts2" id="revenueEcharts2"></div>
      </div>
      <div class="revenueEcharts3" id="revenueEcharts3"></div>
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
          revenueCharts1:{}
        }
    },
    components:{

    },
    mounted(){
      /*this.drawEchart()*/
    },
    watch:{
      isResize(){
        /*this.revenueCharts1.resize()*/
      }
    },
    methods:{
      drawEchart(){
        let revenueCharts1 = this.$echarts.init(document.getElementById("revenueEcharts1"));
        this.revenueCharts1 = revenueCharts1
        let option1 = {
          color: ["#f5a623", "#fff"],
          grid: [{//外框
            top: '6%',
            left: '0',
            right: '0',
            bottom: '3%',
            containLabel: false,
          }],
          calculable: true,
          tooltip: {
            trigger: 'axis'
          },
          xAxis: [{
            type: 'value',
            splitLine: {show: false},
            axisLabel: {show: false},
            axisTick: {show: false},//不显示刻度
            axisLine: {show: false},
            boundaryGap: false,//坐标轴两边留白策略
          }],
          yAxis: [{
            type: 'category',
            boundaryGap: false,
            position: 'top',
            data: [100],
            splitLine: {show: false},
            axisLabel: {show: false},
            axisTick: {show: false},//不显示刻度
            axisLine: {show: false},
          }],
          series: [
            {
              type: 'bar',
              data: [10],
              barWidth: 10,
              barGap: '-100%',
              z:1
            },
            {
              type: 'bar',
              data: [20],
              barWidth: 10,
              barGap: '-100%'
            }
          ]
        };


        // 绘制图表
        revenueCharts1.setOption(option1);
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .conditioningComponent{
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
      position:relative;
      img{
        position:absolute;
        width:24px;
        height:24px;
        right:10px;
        top:50%;
        margin-top:-12px;
        display: none;
      }
      &:hover{
        cursor: pointer;
        img{
          display: block;
        }
      }
      .titleIcon{
        width:22px;
        height:22px;
        background:url(../../assets/img/home/air-conditioner.png) no-repeat left 2px;
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
    display:flex;
    flex-direction: column;
    padding:2.597% 6% 0 6%;
    .con-top{
      background:#2d475e;
      height:50.974%;
      display: flex;
      #revenueEcharts1{
        height:44.985%;
        width:100%;
      }
      #revenueEcharts2{
        flex:1;
      }
    }
    #revenueEcharts3{
      flex:1;
    }
  }
  }
</style>
