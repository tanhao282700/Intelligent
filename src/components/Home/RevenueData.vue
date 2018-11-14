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
            <div class="mounts" :style="'width:'+ percentData+'%;'">
              <span v-text="percentData+'%'"></span>
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
              <div class="info">
                <span>入住率</span>
                <span v-text="occupancy"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  /*import "echarts-liquidfill"*/
  import axios from 'axios';

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
          occupancy:'',
          shui:{},
          dian:{},
          qi:{},
          revenInterval:null,
          currentTypeId:1,
          percentData:''
        }
    },
    components:{

    },
    mounted(){
      this.initData()
    },
    watch:{
      isResize(){
        this.revenueCharts2.resize()
        /*this.revenueCharts3.resize()*/
      }
    },
    destroyed(){
      clearInterval(this.revenInterval)
    },
    methods:{
      deletCli(){  //右上角关闭按钮
        this.$emit('deletClick',{self_id:17,componentsName:'RevenueData'})
      },
        initData(){
          /*axios.defaults.headers.common['Authorization'] = '1_1_1';*/
          this.$http.get('/index_pc/pc/model',{self_id:17})
             .then((response)=>{
               if(response.data.code == 0){
                 console.log(response)
                 response.data.data.data.map((item)=>{
                   for(let i=0;i<item.time.length;i++){
                     item.time[i] = item.time[i].split('/')[1]
                   }
                 })
                 this.shui = response.data.data.data[1]
                this.dian = response.data.data.data[0]
                this.qi = response.data.data.data[2]
                this.percentData = response.data.data.data[1].energy  //初始化水的占比
            this.occupancy = response.data.data.occupancy + "%";
                this.drawEchart2(this.shui)
                this.loading = false
                this.revenInterval = setInterval(()=>{
                    this.revenueCharts2.clear()
                    let data = {}
                    switch (this.currentTypeId){
                      case 0:
                        this.currentTypeId = 1
                        data = this.shui
                        this.percentData = this.shui.energy
                        break;
                      case 1:
                        this.currentTypeId = 2
                        data = this.qi
                        this.percentData = this.qi.energy
                        break;
                      case 2:
                        this.currentTypeId = 0
                        data = this.dian
                        this.percentData = this.dian.energy
                        break;
                    }
                    this.drawEchart2(data)
                  },5000)
               }else{

               }
             })
            .catch((error)=>{
                    console.log(error);
                });
      },
      drawEchart2(serviceData){
        this.revenueCharts2 = this.$echarts.init(document.getElementById("revenueEcharts2"))
        let revData = serviceData
        /*revData.time.map((item,index)=>{
          revData.time[index] = item.split('/')[1]
        })*/
        let title = ''
        if(revData.type == 0){
            title = '电'
        }else if(revData.type == 1){
          title = '水'
        }else{
          title = '气'
        }
        let option2 = {
          title:{
            text:title,
            textStyle:{
              fontSize:10,
              color:'white',
            },
            backgroundColor:'rgba(0, 12, 39, 0.4)'
          },
          tooltip : {
            trigger: 'axis',
            position: function (pos, params, dom, rect, size) {
              // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
              var obj = {top: 60};
              obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
              return obj;
            }
          },
          grid: {
            top: 20,
            bottom: 20,
            left:10,
            right:10
          },
          legend: {
            data:['每餐位用能均值','每房用能均值'],
            orient:'horizontal',
            right:0,
            padding:0,
            textStyle:{
              color:'#eeeff1',
              fontSize:8,
            },
            top:6,
            itemGap:0,
            itemWidth:14,
            width:200,
            padding:1
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
              data : revData.time
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
              data:revData.restaurant
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
              data:revData.Room
            }
          ],
          color:['#3af2e6','#f96074']
        };
        this.revenueCharts2.setOption(option2);
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
        width: .16rem;
        height: .16rem;
        background:url(../../assets/img/home/revenue.png) no-repeat center;
        background-size:100% auto;
        margin-right:12px;
      }
      .txt{
        color:white;
        font-size:.12rem;
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
          font-size: .2rem;
          transform: scale(.5) translate(-50%,0);
        }
        .percent{
          height:37.143%;
          background:rgba(0,12,39,0.4);
          border-radius:4px;
          display: flex;
          flex-direction: row;
          .mounts{
            transition: all .4s ease-in;
            width:0;
            background:#29dfd3;
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
            position:relative;
            span{
              display: inline-block;
              position:absolute;
              right:-14px;
              bottom:-20px;
              background:rgba(1, 21, 48, 0.3);
              /*width:27px;
              height:18px;*/
              /*background:url(../../assets/img/home/percent.png) no-repeat left top;
              background-size:cover;*/
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
          opacity:.4;
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
        font-size: .12rem;
      }
      .pic{
        flex:1;
        position:relative;
        .info{
          display: flex;
          flex-direction: column;
          position:absolute;
          /*width:56px;*/
          width:100%;
          height:48px;
          color:white;
          transform: translate(-50%,-50%);
          left: 50%;
          top: 50%;
          z-index: 10;
          text-align: center;
          span:first-child{
            font-size:12px;
            margin-left:-3px;
          }
          span:last-child{
            font-size:20px;
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
          width:100%;
          height:100%;
          overflow:hidden;
          border:4px solid #152b43;
          border-radius:50%;
          position: relative;
          .wave{
            position:relative;
            width:100%;
            height:100%;
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
