<!--
    工单列表
    2018-8-24 
-->
<template>
    <div class="dealBox">    
        <div v-show="canDealing" class="dealBtn">
            <span @click.stop="agree">同意</span>
            <span @click.stop="refult">拒绝</span>
        </div>
        <span v-show="!canDealing">-</span>
    </div>
</template>

<script>
export default {
  props:['btnss'],
  computed:{
      canDealing(){
          let res = false;
          if(this.btnss.item.state==-1||this.btnss.item.state==0){
              res = true;
          }
          return res;
      }
  },
  data () {
    return {
        
    }
  },
  methods:{
    agree(){ //赞同
        this.$emit('agree',this.btnss.item);
    },
    refult(){ //拒绝
        this.$emit('refult',this.btnss.item);
    }
  },
  created() {
  },
  mounted() {
       
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped="" type="text/less"> 
@import '../../../../assets/css/comon.less';
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
