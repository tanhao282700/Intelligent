<!--
    头部日期选择
-->
 
<template>
    <div class="timePickerTit">
        <div class="HeadTabBox">
            <div class="HeadTab HeadTab1" @click="deletes()">
                <i class="el-icon-caret-top"></i>
            </div>   
        </div>               
        <div class="timeBox">
            <el-date-picker  
                class="times"             
                v-model="value7s"
                type="date"   
                align = 'center'
                :clearable = "false"                           
                value-format = 'yyyy-M-d'  
                @change = "changes()"                        
                />   
            <span v-text="value7.split('-')[0]+'年'+'      '+value7.split('-')[1]+'月'+value7.split('-')[2]+'日'"></span>
        </div>
        <div class="HeadTabBox">
            <div class="HeadTab HeadTab2" @click="adds()" :class="{'cantTab':cant}">
                <i class="el-icon-caret-bottom"></i>
            </div>   
        </div>                               
    </div>
</template>

<script>

// 封装失败
export default {
  props:['value7'],
  data () {
    return {
        value7s:((new Date()).getFullYear()+'-'+(new Date()).getMonth()+'='+(new Date()).getDate()),
        cant:false
    }
  },
  computed:{
    
  },
  methods:{
    changes(){
         this.$emit('changes',this.value7s);
    },
     deletes(){
         this.$emit('deletes');
        let attrs = this.value7s.split('-');
        if(attrs[2]==1){
            if(attrs[1]==2 ||attrs[1]==4 || attrs[1]==6 ||attrs[1]==8 ||attrs[1]==9 ||attrs[1]==11 ||attrs[1]==1){
                attrs[2]=31;
            }else if(attrs[1]==5 ||attrs[1]==7 || attrs[1]==10 ){
                attrs[2]=30;
            }else if(attrs[1]==3 && Number(attrs[0])%4==0){
                attrs[2]=29;
            }else if(attrs[1]==3 && Number(attrs[0])%4!=0){
                attrs[2]=28;
            }
            if(attrs[1]==1){
                attrs[1] = 12;
                attrs[0] = Number(attrs[0])-1;
            }else{
                attrs[1] = Number(attrs[1])-1;
            }            
        }else{
            attrs[2] = Number(attrs[2])-1;
        }
       
        this.value7s = attrs.join('-');        
     },
     adds(){
         this.$emit('adds');  
         if(this.cant){
            return;
        }
        let attrs = this.value7s.split('-');

        if(((attrs[1]==1 ||attrs[1]==3 || attrs[1]==5 ||attrs[1]==7 ||attrs[1]==8 ||attrs[1]==10 ||attrs[1]==12) && attrs[2]==31)
            ||((attrs[1]==2 ||attrs[1]==6 || attrs[1]==9 ||attrs[1]==11) && attrs[2]==30) 
            ||((attrs[1]==2 && Number(attrs[0])%4==0) && attrs[2]==29)
            ||((attrs[1]==2 && Number(attrs[0])%4!=0) && attrs[2]==28)
        ){
            attrs[2] =1;
            if(attrs[1]==12){
                attrs[1] = 1;
                attrs[0] = Number(attrs[0])+1;
            }else{
                attrs[1] = Number(attrs[1])+1;
            }   
        }else{
            attrs[2] = Number(attrs[2])+1;
        }
        this.value7s = attrs.join('-');       
     }
  },
  created() {
      if(this.value7!==undefined){
          this.value7s = this.value7;
      } 
  },
  mounted() {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped='scoped' type="text/less">
@import '../../../../assets/css/comon.less';
.timePickerTit{
    position: relative;
    display: flex;
    align-items: center; 
    .HeadTabBox{
        .HeadTab{
        width: 0.24rem;
        height: 0.24rem;
        background-color: rgba(59, 137, 249, 0.1);
            box-shadow: 0px 2px 4px 0px 
                rgba(83, 153, 236, 0.19), 
                inset 0px 0px 1px 0px 
                #4a90e2;
            border-radius: 0.02rem;
            color:#3b89f9;
            cursor: pointer;
            text-align: center;
            line-height: 0.24rem;
            &.cantTab{
            color:#255ba9;
                cursor: no-drop; 
                box-shadow:none; 
            }     
        }
        .HeadTab1{
            margin-right: 0.4rem;
        }
        .HeadTab2{
            margin-left: 0.4rem;
        }
        
    }     
    .timeBox{
        position: relative;
        width: 1.84rem;
        overflow: hidden;
        text-align: center;
        .times{
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 89;
            opacity: 0;
            cursor: pointer;
            input{
                height: 100%;
                width: 100%;
                cursor: pointer!important;
            }
        }
        span{
            position: relative;
            z-index: 88;
            font-size: 0.24rem;
            color: #fff;
            }            
        }     
}

</style>
