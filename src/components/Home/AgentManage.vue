<template>
  <div class="agentComponent">
    <div class="title">
      <span class="titleIcon"></span>
      <span class="txt">代维管理系统</span>
      <img src="../../assets/img/home/close.png" alt="">
    </div>
    <div class="con">
      <div class="echarts" id="echarts"></div>
      <div class="info">
        <div class="day infoC">
          <div class="category">
            <span>日</span>
          </div>
          <div class="percent">
            <span>98%</span>
            <span>19/20</span>
            <span>今日完成率</span>
          </div>
        </div>
        <div class="month infoC">
          <div class="category">
            <span>月</span>
          </div>
          <div class="percent">
            <span>98%</span>
            <span>19/20</span>
            <span>今月完成率</span>
          </div>
        </div>
        <div class="year infoC">
          <div class="category">
            <span>年</span>
          </div>
          <div class="percent">
            <span>98%</span>
            <span>19/20</span>
            <span>今年完成率</span>
          </div>
        </div>
      </div>
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
          agentChart:{}
        }
    },
    components:{

    },
    watch:{
      isResize(){
        this.agentChart.resize()
      }
    },
    mounted(){
      this.drawEchart()
    },
    methods:{
      drawEchart(){
        let agentChart = this.$echarts.init(document.getElementById("echarts"));
        this.agentChart = agentChart
        let option = {
          title : {
            text: '工单统计',
            textStyle:{
                color:"#fff",
                fontSize:"14",
                fontWeight:"normal"
            }
          },
          grid:{
              bottom:30
          },
          legend: {
            data:[
              '未完成数','工单总数'
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
              data : ['今日','本月','本年'],
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
              name:'未完成数',
              type:'bar',
              itemStyle: {
                  normal: {
                    color:'#c4752a',
                    opacity:1,
                    label:{
                      show:true,
                      position:'top',
                      color:"#c9c9c9"
                    }
                  }
              },
              data:[40,155,605],
              barGap:0,
              barMinHeight:2,
              barMaxWidth:24
            },
            {
              name:'工单总数',
              type:'bar',
              itemStyle: {
                  normal: {
                      color:'#264e8c',
                      opacity:1,
                      label:{
                          show:true,
                          position:'top',
                          color:"#c9c9c9"
                      }
                  }
              },
              data:[0,200,105],
              barGap:0,
              barMinHeight:2,
              barMaxWidth:24
            }
          ],
          color:["#c4752a","#264e8c"]
        };


        // 绘制图表
        agentChart.setOption(option);
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
      background:#000c27;
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
        background:url(../../assets/img/home/agent.png) no-repeat center 4px;
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
    .echarts{
      height:52%;
      background:#000000;
    }
    .info{
      flex:1;
      display:flex;
      flex-direction: row;
      .infoC{
        width:27%;
        margin-left:4.37%;
        .category{
          width:90%;
          padding-bottom:90%;
          position:relative;
          margin-top:17.857%;
          span{
            width:100%;
            height:100%;
            border-radius:100%;
            border:1px solid #2c69bc;
            position:absolute;
            color:#8aa5c3;
            font-size:18px;
            font-weight:600;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
        .percent{
          height:49.5%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size:12px;
          span:nth-child(1){
            color:#36a45d;
            font-size:16px;
          }
          span:nth-child(2){
            color:#2d5e96;
            margin-top:2%;
          }
          span:nth-child(3){
            color:#62738d;
            margin-top:2%;
          }
        }
      }
    }
  }
  }
</style>
