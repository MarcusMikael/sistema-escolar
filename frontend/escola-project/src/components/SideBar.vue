<template>

    <!-- <aside class="sidebar">

        <h2>Menu</h2>

        <router-link to="/">
            Dashboard
        </router-link>

        <router-link to="/alunos">
            Alunos
        </router-link>

        <router-link to="/professores">
            Professores
        </router-link>

        <router-link to="/funcionarios">
            Funcionários
        </router-link>

    </aside> -->


    <aside class="sidebar">

  <RouterLink to="/" active-class="active">
  Dashboard
</RouterLink>

<RouterLink to="/alunos" active-class="active">
  Alunos
</RouterLink>

<RouterLink to="/professores" active-class="active">
  Professores
</RouterLink>

<RouterLink to="/funcionarios" active-class="active">
  Funcionários
</RouterLink>

</aside>

</template>