<template>
  <div class="readNumber">
    <div class="head">
      <div class="type">
        <span class="active">区域
          <div class="spacing">
            <div class="to-top"></div>
            <div class="to-bottom"></div>
          </div>
        </span>
        <span>系统</span>
      </div>
      <div class="search">
        <div class="limition">
          <el-select :placeholder="items.placeHolder" v-for="(items,index) in options" v-model="aa" :key="index+1" class="querySelectItem">
            <el-option
              v-for="item in items.data"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select :placeholder="items.placeHolder" v-for="(items,index) in options" v-model="aa1" :key="index+2" class="querySelectItem">
            <el-option
              v-for="item in items.data"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select :placeholder="items.placeHolder" v-for="(items,index) in options" v-model="aa2" :key="index+3" class="querySelectItem">
            <el-option
              v-for="item in items.data"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="btn">
          <el-button type="primary" icon="el-icon-search">查询</el-button>
        </div>
      </div>
    </div>
    <div class="con">
      <div class="parts">
        <div class="part boxs"></div>
        <div class="part boxs">
          <lineEcharts :datas ='bb.echarts' ref = "lineEchartssss"  :key = "bb.id"/>
        </div>
      </div>
      <div class="parts">
        <div class="part boxs"></div>
        <div class="part boxs"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import LineEcharts from '@/components/common/lineEcharts';
  export default{
    name:'ReadNumber',
    data(){
      return{
        bb:{
          id:1,
          echarts:{
            id:'lineEchartShui',
            type:'shui',
            unit:'m³',
            title:'水',
            // titShow:false,
            style:{width:'100%',height:'100%'},
            xDate:['16:00','17:00','18:00','16:00','17:00','18:00','17:00','18:00','17:00','18:00','17:00','18:00'],
            list:[
              {name:'能耗值',data:[10,20,30,50,40,60,30,50,30,50,40,60]},
              {name:'碳排放',data:[50,40,60,10,20,30,10,20,10,20,40,60]},
            ]
          }
        },
        aa:'',
        aa1:'',
        aa2:'',
        options: [
          {
            placeHolder: '选择楼层',
            data: [{
              "value": 0,
              "label": "预警"
            }, {
              "value": 1,
              "label": "提醒"
            }, {
              "value": 2,
              "label": '告警'
            }]
          }],
      }
    },
    components:{
      'LineEcharts':LineEcharts
    },
    watch:{

    },
    mounted(){

    },
    methods:{

    }
  }
</script>
<style>
  .readNumber .el-input{
    height:90%;
  }
  .readNumber .querySelectItem{
    margin-left:10px;
  }
  .readNumber .el-input .el-input__inner{
    border:none!important;
    border-bottom:1px solid #1989fa!important;
    /*padding:0!important;*/
  }
</style>
<style lang="less" rel="stylesheet/less" scoped>
  @import '../../../assets/css/comon.less';
  .readNumber{
    width:100%;
    height:100%;
    .head{
      height:10%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      position:relative;
      .type{
        width:30%;
        height:55.17%;
        border:1px solid #3a84ef;
        border-radius:2px;
        display: flex;
        flex-direction: row;
        span{
          flex:1;
          display: flex;
          align-items: center;
          justify-content: center;
          color:#1989f9;
          font-size:.16rem;
          position:relative;
          &:hover{
            cursor: pointer;
          }
          .spacing{
            position:absolute;
            right:0;
            top:0;
            width:1px;
            height:100%;
            .to-top{
              width:2px;
              height:50%;
              .gradientT(rgba(73,143,226,0.5),rgba(73,143,226,0));
            }
            .to-bottom{
              width:2px;
              height:50%;
              .gradientT(rgba(73,143,226,0),rgba(73,143,226,0.5));
            }
          }
        }
        .active{
          background:rgba(0, 0, 0, 0.2);
        }
      }
      .search{
        width:31.17%;
        height:100%;
        position:absolute;
        right:0;
        top:0;
        display:flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        .limition{
          width:70%;
          border:1px solid #3b84ed;
          border-radius:2px;
          height:55.17%;
          display: flex;
          flex-direction: row;
        }
      }
    }
    .con{
      height:90%;
      display: flex;
      flex-direction: column;
      .parts{
        height:46.15%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        &:last-child{
          margin-top:1.6%;
        }
        .part{
          flex:1;
          &:last-child{
            margin-left:1.6%;
          }
        }
      }
    }
  }
</style>
