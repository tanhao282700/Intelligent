<!--
    代维系统 系统报表
    白 2018-10-14
-->
<template>
  <div class="reportBox autoComponent">
    <Header :datas="navsData"></Header>
      <Crumbs :data ='crumbs'/>
      <div class="boxs thBoxs tableBoxs">
          <div class="tabHead">
            <div class="nameBoxs">
              <!--<SelectBox
                :options = 'query.sys_id'
                :value = "formData.sys_id"
                :icon="'el-icon-d-caret'"
                placeholder="工种"
                @change = "change1"
              />-->
              <el-select placeholder="工种" v-model="formData.sys_id" class="querySelectItem">
                <el-option
                  v-for="item in query.sys_id"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="nameBoxs">
              <!--<SelectBox
                :options = 'query.types'
                :value = "formData.type"
                :icon="'el-icon-d-caret'"
                placeholder="类别"
                @change = "change2"
              />-->
              <el-select placeholder="类别" v-model="formData.type" class="querySelectItem">
                <el-option
                  v-for="item in query.types"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="nameBoxs">
              <!--<SelectBox
                :options = 'query.times'
                :value = "formData.time"
                :icon="'el-icon-d-caret'"
                placeholder="时间"
                @change = "change3"
              />-->
              <el-date-picker
                v-model="formData.time"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </div>
            <div class="nameBoxs">
              <!--<SelectBox
                :options = 'query.states'
                :value = "formData.now_state"
                :icon="'el-icon-d-caret'"
                placeholder="完成情况"
                @change = "change4"
              />-->
              <el-select placeholder="完成情况" v-model="formData.now_state" class="querySelectItem">
                <el-option
                  v-for="item in query.states"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="searchBoxs" @click="getTableData">
              <i class="el-icon-search"></i>
              <span>筛选</span>
            </div>
          </div>
          <div class="thAgenTab">
            <el-table
              :cell-class-name="setColor"
              :data="tabData"
              style="width: 100%;flex:1;"
              height="500"
              class=" tableHeadBlue">
              <el-table-column
                prop="index"
                label="编号"
                min-width="5%">
              </el-table-column>
              <el-table-column
                prop="title"
                label="工种"
                min-width="11%">
              </el-table-column>
              <el-table-column
                prop="type"
                label="类别"
                min-width="8%">
              </el-table-column>
              <el-table-column
                prop="addtime"
                label="派发时间"
                min-width="15%">
              </el-table-column>
              <el-table-column
                prop="description"
                label="详情"
                min-width="16%">
              </el-table-column>
              <el-table-column
                prop="now_state"
                label="完成情况"
                min-width="10%">
              </el-table-column>
            </el-table>

            <!--分页器-->
            <div class="paginationBox">
              <div class="totalPageNumBox">共{{formData.pages}}页</div>

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
import utils from "../../../assets/js/utils.js";
import SelectBox from '@/components/form/selectBox';
import Header from '@/components/common/sysHead'
import State from './state'
import TimePickerT from '../components/work/timePickerTit2';
import Percentage from '../components/work/Percentage';
import Table from '@/components/common/table';
export default {
  name:'gReport',
  components:{
    'Table':Table,
    'SelectBox':SelectBox,
    'TimePickerT':TimePickerT,
    'Header':Header
  },
  data () {
    return {
        navsData:{
          active:'item4',
          lists:[
              {id:0,name:'首页',route:'/AgentManage/normalUser'},
              {id:1,name:'排班表',route:'/AgentManage/normalUser/schedule'},
              {id:2,name:'工单',route:'/AgentManage/normalUser/workList'},
              {id:3,name:'巡检',route:'/AgentManage/normalUser/routing'},
              {id:4,name:'完成情况',route:'/AgentManage/normalUser/report'},
          ]
        },
        query:{
          states:[{label:'完成情况',value:''},{label:'未完成',value:0},{label:'已完成',value:1}],
          systems:[],
          types:[{label:'类别',value:''},{label:'巡检',value:0},{label:'工单',value:1}],
          times:[],
          sys_id:[{label:'工种',value:1}]
        },
        crumbs:['代维系统','完成情况'],
        activeName:'first',
        jobs:[
          {label:'给排水',value:1},
          {label:'电梯',value:2},
          {label:'变配电',value:3},
          {label:'照明',value:4},
          {label:'暖通',value:5},
        ],
        vJob:-1,
        formData:{
          pagenumber:1,
          pagesize:20,
          sys_id:1,
          type:'',
          time:'',
          now_state:'',
          pages:'',
          total:0
        },
        tabData:[],
        /*table:{
            // small:'small',
            hei:328, //table高度  设置后有滚动条
            len:7, //总条数
            data:[],
            th:[
              {prop:'id',label:'编号'},
              {prop:'title',label:'工种'},
              {prop:'type',label:'类别',wid:150},
              {prop:'addtime',label:'派发时间'},
              {prop:'description',label:'详情'},
              {prop:'now_state',label:'完成情况',operate:true,
              render: (h, param)=> {
                const btnss = {
                            fills:param.row.now_state,
                        };
                        return h(State,{
                        props: { state:btnss},
                        on:{}
                });
              }
            }]
        }*/
    }
  },
  methods:{
    currentPageChange(aa){
      this.formData.pagenumber = aa
      this.getTableData()
    },
    toInputPage(){
      if(this.formData.pagenumber > this.formData.pages){
        this.formData.pagenumber = this.formData.pages
      }
      this.getTableData()
    },
    setColor({row, column, rowIndex, columnIndex}){
      if(columnIndex==5){
        if(row.now_state=='已完成'){
          return 'bulue'
        }
        if(row.now_state=='未完成'){
            return 'red'
        }
      }
    },
    handleClick(){

    },
    change1(val){
      this.query.sys_id = val;
    },
    change2(val){
      this.query.type = val;
    },
    change3(val){
      this.query.time = val;
    },
    change4(val){
      this.query.now_state = val;
    },
    getTableData(){
      this.$http.post('/pc_ims/staff/count_byuser',this.formData).then(res=>{
        if(res.data.code==0){
              this.tabData = res.data.data
              this.tabData.map((item,index)=>{
                  item.index = this.formData.pagesize * (this.formData.pagenumber-1) + index + 1;
                  if(item.now_state==1){
                      item.now_state = '已完成'
                  }else{
                      item.now_state = '未完成'
                  }
                if(item.type==0){
                  item.type = '巡检'
                }else{
                  item.type = '工单'
                }
              })
              this.formData.pages = res.data.pages
              this.formData.total = this.formData.pages*this.formData.pagesize
           }else{
              this.$message({
                type:'error',
                message:res.data.msg,
                duration:2000
              })
           }
      })
    }
  },
  mounted() {
    this.getTableData();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped='scoped' type="text/less">
@import '../../../assets/css/comon.less';
.reportBox{
  width:100%;
  .searchBoxs{
    float: right;
    margin-right: 2.2%;
    width: 0.93rem;
    .vh(32);
    .vhLH(32);
    color: #fff;
    font-size: 0.14rem;
    text-align: center;
    cursor: pointer;
    background: linear-gradient(0deg,
    #2772e3 0%,
    #4b94f9 100%);
    border-radius: 0.02rem;
  }
  .exportBoxs{
    position:absolute;
    right: 2.2%;
    top:5%;
    width: 0.93rem;
    .vh(32);
    .vhLH(32);
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
      background:url('../../../assets/img/AgentManage/export.png') no-repeat;
      background-size:0.16rem;
    }
  }
  .tabBoxs{
    position:absolute;
    width:100%;
    top:11.5vh;
    .tabItems{
      color:#a7a7a7;
    }
  }
  .tableBoxs{
    width:95.6%;
    margin:0 2.2%;
    height:85%;
    margin-left: 0.3rem;
    .tabHead{
      width: 100%;
      position: relative;
      .vh(59);
      .vhPT(20);
      .jobBoxs{
        float: left;
        .vh(32);
        background-color: rgba(255, 255, 255, 0.01);
        border-radius: 0.02rem;
        border: solid 0.01rem #1989fa;
        text-align: center;
        margin-left: 0.2rem;
      }
      .nameBoxs{
        float: left;
         width: 0.87rem;
        .vh(32);
        background-color: rgba(255, 255, 255, 0.01);
        border-radius: 0.02rem;
        border: solid 0.01rem #1989fa;
        text-align: center;
        margin-left: 0.1rem;
      }
      .searchBoxs{
        float: left;
        margin-left: 0.12rem;
        width: 0.93rem;
        .vh(32);
        .vhLH(32);
        color: #fff;
        font-size: 0.14rem;
        text-align: center;
        cursor: pointer;
        background-image: linear-gradient(0deg,
        #2772e3 0%,
        #4b94f9 100%);
        border-radius: 0.02rem;
        i{
          font-size: 0.16rem;
          margin-right: 0.05rem;
          font-weight: 600;
        }
      }
    }
    .tableIn{
      width: 99%;
      .vh(328);
      margin-left: 1%;
      .tableBox{
         margin-left:0;
      }
    }
  }
}
</style>
<style>
  .thBoxs{
    display:flex;
    flex-direction: column;
  }
  .thAgenTab{
    flex:1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .thAgenTab .paginationBox{
    position:static!important;
    margin:20px 0;
  }
  .thAgenTab .paginationBox .curPageBox{
    color:white!important;
  }
  .thAgenTab .bulue .cell{
    color:rgba(74,226,131,1)!important;
  }
  .thAgenTab .red .cell{
    color:rgba(250,96,116,1)!important;
  }
  .thBoxs .nameBoxs .el-date-editor .el-input__inner{
    height:100%!important;
    border:none!important;
    color:white!important;
    padding-left:6px!important;
  }
  .thBoxs .nameBoxs .querySelectItem{
    height:100%!important;
  }

  .thBoxs .nameBoxs .querySelectItem .el-input{
    height:100%!important;
  }
  .thBoxs .nameBoxs .querySelectItem .el-input__inner{
    border:none!important;
    height:100%!important;
    padding-left:6px!important;
    text-indent:0.1rem;
  }
</style>
