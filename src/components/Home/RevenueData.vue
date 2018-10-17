<template>
  <div class="revenueComponent">
    <div class="title">
      <span class="titleIcon"></span>
      <span class="txt">营收数据分析</span>
      <img src="../../assets/img/home/close.png" alt="">
    </div>
    <div class="con">
      <div class="con-top">
        <div class="revenueEcharts1" id="revenueEcharts1">
          <div class="name">用能营收占比</div>
          <div class="percent">
            <div class="mounts">
              <span>22%</span>
            </div>
          </div>
        </div>
        <div class="revenueEcharts2" id="revenueEcharts2"></div>
      </div>
      <div class="revenueEcharts3" id="revenueEcharts3"></div>
    </div>
  </div>
</template>
<script>
  /*import "echarts-liquidfill"*/
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
      this.drawEchart2()
      /*this.drawEchart3()*/
    },
    watch:{
      isResize(){
        this.revenueCharts2.resize()
        /*this.revenueCharts3.resize()*/
      }
    },
    methods:{
      drawEchart2(){
        let revenueCharts2 = this.$echarts.init(document.getElementById("revenueEcharts2"));
        this.revenueCharts2 = revenueCharts2
        let option2 = {
          tooltip : {
            trigger: 'axis',
          },
          grid: {
            top: 20,
            bottom: 20
          },
          legend: {
            data:['每餐位用能均值','每房用能均值'],
            orient:'horizontal',
            right:0,
            padding:0,
            textStyle:{
              color:'#eeeff1'
            },
            top:10
          },
          calculable : true,
          xAxis : [
            {
              type : 'category',
              boundaryGap : false,
              nameTextStyle:{
                color:'#f8f8f6'
              },
              axisLine:{
                lineStyle:{
                  color:'#bfc7ca'
                }
              },
              axisTick:{
                show:false
              },
              data : ['01','02','03','04','05','06','07']
            }
          ],
          yAxis : [
            {
              show:false,
              type : 'value'
            }
          ],
          series : [
            {
              name:'每餐位用能均值',
              type:'line',
              smooth:true,
              showSymbol:false,
              lineStyle:{
                color:'#3af2e6',
                shadowBlur:6,
                shadowOffsetY:2,
                shadowColor:'#3af2e6'
              },
              data:[430, 810, 840, 320, 461, 180, 920]
            },
            {
              name:'每房用能均值',
              type:'line',
              smooth:true,
              showSymbol:false,
              lineStyle:{
                color:'#f96074',
                shadowBlur:6,
                shadowOffsetY:2,
                shadowColor:'#f96074'
              },
              data:[620, 460, 220, 630, 401, 110, 640]
            }
          ],
          color:['#3af2e6','#f96074']
        };
        revenueCharts2.setOption(option2);
      },
      drawEchart3(){
        let revenueCharts3 = this.$echarts.init(document.getElementById("revenueEcharts3"));
        this.revenueCharts3 = revenueCharts3
        let option3 = {
          series: [{
            type: 'liquidFill',
            data: [0.6, 0.5, 0.4, 0.3]
          }]
        };
        revenueCharts3.setOption(option3);
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .revenueComponent{
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
        background:url(../../assets/img/home/revenue.png) no-repeat left top;
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
      flex-direction: column;
      #revenueEcharts1{
        padding:0 5%;
        height:44.985%;
        width:100%;
        display: flex;
        flex-direction: column;
        .name{
          height:35.428%;
          display: flex;
          align-items: center;
          color:white;
          font-size:14px;
        }
        .percent{
          height:37.143%;
          background:#192f3d;
          border-radius:4px;
          display: flex;
          flex-direction: row;
          .mounts{
            width:20%;
            background:#29dfd3;
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
            position:relative;
            span{
              display: inline-block;
              position:absolute;
              right:-14px;
              bottom:-20px;
              width:27px;
              height:18px;
              background:url(../../assets/img/home/percent.png) no-repeat left top;
              background-size:cover;
              font-size:10px;
              color:white;
              line-height:20px;
              text-align:center;
            }
          }
        }
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
