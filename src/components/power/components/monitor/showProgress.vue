
<!--
    按钮组件
    made by 胡永福
    start in 2018-8-22
-->
<template>
  <div class="btnBoxss">
    <span :style = "{color:color,textDecoration:underline}" v-text="name">
     </span>
  </div>
</template>

<script>
  export default {
    props: ["name"],
    data () {
      return {
        color:'#f4f4f4',
        underline:'none'
      }
    },
    methods:{
      render(){
        //console.log('name',this.name)
        if (this.name == '已完成') {

        } else if (this.name == '处理中'){
          this.color = '#36fceb'
          this.underline = 'underline'
        } else if (this.name == '未处理') {
          this.color = '#fe6a7d'
          this.underline = 'underline'
        }
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
  @import '../../../../assets/css/comon.less';

  .btnBoxss{
    display: inline-block;

    font-family: PingFangSC-Light;
    font-size: 0.14rem;
    font-weight: normal;
    font-stretch: normal;
    line-height: 1;
    letter-spacing: 0px;
  }


</style>
