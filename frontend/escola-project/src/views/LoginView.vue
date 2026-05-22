<script setup>

import {ref} from 'vue';
import { useRouter } from 'vue-router';

import { useAuthStore } from '../stores/auth.js';

const email = ref('');
const senha = ref('');
const router = useRouter();
const auth = useAuthStore();

function entrar() {
  const sucesso = auth.login(email.value, senha.value);

  if (sucesso) {
    router.push('/');
  } else {

    alert ('E-mail ou senha incorretos');
  }
}
</script>

<template>
  
  <div class="login-sistema">
    <h1>Bem-vindo ao Sistema Escolar</h1>
    <p>Faça login para acessar o sistema</p>
  </div>


<div class="login-container">

   <div class="login-form">
    <h1>Login</h1>

    <input v-model="email" type="email" placeholder="E-mail" />

    <input v-model="senha" type="password" placeholder="Senha" />

    <button @click="entrar">Entrar</button>
  </div>
</div>
</template>

<style scoped>

.login-sistema {
    text-align: center;
    background: #1e1e2f;
    color: white;
    padding: 20px;
    font-size: 18px;
}

.login-container {
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #cacaca;
}

.login-form {
    background: white;
    padding: 40px;
    border-radius: 12px;
    width: 320px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.login-form input {

    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
}

.login-form button {

    padding: 10px;
    background: #1e1e2f;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}
</style>