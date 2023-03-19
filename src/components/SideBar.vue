<template>
  <div
    class="side-bar lg:static lg:flex flex-col w-full lg:h-auto sm:w-6/12 md:w-4/12 lg:w-4/12 xl:w-3/12 bg-white pt-6 px-8 border-r z-20 overflow-y-auto"
    :class="showSidebar ? 'fixed h-full' : 'hidden'">
    <div class="flex flex-col items-start">
      <p class="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-700">
        Sunset
      </p>
      <span
        class="text-sm font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-700">Gestão
        de Férias</span>
    </div>
    <div class="flex flex-col mb-6">
      <div class="flex justify-end text-gray-800">
        <button class="lg:hidden" @click="dismissSidebar">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd" />
          </svg>
        </button>
      </div>
      <slot name="links" />
    </div>
    <slot name="card" />
    <div class="flex gap-4 font-bold text-xl text-gray-500 hover:text-red-700  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
      </svg>
      <button @click="logout">Sair</button>
    </div>
  </div>
</template>

<script>
import { show_sidebar, toggle_sidebar } from "@/store/title";
import api from "@/services/api";
import { addMessage } from "@/store/alert";

export default {
  name: "SideBar",
  data: () => ({
  }),
  props: {
    imgSrc: { type: String, required: true },
  },
  computed: {
    showSidebar() {
      return show_sidebar.value;
    },
  },
  methods: {
    dismissSidebar() {
      toggle_sidebar("dismiss");
    },
    async logout() {
      try {
        const response = await api.get(`/api/v1/accounts/logout/`);
        addMessage("success", response.data.detail),
          this.$router.push({ path: "/" });
      } catch (error) {
        addMessage("error", "Erro de logout");
      }
    },
  },
};
</script>

<style>
.side-bar {
  background-image: url('');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
