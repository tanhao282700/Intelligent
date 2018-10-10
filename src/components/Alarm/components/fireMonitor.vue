<!--
    消防报警系统 火警监测
    made by 胡永福
    start in 2018-8-24
-->
<template>
  <div :style="fireState!=0?{boxShadow:'none'}:null" class="fireMonitor">
    <div v-if="fireState==0" class="noHaveFire">
      <div ref="building" class="building">
        <img src="../../../assets/img/WaterSupplyAndDrainage/floor3D.png" alt="建筑图">
      </div>
    </div>
    <div ref="radarBox" class="radarBox">
      <div class="radar1">
        <div class="radar2"></div>
      </div>
      <div class="row-line"></div>
      <div class="col-line"></div>
    </div>
    <div v-if="fireState!=0" class="haveFire">
      <div class="infoCardBox">
        <el-scrollbar style="height:100%">
          <div v-for="(item,i) in fireWarnLists" class="infoCard" :key="item.key">
            <div class="head">
              <span v-text="item.class"></span>
              <span v-text="item.time"></span>
            </div>
            <div class="body">
              <p v-text="item.devicename+item.message" class="content"></p>
              <div class="btnBox">
                <button @click="showSure(item.key,item.key,'1')" type="button">解除报警</button>
                <button @click="showSure(item.key,item.key,'2')" type="button">误报处理</button>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
      <div class="buildingBox">
        <div v-show="!isDetail" class="floors">
            <div style="position: absolute;z-index: 1;width:604px;height:583px;">
              <div style="position: relative;width: 100%;height: 100%;">
                <div style="width: 100%;height: 100%;">
                  <img src="../../../assets/img/fireAlarm/no.png" usemap="Map" style="width:604px;height:583px;" />
                  <map id="Map" name="Map">
                    <area alt="4f" href="javascript:void(0)" style="background:#ccc;" coords="551, 105, 538, 182, 387, 213, 374, 201, 289, 220, 296, 231, 63, 282, 41, 225, 23, 229, 5, 164, 166, 141, 144, 104, 136, 38, 231, 148, 370, 126, 382, 135, 551, 105" shape="poly" @mouseenter="showArea('floor_4',1)" @mouseleave="showArea('floor_4',0)" @click="showFloor(4)" />
                    <area alt="3f" href="javascript:void(0)" style="background:#ccc;" coords="538, 185, 524, 276, 382, 312, 370, 301, 291, 322, 296, 333, 82, 387, 60, 324, 45, 327, 25, 259, 6, 172, 24, 229, 40, 226, 61, 282, 297, 235, 291, 221, 374, 205, 385, 215, 538, 185" shape="poly" @mouseenter="showArea('floor_3',1)" @mouseleave="showArea('floor_3',0)" @click="showFloor(3)" />
                    <area alt="2f" href="javascript:void(0)" style="background:#ccc;" coords="522, 281, 510, 363, 376, 401, 366, 387, 291, 410, 298, 422, 97, 482, 76, 413, 61, 417, 40, 344, 25, 265, 44, 329, 60, 326, 82, 389, 297, 336, 290, 322, 369, 304, 379, 313, 522, 281" shape="poly" @mouseenter="showArea('floor_2',1)" @mouseleave="showArea('floor_2',0)" @click="showFloor(2)" />
                    <area alt="1f" href="javascript:void(0)" style="background:#ccc;" coords="509, 364, 496, 448, 375, 488, 364, 472, 125, 547, 107, 495, 82, 503, 61, 432, 72, 429, 70, 416, 76, 413, 98, 481, 300, 424, 291, 409, 365, 389, 374, 401, 509, 364" shape="poly" @mouseenter="showArea('floor_1',1)" @mouseleave="showArea('floor_1',0)" @click="showFloor(1)" />
                  </map>
                </div>
              </div>
            </div>
            <div style="position: absolute;z-index: 0;width: 0;height: 0;">
              <div style="position: relative;width: 100%;height: 100%;">
                <div style="width: 100%;height: 100%;">
                  <div style="width:604px;height:583px;position:relative;">
                    <div class="floor4" style="" ref="floor_4"></div>
                    <div class="floor3" style="" ref="floor_3"></div>
                    <div class="floor2" style="" ref="floor_2"></div>
                    <div class="floor1" style="" ref="floor_1"></div>
                  </div>
                </div>
              </div>
            </div>
            <img src="../../../assets/img/fireAlarm/floors.png" style="width:604px;height:583px;" />
          </div>
        <div v-show="isDetail" class="floorDetail">
          <i class="el-icon-circle-close colseBoxs" style="position: absolute;right: -5px;top: -5px" @click="hide"></i>
          <div class="floorBox">
            <div class="spot" style="left: 227px;top: 30px">
              <div class="circle"></div>
              <div class="circle2"></div>
              <div v-if="false" class="circle3"></div>
            </div>

            <div class="spot" style="left: 750px;top: 115px">
              <div class="circle"></div>
              <div class="circle2"></div>
              <div v-if="true" class="circle3"></div>
            </div>
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
</template>
<script>
  import utils from "../../../assets/js/utils.js";
  export default {
    components:{

    },
    data () {
      return {
        fireState:0,

        type:'',//1为解除报警，2为误报
        warnId:'',
        warnIndex:'',
        fireWarnLists:[

        ],

        isDetail:false,

      }
    },
    methods:{
      //消防报警监测信息列表请求
      getMonitorData(){
        let obj = {
          sys_menu_id:'22'
        };
        utils.post('fireAlarm/monitor',obj).then(res=>{
          console.log('消防监测信息列表',obj,res);
          if (res.code==0){
            if (res.data.length===0){
              this.fireState = 0;

              /*//恢复
              Velocity(this.$refs.radarBox, {
                scale:(1,1),
              }, {
                duration: 0,
                easing: 'linear',
                //complete: function(elements) { console.log(elements);$this.getMonitorData(); }
              });*/
            } else {
              this.fireState = 1;
            }
            this.fireWarnLists = res.data
          } else {

            this.$message(res.message);
          }
        }).catch(err=>{
          this.$message(err);
        })
      },

      //消防监测控制请求

      getMonitorControl(key, value){
        let obj = {
          sys_menu_id:'22',
          key:key,
          value:value
        };
        utils.post('fireAlarm/control',obj).then(res=>{
          console.log('消防监测控制',obj,res);
          if (res.code==0){
            //this.fireWarnLists.splice(this.warnIndex,1);
            this.fireWarnLists.map((item,i)=>{
              if (item.key == key) {
                this.fireWarnLists.splice(i,1);
              }
            })
            this.$message({
              type: 'success',
              message: res.message
            });
          } else {
            this.$message(res.message);
          }
        }).catch(err=>{
          this.$message(err);
        })
      },
      //隐藏楼层内页
      hide(){
        this.isDetail = false;
      },
      //显示楼层内页
      showFloor(floor){
        this.isDetail = true;
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
      //处理报警操作
      dealWarn(id,index,type){
        console.log('处理报警',id,index,type)
        this.getMonitorControl(id,type);

        this.$refs.dialog.hide();
      }
    },
    created() {

    },
    mounted() {
      this.init();

      /*setTimeout(()=>{
        this.fireState = 1;
      },10000)*/



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
<style lang="less" scoped='scoped' type="text/less">
  @import '../../../assets/css/common.css';
  @import '../../../assets/css/comon';
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
    background:url('../../../assets/img/fireAlarm/floor4.png') no-repeat center;
    background-size: 100% 100%;
    left:0px;
    top:0px;
    opacity: 0;
  }
  .floor3{
    width:604px;
    height:583px;
    position:absolute;
    background:url('../../../assets/img/fireAlarm/floor3.png') no-repeat center;
    background-size: 100% 100%;
    left:0px;
    top:0px;
    opacity: 0;
  }
  .floor2{
    width:604px;
    height:583px;
    position:absolute;
    background:url('../../../assets/img/fireAlarm/floor2.png') no-repeat center;
    background-size: 100% 100%;
    left:0px;
    top:0px;
    opacity: 0;
  }
  .floor1{
    width:604px;
    height:583px;
    position:absolute;
    background:url('../../../assets/img/fireAlarm/floor1.png') no-repeat center;
    background-size: 100% 100%;
    left:0px;
    top:0px;
    opacity: 0;
  }
  .radarBox{
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
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
    /*&:before {
      content: ' ';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      animation: blips 4s infinite;
      animation-timing-function: linear;
      animation-delay: 0s;
    }*/
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
  .fireMonitor{
    margin: 0 auto;
    margin-top: 0.16rem;
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
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 100%;
      .infoCardBox{
        width: 3.12rem;
        height: 100%;
        overflow: hidden;
        .infoCard{
          .vhMT(20);
          width: 3.12rem;
          .vh(190);
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
        }
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
        .floors{
          width: 6.04rem;
          .vh(583);
        }
        .floorDetail{
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;

          background-color: rgba(0, 0, 0, 0.3);
          box-shadow: 0px 4px 10px 0px
          rgba(73, 143, 226, 0.22),
          inset 1px 1px 2px 0px
          rgba(248, 253, 255, 0.15),
          inset 0px -1px 1px 0px
          #498fe2;
          border-radius: 4px;
          .floorBox{
            width: 8.72rem;
            .vh(416);
            background: url("../../../assets/img/fireAlarm/floor.png") no-repeat center;
            background-size: 100% 100%;
            position: relative;

            .spot{
              position: absolute;
              width: 119px;
              height: 119px;
              .circle{
                position: absolute;
                left: 50%;
                top: 50%;
                margin: -10px 0 0 -10px;
                width: 20px;
                height: 20px;
                background-color: #ff2600;
                box-shadow: 0px 0px 4px 0px
                rgba(255, 255, 255, 0.5),
                inset 0px 0px 3px 1px
                rgba(255, 255, 255, 0.5);
                border-radius: 50%;
              }
              .circle2{
                position: absolute;
                left: 50%;
                top: 50%;
                width: 39px;
                height: 39px;
                margin: -19.5px 0 0 -19.5px;
                background-color: rgba(255, 84, 84, 0.5);
                box-shadow: inset 0px 0px 3px 1px
                rgba(255, 255, 255, 0.5);
                border-radius: 50%;
              }
              .circle3{
                position: absolute;
                left: 50%;
                top: 50%;
                width: 39px;
                height: 39px;
                margin: -19.5px 0 0 -19.5px;
                background-color: rgba(255, 84, 84, 0.5);
                box-shadow: inset 0px 0px 3px 1px
                rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                animation: circleScale 1s linear 0s infinite normal;
              }
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
    @keyframes blips {
      /*14% {
        background: radial-gradient(2vmin circle at 75% 70%, #ffffff 10%, #ff2600 30%, rgba(255, 255, 255, 0) 100%);
      }
      14.0002% {
        background: radial-gradient(2vmin circle at 75% 70%, #ffffff 10%, #ff2600 30%, rgba(255, 255, 255, 0) 100%), radial-gradient(2vmin circle at 63% 72%, #ffffff 10%, #ff2600 30%, rgba(255, 255, 255, 0) 100%);
      }
      25% {
        background: radial-gradient(2vmin circle at 75% 70%, #ffffff 10%, #ff2600 30%, rgba(255, 255, 255, 0) 100%), radial-gradient(2vmin circle at 63% 72%, #ffffff 10%, #ff2600 30%, rgba(255, 255, 255, 0) 100%), radial-gradient(2vmin circle at 56% 86%, #ffffff 10%, #ff2600 30%, rgba(255, 255, 255, 0) 100%);
      }*/
      0% {
        background: radial-gradient(2vmin circle at 75% 70%, #ffffff 10%, #ff2600 30%, rgba(255, 255, 255, 0) 100%), radial-gradient(2vmin circle at 63% 72%, #ffffff 10%, #ff2600 30%, rgba(255, 255, 255, 0) 100%), radial-gradient(2vmin circle at 56% 86%, #ffffff 10%, #ff2600 30%, rgba(255, 255, 255, 0) 100%);
        opacity: 0;
      }
      100% {
        background: radial-gradient(2vmin circle at 75% 70%, #ffffff 10%, #ff2600 30%, rgba(255, 255, 255, 0) 100%), radial-gradient(2vmin circle at 63% 72%, #ffffff 10%, #ff2600 30%, rgba(255, 255, 255, 0) 100%), radial-gradient(2vmin circle at 56% 86%, #ffffff 10%, #ff2600 30%, rgba(255, 255, 255, 0) 100%);
        opacity: 1;
      }
    }

  }

</style>
