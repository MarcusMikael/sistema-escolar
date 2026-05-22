<script setup>

defineProps({
    texto: String,
    classe: String,
    disabled: Boolean
});

</script>

<template>

    <button
        :class="classe"
        :disabled="disabled"
    >

        {{ texto }}

    </button>

</template>

<style scoped>

.btn-primary {
    background: #6366f1;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
}

.btn-primary:hover {
    background: #4f46e5;
}

.btn-editar {
    background: #e0e7ff;
    color: #4338ca;
    border: none;
    padding: 6px 14px;
    border-radius: 6px;
    cursor: pointer;
}

.btn-excluir {
    background: #fee2e2;
    color: #dc2626;
    border: none;
    padding: 6px 14px;
    border-radius: 6px;
    cursor: pointer;
}

.btn-cancelar {
    background: #f3f4f6;
    border: none;
    padding: 10px 18px;
    border-radius: 8px;
    cursor: pointer;
}

</style>