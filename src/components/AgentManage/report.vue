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
                <div class="tabHead">
                  <div class="jobBoxs">
                    <SelectBox 
                      :options = 'jobs' 
                      :value = "vJob" 
                      :icon="'el-icon-d-caret'"
                      placeholder="年"
                      @change = "changeYear"
                    />
                    <SelectBox 
                      :options = 'jobs' 
                      :value = "vJob" 
                      :icon="'el-icon-d-caret'"
                      placeholder="月" 
                      @change = "changeMonth"
                    />
                    <SelectBox 
                      :options = 'jobs' 
                      :value = "vJob" 
                      :icon="'el-icon-d-caret'"
                      placeholder="日" 
                      @change = "changeDay"
                    />
                  </div>
                  <div class="checkBox">
                    <i class="el-icon-search"></i>
                    <span>查询</span>
                  </div>
                </div>
                <div class="tableIn">
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
                <div class="tableIn">
                  <Table 
                    style="width:100%" 
                    :table = "table2"
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
              {id:1,name:'白狗汪1',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:4,backApply:"-",fill:100}, 
              {id:2,name:'白狗汪2',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:4,backApply:"-",fill:80}, 
              {id:3,name:'白狗汪3',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:4,backApply:"-",fill:60}, 
              {id:4,name:'白狗汪4',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:4,backApply:"-",fill:40}, 
              {id:5,name:'白狗汪5',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:4,backApply:"-",fill:20}, 
              {id:6,name:'白狗汪6',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:4,backApply:"-",fill:100}, 
              {id:7,name:'白狗汪7',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:4,backApply:"-",fill:100}            
            ],
            th:[
              {prop:'id',label:'编号'},
              {prop:'name',label:'名称'},
              {prop:'tel',label:'联系电话',wid:150},
              {prop:'job',label:'专业岗位'},
              {prop:'sendNum',label:'本月派单量'},
              {prop:'dealing',label:'完成数'},
              {prop:'nocatch',label:'工单完成率'},
              {prop:'dealed',label:'本月所派巡检数',width:200},
              {prop:'backApply',label:'完成数量'},
              {prop:'fill',label:'完成率',wid:180,
                operate: true, 
                  render: (h, param)=> {
                      const btnss = {
                          fills:param.row.fill,  
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
            // small:'small',
            hei:328, //table高度  设置后有滚动条
            len:7, //总条数
            data:[
              {id:1,name:'白狗汪1',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:4,backApply:"-",fill:100}, 
              {id:2,name:'白狗汪2',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:4,backApply:"-",fill:80}, 
              {id:3,name:'白狗汪3',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:4,backApply:"-",fill:60}, 
              {id:4,name:'白狗汪4',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:4,backApply:"-",fill:40}, 
              {id:5,name:'白狗汪5',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:4,backApply:"-",fill:20}, 
              {id:6,name:'白狗汪6',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:4,backApply:"-",fill:100}, 
              {id:7,name:'白狗汪7',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:4,backApply:"-",fill:100}            
            ],
            th:[
              {prop:'id',label:'编号'},
              {prop:'name',label:'位置'},
              {prop:'tel',label:'类别',wid:150},
              {prop:'job',label:'设备名称'},
              {prop:'sendNum',label:'本周保修次数',operate:true,
                render: (h, param)=> {
                      const btnss = {
                          fills:param.row.sendNum,  
                      };
                  } 
                }
            ]
        },
    }
  },
  methods:{
    handleClick(){

    },
    changeYear(){

    },
    changeMonth(){

    },
    changeDay(){

    },
    exportList(){

    }
  },
  created() {
    
  },
  mounted() {
    // this.$refs.dialog.show();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped='scoped' type="text/less">
@import '../../assets/css/comon.less';
.reportBox{
  width:100%;
  .searchBoxs{
    float: right;
    margin-right: 2.2%;
    width: 0.93rem;
    height:0.32rem;
    line-height:0.32rem;
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
    height:4.80rem;
    .tabHead{
      width: 100%;
      position: relative;
      height:0.59rem;
      padding-top:0.2rem;
      .jobBoxs{
        float: left;
        height:0.32rem;
        background-color: rgba(255, 255, 255, 0.01);
        border-radius: 0.02rem;
        border: solid 0.01rem #1989fa;
        text-align: center;
        margin-left: 0.2rem;
      }
      .checkBox{
        float: left;
        margin-left: 0.12rem;
        width: 0.93rem;
        height:0.32rem;
        line-height:0.32rem;
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
      height:3.28rem;
      margin-left: 1%;
      .tableBox{
         margin-left:0;
      }
    }
  }
}
</style>
