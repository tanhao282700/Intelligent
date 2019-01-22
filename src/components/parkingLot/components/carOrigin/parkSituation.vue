<!--
    变配电系统 报警管理
    made by 胡永福
    start in 2018-9-5
-->
<template>
  <div
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0.5)"
    element-loading-spinner="el-icon-loading"
    element-loading-text="拼命加载中"
    class="parkSiuation">
    <div class="head">
      <div class="left">
        <div class="tRBrnBoxWrap">
        <div class="tRBrnBox">
          <el-cascader
            :change-on-select='true'
            :options="floorOptions"
            v-model="floorSelectedOptions"
            @change="floorChange">
          </el-cascader>
        </div>
      </div>
      </div>
      <div class="right">
        <div class="tRBrnBoxWrap">
          <div class="tRBrnBox">
            <el-select @change="timeTypeSelChange" v-model="timeType" placeholder="选择时间类型">
              <el-option
                v-for="item in timeTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="timeSelBox">
          <div class="tRBrnBoxWrap">
            <div class="tRBrnBox">
              <el-select @change="startYearSelChange" v-model="startYear" placeholder="开始年">
                <el-option
                  v-for="item in startYearOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="tRBrnBox">
              <el-select @change="startMonthSelChange" v-model="startMonth" placeholder="开始月">
                <el-option
                  v-for="item in startMonthOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="tRBrnBox">
              <el-select @change="startDaySelChange" v-model="startDay" placeholder="开始日">
                <el-option
                  v-for="item in startDayOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="tRBrnBox">
              <el-select v-model="startHour" placeholder="开始时">
                <el-option
                  v-for="item in startHourOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="line"></div>
          <div class="tRBrnBoxWrap">
            <div class="tRBrnBox">
              <el-select @change="endYearSelChange" v-model="endYear" placeholder="结束年">
                <el-option
                  v-for="item in endYearOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="tRBrnBox">
              <el-select @change="endMonthSelChange" v-model="endMonth" placeholder="结束月">
                <el-option
                  v-for="item in endMonthOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="tRBrnBox">
              <el-select @change="endDaySelChange" v-model="endDay" placeholder="结束日">
                <el-option
                  v-for="item in endDayOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="tRBrnBox">
              <el-select v-model="endHour" placeholder="结束时">
                <el-option
                  v-for="item in endHourOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="inputBox">
          <el-input v-model="carNumber" placeholder="请输入车牌号码"></el-input>
        </div>
        <div class="searchBtn">
          <el-button @click="search" type="primary" icon="el-icon-search">查询</el-button>
        </div>
      </div>
    </div>
    <div class="body">
      <Table @changePage="changePage" :table = "table"/>
    </div>
  </div>
</template>

<script>

  import Table from "../../../../components/common/table2";
  import utils from "../../../../assets/js/utils.js";
  export default {
    components: {
      Table
    },
    name: "parkSituation",
    data() {
      return {
        carNumber:'',
        startYear:'',
        endYear:'',
        startMonth:'',
        startMonthOptions:[],
        endMonth:'',
        endMonthOptions:[],
        startDay:'',
        startDayOptions:[],
        endDay:'',
        endDayOptions:[],
        startHour:'',
        startHourOptions:[],
        endHour:'',
        endHourOptions:[],
        timeType:'',
        timeTypeOptions:[
          {
            label:'进入时间',
            value:''
          },
          {
            label:'离开时间',
            value:true
          },
        ],
        floor_id:0,
        floorSelectedOptions:[0],
        floorOptions: [
          /*{
            label:'全部',
            value:0
          },
          {
            label:'1号楼',
            value:111,
            children:[
              {
                label:'1号停车场',
                value:222
              },
            ]
          }*/
        ],
        loading:false,//加载动画开关
        table:{
          showPagination:true,
          hei:464, //table高度  设置后有滚动条
          len:0, //总条数
          pageSize:20, //每页的条数 。默认为20
          page:1,  //当前页码
          data:[
            //{rowNum:'01',carNum:'川AK7Z70',inTime:'2018/09/12 10:20:22',outTime:'2018/09/12 13:20:12',totalParkTime:'1天3时34分15秒',carOrigin:'四川成都'}
          ],
          th:[
            {prop:'rowNum',label:'编号',wid:100},
            {prop:'carNum',label:'车牌号',wid:186},
            {prop:'inTime',label:'进入时间',wid:257},
            {prop:'outTime',label:'离开时间',wid:255},
            {prop:'totalParkTime',label:'累计停车时间',wid:225},
            {prop:'carOrigin',label:'车源地'},
          ]
        },
      }
    },
    computed:{
      startYearOptions(){
        let nowDate = new Date();
        let nowYear = nowDate.getFullYear();
        let arr = [];
        for (let i=0;i<5;i++){
          let obj = {};
          obj.label = ((nowYear-i)+'年');
          obj.value = ((nowYear-i)+'');
          arr.push(obj);
        }
        arr.unshift({
          label:'开始年',
          value:''
        })
        return arr;
      },
      endYearOptions(){
        let nowDate = new Date();
        let nowYear = nowDate.getFullYear();
        let arr = [];
        for (let i=0;i<5;i++){
          let obj = {};
          obj.label = ((nowYear-i)+'年');
          obj.value = ((nowYear-i)+'');
          arr.push(obj);
        }
        arr.unshift({
          label:'结束年',
          value:''
        })
        return arr;
      },
    },
    watch:{
      floorSelectedOptions(newVal){
        if (newVal.length ===0){
          this.floor_id = 0
        } else {
          this.floor_id = newVal[newVal.length-1];
        }
      }
    },
    methods: {
      requestData(){

        let tempStart = [this.startYear,this.startMonth,this.startDay,this.startHour];
        let tempEnd = [this.endYear,this.endMonth,this.endDay,this.endHour];
        for (let i=0;i<4;i++){
          if (tempStart[i].length !== tempEnd[i].length) {
            this.$message('时间格式不一致！')
            return;
          }
        }
        let tempTimeStart = Number(this.startYear+this.startMonth+this.startDay+this.startHour);
        let tempTimeEnd = Number(this.endYear+this.endMonth+this.endDay+this.endHour);
        if (tempTimeStart > tempTimeEnd){
          this.$message('结束时间应大于开始时间！');
          return;
        }
        //console.log('继续走')
        let that = this;
        let config = {
          sys_menu_id: this.$store.state.sysList[4].sys_menu_id,
          floor_id: this.floor_id,
          one_page_num:20,
          page_index:this.table.page,
          query_by_exit:this.timeType,
          query_car_id:this.carNumber,
          query_start_time:(this.startYear+this.startMonth+this.startDay+this.startHour),
          query_end_time:(this.endYear+this.endMonth+this.endDay+this.endHour),
        }
        console.log(config)
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.loading = true;
        this.$http.post('pc/2.0/parking/parking_record', config, headers).then(res => {
          let data = res.data;
          console.log('停车记录', config, res);
          if (data.code == 0) {
            let data2 = data.data;

            //楼层数据
            let area_level = data2.area_level;
            let dealedFloor = JSON.parse(JSON.stringify(area_level).replace(/title/g,'label').replace(/parent_id/g,'parent').replace(/id/g,'value').replace(/child/g,'children').replace(/\"children\"\:\[\]\,/g,''));
            this.floorOptions = dealedFloor;
            this.floorOptions.unshift({
              label:'全部区域',
              value:0,
            });

            let res_data = data2.res_data;
            if (res_data.hasOwnProperty('record_num_total')) {
              this.table.len = res_data.record_num_total;
            }
            let tempArr = [];
            if (res_data.hasOwnProperty('res_record_info')) {
              let res_record_info = res_data.res_record_info;
              res_record_info.map((item,i)=>{
                let obj = {};
                obj.rowNum = ((i+1)+(this.table.page-1)*20)<10?('0'+((i+1)+(this.table.page-1)*20)):((i+1)+(this.table.page-1)*20);
                obj.carNum = item.car_id;
                obj.inTime = item.entrance_time;
                obj.outTime = item.exit_time;
                obj.totalParkTime = item.total_time;
                obj.carOrigin = item.car_source;
                tempArr.push(obj);
              })
            }
            this.table.data = tempArr;
            this.loading = false;
          } else {
            this.loading = false;
            this.$message(data.message);
          }
        }).catch(err => {
          this.loading = false;
          console.log(err);
        })
      },
      timeTypeSelChange(val){
        //暂定
      },
      startYearSelChange(val){
        this.startMonth = '';
        this.startMonthOptions = [];
        this.startDay = '';
        this.startDayOptions = [];
        this.startHour = '';
        this.startHourOptions = [];
        if (val != ''){
          let tempArr = [
            {
              label: '开始月',
              value: ''
            }
          ];
          for (let i = 1; i < 13; i++) {
            let obj = {};
            obj.value = (i < 10 ? ('0' + i) : ('' + i));
            obj.label = (i < 10 ? ('0' + i + '月') : ('' + i + '月'));
            tempArr.push(obj)
          }
          this.startMonthOptions = tempArr;
        }

      },
      endYearSelChange(val){
        this.endMonth = '';
        this.endMonthOptions = [];
        this.endDay = '';
        this.endDayOptions = [];
        this.endHour = '';
        this.endHourOptions = [];
        if (val != ''){
          let tempArr=[
            {
              label:'结束月',
              value:''
            }
          ];
          for (let i=1;i<13;i++){
            let obj = {};
            obj.value = (i<10?('0'+i):(''+i));
            obj.label = (i<10?('0'+i+'月'):(''+i+'月'));
            tempArr.push(obj)
          }
          this.endMonthOptions = tempArr;
        }
      },
      startMonthSelChange(val){
        this.startDay = '';
        this.startHour = '';
        this.startHourOptions = [];
        if (val != '') {
          let tempArr = [
            {
              label: '开始日',
              value: ''
            }
          ];
          if (val == '01' || val == '03' || val == '05' || val == '07' || val == '08' || val == '10' || val == '12') {
            for (let i = 1; i < 32; i++) {
              let obj = {};
              obj.value = (i < 10 ? ('0' + i) : ('' + i));
              obj.label = (i < 10 ? ('0' + i + '日') : ('' + i + '日'));
              tempArr.push(obj)
            }
            this.startDayOptions = tempArr;
          } else if (val == '02') {
            if (Number(this.startYear) % 4 == 0) {
              for (let i = 1; i < 30; i++) {
                let obj = {};
                obj.value = (i < 10 ? ('0' + i) : ('' + i));
                obj.label = (i < 10 ? ('0' + i + '日') : ('' + i + '日'));
                tempArr.push(obj)
              }
              this.startDayOptions = tempArr;
            } else {
              for (let i = 1; i < 29; i++) {
                let obj = {};
                obj.value = (i < 10 ? ('0' + i) : ('' + i));
                obj.label = (i < 10 ? ('0' + i + '日') : ('' + i + '日'));
                tempArr.push(obj)
              }
              this.startDayOptions = tempArr;
            }
          } else {
            for (let i = 1; i < 31; i++) {
              let obj = {};
              obj.value = (i < 10 ? ('0' + i) : ('' + i));
              obj.label = (i < 10 ? ('0' + i + '日') : ('' + i + '日'));
              tempArr.push(obj)
            }
            this.startDayOptions = tempArr;
          }
        } else {
          this.startDay = '';
          this.startDayOptions = [];
        }
      },
      endMonthSelChange(val){
        this.endDay = '';
        this.endHour = '';
        this.endHourOptions = [];
        if (val != '') {
          let tempArr = [
            {
              label: '结束日',
              value: ''
            }
          ];
          if (val == '01' || val == '03' || val == '05' || val == '07' || val == '08' || val == '10' || val == '12') {
            for (let i = 1; i < 32; i++) {
              let obj = {};
              obj.value = (i < 10 ? ('0' + i) : ('' + i));
              obj.label = (i < 10 ? ('0' + i + '日') : ('' + i + '日'));
              tempArr.push(obj)
            }
            this.endDayOptions = tempArr;
          } else if (val == '02') {
            if (Number(this.endYear) % 4 == 0) {
              for (let i = 1; i < 30; i++) {
                let obj = {};
                obj.value = (i < 10 ? ('0' + i) : ('' + i));
                obj.label = (i < 10 ? ('0' + i + '日') : ('' + i + '日'));
                tempArr.push(obj)
              }
              this.endDayOptions = tempArr;
            } else {
              for (let i = 1; i < 29; i++) {
                let obj = {};
                obj.value = (i < 10 ? ('0' + i) : ('' + i));
                obj.label = (i < 10 ? ('0' + i + '日') : ('' + i + '日'));
                tempArr.push(obj)
              }
              this.endDayOptions = tempArr;
            }
          } else {
            for (let i = 1; i < 31; i++) {
              let obj = {};
              obj.value = (i < 10 ? ('0' + i) : ('' + i));
              obj.label = (i < 10 ? ('0' + i + '日') : ('' + i + '日'));
              tempArr.push(obj)
            }
            this.endDayOptions = tempArr;
          }
        } else {
          this.endDayOptions = [];
        }
      },
      startDaySelChange(val){

        if (val != ''){
          let tempArr=[
            {
              label:'开始时',
              value:''
            }
          ];
          for (let i=1;i<24;i++){
            let obj = {};
            obj.value = (i<10?('0'+i):(''+i));
            obj.label = (i<10?('0'+i+'时'):(''+i+'时'));
            tempArr.push(obj)
          }
          this.startHourOptions = tempArr;
        } else {
          this.startHour = '';
          this.startHourOptions = [];
        }
      },
      endDaySelChange(val){

        if (val != ''){
          let tempArr=[
            {
              label:'结束时',
              value:''
            }
          ];
          for (let i=1;i<24;i++){
            let obj = {};
            obj.value = (i<10?('0'+i):(''+i));
            obj.label = (i<10?('0'+i+'时'):(''+i+'时'));
            tempArr.push(obj)
          }
          this.endHourOptions = tempArr;
        } else {
          this.endHour = '';
          this.endHourOptions = [];
        }
      },
      //分页：切换页面
      changePage(val){
        this.table.page = val;
        this.requestData();
      },
      floorChange(val){
        console.log(val,this.floorSelectedOptions)
      },
      //查询按钮事件
      search(){
        this.table.page = 1;
        this.requestData();
      },

    },
    created() {
      this.requestData();
    },
    mounted() {

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">
  @import '../../../../assets/css/common.css';
  @import '../../../../assets/css/comon';
  .parkSiuation{
    width: 13.06rem;
    .vh(578);
    background-color: transparent;
    box-shadow: 0px 4px 10px 0px
    rgba(73, 143, 226, 0.22),
    inset 1px 1px 2px 0px
    rgba(248, 253, 255, 0.15),
    inset 0px -1px 1px 0px
    #498fe2;
    border-radius: 4px;

    .head{
      width: 100%;
      .vh(56);
      padding: 0 0.2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: rgba(0,0,0,0.5);
      .left{
        height: 100%;
        display: flex;
        align-items: center;
      }
      .right{
        height: 100%;
        display: flex;
        align-items: center;
      }
      .tRBrnBoxWrap{
        width: 1.10rem;
        .vh(32);
        border: 1px solid #3a84ee;
        display: flex;
        justify-content: center;
      }
      .tRBrnBox {
        width: 0.88rem;
        height: 100%;
        .el-select{
          height: 100%;
        }
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
      .timeSelBox{
        display: flex;
        align-items: center;
        margin-left: 0.12rem;
        .tRBrnBoxWrap{
          min-width: 1.10rem;
          width: auto;
        }
        .line{
          margin:0 0.05rem;
          width: 0.08rem;
          height: 1px;
          background-color: #fff;
        }
        .tRBrnBoxWrap{
          padding-right: 0.16rem;
        }
        .tRBrnBox {
          width: 0.48rem;
          height: 100%;
          margin-left: 0.16rem;
          .el-select{
            height: 100%;
          }
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
      }
      .inputBox{
        margin-left: 0.12rem;
        width: 1.75rem;
        .vh(32);
        border: 1px solid #3a84ee;
        .el-input{
          width: 100%!important;
          height: 100%;
          .el-input__inner{
            width: 100%;
            height: 100%;
          }
        }
      }
      .searchBtn{
        width: 0.87rem;
        .vh(32);
        .el-button--primary{
          width: 100%;
          height: 100%;
          display: inline-block;
          line-height: 1;
          padding: 0;
        }
      }
      .self-button{
        margin-left: 0.09rem;
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
          background: url("../../../../assets/img/fireAlarm/icon_export.png") no-repeat center;
          background-size: 100% 100%;
          margin-right: 0.08rem;
        }
      }
    }
    .body{
      width: 100%;
      padding: 0 5px;
      .tableBox .el-table__header{
        background-color: transparent!important;
      }
    }
  }


</style>
