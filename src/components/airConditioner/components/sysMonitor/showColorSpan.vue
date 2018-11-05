<template>
  <div class="box">
    <span v-text="val" :style="{color:color}"></span>
    <div class="line" v-if="val=='未恢复'"></div>
  </div>
</template>

<script>
  export default {
    name: "showColorSpan",
    props:['btnss'],
    data(){
      return{
        val:'',
        color:'#fff'
      }
    },
    methods:{
      render(){
        let text = this.btnss.val;
        let color = '#fff';
        switch (text){
          case '故障中':
            color = '#fa6074';
            break;
          case '正常':
            color = '#4ae283';
            break;
          case '未处理':
            color = '#fa6074';
            break;
          case '处理中':
            color = '#ffa414';
            break;
          case '已处理':
            color = '#4ae283';
            break;
          case '未恢复':
            color = '#3b89f9';
            break;
          default:
            console.log(text);
        }
        this.val = text;
        this.color = color;
      }
    },
    created(){
      this.render();
    },
    mounted(){

    }
  }
</script>

<style lang="less" scoped type="text/less">
  .box{
    span{
      display: block;
    }
    .line{
      margin-left: 0.06rem;
      width: 0.28rem;
      height: 1px;
      background-color: #3b89f9;
    }
  }
</style>
