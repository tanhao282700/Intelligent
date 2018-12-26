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
                  <ScheduleTable :isShowBtns="'yes'" :data="paibanList" @getPaibanData="getPaiBanData" @saveAddPaiBan='saveAddPaiBan' @editSchedule="editSchedule" @getBancis="getBancis"/>
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
            <div class="sceBtn btnBai1" v-show="activeName=='first'" @click="exportTableList">
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
            <img class="rightBotm" v-show="dia.state==1" src="../../assets/img/AgentManage/approval.png" alt="">
            <img class="rightBotm" v-show="dia.state==0" src="../../assets/img/AgentManage/refuse.png" alt="">
          </div>
          <div class="diaBtns" v-show="dia.state==-1">
            <div class="diabtn diabtn22" @click="isNo(dia,dia.index)">驳回</div>
            <div class="diabtn"  @click="isOk(dia,dia.index)">同意</div>
          </div>
        </Dialog>
        <Dialog ref="edit" wid="4.16rem" hei="4.27rem" class="dialog" >
          <div class="editBox">
            <div class="addBanci">
              <ul>
                <li v-for="item in editDatas">
                  <el-input v-model="item.title" placeholder="请输入班次名"></el-input>
                  <!-- <el-select v-model="item.timearea" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select> -->
                  <el-time-picker
                    is-range
                    v-model="item.timearea"
                    format="HH:mm"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    placeholder="选择时间范围">
                  </el-time-picker>
                </li>
              </ul>
              <el-button class="addEdit" @click="addSchedule">新增</el-button>
            </div>
            <el-button class="submitEdit" @click="sure">确定</el-button>
          </div>
        </Dialog>
  </div>
</template>

<script>

import '@/assets/css/fs_common.css'
import utils from "../../assets/js/utils.js";
import examine from './components/schedule/examine';
import ScheduleTable from './components/schedule/scheduleTable';
import axios from 'axios'

export default {
  components:{
    'Examine':examine,
    'ScheduleTable':ScheduleTable,
  },
  computed:{
      crumbs(){
        let res =['代维系统','排班表'];
        return res;
    }
  },
  data () {
    return {
        activeName: 'first',
        examData1:[],  //state状态 -1未审核 0审核失败 1审核通过
        examData2:[],
        indexNow:-1,
        dia:{},
        editDatas:[{}],
        options:[],
        paibanList:[],
        exportTable:'',
        topDate:'',
    }
  },
  methods:{
    //自定义班次下拉列表怎么取值
    sure(){
      let content = [];
      let ary = [];
      $.each(this.editDatas,(n,k)=>{
          if(k.title && k.title!=''){
            ary.push(k.title);
          }
      })
      let nary=ary.slice().sort();
        for(let i=0;i<ary.length;i++){
            if (nary[i]==nary[i+1]){
                this.$message({
                  type:'error',
                  message:'不能输入相同的班次名称',
                  duration:2000
                })
                return;
            }
        }    
      $.each(this.editDatas,(n,k)=>{
          if(k.title != '' && k.title){//班次名称有值的时候
            content.push({title:k.title,starttime:utils.time(new Date(k.timearea[0])/1000,11),endtime:utils.time(new Date(k.timearea[1])/1000,11),id:k.id});
          }
      })
      this.$http.post('/app_ims/set_worklist',{'content':JSON.stringify(content)})
      .then(res=>{
          if(res.data.code==1){
            this.$message({
              type:'error',
              message:res.data.msg,
              duration:2000
            })
          }else{
            this.$message({
              type:'success',
              message:'班次新增成功',
              duration:2000
            })
            this.$refs.edit.hide();
          }
      })
    },
    getBancis(arr){//获取现有班次
        this.editDatas = arr;
    },
    addSchedule(){//点击自定义班次-新增
      this.editDatas.push({id:0});
    },
    editSchedule(){//编辑自定义班次
      let arr = [];
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      if (month < 10) {
          month = "0" + month;
      }
      if (day < 10) {
          day = "0" + day;
      }
      var nowDate = year + "-" + month + "-" + day;

      $.each(this.editDatas,(n,k)=>{
        if(k.label && k.label!=''){
          let time = '';
          if(k.timearea){
            time = k.timearea.split('~')
            //console.log(time)
          }
          arr.push({title:k.label,timearea:[nowDate+' '+time[0],nowDate+' '+time[1]],id:k.id})

        }
      })
      this.editDatas = arr;
      this.$refs.edit.show();
    },
    handleClick(tab, event) {
        let activeName = this.activeName;
        this.$router.replace({ path: `/AgentManage/schedule/${activeName}`});     
      },
      search(val,type){
        if(type==1){
          this.getNoData(val);
        }else if(type==2){
          this.getYesData(val)
        }
        console.log(val,type)
      },
      isNo(item,index){//*****************待调
        item.state = 0;
        this.$refs.dialog.hide();
        this.dealSchedule(11,item.id,index);
      },
      isOk(item,index){//****************待调
        item.state = 1;
        this.$refs.dialog.hide();
        this.dealSchedule(2,item.id,index,);
      },
      dealSchedule(type,id,index){//*******************待调
        this.$http.post('/pc_ims/admin/dispose_work',{type:type,id:id})
        .then(res=>{
            this.examData1.splice(index,1);
            this.getNoData();
            this.getYesData();
        })
      },
      showInfo(item,i){
        this.dia = item;
        this.dia.index = i;
        this.$refs.dialog.show();
      },
      showInfoed(item){
        //console.log(item);
        this.dia = item;
        this.$refs.dialog.show();
      },
      exportTableList(){
        window.open('https://tesing.china-tillage.com/pc_ims/down/admin_work_list?year='+this.topDate.split('-')[0]+'&month='+this.topDate.split('-')[1]+'&Authorization='+this.$store.state.userInfoTotal.userinfo.password + "_" + this.$store.state.projectId + "_" + this.$store.state.userId);
      },
      getYesData(val){//已审核的排班
        if(!val){
          val==''
        }
        this.$http.post('/pc_ims/admin/approve_work',{key_word:val}).then(res=> {
           if(res.data.code==0){
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
      getNoData(val){//待审核的排班
        if(!val){
          val == ''
        }
        this.$http.post('/pc_ims/admin/get_worklist',{key_word:val}).then(res=> {
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
      },
      saveAddPaiBan(param){
        this.$http.post('/pc_ims/set_work',param).then(res=>{
            if(res.data.code==0){
              this.$message({
                type:'success',
                message:res.data.msg
              })
              this.getPaibanData();
            }else{
              this.$message({
                type:'error',
                message:res.data.msg
              })
            }
        });
      },
      getPaiBanData(value7){//获取排班数据
          let _this = this;
          if(!value7){
            value7 = utils.time(new Date()/1000,9);
          }
          this.topDate = value7;
          this.$http.post('/pc_ims/admin/work_list',{year:value7.split('-')[0],month:value7.split('-')[1]})
          .then(function (res) {
              if(res.data.code==0){
                  let data = res.data.data;
                  $.each(data,function(n,k){
                      data[n].allow = false;
                  })
                  _this.paibanList = res.data.data;
              }else{
                _this.$message({
                  type:'error',
                  message:res.data.msg
                })
             }
          });
      },
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
    this.getPaiBanData();
    this.getBancis();
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
    top:0.4rem;
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
    span{
      color:#fff;
      &:hover{
        color:#cdcdcd;
      }
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
      bottom:-0.1rem;
      right:-0.1rem;
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
    .editBox{
      padding:0.2rem 0.16rem;
      li{
        margin-bottom:0.07rem;
      }
      .addBanci{
        height:3.33rem;
        width:100%;
        overflow:overlay;
      }
    }
    .addEdit,.submitEdit{
      width:100%;
      height:0.3rem;
      font-size:0.14rem;
      background:transparent;
      border-color:#1989fa;
      color:#fff;
      line-height:0.3rem;
    }
    .submitEdit{
      width:3.86rem;
      position:absolute;
      bottom:0.15rem;
      left:0.15rem;
      height:0.44rem;
      line-height:0.44rem;
      background:#1989fa;
    }
}
</style>
