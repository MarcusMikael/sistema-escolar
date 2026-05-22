import {defineStore} from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        usuario: null
    }),

    actions: {

        login(email, senha) {

            if (
                email === 'admin@escola.com'&&
                senha === 'admin'
            ) {
                this.usuario = {
                    nome: 'Administrador',
                    email
                }
                return true
            }

            return false
        },

        logout() {
            this.usuario = null
        }
    }
});