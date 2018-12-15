<template>
  <div class="tag" v-if="show">
    <div class="tagHeader">
      <span class="title">태그</span>
      <span class="save" @click="addTag">완료</span>
    </div>
    <div class="tagBody">
      <ul>
        <li v-for="tag in tagData">
          <i class="fa fa-minus-circle" @click="alertDeleteTag('tagDelete', tag.id)"></i>{{ tag.name }}
        </li>
        <li v-if="addTagTogle">
          <input id="tag" type="text" placeholder="태그명을 입력하세요." v-model="tagName">
        </li>
        <li>
          <i class="fa fa-plus-circle" @click="addTagTogle = true"></i>
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
    show () {
      console.log('show')
      this.getTag();
      this.tagName = '';
      this.addTagTogle = false;
    }
    // openConfirmModal () {
    //   this.getTag();
    //   console.log('getTag')
    // }
  },
  methods: {
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
          }))
          .catch(error => {
            alert('에러가 발생했습니다.')
          })
      }
      this.backFunc();
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
