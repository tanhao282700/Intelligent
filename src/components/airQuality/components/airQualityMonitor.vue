<!--
    空气质量监测系统 空气质量
    made by 胡永福
    start in 2019-1-14
-->
<template>
  <div>
    <div ref="HpadTop" class="tabsDomBox0 h-paddingTop">
      <div class="navCrumbs"><p @click="toHome">首页</p> > 空气质量监测系统 > <span>空气质量</span></div>
    </div>
    <div class="airQualityMonitor">
      <div class="selectBox">
        <div class="icon"></div>
        <div class="line1"></div>
        <div class="deviceBox">
          <span class="text">设备总数 <span v-text="allDeviceNum"></span></span>
          <div class="bar">
            <div :style="{width: barWidth}" class="bar-in"></div>
          </div>
          <span class="text secondText">当前数据异常 <span v-text="innormalDeviceNum" :style="{color:innormalDeviceNum==0?'#61a2ff':'#f56c6c'}"></span></span>
          <div class="bar2">
            <div class="bar2-in" :style="{width:(allDeviceNum==0?0:(innormalDeviceNum/allDeviceNum*100+'%'))}"></div>
          </div>
          <air-quality-popover2 :info="fault">
            <button :style="{color:innormalDeviceNum==0?'#4f648b':'#36fceb'}" class="btn">查看全部</button>
          </air-quality-popover2>
        </div>
        <div class="stateBox">
          <div class="box1">
            <span class="icon1"></span>
            <span class="stateText">正常</span>
          </div>
          <div class="box1">
            <span class="icon2"></span>
            <span class="stateText">数据异常</span>
          </div>
        </div>

        <div class="tRBrnBoxWrap">
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
      <div
        v-loading="loading"
        element-loading-background="rgba(0, 0, 0, 0.5)"
        element-loading-spinner="el-icon-loading"
        element-loading-text="拼命加载中"
        class="content">
        <div class="tuliBox">
          <img :src="floorImg" alt="我是底图">
          <div @click="showRegion(v.id,i)" v-for="(v,i) in deviceLists" :class="['item',(v.now_state==1 || v.now_state==2)?'red':'green']" :style="{left:(v.x+'px'),top:(v.y+'px')}" :key="''+v.id">
            <air-quality-popover ref="airQualityPopover" :deviceId="v.id">
              <div style="width: 100%;height: 100%;cursor: pointer"></div>
            </air-quality-popover>
          </div>
        </div>
      </div>
      <div class="regionInfoBox" v-if="showRegionInfo">
        <div class="closeBox" @click="hide">
          <i></i>
        </div>
        <div class="head">{{floor_label}}区域数据信息</div>
        <div class="body">
          <div class="tit">
            <div class="timeSelBox">
              <i class="el-icon-caret-bottom self-icon" style="padding-left:0.02rem;"></i>
              <el-date-picker
                @change="timeChange"
                format="yyyy-MM-dd HH时"
                value-format="yyyy-MM-dd HH:00:00"
                v-model="selectedTime"
                type="datetime"
                placeholder="选择时间"
                default-time="00:00:00">
              </el-date-picker>
            </div>
            <div class="itemBtnBox">
              <button @click="btnToggle(v,i)" type="button" :class="['itemBtn',{active:btnActive==i}]" v-for="(v,i) in pointLists" v-text="v.title" :key="'itemBtn'+i"></button>
            </div>
          </div>
          <div class="echartsBox">
            <air-q-line-echarts ref="airQLineEcharts" :datas="datas" />
          </div>
        </div>
      </div>

    </div>
  </div>
</template>


<script>
  import AirQualityPopover from "./airQualityPopover";
  import AirQLineEcharts from "./airQLineEcharts";
  import AirQualityPopover2 from "./airQualityPopover2";
  export default {
    components: {
      AirQualityPopover2,
      AirQLineEcharts,
      AirQualityPopover
    },
    name: "airQualityMonitor",
    data() {
      return {
        barWidth:0,
        fault:[],
        device_id:'',
        category_id:'',
        point_id:'',
        loading:false,
        allDeviceNum:'-',
        innormalDeviceNum:'-',
        deviceLists:[
          /*{
            "device_pic": [
              {
                "category_func_id": 0,
                "codes": "<div style=\"width:50px;background:#ccc;height:50px;\"></div>",
                "device_pic_2d_id": 17,
                "id": 32,
                "title": "一般",
                "type": 0,
                "update_date": "2019-01-15 15:32:21"
              },
              {
                "category_func_id": 0,
                "codes": "<div style=\"width:50px;background:#f00;height:50px;\"></div>",
                "device_pic_2d_id": 17,
                "id": 33,
                "title": "一般",
                "type": 1,
                "update_date": "2019-01-15 15:32:33"
              },
              {
                "category_func_id": 0,
                "codes": "<div style=\"width:50px;background:#f00;height:50px;\"></div>",
                "device_pic_2d_id": 17,
                "id": 34,
                "title": "一般",
                "type": 2,
                "update_date": "2019-01-15 15:32:38"
              },
              {
                "category_func_id": 0,
                "codes": "<div style=\"width:50px;background:#f00;height:50px;\"></div>",
                "device_pic_2d_id": 17,
                "id": 35,
                "title": "一般",
                "type": 3,
                "update_date": "2019-01-15 15:32:42"
              }
            ],
            "id": 4957,
            "now_state": 0,
            "title": "空气质量测试",
            "x": 473,
            "y": 231
          }*/
        ],
        floorImg:"",
        btnActive:0,
        datas:{
          id:'airQEchart',
          style:{width:'13.06rem',height:506*100/728+'vh'},
          showMarkL:false,
          markLineVal:0,
          unit:'-',
          color:[
            {color1:'rgba(74,144,226,1)',color2:'rgba(74,144,226,0.35)'},
          ],
          list:[
            {
              name:'',
              data:[]
            }
          ]
        },
        pointLists:[],

        selectedTime:'',
        showRegionInfo:false,
        floor_label:'-',
        floor_id:'',
        floorSelectedOptions:[],
        floorOptions: [
          /*{
            label:'全部',
            value:0
          },
          {
            label:'1号楼',
            value:111,
            children:[
              {
                label:'1号停车场',
                value:222
              },
            ]
          }*/
        ],
      }
    },
    computed:{
    },
    watch:{
      floorSelectedOptions(newVal){
        if (newVal.length ===0){
          this.floor_id = 0
          this.floor_label = '全部';
        } else {
          this.floor_id = newVal[newVal.length-1];
          this.floorOptions.some((item,i)=>{
            if (this.floor_id == item.value) {
              this.floor_label = item.label;
              return true;
            }
          })
        }
      }
    },
    methods: {
      timeChange(val){
        //console.log(val);
        this.getTimeRegionData();
      },
      showRegion(device_id,index){
        this.device_id = device_id;
        this.showRegionInfo = true;
        this.getRegionData(device_id);
        //console.log(this.$refs.airQualityPopover[index])
        this.$refs.airQualityPopover[index].$children[0].doClose();
      },
      btnToggle(item,index){
        this.btnActive = index;
        this.category_id = item.category_id;
        this.point_id = item.point_id;
        if (this.selectedTime != ''){
          this.getTimeRegionData();
        } else {
          if (item.standard != '') {
            this.datas.showMarkL = true;
            this.datas.markLineVal = Number(item.standard);
          } else {
            this.datas.showMarkL = false;
            this.datas.markLineVal = 0;
          }
          this.datas.unit = item.unit;
          this.datas.list[0].name = item.title;
          this.datas.list[0].data = item.data;
          this.$refs.airQLineEcharts.drawLine();
        }
      },
      //获取设备各个点位报表数据
      getRegionData(device_id){
        let that = this;
        let config = {
          device_id:device_id
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.get('air_pc/pc/device/table', config, headers).then(res => {
          let data = res.data;
          console.log('获取设备各个点位报表数据', config, res);
          if (data.code == 0) {
            let deviceTableData = data.data;
            if (deviceTableData.length !==0){
              let item = deviceTableData[0];
              this.category_id = item.category_id;
              this.point_id = item.point_id;
              if (item.standard != ''){
                this.datas.showMarkL = true;
                this.datas.markLineVal = Number(item.standard);
              } else {
                this.datas.showMarkL = false;
                this.datas.markLineVal = 0;
              }
              this.datas.unit = item.unit;
              this.datas.list[0].name = item.title;
              this.datas.list[0].data = item.data;
              this.$refs.airQLineEcharts.drawLine();
            }
            this.pointLists = deviceTableData;
          } else {
            this.$message(data.message);
          }
        }).catch(err => {
          console.log(err);
        })
      },
      //获取设备各个点位报表数据,增加时间筛选
      getTimeRegionData(){
        let that = this;
        let config = {
          device_id:this.device_id,
          category_id:this.category_id,
          point_id:this.point_id,
          time:this.selectedTime
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.get('air_pc/pc/device/point/table', config, headers).then(res => {
          let data = res.data;
          console.log('获取设备各个点位报表数据,时间筛选', config, res);
          if (data.code == 0) {
            this.datas.list[0].data = data.data;
            this.$refs.airQLineEcharts.drawLine();
          } else {
            this.$message(data.message);
          }
        }).catch(err => {
          console.log(err);
        })
      },
      //获取楼层数据
      getFloorData(){
        let that = this;
        let config = {
          sys_menu_id: this.$store.state.sysList[10].sys_menu_id,
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.get('power_pc/pc/floor', config, headers).then(res => {
          let data = res.data;
          console.log('获取空气质量楼层', config, res);
          if (data.code == 0) {
            let datas = data.data;
            let tempArr = [];
            datas.map((item, i) => {
              if (i===0){
                this.floor_label = item.title;
                this.value = item.id;
                //this.floor_id = item.id;
                this.floorSelectedOptions.push(item.id);
                this.get2DImgData(item.id);
              }
              let obj = {};
              obj.label = item.title;
              obj.value = item.id;
              tempArr.push(obj);
            })
            this.floorOptions = tempArr;
          } else {
            this.$message(data.message);
          }
        }).catch(err => {
          console.log(err);
        })
      },
      //获取设备总数及异常设备
      getTopData(){
        let that = this;
        let config = {
          sys_menu_id: this.$store.state.sysList[10].sys_menu_id,
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.get('air_pc/pc/index', config, headers).then(res => {
          let data = res.data;
          /*data = {
            "code": 0,
            "data": {
              "fault": [
                {
                  id:4957,
                  name:'测试'
                },
                {
                  id:2,
                  name:'测试2'
                },
                {
                  id:3,
                  name:'测试3'
                },
              ],
              "normal": 6
            },
            "message": "",
            "paging": 0
          }*/
          console.log('获取获取设备总数及异常设备', config, res);
          if(data.code == 0) {
            this.fault = data.data.fault;
            this.innormalDeviceNum = data.data.fault.length;
            this.allDeviceNum = data.data.normal;
          } else {
            this.$message(data.message);
          }
        }).catch(err => {
          console.log(err);
        })
      },
      //获取楼层下2d图
      get2DImgData(floor_id=this.floor_id){
        this.loading = true;
        let that = this;
        let config = {
          sys_menu_id: this.$store.state.sysList[10].sys_menu_id,
          floor_id:floor_id
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.get('air_pc/pc/floor', config, headers).then(res => {
          let data = res.data;
          console.log('获取空气质量2d图', config, res);
          if(data.code == 0) {
            this.floorImg = data.data.floor;
            this.deviceLists = data.data.device;
            this.loading = false;
          } else {
            this.loading = false;
            this.$message(data.message);
          }
        }).catch(err => {
          this.loading = false;
          console.log(err);
        })
      },

      searchData(){
        this.get2DImgData();
      },
      floorChange(val){
        console.log(val,this.floorSelectedOptions)
      },
      toHome(){
        this.$router.replace({ path: '/home', params: { isLogin: true} });
      },
      hide(){
        this.showRegionInfo = false;
        this.selectedTime = '';
        this.btnActive = 0;
      }
    },
    created() {
      this.getTopData();
      this.getFloorData();
    },
    mounted() {
      this.$refs.HpadTop.style.paddingTop = Number(this.$parent.$children[0].$el.children[0].offsetHeight)+30+'px';
      this.barWidth = '1.4rem';
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">

  @import '../../../assets/css/comon';
  @import '../../../assets/css/common.css';
  .airQualityMonitor{
    width: 13.06rem;
    margin: 0 auto;
    position: relative;
    .selectBox{
      border-radius: 4px;
      padding: 0 0.2rem;
      margin: 0 auto;
      width: 13.06rem;
      .vh(60);
      box-shadow: 0px 4px 10px 0px
      rgba(73, 143, 226, 0.22),
      inset 1px 1px 2px 0px
      rgba(248, 253, 255, 0.15),
      inset 0px -1px 1px 0px
      #498fe2;
      display: flex;
      align-items: center;
      .icon{
        width: 0.24rem;
        height: 0.29rem;
        background: url("/static/airQualityImg/dw3.png") no-repeat center;
        background-size: 100% 100%;
      }
      .line1{
        width: 1px;
        .vh(20);
        background-color: #61a2ff;
        margin: 0 0.2rem;
      }
      .deviceBox{
        width: 6.92rem;
        display: flex;
        align-items: center;
        .text{
          font-family: PingFangSC-Regular;
          font-size: 0.16rem;
          font-weight: normal;
          font-stretch: normal;
          line-height: 1;
          letter-spacing: 0px;
          color: #ffffff;
          span{
            color: #61a2ff;
          }
        }
        .bar{
          width: 1.4rem;
          .vh(22);
          margin-left: 0.1rem;
          background-color: rgba(0,0,0,0.4);
          border: 1px solid rgba(58,132,238,0.2);
          .bar-in{
            width: 0;
            height: 100%;
            background-color: #3a84ee;
            transition: width 1s;
          }
        }
        .secondText{
          margin-left: 0.4rem;
        }
        .bar2{
          width: 1.4rem;
          .vh(22);
          background-color: rgba(0,0,0,0.4);
          border: 1px solid rgba(58,132,238,0.2);
          margin-left: 0.1rem;
          .bar2-in{
            width: 0;
            height: 100%;
            background-color: #f56c6c;
            transition: width 1s;
          }
        }
        .btn{
          margin-left: 0.2rem;
          cursor: pointer;
          min-width: 0.64rem;
          font-family: PingFangSC-Regular;
          text-decoration: underline;
          font-size: 0.16rem;
          font-weight: normal;
          font-stretch: normal;
          line-height: 1;
          letter-spacing: 0px;
          color: #4f648b;
          background-color: transparent;
          border: 0;
          outline: none;
        }
      }
      .stateBox{
        width: 2.72rem;
        .vh(20);
        border-left: 1px solid #61a2ff;
        border-right: 1px solid #61a2ff;
        display: flex;
        justify-content: center;
        align-items: center;
        .box1{
          display: flex;
          align-items: center;
          &:last-of-type{
            margin-left: 0.3rem;
          }
          .icon1{
            width: 0.16rem;
            height: 0.16rem;
            border-radius: 50%;
            background-color: rgb(73, 226, 130);
            box-shadow: 0px 0px 4px 0px
            rgba(73, 226, 130, 0.45);
          }
          .icon2{
            width: 0.16rem;
            height: 0.16rem;
            border-radius: 50%;
            background-color: rgb(245, 108, 108);
            box-shadow: 0px 0px 4px 0px
            rgba(245, 108, 108, 0.45);
          }
          .stateText{
            margin-left: 0.1rem;
            font-family: PingFangSC-Regular;
            font-size: 0.16rem;
            line-height: 1;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #ffffff;
          }
        }
      }
      .tRBrnBoxWrap{
        margin-left: 0.4rem;
        width: 1.10rem;
        .vh(32);
        border: 1px solid #3a84ee;
        display: flex;
        justify-content: center;
      }
      .tRBrnBox {
        width: 0.88rem;
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
          border-width:5px 5px 0;
          border-style:solid;
          border-color:#fff transparent transparent;/*黄 透明 透明 */
          position:absolute;
          .vhTop(16);
          left:-0.05rem;
          &::before{
            content: "";
            display:block;
            width:0;
            height:0;
            border-width:5px 5px 0;
            border-style:solid;
            border-color:#fff transparent transparent;/*黄 透明 透明 */
            position:absolute;
            .vhTop(-11);
            left:-0.04rem;
            transform: rotate(180deg);
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
          //border-bottom: solid 1px #1989fa !important;
          background-color: transparent !important;
        }
      }
      .sltbtn{
        width: 0.87rem;
        margin-left: 0.12rem;
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
    .content{
      .vhMT(21);
      width: 100%;
      .vh(538);
      border-radius: 4px;
      box-shadow: 0px 4px 10px 0px
      rgba(73, 143, 226, 0.22),
      inset 1px 1px 2px 0px
      rgba(248, 253, 255, 0.15),
      inset 0px -1px 1px 0px
      #498fe2;

      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      .tuliBox{
        width: 100%;
        height: 100%;
        position: relative;
        overflow: auto;
      }
      .item{
        width: 0.36rem;
        height: 0.49rem;
        position: absolute;
        left: 0;
        top: 0;
        &.red{
          background: url(/static/airQualityImg/dw2.png) no-repeat center;
          background-size: 100% 100%;
        }
        &.green{
          background: url(/static/airQualityImg/dw1.png) no-repeat center;
          background-size: 100% 100%;
        }
      }
    }
    .regionInfoBox{
      border-radius: 4px;
      background-color: #02122a;
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 10;
      .closeBox{
        width: 0.18rem;
        height:0.18rem;
        border-radius: 50%;
        position: absolute;
        right:0;
        top: 0;
        background-color: #00275b;
        cursor: pointer;
        z-index: 10;
        display: flex;
        justify-content: center;
        align-items: center;
        i{
          display: inline-block;
          width: 0.1rem;
          height:0.02rem;
          background: #3b89f9;
          line-height: 0;
          font-size:0;
          vertical-align: middle;
          transform: rotate(45deg);
          &:after{
            content:'/';
            display:block;
            width: 0.1rem;
            height:0.02rem;
            background: #3b89f9;
            transform: rotate(-90deg);
          }
        }
      }
      .head{
        width: 100%;
        .vh(50);
        background-color: rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .body{
        display: flex;
        width: 100%;
        .vh(568);
        flex-direction: column;
        .tit{
          display: flex;
          align-items: center;
          width: 100%;
          .vh(62);
          position: relative;
          .vhPT(5);
          .timeSelBox{
            padding: 0 0.1rem;
            position: absolute;
            left: 0.2rem;
            .vhTop(15);
            width: 1.3rem;
            .vh(32);
            border: 1px solid #1989fa;
            border-radius: 4px;
            .self-icon{
              position: absolute;
              .vhTop(12);
              right: 0.08rem;
              &::after{
                position: absolute;
                .vhTop(-6);
                right: 0;
                content: '\E60B';
                transform: rotate(180deg);
              }
            }
            .el-input--suffix .el-input__inner{
              padding: 0;
              width: 100%;
              height: 100%;
              border: 0;
            }
            .el-input__prefix{
              display: none;
            }
            .el-input__suffix{
              display: none;
            }
          }
          .itemBtnBox{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            .itemBtn{
              margin-left: 0.1rem;
              min-width: 0.82rem;
              .vh(32);
              border: 1px solid transparent;
              outline: none;
              font-family: PingFangSC-Regular;
              font-size: 0.14rem;
              line-height: 1;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0px;
              color: #c6c6c6;
              background-color: #0d2a53;
              border-radius: 4px;
              cursor: pointer;
              &:first-of-type{
                margin-left: 0;
              }
              &.active{
                color: #3B89F9;
                border-color: #3B89F9;
              }
            }
          }
        }
        .echartsBox{
          width: 100%;
          .vh(506);
        }
      }
    }
    .dialog-in{
      width: 100%;
      height: calc(100% - 0.49rem);
    }
  }

</style>
