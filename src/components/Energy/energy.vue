<!--
    能源系统 全景查看
    made by 白富友
    start in 2018-8-2
-->
<template>
  <div class="energy componentPaddingTop">
    <Crumbs :data ='crumbs'/>
    <el-tabs class="tabBoxs" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane name="first">
                <span slot="label" class="tabItems">
                    全景查看
                </span>
                <LookAll/>
            </el-tab-pane>
            <el-tab-pane name="second" >
                <span slot="label" class="tabItems">
                    能耗情况
                </span>
                <PowerMsg/>
            </el-tab-pane>
            <el-tab-pane name="thrid" >
                <span slot="label" class="tabItems">
                    用能预设
                </span>
                <PowerSet/>
            </el-tab-pane>
        </el-tabs>
  </div>
</template>

<script>

import LookAll from './components/lookAll/lookAll';
import PowerMsg from './components/powerMsg/powerMsg';
import PowerSet from './components/PowerSet/PowerSet';

export default {
    components:{
      "LookAll":LookAll,
      'PowerMsg':PowerMsg,
      'PowerSet':PowerSet,
  },
  name: 'energy',
  computed:{
      crumbs(){
        let res =['能源系统','全景查看'];
        switch(this.activeName){
            case 'first':
                res.push('全景查看');
            break;
            case 'second':
                res.push('能耗情况');
            break;
            case 'thrid':
                res.push('用能预设');
            break;
        }
        return res;
    }
  },
  data () {
    return {
      activeName: 'first',
    }
  },
  methods:{
       handleClick(tab, event) {
           let activeName = this.activeName;
            this.$router.replace({ path: `/energy/fullLook/${activeName}`});

      }
  },
  created() {
      //配合路由 定位页面
      let val = (this.$router.history.current.fullPath).split('/energy/fullLook')[1];
      if(val==''){
          this.activeName = 'first';
      }else{
          console.log( val.split('/')[1])
          this.activeName = val.split('/')[1];
      }
  },
  mounted() {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped='scoped' type="text/less">
@import '../../assets/css/tabs.less';
  .energy{
      width:100%;
      height:100%;
      .tabBoxs{
          padding-left:2.489vw;
      }
      height:100%;
      width:100%;
      background:url('../../assets/img/fullBg.png') no-repeat center;
      background-size:100% 100%;
  }

</style>
