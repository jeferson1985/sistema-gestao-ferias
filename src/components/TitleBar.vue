<template>
  <div class="flex justify-between items-center pt-10 px-3 lg:px-4 pb-5">
    <div class="flex gap-4 items-center">
      <button class="lg:hidden" @click="toggleSidebar">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <h2 class="text-sm md:text-2xl xl:text-3xl text-gray-500 font-bold">{{ title }}</h2>
    </div>
    <!-- <UserDropdownButton /> -->
     <div class="flex px-4 text-purple-700 font-semibold cursor-pointer hover:animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        <a @click="$router.back(1)">Voltar</a>
      </div>
  </div>
</template>
  
<script>

import { title, toggle_sidebar } from '@/store/title'
// import UserDropdownButton from '@/components/navbar_components/UserDropdownButton.vue'
export default {
  name: 'TitleBar',
  components: {},
  data: () => ({}),
  computed: {
    title() {
      return title.value
    },
  },
  methods: {
    toggleSidebar() {
      toggle_sidebar()
    },
  },
}
</script>
  