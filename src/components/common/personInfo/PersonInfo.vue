<template>
  <div class="personInfoComponent" :class = "{'showPersonInfo' : options.isPersonInfo || options.isEditInfo || options.isChangePassword,'closePersonInfo' : !options.isPersonInfo && !options.isEditInfo && !options.isChangePassword } ">
    <div class="title">
      <span></span>
      <span v-if="options.isPersonInfo || options.isEditInfo">个人信息</span>
      <span v-if="options.isChangePassword">修改密码</span>
    </div>
    <div class="componentCon">
      <div v-if="options.isPersonInfo || options.isEditInfo" class="personInfoCon" :class="{'editInfo': options.isEditInfo}" >
        <div class="formInput canEdit">
          <span>姓名</span>
          <input type="text" class="Myname" placeholder="请输入姓名" :readonly="options.isPersonInfo" v-model="personInfo.userinfo.name" >
        </div>
        <div class="formInput">
          <span>部门</span>
          <input type="text" readonly v-model="personInfo.userinfo.department.dept_title">
        </div>
        <div class="formInput">
          <span>职位</span>
          <input type="text" readonly v-model="personInfo.userinfo.department_position.pos_title">
        </div>
        <div class="formInput">
          <span>角色</span>
          <input type="text" readonly v-model="personInfo.role_info.role_title">
        </div>
        <div class="formInput">
          <span>电话</span>
          <input type="text" readonly v-model="personInfo.userinfo.phone">
        </div>
        <a v-if="options.isPersonInfo" href="javascript:void(0)" @click="edit" >编辑信息</a>
        <a v-if="options.isEditInfo" href="javascript:void(0)" @click="save" >保存信息</a>
      </div>
      <div v-if="options.isChangePassword" class="personInfoCon changePassword">
        <div class="formInput">
          <span>原密码</span>
          <input type="password" v-model="oldPassword">
        </div>
        <div class="formInput">
          <span>新密码</span>
          <input v-model="newPassword1" type="password">
        </div>
        <div class="formInput">
          <span>确认密码</span>
          <input v-model="newPassword2" type="password">
        </div>
        <a @click="changePassword" href="javascript:void(0)">确认修改</a>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    props:{
      options: {
        type: Object
      }
    },
    data(){
      return{
        personInfo:{
          userinfo:{
            department:{},
            department_position:{}
          },
          role_info:{}
        },
        newPassword1:'',
        newPassword2:'',
        oldPassword:''
      }
    },
    components:{
    },
    mounted(){
      this.personInfo = this.$store.state.userInfoTotal
      /*this.initPersonInfo()*/
      console.log(this.personInfo)
      $('.personInfoComponent').on('click', (event) => event.stopPropagation());
      $(document).on('click', () => {
        this.options.isPersonInfo = false
        this.options.isEditInfo = false
        this.options.isChangePassword = false
      });
    },
    methods:{
        /*initPersonInfo(){
          this.$http.post('users_manage/user_loginIdInfo',{
            user_id:this.$store.state.userInfoTotal.userinfo.id
          }).then(res=>{
            if(res.data.code =='0'){

            }else {
              this.$emit('showTips', res.data.message);
            }
          }).catch(err=>{
            console.log(err);
          })
        },*/
      showBanerClick(){
        this.$emit('changeBannerParam', !this.isShowBannerParam);
      },
      edit(){
          this.options.isPersonInfo = false
          this.options.isEditInfo = true
      },
      save(){
        if(!this.personInfo.userinfo.name){
          this.$emit('showTips', '请输入姓名！');
          return
        }
        this.$http.post('users_manage/users_updateInfo',{
          user_id:this.$store.state.userInfoTotal.userinfo.id,
          name:this.personInfo.userinfo.name
        }).then(res=>{
          console.log(res);
          if(res.data.code =='0'){
            this.$emit('showTips', '修改成功！');
            this.options.isPersonInfo = true
            this.options.isEditInfo = false
          }else {
            this.$emit('showTips', res.data.message);
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      changePassword(){
        if(!this.oldPassword){
          this.$emit('showTips', '请输入原密码');
          return
        }
        if(this.newPassword1.length<6){
          this.$emit('showTips', '请重新输入长度6位以上密码');
          return
        }
          if(this.newPassword1 != this.newPassword2){
          this.$emit('showTips', '密码不一致，请重新输入');
          return
        }
        this.$http.post('users_manage/users_updateLoginPwd',{
          user_id:this.$store.state.userInfoTotal.userinfo.id,
          org_pass:this.oldPassword,
          password:this.newPassword2
        }).then(res=>{
          console.log(res);
          if(res.data.code =='0'){
            this.$emit('showTips', '修改成功！');
            this.$store.state.userInfoTotal.userinfo.password = this.newPassword2
            this.options.isChangePassword = false
            window.location.reload()
          }else {
            this.$emit('showTips', res.data.message);
          }
        }).catch(err=>{
          console.log(err);
        })
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .Myname::-webkit-input-placeholder {
    /* placeholder字体大小  */
    font-size: 15px!important;
  }
  .personInfoComponent {
    z-index:999;
    width: 320px;
    /*height: 100%;*/
    height: 56.3vw;
    min-height: 728px;
    position: fixed;
    right: -320px;
    top: 0;
    background: #061733;
    flex-direction: column;
    box-shadow: 0 0 14px 0 #35a3ee;
    display: flex;
    .title{
      margin-top:60px;
      /*height:36px;*/
      height:0.36rem;
      background:#061b3a;
      box-shadow: 1px 0 8px black;
      padding-left:38px;
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size:0.16rem;
      color:#008aff;
      span:first-child{
        margin-top:2px;
        margin-right:12px;
        display: inline-block;
        width:0.03rem;
        height:0.16rem;
        background:#008aff;
      }
    }
    .componentCon{
      padding-top:20px;
      flex:1;
      .personInfoCon{
        padding-left:38px;
        .formInput{
          width:245px;
          border:1px solid #0a2f5b;
          box-shadow:2px 2px 4px black;
          height:36px;
          border-radius:4px;
          display: flex;
          margin-top:20px;
          span{
            color:#44577f;
            line-height:36px;
            padding:0 20px;
            font-size:16px;
          }
          input{
            background:#081935;
            border:none;
            color:#d8d8d8;
            font-size:14px;
            width:0;
            flex:1;
            height:34px;
            line-height:34px;
            border-top-right-radius:4px;
            border-bottom-right-radius:4px;
          }
        }
        a{
          width:245px;
          display: inline-block;
          height:32px;
          background:#3a84ed;
          color:white;
          font-size:16px;
          font-weight: 400;
          line-height:32px;
          text-align:center;
          border-radius: 4px;
          margin-top:56px;
          box-shadow:2px 2px 4px black;
        }
      }
      .editInfo .canEdit{
        border:1px solid #1989f9;
      }
      .changePassword {
        .formInput{
          border:1px solid #1989f9;
          span{
            width:104px;
            padding:0 20px;
            display: inline-block;
            text-align: justify;
            &::after{
              content: '';
              display: inline-block;
              padding-left: 100%;
            }
          }
        }
        a{
          margin-top:165px;
        }
      }
    }
  }
  .showPersonInfo{
    right:0;
    transition:all .5s;
  }
  .closePersonInfo{
    right:-320px;
    transition:all .5s;
  }
</style>
