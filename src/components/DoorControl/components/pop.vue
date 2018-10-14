<template>
    <div class="pop"> 
        <div class="popBgBox">
            <div class="popHeadBox">消防通道 {{info}} 号门</div>
            <div class="popDoorStatus">
                <span>门禁状态</span>
                <span>关闭</span>
            </div>
            <div class="popDoorControl">
                <span>门禁控制</span>
                <span>远程开门</span>
            </div>
        </div>
        <b class="arrowLeft"></b>
    </div>
</template>
<script>
    export default {
        props:["info"],
        data () {
        	return {
                
        	}
        },
        mounted(){

        },
        methods:{

           
        }
    }
</script>

<style type="text/css">

</style>