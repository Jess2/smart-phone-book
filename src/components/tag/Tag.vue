<template>
  <div class="tag" v-if="show">
    <div class="tagHeader">
      <span class="title">태그</span>
      <span class="save" @click="backFunc">완료</span>
    </div>
    <div class="tagBody">
      <ul>
        <li v-for="tag in tagData">
          <i class="fa fa-minus-circle"></i>{{ tag.name }}
        </li>
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
      msg: 'Tag Page',
      tagData: [],
    }
  },
  mounted () {
    this.getTag()
  },
  methods: {
    backFunc () {
      this.$emit('close')
    },
    getTag () {
      this.$http.get(`/tags/`, {
      }).then((result => {
          this.tagData = result.data;
          console.log('tag api 호출', this.tagData)
        }))
        .catch(error => {
          alert('에러가 발생했습니다.')
        })
    },
    addTag () {
      console.log('태그 추가')
      this.$http.post(`/tags/`, {
        addresses: this.addressArray,
        dates: this.dateArray,
        digits: this.phoneArray,
        emails: this.emailArray,
        memo: this.memoContents,
        name: this.name,
        photo: this.photoArray,
        type: this.type,
        urls: this.urlArray
      }).then((result => {
          console.log('연락처 생성 성공')
          this.$emit('close');
        }))
        .catch(error => {
          alert('에러가 발생했습니다.')
        })
    },
  }
}
</script>

<style lang="scss">
    @import "Tag.scss"
</style>
