<template>
  <div class="detailTagContact" v-if="show">
    <div class="detailTagContactWrapper">
      <div class="detailTagContactHeader">
        <i class="fa fa-times" @click="backFunc"></i>
        <span class="title">{{tagName}} 연락처</span>
      </div>
      <div class="detailTagContactBody">
        <ul v-for="contact in nameSortList">
        <!-- 일반모드 -->
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
  name: 'DetailTagContact',
  props: ['show', 'tagId', 'tagName'],
  data () {
    return {
      tagContacts: [],
      openDetail: false,
    }
  },
  mounted () {
  },
  watch: {
    show () {
      if (this.show) {
        this.getTagContacts();
        window.scrollTo(0,0);
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
    this.$emit('close');
    },
    getTagContacts () {
    this.$http.get(`/tags/${this.tagId}`, {
    }).then((result => {
        this.tagContacts = result.data;
        }))
        .catch(error => {
        alert('에러가 발생했습니다.')
        })
    },
    openDetailFunc (userId) {
    this.openDetail = true;
    this.selectedUserId = userId;
    },
  },
  components: {
    DetailComponent,
  }
}
</script>

<style lang="scss">
    @import "DetailTagContact.scss"
</style>
