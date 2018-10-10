
<!--
曲线图2  针对3年能耗对比图
-->
<template>
  <div class="myChartBox">
    <div class="head" v-show="titShow">
      <div v-text="this.datas.title" class="title"></div>
      <div class="legend">
        <div class="item" v-for="(v,i) in this.datas.list">
          <img :src="legends[i].img" alt="">
          <span class="text" v-text = "v.name"></span>
        </div>
      </div>
    </div>
    <div class="body">
      <span v-text="'单位:'+this.datas.unit" class="unit"></span>
      <div :id="this.datas.id" class="myChart" :style="this.datas.style"></div>
    </div>
  </div>
</template>

<script>
  export default {
    props:['datas'],
    computed:{
      titShow(){
        let res = true;
        if(this.datas.titShow!==undefined){
          if(!this.datas.titShow){
            res = false;
          }
        }
        return res;
      }
    },
    data () {
      return {
        num:0,
        // titShow:true,
        legends:[
          {img:require('../../assets/img/echart/lineZ.png')},          
          {img:require('../../assets/img/echart/lineG.png')},
          {img:require('../../assets/img/echart/lineB.png')},            
        ],
        color:[
            {color1:'rgba(69,50,138,1)',color2:'rgba(69,50,138,0.69)'},            
            {color1:'rgba(46,204,223,1)',color2:'rgba(46,204,223,0.69)'},
            {color1:'rgba(55, 42, 191,1)',color2:'rgba(55, 42, 191,0.69)'},
          ],        
      }
    },
    methods:{
      drawLine(){
        // console.log(this.datas)
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById(this.datas.id));

        let series=[],xAxis = [];
        let datas = this.datas;
         let lens = datas.list.length;
         for(let i=0;i<lens;i++){
            let obj ={
              name:datas.list[i].name,
              data:datas.list[i].data,
              type: 'line',
              smooth:true,
              symbol: 'circle',
              symbolSize: 9,
              showSymbol: false,
              itemStyle: {
                color: this.color[i].color1,    //圆圈的颜色
                borderColor:'#fff',
                borderWidth:2,
                shadowColor:  this.color[i].color2,
                shadowBlur: 1,
              },
              areaStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color:  this.color[i].color1 // 0% 处的颜色
                  }, {
                    offset: 1, color: 'transparent' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                }
              }
            }; 
            series.push(obj);


            let obj2 ={
              position:'top',            
              type: 'time',//绝望，类目轴没有刻度线
              axisLabel: {
                show:true,
                textStyle: {
                  color: '#708FBE'
                },
                inside:true,
                fontSize: 10,
                formatter: function (value, index) {
                    // 格式化成月/日，只在第一个刻度显示年份
                    var date = new Date(value);
                    var texts = [(date.getMonth() + 1), date.getDate()];                  
                    return texts.join('/');
                } 
              },
              splitLine:{
                lineStyle:{
                  color:'rgba(150,150,150,0.1)'
                }
              }
            };
            xAxis.push(obj2);
         }
        let tops  = this.titShow!==undefined && !this.titShow?'5':'77';
        let option = {     
          dataZoom: [
            {
              show: false,
            },
            {
              type: 'inside',
              realtime: true,
              start: 0,
              end: 100
            }
          ],
          grid:{
            top: tops,
            left: '0%',
            right: '0%',
            bottom: '0%',
            containLabel: true
          },
          tooltip:{
            trigger: 'axis',
            axisPointer: {
              snap: true,
              lineStyle:{
                opacity:1,
                color:'#fff'
              }
            },
            backgroundColor: "#fff",
            formatter:function(params){
                let attrs = params;
                let span0 = ``;
                let lens = attrs.length;
                for(let i = 0 ;i<lens;i++){
                  let span = `<span style = "padding:0 4px;color:${params[i].color}">${params[i].value[1]}</span>`;
                    span0 += span;
                }
                
              return `<span>${span0}</span>`;
            },
            confine: true,
            padding: [6, 12],
            textStyle: {
              fontFamily: "PingFangSC-Regular",
              fontSize: '0.14rem',
              color: "#000"
            },
            extraCssText: 'box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.5);border-radius:4px'
          },

          xAxis:xAxis,
          yAxis: {
            type: 'value',
            axisLine:{
              show:false
            },
            axisTick:{
              show:false
            },
            axisLabel:{
              show:false
            },
            splitLine:{
              show:false,
            },
            splitArea:{
              show:false,
            },
          },
          series: series,
        };
        let _this = this;
        // 绘制图表
        myChart.setOption(option);
      },

    },
    created() {
    },
    mounted() {
      this.drawLine();
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped="" type="text/less">
@import '../../assets/css/comon.less';
  .myChartBox{
    width: 100%;
    height:100%;
    background-color: transparent;
    position: relative;
    .head{
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      justify-content: flex-start;
      width: 100%;
      .vh(40);
      background-color: rgba(0, 0, 0, 0.2);
      padding: 0 0.16rem;
      .title{
        display: flex;
        align-items: center;
        width: 50%;
        font-family: PingFangSC-Medium;
        font-size: 0.16rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: 0px;
        color: #008aff;
      }
      .legend{
        width: 50%;
        display: flex;
        justify-content: flex-end;
        .item{
          display: flex;
          align-items: center;
          img{
            margin-left: 0.2rem;
            display: inline-block;
            width: 0.14rem;
            height: 0.11rem;
          }
          .text{
            margin-left: 0.06rem;
            font-family: PingFangSC-Regular;
            font-size: 0.12rem;
            font-weight: normal;
            font-stretch: normal;
            line-height: 1;
            letter-spacing: 0px;
            color: #ffffff;
          }
        }
      }
    }
    .body{
      width: 100%;
      height: 100%;
      position: relative;
      .unit{
        position: absolute;
        left: 0.16rem;
        .vhTop(53);
        font-family: PingFangSC-Regular;
        font-size: 0.12rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: 0px;
        color: #008aff;
      }
      .myChart{
        height:100%;
        width:100%;

      }
    }

  }

</style>
