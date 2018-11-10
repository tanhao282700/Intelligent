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
              case 5:
                res.txt = '申请退单';
                res.color = '#f56c6c';
                break;
              case 0:
                res.txt = '未接单';
                res.colot="#fff"
              break;
              case 1:
                res.txt  = '已接单';
                res.color ='#4ae283'
              break;
              case 2:
                res.txt  = '延期申请';
                res.color="#f56c6c"
              break;
              case 3:
                res.txt  = '延期申请通过';
                res.color="#4ae283"
              break;
              case 4:
                res.txt  = '已完成'
                res.color='#4ae283'
              break;
              case 6:
                res.txt = '完成退单'
                res.color ='#4ae283';
              break;
          }
          this.txt = res;
      }
  },
  watch:{
    state:{
      handler(val){
        //console.log(val)
      },
      deep:true
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
