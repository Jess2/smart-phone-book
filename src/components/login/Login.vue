<template>
  <div class="login">
    <div class="loginWrapper">
      <!-- <button class="google" @click="loginTry">Google로 로그인</button><br> -->
      <a href="https://soda-phonebook.ga/api/login"><button class="google">Google로 로그인</button></a>
      <!-- <button @click="loginFunc">Facebook으로 로그인</button> -->
      <!-- <button @click="loginTry">test</button> -->
      <!-- <button class="google" @click="loginFunc">Google로 로그인</button> -->
    </div>
  </div>
</template>

<script>
// window.onpopstate = function(event) {
//   console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
//     document.location.replace('https://naver.com');
//   if (document.location == "https://soda-phonebook.ga/me") {
//     console.log('hi')
//     document.location.replace('https://naver.com');
//   }
// };
export default {
  name: 'Login',
  data () {
    return {
      currentUrl: window.location.href
    }
  },
  mounted () {
    console.log(this.currentUrl, this)
  },
  watch: {
    currentUrl () {
      // console.log(this.currentUrl)
      // if (this.currentUrl === 'https://soda-phonebook.ga/api/me') {
      //   this.loginFunc();
      // }
    }
  },
  methods: {
    loginTry () {
      console.log('로그인 시도');
      this.$http.get(`/me`, {
      }).then((result => {
          console.log('로그인')
          console.log(result)
        }))
        .catch(error => {
          alert('오류가 발생했습니다.')
        })
    },
    loginFunc () {
      console.log('loginFunc')
      this.$emit('login', true);
    }
  }
}
</script>

<style>
  @import "Login.scss"
</style>
