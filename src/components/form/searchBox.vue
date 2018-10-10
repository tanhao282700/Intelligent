
<template>
    <div class = "searchBox" :style = '{width:wid/100+"rem",height:hei*100/728+"vh"}'>
         <input type="text" :placeholder="placeholder" v-model="inputs">
         <div class="searchBtn" @click="search()">
             <i  class="el-icon-search"></i>
        </div>
    </div>
</template>

<script>

// 封装失败
export default {
  props:{
      wid:{
          type:Number,
          default:300,
      },
      hei:{
          type:Number,
          default:32,
      },
      placeholder:{
          type:String,
          default:'请输入搜索内容',
      }
  },
  data () {
    return {
        inputs:''
    }
  },
  computed:{

  },
  methods:{
     search(){
         this.$emit('search',this.inputs);
     }
  },
  created() {

  },
  mounted() {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped='scoped' type="text/less">
@import '../../assets/css/comon.less';
 .searchBox{
    display: inline-block;
    background-color: rgba(59, 137, 249, 0.1);
    box-shadow: 0px 2px 4px 0px
        rgba(83, 153, 236, 0.19),
        inset 0px 0px 1px 0px
        #4a90e2;
    border-radius: 0.04rem;
    border: solid 0px #3b89f9;
    display: flex;
    align-items: center;
    input{
        background: none;
        border:0;
        flex:1;
        text-indent: 0.1rem;
        color:#eee;
        font-size: 0.12rem;
    }
    .searchBtn{
        width: 0.37rem;
        .vh(16);
        text-align: center;
        .vhLH(16);
        border-left: 0.01rem solid #3b89f9;
        cursor: pointer;
        i{
            font-size: 16*100/728vh;
            color: #eee;
        }
    }
 }

</style>
