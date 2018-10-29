
<template>
  <!-- 用能分析图表 -->
  <div class="echartsAnalysis">
  	<div class="lineEcharts" id="lines"></div>
  	<div class="pieEcharts" id="pies"></div>
  	<div class="barEcharts" id="bars"></div>
  </div>
</template>

<script>
    export default {
    	name:'echarts-analysis',
    	props:['data'],
        data(){
        	return {

        	}
        },
        methods:{
        	getEchartsData(){

        	},
        	drawLine(){
        		let data = this.data;
        		let chart = this.$echarts.init(document.getElementById('lines'));
        		let chart2 = this.$echarts.init(document.getElementById('pies'));
        		let chart3 = this.$echarts.init(document.getElementById('bars'));
        		let legendData = ['2018年9月', '2017年9月','2018年8月'];
		        let bgColorList = ["#F35E5E","#EEB66E","#008AFF"];
		        let axisLabel = ['客房', '餐饮厨房', '公共区域', '设备', '区域一', '区域二', '1-5号主机'];
		        let seriesValue = [];
		        for (var i = 0; i < legendData.length; i++) {
		            var arrData = [];
		            var seriesDataVal = null;
		            for (var j = 0; j < axisLabel.length; j++) {
		                arrData.push(Math.floor(Math.random() * 100));
		            }
		            seriesDataVal = {
		                barWidth: 8,//柱状条宽度
		                name:legendData[i],
		                type:'bar',
		                itemStyle: {
		                    normal: {
		                        show: true,//鼠标悬停时显示label数据
		                        barBorderRadius: [2, 2, 2, 2],//柱形图圆角，初始化效果
		                        color: bgColorList[i]
		                    }
		                },
		                data:arrData
		            };
		            seriesValue.push(seriesDataVal);
		        }
		        let option = {
				    tooltip : {
				        trigger: 'axis',
				        axisPointer: {
				            type: 'cross',
				            label: {
				                backgroundColor: '#6a7985'
				            }
				        }
				    },
		            grid:{
		          	    left:0,
		          	    top:35,
		          	    right:0,
		                bottom:4,
		                containLabel: true,
		            },
		            legend: {
			          	textStyle: {color: '#B5D7FF',},
			          	top:5,
			          	itemWidth: 20,
	        			itemHeight: 10,
			            data:['客房','宴会厅','餐厅厨房','公共区域','餐厅','空调','1-5号主机','入住率'],
		            },
		            calculable : true,
		            xAxis: {
				        type: 'value',
				        min:1,
				       	max:31,
				        interval:1,
				        boundaryGap: true,
				        axisLine: {show:false},
				        axisTick: {show:false},
				        splitLine: {show:false},
				        axisLabel: {textStyle: {
						    color: '#708FBE'
						}}
			        },
			    	yAxis: {
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
				    series: [{
				    	name:'客房',
				        data: data.custom,
				        type: 'line',
				        symbol: "circle", 
				        symbolSize:0,
				        smooth: true,
			            lineStyle: {
			                normal: {
			                    width: 2,
			                    shadowColor: 'rgba(48, 241, 225, .4)',
			                    shadowBlur: 5,
			                    shadowOffsetY: 5
			                }
			            },
				    },{
				    	name:'宴会厅',
				        data: data.party,
				        type: 'line',
				        symbol: "circle", 
				        symbolSize:0,
				        smooth: true,
			            lineStyle: {
			                normal: {
			                    width: 2,
			                    shadowColor: 'rgba(48, 241, 225, .4)',
			                    shadowBlur: 5,
			                    shadowOffsetY: 5
			                }
			            },
				    },
				    {
				    	name:'餐厅厨房',
				        data: data.dinneroom,
				        type: 'line',
				        symbol: "circle", 
				        symbolSize:0,
				        smooth: true,
			            lineStyle: {
			                normal: {
			                    width: 2,
			                    shadowColor: 'rgba(253, 153, 27, .4)',
			                    shadowBlur: 5,
			                    shadowOffsetY: 5
			                }
			            },
				    },
				    {
				    	name:'公共区域',
				        data: data.publicarea,
				        type: 'line',
				        symbol: "circle", 
				        symbolSize:0,
				        smooth: true,
			            lineStyle: {
			                normal: {
			                    width: 2,
			                    shadowColor: 'rgba(253, 153, 27, .4)',
			                    shadowBlur: 5,
			                    shadowOffsetY: 5
			                }
			            },
				    },{
				    	name:'餐厅',
				        data: data.dinner,
				        type: 'line',
				        symbol: "circle", 
				        symbolSize:0,
				        smooth: true,
			            lineStyle: {
			                normal: {
			                    width: 2,
			                    shadowColor: 'rgba(27, 127, 253, .4)',
			                    shadowBlur: 5,
			                    shadowOffsetY: 5
			                }
			            },
				    },{
				    	name:'空调',
				        data: data.airconditioner,
				        type: 'line',
				        symbol: "circle", 
				        symbolSize:0,
				        smooth: true,
			            lineStyle: {
			                normal: {
			                    width: 2,
			                    shadowColor: 'rgba(27, 127, 253, .4)',
			                    shadowBlur: 5,
			                    shadowOffsetY: 5
			                }
			            },
				    },{
				    	name:'1-5号主机',
				        data: data.mainframe,
				        type: 'line',
				        symbol: "circle", 
				        symbolSize:0,
				        smooth: true,
			            lineStyle: {
			                normal: {
			                    width: 2,
			                    shadowColor: 'rgba(238, 76, 76, .4)',
			                    shadowBlur: 5,
			                    shadowOffsetY: 5
			                }
			            }
			        },{
				    	name:'入住率',
				        data: data.occupancy,
				        type: 'line',
				        symbol: "circle", 
				        symbolSize:0,
				        smooth: true,
			            lineStyle: {
			                normal: {
			                    width: 2,
			                    shadowColor: 'rgba(238, 76, 76, .4)',
			                    shadowBlur: 5,
			                    shadowOffsetY: 5
			                }
			            }
				    }],
			        color:["#FD97AA","#008AFF","#F35E5E","#EEB66E","#EBF191","#C382EF","#95EDC5",'#b5d7ff']
		        };
		        let option2 = {
				    tooltip : {
				        trigger: 'item',
				        formatter: "{a}{b} : {c} ({d}%)"
				    },
				    series : [
				        {
				            name: '',
				            type: 'pie',
				            radius : '70%',
				            center: ['50%', '50%'],
				            color:["#FD97AA","#008AFF","#F35E5E","#EEB66E","#EBF191","#C382EF","#95EDC5"],
				            data:[
				            	{value:135, name:'1-5号主机'},
				                {value:1548, name:'公共区域'},
				                {value:335, name:'餐厅'},
				                {value:310, name:'空调'},
				                {value:234, name:'客房'},
				                {value:135, name:'餐饮厨房'},
				                {value:1548, name:'宴会厅'},
				                
				            ],
				            itemStyle: {
				                emphasis: {
				                    shadowBlur: 10,
				                    shadowOffsetX: 0,
				                    shadowColor: 'rgba(0, 0, 0, 0.5)'
				                }
				            }
				        }
				    ]
				};
				let option3={
		            tooltip: {
		                trigger: 'axis',
		                axisPointer: {
		                    type: 'shadow'//阴影，若需要为直线，则值为'line'
		                }
		            },
		            toolbox: {
		                show: false,
		                feature: {
		                    saveAsImage: {show: true}
		                }
		            },
		            legend: {
		                data: legendData,
		                y: 'top',//图例说明文字设置
		                textStyle:{
		                	color:'#fff'
		                }
		            },
		            grid: {
		                left: '3%',
		                right: '4%',
		                bottom: '10%',
		                top:'10%',
		                containLabel: false
		            },
		            xAxis: [{
		                min: 0,
		                type: 'category', //纵向柱状图，若需要为横向，则此处值为'value'， 下面 yAxis 的type值为'category'
		                data: axisLabel,
		                axisLabel:{
		                	color:'#708FBE'
		                }
		            }],
		            yAxis: [{
		                min: 0,
		                type: 'value',
		                axisLine: {show:false},
				        axisTick: {show:false},
				        splitLine: {show:false},
		                splitArea: {
				        	show:true,
				        	areaStyle: {color:['rgba(142,187,255,.1)','rgba(142,187,255,.05)']},
				        },
		            }],
		            label: {
		                normal: { //显示bar数据
		                    show: true,
		                    position: 'top'
		                }
		            },
		            series: seriesValue
		        };


		        chart.setOption(option);
		        chart2.setOption(option2);
		        chart3.setOption(option3);
        	}
        },
        mounted(){
        	this.drawLine('lines');
        }
    }
</script>

<style lang="less" scoped='scoped' type="text/less">
@import '../../../assets/css/comon.less';
	.echartsAnalysis{
		width:100%;
		display:flex;
		height:2.4rem;
		.lineEcharts{
			width:6.3rem;
			height:2.4rem;
		}
		.pieEcharts{
			width:2.86rem;
			height:2.4rem;
		}
		.barEcharts{
			width:3.8rem;
			height:2.4rem;
		}
	}
</style>
