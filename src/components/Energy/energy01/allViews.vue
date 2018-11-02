<template>
  <!--全局查看模块-->

  <div class="allViewsContainer">
    <!--面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>能源管理系统</el-breadcrumb-item>
      <el-breadcrumb-item>全景查看</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="viewsContentBox">
      <div class="viewRow">
        <!--总能耗-->
        <div class="viewColum">
          <header>
            <div class="titleBox">总能耗</div>
            <div class="exhaustItem">今年碳排放：<span class="color1">{{totalEnergyUsageData.yearActualTotal}}</span>Kg，计划<span class="color2">{{totalEnergyUsageData.yearPlanTotal}}</span>Kg</div>
            <div class="exhaustItem">本月碳排放：<span class="color1">{{totalEnergyUsageData.monthActualTotal}}</span>Kg，计划<span class="color2">{{totalEnergyUsageData.monthPlanTotal}}</span>Kg</div>
          </header>
          <div class="viewItemContent">
            <div class="totalEnergyItem">
              <div class="totalEnergyItemHead">
                <div>{{totalEnergyUsageData.monthActualUsage[0]}}</div><p>本月</p>
              </div>
              <div class="totalEnergyItemCont">
                <div id="energyChart1" class="totalEnergyChartBox">
                  <div class="fingerContainer energyFinger1">
                    <div class="fingerBox"></div>
                  </div>
                  <div class="percentageTextTip"><span class="percentageRealVal"></span></div>
                </div>
                <div class="totalEnergyItemFoot">
                  <div class="unit">kw/h</div>
                  <div class="totalVal">{{totalEnergyUsageData.monthPlanUsage[0]}}</div>
                  <div class="title">本月能耗值</div>
                  <div class="type">电</div>
                </div>
              </div>
            </div>
            <div class="totalEnergyItem">
              <div class="totalEnergyItemHead">
                <div>{{totalEnergyUsageData.monthActualUsage[1]}}</div><p>本月</p>
              </div>
              <div class="totalEnergyItemCont">
                <div id="energyChart2" class="totalEnergyChartBox">
                  <div class="fingerContainer energyFinger2">
                    <div class="fingerBox"></div>
                  </div>
                  <div class="percentageTextTip"><span class="percentageRealVal"></span></div>
                </div>
                <div class="totalEnergyItemFoot">
                  <div class="unit">t</div>
                  <div class="totalVal">{{totalEnergyUsageData.monthPlanUsage[1]}}</div>
                  <div class="title">本月能耗值</div>
                  <div class="type">水</div>
                </div>
              </div>
            </div>
            <div class="totalEnergyItem">
              <div class="totalEnergyItemHead">
                <div>{{totalEnergyUsageData.monthActualUsage[2]}}</div><p>本月</p>
              </div>
              <div class="totalEnergyItemCont">
                <div id="energyChart3" class="totalEnergyChartBox">
                  <div class="fingerContainer energyFinger3">
                    <div class="fingerBox"></div>
                  </div>
                  <div class="percentageTextTip"><span class="percentageRealVal"></span></div>
                </div>
                <div class="totalEnergyItemFoot">
                  <div class="unit">m³</div>
                  <div class="totalVal">{{totalEnergyUsageData.monthPlanUsage[2]}}</div>
                  <div class="title">本月能耗值</div>
                  <div class="type">气</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--能耗趋势-->
        <div class="viewColum allViewArea2">
          <header>
            <div class="titleBox">能耗趋势</div>
            <div class="energyArea2Tabs">
              <el-tabs v-model="energyArea2Type" type="card" @tab-click="viewsTrendTypeChange">
                <el-tab-pane label="电" name="0"></el-tab-pane>
                <el-tab-pane label="水" name="1"></el-tab-pane>
                <el-tab-pane label="气" name="2"></el-tab-pane>
              </el-tabs>
            </div>
          </header>
          <div class="viewItemContent">
            <lineEchart :datas="energyTrend0.echarts" :key="energyTrend0.id" />
            <lineEchart :datas="energyTrend1.echarts" :key="energyTrend1.id" />
            <lineEchart :datas="energyTrend2.echarts" :key="energyTrend2.id" />
          </div>
        </div>
      </div>

      <div class="viewRow">
        <!--电能峰平谷-->
        <div class="viewColum energyArea3">
          <header>
            <div class="titleBox">电能峰平谷</div>
            <div class="queryBox">
              <el-select placeholder="请选择" v-model="dateUnit" class="dateUnitSelectItem" clearable @change="dateTypeChange">
                <el-option
                  v-for="item in dateOptions"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id">
                </el-option>
              </el-select>
              <div class="yearRangeBox" v-show=" dateUnit=='year' ">
                <el-date-picker
                  v-model="dateRangeValue"
                  type="year"
                  value-format="yyyy"
                  placeholder="请选择">
                </el-date-picker>
              </div>
              <div class="yearRangeBox" v-show=" dateUnit=='month' ">
                <el-date-picker
                  v-model="dateRangeValue"
                  format="yyyy-M"
                  value-format="yyyyMM"
                  type="month"
                  placeholder="请选择">
                </el-date-picker>
              </div>
              <div class="yearRangeBox" v-show=" dateUnit=='day' ">
                <el-date-picker
                  v-model="dateRangeValue"
                  format="yyyy-M-d"
                  value-format="yyyyMMdd"
                  type="date"
                  placeholder="请选择">
                </el-date-picker>
              </div>
              <div>
                <el-button class="area3-QueryDateBtn" @click="viewsQueryRangeData"><i></i><span>查询</span></el-button>
              </div>
            </div>
          </header>
          <div class="viewItemContent">
            <div class="energyArea3Item">
              <div class="head">
                <div class="type1">谷时用电</div>
                <div class="type2">峰时用电</div>
                <div class="type3">平时用电</div>
              </div>
              <div class="content">
                <div id="energyArea3Chart1"></div>
                <div id="energyArea3Chart2"></div>
              </div>
            </div>
            <div class="energyArea3Item">
              <div class="head">
                <div class="type1">谷时用电</div>
                <div class="type2">峰时用电</div>
                <div class="type3">平时用电</div>
              </div>
              <div class="content">
                <div id="energyArea3Chart3"></div>
                <div id="energyArea3Chart4"></div>
              </div>
            </div>
          </div>
        </div>

        <!--财务情况-->
        <div class="viewColum energyArea4">
          <header>
            <div class="titleBox">财务情况</div>
          </header>
          <div class="viewItemContent">
            <div class="head">
              <span>营收</span><div class="incomeBox">{{finance_info.real_time_income}}</div>
            </div>
            <div class="head">
              <span>入住率</span><div class="perBox">{{finance_info.check_in_rate}}%</div>
            </div>
            <div class="chartsBox">
              <div class="type1">
                <div id="energyArea4Chart1"></div>
              </div>
              <div class="type2">
                <div class="typeChartBox">
                  <div>
                    <div id="energyArea4Chart2"></div>
                    <div class="centerType">水</div>
                  </div>
                  <div>
                    <div id="energyArea4Chart3"></div>
                    <div class="centerType">电</div>
                  </div>
                  <div>
                    <div id="energyArea4Chart4"></div>
                    <div class="centerType">气</div>
                  </div>
                </div>
                <div class="typeTitleBox">
                  <div class="typeTitleText">每房晚能耗</div>
                  <div class="typeTitleVal">
                    <div>{{finance_info.house_num[0]}}/{{finance_info.house_num[1]}}</div>
                    <p>房位数</p>
                  </div>
                </div>
              </div>
              <div class="type2">
                <div class="typeChartBox">
                  <div>
                    <div id="energyArea4Chart5"></div>
                    <div class="centerType">水</div>
                  </div>
                  <div>
                    <div id="energyArea4Chart6"></div>
                    <div class="centerType">电</div>
                  </div>
                  <div>
                    <div id="energyArea4Chart7"></div>
                    <div class="centerType">气</div>
                  </div>
                </div>
                <div class="typeTitleBox">
                  <div class="typeTitleText">每餐位能耗</div>
                  <div class="typeTitleVal">
                    <div>{{finance_info.seat_num[0]}}/{{finance_info.seat_num[1]}}</div>
                    <p>餐位数</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  import '../../../assets/css/allView.css';
  import lineEcharts from '../../common/allVienLineEchart.vue';

  export default {
    name: "all-views",
    components:{
      "lineEchart":lineEcharts
    },
    name: "all-views",
    data(){
      return{
        energyArea2Type:"0",
        energyTrend0:{
          id: 'energyTrendCharts0',
          echarts:{
            id:"lineEchartShui1",
            type:'电',
            unit:"",
            title:"单位：月份/KW/h",
            style:{
              width:'100%',
              height: '100%'
            },
            xDate:['01','02','03','04','05','06','07','08','09','10','11','12'],
            list:[
              {name:"2018",data:[]},
              {name:"2017",data:[]},
              {name:"今年计划",data:[]},
            ]
          }
        },
        energyTrend1:{
          id: 'energyTrendCharts1',
          echarts:{
            id:"lineEchartShui2",
            type:'水',
            unit:"",
            title:"单位：月份/t",
            style:{
              width:'100%',
              height: '100%'
            },
            xDate:['01','02','03','04','05','06','07','08','09','10','11','12'],
            list:[
              {name:"2018",data:[]},
              {name:"2017",data:[]},
              {name:"今年计划",data:[]},
            ]
          }
        },
        energyTrend2:{
          id: 'energyTrendCharts2',
          echarts:{
            id:"lineEchartShui3",
            type:'气',
            unit:"",
            title:"单位：月份/m³",
            style:{
              width:'100%',
              height: '100%'
            },
            xDate:['01','02','03','04','05','06','07','08','09','10','11','12'],
            list:[
              {name:"2018",data:[]},
              {name:"2017",data:[]},
              {name:"今年计划",data:[]}
            ]
          }
        },
        dateDayRangeValue:"",
        dateRangeValue:"",
        dateUnit:'month',
        dateOptions:[{id:'year',title:"年"},{id:'month',title:"月"},{id:'day',title:"日"}],
        totalEnergyUsageData:{
          monthActualTotal: 0,
          monthActualUsage:{
            "0": '0',
            "1": '0',
            "2": '0'
          },
          monthPlanTotal:'6205.99',
          monthPlanUsage:{
            "0": 0,
            "1": 0,
            "2": 0
          },
          yearActualTotal:'0',
          yearPlanTotal:'0',
          monthUsagePer:{
            "0":"0",
            "1":"0",
            "2":"0"
          }
        },
        finance_info:{
          "check_in_rate": "0",
          "energy_cost_rate": 0,
          "house_num": [0, 0],
          "one_house_one_night_use": {
            0:0,
            1:0,
            2:0
          },
          "one_seat_use": {
            0:0,
            1:0,
            2:0
          },
          "real_time_income": 0,
          "seat_num": [0, 0]
        },
        allDatas:""
      }
    },
    methods:{
      viewsTrendTypeChange(){
        let index = this.energyArea2Type;
        this.requestTrendTypeData(index);
      },
      calcTipPosition(a) {
        var center= Number($(".percentageTextTip").width())/2;
        var winWidth = $("html").width();
        var r;
        if(winWidth<1500){r = 78};
        if(winWidth>1500 && winWidth <=1600){r = 80};
        if(winWidth>1600 && winWidth <=1700){r = 85};
        if(winWidth>1700 && winWidth <=1800){r = 90};
        if(winWidth>1800){r = 100};
        var realA = (145 + 246 * (Number(a)/100));
        return {
          left: Math.round(center + Math.cos(realA *Math.PI/180) * r),
          top:  Math.round(center + Math.sin(realA *Math.PI/180) * r)
        }
      },
      dateTypeChange(){
        this.dateRangeValue = "";
        $(".el-date-editor.el-range-editor").css({border:'none!important'});
      },
      viewsQueryRangeData(){
        let that = this;
        that.requestElcPowerData();
      },
      totalEnergyChartRotate(per,ele){
        let that = this;
        let deg = (232 + 256 * (Number(per)/100));
        $(ele).css("transform","rotate("+ deg + "deg)");
        var ps = that.calcTipPosition(per);
        $(ele).siblings(".percentageTextTip").find("span").css({
          left:ps.left,
          top:ps.top
        }).text(per+"%");
      },
      initArea3Chart1(data){
        let that = this;
        var myChart = that.$echarts.init(document.getElementById('energyArea3Chart1'));
        var option = {
          backgroundColor: 'transparent',
          tooltip : {
            trigger: 'item',
            formatter: "{b} : {c} 度"
          },
          visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {}
          },
          series : [
            {
              name:'访问来源',
              type:'pie',
              radius : '80%',
              center: ['50%', '50%'],
              color: ['#2DF0E0','#FFA414', '#316EFF' ],
              data:[
                {value:data.feng, name:'谷时用电'},
                {value:data.gu, name:'峰时用电'},
                {value:data.ping, name:'平时用电'}
              ],
              roseType: 'radius',
              selectedMode: 'single',
              label: {
                normal: {
                  position: 'outside',
                  formatter:'{c}度'
                }
              },
              labelLine: {
                normal: {
                  smooth: 0.2,
                  length: 10,
                  length2: 10,
                }
              },
              itemStyle: {
                color: ['#2DF0E0','#FFA414', '#316EFF' ],
                normal: {
                  shadowBlur: 200,
                  shadowColor: 'rgba(0, 0, 0, 0)'
                }
              },
              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay: function (idx) {
                return Math.random() * 200;
              }
            }
          ]
        };
        myChart.setOption(option);
      },
      initArea3Chart2(data){
        var myChart = this.$echarts.init(document.getElementById('energyArea3Chart2'));
        var option = {
          backgroundColor: 'transparent',
          tooltip : {
            trigger: 'item',
            formatter: "{b} : {c} 度"
          },
          visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {}
          },
          series : [
            {
              name:'访问来源',
              type:'pie',
              radius : '80%',
              center: ['50%', '50%'],
              color: ['#2DF0E0','#FFA414', '#316EFF' ],
              data:[
                {value:data.feng, name:'谷时用电'},
                {value:data.gu, name:'峰时用电'},
                {value:data.ping, name:'平时用电'}
              ],
              roseType: 'radius',
              selectedMode: 'single',
              label: {
                normal: {
                  formatter: '{d}% ',
                  position: 'inner',
                  fontSize: 14
                }
              },
              labelLine: {
                normal: {
                  smooth: 0.2,
                  length: 10,
                  length2: 10,

                }
              },
              itemStyle: {
                color: ['#2DF0E0','#FFA414', '#316EFF' ],
                normal: {

                  shadowBlur: 200,
                  shadowColor: 'rgba(0, 0, 0, 0)'
                }
              },

              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay: function (idx) {
                return Math.random() * 200;
              }
            }
          ]
        };
        myChart.setOption(option);
      },
      initArea3Chart3(data){
        var myChart = this.$echarts.init(document.getElementById('energyArea3Chart3'));
        var option = {
          backgroundColor: 'transparent',
          tooltip : {
            trigger: 'item',
            formatter: "{b} : {c} 度"
          },
          visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {}
          },
          series : [
            {
              name:'访问来源',
              type:'pie',
              radius : '80%',
              center: ['50%', '50%'],
              color: ['#2DF0E0','#FFA414', '#316EFF' ],
              data:[
                {value:data.feng, name:'谷时用电'},
                {value:data.gu, name:'峰时用电'},
                {value:data.ping, name:'平时用电'}
              ],
              roseType: 'radius',
              selectedMode: 'single',
              label: {
                normal: {
                  position: 'outside',
                  formatter:'{c}度'
                }
              },
              labelLine: {
                normal: {
                  smooth: 0.2,
                  length: 10,
                  length2: 10,
                }
              },
              itemStyle: {
                color: ['#2DF0E0','#FFA414', '#316EFF' ],
                normal: {
                  shadowBlur: 200,
                  shadowColor: 'rgba(0, 0, 0, 0)'
                }
              },
              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay: function (idx) {
                return Math.random() * 200;
              }
            }
          ]
        };
        myChart.setOption(option);
      },
      initArea3Chart4(data){
        var myChart = this.$echarts.init(document.getElementById('energyArea3Chart4'));
        var option = {
          backgroundColor: 'transparent',
          tooltip : {
            trigger: 'item',
            formatter: "{b} : {c} 度"
          },
          visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {}
          },
          series : [
            {
              name:'访问来源',
              type:'pie',
              radius : '80%',
              center: ['50%', '50%'],
              color: ['#2DF0E0','#FFA414', '#316EFF' ],
              data:[
                {value:data.feng, name:'谷时用电'},
                {value:data.gu, name:'峰时用电'},
                {value:data.ping, name:'平时用电'}
              ],
              roseType: 'radius',
              selectedMode: 'single',
              label: {
                normal: {
                  formatter: '{d}% ',
                  position: 'inner',
                  fontSize: 14
                }
              },
              labelLine: {
                normal: {
                  smooth: 0.2,
                  length: 10,
                  length2: 10,
                }
              },
              itemStyle: {
                color: ['#2DF0E0','#FFA414', '#316EFF' ],
                normal: {

                  shadowBlur: 200,
                  shadowColor: 'rgba(0, 0, 0, 0)'
                }
              },

              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay: function (idx) {
                return Math.random() * 200;
              }
            }
          ]
        };
        myChart.setOption(option);
      },
      initArea3Charts(data){
        let that = this;
        that.initArea3Chart1(data[0]);
        that.initArea3Chart2(data[0]);
        that.initArea3Chart3(data[1]);
        that.initArea3Chart4(data[1]);
      },
      initArea4Chart1(){
        var that = this;
        var per = that.finance_info.energy_cost_rate;
        var leftPer = 100 - Number(per);
        var myChart = that.$echarts.init(document.getElementById('energyArea4Chart1'));
        var option = {
          backgroundColor: 'transparent',
          tooltip : {
            trigger: 'item',
            formatter: "{b} : {d}%"
          },
          legend: {
            bottom: 0,
            left: 'center',
            data: ['能源费用占比'],
            borderRadius:0,
            itemWidth: 10,
            itemHeight:10,
            textStyle:{
              color:"#B5D7FF",
              fontSize:12
            }
          },
          series : [
            {
              color: ['#FFA414','#008AFF' ],
              type: 'pie',
              radius : '70%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              label: {
                normal: {
                  formatter: '{d}% ',
                  position: 'inner',
                  fontSize: 12
                }
              },
              data:[
                {value:per, name: '能源费用占比'},
                {value:leftPer, name: '剩余',label:{show:false}}
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
        myChart.setOption(option);
      },
      initArea4Chart2(){
        var per = this.finance_info.one_house_one_night_use[0];
        var leftPer= 100 - Number(per);
        var myChart = this.$echarts.init(document.getElementById('energyArea4Chart2'));
        var option = {
          backgroundColor: 'transparent',
          series : [
            {
              color: ['#59E9F5','#008AFF' ],
              type: 'pie',
              radius : '75%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              label: {
                normal: {
                  formatter: '{c} t',
                  position: 'inner',
                  fontSize: 8
                }
              },
              data:[
                {value:per, name: '水'},
                {value:leftPer, name: '剩余',label:{show:false}}
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 0,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0)'
                }
              }
            }
          ]
        };
        myChart.setOption(option);
      },
      initArea4Chart3(){
        var per = this.finance_info.one_house_one_night_use[1];
        var leftPer= 100 - Number(per);
        var myChart = this.$echarts.init(document.getElementById('energyArea4Chart3'));
        var option = {
          backgroundColor: 'transparent',
          series : [
            {
              color: ['#FE5E83','#008AFF' ],
              type: 'pie',
              radius : '75%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              label: {
                normal: {
                  formatter: '{c} kw/h',
                  position: 'inner',
                  fontSize: 8
                }
              },
              data:[
                {value:per, name: '电'},
                {value:leftPer, name: '剩余',label:{show:false}}
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 0,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0)'
                }
              }
            }
          ]
        };
        myChart.setOption(option);
      },
      initArea4Chart4(){
        var per = this.finance_info.one_house_one_night_use[2];
        var leftPer = 100 - Number(per);
        var myChart = this.$echarts.init(document.getElementById('energyArea4Chart4'));
        var option = {
          backgroundColor: 'transparent',
          series : [
            {
              color: ['#2772E3','#008AFF' ],
              type: 'pie',
              radius : '75%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              label: {
                normal: {
                  formatter: '{c} m³ ',
                  position: 'inner',
                  fontSize: 8
                }
              },
              data:[
                {value:per, name: '气'},
                {value:leftPer, name: '剩余',label:{show:false}}
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 0,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0)'
                }
              }
            }
          ]
        };
        myChart.setOption(option);
      },
      initArea4Chart5(){
        var per = this.finance_info.one_seat_use[0];
        var leftPer = 100 - Number(per);
        var myChart = this.$echarts.init(document.getElementById('energyArea4Chart5'));
        var option = {
          backgroundColor: 'transparent',
          series : [
            {
              color: ['#59E9F5','#008AFF' ],
              type: 'pie',
              radius : '75%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              label: {
                normal: {
                  formatter: '{c} t',
                  position: 'inner',
                  fontSize: 8
                }
              },
              data:[
                {value:per, name: '水'},
                {value:leftPer, name: '剩余',label:{show:false}}
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 0,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0)'
                }
              }
            }
          ]
        };
        myChart.setOption(option);
      },
      initArea4Chart6(){
        var per = this.finance_info.one_seat_use[1];
        var leftPer = 100 - Number(per);
        var myChart = this.$echarts.init(document.getElementById('energyArea4Chart6'));
        var option = {
          backgroundColor: 'transparent',
          series : [
            {
              color: ['#FE5E83','#008AFF' ],
              type: 'pie',
              radius : '75%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              label: {
                normal: {
                  formatter: '{c} kw/h',
                  position: 'inner',
                  fontSize: 8
                }
              },
              data:[
                {value:per, name: '电'},
                {value:leftPer, name: '剩余',label:{show:false}}
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 0,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0)'
                }
              }
            }
          ]
        };
        myChart.setOption(option);
      },
      initArea4Chart7(){
        var per = this.finance_info.one_seat_use[2];
        var leftPer = 100 - Number(per);
        var myChart = this.$echarts.init(document.getElementById('energyArea4Chart7'));
        var option = {
          backgroundColor: 'transparent',
          series : [
            {
              color: ['#2772E3','#008AFF' ],
              type: 'pie',
              radius : '75%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              label: {
                normal: {
                  formatter: '{c} m³ ',
                  position: 'inner',
                  fontSize: 8
                }
              },
              data:[
                {value:per, name: '气'},
                {value:leftPer, name: '剩余',label:{show:false}}
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 0,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0)'
                }
              }
            }
          ]
        };
        myChart.setOption(option);
      },
      initArea4Charts(){
        let that = this;
        that.initArea4Chart1();
        that.initArea4Chart2();
        that.initArea4Chart3();
        that.initArea4Chart4();
        that.initArea4Chart5();
        that.initArea4Chart6();
        that.initArea4Chart7();
      },
      requestAllData(){
        let that = this;
        let projectId = that.$store.state.projectId;
        let config = {
          project_id: projectId
        }

        that.$http.post('hotel_energy/index',config).then(res=>{
          console.log(res);
          if(res.data.code == 0){
            var energyData = that.allDatas = res.data.data;
            that.calcArea1Data(energyData.total_energy_use);
            that.calcArea2Data(energyData.energy_trend_3_year,'energyTrend0',0);
            that.calcArea3Data(energyData.feng_ping_gu);
            that.calcArea4Data(energyData.finance_info);
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      requestTrendTypeData(index){
        let that = this;
        let projectId = that.$store.state.projectId;
        let config = {
          project_id: projectId,
          energy_type:index
        }

        that.$http.post('hotel_energy/index',config).then(res=>{
          console.log(res);
          if(res.data.code == 0){
            var trendData = res.data.data;
            that.calcArea2Data(trendData.energy_trend_3_year,'energyTrend'+index,index);
          }
        }).catch(err=>{
          console.log(err);
        })

      },
      requestElcPowerData(){
        let that = this;
        let projectId = that.$store.state.projectId;
        let config = {
          project_id: projectId,
          query_date_type: that.dateUnit,
          query_date: that.dateRangeValue
        }

        that.$http.post('hotel_energy/index',config).then(res=>{
          console.log(res);
          if(res.data.code == 0){
            var data = res.data.data.feng_ping_gu;
            that.calcArea3Data(data);
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      calcArea1Data(data){
        let that = this;
        that.totalEnergyUsageData.monthActualTotal = data.this_month_actual_carbon_emission;
        var monthActuUsage = that.totalEnergyUsageData.monthActualUsage = data.this_month_actual_use_energy;
        that.totalEnergyUsageData.monthPlanTotal = data.this_month_plan_carbon_emission;
        var monthPlagUsage = that.totalEnergyUsageData.monthPlanUsage = data.this_month_plan_use_energy;
        that.totalEnergyUsageData.yearActualTotal = data.this_year_actual_carbon_emission;
        that.totalEnergyUsageData.yearPlanTotal = data.this_year_plan_carbon_emission;
        var perObj = {};
        for(var i=0;i<3;i++){
          var num = ((Number(monthActuUsage[i]) / Number(monthPlagUsage[i])) * 100).toFixed(1);
          perObj[i] = Math.round(num);
          if(i==2){that.totalEnergyUsageData.monthUsagePer = perObj};
        }
        that.totalEnergyChartRotate(perObj[0],'.energyFinger1');
        that.totalEnergyChartRotate(perObj[1],'.energyFinger2');
        that.totalEnergyChartRotate(perObj[2],'.energyFinger3');

      },
      calcArea2Data(data,ele,index){
        let that = this;
        let random = Math.ceil(Math.random()*1000 +1);
        var unit,type;
        if(index == 0){
          unit = '月份/KW/h';
          type = '电';
        }else if(index == 1){
          unit = '月份/t';
          type = '水';
        }else if(index == 2){
          unit = '月份/m³';
          type = '气';
        }
        that[ele] = {
          id: 'energyTrendChart'+random,
          echarts:{
            id:"lineEcharts"+random,
            type: type,
            unit:"",
            title:"单位：" + unit,
            style:{
              width:'100%',
              height: '100%'
            },
            xDate:['01','02','03','04','05','06','07','08','09','10','11','12'],
            list:[
              {name:"2018",data:data['2017']},
              {name:"2017",data:data['2018']},
              {name:"今年计划",data:data['this_year_plan']},
            ]
          }
        }
        that.$forceUpdate();
        $(".allViewArea2 .myChartBox").eq(index).show().siblings().hide();
      },
      calcArea3Data(data){
        let that = this;
        var elecPowerData = [];
        for(var i=0;i<2;i++){
          var tempObj={};
          tempObj.feng = data.feng[i];
          tempObj.gu = data.gu[i];
          tempObj.ping = data.ping[i];
          elecPowerData[i] = tempObj;
        }
        that.initArea3Charts(elecPowerData);
      },
      calcArea4Data(data){
        let that = this;
        that.finance_info = data;
        that.initArea4Charts();
        that.$forceUpdate();
      },
      resizeViewCharts(){
        let that = this;
        that.$echarts.init(document.getElementById('energyArea3Chart1')).resize();
        that.$echarts.init(document.getElementById('energyArea3Chart2')).resize();
        that.$echarts.init(document.getElementById('energyArea3Chart3')).resize();
        that.$echarts.init(document.getElementById('energyArea3Chart4')).resize();
        that.$echarts.init(document.getElementById('energyArea4Chart1')).resize();
        that.$echarts.init(document.getElementById('energyArea4Chart2')).resize();
        that.$echarts.init(document.getElementById('energyArea4Chart3')).resize();
        that.$echarts.init(document.getElementById('energyArea4Chart4')).resize();
        that.$echarts.init(document.getElementById('energyArea4Chart5')).resize();
        that.$echarts.init(document.getElementById('energyArea4Chart6')).resize();
        that.$echarts.init(document.getElementById('energyArea4Chart7')).resize();
      }
    },
    created(){

    },
    mounted(){
      let that = this;
      that.requestAllData();

      $(window).resize(function () {
        let datas = that.allDatas;
        that.calcArea1Data(datas.total_energy_use);
        that.calcArea2Data(datas.energy_trend_3_year,'energyTrend0',0);
        that.resizeViewCharts();
      })
    },
    beforeDestroy(){
      $(window).unbind( "resize" );
    }
  }

</script>

<style scoped>
  .allViewsContainer{
    padding: 0 .3rem;
    height: 100%;
  }
  .viewsContentBox{
    height: calc(100% - 40px);
  }
  .viewRow{
    height: 2.8rem;
    display: flex;
  }
  .viewColum{
    height: 100%;
    flex: 1;
    box-shadow:0px 4px 10px 0px rgba(74,144,226,0.22),1px 1px 2px 0px rgba(248,253,255,0.15),0px -1px 1px 0px rgba(74,144,226,1);
    border-radius: 4px;
    overflow: hidden;
  }
  .viewRow:first-child{margin-bottom: .2rem;}
  .viewColum:first-child{margin-right: .2rem;}
  .viewColum header{
    height: .4rem;
    background-color: rgba(0,0,0,.2);
    display: flex;
    align-items: center;
  }
  .titleBox{
    padding: 0 .16rem;
    font-size: .16rem;
    color: #008AFF;
    height: .16rem;
    line-height: .16rem;
    border-right: 1px solid #008AFF;
  }
  .exhaustItem{
    height: .4rem;
    line-height: .4rem;
    font-size: .14rem;
    color: #B5D7FF;
    margin-left: .2rem;
  }
  .exhaustItem:last-child{margin-left: .3rem;}
  .exhaustItem .color1{color: #3B89F9}
  .exhaustItem .color2{color: #4AE283;margin-left: 4px;}
  .viewItemContent{
    height: calc(100% - .4rem);
    padding: .06rem .04rem;
    display: flex;
  }
  .totalEnergyItem{
    flex: 1;
    padding: 0 .06rem;
    position: relative;
  }
  .totalEnergyItemHead{
    height: .4rem;
    background:linear-gradient(270deg,rgba(35,100,219,0) 0%,rgba(34,76,152,0.45) 52%,rgba(35,100,219,0) 100%);
    text-align: center;
  }
  .totalEnergyItemHead>div{
    font-size: .16rem;
    height: .24rem;
    line-height: .16rem;
    padding-top: .08rem;
    color: #fff;
  }
  .totalEnergyItemHead>p{
    font-size: .16rem;
    line-height: .16rem;
    transform: scale(.5);
    color: #008AFF;
  }
  .totalEnergyItemCont{
    position: relative;
    color: #fff;
    height: calc(100% - .4rem);
    padding: .08rem 0 0;
  }
  .totalEnergyChartBox{
    width: 1.8rem;
    height: 1.8rem;
    margin: 0 auto;
    position: relative;
  }
  #energyChart1{
    background: url("../../../assets/img/Energy/redBg.png") no-repeat center;
    background-size: 1.2rem auto;
  }
  #energyChart2{
    background: url("../../../assets/img/Energy/greenBg.png") no-repeat center;
    background-size: 1.2rem auto;
  }
  #energyChart3{
    background: url("../../../assets/img/Energy/blueBg.png") no-repeat center;
    background-size: 1.2rem auto;
  }
  .energyFinger1{
    background: url("../../../assets/img/Energy/redP.png") no-repeat center top .25rem;
    background-size: auto .7rem;
  }
  .energyFinger2{
    background: url("../../../assets/img/Energy/greenP.png") no-repeat center top .25rem;
    background-size: auto .7rem;
  }
  .energyFinger3{
    background: url("../../../assets/img/Energy/blueP.png") no-repeat center top .25rem;
    background-size: auto .7rem;
  }
  @keyframes rotateCircle {
    from{
      transform: rotate(0deg);
    }
    to{
      transform: rotate(360deg);
    }
  }
  .fingerBox{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: .08rem;
    height: .08rem;
    border-radius: 100%;
    border: 3px solid rgba(46,73,152,1);
    box-sizing: content-box;
  }
  .fingerBox::before{
    content: "";
    display: block;
    width: .02rem;
    height: .02rem;
    background-color: #000;
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
  }
  .fingerBox .finger{
    position: absolute;
    width: 1px;
    height: .54rem;
    left:50%;
    bottom:-.54rem;
  }
  .fingerBox .finger::before{
    content: "";
    display: block;
    position: absolute;
    width: .038rem;
    height: .4rem;
    left: -.02rem;
    top: .15rem;
  }
  .fingerContainer{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top:0;
    z-index: 100;
    transform: rotate(232deg);
    transition: all .5s ease-in;
  }
  .energyFinger1 .fingerBox,.energyFinger1 .fingerBox .finger,.energyFinger1 .fingerBox .finger::before{
    background-color: #FE6182;
  }
  .energyFinger2 .fingerBox,.energyFinger2 .fingerBox .finger,.energyFinger2 .fingerBox .finger::before{
    background-color: #30DFC5;
  }
  .energyFinger3 .fingerBox,.energyFinger3 .fingerBox .finger,.energyFinger3 .fingerBox .finger::before{
    background-color: #2772E3;
  }
  .totalEnergyItemFoot{
    position: absolute;
    width: 100%;
    height: .7rem;
    text-align: center;
    left: 0;
    bottom: 0;
    z-index: 200;
  }
  .totalEnergyItemFoot .unit{
    font-size: .16rem;
    line-height: .2rem;
    transform: scale(.5);
  }
  .totalEnergyItemFoot .totalVal{
    font-size: .2rem;
    line-height: .24rem;
    margin-top: -0.06rem;
  }
  .totalEnergyItemFoot .type{
    font-size: .14rem;
    line-height: .18rem;
    color: #B5D7FF;
    margin-top: -0.01rem;
  }
  .totalEnergyItemFoot .title{
    font-size: .16rem;
    line-height: .2rem;
    transform: scale(.5);
    color: #008AFF;
    margin-top: -0.03rem;
  }
  .percentageTextTip{
    font-size: .15rem;
    color: #fff;
    position: absolute;
    width: 67%;
    height: 67%;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .percentageTextTip span{
    position: absolute;
    transform: translate(-50%,-50%);
  }
  .area3-QueryDateBtn:hover{
    background-color: transparent!important;
  }

</style>
