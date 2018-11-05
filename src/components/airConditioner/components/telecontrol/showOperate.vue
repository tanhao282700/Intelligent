
<!--
    操作按钮组件
    made by 胡永福
    start in 2018-9-19
-->
<template>
  <div class="btnBoxss">
    <button @click="look" :class="{active:btnss.mouseState}" type="button">查看</button>
    <button @click="ignore" type="button" v-show="btnss.mouseState">忽略</button>
  </div>
</template>

<script>
  import utils from '../../../../assets/js/utils';

  export default {
    props: ["btnss"],
    data () {
      return {

      }
    },
    methods:{
      look(){ //查看
        this.$emit('look',this.btnss.item);
      },
      ignore(){ //忽略
        this.$emit('ignore',this.btnss.item);
      }
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

  .btnBoxss{
    display: inline-block;
    .active{
      color: #3b89f9;
      border-bottom: 1px solid #3b89f9;
    }
    button{

      cursor: pointer;
      font-family: PingFangSC-Light;
      font-size: 0.14rem;
      font-weight: normal;
      font-stretch: normal;
      .vhLineH(26);
      letter-spacing: 0px;
      color: #f4f4f4;
      border: 0;
      border-bottom: 1px solid transparent;
      outline: none;
      background-color: transparent;
      padding: 0;
      &:last-of-type{
        margin-left: 0.2rem;
      }
      &:active{
        color: #3b89f9;
      }
    }
  }

</style>
