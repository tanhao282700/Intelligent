<template>
  <div class="revenueComponent" v-loading="loading"
       element-loading-background="rgba(0, 0, 0, 0.5)"
       element-loading-spinner="el-icon-loading"
       element-loading-text="拼命加载中">
    <div class="title">
      <span class="titleIcon"></span>
      <span class="txt">营收数据分析</span>
      <img @click="deletCli" src="../../assets/img/home/close.png" alt="">
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
      <div class="revenueEcharts3" id="revenueEcharts3">
        <div class="name">当前入住率</div>
        <div class="pic">
          <div class="containerBor">
            <div class="container">
              <div class="wave"></div>
            </div>
          </div>
          <div class="info">
            <span>入住率</span>
            <span v-text="revenueData.occupancy"></span>
          </div>
        </div>
      </div>
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
          revenueCharts1:{},
          loading:true,
          revenueData:{}
        }
    },
    components:{

    },
    mounted(){
      this.drawEchart2()
      /*this.drawEchart3()*/

      this.initData()
    },
    watch:{
      isResize(){
        this.revenueCharts2.resize()
        /*this.revenueCharts3.resize()*/
      }
    },
    methods:{
      deletCli(){  //右上角关闭按钮
        this.$emit('deletClick',{self_id:17,componentsName:'RevenueData'})
      },
        initData(){
          this.$http.get('/index_pc/pc/model',{self_id:17})
             .then((response)=>{
               if(response.data.code == 0){
                 console.log(response)
                  this.revenueData = response.data.data
            this.loading = false
               }else{

               }
             })
            .catch((error)=>{
                    console.log(error);
                });
      },
      drawEchart2(){
        let revenueCharts2 = this.$echarts.init(document.getElementById("revenueEcharts2"));
        this.revenueCharts2 = revenueCharts2
        let option2 = {
          title:{
            text:'电',
            textStyle:{
              fontSize:14,
              color:'white',
            },
            backgroundColor:'#46bcfc'
          },
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
            left:-10,
            padding:0,
            textStyle:{
              color:'#eeeff1',
              fontSize:10
            },
            top:6
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
      height:50.974%;
      display: flex;
      flex-direction: column;
      background:rgba(0,0,0,0.15);
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
          background:rgba(0,12,39,0.4);
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
        position:relative;
        &:before{
          content:'';
          width:100%;
          height:24px;
          background:#0e2340;
          position:absolute;
          left:0;
          top:0;
        }
      }
    }
    #revenueEcharts3{
      flex:1;
      display: flex;
      flex-direction: column;
      .name{
        height:19.8%;
        display: flex;
        align-items: center;
        color:white;
      }
      .pic{
        flex:1;
        position:relative;
        .info{
          position:absolute;
          width:56px;
          height:48px;
          color:white;
          display: flex;
          flex-direction: column;
          left:50%;
          top:50%;
          margin-left:-22px;
          margin-top:-22px;
          z-index:9;
          justify-content: space-between;
          align-items: center;
          span:first-child{
            font-size:12px;
            margin-left:-3px;
          }
          span:last-child{
            font-size:24px;
            letter-spacing: 1px;
          }
        }
        .containerBor{
          width:103px;
          height:103px;
          border-radius:50%;
          border:2px solid #167cc4;
          position:absolute;
          left:50%;
          top:50%;
          margin-left:-51px;
          margin-top:-51px;
        }
        .container{
          width:100px;
          height:100px;
          overflow:hidden;
          border:4px solid #152b43;
          border-radius:50%;
          .wave{
            position:relative;
            width:100px;
            height:100px;
            background-color:#309ee9;
            border-radius:50%;
          }
          .wave::before,.wave::after{
            content:"";
            position:absolute;
            width:200px;
            height:200px;
            top:0;
            left:50%;
            background:rgba(1, 21, 48, 0.6);
            border-radius:38%;
            transform:translate(-50%,-70%)rotate(0);
            animation:rotate 6s linear infinite;
            z-index: 1;
          }
          .wave::after{
            border-radius:43%;
            background:rgba(1, 21, 48, 0.6);
            transform:translate(-50%,-70%)rotate(0);
            animation:rotate 10s linear -5s infinite;
            z-index:2;
          }
          @keyframes rotate{
            50%{
              transform:translate(-50%,-73%)rotate(180deg)
            }
            100%{
              transform:translate(-50%,-70%)rotate(360deg)
            }
          }
        }
      }
    }
  }
  }
</style>
