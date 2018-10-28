<template>
    <!-- 单价预设 -->
    <div class="unitDomBox">
    	<div class="unitPrice">
    		<span class="closeDoorInfo" @click="hideModel">×</span>
    		<div class="unitHeadBox">单价预设</div>
    		<el-form ref="form" :model="form">
    			<ul>
    				<li>序号</li>
    				<li>类型</li>
    				<li>能耗用途</li>
    				<li>表器选择</li>
    				<li>时间段</li>
    				<li>价格</li>
    			</ul>
    			<ul v-for="(item,index) in uls" class="itemsBox">
    				<li><i class="liCloseBox el-icon-circle-close" @click="removLi(index)"></i>{{index+1}}</li>
    				<li>
			            <el-select v-model="form.energyType" placeholder="类型">
			                <el-option label="电" value="1"></el-option>
			                <el-option label="水" value="2"></el-option>
			            </el-select>
    				</li>
    				<li>
			            <el-select v-model="form.energyTo" placeholder="类型">
			                <el-option label="电" value="1"></el-option>
			                <el-option label="水" value="2"></el-option>
			            </el-select>
    				</li>
    				<li>
			            <el-select v-model="form.energyWhere" placeholder="类型">
			                <el-option label="电" value="1"></el-option>
			                <el-option label="水" value="2"></el-option>
			            </el-select>
    				</li>
    				<li>
    					<el-time-picker
						    is-range
						    v-model="form.dateRange"
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
    	</div>
    </div>
    
</template>

<script>
    export default {
        data(){
        	return{
        		uls:[
        			{val:888},
        			{val:999},
        			{val:111},
        		],
        		form:{
        			energyType:'',
        			energyTo:'',
        			energyWhere:'',
        			dateRange:'',
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

</style>
