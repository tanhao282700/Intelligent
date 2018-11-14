<template>
    <div class="myChartBox">      
        <div :id="echartCirData.id" class="myChart"></div>
    </div>
</template>

<script>
export default {
  props:['echartCirData'],
  data () {
    return {
      fillBoxs:[
        {id:'year',name:'年'},
        {id:'mon',name:'月'},
        {id:'week',name:'周'},
        {id:'day',name:'日'},
      ],
       echartCirData3:{//工单的数据
            id:'echart3',
            color:[
              '#008aff','#f56c6c'
            ],
            size:[0,'72.89%'],
            total:0,
            data:[
              {value:24, name:0+'%',tit:'已完成数'},
              {value:88, name:0+'%',tit:'未完成数'},
            ],
        },
        echartCirData4:{//巡检的数据
            id:'echart4',
            color:[
              '#f56c6c','#008aff'
            ],
            size:[0,'72.89%'],
            total:0,
            data:[
              {value:2, name:0+'%',tit:'未完成数'},
              {value:100, name:0+'%',tit:'已完成数'},
            ],
        },
    }
  },
  computed:{
    msgsInTit(){
      let lens =this.fillBoxs.length,res = '';
      for(let i=0;i<lens;i++){
        if(this.fillBoxs[i].id == this.idNow){
          res = this.fillBoxs[i].name;
        }
      }
      return res;
    },
    yearWeek(){
      let lens =this.fillBoxs2.length,res = [];
      for(let i=0;i<lens;i++){
        if(this.fillBoxs2[i].id == this.idNow2){
          let name = this.fillBoxs2[i].name.split('/');
          res = [name[0],name[1]];
        }
      }
      return res;
    }
  },
  methods:{
      getData(){
      let timearea = ''
      let dayOrMonth = ''
      switch(this.msgsInTit){
        case '日':
          timearea=0;
          break;
        case '周':
          timearea=1;
          break;
        case '月':
          timearea=2;
          break;
        case '年':
          timearea=3;
          break;
      }
          let _this = this;
          this.$http.post('/pc_ims/index',{above_type:timearea,below_type:dayOrMonth,flg:1})
          .then(function(res){
            if(res.data.code==0){
               _this.echartCirData3.total = res.data.data.gongdan.gongdan_count;
               let gongdanwei = res.data.data.gongdan.wei;
               let gongdanwan = res.data.data.gongdan.wan;
               let xunjianwei = res.data.data.xunjian.wei;
               let xunjianwan = res.data.data.xunjianwan;
               //工单
               _this.echartCirData3.data  = [
                  {value:res.data.data.gongdan.wan,name:res.data.data.gongdan.wanlv+'%',tit:'已完成数'},
                  {value:res.data.data.gongdan.wei,name:res.data.data.gongdan.weilv+'%',tit:'未完成数'}];
                  //巡检
              // _this.echartCirData4.total = res.data.data.xunjian.xunjian_count;
              _this.echartCirData4.data = [
                {value:res.data.data.xunjian.wan,name:res.data.data.xunjian.wanlv+'%',tit:'已完成数'},
                {value:res.data.data.xunjian.wei,name:res.data.data.xunjian.weilv+'%',tit:'未完成数'}];
                //工单来源
              // _this.barData.data = [res.data.data.sys,res.data.data.people,res.data.data.complain]
              //console.log(res.data.data.now)
              if(_this.echartCirData.id == "echart3"){
                  _this.drawLine(_this.echartCirData3);
              }else{
                  _this.drawLine(_this.echartCirData4);
              }
            }else{
              _this.$message({
                type:'error',
                message:res.data.msg
              })
            }
          });
      },
      drawLine(data){
        let echartCirData = this.echartCirData;
        //console.log(this.echartCirData);
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById(this.echartCirData.id));
        let size = [0, '66%'];
        if(echartCirData.size!==undefined){
            size = echartCirData.size;
        }
        let option = {
            color :data.color,
            cursor:'auto',
            series: [
                {
                    name:'访问来源',
                    type:'pie',
                    radius: size,
                    avoidLabelOverlap: false,
                    hoverOffset:10,
                    label: {
                        normal: {
                            position: 'inner',
                            formatter: function(params){
                              return params.percent+'%'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {              
                            // 定制显示（按顺序）
                            color: function(params) { 
                                let colorList = data.color
                                return colorList[params.dataIndex] 
                            }
                        },
                    },
                    data:this.echartCirData.data
                }
            ]
        };
        // 绘制图表
       myChart.setOption(option); 
    }
  },
  watch:{
    echartCirData:{
      handler(val){
        this.getData()
      },deep:true
    }
  },
  mounted() {
    this.getData();
       // this.drawLine();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped="" type="text/less"> 
@import '../../../../assets/css/comon.less';
.myChartBox{
    width:1.58rem;
    height:1.58rem;
    width:100%;
    position:relative; 
    .myChart{
      height:100%;
        width:100%;  
    } 
}

</style>
