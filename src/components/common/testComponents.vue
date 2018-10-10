<template>
  <div
    class="textBai2"
    v-text='msg'
    @click='click()'
  >
  </div>
</template>

<script>
export default {
  props:['msg'],
  data () {
    return {
    }
  },
  methods:{
      click(){
         alert('按钮组件测试')
      }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped="" type="text/less">
  .textBai2{
        width:180px;
        height:180px;
        font-size:20px;
        color:red;
        background:#ccc
  }
</style>
