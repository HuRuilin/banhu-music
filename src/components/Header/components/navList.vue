<template>
  <ul class="menus">
    <li class="menu-item" v-for="item in navList" :key="item.path">
      <router-link exact-active-class="highlight" :to="item.path">
        {{ item.name }}
      </router-link>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
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
</script>

<style scoped lang="scss">
.menus {
  width: 60%;
  cursor: pointer;
  @include flex(space-between, center);
  .menu-item {
    position: relative;
    .highlight {
      color: red;
      &::after {
        content: "";
        display: inline-block;
        width: 4px;
        height: 4px;
        background-color: red;
        border-radius: 100%;
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-2px);
      }
    }
  }
}
</style>
