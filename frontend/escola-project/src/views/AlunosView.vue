<!-- <script setup>

import { ref, onMounted } from 'vue';
import api from '../services/api';

const alunos = ref([]);
const alunoEditando = ref(null);

const nome = ref('');
const email = ref('');
const turma = ref('');
const idade = ref('');

async function buscarAlunos() {

    const resposta = await api.get('/alunos');

    alunos.value = resposta.data;
}

async function cadastrarAluno() {

    await api.post('/alunos', {
        nome: nome.value,
        email: email.value,
        turma: turma.value,
        idade: idade.value
    });

    buscarAlunos();

    nome.value = '';
    email.value = '';
    turma.value = '';
    idade.value = '';
}

// Excluir aluno
async function excluirAluno(id) {

    await api.delete(`/alunos/${id}`);

    buscarAlunos();
}

// Editar aluno
function editarAluno(aluno) {
    alunoEditando.value = aluno.id;

    nome.value = aluno.nome;
    email.value = aluno.email;
    turma.value = aluno.turma;
    idade.value = aluno.idade;
}

// Atualizar aluno
async function atualizarAluno() {

    await api.put(`/alunos/${alunoEditando.value}`, {
        nome: nome.value,
        email: email.value,
        turma: turma.value,
        idade: idade.value
    });

    alunoEditando.value = null;

    nome.value = '';
    email.value = '';
    turma.value = '';
    idade.value = '';

    buscarAlunos();
}

onMounted(() => {
    buscarAlunos();
});

</script>

<template>

    <div>

        <h1>Alunos</h1>

        <form @submit.prevent="alunoEditando ? atualizarAluno() : cadastrarAluno()">

            <input
                v-model="nome"
                type="text"
                placeholder="Nome"
            >

            <input
                v-model="email"
                type="email"
                placeholder="Email"
            >

            <input
                v-model="turma"
                type="text"
                placeholder="Turma"
            >

            <input
                v-model="idade"
                type="number"
                placeholder="Idade"
            >

            <button type="submit">
                {{ alunoEditando ? 'Atualizar' : 'Cadastrar' }}
            </button>

        </form>

        <br>

        <table border="1">

            <thead>

                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Turma</th>
                    <th>Idade</th>
                    <th>Ações</th>
                </tr>

            </thead>

            <tbody>

                <tr
                    v-for="aluno in alunos"
                    :key="aluno.id"
                >

                    <td>{{ aluno.id }}</td>
                    <td>{{ aluno.nome }}</td>
                    <td>{{ aluno.email }}</td>
                    <td>{{ aluno.turma }}</td>
                    <td>{{ aluno.idade }}</td>
                    <td>
                        <button @click="editarAluno(aluno)">
                            Editar
                        </button>
                        
                        <button @click="excluirAluno(aluno.id)">
                            Excluir
                        </button>
                    </td>
                </tr>

            </tbody>

        </table>

    </div>

</template> -->

<script setup>

import { ref, onMounted } from 'vue';
import api from '../services/api';
import Modal from '../components/Modal.vue';
import Input from '@/components/Input.vue';
import Button from '@/components/Button.vue';
import Table from '@/components/Table.vue';

const alunos = ref([]);

const modalAberto = ref(false);
const modoEdicao = ref(false);

const salvando = ref(false);
const erroModal = ref('');

const confirmarId = ref(null);
const confirmarNome = ref('');

const form = ref({
    id: null,
    nome: '',
    email: '',
    turma: '',
    idade: ''
});

// Buscar alunos
async function buscarAlunos() {

    const resposta = await api.get('/alunos');

    alunos.value = resposta.data;
}

// Abrir modal
function abrirModal(aluno = null) {

    erroModal.value = '';

    if (aluno) {

        modoEdicao.value = true;

        form.value = {
            ...aluno
        };

    } else {

        modoEdicao.value = false;

        form.value = {
            id: null,
            nome: '',
            email: '',
            turma: '',
            idade: ''
        };
    }

    modalAberto.value = true;
}

// Fechar modal
function fecharModal() {
    modalAberto.value = false;
}

// Salvar aluno
async function salvar() {

    if (!form.value.nome) {

        erroModal.value = 'Nome é obrigatório';
        return;
    }

    salvando.value = true;

    try {

        if (modoEdicao.value) {

            await api.put(
                `/alunos/${form.value.id}`,
                form.value
            );

        } else {

            await api.post(
                '/alunos',
                form.value
            );
        }

        await buscarAlunos();

        fecharModal();

    } catch (error) {

        erroModal.value = 'Erro ao salvar aluno';

    } finally {

        salvando.value = false;
    }
}

// Confirmar exclusão
function confirmarExclusao(aluno) {

    confirmarId.value = aluno.id;
    confirmarNome.value = aluno.nome;
}

// Excluir
async function excluirAluno() {

    await api.delete(
        `/alunos/${confirmarId.value}`
    );

    confirmarId.value = null;

    buscarAlunos();
}

onMounted(() => {
    buscarAlunos();
});

</script>

<template>

    <div class="page">

        <main class="content">

            <div class="header-row">

                <h2>Alunos</h2>

                <Button
                    texto="+ Novo Aluno"
                    classe="btn-primary"
                    @click="abrirModal()"
                />

            </div>
            
            <!-- tabela alunos -->
            <Table
                :dados="alunos"
                :colunas="[
                    { label: 'ID', campo: 'id' },
                    { label: 'Nome', campo: 'nome' },
                    { label: 'Email', campo: 'email' },
                    { label: 'Turma', campo: 'turma' },
                    { label: 'Idade', campo: 'idade' }
                ]"
                @editar="abrirModal"
                @excluir="confirmarExclusao"
            />

        </main>

        <!-- Modal -->

        <Modal
            v-if="modalAberto"
            @click.self="fecharModal"
        >


                <h3 class = 'titulo-modal'>
                    {{ modoEdicao ? 'Editar Aluno' : 'Novo Aluno' }}
                </h3>

               <!-- inputs nome, email, turma, idade -->
                <Input
                    label="Nome"
                    placeholder="Nome"
                    v-model="form.nome"
                />

                <Input
                    label="Email"
                    placeholder="Email"
                    type="email"
                    v-model="form.email"
                />

                <Input
                    label="Turma"
                    placeholder="Turma"
                    v-model="form.turma"
                />

                <Input
                    label="Idade"
                    placeholder="Idade"
                    type="number"
                    v-model="form.idade"
                />

                <p v-if="erroModal" class="erro">
                    {{ erroModal }}
                </p>

                <div class="modal-acoes">

                    <Button
                        texto="Cancelar"
                        classe="btn-cancelar"
                        @click="fecharModal"
                    />

                    <Button
                    :texto="salvando ? 'Salvando...' : 'Salvar'"
                    classe="btn-primary"
                    :disabled="salvando"
                    @click="salvar"
                />

                </div>
        </Modal>

        <!-- Confirmar exclusão -->

<Modal
    v-if="confirmarId"
    @click.self="confirmarId = null"
>

    <h3>Confirmar exclusão</h3>

    <p>
        Deseja excluir
        <strong>{{ confirmarNome }}</strong>?
    </p>

    <div class="modal-acoes">

        <Button
            texto="Cancelar"
            classe="btn-cancelar"
            @click="confirmarId = null"
        />

        <Button
            texto="Excluir"
            classe="btn-excluir"
            @click="excluirAluno()"
        />

    </div>

</Modal>

    </div>

</template>

<style scoped>

.page {
    min-height: 100vh;
    background: #f0f4f8;
}

.content {
    max-width: 1000px;
    margin: 0 auto;
    padding: 32px 24px;
}

.header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
}

h2 {
    font-size: 26px;
    color: #1a1a2e;
}

.titulo-modal {
    margin-bottom: 20px;
    color: #1a1a2e;
    text-align: center;
}

.modal-acoes {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
}

.erro {
    color: red;
    font-size: 14px;
}

</style>