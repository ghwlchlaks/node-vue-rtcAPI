import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import Profile from '@/components/Profile'
import Songs from '@/components/Profile'
import CreateSong from '@/components/CreateSong'
import ViewSong from '@/components/ViewSong'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/songs',
      name: 'Songs',
      component: Songs
    },
    {
      path: '/songs/create',
      name: 'Songs-create',
      component: CreateSong
    },
    {
      path: '/songs/:songId',
      name: 'Song',
      component: ViewSong
    }
  ]
})