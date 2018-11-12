<template>
  <div
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0.5)"
    element-loading-spinner="el-icon-loading"
    element-loading-text="拼命加载中"
    class="coldSourceStation">
    <div class="deviceLists">
      <div class="part" v-for="(item,i) in lists1" :key="i">
        <div class="img" v-html="item.self_id==1102?imgArr[0]:item.self_id==1103?imgArr[1]:item.self_id==1108?imgArr[2]:''">

        </div>
        <div class="progressBox">
          <self-progress2 tit="总" per="100%" :val="item.all" />
          <self-progress2 tit="开" :per="item.on/item.all*100+'%'" :val="item.on" />
          <self-progress2 tit="故" :per="item.break/item.all*100+'%'" :val="item.break" />
          <self-progress2 tit="未" :per="item.off/item.all*100+'%'" :val="item.off" />
        </div>
      </div>
      <div v-if="lists1.length===0" class="emptyText">
        没有数据
      </div>
    </div>
    <div class="deviceDetailBox" id="deviceDetailBox">
      <div class="deviceSet">
        <self-popover2 :device_id="tuliDeviceId" :devicePic="device_pic" />

        <el-scrollbar style="height:99%">
          <div class="controlBtnBox">
            <div class="btnItem" v-for="(v,i) in tuliBtnList" :key="'first'+i">
              <span class="tit">{{v.title}}</span>
              <div class="selBtnList">
                <button @click="tuliBtnClick(v.point_id,v2.id,i,i2)" :class="{active:v2.id==v.now_value}" type="button" v-for="(v2,i2) in v.btnList" v-text="v2.tit" :key="i2"></button>
              </div>
            </div>
            <div class="btnItem" v-for="(v2,i2) in tuliTempBtnList" :key="'second'+i2">
              <span class="tit">{{v2.title}}</span>
              <div class="inputBox">
                <div class="showState">
                  <p class="text">
                    <input type="text" v-model="v2.now_value" ref="tempInput" :readonly="!btnActive" oninput="value=value.replace(/[^\d]/g,'')" maxlength="2">
                    <span v-text="v2.unit"></span>
                  </p>
                  <i :class="['editBtn',{one:!btnActive},{two:btnActive}]" @click="changeEditState(v2.point_id,v2.now_value,i2)"></i>
                </div>
              </div>
            </div>
          </div>
        </el-scrollbar>
        <!--<div class="btnBox">
          <div class="title">冷冻水供水温度设置</div>
          <div class="inputBox">
            <div class="showState">
              <p class="text">
                <input type="text" v-model="tempVal" ref="tempInput" :readonly="!btnActive" oninput="if(value.length > 3)value = value.slice(0, 3)">
                <span>℃</span>
              </p>
              <i :class="['editBtn',{one:!btnActive},{two:btnActive}]" @click="changeEditState"></i>
            </div>
          </div>
          <div class="switchBox">
            <self-switch :togglee="parentToggle" />
          </div>
        </div>-->
      </div>
      <div class="deviceEchart">
        <i class="el-icon-circle-close colseBoxs" style="position: absolute;right: 0;top: 0" @click="hide"></i>
        <div class="selfTabBox">
          <ul class="self-tab-head">
            <li @click="tabToggle(i)" :class="['part',{active:i==tabActive}]" v-for="(v,i) in tabData" v-text="v.unit.length!=0?(v.title+'('+v.unit[0]+')'):v.title" :key="i"></li>
            <li class="extra"></li>
          </ul>
          <div class="self-tab-body">
            <line-echarts4 v-for="(v,i) in tabData" :key="i" v-show="i==tabActive" :datas="v.datas" />
            <div class="emptyText" v-if="tabData.length===0">没有数据</div>
          </div>
        </div>

      </div>
    </div>
    <div class="threeDBox" id="threeDBox">
      <div class="btnBox">
        <div class="cascaderBox">
          <el-cascader
            expand-trigger="hover"
            :options="options"
            v-model="selectedOptions2"
            @change="handleChange">
          </el-cascader>
        </div>
        <div class="btnClickBox">
          <button :disabled="!(yijianNowVal == 0 || yijianNowVal ==1)" type="button" @click="oneKeySwitch" v-text="yijianNowVal == 0 ? '一键关闭' : yijianNowVal == 1 ? '一键开启' : '未知错误'"></button>
        </div>
      </div>

      <iframe
        ref="iframe"
        name="myFrame"
        frameborder="0"
        width="100%"
        height="100%"
        :src="modelUrl">

      </iframe>


      <!--<button style="position: absolute;top: 100px;" type="button" @click="changeDeviceState('product-16f7b54a-1d6d-4450-a883-c034787d3203-body',1)">改变设备状态1</button>
      <button style="position: absolute;top: 130px;" type="button" @click="changeDeviceState('product-16f7b54a-1d6d-4450-a883-c034787d32ea-body', 2)">改变设备状态2</button>
      <button style="position: absolute;top: 160px;" type="button" @click="changeDeviceState('product-5af82546-e39b-4e8a-95cb-31997ebf1bc7-body', 0)">改变设备状态3</button>
      <button style="position: absolute;top: 190px;" type="button" @click="changeDeviceState('product-16f7b54a-1d6d-4450-a883-c034787d46aa-body', 3)">改变设备状态4</button>-->



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
    <Dialog wid = "3.64rem" hei = "2.16rem" ref = "dialog2">
      <div class="dialog-in">
        <p class="p-text">是否确认{{yijianNowVal == 0 ? '一键关闭' : yijianNowVal == 1 ? '一键开启' : '未知错误'}}？</p>
        <div class="btnWrap">
          <button @click="sureControl2" type="button">确定</button>
          <button @click="()=>{this.$refs.dialog2.hide();this.$message('取消操作！');}" type="button">取消</button>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
    import SelfProgress2 from "../../../common/selfProgress2";
    import SelfSwitch from "../../../common/selfSwitch";
    import SelfPopover2 from "./selfPopover2";
    import LineEcharts4 from "../../../common/lineEcharts4";
    import utils from "../../../../assets/js/utils";

    export default {
      components: {
        LineEcharts4,
        SelfPopover2,
        SelfSwitch,
        SelfProgress2,

      },
      name: "coldSourceStation",
      props:['sysId'],
      data() {
        return {
          device_pic:[],
          loading:false,
          imgArr:['<img src="/static/img/zhuji.png" alt="主机">','<img src="/static/img/shuibeng.png" alt="水泵">','<img src="/static/img/lengque.png" alt="冷却塔">'],
          tuliBtnList:[
            /*{
              "now_value": "0",
              "params": "{\"value\": [\"0\", \"1\"], \"showvalue\": [\"开启\", \"关闭\"], \"type\": 0}",
              "point_id": 566,
              "title": "主机启停",
              "unit": "",
              btnList:[
                {
                  id:0,
                  tit:'开启'
                },
                {
                  id:1,
                  tit:'关闭'
                }
              ]
            }*/
          ],
          tuliTempBtnList:[
            /*{
              "now_value": "11",
              "params": "",
              "point_id": 566,
              "title": "温度设置",
              "unit": "度",
            }*/
          ],
          tuliDeviceId:'',
          codes:'',
          lists1:[
            /*{
              id:1,
              all:99,
              on:66,
              break:10,
              off:4
            },
            {
              id:2,
              all:88,
              on:45,
              break:6,
              off:23
            },
            {
              id:3,
              all:81,
              on:70,
              break:1,
              off:10
            },*/
          ],
          options: [
            // {
            //   value: '1',
            //   label: '一号机房',
            //   children: [
            //     {
            //       value: '3',
            //       label: '一号机房的子',
            //     },
            //   ]
            // },
            // {
            //   value: '2',
            //   label: '二号机房',
            // }
          ],
          selectedOptions2: [],
          btnActive:false,
          parentToggle:false,

          tabData:[
            /*{
              id:1,
              title:'COP',
              unit:[],
              datas:{
                id:'selfEchart1',
                style:{width:'6.43rem',height:146*100/728+'vh'},
                showMarkL:true,
                markLineVal:5,
                list:[
                  {
                    name:'11',
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
                  }
                ]

              }
            },
            {
              id:2,
              title:'能耗',
              unit:['KW/h'],
              datas:{
                id:'selfEchart2',
                style:{width:'6.43rem',height:146*100/728+'vh'},
                showMarkL:true,
                markLineVal:7,
                list:[
                  {
                    name:'11',
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
                  }
                ]

              }
            },
            {
              id:2,
              title:'电流电压',
              unit:['A,V'],
              datas:{
                id:'selfEchart3',
                style:{width:'6.43rem',height:146*100/728+'vh'},
                showMarkL:true,
                markLineVal:7,
                list:[
                  {
                    name:'11',
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
                    name:'121',
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
            },*/
          ],
          tabActive:0,

          iframeWin:{},
          deviceStates:[
            /*{
              tit:'状态',
              val:'开启',
            },
            {
              tit:'实时cop',
              val:3.6,
            },
            {
              tit:'负载率',
              val:'77%',
            },
            {
              tit:'电流',
              val:'40A',
            },
            {
              tit:'电压',
              val:'220V',
            },
            {
              tit:'冷凝压力',
              val:'10.22MPA',
            }*/
          ],

          showSingleDevice:false,
          modelUrl:'',
          object_device:[],
          yijianNowVal:undefined,
          yijianPointId:undefined,
          tempObjName:'',
          tempObjName2:'',

        }
      },
      methods: {
        addMessageEvent(){
          window.addEventListener('message', this.handleMessage);
        },
        removeMessageEvent(){
          //alert('触发1')
          window.removeEventListener('message',this.handleMessage);
        },
        tuliBtnClick(point_id,id,i1,i2){
          this.requestOneKeyControl(point_id,id);
          this.tuliBtnList[i1].now_value = id;
        },
        hide(){
          if (this.showSingleDevice) {
            Velocity($('#threeDBox'), {
              height: '63.05vh'
            }, {
              duration: 300
            });
            Velocity($('#deviceDetailBox'), {
              height: 0,
              marginTop: 0,
            }, {
              duration: 300
            });
          }
          this.showSingleDevice = false;
        },
        /**** 外部vue向iframe内部传数据 ****/
        //先通知模型有哪些部分需响应
        postInitJson(){
          //这部分目前用不着，先留着
          // 外部vue向iframe内部传数据
          //alert('我发了哦')
          this.iframeWin.postMessage({
            cmd: 'initJsonObj',
            params: {

              jsonObj:{
                "product-16f7b54a-1d6d-4450-a883-c034787d3203-body": {//2#主机
                  "errname": null,
                  "objs": "deviceWaterhost1",
                  "runname": null
                },
                "product-16f7b54a-1d6d-4450-a883-c034787d32ea-body": {//1#主机,
                  "errname": null,
                  "objs": "deviceWaterhost2",
                  "runname": null
                },
                "product-5af82546-e39b-4e8a-95cb-31997ebf1bc7-body": {//1#冷却泵
                  "errname": null,
                },
                "product-16f7b54a-1d6d-4450-a883-c034787d46aa-body": {//2#冷却泵
                  "errname": null
                }
              },
              messageobj : null

            }
          }, '*')
        },
        //将请求到的设备详细信息传给模型
        //参数，请求到的数据@data,格式data:[{tit:'状态',val:'开启',}]
        postDeviceData(json){
          this.iframeWin.postMessage({
            cmd: 'sendDeviceInfoJson',
            params: {
              deviceInfoJson:json
            }
          }, '*')
        },
        //改变模型中的设备状态(暂定为单个设备状态改变）
        //参数，请求到的数据@name:objName,@state:0为停止，1为运行，2为故障，3为告警
        changeDeviceState(name,state){
          this.iframeWin.postMessage({
            cmd: 'changeDeviceState',
            params: {
              name:name,
              state:state
            }
          }, '*')
        },
        /**** 根据上面制定的结构来解析iframe内部发回来的数据 ****/
        handleMessage (event) {
          const data = event.data;
          switch (data.cmd) {
            case 'reFoundObjName':
              let objName = data.params.objName;
              if (this.tempObjName != objName) {
                this.tempObjName = objName;
                this.requestOneDeviceInfo(this.tempObjName);
              }else {
                //alert('你废了哦？')
              }
                //这里请求后台获得设备具体数据，又发回去
              this.postDeviceData(this.deviceStates);
              break;
            case 'reDeviceClick':
              //点击模型响应事件
              //console.log('点击次数',data.params.clickObjName);
              setTimeout(()=>{
                this.getEchartsData(data.params.clickObjName);
                this.object_device.some((item,i)=>{
                  if (item.object_id === data.params.clickObjName) {
                    this.tuliDeviceId = item.device_id;
                  }
                })
                if (!this.showSingleDevice) {
                  Velocity($('#deviceDetailBox'), {
                    height: '24.72vh',
                    marginTop: '2.74vh',
                  }, {
                    duration: 300
                  });
                  Velocity($('#threeDBox'), {
                    height: '36.95vh'
                  }, {
                    duration: 300
                  });
                }
                this.showSingleDevice = true;
              },200)


              break;
            case 'cancelDevice':
              console.log(data.params.cancelObject_id)

              break;
          }
        },
        //获取首页三个设备数据
        getThreeDevice(sysID,floor_id){
          let that = this;
          let config = {
            sys_menu_id:sysID,
            floor_id:floor_id
          }
          let headers = {
            //'Content-Type': 'multipart/form-data'
          }
          this.$http.get('/hvac_pc/pc/index', config, headers).then(res => {
            let data = res.data;
            console.log('首页三个设备数据', config, res);
            if (data.code == 0) {
              let arr = [];
              let data2 = data.data.data;

              let yijian = data.data.yijian;
              this.yijianNowVal = yijian.nowvalue;
              this.yijianPointId = yijian.point_id;

              data2.map((item, i) => {
                let obj = {};
                obj.id = item.self_id;
                obj.all = item.count;
                obj.on = item.kai;
                obj.break = item.gu;
                obj.off = item.guan;
                obj.self_id = item.self_id;
                arr.push(obj);
              });
              this.lists1 = arr;

            } else {

              this.$message(data.message);
            }
          }).catch(err=>{
            this.$message(err);
          })
        },
        //获取单个设备echarts数据
        getEchartsData(object_id){
          this.loading = true;
          let that = this;
          let config = {
            object_id:object_id
          }
          let headers = {
            //'Content-Type': 'multipart/form-data'
          }
          this.$http.get('/hvac_pc/pc/index/device', config, headers).then(res => {
            let data = res.data;
            console.log('获取echarts数据', config, res);
            if (data.code == 0) {
              //报表
              let commtable = data.data.commtable;
              let tempArr1 = [];
              commtable.map((item,i)=>{
                let obj1 = {};
                obj1.id = item.point_id;
                obj1.title = item.title;
                obj1.unit = [];
                obj1.unit.push(item.unit);
                obj1.datas = {};
                obj1.datas.id = 'selfEchart'+item.point_id;
                obj1.datas.style = {width:'6.43rem',height:146*100/728+'vh'};
                obj1.datas.showMarkL = true;
                obj1.datas.markLineVal = item.standard;
                obj1.datas.list = [];
                let obj2 = {};
                obj2.name = item.title;
                obj2.data = item.data;
                obj1.datas.list.push(obj2);
                tempArr1.push(obj1);
              })

              let energytable = data.data.energytable;
              energytable.map((item0,i0)=>{
                let obj0 = {};
                obj0.id = item0.point_id;
                obj0.title = item0.title;
                obj0.unit = [];
                obj0.unit.push(item0.unit);
                obj0.datas = {};
                obj0.datas.id = 'selfEchart'+item0.point_id;
                obj0.datas.style = {width:'6.43rem',height:146*100/728+'vh'};
                obj0.datas.showMarkL = true;
                obj0.datas.markLineVal = item0.standard;
                obj0.datas.list = [];
                let obj00 = {};
                obj00.name = item0.title;
                obj00.data = item0.data;
                obj0.datas.list.push(obj00);
                tempArr1.push(obj0);
              })
              this.tabData = tempArr1;
              //设备
              let control = data.data.control;
              //console.log('通知设备',control)

              let tempArr2 = [];
              let tempArr20 = [];
              control.map((item2,i2)=>{
                let params = item2.params;
                if (params !== '') {
                  let obj22 = {};
                  obj22.now_value = item2.now_value;
                  obj22.title = item2.title;
                  obj22.unit = item2.unit;
                  obj22.point_id = item2.point_id;

                  let paramsObj = eval('(' + params + ')');
                  obj22.btnList = [];
                  paramsObj.showvalue.map((item3, i3) => {
                    let obj23 = {};
                    obj23.id = paramsObj.value[i3];
                    obj23.tit = item3;
                    obj22.btnList.push(obj23);
                  })
                  tempArr2.push(obj22);
                  //console.log('hahaha',eval('('+params+')'))
                }else {
                  let obj23 = {};
                  obj23.now_value = item2.now_value;
                  obj23.title = item2.title;
                  obj23.unit = item2.unit;
                  obj23.point_id = item2.point_id;
                  obj23.params = item2.params;
                  tempArr20.push(obj23);
                }
              })
              this.tuliBtnList = tempArr2;
              this.tuliTempBtnList = tempArr20;
              let device_info = data.data.device_info;
              let device_pic = data.data.device_pic;

              let tempArr3 = [];
              device_pic.map((item3,i3)=>{

                let obj33 = {};
                obj33.category_func_id = item3.category_func_id;
                obj33.codes = item3.codes;
                obj33.device_pic_2d_id = item3.device_pic_2d_id;
                obj33.id = item3.id;
                obj33.title = item3.title;
                obj33.type = item3.type;
                obj33.update_date = item3.update_date;
                if(item3.type == device_info.now_state){
                  obj33.show = true;
                } else {
                  obj33.show = false;
                }
                tempArr3.push(obj33);
              })
              this.device_pic = tempArr3;



              this.loading = false;

            } else {
              this.loading = false;
              this.$message(data.message);
            }
          }).catch(err=>{
            this.loading = false;
            this.$message(err);
          })
        },
        //获取机房3d模型
        get3DFloor(sysID=this.$store.state.sysList[1].son_list[0].sys_menu_id){
          let that = this;
          let config = {
            sys_menu_id:sysID,
          }
          let headers = {
            //'Content-Type': 'multipart/form-data'
          }
          this.$http.get('/hvac_pc/pc/floor', config, headers).then(res => {
            let data = res.data;
            console.log('获取机房3d模型', config, res);
            if (data.code == 0) {
              if (this.options.length ===0) {
                let floor_id = data.data[0].floor_id;
                this.$store.state.airFloorId = floor_id;
                this.getThreeDevice(sysID, floor_id);
                //机房列表
                let floorList = data.data;
                let tempArr = [];
                floorList.map((item, i) => {
                  let obj = {};
                  obj.value = item.floor_id;
                  obj.label = item.title;
                  if (item.son.length !== 0) {
                    obj.children = [];
                    item.son.map((item2, i2) => {
                      let obj2 = {};
                      obj2.value = item2.floor_id;
                      obj2.label = item2.title;
                      if (item2.son.length !== 0) {
                        obj2.children = [];
                        item2.son.map((item3, i3) => {
                          let obj3 = {};
                          obj3.value = item3.floor_id;
                          obj3.label = item3.title;
                          obj2.children.push(obj3)
                        })
                      }
                      obj.children.push(obj2)
                    })
                  }
                  tempArr.push(obj)
                })
                this.options = tempArr;
                this.selectedOptions2 = [floor_id];
                //3d地址和设备状态
                this.modelUrl = data.data[0].object_3d;
                let object_device = data.data[0].object_device;
                this.object_device = object_device;
                setTimeout(() => {   //没有监测到模型是否加载完毕，只能用延时了
                  object_device.map((item, i) => {
                    this.changeDeviceState(item.object_id, item.state)
                  })
                }, 1000)
              }else {

                this.options.some((item11,i11)=>{
                  if (this.$store.state.airFloorId === item11.value){
                    this.getThreeDevice(sysID, this.$store.state.airFloorId);

                    //3d地址和设备状态
                    this.modelUrl = data.data[i11].object_3d;
                    let object_device = data.data[i11].object_device;
                    this.object_device = object_device;
                    setTimeout(() => {   //没有监测到模型是否加载完毕，只能用延时了
                      object_device.map((item, i) => {
                        this.changeDeviceState(item.object_id, item.state)
                      })
                    }, 3000)
                  }
                })
              }


            } else {

              this.$message(data.message);
            }
          }).catch(err=>{
            this.$message(err);
          })
        },
        //一键启停的开关
        requestOneKeyControl(point_id,nowVal){
          let that = this;
          let config = {
            point_id:point_id,
            now_value:nowVal
          }
          let headers = {
            //'Content-Type': 'multipart/form-data'
          }
          this.$http.get('/realtime_pc/pc/control', config, headers).then(res => {
            let data = res.data;
            console.log('点位设备控制', config, res);
            if (data.code == 0) {
              this.$message(data.message);


            } else {
              this.$message(data.message);
            }
          }).catch(err=>{
            this.$message(err);
          })
        },
        //获取模型中单个设备状态信息
        requestOneDeviceInfo(object_id){
          let that = this;
          let config = {
            object_id:object_id
          }
          let headers = {
            //'Content-Type': 'multipart/form-data'
          }
          if (object_id != 'product-50a37d21-4ee5-4d74-a2cb-3c99354bb804-body_1_0') { //排除这个无用设备，听说后端绑机房用
            this.$http.get('/hvac_pc/pc/index/device/point', config, headers).then(res => {
              let data = res.data;
              console.log('模型中单设备状态信息', config, res);
              if (data.code == 0) {
                let dataArr = data.data;
                let tempArr = [];
                dataArr.map((item,i)=>{
                  let obj = {};
                  obj.tit = item.title;
                  if (item.params !== ''){
                    let paramsObj = eval('('+item.params+')');
                    obj.val = paramsObj.showvalue[parseInt(item.nowvalue)]
                  } else {
                    obj.val = item.nowvalue+item.unit;
                  }
                  tempArr.push(obj)
                })
                this.deviceStates = tempArr;
              } else {
                this.$message(data.message);
                this.deviceStates = [];
              }
            })
          }
        },
        handleChange(value) {
          console.log(value);
          //console.log(this.selectedOptions2)
          this.getThreeDevice(this.$store.state.sysList[1].son_list[0].sys_menu_id,value[0]);
          this.$store.state.airFloorId = value[0];
        },
        tempHandleChange() {
          this.$refs.dialog.show();
        },
        changeEditState(point_id,val,i){
          this.btnActive = !this.btnActive;
          if (this.btnActive) {
            this.$refs.tempInput[i].focus();
          } else {
            this.$refs.tempInput[i].blur();
            this.requestOneKeyControl(point_id,val)
          }
        },
        sureControl() {
          console.log(this.parentToggle)
          this.parentToggle = !this.parentToggle;
          this.$refs.dialog.hide();
        },
        sureControl2() {
          this.requestOneKeyControl(this.yijianPointId,this.yijianNowVal == 0?1:0);
          this.yijianNowVal = this.yijianNowVal == 0?1:0;
          this.$refs.dialog2.hide();
        },
        oneKeySwitch(){
          this.$refs.dialog2.show();
        },

        //选项卡切换
        tabToggle(index){
          this.tabActive = index;
        }

      },
      created() {


        this.get3DFloor();


        // //console.log('系统列表',this.$store.state.sysList)
        //
        // let tempObj = this.$store.state.sysList[1];
        // console.log(tempObj)
        // /*for (var i in tempObj) {
        //   console.log(i,":",tempObj[i]);
        // }*/




      },
      mounted() {
        window.removeEventListener('message',this.handleMessage,false);
        // 在外部vue的window上添加postMessage的监听，并且绑定处理函数handleMessage
        window.addEventListener('message', this.handleMessage,false);
        this.iframeWin = this.$refs.iframe.contentWindow



        /*// 这里就拿到了iframe的对象
        console.log(this.$refs.iframe)
        // 这里就拿到了iframe的window对象
        console.log(this.$refs.iframe.contentWindow)*/

      },
      /*beforeDestroy(){
        alert('出发')
      },*/
      destroyed(){
        window.removeEventListener('message',this.handleMessage,false);
      }
    }
</script>

<style lang="less" type="text/less">
  @import '../../../../assets/css/common.css';
  @import '../../../../assets/css/comon';
  .coldSourceStation{
    .tabBoxs{
      padding-top: 0;
    }
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
    .vh(579);
    .emptyText{
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .deviceLists{
      .vhMT(2);
      width: 100%;
      .vh(100);
      background-color: transparent;
      box-shadow: 0px 4px 10px 0px
      rgba(74, 144, 226, 0.22),
      inset 1px 1px 2px 0px
      rgba(248, 253, 255, 0.15),
      inset 0px -1px 1px 0px
      #4a90e2;
      border-radius: 4px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .part{
        display: flex;
        flex: 1;
        .img{
          width: 1.61rem;
          height:1rem;
          display: flex;
          justify-content: center;
          align-items: center;
          /*box-shadow: 0px 2px 0.3rem 0px*/
          /*rgba(0, 0, 0, 0.66);*/
          img{
            display: block;
            width: 1.05rem;
            height: 0.8rem;
          }
        }
        .progressBox{
          width: 2.63rem;
          display: flex;
          align-content: center;
          flex-wrap: wrap;
        }
      }

    }
    .deviceDetailBox{
      height: 0;
      overflow: hidden;
      .vhMT(0);
      display: flex;
      justify-content: space-between;
      .deviceSet{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 6.43rem;
        .vh(180);
        background-color: transparent;
        box-shadow: 0px 4px 10px 0px
        rgba(74, 144, 226, 0.22),
        inset 1px 1px 2px 0px
        rgba(248, 253, 255, 0.15),
        inset 0px -1px 1px 0px
        #4a90e2;
        border-radius: 4px;
        .controlBtnBox{
          width: 3.6rem;
          padding: 0 0.2rem 0 0.15rem;
          .vhPB(10);
          .btnItem{
            .vhMT(11);
            display: flex;
            justify-content: space-between;
            align-items: center;
            .selBtnList{
              margin-left: 0.15rem;
              button{
                width: 0.5rem;
                .vh(32);
                background-color: rgba(59, 137, 249, 0.2);
                outline: none;
                border: 0;
                border-radius: 4px;
                color: #fff;
                margin-left: 0.1rem;
                cursor: pointer;
                &.active{
                  background-color: #3a89f9;
                }
                &:first-of-type{
                  margin-left: 0;
                }
              }
            }
          }

          .inputBox{
            display: flex;
            align-items: center;
            width: 1.1rem;
            .vh(32);
            background-color: #011f51;
            box-shadow: 0px 0px 2px 0px
            rgba(87, 113, 176, 0.15),
            inset 0px 0px 3px 0px
            rgba(0, 0, 0, 0.33);
            border: solid 1px #000c22;
            .showState{
              position: relative;
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              .text{
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                input{
                  width: 0.35rem;
                  border: 0;
                  outline: none;
                  background-color: transparent;

                  font-family: PingFangSC-Regular;
                  font-weight: normal;
                  font-stretch: normal;
                  letter-spacing: 0px;
                  color: #fa6074;
                  text-shadow: 2px 2px 4px rgba(245, 108, 108, 0.6);
                  text-align: center;
                }
                span{
                  font-family: PingFangSC-Regular;
                  font-weight: normal;
                  font-stretch: normal;
                  letter-spacing: 0px;
                  color: #fa6074;
                  text-shadow: 2px 2px 4px rgba(245, 108, 108, 0.6);
                  text-align: center;
                }
              }
              .editBtn{
                display: inline-block;


                position: absolute;
                right: 0.06rem;
                .vhTop(8);
                width: 0.15rem;
                height: 0.15rem;
                color: #b5d7ff;
                cursor: pointer;
                &.one{
                  background: url("../../../../assets/img/airConditioner/icon_edit.png") no-repeat center;
                  background-size: 100% 100%;
                }
                &.two{
                  background: url("../../../../assets/img/airConditioner/icon_save.png") no-repeat center;
                  background-size: 100% 100%;
                }
              }
            }
          }
        }
        /*.btnBox{
          height: 100%;
          .title{
            .vhMT(20);
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
            width: 2.92rem;
            .vh(42);
            background-color: #011f51;
            box-shadow: 0px 0px 2px 0px
            rgba(87, 113, 176, 0.15),
            inset 0px 0px 3px 0px
            rgba(0, 0, 0, 0.33);
            border: solid 1px #000c22;
            .showState{
              position: relative;
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              .text{
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                input{
                  width: 0.45rem;
                  border: 0;
                  outline: none;
                  background-color: transparent;

                  .vhLineH(33);
                  font-family: PingFangSC-Regular;
                  font-size: 0.24rem;
                  font-weight: normal;
                  font-stretch: normal;
                  letter-spacing: 0px;
                  color: #fa6074;
                  text-shadow: 2px 2px 4px rgba(245, 108, 108, 0.6);
                  text-align: center;
                }
                span{
                  .vhLineH(33);
                  font-family: PingFangSC-Regular;
                  font-size: 0.24rem;
                  font-weight: normal;
                  font-stretch: normal;
                  letter-spacing: 0px;
                  color: #fa6074;
                  text-shadow: 2px 2px 4px rgba(245, 108, 108, 0.6);
                  text-align: center;
                }
              }
              .editBtn{
                display: inline-block;


                position: absolute;
                right: 0.11rem;
                .vhTop(11);
                width: 0.2rem;
                height: 0.2rem;
                font-size: 0.2rem;
                color: #b5d7ff;
                cursor: pointer;
                &.one{
                  background: url("../../../../assets/img/airConditioner/icon_edit.png") no-repeat center;
                  background-size: 100% 100%;
                }
                &.two{
                  background: url("../../../../assets/img/airConditioner/icon_save.png") no-repeat center;
                  background-size: 100% 100%;
                }
              }
            }
          }
        }*/
      }
      .deviceEchart{
        position: relative;
        width: 6.43rem;
        .vh(180);
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
              text-align: center;
              &.active{
                background-color: transparent;
                color: #fff;
              }
            }
            .extra{
              flex: 1;
              background-color: rgba(0, 0, 0, 0.2);
            }
          }
          .self-tab-body{
            width: 100%;
            .vh(146);
          }
        }

      }
    }
    .threeDBox{
      .vhMT(20);
      width: 100%;
      .vh(459);
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
        .btnClickBox{
          margin-left: 0.2rem;
          button{
            cursor: pointer;
            width: 1rem;
            .vh(32);
            .gradientR(#4b94f9,#2772e3);
            border-radius: 2px;

            border:0;
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
  }
</style>
