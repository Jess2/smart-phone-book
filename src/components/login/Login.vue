<template>
  <div class="login">
    <div class="loginWrapper">
      <!-- <button class="google" @click="loginTry">Google로 로그인</button><br> -->
      <div>
        <a href="https://soda-phonebook.ga/api/login"><button class="google">Google로 로그인</button></a>
      </div>
      <div>
        <button @click="ready">Facebook으로 로그인</button>
      </div>
      <!-- <router-link to="/list"><button @click="loginFunc">테스트 계정으로 로그인</button></router-link> -->
      <!-- <router-link to="/list"><button class="google">Google로 로그인</button></router-link> -->
    </div>
    <confirm-modal :show="openConfirmModal" :content="confirmContent" @close="openConfirmModal = false"></confirm-modal>
  </div>
</template>

<script>
import ConfirmModal from '../../utilities/confirmModal/ConfirmModal'
import ConfirmData from '../../utilities/confirmModal/ConfirmData.json'

export default {
  name: 'Login',
  data () {
    return {
      confirmContent: {},
      openConfirmModal: false,
    }
  },
  mounted () {
    console.log(this.currentUrl, this)
  },
  watch: {
  },
  methods: {
    ready () {
      this.openConfirmModal = true;
      this.confirmContent = ConfirmData['ready'];
    },
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
  },
  components: {
    ConfirmModal,
  }
}
</script>

<style>
  @import "Login.scss"
</style>
