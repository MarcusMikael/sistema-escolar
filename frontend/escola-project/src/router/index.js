import { createRouter, createWebHistory } from 'vue-router'
import AlunosView from '../views/AlunosView.vue'
import DashboardView from '../views/DashboardView.vue'
import ProfessoresView from '../views/ProfessoresView.vue'
import FuncionariosView from '../views/FuncionariosView.vue'
import LoginView from '../views/LoginView.vue'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/alunos',
      name: 'alunos',
      component: AlunosView
    },
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/professores',
      name: 'professores',
      component: ProfessoresView
    },
    {
      path: '/funcionarios',
      name: 'funcionarios',
      component: FuncionariosView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ],
})

// Verificação de entrada nas rotas para proteger as rotas privadas
router.beforeEach((to) => {

    const auth = useAuthStore();

    if (
        to.path !== '/login' &&
        !auth.usuario
    ) {

        return '/login';
    }
});

export default router
