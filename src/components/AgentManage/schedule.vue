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
                  <ScheduleTable/>
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
                  <Examine :data = 'examData2'  @search = "(val)=>search(val,2)"/>
              </el-tab-pane>
          </el-tabs>
          <transition name="fade">
            <div class="sceBtn btnBai1" v-show="activeName=='first'">
              <i class="el-icon-download"></i>
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
          <div class="diaBtns">
            <div class="diabtn diabtn22" @click="isNo(indexNow,dia)">驳回</div>
            <div class="diabtn"  @click="isOk(indexNow,dia)">同意</div>
          </div>
        </Dialog>
  </div>
</template>

<script>


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
        examData1:[  //state状态 -1未审核 0审核失败 1审核通过 
          {id:0,name:'王1',time:'2018-05-26 00:59~06:19',time2:'2018-05-27 07:59~14:19',name2:'白1',state:-1}, 
          {id:0,name:'王2',time:'2018-05-26 00:59~06:19',time2:'2018-05-27 07:59~14:19',name2:'白2',state:-1},
          {id:0,name:'王3',time:'2018-05-26 00:59~06:19',time2:'2018-05-27 07:59~14:19',name2:'白3',state:-1},
          {id:0,name:'王4',time:'2018-05-26 00:59~06:19',time2:'2018-05-27 07:59~14:19',name2:'白4',state:-1},
          {id:0,name:'王5',time:'2018-05-26 00:59~06:19',time2:'2018-05-27 07:59~14:19',name2:'白5',state:-1},
          {id:0,name:'王6',time:'2018-05-26 00:59~06:19',time2:'2018-05-27 07:59~14:19',name2:'白6',state:-1},
          {id:0,name:'王7',time:'2018-05-26 00:59~06:19',time2:'2018-05-27 07:59~14:19',name2:'白7',state:-1},
          {id:0,name:'王8',time:'2018-05-26 00:59~06:19',time2:'2018-05-27 07:59~14:19',name2:'白8',state:-1},
          {id:0,name:'王9',time:'2018-05-26 00:59~06:19',time2:'2018-05-27 07:59~14:19',name2:'白9',state:-1},
          {id:0,name:'王10',time:'2018-05-26 00:59~06:19',time2:'2018-05-27 07:59~14:19',name2:'白10',state:-1},
        ],
        examData2:[
          {id:0,name:'王11',time:'2018-05-26 00:59~06:19',time2:'2018-05-27 07:59~14:19',name2:'白11',state:0},
          {id:0,name:'王12',time:'2018-05-26 00:59~06:19',time2:'2018-05-27 07:59~14:19',name2:'白12',state:1},       
        ],
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
          applyTime:'2018/09/04 04:44'
        }
    }
  },
  methods:{
    handleClick(tab, event) {
        let activeName = this.activeName;
        this.$router.replace({ path: `/generationM/schedule/${activeName}`});     
      },
      search(val,type){
        console.log(val,type)
      },
      isNo(i,item){
        let objs = this.examData1[i];
        objs.state = 0;
        this.examData1.splice(i,1); 
        // console.log(objs)
        this.examData2.unshift(objs);
        this.$refs.dialog.hide();
      },
      isOk(i,item){
        let objs = this.examData1[i];
        objs.state = 1;
        this.examData1.splice(i,1);
        // console.log(objs)
        this.examData2.unshift(objs);
        this.$refs.dialog.hide();
      },
      showInfo(i,item){
        this.indexNow = i;

        this.$refs.dialog.show();
      }
  },
  created() {
     //配合路由 定位页面
      let val = (this.$router.history.current.fullPath).split('/generationM/schedule')[1];
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
@import '../../assets/css/tabs.less';
@import '../../assets/css/comon.less';
.schedule{
  position: relative;
  .tabBoxs{
    padding-left: 0.33rem;
  }
  .sceBtn{
    position: absolute;
    right: 0.3rem;
    .vhTop(30);
    width: 1.34rem;
    .vh(32);
    .vhLH(32);
    font-size: 0.14rem;
    i{
      font-size: 0.15rem;
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
