<template>
  <div class="tagContact" v-if="show">
    <div class="tagContactHeader">
      <span class="back" @click="backFunc"><i class="fa fa-angle-left"></i>태그</span>
      <span class="title">{{ tagName }} 연락처</span>
    </div>

    <div class="tagContactBody">
      <div class="listBody">
      <ul v-for="contact in nameSortList">
        <li @click="openDetailFunc(contact.id)">
          {{ contact.name }}
        </li>
      </ul>
    </div>
    </div>
    <detail-component :show="openDetail" :userId="selectedUserId" :root="'tag'" :tagName="tagName" @close="openDetail = false"></detail-component>
  </div>
</template>

<script>
  import DetailComponent from '../detail/Detail'

  export default {
    name: 'TagContact',
    props: ['show', 'tagId', 'tagName'],
    data () {
      return {
        openDetail: false,
        selectedUserId: 0,
        searchContent: "",
        tagContacts: [],
      }
    },
    watch: {
      show () {
        if (this.show === true) {
          this.getTagContacts();
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
      backFunc () {
        this.$emit('close')
      },
      openDetailFunc (userId) {
        this.openDetail = true;
        this.selectedUserId = userId;
      },
      getTagContacts () {
        this.$http.get(`/tags/${this.tagId}`, {
        }).then((result => {
            this.tagContacts = result.data;
          }))
          .catch(error => {
            alert('에러가 발생했습니다.')
          })
      }
    },
    components: {
      DetailComponent
    },
  }
</script>

<style lang="scss">
    @import "TagContact.scss"
</style>
