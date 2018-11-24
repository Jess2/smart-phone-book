<template>
  <div class="favorite">
    <div class="favoriteHeader">
      <span class="title">즐겨찾기</span>
      <span class="save">
        <router-link to="/list">완료</router-link>
      </span>
    </div>

    <div class="favoriteBody">
      <div class="search">
        <i class="fa fa-search"></i>
        <input type="text" placeholder="검색" v-model="searchContent" @keyup="inputKeyup" id="searchId">
      </div>

      <div class="listBody">
      <ul v-for="contact in favoriteFilteredList">
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
  import ContactData from '../../utilities/contact.json'

  export default {
    name: 'Favorite',
    data () {
      return {
        contactData: ContactData,
        openDetail: false,
        selectedUserId: 0,
        searchContent: "",
      }
    },
    computed: {
      favoriteFilteredList () {
        return this.contactData.filter(item => {
          return item.name.toUpperCase().includes(this.searchContent.toUpperCase());
        })
        return this.contactData;
      },
    },
    methods: {
      openDetailFunc (userId) {
        this.openDetail = true;
        this.selectedUserId = userId;
        console.log(this.selectedUserId)
      },
      inputKeyup () {
        this.searchContent = $('#searchId').val();
      },
    },
    components: {
      DetailComponent
    },
  }
</script>

<style lang="scss">
    @import "Favorite.scss"
</style>
