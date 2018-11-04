<template>
  <!-- 用能分析模块 -->
  <div class="energyAnalysis" v-loading="viewsLoading"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.3)">
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
            viewsLoading:false,
        		crumbs:['能源管理系统','用能分析'],
        		iscur:0,
        		tabs: [{name: "电"}, {name: "水"} ,{name: "气"}],
        		data:{
        			topPie:[],
        			axisLabel:[],
        			legendData:[],
        			arrData1:[],
        			arrData2:[],
        			arrData3:[],
        			arr1Label:[],
        			arr1:[],
        			arr1x:[]
        		},
        		vanalysis:'',
        		analysis:[]
        	}
        },
        methods:{
        	getBottomEcharts(pieData2,pieData,arr2x,arr2Label){
        		let data = this.data;
        		let chart = this.$echarts.init(document.getElementById('deviceLeft'));
        		let chart2 = this.$echarts.init(document.getElementById('deviceRight'));
        		let shadowColors=['rgba(48, 241, 225, .4)','rgba(48, 241, 225, .4)','rgba(253, 153, 27, .4)'];
        		let series = [];
        		for(var i=0;i<arr2Label.length;i++){
        			series.push({
				    	name:arr2Label[i],
				        data: pieData,
				        type: 'line',
				        symbol: "circle",
				        symbolSize:0,
				        smooth: true,
			            lineStyle: {
			                normal: {
			                    width: 2,
			                    shadowColor: shadowColors[i],
			                    shadowBlur: 5,
			                    shadowOffsetY: 5
			                }
			            },
				    })
        		}
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
			            data:arr2Label,
		            },
		            calculable : true,
		            xAxis: {
				        type:'category',
				        data:arr2x,
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
				    series: series,
			        color:["#F35E5E","#EEB66E","#008AFF"]
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
				            color:["#008AFF","#F35E5E","#EEB66E","#FD97AA","#EBF191","#C382EF","#95EDC5",'#b5d7ff'],
				            data:pieData2,
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
        	  let that = this;
	        	let param = {
	        		project_id:1,
	        		sys_menu_id:1,
	        		area_query_date_type:'',
	        		area_date:'',
	        		energy_type:this.iscur,
	        		device_query_date_type:'',
	        		device_date:''
	        	}
	        	this.viewsLoading = true;
	        	this.$http.post('/hotel_energy/analysis',param)
	        	.then(res=>{
	        		//区域图
	        		let barData = res.data.data.area_energy_use.column_data;
	        		let lastThisData = barData.last_this_time;//同期
	        		let thisData = barData.this_time;//本期
	        		let lastData = barData.last_time;//上期
	        		let chineseData = res.data.data.area_energy_use.floor_map;
	        		let pieData = res.data.data.area_energy_use.pie_data;
	        		let trendData = res.data.data.area_energy_use.trend_data;
	        		$.each(chineseData,(n,k)=>{
	        			$.each(pieData,(n1,k1)=>{
	        				if(k.area_id==k1.area_id){
	        					this.data.topPie.push({'value':k1.data,'name':k.title})
	        				}
	        			})
	        			if(k.area_id == thisData.area_id){
	        				this.data.axisLabel.push(k.title);
	        				$.each(thisData.data,(n2,k2)=>{
	        					this.data.legendData.push(k2.date);
	        					this.data.arrData1.push(k2.value);
	        				})
	        			}
	        			if(k.area_id == lastData.area_id){
	        				$.each(lastData.data,(n2,k2)=>{
	        					this.data.arrData2.push(k2.value);
	        				})
	        			}
	        			if(k.area_id == lastThisData.area_id){
	        				$.each(lastThisData.data,(n2,k2)=>{
	        					this.data.arrData3.push(k2.value);
	        				})
	        			}
	        			$.each(trendData,(n1,k1)=>{
	        				this.data.arr1Label.push(k.title);
	        				if(k1.device_id==k.device_id){
	        					$.each(k1.data,(n2,k2)=>{
	        						this.data.arr1x.push(k2.date);
	        						this.data.arr1.push(k2.value);
	        					})

	        				}
	        			});
	        		})
	        		//设备图
	        		console.log(res.data.data.area_energy_use);
	        		let pieData2 = res.data.data.device_energy_use.pie_data;
	        		let chineseData2 = res.data.data.device_energy_use.device_map;
	        		let trendData2 = res.data.data.device_energy_use.trend_data;
	        		let arr = [],arr2=[],arr2x=[],arr2Label=[];

	        		$.each(chineseData2,(n,k)=>{
	        			$.each(pieData2,(n1,k1)=>{
	        				if(k.device_id==k1.device_id){
	        					arr.push({'value':k1.data,'name':k.title})
	        				}
	        			})
	        			$.each(trendData2,(n1,k1)=>{
	        				arr2Label.push(k.title);
	        				if(k1.device_id==k.device_id){
	        					$.each(k1.data,(n2,k2)=>{
	        						arr2x.push(k2.date);
	        						arr2.push(k2.value);
	        					})

	        				}
	        			});
	        		})
	        		this.getBottomEcharts(arr,arr2,arr2x,arr2Label);
	        		that.viewsLoading = false;
	        	})
	        }

        },
        mounted(){
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
