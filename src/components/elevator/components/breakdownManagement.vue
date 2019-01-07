<!--
    电梯系统 故障管理
    made by 樊得涛
    start in 2018-9-28
-->
<template>
  <div>
    <div ref="HpadTop" class="tabsDomBox0 h-paddingTop">
      <div class="navCrumbs"><p @click="toHome">首页</p> > 电梯监测系统 > <span>故障管理</span></div>
    </div>
    <div class="breakdown"
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
            <el-select v-model="device_id" placeholder="设备">
              <el-option
                v-for="item in deviceOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="oneLevelBox">
          <div class="tRBrnBox">
            <el-select v-model="value" placeholder="故障状态">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="oneLevelBox">
          <div class="tRBrnBox">
            <el-select v-model="value2" placeholder="工单进度类型">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="oneLevelBox">
          <div class="tRBrnBox">
            <el-select v-model="value3" placeholder="信息等级类型">
              <el-option
                v-for="item in options3"
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
              ref='date'
              v-model="dateVal"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              range-separator="  -  "
              :default-time="['00:00:00', '23:59:59']"
            >
            </el-date-picker>
          </div>
          <div class="sltbtn">
            <el-button @click="searchData" type="primary" icon="el-icon-search">查询</el-button>
          </div>
        </div>
        <div class="exportBox">
          <button @click="exportExcel" type="button" class="self-button">
            <span class="icon-export"></span>
            <span>导出</span>
          </button>
        </div>
      </div>

      <div class="self-table">
        <el-table
          :height="tableHei"
          :data="tableData"
          stripe
          border
          style="width: 100%">
          <el-table-column
            v-for="(v,i) in tableThLists"
            :key="i"
            :resizable="false"
            :prop="v.prop"
            :label="v.label"
            :width="v.wid!=undefined?v.wid:''">
          </el-table-column>
          <el-table-column
            label="信息等级"
            width="158"
            :resizable="false"
            >
            <template slot-scope="scope">
              <span :style="{color:scope.row.infoLevel=='告警'?'#f56c6c':scope.row.infoLevel=='预警'?'#ffa414':'#439aff'}">{{ scope.row.infoLevel }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="故障状态"
            width="158"
            :resizable="false"
          >
            <template slot-scope="scope">
              <span :style="{color:scope.row.gzState=='正常'?'#4ae283':'#439aff'}">{{ scope.row.gzState }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="工单进度"
            width="158"
            :resizable="false"
          >
            <template slot-scope="scope">
              <span :style="{color:scope.row.workProgress=='处理中'?'#f56c6c':scope.row.workProgress=='已完成'?'#4ae283':'#439aff'}">{{ scope.row.workProgress }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="故障时长"
            :resizable="false"
          >
            <template slot-scope="scope">
              <div v-html="scope.row.gzTime=='未恢复'?'<a style='+'color: #3b89f9'+' href='+'https://www.baidu.com'+'>未恢复</a>':'<span>'+scope.row.gzTime+'</span>'"></div>
            </template>
          </el-table-column>
        </el-table>


        <div class="pagingBox">
          <el-pagination
            @current-change="changePage"
            :current-page.sync="pagenumber"
            :pager-count="5"
            :page-size="20"
            layout="prev, pager, next, jumper"
            :total="paging">
          </el-pagination>
          <span class="totalPage">共{{parseInt(paging/20)+(paging%20 !== 0?1:0)}}页</span>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  import utils from "../../../assets/js/utils.js";
  export default {
    components:{

    },
    data () {
      return {
        loading:false,
        device_id:'',
        deviceOptions:[],
        floor_id:0,
        value:'',
        options:[
          {
            label:'全部状态',
            value:''
          },
          {
            label:'关闭',
            value:'0'
          },
          {
            label:'开启',
            value:'1'
          },
          {
            label:'故障',
            value:'2'
          },
          {
            label:'疲劳',
            value:'3'
          },
        ],
        value2:'',
        options2:[
          {
            label:'全部工单进度',
            value:''
          },
          {
            label:'未接单',
            value:'0'
          },
          {
            label:'接单',
            value:'1'
          },
          {
            label:'申请延期',
            value:'2'
          },
          {
            label:'延期申请通过',
            value:'3'
          },
          {
            label:'完成',
            value:'4'
          },
          {
            label:'申请退单',
            value:'5'
          },
          {
            label:'退单申请通过',
            value:'6'
          },
        ],
        value3:'',
        options3:[
          {
            label:'全部信息等级',
            value:''
          },
          {
            label:'普通',
            value:'0'
          },
          {
            label:'预警',
            value:'1'
          },
          {
            label:'告警',
            value:'2'
          },
        ],
        floorSelectedOptions:[],
        floorOptions: [],
        dateVal:null,

        //表格
        tableHei:0,
        paging:0,//数据条数
        pagenumber:1,//页码
        tableThLists:[
          {prop:'num',label:'序号',wid:60},
          {prop:'time',label:'时间',wid:158},
          {prop:'position',label:'位置',wid:316},
          {prop:'gzType',label:'故障类型',wid:158},
        ],

        tableData: [
          /*{num:'1',time:'2017-07-07',position:'位置位置',gzType:'故障故障',infoLevel:'告警',gzState:'正常',workProgress:'处理中',gzTime:'未恢复'},
          {num:'1',time:'2017-07-07',position:'位置位置',gzType:'故障故障',infoLevel:'预警',gzState:'正常',workProgress:'已完成',gzTime:'-'},
          {num:'1',time:'2017-07-07',position:'位置位置',gzType:'故障故障',infoLevel:'报警登',gzState:'故障中',workProgress:'jindu',gzTime:'10分39秒'},*/
        ]


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
                this.requestTableData();
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
      requestTableData(page=1){
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
            failure_state:this.value,
            plan:this.value2,
            alarm_level:this.value3,
            page:page,
            num:20,
          }
        } else {
          config = {
            floor_id:this.floor_id,
            device_id:this.device_id,
            failure_state:this.value,
            plan:this.value2,
            alarm_level:this.value3,
            start_time:this.dateVal[0],
            end_time:this.dateVal[1],
            page:page,
            num:20,
          }
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.post('pc_ims/elevator/fault_management', config, headers).then(res => {
          let data0 = res.data;
          console.log('获取故障管理数据表格', config, res);
          if (data0.code == 0) {
            this.paging = data0.count;
            let tableData = data0.data;
            let tempArr = [];
            /*tableData = [
              {
                "alarm_level": "1",
                "floor": "客梯",
                "job_id": "0",
                "state": "0",
                "time": "2019-01-02 16:39:45",
                "time_limit": "",
                "type": "1",
                'value': '测试数据！'
              },
              {num:'1',time:'2017-07-07',position:'位置位置',gzType:'故障故障',infoLevel:'告警',gzState:'正常',workProgress:'处理中',gzTime:'未恢复'},
          ];*/
            tableData.map((item,i)=>{
              let obj = {};
              obj.num = ((i+1)+(this.pagenumber-1)*20)<10?('0'+((i+1)+(this.pagenumber-1)*20)):(''+((i+1)+(this.pagenumber-1)*20));
              obj.time = item.time;
              obj.position = item.floor;
              obj.gzType = item.value;
              obj.infoLevel = (item.alarm_level==0?'普通':item.alarm_level==1?'预警':item.alarm_level==2?'告警':'未知');
              obj.gzState = (item.type==0?'关闭':item.type==1?'开启':item.type==2?'故障':item.type==3?'疲劳':'未知');
              obj.workProgress = (item.state==0?'未接单':item.state==1?'接单':item.state==2?'申请延期':item.state==3?'延期申请通过':item.state==4?'完成':item.state==5?'申请退单':item.state==6?'退单申请通过':'未知');
              obj.gzTime = item.time_limit;
              tempArr.push(obj);
            })
            this.tableData = tempArr;
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
      floorChange(val){
        console.log(val,this.floorSelectedOptions)
      },
      toHome(){
        this.$router.replace({ path: '/home', params: { isLogin: true} });
      },

      //选择页码查询
      changePage(val){
        this.pagenumber = val;
        this.requestTableData(val);
      },

      //选择查询条件后查询
      searchData(){
        this.pagenumber = 1;
        this.requestTableData();
      },

      exportExcel(){
        if (this.dateVal == null) {
          window.location.href = 'https://tesing.china-tillage.com/pc_ims/elevator/download/fault_management?floor_id=' + this.floor_id + '&device_id=' + this.device_id + '&failure_state=' + this.value + '&alarm_level=' + this.value3 + '&plan=' + this.value2+ '&project_id=' + this.$store.state.projectId;
        }else {
          window.location.href = 'https://tesing.china-tillage.com/pc_ims/elevator/download/fault_management?floor_id=' + this.floor_id + '&device_id=' + this.device_id + '&failure_state=' + this.value + '&alarm_level=' + this.value3 + '&plan=' + this.value2+'&start_time='+this.dateVal[0]+'&end_time='+this.dateVal[1]+ '&project_id=' + this.$store.state.projectId;
        }
      },

    },
    created() {
      this.tableHei = utils.hei(455);
      this.requestFloorData();
    },
    mounted() {
      this.$refs.HpadTop.style.paddingTop = Number(this.$parent.$children[0].$el.children[0].offsetHeight)+30+'px';
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">

  @import '../../../assets/css/common.css';
  @import '../../../assets/css/comon';
  .breakdown{
    margin: 0 auto;
    margin-top: 0.16rem;
    width: 13.06rem;
    .vh(610);
    /*background-color: #000000;*/
    box-shadow: 0px 4px 10px 0px
    rgba(73, 143, 226, 0.22),
    inset 1px 1px 2px 0px
    rgba(248, 253, 255, 0.15),
    inset 0px -1px 1px 0px
    #498fe2;
    border-radius: 4px;


    .selectBox{
      /*#04152c*/
      width: 100%;
      .vh(72);
      padding: 0 0.2rem;
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
          right:0.1rem;
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
      width: 100%;
      padding: 0 0.2rem;
      .gutter{
        display: block!important;
      }
      .el-table th.is-leaf{
        border-bottom-color: rgba(181, 215, 255, 0.25)!important;
      }
      .el-table th{
        font-size: 0.16rem!important;
        color: #b5d7ff!important;
        height: 4.80769vh!important;
        line-height: 4.80769vh!important;
        background-color: rgba(73, 152, 240, 0.05)!important;
      }
      .el-table tr{
        font-size: 0.14rem!important;
        color: #439aff!important;
        height: 4.80769vh!important;
        line-height: 4.80769vh!important;
        background-color: rgba(73, 152, 240, 0.05)!important;
      }
      .el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed{
        border-right: 1px solid rgba(181, 215, 255, 0.25)!important;
      }
      .el-table--border, .el-table--group{
        border: 1px solid rgba(181, 215, 255, 0.25)!important;
      }
      .el-table--border::after, .el-table--group::after, .el-table::before{
        background-color: rgba(181, 215, 255, 0.25)!important;
      }
      .el-table--border::after, .el-table--group::after{
        width: 0;
      }
      .el-table--striped .el-table__body tr.el-table__row--striped td{
        background: rgba(0, 0, 0, 0.1);
      }
      .el-table th>.cell{
        text-align: center;
      }
      .el-table .cell{
        text-align: center;
      }
      .el-table th{
        padding: 0;
      }
      .el-table td{
        padding: 0;
      }

      .pagingBox{
        .vhMT(29);
        padding: 0 0.2rem;

        display: flex;
        align-items: center;
        justify-content: flex-end;
        border-top: 0px solid rgba(58, 137, 249, 0.3);
        position: relative;
        .totalPage{
          display: flex;
          align-items: center;
          position: absolute;
          left: 0.2rem;
          font-family: PingFangSC-Regular;
          font-size: 0.12rem;
          font-weight: normal;
          font-stretch: normal;
          line-height: 1;
          letter-spacing: 0px;
          color: #008aff;
        }
      }
    }

  }

</style>
