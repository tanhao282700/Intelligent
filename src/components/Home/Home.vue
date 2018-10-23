<template>
  <div id="home">
    <div class="buildModel">
      <!--<iframe
        ref="iframe"
        name="myFrame"
        frameborder="0"
        width="100%"
        height="100%"
        src="../../../static/bim3d/Web3D/Web3D.html">
      </iframe>-->
    </div>
    <div class="systemName">
      <div class="systemCon">泰立汇云智慧酒店管理系统</div>
    </div>
    <div class="header">
      <div class="companyName" @click="showBanerClick">
        <span></span>
        <span>泰立智汇</span>
      </div>
      <div class="info">
        <span>22/08</span>
        <span>七月二十号</span>
        <span>多云</span>
        <span>34℃</span>
        <img class="wetherIcon" src="../../assets/img/home/wethericon.png" ></img>
        <el-row class="block-col-2">
          <el-col :span="12">
            <el-dropdown trigger="hover" @command="handleCommand" >
              <span class="el-dropdown-link">
                <span @click="showPersonInfo" class="userIcon"></span>
              </span>
              <el-dropdown-menu class="homeDropDown" placement="top-right" slot="dropdown" >
                <el-dropdown-item command="personInfo" class="homeDropdownItem" style="text-align:center;color:#f6f6f6">个人信息</el-dropdown-item>
                <el-dropdown-item command="changePassword" class="homeDropdownItem" style="text-align:center;color:#f6f6f6">修改密码</el-dropdown-item>
                <el-dropdown-item command="loginOut" class="homeDropdownItem" style="text-align:center;color:#f6f6f6">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="partOne dragEle">
      <div class="add" v-if="!partsData[0].componentsName" @click="addModules(0)">
        <div class="title">
          <span class="titleIcon"></span>
          <span class="txt">请添加系统</span>
        </div>
        <div class="addIcon">+</div>
      </div>
      <component v-if="partsData[0].componentsName" :is="partsData[0].componentsName" :isResize="isResize"></component>
    </div>
    <div class="partTwo dragEle">
      <div class="add" v-if="!partsData[1].componentsName" @click="addModules(1)">
        <div class="title">
          <span class="titleIcon"></span>
          <span class="txt">请添加系统</span>
        </div>
        <div class="addIcon">+</div>
      </div>
      <component v-if="partsData[1].componentsName" :is="partsData[1].componentsName" :isResize="isResize"></component>
    </div>
    <div class="partThree dragEle">
      <div class="add" v-if="!partsData[2].componentsName" @click="addModules(2)">
        <div class="title">
          <span class="titleIcon"></span>
          <span class="txt">请添加系统</span>
        </div>
        <div class="addIcon">+</div>
      </div>
      <component v-if="partsData[2].componentsName" :is="partsData[2].componentsName" :isResize="isResize"></component>
    </div>
    <div class="partFour dragEle" >
      <div class="add" v-if="!partsData[3].componentsName" @click="addModules(3)" >
        <div class="title">
          <span class="titleIcon"></span>
          <span class="txt">请添加系统</span>
        </div>
        <div class="addIcon">+</div>
      </div>
      <component v-if="partsData[3].componentsName" :is="partsData[3].componentsName" :isResize="isResize"></component>
    </div>
    <div class="monitoring" v-if="isOpenMonitor">
      <div class="monitoringName">
        <i></i>
        <span>实<br>时<br>监<br>控</span>
      </div>
      <div class="monitoringCon">
        <div class="monitoringConL">
          <div class="monitorItem" v-for="(i,index) in monitoringData" v-if="index<5">
            <div class="monitorItemCon">
              <span v-text="i.name+'：'+i.word" :class="{'cor-r':index==0,'cor-y':index!=0}"></span>
              <div class="time">
                <span v-text="i.time">14:00</span>
                <span>
                  <i style="color:#f36b6d;" v-text="'0'+(index+1)"></i>/05
                </span>
              </div>
            </div>
            <div class="shutIcon">
              <span @click="openMonitor" v-show="index===0"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="smallMonitoring" v-if="!isOpenMonitor">
      <div class="left">
        <img src="../../assets/img/home/smallAlarm.png" alt="">
        <span class="cor-r" v-text="monitoringData[0].name+'：'+monitoringData[0].word">电压告警：电压超过正常水平</span>
      </div>
      <div class="right">
        <span v-text="monitoringData[0].time">14:00</span>
        <span>
              <i style="color:#f36b6d;">01</i>/05
          </span>
        <span @click="openMonitor"></span>
      </div>
    </div>
    <div class="modules" v-if="isOperateModules">
      <div class="title">
        <a @click="isOperateModules = false" href="javascript:void(0)"></a>
      </div>
      <div class="modeCon">
        <div class="modeBox">
          <div class="modeDetail boxs" @click="chooseSystem(i,index)" v-for="(i,index) in list">
            <img :src="i.src" alt="">
            <span v-text="i.name"></span>
          </div>
        </div>
      </div>
    </div>

    <component :isShowBannerParam="showBannerParam" @changeBannerParam="updateBannerParam" is="Banner"></component>
    <component is="PersonInfo" @showTips="personInfoShowTips" :options="personInfoOptions"></component>

    <el-dialog :visible.sync="personalCenter.isShowDialog" width="364px" top="30vh" custom-class="homeLoginDialog">
      <span>是否确定退出此账号登录</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="loginOut">确 定</el-button>
        <el-button @click="personalCenter.isShowDialog = false">取 消</el-button>
      </span>
    </el-dialog>


  <bubbleTip :tipText="bubbleTip"/>

  </div>
</template>

<script>
  import bubbleTip from '@/components/common/bubbleTip';
  import Banner from '../common/banner/Banner.vue'
  import PersonInfo from '../common/personInfo/PersonInfo'
  import AgentManage from './AgentManage.vue'
  import EnergyManage from './EnergyManage.vue'
  import Equipment from './Equipment.vue'
  import Door from './DoorControl.vue'
  import RevenueData from './RevenueData.vue'
  import Conditioning from './ConditioningSystem.vue'

  export default {
    name: "home",
    components:{bubbleTip,AgentManage,EnergyManage,Equipment,Banner,PersonInfo,Door,RevenueData,Conditioning},
    data(){
      return {
        list:[{
          id:1,
          name:"代维管理系统",
          src:"../../../static/img/agent.png",
          componentsName:'AgentManage'
        },{
          id:2,
          name:"设备情况",
          src:"../../../static/img/equipment.png",
          componentsName:'Equipment'
        },{
          id:3,
          name:"中央空调系统",
          src:"../../../static/img/conditioning.png",
          componentsName:'Conditioning'
        },{
          id:4,
          name:"营收数据分析",
          src:"../../../static/img/revenueData.png",
          componentsName:'RevenueData'
        },{
          id:5,
          name:"能源管理系统",
          src:"../../../static/img/energy.png",
          componentsName:'EnergyManage'
        },{
          id:6,
          name:"门禁系统",
          src:"../../../static/img/doorManage.png",
          componentsName:'Door'
        }],
        partsData:[{
          id:1,
          componentsName:''
        },{
          id:2,
          componentsName:''
        },{
          id:3,
          componentsName:''
        },{
          id:4,
          componentsName:''
        }],
        currentMudel:0,  //当前点击添加系统的模块
        isOperateModules:false,  //是否显示中间所有的系统
        isOpenMonitor:false,  //是否展开实时监控
        isResize:1,  //当前窗口是否重置，重绘canvas图标
        showBannerParam:false,
        personalCenter:{  //点击头像，出现个人中心
          isShowBounced:false,
          isShowDialog:false,
        },
        personInfoOptions:{
          isPersonInfo:false,  //显示个人信息
          isEditInfo:false,    //编辑个人信息 传参只用传false
          isChangePassword:false  //修改密码
        },
        monitoringData:[{}],  //实时监控数据
        bubbleTip:'' //提示信息
      }
    },
    mounted(){
      const that = this;
      window.onresize = function(){
        that.isResize++
      }

      this.initModelId()
      this.initAlarm()
    },
    methods:{
      initModelId(){
        console.log(this.$store.state)
        this.$http.get('/index_pc/pc/select/model')
          .then((response)=>{
            console.log(response)
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      initAlarm(){
        this.$http.get('/index_pc/pc/model',{self_id:-2})
          .then((response)=>{
            if(response.data.code == 0){
              this.monitoringData = response.data.data
            }else{

            }
          })
          .catch((error)=>{
            console.log(error);
          });
      },
      bubbleTipShow(tip){
        this.bubbleTip = tip;
        this.$store.state.bubbleShow = true;
        var that = this;
        setTimeout(function () {
          that.$store.state.bubbleShow = false;
        },3000)
      },
      personInfoShowTips(tips){   //个人信息修改提示信息
        this.bubbleTipShow(tips)
      },
      loginOut(){
          this.$router.push('./')
      },
      addModules(index){
        this.currentMudel = index;
        this.isOperateModules = true;
      },
      chooseSystem(item,index){
        this.partsData[this.currentMudel].componentsName = item.componentsName
        this.isOperateModules = false
      },
      openMonitor(){
        this.isOpenMonitor = !this.isOpenMonitor
      },
      showBanerClick(){
        this.showBannerParam = true
      },
      updateBannerParam(data){
        this.showBannerParam = data
      },
      showPersonInfo(){
        this.personalCenter.isShowBounced = !this.personalCenter.isShowBounced
      },
      handleCommand(command){
        if(command == 'loginOut'){
          this.personalCenter.isShowDialog = true
        }else if(command==='personInfo'){
          this.personInfoOptions.isPersonInfo = true
        }else if(command == 'changePassword'){
          this.personInfoOptions.isChangePassword = true
        }
      }
    }
  }
</script>

<style scoped rel="stylesheet/less" lang="less">
  @import "../../assets/css/home.less";
  #home{
    width:100%;
    min-width:1280px;
    height:100%;
    min-height:728px;
    position:relative;
    overflow:hidden;
    .echarts div{
      width:100%!important;
      height:100%!important;
      canvas{
        width:100%!important;
        height:100%!important;
      }
    }
    .buildModel{
      width:100%;
      height:100%;
      iframe{
        width:100%;
        height:100%;
      }
      background:url(../../assets/img/home/1.png) no-repeat left top;
      background-size:cover;
    }
    .systemName{
      position:absolute;
      width:100%;
      height:54px;
      left:0;
      top:0;
      text-align: center;
      .systemCon{
        font-size:16px;
        color:#f2fdff;
        line-height:54px;
        height:54px;
        display: inline-block;
        padding:0 5.929%;
        background:url(../../assets/img/home/topbg.png) no-repeat center center;
        background-size:100% 100%;
      }
    }
    .header{
      color:#f2fdff;
      width:100%;
      height:54px;
      line-height:54px;
      position:absolute;
      background:url(../../assets/img/home/titlebg.png) no-repeat left top;
      background-size:100% 54px;
      top:0;
      left:0;
      display:flex;
      flex-direction: row;
      justify-content: space-between;
      font-size:14px;
      .companyName{
        margin-left:16px;
        display: flex;
        align-items: center;
        span:first-child{
          display: inline-block;
          margin-right:8px;
          width:26px;
          height:26px;
          background:url(../../assets/img/home/logo.png) no-repeat center center;
          background-size:cover;
        }
        &:hover{
          cursor: pointer;
        }
        span:first-child{

        }
        span:last-child{

        }
      }
      .systemName{
        font-size:18px;
      }
      .info{
        display: flex;
        flex-direction: row;
        align-items: center;
        span{
          margin-right:10px;
          display: inline-block;
        }
        img{
          margin-right:10px;
          display: inline-block;
        }
        .wetherIcon{
          width:26px;
          height:22px;
        }
        .userIcon{
          margin-top: 22px;
          width:31px;
          height:31px;
          display: inline-block;
          background:url(../../assets/img/home/usericon.png) no-repeat center center;
          background-size: cover;
          &:hover{
            cursor: pointer;
          }
        }
      }
    }
    .partOne{
      position:absolute;
      background:rgba(1,21,48,0.6);
      .widl(30);
      .wid(502);
      .hei(674);
      .heiT(137);
    }
    .partTwo{
      position:absolute;
      background:rgba(1,21,48,.6);
      .widl(2203);
      .wid(502);
      .hei(674);
      .heiT(137);
    }
    .partThree{
      position:absolute;
      background:rgba(1,21,48,.6);
      .widl(30);
      .wid(502);
      .hei(674);
      .heiT(829);
    }
    .partFour{
      position:absolute;
      background:rgba(1,21,48,.6);
      .widl(2203);
      .wid(502);
      .hei(674);
      .heiT(829);
    }
    .smallMonitoring{
      position:absolute;
      .widl(560);
      .wid(1614);
      height:3.9%;
      .heiB(32);
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      background:rgba(1, 21, 48, 0.15);
      border-radius:4px;
      .left{
        img{
          height:100%;
        }
        span{
          padding-left:16px;
        }
      }
      .right{
        display: flex;
        flex-direction: row;
        align-items: center;
        color:#c0cbd1;
        span{
          margin-right:20px;
        }
        span:last-child{
          margin-right:10px;
          display: inline-block;
          width:30px;
          height:30px;
          background:url(../../assets/img/home/open.png) no-repeat left top;
          background-size:cover;
          &:hover{
            cursor:pointer;
          }
        }
      }
    }
    .monitoring{
      position:absolute;
      background:rgba(1,21,48,0.6);
      .widl(560);
      .wid(1614);
      .hei(304);
      .heiB(32);
      border-radius:4px;
      display:flex;
      flex-direction: row;
      .monitoringName{
        width:4%;
        background:rgba(0, 12, 39, 0.4);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color:white;
        i{
          display:inline-block;
          width:24px;
          height:20px;
          background:url(../../assets/img/home/alarm.png) no-repeat left top;
          background-size:cover;
        }
      }
      .monitoringCon{
        flex:1;
        display: flex;
        flex-direction: row;
        .monitoringConL{
          flex:1;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          .monitorItem{
            height:14%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            .monitorItemCon{
              flex:1;
              height:100%;
              margin:0 10px;
              padding-left:16px;
              padding-right:8px;
              background:rgba(1, 21, 48, 0.15);
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: space-between;
              .time span{
                margin-left:10px;
                color:#c0cbd1;
              }
            }
            .shutIcon{
              height:100%;
              /*width:5%;*/
              width:30px;
              margin-right:10px;
              display: flex;
              align-items: center;
              span{
                display: inline-block;
                width:30px;
                height:30px;
                background:url(../../assets/img/home/shut.png) no-repeat left top;
                background-size:cover;
                &:hover{
                  cursor:pointer;
                }
              }
            }
          }
        }
      }
    }
    .modules{
      position:absolute;
      background:#11213a;
      opacity:.9;
      display:flex;
      flex-direction:column;
      width:59.04%;
      height:68.098%;
      left:20.497%;
      top:8.854%;
      /*.widl(560);
      .wid(1614);
      .hei(1043);
      .heiT(137);*/
      .title{
        height:5.752%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        background:#041531;
        a{
          background:url(../../assets/img/home/close.png) no-repeat center center;
          background-size:cover;
          display: inline-block;
          width:26px;
          height:26px;
          margin-right:12px;
        }
      }
      .modeCon{
        flex:1;
        display:flex;
        align-items:center;
        justify-content:center;
        .modeBox{
          flex:1;
          height:100%;
          padding:0 8.06%;
          padding-top:4.74%;
          .modeDetail{
            /*width:10.04vw;
            height:10.04vw;
            min-width:125px;
            min-height:125px;*/
            /*width:15.5%;
            padding-top:15.5%;*/
            width:17%;
            padding-top:17%;
            float:left;
            /*margin-left:3.8vw;*/
            /*margin-left:4.463%;*/
            margin-left:6.8%;
            margin-top:7.295%;
            position:relative;
            &:hover{
              cursor: pointer;
              transform: scale(1.2);
              box-shadow: 0px 6px 6px 6px
              rgba(73, 143, 226, 0.22),
              inset 1px 1px 2px 0px
              rgba(248, 253, 255, 0.15),
              inset 0px -1px 1px 0px
              #498fe2;
            }
            &:nth-child(5),&:nth-child(6),&:nth-child(7),&:nth-child(8){
              margin-top:7.113%;
            }
            img{
              width:40%;
              position:absolute;
              left:50%;
              top:50%;
              margin-top:-24%;
              margin-left:-20%;
            }
            span{
              display: inline-block;
              width:100%;
              text-align: center;
              position:absolute;
              bottom:7.2%;
              color:white;
              font-size:14px;
            }
          }
        }
      }
    }
    .dragEle{
      border-radius:8px;
    }
    .dragEle .add{
      width:100%;
      height:100%;
      display: flex;
      flex-direction: column;
      &:hover{
        cursor: pointer;
      }
      .title{
        height:8.9%;
        background:rgba(0,12,39,0.4);
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        .titleIcon{
          width:16px;
          height:16px;
          background:url(../../assets/img/home/titIcon.png) no-repeat left top;
          background-size:cover;
          margin-right:12px;
        }
        .txt{
          color:white;
          font-size:16px;
        }
      }
      .addIcon{
        flex:1;
        display: flex;
        font-size:60px;
        color:white;
        align-items: center;
        justify-content: center;
      }
    }







    .management{
      width:100px;
      height:164px;
      justify-content:center;
      text-align:center;
      position:absolute;
      right:24px;
      top:81px;
      .to_top{
        margin-left:60px;
        width: 0;
        height: 0;
        border-bottom: 12px solid #061733;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
      }
      .to_con{
        height:152px;
        background:#061733;
        border-radius:6px;
      }
      .management-people{
        width:100px;
        height:34px;
        color:#fff;
        line-height:34px;
        display: inline-block;
        &:first-child{
          margin-top:10px;
        }
        &:hover{
          cursor:pointer;
          background:#093365;
          transition:all 1s;
          color:#1989f9;
        }
      }
    }





    .cor-r{
      color:#994f5e;
    }
    .cor-y{
      color:#f7a118;
    }


  }
</style>
<style>

  #home .homeLoginDialog{
    height:216px;
    background:#061733;
    box-shadow:0 0 6px 0 #35a3ee;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  #home .el-dialog__headerbtn{
    top:6px;
    right:10px;
  }
  #home .el-dialog__body{
    height:142px;
    padding:0;
    color:#b5d6ff;
    line-height:120px;
    text-align: center;
    font-size:20px;
  }
  #home .el-dialog__footer{
    padding:0;
    height:44px;
  }
  #home .el-dialog__footer .dialog-footer{
    display: inline-block;
    width:100%;
    height:100%;
    border:1px solid #3b85ee;
    box-sizing: border-box;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  #home .el-dialog__footer .dialog-footer button:first-child{
    border-bottom-left-radius:6px!important;
  }
  #home .el-dialog__footer .dialog-footer button:last-child{
    border-bottom-left-radius:8px;
  }
  #home .el-dialog__footer .dialog-footer button{
    box-sizing: border-box;
    width:50%;
    margin:0;
    padding:0;
    display: inline-block;
    height:100%;
    float:left;
  }
  #home .el-button{
    background:none;
  }

  .homeDropDown{
    top:72px!important;
    width:100px;
    background:#061733!important;
    border: 1px solid #4a90e2;
    margin-right:20px!important;
    left:inherit!important;
    right:0!important;
  }
  .homeDropDown .popper__arrow{
    left:68px!important;
  }
  .homeDropDown .homeDropdownItem:hover{
    background:#093365;
    color:#1989f9;
  }

  #equipmentTwo canvas{
    float:right;
    margin-right:1%;
    margin-top:2%;
  }
  .chart canvas{
    height:100%!important;
  }
  .conditioningComponent .chart{
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .conditioningComponent .chart canvas{
    margin-top:10px;
  }

  #conditionEcharts1 canvas{
    height:100%;
    margin-top:4%;

  }
  #conditionEcharts2 canvas{
    height:100%;
    margin-top:4%;
  }
</style>
