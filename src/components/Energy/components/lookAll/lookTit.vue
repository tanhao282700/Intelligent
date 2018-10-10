<!--
    能源系统 全景查看 图表标题
    made by 白富友
    start in 2018-8-2
-->
<template>
    <div class="lookAllTit">
        <div class="totalBox" v-text="tit">

        </div>
        <div class="flex1"></div>
        <div class="totalBox2">
            <div v-for="v in cons" class="cirBox">
                <span class="circle" :style='{background:v.color}'></span>
                <span class="cirTit" v-text="v.tit"></span>
            </div>
        </div>
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
      flex:1;
      flex-direction:'row';
      background:rgba(0, 0, 0, 0.2);
      .flex1{
          flex:1;
      }
      .totalBox,.totalBox2{
          display:inline-block;
          .vhLH(40);
          font-size:0.16rem;
          color:@color-blue
      }
      .totalBox{
          padding-left:0.16rem;
          font-family: PingFangSC-Medium;
      }
      .totalBox2{
          padding-right:0.16rem;
            .cirBox{
                display:inline-block;
                padding-left:0.20rem;
                .circle{
                    display:inline-block;
                    width:0.10rem;
                    height:0.10rem;
                    border-radius:0.05rem;
                    transform:translateY(1px);
                }
                .cirTit{
                    font-size: 0.12rem;
                    line-height: 0.12rem;
                    color: #ffffff;
                }
            }
      }
  }


</style>
