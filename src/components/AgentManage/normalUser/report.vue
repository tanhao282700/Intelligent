<!--
    代维系统 系统报表
    白 2018-10-14
-->
<template>
  <div class="reportBox autoComponent">
    <Header :datas="navsData"></Header>
      <Crumbs :data ='crumbs'/>
      <div class="boxs tableBoxs">
          <div class="tabHead">
            <div class="nameBoxs">
              <SelectBox 
                :options = 'jobs' 
                :value = "vJob" 
                :icon="'el-icon-d-caret'"
                placeholder="工种"
                @change = "change1"
              />
            </div>
            <div class="nameBoxs">
              <SelectBox 
                :options = 'jobs' 
                :value = "vJob" 
                :icon="'el-icon-d-caret'"
                placeholder="类别"
                @change = "change1"
              />
            </div>
            <div class="nameBoxs">
              <SelectBox 
                :options = 'jobs' 
                :value = "vJob" 
                :icon="'el-icon-d-caret'"
                placeholder="时间"
                @change = "change1"
              />
            </div>
            <div class="jobBoxs">
              <SelectBox 
                :options = 'jobs' 
                :value = "vJob" 
                :icon="'el-icon-d-caret'"
                placeholder="完成情况"
                @change = "change1"
              />
            </div>
            <div class="searchBoxs">
              <i class="el-icon-search"></i>
              <span>筛选</span>
            </div>
          </div>
          <div class="tableIn">
            <Table 
              style="width:100%" 
              :table = "table"
            />
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
        crumbs:['代维系统','系统报表'],
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
            len:7, //总条数
            data:[
              {id:1,name:'白狗汪1',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:-1,backApply:"-",fill:100}, 
              {id:2,name:'白狗汪2',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:-1,backApply:"-",fill:80}, 
              {id:3,name:'白狗汪3',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:-1,backApply:"-",fill:60}, 
              {id:4,name:'白狗汪4',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:4,backApply:"-",fill:40}, 
              {id:5,name:'白狗汪5',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:4,backApply:"-",fill:20}, 
              {id:6,name:'白狗汪6',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:4,backApply:"-",fill:100}, 
              {id:7,name:'白狗汪7',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:4,backApply:"-",fill:100}            
            ],
            th:[
              {prop:'id',label:'编号'},
              {prop:'name',label:'工种'},
              {prop:'tel',label:'类别',wid:150},
              {prop:'job',label:'派发时间'},
              {prop:'sendNum',label:'详情'},
              {prop:'dealed',label:'完成情况',operate:true,
              render: (h, param)=> {
                const btnss = {
                            fills:param.row.dealed,  
                        };
                        return h(State,{
                        props: { state:btnss},
                        on:{}
                });
              }
            }]
        }
    }
  },
  methods:{
    handleClick(){

    },
    change1(){

    },
    getTableData(){
      this.$http.post('/pc_ims/staff/count_byuser').then(res=>{
        if(res.data.code==0){
             let data = res.data.data;
              console.log(data);
           }else{
              this.$message({
                type:'error',
                message:res.data.msg
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
<style lang="less" scoped='scoped' type="text/less">
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
    .vh(480);
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
