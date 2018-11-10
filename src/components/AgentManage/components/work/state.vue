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
        txt:{txt:'',color:'#fff'},
        states:{}
    }
  },
  methods:{
     txts(){
          let res = {txt:'',color:'#fff'};
          switch(this.states.fills){
              case 0:
                res.txt = '未接单';
                res.color='#fff'
              break;
              case 1:
                res.txt = '已接单';
                res.color='#4ae283'
              break;
              case 2:
                res.txt = '延期申请';
                res.color = '#fa6074'
              break;
              case 3:
                res.txt = '延期审请通过'
                res.color='#ffa414'
              break;
              case 4:
                res.txt = '已完成'
                res.color='#4ae283'
              break;
              case 5:
                res.txt = '申请退单'
                res.color='#fa6074'
              break;
              case 6:
                res.txt = '完成退单'
                res.color='#ffa414'
              break;
            }
          this.txt = res;
      }
  },
  watch:{
    state:{
      handler(val){
        if(val){
          this.states = val;
          this.txts();
        }
      },
      deep:true
    }
  },
  created() {
  },
  mounted() {
      this.states = this.state;
       this.txts();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped="" type="text/less"> 
@import '../../../../assets/css/comon.less';


</style>
