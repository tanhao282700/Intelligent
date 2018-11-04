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
  props:['states'],
  data () {
    return {
        txt:{txt:'',color:''}
    }
  },
  methods:{
     txts(){
          switch(this.states.fills){
              case "0":
                this.txt.txt = '未接单';
                this.txt.color = '#fff';
                break;
              case "1":
                this.txt.txt = '处理中';
                this.txt.color = '#FFA414';
                break;
              case '2':
                this.txt.txt = '已完成';
                this.txt.color ='#4AE283';
                break;
              case '3':
                this.txt.txt = '申请退单';
                this.txt.color ='#3B89F9';
                break;
              case '4':
                this.txt.txt = '退单完成';
                this.txt.color = '#4AE283';
                break;
          }
          return this.txt
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
