<template>
    <ul class="menus">
      <li class="menu-item" v-for="item in navList" :key="item.path" @click="handleClick(item)">{{ item.name }}</li>
    </ul>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const navList = reactive([
  {
    name: '发现音乐',
    path: '/'
  },
  {
    name: '排行榜',
    path: '/rankingList'
  },
  {
    name: '歌单',
    path: '/songList'
  },
  {
    name: '歌手',
    path: '/singers'
  },
  {
    name: '视频',
    path: '/videos'
  },
  {
    name: 'MV',
    path: '/MV'
  }
])
const handleClick = (item:any) => {
  router.push(item.path)
}
</script>

<style scoped lang="scss">
.menus{
  width: 60%;
  cursor: pointer;
  @include flex(space-between,center);
}
</style>
