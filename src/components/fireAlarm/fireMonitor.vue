<!--
    消防报警系统 火警监测
    made by 胡永福
    start in 2018-8-24
-->
<template>
  <div>
    <div ref="HpadTop" class="tabsDomBox0 h-paddingTop">
      <div class="navCrumbs"><p @click="toHome">首页</p> > 消防系统 > <span>火警监测</span></div>
    </div>
    <div :style="fireState!=0?{boxShadow:'none'}:null" class="fireMonitor">
      <div v-if="fireState==0" class="noHaveFire">
        <div ref="building" class="building">
          <img src="../../assets/img/WaterSupplyAndDrainage/floor3D.png" alt="建筑图">
        </div>
      </div>
      <div ref="radarBox" class="radarBox" :style="isDetail?{top:'-1.90rem'}:null">
        <div class="radar1">
          <div class="radar2"></div>
        </div>
        <div class="row-line"></div>
        <div class="col-line"></div>
      </div>
      <div class="radarBoxBg" :style="isDetail?{top:'0.46rem'}:null"></div>
      <div v-if="fireState!=0" class="haveFire">
        <div class="infoCardBox">
          <el-scrollbar v-show="fireWarnLists.length!==0" style="height:100%">
            <div class="infoCard" @mouseenter="toggleCir(v.device_id,1)" @mouseleave="toggleCir(v.device_id,0)" v-for="(v,i) in fireWarnLists" :key="i">
              <div class="type" v-text="v.class"></div>
              <div class="content">
                <div class="top">
                  <span class="time" v-text="v.time"></span>
                  <button type="button" class="btn" @click="showVideo(v,i)">
                    <span class="icon_play"></span>
                    视频
                  </button>
                </div>
                <div class="bottom" v-text="v.devicename+v.message"></div>
              </div>
            </div>
          </el-scrollbar>
          <div class="infoCardBoxIn" style="width: 100%;height: 100%;" v-show="fireWarnLists.length===0">无告警信息</div>
        </div>
        <!--<div class="buildingBox" :style="fireWarnLists.length===0?{width: '100%'}:null">-->
        <div class="buildingBox">
          <div v-show="!isDetail" class="floors">
              <div style="position: absolute;z-index: 1;width:604px;height:583px;">
                <div style="position: relative;width: 100%;height: 100%;">
                  <div style="width: 100%;height: 100%;">
                    <img src="../../assets/img/fireAlarm/no.png" usemap="Map" style="width:604px;height:583px;" />
                    <map id="Map" name="Map">
                      <!--<area alt="4f" href="javascript:void(0)" style="background:#ccc;" coords="551, 105, 538, 182, 387, 213, 374, 201, 289, 220, 296, 231, 63, 282, 41, 225, 23, 229, 5, 164, 166, 141, 144, 104, 136, 38, 231, 148, 370, 126, 382, 135, 551, 105" shape="poly" @mouseenter="showArea('floor_4',1)" @mouseleave="showArea('floor_4',0)" @click="showFloor(4)" />
                      <area alt="3f" href="javascript:void(0)" style="background:#ccc;" coords="538, 185, 524, 276, 382, 312, 370, 301, 291, 322, 296, 333, 82, 387, 60, 324, 45, 327, 25, 259, 6, 172, 24, 229, 40, 226, 61, 282, 297, 235, 291, 221, 374, 205, 385, 215, 538, 185" shape="poly" @mouseenter="showArea('floor_3',1)" @mouseleave="showArea('floor_3',0)" @click="showFloor(3)" />
                      <area alt="2f" href="javascript:void(0)" style="background:#ccc;" coords="522, 281, 510, 363, 376, 401, 366, 387, 291, 410, 298, 422, 97, 482, 76, 413, 61, 417, 40, 344, 25, 265, 44, 329, 60, 326, 82, 389, 297, 336, 290, 322, 369, 304, 379, 313, 522, 281" shape="poly" @mouseenter="showArea('floor_2',1)" @mouseleave="showArea('floor_2',0)" @click="showFloor(2)" />-->
                      <area alt="1f" href="javascript:void(0)" style="background:#ccc;" coords="208, 219, 691, 389, 828, 333, 826, 303, 691, 342, 673, 341, 200, 186, 208, 219" shape="poly" @mouseenter="showArea('floor_1',1)" @mouseleave="showArea('floor_1',0)" @click="showFloor(1)" />
                    </map>
                  </div>
                </div>
              </div>
              <div style="position: absolute;z-index: 0;width: 0;height: 0;">
                <div style="position: relative;width: 100%;height: 100%;">
                  <div style="width: 100%;height: 100%;">
                    <div style="width:604px;height:583px;position:relative;">
                      <!--<div class="floor4" style="" ref="floor_4"></div>
                      <div class="floor3" style="" ref="floor_3"></div>
                      <div class="floor2" style="" ref="floor_2"></div>-->
                      <div class="floor1" style="" ref="floor_1"></div>
                    </div>
                  </div>
                </div>
              </div>
              <img src="../../assets/img/fireAlarm/floors.png" style="width:604px;height:583px;" />
              <div v-if="false" class="img_red"></div>
            <div v-if="false" v-show="showTip" class="self-tip" style="left:-1.6rem;top:3.43vh;">
              <div class="tit">
                2018/09/11 14:35
              </div>
              <div class="con">
                酒楼7层消防设备发生火灾报警情况，请火速处理
              </div>
              <div class="sjx"></div>
            </div>
          </div>

          <div v-show="isDetail" class="floorDetail">
            <i class="el-icon-circle-close colseBoxs" style="position: absolute;right: -5px;top: -5px" @click="hide"></i>
            <div class="title">{{floorTit}}</div>
            <div class="floorBoxWrap">
              <div class="floorBox">
                <div v-show="showCir" class="spot" style="left: 139px;top: 92px">
                  <div class="circle"></div>
                  <div class="circle2"></div>
                  <div v-if="cirStateArr[0]" class="circle3"></div>
                </div>

                <div v-show="showCir" class="spot" style="left: 692px;top: 57px">
                  <div class="circle"></div>
                  <div class="circle2"></div>
                  <div v-if="cirStateArr[1]" class="circle3"></div>
                </div>

                <div v-show="showCir" class="spot" style="left: 277px;top: 162px">
                  <div class="circle"></div>
                  <div class="circle2"></div>
                  <div v-if="cirStateArr[2]" class="circle3"></div>
                </div>

                <div v-show="showCir" class="spot" style="left: 410px;top: 37px">
                  <div class="circle"></div>
                  <div class="circle2"></div>
                  <div v-if="cirStateArr[3]" class="circle3"></div>
                </div>

                <div v-show="showCir" class="spot" style="left: 600px;top: 30px">
                  <div class="circle"></div>
                  <div class="circle2"></div>
                  <div v-if="cirStateArr[4]" class="circle3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="videoBoxWrap" v-show="isShowVideo">
          <i class="el-icon-circle-close colseBoxs" style="position: absolute;right: -5px;top: -5px" @click="hideVideo"></i>
          <div class="title" v-text="videoTit"></div>
          <div class="videoBox">
            <iframe
              ref="fireVideo"
              name="myFrame22"
              frameborder="0"
              width="100%"
              height="100%"
              :src="iframeSrc">

            </iframe>
            <div class="videoList">
              <button v-for="(v,i) in videoList" :class="['item',{active:videoBtnActive==i}]" type="button" @click="selVideo(v,i)" v-text="(i+1)<10?('0'+(i+1)):(i+1)"></button>
            </div>
          </div>
        </div>
      </div>
      <Dialog wid = "3.64rem" hei = "2.16rem" ref = "dialog">
        <div class="dialog-in">
          <div class="content">是否确认消除此报警信息？</div>
          <div class="btnWrap">
            <button @click="dealWarn(warnId,warnIndex,type)" type="button">确定</button>
            <button @click="()=>{this.$refs.dialog.hide();this.$message('取消操作！');}" type="button">取消</button>
          </div>
        </div>
      </Dialog>
    </div>
    <transition name="el-fade-in-linear">
      <!--报错提示-->
      <div class="errTipBox" v-html="errMsg" v-show="errorTipShow"></div>
    </transition>
  </div>
</template>
<script>
  import utils from "../../assets/js/utils.js";
  export default {
    components:{

    },
    name:'fireMonitor',
    data () {
      return {
        iframeSrc:'',
        iframeWin:{},
        videoUrl:'',
        floorTit:'',
        cirStateArr:[false,false,false,false,false],
        showTip:true,
        showCir:false,
        fireState:1,

        type:'',//1为解除报警，2为误报
        warnId:'',
        warnIndex:'',
        fireWarnLists:[
          /*{
            "class": "烟感报警",
            "device_id": "113",
            "devicename": "酒楼4层-点型光电感烟火灾探测器-22204004",
            "key": "1543802817alarm22d0job0",
            "location": "消防报警酒楼四层",
            "message": "测试一下",
            "time": "2018-12-3 09:36:55"
          },
          {
            "class": "烟感报警2",
            "device_id": "114",
            "devicename": "酒楼4层-点型光电感烟火灾探测器-22204004",
            "key": "1543802817alarm22d0job01",
            "location": "消防报警酒楼四层",
            "message": "测试一下",
            "time": "2018-12-3 09:36:56"
          }*/
        ],

        isDetail:false,

        errMsg:"",
        errorTipShow:false,
        isError:false,
        codeError:false,
        emptyInputs:true,
        //视频部分
        videoTit:'',
        isShowVideo:false,
        videoBtnActive:0,

        videoList:[

        ]

      }
    },
    methods:{
      toggleCir(id,type){
        if (type === 1) {
          switch (id){
            case '1':
              this.cirStateArr = [true,false,false,false,false];
              break;
            case '2':
              this.cirStateArr = [false,true,false,false,false];
              break;
            case '3':
              this.cirStateArr = [false,false,true,false,false];
              break;
            case '4':
              this.cirStateArr = [false,false,false,true,false];
              break;
            case '5':
              this.cirStateArr = [false,false,false,false,true];
              break;
          }
        } else {
          this.cirStateArr = [false,false,false,false,false];
        }
      },
      selVideo(item,index){
        this.videoBtnActive = index;
        this.iframeSrc = item.now_value;
        //console.log(item)
        /*this.iframeWin.postMessage({
          cmd: 'changeUrl',
          params: {
            url:item.now_value
          }
        }, '*')*/
      },
      showVideo(item,index){
        this.videoBtnActive = 0;
        this.destroyVideo();
        let that = this;
        let config = {
          device_id:item.device_id,
          key:item.key,
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.post('app_firealarm/firealarm_videos',config,headers).then(res=>{
          let data = res.data;
          console.log('查看视频数据',config,res);
          if (data.code==0){
            this.isShowVideo = true;
            let videoData = data.data;
            /*videoData = [
              {
                "class": "烟感报警",
                "location": "消防报警酒楼四层",
                "now_value": "ws://120.76.20.236:8081/action=stream,project=14,camera=25??",
                "time": "2018-12-3 09:36:55"
              },
              {
                "class": "烟感报警2",
                "location": "消防报警酒楼四层2",
                "now_value": "ws://120.76.20.236:8081/action=stream,project=14,camera=20??",
                "time": "2018-12-3 09:36:56"
              }
            ];*/
            this.videoList = videoData;

            if (videoData.length !== 0) {
              this.iframeSrc = videoData[0].now_value;
              /*this.iframeWin.postMessage({
                cmd: 'changeUrl',
                params: {
                  url: videoData[0].now_value
                }
              }, '*')*/
            }

          } else {
            this.isShowVideo = false;
            this.$message(data.message);
          }
        }).catch(err=>{
          this.isShowVideo = false;
          console.log(err);
        })
        this.videoTit = item.time;

      },
      hideVideo(){
        this.videoBtnActive = 0;
        this.isShowVideo = false;
        this.destroyVideo();
      },
      //销毁视频
      destroyVideo(){
        /*this.iframeWin.postMessage({
          cmd: 'destroyVideo',
          params: {
          }
        }, '*')*/
      },

      //消防报警监测信息列表请求
      getMonitorData(){
        let that = this;
        let config = {
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.post('app_firealarm/firealarm_monitoring',config,headers).then(res=>{
          let data = res.data;
          console.log('消防监测信息列表',config,res);
          if (data.code==0){

            this.fireWarnLists = data.data
          } else {
            this.$message(data.message);
          }
        }).catch(err=>{
          console.log(err);
        })

      },
      //隐藏楼层内页
      hide(){
        this.showTip = true;
        this.isDetail = false;
        this.showCir = false;
      },
      //显示楼层内页
      showFloor(floor){
        this.showTip = false;
        this.isDetail = true;
        if (floor == 1) {
          //this.showCir = true;
          this.floorTit = '酒店7楼'
        } else if (floor == 3) {
          this.floorTit = '酒店3楼'
        } else if (floor == 2) {
          this.floorTit = '酒店2楼'
        } else if (floor == 4) {
          this.floorTit = '酒店1楼'
        }
      },
      //鼠标悬浮楼层事件
      showArea(domID,state){
        if (state == 1) {
          Velocity(this.$refs[domID], {
            opacity: 1
          }, {
            duration: 300
          });
        } else if (state === 0){
          Velocity(this.$refs[domID], {
            opacity: 0
          }, {
            duration: 300
          });
        }
      },

      //初始化
      init() {

        let newArr = [];
        /*let arr = [1102,211,1076,365,774,427,748,403,579,441,592,462,127,564,82,450,47,458,11,329,333,282,288,208,273,77,462,297,741,252,765,270,1102,211];*/
        /*let arr = [1076,371,1048,552,764,624,741,602,583,644,592,667,164,774,121,648,91,655,50,518,12,344,48,458,80,453,123,564,595,471,583,442,748,411,771,430,1076,371];*/
        /*let arr = [1044,562,1020,726,753,802,732,774,582,820,597,844,194,964,153,826,123,835,80,688,50,530,89,659,120,653,164,779,595,673,580,644,738,609,759,627,1044,562];*/
        /*let arr = [1018,729,992,897,750,976,729,944,250,1095,214,991,164,1006,123,864,145,859,141,832,153,827,197,962,600,848,582,818,730,779,748,803,1018,729];
        arr.map(item=>{
          console.log(Math.floor(item/2))
          newArr.push(Math.floor(item/2))
        })
        console.log(newArr)*/
        let $this = this;
        setTimeout(()=>{
          Velocity(this.$refs.radarBox, {
            scale:(0.185,0.185),
            right:'-2.34rem',
            top:'-2.34rem',
          }, {
            duration: 1000,
            easing: 'linear',
            complete: function(elements) { console.log(elements);$this.getMonitorData(); }
          });
        },5000)


      },

      //确认操作
      showSure(id,index,type){
        this.type = type;
        this.warnId = id;
        this.warnIndex = index;
        this.$refs.dialog.show();
      },
      toHome(){
        this.$router.replace({ path: '/home', params: { isLogin: true} });
      }
    },
    created() {

    },
    mounted() {
      //this.init();
      this.$refs.HpadTop.style.paddingTop = Number(this.$parent.$children[0].$el.children[0].offsetHeight)+30+'px';
      this.getMonitorData();
      //this.iframeWin = this.$refs.fireVideo.contentWindow;



    },
    destroyed(){
      this.iframeSrc = '';
    },
    watch:{
      /*fireWarnLists:function (newVal,oldVal) {
        if (newVal.length === 0){
          this.fireState = 0;
          //恢复
          Velocity(this.$refs.radarBox, {
            scale:(1,1),
          }, {
            duration: 0,
            easing: 'linear',
            //complete: function(elements) { console.log(elements);$this.getMonitorData(); }
          });
         //再次初始化
          this.init();
        }
      }*/
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">
  @import '../../assets/css/common.css';
  @import '../../assets/css/comon';
  .el-popper[x-placement^=bottom] .popper__arrow{
    border-bottom-color: #4A90E2 !important;
  }
  .errTipBox{
    width: 2.29rem;
    line-height: .48rem;
    background-color: #051732;
    border-radius: 4px;
    text-align: center;
    font-size: .14rem;
    color: #fff;
    position: absolute;
    bottom: .7rem;
    left:50%;
    transform: translate(-50%,0);
  }
  //动画暂停与播放
  .paused{
    animation-play-state: paused;
  }
  .play{
    animation-play-state: running;
  }

  @keyframes circleScale {
    0%{
      transform: scale(1,1);
    }
    100%{
      transform: scale(3.05,3.05);
    }
  }
  .floor4{
    width:604px;
    height:583px;
    position:absolute;
    background:url('../../assets/img/fireAlarm/floor4.png') no-repeat center;
    background-size: 100% 100%;
    left:0px;
    top:0px;
    opacity: 0;
  }
  .floor3{
    width:604px;
    height:583px;
    position:absolute;
    background:url('../../assets/img/fireAlarm/floor3.png') no-repeat center;
    background-size: 100% 100%;
    left:0px;
    top:0px;
    opacity: 0;
  }
  .floor2{
    width:604px;
    height:583px;
    position:absolute;
    background:url('../../assets/img/fireAlarm/floor2.png') no-repeat center;
    background-size: 100% 100%;
    left:0px;
    top:0px;
    opacity: 0;
  }
  .floor1{
    width:604px;
    height:583px;
    position:absolute;
    background:url('../../assets/img/fireAlarm/floor1.png') no-repeat center;
    background-size: 100% 100%;
    left:0px;
    top:0px;
    opacity: 0;
  }
  .radarBox{
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    transform:scale(0.185);
    right:-2.34rem;
    top:-2.34rem;
    width:5.94rem;
    height: 5.94rem;
    border-radius: 50%;
    box-shadow: 0px 2px 4px 0px
    rgba(0, 0, 0, 0.5);
    border: solid 2px #00ef01;
    background-color: rgba(255,255,255,0.15);
    .radar1{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 74%;
      height: 74%;
      border-radius: 50%;
      box-shadow: 0px 2px 4px 0px
      rgba(0, 0, 0, 0.5);
      border: solid 2px #00ef01;
      .radar2{
        width: 50%;
        height: 50%;
        border-radius: 50%;
        box-shadow: 0px 2px 4px 0px
        rgba(0, 0, 0, 0.5);
        border: solid 2px #00ef01;
      }
    }
    .row-line{
      position: absolute;
      left: 0;
      top: auto;
      width: 100%;
      height: 3px;
      background-color: #00ef01;
    }
    .col-line{
      position: absolute;
      left: auto;
      top: 0;
      width: 3px;
      height: 100%;
      background-color: #00ef01;
    }
    &:before {
      content: ' ';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      animation: blips 5s infinite;
      animation-timing-function: linear;
      animation-delay: 1.4s;
    }
    &:after {
      content: ' ';
      display: block;
      background-image: linear-gradient(44deg, rgba(0, 255, 51, 0) 50%, #00ef01 100%);
      width: 50%;
      height: 50%;
      position: absolute;
      top: 0;
      left: 0;
      animation: radar-beam 5s infinite;
      animation-timing-function: linear;
      transform-origin: bottom right;
      border-radius: 100% 0 0 0;
    }
  }
  .radarBoxBg{
    z-index: 99;
    position: absolute;
    top: 0.03rem;
    right: 0.03rem;
    width: 1.2rem;
    height: 1.2rem;
    border: 1px solid rgba(20,60,124,0.7);
    border-radius: 50%;
    background-color: rgba(20,60,124,0.4);
  }
  .fireMonitor{
    margin: 0 auto;
    margin-top: 0.1rem;
    width: 13.06rem;
    .vh(610);
    /*height: 6.10rem;*/
    //background-color: #000000;
    box-shadow: 0px 4px 10px 0px
    rgba(73, 143, 226, 0.22),
    inset 1px 1px 2px 0px
    rgba(248, 253, 255, 0.15),
    inset 0px -1px 1px 0px
    #498fe2;
    border-radius: 4px;

    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    .haveFire{
      position: relative;
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 100%;
      .infoCardBox{
        .infoCardBoxIn{
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0px 4px 10px 0px
          rgba(73, 143, 226, 0.22),
          inset 1px 1px 2px 0px
          rgba(248, 253, 255, 0.15),
          inset 0px -1px 1px 0px
          #498fe2;
          border-radius: 4px;
        }
        width: 3.12rem;
        height: 100%;
        overflow: hidden;
        .infoCard{
          display: flex;
          justify-content: space-between;
          .vhMT(20);
          width: 3.12rem;
          .vh(137);
          box-shadow: 0px 4px 10px 0px
          rgba(73, 143, 226, 0.22),
          inset 1px 1px 2px 0px
          rgba(248, 253, 255, 0.15),
          inset 0px -1px 1px 0px
          #498fe2;
          border-radius: 4px;
          &:first-of-type{
            margin-top: 0;
          }
          .type{
            display: flex;
            align-items: center;
            justify-content: center;
            width:0.4rem;
            height: 100%;
            font-size:0.14rem;
            font-family:PingFangSC-Medium;
            font-weight:500;
            color:rgba(255,255,255,1);
            line-height:0.4rem;
            letter-spacing: 0.05rem;
            background-color: #b32c33;
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
            writing-mode: vertical-lr;/*从左向右 从右向左是 writing-mode: vertical-rl;*/
            writing-mode: tb-lr;/*IE浏览器的从左向右 从右向左是 writing-mode: tb-rl；*/
          }
          .content{
            width: 2.72rem;
            height: 100%;
            padding-left: 0.16rem;
            padding-right: 0.11rem;
            .vhPT(12);
            .vhPB(5);
            .top{
              display: flex;
              justify-content: space-between;
              .time{
                display: flex;
                align-items: center;
                .vh(32);
                font-size:0.16rem;
                font-family:PingFangSC-Medium;
                font-weight:500;
                color:rgba(255,255,255,1);
                line-height:1;
              }
              .btn{
                display: flex;
                align-items: center;
                justify-content: center;
                width:0.72rem;
                .vh(32);
                border: 1px solid #4789d6;
                background-color: #051732;
                border-radius: 4px;
                outline: none;
                cursor: pointer;
                font-size:0.14rem;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(255,255,255,1);
                padding: 0;
                .icon_play{
                  display: inline-block;
                  width: 0.16rem;
                  height: 0.16rem;
                  background: url("../../assets/img/fireAlarm/icon_play.png") no-repeat center;
                  background-size: 100% 100%;
                  margin-right: 0.07rem;
                }
              }
            }
            .bottom{
              .vhMT(8);
              font-size:0.14rem;
              font-family:PingFangSC-Regular;
              font-weight:400;
              color:rgba(255,255,255,1);
              line-height:0.24rem;
              letter-spacing:1px;
            }
          }
        }
        /*.infoCard{
          .vhMT(20);
          width: 3.12rem;
          .vh(137);
          box-shadow: 0px 4px 10px 0px
          rgba(73, 143, 226, 0.22),
          inset 1px 1px 2px 0px
          rgba(248, 253, 255, 0.15),
          inset 0px -1px 1px 0px
          #498fe2;
          border-radius: 4px;
          &:first-of-type{
            margin-top: 0;
          }
          .head{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 0.16rem;
            width: 100%;
            .vh(40);
            background-color: rgba(255, 54, 54, 0.7);
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            span{
              font-family: PingFangSC-Medium;
              font-size: 0.14rem;
              font-weight: normal;
              font-stretch: normal;
              line-height: 1;
              letter-spacing: 0px;
              color: #ffffff;
            }

          }
          .body{
            width: 100%;
            .vh(150);
            .content{
              display: flex;
              align-items: center;
              padding: 0 0.16rem;
              width: 100%;
              .vh(114);
              font-family: PingFangSC-Regular;
              font-size: 0.14rem;
              font-weight: normal;
              font-stretch: normal;
              line-height: 0.24rem;
              letter-spacing: 0px;
              color: #ffffff;
              overflow: hidden;
            }
            .btnBox{
              width: 100%;
              .vh(36);
              display: flex;
              justify-content: space-between;
              button{
                width: 50%;
                .vh(36);
                background-color: #041731;
                border: solid 1px #498fe2;

                font-family: PingFangSC-Regular;
                font-size: 0.14rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 1;
                letter-spacing: 0px;
                color: #ffffff;
                outline: none;
                &:first-of-type{
                  border-bottom-left-radius: 4px;
                  border-right: 0.5px solid #498fe2;
                }
                &:last-of-type{
                  border-bottom-right-radius: 4px;
                  border-left: 0.5px solid #498fe2;
                }
                &:active{
                  background-color: #3b85ef;
                  box-shadow: 0px 4px 10px 0px
                  rgba(73, 143, 226, 0.4),
                  inset 1px 1px 2px 0px
                  rgba(248, 253, 255, 0.15),
                  inset 0px -1px 1px 0px
                  #498fe2;
                }
              }
            }
          }
        }*/
      }
      .buildingBox{
        width: 9.74rem;
        .vh(610);
        box-shadow: 0px 4px 10px 0px
        rgba(73, 143, 226, 0.22),
        inset 1px 1px 2px 0px
        rgba(248, 253, 255, 0.15),
        inset 0px -1px 1px 0px
        #498fe2;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        .self-tip{
          .sjx{
            position: absolute;
            .vhBottom(-6);
            right: 0.1rem;
            border-style: solid;
            border-width: 0px 10px 10px 10px;
            border-color: transparent transparent #04152c transparent;
            width: 0px;
            height: 0px;
            transform: rotate(45deg);
          }
          position: absolute;
          background-color: #04152c;
          width: 2.85rem;
          height: 1.18rem;
          box-shadow: 0px 4px 10px 0px
          rgba(73, 143, 226, 0.22),
          inset 1px 1px 2px 0px
          rgba(248, 253, 255, 0.15),
          inset 0px -1px 1px 0px
          #498fe2;
          border-radius: 4px;
          padding: 0 0.2rem;
          .tit{
            font-family: PingFangSC-Medium;
            font-size: 0.16rem;
            font-weight: normal;
            font-stretch: normal;
            line-height: 1;
            letter-spacing: 0px;
            color: #ffffff;
            .vhMT(20);
          }
          .con{
            .vhMT(10);
            font-family: PingFangSC-Regular;
            font-size: 0.14rem;
            font-weight: normal;
            font-stretch: normal;
            .vhLH(24);
            letter-spacing: 0px;
            color: #ffffff;
          }
        }
        .floors{
          width: 6.04rem;
          .vh(583);
          position: relative;

          .img_red{
            position: absolute;
            left: 0;
            top: 0;
            width: 604px;
            height: 583px;
            background: url("../../assets/img/fireAlarm/floors_red.png") no-repeat center;
            background-size: 100% 100%;
          }
        }
        .floorDetail{
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;

          background-color: #02132a;
          box-shadow: 0px 4px 10px 0px
          rgba(73, 143, 226, 0.22),
          inset 1px 1px 2px 0px
          rgba(248, 253, 255, 0.15),
          inset 0px -1px 1px 0px
          #498fe2;
          border-radius: 4px;
          .title{
            background-color: #000b1a;
            width: 100%;
            .vh(50);
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: PingFangSC-Semibold;
            font-size: 0.16rem;
            font-weight: normal;
            font-stretch: normal;
            line-height: 1;
            letter-spacing: 0px;
            color: #ffffff;
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
          }
          .floorBoxWrap {
            width: 100%;
            .vh(560);
            display: flex;
            align-items: center;
            justify-content: center;
            .floorBox {
              width: 8.72rem;
              .vh(416);
              background: url("../../assets/img/fireAlarm/floor.png") no-repeat center;
              background-size: 100% 100%;
              position: relative;

              .spot {
                position: absolute;
                width: 119px;
                height: 119px;
                .circle {
                  position: absolute;
                  left: 50%;
                  top: 50%;
                  margin: -10px 0 0 -10px;
                  width: 20px;
                  height: 20px;
                  background-color: #ff2600;
                  box-shadow: 0px 0px 4px 0px rgba(255, 255, 255, 0.5),
                  inset 0px 0px 3px 1px rgba(255, 255, 255, 0.5);
                  border-radius: 50%;
                }
                .circle2 {
                  position: absolute;
                  left: 50%;
                  top: 50%;
                  width: 39px;
                  height: 39px;
                  margin: -19.5px 0 0 -19.5px;
                  background-color: rgba(255, 84, 84, 0.5);
                  box-shadow: inset 0px 0px 3px 1px rgba(255, 255, 255, 0.5);
                  border-radius: 50%;
                }
                .circle3 {
                  position: absolute;
                  left: 50%;
                  top: 50%;
                  width: 39px;
                  height: 39px;
                  margin: -19.5px 0 0 -19.5px;
                  background-color: rgba(255, 84, 84, 0.5);
                  box-shadow: inset 0px 0px 3px 1px rgba(255, 255, 255, 0.5);
                  border-radius: 50%;
                  animation: circleScale 1s linear 0s infinite normal;
                }
              }
            }
          }

        }
      }
      .videoBoxWrap {
        position: absolute;
        right: 0;
        top: 0;
        z-index: 100;
        width: 9.74rem;
        .vh(610);
        box-shadow: 0px 4px 10px 0px
        rgba(73, 143, 226, 0.22),
        inset 1px 1px 2px 0px
        rgba(248, 253, 255, 0.15),
        inset 0px -1px 1px 0px
        #498fe2;
        border-radius: 4px;
        .title{
          background-color: #000b1a;
          width: 100%;
          .vh(50);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: PingFangSC-Semibold;
          font-size: 0.16rem;
          font-weight: normal;
          font-stretch: normal;
          line-height: 1;
          letter-spacing: 0px;
          color: #ffffff;
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
        }
        .videoBox {
          width: 9.74rem;
          .vh(557);
          overflow: hidden;
          position: relative;
          .videoList{
            width: 0.52rem;
            position: absolute;
            left: 0;
            top: 0;
            .item{
              .vhMT(12);
              width: 0.52rem;
              .vh(32);
              border: 1px solid #448ef9;
              background-color: #051732;
              outline: none;
              cursor: pointer;
              font-family: PingFangSC-Regular;
              font-size: 0.14rem;
              font-weight: normal;
              font-stretch: normal;
              line-height: 1;
              letter-spacing: 0px;
              color: #ffffff;
              border-top-right-radius: 4px;
              border-bottom-right-radius: 4px;
            }
            .active{
              width: 0.68rem;
              background-color: #448ef9;
              box-shadow: 0px 1px 4px 0px
              #0f3255;
            }
          }
        }
      }
    }

    .dialog-in{
      width: 100%;
      height: 100%;
      .content{
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 0.2rem;
        width: 100%;
        height: 1.72rem;

        font-family: PingFangSC-Regular;
        font-size: 0.18rem;
        line-height: 1;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #b5d7ff;
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

    .building{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 5.44rem;
      height: 5.44rem;
      position: relative;
      img{
        display: block;
        width: 100%;
        height: auto;
      }
    }
    @keyframes radar-beam {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    /*@keyframes blips {
      14% {
        background: radial-gradient(2vmin circle at 75% 70%, #ff2600 10%, #ff2600 30%, rgba(255, 255, 255, 0) 100%);
      }
      14.0002% {
        background: radial-gradient(2vmin circle at 75% 70%, #ff2600 10%, #ff2600 30%, rgba(255, 255, 255, 0) 100%);
      }
      25% {
        background: radial-gradient(2vmin circle at 75% 70%, #ff2600 10%, #ff2600 30%, rgba(255, 255, 255, 0) 100%);
      }
      26% {
        background: radial-gradient(2vmin circle at 75% 70%, #ff2600 10%, #ff2600 30%, rgba(255, 255, 255, 0) 100%);
        opacity: 1;
      }
      100% {
        background: radial-gradient(2vmin circle at 75% 70%, #ff2600 10%, #ff2600 30%, rgba(255, 255, 255, 0) 100%);
        opacity: 0;
      }
    }*/

  }

</style>
