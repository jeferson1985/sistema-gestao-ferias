<template>
  <div class="flex space-x-4">
    <div class="bg-blue-400 x w-6 h-6 rounded-full animate-bounce first" />
    <div class="bg-purple-400 w-6 h-6 rounded-full animate-bounce second" />
    <div class="bg-green-400 w-6 h-6 rounded-full animate-bounce third" />
  </div>
</template>
  
<script>
export default {
  name: 'CirclesLoader',
}
</script>
  
<style scoped>
.first {
  animation-delay: 100ms;
}

.second {
  animation-delay: 250ms;
}

.third {
  animation-delay: 400ms;
}
</style>