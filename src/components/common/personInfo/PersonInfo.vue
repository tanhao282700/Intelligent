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
          <input type="text" :readonly="options.isPersonInfo" value="张三">
        </div>
        <div class="formInput canEdit">
          <span>部门</span>
          <input type="text" :readonly="options.isPersonInfo" value="工程部">
        </div>
        <div class="formInput">
          <span>职位</span>
          <input type="text" readonly value="老板">
        </div>
        <div class="formInput">
          <span>角色</span>
          <input type="text" readonly value="老板娘">
        </div>
        <div class="formInput">
          <span>电话</span>
          <input type="text" readonly value="17394930905">
        </div>
        <a v-if="options.isPersonInfo" href="javascript:void(0)" @click="edit" >编辑信息</a>
        <a v-if="options.isEditInfo" href="javascript:void(0)" @click="save" >保存信息</a>
      </div>
      <div v-if="options.isChangePassword" class="personInfoCon changePassword">
        <div class="formInput">
          <span>原密码</span>
          <input readonly type="password" value="123456">
        </div>
        <div class="formInput">
          <span>新密码</span>
          <input type="text">
        </div>
        <div class="formInput">
          <span>确认密码</span>
          <input type="text">
        </div>
        <a href="javascript:void(0)">确认修改</a>
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

      }
    },
    components:{

    },
    mounted(){
      $('.personInfoComponent').on('click', (event) => event.stopPropagation());
      $(document).on('click', () => {
        this.options.isPersonInfo = false
        this.options.isEditInfo = false
        this.options.isChangePassword = false
      });
    },
    methods:{
      showBanerClick(){
        this.$emit('changeBannerParam', !this.isShowBannerParam);
      },
      edit(){
          this.options.isPersonInfo = false
          this.options.isEditInfo = true
      },
      save(){
        this.options.isPersonInfo = true
        this.options.isEditInfo = false
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .personInfoComponent {
    width: 320px;
    height: 100%;
    position: absolute;
    right: -320px;
    top: 0;
    background: #061733;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 14px 0 #35a3ee;
    display: flex;
    .title{
      margin-top:60px;
      height:36px;
      background:#061b3a;
      box-shadow: 1px 0 8px black;
      padding-left:38px;
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size:16px;
      color:#008aff;
      span:first-child{
        margin-top:2px;
        margin-right:12px;
        display: inline-block;
        width:3px;
        height:16px;
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
    transition:all 1s;
  }
  .closePersonInfo{
    right:-320px;
    transition:all 1s;
  }
</style>
