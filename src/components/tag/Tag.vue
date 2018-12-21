<template>
  <div class="tag" v-if="show">
    <div class="tagHeader">
      <span class="title">태그</span>
      <span class="save" @click="backFunc"><i class="fa fa-angle-left"></i>연락처</span>
      <span v-if="!editMode" class="edit" @click="editMode = true">편집</span>
      <span v-if="editMode" class="edit" @click="editTagSave">완료</span>
    </div>
    <div class="tagBody">
      <ul>
        <!-- 일반모드 -->
        <li v-if="!editMode" v-for="tag in tagDataSort" @click="tagSelect(tag.id, tag.name)">
          <i class="fa fa-slack"></i>
          {{ tag.name }}
        </li>
        <!-- 편집모드 -->
        <li v-if="editMode" v-for="editTag in tagDataSort">
          <i class="fa fa-minus-circle" @click="alertDeleteTag('tagDelete', editTag.id, editTag.name)"></i>
          <input type="text" v-model="editTag.name">
        </li>
        <li v-if="editMode && addTagTogle">
          <i class="fa fa-minus-circle" @click="cancelAddTagTogleFunc"></i>
          <input id="tag" type="text" placeholder="태그명을 입력하세요." v-model="newTagName">
          <button class="addClass" @click="addTag">추가</button>
        </li>
        <li v-if="editMode">
          <i class="fa fa-plus-circle" @click="addTagTogleFunc"></i>
          태그 추가
        </li>
      </ul>
    </div>
    <tag-contact :show="openTagContact" :tagId="selectedTagId" :tagName="selectedTagName" @close="openTagContact = false"></tag-contact>
    <confirm-modal :show="openConfirmModal" :content="confirmContent" :tagName="deleteTagName" @onDelete="onDelete" @close="openConfirmModal = false"></confirm-modal>
  </div>
</template>

<script>
import TagContact from '../tagContact/TagContact'
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
      deleteTagName: '',
      newTagName: '',
      editTagData: [],
      addTagTogle: false,
      selectedTagId: 0,
      selectedTagName: '',
      openTagContact: false,
      editMode: false,
    }
  },
  mounted () {
    // this.getTag();
  },
  watch: {
    show () {
      this.editMode = false;
      this.getTag();
    }
    // tagData () {
      // // this.editTagData = this.tagData;
      // this.editTagData = this.tagData.slice();
    // }
  },
  computed: {
    tagNameSort () {
      return this.tagData.sort((a, b) => {
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
      });
    },
    editTagNameSort () {
      return this.editTagData.sort((a, b) => {
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
      });
    },
    tagDataSort () {
      return this.tagData.sort((a, b) => {
        return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
      });
    }
  },
  methods: {
    tagSelect (id, name) {
      this.selectedTagId = id;
      this.selectedTagName = name;
      this.openTagContact = true;
    },
    cancelAddTagTogleFunc () {
      this.newTagName = '';
      this.addTagTogle = false;
    },
    addTagTogleFunc () {
      this.newTagName = '';
      this.addTagTogle = true;
    },
    backFunc () {
      this.$emit('close');
    },
    getTag () {
      this.$http.get(`/tags/`, {
      }).then((result => {
          this.tagData = result.data;
          this.editTagData = this.tagData.slice();
          console.log('tag api 호출', this.tagData)
        }))
        .catch(error => {
          alert('에러가 발생했습니다.')
        })
    },
    addTag () {
      if (this.newTagName !== "") {
        console.log('태그 추가')
        this.$http.post(`/tags/`, {
          name: this.newTagName
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
    alertDeleteTag (name, id, tagName) {
      this.deleteTagId = id;
      this.deleteTagName = tagName;
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
    editTagSave () {
      this.editMode = false;
      console.log('length', this.tagData.length)
      console.log(this.tagData)
      console.log(this.editTagData)
      for (let i=0; i<this.tagData.length; i++) {
        this.$http.put(`/tags/${this.tagData[i].id}`, {
          name: this.editTagData[i].name
        }).then((result => {
          console.log('태그 수정 성공');
        }))
        .catch(error => {
          alert('에러가 발생했습니다.')
        })
      }
    },
  },
  components: {
    ConfirmModal,
    TagContact
  }
}
</script>

<style lang="scss">
    @import "Tag.scss"
</style>
