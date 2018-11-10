<!--
    工单列表
    2018-8-24 
-->
<template>
    <div class="dealBox">    
        <div class="dealBtn">
            <span @mouseenter="mousehover(btnss.fills.device_name,btnss.fills.index)" @mouseleave="mouseOut()">{{btnss.fills.count}}</span>
        </div>
    </div>
</template>

<script>
export default {
  props:['btnss'],
  data () {
    return {
      radio:{
        radio3:'启动',
        color:'#4AE283',
        state:''
      }
        
    }
  },
  methods:{
    mousehover(name,index){
      this.$emit('mousehover',name,index)
    },
    mouseOut(){
      this.$emit('mouseOut')
    }
  },
  watch: {
    btnss:{
      handler(val){
        if(val){
          
        }
      },
      deep:true
    }
  },
  mounted() {
    console.log()
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped="" type="text/less"> 
@import '../../../../assets/css/comon.less';
.vw(@val){
  width:@val*100/1366vw;
}
.dealBtn{
    color: #3B89F9;
    span{
        padding: 0.03rem;
        cursor: pointer;
        &:hover{
            color: #3b89f9;
            text-decoration: underline;
        }    
    }
    .routeRadio{
      .vh(24);
      .vhLH(24);
      .vw(80);
    }
}

</style>
