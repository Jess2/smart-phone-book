<template>
  <div class="login">
    <div class="loginWrapper">
      <img src="../../../static/favicon.png"/>
      <span id="id_of_element_to_blink">스마트 주소록</span>
      <div>
        <!-- <a href="https://soda-phonebook.ga/api/login"> -->
          <button class="google" @click="googleLogin">
            <i class="fa fa-google"></i>
            <span>Google로 로그인</span>
          </button>
        <!-- </a> -->
      </div>
      <div>
        <button class="facebook" @click="ready">
          <i class="fa fa-facebook-square"></i>
          <span>Facebook으로 로그인</span>
        </button>
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
      session: null,
    }
  },
  mounted () {
    // document.cookie = "SESSION=Hello";
    console.log('login mounted')
    var c = document.cookie;
    console.log('cookie', c)
    var name = 'SESSION';
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    this.session = (value ? value[2] : null);
    console.log('session value', value);
    if (document.cookie) {
      console.log('session 감지')
      window.location.href = 'https://soda-phonebook.ga/#/list';
    }
  },
  methods: {
    googleLogin () {
      window.location.href = 'https://soda-phonebook.ga/api/login';
    },
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

<style lang="scss">
  @import "Login.scss"
</style>
