<template>
  <div class="container">
   <h2>测试专用页面</h2>
    <input placeholder="请填写数字1" v-model.number="num1">
    <input placeholder="请填写数字2" v-model.number="num2">
    <p>和:{{total}}</p>
    <p>差:{{difference}}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useAdd } from './composables/useAdd.js'
import { useSubtract } from './composables/useSubtract.js'
const num1 = ref(0)
const num2 = ref(0)
const { total } = useAdd({ num1, num2 })
const { difference } = useSubtract({ num1, num2 })
</script>

<style scoped lang="scss">

</style>
