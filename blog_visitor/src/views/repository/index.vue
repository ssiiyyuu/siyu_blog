<template>
  <div style="min-width: 1px; min-height: 100vh;">
    <el-card v-for="(blogMap, year) in repository" :key="year" class="m-card m-hover">
      <h3 class="title">{{year}}</h3>
      <el-timeline>
        <el-timeline-item v-for="(blogs, day) in blogMap" :key="day" :timestamp="day" placement="top" :color="`rgb(30,114,193)`">
          <el-card v-for="(blog, index) in blogs" :key="index" class="blog_item">
            <div class="title" @click="getBlog(blog.id)"><i class="el-icon-document" style="color: black;"></i>{{ blog.title }}</div>
            <p class="description">{{ blog.author }} 提交于 {{ blog.gmtCreate }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </div>
</template>
<script>
import { getRepository } from '@/api/repository';

export default {
  name: 'index',
  components: {
    getRepository
  },
  methods: {
    getRepository() {
      getRepository().then(res => {
        let data = res.data
          this.repository = data.repository
      })
    },
    getBlog(id) {
      return this.$router.push({
        name: 'blog',
        params: {'id': id}
      })
    }
  },
  data() {
    return {
      repository: {}
    }
  },
  created() {
    this.getRepository()
  }
}
</script>
<style scoped>
.m-card {
  position: relative;
  padding: 0 20px;
  max-width: 800px;
  margin: auto;
  margin-bottom: 30px;
}
.blog_item {
  margin-bottom: 10px;
}
.blog_item .title {
  font-size: 14px;
  letter-spacing: 2px;
  font-weight: bold;
  cursor: pointer;
  color: rgb(65,131,196);
}
.blog_item .title:hover{
  color: rgb(30,114,193);
}
.blog_item .description {
  font-size: 12px;
  color: #999;
}
</style>