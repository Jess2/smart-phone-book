<template>
  <div class="tagSelect" v-if="show">
    <div class="tagSelectWrapper">
      <div class="tagSelectHeader">
        <span class="title">태그</span>
      </div>
      <div class="tagSelectBody">
        <div v-for="tag in tagNameSort">
          <input type="checkbox" id="checkbox" v-model="tag.checked"> {{ tag.name }}
        </div>
      </div>
      <div class="tagSelectFooter">
        <button @click="tagSave">확인</button>
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
    }
  },
  mounted () {
    // this.getTag();
  },
  watch: {
    show () {
      if (this.show == true) {
        console.log('show')
        this.getTag()
          
        
        console.log('tagArray', this.tagArray)
      }
    }
  },
  computed: {
    tagNameSort () {
      return this.tagData.sort((a, b) => {
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
      });
    },
  },
  methods: {
    test () {
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
          this.test()
        }))
        .catch(error => {
          alert('에러가 발생했습니다.')
        })
    },
    tagSave () {
      this.$emit('close');
    }
  },
  components: {
  }
}
</script>

<style lang="scss">
    @import "TagSelect.scss"
</style>
