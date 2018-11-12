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
                <div class="tableIn myAgenTab reportPages">
                  <Table
                    style="width:100%"
                    :table = "table"
                  />
                  <Page @changeCurrentPage="changeCurrentPage" :pages = "page"/>
                </div>
            </div>
        </el-tab-pane>
        <el-tab-pane name="second" >
            <span slot="label" class="tabItems">
                重复报修率
            </span>
            <div class="boxs tableBoxs">
                <div class="tableIn myAgenTab2 reportPages">
                  <Table
                    style="width:100%"
                    :table = "table2"
                    @changePage="changePage2"
                  />
                  <Page @changeCurrentPage="changeCurrentPage2" :pages = "page2"/>
                </div>
            </div>
        </el-tab-pane>
      </el-tabs>
      <div v-show="visible" style="height:2rem">
        <div class="hover" :style="{top:0.78+(0.4*hoverIndex)+'rem'}">
          <ul>
            <li v-for="(item,index) in hoverData" >
              <i class="el-icon-arrow-left"></i>
              <dl>
                <dt><span class="serial">0{{index}}</span><span class="line">|</span>{{item.time}}维修人：{{item.name}}</dt>
                <dd class="desc">内容描述</dd>
                <dd class="desccont">{{item.description}}</dd>
              </dl>
            </li>
          </ul>
        </div>
        
      </div>
  </div>
  
</template>

<script>
import utils from "../../assets/js/utils.js";
import SelectBox from '@/components/form/selectBox';
import TimePickerT from './components/work/timePickerTit2';
import Percentage from './components/work/Percentage';
import deal from './components/routing/deal2' 
import Table from '@/components/common/table';
import Page from '@/components/AgentManage/components/index/pages'
export default {
  name:'gReport',
  components:{
    'Table':Table,
    'SelectBox':SelectBox,
    'TimePickerT':TimePickerT,
    'Page':Page
  },
  data () {
    return {
      currentPage:1,
      currentPage2:1,
      dateUnit:'year',
      visible:false,
      hoverIndex:0,
      hoverData:[],
      page:{totalDataNumber:0,currentPage:0,totalPageNum:0},
      page2:{totalDataNumber:0,currentPage:0,totalPageNum:0},
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
            showPagination:true,
            page:1,
            hei:328, //table高度  设置后有滚动条
            len:0, //总条数
            data:[],
            th:[
              {prop:'serial',label:'编号'},
              {prop:'name',label:'名称'},
              {prop:'phone',label:'联系电话',wid:150},
              {prop:'department',label:'专业岗位'},
              {prop:'count_job',label:'本月派单量'},
              {prop:'wan_job',label:'完成数'},
              {prop:'percent_job',label:'工单完成率'},
              {prop:'count_xun',label:'本月所派巡检数',width:200},
              {prop:'wan_xun',label:'完成数量'},
              {prop:'percent_xun',label:'巡检完成率',wid:180,
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
            showPagination:true,
            page:1,
            hei:328, //table高度  设置后有滚动条
            len:0, //总条数
            data:[],
            th:[
              {prop:'serial',label:'编号',minWid:'20%'},
              {prop:'floor',label:'位置',minWid:'20%'},
              {prop:'type',label:'类别',minWid:'10%'},
              {prop:'device_name',label:'设备名称',minWid:'10%'},
              {prop:'count',label:'本周保修次数',minWid:'40%',operate:true,
                render: (h, param)=> {
                      const btnss = {
                          fills:param.row,
                      };
                    return h(deal,{
                      props:{btnss:btnss},
                      on:{mousehover:this.mouseOverLi,mouseOut:this.mouseOutLi}
                    })
                }
              }
            ]
        },
    }
  },
  methods:{
    changePage1(){
      this.getReportData()
    },
    changePage2(){
      this.getRepeatRate()
    },
    dateTypeChange(){
      this.dateRangeValue = "";
      $(".el-date-editor.el-range-editor").css({border:'none!important'});
    },
    handleClick(){

    },
    exportList(){
      if(this.activeName=='first'){// 导出完成情况
         window.open('https://tesing.china-tillage.com/pc_ims/down/count?year=&month=&day=&Authorization='+this.$store.state.userInfoTotal.userinfo.password + "_" + this.$store.state.projectId + "_" + this.$store.state.userId);
      }else{//导出重复报修率
        window.open('https://tesing.china-tillage.com/pc_ims/down/count_device?Authorization='+this.$store.state.userInfoTotal.userinfo.password + "_" + this.$store.state.projectId + "_" + this.$store.state.userId);
      }
    },
    mouseOverLi(name,index){
      console.log(index);
      this.hoverIndex = index;
      this.$http.post('/pc_ims/admin/count_deviceinfo',{
        name:name
      }).then(res=> {
           if(res.data.code==0){
            this.hoverData = res.data.data;
            this.visible =true;
          }else{
            this.$message({
              type:'error',
              message:res.data.msg
            })
          }
      })
    },
    changeCurrentPage(val){
      this.currentPage = val;
      this.getReportData();
    },
    changeCurrentPage2(val){
      this.currentPage2 = val;
      this.getRepeatRate();
    },
    mouseOutLi(row){
      this.visible = false;
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
        pagenumber:this.currentPage,
        pagesize:20
      }).then(res=> {
        //console.log(res);
         if(res.data.code==0){
            this.table.len = res.data.count;
            //console.log(res.data.pages);
            this.page = {
              currentPage: this.currentPage,
              totalDataNumber:20*res.data.pages,
              totalPageNum:res.data.pages
            }
            this.table.data = res.data.data;
            this.table.data.map((item,index)=>{
                this.table.data[index].percent_job = this.table.data[index].percent_job+'%';
                this.table.data[index].serial = (this.currentPage - 1) * 20 + 1 + index;
            })
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
        pagenumber:this.currentPage2,
        pagesize:20
      }).then(res=>{
        console.log(res)
        if(res.data.code==0){
            //序号
            this.table2.len = res.data.count
            this.table2.data = res.data.data;
            this.page2 = {
              currentPage: this.currentPage2,
              totalDataNumber:20*res.data.pages,
              totalPageNum:res.data.pages
            }
            this.table2.data.map((item,index)=>{
                this.table2.data[index].serial = (this.currentPage2 - 1) * 20 + 1 + index;
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
  width:96%;
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
      background:url('../../assets/img/Alarm/export.png') no-repeat;
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
        width: 1.48rem;
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
  .hover {
    position:absolute;
    right:14.5%;
    width:2.83rem;
    height:2.78rem;
    background:#05152c;
    padding:0.2rem;
    border:1px solid #4789d7;
    box-shadow: -3px 0px 3px rgba(20,60,121,0.5),
    3px 0px 3px rgba(20,60,121,0.5),
    0px 3px 3px rgba(20,60,121,0.5);
    ul{
      height:2.38rem;
      overflow-y:scroll;
    }
    li{
      color:#fff;
      font-size:0.13rem;
      line-height:0.25rem;
    .serial{
      color:#f48301;
    }
    .line{
      margin:0 0.2rem;
    }
    .desc{
      color:#425679;
      font-size:0.12rem;
    }
    .desccont{
      color:#ffa415;
      background:#001837;
      width:100%;
      padding-bottom:0.07rem;
      padding-left:0.12rem;
    }
    i{
      position:absolute;
      width:0.12rem;
      top:0.32rem;
      left:-3%;
      color:#4789d7;
    }
    i:after{
        content:'';
        display:block;
        position:absolute;
        left: 0.053rem;
        z-index:1;
        top: 0.02rem;
        border-right: 4px solid #05152c;
        border-top:4px solid transparent;
        border-bottom: 4px solid transparent;
      }
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
  #pane-second .myAgenTab2 .tableBox .el-table{
    height:92%!important;
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
