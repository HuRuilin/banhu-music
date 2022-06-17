<template>
  <div class="recommend-songs">
    <h2 class="title">推荐歌单</h2>
    <song-sheet :sheetList="state.personalizeds"></song-sheet>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import songSheet from '@/components/SongSheet/index.vue'
import { getRecommendList } from '@/api/home'
const state = reactive({
  limit: 24,
  personalizeds: []
})
// 获取推荐歌单
const getPersonalized = async function () {
  try {
    const res = await getRecommendList({ limit: state.limit })
    state.personalizeds = res.data.result
  } catch (error) {
    console.log(error)
  }
}

onMounted(function () {
  getPersonalized()
})

</script>
<style lang="scss" scoped>
.recommend-songs {
  margin-top: 40px;
  .title {
    margin: 0 0 15px 0;
  }
}
</style>
