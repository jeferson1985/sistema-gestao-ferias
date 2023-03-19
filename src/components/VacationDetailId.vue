<template>
  <div class="h-full">
    <div v-if="loading" class="flex justify-center items-center h-full">
      <CirclesLoader />
    </div>
    <div class="flex w-full gap-4 h-auto flex-wrap items-start content-start">
      <!-- <div class="w-96 xl:w-20 flex-grow min-h-76 h-auto rounded-xl p-6 bg-white">
        <h1 class="float-left text-xl">Calendario</h1>
        <div class="flex gap-4 float-right mb-4">
          <label for="">Modo escuro</label>
          <input id="darkmode" type="checkbox" v-model="isDark" />
        </div>
        <DatePicker expanded v-model="date" is-range :is-dark="isDark" />
      </div> -->
      <div class="flex flex-col flex-wrap gap-4 w-128 xl:w-1/3 flex-grow min-h-76 h-auto rounded-xl p-6 bg-white">
        <h1 class="flex text-xl text-gray-500 font-bold">Detalhes da solicitação</h1>
        <div class="sm:flex 3xl:flex-col">
          <div class="flex flex-col 3xl:w-1/2 sm:w-full gap-4 px-8 py-4">
            <h1 class="flex text-gray-500 font-bold">Matrícula</h1>
            <span class="flex text-gray-500 font-light">{{ vacation_requests.registration }}</span>
            <hr />

            <h1 class="flex text-gray-500 font-bold">Tipo de férias</h1>
            <span class="flex text-gray-500 font-light">{{
              status_type_of_vacation[vacation_requests.type_of_vacation]
            }}</span>
            <hr />

            <!-- Tipo férias Integral -->
            <div v-if="vacation_requests.type_of_vacation == 'INT'" class="flex flex-col gap-4">
              <h1 class="flex text-gray-500 font-bold">Data solicitada</h1>
              <!-- Intervalo Inteira -->
              <div class="flex flex-col">
                <label class="flex rounded-md mb-4 font-bold px-2 py-2 text-green-600" for="">Ínicio: {{
                  vacation_requests.breaks_initial[0] }}</label>
                <div class="flex items-center border-b-2 border-gray-100 focus-within:border-gray-600"></div>
                <label class="flex rounded-md mb-4 font-bold px-2 py-2 text-red-600" for="">Fim: {{
                  vacation_requests.breaks_final[0] }}</label>
                <div class="flex items-cennpm ter border-b-2 border-gray-100 focus-within:border-gray-600"></div>
              </div>
            </div>
            <!-- Tipo férias Venda -->
            <div v-else-if="vacation_requests.type_of_vacation == 'VEN'" class="flex flex-col gap-4">
              <h1 class="flex text-gray-500 font-bold">Data solicitada</h1>
              <!-- Intervalo férias -->
              <div class="flex justify-between">
                <label class="flex rounded-md mb-4 font-bold px-2 py-2 text-green-600" for="">Ínicio: {{
                  vacation_requests.breaks_initial[0] }}</label>
                <label class="flex rounded-md mb-4 font-bold text-red-600 px-2 py-2" for="">Fim: {{
                  vacation_requests.breaks_final[0] }}</label>
                <div class="flex items-center border-b-2 border-gray-100 focus-within:border-gray-600"></div>
              </div>
              <!-- Inicio venda -->
              <div class="flex items-center border-b-2 border-gray-100 focus-within:border-gray-600"></div>
              <div class="flex justify-between">
                <label class="flex w-full rounded-md mb-4 font-bold px-2 py-2 text-green-600" for="">Ínicio venda: {{
                  vacation_requests.breaks_final[1] }}</label>
                <label class="flex w-full rounded-md mb-4 font-bold px-2 py-2 text-red-600" for="">Fim venda: {{
                  vacation_requests.breaks_final[1] }}</label>
                <div class="flex items-center border-b-2 border-gray-100 focus-within:border-gray-600"></div>
              </div>
            </div>
            <!-- Tipo férias Parcial -->
            <div v-else-if="vacation_requests.type_of_vacation == 'PAR'" class="flex flex-col gap-4">
              <h1 class="flex text-gray-500 font-bold">Data solicitada</h1>
              <!-- 1º Intervalo -->
              <div class="flex">
                <label class="flex rounded-md mb-4 font-bold px-2 py-2 text-green-600" for="">1º Ínicio: {{
                  vacation_requests.breaks_initial[0] }}</label>
                <div class="flex items-center border-b-2 border-gray-100 focus-within:border-gray-600"></div>
                <label class="flex rounded-md mb-4 font-bold px-2 py-2 text-red-600" for="">1º Fim: {{
                  vacation_requests.breaks_final[0] }}</label>
                <div class="flex items-center border-b-2 border-gray-100 focus-within:border-gray-600"></div>
              </div>
              <!-- Marca linha  -->
              <div class="flex items-center border-b-2 border-gray-100 focus-within:border-gray-600"></div>
              <!-- 2º Intervalo -->
              <div class="flex">
                <label class="flex rounded-md mb-4 font-bold px-2 py-2 text-green-600" for="">2º Ínicio: {{
                  vacation_requests.breaks_initial[1] }}</label>
                <div class="flex items-center border-b-2 border-gray-100 focus-within:border-gray-600"></div>
                <label class="flex rounded-md mb-4 font-bold px-2 py-2 text-red-600" for="">2º Fim: {{
                  vacation_requests.breaks_final[1] }}</label>
                <div class="flex items-center border-b-2 border-gray-100 focus-within:border-gray-600"></div>
              </div>
              <!-- Marca linha  -->
              <div class="flex items-center border-b-2 border-gray-100 focus-within:border-gray-600"></div>
              <!-- 3º Intervalo -->
              <div class="flex">
                <label class="flex rounded-md mb-4 font-bold px-2 py-2 text-green-600" for="">3º Ínicio: {{
                  vacation_requests.breaks_initial[2] }}</label>
                <div class="flex items-center border-b-2 border-gray-100 focus-within:border-gray-600"></div>
                <label class="flex rounded-md mb-4 font-bold px-2 py-2 text-red-600" for="">3º Fim: {{
                  vacation_requests.breaks_final[2] }}</label>
                <div class="flex items-center border-b-2 border-gray-100 focus-within:border-gray-600"></div>
              </div>
            </div>
          </div>
          <div class="flex flex-col 3xl:w-1/2 sm:w-full gap-4 px-8 py-4">
            <h1 class="flex text-gray-500 font-bold">Colaborador</h1>
            <span class="flex text-gray-500 font-light">{{ vacation_requests.complete_name }}</span>
            <hr />

            <h1 class="flex text-gray-500 font-bold">Situação</h1>
            <span class="flex text-gray-500 font-light">{{
              values_status[vacation_requests.status]

            }}</span>
            <hr />
            <h1 class="flex text-gray-500 font-bold">Data de criação</h1>
            <span class="flex gap-10 text-gray-500 font-light">{{ vacation_requests.create_date }}</span>
            <hr />


            <div v-if="user_type" class="flex justify-end gap-6 mt-0 md:mt-32">
              <button @click="approveVacation" class="bg-green-500 font-bold px-10 py-2 rounded-md text-white">
                Aprovar
              </button>
              <button @click="refuseVacation"
                class="bg-red-600 font-bold px-10 py-2 rounded-md text-white whitespace-nowrap">
                Recusar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { title } from "@/store/title";
import { getUsers } from "@/store/auth.js";
import moment from "moment";
import "v-calendar/style.css";
import api from "@/services/api";
import CirclesLoader from "@/components/CirclesLoader.vue";
import { addMessage } from "@/store/alert";

export default {
  name: "VacationDetailId",
  components: { CirclesLoader },
  data: () => ({
    loading: false,
    user_id: "",
    user_info: "",
    user_type: "",
    sector_user: "",
    isDark: false,
    approved_status:"",
    reject_status: "",
    vacation_requests: {},
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
    date: {
      start: new Date(),
      end: new Date(),
    },
  }),
  async mounted() {
    title.value = "Detalhes solicitação";
    this.getVacationRequests();
    this.getUserSector();
  },
  computed: {
    formatDate() {
      return moment(this.date.start && this.date.end).format("DD/MM/YYYY");
    },
  },
  methods: {
    async getVacationRequests() {
      this.loading = true;
      try {
        const id = this.$route.params.id;
        const response = await api.get(`/api/v1/solicitacao/${id}`);
        const data = response.data;

        // teste
        const jsonString = data?.intervalos.replace(/\\/g, "");
        const regex = /"data_inicial_(\d+|venda)":"([^"]+)","data_final_(\d+|venda)":"([^"]+)"/g;
        const matches = [...jsonString.matchAll(regex)];

        let breaks_initial = [];
        let breaks_final = [];

        for (const match of matches) {
          const index = match[1];
          const initial = match[2] || "Não Informado";
          const final = match[4] || "Não Informado";

          if (index === "venda") {
            breaks_initial.push(initial);
            breaks_final.push(final);
          } else {
            const numIndex = parseInt(index);
            breaks_initial[numIndex - 1] = initial;
            breaks_final[numIndex - 1] = final;
          }
        }
        this.vacation_requests = {
          id: data?.id || "Não Informado",
          status: data?.status || "Não Informado",
          type_of_vacation: data?.tipo_ferias || "Não Informado",
          breaks_initial,
          breaks_final,
          complete_name:
            data.solicitante?.first_name + " " + data.solicitante?.last_name ||
            "Não Informado",
          registration: data.solicitante?.matricula,
          create_date: this.format_date(data?.data_criacao) || "Não Informado",
        };
      } catch (error) {
        console.log("error", error);
      }
      this.loading = false;
    },
    async approveVacation() {
      try {
        const token = document.cockies;
        const id = this.$route.params.id
        const { user_info } = await getUsers();
        this.user_info = user_info
      
        if (this.user_info.setores[0].recursos_humanos == true) {
          this.approved_status = "DEF"
        } else if (this.user_info.gestor == true && this.user_info.setores[0].recursos_humanos == false) {
          this.approved_status = "VGE"
        }
        await api.patch(`/api/v1/solicitacao/${id}/`,
          {
            status: this.approved_status,
          },
          {
            headers: {
              "X-CSRFToken": token,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        window.location.reload();
      } catch (error) {
        addMessage('error', "Erro ao alterar o status da solicitção")
      }
    },
    async refuseVacation() {
      try {
        const token = document.cockie;
        const id = this.$route.params.id;

        if (this.user_info.setores[0].recursos_humanos == true) {
          this.reject_status = "RRH"
        } else if (this.user_info.gestor == true && this.user_info.setores[0].recursos_humanos == false) {
          this.reject_status = "RGE"
        }
        await api.patch(
          `/api/v1/solicitacao/${id}/`,
          {
            status: this.reject_status,
          },
          {
            headers: {
              "X-CSRFToken": token,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        addMessage("success", "Solicitação recusada com sucesso!");
        window.location.reload();
      } catch (error) {
        addMessage("error", "Erro ao recusar solicitação!");
      }
    },
    format_date(value) {
      if (value) {
        return moment(String(value)).format("DD/MM/YYYY");
      }
    }, async getUserSector() {
      try {
        const response = await api.get(`/api/v1/whoami/`);
        const data = response.data;
        this.sector_user = {
          setores: data?.setores,
        };
      } catch (error) {
        addMessage("error", error);
      }
      this.user_type = this.sector_user.setores[0].recursos_humanos
      console.log("sector", this.user_type)
    },
  },
};
</script>
