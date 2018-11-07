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
          <div class="searchBoxs" @click="getTableData">
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
          <!--<el-table
            :cell-class-name="setColor"
            :data="table"
            style="width: 100%;"
            height="500"
            class=" tableHeadBlue">
            <el-table-column
              type="index"
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
          </el-table>-->
        </div>
      </div>
      <Dialog wid="910" hei="600" ref="tableInfos2">
          <div class="tableInfos">
              <div class="infoHead">
                <span class="infoName" v-text="infoItem.user_name"></span>
                <span class="infoState" v-text="infoTit(infoItem.now_value)"></span>
              </div>
              <div class="infoBoxs">
                <RoutingInfo :data="infoItem" @dealWork = "dealWork"/>
              </div>
          </div>
      </Dialog>
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
        workH:[],
        jobs:[
          {label:'给排水',value:1},
          {label:'电梯',value:2},
          {label:'变配电',value:3},
          {label:'照明',value:4},
          {label:'暖通',value:5},
        ],
        vJob:'',
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
        table:{
            // small:'small',
            hei:328, //table高度  设置后有滚动条
            len:0, //总条数
            data:[],
            th:[
              {prop:'index',label:'编号',minWid:'20%'},
              {prop:'title',label:'类别'},
              {prop:'floorname',label:'地点',wid:180},
              {prop:'addtime',label:'派发时间'},
              {prop:'dianwei',label:'点位'},
              {prop:'stateChi',label:'状态'},
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
              {id:1,name:'排班表',route:'/AgentManage/normalUser/schedule'},
              {id:2,name:'工单',route:'/AgentManage/normalUser/workList'},
              {id:3,name:'巡检',route:'/AgentManage/normalUser/routing'},
              {id:4,name:'完成情况',route:'/AgentManage/normalUser/report'},
          ]
        },
        infoItem:{
          desc:[],
          tableData:{
            data:[],
            th:[]
          }
        },  //某个工单的详情
    }
  },
  methods:{
    change1(val){ //选择
      this.vJob = val;
    },
    dealWork(){

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
      console.log(row)
      this.$refs.tableInfos2.show();
      this.rowData.operate='check';
      this.$http.post('/pc_ims/staff/inspectiondata_info',{ins_id:row.id}).then(res=>{
        console.log(res.data)
          if(res.data.code==0){
            this.infoItem.desc = [
              {label:'类别',value:this.infoItem.user_name},
              {label:'设备名称',value:this.infoItem.user_phone},
              {label:'设备地点',value:this.infoItem.title},
              {label:'检查人员',value:this.infoItem.floorname},
              {label:'电话',value:this.infoItem.devicename},
            ]
            this.infoItem.localDesc = {label:'现场处理情况',value:this.infoItem.complete_info};
            this.infoItem.tableData = res.data.data.zhanshi;
            this.infoItem.tableData.data = this.infoItem.tableData.list;
            let arr = [];
            let arrData = [];
            $.each(this.infoItem.tableData.data,(n,k)=>{
              arr.push({prop:'now_value'+n,label:k.name,wid:30})
              arrData['now_value'+n]=k.now_value;
            })
            this.infoItem.tableData.data = arrData;
            this.infoItem.tableData.th = arr;
          }else{
            this.$message({
              type:'error',
              message:res.data.msg
            })
          }
      })
    },
    agree(item){ //同意
        console.log(item)
    },
    refult(item){//拒绝
       console.log(item)
    },
    tableInfos2Show(item){
      console.log(item)
      return
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
    } ,
    getTopData(){
      this.$http.post('/pc_ims/staff/inspectiondata').then(res=> {
           if(res.data.code==0){
             let data = res.data.data;
              this.workH = [{id:1,tit:'今日巡检数',val:data.count,color:'#f38a00'},
                            {id:2,tit:'未完成',val:data.wei,color:'#f56c6c'},
                            {id:3,tit:'已完成数量',val:data.wan,color:'#4ae283'}];
           }else{
              this.$message({
                type:'error',
                message:res.data.msg
              })
           }
        })
    },
    getTableData(){
      this.$http.post('/pc_ims/staff/inspectiondata_user',{
        sys_name:this.vJob,
        pagenumber:1,
        pagesize:20})
      .then(res=> {
           if(res.data.code==0){
             this.table.data = res.data.data;
             this.table.len = res.data.count;
              this.table.data.map((item,index)=>{
                  item.index = index+1
                  let dwList = JSON.parse(item.form).list //点位数据
                  if(dwList.length!=0){
                      let name = ''
                    for(let i=0;i<dwList.length;i++){
                          if(i==0){
                              name = dwList[i].name
                          }else{
                            name = name + '、' + dwList[i].name
                          }
                    }
                    item.dianwei = name
                  }
                  if(item.now_state==0){
                      item.stateChi = '未接单'
                  }
                if(item.now_state==1){
                  item.stateChi = '处理中'
                }
                if(item.now_state==2){
                  item.stateChi = '完成'
                }
                if(item.now_state==3){
                  item.stateChi = '申请退单'
                }
                if(item.now_state==4){
                  item.stateChi = '退单完成'
                }
              })
           }else{
              this.$message({
                type:'error',
                message:res.data.msg,
                duration:2000
              })
           }
        })
    },
    getSystemsOptions(){
        this.$http.post('/pc_ims/get_sysmenu').then(res=> {
           if(res.data.code==0){
              let data= res.data.data;
              $.each(data,(n,k)=>{
                data[n].label = data[n].title;
                data[n].value = data[n].title;
              })
              this.jobs = data;
              this.jobs.unshift({label:'类别',id:''})
           }else{
              this.$message({
                type:'error',
                message:res.data.msg
              })
           }
        })
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
      this.getSystemsOptions()
    this.getTopData();
    this.getTableData();
  }
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
