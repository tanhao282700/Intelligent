
<!--
    能源系统 历史数据对比
    made by 白富友
    start in 2018-8-7
-->
<template>
  <div class="history boxs"
    v-loading="loading" 
    element-loading-background="rgba(0, 0, 0, 0.5)"
    element-loading-spinner="el-icon-loading"
    element-loading-text="拼命加载中"
  >
    <div class= 'readingTit'>
        <div class="titSeletBox">
            <SelectHead
            :lists = "titHeads"
            @changeHead = "changeHead"
            />
        </div>
    </div>
    <div class="hisBody">
      <div class="hisBox1 boxs boxs2">
        <div class="boxsTit">同环比分析</div>
          <div class="boxsIn">
              <div class="titSeletBox2">
                <SelectHead
                :lists = "titHeads2"
                @changeHead = "changeHead2"
                />               
          </div> 
          <div class="fontb" ><!-- :class="{'fontb2':titHeads[0].state}" -->
            <span @click="changeNowActive('today')" :class="{'active':nowActive == 'today'}">今天</span>
            <span @click="changeNowActive('mon')" :class="{'active':nowActive == 'mon'}">本月</span>
          </div>
          <div class="searchBoxs">
            <div class="searchBoxsIn">
              <div class="timeBox0" style="float:left;">
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
                    unlink-panels
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format = 'MM-dd'
                    >
                  </el-date-picker>
              </div>
              <div class="chooseBox100" v-show = "titHeads2[0].state">
                <SelectBox  :data = 'selectID' @choose = "areaChoose"/>
              </div>             
              <div class="chooseBox200" v-show = "titHeads2[1].state">
                <SelectBox3 :data = 'selectID2' @choose = "areaChoose2"/>
              </div>             
              <el-button class="billBtn2" icon="el-icon-search" @click="search" type="primary">查询</el-button>
            </div>
          </div>
          <div class="echBoxs">
            <div class="tits">
              <div class="tit">环比历史年份平均值</div>
            </div>
            <ul class="echVal0">
              <li v-for = "(v,i) in echList">
                <span class="child1" v-text="v.label"></span>
                <span class="child2" :class="{'colorR':v.val>=0,'colorO':v.val<0}" v-text="v.val+'%'"></span>
                <img v-show = "v.val>0" :src="require('../../../../assets/img/circle/up.png')" alt="">
                <img v-show = "v.val<0" :src="require('../../../../assets/img/circle/down.png')" alt="">        
              </li>
            </ul>
            <div class="tits">
              <div class="tit">同比历史年份平均值</div>
            </div>
            <div class="echBoxIn">
              <p>单位：%</p>
              <EchartBar :echartCirData ="barData" ref="barEcharts"/>
            </div>
          </div>
        </div>
      </div>

       <div class="hisBox2 boxs boxs2 hisBox4" v-show="titHeads[0].state">
          <div class="boxsTit">区域分析</div>
         <div class="boxsIn boxsIn4">
           <EchartCircle :echartCirData = "echartCirData3" ref="echartCirData3" @itemClick = "itemClick"/>
         </div>
      </div> 

      <div class="hisBox2 boxs boxs2" v-show ="!titHeads[0].state">
          <div class="boxsTit">区域分析</div>
         <div class="boxsIn">
           <EchartCircle :echartCirData = "echartCirData" ref="echartCirData" @itemClick = "itemClick"/>
         </div>
      </div>
      <div class="hisBox3 boxs boxs2" v-show ="!titHeads[0].state">
          <div class="boxsTit">设备分析</div>
         <div class="boxsIn">
           <EchartCircle :echartCirData = "echartCirData2" ref= "echartCirData2" @itemClick = "itemClick"/>
         </div>
      </div>
    </div>
    <Dialog wid = "5.76rem" hei = "3.37rem" ref = "dialog" tit = "电力设备分析">
         <EchartCircle :echartCirData = "echartCirDataInfo" @itemClick = "itemClick" ref = "echartInfo"/>
    </Dialog>
  </div>
</template>

<script>

import utils from '@/assets/js/utils';
import SelectHead from '@/components/common/selectHead';
import EchartCircle from '@/components/common/echartCircle0';
import EchartBar from './EchartBar';
import SelectBox from '@/components/common/selectBox';
import SelectBox3 from '@/components/common/selectBoxE';
export default {
   components:{
    'SelectHead':SelectHead,
    'EchartCircle':EchartCircle,
    'SelectBox':SelectBox,
    'EchartBar':EchartBar,
    'SelectBox3':SelectBox3
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
  data () {
    return {
      loading:false,
      selectID:{
        sId:1,
      },
      selectID2:{
          sId:1,
      },
      areaId:0,  //区域ID
      areaId2:0, //那个啥
      barData:{
         id:'echartBar',
          style:{width:'7.63rem',height:208*100/728+'vh'},
          data:[],
           xData:[]   
       },
        nowActive:'mon',
        titHeads:[
            {id:1,tit:'水',state:true},
            {id:0,tit:'电',state:false},  
            {id:2,tit:'气',state:false},      
        ],
        titHeads2:[
            {id:1,tit:'区域',state:true},
            {id:2,tit:'系统',state:false},            
        ],

        echartCirData3:{  //水情况下的 区域分析
          id:'areaCirle3',
          type:'1',    //用于获取子元素数据
          color:['#31dfc9','#4389ef','#ffa87e','#ff7e7e','#ffdd7e','#7343ef'],
          style:{width:'4.83rem',height:250*100/728+'vh'},
          data:[
                // {id:1,value:29, name:'一楼'},
                // {id:2,value:29, name:'二楼'},
                // {id:3,value:29, name:'三楼'},
                // {id:4,value:29, name:'四楼'},
                // {id:5,value:29, name:'五楼'},
                // {id:6,value:29, name:'六楼'},
               ],
        },
        echartCirData:{
          id:'areaCirle',
          type:'1',    //用于获取子元素数据
          color:['#31dfc9','#4389ef','#ffa87e','#ff7e7e','#ffdd7e','#7343ef'],
          style:{width:'4.83rem',height:196*100/728+'vh'},
          data:[
                // {id:1,value:29, name:'一楼'},
                // {id:2,value:29, name:'二楼'},
                // {id:3,value:29, name:'三楼'},
                // {id:4,value:29, name:'四楼'},
                // {id:5,value:29, name:'五楼'},
                // {id:6,value:29, name:'六楼'},
               ],
        },
        echartCirData2:{
          id:'equiCirle2',
          type:'2',
          color:['#31dfc9','#4389ef','#ffa87e','#ff7e7e','#ffdd7e','#7343ef'],
          style:{width:'4.83rem',height:196*100/728+'vh'},
          data:[
                // {id:7,value:19, name:'室内用电'},
                // {id:8,value:49, name:'公共用电'},
                // {id:9,value:29, name:'空调'},
                // {id:10,value:29, name:'电力'},
               ],
        },
        echartCirDataInfo: {
          id:'echartInfo',
          url:'',
          color:['#31dfc9','#4389ef','#ffa87e','#ff7e7e','#ffdd7e','#7343ef'],
          style:{width:'5.76rem',height:196*100/728+'vh',marginTop:'0.35rem'},
          data:[
              {id:0,value:0, name:'数据加载中'},             
          ],       
      },
      value7: '',    //时间区间值
       echList:[
         {label:'日',val:0},
         {label:'月',val:0},
         {label:'季',val:0},
       ],
       data1:null,
       data2:null
    }
  },
  methods:{
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
    //修改系统区域
    areaChoose2(id){
        this.areaId2= id;
    }, 
    search(){
      let id =1;
      if(this.titHeads2[1].state){
        id=2;
      }
      if(id == 2){
          this.getData();
          
        }else if(id==1){
          this.getData2();        
        }
    },
    changeHead(id){  //修改头部1  水电气
      let titHeads = this.titHeads;
        for(let i=0;i<titHeads.length;i++){
          titHeads.state = false;
          if(titHeads.id==id){
            titHeads.state = true;
          }
        }
      this.titHeads = titHeads;
      this.search();
      if(id==1){  //水的时候只有区域分析
        this.getPieF();
      }else{      //电气的时候只有区域分析
        this.getPieS();
        this.getPieF();
      }
     
          
    },
    changeHead2(id){ //修改区域或系统
      if(id == 2){
            if(this.data1==null){
                this.getData();
            }else{
                this.dealData(this.data1);
            }
        }else if(id==1){
            if(this.data2==null){
                this.getData2();
            }else{
                this.dealData(this.data2);
            }
        }
    },
    itemClick(id,type){
      if(type==1){ //区域
        this.getPieF(id,'in');
      }else{
        this.getPieS(id,'in');
      }
     
     
    },
    changeNowActive(type){
      this.nowActive = type;
    },
    getData(){  //格式  2018-08-11   开始时间和结束时间 不传时 为当前年数据
      let data = {ststem_id:this.areaId2};
      for(let i=0;i<3;i++){
        if(this.titHeads[i].state){
          data.type=this.titHeads[i].id
        }
      }
      //以下是选填
      if(this.value7!==''){
         data.time_start =this.value7[0];
         data.time_end =this.value7[1];
      }
      this.loading =true;
      utils.post('energy/history/system',data).then(res=>{
        this.loading =false;
        if(res.code==0){
           
          let data = res.data;
          this.dealData(data,1);
        }else{
          this.$message(res.message);
        }           
      }).catch(err=>{
        this.loading =false;
        console.log(err);
      })
    },
    getData2(){  //格式  2018-08-11   开始时间和结束时间 不传时 为当前年数据
      let data = {floor_id:this.areaId};
      for(let i=0;i<3;i++){
        if(this.titHeads[i].state){
          data.type=this.titHeads[i].id
        }
      }
      //以下是选填
      if(this.value7!==''){
         data.time_start =this.value7[0];
         data.time_end =this.value7[1];
      }
      this.loading =true;
      utils.post('energy/history/floor',data).then(res=>{
        this.loading =false;
        if(res.code==0){
          let data = res.data;
          this.dealData(data,2);
        }else{
          this.$message(res.message);
        }           
      }).catch(err=>{
         this.loading =false;
        console.log(err);
      })
    },
    dealData(data,id){
       if(id==1){
            this.data1 = data;
        }else{
            this.data2 = data;
        }
        let percent = data.percent;
        this.echList[0].val =percent.day;
        this.echList[1].val =percent.month;
        this.echList[2].val =percent.quarter;

        let table = data.table;
        this.barData.xData = table.time;
        this.barData.data = table.data;
        this.$refs.barEcharts.drawLine();
    },
    getPieF(id=this.areaId,type=''){   //楼层的情况下的
      let data = {
        floor_id :id
      };
      for(let i=0;i<3;i++){
        if(this.titHeads[i].state){
          data.type=this.titHeads[i].id
        }
      }
      utils.post('energy/history/pie',data).then(res=>{
        if(res.code==0){
          let data = res.data;
          if(type=='in'){
            this.dealDataIn(data,1);
          }else{
          this.dealData2(data,1);
          } 
        }else{
          this.$message(res.message);
        }           
      }).catch(err=>{
        console.log(err);
      })
    },
    getPieS(id=this.areaId,type=''){   //设备的情况下的
      let data = {
        system_id :this.areaId
      };
      for(let i=0;i<3;i++){
        if(this.titHeads[i].state){
          data.type=this.titHeads[i].id
        }
      }
      utils.post('energy/history/pie2',data).then(res=>{
        if(res.code==0){
          let data = res.data;
          if(type=='in'){
             this.dealDataIn(data,2);
          }else{
            this.dealData2(data,2);
          }
          
        }else{
          this.$message(res.message);
        }           
      }).catch(err=>{
        console.log(err);
      })
    },
    dealDataIn(data,type){ //弹框里面的东东
      let color = ['#31dfc9','#4389ef','#ffa87e','#ff7e7e','#ffdd7e','#7343ef'];
      if(type==2){//设备
        color = ['#95d5ff','#5fc2ff','#1da9ff','#1b9ae8','#0183d3'];
      }
      
       
      let lens = data.length;
      if(lens ==0){
        return;
      }
      this.$refs.dialog.show(); 
      let attrs = [];
      for(let i=0;i<lens;i++){
        if(data[i].value==0){
          continue;
        }
        let objs = {
          id:data[i].id,
          value:data[i].value, 
          name:data[i].name
        };
        attrs.push(objs);
      }
       
      let obj = {
          color:color,
          style:{width:'4.83rem',height:196*100/728+'vh',marginTop:'0.35rem'},
          data:attrs,       
      };
      this.echartCirDataInfo.color = obj.color;
      this.echartCirDataInfo.style = obj.style;
      this.echartCirDataInfo.data = obj.data;
    },
    dealData2(data,type){ //饼状图的数据处理
      let lens = data.length;
      let attrs = [];    
      for(let i=0;i<lens;i++){
        if(data[i].value==0){
          continue;
        }
        let objs = {
          id:data[i].id,
          value:data[i].value, 
          name:data[i].name
        };
        attrs.push(objs);
      }
      
      if(type == 1){
        this.echartCirData.data = attrs;
        this.echartCirData3.data = attrs;
        this.$refs.echartCirData.drawLine();
        this.$refs.echartCirData3.drawLine();
      }else{
        this.echartCirData2.data = attrs;
        this.$refs.echartCirData2.drawLine();
      }
    }

  },
  created() {
    this.getData2();
    this.getPieF();
  },
  mounted() {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped='scoped' type="text/less">
@import '../../../../assets/css/comon.less';
.history{
  width:13.06rem;
  height:79vh;
  margin-top:0.02rem;
  display:flex;
  flex-direction:column;
    .readingTit{
        height:8.24vh;
        overflow: hidden;
        .titSeletBox{
            width: 6rem;
            .vh(48);
            position: relative;
            left: 4.13rem;
            .vhPT(16);
            float: left;
        }       
    }
    .hisBody{
      flex:1;
      .hisBox1{
        float: left;
        width: 7.63rem;
        .vh(490);
        margin-left: 0.2rem;
        position: relative;
        .boxsIn{
          position: relative;
          .titSeletBox2{
            width: 4.8rem;
              .vh(48);
              position: relative;
              left: 1.42rem;
              .vhPT(16);
              float: left;              
          }
          .fontb{
            position: absolute;
            left: 0.26rem;
            top:0.26rem;
            span{
              font-size: 0.15rem;
              color:#fff;
              margin-right: 0.20rem;
              cursor: pointer;
              &.active{
                color: @color-blue;
                cursor: auto;
              }
              &:nth-child(2){
                margin-right:0;
              }
            }
          } 
          .fontb2{
            left: 0.16rem;
            span{
              margin-right: 0.16rem;
            }
          } 
          .searchBoxs{
            width: 100%;
            .vh(49);
            .vhPT(17);
            float: left;
            overflow: hidden;
            .searchBoxsIn{
              .vh(32);
              border-radius: 2px;
              border: solid 1px #3a84ed;
              float: right;
              margin-right: 0.2rem;
              display: flex;
              align-items: center;
              justify-content: flex-end;
              .billBtn2{
                padding-top: 0;
                width: 0.87rem;
                .vh(30);
                .vhLH(30);
                float: right;
                border-radius: 0;
              }
              .chooseBox100{
                float: left;
                width:0.85*3rem;
                .vh(32);
              }
              .chooseBox200{
                float: left;
                width:0.85*2rem;
                .vh(32);
              }
            }
          }
          .echBoxs{
            float: left;
            width: 100%;
            .vh(354);
            .tits{
              width: 100%;
              .vh(32);
              .vhPT(20);
              .tit{
                font-size: 0.12rem;
                width: 100%;
               .vh(12);
               border-left: 2px solid @color-blue;
               .vhLH(12);
               text-indent: 0.17rem;
               color:@color-blue;
              }
            }
            .echVal0{
              .vh(58);
              display: flex;
              overflow: hidden;
              li{
                flex:1;
                margin-left: 0.2rem;
                border-bottom: solid 1px rgba(58, 137, 249, 0.3);
                .vhPT(16);
                .vhLH(42);
                img{
                  width:0.11rem;
                  .vh(15); 
                  .vhMT(12); 
                  float: right;  
                  margin-right: 0.05rem;                               
                }
                span.child1{
                  font-size: 0.14rem;
                  color:@color-blue;   
                  padding-left: 0.11rem;              
                }
                 span.child2{
                   .vhLH(42);
                  display: inline-block;
                  float: right;
                  font-size: 0.14rem;  
                  padding-right: 0.09rem; 
                  &.colorR{
                    color:#ff4f80;
                  } 
                  &.colorO{
                    color:#d0a972;
                  }             
                }
                
              }
            }
            .echBoxIn{
              p{
                display: block;
                .vh(24);
                .vhLH(36);
                text-indent: 0.20rem;
                color: @color-blue;
                font-size: 0.12rem;
              }
            }
          }
        }
        
        
      }
      .hisBox2{
        float: left;
        width: 4.83rem;
        .vh(235);
         margin-left: 0.2rem;
         .vhMB(20);
      }
      .hisBox3{
        float: left;
        width: 4.83rem;
        .vh(235);
         margin-left: 0.2rem;         
      }
      .hisBox4{
        .vh(490);
         .vhMB(0);
         .boxsIn4{
           .vh(450);
           .vhPT(80);
         }
      }
    }
}
 
</style>
