<template>
  <div class="detail" v-if="show">
    <div class="detailHeader">
      <span v-if="root === 'list'" class="back" @click="backClick"><i class="fa fa-angle-left"></i>연락처</span>
      <span v-if="root === 'favorite'" class="back" @click="backClick"><i class="fa fa-angle-left"></i>즐겨찾기</span>
      <span class="edit"><router-link :to="'/create'">편집</router-link></span>
      
      <div class="detailHeaderMain">
        <i class="fa fa-user-circle"></i>
        <span class="name">{{selectedContact.name}}</span>
        <i v-if="selectedContact.favorite === 0" @click="setFavorite" class="fa fa-star-o"></i>
        <i v-if="selectedContact.favorite === 1" @click="setFavorite" class="fa fa-star"></i>
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
          <a href="tel:010-1234-5678">{{selectedContact.favorite}}</a>
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
            {{selectedContact.memo}}
          </div>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
  import CreateComponent from '../create/Create'
  import ContactData from '../../utilities/contact.json'

  export default {
    name: 'Detail',
    props: ['show', 'userId', 'root'],
    data () {
      return {
        msg: 'Detail Page',
        isCreateMode: false,
      }
    },
    methods: {
      openCreateComponent () {
        this.isCreateMode = true;
      },
      backClick () {
        console.log('back')
        this.$emit('close');
      },
      setFavorite () {
        console.log('setFavorite')
      }
    },
    computed: {
      selectedContact () {
        if (this.show) {
          for (let i=0; i<ContactData.length; i++) {
            if (ContactData[i].id === this.userId) {
              console.log(ContactData[i])
              return ContactData[i];
            }
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "Detail.scss"
</style>
