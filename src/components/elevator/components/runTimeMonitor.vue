<!--
    电梯系统 实时监测
    made by 樊得涛
    start in 2018-9-26
-->
<template>
  <div>
    <div ref="HpadTop" class="tabsDomBox0 h-paddingTop">
      <div class="navCrumbs"><p @click="toHome">首页</p> > 电梯监测系统 > <span>实时监控</span></div>
    </div>
    <div class="runtimeMonitor"
         v-loading="loading"
         element-loading-background="rgba(0, 0, 0, 0.5)"
         element-loading-spinner="el-icon-loading"
         element-loading-text="拼命加载中"
    >
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
            <span class="color1" v-text="zong"></span>
            <div class="tiptitle">电梯总数</div>
          </div>
        </div>
        <div class="tipsub color2">
          <div class="tipsubin">
            <span class="color2" v-text="healthy"></span>
            <div class="tiptitle">电梯正常运行个数</div>
          </div>
          </div>
        <div class="tipsub color3">
          <div class="tipsubin">
            <span class="color3" v-text="not_healthy"></span>
            <div class="tiptitle">电梯故障个数</div>
          </div>
        </div>
      </div>
      <div class="louticontainer">
        <div class="lousub" v-for="(v,k) in diantiData" :key="v.device_id">
          <div class="header">
            {{v.device_title}}
          </div>
          <div class="content">
            <img :src="v.state==0?img.blue:img.red" class="img"/>

            <popover :device_id="v.device_id"><div class="title">设备信息</div></popover>
            <div v-if="showWbHistory" class="title" @click="toWbHistory">维保历史</div>
            <div v-if="showVideoMonitor" class="title" @click="showVideo(v.device_id)">视频监测</div>
            <div v-if="showDataHistory" class="title" @click="toDataHistory">数据监测</div>
            <div class="title2 title2First">
              <div class="title2in">
                <span v-bind:class="['tipsTop',v.state==0?'normalC':'errorC2']">{{v.state==0 ?'正常':'异常'}}</span>
                <span class="tips">状态</span>
              </div>
            </div>
            <div class="title2">
              <div class="title2in">
                <span class="tipsTop colorred">{{v.xiu_count}}</span>
                <span class="tips">故障次数</span>
              </div>
            </div>
            <div class="detailcontainer">
              <table>
                <tr class="part" v-for="(v2,i2) in v.device_info" :key="'p'+i2">
                  <td><span class="tit">{{v2.label}}</span></td>
                  <td><span class="dd"><span class="line"></span><span class="title1">{{v2.fun_info==''?(v2.value+v2.unit):dealEval(v2)}}</span><span class="line2"></span></span></td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ele-dialog wid = "9.39rem" hei = "618" tit="视频监控情况" ref = "dialog">
        <div class="dialog-in">
          <div class="videoBox">
            <iframe
              ref="elVideoIframe"
              name="elVideoIframe"
              frameborder="0"
              width="100%"
              height="100%"
              :src="nowVideoUrl">
            </iframe>
          </div>
        </div>
      </ele-dialog>
    </div>
  </div>
</template>
<script>
  import popover from "./popover";
  import  redpng from '@/assets/img/elevator/red.png';
  import  bluepng from '@/assets/img/elevator/blue.png';
  import EleDialog from "./eleDialog";
  export default {
    components:{
      EleDialog,
      popover
    },
    data () {
      return {
        showWbHistory:(this.$store.state.sysList[9].role_string.length != 0?(this.$store.state.sysList[9].role_string[2] != 0):true),
        showVideoMonitor:(this.$store.state.sysList[9].role_string.length != 0?(this.$store.state.sysList[9].role_string[4] != 0):true),
        showDataHistory:(this.$store.state.sysList[9].role_string.length != 0?(this.$store.state.sysList[9].role_string[1] != 0):true),

        loading:false,
        zong:'-',
        healthy:'-',
        not_healthy:'-',
        floor_id:0,
        nowVideoUrl:'',
        floorSelectedOptions:[0],
        floorOptions: [],
        img:{
          red:redpng,
          blue:bluepng
        },
        diantiData:[
          /*{
            "device_id": 4339,
            "device_info": [
              {
                "fun_info": "",
                "label": "楼层位置",
                "unit": "楼",
                "value": "0"
              },
              {
                "fun_info": "{\"value\": [\"0\",\"1\",\"2\"],\"showvalue\": [\"停止\",\"上行\",\"下行\"],\"type\":0}",
                "label": "运行方向",
                "unit": "",
                "value": "0"
              },
              {
                "fun_info": "{\"value\": [\"0\",\"1\"],\"showvalue\": [\"无人\",\"有人\"],\"type\":0}",
                "label": "是否有人",
                "unit": "",
                "value": "0"
              },
              {
                "fun_info": "{\"value\": [\"0\",\"1\",\"2\"],\"showvalue\": [\"停止\",\"上行\",\"下行\"],\"type\":0}",
                "label": "电梯状态",
                "unit": "",
                "value": "0"
              },
              {
                "fun_info": "",
                "label": "视频",
                "unit": "",
                "value": "0"
              },
              {
                "fun_info": "",
                "label": "温度",
                "unit": "℃",
                "value": "0"
              },
              {
                "fun_info": "",
                "label": "湿度",
                "unit": "%",
                "value": "0"
              },
              {
                "fun_info": "{\"value\": [\"0\",\"1\"],\"showvalue\": [\"正常\",\"异常\"],\"type\":0}",
                "label": "积水",
                "unit": "",
                "value": "0"
              },
              {
                "fun_info": "{\"value\": [\"0\",\"1\"],\"showvalue\": [\"正常\",\"异常\"],\"type\":0}",
                "label": "积水",
                "unit": "",
                "value": "0"
              },
              {
                "fun_info": "",
                "label": "电流",
                "unit": "A",
                "value": "0"
              },
              {
                "fun_info": "",
                "label": "电压",
                "unit": "V",
                "value": "0"
              },
              {
                "fun_info": "",
                "label": "湿度",
                "unit": "%",
                "value": "0"
              }
            ],
            "device_title": "2号楼1号客梯",
            "state": 0,
            "xiu_count": 0
          },
          {
            "device_id": 4340,
            "device_info": [
              {
                "fun_info": "",
                "label": "楼层位置",
                "unit": "楼",
                "value": "0"
              },
              {
                "fun_info": "{\"value\": [\"0\",\"1\",\"2\"],\"showvalue\": [\"停止\",\"上行\",\"下行\"],\"type\":0}",
                "label": "运行方向",
                "unit": "",
                "value": "0"
              },
              {
                "fun_info": "{\"value\": [\"0\",\"1\"],\"showvalue\": [\"无人\",\"有人\"],\"type\":0}",
                "label": "是否有人",
                "unit": "",
                "value": "0"
              },
              {
                "fun_info": "{\"value\": [\"0\",\"1\"],\"showvalue\": [\"关\",\"开\"],\"type\":0}",
                "label": "电梯门开关状态",
                "unit": "",
                "value": "0"
              },
              {
                "fun_info": "{\"value\": [\"0\",\"1\",\"2\"],\"showvalue\": [\"停止\",\"上行\",\"下行\"],\"type\":0}",
                "label": "电梯状态",
                "unit": "",
                "value": "0"
              },
              {
                "fun_info": "{\"value\": [\"0\",\"1\"],\"showvalue\": [\"正常\",\"异常\"],\"type\":0}",
                "label": "冲顶",
                "unit": "",
                "value": "0"
              },
              {
                "fun_info": "{\"value\": [\"0\",\"1\"],\"showvalue\": [\"正常\",\"异常\"],\"type\":0}",
                "label": "蹲底",
                "unit": "",
                "value": "0"
              },
              {
                "fun_info": "{\"value\": [\"0\",\"1\"],\"showvalue\": [\"正常\",\"异常\"],\"type\":0}",
                "label": "非平层停车",
                "unit": "",
                "value": "0"
              },
              {
                "fun_info": "{\"value\": [\"0\",\"1\"],\"showvalue\": [\"否\",\"是\"],\"type\":0}",
                "label": "运行中开门",
                "unit": "",
                "value": "0"
              },
              {
                "fun_info": "{\"value\": [\"0\",\"1\"],\"showvalue\": [\"正常\",\"异常\"],\"type\":0}",
                "label": "开门走车",
                "unit": "",
                "value": "0"
              },
              {
                "fun_info": "{\"value\": [\"0\",\"1\"],\"showvalue\": [\"正常\",\"异常\"],\"type\":0}",
                "label": "超车",
                "unit": "",
                "value": "0"
              },
              {
                "fun_info": "{\"value\": [\"0\",\"1\"],\"showvalue\": [\"否\",\"是\"],\"type\":0}",
                "label": "平层困人",
                "unit": "",
                "value": "0"
              },
              {
                "fun_info": "{\"value\": [\"0\",\"1\"],\"showvalue\": [\"否\",\"是\"],\"type\":0}",
                "label": "非平层困人",
                "unit": "",
                "value": "0"
              },
              {
                "fun_info": "{\"value\": [\"0\",\"1\"],\"showvalue\": [\"正常\",\"异常\"],\"type\":0}",
                "label": "积水",
                "unit": "",
                "value": "0"
              },
              {
                "fun_info": "",
                "label": "湿度",
                "unit": "%",
                "value": "0"
              },
              {
                "fun_info": "",
                "label": "温度",
                "unit": "℃",
                "value": "0"
              },
              {
                "fun_info": "",
                "label": "湿度",
                "unit": "%",
                "value": "0"
              },
              {
                "fun_info": "",
                "label": "视频",
                "unit": "",
                "value": "0"
              },
              {
                "fun_info": "",
                "label": "电压",
                "unit": "V",
                "value": "0"
              },
              {
                "fun_info": "",
                "label": "电流",
                "unit": "A",
                "value": "0"
              },
              {
                "fun_info": "",
                "label": "湿度",
                "unit": "%",
                "value": "0"
              }
            ],
            "device_title": "1号电梯",
            "state": 0,
            "xiu_count": 1
          },
          {
            "device_id": 34,
            "device_info": [
              {
                "fun_info": "",
                "label": "楼层位置",
                "unit": "楼",
                "value": "0"
              },
              {
                "fun_info": "{\"value\": [\"0\",\"1\",\"2\"],\"showvalue\": [\"停止\",\"上行\",\"下行\"],\"type\":0}",
                "label": "运行方向",
                "unit": "",
                "value": "0"
              },
              {
                "fun_info": "{\"value\": [\"0\",\"1\"],\"showvalue\": [\"无人\",\"有人\"],\"type\":0}",
                "label": "是否有人",
                "unit": "",
                "value": "0"
              },
              {
                "fun_info": "{\"value\": [\"0\",\"1\"],\"showvalue\": [\"关\",\"开\"],\"type\":0}",
                "label": "电梯门开关状态",
                "unit": "",
                "value": "0"
              },
              {
                "fun_info": "{\"value\": [\"0\",\"1\",\"2\"],\"showvalue\": [\"停止\",\"上行\",\"下行\"],\"type\":0}",
                "label": "电梯状态",
                "unit": "",
                "value": "0"
              },
              {
                "fun_info": "{\"value\": [\"0\",\"1\"],\"showvalue\": [\"正常\",\"异常\"],\"type\":0}",
                "label": "冲顶",
                "unit": "",
                "value": "0"
              },
              {
                "fun_info": "{\"value\": [\"0\",\"1\"],\"showvalue\": [\"正常\",\"异常\"],\"type\":0}",
                "label": "蹲底",
                "unit": "",
                "value": "0"
              },
              {
                "fun_info": "{\"value\": [\"0\",\"1\"],\"showvalue\": [\"正常\",\"异常\"],\"type\":0}",
                "label": "非平层停车",
                "unit": "",
                "value": "0"
              },
              {
                "fun_info": "{\"value\": [\"0\",\"1\"],\"showvalue\": [\"否\",\"是\"],\"type\":0}",
                "label": "运行中开门",
                "unit": "",
                "value": "0"
              },
              {
                "fun_info": "{\"value\": [\"0\",\"1\"],\"showvalue\": [\"正常\",\"异常\"],\"type\":0}",
                "label": "开门走车",
                "unit": "",
                "value": "0"
              },
              {
                "fun_info": "{\"value\": [\"0\",\"1\"],\"showvalue\": [\"正常\",\"异常\"],\"type\":0}",
                "label": "超车",
                "unit": "",
                "value": "0"
              },
              {
                "fun_info": "{\"value\": [\"0\",\"1\"],\"showvalue\": [\"否\",\"是\"],\"type\":0}",
                "label": "平层困人",
                "unit": "",
                "value": "0"
              },
              {
                "fun_info": "{\"value\": [\"0\",\"1\"],\"showvalue\": [\"否\",\"是\"],\"type\":0}",
                "label": "非平层困人",
                "unit": "",
                "value": "0"
              },
              {
                "fun_info": "{\"value\": [\"0\",\"1\"],\"showvalue\": [\"正常\",\"异常\"],\"type\":0}",
                "label": "积水",
                "unit": "",
                "value": "0"
              },
              {
                "fun_info": "",
                "label": "湿度",
                "unit": "%",
                "value": "0"
              },
              {
                "fun_info": "",
                "label": "温度",
                "unit": "℃",
                "value": "0"
              },
              {
                "fun_info": "",
                "label": "湿度",
                "unit": "%",
                "value": "0"
              },
              {
                "fun_info": "",
                "label": "视频",
                "unit": "",
                "value": "0"
              }
            ],
            "device_title": "1号电梯",
            "state": 0,
            "xiu_count": 0
          }*/
        ],

      }
    },
    watch:{
      floorSelectedOptions(newVal){
        if (newVal.length ===0){
          this.floor_id = 0
        } else {
          this.floor_id = newVal[newVal.length-1];
        }
      }
    },
    methods:{
      dealEval(v2){
        let reVal;
        let evalObj = eval('(' +v2.fun_info + ')');
        evalObj.value.map((item3, i3) => {
          if (v2.value == item3){
            reVal = evalObj.showvalue[i3];
            //console.log(reVal)
          }
        })
        //console.log(evalObj)
        return reVal
      },
      requestFloorData(){
        let that = this;
        let config = {
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.post('pc_ims/elevator/get_floor', config, headers).then(res => {
          let data0 = res.data;
          console.log('获取电梯楼层数据', config, res);
          if (data0.code == 0) {
            //楼层数据
            let area_level = data0.data;
            let dealedFloor = JSON.parse(JSON.stringify(area_level).replace(/title/g,'label').replace(/floor_id/g,'value').replace(/child/g,'children').replace(/\"children\"\:\[\]\,/g,''));
            this.floorOptions = dealedFloor;
            this.floorOptions.unshift({
              label:'全部区域',
              value:0,
            });
          } else {
            this.$message(data0.msg);
          }
        }).catch(err => {
          console.log(err);
        })
      },
      requestTopData(){
        let that = this;
        let config = {
          floor_id:this.floor_id
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.post('pc_ims/elevator/monitor_up', config, headers).then(res => {
          let data0 = res.data;
          console.log('获取实时监控上半层数据', config, res);
          if (data0.code == 0) {
            let data = data0.data;
            this.zong = data.zong;
            this.not_healthy = data.not_healthy;
            this.healthy = data.healthy;
          } else {
            this.$message(data0.msg);
          }
        }).catch(err => {
          console.log(err);
        })
      },
      requestBottomData(){
        this.loading = true;
        let that = this;
        let config = {
          floor_id:this.floor_id
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.post('pc_ims/elevator/monitor_low', config, headers).then(res => {
          let data0 = res.data;
          console.log('获取实时监控下半层数据', config, res);
          if (data0.code == 0) {
            let data = data0.data;
            this.diantiData = data;
            this.loading = false;
          } else {
            this.loading = false;
            this.$message(data0.msg);
          }
        }).catch(err => {
          this.loading = false;
          console.log(err);
        })
      },
      floorChange(val){
        console.log(val,this.floorSelectedOptions)
      },
      toHome(){
        this.$router.replace({ path: '/home', params: { isLogin: true} });
      },
      toWbHistory(){
        this.$parent.sData.lists.some((item,i)=>{
          if (item.name == '维保历史'){
            this.$router.replace({ path: (item.route)});
            this.$parent.$children[0].activeName=('item'+i);
          }
        })
      },
      toDataHistory(){
        this.$parent.sData.lists.some((item,i)=>{
          if (item.name == '数据监测'){
            this.$router.replace({ path: (item.route)});
            this.$parent.$children[0].activeName=('item'+i);
          }
        })
      },
      searchData(){
        this.requestTopData();
        this.requestBottomData();
      },
       //展示视频监控弹框
      showVideo(device_id){
        let that = this;
        let config = {
          device_id:device_id
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.post('pc_ims/elevator/video', config, headers).then(res => {
          let data0 = res.data;
          console.log('获取实时监控视频连接', config, res);
          if (data0.code == 0) {
            this.nowVideoUrl = data0.data.url;
            this.$refs.dialog.show();
          } else {
            this.$message(data0.msg);
          }
        }).catch(err => {
          console.log(err);
        })
      }
    },
    created() {
      this.requestFloorData();
      this.requestTopData();
      this.requestBottomData();
    },
    mounted() {
      this.$refs.HpadTop.style.paddingTop = Number(this.$parent.$children[0].$el.children[0].offsetHeight)+30+'px';
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
        height: 100%;
        .el-cascader{
          height: 100%;
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
          height: 100%;
          background-color: transparent !important;
          display: flex;
          align-items: center;
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
        margin-left: 0.1rem;
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
      overflow-y: auto;
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
            cursor: pointer;
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
            overflow: auto;
            table{
              width: 100%;
              border-collapse: collapse;
            }
            table td,th{
              border: 0;text-align: center;
            }
            .part{
              .tit{
                font-family: PingFangSC-Light;
                font-size: 0.14rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 1.1;
                letter-spacing: 0px;
                color: #b5d7ff;
                width: 0.79rem;
                display: block;
                padding: 0 0.05rem;
                background-color: rgba(0, 0, 0, 0.15);
                border-top-left-radius: 4px;
                border-bottom-left-radius: 4px;
                .vhPT(5);
                .vhPB(5);
              }
              .dd{
                display: flex;
                position:relative;
                align-items: center;
                justify-content: space-between;
              }
              .title1{
                min-width: .4rem;
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
    .dialog-in{
      width: 100%;
      height: calc(100% - 0.49rem);
      .videoBox{
        width: 100%;
        height: 100%;
      }
    }
  }

</style>
