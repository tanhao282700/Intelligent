<template>
  <div class="energyBase autoComponent">
    <SysHead :datas = "sData"/>
    <div class="energyBody">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>

import SysHead from '@/components/common/sysHead';

export default {
    components:{
      "SysHead":SysHead
  },
  name: 'energyBase',

  data () {
    return {
      activeName: 'first',
      sData:{
            id:2,
            lists:[

            ]
        }
    }
  },
  methods:{
  },
  created() {
    if(this.$store.state.sysList[2].role_string[0]!=0){
      this.sData.lists.push({id:1,name:'全景查看',route:'/energy/allViews'})
    }
    if(this.$store.state.sysList[2].role_string[1]!=0){
      this.sData.lists.push({id:2,name:'用能分析',route:'/energy/analysis'})
    }
    if(this.$store.state.sysList[2].role_string[2]!=0 || this.$store.state.sysList[2].role_string[5]!=0||this.$store.state.sysList[2].role_string[6]!=0){
      this.sData.lists.push({id:3,name:'三表远抄',route:'/energy/metersRead'})
    }
    if(this.$store.state.sysList[2].role_string[4]!=0){
      this.sData.lists.push({id:4,name:'用能预设',route:'/energy/preset'})
    }
    if(this.$store.state.sysList[2].role_string[3]!=0||this.$store.state.sysList[2].role_string[7]!=0||this.$store.state.sysList[2].role_string[8]!=0||this.$store.state.sysList[2].role_string[9]!=0){
      this.sData.lists.push({id:5,name:'用能报表',route:'/energy/report'})
    }
  },
  mounted() {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped='scoped' type="text/less">
@import '../../assets/css/tabs.less';
  .energyBase{
      width:100%;
      height:100%;
      display: flex;
      flex-direction: column;
      .energyBody{
          flex:1;
      }
  }

</style>
