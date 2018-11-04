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
                res.txt = '未完成';
                res.color = '#f56c6c';
                break;
              case 0:
                res.txt = '未接单';
              break;
              case 1:
                res.txt  = '延期审核中';
              break;
              case 2:
                res.txt  = '延期处理';
                res.color="#f56c6c"
              break;
              case 3:
                res.txt  = '处理中';
                res.color="#f38a00"
              break;
              case 4:
                res.txt  = '已完成'
                res.color='#4ae283'
              break;
          }
          this.txt = res;
      }
  },
  created() {
  },
  mounted() {
       this.txts();
       //console.log(this.state)
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped="" type="text/less"> 
@import '../../../assets/css/comon.less';


</style>
