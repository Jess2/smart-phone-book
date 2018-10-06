<template>
  <div class="footer">
    <div>{{ msg }}</div>
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
