<template>
  <LoginUser />
</template>

<script>
import LoginUser from './pages/login/LoginUser.vue'

export default {
  name: 'App',
  components: {
    LoginUser
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
