<template>
  <div class="detail" v-if="show">
    <div class="detailHeader">
      <span v-if="root === 'list'" class="back" @click="backClick"><i class="fa fa-angle-left"></i>연락처</span>
      <span v-if="root === 'favorite'" class="back" @click="backClick"><i class="fa fa-angle-left"></i>즐겨찾기</span>
      <span class="edit"><router-link :to="'/create'">편집</router-link></span>
      
      <div class="detailHeaderMain">
        <i class="fa fa-user-circle"></i>
        <span class="name">{{selectedContact.name}}</span>
        <i v-if="selectedContact.type === 'DEFAULT'" @click="setFavorite" class="fa fa-star-o"></i>
        <i v-if="selectedContact.type === 'FAVORITED'" @click="setFavorite" class="fa fa-star"></i>
      </div>
    </div>
 
    <div class="detailBody">
      <ul>
        <li class="tag" v-if="selectedContact.tags.length !== 0">
          <span v-for="tag in selectedContact.tags">#{{tag.name}} </span>
        </li>

        <!-- 전화번호 -->
        <li v-for="digit in selectedContact.digits">
          <p>{{digit.category.name}}</p>
          <a href="tel:">{{digit.numbers.first}}-{{digit.numbers.second}}-{{digit.numbers.third}}</a>
        </li>

        <!-- 기타 정보 -->
        <li v-for="info in selectedContact.infoes">
          <!-- 카테고리 이름 -->
          <p>{{info.category.name}}</p>

          <!-- 메일 -->
          <a v-if="info.category.type === 'EMAIL'" href="mailto:">{{info.contents}}</a>

          <!-- 주소 -->
          <div v-if="info.category.type === 'ADDRESS'">
            {{info.contents}}
            <i class="fa fa-map-marker"></i>
          </div>

          <!-- 생일 -->
          <div v-if="info.category.type === 'DATE'">
            {{info.contents}}
          </div>

          <!-- 웹사이트 -->
          <a v-if="info.category.type === 'URL'" href="#" target="_blank">{{info.contents}}</a>

          <!-- 메모 -->
          <div v-if="info.category.type === 'MEMO'">
            {{info.memo}}
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
        selectedContact: {}
      }
    },
    watch: {
      show () {
        this.getContactDetail();
      }
    },
    computed: {
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
      },
      // 연락처 세부정보 가져오기
      getContactDetail () {
        console.log('userid', this.userId)
        this.$http.get(`/contacts/${this.userId}`, {
        }).then((result => {
            this.selectedContact = result.data;
            console.log('api 호출', this.selectedContact)
          }))
          .catch(error => {
            alert('에러가 발생했습니다.')
          })
      },
    },
  }
</script>

<style lang="scss">
  @import "Detail.scss"
</style>
