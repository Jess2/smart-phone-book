<template>
  <div class="detail">
    <div class="detailHeader">
      <span class="back"><router-link :to="'/list'"><i class="fa fa-angle-left"></i>연락처</router-link></span>
      <span class="edit"><router-link :to="'/create'">편집</router-link></span>
      
      <div class="detailHeaderMain">
        <i class="fa fa-user-circle"></i>
        <span class="name">고다경</span>
        <i v-if="!onStar" @click="onStar = true" class="fa fa-star-o"></i>
        <i v-if="onStar" @click="onStar = false" class="fa fa-star"></i>
      </div>
    </div>
 
    <div class="detailBody">
      <ul>
        <li class="tag">
          <span>#친구</span>
          <span>#대학교</span>
        </li>
        <li>
          <p>휴대전화</p>
          <a href="tel:010-1234-5678">010-1234-5678</a>
        </li>
        <li>
          <p>직장</p>
          <a href="tel:010-1234-5678">02-1234-5678</a>
        </li>
        <li>
          <p>직장 팩스</p>
          <a href="tel:010-1234-5678">02-1234-5678</a>
        </li>
        <li>
          <p>이메일</p>
          <a href="mailto:dakyong@gmail.com">dakyong@gmail.com</a>
        </li>
        <li>
          <p>주소</p>
          경기도 성남시 불정로 6
          <i class="fa fa-map-marker"></i>
        </li>
        <li>
          <p>생일</p>
          7월 30일
        </li>
        <li>
          <p>웹사이트</p>
          <a href="https://github.com/koda93" target="_blank">https://github.com/koda93</a>
        </li>
        <li>
          <p>메모</p>
          <div class="memo">
            안녕하세요. 메모 공간입니다. 메모메모. 안녕하세요. 메모 공간입니다. 
          </div>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
import CreateComponent from '../create/Create'
export default {
  name: 'Detail',
  data () {
    return {
      msg: 'Detail Page',
      isCreateMode: false,
      onStar: false
    }
  },
  methods: {
      openCreateComponent () {
          this.isCreateMode = true;
      }
  }
}
</script>

<style lang="scss">
    @import "Detail.scss"
</style>
