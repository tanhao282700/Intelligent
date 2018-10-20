<template>
	<div class="hotelStatus hotelReportForm">
    	<div class="navCrumbs">首页 > <span>报表</span></div>
    	<div class="reportHt50">
    		<div class="reportChartbox">
	    		<div class="reportChartHeadBox">
	    			<span>营收报表(日) <i></i></span>
		            <el-select v-model="floorNumber" placeholder="月份">
		                <el-option label="1月" value="1"></el-option>
		                <el-option label="2月" value="2"></el-option>
		            </el-select>
	    		</div>
	    		<div class="chartDom" id="reportChartMonth"></div>
    		</div>
    	</div>
    	<div class="reportHt50">
	    	<div class="reportChartbox">
	    		<div class="reportChartHeadBox">
	    			<span>营收报表(月) <i></i></span>
		            <el-select v-model="floorNumber1" placeholder="年份">
		                <el-option label="2018" value="2018"></el-option>
		                <el-option label="2017" value="2017"></el-option>
		            </el-select>
	    		</div>
	    		<div class="chartDom" id="reportChartYear"></div>
	    	</div>
    	</div>

	</div>
</template>

<script>


    export default {
        components:{
        	
        },
	    data() {
	        return {
	        	isResize:1,
	        	floorNumber:'10月',
	        	floorNumber1:'2018',
	        	chartMonth:{},
	        	chartYear:{},
        		xData : ['1','2','3', '4','5', '6', '7','8','9','10','11', '12', '13', '14', '15', '16', '17','18','19','20','21', '22', '23', '24', '25', '26', '27','28','29','30'],
        		xData1 : ['1','2','3', '4','5', '6', '7','8','9','10','11', '12'],

	        };
	    },
        mounted(){
	        const that = this;
	        window.onresize = function(){
	            that.isResize++;
	        };
            this.getData("reportChartMonth");
            this.getData("reportChartYear");
        },
	    watch:{
	        isResize(){
	        	this.chartMonth.resize()
	        	this.chartYear.resize()
	        }
	    },
	    methods: {
 			getData(id){
 				this.chartMonth = this.$echarts.init(document.getElementById("reportChartMonth"));
 				this.chartYear = this.$echarts.init(document.getElementById("reportChartYear"));
		        let option = {
		            title : {
			            show:true,
			            text: '单位：元/日',
			            left:15,
			            top:5,
			            textStyle:{
			                color:"#008AFF",
			                fontSize:"12",
			                fontWeight:"normal"
			            }
		            },
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
			            data:['客户','餐厅','宴会厅','其他'],
		            },
		            calculable : true,
		            xAxis: {
				        type: 'category',
				        axisLine: {show:false},
				        axisTick: {show:false},
				        splitLine: {show:false},
				        axisLabel: {textStyle: {
						    color: '#708FBE'
						}},
				        data: this.xData,
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
				    series: [{
				    	name:'客户',
				        data: [820, 932, 901, 934, 1290, 1330, 1320,1000,1100,900,820, 932, 901, 934, 1290, 1330, 1320,1000,1100,900,820, 932, 901, 934, 1290, 1330, 1320,1000,1100,900],
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
				    	name:'餐厅',
				        data: [220, 332, 301, 334, 590, 530, 520,4000,4100,300,220, 332, 301, 334, 590, 530, 520,4000,4100,300,220, 332, 301, 334, 590, 530, 520,4000,4100,300],
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
				    	name:'宴会厅',
				        data: [520, 632, 601, 634, 990, 930, 920,7000,7100,600,520, 632, 601, 634, 990, 930, 920,7000,7100,600,520, 632, 601, 634, 990, 930, 920,7000,7100,600],
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
				    	name:'其他',
				        data: [620, 732, 1101, 834, 990, 1030, 1020,700,1000,920,620, 732, 1101, 834, 990, 1030, 1020,700,1000,920,620, 732, 1101, 834, 990, 1030, 1020,700,1000,920],
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
			            },
				    }],
			        color:["#55F8F0","#FD991B","#1B7FFD","#F26666"]
		        };

		        let option1 = {
		            title : {
			            show:true,
			            text: '单位：元/日',
			            left:15,
			            top:5,
			            textStyle:{
			                color:"#008AFF",
			                fontSize:"12",
			                fontWeight:"normal"
			            }
		            },
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
			            data:['客户','餐厅','宴会厅','其他'],
		            },
		            calculable : true,
		            xAxis: {
				        type: 'category',
				        axisLine: {show:false},
				        axisTick: {show:false},
				        splitLine: {show:false},
				        axisLabel: {textStyle: {
						    color: '#708FBE'
						}},
				        data: this.xData1,
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
				    series: [{
				    	name:'客户',
				        data: [820, 932, 901, 934, 1290, 1330, 1320,1000,1100,900,820, 932, 901, 934, 1290, 1330, 1320,1000,1100,900,820, 932, 901, 934, 1290, 1330, 1320,1000,1100,900],
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
				    	name:'餐厅',
				        data: [220, 332, 301, 334, 590, 530, 520,4000,4100,300,220, 332, 301, 334, 590, 530, 520,4000,4100,300,220, 332, 301, 334, 590, 530, 520,4000,4100,300],
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
				    	name:'宴会厅',
				        data: [520, 632, 601, 634, 990, 930, 920,7000,7100,600,520, 632, 601, 634, 990, 930, 920,7000,7100,600,520, 632, 601, 634, 990, 930, 920,7000,7100,600],
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
				    	name:'其他',
				        data: [620, 732, 1101, 834, 990, 1030, 1020,700,1000,920,620, 732, 1101, 834, 990, 1030, 1020,700,1000,920,620, 732, 1101, 834, 990, 1030, 1020,700,1000,920],
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
			            },
				    }],
			        color:["#55F8F0","#FD991B","#1B7FFD","#F26666"]
		        };

		        // 绘制图表

		        this.chartMonth.setOption(option);
		        this.chartYear.setOption(option1);
 			},
	    }
    }
</script>

<style>

</style>
