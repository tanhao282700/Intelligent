
<!--
    按钮组件
    made by 胡永福
    start in 2018-8-22
-->
<template>
  <div class="btnBoxss">
       <span :style = "{color:color}" v-text="html">
        </span>
  </div>
</template>

<script>
  import utils from '../../../assets/js/utils';

  export default {
    props: ["btnss"],
    data () {
      return {
        color:'#307ae7',
        html:'',
      }
    },
    methods:{
      render (){
        //console.log(this.btnss.data)
        let html = 'bbb';
        let color = '#ccc';
        switch(this.btnss.data){
          case '开启':
            html = '开启';
            color = '#b5d7ff';
            break;
          case '关闭':
            html = '关闭';
            color = '#fa6074';
            break;
          case '异常':
            html = '异常';
            color = '#fa6074';
            break;
          case '故障':
            html = '故障';
            color = '#fa6074';
            break;
          default:
            //alert(this.btnss.data)
        }
        this.html = html;
        this.color = color;
      }
    },
    created() {
      this.render();
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

</style>
