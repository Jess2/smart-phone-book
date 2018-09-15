<template>
  <div class="create">
    <h1>{{ msg }}</h1>

    <router-link :to="'/detail'">저장</router-link>
  </div>
</template>

<script>
export default {
  name: 'Create',
  data () {
    return {
      msg: 'Create Page'
    }
  }
}
</script>

<style>
    @import "Create.scss"
</style>
