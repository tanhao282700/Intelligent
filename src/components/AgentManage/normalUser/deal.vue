<!--
    工单列表
    2018-8-24 
-->
<template>
    <div class="dealBox">    
        <div  class="dealBtn" v-if="btnss.item.now_state==0">
            <span @click.stop="agree" style="color:#3B89F9;text-decoration: underline;">接单</span>
            <span @click.stop="refult">退单</span>
        </div>
        <div  class="dealBtn" v-else-if="btnss.item.now_state==1 || btnss.item.now_state==2 || btnss.item.now_state==3">
            <span @click.stop="refult" style="color:#3B89F9;text-decoration: underline;">退单</span>
        </div>
        <span v-else>-</span>
    </div>
</template>

<script>
export default {
  props:['btnss'],
  computed:{
      
  },
  data () {
    return {
        
    }
  },
  methods:{
    agree(){ //赞同
        this.$emit('agree',this.btnss,1);
    },
    refult(){ //拒绝
        this.$emit('refult',this.btnss,5);
    }
  },
  created() {
  },
  mounted() {
     // console.log(this.btnss.item)
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped="" type="text/less"> 
@import '../../../assets/css/comon.less';
.dealBtn{
    color: #fff;
    span{
        padding: 0.03rem;
        cursor: pointer;
        &:hover{
            color: #3b89f9;
            text-decoration: underline;
        }    
    }
    
}

</style>
