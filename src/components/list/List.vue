<template>
  <div class="list">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'List',
  data () {
    return {
      msg: 'List Page'
    }
  }
}
</script>

<style>
    @import "List.scss"
</style>
