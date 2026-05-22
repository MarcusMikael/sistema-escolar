<script setup>

import { useRoute } from 'vue-router';

import Navbar from './components/NavBar.vue';
import Sidebar from './components/SideBar.vue';

const route = useRoute();

</script>

<template>

  <!-- Tela de login -->
  <RouterView v-if="route.path === '/login'" />

  <!-- Sistema -->
  <template v-else>

    <Navbar />

    <div class="layout">

      <Sidebar />

      <main class="content">
        <RouterView />
      </main>

    </div>

  </template>

</template>