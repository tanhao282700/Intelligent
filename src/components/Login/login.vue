<template>
    <div class="loginContainer">
      <div class="loginFormBox">
          <h1 class="sysName">泰立汇云<span></span>智慧酒店系统</h1>
          <div class="loginInfoBox">
            <div class="inputItem">
              <label for="userName">用户名</label><span class="break breakWidth1"></span>
              <input v-model="userName" type="text" :placeholder="nameText" id="userName" :class="{error:isError}" />
            </div>
            <div class="inputItem">
              <label for="password">密码</label><span class="break breakWidth1"></span>
              <input v-model="password" type="password" :placeholder="pwText" id="password" :class="{error:isError}" />
              <div class="forgetPw" @click=" forgetPw = true">忘记密码</div>
            </div>
            <div class="inputItem code">
              <input v-model="validateCode" type="text" :placeholder="codeText" id="validateCode" :class="{error:codeError}" @focus="codeFocus"/>
              <span class="break breakWidth2"></span>
              <div class="codeImg"><img :src="codeImgPath" alt=""></div>
              <div class="refreshBtn" @click="refrenshCode"></div>
            </div>
          </div>
          <div class="inputItem loginBtn" @click="userLogin">登录</div>
      </div>
      <footer>智能改变生活<span></span>数据成就未来</footer>


      <transition name="el-fade-in-linear">
        <!--报错提示-->
        <div class="errTipBox" v-html="errMsg" v-show="errorTipShow"></div>
      </transition>

      <transition name="el-fade-in-linear">
        <!--忘记密码-->
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
          nameText:"请输入用户名",
          pwText:"请输入密码",
          codeText:"请输入验证码",
          imgApi:"https://tesing.china-tillage.com/users_manage/users_get_verifg_code",
          codeImgPath:"",
          forgetPw:false,
          isError:false,
          codeError:false,
          errorTipShow:false,
          errMsg:"",
          emptyInputs:true
        }
      },
      methods:{
        codeFocus(){
          this.validateCode = "";
          this.codeError = false;
          this.errorTipShow = false;
        },
        refrenshCode(){
          var num=Math.ceil(Math.random()*10);//生成一个随机数（防止缓存）
          this.codeImgPath= this.imgApi + '?' + num;
        },
        userLogin(){
          var that = this;
          that.verifyInput();
        },
        verifyInput(){
          var that = this;
          if(!this.userName){
            this.showErr(this.nameText);
            return;
          }
          if(!this.password){
            this.showErr(this.pwText);
            return;
          }
          if(!this.validateCode){
            this.showErr(this.codeText);
            return;
          }else {
            this.requestCode();
          }

        },
        showErr(msg){
          this.errorTipShow = this.emptyInputs = true;
          this.errMsg = msg;
        },
        closeErr(){
          this.errorTipShow = this.codeError = this.isError = false;
          this.errMsg = "";
        },
        requestCode(){
          let that = this;
          that.$http.post('users_manage/users_login_validation_code',{
            code:that.validateCode
          },{
            'Content-Type': 'multipart/form-data'
          }).then(res=>{
            let data = res.data;
            console.log(data);
            if(data.code == '0'){
              that.closeErr();
              that.requestLogin();
            }else {
              that.codeError = true;
              that.refrenshCode();
              that.showErr(data.message);
            }
          }).catch(err=>{
            console.log(err);
          })
        },
        requestLogin(){
          let that = this;
          let config = {
            username:this.userName,
            password:this.password
          }
          let headers = {
            'Content-Type': 'multipart/form-data'
          }
          this.$http.post('/users_manage/user_login',config,headers).then(res=>{
            let data = res.data;
            console.log(data);
            if(data.code=='0'){
              that.closeErr();

              var dataObj = that.$store.state.userInfoTotal = data.data;
              var projeceId = that.$store.state.projectId = dataObj.projectInfo[0].project_id;
              var userId = that.$store.state.userId = dataObj.userinfo.id
              var AUTH_TOKEN = dataObj.userinfo.password + "_" + projeceId + "_" + userId;
              axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

              var sysList = data.data.usergrouprolesyslist[0].syslist;
              var listLen = sysList.length;
              var tempObj = {};
              for(var i=0;i<listLen;i++){
                var id = sysList[i].self_id;
                tempObj[id] = sysList[i];
                i<listLen-1,that.$store.state.sysList = tempObj;
              }

              that.$router.replace({ path: '/home', params: { isLogin: true} });
            }else {
              that.isError = true;
              that.refrenshCode();
              that.showErr(data.message);
            }
          }).catch(err=>{
            console.log(err);
            that.showErr("服务器请求失败");
          })
        }
      },
      mounted(){
        let that = this;
        that.codeImgPath = that.imgApi;
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
    width: .42rem;
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
    font-size: .14rem;
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
  .error{color: #f00!important;}
  .errTipBox{
    width: auto;
    padding: .1rem .2rem;
    line-height: .28rem;
    background-color: #051732;
    border-radius: 4px;
    text-align: center;
    font-size: .14rem;
    color: #fff;
    position: absolute;
    bottom: .7rem;
    left:50%;
    transform: translate(-50%,0);
  }

</style>
