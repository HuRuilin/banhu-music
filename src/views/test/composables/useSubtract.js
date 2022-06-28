import { ref, watch } from 'vue'
export const useSubtract = function ({ num1, num2 }) {
  const difference = ref(0)
  const subtract = function (numA, numB) {
    return numA - numB
  }
  watch([num1, num2], ([newVal1, newVal2]) => {
    difference.value = subtract(newVal1, newVal2)
  })
  return {
    difference,
    subtract
  }
}
