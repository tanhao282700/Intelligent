<template>
  <!-- 用能预设模块 -->
  <div class="reportTabBoxs reportMonth" v-loading="loading"
       element-loading-background="rgba(0, 0, 0, 0.5)"
       element-loading-spinner="el-icon-loading"
       element-loading-text="拼命加载中">
    <div class="reportTabBoxsHead reportDayQu">
      <el-select style="float:left;" v-model="formData.energy_type" placeholder="类型">
        <el-option label="电" value="0"></el-option>
        <el-option label="水" value="1"></el-option>
        <el-option label="气" value="2"></el-option>
      </el-select>
      <!--<span class="todaySpan">{{todaySpan}}</span>-->
      <div class="dateBox" style="float:left;">
        <el-date-picker class="reportDaySle" v-model="formData.query_date" value-format="yyyyMM" type="month" placeholder="月"></el-date-picker>
      </div>
      <div class="thSearchBtn" @click="query">
        <img src="../../../../assets/img/common/search.png" alt="">
        <button >查询</button>
      </div>
      <div class="thSearchBtn1" @click="export1">
        <img src="../../../../assets/img/Energy/export.png" alt="">
        <button>导出</button>
      </div>
    </div>
    <div class="reportTablesBox">
      <div class="con" :class="{opacity0:loading==true}" style="height:100%;">  <!--宽度要和表格宽度一致-->
        <el-table class="monthTab firstTab"  :data="tableData3"  :cell-class-name="cell" height="50vh"  >
          <el-table-column prop="index" label="序号" width="40">
          </el-table-column>
          <el-table-column label="名称">
            <el-table-column prop="day" label="日期" :width="columnw">
            </el-table-column>
          </el-table-column>
          <el-table-column :label="label.type">
            <el-table-column prop="elecMount" :label="label.text" :width="columnw">
            </el-table-column>
            <el-table-column prop="totalcaost" label="总费用" :width="columnw">
            </el-table-column>
          </el-table-column>
          <template v-for="item in areaList">
            <el-table-column :label="item.parent_area_til">
              <template v-for="child in item.sub_area">
                <el-table-column :label="child.title">
                  <el-table-column :prop="child.id+'useage'" label="用量" :width="columnw">
                  </el-table-column>
                  <el-table-column :prop="child.id+'cost'" label="费用" :width="columnw">
                  </el-table-column>
                </el-table-column>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        loading:true,
        label:{
          text:'总用电量',
          type:'电（KW/h）'
        },
        columnw:0,
        energyType:'气',
        todaySpan:'',
        releasetime1:'',
        tableData1:[
          {dateLab:"区域合计",
            data:2,
            index:13,
            elecMount:'',  //总用电量
            totalcaost:'', //总费用
          }
        ],
        tableData2:[{dateLab:"部门合计",
          data:2,
          index:14,
        }],
        tableData4:[{dateLab:"月均",
          data:2,
          index:15,
          elecMount:'',  //电量平均
          totalcaost:'', //总费用平均
        }],
        tableData3: [],
        areaList:[],
        formData:{
          project_id:1,
          choice_page:1,
          query_date:'',
          sys_menu_id:'',
          energy_type:"0"  //0电  1水  2气
        }
      }
    },
    mounted(){
        console.log(this.$store.state)
      let day = new Date()
      this.formData.query_date = String(day.getFullYear())+(day.getMonth()+1)
      this.formData.project_id = this.$store.state.projectId;
      this.formData.sys_menu_id = this.$store.state.sysList[2].sys_menu_id;
      this.setWidth();
      this.getData();
      this.getDateSet();

    },
    methods:{
      export1(){
        let date = ''
        if(this.formData.query_date){
          date = this.formData.query_date
        }else{
          let time = new Date()
          date = String(time.getFullYear())+(time.getMonth()+1)
        }
        let data = {
          project_id:this.formData.project_id,
          choice_page:1,
          query_date:date,
          sys_menu_id:this.formData.sys_menu_id,
          export:true,
          energy_type:this.formData.energy_type
        }
        this.$http.post('/hotel_energy/statement',data).then((res)=> {
          window.location.href='http://'+res.data
        })
      },
      query(){
        this.loading = true
        if(this.formData.energy_type==0){
          this.label.type = '电（KW/h）'
          this.label.text = '总用电量'
        }
        if(this.formData.energy_type==1){
          this.label.type = '水（m³）'
          this.label.text = '总用水量'
        }
        if(this.formData.energy_type==2){
          this.label.type = '气（m³）'
          this.label.text = '总用气量'
        }
        this.getData()
      },
      setWidth(){
        /*this.columnw = $(".reportTabBoxs ").width() / 24;*/
      },
      getData(){
        this.$http.post('/hotel_energy/statement',this.formData).then((res)=>{
          if(res.data.code==0){
              this.tableData3 = []
            let data = res.data.data.result_data
            this.areaList = res.data.data.result_data[0].data

            for(let i=0;i<data[1].data.length;i++){
              let rowObj = {}
              rowObj.index = i+1
              rowObj.day = data[1].data[i].area_id
              if(data[1].data[i].value[0] == 0){
                rowObj.elecMount = ''
              }else{
                rowObj.elecMount = data[1].data[i].value[0]
              }
              if(data[1].data[i].value[1] == 0){
                rowObj.totalcaost = ''
              }else{
                rowObj.totalcaost = data[1].data[i].value[1]
              }

              for(let j=0;j<data[2].area_monthly_data.length;j++){
                  for(let k=0;k<data[2].area_monthly_data[j].child_data.length;k++){
                    rowObj[data[2].area_monthly_data[j].child_data[k].id+'useage'] = data[2].area_monthly_data[j].child_data[k].detail_use_num[i]
                    rowObj[data[2].area_monthly_data[j].child_data[k].id+'cost'] = data[2].area_monthly_data[j].child_data[k].detail_cost[i]
                  }
              }



              this.tableData3.push(rowObj)
            }



            setTimeout(()=>{
              if($(".el-table__body").width()>$(".con").width()){
                $(".con").width($(".el-table__body").width())
              }else{
                $(".el-table__header").width($(".con").width())
                $(".el-table__body").width($(".con").width())
                $(".el-table__body").css("padding-right","7px")
              }


              $(".firstTab").height('100%')

              this.loading = false
            },500)
          }else{

          }
        });

      },
      getDateSet(){
        var sDate = new Date()
        var yyyy = sDate.getFullYear();
        var mm = sDate.getMonth() + 1;
        var dd = sDate.getDate();
        mm = mm < 10?'0'+mm:mm;
        dd = dd < 10?'0'+dd:dd;
        this.todaySpan = yyyy + '-' + mm + '-' + dd;
      },
      cell({row, column, rowIndex, columnIndex}) {
        //第八列添加 red 类
        if(columnIndex == 1){
          return 'cellMonth'
        }else if(columnIndex == 2 || columnIndex == 4 || columnIndex == 6 ||columnIndex == 8 ||columnIndex == 10 || columnIndex == 12 || columnIndex == 14 ||columnIndex == 16 ||columnIndex == 18 || columnIndex == 20 || columnIndex == 22 ){
          return 'darkBl'

        }else if(columnIndex == 3 || columnIndex == 5 || columnIndex == 7 ||columnIndex == 9 ||columnIndex == 11 || columnIndex == 13 || columnIndex == 15 ||columnIndex == 17 ||columnIndex == 19 || columnIndex == 21 || columnIndex == 23 ){
          return 'darkOr'

        }
      },
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {

      }
    }
  }
</script>

<style>
  .reportTablesBox>div:nth-child(2) .el-table__header-wrapper{display: none;}
  .reportTablesBox>div:nth-child(2) .el-table__body-wrapper>.el-table__body{border-top:1px solid rgba(45, 148, 240, 0.2);}
  .el-table .el-table__body td.cellMonth .cell{color:#2DF0E0!important;}
  .el-table .el-table__body td.darkBl .cell{color:#439AFF!important;}
  .el-table .el-table__body td.darkOr .cell{color:#FFA414!important;}
  .el-table__footer-wrapper tbody td{background:rgba(0,0,0,0);color:#fff;}
  .el-table__body-wrapper, .el-table__footer-wrapper, .el-table__header-wrapper{
    width:auto!important;
  }
  .el-table{
    max-width: inherit!important;
  }
  .reportTablesBox{
    width:100%;
    height:95%;
    overflow-x:auto;
    overflow-y:hidden;
  }
  .noshow .el-table__header-wrapper{
    display:none!important;
  }
  .reportMonth .gutter{
    display: none;
  }
  .mytab{
    padding-right:5px;
  }
  .mytab td{
    border-bottom:1px solid rgba(45, 148, 240, 0.2)!important;
    border-right:1px solid rgba(45, 148, 240, 0.2)!important;
    text-align:center;
  }
  .reportMonth .reportDayQu .dateBox{
    width:1rem!important;
  }
  .reportMonth .reportDayQu .dateBox .el-input__inner{
    width:1rem!important;
  }
  .reportMonth .reportDayQu .dateBox .el-input__prefix{
    left:inherit!important;
    right:0!important;
  }
  .opacity0{
    opacity:0;
  }
  /*.energyReport .el-table--border, .energyReport .el-table--group{
    width:auto!important;
  }*/
  .thSearchBtn{
    float:left;
    padding: 0 15px;
    border-radius: 2px;
    background: #3a84ee;
    border: 1px solid #1989fa;
    height: 32px;
    line-height: 32px;
    cursor: pointer;
    width: 88px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .thSearchBtn:hover{
    cursor: pointer;
  }
  .thSearchBtn img{
    width:18px;
    height:18px;
    display: inline-block;
  }
  .thSearchBtn button{
    background:none!important;
    border:none!important;
    color: #fff!important;
    font-size: 15px!important;
    margin-left:4px;
  }
  .thSearchBtn button:hover{
    cursor: pointer;
  }
  .thSearchBtn1{
    margin-right:8px;
    float:right;
    padding: 0 15px;
    border-radius: 2px;
    background: #3a84ee;
    border: 1px solid #1989fa;
    height: 32px;
    line-height: 32px;
    cursor: pointer;
    width: 88px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .thSearchBtn1:hover{
    cursor: pointer;
  }
  .thSearchBtn1 img{
    width:18px;
    height:18px;
    display: inline-block;
  }
  .thSearchBtn1 button{
    background:none!important;
    border:none!important;
    color: #fff!important;
    font-size: 15px!important;
    margin-left:4px;
  }
  .thSearchBtn1 button:hover{
    cursor: pointer;
  }
</style>
