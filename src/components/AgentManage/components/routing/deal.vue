<!--
    工单列表
    2018-8-24 
-->
<template>
    <div class="dealBox">    
        <div class="dealBtn">
            <span @click.stop="update">修改</span>
            <span @click.stop="deletes">删除</span>
            <el-radio-group class="routeRadio" v-model="radio.radio3" @change="changeStatus" :fill="radio.color">
              <el-radio-button label="启动"></el-radio-button>
              <el-radio-button label="停用"></el-radio-button>
            </el-radio-group>
        </div>
    </div>
</template>

<script>
export default {
  props:['btnss'],
  data () {
    return {
      radio:{
        radio3:'启动',
        color:'#4AE283',
        state:''
      }
        
    }
  },
  methods:{
    changeStatus(val){
      switch(val){
        case '启动':
          this.radio.radio3 = '启动';
          this.radio.color = '#4AE283'
          break;
        case '停用':
          this.radio.radio3 = '停用';
          this.radio.color = '#f56c6c';
          break;
      }
      this.$emit('changeStatus',this.radio.radio3,this.btnss.item)
      //return this.radio3;
    },
    update(){
       this.$emit('update',this.btnss.item);
    },
    deletes(){
       this.$emit('deletes',this.btnss.item);
    }
  },
  watch: {
    btnss:{
      handler(val){
        if(val){
        }
      },
      deep:true
    }
  },
  mounted() {
      this.state = this.btnss.item.now_state;
      console.log(this.btnss)
      if(this.btnss.item.now_state=='1'){
        this.radio.radio3 = '启动'
        this.changeStatus(this.btnss.item.now_state)
      }else if(this.btnss.item.now_state==2){
        this.radio.radio3='停用';
        this.changeStatus(this.btnss.item.now_state)
      }
      
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped="" type="text/less"> 
@import '../../../../assets/css/comon.less';
.vw(@val){
  width:@val*100/1366vw;
}
.dealBtn{
    color: #3B89F9;
    span{
        padding: 0.03rem;
        cursor: pointer;
        &:hover{
            color: #3b89f9;
            text-decoration: underline;
        }    
    }
    .routeRadio{
      .vh(24);
      .vhLH(24);
      .vw(80);
    }
}

</style>
