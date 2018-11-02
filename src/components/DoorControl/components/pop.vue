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
        props:["info","infoSta","controlDoorFun"],
        data () {
        	return {
                
        	}
        },
        mounted(){

        },
        methods:{
            doorInfoHide(){
                this.$emit("doorInfoHide",false);
            },
            openDoorByInt(){
                console.log("远程开门控制");
            }
           
        }
    }
</script>

<style type="text/css">

</style>