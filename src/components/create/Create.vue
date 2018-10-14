<template>
  <div class="create">
    <div class="createHeader">
      <span class="back">
        <router-link :to="'/list'">취소</router-link>
      </span>
      <span class="title">새로운 연락처</span>
      <span class="edit">
        <router-link :to="'/list'">완료</router-link>
      </span>
    </div>

    <div class="createBody">
      <div class="addPhoto">
          <i class="fa fa-user-circle"></i>
          <button>사진<br/>추가</button>
      </div>

      <div class="addName">
        <input type="text" placeholder="이름">

        <div class="star">
          <i v-if="!onStar" @click="onStar = true" class="fa fa-star-o"></i>
          <i v-if="onStar" @click="onStar = false" class="fa fa-star"></i>
        </div>
      </div>

      <div class="addDetail">
        <!-- 전화번호 -->
        <div class="addDetailList add" v-for="(phone, index) in phoneArray" :key="phone.id">
          <div class="leftSection">
            <i class="fa fa-minus-circle" @click="subPhone(index)"></i>
            <span class="sort">{{ phone.sort }}</span>
            <span class="rightIcon">
              <b-dropdown right class="dropdown">
                <b-dropdown-item @click="phone.sort = '휴대전화'">휴대전화</b-dropdown-item>
                <b-dropdown-item @click="phone.sort = '집'">집</b-dropdown-item>
                <b-dropdown-item @click="phone.sort = '직장'">직장</b-dropdown-item>
                <b-dropdown-item @click="phone.sort = '기타'">기타</b-dropdown-item>
              </b-dropdown>
            </span>
          </div>
          <input type="text" placeholder="전화" v-model="phone.number">
        </div>

        <div class="addDetailList addTitle">
          <i class="fa fa-plus-circle" @click="addPhone"></i>
          <span>전화번호 추가</span>
        </div>

        <!-- 이메일 -->
        <div class="addDetailList add" v-for="(email, index) in emailArray" :key="email.id">
          <div class="leftSection">
            <i class="fa fa-minus-circle" @click="subEmail(index)"></i>
            <span class="sort">{{ email.sort }}</span>
            <span class="rightIcon">
              <b-dropdown right class="dropdown">
                <b-dropdown-item @click="email.sort = '개인'">개인</b-dropdown-item>
                <b-dropdown-item @click="email.sort = '직장'">직장</b-dropdown-item>
                <b-dropdown-item @click="email.sort = '기타'">기타</b-dropdown-item>
              </b-dropdown>
            </span>
          </div>
          <input type="text" placeholder="이메일" v-model="email.number">
        </div>

        <div class="addDetailList addTitle">
          <i class="fa fa-plus-circle" @click="addEmail"></i>
          <span>이메일 추가</span>
        </div>

        <!-- 주소 -->
        <div class="addDetailList add" v-for="(address, index) in addressArray" :key="address.id">
          <div class="leftSection">
            <i class="fa fa-minus-circle" @click="subAddress(index)"></i>
            <span class="sort">{{ address.sort }}</span>
            <span class="rightIcon">
              <b-dropdown right class="dropdown">
                <b-dropdown-item @click="address.sort = '집'">집</b-dropdown-item>
                <b-dropdown-item @click="address.sort = '직장'">직장</b-dropdown-item>
                <b-dropdown-item @click="address.sort = '기타'">기타</b-dropdown-item>
              </b-dropdown>
            </span>
          </div>
          <input type="text" placeholder="주소" v-model="address.text">
        </div>

        <div class="addDetailList addTitle">
          <i class="fa fa-plus-circle" @click="addAddress"></i>
          <span>주소 추가</span>
        </div>

        <!-- 생일 -->
        <div class="addDetailList add" v-for="(date, index) in dateArray" :key="date.id">
          <div class="leftSection">
            <i class="fa fa-minus-circle" @click="subDate(index)"></i>
            <span class="sort">{{ date.sort }}</span>
            <span class="rightIcon">
              <b-dropdown right class="dropdown">
                <b-dropdown-item @click="date.sort = '생일'">생일</b-dropdown-item>
                <b-dropdown-item @click="date.sort = '기념일'">기념일</b-dropdown-item>
                <b-dropdown-item @click="date.sort = '기타'">기타</b-dropdown-item>
              </b-dropdown>
            </span>
          </div>
          <!-- <input type="text" placeholder="주소" v-model="date.text"> -->
          <date-dropdown
            min="1930"
            max="2018"
            :default="nowDate"
            v-model="selectedDate"
          >
          </date-dropdown>
        </div>

        <div class="addDetailList addTitle">
          <i class="fa fa-plus-circle" @click="addDate"></i>
          <span>생일/기념일 추가</span>
        </div>

        <!-- URL -->
        <div class="addDetailList add" v-for="(url, index) in urlArray" :key="url.id">
          <div class="leftSection">
            <i class="fa fa-minus-circle" @click="subUrl(index)"></i>
            <span class="sort">{{ url.sort }}</span>
            <span class="rightIcon">
              <b-dropdown right class="dropdown">
                <b-dropdown-item @click="url.sort = '개인'">개인</b-dropdown-item>
                <b-dropdown-item @click="url.sort = '직장'">직장</b-dropdown-item>
                <b-dropdown-item @click="url.sort = '기타'">기타</b-dropdown-item>
              </b-dropdown>
            </span>
          </div>
          <input type="text" placeholder="주소" v-model="url.text">
        </div>

        <div class="addDetailList addTitle">
          <i class="fa fa-plus-circle" @click="addUrl"></i>
          <span>URL 추가</span>
        </div>

        <!-- 메모 -->
        <div>
          <span class="memo">메모 추가</span>
          <textarea name="" id="" cols="30" rows="10" placeholder="메모"></textarea>
        </div>

        <div class="addDetailList addTitle contactDelete">이 연락처 삭제하기</div>
      </div>
    </div>
  </div>
</template>

<script>
import DateDropdown from './Dropdown.vue'

export default {
  name: 'Create',
  data () {
    return {
      onStar: false,
      phoneSort: "휴대전화",
      selectedDate: '',
      phoneArray: [],
      emailArray: [],
      addressArray: [],
      dateArray: [],
      urlArray: [],
      newPhone: {
        id: 0,
        sort: "휴대전화",
        number: ""
      },
      newEmail: {
        id: 0,
        sort: "개인",
        number: ""
      },
      newAddress: {
        id: 0,
        sort: "집",
        text: ""
      },
      newDate: {
        id: 0,
        sort: "생일",
        text: ""
      },
      newUrl: {
        id: 0,
        sort: "개인",
        text: ""
      }
    }
  },
  computed: {
    nowDate () {
      var d = new Date();
      console.log('d', d);
      d = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      return d;
    }
  },
  methods: {
    // 번호 추가
    addPhone () {
      var _newPhone = Object.assign({}, this.newPhone, {id: new Date().getTime()});
      this.phoneArray.push(_newPhone);
      console.log('phoneArray', this.phoneArray);
    },
    // 번호 삭제
    subPhone (index) {
      console.log(index);
      this.phoneArray.splice(index, 1);
    },
    // 이메일 추가
    addEmail () {
      var _newEmail = Object.assign({}, this.newEmail, {id: new Date().getTime()});
      this.emailArray.push(_newEmail);
      console.log('emailArray', this.emailArray);
    },
    // 이메일 삭제
    subEmail (index) {
      console.log(index);
      this.emailArray.splice(index, 1);
    },
    // 주소 추가
    addAddress () {
      var _newAddress = Object.assign({}, this.newAddress, {id: new Date().getTime()});
      this.addressArray.push(_newAddress);
      console.log('addressArray', this.addressArray);
    },
    // 주소 삭제
    subAddress (index) {
      console.log(index);
      this.addressArray.splice(index, 1);
    },
    // 생일 추가
    addDate () {
      var _newDate = Object.assign({}, this.newDate, {id: new Date().getTime()});
      this.dateArray.push(_newDate);
    },
    // 생일 삭제
    subDate (index) {
      this.dateArray.splice(index, 1);
    },
    // url 추가
    addUrl () {
      var _newUrl = Object.assign({}, this.newUrl, {id: new Date().getTime()});
      this.urlArray.push(_newUrl);
    },
    // url 제거
    subUrl (index) {
      this.urlArray.splice(index, 1);
    }
  },
  components: {
    DateDropdown
  },
}
</script>

<style lang="scss">
    @import "Create.scss"
</style>
