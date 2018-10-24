<!--
    代维系统 巡检
    白 2018-10-14
-->
<template>
  <div class="workBox autoComponent">
      <Header :datas="navsData"></Header>
      <Crumbs :data ='crumbs'/>
      <div class="workHead boxs">
        <div class="numBox" v-for="(v,i) in workH">
          <div class="numBoxIn">
            <p v-text="v.val" :style="{'color':v.color}"></p>
            <span v-text="v.tit"></span>
          </div>
          <Lines :hei="60" :top="20" v-if="i!=3"/>
        </div>
      </div>
      <div class="tableBoxs boxs">
        <div class="tabHead">
          <div class="jobBoxs">
            <SelectBox 
              :options = 'jobs' 
              :value = "vJob" 
              :icon="'el-icon-d-caret'"
              placeholder="类别"
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
            @rowClick = "rowClick"
          />
        </div>
      </div>
  </div>
</template>

<script>
import '@/assets/css/fs_common.css'
import Header from '@/components/common/sysHead'
import utils from "../../../assets/js/utils.js";
import SelectBox from '@/components/form/selectBox';
import TimePickerT from '../components/work/timePickerTit2';
import Percentage from '../components/work/Percentage';
import WorkInfo from '../components/work/workInfo';
import State from './state';
import deal from './deal';
import RoutingTakModdel from '../components/routing/routingTakModdel';
import RoutingTask from '../components/routing/routingTask';
import RoutingInfo from '../components/routing/routingInfo';
import AddModel from '../components/routing/addTemp';

import Table from '@/components/common/table';
export default {
  components:{
    'Table':Table,
    'WorkInfo':WorkInfo,
    'SelectBox':SelectBox,
    'Header':Header,
    'TimePickerT':TimePickerT,
    'RoutingTakModdel':RoutingTakModdel,
    'RoutingTask':RoutingTask,
    'RoutingInfo':RoutingInfo,
    'AddModel':AddModel
  },
  data () {
    return {
        tempTitle:'新增',//弹框的标题
        activeName:'first',
        rowData:{},
        // crumbs:['代维系统','巡检'],
        workH:[
          {id:1,tit:'今日巡检数',val:"4",color:'#f38a00'},
          {id:2,tit:'未完成',val:"2",color:'#f56c6c'},
          {id:3,tit:'已完成数量',val:"2",color:'#4ae283'},
        ],
        jobs:[
          {label:'给排水',value:1},
          {label:'电梯',value:2},
          {label:'变配电',value:3},
          {label:'照明',value:4},
          {label:'暖通',value:5},
        ],
        vJob:-1,
        names:[
          {label:'李白',value:1},
          {label:'杜甫',value:2},
          {label:'王安石',value:3},
          {label:'白居易',value:4},
          {label:'狗蛋儿',value:5},
        ],
        vName:-1,
        //日期选择
        value7:'8-24',
        cant:false,
        dtlObj:{
          title:'巡检单详情',
          value7:'8-24',
          
          tabs:[{
            'name':'今日巡检总数',
            num:78
          },{
            'name':'已完成',
            num:65
          },{
            'name':'未完成',
            num:13
          }],

          tableDtl:{
              hei:488, //table高度  设置后有滚动条
              len:8, //总条数
              dialogBoxs:{
                  item:{name:''},
                  state0:0, //1 同意，0拒绝
                  txt:'是否允许退单'
              },
              data:[
                  {id:1,u_id:1,name:'白狗汪11',type:'给排水系统',addr:'青羊区工业园区T区8栋9楼',eName:'二号会议室照明系统',sTime:'2018-08-27 11:35',info:'几水泵房水泵温度异',sType:'系统派发',state:-1,desc:'范珊看哪个阶段呢是范珊的咖啡店给你的肌肤喝点水放辣椒是非得失，反倒是',backExcuse:'范珊看哪个阶段呢是范珊的咖啡店给你的肌肤喝点水放辣椒是非得失，反倒是',
                  imgs1:[{
                      src:'../../../assets/img/logo.png'
                    },{
                      src:'../../../assets/img/logo.png'
                    },{
                      src:'../../../assets/img/logo.png'
                    },{
                      src:'../../../assets/img/logo.png'
                    },{
                      src:'../../../assets/img/logo.png'
                    }],
                    imgs2:[{
                      src:'../../../assets/img/logo.png'
                    },{
                      src:'../../../assets/img/logo.png'
                    },{
                      src:'../../../assets/img/logo.png'
                    },{
                      src:'../../../assets/img/logo.png'
                    },{
                      src:'../../../assets/img/logo.png'
                    }],
                  steps:[{
                    name:'派发时间',date:'2018/09/14',time:'09:13',areatime:'3h',
                    },{
                      name:'接单时间',date:'2018/09/16',time:'09:13',areatime:'48h'
                    },{
                      name:'派发时间',date:'2018/09/16',time:'11:15',areatime:'2h'
                    }],
                    device:[{
                      label:'巡检人员',
                      type:'田阿菊'
                    },{
                      label:'电话',
                      type:'18876768766'
                    },{
                      label:'设备类型',
                      type:'给排水系统'
                    },{
                      label:'设备地点',
                      type:'这边自宽130PX'
                    },{
                      label:'巡检设备',
                      type:'给排水泵房'
                    }],
                  }, 
                  {id:2,u_id:1,name:'白狗汪1',type:'给排水系统',addr:'青羊区工业园区T区8栋9楼',eName:'二号会议室照明系统',sTime:'2018-08-27 11:35',info:'几水泵房水泵温度异',sType:'系统派发',state:2}, 
                  {id:3,u_id:1,name:'白狗汪1',type:'给排水系统',addr:'青羊区工业园区T区8栋9楼',eName:'二号会议室照明系统',sTime:'2018-08-27 11:35',info:'几水泵房水泵温度异',sType:'系统派发',state:3}, 
                  {id:4,u_id:1,name:'白狗汪1',type:'给排水系统',addr:'青羊区工业园区T区8栋9楼',eName:'二号会议室照明系统',sTime:'2018-08-27 11:35',info:'几水泵房水泵温度异',sType:'系统派发',state:-1}, 
                  {id:5,u_id:1,name:'白狗汪1',type:'给排水系统',addr:'青羊区工业园区T区8栋9楼',eName:'二号会议室照明系统',sTime:'2018-08-27 11:35',info:'几水泵房水泵温度异',sType:'系统派发',state:2}, 
                  {id:6,u_id:1,name:'白狗汪1',type:'给排水系统',addr:'青羊区工业园区T区8栋9楼',eName:'二号会议室照明系统',sTime:'2018-08-27 11:35',info:'几水泵房水泵温度异',sType:'系统派发',state:3}, 
                  {id:7,u_id:1,name:'白狗汪1',type:'给排水系统',addr:'青羊区工业园区T区8栋9楼',eName:'二号会议室照明系统',sTime:'2018-08-27 11:35',info:'几水泵房水泵温度异',sType:'系统派发',state:3}, 
                  {id:8,u_id:1,name:'白狗汪1',type:'给排水系统',addr:'青羊区工业园区T区8栋9楼',eName:'二号会议室照明系统',sTime:'2018-08-27 11:35',info:'几水泵房水泵温度异',sType:'系统派发',state:3}, 
                  {id:9,u_id:1,name:'白狗汪1',type:'给排水系统',addr:'青羊区工业园区T区8栋9楼',eName:'二号会议室照明系统',sTime:'2018-08-27 11:35',info:'几水泵房水泵温度异',sType:'系统派发',state:3}, 
                  {id:10,u_id:1,name:'白狗汪1',type:'给排水系统',addr:'青羊区工业园区T区8栋9楼',eName:'二号会议室照明系统',sTime:'2018-08-27 11:35',info:'几水泵房水泵温度异',sType:'系统派发',state:3}, 
                  {id:11,u_id:1,name:'白狗汪1',type:'给排水系统',addr:'青羊区工业园区T区8栋9楼',eName:'二号会议室照明系统',sTime:'2018-08-27 11:35',info:'几水泵房水泵温度异',sType:'系统派发',state:3},                       
              ],
              th:[
                {prop:'name',label:'名称'},
                {prop:'type',label:'类别'},
                {prop:'addr',label:'地点',wid:208}, 
                {prop:'eName',label:'设备名称',wid:169},
                {prop:'sTime',label:'派发时间',wid:165},
                {prop:'info',label:'内容描述',wid:194},
                {prop:'sType',label:'派发类别'},
                {prop:'states',label:'状态',wid:146,
                  operate: true, 
                    render: (h, param)=> {
                        const btnss = {
                            fills:param.row.state,  
                        };
                        return h(State,{
                        props: { state:btnss},
                        on:{}
                        });
                    }},
                {prop:'fill',label:'操作',wid:105,
                  operate: true, 
                    render: (h, param)=> {
                        const btnss = {
                            item:param.row, 
                          //   id:param.row.id,  
                        };
                        return h(deal,{
                        props: { btnss:btnss},
                        on:{agree:this.agree,refult:this.refult}
                        });
                    } 
                },
              ]
          }
        },
        table:{
            // small:'small',
            hei:328, //table高度  设置后有滚动条
            // len:800, //总条数
            data:[
              {id:1,name:'白狗汪1',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:0,backApply:"-",fill:100}, 
              {id:2,name:'白狗汪2',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:0,backApply:"-",fill:80}, 
              {id:3,name:'白狗汪3',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:3,backApply:"-",fill:60}, 
              {id:4,name:'白狗汪4',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:3,backApply:"-",fill:40}, 
              {id:5,name:'白狗汪5',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:4,backApply:"-",fill:20}, 
              {id:6,name:'白狗汪6',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:4,backApply:"-",fill:100}, 
              {id:7,name:'白狗汪7',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:4,backApply:"-",fill:100}, 
              {id:8,name:'白狗汪8',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:4,backApply:"-",fill:100}, 
              {id:9,name:'白狗汪9',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:4,backApply:"-",fill:100}, 
              {id:10,name:'白狗汪10',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:4,backApply:"-",fill:100},              
            ],
            th:[
              {prop:'id',label:'编号'},
              {prop:'name',label:'类别'},
              {prop:'tel',label:'地点',wid:180},
              {prop:'job',label:'派发时间'},
              {prop:'sendNum',label:'点位'},
              {prop:'dealed',label:'状态',operate: true, 
                  render: (h, param)=> {
                      const btnss = {
                          fills:param.row.dealed,  
                      };
                      return h(State,{
                        props: { state:btnss},
                        on:{}
                      });
                  } },
              {prop:'dealed',label:'操作',
                operate: true, 
                  render: (h, param)=> {
                      const btnss = {
                          item:param.row,  
                      };
                      return h(deal,{
                        props: { btnss:btnss},
                        on:{agree:this.agree,refult:this.refult}
                      });
                  } 
              },
            ]
        },
        navsData:{
          active:'item3',
          lists:[
              {id:0,name:'首页',route:'/AgentManage/normalUser'},
              {id:1,name:'排班表',route:'/AgentManage/normalUser/schedules'},
              {id:2,name:'工单',route:'/AgentManage/normalUser/workList'},
              {id:3,name:'巡检',route:'/AgentManage/normalUser/routing'},
              {id:4,name:'完成情况',route:'/AgentManage/normalUser/report'},
          ]
        },
        infoItem:{},  //某个工单的详情
    }
  },
  methods:{
    change1(val){ //选择
      this.vJob = val;
    },
    change2(val){ //选择
      this.vName = val;
    },
    changes(val){
        this.value7 = val;
    }, 
    deletes(){
      let attrs = this.value7.split('-');
      // console.log(attrs)
      if(attrs[2]==1){
        if(attrs[1]==2 ||attrs[1]==4 || attrs[1]==6 ||attrs[1]==8 ||attrs[1]==9 ||attrs[1]==11 ||attrs[1]==1){
            attrs[2]=31;
        }else if(attrs[1]==5 ||attrs[1]==7 || attrs[1]==10 ){
            attrs[2]=30;
        }else if(attrs[1]==3 && Number(attrs[0])%4==0){
            attrs[2]=29;
        }else if(attrs[1]==3 && Number(attrs[0])%4!=0){
            attrs[2]=28;
        }
        if(attrs[1]==1){
            attrs[1] = 12;
            attrs[0] = Number(attrs[0])-1;
        }else{
            attrs[1] = Number(attrs[1])-1;
        }            
      }else{
          attrs[2] = Number(attrs[2])-1;
      }
      this.value7 = attrs.join('-'); 
    },
    adds(){
      if(this.cant){
          return;
      }
      let attrs = this.value7.split('-');

      if(((attrs[1]==1 ||attrs[1]==3 || attrs[1]==5 ||attrs[1]==7 ||attrs[1]==8 ||attrs[1]==10 ||attrs[1]==12) && attrs[2]==31)
          ||((attrs[1]==2 ||attrs[1]==6 || attrs[1]==9 ||attrs[1]==11) && attrs[2]==30) 
          ||((attrs[1]==2 && Number(attrs[0])%4==0) && attrs[2]==29)
          ||((attrs[1]==2 && Number(attrs[0])%4!=0) && attrs[2]==28)
      ){
          attrs[2] =1;
          if(attrs[1]==12){
              attrs[1] = 1;
              attrs[0] = Number(attrs[0])+1;
          }else{
              attrs[1] = Number(attrs[1])+1;
          }   
      }else{
          attrs[2] = Number(attrs[2])+1;
      }
      this.value7 = attrs.join('-');    
    }, 
    checkDetail(rowData){
      this.rowData = rowData;
      this.tempTitle = '查看';
      this.$refs.add.show();
    },
    updateDetail(rowData){
      this.rowData = rowData;
      this.tempTitle = '修改';
      this.$refs.add.show();
    },
    deleteDetail(rowData){
      console.log(rowData)
    },
    addDetail(){
      this.rowData = {};
      this.tempTitle = '新增';
      this.$refs.add.show();
    },
    cancelAdd(){
      this.$refs.add.hide();
    },
    saveAdd(formData){
      console.log(formData)
    },
    changeStatus(state){
      console.log(state);
    },
    rowClick(row){
      this.rowData = row;
      this.rowData.operate='check';
      this.$refs.add.show();
    },
    agree(item){ //同意
        console.log(item)
    },
    refult(item){//拒绝
       console.log(item)
    },
    tableInfos2Show(item){
      console.log(item)
      this.infoItem = item;
      this.infoItem.data = {
          datas:[{date:'2018/10/12',time:'15:29'},{date:'2018/10/12',time:'17:29'}],
          areatimes:['2h','4h'],
          oneLine:[{
            label:'类型',
            type:'给排水系统',
          },{
            label:'设备类型',
            type:'给排水系统',
          },{
            label:'设备地点',
            type:'这边字款130PX',
          },{
            label:'工单处理人员',
            type:'李宏源',
          }]
        }
      this.$refs.tableInfos2.show();
    },
    infoTit(state){
      let res = '';
      switch(state){
        case -1:
          res = '申请退单';
        break;
        case 2:
          res = '处理中';
        break;
        case 3:
        break;
      }
      return res;
    } 
  },
  created() {
      let val = (this.$router.history.current.fullPath).split('/AgentManage/normalUser/routing')[1];
      if(val==''){
          this.activeName = 'first';
      }else{
          // console.log( val.split('/')[1])
          this.activeName = val.split('/')[1];
      }
  },
  computed:{
      crumbs(){
        let res =['代维系统','巡检'];
        return res;
    }
  },
  mounted() {
      //console.log(this.dtlObj)
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped='scoped' type="text/less">
@import '../../../assets/css/comon.less';
.workBox{
  width:100%;
  .tabBoxs{
    position:absolute;
    width:100%;
    top:11.5vh;
    .tabItems{
      color:#a7a7a7;
    }
  }
  .firstBox{
    .vhMT(45);
  }
  .workHead{
    width: 95.6%;
    .vh(108);
    margin-left: 0.3rem;
    display: flex;
    .numBox{
      flex:1;
      display: flex;      
      .numBoxIn{
        display: flex;
        align-items: center;
        flex-direction: column;
        flex: 1;
        p{
          display: block;
          .vh(86);
          .vhLH(100);
          font-size: 0.48rem;
          font-family: PingFangSC-Light;
        }
        span{
          font-size: 0.12rem;
          line-height: 0.12rem;
          color: #b5d7ff;
        }
      }
    }
  }
  .tableBoxs{
    width: 95.6%;
    .vh(407);
    .vhMT(20);
    margin-left: 0.3rem;
    .tabHead{
      width: 100%;
      position: relative;
      .vh(59);
      .vhPT(20);
      .jobBoxs{
        float: left;
        width: 1.15rem;
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
      .dateBox{
        position: absolute;
        .vhTop(24);
        left: 4.95rem;
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
  .dispatch{
    width: 100%;
    .vh(100);
    display: flex;
    // align-items: center;
    justify-content: center;
    .vhPT(20);
    .dispatchBtn{
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 50%;
      background-color: rgba(51, 51, 51, 0.2);
      box-shadow: 0px 4px 10px 0px 
        rgba(74, 144, 226, 0.4), 
        inset 1px 1px 2px 0px 
        rgba(248, 253, 255, 0.15), 
        inset 0px -1px 1px 0px 
        #4a90e2;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        i{
          font-size: 0.32rem;
          color: #3b85ef;
        }
    }
  }
  .tableInfos{
    width: 100%;
    height: 100%;
    .infoHead{
      .vh(52);
      width: 100%;
      background: rgba(0,0,0,0.2);
      padding-left: 0.2rem;
      padding-right: 0.42rem;
      display: flex;
      align-items: center;
      span{
        font-size: 0.16rem;
        color: #fff;
      }
      .infoName{
        padding-right: 0.20rem;
      }
      .infoState{
        padding-left: 0.20rem;
        border-left: 0.01rem solid #4a90e2;
      }
      .infoType{
        font-size: 0.12rem;
      }
      .rightHead{
        position: absolute;
        right: 0;
        .vhLH(52);
        top:0;
        width: 12.59vw;
        .infoBusy{
          .vhMT(9);
          display:inline-block;
          .vhLH(24);
          background:#008AFF;
          width:4.98vw;
          font-size:12px;
          border-radius:2px;
          text-align:center;
        }
        .infoSend{
          .vhMT(9);
          display:inline-block;
          .vhLH(24);
          background:#FA6074;
          width:4.98vw;
          border-radius:2px;
          font-size:12px;
          text-align:center;
        }
      }
    }

  }
}
</style>
