<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Cria as 'variáveis reativas' que serão ligadas aos inputs com v-model.
const name = ref('')
const price = ref(0)

// O useRouter  dá acesso ao roteador para poder navegar programaticamente.
const router = useRouter()

// Esta função será chamada quando o formulário for enviado.
async function addProduct() {
  const newProduct = {
    name: name.value,
    price: price.value,
  }

  try {
    const response = await fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })

    if (!response.ok) {
      throw new Error('Falha ao cadastrar o produto.')
    }

    router.push('/admin/products')
  } catch (error) {
    console.error('Erro ao cadastrar produto:', error)
    alert('Ocorreu um erro. Verifique o console.')
  }
}
</script>

<template>
  <div class="new-product-form">
    <h1>Cadastrar Novo Produto</h1>
    <form @submit.prevent="addProduct">
      <div class="form-group">
        <label for="name">Nome do Produto:</label>
        <input type="text" id="name" v-model="name" required />
      </div>

      <div class="form-group">
        <label for="price">Preço:</label>
        <input type="number" id="price" v-model.number="price" required step="0.01" />
      </div>

      <button type="submit" class="btn-submit">Cadastrar Produto</button>
    </form>
  </div>
</template>

<style scoped>
.new-product-form {
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
  background-color: #42b883;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.btn-submit:hover {
  background-color: #349469;
}
</style>
