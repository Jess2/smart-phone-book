<template>
  <div class="footer">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      msg: 'Copyright 2018 SODA'
    }
  }
}
</script>

<style>
    @import "Footer.scss"
</style>
