<template>
  <el-card :body-style="{ padding: '0px' }" class="m-hover card">
    <div slot="header">
      <i class="el-icon-star-on"></i>tags
    </div>
    <div class="tags">
      <el-tag v-for="tag in tags" :key="tag.id" class="tag" size="small" effect="dark" :color="colors[Math.round(Math.random() * 12)]" @click="getBlogListByTagId(tag.title)">
        {{ tag.title }}
      </el-tag>
    </div>
  </el-card>
</template>
<script>
export default {
  name: 'tag-card',

  props: {
    tags: Array
  },
  data() {
    return {
      colors: ["rgb(219,40,40)", "rgb(242,98,2)", "rgb(251,189,8)", "rgb(181,204,24)", "rgb(33,186,69)", "rgb(0,181,173)", "rgb(33,133,208)", "rgb(100,53,201)", "rgb(163,51,200)", "rgb(224,57,151)", "rgb(158,97,57)", "rgb(122,122,122)", "rgb(27,28,29)"]
    }
  },
  methods: {
    getBlogListByTagId(title) {
      return this.$router.push({
          name: 'search',
          params: {'mode': 'tag', 'query': title, 'page': 1}
      })
    }
  }
}
</script>
<style scoped>
@import "../style/m.css";
.card {
  border-top: 2px solid rgb(33,133,208) !important;
}
.tags {
  padding: 25px 20px;
}
.el-tag {
  border: 0;
}
.tags .tag{
  margin: 5px 5px;
  opacity: 0.8;
  cursor: pointer;
}
.tags .tag:hover{
  opacity: 1;
}
</style>