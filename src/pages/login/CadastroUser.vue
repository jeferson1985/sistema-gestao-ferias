<template>
  <BasePage>
    <div v-if="loading">
      <CirsclesLoader />
    </div>
    <form>
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
        </div>
      </div>
      <div>
        <button>Cadastrar</button>
      </div>
    </form>
  </BasePage>
</template>

<script>
import CirsclesLoaderVue from "@/components/CirsclesLoader.vue";
import BasePage from "./BasePage.vue";
export default {
  name: "CadastroUser",
  components: { BasePage, CirsclesLoaderVue },

  inject: ["$api"],
  data: () => ({
    loading: false,
  }),
};
</script>
