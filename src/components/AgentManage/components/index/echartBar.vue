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
        newData:{}
    }
  },
  methods:{
      drawLine(data){
        //console.log(data);
        var totleNum = data.total;
        let _this = this;
        let myChart = this.$echarts.init(document.getElementById(data.id));
        var dataAxis =data.xData;
        var yMax = 500;
        var dataShadow = [];
        var colors = [['#00C1FF','#008EFE','#008EFE','#00C1FF'],['#FF9A6A','#FE5E83','#FE5E83','#FF9A6A'],['#FEE7BB','#FFD08E','#FFD08E','#FEE7BB']]
        let barData = [];
        for (var i = 0; i < dataAxis.length; i++) {
            dataShadow.push(yMax);
            barData.push({
                    value:_this.data.data[i],
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color:colors[i][0] },
                                    {offset: 1, color:colors[i][1] }
                                ]
                            )
                        },
                        emphasis: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: colors[i][2]},
                                    {offset: 1, color: colors[i][3]}
                                ]
                            )
                        }
                    },
                });
        }

        let option = {
            grid:{
                left:10,
                bottom:10,
                right:10,
                top:10,
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
                    formatter:function(params){
                       // console.log(params);
                        return ((params.value / totleNum)*100).toFixed(2)  + "% " + params.value; 

                    }//'{c}'
                },
                type: 'bar',
                barGap:'-100%',
                barCategoryGap:'40%',
                animation: false,
                data:barData
            }]
        };

        // Enable data zoom when user click bar.
        var zoomSize = 6;
        // myChart.on('click', function (params) {
        //     myChart.dispatchAction({
        //         type: 'dataZoom',
        //         startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
        //         endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
        //     });
        // });
        myChart.setOption(option);
    }
  },
  watch:{
    data:{
        handler(newValue, oldValue) {
　　　　　   this.drawLine(newValue)
    　　},
    　　deep: true
    }
  },
  mounted() {
       this.drawLine(this.data);
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
