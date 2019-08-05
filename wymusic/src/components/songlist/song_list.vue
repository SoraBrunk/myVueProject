
<template>
    <div>
        <div v-if="show">
        <div class="background">
            <div class="mask" :style="back"></div>
                <div class="header"></div>
                <div class="list_detail">
                    <div class="list_detail_left">
                        <img :src="list.coverImgUrl" alt="">
                    </div>
                    <div class="list_detail_right">
                        <p>{{list.name}}</p>
                        <div>
                            <span><img :src="list.creator.avatarUrl" alt=""></span><span>{{list.creator.nickname}}</span>
                        </div>
                        <p>{{list.description}}</p>
                    </div>
                </div>
                <div class="icons">
                    <div>
                        <img src="../../assets/songlist/message.png" alt=""><p>{{list.trackCount}}</p>
                    </div>
                    <div>
                        <img src="../../assets/songlist/share.png" alt=""><p>{{list.shareCount}}</p>
                    </div>
                    <div>
                        <img src="../../assets/songlist/download.png" alt=""><p>下载</p>
                    </div>
                    <div>
                        <img src="../../assets/songlist/check.png" alt=""><p>多选</p>
                    </div>
                </div>
            
        </div>
        <div class="play_bar">
            <div class="play_bar_left">
                <img src="../../assets/songlist/play.png" alt="">
                <span>播放全部</span>
                <span>(共{{song_list.length}}首)</span>
            </div>
            <div class="play_bar_right">
                <p>+ 收藏({{list.subscribedCount}})</p>
            </div>
        </div>
        <div class="play_song" v-for="(elem,i) of song_list" :key="i">
            <div class="play_song_left">
                <div>
                    {{i+1}}
                </div>
                <div class="song_details">
                    <p>{{elem.name}}</p>
                    <span v-for="(name,index) of elem.artists" :key="index">{{name.name}}</span>
                </div>
            </div>
            <div class="play_song_right">
                <img src="../../assets/songlist/play_song.png" alt="">
                <img src="../../assets/songlist/more.png" alt="">
            </div>
        </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            list:[],
            back:"",
            song_list:[],
            show:false
        }
    },
    created(){
        this.axios.get(
            "https://v1.itooi.cn/netease/songList",
            {params:{
                id:2531923303
            }}
        ).then(res=>{
            this.list = res.data.data;
            console.log(res.data.data)
            this.song_list = res.data.data.tracks
            this.back = `background-image:url('${this.list.coverImgUrl}')`
            this.show = true
        })
    }
}
</script>

<style>
    .background{
        width:100%;
        height:20rem;
        color:#fff;
        /* filter: blur(10px);
        z-index: -1 */
        position: relative;
    }
    .mask{
        position: absolute;
        width:100%;
        height:100%;
        filter: blur(10px);
         background-repeat: no-repeat;
        background-position: 50%;
        background-size: 100%;
        z-index: -1;
    }
    .header{
        width:100%;
        height:15%;
        background: #000;
    }
    .list_detail{
        width:100%;
        height:60%;

        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .list_detail_left{
        width:40%;
        height:80%;
    }
    .list_detail_left img{
        width:100%;
        height:100%;
        border-radius: 1rem
    }
    .list_detail_right{
        width:50%;
        height:80%;
    }
    .list_detail_right>p{
        margin:0;
    }
    .list_detail_right>p:first-child{
        font-size: 1.1rem
    }
    .list_detail_right div{
        margin:1.5rem 0 1rem 0;
        display: flex;
        align-items: center;
    }
    .list_detail_right>p:last-child{
        width:100%;
        font-size: 0.6rem;
        word-break:break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    .list_detail_right div>span:first-child{
        display: inline-block;
        width:15%;
        height:1.5rem;
    }
    .list_detail_right div>span:first-child img{
        width:100%;
        height:100%;
    }
    .list_detail_right div>span:last-child{
        font-size: 0.6rem;
    }
    .icons{
        width:100%;
        height:25%;
        display: flex;
        justify-content: space-between;
    }
    .icons p{
        margin:0;
        color:#fff;
    }
    .icons div{
        width:20%;
        height:100%;
        text-align: center;
    }
    .icons img{
        width:30%;
        height:30%;
        margin-top:0.4rem
    }
    .play_bar{
        margin-top:-0.2rem;
        width:100%;
        height:3rem;
        border-radius: 1.5rem;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .play_bar_left{
        margin-left: 0.5rem;
        width:45%;
        height:100%;
        display: flex;
        align-items: center;
        justify-content: space-around
    }
    .play_bar_left img{
        width:15%;
        height:40%;
        margin-right:0.3rem;
    }
     .play_bar_left span:nth-child(2){
         font-size: 1rem;
     }
     .play_bar_left span:last-child{
         color:#ccc;
         font-size: 0.5rem;
     }
     .play_bar_right{
         width:30%;
         height:60%;
         background: red;
         color:#fff;
         text-align: center;
         line-height: 2.5;
         font-size: 0.5rem;
         border-radius: 1.5rem;
         margin-right: 0.5rem;
         box-shadow: 0rem 0rem 0.1rem 0.1rem orangered
     }
     .play_song{
         width:100%;
         height:5rem;
         color:#000;
         display: flex;
         justify-content: space-between;
     }
     .play_song_left{
         display:flex;
         align-items:center;
         width:80%;
     }
     .play_song_left div:first-child{
         height:100%;
         margin: 0 1rem;
         color:#aaa;
         font-size: 1.3rem;
         line-height: 5rem;
     }
     .play_song_right{
         width:20%;
         height:100%;
         line-height: 6rem;
     }
     .play_song_right img{
         width:30%;
         height:30%;
         margin-left: 0.8rem;
     }
     .song_details p{
         font-size: 0.9rem;
         word-break:break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
     }
     .song_details span{
         font-size: 0.5rem;
         margin-top:0.3rem;
         color:#aaa;
     }
     .song_details span~span::before{
         content:"/"
     }
</style>
