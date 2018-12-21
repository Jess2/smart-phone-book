<template>
  <div class="detail" v-if="show">
    <div class="detailHeader">
      <span v-if="root === 'tag'" class="back" @click="backClick"><i class="fa fa-angle-left"></i>{{tagName}} 연락처</span>
      <span v-if="root === 'list'" class="back" @click="backClick"><i class="fa fa-angle-left"></i>연락처</span>
      <span v-if="root === 'favorite'" class="back" @click="backClick"><i class="fa fa-angle-left"></i>즐겨찾기</span>
      <span class="edit" @click="openEditFunc">편집</span>
      
      <div class="detailHeaderMain">
        <div v-if="selectedContact.photoPath" class="thumb">
          <img :src="selectedContact.photoPath"/>
        </div>
        <i v-if="!selectedContact.photoPath" class="fa fa-user-circle"></i>
        <span class="name">{{selectedContact.name}}
        <i v-if="selectedContact.type === 'DEFAULT'" class="fa fa-star-o"></i>
        <i v-if="selectedContact.type === 'FAVORITED'" class="fa fa-star"></i>
        </span>
      </div>
    </div>
    <div class="detailBody">
      <ul>
        <li class="tagList" v-if="selectedContact.tags && selectedContact.tags.length !== 0">
          <span class="tagSpan" v-for="tag in selectedContact.tags">#{{tag.name}}</span>
        </li>

        <!-- 전화번호 -->
        <li v-for="digit in selectedContact.digits">
          <p>{{digit.category.name}}</p>
          <a href="tel:">{{digit.numbers.first}}-{{digit.numbers.second}}-{{digit.numbers.third}}</a>
        </li>

        <!-- 기타 정보 -->
        <li v-for="info in selectedContact.infoes" v-if="info.category.type === 'EMAIL'">
          <!-- 카테고리 이름 -->
          <p>{{info.category.name}} 이메일</p>

          <!-- 메일 -->
          <a :href="`mailto:${info.contents}`">{{info.contents}}</a>
        </li>

        <li v-for="info in selectedContact.infoes" v-if="info.category.type === 'ADDRESS'">
          <p>{{info.category.name}} 주소</p>
          <!-- 주소 -->
          <div>
            {{info.contents}}
            <i class="fa fa-map-marker"></i>
          </div>
        </li>

        <li v-for="info in selectedContact.infoes" v-if="info.category.type === 'DATE'">
          <p>{{info.category.name}}</p>
          <!-- 생일 -->
          <div>
            {{info.contents}}
          </div>


        <li v-for="info in selectedContact.infoes" v-if="info.category.type === 'URL'">
          <p>{{info.category.name}} URL</p>
          <!-- 웹사이트 -->
          <div v-if="info.category.type === 'URL'">
            <a v-if="info.contents.indexOf('http') !== -1" :href="`${info.contents}`" target="_blank">{{info.contents}}</a>
            <a v-if="info.contents.indexOf('http') === -1" :href="'http://' + `${info.contents}`" target="_blank">{{info.contents}}</a>
          </div>

        </li>
        <!-- 메모 -->
        <li v-if="selectedContact.memo">
          <p>메모</p>
          <div class="memoSection">{{selectedContact.memo}}</div>
        </li>
        <li v-if="selectedContact.type !== 'ME'" class="contactDelete" @click="contactDelete">이 연락처 삭제하기</li>
      </ul>
    </div>
    <create-component :show="openEdit" :selectedContact="selectedContact" @close="openEdit = false"></create-component>
    <confirm-modal :show="openConfirmModal" :content="confirmContent" @onDelete="onDelete" @close="openConfirmModal = false"></confirm-modal>
  </div>
</template>

<script>
  import CreateComponent from '../create/Create'
  import ConfirmModal from '../../utilities/confirmModal/ConfirmModal'
  import ConfirmData from '../../utilities/confirmModal/ConfirmData.json'

  export default {
    name: 'Detail',
    props: ['show', 'userId', 'root', 'tagName'],
    data () {
      return {
        msg: 'Detail Page',
        isCreateMode: false,
        selectedContact: {},
        openEdit: false,
        openConfirmModal: false,
        confirmContent: {},
      }
    },
    watch: {
      show () {
        console.log('============detail show change')
        this.selectedContact = {};
        this.getContactDetail();
      },
      openEdit () {
        console.log('sssssssss')
        this.getContactDetail();
      }
    },
    computed: {
    },
    methods: {
      openEditFunc () {
        this.openEdit = true;
        console.log('selectedContact', this.selectedContact);
      },
      openCreateComponent () {
        this.isCreateMode = true;
      },
      backClick () {
        console.log('back')
        this.$emit('close');
      },
      // 연락처 세부정보 가져오기
      getContactDetail () {
        console.log('연락처 세부 정보 가져오기')
        this.$http.get(`/contacts/${this.userId}`, {
        }).then((result => {
            this.selectedContact = result.data;
            console.log('api 호출', this.selectedContact)
          }))
          .catch(error => {
            alert('에러가 발생했습니다.')
          })
      },
      // 연락처 삭제 버튼 클릭
      contactDelete () {
        this.openConfirmModal = true;
        this.confirmContent = ConfirmData['contactDelete'];
      },
      // 연락처 삭제하기
      onDelete (isDelete) {
        this.$http.delete(`/contacts/${this.userId}`, {
        }).then((result => {
            console.log('연락처 삭제')
            this.backClick()
          }))
          .catch(error => {
            alert('에러가 발생했습니다.')
          })
      }
    },
    components: { 
      CreateComponent,
      ConfirmModal
    }
  }
</script>

<style lang="scss">
  @import "Detail.scss"
</style>
