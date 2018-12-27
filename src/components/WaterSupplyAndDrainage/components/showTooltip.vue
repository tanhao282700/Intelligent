
<!--
    按钮组件
    made by 胡永福
    start in 2018-8-21
-->
<template>
  <!--<div class="btnBoxss">
       <span @click="showTip" :style = "{color:color}" v-text="html">
        </span>-->
    <el-popover
      class="self-popover"
      popper-class="self-popper"
      placement="right-start"
      :disabled="deviceInnormalNum == 0"
      width="281"
      trigger="click">
      <div :class="['popover-btn', 'no-select',deviceInnormalNum != 0?'isPointer':'noPointer','noBorder']" slot="reference">
        <p v-text="deviceInnormalNum" :style="deviceInnormalNum == 0?{color:'#fff'}:null" class="device-num"></p>
      </div>

      <el-scrollbar style="height:100%">
        <div v-for="(item,i) in warnInfo" class="popover-item" :style="{marginTop:i==0?0:'0.15rem'}" :key="i">

          <div class="head">
            <span class="popover-font num">{{(i+1)<10?'0'+(i+1):(i+1)}}</span>
            <span class="col-line"></span>
            <span v-text="item.time" class="popover-font time"></span>
          </div>
          <div class="body">
            <p class="popover-font title">告警详情</p>
            <p v-text="item.content" class="popover-font content"></p>
          </div>

        </div>
      </el-scrollbar>
    </el-popover>
  <!--</div>-->
</template>

<script>
  import utils from '../../../assets/js/utils';

  export default {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped='scoped' type="text/less">
  @import '../../../assets/css/comon.less';
  .self-popover .popover-btn .device-num{
    font-family: PingFangSC-Light;
    font-size: 0.14rem;
    font-weight: normal;
    font-stretch: normal;
    line-height: 1;
    letter-spacing: 0px;
    color: #3b89f9;
    text-align: center;
    &.hover{

    }
  }
  .noPointer{
    cursor: default;
  }
  .noBorder{
    &:active{
      border: 0;
      outline: none;
    }
    &:focus{
      border: 0;
      outline: none;
    }
  }

</style>
