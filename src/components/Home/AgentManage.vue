<template>
  <div class="agentComponent" v-loading="loading"
       element-loading-background="rgba(0, 0, 0, 0.5)"
       element-loading-spinner="el-icon-loading"
       element-loading-text="拼命加载中">
    <div class="title">
      <span class="titleIcon"></span>
      <span class="txt">代维管理系统</span>
      <img @click="deletCli" src="../../assets/img/home/close.png" alt="">
    </div>
    <div class="con">
      <div class="echarts" id="echarts"></div>
      <div class="info">
        <div class="day infoC">
          <div class="category">
            <span>日</span>
          </div>
          <div class="percent">
            <span v-text="finishData.dayPercent"></span>
            <span></span>
            <span v-text="agentData.finish.day.finish+'/'+agentData.finish.day.count"></span>
            <span>今日完成率</span>
          </div>
        </div>
        <div class="month infoC">
          <div class="category">
            <span>月</span>
          </div>
          <div class="percent">
            <span v-text="finishData.monthPercent"></span>
            <span></span>
            <span v-text="agentData.finish.month.finish+'/'+agentData.finish.month.count"></span>
            <span>今月完成率</span>
          </div>
        </div>
        <div class="year infoC">
          <div class="category">
            <span>年</span>
          </div>
          <div class="percent">
            <span v-text="finishData.yearPercent"></span>
            <span></span>
            <span v-text="agentData.finish.year.finish+'/'+agentData.finish.year.count"></span>
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
          loading:true,
          agentChart:{},
          agentData:{
            finish:{
                day:{},
              month:{},
              year:{}
            },
          },
          finishData:{}
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
      this.initData()
    },
    methods:{
      deletCli(){  //右上角关闭按钮
          this.$emit('deletClick',{self_id:12,componentsName:'AgentManage'})
      },
      initData(){
        this.$http.get('/index_pc/pc/model',{self_id:12})
          .then((response)=> {
            if(response.data.code == 0){
              this.agentData = response.data.data
              if(this.agentData.finish.day.count==0 && this.agentData.finish.day.finish==0){
                  this.finishData.dayPercent = '100%'
              }else{
                this.finishData.dayPercent = Math.round(this.agentData.finish.day.finish/this.agentData.finish.day.count*100)+'%'
              }
              if(this.agentData.finish.month.count==0 && this.agentData.finish.month.finish==0){
                this.finishData.monthPercent = '100%'
              }else{
                this.finishData.monthPercent = Math.round(this.agentData.finish.month.finish/this.agentData.finish.month.count*100)+'%'
              }
              if(this.agentData.finish.year.count==0 && this.agentData.finish.year.finish==0){
                this.finishData.yearPercent = '100%'
              }else{
                this.finishData.yearPercent = Math.round(this.agentData.finish.year.finish/this.agentData.finish.year.count*100)+'%'
              }
              this.drawEchart()
              this.loading = false
            }else{

            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      drawEchart(){
        let agentChart = this.$echarts.init(document.getElementById("echarts"));
        this.agentChart = agentChart
        let serviceData = this.agentData
        let option = {
          title : {
            text: '工单统计',
            top:'2',
            left:'8%',
            textStyle:{
                color:"#fff",
                fontSize:"12px",
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
            itemWidth: 10,
            itemHeight: 10, // 设置高度
            marginRight:'8%',
            textStyle:{
                color:"#858994",
              fontSize:'10px'
            },
            align:"left",
            right:"8%",
            top:'2%'
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
                    /*color:'#c4752a',*/
                    barBorderRadius:[2, 2, 0, 0],
                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: '#FAD961'
                    }, {
                      offset: 1,
                      color: '#F76B1C'
                    }]),
                    label:{
                      show:true,
                      position:'top',
                      color:"#c9c9c9"
                    }
                  }
              },
              data:[serviceData.count.day.unfinish,serviceData.count.month.unfinish,serviceData.count.year.unfinish],
              barGap:0,
              barMinHeight:2,
              barMaxWidth:24
            },
            {
              name:'工单总数',
              type:'bar',
              itemStyle: {
                  normal: {
                      /*color:'#264e8c',*/
                    barBorderRadius:[2, 2, 0, 0],
                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: '#519BEC'
                    }, {
                      offset: 1,
                      color: '#214893'
                    }]),
                      label:{
                          show:true,
                          position:'top',
                          color:"#c9c9c9"
                      }
                  }
              },
              data:[serviceData.count.day.count,serviceData.count.month.count,serviceData.count.year.count],
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
        width:0.14rem;
        height:0.14rem;
        right:10px;
        top:50%;
        margin-top:-0.07rem;
        display: none;
      }
      &:hover{
        cursor: pointer;
        img{
          display: block;
        }
      }
      .titleIcon{
        width:.16rem;
        height: .16rem;
        background:url(../../assets/img/home/agent.png) no-repeat center 2px;
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
    /*padding:0 5.976%;*/
    display:flex;
    flex-direction: column;
    .echarts{
      height:52%;
      background:rgba(0,0,0,0.1);
    }
    .info{
      flex:1;
      display:flex;
      flex-direction: row;
      .infoC{
        width:0.55rem;
        margin-left:0.19rem;
        .category{
          width:100%;
          padding-bottom:100%;
          position:relative;
          margin-top:0.1rem;
          span{
            width:100%;
            height:100%;
            border-radius:100%;
            border:1px solid rgba(59,137,249,1);
            position:absolute;
            color:rgba(181,215,255,1);
            font-size:0.24rem;
            font-weight:500;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
        .percent{
          height:0.74rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background:linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,0.36) 100%);
          span:nth-child(1){
            color:rgba(74,226,131,1);
            font-size:0.16rem;
            padding-bottom:0.04rem;
            margin-top:0.04rem;
          }
          span:nth-child(2){
            width:0.15rem;
            height:1px;
            background:rgba(74,226,131,1);
            box-shadow:0px 0px 4px 0px rgba(74,226,131,1);
            border-radius:1px;
            margin-bottom:0.08rem;
          }
          span:nth-child(3){
            color:rgba(73,152,240,1);
            font-size:0.1rem;
          }
          span:nth-child(4){
            display: inline-block;
            width:110%;
            color:rgba(181,215,255,1);
            font-size:0.12rem;
            transform: scale(0.7,0.7);
          }
        }
      }
      .infoC:nth-child(2) .percent{
        span:nth-child(1){
          color:rgba(255,164,20,1);
        }
        span:nth-child(2){
          background:rgba(255,164,20,1);
          box-shadow:0px 0px 4px 0px rgba(255,164,20,1);
        }
      }
    }
  }
  }
</style>
