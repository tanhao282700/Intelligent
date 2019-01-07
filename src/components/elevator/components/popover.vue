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
      <div v-for="(item,i) in info" class="popover-item" :style="{marginTop:i==0?0:'0.15rem'}" :key="i">
        <div class="title" v-text="item.tit"></div>
        <div class="content" v-text="item.content"></div>
      </div>
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
        this.$http.post('pc_ims/elevator/device_info', config, headers).then(res => {
          let data = res.data;
          console.log('获取电梯设备信息', config, res);

          if (data.code == 0) {
            let tempArr = [];
            let data111 = data.data;
            let content = data111.content;
            //content = "[{\"设备名称\":\"电梯\"},{\"品牌\":\"凯泉\"},{\"编号\":\"DB466228M\"}]";

            let dataArr = eval(content);
            dataArr.map((item, i) => {
              for (var i2 in item) {
                let obj = {};
                obj.tit = i2;
                obj.content = item[i2]
                tempArr.push(obj)
              }
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
    padding: 0.15rem 0.1rem !important;
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
      width: 0.56rem;
      font-family: PingFangSC-Regular;
      font-size: 0.14rem;
      font-weight: normal;
      font-stretch: normal;
      line-height: 1;
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
      line-height: 1;
      letter-spacing: 0px;
      color: #ffffff;
    }
  }


</style>
