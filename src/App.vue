<template>
  <div class="app">
    <router-view/>
    <footer-component></footer-component>
  </div>
</template>

<script>
import FooterComponent from './components/footer/Footer'

export default {
  name: 'App',
  data () {
    return {
      session: null,
    }
  },
  updated () {
    console.log('mounted????updated!')
    // if ( window.location == 'https://soda-phonebook.ga/#/list' ) {
      var name = 'SESSION';
      var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
      // this.session = (value ? value[2] : null);
      if (value !== null) {
        console.log('session 감지')
        // window.location.href = 'https://soda-phonebook.ga/#/list';
      }
    // }
  },
  components: {
    FooterComponent,
  }
}
</script>