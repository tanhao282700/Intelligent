<!--
    消防报警系统 历史记录
    made by 胡永福
    start in 2018-8-24
-->
<template>
<div class="fireHistory">
  <div class="selectBox">
    <div class="dateBox">
      <el-date-picker
        v-model="dateVal"
        type="date"
        placeholder="选择日期">
      </el-date-picker>
    </div>
    <div class="oneLevelBox">
      <el-select v-model="value" placeholder="选择类型">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="oneLevelBox">
      <el-select v-model="value2" placeholder="报警状态">
        <el-option
          v-for="item in options2"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="searchBox">
      <el-input placeholder="请输入地点名称" v-model="posInput" class="input-with-select">
        <el-button @click="search" slot="append" icon="el-icon-search">查询</el-button>
      </el-input>
    </div>
    <div class="exportBox">
      <button @click="exportExcel" type="button" class="self-button">
        <span class="icon-export"></span>
        <span>导出</span>
      </button>
    </div>
  </div>

  <div class="self-table">
    <Table @changePage="changePage" :table = "table"/>
  </div>
</div>
</template>
<script>
  import utils from "../../../assets/js/utils.js";
  import Table from '@/components/common/table';

  import showMark from './showMark'
  export default {
    components:{
      Table

    },
    data () {
      return {
        dateVal:'',
        //选择类型
        options: [{
          value: '',
          label: '全部类型'
        },{
          value: '17001',
          label: '烟感报警'
        }, {
          value: '17002',
          label: '温感报警'
        }, {
          value: '17003',
          label: '手动报警'
        }],
        value: '',

        //报警状态
        options2: [{
          value: '',
          label: '全部状态'
        }, {
          value: '2',
          label: '正常'
        }, {
          value: '3',
          label: '误报'
        }],
        value2: '',

        posInput:'',

        pagenum:1,//页码


        //表格
        table:{
          hei:490, //table高度  设置后有滚动条
          len:0, //总条数
          pageSize:20, //每页的条数 。默认为20
          page:1,  //当前页码
          data:[
            {num:'01',time:'2018/06/02  16:55',position:'青羊工业园区A区17栋7楼1号消防设备区域',type:'烟感报警',device:'001号消防设备',isError:0},
            {num:'02',time:'2018/06/02  16:55',position:'青羊工业园区A区17栋7楼1号消防设备区域',type:'温感报警',device:'001号消防设备',isError:1},
          ],
          th:[
            {prop:'num',label:'编号',wid:73},
            {prop:'time',label:'时间',wid:222},
            {prop:'position',label:'地点',wid:359},
            {prop:'type',
              label:'类型',
              wid:155,
              operate: true,
              render: (h, param)=> {
                const btnss = {
                  //data:param.row.type
                };
                //console.log(h,param)
                return h(showMark,{
                  props: {isError:param.row.isError,type:param.row.type},
                  on:{}
                });
              }
            },
            {prop:'device',label:'设备'},

          ]
        },

      }
    },
    methods:{
      //获取历史记录请求
      getHistory(num=1,date='',state='',type='',cont=''){
        let obj = {
          sys_menu_id:'22',
          pagesize:20,
          pagenumber:num,
          date:date,
          state:state,
          type:type,
          cont:cont
        };
        utils.post('fireAlarm/record',obj).then(res=>{
          console.log('消防历史记录',obj,res);
          if (res.code==0){
            //总共多少条数据
            this.table.len = res.paging.count;
            //数据结构重组
            let arr = [];
            let data = res.data;
            data.map((item,i)=>{
              let num = (i+1);
              let tempObj = {};
              tempObj.num = (num<10?'0'+num:num);
              tempObj.time = item.time;
              tempObj.position = item.floor_title;
              tempObj.type = item.class;
              tempObj.device = item.devicename;
              tempObj.isError = (item.schedule==2?1:0);
              arr.push(tempObj)
            })

            //赋值渲染
            this.table.data = arr;

          } else {

            this.$message(res.message);
          }
        }).catch(err=>{
          this.$message(err);
        })
      },

      //选择页码查询
      changePage(val){
        this.pagenum = val;
        this.getHistory(val,this.dateVal==''?'':utils.time(this.dateVal/1000),this.value,this.value2,this.posInput)
      },

      //选择查询条件后查询
      search(){
        this.getHistory(1,this.dateVal==''?'':utils.time(this.dateVal/1000),this.value,this.value2,this.posInput)
      },

      exportExcel(){
        this.getHisExcel(this.pagenum,this.dateVal==''?'':utils.time(this.dateVal/1000),this.value,this.value2,this.posInput)
      },


      getHisExcel(num=1,date='',state='',type='',cont=''){
        let obj = {
          sys_menu_id:'22',
          pagesize:20,
          pagenumber:num,
          date:date,
          state:state,
          type:type,
          cont:cont
        };
        utils.post('fireAlarm/record',obj).then(res=>{
          console.log('消防历史记录Excel表打出',obj,res);
          if (res.code==0){
            this.$message({
              type: 'success',
              message: res.message
            });

            this.$notify.info({
              title: '消息',
              message: '所导出的excel表文件位置：'+res.data
            });
          } else {

            this.$message(res.message);
          }
        }).catch(err=>{
          this.$message(err);
        })
      }



    },
    created() {
      this.getHistory();
    },
    mounted() {

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">

  /*插件的样式*/
  .el-popper[x-placement^=bottom] .popper__arrow{
    border-bottom-color:#04152c!important;
    &::after{
      border-bottom-color:#04152c!important;
    }
  }
  @import '../../../assets/css/common.css';
  @import '../../../assets/css/comon';
  .fireHistory{
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
      padding: 0.16rem;
      display: flex;
      align-items: center;

      .el-input__inner{
         font-size: 0.12rem!important;
        line-height: 0.32rem;
         color: #fff!important;
         background-color: rgba(0,0,0,0)!important;
         border-radius: 0.02rem!important;
        border-top-right-radius: 0!important;
        border-bottom-right-radius: 0!important;
         border: solid 1px #1989fa!important;
         height: 0.32rem!important;
      }
      .dateBox{
        display: inline-block;
        width: 1.1rem;
      }
      .oneLevelBox{
        margin-left: 0.12rem;
        display: inline-block;
        width: 0.88rem;
      }
      .searchBox{
        margin-left: 0.12rem;
        display: inline-block;
        width: 2.71rem;
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
      }
      .exportBox{
        margin-left: 0.12rem;
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
            background: url("../../../assets/img/fireAlarm/icon_export.png") no-repeat center;
            background-size: 100% 100%;
            margin-right: 0.08rem;
          }
        }
      }
    }

    .self-table{
      width: 100%;
      padding: 0 0.16rem;
      .el-table__header-wrapper{
        background-color: rgba(0,0,0,0.25)!important;
      }
    }

  }

</style>
