<template>
  <div class="energyComponent">
    <div class="title">
      <span class="titleIcon"></span>
      <span class="txt">能源管理系统</span>
      <img src="../../assets/img/home/close.png" alt="">
    </div>
    <div class="con">
      <div class="nergyEcharts" id="nergyEcharts"></div>
      <div class="nergyEcharts2" id="nergyEcharts2">
        <div class="logo"></div>
      </div>
      <div class="button">
        <span class="active">水</span>
        <span>电</span>
        <span>气</span>
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
          energyChart:{},
          energyChart2:{}
        }
    },
    components:{

    },
    mounted(){
      this.drawEchart()
      this.drawEchart2()
    },
    watch:{
      isResize(){
        this.energyChart.resize()
        this.energyChart2.resize()
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
      },
      drawEchart2(){
        let energyChart2 = this.$echarts.init(document.getElementById("nergyEcharts2"));
        this.energyChart2 = energyChart2
        let option2 = {
          title:{
            text:'25%',
            left:20,
            textStyle:{
                fontSize:18,
                color:'#4be283',
            },
            /*backgroundColor:'#1d2d3a'*/
          },
          grid: {
            top: 26,
          },
          tooltip : {
            trigger: 'axis',
          },
          legend: {
            data:['今年计划','2017','2018'],
            right:0,
            padding:0,
            textStyle:{
              color:'#eeeff1',
              fontSize:12
            },
            top:8
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
              name:'今年计划',
              type:'line',
              smooth:true,
              showSymbol:false,
              lineStyle:{
                  color:'#3af2e6',
                  shadowBlur:6,
                  shadowOffsetY:2,
                  shadowColor:'#3af2e6'
              },
              data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
              name:'2017',
              type:'line',
              smooth:true,
              showSymbol:false,
              lineStyle:{
                color:'#fd9a1b',
                shadowBlur:6,
                shadowOffsetY:2,
                shadowColor:'#fd9a1b'
              },
              data:[220, 0, 191, 234, 290, 330, 310]
            },
            {
              name:'2018',
              type:'line',
              smooth:true,
              showSymbol:false,
              lineStyle:{
                color:'#f96072',
                shadowBlur:6,
                shadowOffsetY:2,
                shadowColor:'#f96072'
              },
              data:[150, 232, 201, 154, 190, 330, 700]
            }
          ],
          color:['#3af2e6','#fd9a1b','#f96072']
        };
        energyChart2.setOption(option2);
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
    position:relative;
    .nergyEcharts{
      height:50%;
      div{
        width:100%!important;
        height:100%!important;
      }
    }
    .nergyEcharts2{
      /*height:35.714%;*/
      flex:1;
      /*background:#2d475e;*/
      margin-top:8%;
      position:relative;
      background:url(../../assets/img/home/conservation.png) no-repeat left top;
      background-size:18px 28px;
      &:before{
        content:'';
        width:100%;
        height:28px;
        background:#2d475e;
        position:absolute;
        left:0;
        top:0;
        z-index:-100;
      }
      /*.logo{
        width:26px;
        height:40px;
        position:absolute;
        left:0;
        top:0;
        background:pink;
      }*/
    }
    .button{
      width:100%;
      position:absolute;
      z-index:99;
      bottom:2%;
      text-align: center;
      span{
        display: inline-block;
        background:#1a365b;
        width:26px;
        height:26px;
        line-height:26px;
        text-align:center;
        color:#cdcdcd;
        margin-left:8px;
        &:hover{
          cursor:pointer;
        }
      }
      .active{
        background:#72a7f3;
        color:white;
      }
    }
  }
  }
</style>
