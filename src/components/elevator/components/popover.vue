<template>
  <el-popover
    class="self-popover-elevator"
    popper-class="dianti-self-popper"
    placement="right-start"
    :disabled="false"
    width="281"
    @show="getInfo"
    trigger="click">
    <slot slot="reference"></slot>
    <el-scrollbar style="height:100%">
      <table>
        <tr v-for="(item,i) in info" class="popover-item" :key="i">
          <td><div class="title" v-text="item.tit"></div></td>
          <td><div class="content" v-text="item.content"></div></td>
        </tr>
      </table>
    </el-scrollbar>
  </el-popover>
</template>

<script>
  export default {
    components:{


    },
    name: "popover",
    props: ['device_id'],
    data () {
      return {
        info:[],
      }
    },
    methods:{
      requestDeviceInfo(device_id){
        let that = this;
        let config = {
          device_id:device_id
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.get('hvac_pc/pc/device_info', config, headers).then(res => {
          let data = res.data;
          console.log('获取电梯设备信息', config, res);

          if (data.code == 0) {
            let dataArr = data.data;
            let tempArr = [];
            dataArr.map((item,i)=>{
              let obj = {};
              obj.tit = item.title;
              if (item.params !== ''){
                let paramsObj = eval('('+item.params+')');
                let showvalueIndex;
                paramsObj.value.some((item0,i0)=>{
                  if (item.now_value == item0){
                    showvalueIndex = i0;
                    return true;
                  }
                })
                obj.content = paramsObj.showvalue[showvalueIndex];
              } else {
                obj.content = item.now_value+item.unit;
              }
              tempArr.push(obj)
            })
            this.info = tempArr;
          } else {
            this.$message(data.message);
          }
        }).catch(err=>{
          this.$message(err);
        })
      },
      getInfo(){
        this.requestDeviceInfo(this.device_id);
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
  .dianti-self-popper{
    .el-scrollbar__wrap {
      overflow-x: hidden;
      margin-right: -6px!important;
    }
    table{
      //width: 100%;
      border-collapse: collapse;
    }
    table td,th{
      border: 0;
    }
  }

  .popper__arrow{
    //background-color: #04152c !important;
  }
  .el-popper[x-placement^=bottom] .popper__arrow::after{
    border-bottom-color:#04152c !important;
  }
  .el-popper[x-placement^=bottom] .popper__arrow{
    border-bottom-color:#4a90e2 !important;
  }
  .el-popper[x-placement^=right] .popper__arrow::after{
    border-right-color:#04152c !important;
  }
  .el-popper[x-placement^=right] .popper__arrow{
    border-right-color:#04152c !important;
  }
  .el-popover {
    .vh(262);
    background-color: #04152c !important;
    box-shadow: 0px 2px 4px 0px rgba(60, 150, 255, 0.35) !important;
    border-radius: 4px !important;
    border: solid 0px #4789d6 !important;
    padding: 0.075rem 0.1rem !important;
  }
  .self-popover-elevator {
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

  .popover-item{
    .title{
      display: inline-block;
      font-family: PingFangSC-Regular;
      font-size: 0.14rem;
      font-weight: normal;
      font-stretch: normal;
      .vhLineH(29);
      letter-spacing: 0px;
      color: #4f648b;
    }
    .content{
      margin-left: 0.09rem;
      display: inline-block;
      font-family: PingFangSC-Light;
      font-size: 0.14rem;
      font-weight: normal;
      font-stretch: normal;
      .vhLineH(29);
      letter-spacing: 0px;
      color: #ffffff;
    }
  }


</style>
