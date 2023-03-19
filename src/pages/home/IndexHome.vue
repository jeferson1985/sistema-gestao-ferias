<template>
  <div class="bg-gray-100 relative">
    <div class="absolute h-1 w-full z-30" :class="[getGradient]" />
    <div class="absolute right-4 md:right-24 top-6">
      <FlashMessages />
    </div>
    <div class="flex min-h-screen bg-lighter relative">
      <div id="drag-overlay" on-drop="onDrop"
        class="bg-black-50 bg-opacity-60 w-screen h-full absolute bottom-0 left-0 z-40 hidden" @drop="onDrop"></div>
      <SideBar>
        <template #links>
          <div class="flex flex-col space-y-8 mt-12">
            <SidebarLink v-for="(link, index) in links" :key="index" :icon="link.icon" :text="link.text"
              :link="link.to" />
          </div>
        </template>
      </SideBar>
      <div class="flex flex-col w-full px-6">
        <TitleBar />
        <div class="h-full">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleBar from "@/components/TitleBar.vue";
import SideBar from "@/components/SideBar.vue";
import SidebarLink from "@/components/SidebarLink.vue";
import FlashMessages from "@/components/FlashMessages.vue";
import { getUsers } from "@/store/auth.js"

export default {
  name: "IndexHome",
  components: {
    TitleBar,
    SideBar,
    SidebarLink,
    FlashMessages,
  },
  data: () => ({
    get_user: true,
    id: "",
    password: "",
    last_login: "",
    is_supersuser: "",
    first_name: "",
    last_name: "",
    email: "",
    is_staff: "",
    date_joined: "",
    matricula: "",
    data_admissao: "",
    gestor: "",
    data_senha: "",
    groups: [],
    user_permissions: [],
    setores: [],
    user_info: [],
    sessionid: "",
    user_type: "",
  }),
  mounted() {
    this.fetchUsers();
  },
  computed: {
    links() {
      if (this.user_type == true) {
        return [
          {
            icon: "home",
            text: "Inicial",
            to: "/initial",
          },
          {
            icon: "folder",
            text: "Solicitações",
            to: "/page-rh",
          },
          {
            icon: "add",
            text: "Solicitar férias",
            to: "/solicitacao-gestotes",
          },
          {
            icon: "vacationview",
            text: "Minhas solicitações",
            to: "/minha-solicitacao",
          },
          {
            icon: "users",
            text: "Colaboradores",
            to: "/users-list",
          },
          {
            icon: "register",
            text: "Cadastro",
            to: "/cadastro",
          },
          {
            icon: "password_alter",
            text: "Alterar senha",
            to: "/alterar-senha",
          },
        ];
      } else if (this.user_info.gestor == true && this.user_type == false) {
        return [
          {
            icon: "home",
            text: "Inicial",
            to: "/initial",
          },
          {
            icon: "folder",
            text: "Solicitações",
            to: "/page-rh",
          },
          {
            icon: "add",
            text: "Solicitar férias",
            to: "/solicitacao-gestotes",
          },
          {
            icon: "vacationview",
            text: "Minhas solicitações",
            to: "/minha-solicitacao",
          },
          {
            icon: "users",
            text: "Colaboradores",
            to: "/users-list",
          },
          {
            icon: "password_alter",
            text: "Alerar senha",
            to: "/alterar-senha",
          },
        ]
      } else {
        return [
          {
            icon: "home",
            text: "Inicial",
            to: "/initial",
          },
          {
            icon: "profile",
            text: "Perfil",
            to: "/page-colaborador",
          },
          {
            icon: "folder",
            text: "Regras",
            to: "/regras",
          },
        ];
      }
    },
  },
  methods: {
    sendUser() {
      const user_type = this.user_info
      this.$emit('user', user_type)
    },
    async fetchUsers() {
      try {
        const { user_info, user_type } = await getUsers();
        this.user_info = user_info;
        this.user_type = user_type;
      } catch (error) {
        this.error = error.message;
      }
    }
  }
};
</script>
