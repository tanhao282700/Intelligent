<!--
    变配电系统 进出情况
    made by 胡永福
    start in 2018-9-6
-->
<template>
  <div
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0.5)"
    element-loading-spinner="el-icon-loading"
    element-loading-text="拼命加载中"
    class="inOutSituation">
    <div class="self-box1">
      <div class="head">
        <span>视频监控情况</span>
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
      </div>
      <div class="bodyWrap">
        <el-scrollbar style="height: 100%">
          <div class="body">
            <div v-for="(v,i) in videoLists" class="self-card no-select" :key="v.id" @click="showVideo(v)">
              <div class="imgBox"></div>
              <div v-text="v.title" class="title"></div>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
    <div class="self-box2">
      <div class="head">进出记录</div>
      <div class="body">
        <div class="head2">
          <div class="btnWrap">
            <div class="monthBox">
              <el-date-picker
                v-model="monthVal"
                type="month"
                format="yyyy-MM"
                value-format="yyyy-MM"
                placeholder="选择月">
              </el-date-picker>
            </div>
            <div class="tRBrnBox">
              <el-select @change="selChange2" v-model="value2" placeholder="请选择">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="tRBrnBox">
              <el-select @change="selChange3" v-model="value3" placeholder="请选择">
                <el-option
                  v-for="item in options3"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <!--<div class="tRBrnBox">
              <el-select @change="selChange4" v-model="value4" placeholder="请选择">
                <el-option
                  v-for="item in options4"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="tRBrnBox">
              <el-select @change="selChange5" v-model="value5" placeholder="请选择">
                <el-option
                  v-for="item in options5"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>-->
            <!--<div class="serConBox">
              <el-input v-model="serCon" placeholder="请输入内容"></el-input>
            </div>-->
          </div>
          <div class="searchBtn">
            <el-button @click="search()" type="primary" icon="el-icon-search">查询</el-button>
          </div>
        </div>
        <div class="body2">
          <Table @changePage="changePage" :table = "table2"/>
        </div>
      </div>
    </div>
    <dialog2 wid = "9.39rem" hei = "618" tit="视频监控情况" ref = "dialog">
      <div class="dialog-in">
        <div class="left">
          <div class="videoBox">
            <iframe
              ref="iframeVideo"
              name="myFrame"
              frameborder="0"
              width="100%"
              height="100%"
              src="/static/inOutVideo/inOutVideo.html">
            </iframe>
          </div>
        </div>
        <div class="right">
          <div class="videoList">
            <el-scrollbar style="height: 100%">
              <div @click="toggleVideo(v)" v-for="(v,i) in videoLists" class="part" :key="v.id">
                <div class="imgBox"></div>
                <div class="title" v-text="v.title"></div>
                <div :class="['self-shadow',{active:v.id==activeID}]"></div>
              </div>
            </el-scrollbar>
          </div>
        </div>
      </div>
    </dialog2>
  </div>
</template>

<script>
  import utils from "../../../../assets/js/utils.js";
  import Table from "../../../../components/common/table2";
  import Dialog2 from "../dialog/dialog2";
  export default {
    components: {
      Dialog2,
      Table
    },
    name: "inOutSituation",
    data() {
      return {
        iframeWin:{},
        videoData:[
          {
            "device": [
              {
                "id": "18",
                "now_value": "",
                "title": "3号视频"
              }
            ],
            "floor_id": 4,
            "title": "1号"
          }
        ],
        floor: [
          {
            "device": [
              {
                "device_id": "4342",
                "title": "1号门禁"
              },
              {
                "device_id": "4343",
                "title": "2号门禁"
              },
              {
                "device_id": "4344",
                "title": "3号门禁"
              }
            ],
            "floor_id": 1,
            "title": "第一层"
          },
          {
            "device": [
              {
                "device_id": "4347",
                "title": "6号门禁"
              }
            ],
            "floor_id": 5,
            "title": "2号"
          }
        ],
        department: [
          {
            "id": 1,
            "title": "维修班组",
            "user": [
              {
                "id": 12,
                "name": "测试用户1"
              },
              {
                "id": 13,
                "name": "测试用户2"
              },
              {
                "id": 11,
                "name": "测试用户3"
              },
              {
                "id": 21,
                "name": "测试用户5"
              },
              {
                "id": 19,
                "name": "测试用户4"
              },
              {
                "id": 43,
                "name": "测试用户6"
              },
              {
                "id": 44,
                "name": "测试用户7"
              },
              {
                "id": 103,
                "name": "林仔"
              },
              {
                "id": 20,
                "name": "可乐"
              },
              {
                "id": 107,
                "name": "普通人员"
              },
              {
                "id": 98,
                "name": "管理人员"
              },
              {
                "id": 10,
                "name": "孤客"
              },
              {
                "id": 111,
                "name": "test0"
              },
              {
                "id": 112,
                "name": "test1"
              },
              {
                "id": 113,
                "name": "test2"
              }
            ]
          },
          {
            "id": 2,
            "title": "运维组",
            "user": [
              {
                "id": 114,
                "name": "餐饮部"
              },
              {
                "id": 115,
                "name": "餐饮部管理员"
              }
            ]
          }
        ],
        options:[],
        value:'',
        options2:[],
        value2:'',
        options3:[],
        value3:'',
        options4:[],
        value4:'',
        options5:[],
        value5:'',
        loading:false,

        videoLists:[
          /*{
            "id": "18",
            "now_value": "ws://120.76.20.236:8081/action=stream,project=14,camera=25??",
            "title": "3号视频"
          },
          {
            "id": "19",
            "now_value": "ws://120.76.20.236:8081/action=stream,project=14,camera=20??",
            "title": "34号视频"
          }*/
        ],

        monthVal:utils.time(new Date()/1000,9),

        num:1,
        table2:{
          showPagination:true,
          hei:420, //table高度  设置后有滚动条
          len:0, //总条数
          pageSize:20, //每页的条数 。默认为20
          page:1,  //当前页码
          data:[
            // {num:'01',time:'2018/06/02  16:55',action:'进',name:'阿小呆',department:'市场营销',},
          ],
          th:[
            {prop:'number',label:'编号',wid:104},
            {prop:'time',label:'时间',wid:175},
            {prop:'floor',label:'设备机房',wid:172},
            {prop:'device',label:'门编号',wid:124},
            {prop:'action',label:'事件',wid:139},
            {prop:'name',label:'人员名',wid:125},
            {prop:'department',label:'部门'},
          ]
        },


        activeID:'',

      }
    },
    methods: {
      selChange(val){
        this.videoLists = [];
        this.videoData.some((item,i)=>{
          if (item.floor_id === val){
            let tempArr = [];
            item.device.map((item2,i2)=>{
              let obj = {};
              obj.id = item2.id;
              obj.now_value = item2.now_value;
              obj.title = item2.title;
              tempArr.push(obj);
            })
            this.videoLists = tempArr;
          }
        })
      },
      selChange2(val){
        this.value3 = '';
        this.options3 = [];
        this.floor.some((item,i)=>{
          if (item.floor_id == val) {
            let tempArr = [];
            item.device.map((item2,i2)=>{
              if (i2 === 0){
                this.value3 = item2.device_id;
              }
              let obj = {};
              obj.label = item2.title;
              obj.value = item2.device_id;
              tempArr.push(obj);
            })
            this.options3 = tempArr;
            return true;
          }
        })
      },
      selChange3(val){
        console.log(val)
      },
      selChange4(val){
        this.options5 = [];
        this.department.some((item,i)=>{
          if (item.id == val) {
            let tempArr = [];
            item.user.map((item2,i2)=>{
              let obj = {};
              obj.label = item2.name;
              obj.value = item2.id;
              tempArr.push(obj);
            })
            this.options5 = tempArr;
            return true;
          }
        })
      },
      selChange5(val){
        console.log(val)
      },
      getTitle() {
        this.options2 = [];
        this.options4 = [];
        let that = this;
        let config = {
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.get('power_pc/pc/door/title', config, headers).then(res => {
          let data = res.data;
          console.log('获取进出情况title', config, res);
          if (data.code == 0) {
            let datas = data.data;
            let tempArr = [], tempArr2 = [];
            let floor = datas.floor;
            this.floor = floor;
            floor.map((item,i)=>{
              if (i===0){
                this.value2 = item.floor_id;
                let tempArr0 = [];
                item.device.map((item0,i0)=>{
                  if (i0===0){
                    this.value3 = item0.device_id;
                    this.getInOutData(this.monthVal,1);
                  }
                  let obj0 = {};
                  obj0.label = item0.title;
                  obj0.value = item0.device_id;
                  tempArr0.push(obj0);
                })
                this.options3 = tempArr0;
              }
              let obj = {};
              obj.label = item.title;
              obj.value = item.floor_id;
              tempArr.push(obj);
            })
            this.options2 = tempArr;

            //据说没有,先注释掉吧
            /*let department = datas.department;
            this.department = department;
            department.map((item2,i2)=>{
              let obj2 = {};
              obj2.label = item2.title;
              obj2.value = item2.id;
              tempArr2.push(obj2)
            })
            this.options4 = tempArr2;*/

          } else {
            this.$message(data.message);
          }
        }).catch(err => {
          console.log(err);
        })
      },
      //获取进出视频监控数据
      getVideoData(){
        let that = this;
        let config = {
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.get('power_pc/pc/video', config, headers).then(res => {
          let data = res.data;
          console.log('进出情况视频监控', config, res);
          if(data.code==0){
            let datas = data.data;
            this.videoData = datas;
            let tempArr = [];
            datas.map((item,i)=>{
              if (i===0){
                this.value = item.floor_id;
                let tempArr2 = [];
                item.device.map((item2,i2)=>{
                  let obj = {};
                  obj.id = item2.id;
                  obj.now_value = item2.now_value;
                  obj.title = item2.title;
                  tempArr2.push(obj);
                })
                this.videoLists = tempArr2;
              }
              let obj = {};
              obj.label = item.title;
              obj.value = item.floor_id;
              tempArr.push(obj);
            })
            this.options = tempArr;


          }else{
            this.$message(data.message);
          }
        }).catch(err=>{
          console.log(err);
        })


      },
      //进出记录信息
      getInOutData(time,num=1){
        let floorVal='';
        let deviceVal='';
        this.floor.some((item11,i11)=>{
          if (item11.floor_id == this.value2){
            floorVal = item11.title;
            item11.device.some((item22,i22)=>{
              if (item22.device_id == this.value3){
                deviceVal = item22.title;
                return true;
              }
            })
          }
        })
        this.loading = true;
        let that = this;
        let config = {
          'sys_menu_id':this.$store.state.sysList[3].sys_menu_id,
          'time':time,
          'pagesize':20,
          'pagenumber':num,
          'floor_id':this.value2,
          'device_id':this.value3,
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.get('power_pc/pc/door/data', config, headers).then(res => {
          let data = res.data;
          console.log('进出记录数据报表', config, res);
          if(data.code==0){

            this.table2.len = data.paging;//多少条数据

            let data2 = data.data;
            /*data2 = [
              {num:'01',time:'2018/06/02  16:55',action:'进',user:'阿小呆',department:'市场营销',},
            ];*/
            let dataArr = [];
            data2.map((item,i)=>{
              let obj = {};
              let numVal = (i+1)+(this.table2.page-1)*20;
              obj.number = (numVal<10?('0'+numVal):(''+numVal));
              obj.time = item.time;
              obj.action = item.action;
              obj.name = item.user;
              obj.department = item.department;
              obj.floor = floorVal;
              obj.device = deviceVal;
              dataArr.push(obj);
            })
            this.table2.data = dataArr;
            this.loading = false;
          }else{
            this.loading = false;
            this.$message(data.message);
          }
        }).catch(err=>{
          console.log(err);
          this.loading = false;
        })

      },
      //分页：切换页面
      changePage(val){
        this.num = val;
        this.getInOutData(this.monthVal,val)
        //console.log(val)
      },

      search(){
        this.table2.page = 1;
        this.getInOutData(this.monthVal,1)
      },
      //展示视频监控弹框
      showVideo(item){
        this.$refs.dialog.show();
        this.activeID = item.id;
        this.iframeWin.postMessage({
          cmd: 'changeUrl',
          params: {
            url:item.now_value
          }
        }, '*')

      },
      //视频弹框中切换
      toggleVideo(item){
        this.activeID = item.id;
        this.iframeWin.postMessage({
          cmd: 'changeUrl',
          params: {
            url:item.now_value
          }
        }, '*')
      },
      //销毁视频
      destroyVideo(){
        this.iframeWin.postMessage({
          cmd: 'destroyVideo',
          params: {
          }
        }, '*')
      }
    },
    created() {
      this.getTitle();

      this.getVideoData();
    },
    mounted() {
      this.iframeWin = this.$refs.iframeVideo.contentWindow;
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">
  @import '../../../../assets/css/common.css';
  @import '../../../../assets/css/comon';

  .inOutSituation{
    .video-js .vjs-big-play-button{}

    .el-input--suffix .el-input__inner{
      height: 100%!important;
    }
    width: 100%;
    display: flex;
    justify-content: space-between;
    .self-box1{

      width: 3.31rem;
      .vh(578);
      background-color: transparent;
      box-shadow: 0px 4px 10px 0px
      rgba(73, 143, 226, 0.22),
      inset 1px 1px 2px 0px
      rgba(248, 253, 255, 0.15),
      inset 0px -1px 1px 0px
      #498fe2;
      border-radius: 4px;
      position: relative;
      .tRBrnBox{
        margin-left: 0.8rem;
        width: 0.98rem;
        .vh(24);
        .el-select{
          height: 100%;
          .el-input{
            height: 100%;
          }
        }
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
        .el-input--suffix .el-input__inner{
          .vh(24);
          padding: 0;
          border: 0!important;
          border-bottom: solid 1px #1989fa!important;
        }
      }
      .head{
        width: 100%;
        .vh(39);
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 4px;
        padding: 0 0.16rem;

        font-family: PingFangSC-Medium;
        font-size: 0.16rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: 0px;
        color: #008aff;
        display: flex;
        align-items: center;
      }
      .bodyWrap{
        width: 100%;
        .vh(539);
        padding-bottom: 0.2rem;
        padding-left: 1px;
        .body{

          display: flex;
          justify-content: flex-start;
          align-content: flex-start;
          flex-wrap: wrap;
          padding: 0 0.15rem;
          .vhMT(10);
          .vhMB(10);
          .self-card{
            width: 1.40rem;
            .vh(140);
            margin-left: 0.05rem;
            margin-right: 0.05rem;
            .vhMT(5);
            .vhMB(5);
            background-color: rgba(0,0,0,0.2);
            border-radius: 4px;
            cursor: pointer;
            &:hover{
              background-color: rgba(255,255,255,0.2);
            }
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            .title{
              width: 100%;
              font-family: PingFangSC-Medium;
              font-size: 0.12rem;
              font-weight: normal;
              font-stretch: normal;
              line-height: 1;
              letter-spacing: 0px;
              color: #008aff;
              text-align: center;
            }
            .imgBox{
              width: 0.83rem;
              height: 0.57rem;
              background: url("/static/inOutVideo/icon_video.png") no-repeat center;
              background-size: 100% 100%;
            }
          }

          .head2{
            width: 100%;
            .vh(64);
            padding: 0 0.2rem;
            display: flex;
            align-items: center;
            .monthBox{
              display: inline-block;
              width: 1.20rem;
              .vh(32);
            }
            .searchBtn{
              margin-left: 0.12rem;
              width: 0.87rem;
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
          .body2{
            width: 100%;
            padding: 0 0.2rem;
          }
        }
      }

    }
    .self-box2{
      width: 9.55rem;
      .vh(578);
      background-color: transparent;
      box-shadow: 0px 4px 10px 0px
      rgba(73, 143, 226, 0.22),
      inset 1px 1px 2px 0px
      rgba(248, 253, 255, 0.15),
      inset 0px -1px 1px 0px
      #498fe2;
      border-radius: 4px;
      .head{
        width: 100%;
        .vh(39);
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 4px;
        padding: 0 0.16rem;

        font-family: PingFangSC-Medium;
        font-size: 0.16rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: 0px;
        color: #008aff;

        display: flex;
        align-items: center;
      }
      .bodyWrap{
        width: 100%;
        .vh(539);
        padding-bottom: 0.2rem;
        padding-left: 1px;
      }
      .body{
        width: 100%;
        .vh(539);
        display: flex;
        justify-content: flex-start;
        align-content: flex-start;
        flex-wrap: wrap;

        .head2{
          width: 100%;
          .vh(64);
          padding: 0 0.2rem;
          display: flex;
          align-items: center;
          .btnWrap{
            display: flex;
            width: 3.18rem;
            .vh(32);
            position: relative;
            border: 1px solid #3a84ee;
            padding: 0 0.15rem;
            .monthBox{
              &::after{
                content: "";
                pointer-events: none;
                display:block;
                width:0;
                height:0;
                border-width:4px 4px 0;
                border-style:solid;
                border-color:#008aff transparent transparent;/*黄 透明 透明 */
                position:absolute;
                .vhTop(12);
                left:0.75rem;
              }
              display: inline-block;
              //align-items: center;
              width: 0.8rem;
              .vh(24);
              border-bottom: 1px solid #3a84ee;
              .el-input__prefix{
                display: none;
              }
              .el-input__suffix{
                display: none;
              }
              .el-input__inner{
                border:0;
                padding: 0;
              }
            }
            .tRBrnBox{
              margin-left: 0.1rem;
              width: 0.92rem;
              .vh(24);
              .el-select{
                height: 100%;
              }
              .el-select>.el-input{
                height: 100%;
              }
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
              .el-input--suffix .el-input__inner{
                .vh(24);
                padding: 0;
                border: 0!important;
                border-bottom: solid 1px #1989fa!important;
              }
            }
            /*.serConBox{
              margin-left: 0.1rem;
              width: 1.54rem;
              .vh(24);
              border-bottom: 1px solid #3a84ee;
              .el-input {
                position: relative;
                font-size: 0.12rem;
                color: #fff;
                display: inline-block;
                width: 100%;
                height: 100%;
                .el-input__inner {
                  padding: 0 5px;
                  width: 100%;
                  height: 100%;
                  font-size: 0.12rem!important;
                  color: #fff!important;
                  background-color: rgba(0,0,0,0)!important;
                  border-radius: 2px!important;
                  border: 0;
                  line-height: normal!important;
                }
              }
            }*/
          }
          .searchBtn{
            //margin-left: 0.12rem;
            width: 0.87rem;
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
        .body2{
          width: 100%;
          padding: 0 0.2rem;
        }
      }
    }

    .dialog-in{
      display: flex;
      justify-content: space-between;
      .left{
        .videoBox{
          width: 7.20rem;
          height: 5.38rem;
          background-color: #000000;
          box-shadow: 0px 4px 10px 0px
          rgba(73, 143, 226, 0.22),
          0px 2px 4px 0px
          rgba(0, 0, 0, 0.5);
          border-radius: 4px;
          overflow: hidden;

          margin-top: 0.16rem;
          margin-left: 0.2rem;

        }
      }
      .right{
        margin-right: -1px;
        .videoList{
          height: 5.38rem;
          margin-top: 0.16rem;

          .part{
            position: relative;
            &:first-of-type{
              margin-top: 0;
            }
            margin-top: 0.16rem;
            margin-right: 0.2rem;

            cursor: pointer;
            width: 1.63rem;
            height: 1.22rem;
            background-color: #0c2547;
            box-shadow: 0px 2px 5px 0px
            rgba(73, 143, 226, 0.22);
            border-radius: 2px;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            .title{
              width: 100%;
              font-family: PingFangSC-Regular;
              font-size: 0.12rem;
              font-weight: normal;
              font-stretch: normal;
              line-height: 1;
              letter-spacing: 0px;
              color: #ffffff;
              text-align: center;
            }
            .imgBox{
              width: 0.83rem;
              height: 0.57rem;
              background: url("/static/inOutVideo/icon_video.png") no-repeat center;
              background-size: 100% 100%;
            }
            .self-shadow{
              position: absolute;
              left: 0;
              top: 0;
              width: 1.63rem;
              height: 1.22rem;
              background-color: rgba(0,0,0,0.5);
              &:hover{
                background-color: transparent;
              }
            }
            .active{
              background-color: transparent;
            }
          }
        }
      }
    }
  }


</style>
