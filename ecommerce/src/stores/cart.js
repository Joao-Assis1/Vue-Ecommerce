import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])

  const totalItems = computed(() => items.value.length)

  const totalPrice = computed(() => {
    return items.value.reduce((total, item) => {
      return total + item.price
    }, 0)
  })

  function addProduct(product) {
    items.value.push(product)
    console.log('Produto adicionado ao carrinho:', product.name)
  }

  function checkout() {
    items.value = []
  }

  return { items, totalItems, totalPrice, addProduct, checkout }
})
