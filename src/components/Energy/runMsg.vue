<!--
    能源系统 运行情况
    made by 白富友
    start in 2018-8-2
-->
<template>
  <div class="energy">
    <Crumbs :data ='crumbs'/>
    <el-tabs class="tabBoxs" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane name="first">
                <span slot="label" class="tabItems">
                    实时读数
                </span>
                <ReadingNum/>
            </el-tab-pane>
            <el-tab-pane name="second" >
                <span slot="label" class="tabItems">
                    历史数据对比
                </span>
                <History/>
            </el-tab-pane>
            <el-tab-pane name="thrid" >
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
      activeName: 'first',
    }
  },
  methods:{
       handleClick(tab, event) {
           let activeName = this.activeName;
            this.$router.replace({ path: `/energy/runMsg/${activeName}`});
           
      }
  },
  created() {
      //配合路由 定位页面
      let val = (this.$router.history.current.fullPath).split('/energy/runMsg')[1];
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
  }

</style>
