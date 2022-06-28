<template>
   <div class="comment module shadow">
        <div class="card-header flex-row">
          <span>精彩评论</span>
        </div>
        <ul v-if="comments.length > 0">
          <li class="item" v-for="item of comments" :key="item.time">
            <div class="avatar" @click="toUser(item.user.userId)">
              <img
                :src="item.user.avatarUrl + '?param=150y150'"
                :alt="item.user.nickname"
                :title="item.user.nickname"
              />
            </div>
            <div class="info">
              <h2 @click="toUser(item.user.userId)">
                {{ item.user.nickname
                }}<small> · {{ utils.formatMsgTime(item.time) }}</small>
              </h2>
              <p>{{ item.content }}</p>
            </div>
          </li>
        </ul>
        <p class="no-data-text" v-else style="padding-bottom: 10px">
          还没有人评论
        </p>
      </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getCommentPlaylist } from '@/api/home'
import utils from '@/utils/index'
const route = useRoute()
// 评论列表
const comments = ref([])
// 获取评论
const queryList = async (id:string) => {
  const params = {
    id,
    limit: 28,
    offset: 0
  }
  try {
    const res = await getCommentPlaylist(params)
    if (res.data.code === 200) {
      if (res.data.hotComments.length > 0) {
        comments.value = res.data.hotComments
      } else {
        comments.value = res.data.comments
      }
    }
  } catch (error) {
    // this.$message.error(error)
  }
}
onMounted(() => {
  const id = route.query.id
  if (!id) return
  queryList(id as string)
})
</script>

<style scoped lang="scss">
.comment {
      ul {
        li {
          padding: 10px 0;
          width: 100%;
          display: flex;
          .avatar {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            margin-right: 12px;
            flex-shrink: 0;
            cursor: pointer;
            img {
              width: 100%;
              border-radius: 50%;
            }
          }
          .info {
            flex: 1;
            h2 {
              font-size: 15px;
              margin-right: 5px;
              margin-bottom: 10px;
              cursor: pointer;
              small {
                font-size: 12px;
                color: #a5a5c1;
                font-weight: 200;
              }
            }
            p {
              width: 100%;
              font-size: 12px;
              color: #666666;
              line-height: 1.6;
              padding: 5px 10px;
              background: #f5f5f5;
              margin-top: 5px;
              border-radius: 3px;
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
