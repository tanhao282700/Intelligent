<template>
  <div
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0.5)"
    element-loading-spinner="el-icon-loading"
    element-loading-text="拼命加载中"
    class="chillerRunning">
    <div class="btnBox">
      <div class="tabHead">
        <button @click="tabClick(i,v.id)" type="button" v-for="(v,i) in devTitLists" v-text="v.tit" :key="i" :class="['btn1',{active:i==btnActiveIndex}]"></button>
      </div>
      <div class="dateBox">
        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="dateVal"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']">
        </el-date-picker>
      </div>
      <div class="searchBtn">
        <el-button @click="search()" type="primary" icon="el-icon-search">查询</el-button>
      </div>
      <div class="exportBox">
        <a
          :href="'https://tesing.china-tillage.com/hvac_pc/pc/water/device/excel?device_id='+btnActiveId+'&project_id='+$store.state.projectId+(dateVal.length !==0 ?('&time_start='+dateVal[0]+' 00:00:00'+'&time_end='+dateVal[1]+' 23:59:59'):'')"
          type="button" class="self-button">
          <span class="icon-export"></span>
          <span>导出</span>
        </a>
      </div>
    </div>
    <div class="h-tableBox">
      <el-table
        :height="tableHei"
        :cell-style="changeCellColor"
        :header-cell-style="changeHeadColor"
        :data="tableData3"
        style="width: 100%">
        <el-table-column
          prop="num"
          label="序号"
          width="80"
          min-width="40">
        </el-table-column>
        <el-table-column
          prop="date"
          width="150"
          label="时间"
          >

        </el-table-column>

        <el-table-column :show-overflow-tooltip="true" :label="v.title" v-for="(v,i) in title" :key="i">
          <el-table-column
            :show-overflow-tooltip="true"
            :prop="'hu'+v.son_title[i2].id"
            :label="v2.title+'\n('+v2.unit+')'"
            v-for="(v2,i2) in v.son_title"
            :key="'a'+i2"
          >

          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagingBox">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="pagenumber"
        :pager-count="5"
        :page-size="20"
        layout="total, prev, pager, next, jumper"
        :total="paging">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import utils from '../../../../assets/js/utils';
  export default {
    name: "chillerRunning",
    components: {

    },
    data() {
      return {
        loading:false,
        tableHei:0,
        title: [
          /*{
            "data": [
              13003,
              13004,
            ],
            "son_title": [
              {id:1,title:'供水温度',unit:'℃'},
              {id:2,title:'回水温度',unit:'℃'},
            ],
            "title": "冷冻水"
          },
          {
            "data": [
              13010,
              13011,
            ],
            "son_title": [
              {id:3,title:'供水温度',unit:'℃'},
              {id:4,title:'回水温度',unit:'℃'},
            ],
            "title": "冷却水"
          },
          {
            "data": [
              130101,
              130112,
              130123,
              130104,
              130115,
              130126,
              130107,
              130118,
            ],
            "son_title": [
              {id:5,title:'蒸发温度',unit:'℃'},
              {id:6,title:'蒸发压力',unit:'㎏/c㎡'},
              {id:7,title:'冷凝温度',unit:'℃'},
              {id:8,title:'冷凝压力',unit:'㎏/c㎡'},
              {id:9,title:'轴承温度',unit:'℃'},
              {id:10,title:'油温',unit:'℃'},
              {id:11,title:'油槽压差',unit:'㎏/c㎡'},
              {id:12,title:'排气温度',unit:'℃'},
            ],
            "title": "冷冻主机参数"
          }*/
        ],
        data: [
          /*{
            "data": [1,2,3,4,5,6,7,8,9,10,11,12],
            "time": "2018-09-25 09:00"
          },
          {
            "data": [1,2,3,4,5,6,7,8,9,10,11,12],
            "time": "2018-09-25 09:02"
          },*/
        ],
        tableData3: [],
        paging:0,//数据条数
        pagenumber:1,//页码
        btnActiveIndex:0,
        btnActiveId:'',
        devTitLists:[
          /*{id:1,tit:'一号冷水机组'},
          {id:2,tit:'二号冷水机组'},
          {id:3,tit:'机房主管运行情况'},*/
        ],
        dateVal:[],


      }
    },
    methods:{
      //冷水机组的title数据
      getChillerTitle(sysID=this.$store.state.sysList[1].son_list[0].sys_menu_id,floor_id=this.$store.state.airFloorId){
        let that = this;
        let config = {
          sys_menu_id:sysID,
          floor_id:floor_id
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.get('hvac_pc/pc/water/title', config, headers).then(res => {
          let data = res.data;
          console.log('冷水机组的title数据', config, res);
          if (data.code == 0) {
            let arr = [];
            let data2 = data.data;
            data2.map((item, i) => {
              let obj = {};
              obj.id = item.id;
              obj.tit = item.title;
              arr.push(obj);
            });
            if (arr[0] !=undefined) {
              if (arr[0].tit.indexOf('机房') > -1) {
                let len = arr.length;
                let temp = arr[0];
                arr.splice(0,1);
                arr.push(temp);
              }
            }


            this.devTitLists = arr;
            this.btnActiveId = arr[0].id;
            this.dateVal = [];
            this.getChillerContent(arr[0].id,1,20);

          } else {

            this.$message(data.message);
          }
        }).catch(err=>{
          this.$message(err);
        })
        /*let obj = {
          sys_menu_id:sysID,
          floor_id:floor_id
        };
        utils.post('airConditioner/water/title',obj).then(res=>{
          console.log('冷水机组的title数据',obj,res);
          if (res.code==0){
            let arr = [];
            let data = res.data;
            data.map((item, i) => {
              let obj = {};
              obj.id = item.id;
              obj.tit = item.title;
              arr.push(obj);
            });
            if (arr[0] !=undefined) {
              if (arr[0].tit.indexOf('机房') > -1) {
                let len = arr.length;
                let temp = arr[0];
                arr.splice(0,1);
                arr.push(temp);
              }
            }


            this.devTitLists = arr;
            this.btnActiveId = arr[0].id;
            this.dateVal = [];
            this.getChillerContent(arr[0].id,1,20);

          } else {

            this.$message(res.message);
          }
        }).catch(err=>{
          this.$message(err);
        })*/
      },

      //冷水机组运行参数
      getChillerContent(device_id,pagenumber=1,pagesize=20,dateArr=[]){
        this.loading = true;
        let starttime = '';
        let endtime = '';
        if (dateArr == null || dateArr.length===0){
          starttime = '';
          endtime = '';
        }else {
          starttime = dateArr[0]+' 00:00:00';
          endtime = dateArr[1]+' 23:59:59';
        }
        this.title = [];
        this.data = [];

        let that = this;
        let config = {
          device_id:device_id,
          pagenumber:pagenumber,
          pagesize:pagesize,
          time_start:starttime,
          time_end:endtime,
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.get('hvac_pc/pc/water/device', config, headers).then(res => {
          let data = res.data;
          console.log('冷水机组运行参数', config, res);
          if (data.code == 0) {
            this.paging = data.paging;
            this.title = data.data.title;
            this.data = data.data.data;
            this.dealData();
            //let arr = [];

            //this.devTitLists = arr;

          } else {
            this.loading = false;
            this.$message(data.message);
          }
        }).catch(err=>{
          this.loading = false;
          this.$message(err);
        })
        /*let obj = {
          device_id:device_id,
          pagenumber:pagenumber,
          pagesize:pagesize,
          time_start:starttime,
          time_end:endtime,
        };
        utils.post('airConditioner/water/device',obj).then(res=>{
          console.log('冷水机组运行参数',obj,res);
          if (res.code==0){
            this.paging = res.paging;
            this.title = res.data.title;
            this.data = res.data.data;
            this.dealData();
            let arr = [];
            /!*let data = res.data;
            data.map((item, i) => {

            });*!/

            //this.devTitLists = arr;

          } else {
            this.loading = false;
            this.$message(res.message);

          }
        }).catch(err=>{
          this.loading = false;
          this.$message(err);
        })*/
      },

      changeHeadColor({row, column, rowIndex, columnIndex}){
        //console.log(row, column, rowIndex, columnIndex)
        if(rowIndex === 0){ //指定坐标
          if (columnIndex!==0 && columnIndex!==1) {
            return {color: '#ffa414!important'};
          }else {
            return {color: '#b5d7ff!important'};
          }
        }else{
          return ''
        }
      },
      changeCellColor({row, column, rowIndex, columnIndex}){
        //console.log(rowIndex, columnIndex)

          if (columnIndex===0 || columnIndex===1) {
            return {color: '#b5d7ff!important'};
          }
      },
      getIndex () {
        if (!this.index) {
          this.index = 1
        } else {
          this.index++
        }
        return this.index
      },
      tabClick(index,id){
        this.btnActiveIndex = index;
        this.pagenumber = 1;
        this.btnActiveId = id;
        this.getChillerContent(id,1,20);
      },
      dealData(){
        let seif_idArr=[];
        function getNames(a,i) {//递归遍历
          if(i==a.length-1){
            return a[i].son_title;
          }
          return a[i].son_title.concat(getNames(a,i+1));
        }
        //console.log(getNames(this.title,0));
        let tempSeif_idArr = getNames(this.title,0);
        tempSeif_idArr.map((item,i)=>{
          seif_idArr.push(item.id);
        })
        console.log(seif_idArr);


        let objArr=[];
        this.data.map((item,i)=>{

          let obj = {};
          item.data.map((item2,i2)=>{

            obj['hu'+seif_idArr[i2]]=item2;
          })
          let num = (i+1)+(this.pagenumber-1)*20;
          obj.num = num<10?'0'+num:num;
          obj.date = item.time;
          objArr.push(obj);

          //console.log(item.time)
        })
        this.tableData3 = objArr;

        this.loading = false;


      },
      //分页事件
      handleCurrentChange(val){
        this.pagenumber = val;
        this.getChillerContent(this.btnActiveId,val,20,this.dateVal);
      },
      //查询按钮事件
      search(){
        //console.log(this.dateVal)
        this.pagenumber = 1;
        this.getChillerContent(this.btnActiveId,1,20,this.dateVal);
      }
    },
    created(){

      this.tableHei = utils.hei(435);

      this.getChillerTitle();

    }
  }
</script>

<style lang="less" type="text/less">
  @import '../../../../assets/css/common.css';
  @import '../../../../assets/css/comon';

  .chillerRunning{

    margin: 0 auto;
    width: 13.06rem;
    .vh(577);
    background-color: transparent;
    box-shadow: 0px 4px 10px 0px
    rgba(74, 144, 226, 0.22),
    inset 1px 1px 2px 0px
    rgba(248, 253, 255, 0.15),
    inset 0px -1px 1px 0px
    #4a90e2;
    border-radius: 4px;
    .btnBox{
      padding: 0 0.03rem;
      .vh(72);
      display: flex;
      align-items: center;
      .vhMT(4);
      position: relative;
      .tabHead{
        .btn1{
          margin-left: 0.12rem;
          .vh(32);
          background-color: rgba(59, 137, 249, 0.2);
          border-radius: 2px;

          padding-left: 0.2rem;
          padding-right: 0.2rem;
          .vhPT(6);
          .vhPB(6);

          font-family: PingFangSC-Regular;
          font-size: 0.14rem;
          line-height: 1;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #a5a5a5;

          border: solid 1px transparent;
          outline: none;
          cursor: pointer;
          &.active{
            color: #1989fa;
            background-color: transparent;
            border: solid 1px #3a84ee;
          }
        }
      }
      .dateBox{
        margin-left: 0.13rem;
        width: 2.15rem;
        .vh(32);
        .el-input__inner{
          border: 1px solid #3a84ee!important;
        }
        .el-date-editor .el-range__icon{
          display: none;
        }
        .el-range-editor .el-range-input{
          font-family: PingFangSC-Regular;
          font-size: 0.12rem;
          font-weight: normal;
          font-stretch: normal;
          line-height: 1;
          letter-spacing: 0px;
          color: #ffffff;
          background-color: transparent;
        }
        .el-date-editor .el-range-separator{
          padding: 0 5px;
          .vhLineH(32);
          width: 5%;
          color: #fff;

          font-family: PingFangSC-Regular;
          font-size: 0.12rem;
          font-weight: normal;
          font-stretch: normal;
          line-height: 1;
          letter-spacing: 0px;
          color: #ffffff;
          background-color: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
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
          border-radius: 0!important;
        }
      }
      .exportBox{
        position: absolute;
        //.vhTop(20);
        top:0;
        right: 0;
        display: inline-block;
        width: 0.88rem;
        height: 100%;
        .self-button{
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          width: 0.88rem;
          height: 0.32rem;
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
      .self-button{
        position: absolute;
        .vhTop(20);
        right: 0.2rem;
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
    .h-tableBox{
      .el-table th.is-leaf{
        border-bottom-color: rgba(181, 215, 255, 0.25)!important;
      }
      .el-table th{
        font-size: 0.14rem!important;
        font-weight: 500;
        color: #2df0e0!important;
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
      .el-table--border th, .el-table__fixed-right-patch{
        border-bottom: 1px solid rgba(181, 215, 255, 0.25);
      }
      /*.el-table__header>.is-group>tr{
        &:first-of-type>th {
          &:nth-of-type(2) {
            border-bottom: 0 !important;
            .cell{
              position: absolute;
              .vhTop(16);
              z-index: 100;
            }
          }
        }
      }*/
      .el-table th{
        padding: 6px 0;
      }
      .el-table td{
        padding: 0;
      }
      .gutter{
        /*display: block!important;*/
        /*border-right: 0!important;*/
      }
    }
    .pagingBox{
      .vhMT(29);
      padding: 0 0.2rem;

      display: flex;
      align-items: center;
      justify-content: flex-end;
      border-top: 0px solid rgba(58, 137, 249, 0.3);
      position: relative;
    }
  }
</style>
