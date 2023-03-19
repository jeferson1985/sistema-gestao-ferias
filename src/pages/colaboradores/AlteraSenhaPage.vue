<template>
  <div class="flex justify-around items-start w-full h-screen bg-white px-6 md:py-10 py-4 rounded-md">
    <div
      class="flex justify-center md:w-5/12 w-full py-10 border-2 border-orange-400 shadow-lg shadow-orange-500 px-6 rounded-md">
      <form class="flex flex-col w-10/12 sm:w-4/5" @submit.prevent="passwordAlter">
        <h1 class="text-center text-2xl text-orange-400 py-1">Alterar senha</h1>

        <div class="flex flex-col space-y-2 w-full">
          <label class="flex text-orange-400" for="old_password">Senha atual</label>
          <div class="flex items-center border-b-2 border-gray-300 focus-within:border-gray-600">
            <input v-model="old_password"
              class="peer w-full bg-transparent focus:outline-none text-lg sm:text-xl py-1 text-gray-900"
              placeholder="Senha atual" type="password" />
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 sm:h-8 w-6 sm:w-8 text-gray-500 peer-focus:text-gray-900"
              viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clip-rule="evenodd" />
            </svg>
          </div>
        </div>
        <div class="flex flex-col space-y-2 w-full">
          <label class="flex text-orange-400" for="new_password">Nova senha</label>
          <div class="flex items-center border-b-2 border-gray-300 focus-within:border-gray-600">
            <input v-model="new_password"
              class="peer w-full bg-transparent focus:outline-none text-lg sm:text-xl py-1 text-gray-900"
              placeholder="Senha nova" type="password" />
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 sm:h-8 w-6 sm:w-8 text-gray-500 peer-focus:text-gray-900"
              viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clip-rule="evenodd" />
            </svg>
          </div>
        </div>
        <div class="flex flex-col space-y-2 w-full mb-6">
          <label class="flex text-orange-400" for="new_password_confirm">Confirme senha</label>
          <div class="flex items-center border-b-2 border-gray-300 focus-within:border-gray-600">
            <input v-model="new_password_confirm"
              class="peer w-full bg-transparent focus:outline-none text-lg sm:text-xl py-1 text-gray-900"
              placeholder="Confirme senha" type="password" />
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 sm:h-8 w-6 sm:w-8 text-gray-500 peer-focus:text-gray-900"
              viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clip-rule="evenodd" />
            </svg>
          </div>
        </div>
        <div class="flex flex-col">
          <button class="bg-orange-400 shadow-lg shadow-orange-600 text-white text-xl w-full py-2 rounded-lg"
            type="submit">
            Alterar senha
          </button>
        </div>
        <div v-if="loading" class="flex justify-center h-full">
          <CirclesLoader />
        </div>
      </form>
    </div>
    <div class="md:flex justify-end rounded-md bg-white h-full overflow-hidden hidden">
      <img src="https://img.freepik.com/fotos-gratis/turista-segurando-um-guarda-chuva_1368-7033.jpg?w=360"
        class="max-w-md h-img 2xl:h-big" alt="" />
    </div>
    <ModalRegrasSenha :is-open="modal_open">
        <template #close>
          <div class="float-right absolute">
            <button @click="closeModal">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </template>
        <template #title>
          <h1>Regras de senha</h1>
        </template>
        <template #content>
          <div class="font-bold text-start text-sm text-gray-500">
            <p>Senha deve conter no mínimo 8 caracteres!</p>
            <p>Senha deve conter pelo menos 1 caractere especial!</p>
            <p>Senha deve conter pelo menos 1 letra maiúscula!</p>
            <p>Senha deve conter pelo menos 1 letra minúscula!</p>
            <p>Senha deve conter pelo menos 1 número!</p>
          </div>
        </template>
      </ModalRegrasSenha>
  </div>
</template>

<script>
import api from "@/services/api";
import { addMessage } from "@/store/alert";
import { title } from "@/store/title";
import CirclesLoader from "@/components/CirclesLoader.vue";
import ModalRegrasSenha from "@/components/ModalRegrasSenha.vue";
import VueCookies from 'vue-cookies'

export default {
  name: "AlteraSenhaPage",
  components: { CirclesLoader, ModalRegrasSenha },
  data: () => ({
    loading: false,
    old_password: "",
    new_password: "",
    new_password_confirm: "",
    modal_open: true,
  }),
  mounted() {
    title.value = `Alterar senha`
  },
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

        const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^.&*_()])[A-Za-z\d!@#$%^&*_()]{8,}$/;
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
    openModal() {
      this.modal_open = true;
    },
    closeModal() {
      this.modal_open = false;
    },
    clearData() {
      this.old_password = "";
      this.new_password = "";
      this.new_password_confirm = "";
    },
  },
};
</script>
