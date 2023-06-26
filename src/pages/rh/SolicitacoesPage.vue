<template>
  <div class="flex flex-col space-y-4 bg-white rounded-md w-full h-screen p-6">
    <div v-if="loading" class="flex justify-center items-center h-full">
      <CirclesLoader />
    </div>
    <div v-if="vacation_requests.length > 0" class="flex flex-col space-y-4">
      <div v-for="(item, index) in vacation_requests" :key="item" @click="goTo(_, index)"
      class="container relative hover:bg-gray-500 text-gray-500 font-bold hover:text-white rounded-md w-full sm:flex justify-between flex-wrap 3xl:grid 3xl:grid-rows-2 px-6 py-6 hover:cursor-pointer">
      <div class="flex flex-col w-24">
        <span class="flex font-bold">Matricula</span>
        <p class="flex font-light">{{ item.registration }}</p>
      </div>
      <div class="flex flex-col w-36">
        <span class="flex font-bold">Colaborador</span>
        <p class="flex font-light">{{ item.complete_name }}</p>
      </div>
      <div class="flex flex-col w-16">
        <span class="flex font-bold">Tipo</span>
        <p class="flex font-light">{{ status_type_of_vacation[item.type_of_vacation] }}</p>
      </div>
      <div class="flex flex-col w-40">
        <span class="flex font-bold">Situação</span>
        <p class="flex font-light">{{ values_status[item.status] }}</p>
      </div>
      <div class="flex flex-col w-32">
        <span class="flex font-bold">Data de criação</span>
        <p class="flex font-light">{{ item.create_date }}</p>
      </div>
      <div class="flex flex-col w-48">
        <span class="flex font-bold">Data solicitada</span>
        <p class="flex font-light">Inicio: {{ item.breaks_initial }}</p>
        <p class="flex font-light">Fim: {{ item.breaks_final }}</p>
      </div>
      <div v-if="user_type" class="absolute right-6 top-6 md:top-20 lg:top-20 xl:top-10 2xl:top-10 3xl:top-6">
        <button class="border p-2 border-gray-200 text-gray-400 rounded-lg ml-2" @click.stop="deleteVacation(_, index)">
          <svg fill="#000000" width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
            id="delete-alt-2" class="icon glyph">
            <path d="M17,4V5H15V4H9V5H7V4A2,2,0,0,1,9,2h6A2,2,0,0,1,17,4Z"></path>
            <path
              d="M20,6H4A1,1,0,0,0,4,8H5.07l.87,12.14a2,2,0,0,0,2,1.86h8.14a2,2,0,0,0,2-1.86L18.93,8H20a1,1,0,0,0,0-2ZM13,17a1,1,0,0,1-2,0V11a1,1,0,0,1,2,0Z">
            </path>
          </svg>
        </button>
        </div>
      </div>
    </div>
    <div v-else class="bg-white rounded-md w-full h-screen py-10">
      <h1  class="text-center text-3xl font-bold text-orange-400 m-auto animate-pulse">Nenhuma solicitação</h1>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";
import CirclesLoader from "@/components/CirclesLoader.vue";
import VueCookies from 'vue-cookies'
import { getUsers } from "@/store/auth.js"
import { addMessage } from "@/store/alert";
import moment from "moment";
import { title } from "@/store/title";

export default {
  name: "SolicitacoesPage",
  components: { CirclesLoader },
  data: () => ({
    loading: false,
    user_type: "",
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
    title.value = `Minhas solicitações`
    this.getVacationRequests();
    this.fetchUsers()
  },
  computed: {},
  methods: {
    async fetchUsers() {
      try {
        const { user_type } = await getUsers();
        this.user_type = user_type;
      } catch (error) {
        this.error = error.message;
      }
    },
    goTo(_, index) {
      const item = this.vacation_requests[index];
      const id = item && item.id;
      this.$router.push(`/solicitacao/${id}`);
    },
    async getVacationRequests() {
      this.loading = true;
      try {
        const response = await api.get(`/api/v1/solicitacao/`);
        const data = response.data;
        this.vacation_requests = data.map((item) => {
          const jsonString = item?.intervalos.replace(/\\/g, "");
          const matches = jsonString.match(
            /"data_inicial_1":"([^"]+)","data_final_1":"([^"]+)"/
          );
          const breaks_initial =
            matches && matches[1] ? matches[1] : "Não Informado";
          const breaks_final =
            matches && matches[2] ? matches[2] : "Não Informado";

          return {
            id: item?.id || "Não Informado",
            status: item?.status || "Não Informado",
            type_of_vacation: item?.tipo_ferias || "Não Informado",
            breaks_initial,
            breaks_final,
            complete_name:
              item.solicitante?.first_name +
              " " +
              item.solicitante?.last_name.split(' ').slice(0, 1).join(' ').concat('...') || "Não Informado",
            registration: item.solicitante?.matricula,
            create_date: this.format_date(item?.data_criacao) || "Não Informado",
          };
        });
        this.vacation_requests.reverse()
      } catch (error) {
        console.log("error", error);
      }
      this.loading = false;
    },
    async deleteVacation(_, index) {
      this.loading = true;
      try {
        const item = this.vacation_requests[index];
        const id = item && item.id;
        const token = VueCookies.get('csrftoken')
        const { user_type } = await getUsers();
        const sector_type = user_type
        if (sector_type == true) {
          await api.delete(
            `/api/v1/solicitacao/${id}`,
            {
              id: id,
            },
            {
              headers: {
                "X-CSRFToken": token,
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );
          addMessage("success", "Solicitação deletada com sucesso!");
          window.location.reload();
        } else {
          addMessage("error", "Usuário sem autorização para deletar solicitação!")
        }

      } catch (error) {
        addMessage("error", "Erro ao deletar solicitação!");
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
    openModal() {
      this.modal_open = true;
    },
    closeModal() {
      this.modal_open = false;
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