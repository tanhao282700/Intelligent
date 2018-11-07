<template>
  <div class="airConditionerEnd">
    <div class="rtBtnBox">
      <button @click="showControlFail" type="button">控制失败列表（{{newNum}}）<span v-show="newNum!=0" class="tip"></span></button>
      <button @click="showControlMost" type="button">批量控制</button>
    </div>

    <div class="deviceDetailBox">
      <div class="deviceSet">
        <div class="imgBox">
          <img src="../../../../assets/img/airConditioner/device1.png" alt="">
        </div>

        <div class="btnBox">
          <div class="head">
            <div class="left">1号楼1F男厕所</div>
            <self-popover3 :info="[
              {id:1,tit:'设备名称',content:'设备名称'},
              {id:1,tit:'设备类型',content:'空调机房主机'},
              {id:1,tit:'设备品牌',content:'格力'},
              {id:1,tit:'设备型号',content:'xxxxxxxx'},
              {id:1,tit:'厂商',content:'xxxxxxxx'},
              {id:1,tit:'启用时间',content:'xxxxxxxx'},
              {id:1,tit:'维保名称',content:'xxxxxxxx'},
              {id:1,tit:'维保电话',content:'xxxxxxxx'},
            ]"/>
          </div>
          <div class="title">温度</div>
          <Lines type="h" :wid="93" :left="145"/>
          <div class="inputBox">
            <el-input-number v-model="tempVal" @change="tempHandleChange" :min="1" :max="100" label="描述文字"></el-input-number>
            <span class="unit">℃</span>
          </div>

          <div class="controlBtn">
            <div class="left">
              <button @click="dealMakeTemp(0)" type="button" :class="{active:makeTempActive==0}">制冷</button>
              <button @click="dealMakeTemp(1)" type="button" :class="{active:makeTempActive==1}">制热</button>
            </div>
            <div class="right">
              <button @click="openClosePump(pumpSwitchText)" type="button" class="self-border self-btn"><span class="icon-switch"></span>{{pumpSwitchText}}</button>
            </div>
          </div>

        </div>
      </div>
      <div class="deviceEchart">
        <div class="selfTabBox">
          <ul class="self-tab-head">
            <li @click="tabToggle(i)" :class="['part',{active:i==tabActive}]" v-for="(v,i) in tabData" v-text="v.unit.length!=0?(v.title+'('+v.unit[0]+')'):v.title" :key="i"></li>
            <li class="extra">
              <div class="stateMsg">
                <span class="switch">阀门状态：<span class="text">正常</span></span>
                <span class="mode">夏</span>
              </div>
            </li>
          </ul>
          <div class="self-tab-body">
            <line-echarts4 v-for="(v,i) in tabData" :key="i" v-show="i==tabActive" :datas="v.datas" />

          </div>
        </div>
      </div>
    </div>
    <div class="threeDBox">
      <div class="btnBox">
        <div class="cascaderBox">
          <el-cascader
            expand-trigger="hover"
            :options="options"
            v-model="selectedOptions2"
            @change="handleChange">
          </el-cascader>
        </div>
      </div>
    </div>
    <Dialog wid = "3.64rem" hei = "2.16rem" ref = "dialog">
      <div class="dialog-in">
        <p class="p-text">是否确认{{this.parentToggle?'开启':'关闭'}}？</p>
        <div class="btnWrap">
          <button @click="sureControl" type="button">确定</button>
          <button @click="()=>{this.$refs.dialog.hide();this.$message('取消操作！');}" type="button">取消</button>
        </div>
      </div>
    </Dialog>
    <Dialog wid = "13.26rem" hei = "640" ref = "dialog2">
      <div class="dialog2-in">
        <div class="title">控制失败列表</div>
        <div class="padding" style="padding: 0 0.2rem">
          <Table @rowEnter="rowEnter" @rowLeave="rowLeave" @changePage="changePage" :table = "table"/>
        </div>
      </div>
    </Dialog>
    <Dialog wid = "13.26rem" hei = "640" ref = "dialog3">
      <div class="dialog3-in">
        <div class="title">批量控制</div>
        <div class="content">
          <div class="controlBtnBox no-select">
            <div v-if="showDevice.one.show" class="switchControl">
              <span class="text" v-text="showDevice.one.tit"><!--空调状态控制--></span>
              <button @click="switchControl(showDevice.one,0)" type="button" :class="{active:switchConVal==0}">开启</button>
              <button @click="switchControl(showDevice.one,1)" type="button" :class="{active:switchConVal==1}">关闭</button>
            </div>
            <div v-if="showDevice.two.show" class="modeControl222">
              <span class="text" v-text="showDevice.two.tit"><!--模式--></span>
              <button @click="modeControl(0)" type="button" :class="{active:modeConVal==0}">制冷</button>
              <button @click="modeControl(1)" type="button" :class="{active:modeConVal==1}">制热</button>
            </div>
            <div v-if="showDevice.three.show" class="tempControl">
              <span class="text" v-text="showDevice.three.tit"><!--温度--></span>
              <div class="inputBox">
                <el-input-number v-model="tempVal2" @change="tempHandleChange2" :min="1" :max="10" label="描述文字"></el-input-number>
                <span class="unit">℃</span>
              </div>
            </div>
          </div>
          <div class="collapseBox">
            <!--<loop-render v-if="showLoopRender" :loopRenderData="loopRenderData" />-->
            <el-scrollbar style="height:100%">
              <el-tree
                ref="hTree"
                accordion
                :data="loopRenderData"
                @check-change="getCheckedArr"
                show-checkbox
                node-key="id"
                :default-checked-keys="[5]"
                :props="defaultProps">
              </el-tree>
            </el-scrollbar>
          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
  import SelfSwitch from "../../../common/selfSwitch";

  import showOperate from "./showOperate";
  import SelfPopover3 from "./selfPopover3";
  import LoopRender from "./components/loopRender";
  import utils from "../../../../assets/js/utils";
  import Table from "../../../common/table";
  import LineEcharts4 from "../../../common/lineEcharts4";
  export default {
    components: {
      LineEcharts4,
      Table,
      LoopRender,
      SelfPopover3,
      SelfSwitch,

    },
    name: "airConditionerEnd",
    data() {
      return {
        showDevice:{
          one:{
            show:false,
            id:'',
            tit:'',
            unit:'',
            self_id:''
          },
          two:{
            show:false,
            id:'',
            tit:'',
            unit:'',
            self_id:''
          },
          three:{
            show:false,
            id:'',
            tit:'',
            unit:'',
            self_id:''
          }
        },
        deviceChecked:[],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        newNum:1,
        table:{
          showPagination:true,
          hei:540, //table高度  设置后有滚动条
          len:0, //总条数
          pageSize:20, //每页的条数 。默认为20
          page:1,  //当前页码
          data:[
            // {num:'01',device:'空调末端',position:'青羊区工业园区T区8栋9楼',time:'2018-08-21 14:53',index:0,mouseState:false},
            // {num:'02',device:'空调末端2',position:'青羊区工业园区T区8栋9楼2',time:'2018-08-21 14:54',index:1,mouseState:false},
          ],
          th:[
            {prop:'num',label:'编号',wid:128},
            {prop:'device',label:'设备',wid:170},
            {prop:'position',label:'位置',wid:266},
            {prop:'time',label:'失败时间',wid:598},
            {prop:'operate',
              label:'操作',
              operate: true,
              render: (h, param)=> {
                const btnss = {
                  item:param.row,
                  mouseState:param.row.mouseState
                };
                //console.log(h,param)
                return h(showOperate,{
                  props: { btnss:btnss},
                  on:{look:this.look,ignore:this.ignore}
                });
              }
            },

          ]
        },
        options: [
          {
            value: 'zhinan',
            label: '机房1',
            children: [{
              value: 'shejiyuanze',
              label: '机房11',
              children: [{
                value: 'yizhi',
                label: '机房111'
              }, {
                value: 'fankui',
                label: '机房112'
              }]
            }],
          }],
        selectedOptions2: [],
        parentToggle:false,
        tempVal:1,
        pumpSwitchText:'关闭',
        makeTempActive:'1',

        //批量控制
        tempVal2:1,
        switchConVal:1,//空调状态控制
        modeConVal:1,//模式控制，0：制冷，1：制热


        tabActive:0,
        tabData:[
          {
            id:1,
            title:'送风/回风温度',
            unit:['℃'],
            datas:{
              id:'hselfEchart4',
              style:{width:'6.43rem',height:171*100/728+'vh'},
              showLegends:true,
              list:[
                {
                  name:'送风温度',
                  data:[
                    {
                      "value": [
                        "2018-09-25 09:00",
                        4
                      ]
                    },
                    {
                      "value": [
                        "2018-09-25 09:30",
                        15
                      ]
                    }
                  ],
                },
                {
                  name:'回风温度',
                  data:[
                    {
                      "value": [
                        "2018-09-25 09:00",
                        12
                      ]
                    },
                    {
                      "value": [
                        "2018-09-25 09:30",
                        8
                      ]
                    }
                  ],
                }
              ]

            }
          },
          {
            id:2,
            title:'送风/回风湿度',
            unit:['%'],
            datas:{
              id:'hselfEchart5',
              style:{width:'6.43rem',height:171*100/728+'vh'},
              showLegends:true,
              list:[
                {
                  name:'送风湿度',
                  data:[
                    {
                      "value": [
                        "2018-09-25 09:00",
                        10
                      ]
                    },
                    {
                      "value": [
                        "2018-09-25 09:30",
                        5
                      ]
                    }
                  ],
                },
                {
                  name:'回风湿度',
                  data:[
                    {
                      "value": [
                        "2018-09-25 09:00",
                        12
                      ]
                    },
                    {
                      "value": [
                        "2018-09-25 09:30",
                        8
                      ]
                    }
                  ],
                }
              ]

            }
          },
          {
            id:2,
            title:'滤网压差',
            unit:['pa'],
            datas:{
              id:'hselfEchart6',
              style:{width:'6.43rem',height:171*100/728+'vh'},
              showLegends:true,
              list:[
                {
                  name:'滤网压差',
                  data:[
                    {
                      "value": [
                        "2018-09-25 09:00",
                        10
                      ]
                    },
                    {
                      "value": [
                        "2018-09-25 09:30",
                        5
                      ]
                    }
                  ],
                },
              ]

            }
          },
        ],
        loopRenderData:[],
        showLoopRender:false,

      }
    },
    methods: {
      getCheckedArr(a,b,c,d){
        // console.log(a,b,c,d)
        let tempArr = this.$refs.hTree.getCheckedKeys();
        tempArr.map((item,i)=>{
          if (item == undefined) {
             tempArr.splice(i,1);
          }
        })
        //console.log(this.$refs.hTree.getCheckedKeys())
        //console.log('新',tempArr)
        if (tempArr.length !== 0) {
          this.deviceChecked = tempArr;
        }else {
          this.deviceChecked = [];
        }
      },
      //获取控制失败列表
      getControlFail(sysID=this.$store.state.sysList[1].son_list[0].sys_menu_id,pagenumber=1,pagesize=20){
        let that = this;
        let config = {
          sys_menu_id:sysID,
          pagenumber:pagenumber,
          pagesize:pagesize,
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.get('/hvac_pc/pc/control/flase_record', config, headers).then(res => {
          let data = res.data;
          console.log('获取控制失败列表', config, res);
          if (data.code == 0) {
            let arr = [];
            this.table.len =data.paging;
            let data2 = data.data;
            data2.map((item,i)=>{
              let obj = {};
              let num = (i+1)+(this.table.page-1)*20;
              obj.num = num<10?'0'+num:num;
              obj.device = item.devicename;
              obj.position = item.floor;
              obj.time = item.time;
              obj.index = i;
              obj.mouseState = false;
              arr.push(obj);
            })


            this.table.data = arr;

          } else {

            this.$message(data.message);
          }
        }).catch(err=>{
          this.$message(err);
        })

      },
      //获取批量控制信息
      requestMostControl(self_id=1101,sysID=this.$store.state.sysList[1].son_list[0].sys_menu_id){
        let that = this;
        let config = {
          self_id:self_id,
          sys_menu_id:sysID,
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.get('/hvac_pc/pc/air/control/title', config, headers).then(res => {
          let data = res.data;
          console.log('获取批量控制信息', config, res);
          if (data.code == 0) {
            //题目啊
            let headTit = data.data.title;
            headTit.map((part,index)=>{
              switch (part.self_id) {
                case 11025:
                  this.showDevice.one.show = true;
                  this.showDevice.one.id = part.id;
                  this.showDevice.one.tit = part.title;
                  this.showDevice.one.self_id = part.self_id;
                  if (part.params != '') {
                    let obj = eval('('+part.params+')');
                    this.switchConVal = obj.type;
                  }
                  break;
                case 11021:
                  this.showDevice.three.show = true;
                  this.showDevice.three.id = part.id;
                  this.showDevice.three.tit = part.title;
                  this.showDevice.three.unit = part.unit;
                  this.showDevice.one.self_id = part.self_id;

                  //这里又怎么搞。。。文档和实际接口都没数据样例
                  break;
                case 11026:
                  //这里又怎么搞。。。UI图根本没什么风量控制
                  break;
              }
            })


            let floor = data.data.floor;
            let tempArr = [];
            //旧版
            /*floor.map((item,i)=>{
              let obj = {};
              obj.checked = false;
              obj.name = item.title;
              obj.cList = [];
              if (item.device.length !== 0){
                item.device.map((item2,i2)=>{
                  let obj2 = {};
                  obj2.checked = false;
                  obj2.name = item2.title;
                  obj.cList.push(obj2)
                })
              }
              tempArr.push(obj);
            })
            console.log(tempArr);
            this.loopRenderData = tempArr;
            this.showLoopRender = true;*/
            floor.map((item,i)=>{
              let obj = {};
              //obj.id = item.floor_id;
              obj.label = item.title;
              obj.children = [];
              this.deviceChecked = [];//清空数组
              if (item.device.length !== 0){
                item.device.map((item2,i2)=>{
                  let obj2 = {};
                  obj2.id = item2.id;
                  obj2.label = item2.title;
                  obj.children.push(obj2);
                  if (item2.state == 1){
                    this.deviceChecked.push(item2.id);
                  }
                })
              }
              tempArr.push(obj);
            })
            this.loopRenderData = tempArr;
          } else {

            this.$message(data.message);
          }
        }).catch(err=>{
          this.$message(err);
        })

      },
      //批量控制操作
      requestMostControlOperate(sysID=this.$store.state.sysList[1].sys_menu_id,category_id,nowvalue,floors,self_id){
        let that = this;
        let config = {
          sys_menu_id:sysID,
          category_id:category_id,
          nowvalue:nowvalue,
          floors:floors,
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.get('/hvac_pc/pc/air/control/floor', config, headers).then(res => {
          let data = res.data;
          console.log('批量控制操作', config, res);
          if (data.code == 0) {
            if (self_id === 11025){
              this.switchConVal = nowvalue;
            } else if (self_id === 11021) {
              console.log('温度修改成功',nowvalue);
            } else {
              console.log('暂定为未知错误')
            }
            this.$message('修改成功');
          } else {
            this.$message(data.message);
          }
        }).catch(err=>{
          this.$message(err);
        })

      },
      look(item){ //查看
        this.$message('查看什么嘛');
      },
      ignore(item){
        console.log('忽略',item)
        this.table.data.splice(item.index,1);//删除数组中的元素
        //遍历数组，重新定义索引index
        this.table.data.map((item,i)=>{
          item.index = i;
        })
      },
      rowEnter(item){
        // console.log('进',item)
        item.mouseState = true;
      },
      rowLeave(item){
        // console.log('出',item)
        item.mouseState = false;
      },
      //分页：切换页面
      changePage(val){
        this.getControlFail(this.$store.state.sysList[1].sys_menu_id,val)
      },
      handleChange(value) {
        console.log(value);
      },
      tempHandleChange(val) {
        console.log(val)
      },
      sureControl() {
        console.log(this.parentToggle)
        this.parentToggle = !this.parentToggle;
        this.$refs.dialog.hide();
      },

      openClosePump(text){

      },
      dealMakeTemp(val){
        if (val == 0){
          this.makeTempActive = 0
        } else if (val == 1){
          this.makeTempActive = 1
        }
      },
      //控制失败列表按钮事件
      showControlFail(){
        this.$refs.dialog2.show();
      },
      //批量控制按钮事件
      showControlMost(){
        this.$refs.dialog3.show();
      },
      tempHandleChange2(val) {
        this.requestMostControlOperate(this.$store.state.sysList[1].sys_menu_id,this.showDevice.three.id,val,this.deviceChecked.length!==0?this.deviceChecked.join(','):'',this.showDevice.three.self_id);
        console.log(val)
      },
      switchControl(item,val){
        this.requestMostControlOperate(this.$store.state.sysList[1].sys_menu_id,item.id,val,this.deviceChecked.length!==0?this.deviceChecked.join(','):'',item.self_id);

      },
      modeControl(val){
        this.modeConVal = val;
      },

      //选项卡切换
      tabToggle(index){
        this.tabActive = index;
      }

    },
    created() {
      this.$parent.$parent.$parent.$parent.$parent.msg = '一号机房当前模式：自动控制模式,预计在9:00开启，23:20关闭'

      this.getControlFail();
      this.requestMostControl();

    },
    mounted() {
      //this.$parent.$parent.$parent.$parent.$parent.isIf=true;
      //console.log($)

      let str = "{\"value\": [\"0\", \"1\"], \"showvalue\": [\"\\u5f00\\u542f\", \"\\u5173\\u95ed\"], \"type\": 0}";
      console.log('啦啦啦',eval('('+str+')'));
    },
  }
</script>

<style lang="less" type="text/less">
  @import '../../../../assets/css/common.css';
  @import '../../../../assets/css/comon';
  .airConditionerEnd{
    .el-cascader{
      height: 100%;
      line-height: 1;
    }
    .el-cascader .el-input, .el-cascader .el-input__inner{
      height: 100%;
    }
    .el-cascader__label{
      .vhLineH(32);
      color: #fff;
    }
    margin: 0 auto;
    width: 13.06rem;
    position: relative;

    .rtBtnBox{
      position: absolute;
      right: 0;
      .vhTop(-45);
      button{
        position: relative;
        &:last-of-type{
          margin-left: 0.12rem;
        }
        background-image: linear-gradient(0deg,
        #2772e3 0%,
        #4b94f9 100%);
        border-radius: 2px;

        font-family: PingFangSC-Medium;
        font-size: 0.14rem;
        .vh(32);
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
        padding-left: 0.22rem;
        padding-right: 0.22rem;
        border: 0;
        outline: none;
        cursor: pointer;
        .tip{
          position: absolute;
          .vhTop(5);
          right: 0.07rem;
          display: inline-block;
          width: 8px;
          height: 8px;
          background-color: #f75575;
          border-radius: 50%;

        }
      }
    }

    .deviceDetailBox{
      .vhMT(2);
      display: flex;
      justify-content: space-between;
      .deviceSet{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 6.43rem;
        .vh(205);
        background-color: transparent;
        box-shadow: 0px 4px 10px 0px
        rgba(74, 144, 226, 0.22),
        inset 1px 1px 2px 0px
        rgba(248, 253, 255, 0.15),
        inset 0px -1px 1px 0px
        #4a90e2;
        border-radius: 4px;
        .imgBox{
          margin-left: 0.1rem;
          width: 2.25rem;
          .vh(185);
          background-color: rgba(0, 0, 0, 0.1);
          border-radius: 1px;
          border: solid 1px rgba(45, 148, 240, 0.2);
          /*transform: scale(1.5,1.5);*/
          img{
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        .btnBox{
          margin-left: 0.1rem;
          height: 100%;
          position: relative;
          .head{
            display: flex;
            justify-content: flex-start;
            .vhMT(10);
            .left{
              width: 2.82rem;
              .vh(28);
              .gradientR(#1c3b82,transparent);

              font-family: PingFangSC-Regular;
              font-size: 0.14rem;
              font-weight: normal;
              font-stretch: normal;
              .vhLineH(28);
              padding-left: 0.1rem;
              letter-spacing: 1px;
              color: #ffa414;
            }

          }
          .title{
            .vhMT(15);
            font-family: PingFangSC-Regular;
            font-size: 0.14rem;
            font-weight: normal;
            font-stretch: normal;
            .vhLineH(20);
            letter-spacing: 0px;
            color: #f8fbff;
            text-align: center;
          }
          .inputBox{
            display: flex;
            align-items: center;
            .vhMT(8);
            width: 100%;
            .vh(42);
            background-color: #011f51;
            box-shadow: 0px 0px 2px 0px
            rgba(87, 113, 176, 0.15),
            inset 0px 0px 3px 0px
            rgba(0, 0, 0, 0.33);
            border: solid 1px #000c22;
            position: relative;
            .unit{
              position: absolute;
              left: 2.2rem;
              top: 0;
              height: 100%;
              display: flex;
              align-items: center;
              font-family: PingFangSC-Regular;
              font-size: 0.24rem;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0px;
              color: #fa6074;
              text-shadow: 4px 4px 3px rgba(245, 108, 108, 0.3);
            }

            .el-input-number{
              width: 100%;
              .vhLineH(42);
            }
            .el-input-number__decrease{
              display: flex;
              align-items: center;
              justify-content: center;
              width: 0.2rem;
              .vh(20);
              background-color: #255ba9;
              border-radius: 1px;
              border: 0;
              line-height: 1;
              color: #fff;
              .vhTop(8);
              left: 0.1rem;
            }
            .el-input-number .el-input__inner{
              border: 0 !important;
              font-family: PingFangSC-Regular;
              font-size: 0.24rem!important;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0px;
              color: #fa6074!important;
              text-shadow: 4px 4px 3px rgba(245, 108, 108, 0.3);
            }
            .el-input-number__increase{
              display: flex;
              align-items: center;
              justify-content: center;
              width: 0.2rem;
              .vh(20);
              background-color: #255ba9;
              border-radius: 1px;
              border: 0;
              line-height: 1;
              color: #fff;
              .vhTop(8);
              right: 0.1rem;
            }
            .el-input-number .el-input{
              display: flex;
              align-items: center;
              width: 100%!important;
            }
          }

          .controlBtn{
            width: 100%;
            display: flex;
            justify-content: flex-start;
            position: absolute;
            left: 0;
            .vhBottom(10);
            .left{
              button{
                &:last-of-type{
                  margin-left: 0.1rem;
                }
                &:active{
                  background-color: #3a84ee;
                }
                &.active{
                  background-color: #3a84ee;
                }
                cursor: pointer;
                width: 0.68rem;
                .vh(32);
                background-color: rgba(59, 137, 249, 0.2);
                border-radius: 4px;
                border: 0;
                outline: none;

                font-family: PingFangSC-Medium;
                font-size: 0.14rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 1;
                letter-spacing: 0px;
                color: #ffffff;
              }
            }
            .right{
              .self-btn{
                &:active{
                  /*background-color: #3a84ee;*/
                }
                position: absolute;
                right: 0;
                top: 0;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 0.94rem;
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
                outline: none;
                padding: 0;
                .icon-switch{
                  margin-right: 0.1rem;
                  display: inline-block;
                  width: 0.16rem;
                  height: 0.16rem;
                  background: url("../../../../assets/img/WaterSupplyAndDrainage/icon_switch.png") no-repeat center;
                  background-size: 100% 100%;
                }
              }
            }
          }
        }
      }
      .deviceEchart{
        width: 6.43rem;
        .vh(205);
        background-color: transparent;
        box-shadow: 0px 4px 10px 0px
        rgba(74, 144, 226, 0.22),
        inset 1px 1px 2px 0px
        rgba(248, 253, 255, 0.15),
        inset 0px -1px 1px 0px
        #4a90e2;
        border-radius: 4px;
        .selfTabBox{
          width: 100%;
          height: 100%;
          .self-tab-head{
            width: 100%;
            .vh(34);

            border-radius: 4px;
            display: flex;
            justify-content: flex-start;
            .part{
              display: flex;
              align-items: center;
              font-family: PingFangSC-Medium;
              font-size: 0.14rem;
              line-height: 1;
              background-color: rgba(0, 0, 0, 0.2);
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0px;
              color: #818181;
              padding: 0 0.2rem;
              cursor: pointer;
              &.active{
                background-color: transparent;
                color: #fff;
              }
            }
            .extra{
              flex: 1;
              background-color: rgba(0, 0, 0, 0.2);
              position: relative;
              div.stateMsg{
                height: 100%;
                position: absolute;
                right: 0.2rem;
                top: 0;
                display: flex;
                align-items: center;
                .switch{
                  margin-right: 0.2rem;
                  font-family: PingFangSC-Regular;
                  font-size: 0.14rem;
                  line-height: 1;
                  font-weight: normal;
                  font-stretch: normal;
                  letter-spacing: 0px;
                  color: #ffffff;
                  .text{
                    color: #4ae283;
                  }
                }
                .mode{
                  width: 21px;
                  height: 20px;
                  background-color: rgba(59, 137, 249, 0.2);
                  border-radius: 4px;
                  border: solid 1px #3b89f9;
                  display: flex;
                  align-items: center;
                  justify-content: center;

                  font-family: PingFangSC-Regular;
                  font-size: 0.1rem;
                  line-height: 1;
                  font-weight: normal;
                  font-stretch: normal;
                  letter-spacing: 0px;
                  color: #fa6074;
                }
              }
            }
          }
        }
      }
    }
    .threeDBox{
      .vhMT(20);
      width: 100%;
      min-height: 354px;
      /*.vh(459);*/
      max-height: 577px;
      background-color: transparent;
      box-shadow: 0px 4px 10px 0px
      rgba(74, 144, 226, 0.22),
      inset 1px 1px 2px 0px
      rgba(248, 253, 255, 0.15),
      inset 0px -1px 1px 0px
      #4a90e2;
      border-radius: 4px;
      position: relative;
      .btnBox{
        position: absolute;
        right: 0.2rem;
        .vhTop(20);
        display: flex;
        .cascaderBox{

          width: 1.15rem;
          .vh(32);
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 2px;
          overflow: hidden;
        }
      }
    }

    .dialog-in {
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;
      //background-color: yellow;
      .p-text {
        margin-top: 0.62rem;
        font-family: PingFangSC-Regular;
        font-size: 0.18rem;
        line-height: 1;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #b5d7ff;
        text-align: center;
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
    .dialog2-in{
      .tableBox .el-table__header{
        background-color: transparent !important;
      }
      width: 100%;
      height: 100%;
      .title{
        width: 100%;
        .vh(50);
        background-color: rgba(0, 0, 0, 0.2);
        padding-left: 0.2rem;

        font-family: PingFangSC-Regular;
        font-size: 0.16rem;
        font-weight: normal;
        font-stretch: normal;
        .vhLineH(50);
        letter-spacing: 0px;
        color: #ffffff;
      }
    }
    .dialog3-in{
      width: 100%;
      height: 100%;
      .title{
        width: 100%;
        .vh(50);
        background-color: rgba(0, 0, 0, 0.2);
        padding-left: 0.2rem;
        font-family: PingFangSC-Regular;
        font-size: 0.16rem;
        font-weight: normal;
        font-stretch: normal;
        .vhLineH(50);
        letter-spacing: 0px;
        color: #ffffff;
      }
      .content{
        padding: 0 0.15rem;
        .vhPT(17);
        .vhPT(17);
        .controlBtnBox{
          display: flex;
          justify-content: flex-start;
          &>div{
            display: flex;
            align-items: center;
            margin-left: 0.5rem;
            &:first-of-type{
              margin-left: 0;
            }
            &.tempControl{
              display: flex;
              justify-content: flex-start;
              .inputBox{
                position: relative;
                margin-left: 0.1rem;
                .el-input-number{
                  width: 1.38rem;
                  .vhLineH(30);
                }
                .el-input-number .el-input__inner{

                  padding: 0;
                  width: 0.68rem;
                  .vh(30);
                  background-color: #011f51!important;
                  box-shadow: 0px 0px 2px 0px
                  rgba(87, 113, 176, 0.15),
                  inset 0px 0px 3px 0px
                  rgba(0, 0, 0, 0.33)!important;
                  border-radius: 4px!important;
                  border: solid 1px #000c22!important;

                  font-family: PingFangSC-Regular;
                  font-size: 0.16rem!important;
                  font-weight: normal;
                  font-stretch: normal;
                  letter-spacing: 0px;
                  color: #fa6074!important;
                  text-shadow: 4px 4px 3px rgba(245, 108, 108, 0.3)!important;
                  text-align: left;
                  padding-left: 0.15rem;
                }
                .el-input-number .el-input{
                  display: flex;
                  justify-content: center;
                  width: 100% !important;
                }
                .el-input-number__decrease, .el-input-number__increase{
                  font-size: 0.2rem;
                  color: #fff;
                }
                .el-input-number__decrease{
                  width: 0.3rem;
                  .vh(30);
                  background-color: #3a84ee;
                  border-radius: 4px;
                  border: solid 1px #1989fa;
                }
                .el-input-number__increase{
                  width: 0.3rem;
                  .vh(30);
                  background-color: #3a84ee;
                  border-radius: 4px;
                  border: solid 1px #1989fa;
                }
                .unit{
                  display: flex;
                  align-items: center;
                  height: 100%;
                  position: absolute;
                  left: 0.77rem;
                  .vhTop(0);
                  font-family: PingFangSC-Regular;
                  font-size: 0.16rem;
                  line-height: 1;
                  font-weight: normal;
                  font-stretch: normal;
                  letter-spacing: 0px;
                  color: #fa6074;
                  text-shadow: 4px 4px 3px rgba(245, 108, 108, 0.3);
                }
              }

            }
            .text{
              font-family: PingFangSC-Regular;
              font-size: 0.14rem;
              line-height: 1;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0px;
              color: #b5d7ff;
            }
            button{
              margin-left: 0.1rem;
              width: 0.68rem;
              .vh(30);
              background-color: rgba(59, 137, 249, 0.2);
              border-radius: 4px;
              border: 0;
              outline: none;
              cursor: pointer;

              font-family: PingFangSC-Medium;
              font-size: 0.14rem;
              font-weight: normal;
              font-stretch: normal;
              line-height: 1;
              letter-spacing: 0px;
              color: #ffffff;
              &.active{
                background-color: #3a84ee;
              }
            }
          }
        }
        .collapseBox {
          .vh(500);
          .vhMT(20);
          .el-collapse {
            border-top: 1px solid #004b96;
            border-bottom: 1px solid #004b96;
          }
          .el-collapse-item__wrap {
            border-bottom: 0px solid #004b96;
          }
          .el-collapse-item__arrow {
            color: #004b96;
            .vhLineH(40);
          }
          .el-collapse-item__header {
            color: #b5d7ff;
            cursor: pointer;
            font-size: 0.14rem;
            font-weight: 500;
            -webkit-transition: border-bottom-color .3s;
            transition: border-bottom-color .3s;
            outline: 0;

            .vh(40);
            .vhLineH(40);
            background-color: rgba(0, 29, 71, 0.2);
            border-radius: 2px;

            border-bottom: solid 1px #004b96;
          }
          .el-collapse-item__content {
            font-family: PingFangSC-Regular;
            font-size: 0.14rem;
            font-weight: normal;
            font-stretch: normal;
            line-height: 1;
            letter-spacing: 0px;
            color: #b5d7ff;
            .vhPB(0);
          }
        }
      }
    }
  }
</style>
