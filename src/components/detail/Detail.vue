<template>
  <div class="detail">
    <h1>{{ msg }}</h1>
    <router-link :to="'/create'">편집</router-link>
  </div>
</template>

<script>
import CreateComponent from '../create/Create'
export default {
  name: 'Detail',
  data () {
    return {
      msg: 'Detail Page',
      isCreateMode: false
    }
  },
  methods: {
      openCreateComponent () {
          this.isCreateMode = true;
      }
  }
}
</script>

<style>
    @import "Detail.scss"
</style>
