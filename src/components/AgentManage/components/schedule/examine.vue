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
                    :class="{'examed pointer':v.state!=-1,'examing pointer':v.state==-1}"
                    @click="showInfo(i,v)"
                >
                    <li>
                        <label for="">申请人</label>
                        <span v-text="v.old_truename"></span>
                    </li>
                    <li>
                        <label for="">班次</label>
                        <span v-text="v.olde_workdate+' '+v.oldstarttime+'~'+v.oldendtime"></span>
                    </li>
                    <li class="margin5">
                        <label for="">换班人</label>
                        <span v-text="v.new_truename+' '+v.newstarttime+'~'+v.newendtime"></span>
                    </li>
                    <li>
                        <label for="">班次</label>
                        <span v-text="v.new_workdate"></span>
                    </li>
                    <img v-show="v.state==0" class="examFlag" src="../../../../assets/img/generation/isno.png" alt="">
                    <img v-show="v.state==1" class="examFlag" src="../../../../assets/img/generation/isok.png" alt="">
                    <li v-show="v.state==-1" class="btns">
                        <div class="btn btn1" @click.stop="isNo(i,v)">驳回</div>
                        <Lines :hei="30" :top="2" />
                        <div class="btn btn2" @click.stop="isOk(i,v)">同意</div>
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
        this.$emit('showInfo',v,i);
    },
     search(val){
         this.$emit('search',val)
        //  console.log(val);
     },
    isNo(i,v){
         this.$emit('isNo',v,i)
    },
    isOk(i,v){
         this.$emit('isOk',v,i)
    }
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
    width: 95.6%;
    height:5.48rem;
    display: flex;
    flex-direction: column;
    .searchBox0{
        .vh(70);
        width: 100%;
        .vhPT(20);
        padding-left: 0.2rem;
    }
    .listBoxs{
        height:5.08rem;
        padding-top:0.03rem;  
        .examBoxs{
            width: 3rem;
            background: rgba(0,0,0,0.25);
            margin-left:0.21rem;
            float: left;
            position: relative;
            padding-top:0.1rem;
            padding-left: 0.15rem;
            margin-bottom:0.21rem;
            &.examed{
                height:1.21rem;
            }
            &.examing{
                height:1.7rem;
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
                height:0.24rem;
                font-size: 0.14rem;
                position: relative;
                z-index: 98;
                label{
                    color: #4f648b;
                    display: inline-block;
                    width: 0.52rem;
                    height: 100%;
                    line-height:0.24rem;
                }
                span{
                    flex:1;
                    height: 100%;
                    line-height:0.24rem;
                    color:#93b7e2;
                }
                &.margin5{
                    margin-top:0.05rem;
                }
                &.btns{
                    height:0.34rem;
                    margin-top:0.15rem;
                    padding-right: 0.15rem;
                    display: flex;
                    .btn{
                        flex:1;
                        text-align: center;
                        line-height:0.32rem;
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
