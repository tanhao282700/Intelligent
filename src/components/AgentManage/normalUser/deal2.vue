<!--
    工单列表
    2018-8-24 
-->
<template>
    <div class="dealBox">    
        <span>{{txt}}</span>
    </div>
</template>

<script>
export default {
  props:['btnss'],
  computed:{
      
  },
  data () {
    return {
        txt:''
    }
  },
  methods:{
    txts(val){
      switch (val){
        case 0:
          this.txt = '每天'
          break;
        case 1:
          this.txt = '每周'
          break;
        case 2:
          this.txt = '每月'
          break;
        case 3:
          this.txt = '每年'
          break;
      }
      return this.txt
    }
  },
  created() {
  },
  mounted() {
      this.txts(this.btnss.item.period)
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
