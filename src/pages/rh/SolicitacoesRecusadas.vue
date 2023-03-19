<template>
  <div class="flex flex-col space-y-2">
    <div v-if="loading" class="flex justify-center items-center h-full">
      <CirclesLoader />
    </div>
    <div v-if="vacation_requests.length > 0" class="flex flex-col space-y-2">
      <div v-for="(item, index) in vacation_requests" :key="item" @click="goTo(_, index)"
        class="container bg-white hover:bg-gray-500 opacity-1 hover:text-white rounded-md w-full sm:flex justify-between flex-wrap 3xl:grid 3xl:grid-rows-2 px-6 py-6 hover:cursor-pointer">
        <div class="flex flex-col w-32">
          <span class="flex font-bold">Matricula</span>
          <p class="flex">{{ item.registration }}</p>
        </div>
        <div class="flex flex-col w-48">
          <span class="flex font-bold">Colaborador</span>
          <p class="flex">{{ item.complete_name }}</p>
        </div>
        <div class="flex flex-col w-32">
          <span class="flex font-bold">Tipo de férias</span>
          <p class="flex">{{ status_type_of_vacation[item.type_of_vacation] }}</p>
        </div>
        <div class="flex flex-col w-48">
          <span class="flex font-bold">Situação</span>
          <p class="flex">{{ values_status[item.status] }}</p>
        </div>
        <div class="flex flex-col w-48">
          <span class="flex font-bold">Data de criação</span>
          <p class="flex">{{ item.create_date }}</p>
        </div>
        <div class="flex flex-col w-48">
          <span class="flex font-bold">Data solicitada</span>
          <p class="flex">{{ item.breaks_initial }} | {{ item.breaks_final }}</p>
          <!-- <p class="flex">{{ item.breaks }}</p> -->
        </div>
      </div>
    </div>
    <div v-else class="bg-white rounded-md w-full h-screen py-10">
      <h1 class="text-center text-3xl font-bold text-orange-400 m-auto animate-pulse">Nenhuma solicitação recusada</h1>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";
import CirclesLoader from "@/components/CirclesLoader.vue";
import { addMessage } from "@/store/alert";
import moment from "moment";

export default {
  name: "SolicitacoesRecusadas",
  components: { CirclesLoader },
  data: () => ({
    test: 2,
    loading: false,
    user_id: "",
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
      INT: "Inteira",
      VEN: "Venda",
      PAR: "Parcial",
    },
    status_list: [],
  }),
  async mounted() {
    this.fetchRejectRequests();
    this.getUsers();
  },
  computed: {},
  methods: {
    goTo(_, index) {
      const item = this.vacation_requests[index];
      const id = item && item.id;
      this.$router.push(`/solicitacao/${id}`);
    },
    async fetchRejectRequests() {
      this.loading = true;
      try {
        const status = ["RRH", "RGE"]
        const id = this.user_id
        const response = await api.get(`/api/v1/solicitacao/${id}?status__in=${status}`);
        const data = response.data;

        // Verifica se data é um objeto ou uma lista
        if (typeof data !== "object") {
          throw new Error("A resposta da API não é um objeto válido.");
        }

        if (Array.isArray(data)) {
          // Caso a resposta seja uma lista de objetos
          this.vacation_requests = data.map((item) => ({
            id: item?.id || "Não Informado",
            status: item?.status || "Não Informado",
            type_of_vacation: item?.tipo_ferias || "Não Informado",
            breaks_initial: JSON.parse(item?.intervalos).data_inicial_1,
            breaks_final: JSON.parse(item?.intervalos).data_final_1,
            complete_name:
              item.solicitante?.first_name +
              " " +
              item.solicitante?.last_name || "Não Informado",
            registration: item.solicitante?.matricula,
            create_date: item?.data_criacao || "Não Informado",
          }));
        } else {
          // Caso a resposta seja um único objeto
          this.vacation_requests = [
            {
              id: data?.id || "Não Informado",
              status: data?.status || "Não Informado",
              type_of_vacation: data?.tipo_ferias || "Não Informado",
              breaks_initial: JSON.parse(data?.intervalos).data_inicial_1,
              breaks_final: JSON.parse(data?.intervalos).data_final_1,
              complete_name:
                data.solicitante?.first_name +
                " " +
                data.solicitante?.last_name || "Não Informado",
              registration: data.solicitante?.matricula,
              create_date:
                this.format_date(data?.data_criacao) || "Não Informado",
            },
          ];
          this.vacation_requests.reverse()
        }
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
    async getUsers() {
      try {
        const response = await api.get(`/api/v1/whoami/`);
        const data = response.data;
        this.user_info = {
          id: data?.id,
        };
      } catch (error) {
        addMessage("error", error);
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
