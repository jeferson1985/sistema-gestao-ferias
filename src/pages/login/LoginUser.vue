<template>
  <BasePage>
    <div class="flex justify-center items-center bg-gray-100 w-full">
      <form class="flex flex-col w-10/12 sm:w-1/2">
        <div
          class="flex flex-col sm:items-center space-y-4 md:space-y-8 mb-10 sm:mb-16"
        >
          <div class="flex flex-col sm:items-center space-y-2">
            <h1
              class="text-lg md:text-2xl lg:text-3xl text-gray-900 font-semibold md:font-normal"
            >
              Bem-vindo à Sunset
            </h1>
            <h1
              class="text-lg md:text-2xl lg:text-3xl text-gray-900 font-semibold md:font-normal"
            >
              Faça login para começar.
            </h1>
          </div>
          <span class="text-gray-500">Insira seus dados para prosseguir</span>
        </div>
        <div class="flex flex-col space-y-2 w-full mb-6">
          <label class="flex text-gray-500" for="">Matrícula</label>
          <div
            class="flex items-center border-b-2 border-gray-300 focus-within:border-gray-600"
          >
            <input
              v-model="matricula"
              class="peer w-full bg-transparent focus:outline-none text-lg sm:text-xl py-1 text-gray-900"
              placeholder="Digite sua matrícula"
              type="text"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 sm:h-8 w-6 sm:w-8 text-gray-500 peer-focus:text-gray-900"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div class="flex flex-col space-y-2 w-full">
          <label class="flex text-gray-500" for="">Senha</label>
          <div
            class="flex items-center border-b-2 border-gray-300 focus-within:border-gray-600"
          >
            <input
              v-model="senha"
              class="peer w-full bg-transparent focus:outline-none text-lg sm:text-xl py-1 text-gray-900"
              placeholder="Digite sua senha"
              type="password"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 sm:h-8 w-6 sm:w-8 text-gray-500 peer-focus:text-gray-900"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div class="flex justify-between w-full font-bold self-end my-8">
          <a href="" @click="createCadastro">Resgistre-se</a>
          <a href="">Esqueci a senha</a>
        </div>
        <div class="flex flex-col space-y-6">
          <button
            class="bg-orange-400 text-white text-xl w-full py-2 rounded-lg"
            type="submit"
          >
            Acessar
          </button>
        </div>
      </form>
    </div>
  </BasePage>
</template>

<script>
import BasePage from "./BasePage.vue";
export default {
  name: "LoginCliente",
  components: { BasePage },
  inject: ['$api'],
  data: () => ({

  }),
  mounted() {
    this.createCadastro()
  },
  methods: {
    createCadastro() {
      console.log('log')
      this.$router
    }
  },
};
</script>
