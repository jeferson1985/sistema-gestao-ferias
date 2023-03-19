<template>
  <div class="flex flex-col bg-white rounded-md w-full h-screen p-6">
    <div v-if="loading" class="flex justify-center h-full">
      <CirclesLoader />
    </div>
    <div class="overflow-x-auto">
      <div class="p-1.5 w-full inline-block align-middle">
        <div class="border rounded-lg">
          <table class="min-w-full  divide-y divide-gray-200">
            <thead class="bg-orange-400">
              <tr>
                <th scope="col" class="px-6 py-3 text-xs font-bold text-left text-white uppercase border-dotted border">
                  Matrícula
                </th>
                <th scope="col" class="px-6 py-3 text-xs font-bold text-left text-white uppercase border-dotted border">
                  Colaborador
                </th>
                <th scope="col" class="px-6 py-3 text-xs font-bold text-left text-white uppercase border-dotted border">
                  Tipo de Férias
                </th>
                <th scope="col" class="px-6 py-3 text-xs font-bold text-left text-white uppercase border-dotted border">
                  Situação
                </th>
                <th scope="col" class="px-6 py-3 text-xs font-bold text-left text-white uppercase border-dotted border">
                  Data de Admissão
                </th>
                <th scope="col" class="px-6 py-3 text-xs font-bold text-left text-white uppercase border-dotted border">
                  Data Solicitada
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in vacation_requests" :key="item.id"
                class="hover:bg-orange-300 opacity-1 hover:text-white">
                <td class="text-left px-6 py-4 whitespace-nowrap border-y-2 border-dotted border border-gray-400 text-gray-500 font-bold">
                  {{ item.registration }}
                </td>
                <td class="text-left px-6 py-4 whitespace-nowrap border-y-2 border-dotted border border-gray-400 text-gray-500 font-bold">
                  {{ item.complete_name }}
                </td>
                <td class="text-left px-6 py-4 whitespace-nowrap border-y-2 border-dotted border border-gray-400 text-gray-500 font-bold">
                  {{ status_type_of_vacation[item.type_of_vacation] }}
                </td>
                <td class="text-left px-6 py-4 whitespace-nowrap border-y-2 border-dotted border border-gray-400 text-gray-500 font-bold">
                  {{ values_status[item.status] }}
                </td>
                <td class="text-left px-6 py-4 whitespace-nowrap border-y-2 border-dotted border border-gray-400 text-gray-500 font-bold">
                  {{ item.create_date }}
                </td>
                <td class="text-left px-6 py-4 whitespace-nowrap border-y-2 border-dotted border border-gray-400 text-gray-500 font-bold">
                  {{ item.breaks_initial }} | {{ item.breaks_final }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";
import moment from "moment";
import CirclesLoader from "@/components/CirclesLoader.vue";

export default {
  name: "HistoricList",
  components: { CirclesLoader },
  data: () => ({
    loading: true,
    names_columns: [
      {
        matricula: "Matricula",
        colaborador: "Colaborador",
        tipo: "Tipo",
        situacao: "Situacao",
        data_admissao: "Admissao",
        data_solicitada: "Solicitação",
      },
    ],
    first_name: "",
    last_name: "",
    admission_date: "",
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
  }),
  mounted() {
    this.getVacationRequests();
  },
  methods: {
    async getVacationRequests() {
      try {
        this.loading = true;
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
              item.solicitante?.last_name || "Não Informado",
            registration: item.solicitante?.matricula,
            create_date:
              this.format_date(item?.data_criacao) || "Não Informado",
          };
        });
        this.vacation_requests.reverse()
      } catch (error) {
        console.log("error", error);
      }
      this.loading = false;
    },
    format_date(value) {
      if (value) {
        return moment(String(value)).format("DD/MM/YYYY");
      }
    },
  },
};
</script>

<style scoped>
.container {
  height: 100%;
}

@media (min-width: 640px) {
  table {
    display: inline-table !important;
  }
}

thead tr:not(:first-child) {
  display: none;
}

td:not(:last-child) {
  border-bottom: 0;
}

th:not(:last-child) {
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
}
</style>
