<template>
  <div class="energyComponent" v-loading="loading"
       element-loading-background="rgba(0, 0, 0, 0.5)"
       element-loading-spinner="el-icon-loading"
       element-loading-text="拼命加载中">
    <div class="title">
      <span class="titleIcon"></span>
      <span class="txt">能源管理系统</span>
      <img @click="deletCli" src="../../assets/img/home/close.png" alt="">
    </div>
    <div class="con">
      <div class="nergyEcharts" id="nergyEcharts"></div>
      <div class="nergyEcharts2" id="nergyEcharts2">
        <div class="logo"></div>
      </div>
      <div class="button">
        <span :class="{active:current==1}" @click="change(1)">水</span>
        <span :class="{active:current==0}" @click="change(0)">电</span>
        <span :class="{active:current==2}" @click="change(2)">气</span>
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
          loading:false,
          energyChart:{},
          energyChart2:{},
          option:{},
          option2:{},
          current:1,
          data:{
              0:{},  //电
              1:{},  //水
              2:{}   //气
          },
          columnarData:{
              plan:[],
              current:[]
          },
          lineData:{},
          interval:null
        }
    },
    components:{

    },
    mounted(){
        this.initData()
    },
    watch:{
      isResize(){
        this.energyChart.resize()
        this.energyChart2.resize()
      },
      columnarData:{
          handler(newVal,oldVal){
            this.option = {
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
                  data:this.columnarData.current,
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
                  data:this.columnarData.plan,
                  barGap:0,
                  barMinHeight:2,
                  barMaxWidth:24
                }
              ],
              color:["#c4752a","#264e8c"]
            };
            this.option2 = {
              title:{
                text:this.lineData.scoer+'%',
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
                  data : this.lineData.time
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
                  data:this.lineData.data['plan']
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
                  data:this.lineData.data['2017']
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
                  data:this.lineData.data['2018']
                }
              ],
              color:['#3af2e6','#fd9a1b','#f96072']
            };
            this.energyChart.clear()
            this.energyChart2.clear()
            this.energyChart.setOption(this.option,true)
            this.energyChart2.setOption(this.option2,true)
          },
          deep: true
      }
    },
    destroyed(){
      clearInterval(this.interval)
    },
    methods:{
      deletCli(){  //右上角关闭按钮
        this.$emit('deletClick',{self_id:2,componentsName:'EnergyManage'})
      },
        change(type){
          this.current = type
            if(type===1){ //水
                this.columnarData.current = this.data[1].data.Columnar.value
                this.columnarData.plan= this.data[1].data.Columnar.plan

                this.lineData = this.data[1].data.line

            }else if(type === 0){ //电
                this.columnarData.current = this.data[0].data.Columnar.value
                this.columnarData.plan = this.data[0].data.Columnar.plan
              this.lineData = this.data[0].data.line
            }else if(type === 2){  //气
                this.columnarData.current = this.data[2].data.Columnar.value
                this.columnarData.plan = this.data[2].data.Columnar.plan
              this.lineData = this.data[2].data.line
            }
        },
        initData(){
            this.$http.get('/index_pc/pc/model',{self_id:2})
                .then((response)=>{
                if(response.data.code == 0){
                  response.data.data.map((item,index)=>{
                      if(item.type === 0){ //电
                          this.data[0].data = item
                      }else if(item.type === 1){  //水
                          this.data[1].data = item
                      }else if(item.type === 2){  //气
                          this.data[2].data = item
                      }
                  })
                  this.columnarData.current = this.data[1].data.Columnar.value  //初始化水，当前的数据
                  this.columnarData.plan = this.data[1].data.Columnar.plan  //初始化水，计划的数据
                  this.option = {
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
                        data:this.columnarData.current,
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
                        data:this.columnarData.plan,
                        barGap:0,
                        barMinHeight:2,
                        barMaxWidth:24
                      }
                    ],
                    color:["#c4752a","#264e8c"]
                  };

                  this.lineData = this.data[1].data.line  //初始化水，折线数据

                  console.log(this.lineData)
                  this.option2 = {
                    title:{
                      text:this.lineData.scoer+'%',
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
                        data : this.lineData.time
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
                        data:this.lineData.data['plan']
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
                        data:this.lineData.data['2017']
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
                        data:this.lineData.data['2018']
                      }
                    ],
                    color:['#3af2e6','#fd9a1b','#f96072']
                  };
                  this.drawEchart()
                  this.drawEchart2()
                  this.interval = setInterval(()=>{
                      switch (this.current){
                        case 1:
                            this.current = 0
                              break;
                        case 0:
                            this.current = 2
                              break;
                        case 2:
                            this.current = 1
                              break;
                      }
                     this.change(this.current)
                  },5000)
                }else{

                }
            })
        .catch((error)=>{
                console.log(error);
            });
        },
      drawEchart(){
        this.energyChart = this.$echarts.init(document.getElementById("nergyEcharts"));

        // 绘制图表
        this.energyChart.setOption(this.option);
      },
      drawEchart2(){
        this.energyChart2 = this.$echarts.init(document.getElementById("nergyEcharts2"));
        this.energyChart2.setOption(this.option2);
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
      background:rgba(0,0,0,0.15);
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
