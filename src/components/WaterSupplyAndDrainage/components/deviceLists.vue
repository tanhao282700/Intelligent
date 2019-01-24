<!--
    给排水系统 设备及状态表
    made by 胡永福
    start in 2018-8-6
-->
<template>
  <div class="devicesBox">
    <el-scrollbar style="height:100%">
      <div class="itemBox">
        <div @click="showEcharts(item)" v-for="(item,i) in DLists" class="item no-select" :style="[i%5!=0? marginL:noMargin,i>4? {marginTop:'0.18rem'}:{marginTop:0}]" :key="i">
          <span @click.stop="showDeviceInfo(item)" class="tip">设备信息卡</span>
          <span :class="[iconCircle,(item.state==1 || item.state==2)?'color-innormal':item.state==0?'color-normal':'color-close']"></span>
          <img class="img" :src="deviceImages[(item.state==1 || item.state==2)?2:item.state==0?1:0].src" alt="">
          <p v-text="item.device_name" :class="['device-name',(item.state==1 || item.state==2)?'font-color-innormal':item.state==0?'font-color-normal2':'font-color-close']"></p>
        </div>
      </div>
    </el-scrollbar>

    <Dialog3 wid = "9.1rem" hei = "5.36rem" ref = "dialog">
      <div v-text="deviceName+' 设备信息卡'" class="self-dialog-title"></div>
      <div class="dialog-in">
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" :stretch="true">
          <el-tab-pane label="设备信息" name="first">
            <el-scrollbar style="height:100%">
              <div class="deviceInfoBox">
                <p v-for="(item,i) in deviceInfos" class="row" :key="i"><span v-text="item.name+'：'" class="name"></span><span v-text="item.value" class="value"></span></p>
              </div>
            </el-scrollbar>
          </el-tab-pane>
          <el-tab-pane label="维保历史" name="second">
            <el-scrollbar style="height:100%">
              <div class="self-step-box" style="min-height: 100%;">
                <el-steps direction="vertical">
                  <el-step v-for="(item,i) in maintenanceHis" icon="self-icon" :key="item.id">
                    <div class="title" slot="title">
                      <span v-text="item.date" class="time"></span>
                      <span class="col-line"></span>
                      <span v-text="item.head_name" class="name"></span>
                    </div>
                    <div v-text="item.maintenance_content" class="content" slot="description"></div>
                  </el-step>
                </el-steps>
              </div>
            </el-scrollbar>
          </el-tab-pane>
        </el-tabs>
      </div>
    </Dialog3>

    <Dialog3 wid = "13.26rem" hei = "650" ref = "dialog2">
      <!--<div style="width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;font-size: 36px;color: #fff">
        此页面前端辣鸡正在构建。。。
      </div>-->
      <div
        v-loading="loading"
        element-loading-background="rgba(0, 0, 0, 0.5)"
        element-loading-spinner="el-icon-loading"
        element-loading-text="拼命加载中"
        class="dialog2-in">
        <div class="head">
          <div v-text="dialog2Title" class="title"></div>
          <div class="col-line"></div>
          <div class="warnInfoBox">
            <ul id="con1" :class="['itemWrap',{anim:animate==true}]">

              <li class="item" v-for='warnitem in warnItems'>
                <span class="icon-info"></span>
                <span v-text="warnitem.devicename+'：'+warnitem.content" class="warnInfo"></span>
                <span v-text="warnitem.time" class="date"></span>
              </li>
            </ul>
          </div>
          <div class="runTimeBox">
            <span class="text">累计运行时间：</span>
            <span v-text="runTime" class="runTime"></span>
          </div>
          <button @click="showDeviceInfoTab" type="button" class="self-btn self-border">设备信息卡</button>
          <button @click="openClosePump(pumpSwitchText)" type="button" class="self-border self-btn"><span class="icon-switch"></span>{{pumpSwitchText}}</button>

        </div>
        <div class="body">
          <ul class="self-tab-head no-select">
            <li
              v-for="(item,index) in echartData2"
              :class="{active:index == num}"
              @click="tab(index)">
              <span>{{item.name}}</span>
              <span class="icon-lineItem">
                <!--<span class="one"></span>-->
                <span :style="index == num?{backgroundColor: lineColorArr[index]}:null" class="one"></span>
                <span :style="index == num?{backgroundColor: lineColorArr[index]}:null" class="two"></span>
              </span>
            </li>
          </ul>
          <div style="width: 100%;height: 5.43rem" class="tabCon">
            <div
              style="width: 100%;height: 100%"
              v-for='(item,index) in echartData2'
              v-show=" index == num">
              <div class="echart-boxs">
                <div class="echart-box">
                  <echart-line
                    :id="item.id"
                    :time="item.data.time_list"
                    :data="item.data.data_list"
                    :unit="item.unit"
                    :planVal="item.name=='电压'?[380,380]:item.name=='温度'?[10,20]:item.name=='电流'?[5,10]:item.name=='出口压力'?[0.4,0.8]:[999,999]"
                    :toVal="sendVal"
                    :lineColor="lineColorArr[index]"
                  />
                </div>
              </div>

              <div class="selectBox">
                <div class="slider-select-box">
                  <div class="block">
                    <el-slider
                      @change="changeVal"
                      v-model="value9"
                      range
                      :format-tooltip="format"
                      :max="100">
                    </el-slider>
                  </div>
                </div>
                <div class="quick-select">
                  <span class="text">快速选择</span>
                  <div class="btnBox">
                    <button :class="['self-btn',{active:i == btnNum}]" type="button" v-for="(v,i) in selectBtns" v-text="v.name" @click = "selectBtnsClick(v.id,i)"></button>
                    <!--<button class="self-btn" type="button">近一周</button>-->
                    <!--<button class="self-btn" type="button">近一月</button>-->
                    <!--<button class="self-btn" type="button">近三月</button>-->
                    <!--<button class="self-btn" type="button">近半年</button>-->
                    <!--<button class="self-btn" type="button">近一年</button>-->
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Dialog3>

    <Dialog3 wid = "3.64rem" hei = "2.16rem" ref = "dialog3">
      <div class="dialog3-in">
        <p class="p-text">请输入登录密码确认{{this.pumpSwitchText}}</p>
        <div class="inputWrap">
          <input v-model="loginPwd" :class="['input-text',{error:isPwdTrue}]" type="password">
          <span v-show="isPwdTrue" class="span-error">*密码错误</span>
        </div>
        <div class="btnWrap">
          <button @click="checkPwd" type="button">确定</button>
          <button @click="()=>{this.$refs.dialog3.hide();this.$message('取消操作！');}" type="button">取消</button>
        </div>
      </div>
    </Dialog3>
  </div>
</template>

<script>

  import utils from "../../../assets/js/utils.js";
  import EchartLine from "./echartLine";
  import Dialog3 from "./dialog3";
  export default {
    components: {
      Dialog3,
      EchartLine
    },
    props:['DLists','deviceImages'],
    name: "deviceLists",
    data() {
      return {
        point_id:'',
        pumpOpen:'',
        pumpClose:'',
        isPwdTrue:false,
        loginPwd:'',
        warnItems:[
        ],
        selectBtns:[
          {id:1,name:'近一周'},
          {id:2,name:'近一月'},
          {id:3,name:'近三月'},
          {id:4,name:'近半年'},
          {id:5,name:'近一年'},
        ],
        selectType:'0',
        deviceID:'',

        loading:false,
        dialog2Title:'-',
        num: 0,
        animate:false,
        runTime:'00:00:00',
        lineColorArr:['rgba(42,95,222,1)','rgba(255,164,20,1)','rgba(45,240,224,1)','rgba(237,74,74,1)','rgba(42,95,222,1)','rgba(255,164,20,1)','rgba(45,240,224,1)','rgba(237,74,74,1)',],
        echartData2: [

        ],

        value9: [0, 100],
        activeName: 'first',
        dialogVisible: false,
        /*deviceImages:[
          {src:require('../../../assets/img/WaterSupplyAndDrainage/waterPump_close.png')},
          {src:require('../../../assets/img/WaterSupplyAndDrainage/waterPump_normal.png')},
          {src:require('../../../assets/img/WaterSupplyAndDrainage/waterPump_innormal.png')}
          ],*/
        marginL:{marginLeft:'0.16rem'},
        showDiglog:false,
        noMargin:{marginLeft:0},
        iconCircle:'icon-circle',
        /*deviceLists:[
          {device_id:1,device_name:'1号水泵',state:'1',data:{value:''}},

        ],*/
        deviceName:'某某某',
        deviceInfos:[
          {name:'设备名称',value:'-'},
        ],
        maintenanceHis:[
          {id:1,date:'-',head_name:'-',maintenance_content:'维保内容'},
        ],
        sendVal:[0,100],
        deviceItems:null,
        pumpSwitchText:'-',//水泵开关文本
        btnNum:0,
        timer:null,//定时器
      }
    },
    methods: {
      //秒数的格式化
      formatTime(value) {
        let seconds = parseInt(value);
        let hours = Math.floor(seconds/3600);
        let minutes = Math.floor(seconds%3600/60);
        let Sec = Math.floor(seconds%3600%60);
        if (hours<10){
          hours = '0'+hours;
        }
        if (minutes<10){
          minutes = '0'+minutes;
        }
        if (Sec<10){
          Sec = '0'+Sec;
        }
        return hours+':'+minutes+':'+Sec;
      },
      //天数的加减
      addDate(date, days) {
        let d = new Date(date);
        d.setDate(d.getDate() + days);
        let month = d.getMonth() + 1;
        let day = d.getDate();
        if (month < 10) {
          month = "0" + month;
        }
        if (day < 10) {
          day = "0" + day;
        }
        let val = d.getFullYear() + "-" + month + "-" + day;
        return val;
      },
      //计算当前年月有多少天
      getDaysInMonth(year, month) {
        let mon = parseInt(month)<10?'0'+month:month;
        let temp = new Date(year,mon,0);
        return temp.getDate();
      },
      //日期的计算:前多少月
      getPDate(monNum){
        let date1 = new Date();
        date1.setMonth(date1.getMonth()-(monNum-1));
        let year1=date1.getFullYear();
        let month1=date1.getMonth()+1;
        month1 =(month1<10 ? "0"+month1:month1);
        let sDate = (year1.toString()+'-'+month1.toString());
        return sDate;
      },
  //快速选择按钮事件
      selectBtnsClick(id,index){
        console.log(id,index)
        this.btnNum = index;
        let nowdate = new Date();
        let endtime = nowdate.getFullYear()+'-'+(nowdate.getMonth()<10?('0'+(nowdate.getMonth()+1)):(nowdate.getMonth()+1))+'-'+(nowdate.getDate()<10?('0'+nowdate.getDate()):nowdate.getDate());
        let endMonth = nowdate.getFullYear()+'-'+(nowdate.getMonth()<10?('0'+(nowdate.getMonth()+1)):(nowdate.getMonth()+1));

        switch (id){
          case 1:
            this.selectType = '0';
            console.log(this.addDate(endtime,-7));
            let starttime = this.addDate(endtime,-7);
            this.getdeviceDetail(this.selectType,starttime,endtime,this.deviceID);
            break;
          case 2:
            this.selectType = '0';
            console.log(this.addDate(endtime,-this.getDaysInMonth(nowdate.getFullYear(),(nowdate.getMonth()+1))));
            this.getdeviceDetail(this.selectType,this.addDate(endtime,-this.getDaysInMonth(nowdate.getFullYear(),(nowdate.getMonth()+1))),endtime,this.deviceID);
            break;
          case 3:
            this.selectType = '0';
            //console.log(this.addDate(endtime,-91));
            this.getdeviceDetail(this.selectType,this.addDate(endtime,-91),endtime,this.deviceID);
            break;
          case 4:
            this.selectType = '1';
            this.getdeviceDetail(this.selectType,(this.getPDate(6)+'-01'),(endMonth+'-01'),this.deviceID);
            //substring(str.length-4);
            break;
          case 5:
            this.selectType = '1';
            this.getdeviceDetail(this.selectType,(this.getPDate(12)+'-01'),(endMonth+'-01'),this.deviceID);
            //substring(str.length-4);
            break;

        }
      },
      //自定义的tab选项卡
      tab(index) {
        this.num = index;
      },
      scroll(){
        this.animate=true;    // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
        setTimeout(()=>{      //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
          this.warnItems.push(this.warnItems[0]);  // 将数组的第一个元素添加到数组的
          this.warnItems.shift();               //删除数组的第一个元素
          this.animate=false;  // margin-top 为0 的时候取消过渡动画，实现无缝滚动
        },500)
      },
      //获取设备信息列表
      getDeviceInfoLists(id){
        let that = this;
        let config = {
          'device_id':id
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.post('drainage/drainage_device_info', config, headers).then(res => {
          let data = res.data;
          console.log('设备信息列表', config, res);
          if(data.code==0){

            let content = data.data[0].content;
            let tempArr = [];
            content.title.map((item,i)=>{
              let obj = {};
              obj.name = item;
              obj.value = content.descr[i];
              tempArr.push(obj);
            })
            this.deviceInfos = tempArr;
          }else{
            this.$message(data.message);
          }
        }).catch(err=>{
          console.log(err);
        })

      },
      //获取维保历史
      getProjectInfoLists(sysID,id){
        let that = this;
        let config = {
          'sys_menu_id':sysID,
          'device_id':id
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.post('drainage/drainage_device_protectinfo', config, headers).then(res => {
          let data = res.data;
          console.log('系统维保历史列表', config, res);
          if(data.code==0){
            this.maintenanceHis = data.data;
          }else{
            this.$message(data.message);
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      //获取系统设备详情
      getdeviceDetail(type,starttime,endtime,id){
        window.clearInterval(this.timer);//清除定时器
        this.echartData2 = [];
        this.timer = null;
        this.loading = true;
        this.value9 = [0,100];//初始化滑块
        let that = this;
        let config = {
          'project_id':this.$store.state.projectId,
          'starttime':starttime,
          'endtime':endtime,
          'type':type,
          'device_id':id
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.post('drainage/drainage_device_detail', config, headers).then(res => {
          let data = res.data;
          console.log('系统设备详情', config, res);
          if(data.code==0){
            let lineDataArr=[];
            let runTime = null;
            let pumpSwitch = null;
            this.dialog2Title = data.data.title;
            if (data.data.info.length != 0) {
              data.data.info.map((item, i) => {
                if (item.type == 1) {
                  lineDataArr.push(item)
                } else if (item.type == 2) {
                  runTime = item;
                } else if (item.type == 3) {
                  pumpSwitch = item;
                }
              })
              this.echartData2 = lineDataArr;

              let tempStr = runTime.data.substring(0,runTime.data.length-1);
              this.runTime = this.formatTime(tempStr);
              this.point_id = pumpSwitch.id;
              let pumpNowValue = pumpSwitch.data.now_value;
              let daiti = pumpSwitch.data.daiti;
              let nowState = '';
              daiti.value.some((item2,i2)=>{
                if (item2 == pumpNowValue) {
                  nowState = daiti.showvalue[i2];
                  return true;
                }
              })

              daiti.showvalue.map((item3,i3)=>{
                if (item3 == '开启'){
                  this.pumpOpen = daiti.value[i3];
                } else if (item3 == '关闭') {
                  this.pumpClose = daiti.value[i3];
                }
              })


              if (nowState == '开启') {
                //生成一个定时器
                window.clearInterval(this.timer);//清除定时器
                if (this.timer == null) {
                  this.timer = setInterval(() => {
                    this.runTime = this.formatTime(tempStr++);
                  }, 1000)
                }
                this.pumpSwitchText = '关闭水泵';
              } else if (nowState == '关闭') {
                window.clearInterval(this.timer);
                this.pumpSwitchText = '开启水泵';
              } else {
                window.clearInterval(this.timer);
                this.pumpSwitchText = '-';
              }
            } else {
              this.pumpSwitchText = '-';
              this.runTime = '00:00:00';
              this.echartData2 = [];

            }
            this.loading = false;

          }else{
            this.loading = false;
            this.$message(data.message);
            this.pumpSwitchText = '-';
            this.runTime = '00:00:00';
            this.echartData2 = [];
          }
        }).catch(err=>{
          this.loading = false;
          console.log(err);
          this.pumpSwitchText = '-';
          this.runTime = '00:00:00';
          this.echartData2 = [];
        })

      },
      //获取报警信息
      getWarnInfoLists(id){
        let that = this;
        let config = {
          'sys_menu_id':(this.$store.state.sysList[6].son_list[0].self_id==7?this.$store.state.sysList[6].son_list[0].sys_menu_id:this.$store.state.sysList[6].son_list[1].sys_menu_id),
          'floor_id':48,
          'self_id':1261,
          'device_id':id
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.post('drainage/drainage_alert', config, headers).then(res => {
          let data = res.data;
          console.log('单个系统设备报警信息列表', config, res);
          if(data.code==0){
            this.warnItems = data.data;
          }else{
            this.$message(data.message);
          }
        }).catch(err=>{
          console.log(err);
        })

      },
      //校验密码
      checkPwd(){
        let that = this;
        let config = {
          password:this.loginPwd
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.post('drainage/drainage_device_control', config, headers).then(res => {
          let data = res.data;
          if(data.code==0){
            if (data.data == 'success') {
              if (this.pumpSwitchText == '关闭水泵'){

                window.clearInterval(this.timer);//清除定时器

                this.getDeviceControl(this.point_id,this.pumpClose,'关')
                this.$refs.dialog3.hide();
              } else if (this.pumpSwitchText == '开启水泵') {

                window.clearInterval(this.timer);//清除定时器
                //生成一个定时器
                if (this.timer == null) {
                  this.timer = setInterval(() => {
                    this.runTime = this.formatTime((parseInt((this.runTime.split(':')[0])) * 3600 + parseInt((this.runTime.split(':')[1])) * 60 + parseInt((this.runTime.split(':')[2])) * 1) + 1);
                  }, 1000)
                }
                this.getDeviceControl(this.point_id,this.pumpOpen,'开')
                this.$refs.dialog3.hide();
              } else {
                window.clearInterval(this.timer);//清除定时器
                this.$message('无法操作！');
                this.$refs.dialog3.hide();
                this.pumpSwitchText = '-'
              }
            } else {
              this.isPwdTrue = true;
            }
          }else{
            this.isPwdTrue = true;
            this.$message(data.message);
          }
        }).catch(err=>{
          this.isPwdTrue = true;
          console.log(err);
        })
      },
      //水泵控制
      getDeviceControl(id,control,type){
        let that = this;
        let config = {
          'now_value':control,
          'point_id':id
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.get('https://tesing.china-tillage.com/realtime_pc/pc/control', config, headers).then(res => {
          let data = res.data;
          console.log('水泵设备控制', config, res);
          if(data.code==0){
            this.$message({
              type: 'success',
              message: data.message
            });
            type == '关' ? this.pumpSwitchText = '开启水泵' : this.pumpSwitchText = '关闭水泵';
          }else{
            this.$message(data.message);
          }
        }).catch(err=>{
          console.log(err);
        })

      },

      //水泵详情页展示设备信息卡
      showDeviceInfoTab(){
        this.$refs.dialog2.hide();
        this.showDeviceInfo(this.deviceItems);

      },
      openClosePump(text){
        this.loginPwd='';
        this.isPwdTrue = false;
        this.$refs.dialog3.show();
      },
      changeVal(b){
        this.sendVal = b;
        console.log(this.sendVal)
      },
      format(a){
        //console.log(a)
        return a+'%';
      },
      handleClick(tab, event) {
        //console.log(tab, event);
      },
      showEcharts(item){
        //初始化选项
        this.btnNum = 0;
        this.selectType = '0';
        this.runTime = '00:00:00';
        this.pumpSwitchText = '-';
        this.echartData2 = [];
        this.value9 = [0,100];
        window.clearInterval(this.timer);//清除定时器


        this.deviceItems = item;
        let nowdate = new Date();
        this.$refs.dialog2.show();
        this.deviceID = item.device_id;
        this.getdeviceDetail(this.selectType,this.addDate(nowdate.getFullYear()+'-'+(nowdate.getMonth()<10?('0'+(nowdate.getMonth()+1)):(nowdate.getMonth()+1))+'-'+(nowdate.getDate()<10?('0'+nowdate.getDate()):nowdate.getDate()),-7),nowdate.getFullYear()+'-'+(nowdate.getMonth()<10?('0'+(nowdate.getMonth()+1)):(nowdate.getMonth()+1))+'-'+(nowdate.getDate()<10?('0'+nowdate.getDate()):nowdate.getDate()),item.device_id);
        this.getWarnInfoLists(item.device_id)

      },
      showDeviceInfo(item){
        console.log(item)
        this.deviceName = item.device_name;
        this.$refs.dialog.show();
        this.getDeviceInfoLists(item.device_id);
        this.getProjectInfoLists(item.sys_menu_id,item.device_id);
      }
    },
    created() {
      setInterval(this.scroll,1000)
    },
    mounted() {

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped type="text/less">
  @import '../../../assets/css/comon';
  @import '../../../assets/css/common.css';
  .dialog3-in {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    //background-color: yellow;
    .p-text {
      margin-top: 0.3rem;
      font-family: PingFangSC-Regular;
      font-size: 0.18rem;
      line-height: 1;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #b5d7ff;
      text-align: center;
    }
    .inputWrap {
      margin-top: 0.3rem;
      width: 100%;
      .input-text {
        display: block;
        margin: 0 auto;
        padding: 0 0.1rem;
        width: 3.08rem;
        height: 0.44rem;
        background-color: #001838;
        box-shadow: 0px 0px 2px 0px rgba(87, 113, 176, 0.15),
        inset 0px 1px 3px 0px rgba(0, 0, 0, 0.5);
        border: 1px solid transparent;
        outline: none;

        font-family: PingFangSC-Regular;
        font-size: 0.16rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: 1px;
        color: #ffa414;
        &.error{
          border: solid 1px #fa6074;
        }
      }
      .span-error{
        margin-left: 0.28rem;
        display: block;
        margin-top: 8px;
        font-family: PingFangSC-Regular;
        font-size: 0.12rem;
        line-height: 1;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #fa6074;
      }

    }
    .btnWrap{
      width: 100%;
      display: flex;
      justify-content: center;
      position: absolute;
      left: 0;
      bottom: 0;
      button{
        display: inline-block;
        width: 50%;

        //border-bottom-left-radius: 8px;
        border: solid 1px #4a90e2;
        outline: none;
        font-family: PingFangSC-Regular;
        font-size: 0.14rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.43rem;
        letter-spacing: 0px;
        color: #ffffff;
        background-color: #051732;
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 8px;
        &:first-of-type{
          background-color: #3b85ef;
          box-shadow: 0px 4px 10px 0px
          rgba(74, 144, 226, 0.4),
          inset 1px 1px 2px 0px
          rgba(248, 253, 255, 0.15),
          inset 0px -1px 1px 0px
          #4a90e2;
          border: solid 1px transparent;
          border-bottom-right-radius: 0px;
          border-bottom-left-radius: 8px;
        }
      }
    }
  }
  //自定义tab

  .self-tab-head{
    margin-top: 0.14rem;
    width: 100%;
    height: 0.31rem;
    display: flex;
    justify-content: center;
    li{

      cursor: pointer;
      margin-right: 0.1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.06rem 0.1rem;
      background-color: rgba(59, 137, 249, 0.2);
      border-radius: 4px;
      border: 1px solid transparent;

      font-family: PingFangSC-Regular;
      font-size: 0.14rem;
      line-height: 1;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #c6c6c6;
      &.active{
        color: #3b89f9;
        background-color: #0c274c;
        border: solid 1px #3b89f9;
      }
      .icon-lineItem{
        margin-left: 0.1rem;
        width: 0.24rem;
        height: 0.1rem;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        .one{
          display: inline-block;
          width: 0.24rem;
          height: 2px;
          background-color: #c6c6c6;
          border-radius: 7px;
          position: absolute;
        }
        .two{
          display: inline-block;
          width: 0.1rem;
          height: 0.1rem;
          border-radius: 50%;
          background-color: #c6c6c6;
        }
      }
    }
  }
  .anim{
    transition: all 0.5s;
    margin-top: -0.3rem;
  }
  #con2 li{
    list-style: none;
    line-height: 0.3rem;
    height: 0.3rem;
  }

  .dialog2-in{
    width: 100%;
    height: 100%;
    .head{
      padding: 0 0.2rem;
      display: flex;
      align-items: center;
      width: 100%;
      .vh(50);
      background-color: rgba(0, 0, 0, 0.2);
      .self-border{
        &:active{
          border: solid 1px #3b89f9 !important;
        }
      }
      &>*{
        display: inline-block;
      }
      .title{
        min-width: 2.55rem;
        height: 0.16rem;
        font-family: PingFangSC-Regular;
        font-size: 0.16rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: 0px;
        color: #ffffff;
        white-space:nowrap;
        overflow: hidden;
      }
      .col-line{
        width: 1px;
        .vh(20);
        background-color: #4a90e2;
        border-radius: 0.36rem;
        margin: auto 0.2rem;
      }
      .warnInfoBox{
        overflow: hidden;
        padding: 0 0.1rem;
        width: 4rem;
        .vh(30);
        background-color: #011f51;
        box-shadow: 0px 0px 2px 0px
        rgba(87, 113, 176, 0.15),
        inset 0px 0px 3px 0px
        rgba(0, 0, 0, 0.33);
        border: solid 0px #000c22;
        .itemWrap {
          width: 100%;
          height: 100%;
          .item{
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-start;

          }


          .icon-info {
            display: inline-block;
            transform: scale(0.8);
            width: 0.26rem;
            height: 0.23rem;
            background: url("../../../assets/img/WaterSupplyAndDrainage/icon_msg.png") no-repeat center;
            background-size: 100% 100%;
          }
          .warnInfo {
            font-family: PingFangSC-Regular;
            font-size: 0.13rem;
            font-weight: normal;
            font-stretch: normal;
            line-height: 1;
            letter-spacing: 1px;
            color: #ffa414;
          }
          .date {
            font-family: PingFangSC-Regular;
            font-size: 0.13rem;
            font-weight: normal;
            font-stretch: normal;
            line-height: 1;
            letter-spacing: 0px;
            color: #ed4a4a;
          }
        }
      }
      .runTimeBox{
        margin-left: 0.3rem;
        margin-right: 0.45rem;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 2.52rem;
        .vh(32);

        font-family: PingFangSC-Regular;
        font-size: 0.2rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: 0px;
        color: #2df0e0;
        .text{
          font-family: PingFangSC-Regular;
          font-size: 0.16rem;
          line-height: 1;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #ffffff;
        }
      }
      .self-btn{
        &:active{
          border: 0;
          outline: none;
        }
        &:focus{
          border: 0;
          outline: none;
        }
        cursor: pointer;
        margin-left: 0.12rem;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1.1rem;
        .vh(32);
        background-color: rgba(59, 137, 249, 0.2);
        border-radius: 4px;

        font-family: PingFangSC-Medium;
        font-size: 0.14rem;
        font-weight: normal;
        font-stretch: normal;
        //line-height: 1;
        letter-spacing: 0px;
        color: #ffffff;

        border: 0;
        padding: 0;
        .icon-switch{
          margin-right: 0.1rem;
          display: inline-block;
          width: 0.16rem;
          height: 0.16rem;
          background: url("../../../assets/img/WaterSupplyAndDrainage/icon_switch.png") no-repeat center;
          background-size: 100% 100%;
        }
      }
    }
    .body{
      width: 100%;
      .vh(581);
      .selectBox {
        //padding: 0.3rem 0.2rem 0 0.2rem;
        padding: 0 0.2rem;
        width: 100%;
        .vh(135);
        .slider-select-box {
          //margin-top: 0.46rem;
        }
        .quick-select{
          display: flex;
          justify-content: center;
          .text{
            display: flex;
            width: 0.82rem;
            .vh(32);
            justify-content: center;
            align-items: center;
            font-family: PingFangSC-Regular;
            font-size: 0.15rem;
            font-weight: normal;
            font-stretch: normal;
            line-height: 1;
            letter-spacing: 0px;
            color: #ffffff;
            margin-right: 0.1rem;
          }
          .self-btn{
            margin-left: 0.1rem;
            width: 0.82rem;
            .vh(32);
            background-color: #0c274c;
            border-radius: 1rem;
            padding: 0;

            font-family: PingFangSC-Regular;
            font-size: 0.14rem;
            font-weight: normal;
            font-stretch: normal;
            line-height: 1;
            letter-spacing: 0px;
            color: #ffffff;
            border: solid 1px transparent;
            outline: none;
            &:active{
              border: solid 1px #3b89f9;
            }
            &.active{
              border: solid 1px #3b89f9;
            }
          }
        }
      }
      .echart-boxs{
        width: 100%;
        .vh(453);
        //background-color: green;
        .echart-box{
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .self-step-box{
    margin-top: 0.2rem;
    .title{
      display: flex;
      align-items: center;
      font-family: PingFangSC-Light;
      font-size: 0.14rem;
      font-weight: normal;
      font-stretch: normal;
      line-height: 24px;
      letter-spacing: 0px;
      color: #b5d7ff;
      .col-line{
        margin: 0 0.1rem;
        display: inline-block;
        width: 1px;
        height: 0.14rem;
        background-image: linear-gradient(180deg,
        #00c1ff 0%,
        #008efe 100%);
        border-radius: 0.14rem;
      }
    }
    .content{
      overflow: hidden;
      padding: 0.1rem;
      width: 100%;
      min-height: 0.34rem;
      background-color: #011f51;
      box-shadow: 0px 0px 2px 0px
      rgba(87, 113, 176, 0.15),
      inset 0px 0px 3px 0px
      rgba(0, 0, 0, 0.33);
      border: solid 0px #000c22;

      font-family: PingFangSC-Light;
      font-size: 0.14rem;
      font-weight: normal;
      font-stretch: normal;
      line-height: 0.22rem;
      letter-spacing: 1px;
      color: #ffffff;
    }
  }



  .self-dialog-title{
    display: flex;
    align-items: center;
    width: 100%;
    height: 0.5rem;
    background-color: rgba(0, 0, 0, 0.2);
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    padding: 0 0.2rem;

    font-family: PingFangSC-Regular;
    font-size: 0.16rem;
    font-weight: normal;
    font-stretch: normal;
    line-height: 1;
    letter-spacing: 0px;
    color: #ffffff;
  }
  .dialog-in{
    width: 100%;
    height: 4.86rem;
    padding: 0.16rem 0.2rem;

  }
  .deviceInfoBox{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .row{
      display: block;
      width: 50%;
      padding: 0 0.1rem;
      margin-top: 0.3rem;
      font-family: PingFangSC-Light;
      font-size: 0.14rem;
      font-weight: normal;
      font-stretch: normal;
      line-height: 1;
      letter-spacing: 0px;
      color: #4f648b;
      .name{
        display: inline-block;
        width: 1rem;
      }
      .value{
        color: #fff;
      }
    }
  }

  .devicesBox{
    margin-top: 0.2rem;
    padding: 0.2rem 0.19rem;
    width: 100%;
    height: 5.38rem;
    background-color: transparent;
    box-shadow: 0px 4px 10px 0px
    rgba(74, 144, 226, 0.22),
    inset 1px 1px 2px 0px
    rgba(248, 253, 255, 0.15),
    inset 0px -1px 1px 0px
    #4a90e2;
    border-radius: 4px;

    .itemBox {
      width: 100%;
      min-height: 4.98rem;
      display: flex;
      justify-content: flex-start;
      align-content: space-between;
      flex-wrap: wrap;
      .item {
        width: 2.4rem;
        height: 2.4rem;
        background-color: rgba(0, 0, 0, 0.25);
        border-radius: 8px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover{
          background-color: rgba(43, 93, 158, 0.25);
          cursor: pointer;
        }
        &:hover .tip{
          display: flex;
        }
        .tip{
          display: none;
          position: absolute;
          left: 0.12rem;
          top:0.11rem;
          //display: flex;
          align-items: center;
          justify-content: center;
          width: 0.78rem;
          height: 0.2rem;
          background-color: rgba(0, 0, 0, 0.25);
          border-radius: 1rem;

          font-family: PingFangSC-Regular;
          font-size: 0.1rem;
          font-weight: normal;
          font-stretch: normal;
          line-height: 1;
          letter-spacing: 0px;
          color: #2df0e0;

        }
        .icon-circle{
          position: absolute;
          right: 0.12rem;
          top:0.12rem;
          width: 0.12rem;
          height: 0.12rem;
          border-radius: 50%;
          background-color: #fff;
        }
        .img{
          width: 2.18rem;
          height: 1.78rem;
        }
        .device-name{
          position: absolute;
          left: 0;
          bottom: 0.15rem;
          width: 100%;
          font-family: PingFangSC-Regular;
          font-size: 0.14rem;
          font-weight: normal;
          font-stretch: normal;
          line-height: 1;
          letter-spacing: 0px;
          color: #ffffff;
          text-align: center;
        }
      }
    }
  }

</style>
