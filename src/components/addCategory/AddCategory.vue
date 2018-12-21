<template>
  <div class="addCategory" v-if="show">
    <div class="addCategoryWrapper">
      <div class="addCategoryHeader">
        <span class="title">{{ categoryName }} 카테고리 편집</span>
        <span class="save" @click="backfunc">완료</span>
      </div>
      <div class="addCategoryBody">
        <ul>
          <li v-for="category in categoryArray">
            <i v-if="category.isDefault === 'N'" class="fa fa-minus-circle" @click="deleteCategory(category.id)"></i>
            {{ category.name }}
          </li>
          <li v-if="addCategoryTogle">
            <i class="fa fa-minus-circle" @click="cancelAddCategoryTogleFunc"></i>
            <input id="tag" type="text" placeholder="태그명을 입력하세요." v-model="newCategory">
            <button class="addClass" @click="addCategory">추가하기</button>
          </li>
          <li @click="addCategoryToggleFunc">
            <i class="fa fa-plus-circle"></i>카테고리 추가
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddCategory',
  props: ['show', 'categoryName'],
  data () {
    return {
      categoryType: "",
      categoryArray: [],
      addCategoryTogle: false,
      newCategory: "",
    }
  },
  mounted () {
  },
  watch: {
    show () {
      if (this.show) {
        this.getCategory();
      }
    },
    categoryName () {
      console.log('name', this.categoryName)
      this.categoryArray = [];
    }
  },
  computed: {
  },
  methods: {
    backfunc () {
      this.$emit('close');
    },
    setCategoryType () {
      if (this.categoryName === '전화번호') {
        this.categoryType = 'DIGIT'
      }
      if (this.categoryName === '이메일') {
        this.categoryType = 'EMAIL'
      }
      if (this.categoryName === '주소') {
        this.categoryType = 'ADDRESS'
      }
      if (this.categoryName === '기념일') {
        this.categoryType = 'DATE'
      }
      if (this.categoryName === 'URL') {
        this.categoryType = 'URL'
      }
    },
    getCategory () {
      this.setCategoryType();
      this.$http.get(`/categories/${this.categoryType}`, {
      }).then((result => {
          this.categoryArray = result.data;
          console.log(this.categoryArray);
        }))
        .catch(error => {
          alert('오류가 발생했습니다.')
          console.log(this.categoryType)
        })
    },
    deleteCategory (_categoryId) {
      console.log('deleteCategory')
      this.$http.delete(`/categories/${_categoryId}`, {
      }).then((result => {
          console.log(_categoryId, 'category 삭제');
          this.getCategory();
        }))
        .catch(error => {
          if (error.response.data.message === 'reference category') {
            console.log('hi')
            alert('이 카테고리를 포함하는 정보가 존재하므로 삭제할 수 없습니다.')
          } else {
            alert('오류가 발생했습니다.')
          }
        })
    },
    addCategoryToggleFunc () {
      this.addCategoryTogle = true;
    },
    cancelAddCategoryTogleFunc () {
      this.addCategoryTogle = false;
    },
    addCategory () {
      console.log('add Category')
      this.$http.post(`/categories/${this.categoryType}`, {
        name: this.newCategory,
        type: this.categoryType
      }).then((result => {
          this.categoryArray = result.data;
          this.newCategory = "";
          this.cancelAddCategoryTogleFunc();
          console.log(this.categoryArray);
          this.getCategory();
        }))
        .catch(error => {
          alert('오류가 발생했습니다.')
          console.log(this.categoryType)
        })
    }
  },
  components: {
  }
}
</script>

<style lang="scss">
    @import "AddCategory.scss"
</style>
