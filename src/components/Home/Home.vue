<template>
  <div id="home">
    <div class="buildModel">

    </div>
    <div class="header">
      <div class="companyName" @click="showBanerClick">
        <span></span>
        <span>泰立智汇</span>
      </div>
      <div class="systemName">
        泰立汇云智慧酒店管理系统
      </div>
      <div class="info">
        <span>22/08</span>
        <span>七月二十号</span>
        <span>多云</span>
        <span>34℃</span>
        <img class="wetherIcon" src="../../assets/img/home/wethericon.png" ></img>
        <span @click="showPersonInfo" class="userIcon"></span>
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
      <component :is="partOneView"></component>
    </div>
    <div class="partTwo dragEle">
      <div class="add" style="display:none;">
        <div class="title">
          <span class="titleIcon"></span>
          <span class="txt">请添加系统</span>
        </div>
        <div class="addIcon">+</div>
      </div>
      <component :is="partTwoView"></component>
    </div>
    <div class="partThree dragEle">
      <div class="add" style="display:none;">
        <div class="title">
          <span class="titleIcon"></span>
          <span class="txt">请添加系统</span>
        </div>
        <div class="addIcon">+</div>
      </div>
      <component :is="partThreeView"></component>
    </div>
    <div class="partFour dragEle">
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
    <div class="modules">
      <div class="title">
        <a href="javascript:void(0)"></a>
      </div>
      <div class="modeCon">
        <div class="modeBox">
          <div class="modeDetail boxs" v-for="i in 8">
            <img src="../../assets/img/home/revenueData.png" alt="">
            <span>营收数据分析</span>
          </div>
        </div>
      </div>
    </div>

    <component :isShowBannerParam="showBannerParam" @changeBannerParam="updateBannerParam" is="Banner"></component>

    <div class="management" v-show="personalCenter.isShowBounced">
      <div class="to_top"></div>
      <div class="to_con">
        <div class="management-people">
          <span>个人信息</span>
        </div>
        <div class="management-people">
          <span>权限管理</span>
        </div>
        <div class="management-people">
          <span>修改密码</span>
        </div>
        <div class="management-people" @click="loginOut">
          <template>
            <span>退出登录</span>
          </template>
        </div>
      </div>
    </div>

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
  import AgentManage from './AgentManage.vue'
  import EnergyManage from './EnergyManage.vue'
  import Equipment from './Equipment.vue'
    export default {
      name: "home",
      components:{AgentManage,EnergyManage,Equipment,Banner},
      data(){
          return {
              list:[{
                id:1,
                name:"代维系统数据"
              },{
                id:2,
                name:"设备管理"
              },{
                id:3,
                name:"实时控制"
              },{
                id:4,
                name:"营收数据分析"
              },{
                id:5,
                name:"能源管理系统"
              }],
              partOneView:'AgentManage',
              partTwoView:'EnergyManage',
              partThreeView:'Equipment',
              showBannerParam:false,
              personalCenter:{
                  isShowBounced:false,
                  isShowDialog:false,
              }
          }
      },
      methods:{
        showBanerClick(){
          this.showBannerParam = !this.showBannerParam
        },
        updateBannerParam(data){
          this.showBannerParam = data
        },
        showPersonInfo(){
          this.personalCenter.isShowBounced = !this.personalCenter.isShowBounced
        },
        loginOut(){
          this.personalCenter.isShowDialog = true
        }
      }
    }
</script>
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
    /*padding-top:49px;
    padding-bottom:49px;*/
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
</style>
<style scoped rel="stylesheet/less" lang="less">
  @import "../../assets/css/home.less";
  #home{
    width:100%;
    min-width:1366px;
    height:100%;
    min-height:768px;
    position:relative;
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
      .systemName{
        padding:0 5.929%;
        background:url(../../assets/img/home/topbg.png) no-repeat center center;
        background-size:cover;
      }
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
            float:left;
            margin-left:3.8vw;
            &:nth-child(5),&:nth-child(6),&:nth-child(7),&:nth-child(8){
               margin-top:7.113%;
             }
            display:flex;
            align-items:center;
            justify-content:center;
            position:relative;
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

    .dragEle .add{
      width:100%;
      height:100%;
      display: flex;
      flex-direction: column;
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
