<script setup>

import Button from './Button.vue';

defineProps({
    dados: Array,
    colunas: Array
});

defineEmits([
    'editar',
    'excluir'
]);

</script>

<template>

    <div class="tabela-wrap">

        <table>

            <thead>

                <tr>

                    <th
                        v-for="coluna in colunas"
                        :key="coluna.campo"
                    >
                        {{ coluna.label }}
                    </th>

                    <th>Ações</th>

                </tr>

            </thead>

            <tbody>

                <tr v-if="dados.length === 0">

                    <td
                        :colspan="colunas.length + 1"
                        class="vazio"
                    >
                        Nenhum registro encontrado.
                    </td>

                </tr>

                <tr
                    v-for="item in dados"
                    :key="item.id"
                >

                    <td
                        v-for="coluna in colunas"
                        :key="coluna.campo"
                    >
                        {{ item[coluna.campo] }}
                    </td>

                    <td class="acoes">

                        <Button
                            texto="Editar"
                            classe="btn-editar"
                            @click="$emit('editar', item)"
                        />

                        <Button
                            texto="Excluir"
                            classe="btn-excluir"
                            @click="$emit('excluir', item)"
                        />

                    </td>

                </tr>

            </tbody>

        </table>

    </div>

</template>

<style scoped>

.tabela-wrap {
    background: white;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}

table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    padding: 14px;
    border-bottom: 1px solid #eee;
}

th {
    background: #f9fafb;
    text-align: left;
}

.acoes {
    display: flex;
    gap: 8px;
}

.vazio {
    text-align: center;
    padding: 30px;
    color: #888;
}

</style>