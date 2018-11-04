<template>
	<div class="hotelStatus hotelReportForm">
        <!--面包屑--> 
        <div class="navCrumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>营收数据分析</el-breadcrumb-item>
              <el-breadcrumb-item>报表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    	<div class="reportHt50">
    		<div class="reportChartbox">
	    		<div class="reportChartHeadBox">
	    			<span>营收报表(日) <i></i></span>
		            <el-select v-model="floorNumber" placeholder="月份" @change="getDataChooseMonth">
		                <el-option label="1月" value="01"></el-option>
		                <el-option label="2月" value="02"></el-option>
		                <el-option label="3月" value="03"></el-option>
		                <el-option label="4月" value="04"></el-option>
		                <el-option label="5月" value="05"></el-option>
		                <el-option label="6月" value="06"></el-option>
		                <el-option label="7月" value="07"></el-option>
		                <el-option label="8月" value="08"></el-option>
		                <el-option label="9月" value="09"></el-option>
		                <el-option label="10月" value="10"></el-option>
		                <el-option label="11月" value="11"></el-option>
		                <el-option label="12月" value="12"></el-option>
		            </el-select>
	    		</div>
	    		<div class="chartDom" id="reportChartMonth"></div>
    		</div>
    	</div>
    	<div class="reportHt50">
	    	<div class="reportChartbox">
	    		<div class="reportChartHeadBox">
	    			<span>营收报表(月) <i></i></span>
		            <el-select v-model="floorNumber1" placeholder="年份" @change="getDataChooseYear">
		                <el-option  v-for="item in SelesData"
		                  :key="item.valueX"
		                  :label="item.valueX"
		                  :value="item.valueX">
		                </el-option>
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
	        	floorNumber:'11',
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
        		SelesData:[],

	        };
	    },
        mounted(){
	  	 	this.selDateLinkage();  // 日期联动
	        this.getChartData();    // 图表
            this.getSelesData();    // 下拉框数据
        },
	    watch:{
	
	    },
	    methods: {
	    	selDateLinkage(){
	    		if(this.floorNumber == 2){
				    //如果是闰年
				    if((this.floorNumber1 % 4 === 0 && this.floorNumber1 % 100 !== 0)  || this.floorNumber1 % 400 === 0){
				        this.xData = 29;
				    //如果是平年
				    }else{
				        this.xData = 28;
				    }
				//如果是第4、6、9、11月
				}else if(this.floorNumber == 4 || this.floorNumber == 6 ||this.floorNumber == 9 ||this.floorNumber == 11){
				    this.xData = 30;
				}else{
				    this.xData = 31;
				}
	    	},
	    	getSelesData(){
	    		var that = this;
                this.$http.post('/hotel/get_year',{
                    // project_id:1,
                    // month:1,
                    // year:2018,
                }).then(function(data){
                    // 日
                    console.log(data);                   
                    $.each(data.data.data,function(key,value){
                    	that.SelesData.push({valueX:value});
                    });
                	console.log(that.SelesData);
                }, function(data){
                    // 响应错误回调
                });
	    	},
	    	getDataChooseMonth(){
	    		this.selDateLinkage();
	    		console.log(this.xData);
	    		console.log(this.floorNumber);
	    		this.getChartData();
	    	},
	    	getDataChooseYear(){
	    		this.selDateLinkage();
	    		console.log(this.xData);
	    		console.log(this.floorNumber1);
	    		this.getChartData();
	    	},
	    	getChartData(){
                var that = this;
                var monthPa = '';
                if(Number(this.floorNumber) <= 9){
                	monthPa = '0'+ Number(this.floorNumber);
                }
                this.$http.post('/hotel/statement',{
                    // project_id:1,
                    month:monthPa,
                    year:that.floorNumber1,
                }).then(function(data){
                	that.dining = [];
                	that.room = [];
                	that.ballroom = [];
                	that.others = [];
                	that.diningY = [];
                	that.roomY = [];
                	that.ballroomY = [];
                	that.othersY = [];
                    // 日
                    console.log(data);
                    $.each(data.data.data.day_data.dining,function(key,value){
                    	that.dining.push([parseInt(key),parseInt(value)]);
                    });
                    $.each(data.data.data.day_data.room,function(key,value){
                    	that.room.push([parseInt(key),parseInt(value)]);
                    });
                    $.each(data.data.data.day_data.ballroom,function(key,value){
                    	that.ballroom.push([parseInt(key),parseInt(value)]);
                    });
                    $.each(data.data.data.day_data.other,function(key,value){
                    	that.others.push([parseInt(key),parseInt(value)]);
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
                    $.each(data.data.data.month_data.other,function(key,value){
                    	that.othersY.push([parseInt(key),parseInt(value)]);
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
                    that.others.sort(function(x, y){
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
                    that.othersY.sort(function(x, y){
					  return x[0]-y[0];
					});

                    that.getData("reportChartMonth",that.xData,that.room,that.dining,that.ballroom,that.others);
                    that.getData("reportChartYear",12,that.roomY,that.diningY,that.ballroomY,that.othersY);
                }, function(data){
                    // 响应错误回调
                });
	    	},
 			getData(id,xData,room,dining,ballroom,other){
 				this.chart = this.$echarts.init(document.getElementById(id));
		        let option = {
		            title : {
			            show:true,
			            text: '单位：元/￥',
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
				        data: other,
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
		        this.chart.setOption(option,true);
		        option = {};
 			},
	    }
    }
</script>

<style>

</style>
