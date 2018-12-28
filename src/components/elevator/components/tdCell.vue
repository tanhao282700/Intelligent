
<!--
    自定义组件
    made by 樊得涛
    start in 2018-9-28
-->
<template>
  <div class="btnBoxss">
    <span :style = "{color:color,textDecoration:underline}">
       <span v-if="!hasLink">{{name}}</span>
       <a :style = "{color:color}":href='href' v-if="hasLink">{{name}}</a>
     </span>
  </div>
</template>

<script>
  export default {
    props: ["key","value"],
    data () {
      return {
        color:'#439aff',
        underline:'none',
        name:'--',
        href:'#',
        hasLink:false
      }
    },
    methods:{
      render(){
        //console.log('name',this.name)
        if (this.key == 'infoLevel') {
          if(this.value == 1){
            this.color='#f56c6c';
            this.name = '告警';
          }else{
             this.color='#ffa414';
             this.name = '预警';
          }
        }else if (this.key == 'status') {
          if(this.value == 1){
            this.color='#4ae283';
            this.name = '正常';
          }else{
             this.name = '故障中';
          }
        }else if (this.key == 'jindu') {
          if(this.value == 1){
            this.color='#f56c6c';
            this.name = '处理中';
          }else if(this.value == 2){
            this.color='#4ae283';
            this.name = '已完成';
          }else{
            this.name = '无工单';
          }
        }else if (this.key == 'long') {
          this.name = this.value;
          if(this.value == '未恢复'){
            this.underline = 'underline';
            this.hasLink = true;
            this.href= 'http://www.baidu.com';
          }
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
  @import './../../../assets/css/comon.less';

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
