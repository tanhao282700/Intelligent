<!--
    空气质量监测系统 数据统计
    made by 胡永福
    start in 2019-1-14
-->
<template>
  <div>
    <div ref="HpadTop" class="tabsDomBox0 h-paddingTop">
      <div class="navCrumbs"><p @click="toHome">首页</p> > 空气质量监测系统 > <span>数据统计</span></div>
    </div>
    <div class="airQualityStatistics"
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
            <el-select @change="deviceChange" v-model="device_id" placeholder="选择设备">
              <el-option
                v-for="item in deviceOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="timeSelBox">
          <i class="el-icon-caret-bottom self-icon" style="padding-left:0.02rem;"></i>
          <el-date-picker
            @change="timeChange"
            format="yyyy-MM-dd HH时"
            value-format="yyyy-MM-dd HH:00:00"
            v-model="selectedTime"
            type="datetime"
            placeholder="选择时间"
            default-time="00:00:00">
          </el-date-picker>
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
  import Table from '../../common/table2';
  export default {
    components:{
      Table
    },
    data () {
      return {
        floorDeviceData:[],
        selectedTime:'',
        loading:false,
        device_id:0,
        deviceOptions:[
          {
            label:'全部设备',
            value:0
          }
        ],
        floor_id:0,
        floorSelectedOptions:[0],
        floorOptions: [],
        dateVal:null,
        wbValue:'',
        wbOptions:[
          {
            label:'全部',
            value:'',
          },
          {
            label:'维修',
            value:'0',
          },
          {
            label:'保养',
            value:'1',
          },
        ],

        //表格
        tableHei:0,
        paging:0,//数据条数
        pagenumber:1,//页码
        tableThLists:[
          {prop:'num',label:'编号',wid:60},
          {prop:'floor',label:'区域'},
          {prop:'pointName',label:'点位名称'},
          /*{prop:'point1',label:'二氧化碳'},
          {prop:'point2',label:'一氧化碳'},
          {prop:'point3',label:'甲醛'},
          {prop:'point4',label:'温度'},
          {prop:'point5',label:'湿度'},
          {prop:'point6',label:'PM2.5'},
          {prop:'point7',label:'PM10'},*/
        ],

        tableData: [
          /*{num:'1',floor:'1栋1层',pointName:'洗手间',point1:'8',point2:'8',point3:'8',point4:'8',point5:'8',point6:'8',point7:'8'},
          {num:'2',floor:'1栋2层',pointName:'办公厅',point1:'18',point2:'18',point3:'18',point4:'18',point5:'18',point6:'18',point7:'18'},*/
        ]

      }
    },
    watch:{
      floorSelectedOptions(newVal){
        this.device_id = 0;
        this.deviceOptions = [
          {
            label:'全部设备',
            value:0
          }
        ];
        if (newVal.length ===0){
          this.floor_id = 0;
        } else {
          this.floor_id = newVal[newVal.length-1];
          this.floorDeviceData.some((item,i)=>{
            if (this.floor_id == item.id) {
              let tempArr = [
                {
                  label:'全部设备',
                  value:0
                }
              ];
              item.device.map((item2,i2)=>{
                let obj = {};
                obj.label = item2.name;
                obj.value = item2.device_id;
                tempArr.push(obj);
              })
              this.deviceOptions = tempArr;
              return true;
            }
          })
        }
        this.requestTableData();
      },
    },
    methods:{
      timeChange(val){
        //console.log(val)
        this.requestTableData();
      },
      deviceChange(){
        this.requestTableData();
      },
      requestFloorData(){
        let that = this;
        let config = {
          sys_menu_id: this.$store.state.sysList[10].sys_menu_id,
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.get('air_pc/pc/floor/device', config, headers).then(res => {
          let data0 = res.data;
          console.log('获取空气质量楼层及设备数据', config, res);
          if (data0.code == 0) {
            //楼层数据
            let floorData = data0.data;
            /*floorData = [
              {
                "device": [
                  {
                    "device_id": 4957,
                    "name": "空气质量测试"
                  },
                  {
                    "device_id": 4958,
                    "name": "空气质量测试2"
                  }
                ],
                "id": "4",
                "name": "1号"
              },
              {
                "device": [
                  {
                    "device_id": 4957,
                    "name": "空气质量测试3"
                  },
                  {
                    "device_id": 4958,
                    "name": "空气质量测试4"
                  }
                ],
                "id": "5",
                "name": "2好"
              }
            ];*/
            this.floorDeviceData = floorData;
            let tempArr = [
              {
                label:'全部区域',
                value:0
              }
            ];
            floorData.map((item,i)=>{
              let obj = {};
              obj.label = item.name;
              obj.value = item.id;
              tempArr.push(obj);
            })
            this.floorOptions = tempArr;
          } else {
            this.$message(data0.message);
          }
        }).catch(err => {
          console.log(err);
        })
      },
      requestTableHeadData(){
        let that = this;
        let config = {};
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.get('air_pc/pc/device/history/title', config, headers).then(res => {
          let data0 = res.data;
          console.log('获取空气质量数据统计数据表格标题', config, res);
          if (data0.code == 0) {
            let headerData = data0.data;
            headerData.map((item,i)=>{
              let obj = {};
              obj.prop = 'point'+(i+2);
              obj.label = item.title;
              this.tableThLists.push(obj);
            })
            this.requestTableData();
          } else {
            this.$message(data0.message);
          }
        }).catch(err => {
          this.loading = false;
          console.log(err);
        })
      },

      requestTableData(device_id=this.device_id,page=1){
        this.loading = true;
        let that = this;
        let config = {
          sys_menu_id: this.$store.state.sysList[10].sys_menu_id,
          floor_id:this.floor_id,
          device_id:device_id,
          time:this.selectedTime,
          pagesize:20,
          pagenumber:page,
        };
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.get('air_pc/pc/device/history', config, headers).then(res => {
          let data0 = res.data;
          console.log('获取数据统计数据表格', config, res);
          if (data0.code == 0) {
            this.paging = data0.paging;
            let tableData = data0.data;
            let tempArr = [];
            tableData.map((item,i)=>{
              let obj = {};
              obj.num = ((i+1)+(this.pagenumber-1)*20)<10?('0'+((i+1)+(this.pagenumber-1)*20)):(''+((i+1)+(this.pagenumber-1)*20));
              if (item.length !==0) {
                obj.floor = item[0];
                obj.pointName = item[1];
                let len = item.length;
                for (let j=2;j<len;j++){
                  obj[('point'+j)] = item[j];
                }
                tempArr.push(obj);
              }
            })
            this.tableData = tempArr;
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
      floorChange(val){
        console.log(val,this.floorSelectedOptions)
      },
      /*searchData(){
        this.pagenumber = 1;
        this.requestTableData();
      },*/
      toHome(){
        this.$router.replace({ path: '/home', params: { isLogin: true} });
      },


      //选择页码查询
      changePage(val){
        this.pagenumber = val;
        this.requestTableData(this.device_id,val);
      },


      exportExcel(){
        window.location.href = 'https://tesing.china-tillage.com/air_pc/pc/device/excel?floor_id=' + this.floor_id + '&device_id=' + this.device_id+ '&project_id=' + this.$store.state.projectId+'&sys_menu_id='+this.$store.state.sysList[10].sys_menu_id+'&time='+this.selectedTime;
      },

    },
    created() {
      this.tableHei = utils.hei(490);
      this.requestTableHeadData();
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
  .airQualityStatistics{
    margin: 0 auto;
    .vhMT(16);
    width: 13.06rem;
    .vh(605);
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
      .vh(56);
      padding: 0 0.2rem;
      display: flex;
      align-items: center;
      position: relative;
      .timeSelBox{
        margin-left: 0.12rem;
        padding: 0 0.1rem;
        position: relative;
        width: 1.3rem;
        .vh(32);
        border: 1px solid #1989fa;
        border-radius: 2px;
        .self-icon{
          position: absolute;
          .vhTop(12);
          right: 0.08rem;
          &::after{
            position: absolute;
            .vhTop(-6);
            right: 0;
            content: '\E60B';
            transform: rotate(180deg);
          }
        }
        .el-input--suffix .el-input__inner{
          padding: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }
        .el-input__prefix{
          display: none;
        }
        .el-input__suffix{
          display: none;
        }
      }
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
        display:block;
        width:0;
        height:0;
        border-width:5px 5px 0;
        border-style:solid;
        border-color:#fff transparent transparent;/*黄 透明 透明 */
        position:absolute;
        .vhTop(15);
        right:0;
      }
      .tRBrnBox {
        padding: 0 0.1rem;
        width: 100%;
        height: 100%;
        border: 1px solid #1989fa;
        display: flex;
        align-items: center;
        border-radius: 2px;
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
          border-width:5px 5px 0;
          border-style:solid;
          border-color:#fff transparent transparent;/*黄 透明 透明 */
          position:absolute;
          .vhTop(15);
          right:0;
          &::before{
            content: "";
            display:block;
            width:0;
            height:0;
            border-width:5px 5px 0;
            border-style:solid;
            border-color:#fff transparent transparent;/*黄 透明 透明 */
            position:absolute;
            .vhTop(-12);
            right:-0.045rem;
            transform: rotate(180deg);
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
          display:block;
          width:0;
          height:0;
          border-width:5px 5px 0;
          border-style:solid;
          border-color:#fff transparent transparent;/*黄 透明 透明 */
          position:absolute;
          .vhTop(15);
          right:0;
        }
        .el-select::before {
          content: "";
          pointer-events: none;
          display:block;
          width:0;
          height:0;
          border-width:5px 5px 0;
          border-style:solid;
          border-color:#fff transparent transparent;/*黄 透明 透明 */
          position:absolute;
          .vhTop(8);
          right:0;
          transform: rotate(180deg);
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
          /*border-bottom: solid 1px #1989fa !important;*/
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
        .vhTop(13);
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
        font-size: 0.14rem!important;
        font-weight: normal;
        color: #36fceb!important;
        .vh(35);
        .vhLineH(35);
        background-color: rgba(73, 152, 240, 0.05)!important;
      }
      .el-table tr{
        font-size: 0.14rem!important;
        color: #fff!important;
        .vh(35);
        .vhLineH(35);
        background-color: rgba(73, 152, 240, 0.05)!important;
      }
      .el-table td {
        border-bottom-color: rgba(181, 215, 255, 0.25);
        .vh(35);
        .vhLineH(35);
        padding: 0;
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
        background: rgba(255, 255, 255, 0.03);
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
        &:first-of-type{
          background: rgba(255, 255, 255, 0.03);
        }
      }

      .pagingBox{
        //.vhMT(29);
        .vh(59);
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
