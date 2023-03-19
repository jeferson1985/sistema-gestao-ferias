<template>
  <BasePage>
    <form>
      <div class="flex flex-col space-y-2 w-full">
        <label class="flex text-gray-500" for="">Informe seu e-mail</label>
        <div class="flex items-center border-b-2 border-gray-300 focus-within:border-gray-600">
          <input v-model="email"
            class="peer w-full bg-transparent focus:outline-none text-lg sm:text-xl py-1 text-gray-900"
            placeholder="Digite sua senha" type="password" />
        </div>
      </div>
      <div>
        <button>Cadastrar</button>
      </div>
      <router-view></router-view>
    </form>
  </BasePage>
</template>

<script>
import BasePage from "./BasePage.vue";

export default {
  name: "EsqueciSenha",
  components: { BasePage },
  data: () => ({
    loading: false,
    email: "",
  }),
  methods: {
  },
};
</script>
