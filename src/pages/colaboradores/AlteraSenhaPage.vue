<template>
  <div class="flex justify-around items-center md:items-center w-full h-screen bg-white px-6 md:py-0 py-4 rounded-md">
    <h1 class="absolute a51:top-32 mobile:top-28 top-24 left-16 text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-700 md:hidden">Sunset</h1>
    <h1 v-if="attention" class="text-yellow-400 text-2xl font-bold rounded-md absolute top-32">{{ attention }}</h1>
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
  </div>
</template>

<script>
import api from "@/services/api";
import { addMessage } from "@/store/alert";
import { title } from "@/store/title";
import { getUsers } from "@/store/auth.js"
import moment from "moment";
import CirclesLoader from "@/components/CirclesLoader.vue";

export default {
  name: "AlteraSenhaPage",
  components: { CirclesLoader },
  data: () => ({
    loading: false,
    old_password: "",
    new_password: "",
    new_password_confirm: "",
    attention: "",
  }),
  mounted() {
    title.value = `Alterar senha`
    this.changePassword()
  },
  methods: {
    async passwordAlter() {
      this.loading = true;
      const token = document.cookie;
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
    async changePassword() {
      const { user_info } = await getUsers();
      const last_password_change = moment(user_info.data_senha, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY');
      const date = moment();
      console.log('date', date)
      const diff = date.diff(last_password_change, 'days')
      if (diff > 180) {
        this.attention = "Alteração de senha obrigatório!"
      }
    },
    clearData() {
      this.old_password = "";
      this.new_password = "";
      this.new_password_confirm = "";
    },
  },
};
</script>
