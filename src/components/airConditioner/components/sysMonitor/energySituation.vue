<template>
  <div
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0.5)"
    element-loading-spinner="el-icon-loading"
    element-loading-text="拼命加载中"
    class="energySituation">
    <div class="btnBox">
      <div class="tabHead">
        <button @click="tabClick(i,v.id)" type="button" v-for="(v,i) in devTitLists" v-text="v.tit" :key="i" :class="['btn1',{active:v.id==btnActiveId}]"></button>
      </div>
    </div>
    <div class="row">
      <div class="copEchartBox">
        <div class="title">cop情况</div>
        <div class="content">
          <echarts-l v-if="v.id==btnActiveId" v-for="(v,i) in tabData" :key="i" :datas="v.datas" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="energyEchartBox">
        <div class="title">机房能耗情况</div>
        <div class="btnBox">
          <div class="cascaderBox">
            <el-cascader
              expand-trigger="hover"
              :options="options"
              v-model="selectedOptions2"
              @focus="showFloor()"
              @change="handleChange">
            </el-cascader>
          </div>
        </div>
        <div class="content">
          <div class="left">
            <echarts-l v-for="(v,i) in tabData2" :key="i" :datas="v.datas" />
          </div>
          <div class="right">
            <echarts-bar v-for="(v,i) in tabData3" :key="i" :datas="v.datas" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import EchartsL from "./echartsL";
  import EchartsBar from "./echartsBar";
  import utils from '../../../../assets/js/utils';
  export default {
    name: "energySituation",
    components: {
      EchartsBar,
      EchartsL

    },
    data() {
      return {
        loading:false,
        btnActiveId:'',
        devTitLists:[
          /*{id:1,tit:'一号机房'},
          {id:2,tit:'二号机房'},*/
        ],
        tabData:[
          /*{
            id:1,
            title:'cop',
            unit:['℃'],
            datas:{
              id:'selfEchart11',
              style:{width:'12.76rem',height:244*100/728+'vh'},
              showMarkL:true,
              colorArr:[
                {color1:'rgba(229,81,80,1)',color3:'rgba(229,81,80,0.5)'},
                {color1:'rgba(45,240,224,1)',color3:'rgba(45,240,224,0.5)'},
              ],
              markLineVal:6.5,
              showLegends:true,
              list:[
                {
                  name:'主机cop',
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
                  name:'系统cop',
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
        tabData2:[
          /*{
            id:1,
            title:'能耗',
            unit:['℃'],
            datas:{
              id:'selfEchart12',
              style:{width:'6.3rem',height:244*100/728+'vh'},
              showLegends:true,
              legendsC:true,
              colorArr:[
                {color1:'rgba(255,159,6,1)',color3:'rgba(255,159,6,0.5'},
                {color1:'rgba(74,144,226,1)',color3:'rgba(74,144,226,0.5)'},
              ],
              list:[
                {
                  name:'2017',
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
                  name:'2018',
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
        tabData3:[
          /*{
            id:1,
            title:'能耗对比',
            unit:['℃'],
            datas:{
              id:'selfEchart13',
              style:{width:'6.3rem',height:244*100/728+'vh'},
              showLegends:true,
              legendsC:true,
              colorArr:[
                {color1:'rgba(250,96,116,1)',color2:'#fd99ac',color3:'rgba(250,96,116,0.5'},
                {color1:'rgba(255,159,6,1)',color2:'#ffd12d',color3:'rgba(255,159,6,0.5'},
                {color1:'rgba(74,144,226,1)',color2:'#6dbefd',color3:'rgba(74,144,226,0.5)'},
              ],
              time:['01','02','03','04','05','06','07','08',],
              list:[
                {
                  name:'本月',
                  data:[5,10,1,2,3,4,5,6],
                },
                {
                  name:'上月',
                  data:[7,13,6,5,4,3,2,1],
                },
                {
                  name:'去年本月',
                  data:[7,13,3,2,1,4,5,6],
                }
              ]

            }
          },*/
        ],
        selectedOptions2:[],
        options: [
          /*{
            value: 'zhinan',
            label: '指南',
            children: [
              {
              value: 'shejiyuanze',
              label: '设计原则',
              children: [{
                value: 'yizhi',
                label: '一致'
              }, {
                value: 'fankui',
                label: '反馈'
              }, {
                value: 'xiaolv',
                label: '效率'
              }, {
                value: 'kekong',
                label: '可控'
              }]
            }, {
              value: 'daohang',
              label: '导航',
              children: [{
                value: 'cexiangdaohang',
                label: '侧向导航'
              }, {
                value: 'dingbudaohang',
                label: '顶部导航'
              }]
            }]
          }*/
          ]
      }
    },
    methods:{
      showFloor(){
        this.getTitData()
      },
      //获取cop报表
      getCOPData(sysID=this.$store.state.sysList[1].son_list[0].sys_menu_id,floor_id=this.$store.state.airFloorId){
        this.loading = true;
        let that = this;
        let config = {
          sys_menu_id:sysID,
          floor_id:floor_id
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.get('hvac_pc/pc/energy/floor', config, headers).then(res => {
          let data = res.data;
          console.log('能耗情况cop', config, res);
          if (data.code == 0) {
            let data2 = data.data;
            let titArr = [];
            let conArr = [];
            data2.map((item,i)=>{
              if (i===0){
                this.btnActiveId = item.id;
              }
              let titObj = {};
              titObj.id = item.id;
              titObj.tit = item.device_title;
              titArr.push(titObj);

              let obj = {};
              obj.id = item.id;
              obj.title = item.point_title;
              obj.unit = [];
              obj.unit.push(item.unit);
              obj.datas = {};
              obj.datas.id = 'selfEchart'+item.id;
              obj.datas.style = {width:'12.76rem',height:244*100/728+'vh'};
              obj.datas.showMarkL = true;
              obj.datas.colorArr = [];
              if (item.point_title.indexOf('系统COP') > -1) {
                obj.datas.colorArr.push({color1:'rgba(45,240,224,1)',color3:'rgba(45,240,224,0.5)'})
              }else {
                obj.datas.colorArr.push({color1:'rgba(229,81,80,1)',color3:'rgba(229,81,80,0.5)'})
              }
              obj.datas.markLineVal = item.standard;
              obj.datas.showLegends = true;
              obj.datas.list = [];
              let obj2 = {};
              obj2.name = item.point_title;
              obj2.data = item.data;
              obj.datas.list.push(obj2);
              conArr.push(obj);
            })

            this.devTitLists = titArr;
            this.tabData = conArr;
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
      //获取能耗筛选tit
      getTitData(floor_id=this.$store.state.airFloorId){
        let that = this;
        let config = {
          floor_id:floor_id
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.get('hvac_pc/pc/energy/title', config, headers).then(res => {
          let data = res.data;
          console.log('能耗筛选题目', config, res);
          if (data.code == 0) {
            let data2 = data.data;
            let tempArr = [];
            if (data2.length === 0) {
              this.$message(data.message);
            } else {
              tempArr = [
                {value:1,label:'全部'}
              ];
              this.selectedOptions2.push(1);
              data2.map((item,i)=>{
                let obj = {};
                obj.value = item.id;
                obj.label = item.title;
                tempArr.push(obj);
              })
            }
            this.options = tempArr;

          } else {

            this.$message(data.message);
          }
        }).catch(err=>{
          this.$message(err);
        })

      },
      //获取能耗报表1
      getEnergy1(floor_id=1){
        this.loading = true;
        let that = this;
        let config = {
          floor_id:floor_id
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.get('hvac_pc/pc/energy/table_one', config, headers).then(res => {
          let data = res.data;
          console.log('能耗报表1', config, res);
          if (data.code == 0) {
            let data2 = data.data.reverse();
            let conArr = [];

            let obj = {};
            obj.id = 999;
            obj.title = '能耗';
            obj.unit = [];
            obj.unit.push('待定');
            obj.datas = {};
            obj.datas.id = 'EEE'+data2[0].year;
            obj.datas.style = {width:'6.3rem',height:244*100/728+'vh'};
            obj.datas.colorArr = [
              {color1:'rgba(255,159,6,1)',color3:'rgba(255,159,6,0.5'},
              {color1:'rgba(74,144,226,1)',color3:'rgba(74,144,226,0.5)'},
            ];
            obj.datas.showLegends = true;
            obj.datas.legendsC = true;
            obj.datas.list = [];

            data2.map((item,i)=>{
              let obj2 = {};
              obj2.name = ''+item.year;
              obj2.data = item.data;
              obj.datas.list.push(obj2);
              conArr.push(obj);
            })

            this.tabData2 = conArr;
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
      //获取能耗报表2
      getEnergy2(floor_id=1){
        this.loading = true;
        let that = this;
        let config = {
          floor_id:floor_id,
          type:1
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.get('hvac_pc/pc/energy/table_two', config, headers).then(res => {
          let data = res.data;
          console.log('能耗报表2', config, res);
          if (data.code == 0) {
            let data2 = data.data.data.reverse();
            let conArr = [];

            let obj = {};
            obj.id = 9999;
            obj.title = '能耗2';
            obj.unit = [];
            obj.unit.push('待定');
            obj.datas = {};
            obj.datas.id = 'EEEE2';
            obj.datas.style = {width:'6.3rem',height:244*100/728+'vh'};
            obj.datas.colorArr = [
              {color1:'rgba(250,96,116,1)',color2:'#fd99ac',color3:'rgba(250,96,116,0.5'},
              {color1:'rgba(255,159,6,1)',color2:'#ffd12d',color3:'rgba(255,159,6,0.5'},
              {color1:'rgba(74,144,226,1)',color2:'#6dbefd',color3:'rgba(74,144,226,0.5)'},
            ];
            obj.datas.showLegends = true;
            obj.datas.legendsC = true;


            obj.datas.time = data.data.time;

            obj.datas.list = [];

            data2.map((item,i)=>{
              let obj2 = {};
              obj2.name = ''+item.title;
              obj2.data = item.data;
              obj.datas.list.push(obj2);
              conArr.push(obj);
            })

            this.tabData3 = conArr;
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
      tabClick(index,id){
        this.btnActiveId= id;
        // alert(432532)
        this.loading = true;
        setTimeout(()=>{
          this.loading = false;
        },200)
      },
      handleChange(val){
        this.getEnergy1(this.selectedOptions2[0]);
        this.getEnergy2(this.selectedOptions2[0]);
        //console.log(val,this.selectedOptions2)
      }
    },
    created(){
      this.getCOPData();
      //this.getTitData();
      this.getEnergy1();
      this.getEnergy2();
    }
  }
</script>

<style lang="less" type="text/less">
  @import '../../../../assets/css/common.css';
  @import '../../../../assets/css/comon';

  .energySituation{
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
    .vh(580);
    padding-left: 0.15rem;
    padding-right: 0.15rem;
    .vhPT(20);
    .vhPB(20);
    background-color: transparent;
    box-shadow: 0px 4px 10px 0px
    rgba(74, 144, 226, 0.22),
    inset 1px 1px 2px 0px
    rgba(248, 253, 255, 0.15),
    inset 0px -1px 1px 0px
    #4a90e2;
    border-radius: 4px;
    .btnBox{
      display: flex;
      align-items: center;
      position: relative;
      .tabHead{
        .btn1{
          &:first-of-type{
            margin-left: 0;
          }
          margin-left: 0.12rem;
          .vh(32);
          background-color: rgba(59, 137, 249, 0.2);
          border-radius: 2px;

          padding-left: 0.2rem;
          padding-right: 0.2rem;
          .vhPT(6);
          .vhPB(6);

          font-family: PingFangSC-Regular;
          font-size: 0.14rem;
          line-height: 1;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #a5a5a5;

          border: solid 1px transparent;
          outline: none;
          cursor: pointer;
          &.active{
            color: #1989fa;
            background-color: transparent;
            border: solid 1px #3a84ee;
          }
        }
      }

    }
    .row{
      .vhMT(10);
      width: 100%;
      display: flex;
      justify-content: space-between;

      .title{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        .vh(40);
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 4px;
        padding-left: 0.1rem;
        display: flex;
        align-items: center;

        font-family: PingFangSC-Medium;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 16px;
        letter-spacing: 0px;
        color: #008aff;
      }
      .copEchartBox{
        width: 100%;
        .vh(244);
        background-color: rgba(0, 0, 0, 0.05);
        border-radius: 4px;
        border: solid 1px rgba(45, 148, 240, 0.2);
        position: relative;
        .content{

        }

      }
      .energyEchartBox{
        width: 100%;
        .vh(244);
        background-color: rgba(0, 0, 0, 0.05);
        border-radius: 4px;
        border: solid 1px rgba(45, 148, 240, 0.2);
        position: relative;
        .btnBox{
          position: absolute;
          right: 0.1rem;
          .vhTop(4);
          z-index: 100;
          display: flex;
          .cascaderBox{

            width: 0.87rem;
            .vh(32);
            background-color: rgba(0, 0, 0, 0.2);
            border-radius: 2px;
            overflow: hidden;
          }
        }
        .content{
          display: flex;
          justify-content: space-between;
          .left{
            width: 6.30rem;

          }
          .right{
            width: 6.30rem;
          }
        }
      }
    }
  }
</style>
