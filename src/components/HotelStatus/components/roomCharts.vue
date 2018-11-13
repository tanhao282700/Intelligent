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

        		daysData:[],
        		monthsData:[],
        		legendDay:[],
        		legendMonth:[],

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
                	console.log(data.data.data);
                	let data1 = data.data.data.day_data;
                	let data2 = data.data.data.month_data;
                    that.legendDay = [],
                    that.legendMonth = [],
	        		that.daysData = new Array(data1.length);
	        		that.monthsData = new Array(data2.length);
	        		
	        		$.each(that.daysData,(n,k)=>{
	        			that.daysData[n] = [];
	        		})
	        		$.each(that.monthsData,(n,k)=>{
	        			that.monthsData[n] = [];
	        		})
	        		$.each(data1,function(i,k){
	        			that.legendDay.push(k.label);
	        			$.each(k.data,function(n,m){
	        				that.daysData[i].push([parseInt(n),parseInt(m)]);
	        			});
	        			//console.log(that.daysData)
	        		})
	        		$.each(data2,function(i,k){
	        			that.legendMonth.push(k.label);
	        			$.each(k.data,function(n,m){
	        				that.monthsData[i].push([parseInt(n),parseInt(m)]);
	        			});
	        			//console.log(that.daysData)
	        		})
	        		$.each(that.daysData,function(a,b){
	        			b.sort(function(x, y){
						  return x[0]-y[0];
						});
	        		})
	        		$.each(that.monthsData,function(a,b){
	        			b.sort(function(x, y){
						  return x[0]-y[0];
						});
	        		})


                    that.getData("reportChartMonth",that.xData,that.legendDay,that.daysData);
                    that.getData("reportChartYear",12,that.legendMonth,that.monthsData);
                }, function(data){
                    // 响应错误回调
                });
	    	},
 			getData(id,xData,legendData,data){
 				var setSeries = [];
 				var colorLst=["#55F8F0","#FD991B","#1B7FFD","#F26666",'#000','#e4393c']
 				var colors = ['rgba(48, 241, 225, .4)','rgba(253, 153, 27, .4)','rgba(27, 127, 253, .4)','rgba(238, 76, 76, .4)']
 				for(var i=0;i<data.length;i++){
 					setSeries.push({
				    	name:legendData[i],
				        data: data[i],
				        type: 'line',
				        symbol: "circle", 
				        symbolSize:0,
				        smooth: true,
			            lineStyle: {
			                normal: {
			                    width: 2,
			                    shadowColor: colors[i],
			                    shadowBlur: 5,
			                    shadowOffsetY: 5
			                }
			            },
				    });
 				}

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
				        },
				        formatter: function (params, ticket, callback) {
						    // console.log(params);
						    var str1 = '';
						    var str2 = '';
						    $.each(params,(i,k)=>{
						    	if(i == 0){
						    		str1 = k.axisValue
						    	}
						    	str2 += ( '<b style="width:10px;height:10px;display:inline-block;border-radius:6px;margin-right:2px;margin-bottom:-1px;background:'+ colorLst[i] +'"></b>' + k.seriesName + ' : ' + k.data[1] +'<br/>')
						    });
						    // console.log(xData);
						    if(xData == 12){
						    	str1 = str1 + ' 月'
						    }else{
						    	str1 = str1 + ' 日'
						    }
						    console.log(str1)
						    return str1 + '<br/>' + str2;
						}
				    },
		            grid:{
		          	    left:10,
		          	    top:35,
		          	    right:10,
		                bottom:4,
		                containLabel: true,
		            },
		            legend: {
			          	textStyle: {color: '#B5D7FF',},
			          	top:5,
			          	itemWidth: 20,
	        			itemHeight: 10,
			            data:legendData,
		            },
		            calculable : true,
		            xAxis: {
				        type: 'value',
				        min:1,
				        max:xData,
				        interval:1,
				        axisLine: {show:false},
				        axisTick: {show:false},
				        splitLine: {show:false},
				        axisLabel: {
				        	interval:0,
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
				    series: setSeries,
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

