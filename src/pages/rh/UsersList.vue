<template>
  <div class="flex flex-col bg-white rounded-md w-full h-screen p-6">
    <div v-if="loading" class="flex justify-center items-center h-full">
      <CirclesLoader />
    </div>
    <div class="overflow-x-auto">
      <div class="p-1.5 w-full inline-block align-middle">
        <div class="border rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-orange-400">
              <tr>
                <th scope="col"
                  class="px-6 py-3 text-xs font-bold text-left text-white uppercase border-dotted border border-gray-400">
                  Nome
                </th>
                <th scope="col"
                  class="px-6 py-3 text-xs font-bold text-left text-white uppercase border-dotted border border-gray-400">
                  Matricula
                </th>
                <th scope="col"
                  class="px-6 py-3 text-xs font-bold text-left text-white uppercase border-dotted border border-gray-400">
                  Email
                </th>
                <th scope="col"
                  class="px-6 py-3 text-xs font-bold text-left text-white uppercase border-dotted border border-gray-400">
                  Data de admissão
                </th>
              </tr>
            </thead>
            <tbody>
              <!-- Renderização dos usuários -->
              <tr v-for="user in users_list" :key="user.id"
                class="hover:bg-orange-300 opacity-1 cursor-pointer hover:text-white">
                <td class="text-left px-6 py-4 whitespace-nowrap border-y-2 border-dotted border border-gray-400 text-gray-500 font-bold">{{
                  user.complete_name }}</td>
                <td class="text-left px-6 py-4 whitespace-nowrap border-y-2 border-dotted border border-gray-400 text-gray-500 font-bold">{{
                  user.matricula }}</td>
                <td class="text-left px-6 py-4 whitespace-nowrap border-y-2 border-dotted border border-gray-400 text-gray-500 font-bold">{{
                  user.email }}</td>
                <td class="text-left px-6 py-4 whitespace-nowrap border-y-2 border-dotted border border-gray-400 text-gray-500 font-bold">{{
                  user.data_admissao }}</td>
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
import { addMessage } from "@/store/alert";
import { title } from "@/store/title";
import CirclesLoader from "@/components/CirclesLoader.vue";
import moment from "moment";

export default {
  name: "UsersList",
  components: { CirclesLoader },
  data: () => ({
    loading: false,
    users_list: [],
    first_name: "",
    last_name: "",
    matricula: "",
    email: "",
    data_admissao: "",
    complete_name: "",
  }),
  mounted() {
    title.value = `Colaboradores`;
    this.getUsers();
  },
  methods: {
    async getUsers() {
      this.loading = true
      try {
        const response = await api.get(`/api/v1/users/`);
        const data = response.data;
        this.users_list = data.map((item) => ({
          complete_name: item?.first_name  || 'Não Informado' + " " + item?.last_name || 'Não Informado',
          email: item?.email || 'Não Informado',
          matricula: item?.matricula || 'Não Informado',
          data_admissao: this.format_date(item?.data_admissao) || 'Não Informado',
        }));
      } catch (error) {
        addMessage("error", error);
      }
      this.users_list.reverse()
      this.loading = false
    },
    format_date(value) {
      if (value) {
        return moment(String(value)).format("DD/MM/YYYY");
      }
    },
  },
};
</script>
s
