<template>
  <div id="home">
    <div class="buildModel" >
      <iframe
        ref="iframe"
        name="myFrame"
        frameborder="0"
        width="100%"
        height="100%"
        :src="url3d">
      </iframe>
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
        <span v-text="dateInfo.numbers"></span>
        <span v-text="jiuli"></span>
        <span v-text="wetherInfo.weather"></span>
        <span v-text="wetherInfo.temperature"></span>
        <img v-if="wetherInfo.code" class="wetherIcon" :src="wetherInfo.code" ></img>
        <el-row class="block-col-2" style="height:0.54rem;">
          <el-col>
            <el-dropdown trigger="hover" @command="handleCommand" >
              <span style="display: flex;" class="el-dropdown-link th_info_box">
                <span @click="showPersonInfo" class="userIcon"></span>
                <span v-text="userInfo.name" class="userIconName" style="color:#ffffff;line-height: 0.54rem;font-size:0.14rem;"></span>
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
        <div class="addIcon"><img src="../../assets/img/home/add.png" alt=""></div>
      </div>
      <component v-if="partsData[0].componentsName" @deletClick="deletModels" :is="partsData[0].componentsName" :isResize="isResize"></component>
    </div>
    <div class="partTwo dragEle">
      <div class="add" v-if="!partsData[1].componentsName" @click="addModules(1)">
        <div class="title">
          <span class="titleIcon"></span>
          <span class="txt">请添加系统</span>
        </div>
        <div class="addIcon"><img src="../../assets/img/home/add.png" alt=""></div>
      </div>
      <component v-if="partsData[1].componentsName" @deletClick="deletModels" :is="partsData[1].componentsName" :isResize="isResize"></component>
    </div>
    <div class="partThree dragEle">
      <div class="add" v-if="!partsData[2].componentsName" @click="addModules(2)">
        <div class="title">
          <span class="titleIcon"></span>
          <span class="txt">请添加系统</span>
        </div>
        <div class="addIcon"><img src="../../assets/img/home/add.png" alt=""></div>
      </div>
      <component v-if="partsData[2].componentsName" @deletClick="deletModels" :is="partsData[2].componentsName" :isResize="isResize"></component>
    </div>
    <div class="partFour dragEle" >
      <div class="add" v-if="!partsData[3].componentsName" @click="addModules(3)" >
        <div class="title">
          <span class="titleIcon"></span>
          <span class="txt">请添加系统</span>
        </div>
        <div class="addIcon"><img src="../../assets/img/home/add.png" alt=""></div>
      </div>
      <component v-if="partsData[3].componentsName" @deletClick="deletModels" :is="partsData[3].componentsName" :isResize="isResize"></component>
    </div>
    <div class="monitoring" v-if="isOpenMonitor">
      <div class="monitoringName">
        <i></i>
        <span>实<br>时<br>监<br>控</span>
      </div>
      <div class="monitoringCon">
        <div class="monitoringConL">
          <div class="monitorItem" v-for="(i,index) in monitoringData" v-if="index<5">
            <div class="monitorItemCon" v-if="monitoringData">
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
        <span class="cor-r" v-if="monitoringData.length!=0" v-text="monitoringData[0].name+'：'+monitoringData[0].word">电压告警：电压超过正常水平</span>
      </div>
      <div class="right">
        <span v-if="monitoringData.length!=0" v-text="monitoringData[0].time">14:00</span>
        <span v-if="monitoringData.length!=0">
              <i style="color:#f36b6d;">01</i>/05
          </span>
        <span class="myBtn" v-if="monitoringData.length > 1" @click="openMonitor"></span>
      </div>
    </div>
    <div class="modules" v-if="isOperateModules">
      <div class="title">
        <a @click="isOperateModules = false" href="javascript:void(0)"></a>
      </div>
      <div class="modeCon">
        <div class="modeBox">
          <div class="modeDetail boxs" @click="chooseSystem(12,'AgentManage')" v-if="routerInfo[12] && routerInfo[12].role_string[0]!=0" >
            <img src="../../../static/img/agent.png" alt="">
            <span>代维管理系统</span>
          </div>
          <div class="modeDetail boxs" @click="chooseSystem('-1','Equipment')" >
            <img src="../../../static/img/equipment.png" alt="">
            <span>设备情况</span>
          </div>
          <div class="modeDetail boxs" v-if="routerInfo[i.id]" @click="chooseSystem(i.id,i.componentsName)" v-for="(i,index) in list">
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
        list:[{   //可选子系统信息
          id:1,
          name:"中央空调系统",
          src:"../../../static/img/conditioning.png",
          componentsName:'Conditioning'
        },{
          id:17,
          name:"营收数据分析",
          src:"../../../static/img/revenueData.png",
          componentsName:'RevenueData'
        },{
          id:2,
          name:"能源管理系统",
          src:"../../../static/img/energy.png",
          componentsName:'EnergyManage'
        },{
          id:18,
          name:"能源管理系统",
          src:"../../../static/img/energy.png",
          componentsName:'EnergyManage'
        },{
          id:14,
          name:"门禁系统",
          src:"../../../static/img/doorManage.png",
          componentsName:'Door'
        }],
        allComponents:{   //所有模块信息
            12:{
              id:12,
              name:"代维管理系统",
              src:"../../../static/img/agent.png",
              componentsName:'AgentManage'
            },
          '-1':{
              id:'-1',
              name:"设备情况",
              src:"../../../static/img/equipment.png",
              componentsName:'Equipment'
            },
          1:{
            id:1,
            name:"中央空调系统",
            src:"../../../static/img/conditioning.png",
            componentsName:'Conditioning'
          },
          2:{
            id:2,
            name:"能源管理系统",
            src:"../../../static/img/energy.png",
            componentsName:'EnergyManage'
          },
          14:{
            id:14,
            name:"门禁系统",
            src:"../../../static/img/doorManage.png",
            componentsName:'Door'
          },
          17:{
            id:17,
            name:"营收数据分析",
            src:"../../../static/img/revenueData.png",
            componentsName:'RevenueData'
          }
        },
        partsData:[{   //四个模块id及信息
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
        monitoringData:[{time:'',name:'',word:''}],  //实时监控数据
        bubbleTip:'', //提示信息
        routerInfo:{},  //权限信息
        dateInfo:{},   //日期信息
        url3d:'',
        coordinate:[],
        wetherInfo:{
          weather:'',
          temperature:'',
          code:'',
        },
        jiuli:'',
        userInfo:{}
      }
    },
    created(){
        console.log(this.$store.state)
      this.userInfo = this.$store.state.userInfoTotal.userinfo
      this.routerInfo = this.$store.state.sysList
      this.coordinate = this.$store.state.userInfoTotal.projectInfo[0].coordinate.split(',')
      this.dateInfoInit()
      this.getWeather()
    },
    mounted(){
        $(".companyName").click(()=>{
            event.stopPropagation()
        })
      const that = this;
      window.onresize = function(){
        that.isResize++
      }

      this.initModelId()
      this.initAlarm()
      this.initRouterInfo()
      this.$nextTick(()=>{
        this.url3d=this.$store.state.userInfoTotal.projectInfo[0].bim_page
      })
      var now = new Date();
      var year = now.getFullYear()
      var day = now.getDate();            //日
      var monthn = now.getMonth();     //月
      this.jiuli = this.CalConvert(new Date(year,monthn,day), true)
    },
    methods:{
      CalConvert(date, sign) {
          function tagLunarCal( d, i, w, k, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, m13) {
            this.BaseDays = d;           /* 1 月 1 日到正月初一的累计日 */
            this.Intercalation = i;      /* 闰月月份. 0==此年沒有闰月 */
            this.BaseWeekday = w;        /* 此年 1 月 1 日为星期减 1 */
            this.BaseKanChih = k;        /* 此年 1 月 1 日之干支序号减 1 */
            this.MonthDays = [ m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, m13 ];   /* 此农历年每月之大小, 0==小月(29日), 1==大月(30日) */
          }
          function GetLeap(year) {
            return (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) ? 1 : 0;
          }
        // 日期上下限
        var FIRSTYEAR = 1936;
        var LASTYEAR = 2031;
        // 返回结果值
        var RESULT = 0;
        // 对照表
        var LunarCal = [
          new tagLunarCal(23, 3, 2, 17, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0 ), /* 1936 */
          new tagLunarCal( 41, 0, 4, 23, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1 ),
          new tagLunarCal( 30, 7, 5, 28, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1 ),
          new tagLunarCal( 49, 0, 6, 33, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1 ),
          new tagLunarCal( 38, 0, 0, 38, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1 ), /* 1940 */
          new tagLunarCal( 26, 6, 2, 44, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0 ),
          new tagLunarCal( 45, 0, 3, 49, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 ),
          new tagLunarCal( 35, 0, 4, 54, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1 ),
          new tagLunarCal( 24, 4, 5, 59, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1 ), /* 1944 */
          new tagLunarCal( 43, 0, 0, 5, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1 ),
          new tagLunarCal( 32, 0, 1, 10, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1 ),
          new tagLunarCal( 21, 2, 2, 15, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1 ),
          new tagLunarCal( 40, 0, 3, 20, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1 ), /* 1948 */
          new tagLunarCal( 28, 7, 5, 26, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1 ),
          new tagLunarCal( 47, 0, 6, 31, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1 ),
          new tagLunarCal( 36, 0, 0, 36, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 ),
          new tagLunarCal( 26, 5, 1, 41, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1 ), /* 1952 */
          new tagLunarCal( 44, 0, 3, 47, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1 ),
          new tagLunarCal( 33, 0, 4, 52, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0 ),
          new tagLunarCal( 23, 3, 5, 57, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1 ),
          new tagLunarCal( 42, 0, 6, 2, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1 ), /* 1956 */
          new tagLunarCal( 30, 8, 1, 8, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0 ),
          new tagLunarCal( 48, 0, 2, 13, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0 ),
          new tagLunarCal( 38, 0, 3, 18, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ),
          new tagLunarCal( 27, 6, 4, 23, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0 ), /* 1960 */
          new tagLunarCal( 45, 0, 6, 29, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0 ),
          new tagLunarCal( 35, 0, 0, 34, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1 ),
          new tagLunarCal( 24, 4, 1, 39, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0 ),
          new tagLunarCal( 43, 0, 2, 44, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0 ), /* 1964 */
          new tagLunarCal( 32, 0, 4, 50, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1 ),
          new tagLunarCal( 20, 3, 5, 55, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0 ),
          new tagLunarCal( 39, 0, 6, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0 ),
          new tagLunarCal( 29, 7, 0, 5, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1 ), /* 1968 */
          new tagLunarCal( 47, 0, 2, 11, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1 ),
          new tagLunarCal( 36, 0, 3, 16, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0 ),
          new tagLunarCal( 26, 5, 4, 21, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1 ),
          new tagLunarCal( 45, 0, 5, 26, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1 ), /* 1972 */
          new tagLunarCal( 33, 0, 0, 32, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1 ),
          new tagLunarCal( 22, 4, 1, 37, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1 ),
          new tagLunarCal( 41, 0, 2, 42, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1 ),
          new tagLunarCal( 30, 8, 3, 47, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1 ), /* 1976 */
          new tagLunarCal( 48, 0, 5, 53, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1 ),
          new tagLunarCal( 37, 0, 6, 58, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1 ),
          new tagLunarCal( 27, 6, 0, 3, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0 ),
          new tagLunarCal( 46, 0, 1, 8, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0 ), /* 1980 */
          new tagLunarCal( 35, 0, 3, 14, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1 ),
          new tagLunarCal( 24, 4, 4, 19, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1 ),
          new tagLunarCal( 43, 0, 5, 24, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1 ),
          new tagLunarCal( 32, 10, 6, 29, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1 ), /* 1984 */
          new tagLunarCal( 50, 0, 1, 35, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0 ),
          new tagLunarCal( 39, 0, 2, 40, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1 ),
          new tagLunarCal( 28, 6, 3, 45, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0 ),
          new tagLunarCal( 47, 0, 4, 50, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1 ), /* 1988 */
          new tagLunarCal( 36, 0, 6, 56, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0 ),
          new tagLunarCal( 26, 5, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1 ),
          new tagLunarCal( 45, 0, 1, 6, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0 ),
          new tagLunarCal( 34, 0, 2, 11, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0 ), /* 1992 */
          new tagLunarCal( 22, 3, 4, 17, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0 ),
          new tagLunarCal( 40, 0, 5, 22, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0 ),
          new tagLunarCal( 30, 8, 6, 27, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1 ),
          new tagLunarCal( 49, 0, 0, 32, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1 ), /* 1996 */
          new tagLunarCal( 37, 0, 2, 38, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1 ),
          new tagLunarCal( 27, 5, 3, 43, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1 ),
          new tagLunarCal( 46,  0, 4, 48, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1 ), /* 1999 */
          new tagLunarCal( 35,  0, 5, 53, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1 ), /* 2000 */
          new tagLunarCal( 23,  4, 0, 59, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1 ),
          new tagLunarCal( 42,  0, 1,  4, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1 ),
          new tagLunarCal( 31,  0, 2,  9, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0 ),
          new tagLunarCal( 21,  2, 3, 14, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1 ), /* 2004 */
          new tagLunarCal( 39,  0, 5, 20, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1 ),
          new tagLunarCal( 28,  7, 6, 25, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1 ),
          new tagLunarCal( 48,  0, 0, 30, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1 ),
          new tagLunarCal( 37,  0, 1, 35, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1 ), /* 2008 */
          new tagLunarCal( 25,  5, 3, 41, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1 ),
          new tagLunarCal( 44,  0, 4, 46, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1 ),
          new tagLunarCal( 33,  0, 5, 51, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1 ),
          new tagLunarCal( 22,  4, 6, 56, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 ), /* 2012 */

          new tagLunarCal( 40,  0, 1,  2, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 ),
          new tagLunarCal( 30,  9, 2,  7, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1 ),
          new tagLunarCal( 49,  0, 3, 12, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1 ),
          new tagLunarCal( 38,  0, 4, 17, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0 ), /* 2016 */
          new tagLunarCal( 27,  6, 6, 23, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1 ),
          new tagLunarCal( 46,  0, 0, 28, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0 ),
          new tagLunarCal( 35,  0, 1, 33, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0 ),
          new tagLunarCal( 24,  4, 2, 38, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1 ), /* 2020 */
          new tagLunarCal( 42,  0, 4, 44, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ),
          new tagLunarCal( 31,  0, 5, 49, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0 ),
          new tagLunarCal( 21,  2, 6, 54, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1 ),
          new tagLunarCal( 40,  0, 0, 59, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1 ), /* 2024 */
          new tagLunarCal( 28,  6, 2,  5, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0 ),
          new tagLunarCal( 47,  0, 3, 10, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1 ),
          new tagLunarCal( 36,  0, 4, 15, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1 ),
          new tagLunarCal( 25,  5, 5, 20, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0 ), /* 2028 */
          new tagLunarCal( 43,  0, 0, 26, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1 ),
          new tagLunarCal( 32,  0, 1, 31, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0 ),
          new tagLunarCal( 22,  3, 2, 36, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0 ) ];

        /* 西曆年每月之日數 */
        var SolarCal = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
        /* 西曆年每月之累積日數, 平年與閏年 */
        var SolarDays = [
          0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365, 396,
          0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366, 397 ];

        var AnimalIdx = ["馬 ", "羊 ", "猴 ", "雞 ", "狗 ", "豬 ", "鼠 ", "牛 ", "虎 ", "兔 ", "龍 ", "蛇 " ];
        var LocationIdx = [ "南", "東", "北", "西" ];

        var func = sign ? function(d) {
            function getBit(m, n) { return (m >> n) & 1; }
            var mons = "正二三四五六七八九十冬腊", Cal = [0x41A95,0xD4A,0xDA5,0x20B55,0x56A,0x7155B,0x25D,0x92D,0x5192B,0xA95,0xB4A,0x416AA,0xAD5,0x90AB5,0x4BA,0xA5B,0x60A57,0x52B,0xA93,0x40E95];
            var total, m, n, k, isEnd = false, t = d.getYear();
            if (t < 1900) t += 1900;
            total = (t - 2001) * 365 + Math.floor((t - 2001) / 4) + [0,31,59,90,120,151,181,212,243,273,304,334][d.getMonth()] + d.getDate() - 23;
            if(d.getYear() % 4 == 0 && d.getMonth() > 1) total++;
            for(m = 0; m < 1000; m++){
              k = (Cal[m] < 0xfff) ? 11 : 12;
              for(n = k; n >= 0; n--) {
                if(total <= 29 + getBit(Cal[m],n)){
                  isEnd=true;
                  break;
                }
                total = total - 29 - getBit(Cal[m],n);
              }
              if(isEnd) break;
            }
            var cYear = 2001 + m, cMonth = k - n + 1;
            if(k == 12){
              if(cMonth == Math.floor(Cal[m] / 0x10000) + 1)
                cMonth = 1 - cMonth;
              if(cMonth > Math.floor(Cal[m] / 0x10000) + 1)
                cMonth--;
            }
            var t = "";
            if(cMonth < 1){
              t += "闰";
              t += mons.charAt(-cMonth -1);
            }
            else t += mons.charAt(cMonth - 1);
            t += "月";
            t += (total < 11) ? "初" : ((total < 20) ? "十" :( (total<30) ? "廿" : "卅"));
            if(total % 10 != 0 || total == 10) t += "一二三四五六七八九十".charAt((total-1) % 10);
            return t;
          } : function(d) {
            var LunarYear = d.getFullYear(),
              LunarMonth = d.getMonth() + 1,
              LunarDate = d.getDate(),
              acc = 0,
              leap, SolarDate, y, im, lm;
            if (LunarYear < FIRSTYEAR || LunarYear >= LASTYEAR) {
              alert('只处理1936 - 2031有效年份');
              return false;
            }
            y = LunarYear - FIRSTYEAR;
            im = LunarCal[y].Intercalation;
            lm = LunarMonth;
            if (lm < 0) {
              if (lm != -im) {
                alert('月份无效');
                return false;
              }
            }
            else if (lm < 1 || lm > 12) {
              alert('月份无效');
              return false;
            }
            if (im != 0) {
              if (lm > im) {
                lm++;
              } else if (lm == -im) {
                lm = im + 1;
              }
            }
            lm--;

            if (LunarDate > LunarCal[y].MonthDays[lm] + 29) {
              alert('农历日期不正确');
              return false;
            }

            for (i = 0; i < lm; i++) {
              acc += LunarCal[y].MonthDays[i] + 29;
            }
            acc += LunarCal[y].BaseDays + LunarDate;

            leap = GetLeap(LunarYear);
            for (i = 13; i >= 0; i--) {
              if (acc > SolarDays[leap * 14 + i])
                break;
            }
            SolarDate = acc - SolarDays[leap * 14 + i];

            if (i <= 11) {
              SolarYear = LunarYear;
              SolarMonth = i + 1;
            } else {
              SolarYear = LunarYear + 1;
              SolarMonth = i - 11;
            }

            leap = GetLeap(SolarYear);
            y = SolarYear - FIRSTYEAR;

            acc = SolarDays[leap * 14 + SolarMonth - 1] + SolarDate;

            weekday = (acc + LunarCal[y].BaseWeekDay) % 7;
            kc = acc + LunarCal[y].BaseKanChih;
            kan = kc % 10;
            chih = kc % 12;
            return SolarYear + '-' + SolarMonth + '-' + SolarDate;
          }

        return func(date);
      },
      getWeather(){
            let that = this
          $.ajax({
            url: 'https://free-api.heweather.com/s6/weather/now',
            data: {
              location:that.$store.state.userInfoTotal.projectInfo[0].coordinate,
              key:'a3af62d7db2d4698851b6432b0572ea3'
            },
            success: function(res){
              that.wetherInfo.temperature = res.HeWeather6[0].now.tmp+'℃'
              that.wetherInfo.weather = res.HeWeather6[0].now.cond_txt
              let code = parseInt(res.HeWeather6[0].now.cond_code)
              if(code==100){
                  //晴
                that.wetherInfo.code = '../../static/img/qing.png'
              }
              if(code>100&&code<213){
                  //阴
                that.wetherInfo.code = '../../static/img/yin.png'
              }
              if(code>299&&code<319){
                //雨
                that.wetherInfo.code = '../../static/img/yu.png'
              }
              if(code>398&&code<500){
                //雪
                that.wetherInfo.code = '../../static/img/xue.png'
              }
              if((code>499&&code<502)||code==513||code==515){
                //雾
                that.wetherInfo.code = '../../static/img/wu.png'
              }
              if(code>501&&code<514){
                //霾
                that.wetherInfo.code = '../../static/img/mai.png'
              }
            },
            dataType: 'json'
          });
        },
        dateInfoInit(){   //日期信息初始化
          let date = new Date()
          let day = date.getDate()
          let month = date.getMonth()+1
          if (month >= 1 && month <= 9) {
            month = "0" + month;
          }
          this.dateInfo.numbers = day+'/'+month
          let str = new Array("○","一","二","三","四","五","六","七","八","九");
          function number(num){
            let tostr = "" + num;
            if(num < 10 ){
              return str[num];
            }else if(num == 10){
              return "十";
            }else if(num < 20){
              return "十" + str[tostr.charAt(1)];
            }else if(num == 20){
              return "二十";
            }else if(num <30){
              return "二十" + str[tostr.charAt(1)];
            }else if(num == 30){
              return "三十";
            }else if(num > 30){
              return "三十" + str[tostr.charAt(1)];
            }
          }
          this.dateInfo.chinese = number(month)+"月"+number(day)+"号"
        },
      deletModels(data){//模块中点击删除按钮
        this.partsData.map((item,index)=>{
              if(item.componentsName==data.componentsName){
                this.$http.get('/index_pc/pc/set/model',{
                  id:index+1,
                  self_id:0
                })
                  .then((response)=>{
                    if(response.data.code =='0'){
                      this.bubbleTipShow('删除成功')
                      item.componentsName = ''
                    }else{
                      this.bubbleTipShow(response.data.message)
                    }
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              }
        })
      },
      initModelId(){  //初始化用户设置的模块信息
        this.$http.get('/index_pc/pc/select/model')
          .then((response)=>{
            console.log(response)
            if(response.data.code =='0'){
              response.data.data.map((item)=>{
                  if(item.id!=5){ //实时监控模块不写入数据
                    this.partsData[item.id-1].componentsName = this.allComponents[item.self_id].componentsName
                  }
              })
            }else{
              this.bubbleTipShow(response.data.message)
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      initRouterInfo(){},
      initAlarm(){  //实时监控数据
        this.$http.get('/index_pc/pc/model',{self_id:-2})
          .then((response)=>{
            if(response.data.code == 0){

              this.monitoringData = response.data.data.record
              console.log(this.monitoringData.length)
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
          /*this.$router.push('./');*/
          window.location.reload();
      },
      addModules(index){   //点击模块加号显示所有模块，记录当前模块索引
        this.currentMudel = index;
        this.isOperateModules = true;
      },
      chooseSystem(id,componentsName){  //点击系统选中，显示到相应的模块中
        let isSet = true
        this.partsData.map((item)=>{
            if(item.componentsName == componentsName){
              isSet = false
              this.bubbleTipShow('已显示该模块！')
              return
            }
        })
        if(isSet){
          this.$http.get('/index_pc/pc/set/model',{
            id:this.currentMudel+1,
            self_id:id
          })
            .then((response)=>{
              if(response.data.code =='0'){
                this.bubbleTipShow('设置成功')
                this.partsData[this.currentMudel].componentsName = componentsName
                this.isOperateModules = false
                console.log(this.partsData)
              }else{
                this.bubbleTipShow(response.data.message)
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      },
      openMonitor(){
        this.isOpenMonitor = !this.isOpenMonitor
      },
      showBanerClick(){
        this.personInfoOptions.isPersonInfo = false
        this.personInfoOptions.isEditInfo = false
        this.personInfoOptions.isChangePassword = false
        this.showBannerParam = true
      },
      updateBannerParam(data){
        this.showBannerParam = data
      },
      showPersonInfo(){
        this.personalCenter.isShowBounced = !this.personalCenter.isShowBounced
      },
      handleCommand(command){
          this.showBannerParam = false
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
      /*background:url(../../assets/img/home/1.png) no-repeat left top;
      background-size:cover;*/
    }
    .systemName{
      position:absolute;
      width:100%;
      height:0.54rem;
      left:0;
      top:0;
      z-index: 5;
      text-align: center;
      .systemCon{
        font-size:0.16rem;
        color:#f2fdff;
        line-height:0.54rem;
        height:0.54rem;
        display: inline-block;
        padding:0 5.929%;
        background:url(../../assets/img/home/topbg.png) no-repeat center center;
        background-size:100% 100%;
      }
    }
    .systemName::after{
      content: "";
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      z-index: -10;
      background:url(../../assets/img/home/titlebg.png) no-repeat left top;
      background-size:100% 0.54rem;
    }
    .header{
      color:#f2fdff;
      width:100%;
      /*height:54px;
      line-height:54px;*/
      height:0.54rem;
      line-height:0.54rem;
      position:absolute;
      top:0;
      left:0;
      z-index: 10;
      display:flex;
      flex-direction: row;
      justify-content: space-between;
      font-size:0.14rem;
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
        font-size:0.18rem;
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
          height:26px;
        }
        .userIcon{
          margin-top: 0.14rem;
          width:31px;
          height:31px;
          display: inline-block;
          background:url(../../assets/img/home/usericon.png) no-repeat center center;
          background-size: cover;
          &:hover{
            cursor: pointer;
          }
        }
        .userIconName:hover{
          cursor: pointer;
        }
      }
    }
    .partOne{
      position:absolute;
      background:rgba(1,21,48,0.6);
      /*width: 2.5rem;*/
      /*height: 3.18rem;*/
      /*left: .15rem;*/
      /*top:.68rem;*/
      width:18.301%;
      height:44%;
      top:8.789%;
      left:1.098%;
    }
    .partTwo{
      position:absolute;
      background:rgba(1,21,48,.6);
      /*width: 2.5rem;
      height: 3.18rem;
      right: .15rem;
      top:.68rem;*/
      width:18.301%;
      height:44%;
      top:8.789%;
      right:1.098%;
    }
    .partThree{
      position:absolute;
      background:rgba(1,21,48,.6);
      /*width: 2.5rem;
      height: 3.18rem;
      left: .15rem;
      bottom:.16rem;*/
      width:18.301%;
      height:44%;
      top:54.036%;
      left:1.098%;
    }
    .partFour{
      position:absolute;
      background:rgba(1,21,48,.6);
      /*width: 2.5rem;
      height: 3.18rem;
      right: .15rem;
      bottom:.16rem;*/
      width:18.301%;
      height:44%;
      top:54.036%;
      right:1.098%;
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
        .myBtn{
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
      background:rgba(1,21,48,0.9);
      /*opacity:.9;*/
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
        background:rgba(0,12,39,0.4);
        a{
          background:url(../../assets/img/home/close.png) no-repeat center center;
          background-size:cover;
          display: inline-block;
          width:0.14rem;
          height:0.14rem;
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
          font-size:.12rem;
        }
      }
      .addIcon{
        flex:1;
        display: flex;
        /*font-size:60px;
        color:white;*/
        align-items: center;
        justify-content: center;
        img{
          width:0.3rem;
          height:0.3rem;
        }
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

  .homeLoginDialog{
    height:216px!important;
    background:#061733!important;
    box-shadow:0 0 6px 0 #35a3ee!important;
    border-bottom-left-radius: 8px!important;
    border-bottom-right-radius: 8px!important;
  }
  .homeLoginDialog .el-dialog__headerbtn{
    top:6px!important;
    right:10px!important;
  }
  .homeLoginDialog .el-dialog__body{
    height:142px!important;
    padding:0!important;
    color:#b5d6ff!important;
    line-height:120px!important;
    text-align: center!important;
    font-size:20px!important;
  }
  .homeLoginDialog .el-dialog__footer{
    padding:0!important;
    height:44px!important;
  }
  .homeLoginDialog .el-dialog__footer .dialog-footer{
    display: inline-block!important;
    width:100%!important;
    height:100%!important;
    border:1px solid #3b85ee!important;
    box-sizing: border-box!important;
    border-bottom-left-radius: 8px!important;
    border-bottom-right-radius: 8px!important;
  }
  .homeLoginDialog .el-dialog__footer .dialog-footer button:first-child{
    border-bottom-left-radius:6px!important;
  }
  .homeLoginDialog .el-dialog__footer .dialog-footer button:last-child{
    border-bottom-left-radius:8px!important;
  }
  .homeLoginDialog .el-dialog__footer .dialog-footer button{
    box-sizing: border-box!important;
    width:50%!important;
    margin:0!important;
    padding:0!important;
    display: inline-block!important;
    height:100%!important;
    float:left!important;
  }
  .homeLoginDialog .el-button{
    background:none!important;
  }

  .homeDropDown{
    top: 65px!important;
    width: 1rem;
    height: 1.02rem!important;
    background:#061733!important;
    border: 1px solid #4a90e2!important;
    margin-right:20px!important;
    left:inherit!important;
    right:0.60rem!important;
  }
  .homeDropDown .popper__arrow{
    left:68px!important;
  }
  .homeDropDown .homeDropdownItem{
    height:0.3rem!important;
    font-size:0.14rem;
    line-height:0.3rem!important;
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
    height:85%;
    margin-top:4%;

  }
  #conditionEcharts2 canvas{
    height:85%;
    margin-top:10%;
  }
</style>
