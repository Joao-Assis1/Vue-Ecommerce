<script setup>
import { useCartStore } from '@/stores/cart.js'

defineProps({
  product: Object, // Espera um objeto com os dados do produto.
})

const cartStore = useCartStore()

function addToCart(product) {
  cartStore.addProduct(product)
}
</script>

<template>
  <div class="product-card">
    <div class="info-container">
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-price">R$ {{ product.price.toFixed(2) }}</p>

      <button class="add-to-cart-btn" @click="addToCart(product)">Adicionar ao Carrinho</button>
    </div>
  </div>
</template>

<style scoped>
/* O atributo 'scoped' garante que este CSS só se aplica a este componente */
.product-card {
  width: 250px;
  border: 1px solid #000000;
  border-radius: 8px;
  overflow: hidden;
  font-family: sans-serif;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.product-card:hover {
  transform: scale(1.05);
}

.info-container {
  padding: 16px;
  text-align: center;
}

.product-name {
  font-size: 1.2em;
  margin: 0 0 8px 0;
}

.product-price {
  font-size: 1.1em;
  color: #2c3e50;
  font-weight: bold;
}

/* Botão de adicionar ao carrinho */
.add-to-cart-btn {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
  margin-top: 10px;
}

.add-to-cart-btn:hover {
  background-color: #349469;
}
</style>
