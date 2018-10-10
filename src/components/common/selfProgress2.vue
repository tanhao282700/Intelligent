<!--

    made by 胡永福
    start in 2018-9-17
-->
<template>
  <div class="myProgress">
    <div class="left">
      <div class="part" v-text="tit" :style="{color:colorVal}"></div>
      <div class="part" v-text="val" :style="{color:colorVal}"></div>
    </div>
    <div class="right">
      <div class="now" :style="[{backgroundColor:colorVal},{width: per}]"></div>
    </div>
  </div>
</template>

<script>


  export default {
    components: {

    },
    name: "selfProgress2",
    props:['tit','per','val'],
    data() {
      return {
        colorVal:'',
      }
    },
    computed:{

    },
    methods: {
      myRender(){
        let color = '#fff';
        switch(this.tit){
          case '总':
            color = '#88b8ff';
            break;
          case '开':
            color = '#2df0e0';
            break;
          case '故':
            color = '#fa6074';
            break;
          case '未':
            color = '#999';
            break;
        }
        this.colorVal = color;
      }
    },
    created() {
      this.myRender();
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
    display: flex;
    width: 2.63rem;
    .vhMT(5);
    &:first-of-type{
      margin-top: 0;
    }
    .left{
      width: 0.46rem;
      .vh(16);
      background-color: #043165;
      box-shadow: 0px 0px 2px 0px
      rgba(87, 113, 176, 0.15),
      inset 0px 1px 2px 0px
      rgba(0, 0, 0, 0.75);
      display: flex;
      justify-content: space-between;
      .part{
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        font-family: PingFangSC-Light;
        font-size: 0.12rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: 0px;
        color: transparent;
      }
    }
    .right{
      width: 2.17rem;
      .vh(16);
      background-color: #001838;
      box-shadow: 0px 0px 2px 0px
      rgba(87, 113, 176, 0.15),
      inset 0px 1px 3px 0px
      rgba(0, 0, 0, 0.5);
      position: relative;
      padding: 2px;

      .now{
        width: 0%;
        height: 100%;
        background-color: transparent;
      }
    }
  }


</style>
