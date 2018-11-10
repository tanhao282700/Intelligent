<template>
<div class="lineBoxs0" :class="{'lineBoxs0h':type=='h','lineBoxs0z':type=='z'}">
  <div class="lineBoxs" v-if="type=='z'" :style="{'height':hei/100+'rem','margin-top':top/100+'rem'}">
      <div class="lineBoxs1"></div>
      <div class="lineBoxs2"></div>
    </div>
    <div class="lineBoxs222" v-if="type=='h'" :style="{'width':wid/100+'rem','margin-left':left/100+'rem'}">
      <div class="lineBoxs1 lineBoxsss"></div>
      <div class="lineBoxs2 lineBoxsss"></div>
    </div>
</div>
</template>

<script>


export default {
  props:{
    hei: {
      type: Number,
      default: 50
    },
    top: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: 'z'
    },
    wid: {
      type: Number,
      default: 50
    },
    left: {
      type: Number,
      default: 0
    },
  },
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
.lineBoxs0{
    display: inline-block;
    padding: 0;
    &.lineBoxs0h{
      .vh(1);
      width: 100%;
    }
    &.lineBoxs0z{
      width: 0.01rem;
      height: 100%;
    }
    .lineBoxs{
      width: 0.01rem;
      .lineBoxs1{
        width: 0.01rem;
        height: 50%;
        .gradientT(rgba(74,144,226,0.88),rgba(74,144,226,0));
      }
      .lineBoxs2{
        width: 0.01rem;
        height: 50%;
        .gradientT(rgba(74,144,226,0),rgba(74,144,226,0.88));
      }
    }
    .lineBoxs222{
      .vh(1);
      .lineBoxs1{
        .vh(1);
        width: 50%;
        .gradientR(rgba(74,144,226,0.88),rgba(74,144,226,0));
      }
      .lineBoxs2{
        .vh(1);
        width: 50%;
        .gradientR(rgba(74,144,226,0),rgba(74,144,226,0.88));
      }
      .lineBoxsss{
        float:right;
      }
    }
}


</style>
