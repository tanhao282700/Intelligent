<!--
    给排水系统 首页
    made by 胡永福
    start in 2018-8-3
-->
<template>
  <div>
    <div ref="HpadTop" class="tabsDomBox0 h-paddingTop">
      <div class="navCrumbs"><p @click="toHome">首页</p> > 给排水系统 > <span>首页</span></div>
    </div>
    <div class="floor3D">
      <div class="totalBox">
        <div class="img">
          <img src="../../../assets/img/WaterSupplyAndDrainage/floor3D.png" alt="">
        </div>
        <p class="title">3D楼宇视图</p>

      </div>
      <div class="totalBox2">
        <div class="totalBox2In row">
          <div class="part">
            <div class="popover-btn" slot="reference">
              <p v-text="deviceNum" class="device-num"></p>
              <p class="device-text">设备总数</p>
            </div>
          </div>
          <div class="column-line"></div>
          <div class="part">
            <self-popover
              :deviceInnormalNum="devInnormalNum"
              :warnInfo="warnInfoLists"
            />
          </div>
        </div>

        <div class="totalBox2In higher">

          <div class="title">
            <span class="name">给水系统</span>
            <span @click="chooseSysId(1)" class="self-round no-select">
            <span class="icon_pdf"></span>
            <span class="pdf-text">数据报表</span>
          </span>
          </div>
          <div class="content">
            <div v-for="(item,i) in lists" class="part2" :key="i">
              <div class="self-row">
                <div class="self-col">
                  <span v-text="item.name" class="card-font self-width"></span>
                  <span class="col-line"></span>
                  <span v-text="item.count" class="card-font"></span>
                </div>
                <div class="self-col">
                  <span class="card-font">异常个数</span>
                  <span class="col-line self-marginL"></span>
                  <span v-text="item.abnormal" class="card-font innormal"></span>
                </div>
                <button type="button" @click="getDeviceDetail(item.name)" class="card-font right-btn" round>查看详情</button>
              </div>
              <div class="bottom-line"></div>
            </div>
          </div>
        </div>
        <div class="totalBox2In higher">
          <div class="title">
            <span class="name">排水系统</span>
            <span @click="chooseSysId(2)" class="self-round no-select">
            <span class="icon_pdf"></span>
            <span class="pdf-text">数据报表</span>
          </span>
          </div>
          <div class="content">


            <div v-for="(item,i) in lists2" class="part2" :key="i">
              <div class="self-row">
                <div class="self-col">
                  <span v-text="item.name" class="card-font self-width"></span>
                  <span class="col-line"></span>
                  <span v-text="item.count" class="card-font"></span>
                </div>
                <div class="self-col">
                  <span class="card-font">异常个数</span>
                  <span class="col-line self-marginL"></span>
                  <span v-text="item.abnormal" class="card-font innormal"></span>
                </div>
                <button type="button" @click="getDeviceDetail(item.name)" class="card-font right-btn" round>查看详情</button>
              </div>
              <div class="bottom-line" v-show="i!==(lists2.length-1)"></div>
            </div>


          </div>
        </div>
      </div>

      <Dialog wid = "13.26rem" hei = "640" ref = "dialogTable">
        <report-table :selfID="self_id" />
      </Dialog>
    </div>
  </div>

</template>
<script>
  import utils from "../../../assets/js/utils.js";
  import EchartCir from '../../../components/common/echartCircle';
  import SelfPopover from "./selfPopover";
  import ReportTable from "./reportTable";
  export default {
    components:{
      ReportTable,

      SelfPopover,
      'EchartCir':EchartCir
    },
    data () {
      return {
        deviceNum:'-',
        devInnormalNum:'-',
        lists:[
          /*{name:'水泵',count:'-',abnormal:'-'},
          {name:'高位水箱',count:'-',abnormal:'-'},
          {name:'蓄水池',count:'-',abnormal:'-'}*/
        ],
        lists2:[
          /*{name:'潜污泵',count:'-',abnormal:'-'},
          {name:'污水池',count:'-',abnormal:'-'},*/
        ],

        warnInfoLists:[
          {id:1,date:'-',content:'-',title:''},
        ],
        self_id:'',
      }
    },
    methods:{
      chooseSysId(type){
        if (type === 1) {
          this.getDetailData((this.$store.state.sysList[6].son_list[0].self_id==7?this.$store.state.sysList[6].son_list[0].sys_menu_id:this.$store.state.sysList[6].son_list[1].sys_menu_id))
        } else if (type === 2) {
          this.getDetailData((this.$store.state.sysList[6].son_list[0].self_id==8?this.$store.state.sysList[6].son_list[0].sys_menu_id:this.$store.state.sysList[6].son_list[1].sys_menu_id))
        }
      },
      toHome(){
        this.$router.replace({ path: '/home', params: { isLogin: true} });
      },
      getDeviceDetail(name){
        console.log(name)
        if(this.$store.state.sysList[6].role_string.length != 0) {
          switch (name) {
            case '水泵总数':
              if(this.$store.state.sysList[6].role_string[1] != 0) {
                this.$router.replace({path: '/WaterSupplyAndDrainage/components/waterPump'});
                this.$parent.$children[0].activeName = 'item1';
              }
              break;
            case '高位水箱总数':
              if(this.$store.state.sysList[6].role_string[2] != 0) {
                this.$router.replace({path: '/WaterSupplyAndDrainage/components/highWaterTank'});
                this.$parent.$children[0].activeName = 'item2';
              }
              break;
            case '低位蓄水池总数':
              if (this.$store.state.sysList[6].role_string[3] != 0) {
                this.$router.replace({path: '/WaterSupplyAndDrainage/components/cistern'});
                this.$parent.$children[0].activeName = 'item3';
              }
              break;
            case '潜污泵总数':
              if (this.$store.state.sysList[6].role_string[4] != 0) {
                this.$router.replace({path: '/WaterSupplyAndDrainage/components/submersibleSewagePump'});
                this.$parent.$children[0].activeName = 'item4';
              }
              break;
            case '污水池总数':
              if (this.$store.state.sysList[6].role_string[5] != 0) {
                this.$router.replace({path: '/WaterSupplyAndDrainage/components/sewagePond'});
                this.$parent.$children[0].activeName = 'item5';
              }
              break;
            default:
              alert(name)
          }
        } else {
          switch (name) {
            case '水泵总数':
              this.$router.replace({path: '/WaterSupplyAndDrainage/components/waterPump'});
              this.$parent.$children[0].activeName = 'item1';
              break;
            case '高位水箱总数':
              this.$router.replace({path: '/WaterSupplyAndDrainage/components/highWaterTank'});
              this.$parent.$children[0].activeName = 'item2';
              break;
            case '低位蓄水池总数':
              this.$router.replace({path: '/WaterSupplyAndDrainage/components/cistern'});
              this.$parent.$children[0].activeName = 'item3';
              break;
            case '潜污泵总数':
              this.$router.replace({path: '/WaterSupplyAndDrainage/components/submersibleSewagePump'});
              this.$parent.$children[0].activeName = 'item4';
              break;
            case '污水池总数':
              this.$router.replace({path: '/WaterSupplyAndDrainage/components/sewagePond'});
              this.$parent.$children[0].activeName = 'item5';
              break;
            default:
              alert(name)
          }
        }

      },
      getDetailData(id){
        this.$refs.dialogTable.show();
        console.log(id);
        this.self_id = id;
      },
      //获取设备
      getTotal(){
        let that = this;
        let config = {
          'sys_menu_id':this.$store.state.sysList[6].sys_menu_id,
          'floor_id':48
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.post('drainage/drainage_home', config, headers).then(res => {
          let data = res.data;
          console.log('floor3D数据', config, res);
          if(data.code==0){
            this.deviceNum = Number(data.data.device_count);
            this.devInnormalNum = Number(data.data.device_yc_count);

            if (data.data.sysdevice_list[0].title=='给水系统'){
              this.lists = data.data.sysdevice_list[0].list;
              this.lists2 = data.data.sysdevice_list[1].list;
            } else {
              this.lists = data.data.sysdevice_list[1].list;
              this.lists2 = data.data.sysdevice_list[0].list;
            }

            this.warnInfoLists = data.data.device_yc_info;
          }else{
            this.$message(data.message);
          }
        }).catch(err=>{
          console.log(err);
        })

      },
    },
    created() {

      this.getTotal();
    },
    mounted() {
      this.$refs.HpadTop.style.paddingTop = Number(this.$parent.$children[0].$el.children[0].offsetHeight)+30+'px';
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped='scoped' type="text/less">

  @import '../../../assets/css/common.css';
  .floor3D {
    width: 100%;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    padding: 0 0.3rem;

    .totalBox {
      width: 4.5rem;
      height: 6.08rem;
      background-color: transparent;
      box-shadow: 0px 4px 10px 0px rgba(74, 144, 226, 0.22);
      border-radius: 4px;
      overflow: hidden;
      margin: 5px 4px 10px 0px;
      .img {
        width: 4.37rem;
        height: 4.25rem;
        float: right;
        margin-top: 0.96rem;
        //overflow: hidden;
        img {
          display: block;
          width: 100%;
          height: auto;
        }
      }
      .title{
        margin-top: 0.27rem;
        font-family: PingFangSC-Light;
        font-size: 0.14rem;
        line-height: 0.68rem;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
        text-align: center;
      }
    }
    .totalBox2 {
      display: flex;
      flex-wrap: wrap;
      align-content: space-between;
      width: 8.36rem;
      height: 6.15rem;

      .totalBox2In {
        width: 100%;
        height: 1.08rem;
        overflow: hidden;
        background-color: transparent;
        box-shadow: 0px 4px 10px 0px
        rgba(74, 144, 226, 0.22),
        inset 1px 1px 2px 0px
        rgba(248, 253, 255, 0.15),
        inset 0px -1px 1px 0px
        #4a90e2;
        border-radius: 4px;
        margin: 5px 4px 0px 0px;

        &.higher{
          height: 2.3rem;
          margin: auto 4px 0 auto;
        }
        &.row{
          display: flex;
          flex-direction: row;
        }
        .part{
          display: flex;
          flex: 1;
          align-content: center;
          justify-content: center;
          .popover-btn{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%;
            &.isPointer{
              cursor: pointer;
            }
            .device-num{
              font-family: PingFangSC-Light;
              font-size: 0.66rem;
              font-weight: normal;
              font-stretch: normal;
              line-height: 1;
              letter-spacing: 0px;
              color: #ffffff;
              text-align: center;
            }
            .device-text{
              font-family: PingFangSC-Regular;
              font-size: 0.12rem;
              font-weight: normal;
              font-stretch: normal;
              line-height: 1;
              letter-spacing: 0px;
              color: #4f648b;
              text-align: center;
              margin-top: 0.12rem;
            }
          }
        }
        .column-line{
          width: 1px;
          height: 0.6rem;
          background-image: linear-gradient(0deg,
          #4a90e2 0%,
          rgba(74, 144, 226, 0.88) 50%,
          #4a90e2 100%);
          border-radius: 8px;
          align-self: center;
        }
        //第2part
        .title{
          width: 100%;
          height: 0.5rem;
          background-color: rgba(0, 0, 0, 0.2);
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .name{
            margin-left: 0.19rem;
            font-family: PingFangSC-Regular;
            font-size: 0.16rem;
            font-weight: normal;
            font-stretch: normal;
            line-height: 1;
            letter-spacing: 0px;
            color: #ffffff;
          }
          .self-round{
            margin-right: 0.1rem;
            width: 1.3rem;
            height: 0.32rem;
            background-color: rgba(59, 137, 249, 0.2);
            border-radius: 4px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            &:active{
              background-color: rgba(59, 137, 249, 0.2);
              border: 1px solid #3b89f9;
            }
            .icon_pdf{
              display: inline-block;
              width: 16px;
              height: 16px;
              background-color: #ffffff;
              background: url("../../../assets/img/WaterSupplyAndDrainage/icon_pdf.png") no-repeat center;
              background-size: cover;
            }
            .pdf-text{
              margin-left: 0.1rem;
              font-family: PingFangSC-Regular;
              font-size: 0.16rem;
              font-weight: normal;
              font-stretch: normal;
              line-height: 1;
              letter-spacing: 0px;
              color: #ffffff;
            }
          }
        }

        .content{
          padding: 0 0.2rem;
          width: 100%;
          height: 1.8rem;
          .part2 {
            width: 100%;
            height: 0.6rem;
            .self-row {
              display: flex;
              align-items: center;
              width: 100%;
              height: 100%;
              position: relative;
              .self-col{
                width: 1.81rem;
                height: 100%;
                display: flex;
                align-items: center;
              }
              .right-btn{
                position: absolute;
                right: 0;
                width: 0.96rem;
                height: 0.30rem;
                background-color: rgba(255, 255, 255, 0.01);
                border-radius: 100px;
                border: solid 1px #3b89f9;
                outline: none;
                cursor: pointer;
                &:active{
                  background-color: rgba(59, 137, 249, 0.2);
                  border: 1px solid #3b89f9;
                }
              }
              .self-width{
                width: 1.07rem;
              }
              .self-marginL{
                margin-left: 0.1rem;
              }
              .card-font {
                font-family: PingFangSC-Light;
                font-size: 0.14rem;
                line-height: 1;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #ffffff;
              }
              .col-line {
                margin-right: 0.1rem;
                display: inline-block;
                width: 2px;
                height: 0.2rem;
                background-color: #4a90e2;
                border-radius: 0.23rem;
              }
            }
            .bottom-line {
              width: 100%;
              height: 1px;
              background-color: rgba(45, 148, 240, 0.2);
              border-radius: 2px;
            }
          }
        }


      }

    }
  }

  //popover样式



</style>
