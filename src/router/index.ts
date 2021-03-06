import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/home/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  // 排行榜
  {
    path: '/rankingList',
    name: 'rankingList',
    component: () => import('../views/rankingList/index.vue')
  },
  // 歌单
  {
    path: '/songList',
    name: 'songList',
    component: () => import('../views/songList/index.vue')
  },
  // 歌手
  {
    path: '/singers',
    name: 'singers',
    component: () => import('../views/singers/index.vue')
  },
  // 视频
  {
    path: '/videos',
    name: 'videos',
    component: () => import('../views/videos/index.vue')
  },
  // MV
  {
    path: '/MV',
    name: 'MV',
    component: () => import('../views/MV/index.vue')
  },
  {
    path: '/playlist',
    meta: {
      title: '歌单',
      keepAlive: true
    },
    name: 'playlist',
    component: () => import('../views//playlist/index.vue')
  },
  // 歌单详情
  {
    path: '/playlist-detail',
    name: 'playlistDetail',
    component: () => import('@/views/playlist/detail/Index.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/test/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
