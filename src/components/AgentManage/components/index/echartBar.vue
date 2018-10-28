<template>
    <div class="barChart">      
        <div :id="data.id" class="myChart"  :style = "data.style"></div>
    </div>
</template>

<script>
import echarts from 'echarts';
export default {
  props:['data'],
  data () {
    return {

    }
  },
  methods:{
      drawLine(){
        let _this = this;
        let data = this.data;
        let myChart = this.$echarts.init(document.getElementById(data.id));
        var dataAxis =this.data.xData;
        var yMax = 500;
        var dataShadow = [];

        for (var i = 0; i < data.length; i++) {
            dataShadow.push(yMax);
        }

        let option = {
            grid:{
                left:10,
                top:10,
                bottom:10,
                right:10,
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: true,
                axisLine: {show:false},
                axisTick: {show:false},
                splitLine: {show:false},
                axisLabel: {
                    textStyle: {
                        color: '#708FBE'
                    }
                },
                data:dataAxis
            },
            yAxis: {
                // show:false,
                axisLine: {show:false},
                axisTick: {show:false},
                splitLine: {show:false},
                axisLabel: {show:false},
                splitArea: {
                    show:true,
                    areaStyle: {color:['rgba(142,187,255,.1)','rgba(142,187,255,.05)']},

                },
                type: 'value'
            },
            dataZoom: [
                {
                    type: 'inside'
                }
            ],

            series: [{
                label: {
                    show: true,
                    position: 'insideTop',
                    distance: 5,
                    textStyle:{
                        color:'#fff'
                    },
                    formatter:'{c}'
                },
                type: 'bar',
                barGap:'-100%',
                barCategoryGap:'40%',
                animation: false,
                data:[{
                    value:_this.data.data[0],
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#00C1FF'},
                                    {offset: 1, color: '#008EFE'}
                                ]
                            )
                        },
                        emphasis: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#008EFE'},
                                    {offset: 1, color: '#00C1FF'}
                                ]
                            )
                        }
                    },
                },{
                    value:_this.data.data[1],
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#FF9A6A'},
                                    {offset: 1, color: '#FE5E83'}
                                ]
                            )
                        },
                        emphasis: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#FE5E83'},
                                    {offset: 1, color: '#FF9A6A'}
                                ]
                            )
                        }
                    }
                },{
                    value:_this.data.data[2],
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#FEE7BB'},
                                    {offset: 1, color: '#FFD08E'}
                                ]
                            )
                        },
                        emphasis: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#FFD08E'},
                                    {offset: 1, color: '#FEE7BB'}
                                ]
                            )
                        }
                    }
                }]
            }]
        };

        // Enable data zoom when user click bar.
        var zoomSize = 6;
        myChart.on('click', function (params) {
            myChart.dispatchAction({
                type: 'dataZoom',
                startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
                endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
            });
        });
        myChart.setOption(option);
    }
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
    height:2.1rem;
    width:100%;
    position:relative; 
    .myChart{
      height:100%;
      width:100%;  
    } 
}

</style>
