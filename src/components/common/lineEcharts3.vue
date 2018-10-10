
<!--
曲线图2  针对3年能耗对比图
-->
<template>
  <div class="myChartBox">
    <span v-text="'单位:'+this.datas.unit" class="unit"></span>
    <div :id="this.datas.id" class="myChart" :style="this.datas.style"></div>
    <div class="rightTop" v-show="datas.showMarkL">
      <span class="line"></span>
      <span class="text">最优线</span>
    </div>

    <div class="legend" v-show="datas.showLegends">
      <div class="item" v-for="(v,i) in this.datas.list">
        <img :src="legends[i].img" alt="">
        <span class="text" v-text = "v.name"></span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:['datas','colorIndex'],
    computed:{

    },
    data () {
      return {
        // titShow:true,
        color:[
          {color1:'rgba(53,115,217,1)',color2:'rgba(53,115,217,0.69)'},
          {color1:'rgba(49,216,232,1)',color2:'rgba(49,216,232,0.69)'},
          {color1:'rgba(83,66,232,1)',color2:'rgba(83,66,232,0.69)'},
        ],

        legends:[
          {img:require('../../assets/img/echart/lineB.png')},
          {img:require('../../assets/img/echart/lineG.png')},
          {img:require('../../assets/img/echart/lineZ.png')},

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
        let colorIndex = this.colorIndex;
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
              color: colorIndex!=undefined?this.color[colorIndex].color1:this.color[i].color1,    //圆圈的颜色
              borderColor:'#fff',
              borderWidth:2,
              shadowColor:  colorIndex!=undefined?this.color[colorIndex].color2:this.color[i].color2,
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
                  offset: 0, color:  colorIndex!=undefined?this.color[colorIndex].color1:this.color[i].color1 // 0% 处的颜色
                }, {
                  offset: 1, color: 'transparent' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              }
            }
          };

          if (datas.showMarkL==true){
            obj.markLine = {
              silent:true,
              label:{
                position:'start',
                formatter: (params) => {
                  return params.value+datas.unit
                }
              },
              lineStyle:{
                width:1,
                //type:'solid',
                color:'#fff',
                //opacity:0
              },
              data: [
                {
                  symbol:'none',
                  name: 'Y 轴值为 x 的水平线',
                  yAxis: datas.markLineVal,
                  x:'4.5%'
                },
              ]
            }
          }
          series.push(obj);


          let obj2 ={
            position:'top',
            type: 'time',//绝望，类目轴没有刻度线
            axisLabel: {
              show:true,
              textStyle: {
                color: '#708FBE'
              },

              fontSize: 10,
              formatter: function (value, index) {
                // 格式化成月/日，只在第一个刻度显示年份
                var date = new Date(value);
                let hours = date.getHours()<10?'0'+date.getHours():''+date.getHours();
                let minute = date.getMinutes()<10?'0'+date.getMinutes():''+date.getMinutes();
                var texts = [hours,minute];
                return texts.join(':');
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
            top: '10%',
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
    updated(){
      this.drawLine();
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
    .unit{
      position: absolute;
      left: 0.15rem;
      top: 0;
      font-family: PingFangSC-Regular;
      font-size: 0.12rem;
      font-weight: normal;
      font-stretch: normal;
      line-height: 1;
      letter-spacing: 0px;
      color: #008aff;
    }

    .rightTop{

      .vh(24);
      position: absolute;
      right: 0.17rem;
      .vhTop(-24);
      display: flex;
      align-items: center;
      .line{
        display: inline-block;
        width: 0.2rem;
        height: 0px;
        border-bottom: 1px dashed #fff;
      }
      .text{
        margin-left: 6px;
        font-family: PingFangSC-Regular;
        font-size: 0.12rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: 0px;
        color: #ffffff;
      }
    }

    .legend{
      .vh(24);
      position: absolute;
      right: 0.17rem;
      .vhTop(-24);
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

</style>
