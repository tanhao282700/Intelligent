<template>
  <div class="airConAlarmManage"
       v-loading="loading"
       element-loading-background="rgba(0, 0, 0, 0.5)"
       element-loading-spinner="el-icon-loading"
       element-loading-text="拼命加载中"
  >
    <div class="btnBox">
      <div class="tabHead">
        <button @click="tabClick(i)" type="button" v-for="(v,i) in devTitLists" v-text="v.tit" :key="i" :class="['btn1',{active:i==btnActiveIndex}]"></button>
      </div>
      <div class="oneLevelBox">
        <el-select v-model="v.value" placeholder="选择类型" v-for="(v,i) in devTitLists" v-show="i==btnActiveIndex" :key="i">
          <el-option
            v-for="item in v.options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="dateBox">
        <el-date-picker
          v-model="dateVal"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']">
        </el-date-picker>
      </div>
      <!--<div class="oneLevelBox">
        <el-select v-model="value2" placeholder="选择类型">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>-->
      <div class="oneLevelBox">
        <el-select v-model="value3" placeholder="选择类型">
          <el-option
            v-for="item in options3"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="searchBtn">
        <el-button @click="search()" type="primary" icon="el-icon-search">查询</el-button>
      </div>
    </div>
    <div class="h-tableBox">
      <Table @changePage="changePage" :table = "table"/>
    </div>
  </div>
</template>

<script>
  import Table from "../../../common/table2";
  import showColorSpan from './showColorSpan';
  import utils from '../../../../assets/js/utils';
  export default {
    name: "airConAlarmManage",
    components: {
      Table

    },
    data() {
      return {
        loading:false,
        btnActiveIndex:0,
        devTitLists:[
          /*{
            id:1,
            tit:'冷源站',
            val:'',
            //选择类型
            options: [
              {
                value: '',
                label: '全部机房'
              },{
                value: '17001',
                label: '1号机房'
              }],
          },
          {
            id:2,
            tit:'空调末端',
            val:'',
            //选择类型
            options: [
              {
                value: '',
                label: '全部机房'
              },{
                value: '17001',
                label: '1号机房'
              }],
          },*/
        ],
        dateVal:[],

        value: 0,
        //选择类型
        options2: [
          {
          value: '',
          label: '全部状态'
        },{
          value: '17001',
          label: '故障中'
        },{
          value: '17002',
          label: '正常'
        }],
        value2: '',
        //选择类型
        options3: [
          {
          value: '-1',
          label: '全部进度'
        },{
          value: '0',
          label: '未处理'
        },{
          value: '4',
          label: '已处理'
        },{
          value: '1',
          label: '处理中'
        }],
        value3: '-1',
        //表格
        table:{
          showPagination:true,
          hei:450, //table高度  设置后有滚动条
          len:0, //总条数
          pageSize:20, //每页的条数 。默认为20
          page:1,  //当前页码
          data:[
            // {num:'01',time:'2018-04-04 12:00',position:'青羊区K区7号楼-1F1号机房',deviceName:'2号冷却塔',breakDetail:'电流异常',breakState:'故障中',orderProgress:'已处理',breakTime:'未恢复'}
          ],
          th:[
            {prop:'num',label:'序号',wid:120},
            {prop:'time',label:'时间',wid:214},
            {prop:'position',label:'位置',wid:253},
            {prop:'deviceName',label:'设备',wid:158},
            {prop:'breakDetail',label:'故障详情',wid:148},
            {prop:'breakState',
              label:'故障状态',
              wid:148,
              operate: true,
              render: (h, param)=> {
                const btnss = {
                  val:param.row.breakState
                };

                return h(showColorSpan,{
                  props: {btnss:btnss},
                  on:{}
                });
              }
            },
            {prop:'orderProgress',
              label:'故障进度',
              wid:148,
              operate: true,
              render: (h, param)=> {
                const btnss = {
                  val:param.row.orderProgress
                };

                return h(showColorSpan,{
                  props: {btnss:btnss},
                  on:{}
                });
              }
            },
            {prop:'breakTime',
              label:'故障时长',
              operate: true,
              render: (h, param)=> {
                const btnss = {
                  val:param.row.breakTime
                };

                return h(showColorSpan,{
                  props: {btnss:btnss},
                  on:{}
                });
              }
            },

          ]
        },
      }
    },
    methods:{
      //报警管理title
      getAlarmTitle(){
        let that = this;
        let config = {
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.get('hvac_pc/pc/alarm/title', config, headers).then(res => {
          let data = res.data;
          console.log('报警管理title', config, res);
          if (data.code == 0) {
            let data22 = data.data;
            let tempArr = [];
            data22.map((item,i)=>{
              let obj = {};
              obj.id = item.id;
              obj.tit = item.title;
              obj.val = '';
              obj.options = [

              ];

              let data2 = item.floor;
              data2.map((item2,i2)=>{
                let obj2 = {};
                obj2.value = item2.id;
                obj2.label = item2.title;
                obj.options.push(obj2);
              });
              tempArr.push(obj);

            });
            this.devTitLists = tempArr;
            //this.value = 0;
            this.getAlarmContent(this.devTitLists[0].id,this.value);

          } else {

            this.$message(data.message);
          }
        }).catch(err=>{
          this.$message(err);
        })
      },

      //报警管理data
      getAlarmContent(sysID=this.devTitLists[0].id,floor_id,state=-1,dateArr=[],pagenumber=1, pageSize=20){
        this.loading = true;
        let starttime='';
        let endtime='';
        if (dateArr == null || dateArr.length===0){
          starttime = '';
          endtime = '';
        }else {
          starttime = dateArr[0];
          endtime = dateArr[1];
        }
        let that = this;
        let config = {
          sys_menu_id:sysID,
          floor_id:floor_id,
          state:state,
          time_s:starttime,
          time_e:endtime,
          pagenumber:pagenumber,
          pageSize:pageSize
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.get('hvac_pc/pc/alarm/table', config, headers).then(res => {
          let data = res.data;
          console.log('报警管理table', config, res);
          if (data.code == 0) {
            let arr = [];
            this.table.len = data.paging;
            let data2 = data.data;
            data2.map((item,i)=>{
              let obj = {};
              let num = (i+1)+(this.table.page-1)*20;
              obj.num = num<10?'0'+num:num;
              obj.time = item.time;
              obj.position = item.floor;
              obj.deviceName = item.devicename;
              obj.breakDetail = item.message;
              obj.breakState = item.device_state==0?'正常':'故障中';
              obj.orderProgress = item.now_state==0?'未处理':item.now_state==4?'已处理':'处理中';
              obj.breakTime = item.recovery_time;
              arr.push(obj);
            });
            this.table.data = arr;
            this.loading = false;

          } else {
            this.loading = false;
            this.$message(data.message);
          }
        }).catch(err=>{
          this.loading = false;
          this.$message(err);
        })
        /*let obj = {
          sys_menu_id:sysID,
          floor_id:floor_id,
          state:state,
          time_s:starttime,
          time_e:endtime,
          pagenumber:pagenumber,
          pageSize:pageSize
        };
        utils.post('airConditioner/alarm/table',obj).then(res=>{
          console.log('报警管理table',obj,res);
          if (res.code==0){
            let arr = [];
            this.table.len = res.paging;
            let data = res.data;
            data.map((item,i)=>{
              let obj = {};
              let num = (i+1)+(this.table.page-1)*20;
              obj.num = num<10?'0'+num:num;
              obj.time = item.time;
              obj.position = item.floor;
              obj.deviceName = item.devicename;
              obj.breakDetail = item.message;
              obj.breakState = item.device_state==0?'正常':'故障中';
              obj.orderProgress = item.now_state==0?'未处理':item.now_state==4?'已处理':'处理中';
              obj.breakTime = item.recovery_time;
              arr.push(obj);
            });
            this.table.data = arr;
          } else {

            this.$message(res.message);
          }
        }).catch(err=>{
          this.$message(err);
        })*/
      },
      tabClick(index){
        this.btnActiveIndex = index;
      },
      changePage(val){

      },
      search(){
        //console.log(this.dateVal)
        this.getAlarmContent(this.devTitLists[this.btnActiveIndex].id,this.value,this.value3,this.dateVal);

      }
    },
    created(){
      this.getAlarmTitle();

    }
  }
</script>

<style lang="less" type="text/less">
  @import '../../../../assets/css/common.css';
  @import '../../../../assets/css/comon';

  .airConAlarmManage{
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
          margin-left: 0.2rem;
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
      .oneLevelBox{
        margin-left: 0.12rem;
        display: inline-block;
        width: 1.15rem;
        .vh(32);
        background-color: rgba(255, 255, 255, 0.01);
        border-radius: 2px;
        border: solid 1px #1989fa;
        .el-select{
          width: 100%;
          height: 100%;
        }
        .el-select>.el-input{
          width: 100%;
          height: 100%;
        }
        .el-input--suffix .el-input__inner{
          width: 100%;
          height: 100%;
          border: 0!important;
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
        margin-left: 0.2rem;
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

    }
    .h-tableBox{
      padding: 0 0.08rem;
    }
  }
</style>
