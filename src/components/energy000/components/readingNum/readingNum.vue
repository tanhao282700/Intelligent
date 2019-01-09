
<!--
    能源系统 实时读数
    made by 白富友
    start in 2018-8-7
-->
<template>
  <div class="reading boxs"
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
        <div class="searchBox">
            <div class="searchBox0" v-show="titHeads[0].state">
              <div class="tRBrnBox">
                <el-cascader
                  :change-on-select='true'
                  :options="floorOptions"
                  v-model="floorSelectedOptions"
                  @change="floorChange">
                </el-cascader>
              </div>
               <!--<SelectBox :data = 'selectID' @choose = "areaChoose"/>-->
            </div>
             <div class="searchBox02" v-show="titHeads[1].state">
               <div class="tRBrnBox">
                 <el-cascader
                   :change-on-select='true'
                   :options="sysOptions"
                   v-model="sysSelectedOptions"
                   @change="sysChange">
                 </el-cascader>
               </div>
               <!--<SelectBox3 :data = 'selectID2' @choose = "areaChoose2"/>-->
            </div>
            <el-button @click = "search()" class="searchBtn" type="primary" icon="el-icon-search">查询</el-button>
        </div>
    </div>
    <div class="readingBody">
        <div class="readDatas boxs boxs2">
            <div class="boxsTit">实时能耗</div>
            <div class="readBoxs boxsIn">
                <div v-for="(v,i) in nowDatas" class="readImgBox" @click="titHeads[0].state?showInfoCir(v.id):showInfoCir2(v.id)">
                    <img :src="v.img" alt="">
                    <img class="imgs0" :src="require('../../../../assets/img/circle/boxP.png')" alt="">
                    <div class="readImgUtil" v-text="v.util"></div>
                    <ul class="readImgVal">
                      <li v-for="(v0,i0) in v.val" v-text = "v0"></li>
                    </ul>
                    <div class="readImgTit" v-text="v.tit"></div>
                </div>
            </div>
         </div>
         <div v-for="(v,i) in lists" class="readDatas boxs" :class="{'readDatasB':i>lists.length-2}">
             <line-echarts-en2 :datas ='v.echarts' ref = "lineEchartssss"  :key = "v.id"/>
         </div>
    </div>
    <en-read-dialog wid = "5.76rem" hei = "3.37rem" ref = "dialog" tit = "记录详情">
        <el-scrollbar style="height:100%">
            <div class="showBox2" :class="{'showBox3':details.length>3}">
                <div v-for="(v,i) in details"  class="readImgBox"  :class="{'readImgBox2':details.length>3}">
                    <div class="imgBoxss">
                        <img :src="v.img" alt="">
                        <img class="imgs0" :src="require('../../../../assets/img/circle/boxP.png')" alt="">
                        <div class="readImgUtil" v-text="v.util"></div>
                        <ul class="readImgVal">
                        <li v-for="(v0,i0) in v.val" v-text = "v0"></li>
                        </ul>
                    </div>
                    <div class="readImgTit" v-text="v.tit"></div>
                </div>
            </div>
        </el-scrollbar>
    </en-read-dialog>
  </div>
</template>

<script>

import utils from '../../../../assets/js/utils';
import SelectHead from '../../../../components/common/selectHead';
import SelectBox from './selectBox';
import SelectBox3 from '../../../../components/common/selectBoxE';
import LineEchartsEn2 from "./lineEchartsEn2";
import EnReadDialog from "./enReadDialog";


export default {
    components:{
      EnReadDialog,
      LineEchartsEn2,
    'SelectHead':SelectHead,
    'SelectBox':SelectBox,
    'SelectBox3':SelectBox3,
  },
  data () {
    return {
      sysSelectedOptions:[],
      sysOptions: [],
      floorSelectedOptions:[],
      floorOptions: [],
        loading:false,
        selectID:{
            sId:1,
        },
        selectID2:{
            sId:1,
        },
        details:[],
        nowDatas:[
            {id:1,val:[0,0,0,0,0,0,0,0,0,0],tit:'用水总量',util:'m³',img:require('../../../../assets/img/circle/greenBox.png')},
            {id:0,val:[0,0,0,0,0,0,0,0,0,0],tit:'用电总量',util:'kw/h',img:require('../../../../assets/img/circle/blueBox.png')},
            {id:2,val:[0,0,0,0,0,0,0,0,0,0],tit:'用气总量',util:'m³',img:require('../../../../assets/img/circle/orangeBox.png')},
        ],
        lists:[
            {
                id:1,
                echarts:{
                    id:'lineEchartShui',
                    type:'shui',
                    unit:'m³',
                    title:'水',
                    // titShow:false,
                    style:{width:'6.23rem',height:239*100/728+'vh'},
                    xDate:[],
                    list:[
                        {name:'碳排放',data:[]},
                        {name:'能耗值',data:[]},
                    ]
                }
            },
            {
                id:2,
                echarts:{
                    id:'lineEchartQi',
                    type:'qi',
                    unit:'m³',
                    title:'气',
                    // titShow:false,
                    style:{width:'6.23rem',height:239*100/728+'vh'},
                    xDate:[],
                    list:[
                        {name:'碳排放',data:[]},
                        {name:'能耗值',data:[]},
                    ]
                }
            },
            {
                id:0,
                echarts:{
                    id:'lineEchartDian',
                    type:'dian',
                    unit:'kw/h',
                    title:'电',
                    // titShow:false,
                    style:{width:'6.23rem',height:239*100/728+'vh'},
                    xDate:[],
                    list:[
                        {name:'碳排放',data:[]},
                        {name:'能耗值',data:[]},
                    ]
                }
            },
        ],
        titHeads:[
            {id:1,tit:'区域',state:true},
            {id:2,tit:'系统',state:false},
        ],
        areaId:0,  //区域ID
      areaId2:0,  //系统ID
        //sysId:0, //那个啥
        data1:null,
        data2:null,
    }
  },
  watch:{
    sysSelectedOptions(newVal){
      if (newVal.length ===0){
        this.areaId2 = 0
      } else {
        this.areaId2 = newVal[newVal.length-1];
      }
    },
    floorSelectedOptions(newVal){
      if (newVal.length ===0){
        this.areaId = 0
      } else {
        this.areaId = newVal[newVal.length-1];
      }
    }
  },
  methods:{
    sysChange(val){
      console.log(val,this.sysSelectedOptions)
    },
    floorChange(val){
      console.log(val,this.floorSelectedOptions)
    },
    search(){
        let bool= this.titHeads[0].state;
        if(bool){
            this.requestData();
        }else{
            this.requestData2();
        }
    },
    changeHead(id){ //切换区域和系统
        if(id == 1){
          this.floorSelectedOptions = [];
          this.areaId = 0;
          this.requestData();
        }else if(id==2){
          this.sysSelectedOptions = [];
          this.areaId2 = 0;
          this.requestData2();
        }

    },
    //修改区域
    // areaChoose(id){
    //     this.areaId= id;
    // },
    //修改系统
    // areaChoose2(id){
    //     this.sysId= id;
    // },
    showInfoCir(id){
        /*let obj = null;
         switch(id){
            case 1:
                obj={id:0,val:[],tit:'',util:'m³',img:require('../../../../assets/img/circle/greenBox.png')};
            break;
            case 0:
             obj={id:0,val:[],tit:'',util:'kw/h',img:require('../../../../assets/img/circle/blueBox.png')};
            break;
            case 2:
            obj={id:0,val:[],tit:'',util:'m³',img:require('../../../../assets/img/circle/orangeBox.png')};
            break;
        }*/
        let imgArrSel = [require('../../../../assets/img/circle/blueBox.png'),require('../../../../assets/img/circle/greenBox.png'),require('../../../../assets/img/circle/orangeBox.png')];
        let attrs = [];
        let data = {
          sys_menu_id:this.$store.state.sysList[18].sys_menu_id,
          type:id,
          project_id:this.$store.state.projectId,
          floor_id:this.areaId,

        };
         this.loading = true;
      let that = this;
      let headers = {
        //'Content-Type': 'multipart/form-data'
      }
      this.$http.post('pc/2.0/energy/operation/floor_device_real_time', data, headers).then(res => {
        this.loading =false;
        let data0 = res.data;
        console.log('表器能耗值', data, res);
        if(data0.code==0){
          let data2 = data0.data;
          /*data2 = [
            {
              "data": [
                {
                  "data": "240V",
                  "title": "2号位电压"
                },
                {
                  "data": "12.4A",
                  "title": "2号位电流"
                },
                {
                  "data": "220V",
                  "title": "3号位电压"
                },
                {
                  "data": "12.6A",
                  "title": "3号位电流"
                },
                {
                  "data": [
                    "0"
                  ],
                  "title": "other"
                },
                {
                  "data": 16,
                  "title": "read"
                },
                {
                  "data": "260V",
                  "title": "电压"
                },
                {
                  "data": "7.3A",
                  "title": "电流"
                }
              ],
              "device": "末端电表"
            }
          ]*/
          let lens = data2.length;
          if(lens>0){
            this.$refs.dialog.show();
            for(let i =0 ;i<lens;i++){
              //console.log(data2[i].device)
              let obj = {};
              obj.id = i;
              obj.tit = data2[i].device;
              if (id ==0){
                obj.img = imgArrSel[0];
                obj.util = 'kw/h';
              } else if (id == 1) {
                obj.img = imgArrSel[1];
                obj.util = 'm³';
              } else if (id == 2) {
                obj.img = imgArrSel[2];
                obj.util = 'm³';
              }
              let tempVal=0;
              data2[i].data.some((item0,i0)=>{
                if (item0.title == 'read'){
                  tempVal = item0.data;
                  return true;
                }
              })
              obj.val = this.getAttrs(tempVal);
              attrs.push(obj);
            }
            this.details =attrs;
            //console.log(attrs)
          }else{
            this.$message('设备为空');
          }

        }else{
          this.$message(data0.message);
        }
      }).catch(err=>{
        this.loading = false;
        console.log(err);
      })

    },
    showInfoCir2(id){
      let obj = null;
      switch(id){
        case 1:
          obj={id:0,val:[],tit:'',util:'m³',img:require('../../../../assets/img/circle/greenBox.png')};
          break;
        case 0:
          obj={id:0,val:[],tit:'',util:'kw/h',img:require('../../../../assets/img/circle/blueBox.png')};
          break;
        case 2:
          obj={id:0,val:[],tit:'',util:'m³',img:require('../../../../assets/img/circle/orangeBox.png')};
          break;
      }
      let attrs = [];
      let data = {
        type:id,
        project_id:this.$store.state.projectId,
        system_id:this.areaId2,

      };
      this.loading = true;
      let that = this;
      let headers = {
        //'Content-Type': 'multipart/form-data'
      }
      this.$http.post('pc/2.0/energy/operation/system_device_real_time', data, headers).then(res => {
        this.loading =false;
        let data0 = res.data;
        console.log('系统表器能耗值', data, res);
        if(data0.code==0){
          let data2 = data0.data;
          /*data2 = [
            {
              "data": [
                {
                  "data": "240V",
                  "title": "2号位电压"
                },
                {
                  "data": "12.4A",
                  "title": "2号位电流"
                },
                {
                  "data": "220V",
                  "title": "3号位电压"
                },
                {
                  "data": "12.6A",
                  "title": "3号位电流"
                },
                {
                  "data": [
                    "0"
                  ],
                  "title": "other"
                },
                {
                  "data": 16,
                  "title": "read"
                },
                {
                  "data": "260V",
                  "title": "电压"
                },
                {
                  "data": "7.3A",
                  "title": "电流"
                }
              ],
              "device": "末端电表"
            }
          ]*/
          let lens = data2.length;
          if(lens>0){
            this.$refs.dialog.show();
            for(let i =0 ;i<lens;i++){
              let obj0 = obj;
              obj.id = i;
              obj.tit = data2[i].device;
              let tempVal=0;
              data2[i].data.some((item0,i0)=>{
                if (item0.title == 'read'){
                  tempVal = item0.data;
                  return true;
                }
              })
              obj.val = this.getAttrs(tempVal);
              attrs.push(obj0);
            }
            this.details =attrs;
          }else{
            this.$message('设备为空');
          }

        }else{
          this.$message(data0.message);
        }
      }).catch(err=>{
        this.loading = false;
        console.log(err);
      })

    },
    getAttrs(nums){ //将获取到的数字，改成10位的数组
        let attrs = String(nums).split('');
        let lens = attrs.length;
        let res = [];
        for(let i=0;i<10;i++){
            if(i<lens){
               res.push(attrs[i]);
            }else{
                res.unshift('0');
            }
        }
        return res;
    },
    requestData(){  //区域的时候
      this.floorOptions = [];
        let data = {
            project_id:this.$store.state.projectId,
            sys_menu_id:this.$store.state.sysList[18].sys_menu_id,
            floor_id:this.areaId
        };
        this.loading = true;
      let that = this;
      let headers = {
        //'Content-Type': 'multipart/form-data'
      }
      this.$http.post('pc/2.0/energy/operation/floor_real_time', data, headers).then(res => {
        this.loading =false;
        let data0 = res.data;
        console.log('按区域实时读数', data, res);
        if(data0.code==0){
          let data2 = data0.data;

          //楼层数据
          let area_level = data2.area_level;
          let dealedFloor = JSON.parse(JSON.stringify(area_level).replace(/title/g,'label').replace(/parent_id/g,'parent').replace(/id/g,'value').replace(/child/g,'children').replace(/\"children\"\:\[\]\,/g,''));
          this.floorOptions = dealedFloor;
          this.floorOptions.unshift({
            label:'全部区域',
            value:0,
          });

          let read = data2.read;
          let attr1 =this.getAttrs(read.shui);
          let attr2 =this.getAttrs(read.dian);
          let attr3 =this.getAttrs(read.qi);
          this.nowDatas[0].val =attr1;
          this.nowDatas[1].val =attr2;
          this.nowDatas[2].val =attr3;
          //lists [0]水   [1]气   [2]电
          let table = data2.table;
          this.lists[0].echarts.xDate = table.shui.time;
          this.lists[1].echarts.xDate = table.qi.time;
          this.lists[2].echarts.xDate = table.dian.time;

          this.lists[0].echarts.list[0].data = table.shui.data_t;
          this.lists[0].echarts.list[1].data = table.shui.data;

          this.lists[1].echarts.list[0].data = table.qi.data_t;
          this.lists[1].echarts.list[1].data = table.qi.data;

          this.lists[2].echarts.list[0].data = table.dian.data_t;
          this.lists[2].echarts.list[1].data = table.dian.data;

          this.$refs.lineEchartssss[0].drawLine();
          this.$refs.lineEchartssss[1].drawLine();
          this.$refs.lineEchartssss[2].drawLine();
          //this.dealData(data2,1);
        }else{
          this.$message(data0.message);
        }
      }).catch(err=>{
        this.loading = false;
        console.log(err);
      })

    },
    requestData2(){ //选择系统的时候
      this.sysOptions = [];
      let data = {
        project_id:this.$store.state.projectId,
        system_id:this.areaId2,
      };
      this.loading = true;
      let that = this;
      let headers = {
        //'Content-Type': 'multipart/form-data'
      }
      this.$http.post('pc/2.0/energy/operation/system_real_time', data, headers).then(res => {
        this.loading =false;
        let data0 = res.data;
        console.log('按系统实时读数', data, res);
        if(data0.code==0){
          let data2 = data0.data;

          //系统数据
          let sys_level = data2.sys_level;
          let dealedSys = JSON.parse(JSON.stringify(sys_level).replace(/title/g,'label').replace(/parent_id/g,'parent').replace(/id/g,'value').replace(/child/g,'children').replace(/\"children\"\:\[\]\,/g,''));
          this.sysOptions = dealedSys;
          this.sysOptions.unshift({
            label:'全部系统',
            value:0,
          });
          let read = data2.read;
          let attr1 =this.getAttrs(read.shui);
          let attr2 =this.getAttrs(read.dian);
          let attr3 =this.getAttrs(read.qi);
          this.nowDatas[0].val =attr1;
          this.nowDatas[1].val =attr2;
          this.nowDatas[2].val =attr3;
          //lists [0]水   [1]气   [2]电
          let table = data2.table;
          this.lists[0].echarts.xDate = table.shui.time;
          this.lists[1].echarts.xDate = table.qi.time;
          this.lists[2].echarts.xDate = table.dian.time;

          this.lists[0].echarts.list[0].data = table.shui.data_t;
          this.lists[0].echarts.list[1].data = table.shui.data;

          this.lists[1].echarts.list[0].data = table.qi.data_t;
          this.lists[1].echarts.list[1].data = table.qi.data;

          this.lists[2].echarts.list[0].data = table.dian.data_t;
          this.lists[2].echarts.list[1].data = table.dian.data;

          this.$refs.lineEchartssss[0].drawLine();
          this.$refs.lineEchartssss[1].drawLine();
          this.$refs.lineEchartssss[2].drawLine();
        }else{
          this.$message(data0.message);
        }
      }).catch(err=>{
        this.loading = false;
        console.log(err);
      })

    },
    dealData(data,id){
        if(id==1){
            this.data1 = data;
        }else{
            this.data2 = data;
        }
        let read = data.read;
        let attr1 =this.getAttrs(read.shui);
        let attr2 =this.getAttrs(read.dian);
        let attr3 =this.getAttrs(read.qi);
        this.nowDatas[0].val =attr1;
        this.nowDatas[1].val =attr2;
        this.nowDatas[2].val =attr3;
        //lists [0]水   [1]气   [2]电
        let table = data.table;
        this.lists[0].echarts.xDate = table.shui.time;
        this.lists[1].echarts.xDate = table.qi.time;
        this.lists[2].echarts.xDate = table.dian.time;

        this.lists[0].echarts.list[0].data = table.shui.data_t;
        this.lists[0].echarts.list[1].data = table.shui.data;

        this.lists[1].echarts.list[0].data = table.qi.data_t;
        this.lists[1].echarts.list[1].data = table.qi.data;

        this.lists[2].echarts.list[0].data = table.dian.data_t;
        this.lists[2].echarts.list[1].data = table.dian.data;

        this.$refs.lineEchartssss[0].drawLine();
        this.$refs.lineEchartssss[1].drawLine();
        this.$refs.lineEchartssss[2].drawLine();
    }
  },
  created() {
      this.requestData();
  },
  mounted() {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">
@import '../../../../assets/css/comon.less';
.reading{
    width:13.06rem;
    height:79vh;
    margin-top:0.02rem;
    display:flex;
    flex-direction:column;
    .readingTit{
        height:8.24vh;
        overflow: hidden;
        .titSeletBox{
            width: 4.8rem;
            .vh(48);
            position: relative;
            left: 4.13rem;
            .vhPT(16);
            float: left;
        }
        .searchBox{
            width: 3.78rem;
            .vh(48);
            float: right;
            .vhPT(16);
            margin-right: 0.2rem;
          .tRBrnBox{
            .el-cascader{
              .vhLineH(32);
              font-size: 0.12rem;
            }
            .el-cascader__label{
              color: #fff;
            }
            .el-cascader .el-icon-arrow-down.is-reverse{
              transform: rotateZ(0deg);
            }
            .el-cascader-menu__item {
              font-size: 0.12rem;
              padding: 8px 20px;
              position: relative;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              color: #606266;
              height: 34px;
              line-height: 1.5;
              -webkit-box-sizing: border-box;
              box-sizing: border-box;
              cursor: pointer;
              outline: 0;
            }
            .el-cascader .el-input__icon{
              display:block;
              width:0;
              height:0;
              border-width:4px 4px 0;
              border-style:solid;
              border-color:#008aff transparent transparent;/*黄 透明 透明 */
              position:absolute;
              top:50%-4px;
              left:-0.05rem;
              &::before{
                content: "";
                /*pointer-events: none;
                display:block;
                width:0;
                height:0;
                border-width:4px 4px 0;
                border-style:solid;
                border-color:#008aff transparent transparent;!*黄 透明 透明 *!*/

              }
            }

            &:nth-of-type(3){
              margin-left: 0;
            }
            .el-select::after{
              content: "";
              pointer-events: none;
              display:block;
              width:0;
              height:0;
              border-width:4px 4px 0;
              border-style:solid;
              border-color:#008aff transparent transparent;/*黄 透明 透明 */
              position:absolute;
              top:50%-4px;
              right:0;
            }
            margin-left: 0.17rem;
            width: 0.88rem;
            .el-input{
              background-color: transparent!important;
            }
            .el-input--suffix .el-input__inner{
              .vh(24);
              padding: 0;
              border: 0!important;
              border-bottom: solid 1px #1989fa!important;
              background-color: transparent!important;
            }
          }


            .searchBox0{
                .vh(32);
                width: 1.2rem;
                border: solid 1px #3a84ed;
                border-radius: 0.02rem;
              margin-left: 1.5rem;
                overflow: hidden;
                 float: left;
                 .chooseBox2000{
                     text-align: center;
                     flex:1;
                     margin-left: 0.16rem;
                 }
            }
            .searchBox02{
                width: 1.2rem;
                .vh(32);
                border: solid 1px #3a84ed;
                border-radius: 0.02rem;
                margin-left: 1.5rem;
                overflow: hidden;
                 float: left;
                 .chooseBox2000{
                     text-align: center;
                     flex:1;
                     margin-left: 0.16rem;
                 }
            }
            .searchBtn{
                width: 0.87rem;
                .vh(32);
                float: right;
                overflow: hidden;
                padding: 0;
                .vhLH(32);
            }
        }
    }
    .readingBody{
        flex:1;
        .readDatas{
            width: 6.23rem;
            .vh(239);
            float: left;
            margin-left: 0.2rem;
            .vhMB(20);
            display:flex;
            flex-direction: column;
            .readTit{
                .vh(39);
                .vhLH(39);
                padding-left: 0.2rem;
                color: @color-blue;
                font-size: 0.16rem;
                background-color: rgba(46, 121, 232, 0.3);
            }
            .readBoxs{
                flex:1;
                display: flex;
                align-content: center;
                padding: 0 0.15rem;
                .readImgBox{
                    flex:1;
                    position: relative;
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    .vhPT(9);
                    img{
                        display: inline-block;
                        .vh(163);
                        width:163*100/728vh;
                    }
                    .imgs0{
                        position: absolute;
                        left: 0.9rem;
                        top: 47*100/728vh;
                        width: 0.1rem;
                        .vh(11);
                    }
                    .readImgUtil{
                        position: absolute;
                        top: 70*100/728vh;
                        right:0.48rem;
                        font-size:0.1rem;
                        color:#fff;
                    }
                    .readImgVal{
                        width: 1.24rem;
                        .vh(18);
                        position: absolute;
                        top: 82*100/728vh;
                        left:0.38rem;
                        li{
                            float: left;
                            width: 0.12rem;
                            .vh(17);
                            border:1px solid #fff;
                            text-align: center;
                            .vhLH(15);
                            background: #4d5c76;
                            color: #fff;
                            font-size: 0.1rem;
                        }
                    }
                    .readImgTit{
                        .vh(15);
                        .vhLH(18);
                        color:@color-blue;
                        font-size: 0.12rem;
                    }
                }
            }
        }
        .readDatasB{
            margin-bottom: 0;
        }
    }
    .showBox2{
        width: 100%;
        display: flex;
        .readImgBox{
            flex:1;
            display: flex;
            align-items: center;
            flex-direction: column;
            .vhPT(46);
            .imgBoxss{
                width: 163*100/728vh;
                .vh(163);
                position: relative;
                img{
                    display: inline-block;
                    width: 100%;
                    height: 100%;
                }
                .imgs0{
                    position: absolute;
                    left: 73*100/728vh;
                    top: 38*100/728vh;
                    width: 0.1rem;
                    .vh(11);
                }
                .readImgUtil{
                    position: absolute;
                    top: 62*100/728vh;
                    right:15*100/728vh;
                    font-size:0.1rem;
                    color:#fff;
                }
                .readImgVal{
                    width: 1.24rem;
                    .vh(18);
                    position: absolute;
                    top: 74*100/728vh;
                    left:17*100/728vh;
                    li{
                        float: left;
                        width: 0.12rem;
                        .vh(17);
                        border:1px solid #fff;
                        text-align: center;
                        .vhLH(15);
                        background: #4d5c76;
                        color: #fff;
                        font-size: 0.1rem;
                    }
                }

            }
            .readImgTit{
                .vh(72);
                .vhLH(62);
                color:@color-blue;
                font-size: 0.12rem;
            }
        }
    }
    .showBox3{
        flex-wrap: wrap;
        overflow: hidden;
        padding-bottom: 0.4rem;
        .readImgBox2{
            // margin-bottom: 0.4rem;
        }
    }
}

</style>
