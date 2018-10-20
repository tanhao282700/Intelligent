<!--
    步骤条下的详细信息
-->
<template>
    <div class="addTemp">    
      <div class="title">{{title}}</div>

    </div>
</template>

<script>
  export default {
      props:['data','title'],
      data () {
        return {
        
        }
      },
      methods:{
           
      },
      created() {
      },
      mounted() {
        console.log(this.data);
      }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped="" type="text/less"> 
@import '../../../../assets/css/comon.less';
.vw(@val){
  width:@val*100/1366vw;
}
.vwPL(@val){
  padding-left:@val*100/1366vw;
}
.vwMLR(@val){
  margin: 0 @val*100/1366vw;
}
.vwMR(@val){
  margin-right:@val*100/1366vw;
}
.addTemp{
  width:100%;
  .title{
    width:100%;
    .vhLH(50);
    background:rgba(0,0,0,0.2);
    .vh(50);
    color:#fff;
    .vwPL(20);
  }
}
</style>
