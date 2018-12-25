<!--
    空调系统 首页
    made by 胡永福
    start in 2018-9-17
-->
<template>
  <div class="airConditioner">
    <sys-head ref="sysHead" :datas = "sData"></sys-head>
    <div ref="modeBox" class="modeBox" v-if="modeData.show">
      <div :class="['mode',{anim:animate==true}]" id="con1">
        <p v-for="(item,i) in modeData.list" :key="i" class="text rowHei" v-text="item"></p>
      </div>
    </div>
    <router-view ref="Shishi"></router-view>
  </div>
</template>

<script>

  import sysHead from '../common/sysHead.vue'

  export default {
    components: {
      'sys-head':sysHead,
    },
    name: "airConditioner",
    data() {
      return {
        sData:{
          active:'item0',
          lists:[
          ]
        },
        modeData:{
          show:true,
          list:[],
        },
        animate:false,
      }
    },
    methods: {
      //获取模式轮播列表
      getModeList(){
        let that = this;
        let config = {
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.get('/hvac_pc/pc/yjqt',config,headers).then(res=>{
          let data = res.data;
          console.log('获取模式轮播列表',config,res);
          if (data.code==0){
            this.modeData.list = data.data;
          } else {
            this.$message(data.message);
          }
        }).catch(err=>{
          this.$message(err);
        })
      },
      scroll(){
        this.animate=true;    // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
        setTimeout(()=>{      //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
          this.modeData.list.push(this.modeData.list[0]);  // 将数组的第一个元素添加到数组的
          this.modeData.list.shift();               //删除数组的第一个元素
          this.animate=false;  // margin-top 为0 的时候取消过渡动画，实现无缝滚动
        },500)
      }
    },
    created() {
      setInterval(this.getModeList(),5*60*1000);
      setInterval(this.scroll,2000);
      if(this.$store.state.sysList[1].role_string[0]!=0 || this.$store.state.sysList[1].role_string[3]!=0 || this.$store.state.sysList[1].role_string[4]!=0){
        this.sData.lists.push({id:0,name:'远程控制',route:'/airConditioner/components/telecontrol'})
      }
      if(this.$store.state.sysList[1].role_string[1]!=0 || this.$store.state.sysList[1].role_string[5]!=0 || this.$store.state.sysList[1].role_string[6]!=0 || this.$store.state.sysList[1].role_string[7]!=0){
        this.sData.lists.push({id:1,name:'系统监测',route:'/airConditioner/components/sysMonitor'})
      }
      if(this.$store.state.sysList[1].role_string[2]!=0 || this.$store.state.sysList[1].role_string[8]!=0 || this.$store.state.sysList[1].role_string[9]!=0){
        this.sData.lists.push({id:2,name:'定时模式',route:'/airConditioner/components/timerMode'})
      }
    },
    mounted() {
      //console.log(this.$refs.sysHead.$el.children[0].offsetHeight)
      //this.$refs.Shishi.$el.children[0].style.paddingTop = this.$refs.sysHead.$el.children[0].offsetHeight+30+'px';
      this.$refs.modeBox.style.top = this.$refs.sysHead.$el.children[0].offsetHeight+15+'px';
      //console.log(this.$refs.Shishi.$el.children[0].offsetHeight)
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">
  @import "../../assets/css/comon";
  .airConditioner{
    #con1{
      display: inline-block;
      .vh(30);
      overflow: hidden;
    }
    .anim{
      transition: all 0.5s;
      margin-top: -0.8rem;
    }
    .rowHei{
      display: block;
      .vhLH(30);
    }
    .tableBox{
      height: auto!important;
      padding-bottom: 0!important;
    }
    .modeBox{
      position: absolute;
      left: 50%;
      .vhTop(65);
      .mode{
        transform: translateX(-50%);
        margin: 0 auto;
        width: 4.5rem;
        .vh(30);
        background-color: #011f51;
        box-shadow: 0px 0px 2px 0px
        rgba(87, 113, 176, 0.15),
        inset 0px 0px 3px 0px
        rgba(0, 0, 0, 0.33);
        border: solid 1px #000c22;
        display: flex;
        align-items: center;
        justify-content: center;
        .text{
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: PingFangSC-Regular;
          font-size: 0.13rem;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 1px;
          color: #ffa414;
          text-shadow: 4px 4px 2px rgba(237, 74, 74, 0.27);
          padding: 0 0.13rem;
          text-align: center;
        }
      }
    }
    .h-paddingTop{
      padding-top: 70px;
      .navCrumbs{
        top: auto;
        bottom: 0;
        p{
          display: inline;
          padding: 0;
          margin: 0;
          cursor: pointer;
        }
      }
    }
    position: relative;
    width:100%;
    height:100%;
    //background:#dedede;
    //overflow: scroll;
    color:#fff;
    background:url('../../assets/img/fullBg.jpg') no-repeat center;
    background-size: 100% 100%;
    box-sizing:border-box;
    .tabsDomBox0{padding-top: 70px;position: relative;height: 100%;}
    .tabsDomBox0 .el-select .el-input__inner{height:32px;width:98px;}
    .tabsDomBox0 .el-select{margin-top:14px;margin-left: 20px;}
    .tabsDomBox0 .el-select:nth-child(2){margin-left: 10px;}
    .navCrumbs{position: absolute;top:50px;left:0.28rem;display: block;height:30px;line-height: 30px;color:#4d5d76;font-size: 12px;}
    .navCrumbs>span{color:#008aff;}
    .el-pagination{
      width: 100%;
    }
  }

</style>
