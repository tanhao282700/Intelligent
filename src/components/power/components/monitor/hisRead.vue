<!--
    变配电系统 历史读数
    made by 胡永福
    start in 2018-9-5
-->
<template>
  <div class="hisRead">
    <div class="tabHead">
      <el-tabs class="tabBoxs" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane name="first">
          <span slot="label" class="tabItems" style="font-size: 0.14rem">低压侧</span>
          <low-pressure/>
        </el-tab-pane>
        <el-tab-pane name="second">
          <span slot="label" class="tabItems" style="font-size: 0.14rem">高压侧</span>
          <high-pressure/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>



  import LowPressure from "./lowPressure";
  import HighPressure from "./highPressure";
  export default {
    components: {
      HighPressure,
      LowPressure

    },
    name: "hisRead",
    data() {
      return {
        activeName: 'first',
      }
    },
    methods: {
      //tab选项卡切换
      handleClick(tab, event) {
        console.log(tab.index);
      },
    },
    created() {

    },
    mounted() {

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">
  @import '../../../../assets/css/tabs.less';
  @import '../../../../assets/css/common.css';
  @import '../../../../assets/css/comon';
  .hisRead{
    width: 13.06rem;
    .vh(578);
    background-color: transparent;
    box-shadow: 0px 4px 10px 0px
    rgba(73, 143, 226, 0.22),
    inset 1px 1px 2px 0px
    rgba(248, 253, 255, 0.15),
    inset 0px -1px 1px 0px
    #498fe2;
    border-radius: 4px;
    .tabHead{
      width: 13.06rem;
      .vh(44);
      background-color: rgba(0,0,0,0.25);
      padding: 0 0.2rem;
    }
  }
</style>
