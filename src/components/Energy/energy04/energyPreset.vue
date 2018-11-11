+<!--能源系统 用能预设-->
<template>
  <!-- 用能预设模块 -->
  <div class="powerSet"
       v-loading="loading"
       element-loading-background="rgba(0, 0, 0, 0.5)"
       element-loading-spinner="el-icon-loading"
  >
    <!--面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>能源管理系统</el-breadcrumb-item>
      <el-breadcrumb-item>用能预设</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="presetContentBox boxs">
      <div class= 'powerSetTit'>
        <div class ='timeBox'>
          <el-date-picker
            v-model="years"
            @change = 'isChange'
            format="yyyy"
            value-format="yyyy"
            type="year"
            placeholder="请选择年份">
          </el-date-picker>
        </div>
        <el-button class="btns" type="primary" icon="el-icon-search"  @click = "isSearch">搜索</el-button>
        <el-button class="btns" type="success" icon="el-icon-edit" v-show="!isChangeing" @click = " openChange">编辑</el-button>
        <el-button class="btns" type="success" icon="el-icon-third-baocun" v-if="isChangeing" @click = "changeOk">完成</el-button>
        <span class = "timeBoxss">当前日期： <span v-text="times"></span>
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
                    :class ="{'colorFG':Number(v0.Actual)<=Number(v0.plan) && Number(v0.Actual)!=0,'colorFR': Number(v0.Actual)>Number(v0.plan),'colorFF':v0.Actual==0}"
                  ></span>
                </div>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
  import '../../../assets/css/energyPreset.css';
  import utils from '@/assets/js/utils';

  export default {
    computed:{
      /*oldYear(){
        let res = false;
        if(Number(this.years.getFullYear())<Number((new Date()).getFullYear())){
          res = true;
        }
        return res;
      }*/
    },
    data () {
      return {
        years: "",
        updateData: "",
        loading:false,
        dateM:Number((new Date()).getMonth()),
        isChangeing:false,   //正在修改状态
        times:utils.time(),
        allData:[
          {
            tit:'一月',
            id:'01',
            list:[
              {id:'power',plan:'3888',Actual:3900,tit:'用电'},
              {id:'water',plan:'1462',Actual:1200,tit:'用水'},
              {id:'fire',plan:'893',Actual:1384,tit:'用气'},
            ]
          },
          {
            tit:'二月',
            id:'02',
            list:[
              {id:'power',plan:'',Actual:0,tit:'用电'},
              {id:'water',plan:'',Actual:0,tit:'用水'},
              {id:'fire',plan:'',Actual:0,tit:'用气'},
            ]
          },
          {
            tit:'三月',
            id:'03',
            list:[
              {id:'power',plan:'',Actual:0,tit:'用电'},
              {id:'water',plan:'',Actual:0,tit:'用水'},
              {id:'fire',plan:'',Actual:0,tit:'用气'},
            ]
          },
          {
            tit:'四月',
            id:'04',
            list:[
              {id:'power',plan:'',Actual:0,tit:'用电'},
              {id:'water',plan:'',Actual:0,tit:'用水'},
              {id:'fire',plan:'',Actual:0,tit:'用气'},
            ]
          },{
            tit:'五月',
            id:'05',
            list:[
              {id:'power',plan:'',Actual:0,tit:'用电'},
              {id:'water',plan:'',Actual:0,tit:'用水'},
              {id:'fire',plan:'',Actual:0,tit:'用气'},
            ]
          },{
            tit:'六月',
            id:'06',
            list:[
              {id:'power',plan:'',Actual:0,tit:'用电'},
              {id:'water',plan:'',Actual:0,tit:'用水'},
              {id:'fire',plan:'',Actual:0,tit:'用气'},
            ]
          },{
            tit:'七月',
            id:'07',
            list:[
              {id:'power',plan:'',Actual:0,tit:'用电'},
              {id:'water',plan:'',Actual:0,tit:'用水'},
              {id:'fire',plan:'',Actual:0,tit:'用气'},
            ]
          },{
            tit:'八月',
            id:'08',
            list:[
              {id:'power',plan:'',Actual:0,tit:'用电'},
              {id:'water',plan:'',Actual:0,tit:'用水'},
              {id:'fire',plan:'',Actual:0,tit:'用气'},
            ]
          },{
            tit:'九月',
            id:'09',
            list:[
              {id:'power',plan:'',Actual:0,tit:'用电'},
              {id:'water',plan:'',Actual:0,tit:'用水'},
              {id:'fire',plan:'',Actual:0,tit:'用气'},
            ]
          },
          {
            tit:'十月',
            id:'10',
            list:[
              {id:'power',plan:'',Actual:0,tit:'用电'},
              {id:'water',plan:'',Actual:0,tit:'用水'},
              {id:'fire',plan:'',Actual:0,tit:'用气'},
            ]
          },
          {
            tit:'十一月',
            id:'11',
            list:[
              {id:'power',plan:'',Actual:0,tit:'用电'},
              {id:'water',plan:'',Actual:0,tit:'用水'},
              {id:'fire',plan:'',Actual:0,tit:'用气'},
            ]
          },
          {
            tit:'十二月',
            id:'12',
            list:[
              {id:'power',plan:'',Actual:0,tit:'用电'},
              {id:'water',plan:'',Actual:0,tit:'用水'},
              {id:'fire',plan:'',Actual:0,tit:'用气'},
            ]
          },

        ],
      }
    },
    methods:{
      isChange(val){ //切换年份，如果在编辑状态， 清空切换状态
        if(val<(new Date()).getFullYear()){
          this.isChangeing =false;
          /*this.getData();*/
        }
      },
      isSearch(){
        this.getData();
      },
      openChange(){
        let that = this;
        let searchYear = this.years;
        var curYear = new Date().getFullYear();
        if(searchYear<curYear){
          that.isChangeing = false;
          that.$message("不可编辑");
        }else{
          that.isChangeing = true;
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
        let that = this;
        let datas = that.allData;
        let lens  = datas.length;
        let updateObj = {};
        let a0={};
        let a1={};
        let a2={};

        for(let i = 0;i<lens;i++){
          var temp = datas[i];
          var j = i+1;
          if(j<10){j="0"+j};
          j = j.toString();
          a0[j] = (temp.list[0].plan).toString();
          a1[j] = (temp.list[1].plan).toString();
          a2[j] = (temp.list[2].plan).toString();
        }
        updateObj[0] = a0;
        updateObj[1] = a1;
        updateObj[2] = a2;
        console.log(updateObj);

        let updateJson = JSON.stringify(updateObj);

        let projectId = that.$store.state.projectId;
        let config = {
          project_id:projectId,
          year: that.years,
          update: updateJson
        };

        that.$http.post('hotel_energy/energy_plan',config).then(res=>{
          console.log(res)
          if(res.data.code == 0){
            that.isChangeing = false;
            that.$message({
              showClose: true,
              message: '保存成功！',
              type: 'success'
            });
          }else{
            that.$message(res.data.message);
          }

        }).catch(err=>{
          that.isChangeing = false;
          that.$message('保存失败！');
        });

      },
      getMonth(id){
        let res = '';
        switch(id){
          case '01':
            res = '一月';
            break;
          case '02':
            res = '二月';
            break;
          case '03':
            res = '三月';
            break;
          case '04':
            res = '四月';
            break;
          case '05':
            res = '五月';
            break;
          case '06':
            res = '六月';
            break;
          case '07':
            res = '七月';
            break;
          case '08':
            res = '八月';
            break;
          case '09':
            res = '九月';
            break;
          case '10':
            res = '十月';
            break;
          case '11':
            res = '十一月';
            break;
          case '12':
            res = '十二月';
            break;
        }
        return res;
      },
      getData(){
        let that = this;
        let projectId = that.$store.state.projectId;
        let config = {
          project_id:projectId,
          year: that.years,
          update: that.updateData
        };

        that.loading = true;
        that.$http.post('hotel_energy/energy_plan',config).then(res=>{

          if(res.data.code == '0'){
            let datas = res.data.data;
            var actualData = datas.query_year_actual;
            var planData = datas.query_year_plan;
            let lens = 13;
            let attrs= [];
            for(let i=1;i<lens;i++){
              if(i<10){i="0"+i};
              let objs = {
                tit:that.getMonth(i.toString()),
                id: i,
                list:[
                  {id:'power',plan:planData[0][i],Actual:actualData[0][i],tit:'用电'},
                  {id:'water',plan:planData[1][i],Actual:actualData[1][i],tit:'用水'},
                  {id:'fire',plan:planData[2][i],Actual:actualData[2][i],tit:'用气'},
                ]
              };
              attrs.push(objs);
            }
            that.allData = attrs;
            that.loading = false;
          }else{
            this.$message.error(res.data.message);
            that.loading = false;
          }
        }).catch(err=>{
          console.log(err);
        });
      }
    },
    created() {
      this.getData();
      this.years = new Date().getFullYear().toString();
    },
    mounted() {

    },
  }
</script>

<style lang="less" scoped='scoped' type="text/less">
  @import '../../../assets/css/comon.less';
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
    width:100%;
    height:100%;
    padding: 0 .3rem;
    .powerSetTit{
      height:.32rem;
      line-height: .32rem;
      margin-bottom: .14rem;
      .timeBox{
        display:block;
        width:1.2rem;
        height:.32rem;
        float: left;
      }
      .timeBoxss{
        float:right;
        font-size:0.16rem;
        color:#fff;
        line-height:0.32rem;
      }
      .btns{
        width: .86rem;
        height: .32rem;
        padding:0 0.2rem;
        transform:translateY(1px);
        margin-left:0.12rem;
        float: left;
        display: flex;
        align-items: center;
      }
    }
    .powerSetBody{
      flex:1;
      .monBoxs{
        width: calc((100% - .6rem)/4);
        height:1.52rem;
        margin:0 .2rem .2rem 0;
        float:left;
        display:flex;
        flex-direction:column;
        .monTit{
          height: .4rem;
          line-height: .4rem;
          width:100%;
          background:rgba(46,121,232,0.3);
          .monSpan{
            float: left;
            height: 100%;
            font-size: 0.16rem;
            color:#fff;
            padding-left: 0.16rem;
          }
          .monPonit{
            float:right;
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
          padding-left:.16rem;
          background-color: rgba(0,0,0,.2);
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
                width:1.56rem;
                span:nth-child(1){
                  color:@color-blue;
                  font-size: 0.12rem;
                  padding-right: 0.12rem;
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
                  padding-right: 0.12rem;
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
      .monBoxs:nth-child(4n){
        margin-right: 0!important;
      }
      .monBoxsBot{
        margin-bottom:0;
      }
    }
  }
  .presetContentBox{
    padding: .14rem .2rem;
    height: 5.78rem;
  }
</style>
