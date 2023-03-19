<template>
  <BasePage>
    <div class="flex justify-center items-center bg-gray-100 w-full">
      <div class="absolute right-4 md:right-24 top-6">
        <FlashMessages />
      </div>
      <form class="flex flex-col w-10/12 sm:w-1/2" @submit.prevent="login">
        <div class="flex flex-col sm:items-center space-y-4 md:space-y-8 mb-10 sm:mb-16">
          <div class="flex flex-col sm:items-center space-y-2">
            <h1 class="text-lg md:text-2xl lg:text-3xl text-gray-900 font-semibold md:font-normal">
              Bem-vindo à Sunset
            </h1>
            <h1 class="text-lg md:text-2xl lg:text-3xl text-gray-900 font-semibold md:font-normal">
              Faça login para começar.
            </h1>
          </div>
          <span class="text-gray-500">Insira seus dados para prosseguir</span>
        </div>
        <div class="flex flex-col space-y-2 w-full mb-6">
          <label class="flex text-orange-400" for="matricula">Matrícula</label>
          <div class="flex items-center border-b-2 border-gray-300 focus-within:border-gray-600">
            <input v-model="matricula"
              class="peer w-full bg-transparent focus:outline-none text-lg sm:text-xl py-1 text-gray-900"
              placeholder="Digite sua matrícula" type="text" />
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 sm:h-8 w-6 sm:w-8 text-gray-500 peer-focus:text-gray-900"
              viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                clip-rule="evenodd" />
            </svg>
          </div>
        </div>
        <div class="flex flex-col space-y-2 w-full">
          <label class="flex text-orange-400" for="password">Senha</label>
          <div class="flex items-center border-b-2 border-gray-300 focus-within:border-gray-600">
            <input v-model="password"
              class="peer w-full bg-transparent focus:outline-none text-lg sm:text-xl py-1 text-gray-900"
              placeholder="Digite sua senha" type="password" />
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 sm:h-8 w-6 sm:w-8 text-gray-500 peer-focus:text-gray-900"
              viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clip-rule="evenodd" />
            </svg>
          </div>
        </div>
        <div class="flex justify-between w-full font-bold self-end my-8">
          <a href="#" @click.prevent="firstAcess" class="hover">Primeiro acesso</a>
          <a href="#" @click.prevent="openModal" class="hover">Esqueci a senha</a>
        </div>
        <div class="flex flex-col space-y-6 mb-6">
          <button class="bg-orange-400 shadow-xl shadow-orange-600 text-white text-xl w-full py-2 rounded-lg"
            type="submit">
            Acessar
          </button>
        </div>
        <div v-if="loading" class="flex justify-center items-center h-full">
          <CirclesLoader />
        </div>
      </form>
      <ConfirmModal :is-open="modal_open">
        <template #close>
          <div class="float-right absolute">
            <button @click="closeModal">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </template>
        <template #title>
          <h1>Recuperação de senha</h1>
        </template>
        <template #content>
          <form action="" class="flex flex-col relative space-y-10 px-6 w-full mb-6" @submit.prevent="passwordReset">
            <label class="flex text-orange-400" for="">Informe seu email</label>
            <div class="flex items-center border-b-2 border-gray-300 focus-within:border-gray-600">
              <input v-model="email" @blur="checkEmail" @click="hiddenError" name="email" required
                class="peer w-full bg-transparent focus:outline-none text-lg sm:text-xl py-1 text-gray-900"
                placeholder="Digite seu email" type="text" />
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="h-6 sm:h-8 w-6 sm:w-8 text-gray-500 peer-focus:text-gray-900">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <span v-if="showError" class="absolute top-16 py-2 text-red-300">Digite um email válido</span>
            <span v-if="showMessage" class="flex text-green-500">Verifique seu email</span>

            <div class="flex flex-col space-y-6">
              <button type="submit"
                class="bg-orange-400 shadow-xl shadow-orange-500 text-white text-xl w-full py-2 rounded-lg">
                Enviar
              </button>
            </div>
            <div v-if="loading_reset" class="flex justify-center items-center h-full">
              <CirclesLoader />
            </div>
          </form>
        </template>
      </ConfirmModal>
    </div>
  </BasePage>
</template>

<script>
import BasePage from "./BasePage.vue";
import ConfirmModal from "@/components/ConfirmModal.vue";
import CirclesLoader from "@/components/CirclesLoader.vue";
import { getSession } from "@/store/auth.js";
import { addMessage } from "@/store/alert";
import { getUsers } from "@/store/auth.js"
import moment from "moment";
import api from "@/services/api";
import FlashMessages from "@/components/FlashMessages.vue";

export default {
  name: "LoginCliente",
  components: { BasePage, ConfirmModal, FlashMessages, CirclesLoader },
  data: () => ({
    loading: false,
    loading_reset: false,
    modal_open: false,
    matricula: "",
    password: "",
    email: "",
    session_data: "",
    error: null,
    showError: false,
    showMessage: "",
    user_data: "",
    user_info: [],
    user_type: "",
  }),
  mounted() {
    this.forceLogout();
  },
  methods: {
    async login() {
      this.loading = true;
      try {
        const token = document.cookie.match(/XSRF-TOKEN=([^;]+)/)[1];
        const response = await api.post(
          "/api/v1/accounts/login/",
          {
            matricula: this.matricula,
            password: this.password.replace(/\s/g, ''),
          },
          {
            headers: {
              "X-CSRFToken": token,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        const { user_info } = await getUsers();
        const last_password_change = moment(user_info.data_senha, 'YYYY-MM-DD HH:mm:ss');
        const date = moment();
        const diff = date.diff(last_password_change, 'days');
        if (diff >= 180) {
          this.$router.push({ path: "/troca-senha" });
          addMessage("warning", `Sua senha expirou. Por favor, altere sua senha.`);
          return;
        }
        console.log('login', response)
        this.clearData();
        this.$router.push({ path: "/initial" });
        addMessage("success", `Login realizado com sucesso`);
      } catch (error) {
        console.log('errou', error)
        addMessage("error", "Matricula ou senha incoretos");
      }
      this.loading = false;
    },


    checkEmail() {
      const checkEmail = /^[\w.+-]+@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      this.showError = !checkEmail.test(this.email);
    },
    hiddenError() {
      this.showError = false;
    },
    async forceLogout() {
      this.session_data = await getSession();
      if (this.session_data.isAuthenticated == true) {
        try {
          const token = document.cockies.match(/XSRF-TOKEN=([^;]+)/)[1];
          await api.get(`/api/v1/accounts/logout/`,
            {
              headers: {
                "X-CSRFToken": token,
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          )
          window.location.reload();

        } catch (error) {
          console.log('Erro na tentativa de deslogar o usuário', error.message)
        }
      }
    },
    async passwordReset() {
      this.loading = true;
      try {
        const email = this.email.replace(/\s/g, ''); // Remove os espaços
        const checkEmail = /^[\w.+-]+@\w+([.-]?\w+)*(\.\w{2,3})+$/;

        if (!checkEmail.test(email)) {
          // Verifica se email segue o formato de const checkEmai
          addMessage("error", "Informe um email válido");
          this.loading = false;
          return;
        }

        const token = document.cookie.match(/XSRF-TOKEN=([^;]+)/)[1];
        const response = await api.post(
          `/api/v1/accounts/password_reset/`,
          {
            email: email,
          },
          {
            headers: {
              "X-CSRFToken": token,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        console.log(response.data);
        this.showMessage = true;
        addMessage("success", "Verifique seu email");
        this.clearData();
        this.closeModal();
      } catch (error) {
        addMessage("error", "Ocorreu um erro ao enviar a solicitação.");
      }
      this.loading = false;
    },
    clearData() {
      this.matricula = "";
      this.password = "";
      this.email = "";
    },
    redirectRegistration() {
      this.$router.push({ path: "/cadastro" });
    },
    firstAcess() {
      this.$router.push({ path: "/first-access" });
    },
    openModal() {
      this.modal_open = true;
    },
    closeModal() {
      this.modal_open = false;
    },
  },
};
</script>
