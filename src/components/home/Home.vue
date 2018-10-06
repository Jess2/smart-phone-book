<template>
  <div class="home">
    <!-- 로그인 안되어 있는 경우 -->
    <div v-if="!isLogin">
      <login-component @login="login"></login-component>
    </div>
    
    <!-- 로그인 되어 있는 경우 -->
    <div v-if="isLogin">
      <tag-component></tag-component>
      <list-component></list-component>
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
      login (_isLogin) {
        console.log(_isLogin);
        this.isLogin = _isLogin;
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
