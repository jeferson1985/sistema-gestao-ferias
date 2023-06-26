<template>
  <div class="relative">
    <div class="flex lg:justify-between xl:justify-around items-center w-full h-screen bg-white px-6 md:py-10 rounded-md">
      <div
        class="flex justify-center w-full md:w-10/12 lg:w-10/12 xl:w-5/12 2xl:w-6/12 py-6 border-2 border-orange-400 shadow-lg shadow-orange-500 rounded-md">
        <form class="flex flex-col w-10/12 sm:w-4/5" @submit.prevent="sendRequest">
          <h1 class="text-center text-2xl text-orange-400">
            Solicitar férias
          </h1>

          <div class="flexflex-col space-y-2 w-full mb-4">
            <label class="flex text-orange-400" for="tipo_ferias">Tipo de férias</label>
            <div class="flex items-center border-b-2 border-gray-300 focus-within:border-gray-600">
              <select v-model="tipo_ferias"
                class="peer w-full bg-transparent focus:outline-none text-lg sm:text-xl py-1 text-gray-900">
                <option value="">Selecione uma opção</option>
                <option v-for="(typeFront, typeBack) in this.status_type_of_vacation" :value="typeBack"
                  :key="typeBack.id">
                  {{ typeFront }}
                </option>
              </select>
            </div>
          </div>
          <!-- Inteira -->
          <div v-if="tipo_ferias == 'INT'">
            <div class="flex flex-col space-y-2 w-full">
              <label class="flex text-orange-400" for="intervalos">Ínicio recesso</label>
              <!-- <input type="date" v-model="data_inicial"> -->
              <div class="flex items-center border-b-2 border-gray-300 focus-within:border-gray-600">
                <input input type="date" v-model="intervalos.inteira.data_inicial_1"
                  @change="atualizarDataFinalIntegral('inteira')"
                  class="peer w-full bg-transparent focus:outline-none text-lg sm:text-xl py-1 text-gray-900" />
              </div>
            </div>
            <div class="flex flex-col space-y-2 w-full">
              <label class="flex text-orange-400" for="intervalos">Fim recesso</label>
              <div class="flex items-center border-b-2 border-gray-300 focus-within:border-gray-600">
                <input type="date" v-model="intervalos.inteira.data_final_1" readonly
                  class="peer w-full bg-transparent focus:outline-none text-lg sm:text-xl py-1 text-gray-900" />
              </div>
            </div>
          </div>
          <!-- Venda -->
          <div v-else-if="tipo_ferias == 'VEN'" class="flex-col md:flex gap-4">
            <div class="md:flex gap-4">
              <div class="flex flex-col space-y-2 w-full">
                <label class="flex text-orange-400" for="intervalos">Ínicio recesso</label>
                <div class="flex items-center border-b-2 border-gray-300 focus-within:border-gray-600">
                  <input v-model="intervalos.venda.data_inicial_1" @change="atualizarDataFinalVendaFerias('venda')"
                    class="peer w-full bg-transparent focus:outline-none text-lg sm:text-xl py-1 text-gray-900"
                    type="date" />
                </div>
              </div>
              <div class="flex flex-col space-y-2 w-full">
                <label class="flex text-orange-400" for="intervalos">Fim recesso</label>
                <div class="flex items-center border-b-2 border-gray-300 focus-within:border-gray-600">
                  <input type="date" v-model="intervalos.venda.data_final_1" readonly
                    class="peer w-full bg-transparent focus:outline-none text-lg sm:text-xl py-1 text-gray-900" />
                </div>
              </div>
            </div>
            <!--  -->
            <div class="md:flex gap-4">
              <div class="flex flex-col space-y-2 w-full">
                <label class="flex text-orange-400" for="intervalos">Ínicio venda</label>
                <div class="flex items-center border-b-2 border-gray-300 focus-within:border-gray-600">
                  <input v-model="intervalos.venda.data_inicial_venda" @change="atualizarDataFinalVenda('venda')"
                    class="peer w-full bg-transparent focus:outline-none text-lg sm:text-xl py-1 text-gray-900"
                    type="date" />
                </div>
              </div>
              <div class="flex flex-col space-y-2 w-full">
                <label class="flex text-orange-400" for="intervalos">Fim venda</label>
                <div class="flex items-center border-b-2 border-gray-300 focus-within:border-gray-600">
                  <input type="date" v-model="intervalos.venda.data_final_venda" readonly
                    class="peer w-full bg-transparent focus:outline-none text-lg sm:text-xl py-1 text-gray-900" />
                </div>
              </div>
            </div>
          </div>

          <!-- Parcial -->
          <div v-else-if="tipo_ferias == 'PAR'" class="sm:flex-col md:flex gap-4">
            <div class="md:flex gap-4">
              <div class="flex flex-col space-y-2 w-full">
                <label class="flex text-orange-400" for="intervalos">Ínicio 1º recesso</label>
                <div class="flex items-center border-b-2 border-gray-300 focus-within:border-gray-600">
                  <input v-model="intervalos.parcial.data_inicial_1" @change="atualizarDataFinalParcial('parcial')"
                    class="peer w-full bg-transparent focus:outline-none text-lg sm:text-xl py-1 text-gray-900"
                    type="date" />
                </div>
              </div>
              <div class="flex flex-col space-y-2 w-full">
                <label class="flex text-orange-400" for="intervalos">Fim 1º recesso</label>
                <div class="flex items-center border-b-2 border-gray-300 focus-within:border-gray-600">
                  <input type="date" v-model="intervalos.parcial.data_final_1" readonly
                    class="peer w-full bg-transparent focus:outline-none text-lg sm:text-xl py-1 text-gray-900" />
                </div>
              </div>
            </div>

            <!--  -->
            <div class="md:flex gap-4">
              <div class="flex flex-col space-y-2 w-full">
                <label class="flex text-orange-400" for="intervalos">Ínicio 2º recesso</label>
                <div class="flex items-center border-b-2 border-gray-300 focus-within:border-gray-600">
                  <input v-model="intervalos.parcial.data_inicial_2" v-maska="'##/##/####'"
                    class="peer w-full bg-transparent focus:outline-none text-lg sm:text-xl py-1 text-gray-900"
                    type="date" />
                </div>
              </div>
              <div class="flex flex-col space-y-2 w-full">
                <label class="flex text-orange-400" for="intervalos">Fim 2º recesso</label>
                <div class="flex items-center border-b-2 border-gray-300 focus-within:border-gray-600">
                  <input v-model="intervalos.parcial.data_final_2" v-maska="'##/##/####'"
                    class="peer w-full bg-transparent focus:outline-none text-lg sm:text-xl py-1 text-gray-900"
                    type="date" />
                </div>
              </div>
            </div>
            <!--  -->
            <div class="md:flex gap-4">
              <div class="flex flex-col space-y-2 w-full">
                <label class="flex text-orange-400" for="intervalos">Ínicio 3º recesso</label>
                <div class="flex items-center border-b-2 border-gray-300 focus-within:border-gray-600">
                  <input v-model="intervalos.parcial.data_inicial_3" v-maska="'##/##/####'"
                    class="peer w-full bg-transparent focus:outline-none text-lg sm:text-xl py-1 text-gray-900"
                    type="date" />
                </div>
              </div>
              <div class="flex flex-col space-y-2 w-full">
                <label class="flex text-orange-400" for="intervalos">Fim 3º recesso</label>
                <div class="flex items-center border-b-2 border-gray-300 focus-within:border-gray-600">
                  <input v-model="intervalos.parcial.data_final_3" v-maska="'##/##/####'"
                    class="peer w-full bg-transparent focus:outline-none text-lg sm:text-xl py-1 text-gray-900"
                    type="date" />
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col space-y-6 py-8">
            <button class="bg-orange-400 shadow-lg shadow-orange-600 text-white text-xl w-full py-2 rounded-lg"
              type="submit">
              Enviar solicitação
            </button>
          </div>
          <div v-if="loading" class="flex justify-center h-full">
            <CirclesLoader />
          </div>
        </form>
      </div>
      <div class="md:flex justify-self-start rounded-md bg-white h-full overflow-hidden hidden">
        <img src="https://img.freepik.com/fotos-gratis/turista-segurando-um-guarda-chuva_1368-7033.jpg?w=360"
          class="max-w-md h-img 2xl:h-big" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { addMessage } from "@/store/alert";
import { title } from "@/store/title";
import api from "@/services/api";
import CirclesLoader from "@/components/CirclesLoader.vue";
import VueCookies from 'vue-cookies'
import moment from "moment";

export default {
  name: "ColaboradorPage",
  components: { CirclesLoader },
  data() {
    return {
      year: "",
      activeDates: [{ date: "" }],
      activeClass: "",
      status: "CRI",
      tipo_ferias: "",
      color: "orange-200",
      loading: false,
      data_final: "",
      data_inicial: "",
      intervalos: {
        inteira: {
          data_inicial_1: "",
          data_final_1: "",
        },
        venda: {
          data_inicial_1: "",
          data_final_1: "",
          data_inicial_venda: "",
          data_final_venda: "",
        },
        parcial: {
          data_inicial_1: "",
          data_final_1: "",
          data_inicial_2: "",
          data_final_2: "",
          data_inicial_3: "",
          data_final_3: "",
        },
      },
      data_criacao: "",
      username: "",
      password: "",
      status_type_of_vacation: {
        INT: "Integral",
        VEN: "Venda",
        PAR: "Parcial",
      },
    };
  },
  async mounted() {
    try {
      await this.getUsers(); // Aguarda a conclusão da função getUsers()
      const user_name = this.user_info.complete_name;
      title.value = `Solicitar férias - ${user_name}`;
    } catch (error) {
      console.error(error);
    }
  },
  computed: {
    invertedIntervalos() {
      const inverted = {};
      if (this.tipo_ferias === "INT") {
        for (const key in this.intervalos.inteira) {
          inverted[key] = this.intervalos.inteira[key]
            .split("-")
            .reverse()
            .join("/");
        }
      } else if (this.tipo_ferias === "VEN") {
        for (const key in this.intervalos.venda) {
          inverted[key] = this.intervalos.venda[key]
            .split("-")
            .reverse()
            .join("/");
        }
      } else {
        for (const key in this.intervalos.parcial) {
          console.log("log", this.tipo_ferias);
          inverted[key] = this.intervalos.parcial[key]
            .split("-")
            .reverse()
            .join("/");
        }
      }
      return inverted;
    },
  },
  methods: {
    atualizarDataFinalIntegral(chave) {
      const dataInicial = this.intervalos[chave].data_inicial_1;
      if (dataInicial) {
        const data = new Date(dataInicial);
        data.setDate(data.getDate() + 29);
        this.intervalos[chave].data_final_1 = data.toISOString().substr(0, 10);
      }
    },
    atualizarDataFinalVendaFerias(chave) {
      const dataInicial = this.intervalos[chave].data_inicial_1;
      if (dataInicial) {
        const data = new Date(dataInicial);
        data.setDate(data.getDate() + 19);
        this.intervalos[chave].data_final_1 = data.toISOString().substr(0, 10);
      }
    },
    atualizarDataFinalVenda(chave) {
      const dataInicial = this.intervalos[chave].data_inicial_venda;
      if (dataInicial) {
        const data = new Date(dataInicial);
        data.setDate(data.getDate() + 9);
        this.intervalos[chave].data_final_venda = data.toISOString().substr(0, 10);
      }
    },
    atualizarDataFinalParcial(chave) {
      const dataInicial = this.intervalos[chave].data_inicial_1;
      if (dataInicial) {
        const data = new Date(dataInicial);
        data.setDate(data.getDate() + 14);
        this.intervalos[chave].data_final_1 = data.toISOString().substr(0, 10);
      }
    },
    async sendRequest() {
      this.loading = true;
      try {
        this.data_criacao = this.format_date(moment());
        const data = {
          status: this.status,
          tipo_ferias: this.tipo_ferias,
          data_criacao: this.data_criacao,
          intervalos: JSON.stringify(this.invertedIntervalos),
        };
        const token = VueCookies.get('csrftoken')
        await api.post(`/api/v1/solicitacao/`, data, {
          headers: {
            "X-CSRFToken": token,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });
        addMessage("success", "Solicitação criada com sucesso");
        this.clearData();
        this.$router.push({ path: "/minha-solicitacao" })
      } catch (error) {
        addMessage("error", error.response.data[0] || error.response.data.non_field_errors[0]);
      }
      this.loading = false;
    },
    async getUsers() {
      try {
        const response = await api.get(`/api/v1/whoami/`);
        const data = response.data;
        this.user_info = {
          complete_name: data.first_name + " " + data.last_name,
        };
      } catch (error) {
        addMessage("error", error);
      }
    },
    clearData() {
      this.status = "";
      this.tipo_ferias = "";
      this.data_criacao = "";
      this.intervalos = "";
    },
    format_date(value) {
      if (value) {
        return moment(String(value)).format("YYYY-MM-DD");
      }
    },
    toggleDate() {
      this.activeDates.push({ date: new Date() });
    },
    monthClick() {
      this.activeDates.push({ date: new Date() });
    },
  },
};
</script>
