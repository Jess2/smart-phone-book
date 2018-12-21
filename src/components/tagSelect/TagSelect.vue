<template>
  <div class="tagSelect" v-if="show">
    <div class="tagSelectWrapper">
      <div class="tagSelectHeader">
        <span class="title">태그</span>
        <span class="save" @click="tagSave">완료</span>
      </div>
      <div class="tagSelectBody">
        <!-- <div v-for="tag in tagNameSort"> -->
          <!-- <input type="checkbox" id="checkbox" v-model="tag.checked"> {{ tag.name }} -->
          <div class="checks etrans" v-for="tag in tagNameSort">
            <input type="checkbox" :id="`${tag.id}`" v-model="tag.checked"> 
            <label :for="`${tag.id}`">{{ tag.name }}</label> 
          </div>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TagSelect',
  props: ['show', 'tagArray'],
  data () {
    return {
      tagData: [],
      emitTagArray: [],
    }
  },
  mounted () {
    // this.getTag();
  },
  watch: {
    show () {
      window.scrollTo(0,0);
      if (this.show == true) {
        this.getTag()
      }
    }
  },
  computed: {
    tagNameSort () {
      return this.tagData.sort((a, b) => {
        return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
      });
    },
  },
  methods: {
    originTagCheck () {
      for (let i=0; i<this.tagData.length; i++) {
        this.tagData[i].checked = false;
      }
      for (let i=0; i<this.tagData.length; i++) {
        for (let j=0; j<this.tagArray.length; j++) {
          if (this.tagArray[j].id == this.tagData[i].id) {
            this.tagData[i].checked = true;
          }
        }
      }
    },
    getTag () {
      this.$http.get(`/tags/`, {
      }).then((result => {
          this.tagData = result.data;
          console.log('tag api 호출', this.tagData)
          this.originTagCheck()
        }))
        .catch(error => {
          alert('오류가 발생했습니다.')
        })
    },
    tagSave () {
      this.$emit('close');
      this.emitTagArray = [];
      for (let i=0; i<this.tagData.length; i++) {
        if (this.tagData[i].checked === true) {
          this.emitTagArray.push(this.tagData[i]);
        }
      }
      console.log('?', this.emitTagArray);
      this.$emit('editTags', this.emitTagArray);
    }
  },
  components: {
  }
}
</script>

<style lang="scss">
    @import "TagSelect.scss"
</style>
