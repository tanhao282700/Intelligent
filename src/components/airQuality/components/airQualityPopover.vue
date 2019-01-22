<template>
  <el-popover
    class="self-popover-airQuality"
    popper-class="airQuality-self-popper"
    placement="right-start"
    :disabled="false"
    width="194"
    @show="getInfo"
    trigger="hover">
    <slot slot="reference"></slot>
    <div class="airQuality-popover">
      <div class="head">数据信息</div>
      <div class="body">
        <table>
          <tr v-for="(v,i) in info" class="airQuality-popover-item" :key="'airQuality-popover-item'+i">
            <td><div class="title" v-text="v.name"></div></td>
            <td>
              <div class="content">
                <span :class="['iconBox',((v.colour==-1 && v.direction==-1)?'arrow-bottom-r':(v.colour==-1 && v.direction!=-1)?'arrow-top-r':(v.colour!=-1 && v.direction==-1)?'arrow-bottom-g':(v.colour!=-1 && v.direction!=-1)?'arrow-top-g':'')]"></span>
                <span :class="['text',(v.colour==-1?'red':'green')]" v-text="v.value"></span>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <!--<el-scrollbar style="height:100%">

    </el-scrollbar>-->
  </el-popover>
</template>

<script>
  export default {
    components:{
    },
    props: ['deviceId'],
    data () {
      return {
        info:[
          /*{
            "colour": 1,
            "direction": 1,
            "name": "二氧化碳",
            "point_id": 6645,
            "unit": "",
            "value": 25
          },
          {
            "colour": 1,
            "direction": 1,
            "name": "一氧化碳",
            "point_id": 6646,
            "unit": "",
            "value": 0.5
          },
          {
            "colour": 1,
            "direction": 1,
            "name": "甲醛",
            "point_id": 6647,
            "unit": "",
            "value": 43
          },
          {
            "colour": 1,
            "direction": 1,
            "name": "湿度",
            "point_id": 6648,
            "unit": "",
            "value": 76
          },
          {
            "colour": 1,
            "direction": 1,
            "name": "温度",
            "point_id": 6649,
            "unit": "℃",
            "value": 4
          },
          {
            "colour": 1,
            "direction": 1,
            "name": "PM2.5",
            "point_id": 6650,
            "unit": "",
            "value": 45
          },
          {
            "colour": 1,
            "direction": 1,
            "name": "PM10",
            "point_id": 6651,
            "unit": "",
            "value": 70
          },
          {
            "colour": 1,
            "direction": 1,
            "name": "TVOC",
            "point_id": 6652,
            "unit": "",
            "value": 873
          }*/
        ]
      }
    },
    methods:{
      getInfo(){
        this.info = [];
        let that = this;
        let config = {
          device_id:this.deviceId
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.get('air_pc/pc/device/info', config, headers).then(res => {
          let data = res.data;
          console.log('获取单个设备的信息', config, res);
          if(data.code == 0) {
            this.info = data.data;
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

    },
  }
</script>

<style lang="less" type="text/less">
  @import '../../../assets/css/common.css';
  @import '../../../assets/css/comon';

  .airQuality-self-popper{
    height: auto!important;
    position: absolute;
    background: #04152c;
    min-width: 150px;
    border: 0;
    padding: 0!important;
    z-index: 2000;
    color: #fff;
    line-height: 1.4;
    text-align: justify;
    font-size: 0.14rem;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);

    .airQuality-popover{
      .head{
        display: flex;
        align-items: center;
        width: 100%;
        .vh(41);
        background-color: #022d6b;
        padding-left: 0.2rem;
        font-family: PingFangSC-Semibold;
        font-size: 0.14rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: 0px;
        color: #ffffff;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
      }
      .body{
        padding: 0 0.2rem;
        .vhPT(14);
        .vhPB(14);
        table{
          //width: 100%;
          border-collapse: collapse;
        }
        table td,th{
          border: 0;
        }
      }
    }
   .popper__arrow{
      border-right-color:#022d6b!important;
     &::after{
       border-right-color:#022d6b!important;
     }
    }

    .el-scrollbar__wrap {
      overflow-x: hidden;
      margin-right: -6px!important;
    }

  }

  .self-popover-airQuality {
    z-index: 999;
    .popover-btn{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
      &.isPointer{
        cursor: pointer;
      }
    }
  }

  .airQuality-popover-item{
    .title{
      display: inline-block;
      font-family: PingFangSC-Regular;
      font-size: 0.14rem;
      font-weight: normal;
      font-stretch: normal;
      .vhLineH(34);
      letter-spacing: 0px;
      color: #4f648b;
    }
    .content{
      margin-left: 0.16rem;
      display: flex;
      align-items: center;
      font-family: PingFangSC-Light;
      font-size: 0.14rem;
      font-weight: normal;
      font-stretch: normal;
      .vhLineH(34);
      letter-spacing: 0px;
      color: #ffffff;
      .iconBox{
        display: block;
        width: 0.04rem;
        height: 0.11rem;

        &.arrow-top-g{
          background: url("/static/airQualityImg/arrow_g.png") no-repeat center;
          background-size: 100% 100%;
          transform: rotate(180deg);
        }
        &.arrow-bottom-g{
          background: url("/static/airQualityImg/arrow_g.png") no-repeat center;
          background-size: 100% 100%;
        }
        &.arrow-top-r{
          background: url("/static/airQualityImg/arrow_r.png") no-repeat center;
          background-size: 100% 100%;
        }
        &.arrow-bottom-r{
          background: url("/static/airQualityImg/arrow_r.png") no-repeat center;
          background-size: 100% 100%;
          transform: rotate(180deg);
        }
      }
      .text{
        margin-left: 0.05rem;
        font-family: PingFangSC-Medium;
        font-size: 0.14rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: 0px;
        color: #fff;
        &.green{
          color: #4ae283;
        }
        &.red{
          color:#ff3737;
        }
      }
    }
  }


</style>
