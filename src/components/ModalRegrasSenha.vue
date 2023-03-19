<template>
    <div v-if="isOpen"
      class="absolute flex justify-center items-center w-screen h-screen md:top-32 top-56 left-0 bg-opacity-30 z-40">
      <div class="flex flex-col items-center bg-white shadow-lg shadow-orange-500 w-64 md:w-96 pt-2 px-4 pb-4 rounded-lg">
        <div class="flex justify-end w-full relative">
          <slot name="close"></slot>
        </div>
        <h1 class="text-3xl mt-8 mb-4">
          <slot name="title"></slot>
        </h1>
        <slot name="content" />
      </div>
    </div>
  </template>
    
  <script>
  export default {
    name: 'ModalRegrasSenha',
    props: {
      isOpen: { type: Boolean, default: false }
    },
  }
  </script>