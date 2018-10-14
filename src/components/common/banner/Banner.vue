<template>
  <div class="baner" :class = " isShowBannerParam? 'showBaner' : 'closeBaner' ">
    <div class="head" @click="showBanerClick">
      <span class="logo"></span>
      <span class="txt">泰立智汇</span>
    </div>
    <div class="banerCon">
      <el-row class="tac b-box">
        <el-col class="b-box">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#061733"
            text-color="#fff"
            :router="isUserRouter"
            active-text-color="#ffd04b">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>智慧管理</span>
              </template>
              <el-menu-item-group>
                <!--<template slot="title">分组一</template>-->
                <el-menu-item index="DoorControl">门禁系统</el-menu-item>
                <el-menu-item disabled index="1-2">视频监控系统</el-menu-item>
                <el-menu-item index="fireAlarm/fireMonitor">消防系统</el-menu-item>
                <el-menu-item disabled index="1-4">中央空调系统</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>运营管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="energy">能源管理系统</el-menu-item>
                <el-menu-item disabled index="2-2">营收数据分析</el-menu-item>
                <el-menu-item disabled index="2-3">设备情况</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3" >
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>运维管理</span>
              </template>
              <el-menu-item disabled index="3-1">普通人员</el-menu-item>
              <el-menu-item index="AgentManage">管理人员</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>告警管理</span>
              </template>
              <el-menu-item index="fireAlarm/fireMonitor">告警管理</el-menu-item>
            </el-submenu>
            <!--<el-submenu index="5" class="noRight">-->
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>权限管理</span>
              </template>
              <el-menu-item index="permission">权限管理</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>

  export default{
    props:{
      isShowBannerParam: {
        type: Boolean
      }
    },
    data(){
      return{
        isUserRouter:true
      }
    },
    components:{

    },
    mounted(){
      /*$('.banerCon').on('click', (event) => event.stopPropagation());
      $(document).on('click', () => {
        if(this.$parent.showBannerParam){
          this.$parent.showBannerParam = false
          }
        });*/
    },
    methods:{
      showBanerClick(){
        this.$emit('changeBannerParam', !this.isShowBannerParam);
      },
      goRoute(link){
          console.log(11)
        this.$router.push(link);
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .baner{
    width:250px;
    height:100%;
    position:absolute;
    left:-250px;
    top:0;
    background:#061b3a;
    display:flex;
    flex-direction:column;
    box-shadow:0 0 14px 0 #35a3ee;
    .head{
      &:hover{
        cursor:pointer;
      }
      height:55px;
      display:flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      box-shadow:0 0 10px 0 black;
      .logo{
        background:url(../../../assets/img/home/logo.png) no-repeat center center;
        background-size:cover;
        width:25px;
        height:25px;
        margin-right:14px;
      }
      .txt{
        color:#ffffff;
        font-size:18px;
        font-weight:400;
      }
    }
    .banerCon{
      flex:1;
      margin-top:5px;
    }
  }
  .showBaner{
    left:0;
    transition:all 1s;
  }
  .closeBaner{
    left:-250px;
    transition:all 1s;
  }
</style>
