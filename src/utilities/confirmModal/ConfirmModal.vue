<template>
  <div class="confirmModal" v-if="show">
    <div class="popUpGridWrapepr">
      <div class="title">
        <span><b>"{{tagName}}"</b> {{content.title}}</span>
      </div>

      <!-- 태그 삭제 -->
      <div class="buttons" v-if="content.type === 1">
        <!-- 취소 -->
        <button class="btn btn-secondary" @click="$emit('close')">{{ content.button1 }}</button>
        <!-- 삭제하기 -->
        <button class="btn btn-danger" @click="deleteTag">{{ content.button2 }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'confirmModal',
  props: ['show', 'content', 'tagName'],
  data () {
    return {
      msg: 'confirmModal Page',
    }
  },
  mounted () {

  },
  methods: {
    deleteTag () {
      this.$emit('onDelete', true);
      this.$emit('close');
    }
    
  }
}
</script>

<style lang="scss">
    @import "ConfirmModal.scss"
</style>
