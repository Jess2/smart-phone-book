<template>
  <div class="home">
    <div v-if="!isLogin">
        로그인 필요합니다.
        <button @click="login">로그인</button>
        <br>
        <login-component></login-component>
    </div>
    <div v-if="isLogin">
        로그인 완료
        <button @click="login">로그아웃</button>
        <br>
        <tag-component></tag-component>
        <list-component></list-component>

        <router-view></router-view>
    </div>
  </div>
</template>

<script>
import TagComponent from '../tag/Tag'
import ListComponent from '../list/List'
import LoginComponent from '../login/Login'

export default {
  name: 'Home',
  data () {
    return {
      isLogin: false
    }
  },
  methods: {
      login () {
          console.log(this.isLogin)
          this.isLogin = !this.isLogin
          console.log(this.isLogin)
      }
  },
  components: {
    TagComponent,
    ListComponent,
    LoginComponent
  }
}
</script>

<style>
    @import "Home.scss"
</style>
