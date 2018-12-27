<!--
    能源系统 运行情况
    made by 白富友
    start in 2018-8-2
-->
<template>
  <div class="energy">
    <Crumbs ref="energy2Crumbs2" :data ='crumbs'/>
    <el-tabs class="tabBoxs" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-if="showFirst" name="first" lazy>
                <span slot="label" class="tabItems">
                    实时读数
                </span>
                <ReadingNum/>
            </el-tab-pane>
            <el-tab-pane v-if="showSecond" name="second" lazy>
                <span slot="label" class="tabItems">
                    历史数据对比
                </span>
                <History/>
            </el-tab-pane>
            <el-tab-pane v-if="showThird" name="thrid" lazy>
                <span slot="label" class="tabItems">
                    用能账单
                </span>
                <PowerBill/>
            </el-tab-pane>
        </el-tabs>
  </div>
</template>

<script>

import ReadingNum from './components/readingNum/readingNum';
import history from './components/history/history';
import PowerBill from './components/powerBill/powerBill';


export default {
    components:{
      "ReadingNum":ReadingNum,
      'History':history,
      'PowerBill':PowerBill,
  },
  name: 'energy',
  computed:{
      crumbs(){
        let res =['能源系统','运行情况'];
        switch(this.activeName){
            case 'first':
                res.push('实时读数');
            break;
            case 'second':
                res.push('历史数据对比');
            break;
            case 'thrid':
                res.push('用能账单');
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
            this.$router.replace({ path: `/energy000/runMsg/${activeName}`});
      }
  },
  created() {
      //配合路由 定位页面
      let val = (this.$router.history.current.fullPath).split('/energy000/runMsg')[1];
      if(val==''){
          this.activeName = 'first';
      }else{
          console.log( val.split('/')[1])
          this.activeName = val.split('/')[1];
      }

      if (this.$store.state.sysList[18].role_string[7] != 0) {
        this.showFirst = true;
      } else {
        this.showFirst = false;
      }
      if (this.$store.state.sysList[18].role_string[8] != 0) {
        this.showSecond = true;
      } else {
        this.showSecond = false;
      }
      if (this.$store.state.sysList[18].role_string[9] != 0) {
        this.showThird = true;
      } else {
        this.showThird = false;
      }


      if (this.$store.state.sysList[18].role_string[7] != 0) {
        this.activeName = 'first';
      } else if (this.$store.state.sysList[18].role_string[7] == 0 && this.$store.state.sysList[18].role_string[8] != 0) {
        this.activeName = 'second';
      } else if (this.$store.state.sysList[18].role_string[7] == 0 && this.$store.state.sysList[18].role_string[8] == 0 && this.$store.state.sysList[18].role_string[9] != 0) {
        this.activeName = 'third';
      }

  },
  mounted() {
    this.$refs.energy2Crumbs2.$el.style.marginTop = (this.$parent.$el.children[0].children[0].offsetHeight+'px');
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
