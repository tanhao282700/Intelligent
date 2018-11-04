/*
头部 by fanshan 2018/10/13

*/
<template>
  <div>
    <div class="headBox0">
      <div class="logo" @click="showBanerClick">
        <i></i>
        <span>泰立智汇</span>
      </div>
      <div class = "searchBox">
         <input type="text" :placeholder="placeholder" v-model="inputs">
         <div class="searchBtn" @click="search">
             <i></i>
         </div>
        <span></span>
      </div>
      <el-tabs v-model="activeName" @tab-click="toLink" class="navTabs">
        <el-tab-pane v-for="(item,index) in datas.lists" :key="item.id" :label="item.name" :name="'item'+index" :route="item.route" :stretch="true">
        </el-tab-pane>
      </el-tabs>
      <el-row class="block-col-2 userCenter" style="position: absolute;right: 2.2%;top: 0.1rem;">
        <el-col :span="12">
          <el-dropdown trigger="click" @command="handleCommand" >
            <span class="el-dropdown-link">
              <span @click="showPersonInfo" class="userIcon"></span>
            </span>
            <el-dropdown-menu class="homeDropDown" slot="dropdown" style="background: #061733;border: 1px solid #4a90e2">
              <el-dropdown-item command="personInfo" class="homeDropdownItem" style="text-align:center;color:#f6f6f6">个人信息</el-dropdown-item>
              <el-dropdown-item command="changePassword" class="homeDropdownItem" style="text-align:center;color:#f6f6f6">修改密码</el-dropdown-item>
              <el-dropdown-item command="loginOut" class="homeDropdownItem" style="text-align:center;color:#f6f6f6">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
      <!-- <div class="dropdownlist" >
        <el-dropdown trigger="click" @command="handleCommand" >
          <span class="el-dropdown-link">
             <img src="../../assets/img/AgentManage/dropdown_icon.png" @click="showMenus"/>
          </span>
          <el-dropdown-menu class="homeDropDown" slot="dropdown" style="background: #061733;border: 1px solid #4a90e2">
            <el-dropdown-item command="menu1" class="homeDropdownItem" style="text-align:center;color:#f6f6f6">菜单1</el-dropdown-item>
            <el-dropdown-item command="menu2" class="homeDropdownItem" style="text-align:center;color:#f6f6f6">菜单2</el-dropdown-item>
            <el-dropdown-item command="menu3" class="homeDropdownItem" style="text-align:center;color:#f6f6f6">菜单3</el-dropdown-item>
            <el-dropdown-item command="menu4" class="homeDropdownItem" style="text-align:center;color:#f6f6f6">菜单4</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div> -->
      <component :isShowBannerParam="showBannerParam" @changeBannerParam="updateBannerParam" is="Banner"></component>
    </div>
    <component is="PersonInfo" @showTips="personInfoShowTips" :options="personInfoOptions"></component>
  </div>

</template>

<script>
import searchBox from '@/components/form/searchBox'
import Banner from './banner/Banner.vue'
import SelectBox from '@/components/form/selectBox';
import '../../assets/css/fs_common.css';
import PersonInfo from './personInfo/PersonInfo'
export default {
  props:['datas'],
  components:{'searchBox':searchBox,'SelectBox':SelectBox,'Banner':Banner,'PersonInfo':PersonInfo},
  data () {
    return {
      placeholder:'请输入搜索内容',
      inputs:'',
      showBannerParam:false,
      activeName:'item0',
      menus:[
          {label:'个人信息',value:1},
          {label:'密码修改',value:2}],
      currMenu:-1,
      personalCenter:{
          isShowBounced:false,
          isShowDialog:false,
      },
      personInfoOptions:{
            isPersonInfo:false,  //显示个人信息
            isEditInfo:false,    //编辑个人信息 传参只用传false
            isChangePassword:false  //修改密码
      }
    }
  },
  methods:{
     toLink(tab, event){
          this.$router.replace({ path: tab.$attrs.route});
     },
     search(){
         //console.log(this.inputs);
         this.$emit('searchCont',this.inputs);
     },
     showBanerClick(){
         this.showBannerParam = !this.showBannerParam
     },
     updateBannerParam(data){
         this.showBannerParam = data
     },
     showPersonInfo(){
         this.personalCenter.isShowBounced = !this.personalCenter.isShowBounced
     },
     personInfoShowTips(tips){   //个人信息修改提示信息
        this.bubbleTipShow(tips)
     },
     bubbleTipShow(tip){
        this.bubbleTip = tip;
        this.$store.state.bubbleShow = true;
        var that = this;
        setTimeout(function () {
          that.$store.state.bubbleShow = false;
        },3000)
      },
     handleCommand(command){
        if(command == 'loginOut'){
          this.personalCenter.isShowDialog = true
        }else if(command==='personInfo'){
            this.personInfoOptions.isPersonInfo = true
        }else if(command == 'changePassword'){
          this.personInfoOptions.isChangePassword = true
        }
      },
      // showMenus(){

      // }
  },
  watch:{
     activeName(val){
      this.activeName = val;
      sessionStorage.setItem('activeItem',val);
    }
  },
  beforeDestroy(){
    sessionStorage.setItem('activeItem',null);
  },
  mounted(){
    if(this.datas.active){
      this.activeName = this.datas.active;
    }else{
      if(sessionStorage.getItem('activeItem') && sessionStorage.getItem('activeItem')!='null'){
        this.activeName = sessionStorage.getItem('activeItem')
      }else{
        this.activeName = 'item0';
      }
    }

  }

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped="" type="text/less" scoped>
@import '../../assets/css/comon.less';
    .headBox0{
        position:absolute;
        left:0;
        top:0;
        width:100%;
        height:50px;
        padding-top:5px;
        display:flex;
        z-index: 2;
        background:rgba(0,45,104,0.8);
        box-shadow:0px 2px 3px 0px rgba(0,0,0,0.2);
        .userIcon{
          width:30px;
          height:30px;
          display: inline-block;
          background:url(../../assets/img/home/usericon.png) no-repeat center center;
          background-size: cover;
          &:hover{
            cursor: pointer;
          }
        }
        .dropdownlist{
          height:50px;
          line-height:50px;
          position:absolute;
          top:0;
          cursor:pointer;
          color:#fff;
          right:20px;
          img{
            width:20px;
          }
        }
        .navTabs{
          height:30px;line-height:30px;
          display: inline-flex;
          margin-left: 60px;
           .el-tabs__header{
             .el-tabs__nav-wrap{
                height:0px;
             }
           }
        }
        .logo{
          cursor:pointer;
          display: inline-flex;
          height:40px;
          margin-left:14px;
          margin-right:20px;
          span{
            margin-top:9px;
            height:18px;
            color:#fff;
          }
          i{
              display: inline-block;
              margin-right:8px;
              margin-top:7px;
              width:26px;
              height:26px;
              background:url(../../assets/img/home/logo.png) no-repeat center center;
              background-size:cover;
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
