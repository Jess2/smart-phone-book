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
        <input type="text" placeholder="검색" v-model="searchContent" @keyup="inputKeyup" id="searchId">
      </div>
    </div>

    <div class="listBody">
      <ul v-if="contact.type === 'ME'" class="myContact" v-for="contact in nameSortList">
        <!-- 나 -->
        <li @click="openDetailFunc(contact.id)">
          <i class="fa fa-user-circle"></i><h5>{{ contact.name }}</h5>
        </li>
      </ul>
      <ul v-if="contact.type !== 'ME'" :class="{ favorites: contact.type === 'FAVORITED' }" v-for="contact in nameSortList" :key="contact.id">
        <!-- 사람들 연락처 -->
        <li @click="openDetailFunc(contact.id)">
          {{ contact.name }}<i class="fa fa-star" v-if="contact.type === 'FAVORITED'"></i>
        </li>
      </ul>
    </div>

    <detail-component :show="openDetail" :userId="selectedUserId" :root="'list'" @close="openDetail = false"></detail-component>
  </div>
</template>

<script>
import DetailComponent from '../detail/Detail'
// import ContactData from '../../utilities/contact.json'

export default {
  name: 'List',
  data () {
    return {
      title: '연락처',
      openDetail: false,
      contactData: [],
      selectedUserId: 0,
      searchContent: "",
    }
  },
  mounted () {
    console.log('contactData', this.contactData);
    this.getContactList();
  },
  watch: {
    openDetail () {
      this.getContactList();
      console.log('show opendetail')
    }
  },
  computed: {
    contactFilteredList () {
      return this.contactData.filter(item => {
        console.log(this.searchContent, typeof this.searchContent, item.memo, typeof item.memo)
        // 검색어에 memo 내용 포함 -> 추후에 번호로 변경 예정
        // if (item.memo.includes(this.searchContent)) {
        //   return item.memo.includes(this.searchContent);
        // }
        // 검색어에 이름 포함
        if (item.name.toUpperCase().includes(this.searchContent.toUpperCase())) {
          return item.name.toUpperCase().includes(this.searchContent.toUpperCase());
        }
      })
      return this.contactData;
    },
    nameSortList () {
      /* 이름순으로 정렬 */
      return this.contactFilteredList.sort((a, b) => {
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
      });
    },
  },
  methods: {
    loginFunc () {
      this.$emit('login', false);
    },
    openDetailFunc (userId) {
      this.openDetail = true;
      this.selectedUserId = userId;
    },
    inputKeyup () {
      this.searchContent = $('#searchId').val();
    },
    // 연락처 리스트 가져오기
    getContactList () {
      this.$http.get(`/contacts/`, {
      }).then((result => {
          this.contactData = result.data;
          console.log('api 호출', this.contactData)
        }))
        .catch(error => {
          alert('에러가 발생했습니다.')
        })
    },
  },
  components: {
    DetailComponent
  }
}
</script>

<style lang="scss">
    @import "List.scss"
</style>
