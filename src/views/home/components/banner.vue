<template>
  <div class="container">
    <el-carousel indicator-position="outside">
      <el-carousel-item v-for="item in state.list" :key="item">
        <img :src="item.imageUrl" alt="" srcset=""/>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onBeforeMount } from 'vue'
import { getBanner } from '@/api/home'
 interface Banner {
  imageUrl:string,
 }
interface State {
  list:Banner[]
}
const state = reactive<State>({
  list: []
})
// 请求列表
const getList = async function () {
  const res = await getBanner()
  state.list = res.data.banners
}
onBeforeMount(() => {
  getList()
})

</script>

<style scoped lang="scss">
.el-carousel__item h3 {
  display: flex;
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
