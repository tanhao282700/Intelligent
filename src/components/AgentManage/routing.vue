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
            <Dialog wid="1200" hei="640" ref="dialog">
              <WorkInfo @tableInfos2Show="tableInfos2Show" @getUserList="rowClick" :table="table3" :query="query2" :dtltime="value7"/>
            </Dialog> 
            <Dialog wid="910" hei="650" ref="tableInfos2">
                <div class="tableInfos">
                    <div class="infoHead">
                      <span class="infoName" v-text="infoItem.user_name"></span>
                      <span class="infoState" v-text="infoTit(infoItem.now_value)"></span>
                    </div>
                    <div class="infoWater">
                        <RoutingTask :data="infoItem" ></RoutingTask>
                    </div>
                    <div class="infoBoxs">
                      <RoutingInfo :data="infoItem" @dealWork = "dealWork"/>
                    </div>
                </div>
            </Dialog>  
        </el-tab-pane>
        <el-tab-pane name="second" >
            <span slot="label" class="tabItems">
                巡检任务模板
            </span>
            <RoutingTakModdel v-show="activeName=='second'" @addDetail="addDetail" :table="table2" :query="queryModel" @searchXJ="getModelList" @getSys="getSys"/>
        </el-tab-pane>      
      </el-tabs>  
      <Dialog wid="910" hei="622" ref="add" > <!-- 新增巡检模板 -->
        <AddModel :data="rowData" :formvals="queryModel" :title="tempTitle" @cancelAdd="cancelAdd" @saveAdd="saveAdd" @getFloorVal="getFloorVal" @getDeviceVal="getDeviceVal" @getSystemval="getSystemval" @getUserlist="getNameList"/>
      </Dialog> 
      <Dialog wid="364" hei="216" ref="isRefult"><!-- 同意退单 -->
          <div v-text="dialogBoxs.txt" class="isRefTxt"></div>
          <div class="isRbtnBoxs">
              <span @click="submitOk">确定</span>
              <span @click="submitNo">取消</span>
          </div>
      </Dialog> 
      <Dialog wid="414" hei="260" ref="sendWork2"><!-- 重新选择工单处理人员 -->
          <div class="sendWork2">
              <div class="oldName" style="padding-top:0.2rem">
                  <label for="">原处理人员：{{detalrowdata.user_name}}</label>
                  <span class="namess" v-text="dialogBoxs.item.name"></span>
              </div>
              <div class="newName">
                  <label for="">新工单处理人员：</label>
                  <div class="ChooseBox">
                      <SelectBox
                          :options = 'queryModel.newNames' 
                          :value = "queryModel.vName" 
                          placeholder='选择人员'
                          @change = 'changeNew'
                      />
                  </div>
              </div>
          </div>
          <div class="sendWork2Boxs btnBai1" @click="sendWork2">
              <span>确定</span>
          </div>
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
import State from './components/routing/state'
import State2 from './components/routing/state2';
import deal from './components/routing/deal3';
import deal3 from './normalUser/deal2';

import deal2 from './components/routing/deal';
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
        dialogBoxs:{
            item:{name:''},
            state0:0, //1 同意，0拒绝
            txt:'是否允许退单'
        },
        query2:{
          time:'10-29',
          types:[],
          type:''
        },
        names:[],
        //日期选择
        value7:utils.time(new Date()/1000,5),
        cant:false,
        queryModel:{//巡检任务模板的查询条件
          id:0,
          systems:[],
          systemss:[],
          areas:[],
          areass:[],
          examine:[],
          newNames:[],
          vName:'',
          examines:[],
          taskStatus:[{value:1,label:'启用'},{value:2,label:'停用'}],
          system:'',
          area:'',
          exam:'',
          taskStatu:'',
          periods:[{value:0,label:'每天'},{value:1,label:'每周'},{value:2,label:'每月'},{value:3,label:'每年'}],
          period:'',
          departments:[],
          department:'',
          starttimes:[],
          starttime:'',
          limits:[],
          time_limit:'',
          devices:[],
          device:'',
          datas:[],
          data:''
        },
        table2:{
          hei:328, //table高度  设置后有滚动条
          len:0, //总条数
          data:[],
          th:[
            {prop:'serial',label:'序号'},
            {prop:'sys_name',label:'系统'},
            {prop:'floor',label:'区域'},
            {prop:'start_date',label:'开始时间'},
            {prop:'period',label:'巡检周期',operate:true,
              render: (h, param)=> {
                  const btnss = {
                      item:param.row,  
                  };
                  return h(deal3,{
                    props: {btnss:btnss}
                  });
              }
            },
            {prop:'user_name',label:'巡检人'},
            {prop:'title',label:'专业'},
            {prop:'time_limit',label:'完成时限'},
            {prop:'now_state',label:'任务状态',operate: true, 
              render: (h, param)=> {
                  const btnss = {
                      fills:param.row.now_state,  
                  };
                  return h(State,{
                    props: {states:btnss}
                  });
              }},
            {prop:'fill',label:'操作',wid:200,
                operate: true, 
                render: (h, param)=> {
                  const btnss = {
                      item:param.row, 
                  };
                  return h(deal2,{
                    props: { btnss:btnss},
                    on:{update:this.updateDetail,deletes:this.deleted,changeStatus:this.changeStatus}
                  });
                } 
            },
          ]
        },
        detalrowdata:{},
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
            {prop:'serial',label:'序号',wid:50},
            {prop:'user_name',label:'名称'},
            {prop:'title',label:'类别'},
            {prop:'floorname',label:'地点'}, 
            {prop:'devicename',label:'设备名称'},
            {prop:'addtime',label:'派发时间'},
            {prop:'descript',label:'内容描述'},
            {prop:'now_state',label:'状态',wid:100,
            operate: true, 
              render: (h, param)=> {
                  const btnss = {
                      fills:param.row.now_state,  
                  };
                  return h(State2,{
                    props: {state:btnss}
                  });
              }},
            {prop:'fill',label:'操作',wid:210,
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
        table:{
            hei:328, //table高度  设置后有滚动条
            data:[],
            th:[
              {prop:'serial',label:'序号'},
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
        infoItem:{
          info:{},
          desc:[],
          localDesc:{},
          localDesc2:{},
          infoSend:[],
          tableData:{
            hei:260,
            data:[],
            th:[]
          }
        },  //某个工单的详情
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
        this.getTableList();
    }, 
    dealWork(param){//处理工单
      this.getDealResult(param)
    },
    changeNew(val){
      this.queryModel.vName = val;
      this.detalrowdata.new_user_id = val;
    },
    getDealResult(param){
      //console.log(param);
      this.$http.post('/pc_ims/admin/write_inspectionlist',{
        id:param.infos.id,
        type:param.type,
        user_id:param.infos.user_id,
        new_user_id:'',
        info:param.infos.localDesc.value,
        form:{list:[]}
      })
      .then(res=>{
        if(res.data.code==0){
          this.$message({
            type:'success',
            message:res.data.msg,
            duration:2000
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
    dealWorks(item,type){
      if(!item.newuser_id){
          item.newuser_id = ''
      }
      if(!type){
        type = item.type;
      }
      let form = JSON.parse(item.form).list;
      this.$http.post('/pc_ims/admin/write_inspectionlist',{
        id:item.id,
        type:type,
        info:item.descript,
        user_id:item.user_id,
        new_user_id:item.newuser_id,
        form:JSON.stringify({list:form})
      }).then(res=>{
        if(res.data.code==0){
          this.$message({
            type:'success',
            message:res.data.msg,
            duration:2000
          })
          this.rowClick(this.rowData)
        }else{
          this.$message({
            type:'error',
            message:'退单失败。'
          })
        }

      })
    },
    getDeviceVal(val){
      this.queryModel.device = val;
      this.getDatasList(val)
    },
    getFloorVal(val1,val2){
      this.queryModel.area = val1;
      this.queryModel.system = val2
      //console.log(val1+'@@@@@@@@@@@@@@@'+val2);
      this.getDeviceList(val1,val2)
    },
    getSys(val){
      this.getAreaList(val)
    },
    getSystemval(val){
      this.queryModel.system = val;
      this.getAreaList(val)
    },
    update(){
      this.$refs.add.show();
    },
    deletes(){
        let attrs = this.value7.split('-');
        if(Number(attrs[1])==1){
          if(Number(attrs[0])>1){
            if(Number(attrs[0]-1)>9){
              attrs[0] = attrs[0]-1;
            }else{
              attrs[0] = '0'+Number(attrs[0]-1);
            }
            if(attrs[0]==1 || attrs[0]==3 || attrs[0]==5 || attrs[0]==7 || attrs[0]==8 || attrs[0]==10 || attrs[0]==12){
              attrs[1]=31;
            }else if(attrs[0]==4 || attrs[0]==6 || attrs[0]==9 || attrs[0]==11){
              attrs[1]=30;
            }else{
              if(utils.time(new Date()/1000,10)%4==0){
                attrs[1]= 29;
              }else{
                attrs[1]= 28;
              }
            }
          }
        }else{
          if((Number(attrs[1])-1)<10){
            attrs[1] = '0'+(Number(attrs[1])-1);
          }else{
            attrs[1] = Number(attrs[1])-1;
          }
        }
        this.value7 = attrs.join('-'); 
        this.getTableList();
      },
      adds(){
        if(this.cant){
            return;
        }
        let attrs = this.value7.split('-');
        if(((attrs[0]==1 ||attrs[0]==3 || attrs[0]==5 ||attrs[0]==7 ||attrs[0]==8 ||attrs[0]==10 ||attrs[0]==12) && attrs[1]==31)
            ||((attrs[0]==4 ||attrs[0]==6 || attrs[0]==9 ||attrs[0]==11) && attrs[1]==30) 
            ||((attrs[0]==2 && Number(attrs[0])%4==0) && attrs[1]==29)
            ||((attrs[0]==2 && Number(attrs[0])%4!=0) && attrs[1]==28)
        ){
            attrs[1] =1;
            if(attrs[0]==12){
                attrs[0] = '01';
                attrs[1] = '01';
            }else{
                if(Number(attrs[0])+1>10){
                  attrs[0] = Number(attrs[0])+1;
                  attrs[1] = '01';
                }else{
                  attrs[0] = '0'+(Number(attrs[0])+1);
                  attrs[1] = '01';
                }
                
            }   
        }else{
            if(Number(attrs[1])+1>9){
              attrs[1] = Number(attrs[1])+1;
            }else{
              attrs[1] = '0'+(Number(attrs[1])+1)
            }
            
        }
        this.value7 = attrs.join('-');  
        this.getTableList();  
      }, 
    checkDetail(rowData){
      //console.log(rowData);
      this.rowData = rowData;
      this.tempTitle = '查看';
      this.$refs.add.show();
    },
    updateDetail(rowData){//修改巡检模板
      this.rowData = rowData;
      this.tempTitle = '修改';
      this.$refs.add.show();
      this.$http.post('/pc_ims/admin/get_one_temp',{ins_id:rowData.id})
      .then(res=>{
         console.log(res)
         if(res.data.code==0){
            let list = JSON.parse(res.data.data.point_info);
            let arr = [];
            console.log(res.data.data);
            $.each(list,(n,k)=>{
              arr.push(JSON.parse(k).point_id.cate_id);
            })
            this.rowData = {
              exam:res.data.data.user_id,
              data:arr,
              department:res.data.data.department_id,
              time_limit:res.data.data.time_limit,
              system:res.data.data.sys_id,
              area:res.data.data.floor_id,
              device:res.data.data.device_id,
              starttime:res.data.data.addtime,
              period:res.data.data.cycle,
              addr:res.data.data.ins_place,
              desc:res.data.data.remarks
            }

          }else{
            this.$message({
              type:'error',
              message:res.data.msg
            })
          }
      })
    },
    addDetail(id){
      this.queryModel.id = 0;
      this.rowData = {};
      this.tempTitle = '新增';
      this.$refs.add.show();
    },
    cancelAdd(){
      this.$refs.add.hide();
    },
    saveAdd(formData){
      this.$http.post('/pc_ims/set_template',{data:JSON.stringify(formData)})
      .then(res=>{
          if(res.data.code==0){
            this.$message({
              type:'success',
              message:'操作成功！'
            })
            this.getModelList({
              sys_id:'',
              floor_id:'',
              user_id:'',
              now_state:''
            });
            this.$refs.add.hide();
          }else{
            this.$message({
              type:'error',
              message:res.data.msg
            })
          }
      })
    },
    changeStatus(state,item){
      if(state=='启动'){//改变启动为停用
        state=1;
      }else{//改变停用为启动
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
      this.rowData = row;
      if(!row.type){
        row.type = '';
      }
      if(row.user_id){
        this.infoItem.user_id = row.user_id;
      }
      if(!row.time || row.time.split('-')[0].length>2){
        row.time = this.value7;
      }
      this.$refs.dialog.show();
      this.$http.post('/pc_ims/admin/inspectiondata_all',{
        sys_name:row.type,
        user_id:this.infoItem.user_id,
        date:row.time
      }).then(res=>{
          if(res.data.code==0){
            this.table3.len = res.data.count;
            let info = res.data.data.info;
            $.each(info,(n,k)=>{
              info[n].serial = n+1;
            })
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
    agree(item,type){ //同意
        this.$refs.isRefult.show();
        this.detalrowdata = item;
        this.detalrowdata.type = type;
    },
    refult(item,type){//拒绝
      this.dealWorks(item,type);
    },
    submitOk(){ //处理工单 同意/拒绝退单/延期
        this.$refs.isRefult.hide();
        this.$refs.sendWork2.show();
    },
    submitNo(){ //取消
      this.$refs.isRefult.hide();
    },
    sendWork2(){ //重新选择工单处理人员
      this.$refs.sendWork2.hide();
      this.detalrowdata.newuser_id = this.queryModel.vName;
      console.log(this.detalrowdata.newuser_id)
      this.dealWorks(this.detalrowdata);
    },
    tableInfos2Show(item){
      this.$http.post('/pc_ims/admin/inspectionlist_info',{ins_id:item.id})
      .then(res=>{
        if(res.data.code==0){
            let user_id = this.infoItem.user_id;
            this.infoItem = res.data.data.info;
            this.infoItem.user_id = user_id;
            this.infoItem.vuename = 'routing';
            //console.log(res.data);
            this.infoItem.desc = [
              {label:'巡检人员',value:this.infoItem.user_name},
              {label:'电话',value:this.infoItem.user_phone},
              {label:'巡检类型',value:this.infoItem.title},
              {label:'设备地点',value:this.infoItem.floorname},
              {label:'巡检设备',value:this.infoItem.devicename},
            ]
            if(item.now_state==4){
              this.infoItem.localDesc = {label:'现场处理情况',value:this.infoItem.complete_info};
              this.infoItem.localDesc2 = {label:'退回原因',value:this.infoItem.backExcuse};
            }else{
              this.infoItem.localDesc = {label:'现场处理情况',value:this.infoItem.complete_info};
            }
            //console.log(res.data)
            this.infoItem.tableData = {};
            this.infoItem.job_list = res.data.data.inspection_list;
            let th = [
              {prop:'serial',label:'序号',wid:30},
              {prop:'time',label:'日期'}];
            $.each(res.data.data.zhanshi[0],(n,k)=>{
              $.each(k,(n1,k1)=>{
                th.push({prop:'value'+n1,label:k1.name,type:k1.type,select:k1.select,point_id:k1.point_id});
              })
            })
            this.infoItem.tableData.th = th;
            let values = res.data.data.values;
            $.each(values,(n,k)=>{
              $.each(k.value,(n1,k1)=>{
                let key = 'value'+n1;
                k[key] = String(k1);
                k['serial'] = n+1;
              })
            })
            this.infoItem.tableData.data = values;
          }else{
            this.$message({
              type:'error',
              message:res.data.msg,
              duration:2000
            })
          }
      })
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
          {id:4,tit:'今日巡检完成率',val:res.data.data.percent+'%',color:'#4ae283'}];
        }else{
          this.$message({
            type:'error',
            message:res.data.msg
          })
        }
      })
    },
    getTableList(){
      this.$http.post('/pc_ims/admin/inspectiondata_user',{
        department_id:this.query.department,
        user_id:this.query.name,
        date:this.value7
      })
      .then(res => {
        if(res.data.code==0){
          $.each(res.data.data,(n,k)=>{
            res.data.data[n].serial = n+1;
          })
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
          $.each(res.data.data,(n,k)=>{
            res.data.data[n].serial = n+1;
          })
          this.table2.data = res.data.data;
        }else{
          this.$message({
            type:'error',
            message:res.data.msg
          })
        }
      })
    },
    getNameList(id){
        this.$http.post('/pc_ims/get_user',{department_id:id}).then(res=>{
          if(res.data.code==0){
            let data = res.data.data;
            $.each(data,(n,k)=>{
              data[n].value = data[n].user_id;
              data[n].label = data[n].truename;
            })
            this.names = data;
            if(id && id!=''){
              this.queryModel.examine = data;
              this.queryModel.examines = data;
            }else{
              this.queryModel.newNames = data;
            }
          }else{
            this.$message({
              type:'error',
              message:res.data.msg
            })
          }
        });
      },
      getDatasList(id){//采集数据点下拉框数据
        this.$http.post('/pc_ims/get_points',{device_id:id})
        .then(res=>{
          if(res.data.code==0){
            //console.log(res.data);
            let data = res.data.data;
            $.each(data,(n,k)=>{
              data[n].value = data[n].cate_id;
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
      getDepartList(){//专业
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
      getSystemList(){//系统
        this.$http.post('/pc_ims/get_sysmenu').then(res=>{
          if(res.data.code==0){
            let data = res.data.data;
            $.each(data,(n,k)=>{
              data[n].value = data[n].title;
              data[n].id = data[n].title;
            })
            this.query2.types= data;
          }else{
            this.$message({
              type:'error',
              message:res.data.msg
            })
          }
        });
      },
      getSystemIdList(){
        this.$http.post('/pc_ims/get_sysmenu').then(res=>{
          if(res.data.code==0){
            let data2 = res.data.data;
            $.each(data2,(n,k)=>{
              data2[n].value = data2[n].id;
              data2[n].label = data2[n].title;
            })
            this.queryModel.systems = data2;
            this.queryModel.systemss = data2;
          }else{
            this.$message({
              type:'error',
              message:res.data.msg
            })
          }
        });
      },
      getAreaList(id){//区域
        this.$http.post('/pc_ims/get_floor',{sys_id:id}).then(res=>{
          if(res.data.code==0){
            let data = res.data.data;
            //console.log(data)
            $.each(data,(n,k)=>{
              data[n].value = data[n].floor_id;
              data[n].label = data[n].floor_name;
            })
            this.queryModel.areas = data;
            this.queryModel.areass = data;
          }else{
            this.$message({
              type:'error',
              message:res.data.msg
            })
          }
        });
      },
      getDeviceList(val1,val2){//设备
        this.$http.post('/pc_ims/get_device',{floor_name:val1,sys_id:val2}).then(res=>{
          //console.log(res);
          if(res.data.code==0){
            let data = res.data.data;
            $.each(data,(n,k)=>{
              data[n].value = data[n].id;
              data[n].label = data[n].title;
            })
            this.queryModel.devices = data;
          }else{
            this.$message({
              type:'error',
              message:res.data.msg
            })
          }
        });
      }
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
        return res;
    }
  },
  mounted() {
      this.getTopData();
      this.getTableList();
      this.getModelList(this.queryModel);
      this.getNameList('');
      this.getSystemList();
      this.getSystemIdList();
      this.getDepartList();
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
   .sendWork2{
      height:1.97rem;
      width: 100%;
      paddidng-top:0.13rem;
      padding-left: 0.20rem;
      .oldName,.newName{
          width: 100%;
          font-size: 0.14rem;
          label{
              height:0.32rem;
              line-height:0.32rem; 
              color: #4f648b;   
          }
          span.namess{
              color: #ffa414;
          }
          .ChooseBox{
              height:0.4rem;
              width: 2.24rem;
              background-color: rgba(255, 255, 255, 0.01);
              border-radius: 0.04rem;
              border: solid 1px #1989fa;
              margin-top:0.07rem;
              span{
                  font-size: 0.14rem !important;
                  color: green!important;
              }
          }            
      }
    }
    .isRefTxt{
      height:1.75rem;
      width: 100%;
      text-align: center;
      font-size: 0.18rem;
      color: #b5d7ff;
      line-height:1.45rem;
  }
  .isRbtnBoxs{
      width: 100%;
      height:0.45rem;
      display:flex;
      overflow: hidden;
      border: 0.01rem solid #4a90e2;
      border-bottom-left-radius: 0.08rem;
      border-bottom-right-radius: 0.08rem;
      span{
          flex: 1;
          text-align: center;
          line-height:0.45rem;            
          font-size: 0.16rem;
          color: #fff;
          cursor: pointer;
          &:nth-child(1){
              border-right: 0.01rem solid #4a90e2;
          }
          &:active{
              background: #3b85ef;
          }
      }
  }
}
</style>
