<script setup>
import { useCartStore } from '@/stores/cart.js'

const cartStore = useCartStore()

function handleCheckout() {
  if (cartStore.items.length === 0) {
    return alert('Seu carrinho está vazio')
  }

  alert('Compra finalizada com sucesso! Obrigado por comprar conosco.')
  cartStore.checkout()
}
</script>

<template>
  <div class="cart-view">
    <h1>Meu Carrinho de Compras</h1>

    <div v-if="cartStore.totalItems > 0">
      <ul class="cart-list">
        <li v-for="item in cartStore.items" :key="item.id" class="cart-item">
          <span class="item-name">{{ item.name }}</span>
          <span class="item-price">R$ {{ item.price.toFixed(2) }}</span>
        </li>
      </ul>

      <div class="cart-total">
        <h2>Total: R$ {{ cartStore.totalPrice.toFixed(2) }}</h2>
      </div>
    </div>

    <div v-else>
      <p>Seu carrinho está vazio. Volte para a loja e escolha alguns produtos!</p>
    </div>

    <div class="cart-total">
      <h2>Total: R$ {{ cartStore.totalPrice.toFixed(2) }}</h2>
      <button @click="handleCheckout" class="btn-checkout">Finalizar Compra</button>
    </div>
  </div>
</template>

<style scoped>
.cart-view {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  font-family: sans-serif;
}

.cart-list {
  list-style: none;
  padding: 0;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  padding: 15px 10px;
  border-bottom: 1px solid #eee;
}

.item-name {
  font-size: 1.1em;
}

.item-price {
  font-weight: bold;
}

.cart-total {
  margin-top: 20px;
  text-align: right;
  font-size: 1.3em;
}

.btn-checkout {
  background-color: #42b883;
  color: white;
  padding: 15px 25px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1em;
  font-weight: bold;
  margin-top: 15px;
  width: 100%;
}
.btn-checkout:hover {
  background-color: #349469;
}
</style>
