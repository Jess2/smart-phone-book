<template>
  <div class="tag">
    <div class="tagHeader">
      <span class="title">태그</span>
      <span class="save">
        <router-link to="/list">완료</router-link>
      </span>
    </div>
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

<style lang="scss">
    @import "Tag.scss"
</style>
