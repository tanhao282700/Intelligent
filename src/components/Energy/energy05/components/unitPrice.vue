<template>
    <!-- 单价预设 -->
    <div class="unitDomBox thUnit">
    	<div class="unitPrice">
    		<span class="closeDoorInfo" @click="hideModel">×</span>
    		<div class="unitHeadBox">单价预设</div>
    		<el-form ref="form" :model="form">
    			<ul class="unit">
    				<li>序号</li>
    				<li>类型</li>
    				<li>能耗用途</li>
    				<li>表器选择</li>
            <li>时段类型</li>
    				<li>时间段</li>
    				<li>价格</li>
    			</ul>
    			<ul v-for="(item,index) in uls" class="itemsBox unit">
    				<li><i class="liCloseBox el-icon-circle-close" @click="removLi(index)"></i>{{index+1}}</li>
    				<li>
			            <el-select v-model="item.energyType" placeholder="类型">
			                <el-option label="电" value="1"></el-option>
			                <el-option label="水" value="2"></el-option>
			            </el-select>
    				</li>
    				<li>
			            <el-select v-model="item.energyTo" placeholder="类型">
			                <el-option label="电" value="1"></el-option>
			                <el-option label="水" value="2"></el-option>
			            </el-select>
    				</li>
    				<li>
			            <el-select v-model="item.energyWhere" placeholder="类型">
			                <el-option label="电" value="1"></el-option>
			                <el-option label="水" value="2"></el-option>
			            </el-select>
    				</li>
            <li>
              <el-select v-model="item.energyWhere" placeholder="类型">
                <el-option label="电" value="1"></el-option>
                <el-option label="水" value="2"></el-option>
              </el-select>
            </li>
    				<li>
    					<el-time-picker
						    is-range
						    v-model="item.dateRange"
						    range-separator="-"
						    start-placeholder="开始时间"
						    end-placeholder="结束时间"
						    placeholder="选择时间范围">
						</el-time-picker>
    				</li>
    				<li>{{item.val}}元</li>
    			</ul>
    			<div class="addMode"><span @click="addMode"><i class="el-icon-circle-plus"></i>添加模式</span></div>
			</el-form>
            <div class="btnGroupBox">
                <span>取消</span>
                <span class="btnOk">确定</span>
            </div>
    	</div>
    </div>

</template>

<script>
    export default {
        data(){
        	return{
        		uls:[
        			{val:888,energyType:'',energyWhere:'',energyTo:'',dateRange:'',},
        			{val:999,energyType:'',energyWhere:'',energyTo:'',dateRange:'',},
        			{val:111,energyType:'',energyWhere:'',energyTo:'',dateRange:'',},
        		],
        		form:{

        		}
        	}
        },
        methods:{
        	addMode(){
        		this.uls.push({val:999});
        	},
        	removLi(index){
        		this.uls.splice(index,1)
        	},
            hideModel(){
                this.$emit("unitShowBool",false);
            }
        }
    }
</script>

<style>
.btnGroupBox{position: absolute;right:20px;bottom:20px;}
.btnGroupBox span{display:inline-block;width:70px;height:26px;color:#fff;line-height: 26px;text-align: center;font-size: 12px;background:rgba(5,23,50,1);border-radius:2px;border:1px solid #4A90E2;cursor:pointer;}
.btnGroupBox span.btnOk{background:rgba(58,132,238,1);border:1px solid #1989FA;margin-left: 5px;}
</style>
<style>
  .thUnit .unit li{
    width:16.66%!important;
  }
  .thUnit .unit li:first-child{
    width:40px!important;
  }
  .thUnit .el-form ul li .el-input__inner{
    text-align: center;
    width:100%!important;
    padding:0!important;
  }
</style>
