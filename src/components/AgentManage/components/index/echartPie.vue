<template>
    <div class="pieChart">      
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
        let color = this.color;
        let myChart = this.$echarts.init(document.getElementById(data.id));
        var dataStyle = {
            normal: {
                label: {show:false},
                labelLine: {show:false}
            }
        };
        var placeHolderStyle = {
            normal : {
                color: 'rgba(0,0,0,0)',
                label: {show:false},
                labelLine: {show:false}
            },
            emphasis : {
                color: 'rgba(0,0,0,0)'
            }
        };
        let option = {
            color:['#FA6074','#FFA414','#4AE283','#0082F1'],
            title: {
                x: 'center',
                y: 'center',
                itemGap: 10,
                textStyle : {
                    color : 'rgba(30,144,255,0.8)',
                    fontFamily : '微软雅黑',
                    fontSize : 35,
                    fontWeight : 'bolder'
                }
            },
            tooltip : {
                show: true,
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient : 'vertical',
                x : document.getElementById(data.id).offsetWidth / 2,
                y : 45,
                itemGap:12,
                data:['88%的人表示过的不错','79%的人表示生活压力很大','68%的人表示“我姓曾”','78%的人表示“我姓曾”']
            },
            series : [
                {
                    name:'1',
                    type:'pie',
                    clockWise:false,
                    radius : [29, '58%'],
                    itemStyle : dataStyle,
                    data:[
                        {
                            value:68,
                            name:'68%的人表示过的不错'
                        },
                        {
                            value:32,
                            name:'invisible',
                            itemStyle : placeHolderStyle
                        }
                    ]
                },
                {
                    name:'2',
                    type:'pie',
                    clockWise:false,
                    radius : [34, '68%'],
                    itemStyle : dataStyle,
                    data:[
                        {
                            value:29, 
                            name:'29%的人表示生活压力很大'
                        },
                        {
                            value:71,
                            name:'invisible',
                            itemStyle : placeHolderStyle
                        }
                    ]
                },
                {
                    name:'3',
                    type:'pie',
                    clockWise:false,
                    radius : [39, '78%'],
                    itemStyle : dataStyle,
                    data:[
                        {
                            value:3, 
                            name:'3%的人表示“我姓曾”'
                        },
                        {
                            value:97,
                            name:'invisible',
                            itemStyle : placeHolderStyle
                        }
                    ]
                },
                {
                    name:'4',
                    type:'pie',
                    clockWise:false,
                    radius : [44, '88%'],
                    itemStyle : dataStyle,
                    data:[
                        {
                            value:3, 
                            name:'3%的人表示“我姓曾”'
                        },
                        {
                            value:97,
                            name:'invisible',
                            itemStyle : placeHolderStyle
                        }
                    ]
                }
            ]
        };
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
.pieChart{
    .vh(220);
    width:100%;
    position:relative; 
    .myChart{
      height:100%;
        width:100%;  
    } 
}

</style>
