
<template>
    <div>
       <ly-tab v-model="selectedId" :items="items" :options="options"></ly-tab>
       <div>
           
       </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            selectedId:0,
            items:[{label:"推荐"},{label:"LOOK直播"},{label:"别找我麻烦"},{label:"ACG音乐"},{label:"现场"},{label:"翻唱"},{label:"MV"},{label:"广场"},{label:"舞蹈"}],
            options:{}
        }
    },
    methods:{},
}
  
</script>

<style>
    .ly-tabbar{
        box-shadow:0 0 0 0 #fff !important;
        border-bottom:0 !important;
    }
</style>
