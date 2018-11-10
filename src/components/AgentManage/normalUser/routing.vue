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

        </div>
      </div>
      <Dialog wid="910" hei="600" ref="tableInfos2">
          <div class="tableInfos">
              <div class="infoHead">
                <span class="infoName" v-text="'巡检详情'"></span>
                <span class="infoState" v-if="newData.item.now_value==0">未接单
                  <span class="infoBack" v-text="'退单'" @click="dealWork(newData,3,'d')"></span>
                </span>
                <span class="infoState" v-else-if="newData.item.now_value==1">
                  处理中
                </span>
                <span class="infoState" v-else-if="newData.item.now_value==2">已完成</span>
                <span class="infoState" v-else-if="newData.item.now_value==3">申请退单</span>
                <span class="infoState" v-else-if="newData.item.now_value==4">退单完成</span>
              </div>
              <div class="infoBoxs">
                <div class="routingTask">
                  <ul v-if="newData.desc && newData.desc.length>0">
                    <li class="job_det" v-for="(item,index) in newData.desc" :key="index">
                      <div class="taskDtl">
                          <div class="taskLabel" v-if="item">{{item.label}}</div>
                          <div class="taskCont">{{item.value}}</div>
                      </div>
                    </li>
                  </ul>
                  <div style="clear:both"></div>
                  <div class="routingDtl">
                    <div class="contLabel" v-text="'现场处理情况'"></div>
                    <el-input
                      type="textarea"
                      :rows="2"
                      :style="{color:'#fff'}"
                      class="controlCont controlCont2"
                      placeholder="请输入内容"
                      v-model="newData.item.complete_info">
                    </el-input>
                  </div>
                  <div class="contLabel" v-text="'巡检表格'"></div>
                  <div class="boxs routigtable" style="width:95.6%;margin:0 2.2%;">
                    <el-table
                      :height="table.hei"
                      :data="newData.tableData.data"
                      style="width: 100%">
                      <el-table-column :label="v.label" v-for="(v,i) in newData.tableData.th" :key="i">
                        <template slot-scope="scope">
                          <div>
                            <span v-if="scope.row.serial!=newData.tableData.data.length">
                              <!--  从后台获取的数据用input：readonly只读 -->
                              <el-input v-model="scope.row[v.prop]" placeholder=""  :readonly="(scope.row.serial!=newData.tableData.data.length)?true:false"></el-input>
                            </span>
                            <!--  最后一行数据判断是输入框还是下拉列表 无type 取值-->
                            <span v-else-if="scope.row.serial==newData.tableData.data.length && v.type!=0 && v.type!=1">
                              <el-input v-model="scope.row[v.prop]" placeholder="" :readonly="'readonly'"></el-input>
                            </span>
                            <!-- type=1 选择 -->
                            <span v-else-if="scope.row.serial==newData.tableData.data.length && v.type==1">
                              <el-select v-model="scope.row[v.prop]" placeholder="请选择" :class="(scope.row.serial==newData.tableData.data.length)?'':'noicon'">
                                <el-option v-for="(item,index) in v.select" :key="index" :label="item" :value="item">
                                </el-option>
                              </el-select>
                            </span>
                            <!-- type=0 输入 -->
                            <span v-else-if="scope.row.serial==newData.tableData.data.length && v.type=='0'">
                              <el-input v-model="scope.row[v.prop]" placeholder="请输入"></el-input>
                            </span>
                          </div>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                  <div v-if="newData.item.now_value==1" class="rightHead">
                    <span class="infoBusy" v-text="'提交'" @click="dealWork(newData,2,'d')"></span>
                  </div>
                  <div v-else-if="newData.item.now_value==0" class="rightHead">
                    <span class="infoBusy" v-text="'接单'" @click="agree(newData,1)"></span>
                  </div>
                </div>
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
import State from './state2';
import deal from './deal3';
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
        jobs:[],
        vJob:'',
        names:[],
        newData:{
          desc:[],
          item:{},
          localDesc2:{},
          tableData:{
            len:1,
            data:[],
            th:[{select:[]}],
            hei:'2.8rem'
          }
        },
        pOptions:[],        
        vName:-1,
        //日期选择
        value7:'8-24',
        cant:false,
        table:{
            // small:'small',
            hei:320, //table高度  设置后有滚动条
            len:0, //总条数
            data:[],
            th:[
              {prop:'index',label:'编号',minWid:'20%'},
              {prop:'title',label:'类别'},
              {prop:'floorname',label:'地点',wid:180},
              {prop:'addtime',label:'派发时间'},
              {prop:'dianwei',label:'点位'},
              {prop:'now_state',label:'状态',operate:true,
                render:(h,param)=>{
                  const btnss = {
                    fills:param.row.now_state
                  }
                  return h(State,{
                    props:{state:btnss}
                  })
                }},
              {prop:'dealed',label:'操作',
                operate: true,
                  render: (h, param)=> {
                      const btnss = {
                          item:param.row,
                      };
                      console.log(btnss.item)
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
        }
    }
  },
  methods:{
    change1(val){ //选择
      this.vJob = val;
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
    rowClick(row){
      this.rowData = row;
      this.$refs.tableInfos2.show();
      this.rowData.operate='check';
      this.$http.post('/pc_ims/staff/inspectiondata_info',{ins_id:row.id}).then(res=>{
          if(res.data.code==0){
            let data = res.data.data.info;
            let zhanshi = res.data.data.zhanshi;
            this.newData.item = data;
            this.newData.item.info = data.complete_info;
            this.newData.item.now_value = row.now_state;
            this.newData.item.user_id = row.user_id;
            this.newData.tableData.th = [
              {prop:'serial',label:'序号'},
              {prop:'time',label:'日期'}];
            $.each(res.data.data.zhanshi[0],(n,k)=>{
              $.each(k,(n1,k1)=>{
                this.newData.tableData.th.push({prop:'value'+n1,label:k1.name,type:k1.type,select:k1.select,point_id:k1.point_id});
              })
            })
            this.newData.desc = [
              {label:'类别',value:data.title},
              {label:'设备名称',value:data.devicename},
              {label:'设备地点',value:data.floorname},
              {label:'检查人员',value:data.user_name},
              {label:'电话',value:data.user_phone}
            ];

            let values = res.data.data.values;
            $.each(values,(n,k)=>{
              $.each(k.value,(n1,k1)=>{
                let key = 'value'+n1;
                k[key] = String(k1);
                k['serial'] = n+1;
              })
            })
            this.newData.tableData.data = values;
            if(this.newData.item.now_value==1){//只有接单时才显示要提交的form行
              this.newData.tableData.data.push({});
              this.newData.tableData.data[this.newData.tableData.data.length-1].serial = this.newData.tableData.data.length;
              this.newData.tableData.data[this.newData.tableData.data.length-1].time =utils.time(new Date()/1000,1);
            }
            
          }else{
            this.$message({
              type:'error',
              message:res.data.msg
            })
          }
      })
    },
    agree(item,type){ //同意
      //console.log(item.item)
        this.dealWork(item,1)
    },
    refult(item,type){//拒绝
       this.dealWork(item,3)
    },
    dealWork(item,type,three){
      if(three){
        item.id = item.item.id;
        if(item.item.user_id){
          item.user_id = ''
        }
        if(item.item.newuser_id){
          item.newuser_id = '';
        }
        console.log(item.item.complete_info)
        if(!item.item.complete_info){
          this.$message({
            type:'error',
            message:'请输入现场处理情况',
            duration:2000
          })
          return;
        }else{
          item.info = item.item.complete_info;
        }
        
        let data = this.newData.tableData.data;
        let th = this.newData.tableData.th;
        let zhanshi = {
          list:[]
        };
        let ress = false;
        if(type==2){
          $.each(th,(n,k)=>{
          if(k.point_id!=undefined){
           // console.log(data[0]);
             if(!data[data.length-1][k.prop]){
                this.$message({
                  type:'error',
                  message:'请输入'+k.label,
                  duration:2000
                })
                ress = true;
             }else{
                zhanshi.list.push({name:k.label,now_value:data[0][k.prop],point_id:k.point_id,type:k.type,select:k.select});
             }
             
          }
        })
        }
        
        
        if(ress){
          return;
        }
        item.form = zhanshi.list;
      }else{
        item = item.item;
        if(!item.info){
          item.info = '';
        }
        if(!item.newuser_id){
          item.newuser_id = ''
        }
        if(!item.list){
          item.form = {};
        }
      }
      this.$http.post('/pc_ims/admin/write_inspectionlist',{
        id:item.id,
        type:type,
        info:item.info,
        user_id:item.user_id,
        newuser_id:item.newuser_id,
        form:{list:JSON.stringify(item.form)}
      }).then(res=>{
        if(res.data.code==0){
          this.$message({
            type:'success',
            message:res.data.msg,
            duration:2000
          })
          this.$refs.tableInfos2.hide();
          this.getTableData();
        }else{
          this.$message({
            type:'error',
            message:res.data.msg,
            duration:2000
          })
        }

      })
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
        case 1:
          res = '处理中';
        break;
        case 2:
          res = '已完成';
        break;
        case 3:
          res = '申请退单';
        break;
        case 4:
          res = '退单完成';
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
    height:1.08rem;
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
    height:4.47rem;
    margin-top:0.2rem;
    margin-left: 0.3rem;
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
        top:0.24rem;
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
      .infoBack{
        position: absolute;
        top: 0.1rem;
        border: 1px solid #3c88f8;
        width: 1rem;
        height: 0.32rem;
        text-align: center;
        border-radius: 2px;
        right: 0.4rem;
        line-height: 0.32rem;
        font-size: 0.14rem;
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
  .routingTask{
  width:100%;
  height:100%;
  .taskDtl{
    width:100%;
    margin-top:0.11rem;
    overflow:hidden;
    padding:0 1.464vw;
    .taskLabel{
      float:left;
      padding:0 0.1rem;
      color:#4F648B;
    }
    .taskCont{
      float:left;
      padding:0 0.1rem;
      color:#B5D7FF;
    }
  }
  .job_det{
    float:left;
  }
  .el-th li{
    float:left;
    color:#fff;
  }
  .contLabel{
      line-height:0.54rem;
      padding:0 1.464vw;
      color:#4F648B;
  }
  .controlCont{
      padding:0 1.464vw;
  }
  .controlCont2{
    height:0.7rem;
    box-shadow:0px 0px 1px 0px rgba(87,113,176,0.15),0px 1px 2px 0px rgba(0,0,0,0.5);
    border-radius:1px;
  }
  .rightHead{
    bottom:0;
    left:3.57rem;
    position: absolute;
    line-height:0.52rem;
    color:#fff;
    .infoBusy{
      margin-top:0.09rem;
      display:inline-block;
      line-height:0.32rem;
      width:0.96rem;
      background:linear-gradient(360deg, #2772e3 0%, #4b94f9 100%);
      font-size:12px;
      border-radius:2px;
      text-align:center;
      margin-right:0.12rem;
      &:hover{
        cursor:pointer;
      }
    }
  }
}
}
</style>
