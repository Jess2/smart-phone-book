<template>
  <div class="list">

    <div class="listHeader">
      <div class="headerTop">
      <span class="tagSpan">태그</span>
      <span class="rightIcon">
        <b-dropdown right class="dropdown">
          <b-dropdown-item>연락처 추가</b-dropdown-item>
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
      <ul>
        <li>고다경</li>
        <li>정소연</li>
        <li>연효경</li>
        <li>홍길동</li>
        <li>양세종</li>
        <li>공우진</li>
        <li>온정선</li>
        <li>이성훈</li>
        <li>이성준</li>
        <li>한상현</li>
        <li>도인범</li>
        <li>우서리</li>
        <li>신혜선</li>
        <li>이현수</li>
        <li>서현진</li>
        <li>유찬</li>
        <li>제니퍼</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'List',
  data () {
    return {
      title: '연락처'
    }
  },
  methods: {
    loginFunc () {
      this.$emit('login', false);
    }
  }
}
</script>

<style lang="scss">
    @import "List.scss"
</style>
