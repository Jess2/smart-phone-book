<template>
  <div class="login">
    <div class="loginWrapper">
      <!-- <p>{{ msg }}</p> -->
      <button class="google" @click="loginFunc">Google로 로그인</button><br>
      <button @click="loginFunc">Facebook으로 로그인</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      msg: 'Login'
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
