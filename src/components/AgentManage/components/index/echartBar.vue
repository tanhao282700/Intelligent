<template>
    <div class="myChartBox">      
        <div :id="data.id" class="myChart"  :style = "data.style"></div>
    </div>
</template>

<script>
export default {
  props:['data'],
  data () {
    return {
        color:[
            {color1:'#00c1ff',color2:'#008efe'},
            {color1:'#ff9a6a',color2:'#fe5e83'},
            {color1:'#fee7bb',color2:'#ffd08e'},
        ]
    }
  },
  methods:{
      drawLine(){
          let data = this.data;
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById(data.id));

        let series = [];
        for(let i=0;i<data.data.length;i++){
            let obj = {
                type: 'bar',
                data: data.data[i],
                stack:1,
                barMaxWidth:'50%',
                label: {                   
                    normal: {
                        show: true,
                        textBorderColor:'rgba(0,0,0,0.2)',
                        position: 'insideTop',
                        formatter:function(val){
                           let res = '';
                            if(val.value!=0){
                               res = Math.floor(Number(val.value*100)/Number(data.total)) +'% '+val.value;
                            }
                            return res;
                        },
                    }
                },
                itemStyle: {
                        normal: {
                            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: this.color[i].color1
                            }, {
                                offset: 1,
                                color: this.color[i].color2
                            }])
                        },
                        emphasis: {
                            barBorderWidth: 1,
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            shadowColor: 'rgba(0,0,0,0.5)'
                        },
                    },
            };
            series.push(obj)
        }

        let option = {
            xAxis: {
                
                type: 'category',
                nameTextStyle:{
                    color:'#fff',
                    fontSize:'0.12rem'
                },
                axisLine:{
                    show:false,
                    lineStyle:{
                        color:'#fff'
                    }
                },
                splitLine:{
                    show:true,
                    lineStyle:{
                        color:'rgba(45,148,240,0.2)'
                    }
                },
                axisTick:{
                    show:false,
                },
                splitArea:{
                    show:true,
                    areaStyle:{
                        color:['rgba(0,0,0,0)','rgba(0,0,0,0.1)']
                    }
                },
                data: data.xData
            },
            grid:{
                left:0,
                top:0,
                right:0,
                bottom:'13%'
            },
            yAxis: {
                type: 'value',
                axisLine:{
                    show:true,
                    lineStyle:{
                         color:'rgba(45,148,240,0.2)'
                     }
                },
                splitLine:{
                     show:true,
                     lineStyle:{
                         color:'rgba(45,148,240,0.2)'
                     },
                     interval:35
                }
            },
            series:series
        };
        // 绘制图表
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
.myChartBox{
    .vh(220);
    width:100%;
    position:relative; 
    .myChart{
      height:100%;
        width:100%;  
    } 
}

</style>
