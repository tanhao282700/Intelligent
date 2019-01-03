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
         <input type="text" :placeholder="placeholder" v-model="inputs" id="sysHeadSearchInput">
         <div class="searchBtn" @click="search">
             <i></i>
         </div>
        <span></span>
      </div>
      <el-tabs v-model="activeName" @tab-click="toLink" class="navTabs">
        <el-tab-pane v-for="(item,index) in datas.lists" :key="item.id" :label="item.name" :name="'item'+index" :route="item.route" :stretch="true">
        </el-tab-pane>
      </el-tabs>
      <el-row class="block-col-2 userCenter">
        <el-col class="userCenterBox">
          <el-dropdown trigger="hover" @command="handleCommand"  class="dropdown">
            <span class="el-dropdown-link">
              <span @click="showPersonInfo" class="userIcon"></span>
            </span>
            <el-dropdown-menu class="homeDropDown" slot="dropdown" >
              <el-dropdown-item command="personInfo" class="homeDropdownItem" style="text-align:center;color:#f6f6f6">个人信息</el-dropdown-item>
              <el-dropdown-item command="changePassword" class="homeDropdownItem" style="text-align:center;color:#f6f6f6">修改密码</el-dropdown-item>
              <el-dropdown-item command="loginOut" class="homeDropdownItem" style="text-align:center;color:#f6f6f6">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span class="sysheadUserName">{{username}}</span>
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

    <el-dialog :visible.sync="personalCenter.isShowDialog" width="364px" top="30vh" custom-class="homeLoginDialog">
      <span>是否确定退出此账号登录</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="loginOut">确 定</el-button>
        <el-button @click="personalCenter.isShowDialog = false">取 消</el-button>
      </span>
    </el-dialog>

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
      username:'',
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
    loginOut(){
        window.location.reload()
    },
     toLink(tab, event){
          this.$router.replace({ path: tab.$attrs.route});
     },
     search(){
         //console.log(this.inputs);
         this.$emit('searchCont',this.inputs);
     },
     showBanerClick(){
        this.personInfoOptions.isPersonInfo = false
       this.personInfoOptions.isEditInfo = false
       this.personInfoOptions.isChangePassword = false
         this.showBannerParam = !this.showBannerParam
        event.stopPropagation()
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
       this.showBannerParam = false
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
    this.username = this.$store.state.userInfoTotal.userinfo.name;
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
        height:0.5rem;
        display:flex;
        align-items: center;
        z-index: 300;
        background:rgba(0,45,104,0.8);
        box-shadow:0px 2px 3px 0px rgba(0,0,0,0.2);

        #sysHeadSearchInput::-webkit-input-placeholder,#sysHeadSearchInput{
            font-size: 16px!important;
        }

        .userIcon{
          width:0.3rem;
          height:0.3rem;
          display: block;
          background:url(../../assets/img/home/usericon.png) no-repeat center center;
          background-size: cover;
          &:hover{
            cursor: pointer;
          }
        }
        .dropdownlist{
          height:0.5rem;
          line-height:0.5rem;
          position:absolute;
          top:0;
          cursor:pointer;
          color:#fff;
          right:20px;
          img{
            width:0.2rem;
          }
        }
        .navTabs{
          height: .3rem;
          display: inline-flex;
          margin-left: 0.6rem;
           .el-tabs__header{
             .el-tabs__nav-wrap{
                height:0px;
             }
           }
        }
        .logo{
          cursor:pointer;
          display: flex;
          align-items: center;
          height: 100%;
          margin-left:0.14rem;
          margin-right:0.2rem;
          span{
            height:0.18rem;
            color:#fff;
            font-weight:600;
          }
          i{
              display: block;
              margin-right:0.08rem;
              width:0.26rem;
              height:0.26rem;
              background:url(../../assets/img/home/logo.png) no-repeat center center;
              background-size:cover;
            }
        }
        .searchBox{
          width:3.62rem;
          height:0.4rem;
          line-height:0.4rem;
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
              width:2.98rem;
              text-indent: 0.1rem;
              color:#eee;
              font-size: 0.12rem;
          }
          span{
            width:0.28vw;
          }
          .searchBtn{
              display:inline-flex;
              width: 0.6rem;
              height:0.32rem;
              background:linear-gradient(360deg,rgba(39,114,227,1) 0%,rgba(75,148,249,1) 100%);
              border-radius:3px;
              line-height:0.32rem;
              border-left: 0.01rem solid #3b89f9;
              cursor: pointer;
              i{
                  padding:0.09rem;
                  margin:0.07rem auto;
                  background:url('../../assets/img/AgentManage/search.png') no-repeat;
                  background-size:0.18rem;
              }
          }
        }
        
    }
    .userCenter{
      position: absolute;
      right: .3rem;
      top: 50%;
      transform: translate(0,-50%);

      .userCenterBox{
        display: flex;
      }
      .sysheadUserName{
        line-height: 0.3rem;
        margin-left: .1rem;
        color: #fff;
      }
      .dropdown{
        display: block;
      }
    }
    .homeDropDown{
      background: #061733;
      border: 1px solid #4a90e2;
      right:.3rem !important;
      top: .53rem!important;
      padding: 5px 0;
      height: auto!important;
      margin-right: 0!important;
    }

</style>
