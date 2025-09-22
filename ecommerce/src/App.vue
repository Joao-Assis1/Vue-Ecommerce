<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useCartStore } from '@/stores/cart.js'

const cartStore = useCartStore()
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Loja</RouterLink>
        <RouterLink to="/cart"> Carrinho ({{ cartStore.totalItems }}) </RouterLink>
        <RouterLink to="/admin/products">Admin</RouterLink>
      </nav>
    </div>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  background-color: #f8f8f8;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

nav {
  display: flex;
  justify-content: center;
  gap: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  font-size: 1.2em;
}

nav a.router-link-exact-active {
  color: #42b883;
}

main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
</style>
