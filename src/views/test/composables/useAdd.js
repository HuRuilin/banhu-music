import { computed } from 'vue'
export const useAdd = function ({ num1, num2 }) {
  const total = computed(() => num1.value + num2.value)
  return {
    total
  }
}
