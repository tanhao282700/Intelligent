<template>
    <div  class="myChartBox">
           <div :id="echartCirData.id" :style = "echartCirData.style" class="myChart"></div>   
    </div>
</template>

<script>
export default {
  props:['echartCirData'],
  data () {
    return {
        
    }
  },
  computed:{
        
  },
  methods:{
      drawLine(data){
        //   let winHei = document.body.clientWidth;
          let echartCirData = this.echartCirData;
          let legends = [];
          for(let i=0;i<echartCirData.data.length;i++){
              legends.push(echartCirData.data[i].name);
          }
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById(echartCirData.id));
        let option = {
            color :echartCirData.color,
            cursor:'auto',
            legend: {
                icon: 'circle',
                orient: 'vertical',
                right: 40,
                top: 20,
                bottom: 20,
                data:legends,
                textStyle:{
                    color:'#fff',
                    lineHeight:27,
                },
                itemHeight:12,
                itemGap:15,
            },
            tooltip:{
                trigger: 'item',
                backgroundColor:'#fff',
                 formatter:function(params){
                     let str = params.percent+'%';
                      return `<span style = "
                            padding:0 4px;
                            color:${params.color};
                            "
                        >${str}</span>`;
                 }
            }, 
            series: [
                {
                    name:'访问来源',
                    type:'pie',
                    radius : '65%',
                    center: ['35%', '52%'],
                    hoverOffset:10,                   
                    data:echartCirData.data,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                            label:{
                                color:'#fff',                                                
                            },
                        },
                    }
                }
            ]
        };
        // 绘制图表
       myChart.setOption(option); 

        myChart.on('click', function(params){  //移入           
            this.$emit('itemClick',params.data.id,echartCirData.type);
        }.bind(this));
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
.myChartBox{
   height: 100%;
   width: 100%;
   position:relative;  
   .myChart{
      height: 100%;
        width: 100%; 
   }
}

</style>
