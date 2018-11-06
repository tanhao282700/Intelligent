<!--
    代维系统 系统报表
    白 2018-10-14
-->
<template>
  <div class="reportBox">
      <Crumbs :data ='crumbs'/>
      <div class="searchBoxs" @click="exportList">
        <i></i>
        <span>导出</span>
      </div>
      <el-tabs class="tabBoxs" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane name="first">
            <span slot="label" class="tabItems">
                完成情况
            </span>
            <div class="boxs tableBoxs">
                <div class="tabHead thHead">
                  <div class="jobBoxs thJobBoxs">
                    <!--<el-date-picker
                      v-model="year"
                      class="datetemp"
                      popper-class="noTitle"
                      format="yyyy"
                      value-format="yyyy"
                      type="year"
                      @change="changeYear"
                      placeholder="年">
                    </el-date-picker>
                    <el-date-picker
                      v-model="month"
                      type="month"
                      format="MM"
                      @change="changeMonth"
                      value-format="yyyy-MM"
                      class="datetemp"
                      popper-class="noTitle"
                      placeholder="月">
                    </el-date-picker>
                    <el-date-picker
                      v-model="day"
                      class="datetemp"
                      popper-class="noTitle"
                      value-format="yyyy-MM-dd"
                      format="dd"
                      type="date"
                      @change="changeDay"
                      placeholder="日">
                    </el-date-picker>-->
                    <el-select placeholder="请选择" v-model="dateUnit" class="dateUnitSelectItem" clearable @change="dateTypeChange">
                      <el-option
                        v-for="item in dateOptions"
                        :key="item.id"
                        :label="item.title"
                        :value="item.id">
                      </el-option>
                    </el-select>
                    <div class="yearRangeBox" v-show=" dateUnit=='year' ">
                      <el-date-picker
                        v-model="dateRangeValue"
                        type="year"
                        value-format="yyyy"
                        placeholder="请选择">
                      </el-date-picker>
                    </div>
                    <div class="yearRangeBox" v-show=" dateUnit=='month' ">
                      <el-date-picker
                        v-model="dateRangeValue"
                        format="yyyy-M"
                        value-format="yyyyMM"
                        type="month"
                        placeholder="请选择">
                      </el-date-picker>
                    </div>
                    <div class="yearRangeBox" v-show=" dateUnit=='day' ">
                      <el-date-picker
                        v-model="dateRangeValue"
                        format="yyyy-M-d"
                        value-format="yyyyMMdd"
                        type="date"
                        placeholder="请选择">
                      </el-date-picker>
                    </div>

                  </div>
                  <div class="checkBox" @click="getReportData">
                    <i class="el-icon-search"></i>
                    <span>查询</span>
                  </div>
                </div>
                <div class="tableIn myAgenTab">
                  <Table
                    style="width:100%"
                    :table = "table"
                  />
                </div>
            </div>
        </el-tab-pane>
        <el-tab-pane name="second" >
            <span slot="label" class="tabItems">
                重复报修率
            </span>
            <div class="boxs tableBoxs">
                <div class="tableIn myAgenTab2">
                  <Table
                    style="width:100%"
                    :table = "table2"
                    @rowEnter="mouseOverLi"
                    @rowLeave = "mouseOutLi"
                  />
                </div>
            </div>
        </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
import utils from "../../assets/js/utils.js";
import SelectBox from '@/components/form/selectBox';
import TimePickerT from './components/work/timePickerTit2';
import Percentage from './components/work/Percentage';
import Table from '@/components/common/table';
export default {
  name:'gReport',
  components:{
    'Table':Table,
    'SelectBox':SelectBox,
    'TimePickerT':TimePickerT
  },
  data () {
    return {
        dateUnit:'year',
      dateOptions:[{id:'year',title:"年"},{id:'month',title:"月"},{id:'day',title:"日"}],
      dateRangeValue:"",
        year:'',
        month:'',
        day:'',
        crumbs:['代维系统','统计报表'],
        activeName:'first',
        jobs:[
          {label:'给排水',value:1},
          {label:'电梯',value:2},
          {label:'变配电',value:3},
          {label:'照明',value:4},
          {label:'暖通',value:5},
        ],
        vJob:-1,
        table:{
            // small:'small',
            hei:328, //table高度  设置后有滚动条
            len:0, //总条数
            data:[],
            th:[
              {prop:'id',label:'编号'},
              {prop:'name',label:'名称'},
              {prop:'phone',label:'联系电话',wid:150},
              {prop:'department',label:'专业岗位'},
              {prop:'count_job',label:'本月派单量'},
              {prop:'wan_job',label:'完成数'},
              {prop:'percent_job',label:'工单完成率'},
              {prop:'count_xun',label:'本月所派巡检数',width:200},
              {prop:'wan_xun',label:'完成数量'},
              {prop:'percent_xun',label:'完成率',wid:180,
                operate: true,
                  render: (h, param)=> {
                      const btnss = {
                          fills:param.row.percent_xun,
                      };
                      return h(Percentage,{
                      props: { btnss:btnss},
                      on:{}
                      });
                  }
              },
            ]
        },
        table2:{
            hei:328, //table高度  设置后有滚动条
            len:0, //总条数
            data:[],
            th:[
              {prop:'index',label:'编号',minWid:'20%'},
              {prop:'floor',label:'位置',minWid:'20%'},
              {prop:'type',label:'类别',minWid:'20%'},
              {prop:'device_name',label:'设备名称',minWid:'20%'},
              {prop:'count',label:'本周保修次数',minWid:'20%'
              // ,operate:true,
              //   render: (h, param)=> {
              //       console.log(param)
              //         const btnss = {
              //             fills:param.row.count,
              //         };
              //     }
                 }
            ]
        },
    }
  },
  methods:{
    dateTypeChange(){
      this.dateRangeValue = "";
      $(".el-date-editor.el-range-editor").css({border:'none!important'});
    },
    handleClick(){

    },
    changeYear(val){
        console.log(this.month)
      console.log(this.day)
        /*if(this.month){
          this.month = this.year +'-'+ (parseInt(this.month.split('-')[0])+1)
        }
        if(this.day){
            this.day = this.month + '-'+this.day.split('-')[2]
        }*/
      /*let curr = (utils.time(new Date(val)/1000,10))
      this.$set(this.year,curr);*/
    },
    changeDay(val){

      /*if(!val){
        this.day = ''
      }*/
    },
    changeMonth(val){
        /*if(this.day){
            this.day = this.month+'-'+(parseInt(this.day.split('-')[2])+1)
        }*/
      /*this.day = this.month*/
      /*this.month = val;
      this.day = utils.time(new Date(this.year)/1000,10) +'-'+ val ;*/
    },
    exportList(){
      if(this.activeName=='first'){// 导出完成情况
         window.open('https://tesing.china-tillage.com/pc_ims/down/count?year=&month=&day=&Authorization='+this.$store.state.userInfoTotal.userinfo.password + "_" + this.$store.state.projectId + "_" + this.$store.state.userId);
      }else{//导出重复报修率
        window.open('https://tesing.china-tillage.com/pc_ims/down/count_device?Authorization='+this.$store.state.userInfoTotal.userinfo.password + "_" + this.$store.state.projectId + "_" + this.$store.state.userId);
      }
    },
    mouseOverLi(row){
      //console.log(row)
      // this.$http.post('/pc_ims/admin/count_deviceinfo',{
      //   name:'一号客梯'
      // }).then(res=> {
      //      console.log(res)
      //      if(res.data.code==0){
      //       this.table.data = res.data.data;
      //     }else{
      //       this.$message({
      //         type:'error',
      //         message:res.data.msg
      //       })
      //     }
      // })
    },
    mouseOutLi(row){

    },
    getReportData(){
      let year = ''
      let month = ''
      let day = ''

      if(this.dateRangeValue){
        if(this.dateRangeValue.length==4){
            year = this.dateRangeValue
        }
        if(this.dateRangeValue.length==6){
            year = this.dateRangeValue[0]+this.dateRangeValue[1]+this.dateRangeValue[2]+this.dateRangeValue[3]
            month = this.dateRangeValue[4]+this.dateRangeValue[5]
        }
        if(this.dateRangeValue.length==8){
            year = this.dateRangeValue[0]+this.dateRangeValue[1]+this.dateRangeValue[2]+this.dateRangeValue[3]
            month = this.dateRangeValue[4]+this.dateRangeValue[5]
            day = this.dateRangeValue[6]+this.dateRangeValue[7]
        }
      }


      this.$http.post('/pc_ims/admin/inspectionlist_count',{
        year:year,
        month:month,
        day:day,
        pagenumber:1,
        pagesize:20
      }).then(res=> {
        console.log(res);
         if(res.data.code==0){
            this.table.len = res.data.count;
            this.table.data = res.data.data;
          }else{
            this.$message({
              type:'error',
              message:res.data.msg
            })
          }
      })
    },
    getRepeatRate(){
      this.$http.post('/pc_ims/admin/count_device',{
        pagenumber:1,
        pagesize:20
      }).then(res=>{
        console.log(res)
        if(res.data.code==0){
            //序号
            this.table2.data = res.data.data;
            this.table2.data.map((item,index)=>{
                item.index = index+1
            })
          }else{
            this.$message({
              type:'error',
              message:res.data.msg
            })
          }
      })
    },
    format(time, format){
        var t = new Date(time);
        var tf = function(i){return (i < 10 ? '0': '') + i};
        return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
            switch(a){
                case 'yyyy':
                return tf(t.getFullYear());
                break;
                case 'MM':
                return tf(t.getMonth() + 1);
                break;
                case 'mm':
                return tf(t.getMinutes());
                break;
                case 'dd':
                return tf(t.getDate());
                break;
                case 'HH':
                return tf(t.getHours());
                break;
                case 'ss':
                return tf(t.getSeconds());
                break;
            }
        })
    }
  },
  created() {

  },
  mounted() {
    this.getReportData();
    this.getRepeatRate()
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped='scoped' type="text/less">
@import '../../assets/css/comon.less';
.reportBox{
  width:100%;
  .searchBoxs{
    position: absolute;
    right: 2.2%;
    top: 0.74rem;
    width: 0.93rem;
    height:0.32rem;
    line-height:0.32rem;
    z-index:1;
    color: #fff;
    font-size: 0.14rem;
    text-align: center;
    cursor: pointer;
    background: linear-gradient(0deg,
    #2772e3 0%,
    #4b94f9 100%);
    border-radius: 0.02rem;
    i{
      display:inline-block;
      width:0.16rem;
      height:0.16rem;
      vertical-align:sub;
      background:url('../../assets/img/AgentManage/export.png') no-repeat;
      background-size:0.16rem;
    }
  }
  .tabBoxs{
    position:absolute;
    width:100%;
    top:11.5vh;
    left:2.2%;
    .tabItems{
      color:#a7a7a7;
    }
  }
  .tableBoxs{
    width:95.6%;
    height:5.35rem;
    .tabHead{
      position: relative;
      border:1px solid #1989fa;
      height: 0.3rem;
      margin-top: 0.27rem;
      width: 3.65rem;
      border-radius:0.02rem;
      margin-left:0.2rem;
      .jobBoxs{
        float: left;
        height:0.32rem;
        background-color: rgba(255, 255, 255, 0.01);
        border-radius: 0.02rem;
        text-align: center;
        margin-left: 0.1rem;
      }
      .checkBox{
        float: left;
        margin-left: 0.12rem;
        width: 0.93rem;
        height:0.305rem;
        line-height:0.32rem;
        color: #fff;
        font-size: 0.14rem;
        text-align: center;
        cursor: pointer;
        background-image: linear-gradient(0deg,
        #2772e3 0%,
        #4b94f9 100%);
        border-radius:0 0.02rem 0;
        i{
          font-size: 0.16rem;
          margin-right: 0.05rem;
          font-weight: 600;
        }
      }
    }
    .tableIn{
      width: 99%;
      margin-left: 1%;
      .tableBox{
         margin-left:0;
      }
    }
    .datetemp{
      display:inline-block;
      width:0.4rem;
      height:0.32rem;
      padding-right:0.1rem;
    }
  }
}
</style>
<style>
  .noTitle .el-date-picker__header{
    display:none!important;
  }
  .myAgenTab{
    height:100%!important;
  }
  .myAgenTab .tableBox{
    height:100%!important;
  }
  .myAgenTab .tableBox .el-table{
    height:80%!important;
  }
  .myAgenTab2{
    height:100%!important;
  }
  .myAgenTab2 .tableBox{
    height:100%!important;
  }
  .myAgenTab2 .tableBox .el-table{
    height:100%!important;
  }
  .thJobBoxs{
    display: flex;
  }
  .thJobBoxs .el-select{
    padding-left:0!important;
  }
  .thJobBoxs .yearRangeBox{
    margin-left:0.2rem!important;
    width:0.8rem!important;
  }
  .thJobBoxs .yearRangeBox .el-input__inner{
    border:none!important;
    border-bottom:1px solid #1989fa!important;
    text-align: center;
  }
  .reportBox .tableBoxs .thHead{
    width:2.65rem!important;
  }
  .reportBox .tableBoxs .thHead .checkBox{
    height:100%!important;
  }
</style>
