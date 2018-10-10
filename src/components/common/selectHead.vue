<!--
    能源系统 选择框
    made by 白富友
    start in 2018-8-7
-->
<template>
  <ul class="titHead">
        <li v-for="(v,i) in titHeads" @click="changeHead(i,v.id)">
            <div class="isActive" v-show="v.state"></div>
            <div v-text="v.tit" class = "titBtn" :class = "{'acitve':v.state}"></div>
            <div v-if = "i!=(titHeads.length-1)" class = "liLine">
            <span class = 'lineTop'></span>
            <span class = 'lineBot'></span>
            </div>                           
        </li>
    </ul>
</template>

<script>
export default {
  props:['lists'],
  data () {
    return {
         titHeads:[] 
    }
  },
  methods:{    
     changeHead(index,id){
      let attrs = [];
      let titHeads = this.titHeads;
      if(titHeads[index].state){
        return;
      }
      let len = titHeads.length;
      for(let i=0;i<len;i++){
        let obj = titHeads[i];
        obj.state = false;
        if(index == i){
          obj.state = true;
        }
        attrs.push(obj);
      }
      this.$emit('changeHead',id);
    },
  },
  created() {
      this.titHeads = this.lists;
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped="" type="text/less">
@import '../../assets/css/comon.less';
    .titHead{
      width:100%;
      height:100%;
      border-radius:0.02rem;
	  border: solid 0.01rem #1989fa;
      display:flex;
      li{
        flex:1;
        display:flex;
        align-items: center;
        position: relative;
        .titBtn{
          flex:1;
          text-align:center;
          line-height:0.16rem;
          color: #a7a7a7;
          font-size:0.16rem;
          cursor:pointer;
          &.acitve{
              cursor:auto;
            color: @color-blue;
            font-weight:bold;
          }
        }
        .isActive{
          background-color: #000000;
	    opacity: 0.2;
          position: absolute;
          left:0;
          top:0;
          width: 100%;
          height: 100%;
        }
        .liLine{
            display:block;
            width:0.01rem;
            height:0.3rem;
            margin-top:0.02rem;    
          span.lineTop{
            .gradientT(rgba(73,143,226,0.88),rgba(73,143,226,0));
            display:block;
            width:100%;
            height:50%;        
          } 
          span.lineBot{
            .gradientT(rgba(73,143,226,0),rgba(73,143,226,0.88));
            display:block;
            width:100%;
            height:50%;         
          } 
        }
          
      }
      
    }
</style>
