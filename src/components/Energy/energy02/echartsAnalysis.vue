
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
            seviceAllDatas:{},
            areaDateType:"",
            trendYlabelArray1:[
              {
                name:'能耗',
                nameTextStyle:{
                  color:'#fff',
                  fontSize:10
                },
                axisLine: {show:false},
                axisTick: {show:false},
                splitLine: {show:false},
                axisLabel: {
                  show:true,
                  color:'#fff'
                },
                splitArea: {
                  show:true,
                  areaStyle: {color:['rgba(142,187,255,.1)','rgba(142,187,255,.05)']},
                },
                type: 'value',
              },
              {
                name:'入住率',
                nameTextStyle:{
                  color:'#fff',
                  fontSize:10
                },
                axisLine: {show:false},
                axisTick: {show:false},
                splitLine: {show:false},
                axisLabel: {
                  show:true,
                  color:'#fff'
                },
                splitArea: {
                  show:true,
                  areaStyle: {color:['rgba(142,187,255,.1)','rgba(142,187,255,.05)']},
                },
                type: 'value',
              },
            ],
            trednYlabelArray2:[
              {
                name:'能耗',
                nameTextStyle:{
                  color:'#fff',
                  fontSize:10
                },
                axisLine: {show:false},
                axisTick: {show:false},
                splitLine: {show:false},
                axisLabel: {
                  show:true,
                  color:'#fff'
                },
                splitArea: {
                  show:true,
                  areaStyle: {color:['rgba(142,187,255,.1)','rgba(142,187,255,.05)']},
                },
                type: 'value',
              }
            ],
            trednYlabelArray3:[
              {
                name:'',
                nameTextStyle:{
                  color:'#fff',
                  fontSize:10
                },
                axisLine: {show:false},
                axisTick: {show:false},
                splitLine: {show:false},
                axisLabel: {
                  show:true,
                  color:'#fff'
                },
                splitArea: {
                  show:true,
                  areaStyle: {color:['rgba(142,187,255,.1)','rgba(142,187,255,.05)']},
                },
                type: 'value',
              }
            ]
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

              that.trendData = res.data.data.area_energy_use.trend_data;

              let trendData = res.data.data.area_energy_use.trend_data;
              let newRzl = [];
              let newKf = [];
              $.each(trendData.check_in_hotel_rate,function(i,k){
                newRzl.push([k.date,k.value]);
              });
              that.areaEnergyRzl = newRzl;

              let tempArray = [];

              if(trendData.floor_value.length>0){
                trendData.floor_value.map((item,index)=>{
                  let temp = [];
                  item.data.map((items,indexs)=>{
                    temp.push([items.date,items.value]);
                  })
                  tempArray[index] = temp;
                })

                let areaDateType = datas.config.area_query_date_type;
                if(areaDateType != 'year'){
                  tempArray.push(that.areaEnergyRzl);
                }

                that.trendValueData = tempArray;


                $.each(trendData.floor_value[0].data,function(i,k){
                  newKf.push([k.date,k.value]);
                });
                that.areaEnergyKf = newKf;
              }else {
                that.trendValueData = [];
              }



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
            let trendYlabel = [];

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
            let areaDateType = that.data.config.area_query_date_type;

            if(trendValueData.length>0){

              for(var x=0;x<trendValueData[0].length;x++){
                let xtemp = trendValueData[0][x][0];
                trendXdata.push(xtemp);
              }

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
                if( j == trendValueData.length-1 && areaDateType!='year'){
                  trendItem.yAxisIndex = 1;
                }
                trendValueArray.push(trendItem);
              }

            }


            if(trendValueData.length>0){
              if(areaDateType == 'year'){
                trendYlabel = that.trednYlabelArray2;
              }else{
                trendYlabel = that.trendYlabelArray1;
              }
            }else {
              trendYlabel = that.trednYlabelArray3;
            }


		        let option = {
                color:["#FD97AA","#008AFF","#F35E5E","#EEB66E","#EBF191","#C382EF","#95EDC5",'#b5d7ff','#F56C6C','#999'],
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
		          	    left:10,
		          	    top:60,
		          	    right:10,
		                bottom:4,
		                containLabel: true,
		            },
		            legend: {
			          	textStyle: {color: '#B5D7FF',},
			          	top:5,
			          	itemWidth: 15,
	        			  itemHeight: 10,
                  itemGap:5,
                  data: trendLegendLabel,
                 /* data: ['客房','宴会厅','餐厅厨房','公共区域','餐厅','空调','1-5号主机','入住率'],*/
		            },
		            calculable : true,
		            xAxis: {
				          type: 'category',
                  axisLine: {show:false},
                  axisTick: {show:false},
                  splitLine: {show:false},
                  axisLabel: {
                    interval:1,
                    showMinLabel:true,
                    showMaxLabel:true,
                    textStyle: {
                      color: '#708FBE',
                      fontSize:10,
                    }
                  },
                  nameTextStyle:{
				            fontSize:4
                  },
                  nameGap:5,
                  data:trendXdata
			        },
                yAxis: trendYlabel,
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
                        radius : '55%',
                        center: ['50%', '50%'],
                        color:["#FD97AA","#008AFF","#F35E5E","#EEB66E","#EBF191","#C382EF","#95EDC5"],
                        data:data.topPie,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        label:{
                          fontSize:8
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
		                left: '1%',
		                right: '2%',
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
		            yAxis: {
		                min: 0,
		                type: 'value',
		                axisLine: {show:false},
                    axisTick: {show:false},
                    splitLine: {show:false},
		                splitArea: {
				        	    show:true,
                      /*areaStyle: {color:['rgba(142,187,255,.1)','rgba(142,187,255,.05)']},*/
                    },
                },
		            label: {
		                normal: { //显示bar数据
		                    show: true,
		                    position: 'top'
		                }
		            },
		            series: seriesValue
		        };

		        chart.setOption(option,true);
		        chart2.setOption(option2,true);
		        chart3.setOption(option3,true);

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
