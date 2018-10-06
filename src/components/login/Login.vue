<template>
  <div class="login">
    <h1>{{ msg }}</h1>

    <!-- <router-link :to="'/detail'">로그인</router-link> -->
    <button @click="loginFunc">로그인</button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      msg: 'Login Page'
    }
  },
  methods: {
    loginFunc () {
      this.$emit('login', true);
    }
  }
}
</script>

<style>
    @import "Login.scss"
</style>
