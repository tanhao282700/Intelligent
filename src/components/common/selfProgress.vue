<!--

    made by 胡永福
    start in 2018-9-5
-->
<template>
  <div class="myProgress">
    <span class="title" v-text="tit"></span>
    <div class="self-progress">
      <div class="now" :style="[{width:per+'%'},{backgroundColor: bgC}]"></div>
      <span class="text" v-text="timeVal"></span>
    </div>
  </div>
</template>

<script>


  export default {
    components: {

    },
    name: "selfProgress",
    props:['tit','per','bgC','time'],
    data() {
      return {
        //timeVal:this.time
      }
    },
    computed:{
      timeVal:function () {
        return (parseInt(this.time/24)==0?'':(parseInt(this.time/24))+'天')+parseInt(this.time%24)+'小时';
      }
    },
    methods: {

    },
    created() {

    },
    mounted() {

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped='scoped' type="text/less">
  @import '../../assets/css/common.css';
  @import '../../assets/css/comon';

  .myProgress{
    .vh(22);
    width: 100%;
    display: flex;
    align-items: center;
    .vhMT(6);
    .title{
      padding-left: 0.17rem;
      font-family: PingFangSC-Regular;
      font-size: 0.12rem;
      font-weight: normal;
      font-stretch: normal;
      line-height: 1;
      letter-spacing: 0px;
      color: #ffffff;
    }
    .self-progress{
      margin-left: 0.2rem;
      width: 5.2/6.53*100%;
      height: 100%;
      display: flex;
      align-items: center;
      position: relative;
      background-color: rgba(0, 0, 0, 0.34);
      .now{
        width: 0%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background-color: #3a89f9;
      }
      .text{
        position: absolute;
        left: 0.12rem;
        font-family: PingFangSC-Regular;
        font-size: 0.12rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: 0px;
        color: #ffffff;
      }
    }
  }


</style>
