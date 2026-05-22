<template>

    <div class="overlay">

        <div class="modal">

            <slot />

        </div>

    </div>

</template>

<style scoped>

.overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.4);

    display: flex;
    align-items: center;
    justify-content: center;
}

.modal {
    background: white;
    width: 100%;
    max-width: 450px;
    padding: 30px;
    border-radius: 16px;
}
</style>