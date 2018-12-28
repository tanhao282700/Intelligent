<!--
    电梯系统 实时监测
    made by 樊得涛
    start in 2018-9-26
-->
<template>
  <div>
    <div class="tabsDomBox0 h-paddingTop">
      <div class="navCrumbs"><p @click="toHome">首页</p> > 电梯监测系统 > <span>实时监控</span></div>
    </div>
    <div class="runtimeMonitor">
      <div class="sltcontainer">
        <div class="jobBoxs">
          <div class="tRBrnBox">
            <el-cascader
              :change-on-select='true'
              :options="floorOptions"
              v-model="floorSelectedOptions"
              @change="floorChange">
            </el-cascader>
          </div>
        </div>
        <div class="sltbtn">
          <el-button @click="searchData" type="primary" icon="el-icon-search">查询</el-button>
        </div>
      </div>
      <div class="tipscontainer">
        <div class="tipsub">
          <div class="tipsubin">
            <span class="color1">11</span>
            <div class="tiptitle">电梯总数</div>
          </div>
        </div>
        <div class="tipsub color2">
          <div class="tipsubin">
            <span class="color2">22</span>
            <div class="tiptitle">电梯正常运行个数</div>
          </div>
          </div>
        <div class="tipsub color3">
          <div class="tipsubin">
            <span class="color3">33</span>
            <div class="tiptitle">电梯故障个数</div>
          </div>
        </div>
      </div>
      <div class="louticontainer">
        <div class="lousub" v-for="(v,k) in dianti">
          <div class="header">
            {{v.title}}
          </div>
          <div class="content">
            <img :src="v.status==1?img.blue:img.red" class="img"/>

            <popover :info="[
          {id:1,tit:'设备名称',content:'设备名称'},
          {id:1,tit:'设备类型',content:'空调机房主机'},
          {id:1,tit:'设备品牌',content:'格力'},
          {id:1,tit:'设备型号',content:'xxxxxxxx'},
          {id:1,tit:'厂商',content:'xxxxxxxx'},
          {id:1,tit:'启用时间',content:'xxxxxxxx'},
          {id:1,tit:'维保名称',content:'xxxxxxxx'},
          {id:1,tit:'维保电话',content:'xxxxxxxx'},
        ]"><div class="title">设备信息</div></popover>
            <div class="title">维保历史</div>
            <div class="title" @click="showVideo(v.player)">视频监测</div>
            <div class="title">数据监测</div>
            <div class="title2 title2First">
              <div class="title2in">
                <span v-bind:class="['tipsTop',v.status==1?'normalC':'errorC2']">{{v.status==1 ?'正常':'异常'}}</span>
                <span class="tips">状态</span>
              </div>
            </div>
            <div class="title2">
              <div class="title2in">
                <span class="tipsTop colorred">{{v.error}}</span>
                <span class="tips">故障次数</span>
              </div>
            </div>
            <div class="detailcontainer">
              <div class="left">
                <span class="tit">楼层位置</span>
                <span class="tit">运行方向</span>
                <span class="tit">是否有人</span>
                <span class="tit">电梯状态</span>
              </div>
              <div class="right">
                <span class="dd"><span class="line"></span><span class="title1">{{v.position}}</span><span class="line2"></span></span>
                <span class="dd"><span class="line"></span><span class="title1">{{v.direct==1?'上行':'下行'}}</span><span class="line2"></span></span>
                <span class="dd"><span class="line"></span><span class="title1">{{v.hasp==1?'有人':'无人'}}</span><span class="line2"></span></span>
                <span class="dd"><span class="line"></span><span class="title1" v-bind:class="{ errorC: v.open!==1}">{{v.open==1?'开启':'关闭'}}</span><span class="line2"></span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog wid = "9.39rem" hei = "6.18rem" tit="视频监控情况" ref = "dialog">
        <div class="dialog-in">
          <div class="videoBox">
            <video-player  class="video-player vjs-custom-skin"
                           ref="videoPlayer"
                           :playsinline="true"
                           :options="playerOptions"
            ></video-player>
          </div>
        </div>
      </Dialog>
    </div>
  </div>
</template>
<script>
  import popover from "./popover";
  import  redpng from '@/assets/img/elevator/red.png';
  import  bluepng from '@/assets/img/elevator/blue.png';
  export default {
    components:{
      popover
    },
    data () {
      return {
        floorSelectedOptions:[],
        floorOptions: [],
        img:{
          red:redpng,
          blue:bluepng
        },
        dianti:[
          {
            title:'一号楼一号客梯',
            status:'1',
            error:5,
            position:3,
            direct:1,
            hasp:1,
            open:1,
            player:{
              videoUrl:'http://221.228.226.23/11/t/j/v/b/tjvbwspwhqdmgouolposcsfafpedmb/sh.yinyuetai.com/691201536EE4912BF7E4F1E2C67B8119.mp4',
              imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536210152930&di=a71791e897b3b3cd1b8930eeff469d34&imgtype=0&src=http%3A%2F%2Fa1.att.hudong.com%2F47%2F59%2F300001072552129204590160225_950.jpg'

            }
          },
          {
            title:'一号楼二号客梯',
            status:'2',
            error:0,
            position:3,
            direct:0,
            hasp:0,
            open:0,
            player:{
              videoUrl:'http://221.228.226.23/11/t/j/v/b/tjvbwspwhqdmgouolposcsfafpedmb/sh.yinyuetai.com/691201536EE4912BF7E4F1E2C67B8119.mp4',
              imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536210152930&di=a71791e897b3b3cd1b8930eeff469d34&imgtype=0&src=http%3A%2F%2Fa1.att.hudong.com%2F47%2F59%2F300001072552129204590160225_950.jpg'

            }
          },
          {
            title:'一号楼三号客梯',
            status:'1',
            error:15,
            position:3,
            direct:1,
            hasp:1,
            open:1,
            player:{
              videoUrl:'http://221.228.226.23/11/t/j/v/b/tjvbwspwhqdmgouolposcsfafpedmb/sh.yinyuetai.com/691201536EE4912BF7E4F1E2C67B8119.mp4',
              imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536210152930&di=a71791e897b3b3cd1b8930eeff469d34&imgtype=0&src=http%3A%2F%2Fa1.att.hudong.com%2F47%2F59%2F300001072552129204590160225_950.jpg'

            }
          },
          {
            title:'一号楼四号客梯',
            status:'1',
            error:0,
            position:6,
            direct:1,
            hasp:1,
            open:1,
            player:{
              videoUrl:'http://221.228.226.23/11/t/j/v/b/tjvbwspwhqdmgouolposcsfafpedmb/sh.yinyuetai.com/691201536EE4912BF7E4F1E2C67B8119.mp4',
              imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536210152930&di=a71791e897b3b3cd1b8930eeff469d34&imgtype=0&src=http%3A%2F%2Fa1.att.hudong.com%2F47%2F59%2F300001072552129204590160225_950.jpg'

            }
          },
          {
            title:'一22号楼四号客梯',
            status:'1',
            error:0,
            position:6,
            direct:1,
            hasp:1,
            open:1,
            player:{
              videoUrl:'http://221.228.226.23/11/t/j/v/b/tjvbwspwhqdmgouolposcsfafpedmb/sh.yinyuetai.com/691201536EE4912BF7E4F1E2C67B8119.mp4',
              imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536210152930&di=a71791e897b3b3cd1b8930eeff469d34&imgtype=0&src=http%3A%2F%2Fa1.att.hudong.com%2F47%2F59%2F300001072552129204590160225_950.jpg'

            }
          }
        ],
        //视频部分
        playerOptions : {
          playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
          autoplay: false, //如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '4:3', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
            type: "",
            src: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" //url地址
          }],
          poster: "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1536198298&di=a980cc1553e2bec11ddef063aeba25d9&src=http://pic.58pic.com/58pic/15/33/18/13A58PICi3r_1024.jpg", //你的封面地址
          // width: document.documentElement.clientWidth,
          notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            fullscreenToggle: true  //全屏按钮
          }
        },
      }
    },
    methods:{
      floorChange(val){
        console.log(val,this.floorSelectedOptions)
      },
      toHome(){
        this.$router.replace({ path: '/home', params: { isLogin: true} });
      },
      searchData(){
        //alert('查')
      },
       //展示视频监控弹框
      showVideo(item){
        this.playerOptions.sources[0].src = item.videoUrl;
        this.playerOptions.poster = item.imgUrl;
        this.$refs.dialog.show();
      }
    },
    created() {

    },
    mounted() {

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">
  @import '../../../assets/css/common.css';
  @import '../../../assets/css/comon';
  .runtimeMonitor{
    margin: 0 auto;
    margin-top: 0.16rem;
    width: 13.06rem;
    .vh(618);
    box-shadow: 0px 4px 10px 0px
    rgba(74, 144, 226, 0.22),
    inset 1px 1px 2px 0px
    rgba(248, 253, 255, 0.15),
    inset 0px -1px 1px 0px
    #4a90e2;
    border-radius: 4px;
    position: relative;
    .sltcontainer{
      position: absolute;
      .vhTop(56);
      width: 2.5rem;
      .vh(32);
      display: inline-block;
      z-index:100;
      .tRBrnBox {
        margin: auto;
        .el-cascader{
          .vhLineH(32);
          font-size: 0.12rem;
        }
        .el-cascader__label{
          color: #fff;
          padding: 0;
        }
        .el-cascader .el-icon-arrow-down.is-reverse{
          transform: rotateZ(0deg);
        }
        .el-cascader-menu__item {
          font-size: 0.12rem;
          padding: 8px 20px;
          position: relative;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #606266;
          height: 34px;
          line-height: 1.5;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          cursor: pointer;
          outline: 0;
        }
        .el-cascader .el-input__icon{
          display:block;
          width:0;
          height:0;
          border-width:4px 4px 0;
          border-style:solid;
          border-color:#008aff transparent transparent;/*黄 透明 透明 */
          position:absolute;
          top:50%-4px;
          left:-0.05rem;
          &::before{
            content: "";
            /*pointer-events: none;
            display:block;
            width:0;
            height:0;
            border-width:4px 4px 0;
            border-style:solid;
            border-color:#008aff transparent transparent;!*黄 透明 透明 *!*/

          }
        }

        &:nth-of-type(2){
          margin-left: 0;
        }
        .el-input__prefix{
          display: none;
        }
        .el-date-editor.el-input, .el-date-editor.el-input__inner{
          &::after {
            content: "";
            pointer-events: none;
            display: block;
            width: 0;
            height: 0;
            border-width: 4px 4px 0;
            border-style: solid;
            border-color: #008aff transparent transparent; /*黄 透明 透明 */
            position: absolute;
            top: 50%-4px;
            right: 0;
          }
        }
        .el-select::after {
          content: "";
          pointer-events: none;
          display: block;
          width: 0;
          height: 0;
          border-width: 4px 4px 0;
          border-style: solid;
          border-color: #008aff transparent transparent; /*黄 透明 透明 */
          position: absolute;
          top: 50%-4px;
          right: 0;
        }
        width: 0.88rem;
        .el-input {
          background-color: transparent !important;
        }
        .el-input--suffix .el-input__inner {
          .vh(24);
          padding: 0;
          border: 0 !important;
          border-bottom: solid 1px #1989fa !important;
          background-color: transparent !important;
        }
      }
      .jobBoxs{
        float: left;
        width: 1.15rem;
        .vh(32);
        background-color: rgba(255, 255, 255, 0.01);
        border-radius: 0.02rem;
        border: solid 0.01rem #1989fa;
        text-align: center;
        margin-left: 0.2rem;
      }
      .sltbtn{
        margin-left: 0.12rem;
        width: 0.93rem;
        float: left;
        .vh(32);
        .el-button--primary{
          width: 100%;
          height: 100%;
          display: inline-block;
          line-height: 1;
          padding: 0;
        }
      }
    }
    .tipscontainer{
      .vh(109);
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .tipsub{
        text-align: center;
        min-width: 0.84rem;
        margin-left: 0.80rem;
        font-family: PingFangSC-Regular;
        font-size: 0.48rem;
        line-height: 1;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        &:first-of-type{
          margin-left: 0;
        }
        .tipsubin>span{
          display: block;
          width: 100%;
          text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.4);
        }
        .tiptitle{
          .vhMT(12);
          text-align: center;
          width: 100%;
          line-height: 1;
          display: block;
          font-family: PingFangSC-Light;
          font-size: 0.12rem;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #b5d7ff;
        }
        .color1{
          color:#b5d7ff;
        }
        .color2{
          color: #4ae283;
        }
        .color3{
          color: #f56c6c;
        }
      }
    }
    .louticontainer{
      //background-color: red;
      width: 100%;
      .vh(509);
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      overflow-y: scroll;
      .lousub{
        margin-left: 0.1rem;
        margin-right: 0.1rem;
        .vhMB(10);
        background-color: rgba(43, 93, 158, 0.25);
        border-radius: 8px;
        border: solid 1px rgba(71,139,219,0.5);
        width: 3.04rem;
        .vh(497);
        .header{
          display: flex;
          align-items: center;
          width: 100%;
          background-color: rgba(0, 0, 0, 0.25);
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          .vh(38);
          padding-left: .15rem;
          font-family: PingFangSC-Regular;
          font-size: .16rem;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #ffa414;
        }
        .content{
          .vhTop(30);
          position: relative;
          .img{
            float: left;
            .vhMT(-30);
            margin-left: .54rem;
            margin-right: .54rem;
            width: .84rem;
            .vh(328);
          }
          .colorred{
            color: #f56c6c;
            text-shadow: 4px 4px 2px rgba(245, 108, 108, 0.4);
          }
          .title{
            display: inline-block;
            text-align: center;
            width: .96rem;
            .vh(32);
            .vhLH(32);
            .vhMB(20);
            background-color: rgba(59, 137, 249, 0.2);
            border-radius: 4px;
            font-family: PingFangSC-Medium;
            font-size: .14rem;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #ffffff;
            &:hover{
              background-color: #3a84ee;
            }
          }
          .title2{
            text-align: center;
            width: .96rem;
            .vh(45);
            background-color: #001838;
            box-shadow: 0px 0px 2px 0px
            rgba(87, 113, 176, 0.15),
            inset 0px 1px 3px 0px
            rgba(0, 0, 0, 0.5);
            border-radius: 4px;
            font-family: PingFangSC-Regular;
            font-size: .16rem;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #4ae283;
            display: flex;
            align-items: center;
            justify-content: center;
            .vhMT(5);
            .normalC{
              text-shadow: 4px 4px 2px rgba(74, 226, 131, 0.35);
            }
            .tips{
              .vhMT(3);
              width: 100%;
              display: block;
              font-family: PingFangSC-Regular;
              font-size: .10rem;
              font-weight: normal;
              font-stretch: normal;
              line-height: 1;
              letter-spacing: 0px;
              color: #b5d7ff;
              text-shadow: none;
            }
          }
          .title2First{
            margin-top: 0;
          }
          .detailcontainer{
            margin: auto;
            .vhMT(10);
            width: 2.71rem;
            .vh(105);
            background-color: rgba(0, 0, 0, 0.15);
            border-radius: 4px;
            .left{
              width: .79rem;
              float: left;
              .vh(105);
              background-color: rgba(0, 0, 0, 0.15);
              border-top-left-radius: 4px;
              border-bottom-left-radius: 4px;
              .tit{
                display: flex;
                width: 100%;
                height: 25%;
                justify-content: center;
                align-items: center;
              }
            }
            .right{
              .vh(105);
              float: right;
              text-align: left;
              position: relative;
              width: 1.92rem;
              padding: 0 0.1rem;
              .dd{
                position:relative;
                width: 100%;
                height: 25%;
                display: flex;
                align-items: center;
                justify-content: space-between;
              }
              .title1{
                font-family: PingFangSC-Light;
                font-size: .12rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 1;
                letter-spacing: 0px;
                color: #b5d7ff;
                text-align: center;
                margin: 0 0.05rem;
              }
              .line{
                width: .61rem;
                height: 1px;
                .gradientR(rgba(128,201,249,0),rgba(0,121,255,0.54));
                border-radius: 1px;
              }
              .line2{
                width: .61rem;
                height: 1px;
                .gradientR(rgba(0,121,255,0.54),rgba(128,201,249,0));
                border-radius: 1px;
              }
            }
          }
        }
      }
      .lousub:nth-last-child(1){
        margin-right: 0;
      }
      .errorC{
        color: #f56c6c !important;
      }
      .errorC2{
        color: #f56c6c !important;
        text-shadow: 4px 4px 2px rgba(245, 108, 108, 0.4);
      }
    }
  }

</style>
