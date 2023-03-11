import { createRouter, createWebHistory } from 'vue-router'
import Login from './login/Login.vue'
import CadastroUser from './pages/login/CadastroUser.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [{
        path: '/',
        name: 'cadastro',
        component: CadastroUser,
        redirect: { name: 'CadastroUser'},
    }]
})

export default router