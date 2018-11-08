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
        txt:{}
    }
  },
  methods:{
     txts(val){
      let txt = {txt:'',color:''}
          switch(val){
              case "0":
                txt.txt = '未接单';
                txt.color = '#fff';
                break;
              case "1":
                txt={
                  txt: '启用',
                  color:'#FFA414'
                };
                break;
              case '2':
                txt.txt = '停用';
                txt.color ='#4AE283';
                break;
              case '3':
                txt.txt = '申请退单';
                txt.color ='#3B89F9';
                break;
              case '4':
                txt.txt = '退单完成';
                txt.color = '#4AE283';
                break;
          }
          this.txt = txt;
          return this.txt
      }
  },
  watch:{
    states:{
      handler(val){
        if(val){
          this.txts(val.fills)
        }
      },
      deep:true
    }
  },
  mounted() {
       this.txts(this.states.fills);
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped="" type="text/less">
@import '../../../../assets/css/comon.less';


</style>
