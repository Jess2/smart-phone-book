<template>
  <div class="tag">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Tag',
  data () {
    return {
      msg: 'Tag Page'
    }
  }
}
</script>

<style>
    @import "Tag.scss"
</style>
