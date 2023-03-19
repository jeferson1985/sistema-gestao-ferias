<template>
  <div class="flex h-screen relative">
    <div class="flex absolute px-2 py-4">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
      <a href="/">Voltar</a>
    </div>
    <div class="hidden xl:flex justify-center items-center w-2/3 background">
      <div class="flex flex-col w-7/12">
        <p class="text-white font-bold text-4xl mt-60">
          Sunset - Sistema de gestão de férias
        </p>
      </div>
    </div>
    <div class="flex justify-center items-center bg-gray-100 w-full">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "BasePage",
  components: {},
};
</script>
<style scoped>
.background {
  width: 100%;
  background-image: url("https://cdn.templates.unlayer.com/assets/1664535286200-image2.png");
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-box-reflect: below 0px linear-gradient(to bottom, rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.4))np
}
</style>
