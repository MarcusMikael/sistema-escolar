<template>

    <div class="field">

        <label>{{ label }}</label>

        <input
            :type="type"
            :placeholder="placeholder"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
        >

    </div>

</template>

<script setup>

defineProps({
    label: String,
    type: String,
    placeholder: String,
    modelValue: String
})

</script>

<style scoped>

.field {
    margin-bottom: 14px;
}

.field label {
    display: block;
    margin-bottom: 7px;
    font-weight: bold;
}

.field input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
}

</style>