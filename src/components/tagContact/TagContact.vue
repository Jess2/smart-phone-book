<template>
  <div class="tagContact" v-if="show">
    <div class="tagContactHeader">
      <span v-if="root !== 'detail'" class="back" @click="backFunc"><i class="fa fa-angle-left"></i>태그</span>
      <span v-if="root === 'detail'" class="back" @click="backFunc"><i class="fa fa-angle-left"></i>{{detailName}}</span>
      <!-- <span v-if="root === 'detail'" class="back" @click="backFunc"><i class="fa fa-angle-left"></i>연락처</span>
      <span v-if="root === 'tag'" class="back" @click="backFunc"><i class="fa fa-angle-left"></i>태그</span> -->
      <span class="title">{{ tagName }} 연락처</span>
      <span v-if="!editMode" class="edit" @click="editMode = true">편집</span>
      <span v-if="editMode" class="edit" @click="editTagSave">완료</span>
    </div>

    <div class="tagContactBody">
      <div class="listBody">
      <ul v-for="contact in nameSortList">
        <!-- 일반모드 -->
        <li v-if="!editMode" @click="openDetailFunc(contact.id)">
          {{ contact.name }}
        </li>
        <!-- 편집모드 -->
        <li v-if="editMode">
          <i class="fa fa-minus-circle" @click="deleteTagContact(contact.name, contact.id, tagId, tagName)"></i>
          {{ contact.name }}
        </li>
      </ul>
    </div>
    </div>
    <detail-component :show="openDetail" :userId="selectedUserId" :root="'tag'" :tagName="tagName" @close="openDetail = false"></detail-component>
    <confirm-modal :show="openConfirmModal" :content="confirmContent" :contactName="deleteContactName" :tagName="deleteTagName" @onDelete="onDelete" @close="openConfirmModal = false"></confirm-modal>
  </div>
</template>

<script>
  // import DetailComponent from '../detail/Detail'
  import ConfirmModal from '../../utilities/confirmModal/ConfirmModal'
  import ConfirmData from '../../utilities/confirmModal/ConfirmData.json'

  export default {
    name: 'TagContact',
    props: ['show', 'tagId', 'tagName', 'root', 'detailName', 'detailId'],
    data () {
      return {
        openDetail: false,
        selectedUserId: 0,
        searchContent: "",
        tagContacts: [],
        editMode: false,
        openConfirmModal: false,
        confirmContent: {},
        deleteContactId: 0,
        deleteTagId: 0,
        deleteTagName: '',
        deleteContactName: '',
      }
    },
    watch: {
      show () {
        this.editMode = false;
        window.scrollTo(0,0);
        if (this.show === true) {
          console.log('tagContact show')
          this.getTagContacts();
        }
        if (this.show === false) {
          console.log('tagContact show false')
          this.tagContacts = [];
        }
      }
    },
    computed: {
      nameSortList () {
        /* 이름순으로 정렬 */
        return this.tagContacts.sort((a, b) => {
          return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
        });
      },
    },
    methods: {
      // alertDeleteTag (name, id, tagName) {
      //   this.deleteTagId = id;
      //   this.deleteTagName = tagName;
      //   this.openConfirmModal = true;
      //   this.confirmContent = ConfirmData[name];
      // },
      deleteTagContact (_contactName, _contactId, _tagId, _tagName) {
        this.openConfirmModal = true;
        this.confirmContent = ConfirmData['tagContactDelete'];
        this.deleteContactId = _contactId;
        this.deleteContactName = _contactName;
        this.deleteTagId = _tagId;
        this.deleteTagName = _tagName;
      },
      onDelete (isDelete) {
        this.$http.delete(`/contacts/${this.deleteContactId}/tags/${this.deleteTagId}`, {
          }).then((result => {
            console.log('해당 태그에서 해당 연락처 삭제 성공')
            this.getTagContacts();
          }))
          .catch(error => {
            alert('오류가 발생했습니다.')
          })
      },
      backFunc () {
        this.$emit('close')
      },
      openDetailFunc (userId) {
        if (this.detailId !== userId) {
          this.openDetail = true;
          this.selectedUserId = userId;
        } else {
          this.backFunc();
        }
      },
      getTagContacts () {
        this.$http.get(`/tags/${this.tagId}`, {
        }).then((result => {
            this.tagContacts = result.data;
          }))
          .catch(error => {
            alert('오류가 발생했습니다.')
          })
      },
      editTagSave () {
        this.editMode = false;
        console.log('편집 완료')
      }
    },
    components: {
      DetailComponent : () => import ('../detail/Detail.vue'),
      ConfirmModal
    },
  }
</script>

<style lang="scss">
    @import "TagContact.scss"
</style>
