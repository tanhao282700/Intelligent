<template>
  <div class="agentComponent" v-loading="loading"
       element-loading-background="rgba(0, 0, 0, 0.5)"
       element-loading-spinner="el-icon-loading"
       element-loading-text="拼命加载中">
    <div class="title">
      <span class="titleIcon"></span>
      <span class="txt">设备情况</span>
      <img @click="deletCli" src="../../assets/img/home/close.png" alt="">
    </div>
    <div class="con" :class="{'hidden':loading==true}">
      <div class="chart" id="equipmentOne">
        <div class="tips">
          <div class="icon cor-r"></div>
          <div class="txt first">故障总数</div>
          <div class="icon cor-b"></div>
          <div class="txt">设备总数</div>
        </div>
        <div class="chartInfo" :title="'故障总数'+data.fault+'台'">
          <div class="persent"></div>
        </div>
        <div class="counts">
          <span class="countsBg countsL"></span>
          <div class="info">
            共&nbsp;<span v-text="data.count">1000</span>&nbsp;台
          </div>
          <span class="countsBg countsR"></span>
        </div>
      </div>
      <div class="chart" id="equipmentTwo" ref="equipmentTwo"></div>
      <div class="chart" id="equipmentThree" ref="equipmentThree"></div>
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
          loading:true,
          equipmentChartOne:{},
          equipmentChartTwo:{},
          data:{}
        }
    },
    components:{

    },
    mounted(){
      /*this.drawEchartOne()*/


      this.initData()
    },
    watch:{
      isResize(){
        /*this.equipmentChartOne.resize()*/
      }
    },
    methods:{
      deletCli(){  //右上角关闭按钮
        this.$emit('deletClick',{self_id:-1,componentsName:'Equipment'})
      },
        initData(){
          this.$http.get('/index_pc/pc/model',{self_id:-1})
            .then((response)=>{
              if(response.data.code == 0){
                this.data = response.data.data
                this.loading = false
                this.initWidth()
                this.drawEchartTwo()
                this.drawEchartThree()
              }else{

              }
            })
            .catch((error)=>{
              console.log(error);
            });
        },
      initWidth(){
        let width = $(".chartInfo").width()
        let persentWidth = width*this.data.fault/this.data.count
        $(".persent").width(persentWidth)
      },
      drawEchartThree(){
        let height = this.$refs.equipmentThree.clientHeight*1.3
        let option3 = {
          width:height, //canvas宽度
          height:height, //canvas高度
          outCircleObj:{ //外环对象
            lineWidth:4, //线宽
            bgColor1:"#FF0000", //背景渐变色
            bgColor2:"#FAD961",
            bgColor3:"#59FF16"
          },
          inCircleObj:{
            lineWidth:14,
            bgColor1:"#FAD961",
            bgColor2:"#F7A51C",
            bgColor3:"#FAD961",
            text:[0,1,2,3,4], //刻度值
            textColor:"#fff", //文字颜色
            opacity:"0.3" //内环透明度
          },
          space:4, //内外环间隔
          title:{
            text:"维保评分",
            color:"#fff",
            size:"14"
          },
          dataValue:{
            text:this.data.maintenance+'%',
            color:"#F7A51C",
            size:"20"
          }
        }
        $("#equipmentThree").circleChart(option3);
      },
      drawEchartTwo(){
        let height = this.$refs.equipmentTwo.clientHeight*1.3
        var option2 = {
          width:height, //canvas宽度
          height:height, //canvas高度
          outCircleObj:{ //外环对象
            lineWidth:4, //线宽
            bgColor1:"#FF0000", //背景渐变色
            bgColor2:"#FAD961",
            bgColor3:"#59FF16"
          },
          inCircleObj:{
            lineWidth:14,
            bgColor1:"#FAD961",
            bgColor2:"#F7A51C",
            bgColor3:"#FAD961",
            text:[0,1,2,3,4], //刻度值
            textColor:"#ffffff", //文字颜色
            opacity:"0.3" //内环透明度
          },
          space:4, //内外环间隔
          title:{
            text:"健康度",
            color:"#ffffff",
            size:"14"
          },
          dataValue:{
            text:this.data.health+'%',
            color:"#F7A51C",
            size:"20"
          }
        }
        $("#equipmentTwo").circleChart(option2);
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
      background:rgba(0,12,39,0.4);
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
        background:url(../../assets/img/home/equipment.png) no-repeat center 2px;
        background-size:cover;
        margin-right:12px;
      }
      .txt{
        color:white;
        font-size:16px;
      }
    }
    .hidden{
      visibility: hidden;
    }
  .con{
    flex:1;
    /*padding:0 5.976%;*/
    display:flex;
    flex-direction: column;
    padding:0 3.187%;
    position:relative;
    /*background:#011530;*/
    /*.chart{
      flex-basis: 33.333%;
    }*/
    #equipmentTwo{
      padding-right:2%;
      height:34.985%;
    }
    #equipmentThree{
      padding-left:2%;
      height:34.985%;
    }
    #equipmentOne{
      height:30.084%;
      display: flex;
      flex-direction: column;
      padding:0 3.984%;
      .tips{
        height:28.9%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        color:#f6f4f7;
        .icon{
          width:16px;
          height:16px;
          border-radius:2px;
          margin-right:4px;
        }
        .first{
          margin-right:8px;
        }
        .cor-r{
          background:#f66c6c;
        }
        .cor-b{
          background:#008aff;
        }
      }
      .chartInfo{
        height:40.462%;
        background:#3b89f8;
        border-radius:4px;
        display: flex;
        flex-direction: row;
        .persent{
          height:100%;
          /*width:20%;*/
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
          background:#f96074;
        }
      }
      .counts{
        margin-top:2%;
        flex-basis: 18%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        .info{
          padding:0 4px;
          color:#ffffff;
          display: flex;
          flex-direction: row;
          justify-content: center;
          span{
            font-size:18px;
          }
        }
        .countsBg{
          flex:1;
          height:100%;
        }
        .countsL{
          background:url(../../assets/img/home/countsL.png) no-repeat left top;
          background-size:cover;
        }
        .countsR{
          background:url(../../assets/img/home/countsR.png) no-repeat right top;
          background-size:cover;
        }
      }
    }
    /*#equipmentOne{
      flex-basis: 33.333%;
    }
    #equipmentTwo{
      width:400px;
      height:400px;
      position:relative;
      right:-100%;
      top:0;
      background:white;
    }*/
  }
  }
</style>
