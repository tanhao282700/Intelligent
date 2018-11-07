<!--
    代维系统 工单
    范珊 2018-10-23
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
              :options = 'vSystems' 
              :value = "vsystem" 
              :icon="'el-icon-d-caret'"
              placeholder="类别"
              @change = "change1"
            />
          </div>
          <div class="nameBoxs">
            <SelectBox 
              :options = 'vTypes' 
              :value = "vtype" 
              :icon="'el-icon-d-caret'"
              placeholder="派发类别" 
              @change = "change2"
            />
          </div>
          <div class="searchBoxs" @click="getTableList">
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
            <span class="infoState" v-text="dtlObj.sendSrc"></span>
          </div>
          <div class="rightHead">
            <span class="infoBusy" v-text="dtlObj.jinji"></span>
          </div>
          <div class="infoBoxs">
            <div class="statusTabs">
              <el-radio-group v-model="tabPosition" @change="changeStatus">
                <el-radio-button label="正常处理">正常处理</el-radio-button>
                <Lines :hei="30" :top="0" />
                <el-radio-button label="延期处理">延期处理</el-radio-button>
                <Lines :hei="30" :top="0" />
              </el-radio-group>
            </div>
            <div>
              <div v-show="tabPosition=='正常处理'" class="tabLists">
                <ul>
                  <li v-for="(item,index) in dtlObj.devices" :key="index">
                    <span class="taskLabel">{{item.label}}</span>
                    <span class="taskCont">{{item.value}}</span>
                  </li>
                  </ul>
                </el-row>  
                <div>
                  <div class="contLabel">详情描述</div>
                  <el-input
                    type="textarea"
                    class="controlCont controlCont1"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="dtlObj.description">
                  </el-input>
                </div> 
                <ul>
                  <li>
                    <span class="taskLabel">派发人员</span>
                    <span class="taskCont">{{dtlObj.user_name}}</span>
                  </li>
                  <li>
                    <span class="taskLabel">联系电话</span>
                    <span class="taskCont">{{dtlObj.user_phone}}</span>
                  </li>
                </ul>
                <div style="clear:both">
                  <div class="contLabel">现场处理情况</div>
                  <el-input
                    type="textarea"
                    :rows="2"
                    class="controlCont controlCont2"
                    placeholder="请输入内容"
                    v-model="dtlObj.complete_info">
                  </el-input>
                </div>
                <div class="dealimg">
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <div>处理前</div>
                    </el-col>
                    <el-col :span="12">
                      <div>处理后</div>
                    </el-col>
                  </el-row>
                  <div>
                    <div class="imgs1">
                      <img :src="item.src" v-for="item in dtlObj.pic1">
                    </div>
                    <Lines :top="0" :hei="100" class="lines"/>
                    <div class="imgs2">
                      <img :src="item.src" v-for="item in dtlObj.pic2">
                    </div>
                  </div>
                </div>
                <div class="btnsgroups" v-show="dtlObj.now_state==0">
                  <span class="infoBusy" v-text="'退单'" @click="backWork(dtlObj,5)"></span>
                  <span class="infoSend" v-text="'取消'" @click="backWork(dtlObj,0)"></span>
                  <span class="infoSubmit" v-text="'提交'" @click="backWork(dtlObj,4)"></span>
                </div>
                <div class="btnsgroups" v-show="dtlObj.now_state==2 || dtlObj.now_state==3">
                  <span class="infoBusy" v-text="'退单'" @click="backWork(dtlObj,5)"></span>
                </div>
              </div>
              <div v-show="tabPosition=='延期处理'" class="tabLists">
                <ul>
                  <li v-for="(item,index) in dtlObj.devices" :key="index">
                    <span class="taskLabel">{{item.label}}</span>
                    <span class="taskCont">{{item.value}}</span>
                  </li>
                  </ul>
                </el-row>  
                <div>
                  <div class="contLabel">详情描述</div>
                  <el-input
                    type="textarea"
                    class="controlCont controlCont1"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="dtlObj.description">
                  </el-input>
                </div> 
                <ul>
                  <li>
                    <span class="taskLabel">派发人员</span>
                    <span class="taskCont">{{dtlObj.user_name}}</span>
                  </li>
                  <li>
                    <span class="taskLabel">联系电话</span>
                    <span class="taskCont">{{dtlObj.user_phone}}</span>
                  </li>
                </ul>
                <div style="clear:both" class="yuji">
                  <div class="contLabel">延后预计完成时间</div>
                  <div class="yujiDate">
                    <el-date-picker
                      v-model="value2"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                  </div>
                  <div class="yujitime"> 
                    <el-time-select
                      v-model="value1"
                      placeholder="选择时间">
                    </el-time-select>
                  </div>
                </div> 
                <div style="clear:both">
                  <div class="contLabel">现场处理情况</div>
                  <el-input
                    type="textarea"
                    :rows="2"
                    class="controlCont controlCont2"
                    placeholder="请输入内容"
                    v-model="dtlObj.complete_info">
                  </el-input>
                </div>
                <div class="btnsgroups" v-show="dtlObj.now_state==0">
                  <span class="infoBusy" v-text="'退单'" @click="backWork(dtlObj,5)"></span>
                  <span class="infoSend" v-text="'取消'" @click="backWork(dtlObj,0)"></span>
                  <span class="infoSubmit" v-text="'提交'" @click="backWork(dtlObj,4)"></span>
                </div>
                <div class="btnsgroups" v-show="dtlObj.now_state==2 || dtlObj.now_state==3">
                  <span class="infoBusy" v-text="'退单'" @click="backWork(dtlObj,5)"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>  
      <Dialog wid="3.64rem" hei="2.16rem" ref="isRefult"><!-- 同意退单 -->
          <div v-text="dialogBoxs.txt" class="isRefTxt"></div>
          <div class="isRbtnBoxs">
              <span @click="submitOk">确定</span>
              <span @click="submitNo">取消</span>
          </div>
      </Dialog> 
      <Dialog wid="564" hei="286" ref="isRefult2"><!-- 同意退单 -->
          <div class="isRefTit">退单原因</div>
          <div class="isRefDesc">
            <el-input type="textarea" v-model="dealWorkParam.info" placeholder="请输入退单原因"></el-input>
          </div>
          <div class="isRbtnBoxs2">
              <span @click="submitBack">提交</span>
          </div>
      </Dialog> 
      <Dialog wid="414" hei="256" ref="sendWork2"><!-- 重新选择工单处理人员 -->
          <div class="sendWork2">
              <div class="oldName">
                  <label for="">原处理人员：</label>
                  <span class="namess" v-text="dialogBoxs.item.name"></span>
              </div>
              <div class="newName">
                  <label for="">新工单处理人员：</label>
                  <div class="ChooseBox">
                      <SelectBox
                          :options = 'names' 
                          :value = "vName" 
                          placeholder='姓名'
                          @change = 'change2'
                      />
                  </div>
              </div>
          </div>
          <div class="sendWork2Boxs btnBai1" @click="sendWork2">
              <span>确定</span>
          </div>
      </Dialog>  
      <Dialog wid="364" hei="216" ref="isRefult"><!-- 同意退单 -->
          <div v-text="dialogBoxs.txt" class="isRefTxt"></div>
          <div class="isRbtnBoxs">
              <span @click="submitOk">确定</span>
              <span @click="submitNo">取消</span>
          </div>
      </Dialog>   
  </div>
</template>

<script>

import Header from '@/components/common/sysHead'
import utils from "../../../assets/js/utils.js";
import SelectBox from '@/components/form/selectBox';
import State from './state';
import deal from './deal';
import Table from '@/components/common/table';
export default {
  components:{
    'Table':Table,
    'SelectBox':SelectBox,
    'Header':Header
  },
  data () {
    return {
        value1:'',
        value2:'',
        navsData:{
          active:'item2',
          lists:[
              {id:0,name:'首页',route:'/AgentManage/normalUser'},
              {id:1,name:'排班表',route:'/AgentManage/normalUser/schedule'},
              {id:2,name:'工单',route:'/AgentManage/normalUser/workList'},
              {id:3,name:'巡检',route:'/AgentManage/normalUser/routing'},
              {id:4,name:'完成情况',route:'/AgentManage/normalUser/report'},
          ]
        },
        tabPosition:'正常处理',
        crumbs:['代维系统','工单'],
        workH:[],
        vSystems:[],
        vTypes:[
        {label:'系统自动派发',value:'0'},
        {label:'手工派发',value:'1'},
        {label:'投诉',value:'2'}],
        vtype:'',
        vsystem:'',
        names:[],
        dialogBoxs:{
            item:{name:''},
            state0:0, //1 同意，0拒绝
            txt:'是否确定退单'
        },
        dialogBoxs2:{
            item:{name:''},
            state0:0, //1 同意，0拒绝
            txt:'是否确定退单'
        },
        dtlObj:{
          title:'工单详情',
          sendSrc:'',
          jinji:'',
          pic1:[],
          pic2:[],
          devices:[],
        },
        vName:-1,
        //日期选择
        value7:'8-24',
        cant:false,
        table:{
            // small:'small',
            hei:328, //table高度  设置后有滚动条
            // len:800, //总条数
            data:[],
            th:[
              {prop:'id',label:'编号'},
              {prop:'title',label:'类别'},
              {prop:'floor',label:'地点',wid:180},
              {prop:'addtime',label:'派发时间'},
              {prop:'devicename',label:'设备名称'},
              {prop:'description',label:'内容描述'},
              {prop:'type_id',label:'派发类别'},
              {prop:'now_state',label:'状态',operate: true, 
                render: (h, param)=> {
                    const btnss = {
                        fills:param.row.now_state,  
                    };
                    return h(State,{
                    props: { state:btnss},
                    on:{}
                    });
                }},
              {prop:'dealed',label:'操作',wid:170,
              operate:true,
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
        infoItem:{},  //某个工单的详情
        dealWorkParam:{
          item:{
            id:'',
            user_id:''
          }
        }
    }
  },
  methods:{
    change1(val){ //选择
      this.vsystem = val;
    },
    change2(val){ //选择
      this.vtype = val;
    },
    changeStatus(val){//切换正常处理、延期处理
      console.log(val);
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
      rowClick(row){
        this.infoItem = row;
        this.$refs.tableInfos2.show();
        this.$http.post('/pc_ims/staff/jobinfo_user',{job_id:row.id}).
        then(res=> {
           if(res.data.code==0){

             this.dtlObj = res.data.data.info;
             this.dtlObj.pic1 = res.data.data.pic1;
             this.dtlObj.pic2 = res.data.data.pic2;
             if(this.dtlObj.priority==1){
                this.dtlObj.jinji='一般'
             }else if(this.dtlObj.priority==2){
                this.dtlObj.jinji ='普通'
             }else{
                this.dtlObj.jinji ='严重'
             }
             if(this.dtlObj.type_id==0){
                this.dtlObj.sendSrc='系统自动派发';
             }else if(this.dtlObj.type_id==1){
                this.dtlObj.sendSrc='手工派发';
             }else if(this.dtlObj.type_id==2){
                this.dtlObj.sendSrc='投诉工单';
             }else{
                this.dtlObj.sendSrc = '维保工单'
             }
             this.dtlObj.devices = [
             {label:'类型',value:this.dtlObj.sys_name},
             {label:'设备名称',value:this.dtlObj.device_name},
             {label:'设备地点',value:this.dtlObj.floor},
             {label:'工单处理人员',value:this.dtlObj.user_name}]
             // if(data.info.now_state==0){data.info.未接单 1：已接单，2：延期申请，3：延期审请通过，4：完成’)
              
           }else{
              this.$message({
                type:'error',
                message:res.data.msg
              })
           }
        })
      },
      agree(item,type){ //同意
        this.dealWorkParam = item;
        this.dealWorkParam.type = type;
        this.dealWork()
      },
      refult(item,type){//退单
        let state = item.dealed;
        if(state==0 || state==1 || state==2){ //退单
            this.dialogBoxs2 = {
                item:item,
                state0:0,
                txt:'是否确定退单'
            };
        }
        this.$refs.isRefult.show();
        this.dealWorkParam = item;
        this.dealWorkParam.type = type;
      },
      dealWork(){
        if(!this.dealWorkParam.info){
          this.dealWorkParam.info = '';
        }
        if(!this.dealWorkParam.pic1 || this.dealWorkParam.pic1.length==0){
          this.dealWorkParam.pic1 = [];
        }
        if(!this.dealWorkParam.pic2 || this.dealWorkParam.pic2.length==0){
          this.dealWorkParam.pic2 = [];
        }
        if(!this.dealWorkParam.end_time){
          this.dealWorkParam.end_time = ''
        }
        this.$http.post('/pc_ims/write_job',{
          id:this.dealWorkParam.item.id,
          type:this.dealWorkParam.type,
          pic1:this.dealWorkParam.pic1,
          pic2:this.dealWorkParam.pic2,
          end_time:this.dealWorkParam.end_time,
          user_id:this.dealWorkParam.item.user_id,
          new_user_id:'',
          info:this.dealWorkParam.info,
          dispatch_user_id:this.$store.state.userInfoTotal.userinfo.id
        })
        .then(res=>{
            if(res.data.code==0){
              this.$message({
                type:'success',
                message:res.data.msg,
                duration:2000
              })
              this.getTableList();
            }else{
              this.$message({
                type:'error',
                message:res.data.msg,
                duration:2000
              })
            }
        });
      },
      backWork(item,type){
        console.log(item.id)
        this.dealWorkParam = {
          item :{
            id:item.id,
            user_id:item.user_id
          },
          type:type,
          info:item.complete_info,
          end_time:item.end_time,
          pic1:item.pic1,
          pic2:item.pic2
        }
        this.dealWorkParam.type = type;
        if(type==0){
          this.$refs.tableInfos2.hide();
        }else{
          this.dealWork();
        }
      },
      submitOk(){ //确认
        this.$refs.isRefult.hide();
        this.$refs.isRefult2.show();
      },
      submitBack(){
        this.dealWork();
        this.$refs.isRefult2.hide();
      },
      submitNo(){ //取消
        this.$refs.isRefult.hide();
      },
      sendWork2(){ //重新派发工单
        this.$refs.sendWork2.hide();
      },
      sendWork(){
        this.$refs.send.show();
      },
      sendInfosShow(){

      },
      infoTit(state){
        let res = '';
        switch(state){
          case 0:
            res = '未接单';
          break;
          case 1:
            res = '延期审核中';
          break;
          case 2:
            res = '延期处理';
          break;
          case 3:
            res = '处理中';
          break;
          case 4:
            res = '已完成'
          break;
        }
        return res;
      } ,
      getTopData(){
        this.$http.post('/pc_ims/staff/jobdata').then(res=> {
           if(res.data.code==0){
             let data = res.data.data;
              this.workH = [{id:1,tit:'今日工单总数',val:data.count,color:'#f38a00'},
              {id:2,tit:'未完成',val:data.wei,color:'#f56c6c'},
              {id:3,tit:'已完成数量',val:data.wan,color:'#4AE283'}];
           }else{
              this.$message({
                type:'error',
                message:res.data.msg
              })
           }
        })
      },
      getTableList(){//有错，要改
        this.$http.post('/pc_ims/staff/jobdata_user',{
          sys_name:this.vsystem,
          type:this.vtype,
          pagenumber:'1',
          pagesize:'20'
        }).then(res=> {
           if(res.data.code==0){
             $.each(res.data.data,(n,k)=>{
                res.data.data[n].serial = (1 - 1) * 20 + 1 + n;

             })
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
      getSystemsOptions(){
        this.$http.post('/pc_ims/get_sysmenu').then(res=> {
           if(res.data.code==0){
              let data= res.data.data;
              $.each(data,(n,k)=>{
                data[n].label = data[n].title;
                data[n].value = data[n].title;
              })
              this.vSystems = data;
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
    this.getTopData();
    this.getTableList();
    this.getSystemsOptions();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped='scoped' type="text/less">
@import '../../../assets/css/comon.less';

.workBox{
  width:100%;height:100%;
  .workHead{
    width: 95.6%;
    .vh(108);
    margin-left: 2.2%;
    display: flex;
    .vhMT(8);
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
      box-shadow: 0px 4px 10px 0px 
          rgba(74, 144, 226, 0.4), 
          inset 1px 1px 2px 0px 
          rgba(248, 253, 255, 0.15), 
          inset 0px -1px 1px 0px 
          #4a90e2;
      background-color: rgba(51, 51, 51, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &:hover{
        background-color:rgba(58, 137, 249, 0.3);
      }
      i{
        font-size: 0.32rem;
        color: #3b85ef;
      }
    }
  }
  .tableInfos{
    width: 100%;
    height: 8rem;
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
        color:#FFA414;
        font-size:0.16rem;
      }
      .infoType{
        font-size: 0.12rem;
      }
    }
    .rightHead{
        position: absolute;
        right: 0.3rem;
        .vhLH(52);
        color:#fff;
        top:0;
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
      }
      .infoBoxs{
        padding-top:0.22rem;
        text-align:center;
        .statusTabs{
          margin-bottom:0.34rem;
        }
        .tabLists{
          padding:0 0.2rem;
          ul{
            li{
              float:left;
              text-align:left;
              width:25%;
              line-height:0.34rem;
            }
          }
          .dealimg{
            width:8.1rem;
            text-align:left;
            margin-top:0.2rem;
            color:#4F648B;
            line-height:0.24rem;
            overflow:hidden;
            .lines{
              width:0.01rem;
              float:left;
              margin:0 0.1rem;
            }
            .imgs1,.imgs2{
              float:left;
              width:3.9rem;
              height:1rem;
              white-space: nowrap;
              overflow:hidden;
              img{
                width:0.9rem;
                height:0.9rem;
                margin:0.015rem;
              }
            }
          }
          .btnsgroups{
            position:absolute;
            bottom:0.2rem;
            right:0.2rem;
            color:#fff;
            .infoBusy{
              display:inline-block;
              width:0.96rem;
              text-align:center;
              background:rgba(58,132,238,0);
              border-radius:2px;
              height:0.32rem;
              line-height:0.32rem;
              border:1px solid rgba(25,137,250,1)
            }
            .infoSend{
              display:inline-block;
              width:0.96rem;
              text-align:center;
              background:rgba(22,68,136,1);
              border-radius:2px;
              height:0.32rem;
              line-height:0.32rem;
            }
            .infoSubmit{
              text-align:center;
              display:inline-block;
              width:0.96rem;
              background:rgba(58,132,238,1);
              border-radius:2px;
              height:0.32rem;
              line-height:0.32rem;
              border:1px solid rgba(25,137,250,1)
            }
          }
          .controlCont1{
            background:rgba(0,24,56,1);
            box-shadow:0px 0px 1px 0px rgba(87,113,176,0.15),0px 1px 2px 0px rgba(0,0,0,0.5);
            border-radius:1px;
            height:0.5rem;
          }
          .controlCont2{
            background:rgba(0,36,85,1);
            box-shadow:0px 0px 1px 0px rgba(87,113,176,0.15),0px 1px 2px 0px rgba(0,0,0,0.5);
            border-radius:1px;
            height:0.7rem;
            border:1px solid rgba(0,47,132,1);
          }
          .taskLabel{
            padding:0;
            color:#4F648B;
            text-align:left;
            margin-right:0.1rem;
          }
          .contLabel{
            text-align:left;
            color:#4F648B;
            line-height:0.34rem;
          }
          .taskCont{
            color:#fff;
            text-align:left;
          }
          .yuji{
            width:100%;
            height:0.34rem;
            margin-bottom:0.2rem;
            .contLabel,.yujiDate,.yujitime{
              float:left;
              margin-right:0.15rem;
            }
            .yujiDate{
              margin-right:0.05rem;
            }
          }
        }
      }
  }
  .sendWork2{
      .vh(197);
      width: 100%;
      .vhPT(13);
      padding-left: 0.20rem;
      .oldName,.newName{
          width: 100%;
          font-size: 0.14rem;
          label{
              .vh(32);
              .vhLH(32); 
              color: #4f648b;   
          }
          span.namess{
              color: #ffa414;
          }
          .ChooseBox{
              .vh(40);
              width: 2.24rem;
              background-color: rgba(255, 255, 255, 0.01);
              border-radius: 0.04rem;
              border: solid 1px #1989fa;
              .vhMT(7);
              span{
                  font-size: 0.14rem !important;
                  color: green!important;
              }
          }            
      }
    }
    .sendWork2Boxs{
        width: 3.84rem;
        .vh(43);
        margin-left: 0.15rem;
    }
}
.isRefTxt{
    height:1.72rem;
    width: 100%;
    text-align: center;
    font-size: 0.18rem;
    color: #b5d7ff;
    line-height:1.72rem;
}
.isRbtnBoxs{
    width: 100%;
    height:0.44rem;
    display:flex;
    overflow: hidden;
    border: 0.01rem solid #4a90e2;
    border-bottom-left-radius: 0.08rem;
    border-bottom-right-radius: 0.08rem;
    span{
        flex: 1;
        text-align: center;
        line-height:0.44rem;           
        font-size: 0.16rem;
        color: #fff;
        cursor: pointer;
        &:nth-child(1){
            border-right: 0.01rem solid #4a90e2;
        }
        &:hover{
            background: #3b85ef;
        }
    }
}
.isRefTit{
  text-align:left;
  height:0.5rem;
  line-height:0.5rem;
  color:#fff;
  padding:0 0.2rem;
  font-size:0.16rem;
}
.isRefDesc{
  padding:0.26rem 0.34rem 0.24rem;
  color:#fff;
  line-height:0.26rem;
}
.isRbtnBoxs2{
    width: 100%;
    .vh(32);
    .vhLH(32);
    display:flex;
    width:17.94%;
    overflow: hidden;
    border: 0.01rem solid #4a90e2;
    background:#3B85EF;
    border-radius: 0.02rem;
    margin:0.2rem auto 0;
    span{
        flex: 1;
        text-align: center;
        .vhLH(32);            
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
</style>
