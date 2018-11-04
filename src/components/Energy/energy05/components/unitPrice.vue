<template>
    <!-- 单价预设 -->
    <div class="unitDomBox thUnit">
    	<div class="unitPrice">
    		<span class="closeDoorInfo" @click="hideModel">×</span>
    		<div class="unitHeadBox" style="font-size:0.12rem;">单价预设</div>
    		<el-form ref="form" :model="form">
    			<ul class="unit titleUni">
    				<li>序号</li>
    				<li>类型</li>
    				<li>能耗用途</li>
    				<li>表器选择</li>
            <li>时段类型</li>
    				<li>时间段</li>
    				<li>价格</li>
    			</ul>
    			<ul v-for="(item,index) in list" class="itemsBox unit">
    				<li><i class="liCloseBox el-icon-circle-close" @click="removLi(item,index)"></i>{{index+1}}</li>
    				<li>
			            <el-select v-model="item.energy" placeholder="类型">
			                <el-option label="电" value="1"></el-option>
			                <el-option label="水" value="2"></el-option>
                      <el-option label="气" value="3"></el-option>
                  </el-select>
    				</li>
    				<li>
			            <el-select v-model="item.user_type" placeholder="能耗用途">
			                <el-option label="居民" value="居民"></el-option>
                      <el-option label="商业" value="商业"></el-option>
                  </el-select>
    				</li>
    				<li>
			            <el-select v-model="item.energyWhere" placeholder="表器选择">
			                <el-option label="电" value="1"></el-option>
			                <el-option label="水" value="2"></el-option>
			            </el-select>
    				</li>
            <li>
              <el-select v-model="item.time_type" placeholder="时段类型">
                <el-option label="无" value=""></el-option>
                <el-option label="谷时" value="谷时"></el-option>
                <el-option label="峰时" value="峰时"></el-option>
                <el-option label="平时" value="平时"></el-option>
              </el-select>
            </li>
    				<li>
    					<el-time-picker
						    is-range
						    v-model="item.dateRange"
						    range-separator="-"
                format="HH:mm"
                value-format="HH:mm"
						    start-placeholder="开始时间"
						    end-placeholder="结束时间"
						    placeholder="选择时间范围">
						</el-time-picker>
    				</li>
    				<li class="myInp">
              <el-input v-model="item.price" placeholder="请输入价格"></el-input>
              <span>元</span>
            </li>
    			</ul>
    			<div class="addMode" @click="addMode"><span><i class="el-icon-circle-plus"></i>添加模式</span></div>
			</el-form>
            <div class="btnGroupBox">
                <span @click="hideModel">取消</span>
                <span @click="setPrise" class="btnOk">确定</span>
            </div>
    	</div>
    </div>

</template>

<script>
    export default {
        data(){
        	return{
            list:[],
        		form:{

        		},
            deletForm:{
              project_id:'',
              sys_menu_id:'',
              price_set:''
            },
        	}
        },
      mounted(){
          this.deletForm.sys_menu_id = this.$store.state.sysList[2].sys_menu_id;
          this.deletForm.project_id = this.$store.state.projectId;
            this.initQuery()
      },
        methods:{
          setPrise(){
            console.log(this.list)
          },
          initQuery(){
            let sys_menu_id = this.$store.state.sysList[2].sys_menu_id;
            let project_id = this.$store.state.projectId;
              this.$http.post('/hotel_energy/statement',{
                project_id:project_id,
                sys_menu_id:sys_menu_id,
                query_price:true
              }).then((res)=>{
                if(res.data.code==0){
                  this.list = res.data.data.result_data.price_set_record
                  this.list.map((item)=>{
                      item.dateRange = [item.start,item.end]
                  })
                }else{

                }
              })
          },
        	addMode(){
        		this.list.push({val:999});
        	},
        	removLi(item,index){
        		/*this.uls.splice(index,1)*/
        		this.deletForm.price_set = JSON.stringify({
              self_id:item.self_id
            })
            this.$http.post('/hotel_energy/statement',this.deletForm).then((res)=>{
              if(res.data.code==0){
                this.list.splice(index,1)
              }
            })
        	},
          hideModel(){
            this.$emit("unitShowBool",false);
          },
        },
    }
</script>

<style>
.btnGroupBox{position: absolute;right:20px;bottom:20px;}
.btnGroupBox span{display:inline-block;width:70px;height:26px;color:#fff;line-height: 26px;text-align: center;font-size: 12px;background:rgba(5,23,50,1);border-radius:2px;border:1px solid #4A90E2;cursor:pointer;}
.btnGroupBox span.btnOk{background:rgba(58,132,238,1);border:1px solid #1989FA;margin-left: 5px;}
</style>
<style>
  .thUnit .unit li{
    width:16.6666%!important;
    font-size:0.12rem!important;
  }
  .thUnit .unit .el-range-input{
    font-size:0.12rem!important;
  }
  .thUnit .unit li:first-child{
    width:6%!important;
  }
  .thUnit .el-form ul li .el-input__inner{
    text-align: center;
    width:100%!important;
    padding:0!important;
  }
  .thUnit .unit{
    width:100%;
    height:0.4rem!important;
  }
  .thUnit .el-form ul{
    padding-left:6%!important;
  }
  .thUnit .el-form ul li{
    height:0.4rem!important;
    line-height:0.4rem!important;
  }
  .thUnit .addMode{
    height:0.4rem!important;
    line-height:0.4rem!important;
  }
  .thUnit .addMode:hover{
    cursor:pointer;
  }
  .thUnit .el-form{
    max-height:5rem;
    overflow-y:auto;
  }
  .thUnit .el-form ul.itemsBox li:first-child .liCloseBox{
    width:100%!important;
    height:100%!important;
    line-height:0.4rem;
    /*display: flex;
    align-items: center;
    justify-content: center;*/
  }

  .thUnit .myInp .el-input{
    width:80%!important;
  }
  .thUnit .myInp .el-input .el-input__inner{
    color:white;
    text-align: left;
  }
  .thUnit .titleUni li{
    font-size:0.14rem!important;
  }
</style>
