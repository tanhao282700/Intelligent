<!--
    能源系统 用能预设
    made by 白富友
    start in 2018-8-2
-->
<template>
  <div class="powerSet boxs" 
    v-loading="loading" 
    element-loading-background="rgba(0, 0, 0, 0.5)"
    element-loading-spinner="el-icon-loading"
    element-loading-text="拼命加载中"
  >
    <div class= 'powerSetTit'>
      <div class ='timeBox'>
        <el-date-picker
            v-model="years"
            @change = 'isChange'
            type="year"
            placeholder="请选择年份">
        </el-date-picker>
      </div> 
      <el-button class="btns" type="primary" icon="el-icon-search"  @click = "isSearch">搜索</el-button> 
      <el-button class="btns" type="success" icon="el-icon-edit" v-show="!isChangeing" @click = " openChange">编辑</el-button>  
      <el-button class="btns" type="success" icon="el-icon-third-baocun" v-show="isChangeing" @click = "changeOk()">完成</el-button>  
      <span class = "timeBoxss">
        当前日期:
        <span v-text="times"></span>
      </span>     
    </div> 
    <div class= 'powerSetBody'>
      <div class = "monBoxs boxs" v-for = "(v,i) in allData" :class="{'monBoxsBot':i>=8}">
        <div class = "monTit">
          <div class="monSpan" v-text = "v.tit"></div>
          <div class = "monPonit">
            <span class = "monPonit0 colorG"></span>
            <span class = "monPonit1">节约</span>
          </div>
          <div class = "monPonit">
            <span class = "monPonit0 colorR"></span>
            <span class = "monPonit1">超标</span>
          </div>         
        </div>
        <div class = "monLists">
          <ul>
            <li v-for = "(v0,i0) in v.list" :class = "{'noBot':i0 == (v.list.length-1)}">
              <div class = "planBox">
                <span v-text = "'计划'+v0.tit"></span>
                <span 
                  :class ="{'colorFF':!isChangeing,'colorGray':isChangeing}"  
                  v-show = '!(isChangeing && i>dateM)' 
                  v-text = "v0.plan===''?'0':v0.plan"
                ></span>
                <input v-show = 'isChangeing && i>dateM' placeholder="未设置" v-model = "v0.plan"/>
              </div>
              <div class = "actualBox">
                <span v-text = "'实际'+v0.tit"></span>
                <span  
                  v-text = "(v0.Actual==0&&i>dateM)?'——':v0.Actual"
                  :class ="{'colorFG':v0.Actual<=v0.plan &&v0.Actual!=0,'colorFR':v0.Actual>v0.plan,'colorFF':v0.Actual==0}" 
                  ></span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    
    </div>
  </div>
</template>

<script>

import utils from '@/assets/js/utils';
export default {
  computed:{
    oldYear(){
      let res = false;
      if(Number(this.years.getFullYear())<Number((new Date()).getFullYear())){
        res = true;
      }
      return res;
    }
  },
  data () {
    return {
        years:new Date(),
        loading:false,
        dateM:Number((new Date()).getMonth()),
        isChangeing:false,   //正在修改状态
        times:utils.time(),
        allData:[
          {
            tit:'一月',
            id:1,
            list:[
              {id:'power',plan:'',Actual:0,tit:'用电'},
              {id:'water',plan:'',Actual:0,tit:'用水'},
              {id:'fire',plan:'',Actual:0,tit:'用汽'},
            ]
          },
          {
            tit:'二月',
            id:2,
            list:[
              {id:'power',plan:'',Actual:0,tit:'用电'},
              {id:'water',plan:'',Actual:0,tit:'用水'},
              {id:'fire',plan:'',Actual:0,tit:'用汽'},
            ]
          },
          {
            tit:'三月',
            id:3,
            list:[
              {id:'power',plan:'',Actual:0,tit:'用电'},
              {id:'water',plan:'',Actual:0,tit:'用水'},
              {id:'fire',plan:'',Actual:0,tit:'用汽'},
            ]
          },
          {
            tit:'四月',
            id:4,
            list:[
              {id:'power',plan:'',Actual:0,tit:'用电'},
              {id:'water',plan:'',Actual:0,tit:'用水'},
              {id:'fire',plan:'',Actual:0,tit:'用汽'},
            ]
          },{
            tit:'五月',
            id:5,
            list:[
              {id:'power',plan:'',Actual:0,tit:'用电'},
              {id:'water',plan:'',Actual:0,tit:'用水'},
              {id:'fire',plan:'',Actual:0,tit:'用汽'},
            ]
          },{
            tit:'六月',
            id:6,
            list:[
              {id:'power',plan:'',Actual:0,tit:'用电'},
              {id:'water',plan:'',Actual:0,tit:'用水'},
              {id:'fire',plan:'',Actual:0,tit:'用汽'},
            ]
          },{
            tit:'七月',
            id:7,
            list:[
              {id:'power',plan:'',Actual:0,tit:'用电'},
              {id:'water',plan:'',Actual:0,tit:'用水'},
              {id:'fire',plan:'',Actual:0,tit:'用汽'},
            ]
          },{
            tit:'八月',
            id:8,
            list:[
              {id:'power',plan:'',Actual:0,tit:'用电'},
              {id:'water',plan:'',Actual:0,tit:'用水'},
              {id:'fire',plan:'',Actual:0,tit:'用汽'},
            ]
          },{
            tit:'九月',
            id:9,
            list:[
              {id:'power',plan:'',Actual:0,tit:'用电'},
              {id:'water',plan:'',Actual:0,tit:'用水'},
              {id:'fire',plan:'',Actual:0,tit:'用汽'},
            ]
          },
          {
            tit:'十月',
            id:10,
            list:[
              {id:'power',plan:'',Actual:0,tit:'用电'},
              {id:'water',plan:'',Actual:0,tit:'用水'},
              {id:'fire',plan:'',Actual:0,tit:'用汽'},
            ]
          },
          {
            tit:'十一月',
            id:11,
            list:[
              {id:'power',plan:'',Actual:0,tit:'用电'},
              {id:'water',plan:'',Actual:0,tit:'用水'},
              {id:'fire',plan:'',Actual:0,tit:'用汽'},
            ]
          },
          {
            tit:'十二月',
            id:12,
            list:[
              {id:'power',plan:'',Actual:0,tit:'用电'},
              {id:'water',plan:'',Actual:0,tit:'用水'},
              {id:'fire',plan:'',Actual:0,tit:'用汽'},
            ]
          },

        ],

    }
  },
  methods:{
    isChange(val){ //切换年份，如果在编辑状态， 清空切换状态
      if(val.getFullYear()<(new Date()).getFullYear()){
        this.isChangeing =false;
        // this.getData();
        //
      }
    },
    isSearch(){
      this.getData();
    },
    openChange(){
      if(this.oldYear){
        return;
      }else{
        this.isChangeing =true;
      }
    },
    ckId(type){ //0 = 电 1=水 2=气
      let id ='0';
      switch(type){
        case 'power':
          id = '0';
        break;
        case 'water':
          id = '1';
        break;
        case 'fire':
          id = '2';
        break;
      }
      return id;
    },
    changeOk(){
      let attr = [];
      let datas = this.allData;
      let lens  = datas.length;
      for(let i = 0;i<lens;i++){
        if(i>this.dateM){ //之后的月份
          for(let j=0;j<3;j++){
            let objs = {
              "project_id":'1', 
              "addtime":String(datas[i].id),
              "energy_type":this.ckId(datas[i].list[j].id),
              "cost":String(datas[i].list[j].plan),
              'year':String((this.years).getFullYear())
            }
            attr.push(objs);
          }          
        }
      }
      let json = JSON.stringify(attr);
      let data = {
          data :json
      };
      utils.post('energy/plan/set',data).then(res=>{
        console.log(res)
      }).catch(err=>{

      });
      this.isChangeing = false;
      this.$message('保存成功！');
    },
    getMonth(id){
      let res = '';
      switch(Number(id)){
        case 1:
          res = '一月';
        break;
         case 2:
          res = '二月';
        break;
         case 3:
          res = '三月';
        break;
         case 4:
          res = '四月';
        break;
         case 5:
          res = '五月';
        break;
         case 6:
          res = '六月';
        break;
         case 7:
          res = '七月';
        break;
         case 8:
          res = '八月';
        break;
         case 9:
          res = '九月';
        break;
         case 10:
          res = '十月';
        break;
         case 11:
          res = '十一月';
        break;
         case 12:
          res = '十二月';
        break;
      }
      return res;
    },
    getData(){
      let year = (this.years).getFullYear();
      let data = {
        sys_menu_id :1,
        year:year
      };
      let _this = this;
      this.loading = true;
      utils.post('energy/plan',data).then(res=>{
        if(res.code==0){
          let datas = res.data;
          let lens = datas.length;
          let attrs= [];
          for(let i=0;i<lens;i++){
            let objs = {
                tit:_this.getMonth(datas[i].id),
                id:datas[i].id,
                list:[
                  {id:'power',plan:datas[i].plan_d,Actual:datas[i].actual_d,tit:'用电'},
                  {id:'water',plan:datas[i].plan_s,Actual:datas[i].actual_s,tit:'用水'},
                  {id:'fire',plan:datas[i].plan_q,Actual:datas[i].actual_q,tit:'用气'},
                ]
              };
            attrs.push(objs);
          }
          _this.allData = attrs;
          _this.loading = false;
        }else{

        }
      }).catch(err=>{
         console.log(err,2222)
      });
    }
  },
  created() {
    this.getData();
  },
  mounted() {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped='scoped' type="text/less">
@import '../../../../assets/css/comon.less';
@colorR:#ff3636;
@colorG:#00c702;
.colorG{
  background: @colorG;
}
.colorR{
  background: @colorR;
}
.colorFG{
  color: @colorG;
}
.colorFR{
  color: @colorR;
}
.colorFF{
  color: #fff;
}
.colorGray{
  color:#4d5d76;
}
.powerSet{
  width:13.06rem;
  height:79vh;
  margin-top:0.02rem;
  display:flex;
  flex-direction:column;
  .powerSetTit{
    height:8.24vh;
    .vhPT(14);
    .timeBox{
      display:inline-block;
      width:1.2rem;
      .vh(32);
      margin-left:0.2rem;
       
    }
    .timeBoxss{
      float:right;
      font-size:0.12rem;
      color:#fff;
      margin-right:0.2rem;
      line-height:0.34rem;
      font-weight:600;
    }  
    .btns{
      .vh(32);
      .vhLH(32);
      padding:0 0.2rem;
      transform:translateY(1px);
      margin-left:0.12rem;
    }
  }
  .powerSetBody{
    flex:1;
    .monBoxs{
      width:3rem;
      height:20.879vh;
      margin-left:0.2rem;
      float:left;
      margin-bottom:2.747vh;
      display:flex;
      flex-direction:column;
      .monTit{
        .vh(39);
        width:100%;
        background:rgba(46,121,232,0.3);
        .monSpan{
          float: left;
          font-size: 0.16rem;
          .vhLH(39);
          color:#fff;
          font-weight: 600;
          padding-left: 0.16rem;
          
        }

        .monPonit{
          float:right;
         .vhLH(39);
         margin-right: 0.15rem;
         margin-left: 0.05rem;
            .monPonit0{
              display: inline-block;
              width: 0.1rem;
              height: 0.1rem;
              border-radius: 50%;
            }
            .monPonit1{
              margin-left: 0.04rem;
              font-size: 0.12rem;
              color:#fff;             
            }
            
        }
      }
      .monLists{
        flex:1;
        padding-left:0.16rem;
        ul{
          height:100%;
          display:flex;
          flex-direction:column;
          li{
            flex:1;
            border-bottom:1px solid rgba(58,137,249,0.3);
            display: flex;
            align-items: center;
            &.noBot{
              border-bottom:0;
            }
            .planBox{
              width:1.64rem;
              span:nth-child(1){
                color:@color-blue;
                 font-size: 0.12rem;
                 padding-right: 0.24rem;
              }
               span:nth-child(2){
                 font-size: 0.14rem;
                 font-weight: 600;
               }
              input{
                max-width:0.64rem;
                background: none;
                color:#fff;
                border:0;
                font-size: 0.14rem;
                font-weight: 600;
                text-decoration: underline;
              }
            }
            .actualBox{
              flex:1;
              span:nth-child(1){
                color:@color-blue;
                font-size: 0.12rem;
                padding-right: 0.24rem;               
              }
              span:nth-child(2){
                 font-size: 0.14rem;
                 font-weight: 600;
               }
            }
          }
        }
      }
    }
    .monBoxsBot{
      margin-bottom:0;
    }
  }
}

</style>
