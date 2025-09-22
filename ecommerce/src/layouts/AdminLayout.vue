<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="admin-layout">
    <aside class="admin-sidebar">
      <h2>Admin</h2>
      <nav>
        <RouterLink to="/admin/products">Listar Produtos</RouterLink>
        <RouterLink to="/admin/new">Adicionar Produto</RouterLink>
      </nav>
    </aside>
    <main class="admin-main-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
  height: 100vh;
}

.admin-sidebar {
  width: 250px;
  background-color: #2c3e50;
  color: white;
  padding: 20px;
}

.admin-sidebar h2 {
  text-align: center;
  margin-bottom: 30px;
}

.admin-sidebar nav {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.admin-sidebar nav a {
  color: white;
  text-decoration: none;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.admin-sidebar nav a:hover,
.admin-sidebar nav a.router-link-exact-active {
  background-color: #42b883;
}

.admin-main-content {
  flex-grow: 1; /* Ocupa o resto do espaço */
  padding: 30px;
  background-color: #f0f2f5;
  overflow-y: auto; /* Adiciona scroll se o conteúdo for grande */
}
</style>
