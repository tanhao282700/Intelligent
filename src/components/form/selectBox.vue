/*
选择框写法：chooseBox2000盒子定宽高
<div class = "chooseBox2000">
    <SelectBox
        :options='areasOptions'
        :value = 'valueArea'
        placeholder = '选择区域'
        @change = "change0"
    />
</div>

change0(value0){
    this.valueArea = value0;
},
*/  
<template>
    <div class = "chooseBox2">
        <div class = "chooseBoxIn">
            <span v-text = 'searchVal(options,value0,placeholder)'></span>
            <i class="el-icon-caret-bottom" style="padding-left:0.02rem;"></i>
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
  props:['options','value','placeholder'],
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
    this.value0 = this.value;
  },
  mounted() {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped='scoped' type="text/less">
@import '../../assets/css/comon.less';
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
    //   text-align:center;
    //   display:flex;
    //   flex-direction:row;
    //   align-items:center;
      line-height:0.12rem;
      font-size:0.12rem;
      color:#fff;
    //   justify-content: center;
      span{
          display: inline-block;
          float: left;
          padding-left: 0.12rem;
          position: relative;
          top: 50%;
          transform: translateY(-0.06rem);
          z-index: 11;
      }
      i{
          float: right;
          right: 0.10rem;
          position: absolute;
          top: 50%;
          transform: translateY(-0.06rem);
           z-index: 11;
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

</style>
