<!--
    变配电系统 回路状态
    made by 胡永福
    start in 2018-9-45
-->
<template>
  <div
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0.5)"
    element-loading-spinner="el-icon-loading"
    element-loading-text="拼命加载中"
    class="envirState">
    <div class="tRBrnBoxWrap">
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
      <div v-show="self_id===1207" class="tRBrnBox">
        <el-select @change="selChange3" v-model="value3" placeholder="请选择">
          <el-option
            v-for="item in options3"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="big" v-show="big">
      <div class="self-box">
        <div class="head">变配电室环境</div>
        <div class="body">
          <div class="nowValBox">
            <div class="wrap" v-for="(v,i) in environmentLists" :key="i">
              <div class="part">
                <p class="name" v-text="'当前'+v.title"></p>
                <p class="val" v-text="v.now_value+v.unit"></p>
              </div>
              <Lines v-if="(i+1)!=environmentLists.length" :hei="70" :top="30"/>
            </div>
          </div>
          <div class="toggleBtnBox">
            <button v-for="(v,i) in environmentLists" type="button" :class="['self-btn',{active:btnActID==v.category_id}]" v-text="'环境'+v.title" :key="i" @click="btnClick(v.category_id)"></button>
          </div>
          <div class="echartsBox">
            <line-echarts33 v-if="btnActID==v.category_id" v-for="(v,i) in environmentLists" :id="'eeSmall'+v.category_id" :title="v.title" :unit="v.unit" :data="v.table" :key="i" :wid="'13.06rem'" :hei="'48.07vh'" />
          </div>
        </div>
      </div>
    </div>
    <div class="small" v-show="small">
      <div class="top">
        <div class="self-box">
          <div class="head">变配电室环境</div>
          <div class="body">
            <div class="nowValBox">
              <div class="wrap" v-for="(v,i) in environmentLists" :key="i">
                <div class="part">
                  <p class="name" v-text="'当前'+v.title"></p>
                  <p class="val" v-text="v.now_value+v.unit"></p>
                </div>
                <Lines v-if="(i+1)!=environmentLists.length" :hei="70" :top="30"/>
              </div>
            </div>
            <div class="toggleBtnBox">
              <button v-for="(v,i) in environmentLists" type="button" :class="['self-btn',{active:btnActID==v.category_id}]" v-text="'环境'+v.title" :key="i" @click="btnClick(v.category_id)"></button>
            </div>
            <div class="echartsBox">
              <line-echarts33 v-if="btnActID==v.category_id" v-for="(v,i) in environmentLists" :id="'ee'+v.category_id" :title="v.title" :unit="v.unit" :data="v.table" :key="i" :wid="'6.43rem'" :hei="'24.03vh'" />
            </div>
          </div>
        </div>
        <div class="self-box">
          <div class="head">变压器情况</div>
          <div class="body">
            <div class="box2Wrap">
              <div class="nowValBox2">
                <div class="wrap" v-for="(v,i) in transformerLists" :key="i">
                  <div class="part">
                    <p class="name" v-text="(i+1)>-1?'变压器当前温度':'占位'" :style="{opacity:(i+1)<-1?1:0}"></p>
                    <p class="val"><span class="text" v-text="v.title"></span><span v-text="v.val+v.unit"></span></p>
                  </div>
                  <Lines v-if="(i+1)!=transformerLists.length" :hei="70" :top="30"/>
                </div>
                <div class="tit">变压器当前温度</div>
              </div>
              <div class="nowValBox3">
                <div class="part">
                  <p class="name">当前负载率</p>
                  <p class="val" v-text="nowLoadFactor"></p>
                </div>
              </div>
            </div>
            <div class="toggleBtnBox">
              <button v-for="(v,i) in btnLists2" type="button" :class="['self-btn',{active:btnActID2==v.id}]" v-text="v.name" :key="i" @click="btnClick2(v.id)"></button>
            </div>
            <div class="echartsBox">
              <line-echarts3 v-if="lineEcharts2.list.length!==0 && btnActID2==1" :datas="lineEcharts2" ref="lineEchart2" :key="'2'" />
              <line-echarts3 v-if="lineEcharts3.list.length!==0 && btnActID2==2" :datas="lineEcharts3" ref="lineEchart3" :key="'3'" />
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="self-box2">
          <div class="head">变压器负载率统计</div>
          <div class="body">
            <div class="left">
              <self-progress :tit="v.title" :per="v.per" bgC="#3983ed" :time="v.value" v-for="(v,i) in leftLoadLists" :key="i" />
            </div>
            <div class="right">
              <self-progress :tit="v.title" :per="v.per" bgC="#fac376" :time="v.value" v-for="(v,i) in rightLoadLists" :key="i" />
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

  import utils from "../../../../assets/js/utils.js";
  import SelfProgress from "../../../../components/common/selfProgress";

  import LineEcharts33 from "./lineEcharts33";
  import LineEcharts3 from "../../../common/lineEcharts3";
  export default {
    components: {
      LineEcharts3,
      LineEcharts33,
      SelfProgress,


    },
    name: "envirState",
    data() {
      return {
        big:true,
        small:false,
        self_id:1206,
        loading:false,
        deviceLists:[
          /*{
            "device_list": [
              {
                "id": 9,
                "title": "变压器3"
              },
              {
                "id": 10,
                "title": "变压器4"
              },
              {
                "id": 4332,
                "title": "1号变压器"
              },
              {
                "id": 4333,
                "title": "2号变压器"
              }
            ],
            "id": 3,
            "title": "配电房"
          }*/
        ],

        options: [
          {
            label:'高压侧',
            value:1206
          },
          {
            label:'低压侧',
            value:1207
          }
        ],
        value: 1206,

        options2: [],
        value2: '',
        options3: [],
        value3: '',

        environmentLists:[],

        nowLoadFactor:'',
        transformerLists:[],

        btnActID:'',

        btnActID2:'',
        btnLists2:[
          /*{id:'1',name:'变压器负载率'},
          {id:'2',name:'变压器温度'},*/
        ],

        //变压器负载率
        lineEcharts2 :{
          id:'Echart2',
          unit:'%',
          showMarkL:false,
          markLineVal:0,
          showLegends:false,
          style:{width:'6.43rem',height:175*100/728+'vh'},
          list:[
            {
              name:'',
              data:[],
            },
          ]
        },
        //变压器温度
        lineEcharts3 :{
          id:'Echart3',
          unit:'℃',
          showMarkL:false,
          markLineVal:0,
          showLegends:true,
          style:{width:'6.43rem',height:175*100/728+'vh'},
          list:[
            {
              name:'',
              data:[],
            },
            {
              name:'',
              data:[],
            },
            {
              name:'',
              data:[],
            },
          ]
        },
        //负载率时间
        leftLoadLists:[
          // {id:1,title:'负载率超过95%',value:0,per:'0'},
        ],
        rightLoadLists:[
          // {id:2,title:'负载率低于50%',value:0,per:'0'},
        ],
      }
    },
    methods: {
      //获取变配电室环境设备列表
      getDeviceLists(self_id){
        this.options2 = [];
        this.options3 = [];
        this.deviceLists = [];
        let that = this;
        let config = {
          'sys_menu_id':this.$store.state.sysList[3].sys_menu_id,
          'self_id':self_id
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.get('power_pc/pc/floor/device', config, headers).then(res => {
          let data = res.data;
          console.log('变配电室环境设备列表', config, res);
          if(data.code==0){
            let datas = data.data;
            this.deviceLists = datas;
            let tempArr = [];
            datas.map((item,i)=>{
              if (i===0){
                this.value2 = item.id;
                this.getEnvironmentData(item.id);
                this.selChange2(item.id);
              }
              let obj = {};
              obj.label = item.title;
              obj.value = item.id;
              tempArr.push(obj);
            })
            this.options2 = tempArr;
          }else{
            this.$message(data.message);
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      //获取变配电室环境
      getEnvironmentData(floor_id){
        this.loading = true;
        let that = this;
        let config = {
          'sys_menu_id':this.$store.state.sysList[3].sys_menu_id,
          'floor_id':floor_id
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.get('power_pc/pc/floor/info_table', config, headers).then(res => {
          let data = res.data;
          console.log('变配电室环境', config, res);
          if(data.code==0){
            this.btnActID = data.data[0].category_id;
            this.environmentLists = data.data;
            this.loading = false;
          }else{
            this.$message(data.message);
            this.loading = false;
          }
        }).catch(err=>{
          console.log(err);
          this.loading = false;
        })
      },
      //获取变压器情况
      getTransformerData(id){
        this.nowLoadFactor = '';
        this.loading = true;
        this.btnLists2 = [];

        this.lineEcharts2.list = [];
        this.lineEcharts3.list = [];

        this.leftLoadLists = [];
        this.rightLoadLists = [];


        let that = this;
        let config = {
          'device_id':id
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.get('power_pc/pc/floor/di/device_table', config, headers).then(res => {
          let data = res.data;
          console.log('变压器情况', config, res);
          if(data.code==0){
            //变压器当前值
            let datas = data.data;

            let data2 = datas.data2;
            if (data2.length === 0) {
              this.btnLists2 = [];
            } else {
              this.btnLists2.push({
                id:'1',
                name:'变压器负载率'
              })
            }


            let data1 = datas.data1;

            let arr1=[];
            if (data1.length === 0) {
              this.btnLists2 = [];
            } else {
              this.btnLists2.push({
                id:'2',
                name:'变压器温度'
              })
            }
            data1.map((item,i)=>{
              let obj1 = {};
              obj1.title = item.title.substr(0,1);
              obj1.val = item.now_value;
              obj1.unit = item.unit;
              this.lineEcharts3.list.push({
                name:item.title,
                data:item.table,
              })

              arr1.push(obj1);
            })
            this.transformerLists = arr1;



            if (data1.length !==0 && data2.length !==0){
              this.btnActID2 = '1';
            } else if (data1.length ===0 && data2.length !==0){
              this.btnActID2 = '2';
            } else if (data1.length ===0 && data2.length ===0){
              this.btnActID2 = '-1';//不显示
            } else {
              this.btnActID2 = '1';
            }
            this.nowLoadFactor = data2[0].now_value+data2[0].unit;
            this.lineEcharts2.list.push({
              name:data2[0].title,
              data:data2[0].table,
            })
            this.lineEcharts2.showMarkL = true;
            this.lineEcharts2.markLineVal = data2[0].standard;





            let data3 = datas.data3;
            let leftLoadArr = [], rightLoadArr=[];

            function sortId(a,b) {
              return b.id-a.id
            }
            data3.sort(sortId);
            let maxVal = -1;
            for (let i =0;i<data3.length;i++){
              if (maxVal < data3[i].now_value){
                maxVal = data3[i].now_value
              }
            }

            let fullVal;
            fullVal = maxVal / 0.9;
            data3.map((item3,i3)=>{
              if (i3 < 3) {
                let obj111 = {};
                obj111.id = item3.id;
                obj111.title = item3.title;
                obj111.value = item3.now_value;
                obj111.per = item3.now_value / fullVal * 100;//百分比
                leftLoadArr.push(obj111);
              } else {
                let obj222 = {};
                obj222.id = item3.id;
                obj222.title = item3.title;
                obj222.value = item3.now_value;
                obj222.per = item3.now_value / fullVal * 100;//百分比
                rightLoadArr.push(obj222);
              }
            })

            this.leftLoadLists = leftLoadArr;
            this.rightLoadLists = rightLoadArr;
            //console.log(this.leftLoadLists,fullVal,maxVal)

            this.loading = false;





          }else{
            this.$message(data.message);
            this.loading = false;
          }
        }).catch(err=>{
          console.log(err);
          this.loading = false;
        })
      },

      btnClick(id){
        this.btnActID = id;
        this.getEchartsData(id);
      },

      btnClick2(id){
        this.btnActID2 = id;
      },
      //变压器名称选择
      selChange(val){
        this.environmentLists = [];
        this.nowLoadFactor = '';
        this.transformerLists = [];
        /*if (val === 1206){
          this.big = true;
          this.small = false;
        }*/

        this.value2 = '';
        this.value3 = '';
        this.self_id = val;
        this.getDeviceLists(val);
      },
      selChange2(val){
        this.getEnvironmentData(val);
        if (this.self_id == 1206) {//高压侧
          this.options3 = [];

        } else if (this.self_id == 1207) {

          this.options3 = [];
          this.deviceLists.some((item,i)=>{
            if (val === item.id) {
              let datas = item.device_list;
              let tempArr = [];
              datas.map((item2,i2)=>{
                let obj = {};
                obj.label = item2.title;
                obj.value = item2.id;
                tempArr.push(obj);
              })
              this.options3 = tempArr;
            }
          })
        } else {
          alert('点位换了？')
        }
        console.log(val)
      },
      selChange3(val){
        this.getTransformerData(val);
        console.log(val)
      }
    },
    created() {
      this.getDeviceLists(this.value);
    },
    mounted() {
      //this.$refs.lineEchartssss[0].drawLine();
    },
    watch:{
      value3(val){
        if (val != ''){
          this.big = false;
          this.small = true;
        } else {
          this.big = true;
          this.small = false;
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">
  @import '../../../../assets/css/common.css';
  @import '../../../../assets/css/comon';

  .envirState{
    position: relative;
    .big{
      .self-box {
        width: 13.06rem;
        .vh(579);
        background-color: transparent;
        box-shadow: 0px 4px 10px 0px rgba(73, 143, 226, 0.22),
        inset 1px 1px 2px 0px rgba(248, 253, 255, 0.15),
        inset 0px -1px 1px 0px #498fe2;
        border-radius: 4px;
        .body {
          .nowValBox {
            margin-left: auto;
            margin-right: auto;
            .vhMT(23);
            width: 6.11rem;
            .vh(110);
            background-color: rgba(33, 72, 153, 0.8);
            border-radius: 4px;
            border: solid 1px rgba(44, 147, 239, 0.2);

            display: flex;
            justify-content: flex-start;
            .wrap {
              flex: 1;
              display: flex;
              justify-content: center;
            }
            .part {
              width: 100%;
              /*background-color: yellow;
            border-right: 1px solid red;*/
              display: flex;
              align-content: center;
              justify-content: center;
              flex-wrap: wrap;
              .name {
                width: 100%;
                text-align: center;
                font-family: PingFangSC-Regular;
                font-size: 0.12rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 1;
                letter-spacing: 0px;
                color: #ffffff;
              }
              .val {
                .vhMT(20);
                width: 100%;
                text-align: center;
                font-family: PingFangSC-Regular;
                font-size: 0.35rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 1;
                letter-spacing: 0px;
                color: #ffffff;
                text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
              }
            }
          }

          .box2Wrap {
            display: flex;
          }

          .toggleBtnBox {
            width: 12.74rem;
            margin-left: auto;
            margin-right: auto;
            .vhMT(19);
            .self-btn {
              cursor: pointer;
              &:first-of-type {
                margin-left: 0;
              }
              margin-left: 0.1rem;
              min-width: 0.74rem;
              padding: 0 0.06rem;
              .vh(24);
              background-color: rgba(255, 255, 255, 0.01);
              border-radius: 2px;
              border: solid 1px #1989fa;
              outline: none;

              font-family: PingFangSC-Light;
              font-size: 0.14rem;
              font-weight: normal;
              font-stretch: normal;
              line-height: 1;
              letter-spacing: 0px;
              color: #b5d7ff;
              &:active {
                background-color: #1575d9;
                color: #fff;
              }
              &.active {
                background-color: #1575d9;
                color: #fff;
              }
            }
          }
          .echartsBox {
            position: relative;
            .vhMT(12);
            width: 100%;
            .vh(350);
          }

        }
      }
    }
    .small {
      .top {
        display: flex;
        justify-content: space-between;
        .self-box {
          width: 6.43rem;
          .vh(404);
          background-color: transparent;
          box-shadow: 0px 4px 10px 0px rgba(73, 143, 226, 0.22),
          inset 1px 1px 2px 0px rgba(248, 253, 255, 0.15),
          inset 0px -1px 1px 0px #498fe2;
          border-radius: 4px;
          .body {

            .nowValBox {
              margin-left: auto;
              margin-right: auto;
              .vhMT(23);
              width: 6.11rem;
              .vh(110);
              background-color: rgba(33, 72, 153, 0.8);
              border-radius: 4px;
              border: solid 1px rgba(44, 147, 239, 0.2);

              display: flex;
              justify-content: flex-start;
              .wrap {
                flex: 1;
                display: flex;
                justify-content: center;
              }
              .part {
                width: 100%;
                /*background-color: yellow;
              border-right: 1px solid red;*/
                display: flex;
                align-content: center;
                justify-content: center;
                flex-wrap: wrap;
                .name {
                  width: 100%;
                  text-align: center;
                  font-family: PingFangSC-Regular;
                  font-size: 0.12rem;
                  font-weight: normal;
                  font-stretch: normal;
                  line-height: 1;
                  letter-spacing: 0px;
                  color: #ffffff;
                }
                .val {
                  .vhMT(20);
                  width: 100%;
                  text-align: center;
                  font-family: PingFangSC-Regular;
                  font-size: 0.35rem;
                  font-weight: normal;
                  font-stretch: normal;
                  line-height: 1;
                  letter-spacing: 0px;
                  color: #ffffff;
                  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
                }
              }
            }

            .box2Wrap {
              display: flex;
            }
            .nowValBox2 {
              .tit {
                width: 100%;
                position: absolute;
                left: 0;
                .vhTop(19);

                font-family: PingFangSC-Regular;
                font-size: 0.12rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 1;
                letter-spacing: 0px;
                color: #ffffff;
                text-align: center;
              }
              position: relative;
              margin-left: 0.16rem;
              .vhMT(23);
              width: 4.54rem;
              .vh(110);
              background-color: rgba(33, 72, 153, 0.8);
              border-radius: 4px;
              border: solid 1px rgba(44, 147, 239, 0.2);

              display: flex;
              justify-content: flex-start;

              .wrap {
                flex: 1;
                display: flex;
                justify-content: center;
              }
              .part {
                width: 100%;
                /*background-color: yellow;
              border-right: 1px solid red;*/
                display: flex;
                align-content: center;
                justify-content: center;
                flex-wrap: wrap;
                .name {
                  width: 100%;
                  text-align: center;
                  font-family: PingFangSC-Regular;
                  font-size: 0.12rem;
                  font-weight: normal;
                  font-stretch: normal;
                  line-height: 1;
                  letter-spacing: 0px;
                  color: #ffffff;
                }
                .val {
                  .vhMT(20);
                  width: 100%;
                  text-align: center;
                  font-family: PingFangSC-Regular;
                  font-size: 0.35rem;
                  font-weight: normal;
                  font-stretch: normal;
                  line-height: 1;
                  letter-spacing: 0px;
                  color: #ffffff;
                  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
                  .text {
                    font-size: 0.18rem;
                    margin-right: 0.05rem;
                  }
                }
              }
            }

            .nowValBox3 {
              margin-left: 0.2rem;
              .vhMT(23);
              width: 1.37rem;
              .vh(110);
              background-color: rgba(33, 72, 153, 0.8);
              border-radius: 4px;
              border: solid 1px rgba(44, 147, 239, 0.2);

              display: flex;
              justify-content: flex-start;
              .part {
                flex: 1;
                /*background-color: yellow;
              border-right: 1px solid red;*/
                display: flex;
                align-content: center;
                justify-content: center;
                flex-wrap: wrap;
                .name {
                  width: 100%;
                  text-align: center;
                  font-family: PingFangSC-Regular;
                  font-size: 0.12rem;
                  font-weight: normal;
                  font-stretch: normal;
                  line-height: 1;
                  letter-spacing: 0px;
                  color: #ffffff;
                }
                .val {
                  .vhMT(20);
                  width: 100%;
                  text-align: center;
                  font-family: PingFangSC-Regular;
                  font-size: 0.35rem;
                  font-weight: normal;
                  font-stretch: normal;
                  line-height: 1;
                  letter-spacing: 0px;
                  color: #ffffff;
                  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
                }
              }
            }

            .toggleBtnBox {
              width: 6.11rem;
              margin-left: auto;
              margin-right: auto;
              .vhMT(19);
              .self-btn {
                cursor: pointer;
                &:first-of-type {
                  margin-left: 0;
                }
                margin-left: 0.1rem;
                min-width: 0.74rem;
                padding: 0 0.06rem;
                .vh(24);
                background-color: rgba(255, 255, 255, 0.01);
                border-radius: 2px;
                border: solid 1px #1989fa;
                outline: none;

                font-family: PingFangSC-Light;
                font-size: 0.14rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 1;
                letter-spacing: 0px;
                color: #b5d7ff;
                &:active {
                  background-color: #1575d9;
                  color: #fff;
                }
                &.active {
                  background-color: #1575d9;
                  color: #fff;
                }
              }
            }
            .echartsBox {
              position: relative;
              .vhMT(12);
              width: 100%;
              .vh(178);
            }

          }
        }
      }
      .bottom {
        .vhMT(20);
        .self-box2 {
          width: 13.06rem;
          .vh(152);
          background-color: transparent;
          box-shadow: 0px 4px 10px 0px rgba(73, 143, 226, 0.22),
          inset 1px 1px 2px 0px rgba(248, 253, 255, 0.15),
          inset 0px -1px 1px 0px #498fe2;
          border-radius: 4px;

          .body {
            width: 100%;
            .vh(113);
            display: flex;
            justify-content: flex-start;

            .left {
              width: 50%;
              height: 100%;
              padding: 0.11rem 0;
            }
            .right {
              width: 50%;
              height: 100%;
              padding: 0.11rem 0;
            }
          }
        }
      }
    }

    .tRBrnBoxWrap{
      position: absolute;
      right: 0;
      .vhTop(-32);
      display: flex;
      &:first-of-type{
        margin-left: 0;
      }
    }
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
      margin-left: 0.2rem;
      width: 0.88rem;
      .el-input--suffix .el-input__inner{
        .vh(24);
        padding: 0;
        border: 0!important;
        border-bottom: solid 2px #1989fa!important;
      }
    }

    .head{
      display: flex;
      align-items: center;
      padding-left: 0.16rem;
      width: 100%;
      .vh(39);
      background-color: rgba(0, 0, 0, 0.2);
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;

      font-family: PingFangSC-Medium;
      font-size: 0.16rem;
      font-weight: normal;
      font-stretch: normal;
      line-height: 1;
      letter-spacing: 0px;
      color: #008aff;
    }
  }


</style>
