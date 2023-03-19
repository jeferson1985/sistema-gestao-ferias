<template>
  <a class="flex text-lg font-bold transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 space-x-4 cursor-pointer"
    :class="selected ? 'text-orange-400' : 'text-gray-800'" @click="goTo">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500 font-bold" fill="none" viewBox="0 -2 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="path" />
    </svg>
    <span class="text-gray-500">{{ text }}</span>
  </a>
</template>

<script>
import { toggle_sidebar } from "@/store/title";
export default {
  name: "SidebarLink",
  props: {
    icon: { type: String, default: "home" },
    text: { type: String, default: "Inicial" },
    link: { type: String, default: "#" },
  },
  data: () => ({
    selected: false,
  }),
  computed: {
    path() {
      const path = {
        home: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
        profile:
          "M10.2967 9.34335C12.5519 9.34335 14.3801 7.51513 14.3801 5.25991C14.3801 3.00469 12.5519 1.17647 10.2967 1.17647C8.04148 1.17647 6.21326 3.00469 6.21326 5.25991C6.21326 7.51513 8.04148 9.34335 10.2967 9.34335ZM17.7414 18.8441C18.3371 18.8441 18.8264 18.3521 18.7118 17.7675C18.0453 14.3665 14.5394 11.7647 10.3064 11.7647C6.07134 11.7647 2.5553 14.3604 1.89759 17.7701C1.78499 18.3539 2.27396 18.8441 2.86846 18.8441H17.7414Z",
        folder: "M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z",
        register: "M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z",
        users: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z",
        add: "M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z",
        vacationview: "M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9",
        password_alter: "M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z",
      };
      return path[this.icon];
    },
  },
  methods: {
    goTo() {
      this.$router.push(this.link);
      toggle_sidebar("dismiss");
    },
  },
};
</script>
