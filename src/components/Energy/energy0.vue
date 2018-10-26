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
                {id:1,name:'全景查看',route:'/energy/allViews'},
                {id:2,name:'用能分析',route:'/energy/analysis'},
                {id:3,name:'三表远抄',route:'/energy/metersRead'},
                {id:4,name:'用能预设',route:'/energy/preset'},
                {id:5,name:'用能报表',route:'/energy/report'}
            ]
        }
    }
  },
  methods:{
  },
  created() {

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
