<!--
    变配电系统 回路状态
    made by 胡永福
    start in 2018-9-45
-->
<template>
  <div
    ref="loopState"
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0.5)"
    element-loading-spinner="el-icon-loading"
    element-loading-text="拼命加载中"
    class="loopState">
    <div class="tRBrnBox">
      <el-select @change="selChange" v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div ref="imgBox" class="imgBox">
      <div class="floorImg" v-html="floorImg">

      </div>
      <div class="part" :style="{left:(v.x/2)+'px',top:(v.y/2)+'px'}" v-for="(v,i) in device" :key="'devItem'+i">
        <div v-show="v.now_state == v2.type" class="partInPart" v-for="(v2,i2) in v.device_pic" v-html="v2.codes" :key="'inPart'+i2"></div>
      </div>
      <!--<div class="stateWrap">
        <div class="part" :style="{left:v.x+'px',top:v.y+'px'}" v-for="(v,i) in device" :key="'devItem'+i">
          <div v-show="v.now_state == v2.type" class="partInPart" v-for="(v2,i2) in v.device_pic" v-html="v2.codes" :key="'inPart'+i2"></div>
        </div>
      </div>-->
    </div>
    <div class="topLeft">
      <div class="title">
        <span class="line"></span>
        <span class="text">设备信息</span>
      </div>
      <div class="content">
        <p class="text" v-for="(v,i) in deviceInfo">{{v.title+'：'+v.nowvalue + v.unit}}</p>
        <!--<p class="text">Q: 00.00 KVar</p>-->
        <!--<div class="wrap">
          <div class="left">
            <p class="text fontC-y">Ia: 233.00 A</p>
            <p class="text fontC-g">Ib: 232.00 A</p>
            <p class="text fontC-r">Ic: 233.00 A</p>
          </div>
          <div class="right">
            <p class="text fontC-y">Ia: 233.00 A</p>
            <p class="text fontC-g">Ib: 232.00 A</p>
            <p class="text fontC-r">Ic: 233.00 A</p>
          </div>
        </div>-->
      </div>
    </div>
    <!--<div class="bottomLeft">
      <div class="title">
        <span class="line"></span>
        <span class="text">低压侧</span>
      </div>
      <div class="content">
        <p class="text">P: 00.00 KW</p>
        <p class="text">Q: 00.00 KVar</p>
        <p class="text">Cos：0.90</p>
        <div class="wrap">
          <div class="left">
            <p class="text fontC-y">Ua: 233.00 A</p>
            <p class="text fontC-g">Ub: 232.00 A</p>
            <p class="text fontC-r">Uc: 233.00 A</p>
          </div>

          <div class="right">
            <p class="text fontC-y">Ia: 233.00 A</p>
            <p class="text fontC-g">Ib: 232.00 A</p>
            <p class="text fontC-r">Ic: 233.00 A</p>
          </div>
        </div>
      </div>
    </div>-->
    <div class="topRight">
      <div class="title2">
        <span class="text">图例</span>
        <span class="line"></span>
      </div>
      <div class="content2">
        <div class="row">
          <span class="iconBg icon1">
          </span>
          <span class="iconBg icon2"></span>
          <span class="iconBg icon3"></span>
          <span>开关闭合</span>
        </div>

        <div class="row">
          <span class="iconBg icon4"></span>
          <span class="iconBg icon5"></span>
          <span class="iconBg icon6"></span>
          <span>开关断开</span>
        </div>

        <div class="row">
          <span class="iconBg icon7"></span>
          <span class="iconBg icon8"></span>
          <span>开关异常</span>
        </div>

        <div class="row">
          <span class="iconBg icon9"></span>
          <span>&emsp;断路器</span>
        </div>

        <div class="row">
          <span class="iconBg icon10"></span>
          <span>隔离开关</span>
        </div>

        <div class="row">
          <span class="iconBg icon11"></span>
          <span>手动开关</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


  import utils from "../../../../assets/js/utils.js";
  export default {
    components: {

    },
    name: "loopState",
    data() {
      return {
        device_id:11,
        deviceInfo:[
          /*{
            "nowvalue": "0",
            "title": "A项电流_高",
            "unit": ""
          },
          {
            "nowvalue": "0",
            "title": "B项电流_高",
            "unit": ""
          },
          {
            "nowvalue": "0",
            "title": "C项电流_高",
            "unit": ""
          },
          {
            "nowvalue": "0",
            "title": "A项电压_高",
            "unit": ""
          },
          {
            "nowvalue": "0",
            "title": "B项电压_高",
            "unit": ""
          },
          {
            "nowvalue": "0",
            "title": "C项电压_高",
            "unit": ""
          }*/
        ],
        floorImg:'',
        options: [],
        value: '',
        loading:false,
        device: [],
      }
    },
    methods: {
      selChange(val){
        console.log(val);
        this.getLoopData(val);
      },
      //获取变配电机房
      getFloor() {
        this.options = [];
        let that = this;
        let config = {
          'sys_menu_id': this.$store.state.sysList[3].sys_menu_id,
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.get('power_pc/pc/floor', config, headers).then(res => {
          let data = res.data;
          console.log('获取变配电机房', config, res);
          if (data.code == 0) {
            let datas = data.data;
            let tempArr = [];
            datas.map((item, i) => {
              if (i===0){
                this.value = item.id;
                this.getLoopData(item.id)
              }
              let obj = {};
              obj.label = item.title;
              obj.value = item.id;
              tempArr.push(obj);
            })
            this.options = tempArr;
          } else {
            this.$message(data.message);
          }
        }).catch(err => {
          console.log(err);
        })
      },


      //获取回路状态数据
      getLoopData(id){
        this.loading = true;

        let that = this;
        let config = {
          'sys_menu_id':this.$store.state.sysList[3].sys_menu_id,
          'floor_id':id
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.get('power_pc/pc/loopstate', config, headers).then(res => {
          let data = res.data;
          console.log('回路状态', config, res);
          if(data.code==0){
            let datas = data.data;


            var imgaaa = new Image();
            imgaaa.src = datas.floor;
            imgaaa.onload = function() {
              let wid = imgaaa.width;
              let hei = imgaaa.height;
              if (wid>1306 || hei>578){
                wid = wid/4;
                hei = hei/4;
                console.log(that.$refs)
                that.$refs.imgBox.style.width = wid;
                that.$refs.imgBox.style.height = wid;
              }
              console.log(that.$refs.imgBox)
              let htmlStr = '<img style="width:'+wid+'px\;height: '+hei+'px'+' " ref="willImg" src="'+datas.floor+'" alt="电路底图">';
              that.floorImg = htmlStr;
            }
            //console.log(imgaaa.width)

            this.device = datas.device;

            datas.device.map((item,i)=>{
              if (i===0){
                this.device_id = item.id;
                this.getDeviceData();
              }
            })
            this.loading = false;

          }else{
            this.loading = false;
            this.$message(data.message);
          }
        }).catch(err=> {
          this.loading = false;
          console.log(err);
        })



      },
      //获取设备信息
      getDeviceData(){
        let that = this;
        let config = {
          'device_id': this.device_id,
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.get('power_pc/pc/device/info', config, headers).then(res => {
          let data = res.data;
          console.log('回路设备信息', config, res);
          if (data.code == 0) {
            this.deviceInfo = data.data;
          } else {
            this.$message(data.message);
          }
        }).catch(err => {
          console.log(err);
        })
      }
    },
    created() {

    },
    mounted() {
      this.getFloor();
    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">
  @import '../../../../assets/css/common.css';
  @import '../../../../assets/css/comon';

  #imgaa{

    background-size: 100% 100%;
  }
  .fontC-y{
    color: #fff100;
  }
  .fontC-g{
    color: #5cd01e;
  }
  .fontC-r{
    color: #f80518;
  }


  .loopState{

    .tRBrnBox{
      .el-select::after{
        content: "";
        pointer-events: none;
        display:block;
        width:0;
        height:0;
        border-width:4px 4px 0;
        border-style:solid;
        border-color:#008aff transparent transparent;/*黄 透明 透明 */
        position:absolute;
        top:50%-4px;
        right:0;
      }
      position: absolute;
      right: 0;
      .vhTop(-34);
      min-width: 0.98rem;
      .el-input--suffix .el-input__inner{
        .vh(24);
        padding: 0;
        border: 0!important;
        border-bottom: solid 2px #1989fa!important;
      }

    }
    width: 13.06rem;
    .vh(578);
    background-color: transparent;
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
    .imgBox{
      /*width: 6.85rem;
      .vh(515);*/
      position: relative;
      .part{
        position: absolute;
        z-index: 100;
      }
      .floorImg{
        /*width: 100%;
        height: 100%;*/
        display: flex;
        align-items: center;
        justify-content: center;
        img{
          display: block;
          /*width: 100%;
          height: auto;*/
        }
      }
      /*.stateWrap{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        .part{
          position: absolute;
        }
      }*/

    }

    .title{
      display: flex;
      align-items: center;
      .line{
        display: inline-block;
        width: 2px;
        height: 14px;
        background-color: #008aff;
      }
      .text{
        margin-left: 0.2rem;
        font-family: PingFangSC-Regular;
        font-size: 0.14rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: 0px;
        color: #008aff;
      }
    }
    .content{
      margin-left: 0.22rem;
      .vhMT(20);

      font-family: PingFangSC-Regular;
      font-size: 0.14rem;
      font-weight: normal;
      font-stretch: normal;
      line-height: 1;
      letter-spacing: 0px;
      color: #ffffff;
      .text{
        .vhMT(12);
      }
      .wrap{
        display: flex;
        justify-content: space-between;
        .right{
          margin-left: 0.21rem;
        }
      }
    }

    .title2{
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .line{
        display: inline-block;
        width: 2px;
        height: 14px;
        background-color: #008aff;
      }
      .text{
        margin-right: 0.2rem;
        font-family: PingFangSC-Regular;
        font-size: 0.14rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: 0px;
        color: #008aff;
      }
    }
    .content2{
      margin-right: 0.22rem;
      .vhMT(20);

      font-family: PingFangSC-Regular;
      font-size: 0.12rem;
      font-weight: normal;
      font-stretch: normal;
      line-height: 1;
      letter-spacing: 0px;
      color: #ffffff;

      .row{
        display: flex;
        justify-content: flex-end;
        .vhMT(12);
        &>*{
          margin-left: 0.1rem;
        }
        .iconBg{
          display: inline-block;
          width: 0.16rem;
          height: 0.16rem;
        }
        .icon1{
          background: url("/static/powerIcon/1.png") no-repeat center;
          background-size: 100% 100%;
        }
        .icon2{
          background: url("/static/powerIcon/2.png") no-repeat center;
          background-size: 100% 100%;
        }
        .icon3{
          background: url("/static/powerIcon/3.png") no-repeat center;
          background-size: 100% 100%;
        }
        .icon4{
          background: url("/static/powerIcon/4.png") no-repeat center;
          background-size: 100% 100%;
        }
        .icon5{
          background: url("/static/powerIcon/5.png") no-repeat center;
          background-size: 100% 100%;
        }
        .icon6{
          background: url("/static/powerIcon/6.png") no-repeat center;
          background-size: 100% 100%;
        }
        .icon7{
          background: url("/static/powerIcon/7.png") no-repeat center;
          background-size: 100% 100%;
        }
        .icon8{
          background: url("/static/powerIcon/8.png") no-repeat center;
          background-size: 100% 100%;
        }
        .icon9{
          background: url("/static/powerIcon/9.png") no-repeat center;
          background-size: 100% 100%;
        }
        .icon10{
          background: url("/static/powerIcon/10.png") no-repeat center;
          background-size: 100% 100%;
        }
        .icon11{
          background: url("/static/powerIcon/11.png") no-repeat center;
          background-size: 100% 100%;
        }
      }

    }


    .topLeft{
      position: absolute;
      left: 0;
      .vhTop(24);
    }
    .bottomLeft{
      position: absolute;
      left: 0;
      .vhBottom(28);
    }
    .topRight{
      position: absolute;
      right: 0;
      .vhTop(24);
    }

  }

</style>
