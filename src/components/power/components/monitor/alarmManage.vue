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
    class="alarmManage">
    <div class="head">
      <div class="btnWrap">
        <div class="monthBox">
          <el-date-picker
            v-model="monthVal"
            type="month"
            format="yyyy-MM"
            value-format="yyyy-MM"
            placeholder="选择月">
          </el-date-picker>
        </div>
        <!--<div class="tRBrnBox">
          <el-select @change="selChange" v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>-->
        <div class="tRBrnBox">
          <el-select @change="selChange2" v-model="value2" placeholder="请选择">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="tRBrnBox">
          <el-select @change="selChange3" v-model="value3" placeholder="请选择">
            <el-option
              v-for="item in options3"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="tRBrnBox">
          <el-select @change="selChange4" v-model="value4" placeholder="请选择">
            <el-option
              v-for="item in options4"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <!--<div class="serConBox">
          <el-input v-model="serCon" placeholder="请输入内容"></el-input>
        </div>-->
      </div>
      <div class="searchBtn">
        <el-button @click="search()" type="primary" icon="el-icon-search">查询</el-button>
      </div>
      <button @click="exportReport()" type="button" class="self-button">
        <span class="icon-export"></span>
        <span>导出</span>
      </button>
    </div>
    <div class="body">
      <Table @changePage="changePage" :table = "table"/>
    </div>
  </div>
</template>

<script>

  import Table from "../../../../components/common/table2";
  import showProgress from './showProgress';
  import utils from "../../../../assets/js/utils.js";
  export default {
    components: {
      Table
    },
    name: "alarmManage",
    data() {
      return {
        //serCon:'搜索内容',
        options:[],
        value:'',
        options2:[
          {
            label:'全部报警等级',
            value:''
          },
          {
            label:'提醒',
            value:0
          },
          {
            label:'预警',
            value:1
          },
          {
            label:'告警',
            value:2
          }
        ],
        value2:'',
        options3:[
          {
            label:'全部进度',
            value:-1
          },
          {
            label:'未处理',
            value:0
          },
          {
            label:'处理中',
            value:1
          },
          {
            label:'已完成',
            value:4
          }
        ],
        value3:-1,
        options4:[],
        value4:'',
        loading:false,//加载动画开关

        monthVal:utils.time(new Date()/1000,9),

        num:1,//第几页
        table:{
          showPagination:true,
          hei:464, //table高度  设置后有滚动条
          len:0, //总条数
          pageSize:20, //每页的条数 。默认为20
          page:1,  //当前页码
          data:[
            /*{num:'01',time:'2018/06/02  16:55',position:'低压侧XX柜 wpm-301回路',event:'开关断开',class:'严重',progress:'未处理',person:'张三三'},
            {num:'02',time:'2018/06/02  16:55',position:'低压侧XX柜 wpm-301回路',event:'开关断开',class:'严重',progress:'已完成',person:'张三三'},
            {num:'03',time:'2018/06/02  16:55',position:'低压侧XX柜 wpm-301回路',event:'开关断开',class:'严重',progress:'处理中',person:'张三三'}*/,
          ],
          th:[
            {prop:'number11',label:'编号',wid:93},
            {prop:'time',label:'时间',wid:221},
            {prop:'floor',label:'设备机房',wid:198},
            {prop:'position',label:'设备位置',wid:228},
            {prop:'event',label:'报警事件',wid:155},
            {prop:'class',label:'报警等级',wid:154},
            {prop:'progress',
              label:'进度',
              wid:141,
              operate: true,
              render: (h, param)=> {
                const btnss = {
                  //data:param.row.type
                };
                //console.log(h,param)
                return h(showProgress,{
                  props: {name:param.row.progress},
                  on:{}
                });
              }
            },
            {prop:'person',label:'责任人'},
          ]
        },
      }
    },
    methods: {
      selChange(val){
        console.log(val)
      },
      selChange2(val){
        console.log(val)
      },
      selChange3(val){
        console.log(val)
      },
      selChange4(val){
        console.log(val)
      },
      getUser() {
        this.options4 = [];
        let that = this;
        let config = {
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.get('power_pc/pc/title/user', config, headers).then(res => {
          let data = res.data;
          console.log('获取责任人用户列表', config, res);
          if (data.code == 0) {
            let datas = data.data;
            let tempArr = [
              {
                label:'全部责任人',
                value:'',
              }
            ];
            datas.map((item, i) => {
              let obj = {};
              obj.label = item.name;
              obj.value = item.id;
              tempArr.push(obj);
            })
            this.options4 = tempArr;
          } else {
            this.$message(data.message);
          }
        }).catch(err => {
          console.log(err);
        })
      },
      /*getFloor() {
        this.options = [];
        let that = this;
        let config = {
          'sys_menu_id': this.$store.state.sysList[3].sys_menu_id,
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.get('power_pc/pc/floor', config, headers).then(res => {
          let data = res.data;
          console.log('获取变配电机房', config, res);
          if (data.code == 0) {
            let datas = data.data;
            let tempArr = [];
            datas.map((item, i) => {
              let obj = {};
              obj.self_id = item.self_id;
              obj.label = (item.self_id==1206?('高压-'+item.title):item.self_id==1207?('低压-'+item.title):'点位变化');
              obj.value = item.id;
              tempArr.push(obj);
            })
            this.options = tempArr;
            if (datas.length !== 0) {
              this.value = this.options[0].value;
            }
          } else {
            this.$message(data.message);
          }
        }).catch(err => {
          console.log(err);
        })
      },*/
      //获取报警管理数据
      getData(time,num=1,level='',state='-1',user_id=''){
        this.loading = true;
        let that = this;
        let config = {
          'sys_menu_id':this.$store.state.sysList[3].sys_menu_id,
          'time':time,
          'pagesize':20,
          'pagenumber':num,
          'level':level,
          'state':state,
          'user_id':user_id
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.get('power_pc/pc/alarm', config, headers).then(res => {
          let data = res.data;
          console.log('报警管理数据报表', config, res);
          if(data.code==0){

            this.table.len = data.paging;//多少条数据

            let data2 = data.data;
            let dataArr = [];
            data2.map((item,i)=>{
              let obj = {};
              let num2 = (i+1)+(this.table.page-1)*20;
              obj.number11 = (num2<10?('0'+num2):(''+num2));
              obj.time = item.time;
              obj.floor = item.device_location;
              obj.position = item.device_name;
              obj.event = item.message;
              obj.class = item.alarm_level==0?'提醒':item.alarm_level==1?'预警':item.alarm_level==2?'告警':'未知';
              obj.progress = item.state==0?'未处理':item.state==1?'处理中':item.state==4?'已完成':'未知';
              obj.person = item.charge;
              dataArr.push(obj);
            })
            this.table.data = dataArr;
            //console.log('我得到的',this.table.data)
            this.loading = false;
          }else{
            this.loading = false;
            this.$message(data.message);
          }
        }).catch(err=>{
          console.log(err);
          this.loading = false;
        })


      },
      //分页：切换页面
      changePage(val){
        this.num = val;
        this.getData(this.monthVal,val,this.value2,this.value3,this.value4);
        // console.log(val)
      },
      //查询按钮事件
      search(){
        this.table.page = 1;
        this.getData(this.monthVal,1,this.value2,this.value3,this.value4);
      },
      //导出数据报表
      exportReport(){
        window.location.href = 'https://tesing.china-tillage.com/power_pc/pc/alarm/excel?sys_menu_id='+this.$store.state.sysList[3].sys_menu_id+'&time='+this.monthVal+'&level='+this.value2+'&state='+this.value3+'&user_id='+this.value4;
        //this.getExcel(this.monthVal)
      },
    },
    created() {
      this.getUser();
      //this.getFloor();
      this.getData(this.monthVal,1);//初始页面请求
    },
    mounted() {

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">
  @import '../../../../assets/css/common.css';
  @import '../../../../assets/css/comon';

  .alarmManage{
    .el-input--suffix .el-input__inner{
      height: 100%!important;
    }
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
      .vh(64);
      padding: 0 0.2rem;
      display: flex;
      align-items: center;
      .btnWrap{
        display: flex;
        width: 4.38rem;
        .vh(32);
        position: relative;
        border: 1px solid #3a84ee;
        padding: 0 0.15rem;
        .monthBox{
          &::after{
            content: "";
            pointer-events: none;
            display:block;
            width:0;
            height:0;
            border-width:4px 4px 0;
            border-style:solid;
            border-color:#008aff transparent transparent;/*黄 透明 透明 */
            position:absolute;
            .vhTop(12);
            left:0.75rem;
          }
          display: inline-block;
          //align-items: center;
          width: 0.8rem;
          .vh(24);
          border-bottom: 1px solid #3a84ee;
          .el-input__prefix{
            display: none;
          }
          .el-input__suffix{
            display: none;
          }
          .el-input__inner{
            border:0;
            padding: 0;
          }
        }
        .tRBrnBox{
          margin-left: 0.1rem;
          width: 0.92rem;
          .vh(24);
          .el-select{
            height: 100%;
          }
          .el-select>.el-input{
            height: 100%;
          }
          .el-select::after{
            content: "";
            pointer-events: none;
            display:block;
            width:0;
            height:0;
            border-width:4px 4px 0;
            border-style:solid;
            border-color:#008aff transparent transparent;/*黄 透明 透明 */
            position:absolute;
            top:50%-4px;
            right:0;
          }
          .el-input--suffix .el-input__inner{
            .vh(24);
            padding: 0;
            border: 0!important;
            border-bottom: solid 1px #1989fa!important;
          }
        }
        /*.serConBox{
          margin-left: 0.1rem;
          width: 1.54rem;
          .vh(24);
          border-bottom: 1px solid #3a84ee;
          .el-input {
            position: relative;
            font-size: 0.12rem;
            color: #fff;
            display: inline-block;
            width: 100%;
            height: 100%;
            .el-input__inner {
              padding: 0 5px;
              width: 100%;
              height: 100%;
              font-size: 0.12rem!important;
              color: #fff!important;
              background-color: rgba(0,0,0,0)!important;
              border-radius: 2px!important;
              border: 0;
              line-height: normal!important;
            }
          }
        }*/
      }

      .searchBtn{
        //margin-left: 0.12rem;
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
      padding: 0 0.2rem;
      .el-table__footer-wrapper, .el-table__header-wrapper{
        background-color: rgba(0,0,0,0.25);
      }
    }
  }


</style>
