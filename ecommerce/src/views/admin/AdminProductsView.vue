<script setup>
import { ref, onMounted } from 'vue'

// Cria uma referência reativa para guardar a lista de produtos
const products = ref([])

// A mesma função que usa na loja para buscar os produtos!
async function fetchProducts() {
  try {
    const response = await fetch('http://localhost:3000/products')
    if (!response.ok) {
      throw new Error('Não foi possível buscar os produtos.')
    }
    products.value = await response.json()
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
  }
}

async function deleteProduct(productId) {
  if (!confirm('Tem certeza que deseja excluir este produto?')) {
    return
  }

  try {
    const response = await fetch(`http://localhost:3000/products/${productId}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Falha ao excluir o produto.')
    }

    products.value = products.value.filter((p) => p._id !== productId)
  } catch (error) {
    console.error('Erro ao excluir produto:', error)
    alert('Ocorreu um erro ao excluir o produto.')
  }
}
// Chama a função para buscar os dados assim que o componente for montado
onMounted(() => {
  fetchProducts()
})
</script>

<template>
  <div class="products-list">
    <h1>Listagem de Produtos</h1>
    <table class="products-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Preço</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product._id">
          <td>{{ product._id }}</td>
          <td>{{ product.name }}</td>
          <td>R$ {{ product.price.toFixed(2) }}</td>
          <td>
            <RouterLink
              :to="{ name: 'admin-edit-product', params: { id: product._id } }"
              class="btn-edit"
            >
              Editar
            </RouterLink>
            <button class="btn-delete" @click="deleteProduct(product._id)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.products-list {
  font-family: sans-serif;
}

.products-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.products-table th,
.products-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.products-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.btn-edit,
.btn-delete {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  margin-right: 5px;
}

.btn-edit {
  background-color: #f0ad4e;
}

.btn-delete {
  background-color: #d9534f;
}
</style>
