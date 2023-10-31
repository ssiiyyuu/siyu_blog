<template>
  <div style="min-width: 1px; min-height: 100vh;">
    <el-card class="m-blog m-hover">
      <el-tag class="type" effect="dark">
        {{ type.title }}
      </el-tag>
      <span class="prefix">
        <span> Post By {{author}}</span>
        &nbsp
        <i class="el-icon-alarm-clock"></i><span style="margin-left: 2px;">{{ date }}</span>    
        &nbsp
        <i class="el-icon-view"></i><span style="margin-left: 2px;">{{ view }}</span>
      </span>
      
      <el-divider></el-divider>

      <!--content-->
      <h2 class="title"> {{ title }} </h2>
      <img class="cover" :src="cover">
      <MarkdownViewer :value="content" height="520px"></MarkdownViewer>
      
      <el-divider></el-divider>

      <div class="tags">
        <el-tag class="tag" :key="tag.id" v-for="tag in tags" effect="dark" :color="colors[Math.round(Math.random() * 12)]"> {{ tag.title }} </el-tag>
      </div>

    </el-card>

    <el-card class="m-comment m-hover">
      <h4>Comment</h4>
      <el-divider></el-divider>
      <comment :blog_id="this.$route.params.id" v-if="commentable" :key="this.$route.params.id"></comment>
      <div v-if="!commentable" style="margin: 20px 0;" class="warn">
        <el-tag effect="dark" class="t" type="success">TIPS</el-tag>
        <span class="content">当前评论区已关闭</span>
      </div>
    </el-card>
    
  </div>
</template>
<script>
import { getBlogById } from '@/api/blog'
import comment from '@/components/comment.vue'
import MarkdownViewer from '@/components/markdown-viewer.vue'
import highlight from 'highlight.js'
import 'highlight.js/styles/atom-one-dark-reasonable.css'

export default {
  name: 'index',
  components: {
    comment,
    MarkdownViewer
  },
  methods: {
    highlight() {
      let blocks = document.querySelectorAll('pre code')
      blocks.forEach((block) => {
        highlight.highlightBlock(block);
      })
    },
    getBlog() {
      getBlogById(this.$route.params.id).then(res => {
        let data = res.data.blog
        this.cover = data.cover
        this.content = data.content
        this.title = data.title
        this.author = data.author
        this.date = data.gmtUpdate
        this.view = data.view
        this.commentable = data.commentable
        this.type = data.type
        this.tags = data.tags
        this.$nextTick(() => {
          this.highlight()
        })
      }).catch(err => {
        this.content = ''
        this.title = ''
        this.author = ''
        this.cover = ''
        this.date = ''
        this.view = 0
        this.commentable = false
        this.type = ''
        this.tags = []
      })
    }
  },
  data() {
    return {
      id: this.$route.params.id,
      title: '',
      author: '',
      date: '',
      view: 0,
      commentable: false,
      type: '',
      cover: '',
      tags: [],
      content: '',
      comments: [],
      colors: ["rgb(219,40,40)", "rgb(242,98,2)", "rgb(251,189,8)", "rgb(181,204,24)", "rgb(33,186,69)", "rgb(0,181,173)", "rgb(33,133,208)", "rgb(100,53,201)", "rgb(163,51,200)", "rgb(224,57,151)", "rgb(158,97,57)", "rgb(122,122,122)", "rgb(27,28,29)"],
    }
  },
  created() {
    this.getBlog()
  },
  watch: {
    $route() {
      this.getBlog()
    }
  }
}
</script>
<style lang="scss" scoped>
.m-blog {
  position: relative;
  padding: 0 20px;
  max-width: 800px;
  margin: auto;
}
.m-comment {
  padding: 0 20px;
  max-width: 800px;
  margin: 20px auto;
}
.prefix {
  font-size: 14px;
  color: gray;
}
.type.el-tag {
  font-size: 15px;
  letter-spacing: 2px;
  font-weight: bold;
  border-radius: 0;
  position: absolute;
  cursor: pointer;
  right: 0;
}
.tags {
  width: 100%;
  min-height: 50px;
}
.tag.el-tag {
  float: right;
  margin: 0 5px;
  border: 0;
}
h2.title {
  text-align: center;
}
img.cover {
  width: 100%;
}
/deep/ .hljs {
  background-color: #282c34;
}

.warn .t{
  width: 70px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}
.warn .content {
  margin-left: 10px;
  font-weight: bold;
}
</style>