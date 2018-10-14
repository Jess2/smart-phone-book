<template>
  <div class="list">
    <div class="listHeader">
      <div class="headerTop">
      <span class="tagSpan">
        <router-link to="/tag">
          태그
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
      <!-- <div class="listTitle">즐겨찾기</div> -->
      <ul class="favorites">
        <router-link to="/detail"><li>고다경<i class="fa fa-star"></i></li></router-link>
        <router-link to="/detail"><li>정소연<i class="fa fa-star"></i></li></router-link>
        <router-link to="/detail"><li>연효경<i class="fa fa-star"></i></li></router-link>
        <router-link to="/detail"><li>홍길동<i class="fa fa-star"></i></li></router-link>
        <router-link to="/detail"><li>양세종<i class="fa fa-star"></i></li></router-link>
      </ul>
      <ul class="general">
        <router-link to="/detail"><li>공우진</li></router-link>
        <router-link to="/detail"><li>온정선</li></router-link>
        <router-link to="/detail"><li>이성훈</li></router-link>
        <router-link to="/detail"><li>이성준</li></router-link>
        <router-link to="/detail"><li>한상현</li></router-link>
        <router-link to="/detail"><li>도인범</li></router-link>
        <router-link to="/detail"><li>우서리</li></router-link>
        <router-link to="/detail"><li>신혜선</li></router-link>
        <router-link to="/detail"><li>이현수</li></router-link>
        <router-link to="/detail"><li>서현진</li></router-link>
        <router-link to="/detail"><li>유찬</li></router-link>
        <router-link to="/detail"><li>제니퍼</li></router-link>
      </ul>
    </div>
    <!-- {{ openDetail }}
    <detail-component :show="openDetail"></detail-component>
    <router-link to="/detail"></router-link> -->
  </div>
</template>

<script>
import DetailComponent from '../detail/Detail'

export default {
  name: 'List',
  data () {
    return {
      title: '연락처',
      openDetail: false
    }
  },
  methods: {
    loginFunc () {
      this.$emit('login', false);
    },
    openDetailFunc () {
      this.openDetail = true;
      console.log('openDetail')
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
