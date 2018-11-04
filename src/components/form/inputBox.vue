<template>
    <div class = "inputBox">
        <span v-text="label.text" :style="cssStyle"></span>
        <el-input
          :type="inputType"
          class="inputbox"
          :placeholder="placeholder"
          v-model="modelValue"
          :readonly="readonly"
          clearable>
        </el-input>           
    </div>
</template>

<script>
import '../../assets/css/fs_common.css'
// 封装失败
export default {
  props:['inputType','placeholder','label','cssStyle','modelValue','readonly'],
  data () {
    return {
        input1:'',
    }
  },
  computed:{
    
  },
  methods:{
      beFirst(){
          this.value0 = '';
      },
      searchVal(attr,val,pla = '请选择'){
      let lens = attr.length;
      let res = pla;
      for(let i =0 ;i<lens;i++){
        if(attr[i].value == val){
          res = attr[i].label;
        }
      }
      return res;
    },
    change(){
        this.$emit('change', this.value0)
    }
  },
  created() {
    
  },
  mounted() {
    
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped='scoped' type="text/less">
@import '../../assets/css/comon.less';
 .inputBox{
      .inputType{
        display:inline-block;
        width:31.92vw;
        .vh(32);
        border:1px solid #051732;
        border-radius:2px;
      }
  }

</style>
