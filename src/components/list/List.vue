<template>
  <div class="list">
    <div class="listHeader">
      <div class="headerTop">
      <span class="tagSpan">
        <router-link to="/tag">
          태그
        </router-link>
      </span>
      <span class="tagSpan">
        <router-link to="/favorite">
          즐겨찾기
        </router-link>
      </span>
      <span class="rightIcon">
        <b-dropdown right class="dropdown">
          <b-dropdown-item>
            <router-link :to="'/create'">연락처 추가</router-link>
          </b-dropdown-item>
          <b-dropdown-item>명함 추가</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item>연락처 가져오기</b-dropdown-item>
          <b-dropdown-item>연락처 내보내기</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item>마이페이지</b-dropdown-item>
          <b-dropdown-item @click="loginFunc">로그아웃</b-dropdown-item>
        </b-dropdown>
      </span>
      </div>
      <h2>{{ title }}</h2>
      <div class="search">
        <i class="fa fa-search"></i>
        <input type="text" placeholder="검색">
      </div>
    </div>

    <div class="listBody">
      <ul :class="{ favorites: contact.favorite == 1 }" v-for="contact in contactData">
        <li  v-if="contact.id != contact.user_id" @click="openDetailFunc(contact.id)">
          {{ contact.name }}<i class="fa fa-star" v-if="contact.favorite == 1"></i>
        </li>
      </ul>
    </div>

    <detail-component :show="openDetail" :userId="selectedUserId" :root="'list'" @close="openDetail = false"></detail-component>
  </div>
</template>

<script>
import DetailComponent from '../detail/Detail'
import ContactData from '../../utilities/contact.json'

export default {
  name: 'List',
  data () {
    return {
      title: '연락처',
      openDetail: false,
      contactData: ContactData,
      selectedUserId: 0,
    }
  },
  mounted () {
    console.log('contactData', this.contactData);
  },
  methods: {
    loginFunc () {
      this.$emit('login', false);
    },
    openDetailFunc (userId) {
      this.openDetail = true;
      this.selectedUserId = userId;
      console.log(this.selectedUserId)
    }
  },
  components: {
    DetailComponent
  }
}
</script>

<style lang="scss">
    @import "List.scss"
</style>
