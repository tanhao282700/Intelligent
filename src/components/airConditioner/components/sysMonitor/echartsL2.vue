<template>
  <div class="echartBox">
    <div id="test" class="myChart" style="height: 33.51vh;width: 12.75rem"></div>
    <span v-show="false">{{data[1].data}}</span>
  </div>
</template>

<script>
  export default {
    props:['data'],
    name: "echartsL2",
    data(){
      return{
      }
    },
    methods:{
      drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('test'));
        let option = {
          legend:{
            data:[this.data[0].year.toString(),this.data[1].year.toString()],
            textStyle:{
              color:'#f8fbff',
              fontSize:10,
            },
            top:'4%',
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
              console.log(params)
              let attrs = params;
              let span0 = ``;
              let lens = attrs.length;
              for(let i = 0 ;i<lens;i++){
                let span = `<span style = "padding:0 4px;color:${params[i].color}">${params[i].value[0]+':00'+'：'+params[i].value[1]}</span>`;
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
          grid: {
            top:'16%',
            left: '3.4%',
            right: '3.4%',
            bottom: '2%',
            containLabel: true
          },

          xAxis: [{
            position:'top',
            offset:0,
            type: 'time',
            show:false
          },
            {
              position:'bottom',
              offset:0,
              type: 'time',
              splitLine: {
                show: false
              },
              axisLine:{
                show:false
              },
              axisTick:{
                show:false
              },
              axisLabel:{
                color: function (value, index) {
                  return value >= 0 ? '#f8fbff' : '#f8fbff';
                },
                fontSize:10,
                formatter: function (value, index) {
                  // 格式化成月/日，只在第一个刻度显示年份

                  let date = new Date(value);
                  let month = (date.getMonth()+1)<10?('0'+(date.getMonth()+1)):(''+(date.getMonth()+1));
                  let day = date.getDate()<10?('0'+date.getDate()):(''+date.getDate());
                  let hours = date.getHours()<10?('0'+date.getHours()):(''+date.getHours());
                  //let minutes = date.getMinutes()<10?('0'+date.getMinutes()):(''+date.getMinutes());
                  //return year+'-'+month+'-'+day+' '+hours+':'+minutes;
                  return month+'-'+day+' '+hours+':00'
                }
              }
            },
          ],
          yAxis: {
            show:true,
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
            splitArea:{
              show:true,
              areaStyle:{
                color:['rgba(142,187,255,0.05)','rgba(142,187,255,0.08)'],
              }
            },
            splitLine:{
              show:false
            }
          },
          series:[
            {
              name:this.data[0].year.toString(),
              type: 'line',
              smooth: true,
              symbol: 'circle',
              symbolSize: 9,
              showSymbol: false,
              itemStyle:{
                color:'rgba(229,81,80,1)',
                shadowColor: 'rgba(229,81,80,1)',
                shadowBlur: 1,
              },
              lineStyle:{
                color: 'rgba(229,81,80,1)',
                shadowColor: 'rgba(229,81,80,0.5)',
                shadowBlur: 5,
                shadowOffsetX:2,
                shadowOffsetY:6
              },
              data:this.data[0].data
            },
            {
              name:this.data[1].year.toString(),
              type: 'line',
              smooth: true,
              symbol: 'circle',
              symbolSize: 9,
              showSymbol: false,
              itemStyle:{
                color:'rgba(45,240,224,1)',
                shadowColor: 'rgba(45,240,224,1)',
                shadowBlur: 1,
              },
              lineStyle:{
                color: 'rgba(45,240,224,1)',
                shadowColor: 'rgba(45,240,224,0.5)',
                shadowBlur: 5,
                shadowOffsetX:2,
                shadowOffsetY:6
              },
              xAxisIndex:1,
              data:this.data[1].data
            },
          ]
        };

        // 绘制图表
        myChart.setOption(option);
      },
    },
    mounted(){
      //this.drawLine();

      // setTimeout(()=>{
      //   this.drawLine();
      //   console.log(this.data)
      // },10000)

    },
    updated(){
      this.drawLine();
    },

  }
</script>

<style lang="less" scoped type="text/less">

</style>
