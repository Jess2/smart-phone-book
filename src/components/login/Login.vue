<template>
  <div class="login">
    <h1>{{ msg }}</h1>

    <router-link :to="'/detail'">로그인</router-link>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      msg: 'Login Page'
    }
  }
}
</script>

<style>
    @import "Login.scss"
</style>
