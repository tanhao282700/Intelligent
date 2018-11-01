<!--
    代维系统 排班表
    白 2018-8-21
-->
<template>
  <div class="schedule">
      <Crumbs :data ='crumbs'/>
      <el-tabs class="tabBoxs" v-model="activeName" @tab-click="handleClick">
              <el-tab-pane name="first">
                  <span slot="label" class="tabItems">
                      排班表
                  </span>
                  <ScheduleTable :isShowBtns="'yes'"/>
              </el-tab-pane>
              <el-tab-pane name="second" >
                  <span slot="label" class="tabItems">
                      未审核
                  </span>
                  <Examine 
                    :data = 'examData1' 
                    @search = "(val)=>search(val,1)"
                    @showInfo = "showInfo"
                    @isNo = "isNo"
                     @isOk = "isOk"
                  />
              </el-tab-pane>
              <el-tab-pane name="thrid" >
                  <span slot="label" class="tabItems">
                      已审核
                  </span>
                  <Examine 
                    :data = 'examData2'  
                    @search = "(val)=>search(val,2)" 
                    @showInfo = "showInfoed"/>
              </el-tab-pane>
          </el-tabs>
          <transition name="fade">
            <div class="sceBtn btnBai1" v-show="activeName=='first'" @click="exportTable">
              <img src="../../assets/img/AgentManage/export.png">
              <span>导出排班表</span>              
            </div>
          </transition>
        <Dialog ref="dialog" wid="910" hei="536" class="dialog">
          <div class="diaHei">换班申请</div>
          <div class="pBody">
            <div class="pBox">
              <div class="imgBox boxs">
                <img src="../../assets/img/AgentManage/head.png" alt="">
              </div>
              <div class="nameBox boxs">
                <div class="labelBox">
                  <label for="">申请人：</label>
                  <span v-text="dia.old_truename"></span>
                </div>
                <div class="labelBox">
                  <label for="">联系电话：</label>
                  <span v-text="dia.old_phone"></span>
                </div>
                <div class="labelBox">
                  <label for="">申请人班次：</label>
                  <span v-text="dia.olde_workdate+' '+dia.oldstarttime+'~'+dia.oldendtime"></span>
                </div>
              </div>
            </div>
            <Lines :hei="125" :top="20" />
            <div class="pBox">
              <div class="imgBox boxs">
                <img src="../../assets/img/AgentManage/head.png" alt="">
              </div>
              <div class="nameBox boxs">
                <div class="labelBox">
                  <label for="">换班人：</label>
                  <span v-text="dia.new_truename"></span>
                </div>
                <div class="labelBox">
                  <label for="">联系电话：</label>
                  <span v-text="dia.now_phone"></span>
                </div>
                <div class="labelBox">
                  <label for="">换班人班次：</label>
                  <span v-text="dia.new_truename+' '+dia.newstarttime+'~'+dia.newendtime"></span>
                </div>
              </div>
            </div>
          </div>
          <div class="reason">
            <div class="diaTit2">换班原因</div>
            <div class="reasonBox" v-text="dia.description"></div>
          </div>
          <div class="time">
            <div class="diaTit2">申请时间</div>
            <span v-text="dia.addtime"></span>
          </div>
          <div class="examFlag">
            <img class="rightBotm" v-show="dia.state==0" src="../../assets/img/generation/isno.png" alt="">
            <img class="rightBotm" v-show="dia.state==1" src="../../assets/img/generation/isok.png" alt="">
          </div>
          <div class="diaBtns" v-show="dia.state==-1">
            <div class="diabtn diabtn22" @click="isNo(dia)">驳回</div>
            <div class="diabtn"  @click="isOk(dia)">同意</div>
          </div>
        </Dialog>
  </div>
</template>

<script>

import '@/assets/css/fs_common.css'
import utils from "../../assets/js/utils.js";
import examine from './components/schedule/examine';
import ScheduleTable from './components/schedule/scheduleTable';

export default {
  components:{
    'Examine':examine,
    'ScheduleTable':ScheduleTable
  },
  computed:{
      crumbs(){
        let res =['代维系统','排班表'];
        switch(this.activeName){
            case 'first':
                res.push('排班表');
            break;
            case 'second':
                res.push('未审核');
            break;
            case 'thrid':
                res.push('已审核');
            break;
        }
        return res;
    }
  },
  data () {
    return {
        activeName: 'first',
        examData1:[],  //state状态 -1未审核 0审核失败 1审核通过
        examData2:[],
        indexNow:-1,
        dia:{}
    }
  },
  methods:{
    handleClick(tab, event) {
        let activeName = this.activeName;
        this.$router.replace({ path: `/AgentManage/schedule/${activeName}`});     
      },
      search(val,type){
        console.log(val,type)
      },
      isNo(item){//*****************待调
        item.state = 0;
        this.$refs.dialog.hide();
        this.dealSchedule(11,item.id);
      },
      isOk(item){//****************待调
        item.state = 1;
        this.$refs.dialog.hide();
        this.dealSchedule(2,item.id);
      },
      dealSchedule(type,id){//*******************待调
        this.$http.post('/pc_ims/admin/dispose_work',{type:type,id:id})
        .then(res=>{
            this.getNoData();
            this.getYesData();
        })
      },
      showInfo(item){
        console.log(item);
        this.dia = item;
        this.$refs.dialog.show();
      },
      showInfoed(item){
        console.log(item);
        this.dia = item;
        this.$refs.dialog.show();
      },
      exportTable(){
        this.$http.get('/pc_ims/down/admin_work_list',{
          year:'2018',
          month:'07'
        }).then(function(res) {
           console.log(res);
        })
      },
      getYesData(){//已审核的排班
        this.$http.post('/pc_ims/admin/approve_work').then(res=> {
           if(res.data.code==0){
              console.log(res.data);
              let data = res.data.data;
              $.each(data,(n,k)=>{
                if(data[n].now_process==2){
                  data[n].state = 1;
                }else if(data[n].now_process==11){
                  data[n].state = 0;
                }
              })
              this.examData2 = data;
           }else{
              this.$message({
                type:'error',
                message:res.data.msg
              })
           }
        })
      },
      getNoData(){//待审核的排班
        this.$http.post('/pc_ims/admin/get_worklist').then(res=> {
           if(res.data.code==0){
              let data = res.data.data;
              $.each(data,(n,k)=>{
                  data[n].state= -1;
                  data[n].olde_workdate = data[n].oldworkdate;
                  data[n].new_workdate = data[n].newworkdate; 
              })
              this.examData1 = data;
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
     //配合路由 定位页面
      let val = (this.$router.history.current.fullPath).split('/AgentManage/schedule')[1];
      if(val==''){
          this.activeName = 'first';
      }else{
          // console.log( val.split('/')[1])
          this.activeName = val.split('/')[1];
      }
  },
  mounted() {
    this.getNoData();
    this.getYesData();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped='scoped' type="text/less">
@import '../../assets/css/tabs.less';
@import '../../assets/css/comon.less';
.schedule{
  position: relative;
  width:100%;
  .tabBoxs{
    margin:0 2.2%;
  }
  .sceBtn{
    position: absolute;
    right: 0.3rem;
    top:0;
    margin-top:0.3rem;
    width: 9.81vw;
    background:#3A84EE;
    color:#fff;
    height:0.32rem;
    line-height:0.32rem;
    font-size: 0.14rem;
    img{
      width:1.02vw;
      height:0.16rem;
      margin-right:0.05rem;
      vertical-align:middle;
    }
  }
}
.dialog{
  .diaHei{
    height:0.5rem;
    background: rgba(0, 0, 0, 0.2);
    color: #fff;
    font-size: 0.16rem;
    text-indent: 0.20rem;
    line-height:0.5rem;
  }
  .examFlag{
    .rightBotm{
      position:absolute;
      bottom:0;
      right:0;
    }
  }
  .pBody{
    height:1.65rem;
    width: 100%;
    display: flex;

    .pBox{
      flex: 1;
      display: flex;
      padding-left: 0.2rem;
      padding-right: 0.2rem;
      padding-top:0.2rem;
      .imgBox{
        width: 1rem;
        height:1.25rem;
        border-radius: 0.02rem;
        display: flex;
        justify-content: center;
        img{
          height:1.25rem;
        }

      }
      .nameBox{
        margin-left: 0.11rem;
        width: 3.05rem;
        height:1.25rem;
         border-radius: 0.02rem;
         padding-left: 0.2rem;
         padding-top:0.1rem;
         font-size: 0.14rem;
         .labelBox{
           height:0.34rem;
           line-height:0.34rem;
           label{
             color: #4f648b;
           }
           span{
             color: #93b7e2;
             text-indent: 0.1rem;
           }
         }
      }
    }   
  }
  .diaTit2{
      font-size: 0.14rem;
      padding-left: 0.2rem;
      color: #4f648b;
      height:0.14rem;
      line-height:0.14rem;
    }
    .reason{
      .reasonBox{
        height:1.14rem;
        width:8.75rem;
        margin-left: 0.2rem;
        background-color: #001838;
        box-shadow: 0px 0px 2px 0px 
          rgba(87, 113, 176, 0.15), 
          inset 0px 1px 3px 0px 
          rgba(0, 0, 0, 0.5);
          padding: 0 0.1rem;
          color: #ffa414;
          font-size: 0.14rem;
          line-height:0.24rem;
          overflow-y: scroll;
          margin-top:0.1rem;
          padding-top:0.05rem;
          padding-bottom:0.05rem;
          mrgin-bottom:0.2rem;
      }
    }
    .time{
      span{
        display: inline-block;
        color: #b5d7ff;
        font-size: 0.14rem;
        line-height:0.14rem;
        padding-top:0.1rem;
        text-indent: 0.2rem;
      }
    }
    .diaBtns{
      position: absolute;
      margin-bottom:0.3rem;
      bottom: 0;
      right:0.3rem;
      .diabtn{
        float: left;
        text-align: center;
        line-height:0.32rem;       
        width: 0.9rem;
        height:0.32rem; 
        border-radius: 0.04rem;
        border: solid 0.01rem ;
        color: #fff;
        background-color: #164488;
        border-color: #164488;
        cursor: pointer;
        &:active{
          background-color: #3a84ee;
          border-color: #1989fa;
        }
        &.diabtn22{
          margin-right: 0.12rem;
        }
      }
    }
}
</style>
