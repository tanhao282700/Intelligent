<!--
    消防报警系统 首页
    made by 胡永福
    start in 2018-8-24
-->
<template>
  <div class="fireAlarm">
    <el-scrollbar style="width:100%;height:100%">
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1">
          火警监测
        </el-menu-item>
        <el-menu-item index="2">
          历史记录
        </el-menu-item>
      </el-menu>

      <Crumbs :data ='crumbs'/>
      <router-view></router-view>
    </el-scrollbar>
  </div>
</template>

<script>



  export default {
    components: {

    },
    name: "fireAlarm",
    data() {
      return {
        activeIndex2: '1',
        crumbs: [
          '消防报警系统'
        ]
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        switch (key){
          case '1':
            this.$router.push('/fireAlarm/fireMonitor');this.crumbs = ['消防报警系统','火警监测'];
            break;
          case '2':
            this.$router.push('/fireAlarm/fireHistory');this.crumbs = ['消防报警系统','历史记录'];
            break;
          default:
            alert(key)
        }
      },

    },
    created() {
      //this.$router.push('/fireAlarm/floor3D')
      //this.$router.push('/fireAlarm/waterPump')
    },
    mounted() {

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped='scoped' type="text/less">
  .fireAlarm{
    width:100%;
    height:100%;
    //background:#dedede;
    //overflow: scroll;
    .self-padding{
      padding: 0 0.3rem;
    }


  }

</style>
