<template>
    <div class="pop" @click.stop="doorInfoHide"> 
        <div class="popBgBox">
            <div class="popHeadBox">{{info}} </div>
            <div class="popDoorStatus">
                <span>门禁状态</span>
                <span>{{infoSta}}</span>
            </div>
            <div class="popDoorControl">
                <span>门禁控制</span>
                <span @click.stop="openDoorByInt">{{controlDoorFun}}</span>
            </div>
        </div>
        <b class="arrowLeft"></b>
    </div>
</template>
<script>
    export default {
        props:["info","infoSta","controlDoorFun",'itemIndex','doorControlMsg'],
        data () {
        	return {
                inStatu:'',
                pointId:'',
                nowValue:''
        	}
        },
        mounted(){

        },
        watch:{
            infoSta(newVal,oldVal){
                this.infoSta = newVal;
            }
        },
        methods:{
            doorInfoHide(){
                this.$emit("doorInfoHide",false);
            },
            openDoorByInt(){
                console.log(this.doorControlMsg);
                this.pointId = this.doorControlMsg[0].pointId;
                this.nowValue = this.doorControlMsg[0].pointNow;
                this.inStatu = '开启';
                // this.$emit('changeDoorStatus',{infoSta:this.inStatu,itemIndex:this.itemIndex,numS:1});

                var that = this;
                this.$http.get('/realtime_pc/pc/control',{
                    point_id:that.pointId,
                    now_value:that.nowValue
                }).then(function(res){
                    // 响应成功回调
                    console.log(res.message);
                    that.$message('控制已发送');
                }, function(response){
                    // 响应错误回调
                });

            }
           
        }
    }
</script>

<style type="text/css">

</style>