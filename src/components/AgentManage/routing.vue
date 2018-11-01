<!--
    代维系统 巡检
    白 2018-10-14
-->
<template>
  <div class="workBox">
      <Crumbs :data ='crumbs'/>
      <el-tabs class="tabBoxs" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane name="first">
            <span slot="label" class="tabItems">
                巡检任务表
            </span>
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
                    :options = 'departments' 
                    :value = "query.department" 
                    :icon="'el-icon-d-caret'"
                    placeholder="专业岗位"
                    @change = "change1"
                  />
                </div>
                <div class="nameBoxs">
                  <SelectBox 
                    :options = 'names' 
                    :value = "query.name" 
                    :icon="'el-icon-d-caret'"
                    placeholder="姓名" 
                    @change = "change2"
                  />
                </div>
                <div class="searchBoxs" @click="getTableList">
                  <i class="el-icon-search"></i>
                  <span>筛选</span>
                </div>
                <div class="dateBox">
                  <TimePickerT 
                      :value7= "value7"
                      :cant  = 'cant'
                      @changes = "changes"
                      @deletes = 'deletes'
                      @adds = 'adds'
                  />
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
            <Dialog wid="1326" hei="640" ref="dialog">
              <WorkInfo @tableInfos2Show="tableInfos2Show" :table="table3" :query="query2"/>
            </Dialog> 
            <Dialog wid="910" hei="686" ref="tableInfos2">
                <div class="tableInfos">
                    <div class="infoHead">
                      <span class="infoName" v-text="infoItem.name"></span>
                      <span class="infoState" v-text="infoTit(infoItem.state)"></span>
                      <div class="rightHead">
                        <span class="infoBusy" v-text="'普通'"></span>
                        <span class="infoSend" v-text="infoItem.sType"></span>
                      </div>
                    </div>
                    <div class="infoWater">
                      <RoutingTask :data="dtlObj.tableDtl.data[0]"></RoutingTask>
                    </div>
                    <div class="infoBoxs">
                      <RoutingInfo :data="dtlObj.tableDtl.data[0]" :device="dtlObj"/>
                    </div>
                </div>
            </Dialog>  
        </el-tab-pane>
        <el-tab-pane name="second" >
            <span slot="label" class="tabItems">
                巡检任务模板
            </span>
            <RoutingTakModdel v-show="activeName=='second'" @addDetail="addDetail" :table="table2" :query="queryModel" @searchXJ="getModelList"/>
        </el-tab-pane>      
      </el-tabs>  
      <Dialog wid="910" hei="622" ref="add" > <!-- 新增巡检模板 -->
        <AddModel :data="rowData" :formvals="queryModel" :title="tempTitle" @cancelAdd="cancelAdd" @saveAdd="saveAdd" />
      </Dialog> 
  </div>
</template>

<script>
import '@/assets/css/fs_common.css'
import utils from "../../assets/js/utils.js";
import SelectBox from '@/components/form/selectBox';
import TimePickerT from './components/work/timePickerTit2';
import Percentage from './components/work/Percentage';
import WorkInfo from './components/work/workInfo';
import State from './components/routing/state';
import deal from './components/routing/deal';
import RoutingTakModdel from './components/routing/routingTakModdel';
import RoutingTask from './components/routing/routingTask';
import RoutingInfo from './components/routing/routingInfo';
import AddModel from './components/routing/addTemp';

import Table from '@/components/common/table';
export default {
  components:{
    'Table':Table,
    'WorkInfo':WorkInfo,
    'SelectBox':SelectBox,
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
        departments:[],
        query:{
          department:'',
          name:''
        },
        query2:{
          time:'10-29',
          types:[],
          type:''
        },
        names:[],
        //日期选择
        value7:'8-24',
        dtlObj:{
          tableDtl:{
            data:[]
          }
        },
        cant:false,
        queryModel:{//巡检任务模板的查询条件
          systems:[],areas:[],examine:[],
          taskStatus:[{value:1,label:'启用'},{value:2,label:'停用'}],
          system:'',area:'',exam:'',taskStatu:'',periods:[{value:0,label:'每天'},{value:1,label:'每周'},{value:2,label:'每月'},{value:3,label:'每年'}],
          period:'',departments:[],department:'',starttimes:[],
          starttime:'',limits:[],time_limit:'',devices:[],device:'',
          datas:[],data:''
        },
        table2:{
          hei:328, //table高度  设置后有滚动条
          len:0, //总条数
          data:[],
          th:[
            {prop:'id',label:'序号'},
            {prop:'sys_name',label:'系统'},
            {prop:'floor',label:'区域'},
            {prop:'start_date',label:'开始时间'},
            {prop:'period',label:'巡检周期'},
            {prop:'user_name',label:'巡检人'},
            {prop:'title',label:'专业'},
            {prop:'time_limit',label:'完成时限'},
            {prop:'now_state',label:'任务状态',operate: true, 
              render: (h, param)=> {
                  const btnss = {
                      fills:param.row.now_state,  
                  };
                  return h(State,{
                    props: { states:btnss}
                  });
              }},
            {prop:'fill',label:'操作',wid:200,
                operate: true, 
                render: (h, param)=> {
                  const btnss = {
                      item:param.row, 
                  };
                  return h(deal,{
                    props: { btnss:btnss},
                    on:{update:this.updateDetail,deletes:this.deleted,changeStatus:this.changeStatus}
                  });
                } 
            },
          ]
        },
        table3:{
          title:'巡检单详情',
          tabs:[],
          hei:488, //table高度  设置后有滚动条
          len:0, //总条数
          dialogBoxs:{
              item:{name:''},
              state0:0, //1 同意，0拒绝
              txt:'是否允许退单'
          },
          data:[],
          th:[
            {prop:'id',label:'序号',wid:60},
            {prop:'user_name',label:'名称'},
            {prop:'title',label:'类别'},
            {prop:'floorname',label:'地点'}, 
            {prop:'devicename',label:'设备名称'},
            {prop:'addtime',label:'派发时间'},
            {prop:'descript',label:'内容描述'},
            {prop:'now_state',label:'状态',wid:80},
            {prop:'fill',label:'操作',wid:105,
              operate: true, 
                render: (h, param)=> {
                    //console.log(param)
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
        table:{
            hei:328, //table高度  设置后有滚动条
            len:0, //总条数
            data:[],
            th:[
              {prop:'id',label:'序号'},
              {prop:'name',label:'名称'},
              {prop:'phone',label:'电话',wid:180},
              {prop:'department',label:'专业岗位'},
              {prop:'count',label:'派单量'},
              {prop:'dai',label:'待处理'},
              {prop:'wei',label:'未接单'},
              {prop:'wan',label:'已处理'},
              {prop:'tui',label:'退单申请',wid:146},
              {prop:'percent',label:'完成率',wid:170,
                operate: true, 
                  render: (h, param)=> {
                      const btnss = {
                          fills:param.row.percent,  
                      };
                      return h(Percentage,{
                      props: { btnss:btnss},
                      on:{}
                      });
                  } 
              },
            ]
        },
        infoItem:{},  //某个工单的详情
    }
  },
  methods:{
    change1(val){ //选择
      this.query.department = val;
    },
    change2(val){ //选择
      this.query.name = val;
    },
    changes(val){
        this.value7 = val;
    }, 
    update(){
      this.$refs.add.show();
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
      //console.log(rowData);
      this.rowData = rowData;
      this.tempTitle = '查看';
      this.$refs.add.show();
    },
    updateDetail(rowData){//待定
      this.rowData = rowData;
      this.tempTitle = '修改';
      this.$refs.add.show();
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
      //console.log(formData)
      this.$http.post('/pc_ims/set_template',formData)
      .then(res=>{
          if(res.data.code==0){
            this.$message({
              type:'error',
              message:'巡检任务模板新增成功'
            })
            console.log(res.data)
            this.table3.len = res.data.count;
            this.table3.data = res.data.data.info;
            this.table3.tabs = [{'name':'今日巡检总数',num:res.data.data.zong},
            {'name':'已完成',num:res.data.data.wan},
            {'name':'未完成',num:res.data.data.wei}];
          }else{
            this.$message({
              type:'error',
              message:res.data.msg
            })
          }
      })
    },
    changeStatus(state,item){
      //console.log(state)
      if(state=='启动'){
        state=1;
      }else{
        state=2;
      }
      this.dealroutState(item.id,state);
    },
    deleted(item){
      this.dealroutState(item.id,0);
    },
    dealroutState(id,state){
      this.$http.post('/pc_ims/admin/change_state',{id:id,state:state})
      .then(res=>{
          if(res.data.code==0){
            this.$message({
              type:'success',
              message:res.data.msg,
              duration:2000
            })
            this.getModelList(this.queryModel);
          }else{
            this.$message({
              type:'error',
              message:res.data.msg,
              duration:2000
            })
          }
      })
    },
    rowClick(row){
      this.$refs.dialog.show();
      this.$http.post('/pc_ims/admin/inspectiondata_all',{sys_name:'',user_id:row.user_id})
      .then(res=>{
          if(res.data.code==0){
            this.table3.len = res.data.count;
            this.table3.data = res.data.data.info;
            this.table3.tabs = [{'name':'今日巡检总数',num:res.data.data.zong},
            {'name':'已完成',num:res.data.data.wan},
            {'name':'未完成',num:res.data.data.wei}];
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
    handleClick(){
      let activeName = this.activeName;
        this.$router.replace({ path: `/AgentManage/routing/${activeName}`}); 
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
      this.$http.post('/pc_ims/admin/inspectiondata')
      .then(res => {
        if(res.data.code==0){
          this.workH = [
          {id:1,tit:'今日在岗人数',val:res.data.data.zaiban,color:'#b5d7ff'},
          {id:2,tit:'今日巡检数',val:res.data.data.count,color:'#f38a00'},
          {id:3,tit:'已完成数量',val:res.data.data.complete,color:'#4ae283'},
          {id:4,tit:'今日巡检完成率',val:res.data.data.percent,color:'#4ae283'}];
        }else{
          this.$message({
            type:'error',
            message:res.data.msg
          })
        }
      })
    },
    getTableList(){
      console.log(this.query);
      this.$http.post('/pc_ims/admin/inspectiondata_user',{
        department_id:this.query.department,
        user_id:this.query.name,
        date:'10-30'
      })
      .then(res => {
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
    getModelList(param){
      this.$http.post('/pc_ims/get_template',{
        sys_id:param.system,
        floor_id:param.area,
        user_id:param.exam,
        now_state:param.taskStatu
      })
      .then(res => {
        if(res.data.code==0){
          this.table2.len = res.data.count;
          this.table2.data = res.data.data;
        }else{
          this.$message({
            type:'error',
            message:res.data.msg
          })
        }
      })
    },
    getNameList(){
        this.$http.post('/pc_ims/get_user').then(res=>{
          if(res.data.code==0){
            let data = res.data.data;
            $.each(data,(n,k)=>{
              data[n].value = data[n].id;
              data[n].label = data[n].truename;
            })
            this.names = data;
            this.queryModel.examine = data;
          }else{
            this.$message({
              type:'error',
              message:res.data.msg
            })
          }
        });
      },
      getDatasList(){//采集数据点下拉框数据
        this.$http.post('/pc_ims/get_points',{device_id:this.queryModel.device})
        .then(res=>{
          if(res.data.code==0){
            let data = res.data.data;
            $.each(data,(n,k)=>{
              data[n].value = data[n].id;
              data[n].label = data[n].title;
            })
            this.queryModel.datas = data;
          }else{
            this.$message({
              type:'error',
              message:res.data.msg
            })
          }
        });
      },
      getDepartList(){
        this.$http.post('/pc_ims/get_description').then(res=>{
          if(res.data.code==0){
            let data = res.data.data;
            $.each(data,(n,k)=>{
              data[n].value = data[n].id;
              data[n].label = data[n].title;
            })
            this.departments = data;
            this.queryModel.departments = data;
          }else{
            this.$message({
              type:'error',
              message:res.data.msg
            })
          }
        });
      },
      getSystemList(){
        this.$http.post('/pc_ims/get_sysmenu').then(res=>{
          if(res.data.code==0){
            let data = res.data.data;
            $.each(data,(n,k)=>{
              data[n].value = data[n].id;
              data[n].label = data[n].title;
            })
            this.queryModel.systems = data;
            this.query2.types= data;
          }else{
            this.$message({
              type:'error',
              message:res.data.msg
            })
          }
        });
      },
      getAreaList(){
        this.$http.post('/pc_ims/get_floor').then(res=>{
          if(res.data.code==0){
            let data = res.data.data;
            $.each(data,(n,k)=>{
              data[n].value = data[n].floor_id;
              data[n].label = data[n].floor_name;
            })
            this.queryModel.areas = data;
          }else{
            this.$message({
              type:'error',
              message:res.data.msg
            })
          }
        });
      },
      getDeviceList(){
        this.$http.post('/pc_ims/get_device',{floor_name:this.queryModel.area}).then(res=>{
          console.log(res);
          if(res.data.code==0){
            let data = res.data.data;
            
            $.each(data,(n,k)=>{
              data[n].value = data[n].floor_id;
              data[n].label = data[n].floor_name;
            })
            this.queryModel.devices = data;
          }else{
            this.$message({
              type:'error',
              message:res.data.msg
            })
          }
        });
      },
     
  },
  created() {
      let val = (this.$router.history.current.fullPath).split('/AgentManage/routing')[1];
      if(val==''){
          this.activeName = 'first';
      }else{
          this.activeName = val.split('/')[1];
      }
  },
  computed:{
      crumbs(){
        let res =['代维系统','巡检'];
        switch(this.activeName){
            case 'first':
                res.push('巡检任务表');
            break;
            case 'second':
                res.push('巡检任务模板');
            break;
        }
        return res;
    }
  },
  mounted() {
      this.getTopData();
      this.getTableList();
      this.getModelList(this.queryModel);
      this.getNameList();
      this.getSystemList();
      this.getDepartList();
      this.getAreaList();
      this.getDeviceList();
      this.getDatasList();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped='scoped' type="text/less">
@import '../../assets/css/comon.less';
.workBox{
  width:100%;
  .tabBoxs{
    position:absolute;
    width:100%;
    top:11.5vh;
    left:2.2%;
    .tabItems{
      color:#a7a7a7;
    }
  }
  .firstBox{
    margin-top:0.45rem;
  }
  .workHead{
    width: 95.6%;
    height:1.08rem;
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
          height:0.86rem;
          line-height:1rem;
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
    height:4.07rem;
    margin-top:0.2rem;
    .tabHead{
      width: 100%;
      position: relative;
      height:0.59rem;
      padding-top:0.2rem;
      .jobBoxs{
        float: left;
        width: 1.15rem;
        height:0.32rem;
        background-color: rgba(255, 255, 255, 0.01);
        border-radius: 0.02rem;
        border: solid 0.01rem #1989fa;
        text-align: center;
        margin-left: 0.2rem;
      }
      .nameBoxs{
        float: left;
         width: 0.87rem;
        height:0.32rem;
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
      .dateBox{
        position: absolute;
        .vhTop(24);
        left: 4.95rem;
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
  .dispatch{
    width: 100%;
    height:1rem;
    display: flex;
    // align-items: center;
    justify-content: center;
    padding-top:0.2rem;
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
      height:0.52rem;
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
        line-height:0.52rem;
        top:0;
        width: 12.59vw;
        .infoBusy{
          margin-top:0.09rem;
          display:inline-block;
          line-height:0.24rem;
          background:#008AFF;
          width:4.98vw;
          font-size:12px;
          border-radius:2px;
          text-align:center;
        }
        .infoSend{
          margin-top:0.09rem;
          display:inline-block;
          line-height:0.24rem;
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
