<template>
  <div class="tag" v-if="show">
    <div class="tagHeader">
      <span class="title">태그</span>
      <span class="save" @click="backFunc">완료</span>
    </div>
    <div class="tagBody">
      <ul>
        <li v-for="tag in tagData">
          <i class="fa fa-minus-circle" @click="alertDeleteTag('tagDelete', tag.id)"></i>
          {{ tag.name }}
          <i class="fa fa-edit"></i>
        </li>
        <li v-if="addTagTogle">
          <input id="tag" type="text" placeholder="태그명을 입력하세요." v-model="tagName">
          <button class="addClass" @click="addTag">추가</button>
        </li>
        <li>
          <i class="fa fa-plus-circle" @click="addTagTogleFunc"></i>
          태그 추가
        </li>
      </ul>
    </div>
    <confirm-modal :show="openConfirmModal" :content="confirmContent" @onDelete="onDelete" @close="openConfirmModal = false"></confirm-modal>
  </div>
</template>

<script>
import ConfirmModal from '../../utilities/confirmModal/ConfirmModal'
import ConfirmData from '../../utilities/confirmModal/ConfirmData.json'

export default {
  name: 'Tag',
  props: ['show'],
  data () {
    return {
      msg: 'Tag Page',
      tagData: [],
      openConfirmModal: false,
      confirmContent: {},
      deleteTagId: 0,
      tagName: '',
      addTagTogle: false
    }
  },
  mounted () {
    this.getTag();
  },
  watch: {
  },
  methods: {
    addTagTogleFunc () {
      this.tagName = '';
      this.addTagTogle = true;
    },
    backFunc () {
      this.$emit('close');
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
      if (this.tagName !== "") {
        console.log('태그 추가')
        this.$http.post(`/tags/`, {
          name: this.tagName
        }).then((result => {
            console.log('태그 생성 성공')
            this.getTag();
            this.addTagTogle = false;
          }))
          .catch(error => {
            alert('에러가 발생했습니다.')
          })
      }
    },
    alertDeleteTag (name, id) {
      this.deleteTagId = id;
      this.openConfirmModal = true;
      this.confirmContent = ConfirmData[name];
    },
    onDelete (isDelete) {
      if (isDelete) {
        this.$http.delete(`/tags/${this.deleteTagId}`, {
        }).then((result => {
          console.log('태그 삭제')

      this.getTag();
        }))
        .catch(error => {
          alert('에러가 발생했습니다.')
        })
      }
    },
  },
  components: {
    ConfirmModal
  }
}
</script>

<style lang="scss">
    @import "Tag.scss"
</style>
