<template>
  <div class="login">
    <div class="loginWrapper">
      <button class="google" @click="loginFunc">Google로 로그인</button><br>
      <!-- <button @click="loginFunc">Facebook으로 로그인</button> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
    }
  },
  methods: {
    loginTry () {
      console.log('로그인 시도');
      this.$http.post(`/login`, {
      }).then((result => {
          console.log('로그인')
        }))
        .catch(error => {
          alert('오류가 발생했습니다.')
        })
    },
    loginFunc () {
      this.$emit('login', true);
    }
  }
}
</script>

<style>
  @import "Login.scss"
</style>
