
<!--
    按钮组件
    made by 白富友
    start in 2018-8-9
-->
<template>
  <div class="btnBoxss">
        <i class="el-icon-circle-plus-outline btns" @click="add"></i>
        <i class="el-icon-remove-outline btns" @click="del"></i>
  </div>
</template>

<script>
import utils from '../../../../assets/js/utils';

export default {
    props: ["btnss"],
  data () {
    return {
      
    }
  },
  methods:{
    add(){
        this.$emit('addss',this.btnss.id);
    },
    del(){
        this.$emit('delss',this.btnss.id);
    },
  },
  created() {

  },
  mounted() {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped='scoped' type="text/less">
@import '../../../../assets/css/comon.less';
.btnBoxss{
  display: flex;
  align-items: center;
  .btns{
    width: 0.2rem;
    height: 0.2rem;
    color: #008aff;
    margin:0 0.06rem;
    cursor: pointer; 
  }
}

</style>
