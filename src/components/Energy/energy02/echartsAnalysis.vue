
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
            viewsLoading:false,
        	  isReset:false,
        		rtChartLabel:[],
        		rtArr1:[],
        		rtArr2:[],
        		rtArr3:[],
        		areaEnergyRzl:[],
        		areaEnergyKf:[],
            trendData:[],
            trendValueData:[],
            seviceAllDatas:{}
        	}
        },
        watch:{
          // 深度 watcher
          data: {
            handler: function (items) {
              let that = this;
              that.getChartLineData();
            },
            deep: true
          }
        },
        methods:{
        	getChartLineData(){
        	  let that = this;
        	  that.viewsLoading = true;
        	  let datas = that.data;

        		let param = {
	        		project_id: datas.config.project_id,
	        		sys_menu_id: datas.config.sys_menu_id,
	        		area_query_date_type: datas.config.area_query_date_type,
	        		area_date: datas.config.area_date,
              energy_type: datas.config.energy_type
	        	}
            that.$http.post('/hotel_energy/analysis',param)
	        	.then(res=>{
	        	  console.log(res);

	        		//区域图
	        		// console.log(res);
	        		// let barData = res.data.data.area_energy_use.column_data;
	        		// let lastThisData = barData.last_this_time;//同期
	        		// let thisData = barData.this_time;//本期
	        		// let lastData = barData.last_time;//上期
	        		// let chineseData = res.data.data.area_energy_use.floor_map;

        			// console.log(barData);
        			// console.log(chineseData);
        			// $.each(chineseData,(n0,k0)=>{
        			// 	$.each(thisData,(n1,k1)=>{
        			// 		if(k0.area_id == k1.area_id){
        			// 			this.
        			// 		}
        			// 	});
        			// });

              that.trendData = res.data.data.area_energy_use.trend_data;
              console.log(that.trendData);

              let trendData = res.data.data.area_energy_use.trend_data;
              let newRzl = [];
              let newKf = [];
              $.each(trendData.check_in_hotel_rate,function(i,k){
                newRzl.push([k.date,k.value]);
              });
              that.areaEnergyRzl = newRzl;

              let tempArray = [];
              trendData.floor_value.map((item,index)=>{
                let temp = [];
                item.data.map((items,indexs)=>{
                  temp.push([items.date,items.value]);
                })
                tempArray[index] = temp;
              })
              tempArray.push(that.areaEnergyRzl);
              that.trendValueData = tempArray;
              console.log(that.trendValueData)

              $.each(trendData.floor_value[0].data,function(i,k){
                newKf.push([k.date,k.value]);
              });
              that.areaEnergyKf = newKf;


              that.drawLine(that.data);

	        	})
            return false;
        	},
        	drawLine(data){
        	  let that = this;

        		let chart = that.$echarts.init(document.getElementById('lines'));
        		let chart2 = that.$echarts.init(document.getElementById('pies'));
        		let chart3 = that.$echarts.init(document.getElementById('bars'));
        		let trendValueData = that.trendValueData;

        		let legendData = data.legendData;

            legendData = legendData.filter(function(element,index,self){
                return self.indexOf(element) === index;
            });

            let legendLen = legendData.length;
		        let axisLabel = data.axisLabel;
		        let arrData = [data.arrData1,data.arrData2,data.arrData3];
		        let seriesValue = [];
		        let trendValueArray = [];
		        let trendXdata = [];
		        for(var x=0;x<trendValueData[0].length;x++){
		          let xtemp = trendValueData[0][x][0];
		          trendXdata.push(xtemp);

		        }
		        console.log(trendXdata);

		        for (var i = 0; i < legendLen; i++) {
		            var seriesDataVal = null;
		            seriesDataVal = {
		                barWidth: 8,//柱状条宽度
		                name:legendData[i],
		                type:'bar',
                    barGap: 0,
		                data:arrData[i]
		            };
		            seriesValue.push(seriesDataVal);
		        }

            let trendLegendLabel = data.trendLegendLabel;
		        console.log(trendLegendLabel);

		        for(var j=0;j<trendValueData.length;j++){
              var trendItem;
              trendItem = {
                name: trendLegendLabel[j],
                data: trendValueData[j],//data.custom,
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
              }
              trendValueArray.push(trendItem);
            }
            console.log(trendValueArray);

		        let option = {
                color:["#FD97AA","#008AFF","#F35E5E","#EEB66E","#EBF191","#C382EF","#95EDC5",'#b5d7ff'],
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
			            data: trendLegendLabel,
                 /* data: ['客房','宴会厅','餐厅厨房','公共区域','餐厅','空调','1-5号主机','入住率'],*/
		            },
		            calculable : true,
		            xAxis: {
				          type: 'time',
                  axisLine: {show:false},
                  axisTick: {show:false},
                  splitLine: {show:false},
                  axisLabel: {
                    textStyle: {
                      color: '#708FBE',
                      showMinLabel:false,
                      showMaxLabel:false,
                    }
                  },
                  nameTextStyle:{
				            fontSize:4
                  },
                  nameGap:5,
                  data:trendXdata
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
                series: trendValueArray
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
                color: ['#FA6074', '#FFA414', '#3B89F9'],
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
				        	/*areaStyle: {color:['rgba(142,187,255,.1)','rgba(142,187,255,.05)']},*/
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

            that.viewsLoading = false;
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
