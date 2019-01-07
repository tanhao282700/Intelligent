<!--
    电梯系统 数据监控
    made by 樊得涛
    start in 2018-9-28
-->
<template>
  <div>
    <div ref="HpadTop" class="tabsDomBox0 h-paddingTop">
      <div class="navCrumbs"><p @click="toHome">首页</p> > 电梯监测系统 > <span>数据监控</span></div>
    </div>
    <div class="dataHistory"
         v-loading="loading"
         element-loading-background="rgba(0, 0, 0, 0.5)"
         element-loading-spinner="el-icon-loading"
         element-loading-text="拼命加载中"
    >
      <div class="selectBox">
        <div class="oneLevelBox">
          <div class="tRBrnBox">
            <el-cascader
              :change-on-select='true'
              :options="floorOptions"
              v-model="floorSelectedOptions"
              @change="floorChange">
            </el-cascader>
          </div>
        </div>
        <div class="oneLevelBox">
          <div class="tRBrnBox">
            <el-select v-model="device_id" placeholder="选择设备">
              <el-option
                v-for="item in deviceOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="searchBox">
          <div class="dateBox">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="dateVal"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              range-separator="  -  "
            >
            </el-date-picker>
          </div>
          <div class="sltbtn">
            <el-button @click="searchData" type="primary" icon="el-icon-search">查询</el-button>
          </div>
        </div>
      </div>

      <div class="self-table">
        <div class="jifang">
          <div class="header">机房状态</div>
          <div class="container">
            <div class="left">
              <ele-line-echarts ref="jifangWenduRef" :datas="jifangWenduDatas" />
            </div>
            <div class="line">
              <div class="line-in1"></div>
              <div class="line-in2"></div>
            </div>
            <div class="right">
              <ele-line-echarts ref="jifangShiduRef" :datas="jifangShiduDatas" />
            </div>
          </div>
        </div>
        <div class="self-table-bot">
          <div class="dikeng">
            <div class="header">底坑湿度</div>
            <div class="container">
              <ele-line-echarts ref="dikengShiduRef" :datas="dikengShiduDatas" />
            </div>
          </div>
          <div class="dianliu">
            <div class="header">电流电压</div>
            <div class="container">
              <ele-line-echarts ref="dianliuDianyaRef" :datas="dianliuDianyaDatas" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import utils from "../../../assets/js/utils.js";
  import Table from '../../common/table2';
  import EleLineEcharts from "./eleLineEcharts";
  export default {
    components:{
      EleLineEcharts,
      Table,
    },
    data () {
      return {
        loading:false,
        jifangWenduDatas:{
          id:'jifangWendu',
          style:{width:'6.43rem',height:220*100/728+'vh'},
          showMarkL:true,
          showLegends:true,
          markLineVal:0,
          list:[
            {
              name:'',
              data:[],
            }
          ]
        },
        jifangShiduDatas:{
          color:[
            {color1:'rgba(59,137,249,1)',color2:'rgba(59,137,249,0)',color3:'rgba(59,137,249,0.35)'},
          ],
          id:'jifangShidu',
          style:{width:'6.43rem',height:220*100/728+'vh'},
          showMarkL:true,
          showLegends:true,
          markLineVal:0,
          list:[
            {
              name:'',
              data:[],
            }
          ]
        },
        dikengShiduDatas:{
          color:[
            {color1:'rgba(245,108,108,1)',color2:'rgba(245,108,108,0)',color3:'rgba(245,108,108,0.35)'},
          ],
          id:'dikengShidu',
          style:{width:'6.43rem',height:220*100/728+'vh'},
          showMarkL:true,
          showLegends:true,
          markLineVal:0,
          list:[
            {
              name:'',
              data:[],
            }
          ]
        },
        dianliuDianyaDatas:{
          id:'dianliuDianya',
          style:{width:'6.43rem',height:220*100/728+'vh'},
          showMarkL:false,
          showLegends:true,
          list:[
            {
              name:'',
              data:[],
            },
            {
              name:'',
              data:[],
            }
          ]
        },
        device_id:'',
        deviceOptions:[],
        floor_id:0,
        floorSelectedOptions:[],
        floorOptions: [],
        dateVal:null,
      }
    },
    watch:{
      floorSelectedOptions(newVal){
        if (newVal.length ===0){
          this.floor_id = 0;
          this.requestDeviceData();
        } else {
          this.floor_id = newVal[newVal.length-1];
          this.requestDeviceData();
        }
      },
    },
    methods:{
      requestFloorData(){
        let that = this;
        let config = {
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.post('pc_ims/elevator/get_floor', config, headers).then(res => {
          let data0 = res.data;
          console.log('获取电梯楼层数据', config, res);
          if (data0.code == 0) {
            //楼层数据
            let area_level = data0.data;
            let dealedFloor = JSON.parse(JSON.stringify(area_level).replace(/title/g,'label').replace(/floor_id/g,'value').replace(/child/g,'children').replace(/\"children\"\:\[\]\,/g,''));
            this.floorOptions = dealedFloor;
            this.floor_id = this.floorOptions[0].value;
            this.floorSelectedOptions.push(this.floorOptions[0].value);
          } else {
            this.$message(data0.msg);
          }
        }).catch(err => {
          console.log(err);
        })
      },
      requestDeviceData(){
        this.device_id = '';
        let that = this;
        let config = {
          floor_id:this.floor_id
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.post('pc_ims/elevator/get_device', config, headers).then(res => {
          let data0 = res.data;
          console.log('获取相应楼层设备列表', config, res);
          if (data0.code == 0) {
            let deviceData = data0.data;
            let tempArr = [];
            deviceData.map((item,i)=>{
              if (i===0){
                this.device_id = item.device_id;
                console.log(this.floor_id)
                //this.requestEchartsData();
              }
              let obj = {};
              obj.label = item.device_title;
              obj.value = item.device_id;
              tempArr.push(obj);
            })
            this.deviceOptions = tempArr;
          } else {
            this.$message(data0.msg);
          }
        }).catch(err => {
          console.log(err);
        })
      },
      requestEchartsData(){
        if (this.device_id == ''){
          this.$message('请先选择设备！');
          return;
        }
        this.loading = true;
        let that = this;
        let config = {};
        if (this.dateVal == null){
          config = {
            floor_id:this.floor_id,
            device_id:this.device_id,
          }
        } else {
          config = {
            floor_id:this.floor_id,
            device_id:this.device_id,
            time_start:this.dateVal[0],
            time_end:this.dateVal[1],
          }
        }

        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.post('pc_ims/elevator/device_point', config, headers).then(res => {
          let data0 = res.data;
          console.log('获取数据监控echarts', config, res);
          if (data0.code == 0) {
            let data = data0.data;
            /*data = {
              "A": {
                "func_info": {
                  "company": "A",
                  "standard": ""
                },
                "value": [
                  {
                    "value": [
                      "2018-09-25 09:00",
                      10
                    ]
                  },
                  {
                    "value": [
                      "2018-09-25 09:30",
                      15
                    ]
                  }
                ]
              },
              "pit_T": {
                "func_info": {
                  "company": "%",
                  "standard": "45"
                },
                "value": [
                  {
                    "value": [
                      "2018-09-25 09:00",
                      40
                    ]
                  },
                  {
                    "value": [
                      "2018-09-25 09:30",
                      50
                    ]
                  }
                ]
              },
              "room_H": {
                "func_info": {
                  "company": "%",
                  "standard": "48"
                },
                "value": [
                  {
                    "value": [
                      "2018-09-25 09:00",
                      40
                    ]
                  },
                  {
                    "value": [
                      "2018-09-25 09:30",
                      50
                    ]
                  }
                ]
              },
              "room_T": {
                "func_info": {
                  "company": "℃",
                  "standard": "35"
                },
                "value": [
                  {
                    "value": [
                      "2018-09-25 09:00",
                      32
                    ]
                  },
                  {
                    "value": [
                      "2018-09-25 09:30",
                      37
                    ]
                  }
                ]
              },
              "voltage": {
                "func_info": {
                  "company": "V",
                  "standard": ""
                },
                "value": [
                  {
                    "value": [
                      "2018-09-25 09:00",
                      380
                    ]
                  },
                  {
                    "value": [
                      "2018-09-25 09:30",
                      385
                    ]
                  }
                ]
              }
            };*/
            //电流
            if (data.hasOwnProperty('A')) {
              //alert('有A')
              let dianliu = data.A;
              this.dianliuDianyaDatas.list[0].name = ('电流/'+dianliu.func_info.company);
              this.dianliuDianyaDatas.list[0].data = dianliu.value;
              }
            //电压
            if (data.hasOwnProperty('voltage')) {
              //alert('有voltage')
              let dianya = data.voltage;
              this.dianliuDianyaDatas.list[1].name = ('电压/' + dianya.func_info.company);
              this.dianliuDianyaDatas.list[1].data = dianya.value;
            }

            this.$refs.dianliuDianyaRef.drawLine();
            //机房温度
            if (data.hasOwnProperty('room_T')) {
              //alert('有room_T')
              let jifangWendu = data.room_T;
              this.jifangWenduDatas.list[0].name = ('机房温度/' + jifangWendu.func_info.company);
              this.jifangWenduDatas.list[0].data = jifangWendu.value;
              this.jifangWenduDatas.markLineVal = jifangWendu.func_info.standard;
              this.$refs.jifangWenduRef.drawLine();
            }
            //机房湿度
            if (data.hasOwnProperty('room_H')) {
              //alert('有room_H')
              let jifangShidu = data.room_H;
              this.jifangShiduDatas.list[0].name = ('机房湿度/' + jifangShidu.func_info.company);
              this.jifangShiduDatas.list[0].data = jifangShidu.value;
              this.jifangShiduDatas.markLineVal = jifangShidu.func_info.standard;
              this.$refs.jifangShiduRef.drawLine();
            }
            //底坑湿度
            if (data.hasOwnProperty('pit_T')) {
              //alert('有pit_T')
              let dikengShidu = data.pit_T;
              this.dikengShiduDatas.list[0].name = ('底坑湿度/' + dikengShidu.func_info.company);
              this.dikengShiduDatas.list[0].data = dikengShidu.value;
              this.dikengShiduDatas.markLineVal = dikengShidu.func_info.standard;
              this.$refs.dikengShiduRef.drawLine();
            }

            this.loading = false;
          } else {
            this.loading = false;
            this.$message(data0.msg);
          }
        }).catch(err => {
          this.loading = false;
          console.log(err);
        })
      },
      searchData(){
        this.requestEchartsData();
      },
      floorChange(val){
        console.log(val,this.floorSelectedOptions)
      },
      toHome(){
        this.$router.replace({ path: '/home', params: { isLogin: true} });
      },

    },
    created() {
    },
    mounted() {
      this.$refs.HpadTop.style.paddingTop = Number(this.$parent.$children[0].$el.children[0].offsetHeight)+30+'px';
      this.requestFloorData();
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">

  @import '../../../assets/css/common.css';
  @import '../../../assets/css/comon';
  .dataHistory{
    margin: 0 auto;
    width: 13.06rem;
    .vh(610);

    .selectBox{
      /*#04152c*/
      width: 100%;
      .vh(72);;
      display: flex;
      align-items: center;
      position: relative;

      .dateBox{
        width: 2.15rem;
        position:relative;
        .el-range-editor .el-range-input{
          text-align: left;
          width: 0.88rem;
          .vh(24);
          font-family: PingFangSC-Regular;
          font-size: 0.12rem;
          font-weight: normal;
          font-stretch: normal;
          line-height: 1;
          letter-spacing: 0px;
          color: #ffffff;
          background-color: transparent!important;
          border-bottom: solid 1px #1989fa!important;
        }
        .el-range-editor.el-input__inner{
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          &:hover{
            border-color: #1989fa;
          }
          &::before {
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
            left: 0.88rem;
          }
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
            right: 0.1rem;
          }
        }
        .el-date-editor .el-range__close-icon{
          display: none;
        }
        .el-date-editor .el-range__icon{
          display: none;
        }
        .el-date-editor .el-range-separator {
          padding: 0 0.1rem;
          .vhLineH(32);
          width: 5%;
          color: #fff;
        }
      }
      .el-select{
        width: 100%;
        height: 100%;
      }
      .el-select>.el-input{
        height: 100%;
        font-family: PingFangSC-Medium;
        font-size: 0.14rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: 0px;
        color: #ffffff;
        display: flex;
        align-items: center;
      }
      .el-select .el-input__inner{
        width: 100%;
        padding: 0 0.1rem;
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
        right: 0.2rem;
      }
      .tRBrnBox {
        padding: 0 0.1rem;
        width: 100%;
        height: 100%;
        border: 1px solid #1989fa;
        display: flex;
        align-items: center;
        .el-cascader{
          height: 100%;
          .vhLineH(32);
          font-size: 0.12rem;
        }
        .el-cascader__label{
          color: #fff;
          padding: 0;
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
          right:0;
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
        .el-input {
          height: 100%;
          background-color: transparent !important;
          display: flex;
          align-items: center;
        }
        .el-input--suffix .el-input__inner {
          .vh(24);
          padding: 0;
          border: 0 !important;
          border-bottom: solid 1px #1989fa !important;
          background-color: transparent !important;
        }
      }
      .oneLevelBox{
        &:first-of-type{
          margin-left: 0;
        }
        margin-left: 0.12rem;
        .vh(32);
        display: inline-block;
        width: 1.15rem;
      }
      .searchBox{
        margin-left: 0.12rem;
        width: 3.02rem;
        display: flex;
        .vh(32);
        .el-input-group__append{
          background-color: #3a84ed!important;
          vertical-align: middle;
          display: table-cell;
          position: relative;
          border: 0!important;
          border-radius: 2px!important;
          border-top-left-radius: 0!important;
          border-bottom-left-radius: 0!important;
          padding: 0 0.2rem!important;
          width: 1px;
          white-space: nowrap;

          font-family: PingFangSC-Medium;
          font-size: 0.14rem;
          font-weight: normal;
          font-stretch: normal;
          line-height: 1;
          letter-spacing: 0px;
          color: #ffffff!important;
        }
        .sltbtn{
          width: 0.87rem;
          display:inline-block;
          margin-left: -.02rem;
          .vh(32);
          .el-button--primary{
            width: 100%;
            height: 100%;
            display: inline-block;
            line-height: 1;
            padding: 0;
          }
        }
      }
      .exportBox{
        position: absolute;
        right: 0.2rem;
        .vhTop(20);
        width: 0.88rem;
        .vh(32);
        .self-button{
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          width: 0.88rem;
          .vh(32);
          background-color: #3a84ed;
          color: #fff;
          border: 0;
          outline: none;
          border-radius: 2px;
          padding: 0;
          font-size: 0.14rem;
          font-weight: normal;
          font-stretch: normal;
          line-height: 1;
          letter-spacing: 0px;
          .icon-export{
            display: inline-block;
            width: 0.14rem;
            height: 0.14rem;
            background: url("../../../assets/img/fireAlarm/icon_export.png") no-repeat center;
            background-size: 100% 100%;
            margin-right: 0.08rem;
          }
        }
      }
    }

    .self-table{
      width: 13.06rem;
      margin: 0 auto;
      .el-table__header-wrapper{
        background-color: rgba(0,0,0,0.25)!important;
      }
      .jifang{
        width: 100%;
        .vh(260);
        box-shadow: 0px 4px 10px 0px
        rgba(74, 144, 226, 0.22),
        inset 1px 1px 2px 0px
        rgba(248, 253, 255, 0.15),
        inset 0px -1px 1px 0px
        #4a90e2;
        .header{
          width: 100%;
          .vh(40);
          .vhLH(40);
          padding-left:.16rem;
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
          color: #008aff;
        }
        .container{
          .vh(220);
          width:13.03rem;
          display: flex;
          justify-content: space-between;
          .left{
            width:50%;
            .vh(220);
            position:relative;
          }
          .line{
            .line-in1{
              width: 1px;
              .vh(106);
              .gradientT(rgba(74,144,226,0.88),rgba(74,144,226,0));
            }
            .line-in2{
              width: 1px;
              .vh(106);
              .gradientT(rgba(74,144,226,0),rgba(74,144,226,0.88));
            }
          }
        }
        .right{
          width:50%;
          .vh(220);
          position:relative;
        }
      }
      .self-table-bot{
        .vhMT(20);
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
      .dikeng{
        .vh(260);
        width:6.43rem;
        box-shadow: 0px 4px 10px 0px
        rgba(74, 144, 226, 0.22),
        inset 1px 1px 2px 0px
        rgba(248, 253, 255, 0.15),
        inset 0px -1px 1px 0px
        #4a90e2;
        .header{
          width: 100%;
          .vh(40);
          .vhLH(40);
          padding-left:.16rem;
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
          color: #008aff;
        }
        .container{
          .vh(220);
          position:relative;
          width:100%;
        }
      }
      .dianliu{
        .vh(260);
        width:6.43rem;
        box-shadow: 0px 4px 10px 0px
        rgba(74, 144, 226, 0.22),
        inset 1px 1px 2px 0px
        rgba(248, 253, 255, 0.15),
        inset 0px -1px 1px 0px
        #4a90e2;
        .header{
          width: 100%;
          .vh(40);
          .vhLH(40);
          padding-left:.16rem;
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
          color: #008aff;
        }
      }
      .container{
        .vh(220);
        position:relative;
        width:100%;
      }
    }
    .el-date-editor .el-range__icon{
      display:none;
    }
    .el-range-separator{
      color: #ffffff;
      padding: 0 0.1rem;
      .vhLineH(32);
    }
    .el-date-editor.el-input, .el-date-editor.el-input__inner{
      padding: 0;
    }
    .el-range-editor .el-range-input {
      background: transparent;
      font-family: PingFangSC-Regular;
      font-size: 0.12rem;
      font-weight: normal;
      font-stretch: normal;
      line-height: 1;
      letter-spacing: 0px;
      color: #ffffff;
    }
    .dataarraw1{
      position: absolute;
      top: 0;
      left: .68rem;
      color: #ffffff;
    }
    .dataarraw2{
      position: absolute;
      top: 0;
      right: .25rem;
      color: #ffffff;
    }
    .timeline{
      width: .76rem;
      border: solid 1px #1989fa;
      display:inline-block;
    }
    .timelineF{
      position: absolute;
      left: .1rem;
      top: .25rem;
    }
    .timelineR{
      position: absolute;
      right: .25rem;
      top: .25rem;
    }
    .baseline{
      position: absolute;
      top: .58rem;
      left: .14rem;
      width: 11px;
      .vh(30);
      font-family: PingFangSC-Light;
      font-size: .10rem;
      font-weight: normal;
      font-stretch: normal;
      line-height:15px;
      letter-spacing: 1px;
      color: #2df0e0;
    }
  }

</style>
