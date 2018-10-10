<template>
  <div class="selfSwitchBox">
    <div class="selfSwitch no-select" @click="clickEvent">
        <div :class="['slide',{moved:toggle},{moved2:!toggle}]" v-text="toggle?'开':'关'"></div>
    </div>
    <span class="state" v-text="toggle?'已开启':'已关闭'"></span>
  </div>
</template>

<script>
  export default {
    name: "selfSwitch",
    props:['togglee'],
    data() {
      return {
        toggle:this.togglee
      }
    },
    methods:{
      clickEvent(){
        this.$parent.tempHandleChange();
      }
    },
    watch:{
      togglee:function (a,b) {
        this.toggle=this.togglee;
      }
    }
  }
</script>

<style lang="less" scoped type="text/less">
  @import '../../assets/css/common.css';
  @import '../../assets/css/comon';
  @keyframes moved {
    from {transform: translateX(0);background-color: #FA6074;}
    to {transform: translateX(0.48rem);background-color: #4ae283;}
  }
  @keyframes moved2 {
    from {transform: translateX(0.48rem);background-color: #4ae283;}
    to {transform: translateX(0);background-color: #FA6074;}
  }
  .selfSwitchBox{
    .vhMT(19);
    display: flex;
    justify-content: center;
    align-content: flex-start;
    flex-wrap: wrap;
    .moved{

      animation-name: moved;
      animation-duration: .2s;
      animation-timing-function: linear;
      animation-delay: 0s;
      animation-iteration-count: 1;
      animation-direction: alternate;
      animation-play-state: running;
      animation-fill-mode:forwards;
    }
    .moved2{
      animation-name: moved2;
      animation-duration: .2s;
      animation-timing-function: linear;
      animation-delay: 0s;
      animation-iteration-count: 1;
      animation-direction: alternate;
      animation-play-state: running;
      animation-fill-mode:forwards;
    }
    .selfSwitch{
      width: 1rem;
      .vh(34);
      background-color: #001838;
      box-shadow: 0px 0px 2px 0px
      rgba(87, 113, 176, 0.15),
      inset 0px 1px 3px 0px
      rgba(0, 0, 0, 0.5);
      border-radius: 1px;
      position: relative;
      cursor: pointer;
      .slide{
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: 0.02rem;
        .vhTop(2);
        width: 0.48rem;
        .vh(30);
        box-shadow: -1px 0px 2px 0px
        rgba(59, 137, 249, 0.27);
        border-radius: 1px;

        font-family: PingFangSC-Regular;
        font-size: 0.16rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: 0px;
        color: #ffffff;
      }

    }
    .state{
      display: block;
      width: 100%;
      .vhMT(12);
      font-family: PingFangSC-Light;
      font-size: 0.12rem;
      font-weight: normal;
      font-stretch: normal;
      line-height: 1;
      letter-spacing: 0px;
      color: #ffffff;
      text-align: center;
    }
  }
</style>
