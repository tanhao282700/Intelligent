
<template>
    <div class = "chooseBox2" :class="{'cooseBoxs':type!=undefined}">
        <div class = "chooseBoxIn">
            <span v-text = 'searchVal(options,value0,placeholder)'></span>
            <i class="el-icon-caret-bottom"></i>
        </div>
        <el-select 
            v-model="value0" 
            class = 'chooseBox areaBox' 
            :placeholder="placeholder"
            @change = 'change()'
            >
            <el-option                 
            v-for="item in options"
            :key="item.value"           
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>              
    </div>
</template>

<script>

// 封装失败
export default {
  props:['options','value','placeholder','type'],
  data () {
    return {
        value0:''
    }
  },
  computed:{
    
  },
  methods:{
      beFirst(){
          this.value0 = '';
      },
      searchVal(attr,val,pla = '选择'){
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
    this.value0 = this.value;
  },
  mounted() {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped='scoped' type="text/less">
@import '../../../../assets/css/comon.less';
.popper__arrow{
  left: 0.1rem!important;
}
 .chooseBox2{
    display:inline-block;
    width:100%;
    height:100%;
    position:relative;
    .chooseBoxIn{
      position:absolute;
      width:100%;
      height:100%;
      left:0;
      top:0;
      z-index:11;
      text-align:center;
      display:flex;
      flex-direction:row;
      align-items:center;
      justify-content: center;
      font-size:0.16rem;
      color:#b5d7ff;
      i{
          position: absolute;
          right: 0.01rem;
          top: 0.1rem;
      }
    }
    .chooseBox{
      left:0;
      top:0;
      position:relative;
      width:100%;
      height:100%;
      opacity:0;
      z-index:12;
    }   
  }
.cooseBoxs{
   z-index: 88;
   position: absolute;
   left: 0;
   top: 0;
   opacity: 0;
}
</style>
