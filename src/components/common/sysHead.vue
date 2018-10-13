/*
头部

*/
<template>
  <div class="headBox0">
      <div class="logo">
        <span>泰立智汇</span>
      </div>
    <div class = "searchBox">
       <input type="text" :placeholder="placeholder" v-model="inputs">
       <div class="searchBtn" @click="search">
           <i></i>
       </div>
      <span></span>
    </div>
    <el-tabs v-model="activeName" @tab-click="toLink">
      <el-tab-pane v-for="(item,index) in datas.lists" :label="item.name" :name="'item'+index" :route="item.route" :stretch="true">
      </el-tab-pane>
    </el-tabs>
    <div class="headimg">
      <img src="../../assets/img/Home/logo.png" width="30px" height="30px" >
    </div>
    <div class="dropdownlist">
      <a>菜单</a>
    </div>
  </div>
</template>

<script>
import searchBox from '@/components/form/searchBox'
import '../../assets/css/fs_common.css';
export default {
  props:['datas'],
  components:{'searchBox':searchBox},
  data () {
    return {
      placeholder:'请输入搜索内容',
      inputs:'',
      activeName:'item0'
    }
  },
  methods:{
     toLink(tab, event){
          this.$router.replace({ path: tab.$attrs.route});
     },
     search(){
         //console.log(this.inputs);
         this.$emit('searchCont',this.inputs);
     }
  },
  created() {
     
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped="" type="text/less" scoped>
@import '../../assets/css/comon.less';
    .headBox0{
        position:absolute;
        top:0;
        width:100%;
        height:50px;
        padding-top:5px;
        display:flex;
        background:rgba(0,45,104,0.8);
        box-shadow:0px 2px 3px 0px rgba(0,0,0,0.2);
        .headimg{
          height:30px;
          position:absolute;
          top:10px;
          cursor:pointer;
          right:80px;
        }
        .dropdownlist{
          height:50px;
          line-height:50px;
          position:absolute;
          top:0;
          cursor:pointer;
          color:#fff;
          right:20px;
        }
        .logo{
          cursor:pointer;
          display: inline-flex;
          height:40px;
          margin-left:14px;
          margin-right:20px;
          span{
            vertical-align:middle;
            margin-top:8px;
            height:18px;
            font-size:18px;
            font-weight:600;
            padding:0 0 28px 44px;
            color:#fff;
            background:url('../../assets/img/Home/logo.png') no-repeat left center;
            background-size:32px 32px;
          }
        } 
        .searchBox{
          width:362px;
          height:40px;
          line-height:40px;
          background:rgba(0,24,56,1);
          box-shadow:0px 0px 1px 0px rgba(87,113,176,0.15),0px 1px 2px 0px rgba(0,0,0,0.5);
          display:flex;
          border-radius: 0.04rem;
          border: solid 0px #3b89f9;
          align-items: center;
          input{
              display:inline-flex;
              background: transparent;
              border:0;
              width:298px;
              text-indent: 0.1rem;
              color:#eee;
              font-size: 0.12rem;
          }
          span{
            width:0.28vw;
          }
          .searchBtn{
              display:inline-flex;
              width: 60px;
              height:32px;
              background:linear-gradient(360deg,rgba(39,114,227,1) 0%,rgba(75,148,249,1) 100%);
              border-radius:4px;
              line-height:32px;
              border-left: 0.01rem solid #3b89f9;
              cursor: pointer;
              i{
                  padding:9px;
                  margin:7px auto;
                  background:url('../../assets/img/AgentManage/search.png') no-repeat;
                  background-size:18px;
              }
          }
        }  
    }
   
</style>
