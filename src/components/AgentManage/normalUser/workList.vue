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
              :options = 'jobs' 
              :value = "vJob" 
              :icon="'el-icon-d-caret'"
              placeholder="类别"
              @change = "change1"
            />
          </div>
          <div class="nameBoxs">
            <SelectBox 
              :options = 'names' 
              :value = "vName" 
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
      <Dialog wid="910" hei="686" ref="tableInfos2">
        <div class="tableInfos">
          <div class="infoHead">
            <span class="infoState" v-text="'人工派发'"></span>
          </div>
          <div class="rightHead">
            <span class="infoBusy" v-text="'普通'"></span>
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
                  <li v-for="(item,index) in dtlObj.tableDtl.data[0].device" :key="index">
                    <span class="taskLabel">{{item.label}}</span>
                    <span class="taskCont">{{item.type}}</span>
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
                    v-model="dtlObj.tableDtl.data[0].desc">
                  </el-input>
                </div> 
                <ul>
                  <li>
                    <span class="taskLabel">派发人员</span>
                    <span class="taskCont">本姑娘</span>
                  </li>
                  <li>
                    <span class="taskLabel">联系电话</span>
                    <span class="taskCont">18767678765</span>
                  </li>
                </ul>
                <div style="clear:both">
                  <div class="contLabel">现场处理情况</div>
                  <el-input
                    type="textarea"
                    :rows="2"
                    class="controlCont controlCont2"
                    placeholder="请输入内容"
                    v-model="dtlObj.tableDtl.data[0].backExcuse">
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
                      <img :src="item.src" v-for="item in dtlObj.tableDtl.data[0].imgs1">
                    </div>
                    <Lines :top="0" :hei="100" class="lines"/>
                    <div class="imgs2">
                      <img :src="item.src" v-for="item in dtlObj.tableDtl.data[0].imgs2">
                    </div>
                  </div>
                </div>
                <div class="btnsgroups">
                  <span class="infoBusy" v-text="'退单'"></span>
                  <span class="infoSend" v-text="'取消'"></span>
                  <span class="infoSubmit" v-text="'提交'"></span>
                </div>
              </div>
              <div v-show="tabPosition=='延期处理'" class="tabLists">
                
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
            <span>语雀是一款优雅高效的在线文档编辑与协同工具， 让每个企业轻松拥有文档中心阿里巴巴集团内部使用多年，众多中小企业首选。</span>
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
  </div>
</template>

<script>

import Header from '@/components/common/sysHead'
import utils from "../../../assets/js/utils.js";
import SelectBox from '@/components/form/selectBox';
import TimePickerT from '../components/work/timePickerTit2';
import State from './state';
import deal from './deal';
import Table from '@/components/common/table';
import RoutingTask from '../components/routing/routingTask'
import RoutingInfo from '../components/routing/routingInfo'
export default {
  components:{
    'Table':Table,
    'SelectBox':SelectBox,
    'TimePickerT':TimePickerT,
    'RoutingTask':RoutingTask,
    'RoutingInfo':RoutingInfo,
    'Header':Header
  },
  data () {
    return {
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
          value7:'7-20',
          tabs:[{
            'name':'今日工单总数',
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
              len:800, //总条数
              data:[
                  {id:1,u_id:1,name:'白狗汪1',type:'给排水系统',addr:'青羊区工业园区T区8栋9楼',eName:'二号会议室照明系统',sTime:'2018-08-27 11:35',info:'几水泵房水泵温度异',sType:'系统派发',state:-1,desc:'范珊看哪个阶段呢是范珊的咖啡店给你的肌肤喝点水放辣椒是非得失，反倒是',backExcuse:'范珊看哪个阶段呢是范珊的咖啡店给你的肌肤喝点水放辣椒是非得失，反倒是',
                  imgs1:[{
                      src:'../../../../assets/img/logo.png'
                    },{
                      src:'../../../../assets/img/logo.png'
                    },{
                      src:'../../../../assets/img/logo.png'
                    },{
                      src:'../../../../assets/img/logo.png'
                    },{
                      src:'../../../../assets/img/logo.png'
                    }],
                    imgs2:[{
                      src:'../../../../assets/img/logo.png'
                    },{
                      src:'../../../../assets/img/logo.png'
                    },{
                      src:'../../../../assets/img/logo.png'
                    },{
                      src:'../../../../assets/img/logo.png'
                    },{
                      src:'../../../../assets/img/logo.png'
                    }],
                  steps:[{
                    name:'派发时间',date:'2018/09/14',time:'09:13',areatime:'3h',
                  },{
                    name:'接单时间',date:'2018/09/16',time:'09:13',areatime:'48h'
                  },{
                    name:'派发时间',date:'2018/09/16',time:'11:15',areatime:'2h'
                  }],
                  device:[{
                    label:'类型',
                    type:'给排水系统'
                  },{
                    label:'设备类型',
                    type:'给排水系统'
                  },{
                    label:'设备地点',
                    type:'这边字宽130PX'
                  },{
                    label:'工单处理人员',
                    type:'李宏源'
                  }],
                }, 
                  {id:2,u_id:1,name:'白狗汪1',type:'给排水系统',addr:'青羊区工业园区T区8栋9楼',eName:'二号会议室照明系统',sTime:'2018-08-27 11:35',info:'几水泵房水泵温度异',sType:'系统派发',state:0}, 
                  {id:3,u_id:1,name:'白狗汪1',type:'给排水系统',addr:'青羊区工业园区T区8栋9楼',eName:'二号会议室照明系统',sTime:'2018-08-27 11:35',info:'几水泵房水泵温度异',sType:'系统派发',state:1}, 
                  {id:4,u_id:1,name:'白狗汪1',type:'给排水系统',addr:'青羊区工业园区T区8栋9楼',eName:'二号会议室照明系统',sTime:'2018-08-27 11:35',info:'几水泵房水泵温度异',sType:'系统派发',state:2}, 
                  {id:5,u_id:1,name:'白狗汪1',type:'给排水系统',addr:'青羊区工业园区T区8栋9楼',eName:'二号会议室照明系统',sTime:'2018-08-27 11:35',info:'几水泵房水泵温度异',sType:'系统派发',state:3}, 
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
    }
  },
  methods:{
    change1(val){ //选择
      this.vJob = val;
    },
    change2(val){ //选择
      this.vName = val;
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
        this.$http.post('/pc_ims/staff/jobinfo_user').then(res=> {
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
      },
      agree(item){ //同意
        alert('接单')
      },
      refult(item){//拒绝
        let state = item.dealed;
        if(state==0 || state==1 || state==2){ //退单
            this.dialogBoxs2 = {
                item:item,
                state0:0,
                txt:'是否确定退单'
            };
        }
        this.$refs.isRefult.show();
      },
      submitOk(){ //确认
        this.$refs.isRefult.hide();
        this.$refs.isRefult2.show();
        // this.dialogBoxs2 = {
        //         item:item,
        //         state0:0,
        //         txt:'反正就是一大堆文字咯'
        //     };
      },
      submitBack(){
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
          sys_name:'',
          type:'',
          pagenumber:'1',
          pagesize:'20'
        }).then(res=> {
           if(res.data.code==0){
             this.table.data = res.data.data;
             this.table.len = res.data.count;
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
          margin-bottom:0.44rem;
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
            margin-top:0.7rem;
            text-align:right;
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
    margin:1.08rem auto 0;
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
