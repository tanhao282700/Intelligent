
<template>
  <!-- 用能分析图表 -->
  <div class="echartsAnalysis">
  	<div class="lineEcharts" id="lines"></div>
  	<div class="pieEcharts" id="pies"></div>
  	<div class="barEcharts" id="bars"></div>
  </div>
</template>

<script>
	import echarts from 'echarts';
    export default {
    	name:'echarts-analysis',
    	props:['data'],
        data(){
        	return {
        		areaEnergyRzl:[],
        		areaEnergyKf:[],
        	}
        },
        watch:{
          // 深度 watcher
          data: {
            handler: function (items) {
              this.getChartLineData();
            },
            deep: true
          }
        },
        methods:{
        	getChartLineData(){
        		let param = {
	        		project_id:1,
	        		sys_menu_id:1,
	        		area_query_date_type:'',
	        		area_date:'',
	        		// energy_type:this.iscur,
	        		device_query_date_type:'',
	        		device_date:''
	        	}
	        	this.$http.post('/hotel_energy/analysis',param)
	        	.then(res=>{
	        		//区域图
	        		let trendData = res.data.data.area_energy_use.trend_data;
	        		let newRzl = [];
	        		let newKf = [];
	        		$.each(trendData.check_in_hotel_rate,function(i,k){
	        			newRzl.push([k.date,k.value]);
	        		});
	        		this.areaEnergyRzl = newRzl;

	        		$.each(trendData.floor_value[0].data,function(i,k){
	        			newKf.push([k.date,k.value]);
	        		});
	        		this.areaEnergyKf = newKf;
	        		this.drawLine(this.data);

	        	})
        	},
        	drawLine(data){
        		console.log(data);
        		let chart = this.$echarts.init(document.getElementById('lines'));
        		let chart2 = this.$echarts.init(document.getElementById('pies'));
        		let chart3 = this.$echarts.init(document.getElementById('bars'));
        		let legendData = data.legendData;
		        let bgColorList = [{color1:"#FD99AC",color2:'#FA6074'},{color1:'#FFD12D',color2:"#FFA414"},{color1:'#6DBEFD',color2:'#3B89F9'}];
		        let axisLabel = data.axisLabel;
		        let arrData = [data.arrData1,data.arrData2,data.arrData3];
		        let seriesValue = [];
		        for (var i = 0; i < legendData.length; i++) {
		            var seriesDataVal = null;
		            seriesDataVal = {
		                barWidth: 8,//柱状条宽度
		                name:legendData[i],
		                type:'bar',
		            	itemStyle: {
	                        normal: {
	                            color: new echarts.graphic.LinearGradient(
	                                0, 0, 0, 1,
	                                [
	                                    {offset: 0, color: bgColorList[i].color1},
	                                    {offset: 1, color: bgColorList[i].color2}
	                                ]
	                            )
	                        },
	                        emphasis: {
	                            color: new echarts.graphic.LinearGradient(
	                                0, 0, 0, 1,
	                                [
	                                    {offset: 0, color: '#008EFE'},
	                                    {offset: 1, color: '#00C1FF'}
	                                ]
	                            )
	                        }
	                    },
		                data:arrData[i]
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
				        type: 'time',
				        // boundaryGap: true,
				        axisLine: {show:false},
				        axisTick: {show:false},
				        splitLine: {show:false},
				        axisLabel: {textStyle: {
						    color: '#708FBE',
		                	showMinLabel:false,
		                	showMaxLabel:false,
						}},
						// data:['1','2','3','4','5','6','7']
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
				        data: this.areaEnergyKf,//data.custom,
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
				        data:data.party,
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
				        data: this.areaEnergyRzl,  //data.occupancy,
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
				            data:data.topPie,
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
        	this.getChartLineData();
        	// this.drawLine(this.data);
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
