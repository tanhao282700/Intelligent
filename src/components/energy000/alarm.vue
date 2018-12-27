<!--
    能源系统 监控告警
    made by 白富友
    start in 2018-8-9

    还存在的问题：① table总条数， ②告警排序是否排序？ ③告警-预警-提示对应的class
-->
<template>
  <div ref="energy2Crumbs" class="alarmBoxs">
    <Crumbs :data='crumbs'/>
    <div class="alarmBox"
         v-loading="loading"
         element-loading-background="rgba(0, 0, 0, 0.5)"
         element-loading-spinner="el-icon-loading"
         element-loading-text="拼命加载中"
    >
      <div class="boxs boxs100  boxs2">
        <div class="boxsTit">表器情况</div>
        <div class="alarmscc">
          <div class="alarmAll">
            <EchartCir :echartCirData="echartCirData"/>
          </div>
          <div class="alarmLine">
            <div class="alarmLineIn"></div>
            <div class="alarmLineIn"></div>
          </div>
          <div class="alarmtotal">
            <div class="alarmtotalIn">
              <EchartCir :echartCirData="echartCirData2" ref="echartCirData2"/>
            </div>
            <div class="alarmPoint">
              <div class="alarmPointBox" v-for="(v,i) in alarmPoints">
                <div class="alarmPoints" :style="{background:v.color}"></div>
                <div class="alarmPointTit" v-text="v.tit"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="boxs boxs200  boxs2">
        <div class="boxsTit">表器情况</div>
        <div class="searchBox">
          <div class="tRBrnBox">
            <el-date-picker
              value-format="yyyyMM"
              v-model="startMonth"
              type="month"
              placeholder="开始月">
            </el-date-picker>
          </div>
          <span class="monthSplit"></span>
          <div class="tRBrnBox">
            <el-date-picker
              value-format="yyyyMM"
              v-model="endMonth"
              type="month"
              placeholder="结束月">
            </el-date-picker>
          </div>
          <!--<div class="dateRangeBox2">
            <el-date-picker
              v-model="value7"
              type="monthrange"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              align="right"
              :clearable="false"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </div>-->
          <!--<div class="tRBrnBox">
            <el-select @change="selChange" v-model="value" placeholder="选择楼层">
              <el-option
                v-for="item in options"
                :key="''+item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="tRBrnBox">
            <el-select @change="selChange2" v-model="value2" placeholder="选择区域">
              <el-option
                v-for="item in options2"
                :key="''+item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="tRBrnBox">
            <el-select @change="selChange3" v-model="value3" placeholder="选择房间">
              <el-option
                v-for="item in options3"
                :key="''+item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>-->
          <div class="tRBrnBox">
            <el-cascader
              :change-on-select='true'
              :options="floorOptions"
              v-model="floorSelectedOptions"
              @change="floorChange">
            </el-cascader>
          </div>
          <div class="searchBtn">
            <el-button @click="search" type="primary" icon="el-icon-search">查询</el-button>
          </div>
        </div>
        <!--<div class="searchBox">
            <div class="searchBoxIn">
                <div class="timeBox0" style="float:left;">
                    <div class ="timeVal">
                        <span class ="timeValIn">
                        <span v-text = 'value7s[0]'></span>
                        <i class="el-icon-caret-bottom"></i>
                        </span>
                        <span style="color:#fff">&#45;&#45;</span>
                        <span class ="timeValIn">
                        <span v-text = 'value7s[1]'></span>
                        <i class="el-icon-caret-bottom"></i>
                        </span>
                    </div>
                    <el-date-picker
                        class = 'timeBox'
                        v-model="value7"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions2">
                    </el-date-picker>
                </div>
                <div class="chooseBox100">
                    <SelectBox :data = 'selectID' @choose = "areaChoose"/>
                </div>
                <el-button class="billBtn2" icon="el-icon-search" type="primary" @click="search">查询</el-button>
            </div>
        </div>-->
        <div class="boxs200Tits">
          <div class="titLeft">告警排名</div>
          <div class="titRight">
            <span>TOP3</span>
          </div>
        </div>
        <ul class="colBoxs boxs">
          <li v-for="(v,i) in colBoxs">
            <span :style="{color:v.color}" v-text="'0'+(i+1)"></span>
            <span v-text="v.name"></span>
            <span :style="{color:v.color}" v-text="v.num"></span>
            <span>次</span>
          </li>
        </ul>
        <div class="boxs200Tits">
          <div class="titLeft">告警排名</div>
          <div class="titRight">
            <div class="titPointBox" v-for="(v,i) in alarmBoxs">
              <div class="titPointTit" v-text="v.text"></div>
              <div class="titPoint" :style="{background:v.color}"></div>
            </div>
          </div>
        </div>
        <div class="colEcharts">
          <p>单位：条</p>
          <div class="colEchartsBox" v-show="!noEchartData">
            <AlarmEcharts ref="AlarmEcharts0" :echartCirData="barData"/>
          </div>
          <div class="colEchartsBox2" v-show="noEchartData">
            <span>没有数据</span>
          </div>
        </div>
      </div>
      <div class="boxs boxs300  boxs2">
        <div class="boxsTit">告警记录</div>
        <div class="tableBox">
          <Table @changePage="changePage" style="width:100%" :table="table"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import utils from '../../assets/js/utils';
  import Table from '../../components/common/table2';
  import alarmSpan from './components/alarms/alarmSpan';
  import alarmEcharts from './components/alarms/alarmEcharts';
  import SelectBox from '../../components/common/selectBox';
  import EchartCir from '../../components/common/echartCircle';

  export default {
    components: {
      'Table': Table,
      'EchartCir': EchartCir,
      'SelectBox': SelectBox,
      'AlarmEcharts': alarmEcharts
    },
    name: 'alarm',
    computed: {
      value7s() {
        let res = ['开始时间', '结束时间'];
        if (this.value7 != '') {
          res = [utils.timeDeal(this.value7[0]), utils.timeDeal(this.value7[1])];
        }
        return res;
      },

    },
    data() {
      return {
        loading:false,
        floorSelectedOptions:[],
        floorOptions: [],
        page_number:1,
        nowFloorId:0,
        startMonth:'',
        endMonth:'',
        area_level: [],//楼层数据
        value: 0,
        options: [],
        value2: '',
        options2: [],
        value3: '',
        options3: [],

        crumbs: ['能源管理系统', '监控告警'],
        selectID: {
          sId: 1,
        },
        areaId: 0,  //区域ID
        table: {
          showPagination:true,
          small: 'small',
          hei: 259, //table高度  设置后有滚动条
          len: 0, //总条数
          data: [],
          th: [
            {prop: 'number', label: '编号', wid: 68},
            {prop: 'info', label: '告警详情', wid: 280},
            {prop: 'time', label: '告警时间', wid: 200},
            {
              prop: 'level',
              label: '告警等级',
              operate: true,
              render: (h, param) => {
                const btnss = {
                  level: param.row.level,
                };
                return h(alarmSpan, {
                  props: {btnss: btnss},
                  on: {}
                });
              }

            },
          ]
        },
        echartCirData: {
          id: 'echart1',
          style: {width: '2.76rem', height: 196 * 100 / 728 + 'vh'},
          color: [
            '#fe6a7d', 'rgba(0,0,0,0)', '#fe6a7d'
          ],
          data0: [
            {value: 0, name: '总数'},
          ],
          data: [],
          util: '次',
          tit: '进一周警告次数',
          type: 2
        },
        echartCirData2: {
          id: 'echart2',
          style: {width: '2.76rem', height: 196 * 100 / 728 + 'vh'},
          color: [
            '#fac477', 'rgba(0,0,0,0)', '#3f87ed'
          ],
          data0: [
            {value: 0, name: '表气总数'},
          ],
          data: [
            {value: 0, name: '异常数'},
            {value: 0, name: '剩余数'},
          ],
          util: '个',
          tit: '表气统计',
          type: 2
        },
        alarmPoints: [
          {color: '#3f87ed', tit: '表气总数'},
          {color: '#fac477', tit: '异常数'},
        ],
        value7: '',    //时间区间值
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        alarmBoxs: [
          {color: '#fd6a7c', text: '告警'},
          {color: '#fbc77f', text: '预警'},
          {color: '#3079e7', text: '提示'},
        ],
        colBoxs: [
          //    {color:'#ff4f80',name:'18FB区客',num:'22'},
          //    {color:'#ff8a63',name:'6FE区餐厅',num:'18'},
          //    {color:'#ffcf85',name:'12FB区厨房',num:'14'},
        ],
        colors: ['#ff4f80', '#ff8a63', '#ffcf85'], //排名的颜色
        barData: {
          id: 'echartAlarm',
          color: ['#3079e7', '#fbc77f', '#fd6a7c'],
          style: {width: '6.43rem', height: 309 * 100 / 728 + 'vh'},
          data1: [], //提示
          data2: [], //预警
          data3: [], //告警
          xData: []
        },
        noEchartData: false,
      }
    },
    watch:{
      value(val){
        if (this.value2=='' && this.value3=='') {
          this.nowFloorId = val;
        }
      },
      value2(val){
        if (this.value !=0 && this.value3=='' && val!='') {
          this.nowFloorId = val;
        }
      },
      value3(val){
        if (this.value !=0 && this.value2!='' && val!='') {
          this.nowFloorId = val;
        }
      },
      floorSelectedOptions(newVal){
        if (newVal.length ===0){
          this.areaId = 0
        } else {
          this.areaId = newVal[newVal.length-1];
        }
      }
    },

    methods: {
      floorChange(val){
        console.log(val,this.floorSelectedOptions)
      },
      selChange(val) {
        this.value2 = '';
        this.value3 = '';
        //this.nowFloorId = val;
        if (val == 0) {

        } else {
          this.area_level.some((item, i) => {
            if (item.id == val) {
              if (item.hasOwnProperty('child')) {
                //this.value2 = item.parent_id;
                let tempArr = [
                  {
                  label:'全部',
                  value:this.value,
                }
                ];
                item.child.map((item2, i2) => {
                  let obj = {};
                  obj.label = item2.title;
                  obj.value = '' + item2.id;
                  tempArr.push(obj);
                })
                this.options2 = tempArr;
              }
            }
          })
        }
        console.log(val)
      },
      selChange2(val) {
        this.value3 = '';
          this.area_level.some((item, i) => {
            if (item.id == this.value) {
              if (item.hasOwnProperty('child')) {
               item.child.some((item2,i2)=>{
                 if (item2.id == val) {
                   if (item.hasOwnProperty('child')) {
                     //this.value2 = item.parent_id;
                     let tempArr = [
                       {
                         label:'全部',
                         value:this.value2,
                       }
                     ];
                     item2.child.map((item3, i3) => {
                       let obj = {};
                       obj.label = item3.title;
                       obj.value = '' + item3.id;
                       tempArr.push(obj);
                     })
                     this.options3 = tempArr;
                   }
                 }
               })
              }
            }
          })
        console.log(val)
      },
      selChange3(val) {
        console.log(val)
      },

      search() {  //查询
        this.requestData();
      },
      changePage(val){
        console.log(val)
        this.requestData(val);
      },
      //修改区域
      // areaChoose(id) {
      //   this.areaId = id;
      // },
      requestData(page_number=1) {
        this.loading = true;
        if (this.startMonth == null){
          this.startMonth = '';
        }
        if (this.endMonth == null){
          this.endMonth = '';
        }


        if (this.startMonth !='' && this.endMonth ==''){
          let now = new Date();
          this.endMonth = now.getFullYear()+((now.getMonth()+1)<10?('0'+(now.getMonth()+1)):(''+(now.getMonth()+1)));
        }
        if (this.startMonth =='' && this.endMonth !=''){
          this.$message('选了结束月就必须选开始月,或者都不选！')
          return false;
        }
        if (this.startMonth !='' && this.endMonth !=''){
          if (Number(this.endMonth)-Number(this.startMonth)<0){
            this.$message('开始月和结束月不合法！')
            return false;
          }
        }

        let that = this;
        let config = {
          sys_menu_id: this.$store.state.sysList[18].sys_menu_id,
          floor_id: this.areaId,
          time_start:this.startMonth,
          time_end:this.endMonth,
          pagesize:20,
          page_number:page_number,
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.post('pc/2.0/energy/alert', config, headers).then(res => {
          let data0 = res.data;
          console.log('获取告警数据', config, res);
          if (data0.code == 0) {
            let data = data0.data;

            /*//楼层数据
            let area_level = data.area_level;
            this.area_level = area_level;

            let floorArr = [
              {
                label: '全部',
                value: 0,
              }
            ];
            area_level.map((item00, i00) => {
              let obj = {};
              obj.label = item00.title;
              obj.value = '' + item00.id;
              floorArr.push(obj);
            })
            this.options = floorArr;*/

            //楼层数据
            let area_level = data.area_level;
            let dealedFloor = JSON.parse(JSON.stringify(area_level).replace(/title/g,'label').replace(/parent_id/g,'parent').replace(/id/g,'value').replace(/child/g,'children').replace(/\"children\"\:\[\]\,/g,''));
            this.floorOptions = dealedFloor;
            this.floorOptions.unshift({
              label:'全部区域',
              value:0,
            });

            let device_info = data.device_info;
            this.echartCirData.data0[0].value = device_info.alert_times;
            this.echartCirData2.data0[0].value = device_info.device;
            this.echartCirData2.data[0].value = device_info.abnormal;
            this.echartCirData2.data[1].value = device_info.device - device_info.abnormal;
            this.$refs.echartCirData2.drawLine();

            let alert_map = data.alert_map;
            let alert_record = data.alert_record;
            /*alert_record = [
              {
                "addtime": "2018-11-14 17:00:20",
                "content": "本月能耗已用181.0，即将达到预设值",
                "describe": "无",
                "id": 1,
                "level": "0"
              },
              {
                "addtime": "2018-11-14 07:00:00",
                "content": "今日能耗8.0超过预设值15%",
                "describe": "无",
                "id": 2,
                "level": "2"
              },
              {
                "addtime": "2018-11-14 06:00:00",
                "content": "今日能耗7.0超过预设值",
                "describe": "无",
                "id": 3,
                "level": "1"
              },
              {
                "addtime": "2018-11-14 05:00:00",
                "content": "今日能耗已用6.0，即将达到预设值",
                "describe": "无",
                "id": 4,
                "level": "0"
              }
            ];*/
            let lens = alert_record.length;
            let attrs = [];
            for (let i = 0; i < lens; i++) {
              let objs = {
                id: alert_record[i].id,
                number: ((i+1)+(this.page_number-1)*20)<10?('0'+((i+1)+(this.page_number-1)*20)):(''+((i+1)+(this.page_number-1)*20)),
                info: alert_record[i].content,
                time: alert_record[i].addtime,
                level: alert_record[i].level
              };
              attrs.push(objs);
            }
            this.table.data = attrs;
            this.table.len = data.record_count;


            let alert_situation = data.alert_situation;
            let rank = alert_situation.rank;

            let rLens = rank.length;
            let colBoxs = [];
            for (let j = 0; j < rLens; j++) {
              let objs2 = {
                color: this.colors[j],
                name: rank[j].name,
                num: rank[j].count
              };
              colBoxs.push(objs2);
            }
            this.colBoxs = colBoxs;
            //图表
            this.barData.data1 = alert_situation.data0;
            this.barData.data2 = alert_situation.data1;
            this.barData.data3 = alert_situation.data2;
            this.barData.xData = alert_situation.time;
            if (this.barData.xData.length === 0) {
              this.noEchartData = true;
            } else {
              this.noEchartData = false;
              this.$refs.AlarmEcharts0.drawLine();
            }

            this.loading = false;
          } else {
            this.loading = false;
            this.$message(data0.message);
          }
        }).catch(err => {
          this.loading = false;
          console.log(err);
        })
      },

    },
    created() {
      this.requestData();
    },
    mounted() {
      this.$refs.energy2Crumbs.children[0].style.marginTop = (this.$parent.$el.children[0].children[0].offsetHeight+'px');
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">
  @import '../../assets/css/comon.less';

  .alarmBoxs {
    width: 100%;
    height: 100%;
    .alarmBox {
      width: 13.06rem;
      margin: 0 auto;
      overflow: hidden;
      .vh(610);
      div {
        .boxsTit {
          background-color: rgba(0, 0, 0, 0.2);
        }
      }
      .boxs100 {
        width: 6.43rem;
        .vh(235);
        float: left;
        .vhMB(20);
        .alarmscc {
          display: flex;
          .vh(196);
          width: 100%;
          .alarmAll {
            float: left;
            height: 100%;
            width: 2.76rem;
          }
          .alarmLine {
            float: left;
            height: 100%;
            width: 0.01rem;
            .vhPT(58);
            .alarmLineIn {
              width: 100%;
              .vh(40);
              background: #ccc;
              &:nth-child(1) {
                .gradientT(rgba(73, 143, 226, 0.88), rgba(73, 143, 226, 0));
              }
              &:nth-child(2) {
                .gradientT(rgba(73, 143, 226, 0), rgba(73, 143, 226, 0.88));
              }
            }
          }
          .alarmtotal {
            height: 100%;
            width: 3.66rem;
            float: left;
            position: relative;
            .alarmtotalIn {
              width: 2.78rem;
            }
            .alarmPoint {
              position: absolute;
              left: 2.68rem;
              .vhTop(71);
              .vh(39);
              .alarmPointBox {
                width: 100%;
                .vh(12);
                .vhLH(12);
                .alarmPoints {
                  width: 0.1rem;
                  height: 0.1rem;
                  border-radius: 50%;
                  margin-right: 0.11rem;
                  float: left;
                  .vhMT(1);
                }
                .alarmPointTit {
                  font-size: 0.12rem;
                  color: #fff;
                  float: left;
                }
                &:nth-child(1) {
                  .vhMB(15);
                }
              }
            }
          }
        }
      }
      .boxs200 {
        .el-range-editor .el-range-input {
          position: relative;
          width: 0.9rem;
          height: auto;
          background-color: transparent !important;
          .vhLineH(24);
          border-bottom: 1px solid #1989fa !important;
          font-family: PingFangSC-Regular;
          font-size: 0.12rem;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #ffffff;
          text-align: left;
        }
        .el-date-editor .el-range-separator {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          line-height: 1;
          width: 5%;
          color: #d1d1d1;
          margin-left: 0.1rem;
          margin-right: 0.1rem;
        }
        .el-date-editor .el-range__icon {
          display: none;
        }
        width: 6.43rem;
        .vh(608);
        float: right;
        .searchBox {
          margin-right: 0.2rem;
          .vhMT(12);
          .vhMB(12);
          align-self: flex-end;
          display: flex;
          justify-content: flex-end;
          border-top-right-radius: 2px;
          border-bottom-right-radius: 2px;
          width: 4.2rem;
          .vh(32);
          border: 1px solid #1989fa;
          display: flex;
          align-items: center;
          position: relative;
          /*.dateRangeBox2 {
            position: relative;
            width: 2.2rem;
            .el-range-editor.el-input__inner {
              border: 0 !important;
              padding: 0 0 0 0.14rem;
            }
            &::before {
              content: "";
              pointer-events: none;
              display: block;
              width: 0;
              height: 0;
              border-width: 4px 4px 0;
              border-style: solid;
              border-color: #008aff transparent transparent; !*黄 透明 透明 *!
              position: absolute;
              top: 50%-4px;
              left: 0.95rem;
            }
            &::after {
              content: "";
              pointer-events: none;
              display: block;
              width: 0;
              height: 0;
              border-width: 4px 4px 0;
              border-style: solid;
              border-color: #008aff transparent transparent; !*黄 透明 透明 *!
              position: absolute;
              top: 50%-4px;
              right: 0.01rem;
            }
          }*/
          .monthSplit{
            display: block;
            width: 0.08rem;
            height: 1px;
            background-color: #d1d1d1;
            margin-left: 0.06rem;
            margin-right: 0.06rem;
          }
          .tRBrnBox {

            .el-cascader{
              .vhLineH(32);
              font-size: 0.12rem;
            }
            .el-cascader__label{
              color: #fff;
            }
            .el-cascader .el-icon-arrow-down.is-reverse{
              transform: rotateZ(0deg);
            }
            .el-cascader-menu__item {
              font-size: 0.12rem;
              padding: 8px 20px;
              position: relative;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              color: #606266;
              height: 34px;
              line-height: 1.5;
              -webkit-box-sizing: border-box;
              box-sizing: border-box;
              cursor: pointer;
              outline: 0;
            }
            .el-cascader .el-input__icon{
              display:block;
              width:0;
              height:0;
              border-width:4px 4px 0;
              border-style:solid;
              border-color:#008aff transparent transparent;/*黄 透明 透明 */
              position:absolute;
              top:50%-4px;
              left:-0.05rem;
              &::before{
                content: "";
                /*pointer-events: none;
                display:block;
                width:0;
                height:0;
                border-width:4px 4px 0;
                border-style:solid;
                border-color:#008aff transparent transparent;!*黄 透明 透明 *!*/

              }
            }

            &:nth-of-type(2){
              margin-left: 0;
            }
            .el-input__prefix{
              display: none;
            }
            .el-date-editor.el-input, .el-date-editor.el-input__inner{
              &::after {
                content: "";
                pointer-events: none;
                display: block;
                width: 0;
                height: 0;
                border-width: 4px 4px 0;
                border-style: solid;
                border-color: #008aff transparent transparent; /*黄 透明 透明 */
                position: absolute;
                top: 50%-4px;
                right: 0;
              }
            }
            .el-select::after {
              content: "";
              pointer-events: none;
              display: block;
              width: 0;
              height: 0;
              border-width: 4px 4px 0;
              border-style: solid;
              border-color: #008aff transparent transparent; /*黄 透明 透明 */
              position: absolute;
              top: 50%-4px;
              right: 0;
            }
            margin-left: 0.17rem;
            width: 0.88rem;
            .el-input {
              background-color: transparent !important;
            }
            .el-input--suffix .el-input__inner {
              .vh(24);
              padding: 0;
              border: 0 !important;
              border-bottom: solid 1px #1989fa !important;
              background-color: transparent !important;
            }
          }

          .searchBtn {
            margin-left: 0.18rem;
            width: 0.87rem;
            height: 100%;
            .el-button--primary {
              width: 100%;
              height: 100%;
              display: inline-block;
              line-height: 1;
              padding: 0;
            }
          }
        }
        /*.searchBox{
            .vh(56);
            .vhPT(12);
            padding-right: 0.20rem;
            width: 100%;
            .searchBoxIn{
                .vh(32);
                float: right;
                display: flex;
                width: 5.3rem;
                border-radius: 2px;
                border: solid 1px #3a84ed;
                align-items: center;
                justify-content: flex-end;
                .billBtn2{
                    padding-top: 0;
                    width: 0.87rem;
                    .vh(30);
                    .vhLH(30);
                    float: right;
                    border-radius: 0;
                }
                .chooseBox100{
                    float: left;
                    width:0.85*3rem;
                    .vh(32);
                }
                .chooseBox200{
                    float: left;
                    width:2.96rem;
                    .vh(32);
                }
            }
        }*/
        .boxs200Tits {
          width: 100%;
          .vh(24);
          .vhLH(12);
          .vhPB(12);
          .titLeft {
            float: left;
            border-left: 2px solid @color-blue;
            color: @color-blue;
            font-size: 0.12rem;
            text-indent: 0.2rem;
            font-weight: 600;
          }
          .titRight {
            float: right;
            padding-right: 0.35rem;
            span {
              color: #fff;
              font-size: 0.12rem;
            }
            .titPointBox {
              width: 0.6rem;
              height: 100%;
              float: left;
              .titPoint {
                float: right;
                width: 0.1rem;
                height: 0.1rem;
                .vhMT(1);
                border-radius: 50%;
                background: #ccc;
              }
              .titPointTit {
                color: #fff;
                float: right;
                padding-left: 0.1rem;
                font-size: 0.12rem;
              }
            }
          }
        }
        .colBoxs {
          display: flex;
          flex-direction: column;
          width: 6.03rem;
          .vh(120);
          background: rgba(0, 0, 0, 0.25);
          margin-left: 0.2rem;
          .vhMB(31);
          padding-left: 0.2rem;
          li {
            flex: 1;
            border-bottom: 1px solid rgba(58, 137, 249, 0.3);
            display: flex;
            align-items: center;
            &:nth-child(3) {
              border-color: rgba(0, 0, 0, 0);
            }
            span {
              font-size: 0.14rem;
              &:nth-child(1) {
                display: inline-block;
                width: 0.44rem;
              }
              &:nth-child(2) {
                color: #f4f4f4;
                flex: 1;
              }
              &:nth-child(3) {
              }
              &:nth-child(4) {
                color: @color-blue;
                display: inline-block;
                width: 0.55rem;
                text-indent: 0.2rem;
              }
            }
          }
        }
        .colEcharts {
          width: 100%;
          .vh(325);
          .vhPT(4);
          p {
            .vh(12);
            .vhLH(12);
            color: @color-blue;
            font-size: 0.12rem;
            text-indent: 0.20rem;
          }
          .colEchartsBox {
            width: 100%;
            .vh(309);
          }
          .colEchartsBox2 {
            width: 100%;
            .vh(309);
            display: flex;
            align-items: center;
            justify-content: center;
            span {
              color: #fff;
              text-align: center;
            }
          }
        }
      }
      .boxs300 {
        width: 6.43rem;
        .vh(353);
        float: left;
        .tableBox {
          .vh(312);
          padding-left: 0.08rem;
        }
      }
    }
  }


</style>
