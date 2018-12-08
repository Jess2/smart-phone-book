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
  components: {
    FooterComponent,
  }
}
</script>