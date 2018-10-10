<template>
    <div class="myChartBox">      
        <div :id="echartCirData.id" class="myChart"></div>
    </div>
</template>

<script>
export default {
  props:['echartCirData'],
  data () {
    return {
    }
  },
  methods:{
      drawLine(){
          let echartCirData = this.echartCirData;
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById(this.echartCirData.id));
        let size = [0, '66%'];
        if(echartCirData.size!==undefined){
            size = echartCirData.size;
        }
        let option = {
            color :this.echartCirData.color,
            cursor:'auto',
            series: [
                {
                    name:'访问来源',
                    type:'pie',
                    radius: size,
                    avoidLabelOverlap: false,
                    hoverOffset:10,
                   label: {
                        normal: {
                            position: 'inner'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:this.echartCirData.data
                }
            ]
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
