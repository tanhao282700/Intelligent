<template>
  <div id="home">
    <div class="buildModel">

    </div>
    <div class="header">
      <div class="companyName" @click="showBanerClick">
        <span>图标</span>
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
        <span>图标</span>
        <span>头像</span>
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
    <div class="baner" :class = " isShowBaner? 'showBaner' : 'closeBaner' ">
      <div class="head" @click="showBanerClick">
        <span class="logo"></span>
        <span class="txt">泰立智汇</span>
      </div>
      <div class="banerCon">
        <el-row class="tac b-box">
          <el-col class="b-box">
            <!--<h5>自定义颜色</h5>-->
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              background-color="#061733"
              text-color="#fff"
              active-text-color="#ffd04b">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>智慧管理</span>
                </template>
                <el-menu-item-group>
                  <!--<template slot="title">分组一</template>-->
                  <el-menu-item disabled index="1-1">门禁系统</el-menu-item>
                  <el-menu-item index="1-2">视频监控系统</el-menu-item>
                  <el-menu-item index="1-3">消防系统</el-menu-item>
                  <el-menu-item index="1-4">中央空调系统</el-menu-item>
                </el-menu-item-group>
                <!--<el-menu-item-group title="分组2">
                  <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                  <template slot="title">选项4</template>
                  <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>-->
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>运营管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="2-1">能源管理系统</el-menu-item>
                  <el-menu-item index="2-2">营收数据分析</el-menu-item>
                  <el-menu-item index="2-3">设备情况</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3" class="noRight">
                <template slot="title" class="noRight">
                  <i class="el-icon-location"></i>
                  <span>运维管理</span>
                </template>
              </el-submenu>
              <el-submenu index="4" class="noRight">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>告警管理</span>
                </template>
              </el-submenu>
              <el-submenu index="5" class="noRight" disabled>
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>权限管理</span>
                </template>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import AgentManage from './AgentManage.vue'
  import EnergyManage from './EnergyManage.vue'
  import Equipment from './Equipment.vue'
    export default {
      name: "home",
      components:{AgentManage,EnergyManage,Equipment},
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
              isShowBaner:false
          }
      },
      methods:{
        showBanerClick(){
          this.isShowBaner = !this.isShowBaner
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
</style>
<style scoped lang="less">
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
      background:#294877;
      top:0;
      left:0;
      display:flex;
      flex-direction: row;
      justify-content: space-between;
      font-size:14px;
      .companyName{
        margin-left:16px;
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



    .baner{
      width:250px;
      height:100%;
      position:absolute;
      left:-250px;
      top:0;
      background:#061b3a;
      display:flex;
      flex-direction:column;
      box-shadow:0 0 14px 0 #35a3ee;
      .head{
        &:hover{
          cursor:pointer;
         }
        height:55px;
        display:flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        box-shadow:0 0 10px 0 black;
        .logo{
          background:url(../../assets/img/home/logo.png) no-repeat center center;
          background-size:cover;
          width:25px;
          height:25px;
          margin-right:14px;
        }
        .txt{
          color:#ffffff;
          font-size:18px;
          font-weight:400;
        }
      }
      .banerCon{
        flex:1;
        margin-top:5px;
      }
    }
    .showBaner{
      left:0;
      transition:all 1s;
    }
    .closeBaner{
      left:-250px;
      transition:all 1s;
    }














  }
</style>
