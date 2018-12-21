<template>
  <div class="create" v-if="show">
    <div class="createHeader">
      <span class="back" @click="backFunc">취소</span>
      <span class="title">새로운 연락처</span>
      <span class="edit" @click="createSave">완료</span>
    </div>
    <div class="createBody">
      <div class="addPhoto">
        <i v-if="!hasPhoto" class="fa fa-user-circle"></i>
        <button v-if="!hasPhoto" class="replace"><span>사진<br/>추가</span></button>

        <div v-show="hasPhoto" class="thumb important">
          <img id="preview" src="">
        </div>

        <div v-if="photoArray" class="thumb">
          <img :src="photoArray"/>
        </div>
        <form id="FILE_FORM" method="post" enctype="multipart/form-data" action="">
          <input type="file" name="upFile" id="upFile" @change="fileSelect" class="upload">
        </form>
      </div>
      <div class="addName">
        <input type="text" placeholder="이름" v-model="name">
        <div class="star">
          <i v-if="type === 'DEFAULT'" @click="type = 'FAVORITED'" class="fa fa-star-o"></i>
          <i v-if="type === 'FAVORITED'" @click="type = 'DEFAULT'" class="fa fa-star"></i>
        </div>
      </div>

      <div class="addDetail">
        <!-- 태그 -->
        <span class="tagSpan" v-for="(tag, index) in tagArray">#{{ tag.name }}</span>
        <div class="addDetailList addTitle">
          <i class="fa fa-plus-circle" @click="addTagButton"></i>
          <span>태그 추가/변경</span>
        </div>
        <!-- 전화번호 -->
        <div class="addDetailList add" v-for="(phone, index) in phoneArray">
          <div class="leftSection">
            <i class="fa fa-minus-circle" @click="subPhone(index)"></i>
            <span class="sort">{{ phone.category.name }}</span>
            <span class="rightIcon">
              <b-dropdown right class="dropdown">
                <b-dropdown-item @click="phone.category = { id: 1, name: '휴대전화' }">휴대전화</b-dropdown-item>
                <b-dropdown-item @click="phone.category = { id: 2, name: '집' }">집</b-dropdown-item>
                <b-dropdown-item @click="phone.category = { id: 3, name: '직장' }">직장</b-dropdown-item>
                <b-dropdown-item @click="phone.category = { id: 4, name: '팩스' }">팩스</b-dropdown-item>
                <b-dropdown-item @click="phone.category = { id: 5, name: '기타' }">기타</b-dropdown-item>
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
        <div class="addDetailList add" v-for="(email, index) in emailArray">
          <div class="leftSection">
            <i class="fa fa-minus-circle" @click="subEmail(index)"></i>
            <span class="sort">{{ email.category.name }}</span>
            <span class="rightIcon">
              <b-dropdown right class="dropdown">
                <b-dropdown-item @click="email.category = { id: 9, name: '개인' }">개인</b-dropdown-item>
                <b-dropdown-item @click="email.category = { id: 10, name: '직장' }">직장</b-dropdown-item>
                <b-dropdown-item @click="email.category = { id: 11, name: '기타' }">기타</b-dropdown-item>
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
        <div class="addDetailList add" v-for="(address, index) in addressArray">
          <div class="leftSection">
            <i class="fa fa-minus-circle" @click="subAddress(index)"></i>
            <span class="sort">{{ address.category.name }}</span>
            <span class="rightIcon">
              <b-dropdown right class="dropdown">
                <b-dropdown-item @click="address.category = { id: 15, name: '집' }">집</b-dropdown-item>
                <b-dropdown-item @click="address.category = { id: 16, name: '직장' }">직장</b-dropdown-item>
                <b-dropdown-item @click="address.category = { id: 17, name: '기타' }">기타</b-dropdown-item>
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
        <div class="addDetailList add" v-for="(date, index) in dateArray">
          <div class="leftSection">
            <i class="fa fa-minus-circle" @click="subDate(index)"></i>
            <span class="sort">{{ date.category.name }}</span>
            <span class="rightIcon">
              <b-dropdown right class="dropdown">
                <b-dropdown-item @click="date.category = { id: 12, name: '생일' }">생일</b-dropdown-item>
                <b-dropdown-item @click="date.category = { id: 13, name: '기념일' }">기념일</b-dropdown-item>
                <b-dropdown-item @click="date.category = { id: 14, name: '기타' }">기타</b-dropdown-item>
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
        <div class="addDetailList add" v-for="(url, index) in urlArray">
          <div class="leftSection">
            <i class="fa fa-minus-circle" @click="subUrl(index)"></i>
            <span class="sort">{{ url.category.name }}</span>
            <span class="rightIcon">
              <b-dropdown right class="dropdown">
                <b-dropdown-item @click="url.category = { id: 6, name: '개인' }">개인</b-dropdown-item>
                <b-dropdown-item @click="url.category = { id: 7, name: '직장' }">직장</b-dropdown-item>
                <b-dropdown-item @click="url.category = { id: 8, name: '기타' }">기타</b-dropdown-item>
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
        <!-- {{selectedContact.id}} -->
      </div>
    </div>
    <tag-select :show="openTagSelect" :tagArray="tagArray" @close="openTagSelect = false" @editTags="editTagsFunc"></tag-select>
  </div>
</template>

<script>
import DateDropdown from './Dropdown.vue'
import TagSelect from '../tagSelect/TagSelect'

export default {
  name: 'Create',
  props: ['show', 'selectedContact'],
  data () {
    return {
      hasPhoto: false,
      fileObj: "",
      pathHeader: "",
      pathMiddle: "",
      pathEnd: "",
      fileName: "",
      extName: "",
      allFilename: "",
      customData: "",
      file: "",
      fileBase64: "",
      openTagSelect: false,
      phoneArray: [],
      emailArray: [],
      addressArray: [],
      dateArray: [],
      urlArray: [],
      tagArray: [],
      memoContents: "",
      name: "",
      type: "DEFAULT", // DEFAULT, FAVORITED, ME
      photoArray: "",
      newPhone: {
        id: 0,
        number: "",
        category: { id: 1, name: "휴대전화" },
        numbers: {
          first: "",
          second: "",
          third: ""
        }
      },
      newEmail: {
        id: 0,
        category: { id: 9, name: "개인" },
        contents: ""
      },
      newAddress: {
        id: 0,
        category: { id: 15, name: "집" },
        contents: ""
      },
      newDate: {
        id: 0,
        category: { id: 12, name: "생일" },
        contents: ""
      },
      newUrl: {
        id: 0,
        category: { id: 6, name: "개인" },
        contents: ""
      }
    }
  },
  watch: {
    show () {
      window.scrollTo(0,0);
      this.name = "";
      this.phoneArray = [];
      this.emailArray = [];
      this.addressArray = [];
      this.dateArray = [];
      this.urlArray = [];
      this.memoContents = "";
      this.name = "";
      this.type = "DEFAULT"; // DEFAULT, FAVORITED, ME
      this.photoArray = "";
      this.tagArray = [];
      this.hasPhoto = false;

      if (this.show && this.selectedContact) {
        this.name = this.selectedContact.name;
        if (this.selectedContact.digits.length !== 0) {
          this.phoneArray = this.selectedContact.digits;
          for (let i=0; i<this.phoneArray.length; i++) {
            this.phoneArray[i].number = this.phoneArray[i].numbers.first + '-';
            this.phoneArray[i].number += this.phoneArray[i].numbers.second + '-';
            this.phoneArray[i].number += this.phoneArray[i].numbers.third;
          }
        }
        if (this.selectedContact.infoes.length !== 0) {
          for (let i=0; i<this.selectedContact.infoes.length; i++) {
            if (this.selectedContact.infoes[i].category.type === 'EMAIL') {
              this.emailArray.push(this.selectedContact.infoes[i]);
            }
            if (this.selectedContact.infoes[i].category.type === 'ADDRESS') {
              this.addressArray.push(this.selectedContact.infoes[i]);
            }
            if (this.selectedContact.infoes[i].category.type === 'DATE') {
              this.dateArray.push(this.selectedContact.infoes[i]);
              console.log(this.dateArray)
            }
            if (this.selectedContact.infoes[i].category.type === 'URL') {
              this.urlArray.push(this.selectedContact.infoes[i]);
            }
          }
        }
        if (this.selectedContact.memo) this.memoContents = this.selectedContact.memo;
        this.type = this.selectedContact.type;
        if (this.selectedContact.tags.length !== 0) {
          this.tagArray = this.selectedContact.tags;
        }
        if (this.selectedContact.photoPath) {
          this.photoArray = this.selectedContact.photoPath;
        }
      }
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
    fileSelect () {
      this.fileObj = document.getElementById("upFile").value;
      this.pathHeader = this.fileObj.lastIndexOf("\\");
      this.pathMiddle = this.fileObj.lastIndexOf(".");
      this.pathEnd = this.fileObj.length;
      // 영문, 숫자, _만 허용
      this.fileName = this.fileObj.substring(this.pathHeader+1, this.pathMiddle).replace(/[^a-zA-Z0-9_]/g, '');
      this.extName = this.fileObj.substring(this.pathMiddle+1, this.pathEnd);

      // 파일형식 제한
      if (this.extName.toUpperCase() != 'PNG' && this.extName.toUpperCase() != 'JPG') {
        alert('지원하지 않는 파일형식입니다.');
        this.initialize();
      } else {
        // 파일명 20자 제한
        if (this.fileName.length > 20) {
          this.fileName = this.fileName.substring(0, 20);
        }

        this.allFilename = this.fileName+"."+this.extName;
        this.file = document.getElementById('upFile').files[0];

        var fileSize = this.file.size / 1024 / 1024;

        // 용량 제한
        if (fileSize > 3) {
          alert('파일 용량은 3MB를 넘지 않아야합니다.');
          this.initialize();
        } else {
          var reader = new FileReader();
          reader.readAsDataURL(this.file);

          var currentThis = this;
          //로드 한 후
          reader.onload = function  () {
            document.querySelector('#preview').src = reader.result;
            currentThis.fileBase64 = reader.result.split(',')[1];
            currentThis.hasPhoto = true;
            console.log('photo upload')
          };
        }
      }
    },
    initialize () {
      this.file = "";
      document.getElementById("upFile").value = ""
      document.querySelector('#preview').src = "";
      this.hasPhoto = false;
    },
    editTagsFunc (updatedTagArray) {
      this.tagArray = updatedTagArray;
      console.log('tagtagtag=====', this.tagArray)
    },
    addTagButton () {
      this.openTagSelect = true;
    },
    phoneNumberChange () {
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
        if (!this.selectedContact) {
          this.$http.post(`/contacts`, {
            addresses: this.addressArray,
            dates: this.dateArray,
            digits: this.phoneArray,
            emails: this.emailArray,
            memo: this.memoContents,
            name: this.name,
            photo: this.fileBase64,
            type: this.type,
            urls: this.urlArray,
            tags: this.tagArray
          }).then((result => {
              console.log('연락처 생성 성공')
              console.log('tag', this.tagArray)
              this.$emit('close');
              this.initialize();
            }))
            .catch(error => {
              alert('에러가 발생했습니다.')
              this.initialize();
            })
        } else {
          this.$http.put(`/contacts/${this.selectedContact.id}`, {
            id: this.selectedContact.id,
            addresses: this.addressArray,
            dates: this.dateArray,
            digits: this.phoneArray,
            emails: this.emailArray,
            memo: this.memoContents,
            name: this.name,
            photo: this.fileBase64,
            type: this.type,
            urls: this.urlArray,
            tags: this.tagArray
          }).then((result => {
              console.log('연락처 수정 성공')
              console.log('tag==========', this.tagArray)
              this.$emit('close');
              this.initialize();
            }))
            .catch(error => {
              alert('에러가 발생했습니다.')
              this.initialize();
            })
        }
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
    DateDropdown,
    TagSelect
  },
}
</script>

<style lang="scss">
    @import "Create.scss"
</style>
