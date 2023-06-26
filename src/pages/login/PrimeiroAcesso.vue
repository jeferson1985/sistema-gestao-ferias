<template>
  <BasePage>
    <div class="flex justify-center items-center bg-gray-100 w-full">
      <div class="absolute right-4 md:right-24 top-6">
        <FlashMessages />
      </div>
      <form class="flex flex-col w-10/12 sm:w-1/2" @submit.prevent="loginFirst">
        <div class="flex flex-col sm:items-center mb-6">
          <div class="flex flex-col sm:items-center">
            <h1 class="text-lg md:text-2xl lg:text-3xl text-orange-400 font-semibold md:font-normal">
              Faça seu Primeiro Acesso
            </h1>
            <p class="text-gray-900 font-semibold md:font-normal">
              Bem-vindo à Sunset
            </p>
          </div>
          <span class="text-gray-500">Insira seus dados para redefinir sua senha</span>
        </div>
        <div class="flex flex-col space-y-2 w-full mb-2">
          <label class="flex text-orange-400" for="matricula">Matrícula</label>
          <div class="flex items-center border-b-2 border-gray-300 focus-within:border-gray-600">
            <input v-model="matricula"
              class="peer w-full bg-transparent focus:outline-none text-lg sm:text-xl py-1 text-gray-900"
              placeholder="Digite sua matrícula" type="text" required />
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 sm:h-8 w-6 sm:w-8 text-gray-500 peer-focus:text-gray-900"
              viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                clip-rule="evenodd" />
            </svg>
          </div>
        </div>
        <div class="flex flex-col space-y-2 w-full mb-2">
          <label class="flex text-orange-400" for="email">Email</label>
          <div class="flex items-center border-b-2 border-gray-300 focus-within:border-gray-600">
            <input v-model="email"
              class="peer w-full bg-transparent focus:outline-none text-lg sm:text-xl py-1 text-gray-900"
              placeholder="Digite seu email" type="text" required />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="h-6 sm:h-8 w-6 sm:w-8 text-gray-500 peer-focus:text-gray-900">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>
        </div>
        <div class="flex flex-col py-2 mb-6">
          <button class="bg-orange-400 shadow-xl shadow-orange-600 text-white text-xl w-full py-2 rounded-lg"
            type="submit">
            Continuar
          </button>
        </div>
        <div v-if="loading" class="flex justify-center items-center h-full">
          <CirclesLoader />
        </div>
      </form>
    </div>
  </BasePage>
</template>

<script>
import BasePage from "./BasePage.vue";
import FlashMessages from "@/components/FlashMessages.vue";
import api from "@/services/api";
import { addMessage } from "@/store/alert";
import CirclesLoader from "@/components/CirclesLoader.vue";
import VueCookies from 'vue-cookies'

export default {
  name: "PrimeiroAcesso",
  components: { BasePage, CirclesLoader, FlashMessages },
  inject: ["$api"],
  data: () => ({
    showError: false,
    showMessage: "",
    loading: false,
    user_info: "",
    new_password: "",
    new_password_confirm: "",
    matricula: "",
    email: "",
  }),
  mounted() {
  },
  methods: {
    async loginFirst() {
      // this.loading = true
      try {
        const email = this.email.replace(/\s/g, ''); // Remove os espaços
        const checkEmail = /^[\w.+-]+@\w+([.-]?\w+)*(\.\w{2,3})+$/;

        if (!checkEmail.test(email)) {
          console.log('if')

          // Verifica se email segue o formato de const checkEmai
          addMessage("error", "Informe um email válido");
          this.loading = false;
          return;
        }
        const token = VueCookies.get('csrftoken')
        const data = await api.post(
          "/api/v1/accounts/first_login/",
          {
            matricula: this.matricula.replace(/\s/g, ''),
            email: this.email,
          },
          {
            headers: {
              "X-CSRFToken": token,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        this.showMessage = data
        addMessage("success", this.showMessage);
        this.clearData();
        this.$router.push({ path: "/" });
      } catch (error) {
        addMessage("error", error.response.data.non_field_errors[0]);
      }
      // this.loading = false
    },
    clearData() {
      this.email = "";
      this.matricula = "";
    },
  },
};
</script>
