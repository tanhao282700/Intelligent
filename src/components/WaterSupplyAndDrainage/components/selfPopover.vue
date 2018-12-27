<template>
    <el-popover
      class="self-popover"
      popper-class="self-popper"
      placement="bottom"
      :disabled="deviceInnormalNum == 0"
      width="281"
      trigger="click">
      <div class="popover-btn isPointer no-select" slot="reference">
        <p v-text="deviceInnormalNum" class="device-num innormal"></p>
        <p class="device-text">异常数量</p>
      </div>

      <el-scrollbar style="height:100%">
        <div v-for="(item,i) in warnInfo" class="popover-item" :style="{marginTop:i==0?0:'0.15rem'}" :key="i">

            <div class="head">
              <span class="popover-font num">{{(i+1)<10?'0'+(i+1):(i+1)}}</span>
              <span class="col-line"></span>
              <span v-text="item.date" class="popover-font time"></span>
            </div>
            <div class="body">
              <p class="popover-font title">告警详情</p>
              <p v-text="item.title+item.content" class="popover-font content"></p>
            </div>

        </div>
      </el-scrollbar>
    </el-popover>
</template>

<script>
    export default {
      components:{


      },
      name: "selfPopover",
      props: ['warnInfo','deviceInnormalNum'],
      data () {
        return {
        }
      },
      methods:{

      },
      created() {

      },
      mounted() {

      },
    }
</script>

<style lang="less" type="text/less">
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .popper__arrow{
    //background-color: #04152c !important;
  }
  .el-popper[x-placement^=bottom] .popper__arrow::after{
    border-bottom-color:#04152c !important;
  }
  .el-popper[x-placement^=bottom] .popper__arrow{
    border-bottom-color:#04152c !important;
  }
  .el-popper[x-placement^=right] .popper__arrow::after{
    border-right-color:#04152c !important;
  }
  .el-popper[x-placement^=right] .popper__arrow{
    border-right-color:#04152c !important;
  }
  .el-popover {
    height: 2.72rem;
    background-color: #04152c !important;
    box-shadow: 0px 2px 4px 0px rgba(60, 150, 255, 0.35) !important;
    border-radius: 4px !important;
    border: solid 0px #4789d6 !important;
    padding: 0.15rem 0.1rem !important;
  }
  .self-popover {

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

  .popover-item {
    //overflow: hidden;
    .popover-font {
      font-family: PingFangSC-Regular;
      font-size: 0.14rem;
      font-weight: normal;
      font-stretch: normal;
      line-height: 1;
      letter-spacing: 0px;
      color: #ffffff;
    }
    .head {
      height: 0.14rem;
      display: flex;
      align-items: center;
      .col-line {
        display: inline-block;
        margin: auto 0.1rem;
        width: 1px;
        height: 0.14rem;
        background-color: #ffffff;
        border-radius: 0.42rem;
      }
    }
    .body{
      margin-top: 0.1rem;
      .title{
        font-family: PingFangSC-Regular;
        font-size: 0.12rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: 0px;
        color: #4f648b;
      }
      .content{
        margin-top: 0.05rem;
        padding: 0.1rem;
        width: 100%;
        height: 0.7rem;
        background-color: #001838;
        box-shadow: 0px 0px 2px 0px
        rgba(87, 113, 176, 0.15),
        inset 0px 1px 3px 0px
        rgba(0, 0, 0, 0.5);

        font-family: PingFangSC-Regular;
        font-size: 0.13rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: 1px;
        color: #ffa414;

        overflow: hidden;
      }
    }
  }
</style>
