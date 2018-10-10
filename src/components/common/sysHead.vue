/*
头部

*/
<template>
  <div class="headBox0">
    <ul>
      <li @click="toLink('/home')">项目首页</li>
      <li v-for="(v,i) in datas.lists" v-text = "v.name" @click="toLink(v.route)"></li>
    </ul>
  </div>
</template>

<script>
        // <img :src="imgBase" class="bg1"/>
export default {
  props:['datas'],
  data () {
    return {
    }
  },
  methods:{
     toLink(route){
       this.$router.replace({ path: route});
     }
  },
  created() {
     
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped="" type="text/less">
@import '../../assets/css/comon.less';
    .headBox0{
        width:100%;
        .vh(50);
        position:relative; 
        background:rgba(0,0,0,.1);  
        ul{
          display: flex;
          li{
            flex:1;
            color:#fff;
            cursor: pointer;
          }
        }    
    }
</style>
