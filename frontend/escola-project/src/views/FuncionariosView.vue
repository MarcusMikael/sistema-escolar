<script setup>

import { ref, onMounted } from 'vue';
import api from '../services/api';
import Modal from '../components/Modal.vue';
import Input from '@/components/Input.vue';
import Button from '@/components/Button.vue';
import Table from '@/components/Table.vue';

const funcionarios = ref([]);

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
    cargo: ''
});

// Buscar funcionários
async function buscarFuncionarios() {

    const resposta = await api.get('/funcionarios');

    funcionarios.value = resposta.data;
}

// Abrir modal
function abrirModal(funcionario = null) {

    erroModal.value = '';

    if (funcionario) {

        modoEdicao.value = true;

        form.value = {
            ...funcionario
        };

    } else {

        modoEdicao.value = false;

        form.value = {
            id: null,
            nome: '',
            email: '',
            cargo: ''
        };
    }

    modalAberto.value = true;
}

// Fechar modal
function fecharModal() {
    modalAberto.value = false;
}

// Salvar funcionário
async function salvar() {

    if (!form.value.nome) {

        erroModal.value = 'Nome é obrigatório';
        return;
    }

    salvando.value = true;

    try {

        if (modoEdicao.value) {

            await api.put(
                `/funcionarios/${form.value.id}`,
                form.value
            );

        } else {

            await api.post(
                '/funcionarios',
                form.value
            );
        }

        await buscarFuncionarios();

        fecharModal();

    } catch (error) {

        erroModal.value = 'Erro ao salvar funcionário';

    } finally {

        salvando.value = false;
    }
}

// Confirmar exclusão
function confirmarExclusao(funcionario) {

    confirmarId.value = funcionario.id;
    confirmarNome.value = funcionario.nome;
}

// Excluir
async function excluirFuncionario() {

    await api.delete(
        `/funcionarios/${confirmarId.value}`
    );

    confirmarId.value = null;

    buscarFuncionarios();
}

onMounted(() => {
    buscarFuncionarios();
});

</script>

<template>

    <div class="page">

        <main class="content">

            <div class="header-row">

                <h2>Funcionários</h2>

                <Button
                    texto="+ Novo Funcionário"
                    classe="btn-primary"
                    @click="abrirModal()"
                />

            </div>

            <Table
                :dados="funcionarios"
                :colunas="[
                    { label: 'ID', campo: 'id'},
                    { label: 'Nome', campo: 'nome'},
                    { label: 'Email', campo: 'email'},
                    { label: 'Cargo', campo: 'cargo'}
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
                    {{ modoEdicao ? 'Editar Funcionário' : 'Novo Funcionário' }}
                </h3>

               <!-- inputs nome, email, cargo -->
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
                    label="Cargo"
                    placeholder="Cargo"
                    v-model="form.cargo"
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
            @click="excluirFuncionario()"
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