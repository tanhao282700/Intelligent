<!--
    工单列表
    2018-8-24 
-->
<template>
    <div class="dealBox">    
        <div class="dealBtn">
            <span @click.stop="update" v-show="isStop">修改</span>
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
        state:'',
        
      },
      isStop:false
    }
  },
  methods:{
    changeStatus(val){
       this.getStatus(val)
      this.$emit('changeStatus',this.radio.radio3,this.btnss.item)
    },
    getStatus(val){
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
          this.state = val.item.now_state;
          if(val.item.now_state=='1'){
            this.radio.radio3 = '启动'
            this.isStop = false;
            this.getStatus(this.radio.radio3)
          }else if(val.item.now_state==2){
            this.radio.radio3='停用';
            this.isStop =true;
            this.getStatus(this.radio.radio3)
          }
        }
      },
      deep:true
    }
  },
  mounted() {
      this.state = this.btnss.item.now_state;
      if(this.btnss.item.now_state=='1'){
        this.radio.radio3 = '启动'
        this.getStatus(this.radio.radio3)
        this.isStop = false;
      }else if(this.btnss.item.now_state==2){
        this.radio.radio3='停用';
        this.isStop = true;
        this.getStatus(this.radio.radio3)
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
      height:0.24rem;
      line-height:0.24rem;
    }
}

</style>
