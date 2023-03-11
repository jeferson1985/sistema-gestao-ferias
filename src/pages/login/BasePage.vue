<template>
  <div class="flex h-screen">
    <div class="hidden xl:flex justify-center items-center w-2/3 background">
      <div class="flex flex-col w-7/12">
        <p class="text-white font-bold text-4xl mt-60">
          Gestão de férias de forma Inteligente
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
}
</style>
