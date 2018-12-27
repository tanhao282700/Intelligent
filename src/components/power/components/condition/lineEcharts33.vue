
<!--
曲线图2  针对3年能耗对比图
-->
<template>
  <div class="myChartBox">
    <span v-text="'单位:'+unit" class="unit"></span>
    <div :id="id" class="myChart" :style="{width:wid,height:hei}"></div>
  </div>
</template>

<script>
  export default {
    props:['id','title','unit','style','data','hei','wid'],
    computed:{

    },
    data () {
      return {
      }
    },
    methods:{
      drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById(this.id));
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
            bottom: '2%',
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

          xAxis:{
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
            },
            axisLine:{
              show:false
            }
          },
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
          series: [
            {
              name:this.title,
              data:this.data,
              type: 'line',
              smooth:true,
              symbol: 'circle',
              symbolSize: 9,
              showSymbol: false,
              itemStyle: {
                color: 'rgba(49,216,232,1)',    //圆圈的颜色
                borderColor:'#fff',
                borderWidth:2,
                shadowColor:  'rgba(49,216,232,0.69)',
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
                    offset: 0, color:  'rgba(49,216,232,1)' // 0% 处的颜色
                  }, {
                    offset: 1, color: 'transparent' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                }
              }
            }
          ],
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
  @import '../../../../assets/css/comon.less';
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
