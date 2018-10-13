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
          }]
        }
    },
    components:{

    },
    mounted(){
      this.drawEchartTwo()
    },
    methods:{
      drawEchartTwo(){
        let myChart = this.$echarts.init(document.getElementById("equipmentTwo"));



        // 绘制图表
        myChart.setOption(option);
      }
    }
  }
</script>
<style lang="less" scoped>
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
    .chart{
      flex-basis: 33.333%;
    }
  }
  }
</style>
