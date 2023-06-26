<template>
  <BasePage>
    <div class="flex justify-center items-center bg-gray-100 w-full">
      <form class="flex flex-col w-10/12 sm:w-1/2" @submit.prevent="passwordAlter">
        <div class="flex flex-col sm:items-center mb-6">
          <div class="flex flex-col sm:items-center">
            <h1 class="text-lg md:text-2xl lg:text-3xl text-orange-400 font-semibold md:font-normal">
              Altere sua senha
            </h1>
            <p class="text-gray-900 font-semibold md:font-normal">
              Bem-vindo à Sunset
            </p>
          </div>
        </div>
        <div class="flex flex-col space-y-2 w-full mb-2">
          <label class="flex text-orange-400" for="old_password">Senha atual</label>
          <div class="flex items-center border-b-2 border-gray-300 focus-within:border-gray-600">
            <input v-model="old_password"
              class="peer w-full bg-transparent focus:outline-none text-lg sm:text-xl py-1 text-gray-900"
              placeholder="Digite sua senha atual" type="password" />
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 sm:h-8 w-6 sm:w-8 text-gray-500 peer-focus:text-gray-900"
              viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clip-rule="evenodd" />
            </svg>
          </div>
        </div>

        <div class="flex flex-col space-y-2 w-full mb-2">
          <label class="flex text-orange-400" for="new_password">Nova senha</label>
          <div class="flex items-center border-b-2 border-gray-300 focus-within:border-gray-600">
            <input v-model="new_password"
              class="peer w-full bg-transparent focus:outline-none text-lg sm:text-xl py-1 text-gray-900"
              placeholder="Digite sua nova senha" type="password" />
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 sm:h-8 w-6 sm:w-8 text-gray-500 peer-focus:text-gray-900"
              viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clip-rule="evenodd" />
            </svg>
          </div>
        </div>

        <div class="flex flex-col space-y-2 w-full mb-2">
          <label class="flex text-orange-400" for="new_password_confirm">Confirmação de senha</label>
          <div class="flex items-center border-b-2 border-gray-300 focus-within:border-gray-600">
            <input v-model="new_password_confirm"
              class="peer w-full bg-transparent focus:outline-none text-lg sm:text-xl py-1 text-gray-900"
              placeholder="Confirme sua senha" type="password" />
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 sm:h-8 w-6 sm:w-8 text-gray-500 peer-focus:text-gray-900"
              viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clip-rule="evenodd" />
            </svg>
          </div>
        </div>
        <div class="flex flex-col py-2 mb-6">
          <button class="bg-orange-400 shadow-xl shadow-orange-600 text-white text-xl w-full py-2 rounded-lg"
            type="submit">
            Alterar
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
import api from "@/services/api";
import { addMessage } from "@/store/alert";
import VueCookies from 'vue-cookies'
import CirclesLoader from "@/components/CirclesLoader.vue";

export default {
  name: "TrocaSenha",
  components: { BasePage, CirclesLoader },
  data: () => ({
    loading: false,
    old_password: "",
    new_password: "",
    new_password_confirm: "",
    attention: "",
  }),
  methods: {
    async passwordAlter() {
      this.loading = true;
      const token = VueCookies.get('csrftoken')
      let isPasswordValid = true;

      if (this.new_password_confirm !== this.new_password) {
        addMessage('error', 'Os campos de senha precisam ser iguais');
        this.clearData();
        isPasswordValid = false;
      } else {
        const trimmedNewPassword = this.new_password.replace(/\s/g, '');
        const trimmedConfirmPassword = this.new_password_confirm.replace(/\s/g, '');

        const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_()])[A-Za-z\d!@#$%^&*_()]{8,}$/;
        if (!passwordPattern.test(trimmedNewPassword)) {
          addMessage('error', 'A senha não atende ao padrão mínimo de segurança.');
          this.clearData();
          isPasswordValid = false;
        }

        if (isPasswordValid) {
          try {
            await api.patch(
              "/api/v1/accounts/password_change/",
              {
                old_password: this.old_password,
                new_password: trimmedNewPassword,
                new_password_confirm: trimmedConfirmPassword,
              },
              {
                headers: {
                  "X-CSRFToken": token,
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              }
            );

            addMessage("success", "Senha alterada com sucesso!");
            this.clearData();
            this.$router.push({ path: "/" });
          } catch (error) {
            addMessage("error", "Erro ao alterar senha!");
          }
        }
      }

      this.loading = false;
    },
    clearData() {
      this.old_password = "";
      this.new_password = "";
      this.new_password_confirm = "";
    },
  },
};
</script>
