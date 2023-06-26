<template>
  <BasePage>
    <div
      class="flex justify-center md:w-10/12 w-full py-10 border-2 border-orange-400 shadow-lg shadow-orange-500 px-6 rounded-md m-10">
      <div class="absolute right-4 md:right-24 top-6">
        <FlashMessages />
      </div>
      <form class="flex flex-col w-10/12 sm:w-4/5" @submit.prevent="sendPassword">
        <div class="flex flex-col sm:items-center space-y-4 md:space-y-8 mb-10 sm:mb-16">
          <span class="text-gray-800 text-2xl">Resetar senha</span>
        </div>
        <div class="flex flex-col space-y-2 w-full mb-6">
          <label class="flex text-orange-400" for="password">Senha</label>
          <div class="flex items-center border-b-2 border-gray-300 focus-within:border-gray-600">
            <input v-model="password"
              required
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
        <div class="flex flex-col space-y-6 mb-6">
          <button class="bg-orange-400 shadow-xl shadow-orange-600 text-white text-xl w-full py-2 rounded-lg"
            type="submit">
            Resetar
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
import api from "@/services/api";
import { addMessage } from "@/store/alert";
import BasePage from "./BasePage.vue";
import CirclesLoader from "@/components/CirclesLoader.vue";
import VueCookies from 'vue-cookies'

export default {
  name: "ResetConfirm",
  components: { BasePage, CirclesLoader },
  data: () => ({
    loading: false,
    password: "",
    email: "",
    token: "",
    uidb64: "",
  }),
  methods: {
    async getResetConfirm() {
      const uuid = this.$route.params.uuid;
      const token_params = this.$route.params.token;
      try {
        const token = VueCookies.get('csrftoken')
        const response = await api.get(
          `/api/v1/password_reset_confirm/${uuid}/${token_params}/`,
          {
            email: this.email,
          },
          {
            headers: {
              "X-CSRFToken": token,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        console.log("confirm", response);
        addMessage("success", "");
      } catch (error) {
        addMessage("error", "");
      }
    },
    async sendPassword() {
      this.loading = true
      const uuid = this.$route.params.uuid;
      const token_params = this.$route.params.token;
      const token = VueCookies.get('csrftoken')
      try {
        const response = await api.patch(
          `api/v1/accounts/password_reset_complete/`,
          {
            password: this.password,
            token: token_params,
            uidb64: uuid,
          },
          {
            headers: {
              "X-CSRFToken": token,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        console.log(response);
        this.clearData();
        addMessage("success", "Senha alterada");
        this.$router.push({ path: "/" });
      } catch (error) {
        addMessage("error", "Erro ao alterar senha");
      }
      this.loading = false
    },
    clearData() {
      this.password = "";
      this.token = "";
      this.uidb64 = "";
      this.email = ""
    },
  },
};
</script>
