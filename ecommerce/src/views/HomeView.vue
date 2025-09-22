<script setup>
import ProductCard from '@/components/ProductCard.vue'
import { ref, onMounted } from 'vue'

// Ela será preenchida com os dados que vêm da API.
const products = ref([])

// 2. Cria uma função 'async' para buscar os dados.
async function fetchProducts() {
  try {
    const response = await fetch('http://localhost:3000/products')
    if (!response.ok) {
      throw new Error('Não foi possível buscar os produtos.')
    }

    const data = await response.json()

    products.value = data
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
  }
}

// 4. Usa o gancho 'onMounted' para chamar nossa função assim que o componente for montado.
onMounted(() => {
  fetchProducts()
})
</script>

<template>
  <main class="home-view">
    <h1>Nossa Vitrine de Produtos</h1>
    <ProductCard v-for="product in products" :key="product.id" :product="product" />
  </main>
</template>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 20px;
}

/* 3. Adiciona um estilo para organizar os produtos em uma grade! */
.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
}
</style>
