<!--
    能源系统 全景查看 图表标题2 绝对定位
    made by 白富友
    start in 2018-8-2
-->
<template>
    <div class="lookAllTit">
        <div class="tipTit" v-text="tit">

        </div>
        <span class="totalBox2">
              <span class="consTit" v-text="cons.tit"></span>
              <span class="consVal" v-text="cons.val+''+cons.util"></span>
        </span>
    </div>
</template>
<script>
export default {
    props:['tit','cons'],
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
@import '../../../../assets/css/comon.less';
.lookAllTit{
    width:100%;
    .vh(40);
    display:flex;
    position:absolute;
    left:0;
    top:0;
      .tipTit{
        position:absolute;
        left:0;
        top:0;
        padding:0 0.16rem;
        .vh(40);
        .vhLH(40);
        font-size:0.16rem;
        color:@color-blue;
        background-color: rgba(0, 0, 0, 0.2);
    }
    .totalBox2{
        .vhLH(40);
        font-size:0.12rem;
        display:inline-block;
        text-align:center;
        flex:1;
        .consTit{
            color:@color-blue;
        }
        .consVal{
            color:#fff;
        }
    }
  }


</style>
