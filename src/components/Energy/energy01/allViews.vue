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
            <div class="exhaustItem">今年碳排放：<span class="color1">{{exhaustValue1}}</span>Kg，计划<span class="color2">{{exhaustValue2}}</span>Kg</div>
            <div class="exhaustItem">本月碳排放：<span class="color1">{{exhaustValue3}}</span>Kg，计划<span class="color2">{{exhaustValue4}}</span>Kg</div>
          </header>
          <div class="viewItemContent">
            <div class="totalEnergyItem">
              <div class="totalEnergyItemHead">
                <div>23345</div><p>本月</p>
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
                  <div class="totalVal">60000</div>
                  <div class="title">本月能耗值</div>
                  <div class="type">电</div>
                </div>
              </div>
            </div>
            <div class="totalEnergyItem">
              <div class="totalEnergyItemHead">
                <div>23345</div><p>本月</p>
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
                  <div class="totalVal">30000</div>
                  <div class="title">本月能耗值</div>
                  <div class="type">水</div>
                </div>
              </div>
            </div>
            <div class="totalEnergyItem">
              <div class="totalEnergyItemHead">
                <div>23345</div><p>本月</p>
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
                  <div class="totalVal">12000</div>
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
              <el-tabs v-model="energyArea2Type" type="card" @tab-click="handleClick">
                <el-tab-pane label="电" name="0"></el-tab-pane>
                <el-tab-pane label="水" name="1"></el-tab-pane>
                <el-tab-pane label="气" name="2"></el-tab-pane>
              </el-tabs>
            </div>
          </header>
          <div class="viewItemContent">
            <lineEchart :datas="energyTrend1.echarts" :key="energyTrend1.id" />
            <lineEchart :datas="energyTrend2.echarts" :key="energyTrend2.id" />
            <lineEchart :datas="energyTrend3.echarts" :key="energyTrend3.id" />
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
              <div class="yearRangeBox" v-if="dateUnit==1">
                <el-date-picker
                  v-model="dateRangeValue[0]"
                  type="year"
                  value-format="yyyy"
                  placeholder="请选择">
                </el-date-picker>
                <span>-</span>
                <el-date-picker
                  v-model="dateRangeValue[1]"
                  type="year"
                  value-format="yyyy"
                  placeholder="请选择">
                </el-date-picker>
              </div>
              <div class="yearRangeBox" v-if="dateUnit==2">
                <el-date-picker
                  v-model="dateRangeValue[0]"
                  format="yyyy-M"
                  value-format="yyyy-MM"
                  type="month"
                  placeholder="请选择">
                </el-date-picker>
                <span>-</span>
                <el-date-picker
                  v-model="dateRangeValue[1]"
                  format="yyyy-M"
                  value-format="yyyy-MM"
                  type="month"
                  placeholder="请选择">
                </el-date-picker>
              </div>
              <el-date-picker
                v-model="dateDayRangeValue"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy-M-d"
                value-format="yyyy-MM-dd"
                class="energyAreaDateBox"
                v-if="dateUnit==3">
              </el-date-picker>
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
              <span>营收</span><div class="incomeBox">8888.888</div>
            </div>
            <div class="head">
              <span>入住率</span><div class="perBox">88%</div>
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
                    <div>100/200</div>
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
                    <div>334/550</div>
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
        energyTrend1:{
          id: 'energyTrendChart1',
          echarts:{
            id:"lineEchartShui1",
            type:'shui',
            unit:"",
            title:"单位：月份/KW/h",
            style:{
              width:'100%',
              height: '100%'
            },
            xDate:['01','02','03','04','05','06','07','08','09','10','11','12'],
            list:[
              {name:"2018",data:[10,20,30,40,50,60,70,80,90,12,54,83]},
              {name:"2017",data:[60,70,80,90,20,30,40,50,54,70,80,90]},
              {name:"今年计划",data:[70,80,90,12,54,83,40,50,54,20,30,40]},
            ]
          }
        },
        energyTrend2:{
          id: 'energyTrendChart2',
          echarts:{
            id:"lineEchartShui2",
            type:'shui',
            unit:"",
            title:"单位：月份/KW/h",
            style:{
              width:'100%',
              height: '100%'
            },
            xDate:['01','02','03','04','05','06','07','08','09','10','11','12'],
            list:[
              {name:"2018",data:[60,70,80,90,20,30,40,50,54,70,80,90]},
              {name:"2017",data:[10,20,30,40,50,60,70,80,90,12,54,83]},
              {name:"今年计划",data:[70,80,90,12,54,83,40,50,54,20,30,40]},
            ]
          }
        },
        energyTrend3:{
          id: 'energyTrendChart3',
          echarts:{
            id:"lineEchartShui3",
            type:'shui',
            unit:"",
            title:"单位：月份/KW/h",
            style:{
              width:'100%',
              height: '100%'
            },
            xDate:['01','02','03','04','05','06','07','08','09','10','11','12'],
            list:[
              {name:"2018",data:[70,80,90,12,54,83,40,50,54,20,30,40]},
              {name:"2017",data:[60,70,80,90,20,30,40,50,54,70,80,90]},
              {name:"今年计划",data:[10,20,30,40,50,60,70,80,90,12,54,83]},
            ]
          }
        },
        dateDayRangeValue:"",
        dateRangeValue:[],
        dateUnit:2,
        dateOptions:[{id:1,title:"年"},{id:2,title:"月"},{id:3,title:"日"}],
        exhaustValue1:2879,
        exhaustValue2:2223,
        exhaustValue3:2879,
        exhaustValue4:3333,
        totalEnergyChartOption1:{
          width: "200",
          height: "200",
          outCircleObj:{
            lineWidth:26,
            radius:52,
            bgColor1:"#FF9A6A",
            bgColor2:"#FE5E83",
          },
          dotObj:{
            color:"#fff",
            radius:1
          },
          space:6,
          dotNum:30,
          percentageValue:"60"
        },
        totalEnergyChartOption2:{
          width: "200",
          height: "200",
          outCircleObj:{
            lineWidth:26,
            radius:52,
            bgColor1:"#20DBB5",
            bgColor2:"#59E9F5",
          },
          dotObj:{
            color:"#fff",
            radius:1
          },
          space:6,
          dotNum:30,
          percentageValue:"100"
        },
        totalEnergyChartOption3:{
          width: "200",
          height: "200",
          outCircleObj:{
            lineWidth:26,
            radius:52,
            bgColor1:"#66A6FF",
            bgColor2:"#2772E3",
          },
          dotObj:{
            color:"#fff",
            radius:1
          },
          space:6,
          dotNum:30,
          percentageValue:"90"
        },
      }
    },
    methods:{
      handleClick(){
        console.log(this.energyArea2Type);
        let index = this.energyArea2Type;
        $(".allViewArea2 .myChartBox").eq(index).show().siblings().hide();
      },
      calcTipPosition(a) {
        var center= Number($(".percentageTextTip").width())/2;
        var r = 78;
        var realA = (145 + 246 * (Number(a)/100));
        return {
          left: Math.round(center + Math.cos(realA *Math.PI/180) * r),
          top:  Math.round(center + Math.sin(realA *Math.PI/180) * r)
        }
      },
      dateTypeChange(){
        this.dateRangeValue = [];
      },
      viewsQueryRangeData(){
        let dateUnit  = this.dateUnit;
        if(dateUnit==3){
          this.dateRangeValue = this.dateDayRangeValue;
        }

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
      initArea3Chart1(){
        var myChart = this.$echarts.init(document.getElementById('energyArea3Chart1'));
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
              radius : '85%',
              center: ['50%', '50%'],
              color: ['#2DF0E0','#FFA414', '#316EFF' ],
              data:[
                {value:535, name:'谷时用电'},
                {value:510, name:'峰时用电'},
                {value:574, name:'平时用电'}
              ],
              roseType: 'radius',
              selectedMode: 'single',
              label: {
                normal: {
                  position: 'outside',
                  formatter:'{c} 度'
                }
              },
              labelLine: {
                normal: {
                  smooth: 0.2,
                  length: 15,
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
      initArea3Chart2(){
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
              radius : '85%',
              center: ['50%', '50%'],
              color: ['#2DF0E0','#FFA414', '#316EFF' ],
              data:[
                {value:535, name:'谷时用电'},
                {value:510, name:'峰时用电'},
                {value:574, name:'平时用电'}
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
                  length: 20,
                  length2: 40,

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
      initArea3Chart3(){
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
              radius : '85%',
              center: ['50%', '50%'],
              color: ['#2DF0E0','#FFA414', '#316EFF' ],
              data:[
                {value:535, name:'谷时用电'},
                {value:510, name:'峰时用电'},
                {value:574, name:'平时用电'}
              ],
              roseType: 'radius',
              selectedMode: 'single',
              label: {
                normal: {
                  position: 'outside',
                  formatter:'{c} 度'
                }
              },
              labelLine: {
                normal: {
                  smooth: 0.2,
                  length: 15,
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
      initArea3Chart4(){
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
              radius : '85%',
              center: ['50%', '50%'],
              color: ['#2DF0E0','#FFA414', '#316EFF' ],
              data:[
                {value:535, name:'谷时用电'},
                {value:510, name:'峰时用电'},
                {value:574, name:'平时用电'}
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
                  length: 20,
                  length2: 40,

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
      initArea3Charts(){
        let that = this;
        that.initArea3Chart1();
        that.initArea3Chart2();
        that.initArea3Chart3();
        that.initArea3Chart4();
      },
      initArea4Chart1(){
        var myChart = this.$echarts.init(document.getElementById('energyArea4Chart1'));
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
                {value:634, name: '能源费用占比'},
                {value:735, name: '剩余',label:{show:false}}
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
                  fontSize: 12
                }
              },
              data:[
                {value:634, name: '水'},
                {value:735, name: '剩余',label:{show:false}}
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
      initArea4Chart3(){
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
                {value:634, name: '电'},
                {value:735, name: '剩余',label:{show:false}}
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
      initArea4Chart4(){
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
                {value:634, name: '气'},
                {value:735, name: '剩余',label:{show:false}}
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
      initArea4Chart5(){
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
                  fontSize: 12
                }
              },
              data:[
                {value:634, name: '水'},
                {value:735, name: '剩余',label:{show:false}}
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
      initArea4Chart6(){
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
                {value:634, name: '电'},
                {value:735, name: '剩余',label:{show:false}}
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
      initArea4Chart7(){
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
                {value:634, name: '气'},
                {value:735, name: '剩余',label:{show:false}}
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
      initArea4Charts(){
        let that = this;
        that.initArea4Chart1();
        that.initArea4Chart2();
        that.initArea4Chart3();
        that.initArea4Chart4();
        that.initArea4Chart5();
        that.initArea4Chart6();
        that.initArea4Chart7();
      }
    },
    mounted(){
      let that = this;
      that.totalEnergyChartRotate(10,'.energyFinger1');
      that.totalEnergyChartRotate(50,'.energyFinger2');
      that.totalEnergyChartRotate(80,'.energyFinger3');
      that.initArea3Charts();
      that.initArea4Charts();
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
    width: 1.2rem;
    height: 1.2rem;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .percentageTextTip span{
    position: absolute;
    transform: translate(-50%,-50%);
  }


</style>
