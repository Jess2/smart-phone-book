<template>
  <div class="tag">
    <div class="tagHeader">
      <span class="title">태그</span>
      <span class="save">
        <router-link to="/list">완료</router-link>
      </span>
    </div>
    <div class="tagBody">
      <ul>
        <li><i class="fa fa-minus-circle"가족</li>
        <li>친구</li>
        <li>
          <i class="fa fa-plus-circle" @click="addPhone"></i>
          태그 추가
        </li>
      </ul>
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
