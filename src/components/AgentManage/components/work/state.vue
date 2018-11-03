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
              case 0:
                res.txt = '未接单';
                res.color='#fff'
              break;
              case 1:
                res.txt = '已接单';
                res.color='"#F35E5E"'
              break;
              case 2:
                res.txt = '延期申请';
                res.color = '"#EEB66E"'
              break;
              case 3:
                res.txt = '延期审请通过'
                res.color=''
              break;
              case 4:
                res.txt = '已完成'
                res.color=''
              break;
              case 5:
                res.txt = '申请退单'
                res.color=''
              break;
              case 6:
                res.txt = '完成退单'
                res.color=''
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
