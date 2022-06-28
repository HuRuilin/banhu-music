<template>
  <div class="related module shadow">
    <div class="card-header flex-row">
      <span>相关推荐</span>
    </div>
    <ul>
      <li v-for="item of relatedList" :key="item.id" @click="toDetail(item.id)">
        <div class="avatar">
          <img
            :src="item.coverImgUrl + '?param=150y150'"
            :alt="item.nickname"
            :title="item.nickname"
          />
        </div>
        <div class="info">
          <h2 class="ellipsis" :title="item.name">{{ item.name }}</h2>
          <span
            >By. <small> {{ item.creator.nickname }}</small></span
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { getRelatedPlaylist } from '@/api/home'
import type { RelatedRecommends } from '@/types/home'
const route = useRoute()
const router = useRouter()
// 相关歌单
const relatedList = ref<RelatedRecommends[]>([])
// 获取相关歌单推荐
const queryList = async (id:string) => {
  try {
    const res = await getRelatedPlaylist(id)
    if (res.data.code === 200) {
      relatedList.value = res.data.playlists
    }
  } catch (error) {
    // this.$message.error(error)
  }
}
// 相关推荐详情
const toDetail = function (id) {
  router.push({
    name: 'playlistDetail',
    query: {
      id
    }
  })
}
onMounted(() => {
  const id = route.query.id
  if (!id) return
  queryList(id as string)
})
</script>

<style scoped lang="scss">
.module {
  padding: 15px;
  width: 100%;
  border-radius: 8px;
  margin-bottom: 20px;
}
.related {
  padding-bottom: 5px;
  ul {
    li {
      display: flex;
      margin-bottom: 15px;
      cursor: pointer;
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 3px;
        margin-right: 15px;
        flex-shrink: 0;
        img {
          width: 100%;
          border-radius: 3px;
        }
      }
      .info {
        height: 50px;
        width: calc(100% - 60px);
        flex: 1;
        display: flex;
        justify-content: center;
        flex-direction: column;
        h2 {
          font-size: 14px;
          margin-bottom: 10px;
          width: 100%;
        }
        span {
          font-size: 12px;
          color: #a5a5c1;
        }
        &:hover {
          h2 {
            color: $color-theme;
          }
        }
      }
    }
  }
}
.card-header {
  border-left: 3px solid $color-theme;
  height: 20px;
  padding-left: 1rem;
  margin-bottom: 15px;
  font-weight: bold;
  .icon-like {
    font-size: 20px;
  }
}
</style>
