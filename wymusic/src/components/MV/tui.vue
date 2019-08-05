
<template>
    <div >
        <div class="container">
            <div class="video" >
                <video src="" @click="play"></video>
                <img :src="playing" alt=""  :class="isOpacity" @click="play">
            </div>
            <div class="title_name">
                <div class="title_top">
                    <span></span><img src="" alt="">
                </div>
                <div class="title_bottom">
                    <div>
                        <!-- <p></p>
                        <img src="" alt=""> -->
                    </div>
                    <div>
                        <div>
                            <!-- <img src="" alt=""><span></span> -->
                        </div>
                        <div>
                            <!-- <img src="" alt=""> <img src="" alt=""><img src="" alt=""> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            playing:require("../../assets/mv/play.png"),
            isOpacity:{
                opacity:false
            }
        }
    },
    methods:{
        play(e){
            if(this.playing ==require("../../assets/mv/play.png")){
                this.isOpacity.opacity = true
                this.playing = require("../../assets/mv/paused.png")
            }else{
                this.isOpacity.opacity = false
                this.playing =require("../../assets/mv/play.png")  
            }
        }
    },
    created(){
        this.axios.get(
            ""
        )
    }
}
</script>

<style scoped>
    .container{
        width:100%;
        height:20rem;
        background: #000;
    }
    .video{
        width:100%;
        height:65%;
        background: #f0f;
        position: relative;
    }
    .video video{
        width:100%;
        height:100%;
    }
    .video>img{
        position: absolute;
        width:15%;
        height:20%;
        top:40%;
        left:45%;
        transition: .5s;
    }
    .opacity{
        opacity: 0;
    }
    .title_name{
        width:100%;
        height:35%;
        background: #f00;
    }
    .title_top{
        display: flex;
        height:60%;
        background: #00f;
    }
    .title_top span{
        display: inline-block;
        width:60%;
        height:100%;
    }
</style>
