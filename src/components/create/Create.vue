<template>
  <div class="create" v-if="show">
    <div class="createHeader">
      <span class="back" @click="backFunc">취소</span>
      <span class="title">새로운 연락처</span>
      <span class="edit" @click="createSave">완료</span>
    </div>

    <div class="createBody">
      <div class="addPhoto">
          <i class="fa fa-user-circle"></i>
          <button>사진<br/>추가</button>
      </div>

      <div class="addName">
        <input type="text" placeholder="이름" v-model="name">

        <div class="star">
          <i v-if="type === 'DEFAULT'" @click="type = 'FAVORITED'" class="fa fa-star-o"></i>
          <i v-if="type === 'FAVORITED'" @click="type = 'DEFAULT'" class="fa fa-star"></i>
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
                <b-dropdown-item @click="phone.sort = '휴대전화'; phone.category = { id: 1 }">휴대전화</b-dropdown-item>
                <b-dropdown-item @click="phone.sort = '집'; phone.category = { id: 2 }">집</b-dropdown-item>
                <b-dropdown-item @click="phone.sort = '직장'; phone.category = { id: 3 }">직장</b-dropdown-item>
                <b-dropdown-item @click="phone.sort = '팩스'; phone.category = { id: 4 }">팩스</b-dropdown-item>
                <b-dropdown-item @click="phone.sort = '기타'; phone.category = { id: 5 }">기타</b-dropdown-item>
              </b-dropdown>
            </span>
          </div>
          <input id="number" type="text" placeholder="전화" v-model="phone.number" @keyup="phoneNumberChange">
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
                <b-dropdown-item @click="email.sort = '개인'; email.category = { id: 9 }">개인</b-dropdown-item>
                <b-dropdown-item @click="email.sort = '직장'; email.category = { id: 10 }">직장</b-dropdown-item>
                <b-dropdown-item @click="email.sort = '기타'; email.category = { id: 11 }">기타</b-dropdown-item>
              </b-dropdown>
            </span>
          </div>
          <input type="text" placeholder="이메일" v-model="email.contents">
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
                <b-dropdown-item @click="address.sort = '집'; address.category = { id: 15 }">집</b-dropdown-item>
                <b-dropdown-item @click="address.sort = '직장'; address.category = { id: 16}">직장</b-dropdown-item>
                <b-dropdown-item @click="address.sort = '기타'; address.category = { id: 17}">기타</b-dropdown-item>
              </b-dropdown>
            </span>
          </div>
          <input type="text" placeholder="주소" v-model="address.contents">
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
                <b-dropdown-item @click="date.sort = '생일'; date.category = { id: 12 }">생일</b-dropdown-item>
                <b-dropdown-item @click="date.sort = '기념일'; date.category = { id: 13 }">기념일</b-dropdown-item>
                <b-dropdown-item @click="date.sort = '기타'; date.category = { id: 14 }">기타</b-dropdown-item>
              </b-dropdown>
            </span>
          </div>
          <!-- <input type="text" placeholder="주소" v-model="date.text"> -->
          <date-dropdown
            min="1930"
            max="2018"
            :default="nowDate"
            v-model="date.contents"
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
                <b-dropdown-item @click="url.sort = '개인'; url.category = { id: 6 }">개인</b-dropdown-item>
                <b-dropdown-item @click="url.sort = '직장'; url.category = { id: 7 }">직장</b-dropdown-item>
                <b-dropdown-item @click="url.sort = '기타'; url.category = { id: 8 }">기타</b-dropdown-item>
              </b-dropdown>
            </span>
          </div>
          <input type="text" placeholder="URL" v-model="url.contents">
        </div>

        <div class="addDetailList addTitle">
          <i class="fa fa-plus-circle" @click="addUrl"></i>
          <span>URL 추가</span>
        </div>

        <!-- 메모 -->
        <div>
          <span class="memo">메모 추가</span>
          <textarea name="" id="" cols="30" rows="10" placeholder="메모" v-model="memoContents"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DateDropdown from './Dropdown.vue'

export default {
  name: 'Create',
  props: ['show'],
  data () {
    return {
      phoneArray: [],
      emailArray: [],
      addressArray: [],
      dateArray: [],
      urlArray: [],
      memoContents: "",
      name: "",
      type: "DEFAULT", // DEFAULT, FAVORITED, ME
      photoArray: [],
      newPhone: {
        id: 0,
        sort: "휴대전화",
        number: "",
        category: { id: 1 },
        numbers: {
          first: "",
          second: "",
          third: ""
        }
      },
      newEmail: {
        id: 0,
        sort: "개인",
        category: { id: 9 },
        contents: ""
      },
      newAddress: {
        id: 0,
        sort: "집",
        category: { id: 15 },
        contents: ""
      },
      newDate: {
        id: 0,
        sort: "생일",
        category: { id: 12 },
        contents: ""
      },
      newUrl: {
        id: 0,
        sort: "개인",
        category: { id: 6 },
        contents: ""
      }
    }
  },
  watch: {
    show () {
      this.name = "";
      this.phoneArray = [];
      this.emailArray = [];
      this.addressArray = [];
      this.dateArray = [];
      this.urlArray = [];
      this.memoContents = "";
      this.name = "";
      this.type = "DEFAULT"; // DEFAULT, FAVORITED, ME
      this.photoArray = [];
    }
  },
  computed: {
    nowDate () {
      var d = new Date();
      d = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      return d;
    }
  },
  methods: {
    phoneNumberChange () {
      // this.newPhone.numbers = {}
      // console.log($('#number').val().length)
      // $('#number').val($('#number').val().replace(/-/gi, ""));
      // if ($('#number').val().length === 8) {
      //   $('#number').val($('#number').val().slice(0,4) + "-" + $('#number').val().slice(4))
      // }
      // else if ($('#number').val().length === 9) {
      //   $('#number').val($('#number').val().slice(0,2) + "-" + $('#number').val().slice(2,5) + "-" + $('#number').val().slice(5))
      // }
      // else if ($('#number').val().length === 10) {
      //   if ($('#number').val().slice(0,2) === "02") {
      //     $('#number').val($('#number').val().slice(0,2) + "-" + $('#number').val().slice(2,6) + "-" + $('#number').val().slice(6))
      //   } else {
      //     $('#number').val($('#number').val().slice(0,3) + "-" + $('#number').val().slice(3,6) + "-" + $('#number').val().slice(6))
      //   }
      // }
      // else if ($('#number').val().length >= 11) {
      //   $('#number').val($('#number').val().slice(0,3) + "-" + $('#number').val().slice(3,7) + "-" + $('#number').val().slice(7))
      // }
      // this.$set(this.newPhone, 'numbers', {
      //   first: $('#number').val().split('-')[0],
      //   second: $('#number').val().split('-')[1],
      //   third: $('#number').val().split('-')[2]
      // })
    },
    backFunc () {
      this.$emit('close')
    },
    // 연락처 생성하기
    createSave () {
      if (this.phoneArray.length > 0) {
        for (let i=0; i<this.phoneArray.length; i++) {
          console.log(this.phoneArray[i].number)
          this.phoneArray[i].numbers = {
            first: this.phoneArray[i].number.split('-')[0],
            second: this.phoneArray[i].number.split('-')[1],
            third: this.phoneArray[i].number.split('-')[2],
          }
        }
      }
      if (this.name !== "") {
        this.$http.post(`/contacts/`, {
          addresses: this.addressArray,
          dates: this.dateArray,
          digits: this.phoneArray,
          emails: this.emailArray,
          memo: this.memoContents,
          name: this.name,
          photo: this.photoArray,
          type: this.type,
          urls: this.urlArray
        }).then((result => {
            console.log('연락처 생성 성공')
            this.$emit('close');
          }))
          .catch(error => {
            alert('에러가 발생했습니다.')
          })
      } else {
        alert('이름을 입력해주세요.')
      }
    },
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
      console.log(this.dateArray)
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
