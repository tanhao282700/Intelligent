<!--
    能源系统 全景查看
    made by 白富友
    start in 2018-8-2
-->
<template>
  <div class="energy">
    <Crumbs ref="energy2Crumbs" :data ='crumbs'/>
    <el-tabs class="tabBoxs" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-if="showFirst" name="first" lazy>
                <span slot="label" class="tabItems">
                    全景查看
                </span>
                <LookAll/>
            </el-tab-pane>
            <el-tab-pane v-if="showSecond" name="second" lazy>
                <span slot="label" class="tabItems">
                    能耗情况
                </span>
                <PowerMsg/>
            </el-tab-pane>
            <el-tab-pane v-if="showThird" name="thrid" lazy>
                <span slot="label" class="tabItems">
                    用能预设
                </span>
                <energy-preset2/>
            </el-tab-pane>
        </el-tabs>
  </div>
</template>

<script>

import LookAll from './components/lookAll/lookAll';
import PowerMsg from './components/powerMsg/powerMsg';
//import PowerSet from './components/PowerSet/PowerSet';
import EnergyPreset2 from "./components/powerSet/energyPreset2";

export default {
    components:{
      EnergyPreset2,
      "LookAll":LookAll,
      'PowerMsg':PowerMsg,
      //'PowerSet':PowerSet,
  },
  name: 'energy',
  computed:{
      crumbs(){
        let res =['能源系统',''];
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
      showFirst:false,
      showSecond:false,
      showThird:false,
      activeName: '',
    }
  },
  methods:{
       handleClick(tab, event) {
           let activeName = this.activeName;
            this.$router.replace({ path: `/energy000/fullLook/${activeName}`});

      }
  },
  created() {
      //配合路由 定位页面
      let val = (this.$router.history.current.fullPath).split('/energy000/fullLook')[1];
      if(val==''){
          this.activeName = 'first';
      }else{
          console.log( val.split('/')[1])
          this.activeName = val.split('/')[1];
      }

        if (this.$store.state.sysList[18].role_string[4] != 0) {
          this.showFirst = true;
        } else {
          this.showFirst = false;
        }
        if (this.$store.state.sysList[18].role_string[5] != 0) {
          this.showSecond = true;
        } else {
          this.showSecond = false;
        }
        if (this.$store.state.sysList[18].role_string[6] != 0) {
          this.showThird = true;
        } else {
          this.showThird = false;
        }


        if (this.$store.state.sysList[18].role_string[4] != 0) {
          this.activeName = 'first';
        } else if (this.$store.state.sysList[18].role_string[4] == 0 && this.$store.state.sysList[18].role_string[5] != 0) {
          this.activeName = 'second';
        } else if (this.$store.state.sysList[18].role_string[4] == 0 && this.$store.state.sysList[18].role_string[5] == 0 && this.$store.state.sysList[18].role_string[6] != 0) {
          this.activeName = 'third';
        }
  },
  mounted() {
    this.$refs.energy2Crumbs.$el.style.marginTop = this.$parent.$el.children[0].children[0].offsetHeight+'px';
    //   console.log(this.$refs.energy2Crumbs.$el.style.marginTop='100px')
    // console.log(this.$parent.$el.children[0].children[0].offsetHeight)
    //this.$refs.energy2Crumbs.children[0].style.marginTop = (this.$parent.$el.children[0].children[0].offsetHeight+'px');
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
  }

</style>
