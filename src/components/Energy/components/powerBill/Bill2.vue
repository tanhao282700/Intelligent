
<!--
    能源系统 耗能账单
    made by 白富友
    start in 2018-8-7
-->
<template>
  <div class="Bill1"
    v-loading="loading" 
      element-loading-background="rgba(0, 0, 0, 0.5)"
      element-loading-spinner="el-icon-loading"
      element-loading-text="拼命加载中">
      <div class="bill1Head">
        <div class="quickChoose">
         <span>快速选择</span>
         <span 
            class="quickChooseBtn"
            v-for="(v,i) in quickLists" 
            v-text = "v.tit"
            @click = "changeQuick(v.id)"
            :class="{'nowActive':nowActive==v.id}"
          >
          </span> 
        </div>
        <div class="quikTitCen">
          <div class = "chooseBox2000">
              <SelectBox
                class="chooseBoxs"
                :options='typeOptions'
                :value = 'valueType'
                placeholder = '选择类型'
                @change = "change0"
              />
            </div>
            <div class="chooseBox1000">
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
                    value-format = 'yyyy-MM-dd'
                    >
                  </el-date-picker>
              </div>
              <div class="chooseBox100">
                <SelectBox2 :data = 'selectID' @choose = "areaChoose"/>   
              </div>            
              <!-- <input type="text" class="chooseInput"  v-model="name" placeholder="请输入租户名进行搜索"> -->
              <el-button class="billBtn2" @click="getData" icon="el-icon-search" type="primary">查询</el-button>     
            </div>
        </div>
          <el-button class="billBtn0" icon="el-icon-edit" type="primary">导出</el-button>       
      </div>
      <div class="bill1Body">
        <Table :table = "table" @changePage = "changePage"/> <!-- @rowClick="rowClicks"-->
      </div>    
  </div>
</template>

<script>
import utils from '@/assets/js/utils';
import SelectBox from '@/components/form/selectBox';
import SelectBox2 from '@/components/common/selectBox';
import Table from '@/components/common/table';


export default {
  components:{
    'SelectBox':SelectBox,
    'SelectBox2':SelectBox2,
    'Table':Table,
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
     let wid1=73;
     let  wid2=190;
     let  wid3=82;
     let  wid4=93;
     let   wid5=109;
    return {
      loading:false,
      name:'',
       selectID:{
            sId:1,
        },
        areaId:0,   //区域ID      
      table:{
        hei:428, //table高度  设置后有滚动条
        len:0, //总条数
        pageSize:20, //每页的条数 。默认为20
        page:1,  //当前页码
        data:[
          // {number:'01',time: '2016/05/02',type:'电',powers:'3123',utils:'kw/h',name: '王小虎',floor:'1F',area:'A区',floorType:'客房',useBig:'-',useSmall:'-',prize:'-'}, 
          // {number:'02',time: '2016/05/02',type:'电',powers:'3123',utils:'kw/h',name: '王小虎',floor:'1F',area:'A区',floorType:'客房',useBig:'14',useSmall:'1',prize:'2141'}, 
          // {number:'03',time: '2016/05/02',type:'电',powers:'3123',utils:'kw/h',name: '王小虎',floor:'1F',area:'A区',floorType:'客房',useBig:'-',useSmall:'-',prize:'-'}, 
          // {number:'04',time: '2016/05/02',type:'电',powers:'3123',utils:'kw/h',name: '王小虎',floor:'1F',area:'A区',floorType:'客房',useBig:'-',useSmall:'-',prize:'-'}, 
          // {number:'05',time: '2016/05/02',type:'电',powers:'3123',utils:'kw/h',name: '王小虎',floor:'1F',area:'A区',floorType:'客房',useBig:'15',useSmall:'8',prize:'2141'}, 
          // {number:'06',time: '2016/05/02',type:'电',powers:'3123',utils:'kw/h',name: '王小虎',floor:'1F',area:'A区',floorType:'客房',useBig:'-',useSmall:'-',prize:'-'}, 
          // {number:'07',time: '2016/05/02',type:'电',powers:'3123',utils:'kw/h',name: '王小虎',floor:'1F',area:'A区',floorType:'客房',useBig:'-',useSmall:'-',prize:'-'}, 
          // {number:'08',time: '2016/05/02',type:'电',powers:'3123',utils:'kw/h',name: '王小虎',floor:'1F',area:'A区',floorType:'客房',useBig:'-',useSmall:'-',prize:'-'}, 
          // {number:'09',time: '2016/05/02',type:'电',powers:'3123',utils:'kw/h',name: '王小虎',floor:'1F',area:'A区',floorType:'客房',useBig:'-',useSmall:'-',prize:'-'},
          // {number:'10',time: '2016/05/02',type:'电',powers:'3123',utils:'kw/h',name: '王小虎',floor:'1F',area:'A区',floorType:'客房',useBig:'-',useSmall:'-',prize:'-'}, 
          // {number:'11',time: '2016/05/02',type:'电',powers:'3123',utils:'kw/h',name: '王小虎',floor:'1F',area:'A区',floorType:'客房',useBig:'14',useSmall:'1',prize:'2141'}, 
          // {number:'12',time: '2016/05/02',type:'电',powers:'3123',utils:'kw/h',name: '王小虎',floor:'1F',area:'A区',floorType:'客房',useBig:'-',useSmall:'-',prize:'-'}, 
          // {number:'13',time: '2016/05/02',type:'电',powers:'3123',utils:'kw/h',name: '王小虎',floor:'1F',area:'A区',floorType:'客房',useBig:'-',useSmall:'-',prize:'-'}, 
          // {number:'14',time: '2016/05/02',type:'电',powers:'3123',utils:'kw/h',name: '王小虎',floor:'1F',area:'A区',floorType:'客房',useBig:'15',useSmall:'8',prize:'2141'}, 
          // {number:'15',time: '2016/05/02',type:'电',powers:'3123',utils:'kw/h',name: '王小虎',floor:'1F',area:'A区',floorType:'客房',useBig:'-',useSmall:'-',prize:'-'}, 
          // {number:'16',time: '2016/05/02',type:'电',powers:'3123',utils:'kw/h',name: '王小虎',floor:'1F',area:'A区',floorType:'客房',useBig:'-',useSmall:'-',prize:'-'}, 
          // {number:'17',time: '2016/05/02',type:'电',powers:'3123',utils:'kw/h',name: '王小虎',floor:'1F',area:'A区',floorType:'客房',useBig:'-',useSmall:'-',prize:'-'}, 
          // {number:'18',time: '2016/05/02',type:'电',powers:'3123',utils:'kw/h',name: '王小虎',floor:'1F',area:'A区',floorType:'客房',useBig:'15',useSmall:'8',prize:'2141'}, 
          // {number:'19',time: '2016/05/02',type:'电',powers:'3123',utils:'kw/h',name: '王小虎',floor:'1F',area:'A区',floorType:'客房',useBig:'-',useSmall:'-',prize:'-'}, 
          // {number:'20',time: '2016/05/02',type:'电',powers:'3123',utils:'kw/h',name: '王小虎',floor:'1F',area:'A区',floorType:'客房',useBig:'-',useSmall:'-',prize:'-'}, 
          ],
        th:[
          {prop:'number',label:'编号',wid:wid1},
          {prop:'time',label:'时间',wid:wid2},
          {prop:'type',label:'类型',wid:wid3},
          {prop:'powers',label:'耗能量',wid:wid4},
          {prop:'utils',label:'单位',wid:wid3},
          // {prop:'name',label:'租户名',wid:wid5},
          {prop:'floor',label:'楼层',wid:wid1},
          {prop:'area',label:'区域',wid:wid3},
          {prop:'floorType',label:'类型',wid:wid3},

          {prop:'useBig',label:'用能峰值(h)'},
          {prop:'useSmall',label:'用能谷值(h)'},       
          {prop:'prize',label:'费用(元)',wid:wid1},
        ]
      },
     
      value7: '',    //时间区间值    
      quickLists:[
        {id:'mon',tit:'月账单'},
      ],
      nowActive:'mon',
      valueType:'0',
      typeOptions:[
        {
          value: '1',
          label: '水'
        }, {
          value: '0',
          label: '电'
        }, {
          value: '3',
          label: '气'
        },
      ]
    }
  },
  methods:{
    timeDeal(time){
      let res = '';
      let attrs = time.split('-');
      res =attrs[0]+'年'+ attrs[1]+'月'+attrs[2]+'日';
      return res;
    },
    change0(val){
      this.valueType = val;
    },
    //修改区域
    areaChoose(id){
        this.areaId= id;
    }, 
    changeQuick(id){
      this.nowActive = id;
      this.getData(id);
    },
    
    rowClicks(item){
      this.$refs.dialog.show();
    },
    changePage(val){
      console.log(val);
    },
    getData(type=''){
      let data = {
            floor_id:this.areaId,
            type:this.valueType,
            pagenumber:this.table.page
        };          
        //以下是选填          
        if(type=='mon'){    
          this.value7 = '';      
          data.time_start =utils.time(utils.time2([(new Date()).getFullYear(),(new Date()).getMonth(),1])) ;
          data.time_end = utils.time(utils.time2([(new Date()).getFullYear(),(new Date()).getMonth(),(new Date()).getDate()]));
        }else if(type=='day'){  //后台默认的是天
          this.value7 = '';
        }else{
          if(this.value7!==''){
            // console.log(this.value7);
            data.time_start =this.value7[0];
            data.time_end = this.value7[1];
          }  
        }
        
      
      if(this.name!==''){
        data.name = this.name;
      }
        this.loading = true;
        utils.post('energy/bill/property',data).then(res=>{
         this.loading = false;
        if(res.code==0){
          let data = res.data;
          let lens = data.length;
          let attrs =[];
          for(let i =0;i<lens;i++){
            let lenF = data[i].floor.length;
            let F1 = '-',F2 = '-',F3 = '-';

              if(lenF>0){
                F1 = data[i].floor[lenF-1].name;
              } 
              if(lenF>1){
                F2 = data[i].floor[lenF-2].name;
              } 
              if(lenF>2){
                F3 = data[i].floor[lenF-3].name;
              }                
            let objs = {
              number:'0'+(i+1),
              time :data[i].time,
              type:data[i].type==0?'电':(data[i].type==1?"水":'气'),
              powers:data[i].value,
              utils:data[i].unit,
              name: data[i].name,
              floor:F1,
              area:F2,
              floorType:F3,
              useBig:data[i].Peak_value,
              useSmall:data[i].Valleys_value,
              prize:data[i].cost
              };
             attrs.push(objs);
              // attrs.push(objs);
          }
          this.table.len=res.paging;
          this.table.data=attrs;
            // this.dealData(data,2);           
        }else{
          this.$message(res.message);
        }           
      }).catch(err=>{
        this.loading = false;
        console.log(err);
      })
    },
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
.Bill1{
  display: flex;
  flex-direction: column;
  flex: 1;
  .bill1Head{
    .vh(57);
    width: 100%;
    position: relative;
    .vhPT(18);
    .quickChoose{
      float: left;
      width: 2.49rem;
      .vh(39);
      display: flex;
      align-items: center;
      span{
        color:#fff;
        margin-right: 0.12rem;
        &:nth-child(1){
          margin-left: 0.2rem;
        }
      }
      .quickChooseBtn{
        cursor: pointer;
        &.nowActive{
          color:@color-blue;
        }
      }
    }
    .quikTitCen{
      width: 9.49rem;
      float: left;
      .chooseBox2000{
        width: 1rem;
        .vh(32);
        border-radius: 2px;
        border: solid 1px #3a84ed;
        display:inline-block;
        overflow:hidden;
        margin-left:1.6rem;
        // padding-left: 0.1rem;
        text-align: center;
        .chooseBoxs{
          height: 100%;
          width: 100%;
        }
      }
      .chooseBox1000{
        width: 8.12-1.6rem;
        .vh(32);
         display:inline-block;
         border-radius: 2px;
        border: solid 1px #3a84ed;
        margin-left: 0.17rem;
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
          width:2.96rem;
          .vh(32);
        }
        .chooseInput{
          float: left;
          width:1.6rem;
          .vh(32);
          background: none;
          margin-left: 0.05rem;
          border:0;
          text-decoration: underline;
          color:#fff;
        }
      }
    }
    .billBtn0{
      float: right;
      width:0.88rem;
      .vh(32);
      padding-top: 0;
      .vhLH(32);
      border-radius: 0.04rem;
      margin-right: 0.2rem;
    }
  }
  .bill1Body{
    .vh(428);
    width: 100%;
    padding-left: 0.16rem;
  }
}

</style>
