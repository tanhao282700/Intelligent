<template>
  <div class="myChartBox">
    <div :id="'echarts'+id" class="myChart"></div>
  </div>
</template>

<script>
  export default {
    props:['id','time','data','unit','planVal','toVal','lineColor'],
    data () {
      return {
        myChart:null,
      }
    },
    methods:{
      drawLine(){
        let id = this.id;
        let time = this.time;
        let data = this.data;
        let unit = this.unit;
        let planVal = this.planVal;
        let lineColor = this.lineColor;
        // 基于准备好的dom，初始化echarts实例
        // let myChart = this.$echarts.init(document.getElementById('test'))
        let myChart = this.$echarts.init(document.getElementById('echarts'+id))
        let option = {
          dataZoom: [
            {
              show: false,
              realtime: true,
              start: 0,
              end: 100
            },
            {
              type: 'inside',
              realtime: true,
              start: 0,
              end: 100
            }
          ],
          grid:{
            top: '5%',
            left: '2.6%',
            right: '2.6%',
            bottom: '8%',
            containLabel: true
          },
          tooltip:{
            trigger: 'axis',
            formatter: '{c0} {a0}',
            /*position: function (point, params, dom, rect, size) {
                // 固定在顶部
                return [point[0]-22, point[1]-46];

            },*/
            axisPointer: {
              snap: true,
              lineStyle:{
                width:8,
                color:'rgba(61, 138, 247, 0.7)',
                // shadowColor: 'rgba(74,144,226,0.22)',
                // shadowBlur: 10,
                // shadowOffsetY:4
                //opacity:1,
              }
            },
            backgroundColor: "#091e4a",
            confine: true,
            padding: [12, 28],
            textStyle: {
              fontFamily: "PingFangSC-Regular",
              fontSize: '0.24rem',
              color: "#fff"
            },
            extraCssText: 'box-shadow: 0 2px 3px rgba(0, 0, 0, 0.33);border-radius:2px'
          },

          xAxis: {
            type: 'category',
            axisLine: {
              lineStyle: {
                opacity: 0,
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show:true,
              textStyle: {
                color: '#708FBE'
              },
              fontSize: 10,
              formatter: function (value, index) {
                // 格式化成月/日，只在第一个刻度显示年份
                //value.replace(/0/,'i')
                return value.replace(/ /,'\n');
              }

            },
            splitLine: {
              show: false
            },

            data: time
          },
          yAxis: [
            {
              type: 'value',
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: false
              },
              splitLine: {
                show: false,
              },
              splitArea: {
                show: true,
                areaStyle: {
                  color: ['rgba(12,32,58,1)', 'rgba(8,27,52,1)'],
                }
              },
            },
          ],
          series: [
            {
              markLine: {
                label:{
                  position:'start',
                  formatter: (params) => {
                    return params.value+unit
                  }
                },
                lineStyle:{
                  width:2,
                  //type:'solid',
                  color:'#3b89f9'
                },
                data: [
                  {
                    symbol:'none',
                    name: 'Y 轴值为 4.4 的水平线',
                    yAxis: planVal[0],
                    x:'3.2%'
                  },
                  {
                    symbol:'none',
                    name: 'Y 轴值为 4.4 的水平线',
                    yAxis: planVal[1],
                    x:'3.2%'
                  },
                ]
              },

              name:unit,
            data: data,
            type: 'line',
            smooth: true,
            symbol:'circle',
            symbolSize: 10,
            showSymbol:false,
            itemStyle:{
              color:lineColor,
              shadowColor: lineColor,
              shadowBlur: 8,
            },
            lineStyle:{
              color:lineColor,
              shadowColor: lineColor.replace(/\,1\)/,',0.3\)'),
              shadowBlur: 5,
              shadowOffsetX:2,
              shadowOffsetY:6,
            },
          },
          ],
          //color:['#2A5FDE']
        };

        // 绘制图表
        myChart.setOption(option);
        this.myChart = myChart;
      }
    },
    created() {
    },
    mounted() {
      this.drawLine();
    },
    updated(){
      //this.drawLine();
    },
    watch:{
      data:{
        handler(val, oldVal){
          //console.log(val, oldVal);//但是这两个值打印出来却都是一样的
          this.drawLine();
        },
        deep:true
      },
      toVal:{
        handler(val, oldVal){
          console.log(val, oldVal);//但是这两个值打印出来却都是一样的
          this.myChart.dispatchAction({
            type: 'dataZoom',
            dataZoomIndex: 0,      // 可选，dataZoom 组件的 index，多个 dataZoom 组件时有用，默认为 0
            start: val[0],              // 开始位置的百分比，0 - 100
            end: val[1],                // 结束位置的百分比，0 - 100
            // startValue: '10/08',        // 开始位置的数值
            // endValue: '12/08'           // 结束位置的数值
          });
        },
        deep:true
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped="" type="text/less">
  @import '../../../assets/css/comon';
  .myChartBox{
    width: 100%;
    height: 100%;
    position: relative;
    .myChart{
      .vh(453);
      width:13.26rem;

    }
  }

</style>
