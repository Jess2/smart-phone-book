<template>
  <div class="app">
    <router-view/>
    <footer-component></footer-component>
  </div>
</template>

<script>
import HomeComponent from './components/home/Home'
import FooterComponent from './components/footer/Footer'

export default {
  name: 'App',
  components: {
    FooterComponent,
    HomeComponent
  }
}
</script>