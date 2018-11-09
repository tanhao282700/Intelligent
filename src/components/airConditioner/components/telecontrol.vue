<!--
    空调系统 远程控制
    made by 胡永福
    start in 2018-9-17
-->
<template>
  <div>
    <div class="tabsDomBox0 h-paddingTop">
      <div class="navCrumbs"><p @click="toHome">首页</p> > 空调系统 > <span>远程控制</span></div>
    </div>
    <div class="telecontrol">
      <el-tabs class="tabBoxs" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane name="first">
          <span slot="label" class="tabItems">{{first}}</span>
          <cold-source-station ref="first" />
        </el-tab-pane>
        <el-tab-pane name="second">
          <span slot="label" class="tabItems">{{second}}</span>
          <air-conditioner-end ref="second" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>




  import ColdSourceStation from "./telecontrol/coldSourceStation";
  import AirConditionerEnd from "./telecontrol/airConditionerEnd";
  import utils from "../../../assets/js/utils";
  export default {
    components: {
      AirConditionerEnd,
      ColdSourceStation

    },
    name: "telecontrol",
    data() {
      return {
        activeName: 'first',
        first:'冷源站',
        second:'空调末端',
      }
    },
    methods: {
      //获取系统名称
      getSysName(sys_id=2){
        let that = this;
        let config = {
          sys_menu_id:sys_id
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.get('/hvac_pc/pc/index/sys', config, headers).then(res => {
          let data = res.data;
          console.log('获取系统名称', config, res);
          if (data.code == 0) {
            this.first = data.data[0].title;
            this.second = data.data[1].title;
            this.firstId = data.data[0].id;
            this.secondId = data.data[1].id;

          } else {
            this.$message(data.message);
          }
        })
        /*let obj = {
          sys_menu_id:sys_id
        };
        utils.post('airConditioner/index/sys',obj).then(res=>{
          console.log('获取系统名称',obj,res);
          if (res.code==0){
            this.first = res.data[0].title;
            this.second = res.data[1].title;
            this.firstId = res.data[0].id;
            this.secondId = res.data[1].id;

          } else {

            this.$message(res.message);
          }
        }).catch(err=>{
          this.$message(err);
        })*/
      },
//tab选项卡切换
      handleClick(tab, event) {
        console.log(tab.index);
        if (tab.index == 0){
          this.$refs.second.removeMessageEvent();
        } else if (tab.index == 1) {
          this.$refs.first.removeMessageEvent();
        }
      },
      toHome(){
        this.$router.replace({ path: '/home', params: { isLogin: true} });
      }
    },
    created() {
      //this.getSysName();
      this.first = this.$store.state.sysList[1].son_list[0].sys_menu_title;
      this.second = this.$store.state.sysList[1].sys_menu_title;
    },
    mounted() {

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">

  @import '../../../assets/css/tabs.less';
  .telecontrol{
    width: 100%;
    padding: 0 0.28rem;

    .el-tabs__content{
      overflow: visible;
    }
  }

</style>
