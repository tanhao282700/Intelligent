
<!--
    能源系统 用能账单
    made by 白富友
    start in 2018-8-7
-->
<template>
  <div class="powerBill boxs boxs2">
      <div class="BillHead">
        <span class="headTab" :class="{'tabActive':activeName==v.id}" v-for = "(v,i) in navs" @click="activeName = v.id" v-text="v.tit"></span>
        <el-button class="priceSet" type="success" @click="priceSet">单价预设</el-button>       
      </div>
      <div class="BillBody" v-show = 'activeName ==1 '>
        <Bill1/>
      </div>
      <div class="BillBody" v-show = 'activeName ==2 '>
        <Bill2/>
      </div>
      <Dialog wid= "5.76rem" hei = "337" ref = "dialog">
          <Table :table = "table2"/>
      </Dialog>    
  </div>
</template>

<script>

import utils from '@/assets/js/utils';
import Table from '@/components/common/table';
import Bill1 from './Bill1';
import Bill2 from './Bill2';
import btns from './btns';
export default {
  components:{
    'Bill1':Bill1,
    'Bill2':Bill2,
    'Table':Table,
  },
  data () {
    return {
      activeName:1,
      navs:[
        {id:1,tit:'租户账单'},
        {id:2,tit:'能耗账单'},
      ],
       table2:{
        hei:337, //table高度  设置后有滚动条
        //len:800, //总条数
        //pageSize:20, //每页的条数 。默认为20
        //page:1,  //当前页码
        data:[
          {id:1,type:'电',price:'2.5',sDate:'08:00',eDate:'12:00'},
          {id:2,type:'电',price:'3.5',sDate:'08:00',eDate:'12:00'},
          {id:3,type:'电',price:'4.5',sDate:'03:00',eDate:'12:00'},
          {id:4,type:'电',price:'1.5',sDate:'08:00',eDate:'12:00'},
          {id:5,type:'电',price:'5.5',sDate:'08:00',eDate:'12:00'},
          {id:6,type:'电',price:'2.5',sDate:'08:00',eDate:'12:00'},
          ],
        th:[
          {prop:'type',label:'能源类型'},
          {prop:'price',label:'单价(元)'},
          {prop:'sDate',label:'开始时间'},
          {prop:'eDate',label:'结束时间'},
          {prop:'btns2',
            label:'操作',
            operate: true, 
            render: (h, param)=> {
                const btnss = {
                    id:param.row.id,                
                  };
                return h(btns,{
                  props: { btnss:btnss},
                  on:{addss:this.addsss,delss:this.delsss}
                });
              }           
          },
        ]
      },
    }
  },
  methods:{
    priceSet(){
      this.$refs.dialog.show();
    },
    addsss(number){
      console.log(number)
    },
    delsss(number){
      console.log(number)
    },
  },
  created() {

  },
  mounted() {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped='scoped' type="text/less">
@import '../../../../assets/css/comon.less';

.powerBill{
  width:13.06rem;
  height:79vh;
  margin-top:0.02rem;
  display:flex;
  flex-direction:column;
  .BillHead{
    .vh(44);
    background-color: rgba(0, 0, 0, 0.25);
    width: 100%;
    display: flex;
    position: relative;
    padding-left: 0.2rem;
    border-bottom: 2px solid rgba(227,230,237,.2);
    .headTab{
      color:#d8d8d8;
      font-size: 0.14rem;
      cursor: pointer;
      .vhLH(44);
      margin-right:0.44rem;
      &.tabActive{
        color:@color-blue;
        border-bottom: 2px solid #1989fa;
      }
    }
    .priceSet{
      position: absolute;
      right: 0.2rem;
      top: 0.06rem;
      width: 0.88rem;
      .vh(32);
      .vhLH(32);
      padding-top:0;
      border-radius: 0.04rem;
    }
  }
  .BillBody{
    flex:1;
  }
}
</style>
