<template>
  <div class="energyComponent">
    <div class="title">
      <span class="titleIcon"></span>
      <span class="txt">能源管理系统</span>
    </div>
    <div class="con">
      <div class="nergyEcharts" id="nergyEcharts"></div>
      <div class="nergyEcharts2"></div>
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
          energyChart:{}
        }
    },
    components:{

    },
    mounted(){
      this.drawEchart()
    },
    watch:{
      isResize(){
        this.energyChart.resize()
      }
    },
    methods:{
      drawEchart(){
        let energyChart = this.$echarts.init(document.getElementById("nergyEcharts"));
        this.energyChart = energyChart
        let option = {
          title : {
            show:false,
            text: '能源管理',
            textStyle:{
                color:"#fff",
                fontSize:"18",
                fontWeight:"normal"
            }
          },
          grid:{
              bottom:20
          },
          legend: {
            data:[
              '当前','计划'
            ],
            right:0,
            textStyle:{
                color:"#858994"
            },
            align:"left",
            left:"right"
          },
          calculable : true,
          xAxis : [
            {
              type : 'category',
              data : ['当前','本月','本年'],
              axisLine:{
                  lineStyle:{
                      color:"#c9c9c9"
                  }
              },
              axisTick:{
                  show:false
              }
            },
          ],
          yAxis : [
            {
              show:false,
              type : 'value',
              axisLabel:{formatter:'{value} ms'}
            }
          ],
          series : [
            {
              name:'当前',
              type:'bar',
              itemStyle: {
                  normal: {
                    color:'#2a84c0',
                    opacity:1,
                    label:{
                      show:true,
                      position:'top',
                      color:"#c9c9c9"
                    }
                  }
              },
              data:[655,455,605],
              barGap:0,
              barMinHeight:2,
              barMaxWidth:24
            },
            {
              name:'计划',
              type:'bar',
              itemStyle: {
                  normal: {
                      color:'#1fb3a3',
                      opacity:1,
                      label:{
                          show:true,
                          position:'top',
                          color:"#c9c9c9"
                      }
                  }
              },
              data:[630,200,105],
              barGap:0,
              barMinHeight:2,
              barMaxWidth:24
            }
          ],
          color:["#c4752a","#264e8c"]
        };


        // 绘制图表
        energyChart.setOption(option);
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .energyComponent{
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
        background:url(../../assets/img/home/energy.png) no-repeat center 4px;
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
    .nergyEcharts{
      height:50%;
      div{
        width:100%!important;
        height:100%!important;
      }
    }
    .nergyEcharts2{
      height:35.714%;
      background:#2d475e;
      margin-top:8%;
    }
  }
  }
</style>
