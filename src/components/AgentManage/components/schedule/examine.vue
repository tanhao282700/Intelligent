<template>
    <div class="examine boxs">     
        <div class="searchBox0">
            <Search @search = 'search'/>
        </div> 
        <div class="listBoxs">
            <el-scrollbar  style="height:100%">
                <ul 
                    v-for="(v,i) in data" 
                    class="examBoxs boxs" 
                    :class="{'examed':v.state!=-1,'examing pointer':v.state==-1}"
                    @click="showInfo(i,v)"
                >
                    <li>
                        <label for="">申请人</label>
                        <span v-text="v.name"></span>
                    </li>
                    <li>
                        <label for="">班次</label>
                        <span v-text="v.time"></span>
                    </li>
                    <li class="margin5">
                        <label for="">换班人</label>
                        <span v-text="v.name2"></span>
                    </li>
                    <li>
                        <label for="">班次</label>
                        <span v-text="v.time2"></span>
                    </li>
                    <img v-show="v.state==0" src="../../../../assets/img/generation/isno.png" alt="">
                    <img v-show="v.state==1" src="../../../../assets/img/generation/isok.png" alt="">
                    <li v-show="v.state==-1" class="btns">
                        <div class="btn btn1" @click="isNo(i,v)">驳回</div>
                        <Lines :hei="30" :top="2" />
                        <div class="btn btn2" @click="isOk(i,v)">同意</div>
                    </li>
                </ul>      
            </el-scrollbar>            
        </div>     
    </div>
</template>

<script>
import Search from '../../../../components/form/searchBox';
export default {
  props:['data'],
  components:{
      'Search':Search
  },
  data () {
    return {
    }
  },
  methods:{
    showInfo(i,v){
        if(v.state!==-1){
            return;
        }
        this.$emit('showInfo',i,v);
    },
     search(val){
         this.$emit('search',val)
        //  console.log(val);
     },
    isNo(i,v){
         this.$emit('isNo',i,v)
    },
    isOk(i,v){
         this.$emit('isOk',i,v)
    },
  },
  created() {
  },
  mounted() {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped="" type="text/less"> 
@import '../../../../assets/css/comon.less';

.examine{
    width: 13.06rem;
    .vh(578);
    display: flex;
    flex-direction: column;
    .searchBox0{
        .vh(70);
        width: 100%;
        .vhPT(20);
        padding-left: 0.2rem;
    }
    .listBoxs{
        .vh(508);
        .vhPT(3);  
        .examBoxs{
            width: 3rem;
            background: rgba(0,0,0,0.25);
            margin-left:0.21rem;
            float: left;
            position: relative;
            .vhPT(10);
            padding-left: 0.15rem;
            .vhMB(21);
            &.examed{
                .vh(121);
            }
            &.examing{
                .vh(170);
            }
            &:hover{
                background: rgba(59,137,249,0.05);
                box-shadow: 0px 4px 10px 0px 
                rgba(83, 153, 236, 0.5), 
                inset 0px 1px 1px 0px 
                rgba(248, 253, 255, 0.15), 
                inset 0px 0px 1px 0px 
                #4a90e2!important;
            }
            &.pointer{
                cursor: pointer;
            }
            li{
                display: flex;
                .vh(24);
                font-size: 0.14rem;
                position: relative;
                z-index: 98;
                label{
                    color: #4f648b;
                    display: inline-block;
                    width: 0.52rem;
                    height: 100%;
                    .vhLH(24);
                }
                span{
                    flex:1;
                    height: 100%;
                    .vhLH(24);
                    color:#93b7e2;
                }
                &.margin5{
                    .vhMT(5);
                }
                &.btns{
                    .vh(34);
                    .vhMT(15);
                    padding-right: 0.15rem;
                    display: flex;
                    .btn{
                        flex:1;
                        text-align: center;
                        .vhLH(32);
                        border-radius: 0.02rem;
                        cursor: pointer;
                        font-size: 0.14rem;                      
                        color:#f9f9f9;
                        border: solid 0.01rem rgba(59, 137, 249, 0.2);
                        background-color: rgba(59, 137, 249, 0.2);  
                        &:active{
                           color:#3b89f9;
                            background-color: rgba(255, 255, 255, 0.01);
                            border-color:#3b89f9; 
                        }
                    }
                    .btn1{
                       margin-right: 0.15rem;                       
                    }
                    .btn2{
                        margin-left: 0.15rem;
                        
                    }
                }
            }
            img{
                position: absolute;
                width: 0.71rem;
                height: 0.57rem;
                right: 0;
                bottom: 0;
                z-index: 99;
            }
        }     
    }
}
</style>
