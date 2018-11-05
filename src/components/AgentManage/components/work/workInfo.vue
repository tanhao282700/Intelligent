<!--
    工单详情
    2018-8-24 
-->
<template>
    <div class="workInfo">    
        <div class="infoTit">
            <span v-if="table.title">{{table.title}}</span>
            <div class="dateBox">
                <TimePickerT 
                    :value7= "value7"
                    :cant  = 'cant'
                    @changes = "changes"
                    @deletes = 'deletes'
                    @adds    = 'adds'
                />
            </div>
        </div>
        <div>
            <div class="tbalHe">
                <div class="btnBox">
                    <div class="jobBoxs">
                        <SelectBox 
                            :options = 'query.types' 
                            :value = "query.type" 
                            :icon="'el-icon-d-caret'"
                            placeholder="类别"
                            @change = 'change1'
                        />
                    </div>
                    <div class="searchBoxs" @click="getUserList">
                        <i class="el-icon-search"></i>
                        <span>筛选</span>
                    </div>   
                </div>
                    
                <ul class="nums">
                    <li v-for="item in table.tabs">
                        <span>{{item.name}}</span>
                        <div class="numss colorY">{{item.num}}</div>
                    </li>
                </ul>   
            </div>
            <div class="tabBoxss">
                <Table 
                    style="width:100%" 
                    v-if="tableData.len"
                    :table = "tableData"
                    @rowClick = "showInfos"
                />    
            </div>           
        </div>
    </div>
</template>

<script>
import TimePickerT from './timePickerTit2';
import SelectBox from '@/components/form/selectBox';
import Table from '@/components/common/table';
import utils from '../../../../assets/js/utils';
export default {
  props:['query','table'],
  components:{
      "TimePickerT":TimePickerT,
      'SelectBox':SelectBox,
      'Table':Table,
  },
  data () {
    return {
       //日期选择
        cant:false,
         jobs:[
            {label:'给排水',value:1},
            {label:'电梯',value:2},
            {label:'变配电',value:3},
            {label:'照明',value:4},
            {label:'暖通',value:5},
            ],
        vJob:-1, 
        names:[
            {label:'白狗汪1',value:1},
            {label:'白狗汪2',value:2},
            {label:'白狗汪3',value:3},
            {label:'白狗汪4',value:4},
            {label:'白狗汪5',value:5},
        ],
        vName:-1,
        tableData:{},
        value7:utils.time(new Date()/1000,5)
    }
  },
  methods:{
    change1(val){ //选择
      this.query.type = val;
    },
    changes(val){
      this.query.time = val;
    }, 
    getUserList(){
        if(this.tableData.data){
            this.$emit('getUserList',{type:this.query.type,date:this.query.time})
        }
    },
    deletes(){
        let attrs = this.value7.split('-');
        if(Number(attrs[1])==1){
          if(Number(attrs[0])>1){
            if(Number(attrs[0]-1)>9){
              attrs[0] = attrs[0]-1;
            }else{
              attrs[0] = '0'+Number(attrs[0]-1);
            }
            if(attrs[0]==1 || attrs[0]==3 || attrs[0]==5 || attrs[0]==7 || attrs[0]==8 || attrs[0]==10 || attrs[0]==12){
              attrs[1]=31;
            }else if(attrs[0]==4 || attrs[0]==6 || attrs[0]==9 || attrs[0]==11){
              attrs[1]=30;
            }else{
              if(utils.time(new Date()/1000,10)%4==0){
                attrs[1]= 29;
              }else{
                attrs[1]= 28;
              }
            }
          }
        }else{
          if((Number(attrs[1])-1)<10){
            attrs[1] = '0'+(Number(attrs[1])-1);
          }else{
            attrs[1] = Number(attrs[1])-1;
          }
        }
        this.value7 = attrs.join('-'); 
      },
      adds(){
        if(this.cant){
            return;
        }
        let attrs = this.value7.split('-');
        if(((attrs[0]==1 ||attrs[0]==3 || attrs[0]==5 ||attrs[0]==7 ||attrs[0]==8 ||attrs[0]==10 ||attrs[0]==12) && attrs[1]==31)
            ||((attrs[0]==4 ||attrs[0]==6 || attrs[0]==9 ||attrs[0]==11) && attrs[1]==30) 
            ||((attrs[0]==2 && Number(attrs[0])%4==0) && attrs[1]==29)
            ||((attrs[0]==2 && Number(attrs[0])%4!=0) && attrs[1]==28)
        ){
            attrs[1] =1;
            if(attrs[0]==12){
                attrs[0] = '01';
                attrs[1] = '01';
            }else{
                if(Number(attrs[0])+1>10){
                  attrs[0] = Number(attrs[0])+1;
                  attrs[1] = '01';
                }else{
                  attrs[0] = '0'+(Number(attrs[0])+1);
                  attrs[1] = '01';
                }
                
            }   
        }else{
            if(Number(attrs[1])+1>9){
              attrs[1] = Number(attrs[1])+1;
            }else{
              attrs[1] = '0'+(Number(attrs[1])+1)
            }
            
        }
        this.value7 = attrs.join('-');    
      }, 
    showInfos(item){
        this.$emit('tableInfos2Show',item);
    }
  },
  created() {
        let listDate = utils.time((new Date())/1000,1);
        listDate = listDate.substring(5,listDate.length)
        this.value7 = listDate;
  },
  watch:{
    table:{
        handler(newval,oldval){
            if(newval){
                this.tableData = newval;
                console.log(newval)
            }
            
        },
        deep:true,
    }
  },
  created(){
  },
  mounted() {
    this.tableData = this.table;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped="" type="text/less"> 
@import '../../../../assets/css/comon.less';
.workInfo{
    height: 100%;
    width: 100%;
    .infoTit{
        width: 100%;
        height:0.5rem;
        background: rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        span{
            position: absolute;
            color: #fff;
            font-size: 16*100/728vh;
            left: 0.2rem;
            .vhTop(17);
            .vh(16);
            .vhLH(16);
        }
    }
    .tbalHe{
        height:0.52rem;
        .vhPT(20);
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        .btnBox{
            position: absolute;
            left: 0;
            .vhTop(20);
            .jobBoxs{
                float: left;
                width: 1.15rem;
                .vh(32);
                background-color: rgba(255, 255, 255, 0.01);
                border-radius: 0.02rem;
                border: solid 0.01rem #1989fa;
                text-align: center;
                margin-left: 0.2rem;
            }
            .searchBoxs{
                float: left;
                margin-left: 0.12rem;
                width: 0.93rem;
                .vh(32);
                .vhLH(32);
                color: #fff;
                font-size: 0.14rem;
                text-align: center;
                cursor: pointer;
                background-image: linear-gradient(0deg, 
                #2772e3 0%, 
                #4b94f9 100%);
                border-radius: 0.02rem;
                i{
                font-size: 0.16rem;
                margin-right: 0.05rem;
                font-weight: 600;
                }
            }       
        }
        .nums{
            overflow: hidden;
            .vhLH(20);
            li{
                float: left;
                margin-right: 0.6rem;
                display: flex;
                align-items: center;
                &:nth-child(3){
                    margin-right: 0;
                }
                span{
                    color: #b5d7ff;
                    font-size: 0.16rem;
                    font-family: PingFangSC-Light;
                    padding-right: 0.16rem;
                    .vhLH(20);
                }
                .numss{
                     font-size: 0.18rem; 
                     .vh(20);
                     .vhLH(20);
                     border-left: 0.02rem solid #4a90e2;
                     padding-left: 0.11rem;
                     &.colorY{
                         color: #f38a00
                     }
                     &.colorR{
                         color: #ed4a4a
                     }                     
                     &.colorG{
                         color: #4ae283
                     }
                }
            }
        }
        
    }
    .tabBoxss{
        height:3rem;
        width: 100%;
        padding-left: 0.20rem;
    }
}

</style>
