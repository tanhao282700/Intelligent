<template>
  <!-- 用能分析模块 -->
  <div class="energyAnalysis">
  	<Crumbs :data ='crumbs' class="breads"/>
  	<div class="boxs chartTables">
  		<div class="chartTit">
  			<div class="chartLeftTit">
  				区域能耗 | 
  				
  			</div>
  			<div class="chartRightTit">
  				<el-tabs type="border-card">
				  	
				</el-tabs>
  			</div>
  		</div>
  		<EchartsAnalysis :data="data"/>
  	</div>
  	<div class="boxs chartTables2">
  		<div class="chartTit">
  			<div class="chartLeftTit">
  				设备能耗 | 
  			</div>
  			<div class="chartContent">
  				<div class="charts2Left" id="deviceLeft">

  				</div>
  				<div class="charts2Right" id="deviceRight">

  				</div>
  			</div>
  		</div>
  	</div>
  </div>
</template>

<script>
	import SelectBox from '../../AgentManage/components/schedule/selectBox';
	import EchartsAnalysis from './echartsAnalysis';
    export default {
        name: "energy-analysis",
        components:{
        	'SelectBox':SelectBox,
        	'EchartsAnalysis':EchartsAnalysis
        },
        data(){
        	return {
        		crumbs:['能源管理系统','用能分析'],
        		navs:['电','水','气'],
        		data:{
        			custom:[1212,3434,5566,2323,3423,54,67,85,34,23,45,56,67,89,90,43,54,54,6,67,3,34,65,34,56,76,43,56,78,23,78],
        			party:[67,89,90,43,54,54,6,67,3,34,65,34,56,76,43,56,78,23,7812,34,56,23,34,54,67,85,34,23,45,56],
        			dinneroom:[],
        			dinner:[12,45,56,67,89,90,43,54,54,6,67,3,34,65,34,56,76,43,56,78,23,78,34,56,23,34,54,67,85,34,23],
        			publicarea:[],
        			airconditioner:[12,34,56,23,34,54,67,85,34,23,45,56,67,89,90,43,54,54,6,67,3,34,65,34,56,76,43,56,78,23,78],
        			mainframe:[],
        			occupancy:[]
        		}
        	}
        },
        methods:{
        	getBottomEcharts(){
        		let data = this.data;
        		let chart = this.$echarts.init(document.getElementById('deviceLeft'));
        		let chart2 = this.$echarts.init(document.getElementById('deviceRight'));
	        	let option3 = {
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
			            data:['水泵','空调','其他'],
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
				    	name:'水泵',
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
				    	name:'空调',
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
				    	name:'其他',
				        data: data.dinner,
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
				    }],
			        color:["#F35E5E","#EEB66E","#008AFF",]
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
				            radius : '65%',
				            center: ['50%', '50%'],
				            color:["#008AFF","#F35E5E","#EEB66E"],
				            data:[
				            	{value:135, name:'其他'},
				                {value:154, name:'餐厅'},
				                {value:335, name:'空调'}
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
				chart.setOption(option3);
				chart2.setOption(option2);
	        }
        },
        mounted(){
        	this.getBottomEcharts();
        }
    }
</script>

<style lang="less" scoped='scoped' type="text/less">
@import '../../../assets/css/comon.less';
	.energyAnalysis{
		width:100%;
		height:100%;
		.breads{
			margin:0 0.12rem 0.48rem 0;
		}
		.chartTables{
			width:95.6%;
			margin:0 2.2%;
			height:2.8rem;
			display:flex;
			flex-direction:column;
			.chartTit{
				height:0.4rem;
				line-height:0.4rem;
				width:100%;
				display:flex;
				flex-direction:row;
				background:rgba(0,0,0,0.2);
				border-radius:2px 0px 0px 0px;
				.chartLeftTit{
					padding-left:0.18rem;
					color:#008AFF;
					width:86.12%;
					font-size:0.16rem;
				}
				.chartRightTit{
					width:13.78%;

				}
			}
		}
		.chartTables2{
			width:95.6%;
			margin:0 2.2%;
			height:2.8rem;
			display:flex;
			flex-direction:column;
			.chartTit{
				height:0.4rem;
				line-height:0.4rem;
				width:100%;
				background:rgba(0,0,0,0.2);
				border-radius:2px 0px 0px 0px;
			}
			.chartContent{
				display:flex;
				flex-direction:row;
				width:100%;
				height:2.4rem;
				.charts2Left{
					width:9.5rem;
					height:2.4rem;
				}
				.charts2Right{
					width:3.56rem;
					height:2.4rem;
				}
			}
		}
		.chartTables2{
			margin-top:0.2rem;
		}

	}
</style>
