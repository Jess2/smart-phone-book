<template>
  <div class="tag" v-if="show">
    <div class="tagHeader">
      <span class="title">태그</span>
      <span class="save" @click="backFunc">완료</span>
    </div>
    <div class="tagBody">
      <ul>
        <li><i class="fa fa-minus-circle"가족</li>
        <li>친구</li>
        <li>
          <i class="fa fa-plus-circle" @click="addTag"></i>
          태그 추가
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tag',
  props: ['show'],
  data () {
    return {
      msg: 'Tag Page'
    }
  },
  methods: {
    backFunc () {
      this.$emit('close')
    },
    addTag () {
      console.log('태그 추가')
    },
  }
}
</script>

<style lang="scss">
    @import "Tag.scss"
</style>
