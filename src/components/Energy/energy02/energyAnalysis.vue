<template>
  <!-- 用能分析模块 -->
  <div class="energyAnalysis">
    <!--面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>能源管理系统</el-breadcrumb-item>
      <el-breadcrumb-item>用能分析</el-breadcrumb-item>
    </el-breadcrumb>

  	<!--<Crumbs :data ='crumbs' class="breads"/>-->
  	<div class="boxs chartTables" v-loading="loading1"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.3)">
  		<div class="chartTit">
  			<div class="chartLeftTit">
  				<div class="tit1">区域能耗 | </div>
                <div class="analysisBoxs analysisBoxs1">
                  <el-select v-model="areaDateType" @change="areaDateTypeChange">
                    <el-option
                      v-for="item in areaDateTypes"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div class="analysisBoxs">
                  <el-date-picker
                    v-if=" areaDateType =='year' "
                    v-model="areaDate "
                    value-format="yyyy"
                    type="year"
                    placeholder="请选择">
                  </el-date-picker>

                  <el-date-picker
                    v-if=" areaDateType =='month' "
                    v-model="areaDate"
                    type="month"
                    value-format="yyyyMM"
                    placeholder="请选择">
                  </el-date-picker>

                  <el-date-picker
                    v-if=" areaDateType =='day' "
                    v-model="areaDate"
                    type="date"
                    value-format="yyyyMMdd"
                    placeholder="请选择">
                  </el-date-picker>
                </div>

                <div class="searchBoxs" @click="areaQueryData">
                    <i class="el-icon-search"></i>
                    <span >查询</span>
                </div>
  			</div>
  			<div class="chartRightTit">
			  <el-button type="default" :class="{currData:iscur==index}" :key="item.id" v-for="(item,index) in tabs" @click="loadBarData(index)">{{item.name}}</el-button>
  			</div>
  		</div>
  		<EchartsAnalysis :data="data"/>
  	</div>
  	<div class="boxs chartTables2" v-loading="loading2"
         element-loading-background="rgba(0, 0, 0, 0.5)"
         element-loading-spinner="el-icon-loading">
  		<div class="chartTit">
  			<div class="chartLeftTit">
  				<div class="tit1">设备能耗 | </div>
  				<div class="analysisBoxs analysisBoxs1">
                  <el-select v-model="deviceDateType" @change="deviceDateTypeChange">
                    <el-option
                      v-for="item in deviceDateTypes"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div class="analysisBoxs">
                  <el-date-picker
                    v-if=" deviceDateType=='year' "
                    v-model="deviceDate"
                    type="year"
                    value-format="yyyy"
                    placeholder="请选择">
                  </el-date-picker>

                  <el-date-picker
                    v-if=" deviceDateType=='month' "
                    v-model="deviceDate"
                    type="month"
                    value-format="yyyyMM"
                    placeholder="请选择">
                  </el-date-picker>

                  <el-date-picker
                    v-if=" deviceDateType=='day' "
                    v-model="deviceDate"
                    type="date"
                    value-format="yyyyMMdd"
                    placeholder="请选择">
                  </el-date-picker>
                </div>

                <div class="searchBoxs" @click="deviceQueryData">
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
            loading1:false,
            loading2:false,
            sys_menu_id:"",
            project_id:"",
            deviceDateTypes:[
              {
              value: 'year',
              label: '年'
            }, {
              value: 'month',
              label: '月'
            }, {
              value: 'day',
              label: '日'
            }],
            deviceDateType:"month",
            deviceDate: new Date(),
            areaDateTypes:[
              {
              value: 'year',
              label: '年'
            }, {
              value: 'month',
              label: '月'
            }, {
              value: 'day',
              label: '日'
            }],
            areaDateType:"month",
            areaDate: "" ,
            energy_type: "0",
        		crumbs:['能源管理系统','用能分析'],
        		iscur:0,
        		tabs: [{name: "电",id:0}, {name: "水",id:1} ,{name: "气",id:2}],
        		data:{
        			topPie:[],
        			axisLabel:[],
        			legendData:[],
        			arrData1:[],
        			arrData2:[],
        			arrData3:[],
        			arr1Label:[],
        			arr1:[],
        			arr1x:[],
        			leftTopChart:{
        				rzl:[],
        				floorVal:{
        					rooms0:[],
        					rooms1:[],
        					rooms2:[],
        					rooms3:[],
        					rooms4:[],
        				}
        			},
              config:{
                sys_menu_id: "",
                project_id: "",
                area_query_date_type: "month",
                area_date: "",
                energy_type: "0",
              },
              trendLegendLabel:[]
        		},
        		vanalysis:'',
        		analysis:[]
        	}
        },
        methods:{
          deviceDateTypeChange(val){
            this.deviceDate = "";
            this.data.config.device_date = ""
          },
          areaDateTypeChange(val){
            this.areaDate = "";
            this.data.config.area_date = "";
          },
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
		          	    left:20,
		          	    top:35,
		          	    right:20,
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
                  axisLabel: {
                    interval:3,
                    width:20,
                    showMinLabel:true,
                    showMaxLabel:true,
                    textStyle: {
                      color: '#708FBE',
                      fontSize:10,
                    }
                  },
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
        	  let that = this;
            that.loading1 = true;
            that.data.config.energy_type = that.iscur = i;
            let config = {
              sys_menu_id: that.data.config.sys_menu_id,
              project_id: that.data.config.project_id,
              area_query_date_type: that.areaDateType,
              area_date: that.areaDate,
              energy_type: that.data.config.energy_type,
            }
            that.$http.post('/hotel_energy/analysis',config).then(res=>{
              //区域图
              that.calcAreaData(res);
              setTimeout(function () {
                that.loading1 = false;
              },500)
            })
	        },
          areaQueryData(){
            let that = this;
            that.loading1 = true;

            let config = {
              sys_menu_id: that.data.config.sys_menu_id,
              project_id: that.data.config.project_id,
              //area_query_date_type: that.data.config.area_query_date_type,
              area_query_date_type: that.areaDateType,
              //area_date: that.data.config.area_date,
              area_date: that.areaDate,
              energy_type: that.data.config.energy_type,
            }
            that.$http.post('/hotel_energy/analysis',config).then(res=>{
                //区域图
              if(res.data.code==0){
                that.calcAreaData(res);
                setTimeout(function () {
                  that.loading1 = false;
                },500)
              }
            })
          },
          deviceQueryData(){
        	  let that = this;

        	  let config = {
              sys_menu_id: that.data.config.sys_menu_id,
              project_id: that.data.config.project_id,
              device_query_date_type: that.deviceDateType,
              device_date: that.deviceDate,
            }
            that.$http.post('/hotel_energy/analysis',config).then(res=>{

              that.calcDeviceData(res);

            })
          },
          calcAreaData(res){
        	  let that = this;
            let barData = res.data.data.area_energy_use.column_data;
            let lastThisData = barData.last_this_time;//同期
            let thisData = barData.this_time;//本期
            let lastData = barData.last_time;//上期
            let chineseData = res.data.data.area_energy_use.floor_map;
            let pieData = res.data.data.area_energy_use.pie_data;
            let trendData = res.data.data.area_energy_use.trend_data;
            let tempArray1 = [];
            let tempArray2 = [];
            let tempArray3 = [];
            let tempArray4 = [];
            let tempArray5 = [];
            let tempArray6 = [];
            let tempArray7 = [];
            let tempArray8 = [];

            $.each(chineseData,(n,k)=>{
              $.each(pieData,(n1,k1)=>{
                if(k.area_id==k1.area_id){
                  tempArray4.push({'value':k1.data,'name':k.title})
                }
              })

              $.each(thisData,(o,w)=>{
                if(k.area_id == w.area_id){
                  tempArray1.push(k.title);
                  tempArray8.push(k.title);
                  tempArray2.push(w.data[0].date);
                  tempArray3.push(w.data[0].value);
                }
              });

              $.each(lastData,(o1,w1)=>{
                if(k.area_id == w1.area_id){
                  tempArray2.push(w1.data[0].date);
                  tempArray5.push(w1.data[0].value);
                }
              });

              $.each(lastThisData,(o2,w2)=>{
                if(k.area_id == w2.area_id){
                  tempArray2.push(w2.data[0].date);
                  tempArray6.push(w2.data[0].value);
                }
              });

            })

            that.data.topPie = tempArray4;
            that.data.axisLabel = tempArray1;
            tempArray8.push('入住率');
            that.data.trendLegendLabel = tempArray8;

            that.data.config.area_query_date_type = that.areaDateType;
            that.data.config.area_date = that.areaDate;

            that.data.arrData1 = tempArray3;
            that.data.legendData = tempArray2;
            that.data.arrData2 = tempArray5;
            that.data.arrData3 = tempArray6;

            $.each(trendData.check_in_hotel_rate,(n,k)=>{
              tempArray7.push([k.date,k.value]);
            });

            that.data.leftTopChart.rzl = tempArray7;

          },
          calcDeviceData(res){
        	  let that = this;
            //设备图
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

            arr2Label = arr2Label.filter(function(element,index,self){
              return self.indexOf(element) === index;
            });

            arr2x = arr2x.filter(function(element,index,self){
              return self.indexOf(element) === index;
            });

            that.getBottomEcharts(arr,arr2,arr2x,arr2Label);
          },
	        getDatas(){
            let that = this;
            that.loading1 = that.loading2 = true;
	        	let param = {
              sys_menu_id: that.data.config.sys_menu_id,
              project_id: that.data.config.project_id
	        	}
            that.$http.post('/hotel_energy/analysis',param)
	        	.then(res=>{
              console.log(res);
	        		//区域图
              that.calcDeviceData(res);
              that.calcAreaData(res);
              setTimeout(function () {
                that.loading1 = that.loading2 = false;
              },200)
	        	})
	        },
          resizeCharts(){
            let that = this;
            that.$echarts.init(document.getElementById('deviceLeft')).resize();
            that.$echarts.init(document.getElementById('deviceRight')).resize();
            that.$echarts.init(document.getElementById('lines')).resize();
            that.$echarts.init(document.getElementById('pies')).resize();
            that.$echarts.init(document.getElementById('bars')).resize();
          }

        },
        created(){
          this.data.config.sys_menu_id = this.sys_menu_id = this.$store.state.sysList[2].sys_menu_id;
          this.data.config.project_id = this.project_id = this.$store.state.projectId;
          let curMonth = new Date().getFullYear().toString() + (new Date().getMonth() +1);
          this.areaDate = curMonth;
        },
        mounted(){
          let that = this;
          that.getDatas();

          $(window).resize(function () {
            that.resizeCharts();
          })
        },
        beforeDestroy(){
          $(window).unbind( "resize" );
        }
    }
</script>

<style lang="less" scoped='scoped' type="text/less">
@import '../../../assets/css/comon.less';
	.energyAnalysis{
		width:100%;
		height:100%;
    .el-breadcrumb{
      padding: .1rem .3rem 0;
    }
		.breads{
			margin:0 0.12rem 0.3rem 0;
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
        .chartLeftTit{
          height:100%;
          display: flex;
          align-items: center;
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
	        height: 100%;
	        text-align: center;
          display: flex;
          align-items: center;

          .el-input__inner{
            height: .32rem;
          }
	      }
	     .analysisBoxs1{
	     	margin: 0 0.1rem 0 0.16rem;
	     	width:0.4rem;
	     }
	     .searchBoxs{
	     	color:#fff;
	     	float:left;
	     	margin-left:0.16rem;
        cursor: pointer;
        font-size: .14rem;
	     }
		.chartTables2{
			margin-top:0.2rem;
		}

	}
</style>
