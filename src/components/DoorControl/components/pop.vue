<template>
    <div class="pop" @click.stop="doorInfoHide"> 
        <div class="popBgBox">
            <div class="popHeadBox">消防通道 {{info}} </div>
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
        props:["info","infoSta","controlDoorFun",'itemIndex'],
        data () {
        	return {
                inStatu:''
        	}
        },
        mounted(){

        },
        methods:{
            doorInfoHide(){
                this.$emit("doorInfoHide",false);
            },
            openDoorByInt(){
                // alert(1);
                console.log(this.infoSta)
                this.inStatu = '开启';
                this.$emit('changeDoorStatus',{infoSta:this.inStatu,itemIndex:this.itemIndex,numS:1});
            }
           
        }
    }
</script>

<style type="text/css">

</style>