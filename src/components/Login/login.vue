<template>
    <div class="loginContainer">
      <div class="loginFormBox">
          <h1 class="sysName">泰立汇云<span></span>智慧酒店系统</h1>
          <div class="loginInfoBox">
            <div class="inputItem">
              <label for="userName">用户名</label><span class="break breakWidth1"></span>
              <input v-model="userName" type="text" placeholder="请输入用户名" id="userName" />
            </div>
            <div class="inputItem">
              <label for="password">密码</label><span class="break breakWidth1"></span>
              <input v-model="password" type="password" placeholder="请输入密码" id="password" />
              <div class="forgetPw" @click=" forgetPw = true">忘记密码</div>
            </div>
            <div class="inputItem code">
              <input v-model="validateCode" type="text" placeholder="请输入验证码" id="validateCode" />
              <span class="break breakWidth2"></span>
              <div class="codeImg"><img :src="codeImgPath" alt=""></div>
              <div class="refreshBtn" @click="refrenshCode"></div>
            </div>
          </div>
          <div class="inputItem loginBtn" @click="userLogin">登录</div>
      </div>
      <footer>智能改变生活<span></span>数据成就未来</footer>

      <!--忘记密码-->
      <transition name="el-fade-in-linear">
        <div v-show="forgetPw" class="forgetPwBox">
          <div>
            <div class="text">忘记密码，请与管理员取得联系</div>
            <div class="confirmBtn" @click="forgetPw=false">确定</div>
          </div>
        </div>
      </transition>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
      name: "login",
      data(){
        return{
          userName:"",
          password:"",
          validateCode:"",
          imgApi:"https://tesing.china-tillage.com/users_manage/users_get_verifg_code",
          codeImgPath:"",
          forgetPw:false
        }
      },
      methods:{
        refrenshCode(){
          var num=Math.ceil(Math.random()*10);//生成一个随机数（防止缓存）
          this.codeImgPath= this.imgApi + '?' + num;
        },
        userLogin(){
          var name = this.userName;
          var userPw = this.password;

          var fd = new FormData()
          fd.append('username', name);
          fd.append('password', userPw);
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
          this.$http.post('/api/users_manage/user_login',fd,config).then(res=>{
            console.log(res);
          }).catch(err=>{
            console.log(err);
          })
        }
      },
      mounted(){
        this.codeImgPath = this.imgApi;
      }
    }
</script>

<style scoped>
  .loginContainer{
    width: 100%;
    height: 100%;
    position: relative;
    background: url("../../assets/img/login/bg.jpg") no-repeat center;
    background-size: 100% 100%;
  }
  .loginFormBox{
    height: 3.8rem;
    width: 7.6rem;
    padding-top: 1.04rem;
    background: url("../../assets/img/login/companyLogo.png") no-repeat center top;
    background-size: .74rem auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    color: #fff;
  }
  .sysName{
    font-size: .4rem;
    line-height: .48rem;
    text-align: center;
    font-weight: normal;
  }
  .sysName span{
    width: 6px;
    height: 6px;
    border-radius: 100%;
    background-color: #fff;
    display: inline-block;
    vertical-align: middle;
    margin: 0 10px;
  }
  .loginInfoBox{
    margin: .8rem 0 .46rem;
    height: .4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .inputItem{
    width: 2.4rem;
    height: .4rem;
    border: 1px solid #fff;
    border-radius: 4px;
    box-shadow:0px 0px 4px 2px rgba(255,255,255,1) inset;
    padding: 0;
    line-height: .38rem;
    font-size: .14rem;
    padding: 0 12px;
    display: flex;
    align-items: center;
    position: relative;
  }
  .inputItem label{
    width: 42px;
    height: 100%;
    text-align: justify;
    text-align-last: justify;
    display: inline-block;
  }
  .inputItem input{
    border: none;
    background: none;
    height: .24rem;
    width: 1.46rem;
    color: #fff;
  }
  .inputItem input::-webkit-input-placeholder{
    font-size: .14rem;
    color: #fff!important;
  }
  .inputItem.code input{
    width: .94rem;
  }
  .break{
    display: inline-block;
    width: 1px;
    height: 14px;
    background-color: #fff;
    vertical-align: middle;
  }
  .break.breakWidth1{
    margin: 0 16px 0 8px;
  }
  .break.breakWidth2{
    margin: 0 20px 0 10px;
  }
  .codeImg{
    width: .76rem;
    height: .38rem;
    line-height: .38rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .codeImg img{
    width: 100%;
    display: block;
  }
  .refreshBtn{
    width: .18rem;
    height: .18rem;
    background: url("../../assets/img/login/refresh.png") no-repeat center;
    background-size: 100% auto;
  }
  .forgetPw{
    position: absolute;
    font-size: .12rem;
    height: .2rem;
    line-height: .2rem;
    width: .5rem;
    text-align: right;
    right: 0;
    bottom: -.24rem;
    cursor: pointer;
  }
  .loginBtn{
    margin: 0 auto;
    text-align: center;
    display: block;
    cursor: pointer;
  }
  footer{
    position: absolute;
    bottom:.2rem;
    left: 50%;
    transform: translate(-50%,0);
    font-size: .16rem;
    height: .2rem;
    line-height: .2rem;
    text-align: center;
    width: 2.82rem;
    color: #fff;
    letter-spacing: 2px;
  }
  footer span{
    margin: 0 9px;
  }
  footer::before,footer::after{
    content: "";
    display: block;
    position: absolute;
    top: 9px;
    height: 1px;
    width: 16px;
    background-color: #fff;
  }
  footer::before{
    left: 0;
  }
  footer::after{
    right: 0;
  }
  .forgetPwBox{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba(0,0,0,.2);
    z-index: 100;
  }
  .forgetPwBox>div{
    width: 3.64rem;
    height: 2.16rem;
    background:rgba(5,23,50,1);
    box-shadow:0px 2px 8px 0px rgba(39,141,255,0.3),8px 24px 50px 0px rgba(113,166,241,0.1);
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
    color: #B5D7FF;
    border-radius: 10px;
    overflow: hidden;
    text-align: center;
  }
  .forgetPwBox .text{
    font-size: .18rem;
    line-height: 1.72rem;
  }
  .forgetPwBox .confirmBtn{
    height: .44rem;
    line-height: .44rem;
    background-color: #3B85EF;
    font-size: 14px;
    color: #fff;
    cursor: pointer;
  }

</style>
