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
	        	floorNumber:'10月',
	        	floorNumber1:'2018',
	        	room:[],
	        	ballroom:[],
	        	dining:[],
	        	others:[],
	        	roomY:[],
	        	ballroomY:[],
	        	diningY:[],
	        	othersY:[],
	        	chart:{},
        		xData : '',

	        };
	    },
        mounted(){
	  
	        this.getChartData();
            
        },
	    watch:{
	
	    },
	    methods: {
	    	getChartData(){
                var that = this;
                this.$http.post('/hotel/statement',{
                    project_id:1,
                    // month:1,
                    // year:2018,
                }).then(function(data){
                    // 日
                    $.each(data.data.data.day_data.dining,function(key,value){
                    	that.dining.push([parseInt(key),parseInt(value)]);
                    });
                    $.each(data.data.data.day_data.room,function(key,value){
                    	that.room.push([parseInt(key),parseInt(value)]);
                    });
                    $.each(data.data.data.day_data.ballroom,function(key,value){
                    	that.ballroom.push([parseInt(key),parseInt(value)]);
                    });
                    //月
                    $.each(data.data.data.month_data.dining,function(key,value){
                    	that.diningY.push([parseInt(key),parseInt(value)]);
                    });
                    $.each(data.data.data.month_data.room,function(key,value){
                    	that.roomY.push([parseInt(key),parseInt(value)]);
                    });
                    $.each(data.data.data.month_data.ballroom,function(key,value){
                    	that.ballroomY.push([parseInt(key),parseInt(value)]);
                    });

                    that.room.sort(function(x, y){
					  return x[0]-y[0];
					});
                    that.dining.sort(function(x, y){
					  return x[0]-y[0];
					});
                    that.ballroom.sort(function(x, y){
					  return x[0]-y[0];
					});
                    that.roomY.sort(function(x, y){
					  return x[0]-y[0];
					});
                    that.diningY.sort(function(x, y){
					  return x[0]-y[0];
					});
                    that.ballroomY.sort(function(x, y){
					  return x[0]-y[0];
					});

                    that.getData("reportChartMonth",31,that.room,that.dining,that.ballroom);
                    that.getData("reportChartYear",12,that.roomY,that.diningY,that.ballroomY);
                }, function(data){
                    // 响应错误回调
                });
	    	},
 			getData(id,xData,room,dining,ballroom){
 				this.chart = this.$echarts.init(document.getElementById(id));
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
			            data:['客房','餐厅','宴会厅','其他'],
		            },
		            calculable : true,
		            xAxis: {
				        type: 'value',
				        min:0,
				        max:xData+1,
				        interval:1,
				        // boundaryGap: true,
				        axisLine: {show:false},
				        axisTick: {show:false},
				        splitLine: {show:false},
				        axisLabel: {
				        	showMinLabel:false,
				        	showMaxLabel:false,
				        	textStyle: {
						    	color: '#708FBE'
							}
						}
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
				    	name:'客房',
				        data: room,
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
				    	name:'餐厅',
				        data: dining,
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
				        data: ballroom,
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
				        data: [],
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
				    }
				    ],
			        color:["#55F8F0","#FD991B","#1B7FFD","#F26666"]
		        };
		        this.chart.setOption(option);
 			},
	    }
    }
</script>

<style>

</style>
