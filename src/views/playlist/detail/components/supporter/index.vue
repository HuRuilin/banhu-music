<template>
  <div class="like module shadow" >
    <div class="card-header flex-row">
      <span>喜欢这个歌单的人</span>
    </div>
    <ul v-if="subscribers.length > 0">
      <li v-for="item of subscribers" :key="item.userId">
        <div class="avatar" @click="toUser(item.userId)">
          <img
            :src="item.avatarUrl + '?param=150y150'"
            :alt="item.nickname"
            :title="item.nickname"
          />
        </div>
      </li>
    </ul>
    <p class="no-data-text" v-else style="padding-bottom: 10px">还没有人喜欢</p>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { getSubscribersPlaylist } from '@/api/home'
import type { Subscriber } from '@/types/home'
const route = useRoute()
const router = useRouter()
const subscribers = ref<Subscriber[]>([])
onMounted(() => {
  const id = route.query.id
  if (!id) return
  queryList(id as string)
})
// 获取歌单收藏者
const queryList = async function (id: string) {
  const params = {
    id,
    limit: 28,
    offset: 0
  }
  try {
    const res = await getSubscribersPlaylist(params)
    if (res.data.code === 200) {
      subscribers.value = res.data.subscribers
    }
  } catch (error) {
    console.error(error)
  }
}

const toUser = (id) => {
  router.push({
    name: 'personal',
    query: {
      id
    }
  })
}
</script>

<style scoped lang="scss">
.like {
  padding-bottom: 5px;
  ul {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -5px;
    li {
      flex: 0 0 14.285714285714%;
      max-width: 14.285714285714%;
      padding: 0 5px 10px;
      .avatar {
        width: 100%;
        border-radius: 3px;
        img {
          width: 100%;
          border-radius: 3px;
        }
      }
    }
  }
}
.module {
  padding: 15px;
  width: 100%;
  border-radius: 8px;
  margin-bottom: 20px;
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
