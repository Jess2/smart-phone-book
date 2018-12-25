<template>
  <div class="confirmModal" v-if="show">
    <div class="popUpGridWrapepr">
      <div class="title">
        <span v-if="content.type === 1 || content.type === 2"><b>"{{tagName}}"</b> {{content.title}}</span>
        <span v-if="content.type === 2"><b>"{{contactName}}"</b> {{content.title2}}</span>
        <span v-if="content.type === 3"><b>"{{contactName}}"</b> {{content.title}}</span>
        <span v-if="content.type >= 4">{{content.title}}</span>
      </div>

      <!-- 태그 삭제 -->
      <div class="buttons" v-if="content.type === 1">
        <!-- 취소 -->
        <button class="btn btn-secondary" @click="$emit('close')">{{ content.button1 }}</button>
        <!-- 삭제하기 -->
        <button class="btn btn-danger" @click="deleteTag">{{ content.button2 }}</button>
      </div>

      <!-- 태그에서 연락처 삭제 -->
      <div class="buttons" v-if="content.type === 2">
        <!-- 취소 -->
        <button class="btn btn-secondary" @click="$emit('close')">{{ content.button1 }}</button>
        <!-- 삭제하기 -->
        <button class="btn btn-danger" @click="deleteTagContact">{{ content.button2 }}</button>
      </div>

      <!-- 연락처 삭제하기 -->
      <div class="buttons" v-if="content.type === 3">
        <!-- 취소 -->
        <button class="btn btn-secondary" @click="$emit('close')">{{ content.button1 }}</button>
        <!-- 삭제하기 -->
        <button class="btn btn-danger" @click="deleteContact">{{ content.button2 }}</button>
      </div>
      
      <!-- 준비 중입니다. -->
      <div class="buttons" v-if="content.type === 4">
        <!-- 확인 -->
        <button class="btn btn-primary" @click="$emit('close')">{{ content.button1 }}</button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'confirmModal',
  props: ['show', 'content', 'tagName', 'contactName'],
  data () {
    return {
      msg: 'confirmModal Page',
    }
  },
  mounted () {
    console.log(this.contactName)
  },
  methods: {
    deleteTag () {
      this.$emit('onDelete', true);
      this.$emit('close');
    },
    deleteTagContact () {
      this.$emit('onDelete', true);
      this.$emit('close');
    },
    deleteContact () {
      this.$emit('onDelete', true);
      this.$emit('close');
    }
  }
}
</script>

<style lang="scss">
    @import "ConfirmModal.scss"
</style>
