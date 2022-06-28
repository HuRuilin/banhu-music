<template>
  <div class="playlist-detail container">
    <div class="left shadow">
      <div class="top">
        <div class="avatar">
          <img :src="state.detail.coverImgUrl + '?param=200y200'" alt="" />
        </div>
        <div class="info">
          <div class="title flex-between">
            <span>{{ state.detail.name }}</span>
            <div></div>
          </div>
          <div class="user flex-row">
            <div class="avatar" @click="toUser(state.creator.userId)">
              <img :src="state.creator.avatarUrl + '?param=100y100'" alt="" />
            </div>
            <p class="nickname" @click="toUser(state.creator.userId)">
              {{ state.creator.nickname }}
            </p>
            <p class="createTime" v-if="state.detail.createTime">
              {{ utils.dateFormat(state.detail.createTime, "YYYY-MM-DD") }}创建
            </p>
          </div>
          <div
            class="tag flex-row"
            v-if="state.detail.tags && state.detail.tags.length > 0"
          >
            标签：<a
              v-for="item of state.detail.tags"
              :key="item"
              @click="tag(item)"
              >{{ item }}</a
            >
          </div>
          <div class="desc">
            <p class="ellipsis-two" v-html="state.detail.description"></p>
            <span
              @click="openDesc(state.detail.name, state.detail.description)"
              class="flex-row"
              v-if="txtLength(state.detail.description) > 50"
              >全部<i
                class="iconfont niceiconfontyoujiantou-copy-copy-copy-copy"
              ></i
            ></span>
          </div>
        </div>
      </div>
      <div class="content" v-loading="state.loading">
        <artist-list
          :songs="state.songs"
          :isPerson="state.ordered ? true : false"
          @collectArtist="collectArtist"
          :subscribed="state.detail.subscribed"
        />
      </div>
    </div>
    <div class="right">
      <Supporter />
      <RelatedRecommends />
      <CommentsList />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { PlayListInfo, Song } from '@/types/home'
import { createSong } from '@/model/song.js'
import ArtistList from '@/components/ArtistList/index.vue'
import Supporter from './components/supporter/index.vue'
import RelatedRecommends from './components/relatedRecommends/index.vue'
import CommentsList from './components/commentsList/index.vue'
import {
  getPlayListDetail,
  getSongDetail,
  collectPlaylist
} from '@/api/home'
import utils from '@/utils/index'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const state = reactive<PlayListInfo>({
  // 歌单详情
  detail: {},
  // 歌单创建者信息
  creator: {},
  // 歌曲列表
  songs: [],
  // 歌单id
  artistId: '',
  loading: false,
  // 是否是我喜欢的歌单
  ordered: false
})

// 处理歌曲
const _normalizeSongs = (list) => {
  const ret:Song[] = []
  list.forEach((item) => {
    if (item.id) {
      ret.push(createSong(item))
    }
  })
  return ret
}

// 打开歌单介绍详情
const openDesc = (title, content) => {
  ElMessageBox.alert(content, title, {
    closeOnClickModal: true,
    customClass: 'descBox',
    showConfirmButton: false,
    dangerouslyUseHTMLString: true
  })
}

const toUser = (id) => {
  router.push({
    name: 'personal',
    query: {
      id
    }
  })
}

const txtLength = function (txt) {
  if (txt) {
    return txt.length
  }
}
// 标签跳转
const tag = (cat) => {
  router.push({
    name: 'playlist',
    query: {
      cat
    }
  })
}

// 收藏歌单
const collectArtist = async () => {
  const t = state.detail.subscribed ? 2 : 1
  const message = state.detail.subscribed ? '已取消收藏' : '收藏成功'
  try {
    const res = await collectPlaylist(t, state.artistId)
    if (res.data.code === 200) {
      ElMessage({
        message,
        type: 'success'
      })
      queryDetail(state.artistId, 100)
    }
  } catch (error) {
    // this.$message.error(error)
  }
}

// 获取歌曲列表
const querySongList = async (idsArr) => {
  state.loading = true
  const timestamp = new Date().valueOf()
  try {
    const beforeRes = await getSongDetail({
      ids: idsArr.join(','),
      time: timestamp
    })
    const res = beforeRes.data.songs
    state.songs = _normalizeSongs(res)
    state.loading = false
  } catch (error) {
    console.error('【查询歌单所有歌曲信息异常】', error)
  }
}

// 获取歌单详情
const queryDetail = async (id, s) => {
  const timestamp = new Date().valueOf()
  try {
    const res = await getPlayListDetail({ id, s, timestamp })
    if (res.data.code === 200) {
      const desc = res.data.playlist.description
      if (desc !== null) {
        res.data.playlist.description = desc.replace(/(\r\n|\n|\r)/gm, '<br />')
      }
      state.detail = res.data.playlist
      state.creator = res.data.playlist.creator
      const trackIds = res.data.playlist.trackIds
      const musicIdList = trackIds.map((item) => {
        return item.id
      })
      querySongList(musicIdList)
    }
  } catch (error) {
    // this.$message.error(error)
  }
}

onMounted(() => {
  const id = route.query.id
  state.artistId = id as string
  if (id) {
    queryDetail(id, 100)
  }
}
)
</script>
<style lang="scss" scoped>
.playlist-detail {
  display: flex;
  align-items: flex-start;
  .left {
    flex: 1;
    width: 950px;
    padding: 15px;
    border-radius: 8px;
    margin-right: 20px;
    .top {
      display: flex;
      > .avatar {
        width: 200px;
        height: 200px;
        border-radius: 8px;
        position: relative;
        margin-right: 30px;
        flex-shrink: 0;
        img {
          width: 100%;
          height: 100%;
          border-radius: 8px;
          position: relative;
        }
        &::before {
          content: "";
          width: 95%;
          height: 95%;
          background: rgba(0, 0, 0, 0.2);
          display: block;
          position: absolute;
          top: 15px;
          right: -5px;
          z-index: 0;
          border-radius: 8px;
        }
      }
      .info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .title {
          width: 100%;
          font-size: 24px;
          font-weight: 700;
          line-height: 24px;
          margin-bottom: 20px;
          margin-top: 10px;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
        .tag {
          // margin-top: 15px;
          // margin-bottom: 15px;
          a {
            color: #fff;
            background: $color-theme;
            margin-right: 15px;
            font-size: 12px;
            cursor: pointer;
            padding: 4px 12px;
            border-radius: 15px;
            &::after {
              // content: '，'
            }
            &:last-child {
              &::after {
                content: "";
              }
            }
          }
        }
        .user {
          margin-bottom: 15px;
          .avatar {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            position: relative;
            margin-right: 15px;
            cursor: pointer;
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
              position: relative;
            }
          }
          .nickname {
            font-size: 14px;
            margin-right: 30px;
            cursor: pointer;
            &:hover {
              color: $color-theme;
            }
          }
          .createTime {
            font-size: 14px;
            color: #808080;
          }
        }
        .desc {
          display: flex;
          flex-direction: column;
          line-height: 1.6;
          margin-top: 15px;
          span {
            flex-shrink: 0;
            color: $color-theme;
            cursor: pointer;
          }
          p {
            line-height: 1.6;
            font-weight: 400;
            flex: 1;
            font-size: 14px;
          }
        }
      }
    }
    .content {
      margin-top: 20px;
    }
  }
  .right {
    width: 350px;
    flex-shrink: 0;
    .module {
      padding: 15px;
      width: 100%;
      border-radius: 8px;
      margin-bottom: 20px;
    }
  }
}
</style>
