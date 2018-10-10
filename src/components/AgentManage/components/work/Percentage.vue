<!--
    工单列表
    2018-8-24 
-->
<template>
    <div class="workBox">    
        <div class="colorBox" :style="{'background':colors(btnss.fills),'width':1*(btnss.fills/100)+'rem'}"></div><span v-text="btnss.fills+'%'"></span>
    </div>
</template>

<script>
export default {
  props:['btnss'],
  data () {
    return {
        
    }
  },
  methods:{
      colors(nums){
          let color = '';
          if(nums<=100 && nums>80){
            color = '#4ae283' ;
          }else if(nums<=80 && nums>60){
            color = '#ffa414' ;
          }else if(nums<=60 && nums>40){
            color = '#f56c6c' ;
          }else if(nums<=40){
            color = '#ed4a4a' ;
          }
          return color;
      }
  },
  created() {
  },
  mounted() {
       
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped="" type="text/less"> 
@import '../../../../assets/css/comon.less';

.workBox{
    height: 100%;
    display: flex;
    align-items: center;
    .colorBox{
        float: left;
        .vh(16);
    }
    span{
        float: left;
        font-size: 0.14rem;
        color: #fff;
        padding-left: 0.1rem;
    }
}
</style>
