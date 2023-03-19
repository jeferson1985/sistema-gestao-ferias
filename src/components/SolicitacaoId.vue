<template>
  <div class="flex flex-col space-y-2 bg-white rounded-md w-full h-screen p-6">
    <div v-if="loading" class="flex justify-center items-center h-full">
      <CirclesLoader />
    </div>
    <div v-if="vacation_requests.length > 0" class="flex flex-col space-y-4">
      <div v-for="(item, index) in vacation_requests" :key="item" @click="goTo(_, index)"
        class="container bg-white hover:bg-gray-500 text-gray-500 font-bold hover:text-white rounded-md w-full sm:flex justify-between flex-wrap 3xl:grid 3xl:grid-rows-2 px-6 py-6 hover:cursor-pointer">
        <div class="flex flex-col w-32">
          <span class="flex">Matricula</span>
          <p class="flex font-light">{{ item.registration }}</p>
        </div>
        <div class="flex flex-col w-50">
          <span class="flex">Colaborador</span>
          <p class="flex font-light">{{ item.complete_name }}</p>
        </div>
        <div class="flex flex-col w-32">
          <span class="flex">Tipo de férias</span>
          <p class="flex font-light">
            {{ status_type_of_vacation[item.type_of_vacation] }}
          </p>
        </div>
        <div class="flex flex-col w-48">
          <span class="flex">Situação</span>
          <p class="flex font-light">{{ values_status[item.status] }}</p>
        </div>
        <div class="flex flex-col w-48">
          <span class="flex">Data de criação</span>
          <p class="flex font-light">{{ item.create_date }}</p>
        </div>
        <div class="flex flex-col w-48">
          <span class="flex">Data solicitada</span>
          <p class="flex font-light">
            {{ item.intervalos.data_inicial_1 }} |
            {{ item.intervalos.data_final_1 }}
          </p>
        </div>
      </div>
    </div>
    <div v-else class="bg-white rounded-md w-full h-screen py-10">
      <h1 class="text-center text-3xl font-bold text-orange-400 m-auto animate-pulse">Nenhuma solicitação</h1>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";
import moment from "moment";
import { title } from "@/store/title";
import { getUsers } from "@/store/auth.js"
import CirclesLoader from "@/components/CirclesLoader.vue";

export default {
  name: "SolicitacaoId",
  components: { CirclesLoader },
  data() {
    return {
      loading: false,
      user_id: "",
      user_info: "",
      first_name: "",
      last_name: "",
      complete_name: "",
      registration: "",
      id: "",
      status: "",
      type_of_vacation: "",
      breaks: "",
      breaks_initial: "",
      breaks_final: "",
      vacation_requests: [],
      values_status: {
        CRI: "Criada",
        VGE: "Validada pelo Gestor",
        RGE: "Recusada pelo Gestor",
        DEF: "Deferido",
        RRH: "Recusada pelo RH",
        CON: "Concluida",
      },
      status_type_of_vacation: {
        INT: "Integral",
        VEN: "Venda",
        PAR: "Parcial",
      },
    }
  },
  mounted() {
    title.value = `Minhas solicitações`;
    this.getVacationRequestsId();
  },
  computed: {},
  methods: {
    goTo(_, index) {
      const item = this.vacation_requests[index];
      const id = item && item.id;
      this.$router.push(`/minha-solicitacao/${id}`);
    },
    async getVacationRequestsId() {
      const { user_info } = await getUsers();
      this.user_info = user_info.id;
      this.loading = true;
      try {
        const response = await api.get(`/api/v1/solicitacao/?solicitante=${this.user_info}`);
        const data = response.data;

        this.vacation_requests = data.map((item) => ({
          id: item?.id || "Não Informado",
          status: item?.status || "Não Informado",
          type_of_vacation: item?.tipo_ferias || "Não Informado",
          intervalos: JSON.parse(item?.intervalos),
          complete_name:
            item.solicitante?.first_name + " " + item.solicitante?.last_name ||
            "Não Informado",
          registration: item.solicitante?.matricula,
          create_date:
            this.format_date(item?.data_criacao) || "Não Informado",
        }))
        this.vacation_requests.reverse()
      } catch (error) {
        console.log("error", error);
      }
      this.loading = false;
    },
    reviver(key, value) {
      if (typeof value === "undefined") {
        return null;
      }
    },
    format_date(value) {
      if (value) {
        return moment(String(value)).format("DD/MM/YYYY");
      }
    },
  },
};
</script>

<style>
.container {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2),
              0px 0px 20px rgba(0, 0, 0, 0.15),
              0px 0px 30px rgba(0, 0, 0, 0.1);
}
</style>