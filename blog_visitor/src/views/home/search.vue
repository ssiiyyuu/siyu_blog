<template>
  <div style="min-width: 1px; min-height: 100vh;">
    <el-card v-if="mode != 'Normal'" class="m-hover m-card m-margin-bottom-medium">
      <el-tag effect="dark" class="tag">{{ mode }}</el-tag>
      <span class="content">{{ query }}</span>
    </el-card>

    <el-card v-if="warn" class="m-hover m-card m-margin-bottom-medium">
      <el-tag effect="dark" class="tag" type="warning">WARN</el-tag>
      <span class="content">{{ warn }}</span>
    </el-card>
    
    <articleCard v-for="blog in blogs" :blog="blog" :key="blog.id" class="m-margin-bottom-medium"></articleCard>

    <el-pagination
      :hide-on-single-page="true"
      class="m-page"
      layout="total, prev, pager, next"
      background
      :page-size="4"
      :current-page="curPage"
      :total="total"
      @current-change="handleCurrentChange">
    </el-pagination>


  </div>
</template>
<script>
  import { scrollTo } from "@/utils/scroll-to";
  import {getBlogListByQuery, getBlogListByTypeTitle, getBlogListByTagTitle} from '@/api/home';
  import articleCard from '@/components/article-card.vue';
  
  export default {
    name: 'index',
    data() {
        return {
          mode: "",
          warn: "",
          query: "",
          blogs: [],
          curPage: 1,
          total: 0
        };
    },
    methods: {
      getBlogListHandler(page) {
        let mode = this.$route.params.mode
        let query = this.$route.params.query
        if(mode) {
          if(mode == 'search') {
            this.getBlogListByQuery(page, query)  
          } else if(mode == 'tag') {
              this.getBlogListByTagTitle(page, query)
          } else if(mode == 'type') {
            this.getBlogListByTypeTitle(page, query)
          } else {
            return this.$router.push('/home')
          }
        }
      },
      getBlogListByQuery(pageNum, query) {
        this.query = query
        getBlogListByQuery(pageNum, query).then(res => {
          let data = res.data
          this.blogs = data.records == null ? [] : data.records
          this.curPage = data.curPage
          this.total = data.total
          this.scroll()
          if(this.blogs.length == 0) {
            this.warn = '关键字 ['+ query + '] 下第 [ '+pageNum + ' ] 页暂无内容..'
          } else {
            this.warn = ''
          }
        })        
        this.mode = 'Search'
      },
      getBlogListByTagTitle(pageNum, query) {
        this.query = query
        getBlogListByTagTitle(pageNum, encodeURIComponent(query)).then(res => {
          let data = res.data
          this.blogs = data.records == null ? [] : data.records
          this.curPage = data.curPage
          this.total = data.total
          this.scroll()
          if(this.blogs.length == 0) {
            this.warn = '标签 ['+ query + '] 下第 [ '+pageNum + ' ] 页暂无内容..'
          } else {
            this.warn = ''
          }
        })
        this.mode = 'Tag'
        
      },
      getBlogListByTypeTitle(pageNum, query) {
        this.query = query
        getBlogListByTypeTitle(pageNum, encodeURIComponent(query)).then(res => {
          let data = res.data
          this.blogs = data.records == null ? [] : data.records
          this.curPage = data.curPage
          this.total = data.total
          this.scroll()
          if(this.blogs.length == 0) {
            this.warn = '分类 ['+ query + '] 下第 [ '+pageNum + ' ] 页暂无内容..'
          } else {
            this.warn = ''
          }
        })        
        this.mode = 'Type'
        
      },
      handleCurrentChange(val) {
        this.getBlogListHandler(val)
      },
      scroll() { 
        scrollTo('main')
      }
    },
    watch: {
      $route() {
        this.getBlogListHandler(1)
      }
    },
    created() {
      this.getBlogListHandler(1)
    },
    components: { articleCard }
}
</script>
<style scoped>
@import "../../style/m.css";
  .m-card {
    max-width: 800px;
    border: 1px solid gray;
    margin: auto;
  }
  .m-card .tag {
    width: 70px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }
  .m-card .content {
    margin-left: 10px;
    font-weight: bold;
  }
  .m-page {
    padding: 20px 20px;
    text-align: center;
    max-width: 800px;
    margin: auto;
  }
</style>