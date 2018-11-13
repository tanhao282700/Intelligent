<template>
  <div class="controlLog">
    <div class="head">
      <span class="title">控制日志</span>
    </div>
    <div class="body">
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
          @current-change="handleCurrentChange"
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
</template>

<script>
  import utils from '../../../../assets/js/utils';
  export default {
    components: {

    },
    name: "controlLog",
    data() {
      return {
        tableHei:0,
        paging:0,//数据条数
        pagenumber:1,//页码
        tableThLists:[
          {prop:'num',label:'编号',wid:60},
          {prop:'time',label:'时间',wid:180},
          {prop:'mode',label:'模式',wid:120},
          {prop:'waterPump',label:'水泵',wid:180},
          {prop:'host',label:'主机',wid:120},
          {prop:'coolTower',label:'冷却塔',wid:120},
          {prop:'reason',label:'原因'},
        ],

        tableData: [
          /*{num:'01',time:'2018-07-07 12:50',mode:'一键启停模式',waterPump:'1号关闭，2号开启',host:'-',coolTower:'-',reason:'1号水泵累计运行时间超长'},
          {num:'02',time:'2018-07-07 13:50',mode:'一键启停模式',waterPump:'2号关闭，4号开启',host:'-',coolTower:'-',reason:'4号水泵累计运行时间超长'},*/
        ]
      }
    },
    methods: {
      //获取控制日志
      getControlLog(pagenumber=1,pagesize=20){
        let that = this;
        let config = {
          pagenumber:pagenumber,
          pagesize:pagesize,
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.get('hvac_pc/pc/control/record', config, headers).then(res => {
          let data = res.data;
          console.log('获取控制日志', config, res);
          if (data.code == 0) {
            let arr = [];
            this.paging =data.paging;
            let data2 = data.data;
            data2.map((item,i)=>{
              let obj = {};
              let num = (i+1)+(this.pagenumber-1)*20;
              obj.num = num<10?'0'+num:num;
              obj.time = item.time;
              obj.mode = item.model;
              obj.waterPump = item.water;
              obj.host = item.host;
              obj.coolTower = item.cool;
              obj.reason = item.reason;
              arr.push(obj);
            })


            this.tableData = arr;

          } else {

            this.$message(data.message);
          }
        }).catch(err=>{
          this.$message(err);
        })
        /*let obj = {
          pagenumber:pagenumber,
          pagesize:pagesize,
        };
        utils.post('airConditioner/control/record',obj).then(res=>{
          console.log('获取控制日志',obj,res);
          if (res.code==0){

            let arr = [];
            this.paging =res.paging;
              let data = res.data;
            data.map((item,i)=>{
              let obj = {};
              let num = (i+1)+(this.pagenumber-1)*20;
              obj.num = num<10?'0'+num:num;
              obj.time = item.time;
              obj.mode = item.model;
              obj.waterPump = item.water;
              obj.host = item.host;
              obj.coolTower = item.cool;
              obj.reason = item.reason;
              arr.push(obj);
            })


            this.tableData = arr;

          } else {

            this.$message(res.message);
          }
        }).catch(err=>{
          this.$message(err);
        })*/
      },


      handleCurrentChange(val){
        this.getControlLog(val);
      }
    },
    created() {
      this.tableHei = utils.hei(455);
      this.getControlLog();
    },
    mounted() {

    },
  }
</script>

<style lang="less" type="text/less">
  @import '../../../../assets/css/common.css';
  @import '../../../../assets/css/comon';
  .controlLog{

    margin: 0 auto;
    width: 13.06rem;
    .vh(580);
    .vhMT(4);
    background-color: transparent;
    box-shadow: 0px 4px 10px 0px
    rgba(74, 144, 226, 0.22),
    inset 1px 1px 2px 0px
    rgba(248, 253, 255, 0.15),
    inset 0px -1px 1px 0px
    #4a90e2;
    border-radius: 4px;
    .head{
      width: 100%;
      .vh(50);
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 4px;
      padding: 0 0.2rem;
      display: flex;
      align-items: center;
      .title{
        font-family: PingFangSC-Medium;
        font-size: 0.16rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: 0px;
        color: #008aff;
      }
    }
    .body{
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
        padding: 6px 0;
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
