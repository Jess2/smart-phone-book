<template>
  <div class="favorite" v-if="show">
    <div class="favoriteHeader">
      <span class="title">즐겨찾기</span>
      <span class="save" @click="backFunc">완료</span>
    </div>

    <div class="favoriteBody">
      <div class="search">
        <i class="fa fa-search"></i>
        <input type="text" placeholder="검색" v-model="searchContent" @keyup="favoriteInputKeyup" id="favoriteSearchId">
      </div>

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
        myId: 1,
      }
    },
    watch: {
      show () {
        if (this.show === true) {
          console.log('즐겨찾기 열기 성공');
          this.getFavorites();
        }
      }
    },
    computed: {
      favoriteFilteredList () {
        return this.favoriteContacts.filter(item => {
          // 검색어에 memo 내용 포함 -> 추후에 번호로 변경 예정
          // if (item.memo.includes(this.searchContent)) {
          //   return item.memo.includes(this.searchContent);
          // }
          console.log(this.searchContent, item.name);
          // 검색어에 이름 포함
          if (item.name.toUpperCase().includes(this.searchContent.toUpperCase())) {
            return item.name.toUpperCase().includes(this.searchContent.toUpperCase());
          }
        })
        return this.favoriteContacts;
      },
      nameSortList () {
        /* 이름순으로 정렬 */
        return this.favoriteFilteredList.sort((a, b) => {
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
        console.log(this.selectedUserId)
      },
      favoriteInputKeyup () {
        this.searchContent = $('#favoriteSearchId').val();
        console.log('검색어', this.searchContent)
      },
      getFavorites () {
        this.$http.get(`/users/${this.myId}/favorites`, {
        }).then((result => {
            this.favoriteContacts = result.data;
            console.log('즐겨찾기 목록', this.favoriteContacts);
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
    @import "Favorite.scss"
</style>
