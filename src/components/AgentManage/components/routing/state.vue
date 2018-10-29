<!--
    工单列表
    2018-8-24 
-->
<template>
    <div class="dealBox" v-text="txt.txt" :style="{'color':txt.color}">    
        任务状态
    </div>
</template>

<script>
export default {
  props:['state'],
  data () {
    return {
        txt:{txt:'',color:''},
        state:{txt:'',color:''}
    }
  },
  methods:{
     txts(){
          switch(this.state.fills){
              case "1":
                this.txt.txt = '已开启';
                this.txt.color = '#4AE283';
              break;
              case "2":
                this.txt.txt = '停用';
                this.txt.color = '#f56c6c';
                break;
          }
          this.txt = this.txt;
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
