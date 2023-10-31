<template>
  <div style="min-width: 1px; min-height: 100vh;">

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
  import {getBlogList} from '@/api/home';
  import articleCard from '@/components/article-card.vue';
  
  export default {
    name: 'index',
    data() {
        return {
          warn: "",
          blogs: [],
          curPage: 0,
          total: 0
        };
    },
    methods: {
      /**
       * 
       * @param {页码} pageNum 
       * @param {是否返回顶部} flag 
       */
      getBlogListByPage(pageNum, flag) {
        getBlogList(pageNum).then(res => {
          let data = res.data
          this.blogs = data.records == null ? [] : data.records
          this.curPage = data.curPage
          this.total = data.total
          if(flag) {
            this.scroll()
          }
          if(this.blogs.length == 0) {
            this.warn = '本博客第 [ '+ pageNum + ' ] 页暂无内容..'
          } else {
            this.warn = ''
          }
        })
      },
      handleCurrentChange(val) {
        this.getBlogListByPage(val, true)
      },
      scroll() { 
        scrollTo('main')
      }
    },
    watch: {
      $route() {
        this.getBlogListByPage(1, false)
      }
    },
    created() {
      if(this.$route.query.token) {
        window.sessionStorage.setItem("X-token", this.$route.query.token)
      }
      this.getBlogListByPage(1, false)
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