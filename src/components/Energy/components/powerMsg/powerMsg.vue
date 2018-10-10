<!--
    能源系统 用能情况
    made by 白富友
    start in 2018-8-2
-->
<template>
  <div class="powerMsg boxs"
    v-loading="loading" 
    element-loading-background="rgba(0, 0, 0, 0.5)"
    element-loading-spinner="el-icon-loading"
    element-loading-text="拼命加载中">
      <div class="powerMsgTit">
        <div class="titHeadBox">
            <SelectHead
              :lists = "titHeads"
              @changeHead = "changeHead"
            />
        </div>
      </div>
      <div class='powerMsgBody'>
        <div class="powerMsgBodyL">
          <div class = "ranking" v-for = "(v,i) in powerRanks" :class = "{'ranking0':i==0}">
            <div class = "rankingTit" >
              <span v-text = "v.tit1" class = "rankingTit1" ></span>
              <span v-text = "v.tit2" class = "rankingTit2" ></span>
            </div>
            <ul class = "rankingLists boxs">
                <li v-for = "(v0,i0) in v.lists">
                    <div class = "rListBox" :class ="{'rListBox0':i0==(v.lists.length-1)}">
                      <span class = "rListS1" v-text = "'0'+(i0+1)" :class = "showColor(i0)"></span>
                      <span class = "rListS2" v-text = "v0.tit"></span>
                      <span class = "rListS3" v-text = "v0.val" :class = "showColor(i0)"></span>
                      <span class = "rListS4" v-text = "v.util"></span>
                    </div>                  
                </li>
            </ul>
          </div>
        </div>
        <div class="powerMsgBodyR">
          <div class="powerSearch">
            <div style='float:right' class = "searchBox">
            <!--时间区间选择-->
              <div class = "timeBox0" style='float:left'>
                <div class ="timeVal">
                  <span class ="timeValIn">
                    <span v-text = 'value7s[0]'></span>
                    <i class="el-icon-caret-bottom"></i>
                  </span>
                  <span style="color:#fff">--</span>
                  <span class ="timeValIn">
                    <span v-text = 'value7s[1]'></span>
                    <i class="el-icon-caret-bottom"></i>
                  </span>
                </div>
                <el-date-picker
                  class = 'timeBox'
                  v-model="value7"
                  type="daterange"
                  align="right"                 
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format = 'MM-dd'
                  
                  >
                </el-date-picker>  
              </div>
              <div class="chooesBoxss" style='float:left'>
                <SelectBox :data = 'selectID' @choose = "areaChoose" ref="SelectBoxs"/> 
              </div>                                           
              <!--查询选择-->
              <el-button class="chooseBtn" @click="searchs"  type="primary" icon="el-icon-search">查询</el-button>                          
            </div>
          </div>
          <div  class="powerBodyEarch boxs">
            <LineEcharts :datas ='lineEcharts2'  ref = "lineEcharts2"/>
          </div>
        </div>
      </div>
  </div>
</template>

<script>

import utils from "@/assets/js/utils.js";
import SelectBox from '@/components/common/selectBox';
import SelectHead from '@/components/common/selectHead';
import LineEcharts from '@/components/common/lineEcharts2';
export default {
  components:{
    'SelectBox':SelectBox,
    'SelectHead':SelectHead,
    'LineEcharts':LineEcharts
  },
  data () {
    return {
      loading:false,
      selectID:{
        sId:1,
      },
      areaId:0,  //区域ID
      titHeads:[
        {id:1,tit:'水',state:true},
        {id:0,tit:'电',state:false},
        {id:2,tit:'气',state:false},
      ],
      powerRanks:[
        {
          tit1:'耗能较去年同期耗能差值排名',
          tit2:'超出TOP3',
          util:'',
          lists:[]
        },
        {
          tit1:'耗能较去年同期耗能差值排名',
          tit2:'节约TOP3',
          util:'',
          lists:[]
        },
        {
          tit1:'耗能较去年同期耗能差值排名',
          tit2:'当前TOP3',
          util:'',
          lists:[]
        },
      ],
      value7: '',    //时间区间值
      lineEcharts2 :{
          id:'lineEchart00',
          type:'shui',
          unit:'m³',
          title:'能耗对比',
          // titShow:false,
          style:{width:'7.75rem',height:450*100/728+'vh'},
          list:[
             {
              name:'2016',
              data:[],       
            },
             {
              name:'2017',
              data:[],       
            },
            {
              name:'2018',
              data:[],       
            },         
          ]
        },        
    }
  },
  computed:{
    value7s(){
      let res = ['开始时间','结束时间'];
      if(this.value7!=''){
        res  =[this.timeDeal(this.value7[0]),this.timeDeal(this.value7[1])];
      }
      return res;
    },
    
  },
  methods:{
    searchs(){
      this.getData();
    },
    timeDeal(time){
      let res = '';
      let attrs = time.split('-');
      res = attrs[0]+'月'+attrs[1]+'日';
      return res;
    },  
    //修改区域
    areaChoose(id){
        this.areaId= id;
    },  
    changeHead(id){
      // console.log(id);
      let titHeads = this.titHeads;
      for(let i=0;i<titHeads.length;i++){
        titHeads.state = false;
        if(titHeads.id==id){
          titHeads.state = true;
        }
      }
      this.titHeads = titHeads;

      this.areaId =-1;
      this.value7 = '';
      this.$refs.SelectBoxs.befirst();
      this.getData();
    },
    showColor(index){
      let res = '';
      switch(index){
        case 0:
          res = 'red0';
        break;
        case 1:
          res = 'orange0';
        break;
        case 2:
          res = 'yellow0';
        break;
      };
      return res;
    },
    getFloors(){
      let data = {'sys_menu_id':1,floor_id:0};
       utils.post('currency/floor',data).then(res=>{
        // console.log(res,111)
        if(res.code==0){
           
        }else{
          this.$message(res.message);
        }           
      }).catch(err=>{
        console.log(err);
      })
    },
    getData(){  //格式  2018-08-11   开始时间和结束时间 不传时 为当前年数据
      let data = {'sys_menu_id':1,floor_id:this.areaId};
      for(let i=0;i<3;i++){
        if(this.titHeads[i].state){
          data.type=this.titHeads[i].id
        }
      }
      //以下是选填
      if(this.value7!==''){
        // console.log(this.value7);
        let years = (new Date()).getFullYear();
         data.time_start =years+'-'+ this.value7[0]+' 00:00:00';
         data.time_end = years+'-'+ this.value7[1]+' 00:00:00';
      }
      this.loading =true;
      utils.post('energy/powerMsg',data).then(res=>{
        this.loading =false;
        if(res.code==0){
           
          let data = res.data;

            let utils = 'm³';
            for(let i=0;i<3;i++){
              if(this.titHeads[i].state&&this.titHeads[i].id==0){
                utils = 'kw/h';
              }
            }
            this.powerRanks[0].util = utils;
            this.powerRanks[1].util = utils;
            this.powerRanks[2].util = utils;
            this.lineEcharts2.unit = utils;
            this.powerRanks[0].lists = [];
            this.powerRanks[1].lists = [];
            this.powerRanks[2].lists = [];
            
            for(let i=0;i<3;i++){
              let obj1 = {
                tit:data.rank.exceed[i].name,
                val:data.rank.exceed[i].value
              };
              this.powerRanks[0].lists.push(obj1);

              let obj2 = {
                tit:data.rank.now[i].name,
                val:data.rank.now[i].value
              };
              this.powerRanks[1].lists.push(obj2);

              let obj3 = {
                tit:data.rank.save[i].name,
                val:data.rank.save[i].value
              };
              this.powerRanks[2].lists.push(obj3);
            }
            let table  = data.table;
            let attr = [];
            for(let key in table){
              if(key == 'time'){
                continue;
              }
              let attrs = [];
              let lenss = table[key].length;
              for(let i=0;i<lenss;i++){
                attrs.push(table[key][i].value);
              }
              let objs = {
                name:key+'',
                data:attrs
              }
              attr.push(objs);
            }
            this.lineEcharts2.list = attr;
            this.$refs.lineEcharts2.drawLine();
        }else{
          this.$message(res.message);
        }           
      }).catch(err=>{
          this.loading =false;
        console.log(err);
      })
    }
  },
  created() {
    this.getData();
    // this.getFloors();
  },
  mounted() {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped='scoped' type="text/less">
@import '../../../../assets/css/comon.less';
.red0{
  color:@color-red;
}
.orange0{
  color:@color-orange;
}
.yellow0{
  color:@color-yellow;
}
.searchBox{
  .vh(32);
  // height:0.32rem;
  // margin-top:0.12rem;
  overflow:hidden;
  border-radius: 0.02rem;
	border: solid 1px #3a84ed;
  .chooseBox2000{
    display:inline-block;
    width:0.85rem;
   .vh(32);
    overflow:hidden;
    float: left;
  }
  
  .chooseBtn{
    overflow:hidden;
    display:inline-block;
    .vh(32);
    .vhLH(32);
    padding:0 0.2rem;
    font-size:0.12rem;
    background:@color-blue;
    font-weight:bold;
    border-radius:0;
    float: right;
    margin: 0;
  }
}


.powerMsg{
  width:13.06rem;
  height:79vh;
  margin-top:0.02rem;
  display:flex;
  flex-direction:column;
  .powerMsgTit{
    height:8.79vh;
    width:100%;
    .titHeadBox{
      position:relative;
      left:50%;
      // top:0.16rem;
      .vhTop(16);
      width:6rem;
      height:56.25%;
      border-radius:0.04rem;
	    // border: solid 0.01rem #1989fa;
      transform:translateX(-3rem);
      display:flex;
      li{
        flex:1;
        display:flex;
        .titBtn{
          flex:1;
          text-align:center;
          line-height:4.944vh;
          color: #a7a7a7;
          font-size:0.16rem;
          cursor:pointer;
        }
        .isActive{
          background-color: #000000;
	        opacity: 0.2;
          cursor:auto;
          color: @color-blue;
          font-weight:bold;
        }
        .liLine{
            display:block;
            width:0.01rem;
            // height:0.3rem;
            .vh(30);
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
  }
  .powerMsgBody{
    height:70.21vh;
    width:100%;
    .powerMsgBodyL{
      height:100%;  
      width:4.8rem;
      padding-left:0.2rem;
      float:left;
      .ranking{
        width:4.5rem;
        height:27.5%;
        margin-top:3.676%;
        display:flex;
        flex-direction:column;
        .rankingTit{
          height:0.24rem;
          font-size:0.12rem;
          display:flex;
          padding-right:0.1rem;
          .rankingTit1{
            color:@color-blue;
          }
          .rankingTit2{
            flex:1;
            text-align:right;
            color:#fff;
          }
        }
        .rankingLists{
          display:flex;
          flex-direction:column;
          flex:1;
          background:rgba(0, 0, 0, 0.25);
          li{
            flex:1;
            padding-left:0.2rem;
            padding-right:0.2rem;
            display:flex;
            .rListBox{
              flex:1;
              border-bottom:solid 0.01rem rgba(58, 137, 249, 0.3);
              display:flex;
              align-items:center;
              span{
                display:inline-block;
                font-family: PingFangSC-Regular;
                font-weight:normal;
              }
              .rListS1{
                width:0.44rem;
              }
              .rListS2{
                flex:1;
                color:#fff;
              }
              .rListS3{
                text-align:right;
              }
              .rListS4{
                width:0.50rem;
                text-align:right;
                color:@color-blue;
              }
            }
            .rListBox0{
              border-bottom:0;
            }
          }
        }
      }  
      .ranking0{
        margin-top:5.147%;
      } 
    }
    .powerMsgBodyR{
      float :left;
      height:100%; 
      width:7.85rem;
      padding-left:0.1rem;
      display:flex;
      flex-direction:column;
      .powerSearch{
        .vh(32);
        width:100%;
        align-items:right;
        .timeBox0{
          height: 100%;
          span{
           .vhLH(31); 
          }
          
        }
        .chooesBoxss{
          width: 2.8rem;
          height: 100%;
        }
      } 
      .powerBodyEarch{
        flex:1;
        margin-top:0.14rem;
        margin-bottom:0.21rem;
      }      
    }
  }
}
</style>
