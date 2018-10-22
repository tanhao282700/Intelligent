<!--
    代维系统 排班表
    范 2018-10-21
-->
<template>
  <div class="schedule autoComponent">
      <Header :datas="navsData"></Header>
      <Crumbs :data ='crumbs'/>
      <el-tabs class="tabBoxs" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane name="first">
            <span slot="label" class="tabItems">
                排班表
            </span>
            <ScheduleTable :isShowBtns="'no'"/>
        </el-tab-pane>
        <el-tab-pane name="second" >
            <span slot="label" class="tabItems">
                申请换班
            </span>
            <div class="boxs applyJob">
              <div class="leftpeo">
                <div>
                  <img :src="applyJob.img1" >
                </div>
                <div class="peoDetail">
                  <div class="demo-input-suffix">
                    申请人：
                    <span>{{applyJob.name}}</span>
                  </div>
                  <div class="demo-input-suffix">
                    联系电话：<span>{{applyJob.tel1}}</span>
                  </div>
                  <div class="demo-input-suffix">
                    申请人班次：<selectBox
                      class="selectDtl"
                      :options = 'peos' 
                      :value = "vpeo" 
                      placeholder="选择人员"
                      @change = 'change1'
                      />
                  </div>
                </div>
              </div>
              <Lines :top="20" :hei="150" class="centerLine"/>
              <div class="rightpeo">
                <div class="">
                  <div>
                    <img :src="applyJob.img1" >
                  </div>
                  <div class="peoDetail">
                    <div class="demo-input-suffix">
                      换班人：
                      <SelectBox 
                        :options = 'peos' 
                         class="selectDtl"
                        :value = "vpeo" 
                        :icon="'el-icon-d-caret'"
                        placeholder="选择人员"
                        @change = "change1"
                      />
                    </div>
                    <div class="demo-input-suffix">
                      联系电话：
                      <span></span>
                    </div>
                    <div class="demo-input-suffix">
                      换班班次：
                      <selectBox
                        class="selectDtl"
                      :options = 'peos' 
                      :value = "vpeo" 
                      placeholder="选择时间段"
                      @change = 'change2'/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="hbExcuse">
                <div>换班原因</div>
                <el-input  type="textarea" v-model="excuse"></el-input>
            </div>
        </el-tab-pane>
        <el-tab-pane name="thrid" >
            <span slot="label" class="tabItems">
                申请状态
            </span>
            <el-radio-group v-model="radio3">
              <el-radio-button label="待审核"></el-radio-button>
              <el-radio-button label="已审核"></el-radio-button>
              <el-radio-button label="我的处理"></el-radio-button>
            </el-radio-group>
        </el-tab-pane>
      </el-tabs>
      <transition name="fade">
        <div class="sceBtn btnBai1" v-show="activeName=='first'">
          <img src="../../../assets/img/AgentManage/export.png">
          <span>导出排班表</span>              
        </div>
      </transition>
        <Dialog ref="dialog" wid="910" hei="536" class="dialog">
          <div class="diaHei">换班申请</div>
          <div class="pBody">
            <div class="pBox">
              <div class="imgBox boxs">
                <img :src="dia.img1" alt="">
              </div>
              <div class="nameBox boxs">
                <div class="labelBox">
                  <label for="">申请人：</label>
                  <span v-text="dia.name1"></span>
                </div>
                <div class="labelBox">
                  <label for="">联系电话：</label>
                  <span v-text="dia.tel1"></span>
                </div>
                <div class="labelBox">
                  <label for="">申请人班次：</label>
                  <span v-text="dia.time1"></span>
                </div>
              </div>
            </div>
            <Lines :hei="125" :top="20" />
            <div class="pBox">
              <div class="imgBox boxs">
                <img :src="dia.img2" alt="">
              </div>
              <div class="nameBox boxs">
                <div class="labelBox">
                  <label for="">换班人：</label>
                  <span v-text="dia.name2"></span>
                </div>
                <div class="labelBox">
                  <label for="">联系电话：</label>
                  <span v-text="dia.tel2"></span>
                </div>
                <div class="labelBox">
                  <label for="">换班人班次：</label>
                  <span v-text="dia.time2"></span>
                </div>
              </div>
            </div>
          </div>
          <div class="reason">
            <div class="diaTit2">换班原因</div>
            <div class="reasonBox" v-text="dia.reason"></div>
          </div>
          <div class="time">
            <div class="diaTit2">申请时间</div>
            <span v-text="dia.applyTime"></span>
          </div>
          <div class="examFlag">
            <img class="rightBotm" v-show="dia.state==0" src="../../../assets/img/generation/isno.png" alt="">
            <img class="rightBotm" v-show="dia.state==1" src="../../../assets/img/generation/isok.png" alt="">
          </div>
          <div class="diaBtns" v-show="dia.state==-1">
            <div class="diabtn diabtn22" @click="isNo(indexNow,dia)">驳回</div>
            <div class="diabtn"  @click="isOk(indexNow,dia)">同意</div>
          </div>
        </Dialog>
  </div>
</template>

<script>

import '@/assets/css/fs_common.css'
import Header from '@/components/common/sysHead'
import utils from "../../../assets/js/utils.js";
import examine from '../components/schedule/examine';
import ScheduleTable from '../components/schedule/scheduleTable';
import SelectBox from '../components/schedule/selectBox'

export default {
  components:{
    'Examine':examine,
    'ScheduleTable':ScheduleTable,
    'Header':Header,
    'SelectBox':SelectBox
  },
  computed:{
      crumbs(){
        let res =['代维系统','排班表'];
        switch(this.activeName){
            case 'first':
                res.push('排班表');
            break;
            case 'second':
                res.push('申请换班');
            break;
            case 'thrid':
                res.push('申请状态');
            break;
        }
        return res;
    }
  },
  data () {
    return {
        excuse:'Ant Design是一个服务于企业级产品的设计体系，基于『确定』和『自然』的设计价值观和模块化的解决方案，让设计者专注 于更好的用户体验。',
        peos:[
          {},
          {}
        ],
        vpeo:'',
        radio3:'待审核',
        applyJob:{
          id:0,name:'王1',time:'2018-05-26 00:59~06:19',time2:'2018-05-27 07:59~14:19',name2:'白1',state:-1,img1:'http://img4.imgtn.bdimg.com/it/u=1652942597,4175456571&fm=26&gp=0.jpg',img2:'http://img0.imgtn.bdimg.com/it/u=2242889095,3429329643&fm=26&gp=0.jpg',tel1:'18349171744',tel2:'18349171722',reason:'Ant Design是一个服务于企业级产品的设计体系，基于『确定』和『自然』的设计价值观和模块化的解决方案，让设计者专注于更好的用户体验。'
        },
        navsData:{
          active:'item1',
          lists:[
              {id:0,name:'首页',route:'/AgentManage/normalUser'},
              {id:1,name:'排班表',route:'/AgentManage/normalUser/schedule'},
              {id:2,name:'工单',route:'/AgentManage/normalUser/workList'},
              {id:3,name:'巡检',route:'/AgentManage/normalUser/routing'},
              {id:4,name:'完成情况',route:'/AgentManage/normalUser/report'},
          ]
        },
        activeName: 'first',
        indexNow:-1,
        dia:{
          name1:'娃哈哈',
          tel1:'18349171744',
          time1:'2018-7-6 04:08 ~ 13:43',
          img1:'http://img4.imgtn.bdimg.com/it/u=1652942597,4175456571&fm=26&gp=0.jpg',
          name2:'娃哈哈2',
          tel2:'18349171722',
          time2:'2018-7-7 04:08 ~ 13:43',
          img2:'http://img0.imgtn.bdimg.com/it/u=2242889095,3429329643&fm=26&gp=0.jpg',
          reason:'Ant Design是一个服务于企业级产品的设计体系，基于『确定』和『自然』的设计价值观和模块化的解决方案，让设计者专注于更好的用户体验。',
          applyTime:'2018/09/04 04:44',
          state:'-1'
        }
    }
  },
  methods:{
    handleClick(tab, event) {
        let activeName = this.activeName;
        this.$router.replace({ path: `/AgentManage/normalUser/schedule/${activeName}`});     
      },
      search(val,type){
        console.log(val,type)
      },
      change1(){

      },
      change2(){

      },
      showInfo(i,item){
        this.dia = item;
        this.indexNow = i;
        this.$refs.dialog.show();
      },
      showInfoed(i,item){
        console.log(i)
        this.dia = item;
        this.$refs.dialog.show();
        console.log(this.$refs)
      }
  },
  created() {
     //配合路由 定位页面
      let val = (this.$router.history.current.fullPath).split('/AgentManage/normalUser/schedule')[1];
      if(val==''){
          this.activeName = 'first';
      }else{
          // console.log( val.split('/')[1])
          this.activeName = val.split('/')[1];
      }
  },
  mounted() {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped='scoped' type="text/less">
@import '../../../assets/css/tabs.less';
@import '../../../assets/css/comon.less';
.schedule{
  position: relative;
  width:100%;
  .tabBoxs{
    margin:0 2.2%;
    width:95.6%;
  }
  .hbExcuse{
    color:#4F648B;
    .vhLH(30);
  }
  .applyJob{
    width:100%;
    .vh(140);
    .vhLH(140);
    overflow:hidden;
    .leftpeo,.rightpeo{
      float:left;
      width:49.92%;
      padding:0 1.53%;
      img{
        width:11.48%;
        float:left;
        .vh(110);
        margin-top:3.06%;
        margin-right:3.06%;
      }
      .peoDetail{
        width:76.22%;
        float:left;
        .vh(110);
        margin-top:3.06%;
        .demo-input-suffix{
          .vh(34);
          .vhLH(34);
          width:100%;
          color:#4F648B;
          span{
            color:#93B7E2;
          }
          .selectDtl{
            width:47.86%;
          }
        }
      }
    }
    .centerLine{
      float:left;
      margin:1.53% 0;
    }
  }
  .sceBtn{
    position: absolute;
    right: 0.3rem;
    .vhTop(80);
    width: 9.81vw;
    background:#3A84EE;
    color:#fff;
    .vh(32);
    .vhLH(32);
    font-size: 0.14rem;
    img{
      width:1.02vw;
      .vh(16);
      margin-right:0.05rem;
      vertical-align:middle;
    }
  }
}
.dialog{
  .diaHei{
    .vh(50);
    background: rgba(0, 0, 0, 0.2);
    color: #fff;
    font-size: 0.16rem;
    text-indent: 0.20rem;
    .vhLH(50);
  }
  .examFlag{
    .rightBotm{
      position:absolute;
      bottom:0;
      right:0;
    }
  }
  .pBody{
    .vh(165);
    width: 100%;
    display: flex;

    .pBox{
      flex: 1;
      display: flex;
      padding-left: 0.2rem;
      padding-right: 0.2rem;
      .vhPT(20);
      .imgBox{
        width: 1rem;
        .vh(125);
        border-radius: 0.02rem;
        display: flex;
        justify-content: center;
        img{
          .vh(125);
        }

      }
      .nameBox{
        margin-left: 0.11rem;
        width: 3.05rem;
        .vh(125);
         border-radius: 0.02rem;
         padding-left: 0.2rem;
         .vhPT(10);
         font-size: 0.14rem;
         .labelBox{
           .vh(34);
           .vhLH(34);
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
      .vh(14);
      .vhLH(14);
    }
    .reason{
      .reasonBox{
        .vh(114);
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
          .vhLH(24);
          overflow-y: scroll;
          .vhMT(10);
          .vhPT(5);
          .vhPB(5);
          .vhMB(20);
      }
    }
    .time{
      span{
        display: inline-block;
        color: #b5d7ff;
        font-size: 0.14rem;
        .vhLH(14);
        .vhPT(10);
        text-indent: 0.2rem;
      }
    }
    .diaBtns{
      position: absolute;
      .vhMB(30);
      bottom: 0;
      right:0.3rem;
      .diabtn{
        float: left;
        text-align: center;
        .vhLH(32);       
        width: 0.9rem;
       .vh(32);
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
