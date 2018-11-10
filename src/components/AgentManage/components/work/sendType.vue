<!--
    工单列表
    2018-8-24 
-->
<template>
    <div class="dealBox" >    
        <span v-text="txt.txt" :style="{'color':txt.color}"></span>
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
          switch(this.states.fills){
              case 0:
                this.txt.txt = '系统自动派发';
              break;
              case 1:
                this.txt.txt = '手工派发';
              break;
              case 2:
                this.txt.txt = '投诉';
              break;
            }
          return this.txt;
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
      console.log(this.state.fills);
       this.txts();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped="" type="text/less"> 
@import '../../../../assets/css/comon.less';


</style>
