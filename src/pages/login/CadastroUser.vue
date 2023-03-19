<template>
  <div class="flex justify-around items-center w-full h-screen bg-white px-6 py-10">
    <h1
      class="absolute a51:top-32 mobile:top-28 top-24 left-16 text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-700 md:hidden">
      Sunset</h1>
    <div v-if="loading" class="flex absolute top-24 h-full">
      <CirclesLoader />
    </div>
    <div
      class="flex justify-center md:w-7/12 w-full py-10 border-2 border-orange-400 shadow-lg shadow-orange-500 px-6 rounded-md">
      <form class="flex flex-col w-10/12 sm:w-4/5" @submit.prevent="createUser">
        <div class="flex flex-col sm:items-center space-y-4 md:space-y-8 mb-10 sm:mb-8">
          <div class="flex flex-col sm:items-center space-y-2">
            <h1 class="text-lg md:text-2xl lg:text-3xl text-orange-400 font-semibold md:font-normal">
              Cadastrar colaborador
            </h1>
          </div>
        </div>
        <div class="flex gap-6">
          <div class="flex flex-col space-y-2 w-full mb-2">
            <label class="flex text-orange-400" for="matricula">Matrícula</label>
            <div class="flex items-center border-b-2 border-gray-300 focus-within:border-gray-600">
              <input v-model="matricula"
                class="peer w-full bg-transparent focus:outline-none text-lg sm:text-xl py-1 text-gray-900"
                placeholder="Matrícula" type="number" required />
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
                placeholder="Email" type="text" required />
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="h-6 sm:h-8 w-6 sm:w-8 text-gray-500 peer-focus:text-gray-900">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
          </div>
        </div>
        <div class="flex gap-6">
          <div class="flex flex-col space-y-2 w-full mb-2">
            <label class="flex text-orange-400" for="first_name">Nome</label>
            <div class="flex items-center border-b-2 border-gray-300 focus-within:border-gray-600">
              <input v-model="first_name"
                class="peer w-full bg-transparent focus:outline-none text-lg sm:text-xl py-1 text-gray-900"
                placeholder="Nome" type="text" required />
            </div>
          </div>
          <div class="flex flex-col space-y-2 w-full mb-2">
            <label class="flex text-orange-400" for="last_name">Sobrenome</label>
            <div class="flex items-center border-b-2 border-gray-300 focus-within:border-gray-600">
              <input v-model="last_name"
                class="peer w-full bg-transparent focus:outline-none text-lg sm:text-xl py-1 text-gray-900"
                placeholder="Sobrenome" type="text" required />
            </div>
          </div>
        </div>
        <div class="flex gap-6">
          <div class="flex flex-col space-y-2 w-full mb-4">
            <label class="flex text-orange-400" for="sector">Setor</label>
            <div class="flex items-center border-b-2 border-gray-300 focus-within:border-gray-600">
              <select v-model="setores"
                class="peer w-full bg-transparent focus:outline-none text-lg sm:text-xl py-1 text-gray-900" required>
                <option value="">Selecione uma opção</option>
                <option v-for="(typeFront, typeBack) in this.sector_list" :value="typeBack" :key="typeBack.id">
                  {{ typeFront }}
                </option>
              </select>
            </div>
          </div>
          <div class="flex flex-col space-y-2 w-full mb-4">
            <label class="flex text-orange-400" for="gestor">Gestor</label>
            <div class="flex items-center border-b-2 border-gray-300 focus-within:border-gray-600">
              <select v-model="gestor"
                class="peer w-full bg-transparent focus:outline-none text-lg sm:text-xl py-1 text-gray-900" required>
                <option value="">Selecione uma opção</option>
                <option v-for="(typeFront, typeBack) in this.gestor_list" :value="typeBack" :key="typeBack.id">
                  {{ typeFront }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="flex flex-col space-y-2 w-full">
          <label class="flex text-orange-400" for="admission_date">Data admissão</label>
          <div class="flex items-center border-b-2 border-gray-300 focus-within:border-gray-600">
            <input v-model="data_admissao" v-maska="'##/##/####'"
              class="peer w-full bg-transparent focus:outline-none text-lg sm:text-xl py-1 text-gray-900"
              placeholder="Data admissão" type="date" required />
          </div>
        </div>
        <div class="flex flex-col space-y-6 py-8">
          <button class="bg-orange-400 shadow-lg shadow-orange-600 text-white text-xl w-full py-2 rounded-lg"
            type="submit">
            Continuar
          </button>
        </div>
      </form>
    </div>
    <div class="md:flex justify-end rounded-md bg-white h-full overflow-hidden hidden">
      <img src="https://img.freepik.com/fotos-gratis/turista-apontando-para-cima_1368-7017.jpg?w=2000"
        class="max-w-md h-img 2xl:h-big" alt="" />
    </div>
  </div>
</template>

<script>
import api from "@/services/api";
import { addMessage } from "@/store/alert";
import { title } from "@/store/title";
import CirclesLoader from "@/components/CirclesLoader.vue";
import VueCookies from 'vue-cookies'

export default {
  name: "CadastroUser",
  components: { CirclesLoader },
  data: () => ({
    loading: false,
    matricula: "",
    email: "",
    first_name: "",
    last_name: "",
    setores: [],
    gestor: "",
    data_admissao: "",
    gestor_list: {
      1: "Sim",
      0: "Não"
    },
    sector_list: {
      1: "Recursos Humanos",
      2: "TI",
      3: "Financeiro",
    },
  }),
  mounted() {
    title.value = `Cadastrar colaborador`;
  },
  methods: {
    async createUser() {
      const token = VueCookies.get('csrftoken')
      try {
        await api.post(
          "/api/v1/create_user/",
          {
            matricula: this.matricula,
            email: this.email,
            first_name: this.first_name,
            last_name: this.last_name,
            setores: this.setores,
            gestor: this.gestor,
            data_admissao: this.data_admissao,
          },
          {
            headers: {
              "X-CSRFToken": token,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        addMessage("success", "Colaborador criado com sucesso");
        this.clearData();
        this.$router.push("/initial");
      } catch (error) {
        this.clearData();
        addMessage("error", "Erro ao criar novo colaborador");
      }
    },
    sendCheckbox() {
      const value = this.gestor ? 1 : 0;
      return value
    },
    clearData() {
      this.matricula = "";
      this.email = "";
      this.first_name = "";
      this.last_name = "";
      this.setores = "";
      this.gestor = "";
      this.data_admissao = "";
    },
  },
};
</script>
