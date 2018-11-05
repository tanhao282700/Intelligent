<template>
  <div class="permissionBox autoComponent fireAlarm" v-loading="loading"
       element-loading-background="rgba(0, 0, 0, 0.5)"
       element-loading-spinner="el-icon-loading"
       element-loading-text="拼命加载中">
    <SysHead :datas = "routerData" v-on:searchCont="search"/>
    <div class="userBox">
      <!--面包屑-->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>告警管理</el-breadcrumb-item>
      </el-breadcrumb>

      <!--内容模块-->
      <div class="contentBox boxs">
        <!--查询区-->
        <div class="itemsBox">
          <!--筛选查询-->
          <div class="queryBox">
            <el-select clearable :placeholder="items.placeHolder" v-for="(items,index) in options" v-model="formData.level" :key="index" class="querySelectItem">
              <el-option label="请选择"></el-option>
              <el-option
                v-for="item in items.data"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select placeholder="子系统" @change="choseSys" v-model="formData.sys_id" class="querySelectItem">
              <el-option label="请选择"></el-option>
              <el-option
                v-for="item in sysData"
                :key="item.sys_id"
                :label="item.name"
                :value="item.sys_id">
              </el-option>
            </el-select>
            <el-select placeholder="楼层" @change="choseFloor" v-model="formData.floor_id" class="querySelectItem">
              <el-option label="请选择"></el-option>
              <el-option
                v-for="item in floorData"
                :key="item.floor_id"
                :label="item.floor_name"
                :value="item.floor_id">
              </el-option>
            </el-select>
            <el-select placeholder="设备" v-model="formData.device_id" class="querySelectItem">
              <el-option label="请选择"></el-option>
              <el-option
                v-for="item in deviceData"
                :key="item.device_id"
                :label="item.device_name"
                :value="item.device_id">
              </el-option>
            </el-select>
            <el-date-picker
              v-model="timeValue"
              type="daterange"
              size="mini"
              @change="choseTime"
              range-separator="-"
              value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
            <div>
              <el-button @click="queryForm" class="queryDataBtn queryBoxBtn" ><i></i><span>查询</span></el-button>
            </div>
          </div>

          <!--导出-->
          <div>
            <a style="display: block" :href="downloadFile+'?start_time='+fileTime[0]+'&end_time='+fileTime[1]+'&level='+formData.level+'&sys_id='+formData.sys_id+'&floor_id='+formData.floor_id+'&device_id='+formData.device_id+'&project_id='+this.formData.project_id"><el-button class="addNewUserBtn queryBoxBtn export" ><i></i><span>导出</span></el-button></a>
          </div>
        </div>

        <!--用户表格-->
        <div class="userTableContainer fireAlarmTable" style="flex:1;display: flex;flex-direction: column">
          <el-table
            :data="curPageData"
            style="width: 100%;flex:1;"
            height="500"
            class=" tableHeadBlue">
            <el-table-column
              type="index"
              :index="indexMethod"
              label="序号"
              min-width="14%">
            </el-table-column>
            <el-table-column
              prop="time"
              label="日期"
              min-width="11%">
            </el-table-column>
            <el-table-column
              prop="level"
              label="报警级别"
              min-width="8%">
            </el-table-column>
            <el-table-column
              prop="word"
              label="报警描述"
              min-width="15%">
            </el-table-column>
            <el-table-column
              prop="sys_name"
              label="子系统"
              min-width="10%">
            </el-table-column>
            <el-table-column
              prop="device_name"
              label="设备"
              min-width="10%">
            </el-table-column>
            <el-table-column
              prop="floor_name"
              label="楼层"
              min-width="8%">
            </el-table-column>
            <el-table-column
              prop="recovery_time"
              label="持续时间"
              min-width="6%">
            </el-table-column>
            <el-table-column
              prop="now_state"
              label="维修状态"
              min-width="6%">
            </el-table-column>
            <el-table-column
              prop="control_user"
              label="维修人"
              min-width="8%">
            </el-table-column>
          </el-table>

          <!--分页器-->
          <div class="paginationBox">
            <div class="totalPageNumBox">共{{formData.pageCount}}页</div>

            <div class="el-input el-pagination__editor is-in-pagination curPageBox">
              <input type="number" autocomplete="off" class="el-input__inner" v-model="formData.pagenumber">
              <span @click="toInputPage">GO</span>
            </div>

            <el-pagination
              @current-change="currentPageChange"
              :current-page="formData.pagenumber"
              :page-size="formData.pagesize"
              layout="prev, pager, next"
              :total="formData.total">
            </el-pagination>

          </div>

        </div>


      </div>

    </div>
  </div>
</template>

<script>
  import SysHead from '@/components/common/sysHead';
  import "../../assets/css/Permission/permission.css";

  export default {
    components: {
      "SysHead":SysHead
    },
    name: "fireAlarm",
    data(){
      return {
        loading:true,
        downloadFile:'https://tesing.china-tillage.com/index_pc/pc/select/alarm/excel', //导出功能路径
        formData:{
          level:'',
          sys_id:'',
          floor_id:'',
          device_id:'',
          start_time:'',
          end_time:'',
          project_id:'',
          pagesize:20,
          pagenumber:1,
          total:0,
          pageCount:0
        },
        sysData:[],  //子系统数据
        floorData:[],  //楼层数据
        deviceData:[], //设备数据
        routerData: {
          id: 0,
          lists: [
            {id: 0, name: '告警管理', route: '/fireAlarm'},
          ]
        },
        options: [
          {
            placeHolder: '报警级别',
            data: [{
              "value": 1,
              "label": "预警"
            }, {
              "value": 0,
              "label": "提醒"
            }, {
              "value": 2,
              "label": '告警'
            }]
          }],
        timeValue:[],
        curPageData:[],
        fileTime:['','']  //文件下载需要的时间
      }
    },
    created(){
      this.initData()
      this.initTitle()

    },
    mounted(){
      this.formData.project_id = this.$store.state.projectId;
    },
    methods:{
      indexMethod(index) {
        return this.formData.pagesize * (this.formData.pagenumber-1) + index + 1;
      },
      initData(){
        this.$http.get('/index_pc/pc/select/alarm',this.formData).then((response)=>{
          this.curPageData = response.data.data
          this.formData.total = response.data.paging
          this.formData.pageCount = Math.ceil(response.data.paging/this.formData.pagesize)
          this.loading = false
        })
          .catch(function (error) {
            console.log(error);
          });
      },
      initTitle(){
        this.$http.get('/index_pc/pc/select/alarm/title')
          .then((response)=>{
            this.sysData = response.data.data
        })
          .catch(function (error) {
            console.log(error);
          });
      },
      choseTime(){
        if(this.timeValue == null){
          this.timeValue = ['','']
        }
        this.fileTime = this.timeValue
      },
      choseSys(){
        this.sysData.map((item,index)=>{
         if(this.formData.sys_id){
          if(item.sys_id == this.formData.sys_id){
            this.floorData = item.floors
            this.formData.floor_id = ''
            this.deviceData = []
            this.formData.device_id = ''
            return
          }
         }else{
          this.floorData = []
          this.formData.floor_id = ''
          this.deviceData = []
          this.formData.device_id = ''
        }

        })
      },
      choseFloor(){
          if(this.formData.floor_id){
            this.floorData.map((item,index)=>{
              if(item.floor_id==this.formData.floor_id){
              this.deviceData = item.device
              this.formData.device_id = ''
            }
          })
          }else{
            this.deviceData = []
            this.formData.device_id = ''
          }

      },
      queryForm(){
          console.log(this.timeValue)
          this.loading = true
          if(this.timeValue&&this.timeValue.length!=0 && this.timeValue[0]==this.timeValue[1]){
            this.timeValue[1] = this.timeValue[1].split(' ')[0]+' 23:59:59'
          }
          if(this.timeValue&&this.timeValue.length!=0 && this.timeValue.length>0){
            this.formData.start_time = this.timeValue[0]
            this.formData.end_time = this.timeValue[1]
          }else{
            this.formData.start_time = ''
            this.formData.end_time = ''
          }

          this.initData()
      },
      search(param){
        /*console.log(param);*/
      },
      toInputPage(){
        this.loading = true
        if(this.formData.pagenumber > this.formData.pageCount){
          this.formData.pagenumber = this.formData.pageCount
        }
        this.initData()
      },
      currentPageChange(aa){
        this.loading = true
        this.formData.pagenumber = aa
        this.initData()
      },
      exports(){
        if(this.timeValue&&this.timeValue.length!=0 && this.timeValue.length>0){
          this.formData.start_time = this.timeValue[0]
          this.formData.end_time = this.timeValue[1]
        }else{
          this.formData.start_time = ''
          this.formData.end_time = ''
        }
        /*this.$http.get('/index_pc/pc/select/alarm/excel',this.formData).then((response)=>{
          console.log(response)
        })
          .catch(function (error) {
            console.log(error);
          });*/
        window.location.href='/index_pc/pc/select/alarm/excel'
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .contentBox{
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .paginationBox{
    position:static!important;
    margin-top: 0.2rem!important;
    margin-bottom: 0.2rem!important;
  }
</style>
<style>
  .fireAlarm .userBox td:first-child{
    padding-left:0!important;
  }
  .fireAlarm .fireAlarmTable{
    padding-left:1%;
  }
  .fireAlarm .tableHeadBlue th{
    background:none!important;
  }
  /*.fireAlarm .fireAlarmTable tr .cell:first-child{
    padding-left:0.2rem!important;
  }
  .fireAlarm tr th:first-child .cell{
    padding-left:0.2rem;
  }*/
  .fireAlarm .el-table .el-table__body td .cell{
    font-size:0.12rem!important;
  }
  .fireAlarm .el-table th>.cell{
    font-size:0.12rem!important;
  }
  .fireAlarm .el-range-input{
    width:80px!important;
    background:none;
    color:white;
  }
  .fireAlarm .el-range-separator{
    color:white;
  }
  .fireAlarm .export{
    width:0.88rem;
    background-color: #3A84EE!important;
  }
  .fireAlarm .export i{
    background:url(../../assets/img/Alarm/export.png);
    margin-right:0.06rem;
  }
</style>
