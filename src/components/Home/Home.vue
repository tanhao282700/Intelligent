<template>
  <div id="home">
    <div class="buildModel">

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
            <el-dropdown trigger="click" @command="handleCommand" >
              <span class="el-dropdown-link">
                <span @click="showPersonInfo" class="userIcon"></span>
              </span>
              <el-dropdown-menu class="homeDropDown" slot="dropdown" >
                <el-dropdown-item command="personInfo" class="homeDropdownItem" style="text-align:center;color:#f6f6f6">个人信息</el-dropdown-item>
                <el-dropdown-item command="authorityManagement" class="homeDropdownItem" style="text-align:center;color:#f6f6f6">权限管理</el-dropdown-item>
                <el-dropdown-item command="changePassword" class="homeDropdownItem" style="text-align:center;color:#f6f6f6">修改密码</el-dropdown-item>
                <el-dropdown-item command="loginOut" class="homeDropdownItem" style="text-align:center;color:#f6f6f6">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="partOne dragEle">
      <div class="add" style="display: none">
        <div class="title">
          <span class="titleIcon"></span>
          <span class="txt">请添加系统</span>
        </div>
        <div class="addIcon">+</div>
      </div>
      <component :is="partOneView" :isResize="isResize"></component>
    </div>
    <div class="partTwo dragEle">
      <div class="add" style="display:none;">
        <div class="title">
          <span class="titleIcon"></span>
          <span class="txt">请添加系统</span>
        </div>
        <div class="addIcon">+</div>
      </div>
      <component :is="partTwoView" :isResize="isResize"></component>
    </div>
    <div class="partThree dragEle">
      <div class="add" style="display:none;">
        <div class="title">
          <span class="titleIcon"></span>
          <span class="txt">请添加系统</span>
        </div>
        <div class="addIcon">+</div>
      </div>
      <component :is="partThreeView" :isResize="isResize"></component>
    </div>
    <div class="partFour dragEle" @click="addModules">
      <div class="add">
        <div class="title">
          <span class="titleIcon"></span>
          <span class="txt">请添加系统</span>
        </div>
        <div class="addIcon">+</div>
      </div>
    </div>
    <div class="monitoring">

    </div>
    <div class="modules" v-if="isOperateModules">
      <div class="title">
        <a @click="closeModules" href="javascript:void(0)"></a>
      </div>
      <div class="modeCon">
        <div class="modeBox">
          <div class="modeDetail boxs" v-for="i in list">
            <img :src="i.src" alt="">
            <span v-text="i.name"></span>
          </div>
        </div>
      </div>
    </div>

    <component :isShowBannerParam="showBannerParam" @changeBannerParam="updateBannerParam" is="Banner"></component>
    <component is="PersonInfo" :options="personInfoOptions"></component>

    <el-dialog :visible.sync="personalCenter.isShowDialog" width="364px" top="30vh" custom-class="homeLoginDialog">
      <span>是否确定退出此账号登录</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="personalCenter.isShowDialog = false">确 定</el-button>
        <el-button @click="personalCenter.isShowDialog = false">取 消</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import Banner from '../common/banner/Banner.vue'
  import PersonInfo from '../common/personInfo/PersonInfo'
  import AgentManage from './AgentManage.vue'
  import EnergyManage from './EnergyManage.vue'
  import Equipment from './Equipment.vue'
  import Door from './DoorControl.vue'

  export default {
      name: "home",
      components:{AgentManage,EnergyManage,Equipment,Banner,PersonInfo,Door},
      data(){
          return {
              list:[{
                id:1,
                name:"代维管理系统",
                src:"../../../static/img/agent.png"
              },{
                id:2,
                name:"设备情况",
                src:"../../../static/img/equipment.png"
              },{
                id:3,
                name:"中央空调系统",
                src:"../../../static/img/conditioning.png"
              },{
                id:4,
                name:"营收数据分析",
                src:"../../../static/img/revenueData.png"
              },{
                id:5,
                name:"能源管理系统",
                src:"../../../static/img/energy.png"
              },{
                id:6,
                name:"门禁系统",
                src:"../../../static/img/doorManage.png"
              }],
              isOperateModules:false,  //添加删除显示的模块
              isResize:1,  //当前窗口是否重置，重绘canvas图标
              partOneView:'AgentManage',
              partTwoView:'EnergyManage',
              partThreeView:'Door',
              showBannerParam:false,
              personalCenter:{
                  isShowBounced:false,
                  isShowDialog:false,
              },
              personInfoOptions:{
                    isPersonInfo:false,  //显示个人信息
                    isEditInfo:false,    //编辑个人信息 传参只用传false
                    isChangePassword:false  //修改密码
              }
          }
      },
      mounted(){
        const that = this;
        window.onresize = function(){
          that.isResize++
        }
      },
      methods:{
        addModules(){
          this.isOperateModules = true;
        },
        closeModules(){
          this.isOperateModules = false;
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
      background:#121e2e;
      opacity:.8;
      .widl(30);
      .wid(502);
      .hei(674);
      .heiT(137);
    }
    .partTwo{
      position:absolute;
      background:#121e2e;
      opacity:.8;
      .widl(30);
      .wid(502);
      .hei(674);
      .heiT(829);
      }
    .partThree{
      position:absolute;
      background:#121e2e;
      opacity:.8;
      .widl(2203);
      .wid(502);
      .hei(674);
      .heiT(137);
      }
    .partFour{
      position:absolute;
      background:#121e2e;
      opacity:.8;
      .widl(2203);
      .wid(502);
      .hei(674);
      .heiT(829);
    }
    .monitoring{
      position:absolute;
      background:#121e2e;
      opacity:.8;
      .widl(560);
      .wid(1614);
      .hei(304);
      .heiB(20);
    }
    .modules{
      position:absolute;
      background:#11213a;
      opacity:.9;
      display:flex;
      flex-direction:column;
      .widl(560);
      .wid(1614);
      .hei(1043);
      .heiT(137);
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
          .modeDetail{
            width:10.04vw;
            height:10.04vw;
            min-width:125px;
            min-height:125px;
            float:left;
            /*margin-left:3.8vw;*/
            margin-left:6.432%;
            display:flex;
            align-items:center;
            justify-content:center;
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
              width:52%;
              height:52%;
            }
            span{
              position:absolute;
              bottom:.4vw;
              color:white;
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
        background:#0d2241;
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










  }
</style>
<style>
  .el-menu{
    border-right:none;
    height:100%;
  }
  .b-box{
    height:100%;
  }
  .el-submenu__title:hover{
    background:#011f43!important;
  }
  .el-submenu__title:hover{
    background:#008aff!important;
  }
  .noRight .el-submenu__title .el-submenu__icon-arrow{
    display:none;
  }

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
    background:#061733;
    border: 1px solid #4a90e2;
    margin-right:20px!important;
  }
  .homeDropDown .popper__arrow{
    left:68px!important;
  }
  .homeDropDown .homeDropdownItem:hover{
    background:#093365;
    color:#1989f9;
  }
</style>
