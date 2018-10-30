<template>
  <div class="conditioningComponent" v-loading="loading"
       element-loading-background="rgba(0, 0, 0, 0.5)"
       element-loading-spinner="el-icon-loading"
       element-loading-text="拼命加载中">
    <div class="title">
      <span class="titleIcon"></span>
      <span class="txt">中央空调系统</span>
      <img @click="deletCli" src="../../assets/img/home/close.png" alt="">
    </div>
    <div class="con">
      <div class="con-top">
        <div class="conditionEcharts1" ref="conditionEcharts1" id="conditionEcharts1"></div>
        <div class="conditionEcharts2" ref="conditionEcharts2" id="conditionEcharts2"></div>
      </div>
      <div class="conditionEcharts3">
        <div class="type">
          <div class="name">系统模式</div>
          <div class="typs system">
            <span class="active">自动</span>
            <span>手动</span>
          </div>
        </div>
        <div class="type">
          <div class="name">主机模式</div>
          <div class="typs host">
            <span class="active">制热</span>
            <span>制冷</span>
          </div>
        </div>
      </div>
      <div class="conditionEcharts4" @mouseenter="enter(1)" @mouseleave="mouseleave(1)">
        <div class="broadL">系<br>统<br>参<br>数</div>
        <div class="broadR">
          <div class="long" :class="{'anim':animate1}">
            <div class="item" v-for="item in broadOneList">
              <span>{{item.name}}</span>
              <span v-if="item.value==0">正常</span>
              <span v-if="item.value==1">异常</span>
            </div>
          </div>
        </div>
      </div>
      <div class="conditionEcharts4" @mouseenter="enter(2)" @mouseleave="mouseleave(2)">
        <div class="broadL">设<br>备<br>监<br>测</div>
        <div class="broadR">
          <div class="long" :class="{'anim':animate2}">
            <div class="item" v-for="item in broadTwoList">
              <span>{{item.name}}</span>
              <span v-if="item.value==0">正常</span>
              <span v-if="item.value==1">异常</span>
            </div>
          </div>
        </div>
      </div>
      <div class="conditionEcharts5">
        <span @click="changeType(0)" v-text="conditionData[0].name" :class="{'active':types==0}"></span>
        <span @click="changeType(1)" v-if="conditionData[1]" :class="{'active':types==1}" v-text="conditionData[1].name"></span>
      </div>
      </div>
  </div>
</template>
<script>
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
          animate1:false,
          animate2:false,
          loading:false,
          isSystemHover:false,
          isEquipmentHover:false,
          broadOneList:[],
          broadTwoList:[],
          conditionInterval:null,
          conditionData:[{name:''},{name:""}],
          types:0  // 初始化显示第一个按钮
        }
    },
    components:{

    },
    mounted(){

      this.initData()
    },
    watch:{
      isResize(){
        /*this.revenueCharts1.resize()*/
      }
    },
    beforeDestroy() {
      clearInterval(this.conditionInterval);
    },
    methods:{
      changeType(types){
        $("#conditionEcharts1 canvas").remove()
        $("#conditionEcharts2 canvas").remove()
        this.types = types;
        clearInterval(this.conditionInterval);
        if(types == 0){
            this.broadOneList = this.conditionData[0].data3
          this.broadTwoList = this.conditionData[0].data4
          if(this.conditionData[0].data1.length == 1){
            this.drawEchart1(this.conditionData[0].data1)
          }
          if(this.conditionData[0].data1.length == 2){
            this.drawEchart1(this.conditionData[0].data1)
            this.drawEchart2(this.conditionData[0].data1)
          }
        }
        if(types == 1){
          this.broadOneList = this.conditionData[1].data3
          this.broadTwoList = this.conditionData[1].data4
          if(this.conditionData[1].data1.length == 1){
            this.drawEchart1(this.conditionData[1].data1)
          }
          if(this.conditionData[1].data1.length == 2){
            this.drawEchart1(this.conditionData[0].data1)
            this.drawEchart2(this.conditionData[1].data1)
          }
        }
        this.conditionInterval = setInterval(this.scroll,5000);
      },
      deletCli(){  //右上角关闭按钮
        this.$emit('deletClick',{self_id:1,componentsName:'Conditioning'})
      },
      initData(){
        /*axios.defaults.headers.common['Authorization'] = '101_101_101';*/
        this.$http.get('/index_pc/pc/model',{self_id:11})
            .then((response)=>{
              /*console.log(response)*/
              this.broadOneList = response.data.data[0].data3
              this.broadTwoList = response.data.data[0].data4
              this.conditionData = response.data.data
              this.conditionData[1] =  {
                "data1": [
                  {
                    "name": "系统COP",
                    "value": "0"
                  },{
                    "name": "测试COP",
                    "value": "0"
                  }
                ],
                "data2": [
                  {
                    "name": "一键启停",
                    "param": "",
                    "value": "0"
                  }
                ],
                "data3": [
                  {
                    "name": "啊实打实的",
                    "unit": "",
                    "value": "0"
                  },
                  {
                    "name": "阿瑟的",
                    "unit": "",
                    "value": "0"
                  },
                  {
                    "name": "阿文档发玩",
                    "unit": "",
                    "value": "0"
                  },
                  {
                    "name": "阿瑟的",
                    "unit": "",
                    "value": "0"
                  },
                  {
                    "name": "下的车撒旦法",
                    "unit": "",
                    "value": "0"
                  },
                  {
                    "name": "还让他",
                    "unit": "",
                    "value": "0"
                  },
                  {
                    "name": "冷却水总管回水温度",
                    "unit": "",
                    "value": "0"
                  },
                  {
                    "name": "1#冷冻水泵运行频率",
                    "unit": "",
                    "value": "0"
                  },
                  {
                    "name": "2#冷冻水泵运行频率",
                    "unit": "",
                    "value": "0"
                  },
                  {
                    "name": "1#冷却泵运行频率",
                    "unit": "",
                    "value": "0"
                  },
                  {
                    "name": "2#冷却泵运行频率",
                    "unit": "",
                    "value": "0"
                  }
                ],
                "data4": [
                  {
                    "name": "草泥马",
                    "param": "",
                    "value": "0"
                  },
                  {
                    "name": "哈哈哈",
                    "param": "",
                    "value": "0"
                  }
                ],
                "name": "测试"
              }
              this.conditionInterval = setInterval(this.scroll,5000);
              if(this.conditionData[0].data1.length == 1){
                this.drawEchart1(this.conditionData[0].data1)
              }
              if(this.conditionData[0].data1.length == 2){
                this.drawEchart1(this.conditionData[0].data1)
                this.drawEchart2(this.conditionData[0].data1)
              }
            })
            .catch()
      },
      scroll(){
        if(!this.isSystemHover){
          this.animate1 = true;
          console.log(111)
          setTimeout(()=>{
            this.broadOneList.push(this.broadOneList[0])
            this.broadOneList.shift()
            this.animate1 = false
          },500)
        }
        if(!this.isEquipmentHover){
          this.animate2 = true;
          setTimeout(()=>{
            this.broadTwoList.push(this.broadTwoList[0])
            this.broadTwoList.shift()
            this.animate2 = false
          },500)
        }
      },
      enter(type){
          if(type == 1){
            this.isSystemHover = true
          }else{
            this.isEquipmentHover = true
          }
      },
      mouseleave(type){
        if(type == 1){
          this.isSystemHover = false
        }else{
          this.isEquipmentHover = false
        }
      },
      drawEchart1(data){
        let width = this.$refs.conditionEcharts1.clientWidth
        let option1 = {
          width:width, //canvas宽度
          height:width, //canvas高度
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
            text:data[0].name,
            color:"#ffffff",
            size:"14"
          },
          dataValue:{
            text:data[0].value,
            color:"#F7A51C",
            size:"20"
          }
        }
        // 绘制图表
        $("#conditionEcharts1").circleChart(option1);
      },
      drawEchart2(data){
        let width = this.$refs.conditionEcharts1.clientWidth
        let option2 = {
          width:width, //canvas宽度
          height:width, //canvas高度
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
            text:data[1].name,
            color:"#ffffff",
            size:"14"
          },
          dataValue:{
            text:data[1].value,
            color:"#F7A51C",
            size:"20"
          }
        }
        // 绘制图表
        $("#conditionEcharts2").circleChart(option2);
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .conditioningComponent{
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
        background:url(../../assets/img/home/air-conditioner.png) no-repeat left 2px;
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
      margin-top:1.623%;
      background:rgba(0,0,0,0.15);
      opacity:.8;
      /*height:29.22%;*/
      flex:1;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      #conditionEcharts1{
        flex:1;
        height:100%;
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: center;
        /*width:45%;*/
      }
      #conditionEcharts2{
        flex:1;
        height:100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        /*width:45%;*/
      }
    }
    .conditionEcharts3{
      height:14.123%;
      background:rgba(0,0,0,0.15);
      margin-top:1.623%;
      display: flex;
      padding:0 2.272%;
      .type{
        flex:1;
        display: flex;
        flex-direction: column;
        font-size:12px;
        color:white;
        .name{
          height:39%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .typs{
          background:rgba(0,12,39,0.4);
          height:52.87%;
          width:98%;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          padding:1% 4% 1% 4%;
          display: flex;
          span{
            flex:1;
            text-align: center;
          }
        }
        .system .active{
          background:#0089fd;
        }
        .host .active{
          background:#f56e6a;
        }
      }
    }
    .conditionEcharts4{
      height:60px;
      margin-top:1.623%;
      display: flex;
      flex-direction: row;
      .broadL{
        background:rgba(0,0,0,0.3);
        width:12.64%;
        color:white;
        font-size:12px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right:1%;
      }
      .broadR{
        flex:1;
        background:rgba(0,0,0,0.3);
        opacity: .8;
        overflow:hidden;
        padding:0 4.6%;
        .item{
          height:20px;
          color:white;
          font-size:12px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          span:first-child{
            display: inline-block;
            max-width: 70%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          span:last-child{
            color:#61b2b6;
          }
        }
        .anim{
          transition:all 0.5s;
          margin-top:-20px;
        }
      }
    }
    .conditionEcharts5{
      height:10.55%;
      margin-top:1.623%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      span{
        &:hover{
          cursor: pointer;
        }
        display: inline-block;
        padding:2px 12px;
        color:#b1c6e1;
        font-size:14px;
        background:#162951;
        border-radius:4px;
        &:first-child{
          margin-right:16px;
        }
      }
      .active{
        background:#73a4f0;
        color:white;
      }
    }
  }
  }
</style>
