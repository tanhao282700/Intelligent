
<!--
    按钮组件
    made by 白富友
    start in 2018-8-9
-->
<template>
  <div class="btnBoxss">
       <span :style = "{color:color}" v-text="html">
        </span>
  </div>
</template>

<script>
import utils from '../../../../assets/js/utils';

export default {
    props: ["btnss"],
  data () {
    return {
      color:'#307ae7',
      html:'',
    }
  },
  methods:{
    render (){
        let html = 'bbb';
        let color = '#307ae7';
        switch(Number(this.btnss.level)){
            case 0:
                html = '提示';
            break;
            case 1:
                html = '预警';
                color = '#fbc87f';
            break;
            case 2:
                html = '告警';
                color = '#fe6a7d';
            break;
        } 
        this.html = html;
        this.color = color;           
    }
  },
  created() {
     this.render();
  },
  mounted() {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped='scoped' type="text/less">
@import '../../../../assets/css/comon.less';


</style>
