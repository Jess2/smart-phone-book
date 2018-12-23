<template>
  <div class="create" v-if="show">
    <div class="createHeader">
      <span class="back" @click="backFunc">취소</span>
      <span v-if="mode !== 'edit'" class="title">새로운 연락처</span>
      <span v-if="mode === 'edit'" class="title">연락처 편집</span>
      <span class="edit" @click="createSave">완료</span>
    </div>
    <div class="createBody">
      <div class="addPhoto">
        <i v-if="!hasPhoto" class="fa fa-user-circle"></i>
        <button v-if="!hasPhoto" class="replace"><span>사진<br/>추가</span></button>

        <i v-if="hasPhoto" class="fa fa-minus-circle" @click="deletePhoto"></i>
        <div v-show="hasPhoto" class="thumb important">
          <img id="preview" src="">
        </div>

        <i v-if="photoArray.length > 0" class="fa fa-minus-circle" @click="deletePhotoArray"></i>
        <div v-if="photoArray.length > 0" class="thumb">
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
                <b-dropdown-item v-for="category in digitCategories" :key="category.id" @click="setCategory(phone, category.id, category.name)">{{category.name}}</b-dropdown-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item @click="addCategory('전화번호')" class="editCategory">
                  <i class="fa fa-plus"></i>&nbsp;&nbsp;카테고리 편집
                </b-dropdown-item>
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
                <b-dropdown-item v-for="category in emailCategories" :key="category.id" @click="setCategory(email, category.id, category.name)">{{category.name}}</b-dropdown-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item @click="addCategory('이메일')" class="editCategory">
                  <i class="fa fa-plus"></i>&nbsp;&nbsp;카테고리 편집
                </b-dropdown-item>
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
                <b-dropdown-item v-for="category in addressCategories" :key="category.id" @click="setCategory(address, category.id, category.name)">{{category.name}}</b-dropdown-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item @click="addCategory('주소')" class="editCategory">
                  <i class="fa fa-plus"></i>&nbsp;&nbsp;카테고리 편집
                </b-dropdown-item>
              </b-dropdown>
            </span>
          </div>
          <input type="text" placeholder="주소" v-model="address.contents">
        </div>

        <div class="addDetailList addTitle">
          <i class="fa fa-plus-circle" @click="addAddress"></i>
          <span>주소 추가</span>
        </div>

        <!-- 기념일 -->
        <div class="addDetailList add" v-for="(date, index) in dateArray">
          <div class="leftSection">
            <i class="fa fa-minus-circle" @click="subDate(index)"></i>
            <span class="sort">{{ date.category.name }}</span>
            <span class="rightIcon">
              <b-dropdown right class="dropdown">
                <b-dropdown-item v-for="category in dateCategories" :key="category.id" @click="setCategory(date, category.id, category.name)">{{category.name}}</b-dropdown-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item @click="addCategory('기념일')" class="editCategory">
                  <i class="fa fa-plus"></i>&nbsp;&nbsp;카테고리 편집
                </b-dropdown-item>
              </b-dropdown>
            </span>
          </div>
          <date-dropdown
            min="1930"
            max="2018"
            :default="date.contents"
            v-model="date.contents"
          >
          </date-dropdown>
        </div>

        <div class="addDetailList addTitle">
          <i class="fa fa-plus-circle" @click="addDate"></i>
          <span>기념일 추가</span>
        </div>

        <!-- URL -->
        <div class="addDetailList add" v-for="(url, index) in urlArray">
          <div class="leftSection">
            <i class="fa fa-minus-circle" @click="subUrl(index)"></i>
            <span class="sort">{{ url.category.name }}</span>
            <span class="rightIcon">
              <b-dropdown right class="dropdown">
                <b-dropdown-item v-for="category in urlCategories" :key="category.id" @click="setCategory(url, category.id, category.name)">{{category.name}}</b-dropdown-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item @click="addCategory('URL')" class="editCategory">
                  <i class="fa fa-plus"></i>&nbsp;&nbsp;카테고리 편집
                </b-dropdown-item>
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
    <tag-select :show="openTagSelect" :tagArray="tagArray" @close="openTagSelect = false" @editTags="editTagsFunc"></tag-select>
    <add-category :show="showAddCategory" :categoryName="categoryName" @close="showAddCategory = false"></add-category>
  </div>
</template>

<script>
import DateDropdown from './Dropdown.vue'
import TagSelect from '../tagSelect/TagSelect'
import AddCategory from '../addCategory/AddCategory'

export default {
  name: 'Create',
  props: ['show', 'selectedContact', 'mode'],
  data () {
    return {
      digitCategories: [],
      emailCategories: [],
      addressCategories: [],
      dateCategories: [],
      urlCategories: [],
      showAddCategory: false,
      categoryName: "",
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
        // id: 0,
        number: "",
        category: { id: 1, name: "휴대전화" },
        numbers: {
          first: "",
          second: "",
          third: ""
        }
      },
      newEmail: {
        // id: 0,
        category: { id: 9, name: "개인" },
        contents: ""
      },
      newAddress: {
        // id: 0,
        category: { id: 15, name: "집" },
        contents: ""
      },
      newDate: {
        // id: 0,
        category: { id: 12, name: "생일" },
        contents: ""
      },
      newUrl: {
        // id: 0,
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

      if (this.show) {
        this.getCategory('DIGIT');
        this.getCategory('EMAIL');
        this.getCategory('ADDRESS');
        this.getCategory('DATE');
        this.getCategory('URL');
      }
      if (this.show && this.selectedContact) {
        this.name = this.selectedContact.name;
        if (this.selectedContact.digits.length !== 0) {
          this.phoneArray = this.selectedContact.digits;
          for (let i=0; i<this.phoneArray.length; i++) {
            if (this.phoneArray[i].numbers.third !== null) {
              this.phoneArray[i].number = this.phoneArray[i].numbers.first + '-';
              this.phoneArray[i].number += this.phoneArray[i].numbers.second + '-';
              this.phoneArray[i].number += this.phoneArray[i].numbers.third;
            } else if (this.phoneArray[i].numbers.third === null && this.phoneArray[i].numbers.second !== null) {
              this.phoneArray[i].number = this.phoneArray[i].numbers.first + '-';
              this.phoneArray[i].number += this.phoneArray[i].numbers.second
            } else if (this.phoneArray[i].numbers.second === null) {
              this.phoneArray[i].number = this.phoneArray[i].numbers.first
            }
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
    },
    showAddCategory () {
      this.getCategory('DIGIT');
      this.getCategory('EMAIL');
      this.getCategory('ADDRESS');
      this.getCategory('DATE');
      this.getCategory('URL');
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
    deletePhotoArray () {
      this.photoArray = [];
    },
    deletePhoto () {
      console.log('deletePhoto');
      this.initialize();
    },
    setCategory (object, _categoryId, _categoryName) {
      object.category = {
        id: _categoryId,
        name: _categoryName
      }
    },
    getCategory (_categoryName) {
      // this.setCategoryType();
      this.$http.get(`/categories/${_categoryName}`, {
      }).then((result => {
          if (_categoryName === 'DIGIT') {
            this.digitCategories = result.data;
          } else if (_categoryName === 'EMAIL') {
            this.emailCategories = result.data;
          } else if (_categoryName === 'ADDRESS') {
            this.addressCategories = result.data;
          } else if (_categoryName === 'DATE') {
            this.dateCategories = result.data;
          } else if (_categoryName === 'URL') {
            this.urlCategories = result.data;
          }
          console.log('category----------------------', result.data);
        }))
        .catch(error => {
          alert('오류가 발생했습니다.')
        })
    },
    addCategory(_categoryName) {
      this.showAddCategory = true;
      this.categoryName = _categoryName;
    },
    fileSelect () {
      this.fileObj = document.getElementById("upFile").value;
      this.pathHeader = this.fileObj.lastIndexOf("\\");
      this.pathMiddle = this.fileObj.lastIndexOf(".");
      this.pathEnd = this.fileObj.length;
      // 영문, 숫자, _만 허용
      this.fileName = this.fileObj.substring(this.pathHeader+1, this.pathMiddle).replace(/[^a-zA-Z0-9_]/g, '');
      this.extName = this.fileObj.substring(this.pathMiddle+1, this.pathEnd);

      // 파일형식 제한
      if (this.extName.toUpperCase() != 'PNG' && this.extName.toUpperCase() != 'JPG' && this.extName.toUpperCase() != 'JPEG') {
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
      this.fileBase64 = "";
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
          delete this.phoneArray[i].number;
        }
      }
      if (this.tagArray.length > 0) {
        for (let i=0; i<this.tagArray.length; i++) {
          delete this.tagArray[i].checked;
        }
      }
      if (this.name !== "" && this.name.length <= 10) {
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
              this.$emit('close');
              this.initialize();
              console.log('ddddddddd', this.name.length)
            }))
            .catch(error => {
              alert('오류가 발생했습니다.')
              this.initialize();
              console.log(this.tagArray);
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
              this.$emit('close');
              this.initialize();
              console.log('phtoo', this.photoArray)
            }))
            .catch(error => {
              alert('오류가 발생했습니다.')
              this.initialize();
            })
        }
      } else if (this.name === "") {
        alert('이름을 입력해주세요.')
      } else if (this.name.length > 10) {
        alert('이름 길이는 10 글자를 초과할 수 없습니다.')
      }
    },
    // 번호 추가
    addPhone () {
      var _newPhone = Object.assign({}, this.newPhone);
      // var _newPhone = Object.assign({}, this.newPhone, {id: new Date().getTime()});
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
      var _newEmail = Object.assign({}, this.newEmail);
      // var _newEmail = Object.assign({}, this.newEmail, {id: new Date().getTime()});
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
      var _newAddress = Object.assign({}, this.newAddress);
      // var _newAddress = Object.assign({}, this.newAddress, {id: new Date().getTime()});
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
      var _newDate = Object.assign({}, this.newDate);
      // var _newDate = Object.assign({}, this.newDate, {id: new Date().getTime()});
      this.dateArray.push(_newDate);
      console.log(this.dateArray)
    },
    // 생일 삭제
    subDate (index) {
      this.dateArray.splice(index, 1);
    },
    // url 추가
    addUrl () {
      var _newUrl = Object.assign({}, this.newUrl);
      // var _newUrl = Object.assign({}, this.newUrl, {id: new Date().getTime()});
      this.urlArray.push(_newUrl);
    },
    // url 제거
    subUrl (index) {
      this.urlArray.splice(index, 1);
    }
  },
  components: {
    DateDropdown,
    TagSelect,
    AddCategory,
  },
}
</script>

<style lang="scss">
    @import "Create.scss"
</style>
