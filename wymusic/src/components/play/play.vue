<template>

  <div class="nmd">
      <div class="bg" >
        <div class="mask" :style="back"></div>
        <div class="container">
            <div class="header"></div>
            <div class="player">
                <div :class="class_biao" @click="change" data-id="biao">
                    <div data-id="biao">
                        <div class="circle" data-id="biao">
                            <img :src="song[0].al.picUrl" alt="" ref="img" data-id="biao">
                        </div>
                    </div>
                    <p data-id="biao">{{song[0].name}}</p>
                    <p data-id="biao">{{song[0].ar[0].name}}</p>
                </div>
                <div :class="class_li" @click="change" data-id="li">
                    <div>
                        <ul ref="ul" class="lyric">
                            <li v-for="(elem,i) of song_iyric" :key="i" :data-id="i">{{elem.lyric}}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="player_controls">
                <audio  :src="bgm_src" ref="audio" ></audio>       
                <div class="slider" @touchstart="handleTouchStart">
                    <div class="slider-track"></div>
                    <div class="slider-fill" :style="'width:'+sliderTime+'%'"></div>
                    <div class="slider-thumb" :style="'left:'+sliderTime+'%'"></div>
                </div>  
                <div class="control">
                    <div><img src="../../assets/song/prev.png" alt=""></div>
                    <div ><img @click="play" :src="img" alt=""></div>
                    <div><img src="../../assets/song/next.png" alt=""></div>   
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
            img:[],
            sliderTime:0,
            audio: {
                playing: false,
                minTime:0
            },
            currentTime: 0,
            values:0,
            num1:0,
            img:require('../../assets/song/play.png'),
            interval:"",
            interval_iyric:"",
            song:[] ,
            bg_img:"",
            bgm_src:"",
            class_biao:{
                biao:true,
                change:false
            },
            class_li:{
                li:true,
                change:true
            },
            song_iyric:[]
        }
    },
    created(){
        this.axios.get(
            "https://v1.itooi.cn/netease/song",
            {params:{
                id:186001
            }}
        ).then(res=>{
        this.song =res.data.data.songs
        this.axios.get(
            "https://v1.itooi.cn/tencent/url",
            {params:{
                id:"004Z8Ihr0JIu5s",
                quality:128,
                isRedirect:0
            }}
        ).then(res=>{
         this.bgm_src = res.data.data
         this.axios.get(
             "https://v1.itooi.cn/tencent/lrc",
             {params:{
                 id:"004Z8Ihr0JIu5s"
             }}
         ).then(res=>{
             console.log(res.data)
                var words=res.data.split("\n")
               var times =[]
            for (var  item of words){
                var obj ={}
                 obj.time = item.slice(1,item.indexOf("]"));
                 obj.lyric = item.slice(item.indexOf("]")+1)
                 times.push(obj)
            }
              for (var t of times){
                if(t.time == "00:00.00"){
                    var index = times.indexOf(t)
                }
              }
              times = times.slice(index)
             times.forEach(function(elem,i,arr){
                    var a  = elem.time.split(":");
                    elem.time = a[0]*60+parseFloat(a[1])
                    // console.log(elem)
                })
            this.song_iyric = times
            console.log(times)
         })
        })
         this.back = `background-image:url('${this.song[0].al.picUrl}')`
        })
    
    },
    watch:{
        num1(){
            //  var {
            //     maxTime,
            //     minTime,
            //     step
            // } = this.audio;
            this.currentTime = this.$refs.audio.currentTime
            this.sliderTime = (this.$refs.audio.currentTime/this.$refs.audio.duration)*100 
            console.log(1)
            console.log(this.$refs.audio.duration)
            if(this.sliderTime==100){
                this.img =require('../../assets/song/play.png')
                this.$refs.img.style.animationPlayState="paused"
                clearInterval(this.interval)
            }
            // this.currentTime = this.$refs.audio.currentTime
            // console.log(this.currentTime)
            // this.values = maxTime / this.$refs.audio.duration / maxTime;
        }
    },
    methods:{
        change(e){
            console.log(1)
            if(e.target.dataset.id=="biao"){
                this.class_biao.change =true;
                this.class_li.change =false
            }else{
                this.class_biao.change =false;
                this.class_li.change =true
            }
        },
        play(e){       
            var times = this.song_iyric   
            var lis =  this.$refs.ul.children
            // this.currentTime = this.$refs.audio.currentTime
            if(this.img==require('../../assets/song/play.png')){
               this.interval =setInterval(()=>{ 
                    this.num1++
                    // console.log(this.num1)
                },1000)
                this.interval_iyric =  setInterval(()=>{
                    if(this.currentTime>0){
                    for(  var now of times){
                        var n =times.indexOf(now)
                        // console.log(now)
                        if(n>times.length){n=times.length-1}
                        if(this.currentTime>times[n].time ){
                            // console.log(now.lyric)
                           for(var li=0;li<lis.length;li++){
                                // console.log(li)
                                // console.log(lis[li].dataset.id)
                                if( lis[li].dataset.id == n){
                                    lis[li].style.top =`${lis[li].style.top-li * 0.1}%`
                                    lis[li].style.color ="#fff"
                                    this.$refs.ul.style.top =(10-(li * 2.3))+"rem"
                                    // console.log(lis[li].offsetTop-document.body.scrollTop)
                                }else{
                                    lis[li].style.color ="#ccc"
                                }
                            }
                            continue;
                        }
                    }
                    }
                },1000)
                this.$refs.img.style.animationPlayState="running"
                 this.$refs.audio.play()
                 this.img = require('../../assets/song/paused.png')
            }else{
                clearInterval(this.interval_iyric)
                clearInterval(this.interval)
                 this.img = require('../../assets/song/play.png')
                 this.$refs.audio.pause()
                 this.$refs.img.style.animationPlayState="paused"
            }
        },
        handleTouchStart(e) {
            this.setValue(e.touches[0]);
            document.addEventListener('touchmove', this.handleTouchMove);
            document.addEventListener('touchup', this.handleTouchEnd);
            document.addEventListener('touchend', this.handleTouchEnd);
            document.addEventListener('touchcancel', this.handleTouchEnd);

            // e.preventDefault();
            // this.onDragStart(e);
        },
        handleTouchMove(e){
            // console.log(e.changedTouches[0])
            this.setValue(e.changedTouches[0]);
        },
        handleTouchEnd(e) {
            this.setValue(e.changedTouches[0]);
            document.removeEventListener('touchmove', this.handleTouchMove);
            document.removeEventListener('touchup', this.handleTouchEnd);
            document.removeEventListener('touchend', this.handleTouchEnd);
            document.removeEventListener('touchcancel', this.handleTouchEnd);
            // this.onDragStop(e);
        },
           setValue(e) {
            const $el=this.$el;
            var {
                minTime,
                step
            } = this.audio;
            let total_time = $el.offsetWidth * 0.85
            let mousemove = e.clientX -(($el.offsetWidth-total_time)/2)
            let value = mousemove / total_time
            // console.log($el.offsetWidth)
            // console.log($el.getBoundingClientRect().left)
            // value = Math.round(value / step) 
            value = value *100
            value = parseFloat(value.toFixed(5));
            console.log(value)
            if (mousemove>total_time) {
                value = 100;
            } else if (mousemove<minTime) {
                value = 0;
            }
          console.log(this.$refs.audio.duration)
            this.$refs.audio.currentTime = this.$refs.audio.duration * (value/100);
            this.sliderTime = value
            this.values =value
        }
    }
}
</script>

<style>
    html,body,#app,.nmd,.container{
        width:100%;
        height:100%;
    }
    .bg{
        width:100%;
        height:100%;
        position: relative;
    }
    .mask{
        position: absolute;
        width:100%;
        height:100%;
        filter: blur(30px);
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: 100% 100%;
        z-index: -1;
    }
    .header{
        width:100%;
        height:10%;
        background: #000;
    }
    .player{
        width:85%;
        height:65%;
        margin: 0 auto;
        position: relative;
    }
    .biao{
        padding-top:15%;
        width:100%;
        height:100%;
        position: absolute;
        text-align: center;
        transition: 0.5s linear;
        box-sizing: border-box
    }
    .biao>div{
        width:100%;
        height:70%;
        text-align: center;
        position: relative;
    }
    .biao p{
        color:#fff;
    }
    .biao p:nth-child(2){
         font-size: 1.6rem;
         margin : 1.5rem 0 0.3rem 0;
    }
    .biao p:last-child{
        font-size: 0.6rem;
        color:#ccc
    }
    .circle{
        width:80%;
        height:80%;
        border-radius: 50%;
         position: absolute;
        top:10%;
        left:10%;
    }
    .circle img{
        border-radius: 50%;
        width:90%;
        height:100%;
        transform: rotate(0deg);
        animation: come 30s linear both infinite;
        animation-play-state: paused
    }
    @keyframes come {
        0%{transform: rotate(0deg)}
        100%{transform: rotate(360deg)}
    }
    .li{
        width:100%;
        height:100%;
        position: absolute;
        transition: 0.5s linear;
    }
    .li>div{
        position: absolute;
        width:100%;
        height:100%;
        overflow:scroll;
    }
    .li ul{
        position: relative;
        top:10rem;
        transition:1s;
    }
    .li li{
        width:100%;
        height:1.3rem;
        margin-top:1rem;
        font-size: 1rem
    }
    .lyric{
        position: absolute;
        top:0;
        width:100%;
        height:100%;
        text-align: center;
        color:#ccc;
    }
    .change{
        opacity: 0;
        z-index: -1;
    }
    .player_controls{
        width:85%;
        height:17.5%;
        margin: 5% auto 0;
    }

    .slider {
  /* margin-top:100px; */
    width: 100%;
    position: relative;
    height: 30%;
    /* margin-bottom: 16px; */
    display: flex;
    align-items: center;
    cursor: default;
    user-select: none;
    outline: none;
}

.slider-track {
    position: absolute;
    height: 8%;
    left: 0;
    right: 0;
    top: 50%;
    margin-top: -0.1rem;
    background-color: #bec2c1;
}

.slider-fill {
    position: absolute;
    height: 8%;
    width: 100%;
    background-color: #e92e35;
    left: 0;
    top: 50%;
    margin-top: -0.1rem;
}

.slider-thumb {
    position: absolute;
    top: 50%;
    width: 4%;
    height: 35%;
    background-color: #e92e35;
    color: #e92e35;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
}
.control{
    width:100%;
    height:70%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.control div{
    width:10%;
    height:30%;
}
.control div:nth-child(2){
    width:20%;
    height:60%;
}
.control img{
    width: 100%;
    height:100%;
}
</style>
