import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import MintUI from 'mint-ui'
import MV from './components/MV/mv_list'
import LyTab from 'ly-tab'
import tui from './components/MV/tui'
import play from './components/play/play.vue'
// import songlist from './components/songlist/song_list'
import { resolve } from 'url';

Vue.use(LyTab)
Vue.use(Router)
Vue.use(MintUI)

export default new Router({
  routes: [
    {path: '/',name: 'home',component: Home },
    {path: '/MV',component: MV },
    {path: '/tui',component: tui },
    {path: '/songlist',component:resolve => require(['./components/songlist/song_list'],resolve) },
    {path: '/play',component: play }
  ]
})
