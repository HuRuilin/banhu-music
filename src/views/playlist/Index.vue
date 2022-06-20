<template>
  <div class="playlist-wrap container">
    <div class="filter shadow">
      <div class="title flex-center" @click="openFilter">
        {{ state.currentCat }}
        <i class="iconfont niceiconfontyoujiantou-copy-copy-copy-copy"></i>
        <transition name="fade">
          <div class="filter-box shadow" v-if="state.showFilter">
            <div class="item" v-for="item of state.cateList" :key="item.key">
              <h2>
                <i class="iconfont" :class="item.icon"></i>{{ item.type }}
              </h2>
              <ul>
                <li
                  :class="state.currentCat == sub.name ? 'active' : ''"
                  v-for="sub of item.list"
                  :key="sub.name"
                  @click="chooseCat(sub.name)"
                >
                  {{ sub.name }}
                </li>
              </ul>
            </div>
          </div>
        </transition>
      </div>
      <div class="hot-tag flex-row">
        <p>热门标签：</p>
        <ul class="flex-center">
          <li
            v-for="item of state.hotCategories"
            :key="item.id"
            :class="state.currentCat == item.name ? 'active' : ''"
            @click="chooseCat(item.name)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div class="type">
        <div
          class="item"
          :class="state.sortType == 'hot' ? 'active' : ''"
          @click="chooseType('hot')"
        >
          热门
        </div>
        <div
          class="item"
          :class="state.sortType == 'new' ? 'active' : ''"
          @click="chooseType('new')"
        >
          最新
        </div>
      </div>
    </div>
    <song-sheet
      :sheetList="state.playList"
      v-loading="state.fullscreenLoading"
    ></song-sheet>
    <div class="page-wrap">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="state.currentPage"
        :page-size="state.limit"
        background
        hide-on-single-page
        layout="total, prev, pager, next"
        :total="state.pageTotal"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { reactive, onMounted } from 'vue'
import songSheet from '@/components/SongSheet/index'
import { getHotlist, getCatList, getPlayList } from '@/api/home'
const route = useRoute()
const state = reactive({
  categories: {},
  hotCategories: [],
  cateList: [],
  playList: [],
  showFilter: false,
  pageTotal: 0,
  currentPage: 0,
  limit: 40,
  offset: 0,
  currentCat: '全部',
  sortType: 'hot',
  typeList: [
    {
      key: 0,
      value: '语种',
      icon: 'niceyuyan'
    },
    {
      key: 1,
      value: '风格',
      icon: 'nicefengge'
    },
    {
      key: 2,
      value: '场景',
      icon: 'nicekafeidengdai'
    },
    {
      key: 3,
      value: '情感',
      icon: 'niceqingganqingshu'
    },
    {
      key: 4,
      value: '主题',
      icon: 'nicepifugexinghuazhuti-xianxing'
    }
  ],
  fullscreenLoading: false
})
function handleSizeChange (val) {
  state.limit = val
  state.offset = state.limit * state.currentPage
  getPlayListOfSong()
}
function handleCurrentChange (val) {
  state.currentPage = val
  state.offset = (val - 1) * state.limit
  getPlayListOfSong()
}
function openFilter () {
  state.showFilter = !state.showFilter
}
// 选择最新或者热门
function chooseType (type) {
  state.sortType = type
  getPlayListOfSong()
}
// 选择分类
function chooseCat (cat) {
  state.currentCat = cat
  getPlayListOfSong()
}
// 获取歌单分类
async function getCatListOfSong () {
  try {
    const res = await getCatList()
    if (res.data.code === 200) {
      state.categories = res.data.categories
      state.cateList = categoryGroup(res.data.sub, 'category')
    }
  } catch (error) {
    console.log(error)
  }
}
// 获取热门歌单分类
async function getHotlistOfSong () {
  try {
    const res = await getHotlist()
    if (res.data.code === 200) {
      state.hotCategories = res.data.tags
    }
  } catch (error) {
    console.log(error)
  }
}
// 获取歌单 默认全部
async function getPlayListOfSong () {
  state.fullscreenLoading = true
  const param = {
    order: state.sortType,
    cat: state.currentCat,
    limit: state.limit,
    offset: state.offset
  }
  try {
    const res = await getPlayList(param)
    if (res.data.code === 200) {
      state.playList = res.data.playlists
      state.pageTotal = res.data.total
      state.fullscreenLoading = false
    }
  } catch (error) {
    console.log(error)
  }
}
// 根据分类进行分组
function categoryGroup (list, field) {
  const obj = {}
  for (let i = 0; i < list.length; i++) {
    for (const item in list[i]) {
      if (item === field) {
        obj[list[i][item]] = {
          list: obj[list[i][field]] ? obj[list[i][field]].list : []
        }
      }
    }
    obj[list[i][field]].list.push(list[i])
  }
  const att = []

  for (const item in obj) {
    let type = ''
    let category = ''
    let icon = ''
    state.typeList.forEach(jitem => {
      if (jitem.key === obj[item].list[0].category) {
        type = jitem.value
        category = jitem.key
        icon = jitem.icon
      }
    })
    att.push({
      type,
      category,
      icon,
      list: obj[item].list
    })
  }
  return att
}
onMounted(function () {
  const cat = route.query.cat
  console.log(cat)
  if (cat) {
    state.currentCat = cat
  }
  getHotlistOfSong()
  getCatListOfSong()
  getPlayListOfSong()
})
</script>

<style lang="scss" scoped>
.fade-enter {
  opacity: 0;
  transform: translate3d(0, 30px, 0);
}

.fade-enter-active {
  transition: all 0.5s;
}

.fade-leave-to {
  opacity: 0;
  transform: translate3d(0, 30px, 0);
}

.fade-leave-active {
  transition: all 0.5s;
}

.playlist-wrap {
  .filter {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding-right: 20px;
    border-radius: 5px 0px 5px 5px;

    .title {
      width: auto;
      height: 100%;
      padding: 0 5px 0 15px;
      background: $color-theme;
      border-radius: 5px 0px 5px 5px;
      color: #ffffff;
      cursor: pointer;
      position: relative;
      margin-right: 15px;
      position: relative;
      &::after {
        content: "";
        width: 1px;
        height: 20px;
        margin-left: 12px;
        background: #e7e7e7;
        opacity: 0;
      }
      > i {
        transform: rotate(90deg);
        margin-left: 10px;
        font-size: 18px;
      }

      .filter-box {
        width: 720px;
        height: 400px;
        overflow-y: scroll;
        background: rgba(255, 255, 255, 1);
        border-radius: 5px;
        color: #000;
        position: absolute;
        right: -631px;
        top: 50px;
        z-index: 100;
        padding: 15px 10px 0 16px;
        .item {
          margin-bottom: 20px;
          h2 {
            display: flex;
            align-items: center;
            font-size: 15px;
            margin-bottom: 15px;
            color: #161e27;
            i {
              font-size: 18px;
              margin-right: 5px;
              margin-top: -1px;
            }
          }
          ul {
            display: flex;
            flex-wrap: wrap;
            li {
              padding: 8px 18px;
              background: #f7f7f7;
              border-radius: 16px;
              margin: 0 10px 10px 0;
              cursor: pointer;
              font-size: 12px;
              color: #161e27;
              transition: all 0.4s;
              &:hover {
                color: #fff;
                background: $color-theme;
              }
              &.active {
                color: #fff;
                background: $color-theme;
              }
            }
          }
        }
      }

      &:hover {
        // border: 1px solid #cccccc;
      }
    }
    .hot-tag {
      flex: 1;
      ul {
        li {
          margin: 0 5px;
          padding-right: 10px;
          cursor: pointer;
          &:hover {
            color: #888;
          }
          &.active {
            color: $color-theme;
          }
        }
      }
    }
    .type {
      display: flex;
      .item {
        margin-left: 20px;
        background: #f7f7f7;
        color: #161e27;
        padding: 5px 10px;
        font-size: 12px;
        border-radius: 3px;
        transition: all 0.4s;
        cursor: pointer;
        &.active {
          background: $color-theme;
          color: #fff;
          &:hover {
            color: #fff;
          }
        }
        &:hover {
          color: #666;
        }
      }
    }
  }
}
</style>
