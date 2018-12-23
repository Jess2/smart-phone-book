<template>
  <div class="home">
    <!-- 로그인 안되어 있는 경우 로그인 페이지 -->
    <div v-if="!isLogin">
      <login-component @login="login"></login-component>
    </div>
    <!-- 로그인 되어 있는 경우 리스트 컴포넌트 -->
    <div v-if="isLogin">
      <!-- <tag-component></tag-component> -->

      <!-- <router-link to="/list">
        <list-component @login="login"></list-component>
      </router-link> -->
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
