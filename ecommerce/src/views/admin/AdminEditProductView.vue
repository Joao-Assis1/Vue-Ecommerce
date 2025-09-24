<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const name = ref('')
const price = ref(0)

const route = useRoute()
const router = useRouter()
const productId = route.params.id

onMounted(async () => {
  try {
    const response = await fetch(`http://localhost:3000/products/${productId}`)
    if (!response.ok) {
      throw new Error('Produto não encontrado.')
    }
    const productData = await response.json()

    name.value = productData.name
    price.value = productData.price
  } catch (error) {
    console.error('Erro ao buscar dados do produto:', error)
  }
})

// Função para enviar as atualizações
async function updateProduct() {
  const updatedProduct = {
    name: name.value,
    price: price.value,
  }

  try {
    const response = await fetch(`http://localhost:3000/products/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProduct),
    })

    if (!response.ok) {
      throw new Error('Falha ao atualizar o produto.')
    }

    router.push('/admin/products')
  } catch (error) {
    console.error('Erro ao atualizar produto:', error)
  }
}
</script>

<template>
  <div class="edit-product-form">
    <h1>Editar Produto</h1>
    <form @submit.prevent="updateProduct">
      <div class="form-group">
        <label for="name">Nome do Produto:</label>
        <input type="text" id="name" v-model="name" required />
      </div>

      <div class="form-group">
        <label for="price">Preço:</label>
        <input type="number" id="price" v-model.number="price" required step="0.01" />
      </div>

      <button type="submit" class="btn-submit">Salvar Alterações</button>
    </form>
  </div>
</template>

<style scoped>
.edit-product-form {
  max-width: 600px;
  margin: 0 auto;
}
.form-group {
  margin-bottom: 20px;
}
label {
  display: block;
  margin-bottom: 4px;
  font-weight: bold;
}
input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.btn-submit {
  background-color: #f0ad4e;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}
.btn-submit:hover {
  background-color: #ec971f;
}
</style>
