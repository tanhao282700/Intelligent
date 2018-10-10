<!--
    工单列表
    2018-8-24 
-->
<template>
    <div class="dealBox" v-text="txt.txt" :style="{'color':txt.color}">    
        状态
    </div>
</template>

<script>
export default {
  props:['state'],
  data () {
    return {
        txt:{txt:'',color:'#fff'}
    }
  },
  methods:{
     txts(){
          let res = {txt:'',color:'#fff'};
          switch(this.state.fills){
              case -1:
                res.txt = '申请退单';
              break;
              case 0:
                res.txt = '申请延期处理';
              break;
              case 1:
                res.txt = '延期处理';
                res.color = '#fa6074';
              break;
              case 2:
                res.txt = '处理中';
                res.color = '#f38a00';
              break;
              case 3:
                res.txt = '已完成';
                res.color = '#4ae283';
              break;
          }
          this.txt = res;
      }
  },
  created() {
  },
  mounted() {
       this.txts();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped="" type="text/less"> 
@import '../../../../assets/css/comon.less';


</style>
