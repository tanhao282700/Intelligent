
<!--
    按钮组件
    made by 胡永福
    start in 2018-8-22
-->
<template>
  <div class="btnBoxss">
    <span v-text="type" class="text">烟感报警</span>
    <span v-show="isError" class="icon-mark"></span>
       <!--<span :style = "{color:color}" v-text="html">
        </span>-->
  </div>
</template>

<script>
  import utils from '../../../assets/js/utils';

  export default {
    props: ["isError","type"],
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

  .btnBoxss{
    display: inline-block;
  }
  .text{
    font-family: PingFangSC-Light;
    font-size: 0.14rem;
    font-weight: normal;
    font-stretch: normal;
    line-height: 1;
    letter-spacing: 0px;
    color: #f4f4f4;
  }
  .icon-mark{
    display: inline-block;
    width: 0.64rem;
    height: 0.52rem;
    position: absolute;
    top: -0.05rem;
    left: 0.5rem;

    background: url("../../../assets/img/fireAlarm/icon_mark.png") no-repeat center;
    background-size: 100% 100%;

  }

</style>
