<template>
    <div class="barChart">      
        <div :id="data.id" class="myChart"  :style = "data.style"></div>
    </div>
</template>

<script>
export default {
  props:['data'],
  data () {
    return {

    }
  },
  methods:{
      drawLine(){
        let data = this.data;
        let myChart = this.$echarts.init(document.getElementById(data.id));
        var dataAxis = ['系统派发', '人工派发', '外报维修'];
        var yMax = 500;
        var dataShadow = [];

        for (var i = 0; i < data.length; i++) {
            dataShadow.push(yMax);
        }

        let option = {
            xAxis: {
                data: dataAxis,
                axisLabel: {
                    textStyle: {
                        color: '#fff'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                z: 10
            },
            yAxis: {
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#999'
                    }
                }
            },
            dataZoom: [
                {
                    type: 'inside'
                }
            ],
            series: [
                { // For shadow
                    type: 'bar',
                    itemStyle: {
                        normal: {color: 'transparent'}
                    },
                    barGap:'-100%',
                    barCategoryGap:'40%',
                    data: dataShadow,
                    animation: false
                },
                {
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color:[]   
                        },
                        emphasis: {
                            color: []
                        }
                    },
                    data: data
                }
            ]
        };

        // Enable data zoom when user click bar.
        var zoomSize = 6;
        myChart.on('click', function (params) {
            console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
            myChart.dispatchAction({
                type: 'dataZoom',
                startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
                endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
            });
        });
        myChart.setOption(option);
    }
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
@import '../../../../assets/css/comon.less';
.barChart{
    .vh(220);
    width:100%;
    position:relative; 
    .myChart{
      height:100%;
        width:100%;  
    } 
}

</style>
