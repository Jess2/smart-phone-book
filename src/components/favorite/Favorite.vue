<template>
  <div class="favorite" v-if="show">
    <div class="favoriteHeader">
      <span class="title">즐겨찾기</span>
      <span class="save" @click="backFunc"><i class="fa fa-angle-left"></i>연락처</span>
    </div>

    <div class="favoriteBody">
      <div class="listBody">
      <ul v-if="contact.type === 'FAVORITED'" v-for="contact in nameSortList">
        <li @click="openDetailFunc(contact.id)">
          {{ contact.name }}
        </li>
      </ul>
    </div>
    </div>
    <detail-component :show="openDetail" :userId="selectedUserId" :root="'favorite'" @close="openDetail = false"></detail-component>
  </div>
</template>

<script>
  import DetailComponent from '../detail/Detail'

  export default {
    name: 'Favorite',
    props: ['show'],
    data () {
      return {
        openDetail: false,
        selectedUserId: 0,
        searchContent: "",
        favoriteContacts: [],
      }
    },
    watch: {
      show () {
        window.scrollTo(0,0);
        if (this.show === true) {
          this.getFavorites();
        }
      }
    },
    computed: {
      nameSortList () {
        /* 이름순으로 정렬 */
        return this.favoriteContacts.sort((a, b) => {
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
      favoriteInputKeyup () {
        this.searchContent = $('#favoriteSearchId').val();
      },
      getFavorites () {
        this.$http.get(`/users/favorites`, {
        }).then((result => {
            this.favoriteContacts = result.data;
          }))
          .catch(error => {
            alert('오류가 발생했습니다.')
          })
      }
    },
    components: {
      DetailComponent
    },
  }
</script>

<style lang="scss">
    @import "Favorite.scss"
</style>
