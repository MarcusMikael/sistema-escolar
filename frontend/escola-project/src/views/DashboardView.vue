<script setup>

import { ref, onMounted } from 'vue'
import api from '../services/api'

const totalAlunos = ref(0)
const totalProfessores = ref(0)
const totalFuncionarios = ref(0)

// Pegar os dados
async function carregarDados() {

    const alunos = await api.get('/alunos')
    const professores = await api.get('/professores')
    const funcionarios = await api.get('/funcionarios')
// contagem dos dados
    totalAlunos.value = alunos.data.length
    totalProfessores.value = professores.data.length
    totalFuncionarios.value = funcionarios.data.length
}

onMounted(() => {
    carregarDados()
})

</script>

<template>

    <div>

        <h1>Dashboard</h1>

        <div class="cards">

            <div class="card alunos">

                <h2>Alunos</h2>

                <p>{{ totalAlunos }}</p>

            </div>

            <div class="card professores">

                <h2>Professores</h2>

                <p>{{ totalProfessores }}</p>

            </div>

            <div class="card funcionarios">

                <h2>Funcionários</h2>

                <p>{{ totalFuncionarios }}</p>

            </div>

        </div>

    </div>

</template>

<style scoped>

h1 {
    margin-bottom: 25px;
    color: #1e1e2f;
}

.cards {

    display: flex;
    gap: 20px;
    margin-top: 20px;

    flex-wrap: wrap;
}

.card {

    background: white;

    padding: 20px;

    border-radius: 12px;

    width: 220px;

    box-shadow: 0 2px 10px rgba(0,0,0,0.1);

    transition: 0.2s;
}

.card:hover {

    transform: translateY(-5px);
}

.card h2 {

    margin-bottom: 10px;
}

.card p {

    font-size: 35px;

    font-weight: bold;
}

.alunos {
    border-left: 6px solid #6366f1;
}

.professores {
    border-left: 6px solid #10b981;
}

.funcionarios {
    border-left: 6px solid #f59e0b;
}

</style>