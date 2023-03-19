import { createRouter, createWebHistory } from "vue-router";
import LoginUser from "./pages/login/LoginUser";
import CadastroUser from "./pages/login/CadastroUser.vue";
import EsqueciSenha from "./pages/login/EsqueciSenha.vue";
import IndexHome from "./pages/home/IndexHome.vue";
import RhPage from "./pages/rh/RhPage.vue";
import GestorPage from "./pages/gestores/GestorPage.vue";
import ColaboradorPage from "./pages/colaboradores/ColaboradorPage.vue";
import PrimeiroAcesso from "./pages/login/PrimeiroAcesso.vue";
import VacationDetail from '@/pages/rh/VacationDetail.vue';
import VacationDetailId from '@/components/VacationDetailId.vue';
import HomePage from "./pages/home/HomePage.vue";
import RegrasClt from "@/pages/colaboradores/RegrasClt.vue";
import UsersList from "@/pages/rh/UsersList.vue";
import ResetConfirm from "@/pages/login/ResetConfirm.vue";
import SolicitacaoFerias from "@/pages/colaboradores/SolicitacaoFerias.vue";
import SolicitacaoId from "@/components/SolicitacaoId.vue";
import AlteraSenhaPage from "@/pages/colaboradores/AlteraSenhaPage.vue"
import { getSession } from "@/store/auth.js";
import TrocaSenha from "@/pages/login/TrocaSenha.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/first-access",
      name: "first-access",
      component: PrimeiroAcesso,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/esqueci-senha",
      name: "esqueci-senha",
      component: EsqueciSenha,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/accounts/password_reset_confirm/:uuid/:token/",
      name: "reset_confirm",
      component: ResetConfirm,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/troca-senha",
      name: "troca-senha",
      component: TrocaSenha,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/",
      name: "login",
      component: LoginUser,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/index-home",
      name: "index-home",
      component: IndexHome,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "/initial",
          name: "initial",
          component: HomePage,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "/solicitacao/:id",
          name: "solicitacao-detalhes",
          component: VacationDetail,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "/page-rh",
          name: "page-rh",
          component: RhPage,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "/page-gestor",
          name: "page-gestor",
          component: GestorPage,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "/page-colaborador",
          name: "page-colaborador",
          component: ColaboradorPage,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "/regras",
          name: "regras",
          component: RegrasClt,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "/cadastro",
          name: "cadastro",
          component: CadastroUser,
          meta: {
            requiresAuth: false,
          },
        },
         {
          path: "/users-list",
          name: "users",
          component: UsersList,
          meta: {
            requiresAuth: false,
          },
        },
        {
          path: "/solicitacao-gestotes",
          name: "solicitacao-gestotes",
          component: SolicitacaoFerias,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "/minha-solicitacao",
          name: "minha-solicitacao",
          component: SolicitacaoId,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "/minha-solicitacao/:id",
          name: "minha-solicitacao-detalhes",
          component: VacationDetailId,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "/alterar-senha",
          name: "alterar-senha",
          component: AlteraSenhaPage,
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },
  ],
});
// Guarda de rota impedindo usuário navegar depois de ter feito logout ou seta do navegador
router.beforeEach(async (to, from, next) => {
  try {
    const isAuthenticated = await getSession(); // Função assíncrona para verificar se o usuário está autenticado
    const session_data = isAuthenticated.isAuthenticated
    if (to.matched.some(record => record.meta.requiresAuth) && !session_data) {
      next('/'); // Redireciona para a página de login se o usuário não estiver autenticado
    } else {
      next(); // Permite a navegação normalmente
    }
  } catch (error) {
    console.error('Erro ao verificar autenticação:', error);
    next(false); // Impede a navegação se ocorrer um erro
  }
});

export default router;
