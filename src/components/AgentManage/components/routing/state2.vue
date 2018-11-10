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
        txt:{}
    }
  },
  methods:{
     txts(val){
        //console.log(val);
          switch(val){
              case 0:
                this.txt={
                  txt: '未接单',
                  color:'#fff'
                };
                break;
              case 1:
                this.txt={
                  txt: '处理中',
                  color:'#FFA414'
                };
                break;
              case 2:
                this.txt={
                  txt: '已完成',
                  color:'#4AE283'
                };
                break;
              case 3:
                this.txt={
                  txt: '申请退单',
                  color:'#3B89F9'
                };
                break;
              case 4:
                this.txt={
                  txt: '退单完成',
                  color:'#4AE283'
                };
                break;
          }
          //console.log(this.txt);
          return  this.txt;
      }
  },
  watch:{
    state:{
      handler(val){
        if(val){
          this.txts(val.fills)
        }
      },
      deep:true
    }
  },
  mounted() {
      //console.log(this.state.fills)
       this.txts(this.state.fills);
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped="" type="text/less">
@import '../../../../assets/css/comon.less';


</style>
