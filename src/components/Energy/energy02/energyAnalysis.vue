<template>
  <!-- 用能分析模块 -->
  <div class="energyAnalysis">
  	<Crumbs :data ='crumbs' class="breads"/>
  	<div class="boxs chartTables">
  		<div class="chartTit">
  			<div class="chartLeftTit">
  				<div class="tit1">区域能耗 | </div>
                <div class="analysisBoxs analysisBoxs1">
                    <SelectBox 
                        :options = 'analysis' 
                        :value = "vanalysis" 
                        :icon="'el-icon-d-caret'"
                        placeholder="月"
                        @change = 'change1'
                    />
                </div>
                <div class="analysisBoxs">
                    <SelectBox 
                        :options = 'analysis' 
                        :value = "vanalysis" 
                        :icon="'el-icon-d-caret'"
                        placeholder="2018-08-01"
                        @change = 'change1'
                    />
                </div>
                <div class="hrline">-</div>
                <div class="analysisBoxs">
                    <SelectBox 
                        :options = 'analysis' 
                        :value = "vanalysis" 
                        :icon="'el-icon-d-caret'"
                        placeholder="2018-09-26"
                        @change = 'change1'
                    />
                </div>
                <div class="searchBoxs">
                    <i class="el-icon-search"></i>
                    <span>查询</span>
                </div>   
  			</div>
  			<div class="chartRightTit">
			  <el-button type="default" :class="{currData:iscur==index}" :key="index" v-for="(item,index) in tabs" @click="loadBarData(index)">{{item.name}}</el-button>
  			</div>
  		</div>
  		<EchartsAnalysis :data="data"/>
  	</div>
  	<div class="boxs chartTables2">
  		<div class="chartTit">
  			<div class="chartLeftTit">
  				<div class="tit1">设备能耗 | </div>
  				<div class="analysisBoxs analysisBoxs1">
                    <SelectBox 
                        :options = 'analysis' 
                        :value = "vanalysis" 
                        :icon="'el-icon-d-caret'"
                        placeholder="月"
                        @change = 'change1'
                    />
                </div>
                <div class="analysisBoxs">
                    <SelectBox 
                        :options = 'analysis' 
                        :value = "vanalysis" 
                        :icon="'el-icon-d-caret'"
                        placeholder="2018-08-01"
                        @change = 'change1'
                    />
                </div>
                <div class="hrline">-</div>
                <div class="analysisBoxs">
                    <SelectBox 
                        :options = 'analysis' 
                        :value = "vanalysis" 
                        :icon="'el-icon-d-caret'"
                        placeholder="2018-09-26"
                        @change = 'change1'
                    />
                </div>
                <div class="searchBoxs">
                    <i class="el-icon-search"></i>
                    <span>查询</span>
                </div> 
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
        		iscur:0,
        		tabs: [{name: "电"}, {name: "水"} ,{name: "气"}],
        		data:{
        			custom:[1212,3434,5566,2323,3423,54,67,85,34,23,45,56,67,89,90,43,54,54,6,67,3,34,65,34,56,76,43,56,78,23,78],
        			party:[],
        			dinneroom:[],
        			dinner:[],
        			publicarea:[],
        			airconditioner:[],
        			mainframe:[],
        			occupancy:[]
        		},
        		vanalysis:'',
        		analysis:[]
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
	        },
	        loadBarData(i){
	        	this.iscur = i;
	        },
	        change1(){

	        },
	        getDatas(){
	        	let param = {
	        		project_id:1,
	        		sys_menu_id:1,
	        		area_query_date_type:'',
	        		area_date:'',
	        		energy_type:this.iscur,
	        		device_query_date_type:'',
	        		device_date:''
	        	}
	        	this.$http.post('/hotel_energy/analysis',param)
	        	.then(res=>{
	        		console.log(res.data.data.area_energy_use);
	        		console.log(res.data.data.device_energy_use);
	        	})
	        }

        },
        mounted(){
        	this.getBottomEcharts();
        	this.getDatas();
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
				padding-left:0.18rem;
				color:#008AFF;
				font-size:0.16rem;
				height:0.4rem;
				line-height:0.4rem;
				width:100%;
				background:rgba(0,0,0,0.2);
				border-radius:2px 0px 0px 0px;
				.chartRightTit .el-button.currData{
				  background:rgba(142,187,255,.05);
				  color:#B5D7FF;
				}
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
		.tit1,.hrline{
			float:left;
		}
		.hrline{
			margin:0 0.1rem;
			color:#fff;
		}
		.analysisBoxs{
	        float: left;
	        width:1rem;
	        height:0.32rem;
	        background-color: rgba(255, 255, 255, 0.01);
	        border-bottom: solid 0.01rem #1989fa;
	        text-align: center;
	      }
	     .analysisBoxs1{
	     	margin: 0 0.1rem 0 0.16rem;
	     	width:0.4rem;
	     }
	     .searchBoxs{
	     	color:#fff;
	     	float:left;
	     	margin-left:0.16rem;
	     }
		.chartTables2{
			margin-top:0.2rem;
		}

	}
</style>
