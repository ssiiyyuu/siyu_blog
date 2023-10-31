<template>
  <div class="whole">
    <el-container>
      <!--HeaderNav-->
      <el-header :style="cssVars">
        <div class="logo">
          SI YU
        </div>
        <div class="menu m-mobile-hidden">
          <el-menu :default-active="activeIndex" :style="cssVars" mode="horizontal" background-color="transparent" text-color="#fff" active-text-color="#ffd04b" router>
            <el-menu-item route index="/home"><i class="el-icon-s-home"></i>首页</el-menu-item>
            <el-menu-item route index="/map"><i class="el-icon-location"></i> 访客地图</el-menu-item>
            <el-menu-item route index="/repository"><i class="el-icon-s-order"></i>归档</el-menu-item>
          </el-menu>
        </div>
        <div class="header-right m-mobile-hidden">
          <el-input placeholder="Search..." class="m-input" v-model="search_input">
            <i slot="suffix" class="el-input__icon el-icon-search m-input-icon" @click="getBlogListByQuery"></i>
          </el-input>
          <el-button :style="cssVars" class="m-button" icon="el-icon-user-solid" @click="login">登录</el-button>
        </div>
        <div class="header-right m-mobile-show">
          <el-button :style="cssVars" class="m-button" style="margin-right: 10px;" icon="el-icon-more" @click="sidebarShow = true"></el-button>
        </div>
      </el-header>
      <banner></banner>

      <!--SidebarNav-->
      <el-drawer
        class="sidebar"
        :visible.sync="sidebarShow"
        :show-close="false"
        direction="ltr"
      >
        <el-menu 
          mode="vertical" 
          background-color="transparent" 
          text-color="#fff" 
          active-text-color="#ffd04b" 
          :default-active="activeIndex"
          router>
          <el-menu-item route index="/home" @click="sidebarShow = false"><i class="el-icon-s-home"></i>首页</el-menu-item>
          <el-menu-item route index="/map" @click="sidebarShow = false"><i class="el-icon-location"></i> 访客地图</el-menu-item>
          <el-menu-item route index="/repository" @click="sidebarShow = false"><i class="el-icon-s-order"></i>归档</el-menu-item>
        </el-menu>
        <div class="m-item-login" @click="login">
          <i class="el-icon-user m-item-icon"></i>登录
        </div>
        <div class="m-item-search">
          <i class="el-icon-search m-item-icon" @click="getBlogListByQuery"></i>
          <el-input id="input2" placeholder="Search..." class="m-input" v-model="search_input">
          </el-input>
        </div>
      </el-drawer>

      <meting-js server="netease" type="song" id="1852535741" fixed="true" autoplay="false" loop="all"
          order="random" preload="auto" volume="0.2" list-folded="ture" list-max-height="500px" lrc-type="1">
      </meting-js>
      <!--Main-->
      <el-main id="main">
        <el-row>
          <el-col :span="4" class="m-mobile-hidden">
            <characterCard></characterCard>
          </el-col>
          <el-col :sm="16" :xs="24" >
            <router-view ref="view"/>
          </el-col>
          <el-col :span="4" class="m-mobile-hidden">
            <typeCard :types="types"></typeCard>
            <tagCard :tags="tags" class="m-margin-top-small"></tagCard>
          </el-col>
          <el-col class="m-mobile-show">
            <typeCard :types="types" class="m-margin-top-small"></typeCard>
            <tagCard :tags="tags" class="m-margin-top-small"></tagCard>
          </el-col>
        </el-row>
      </el-main>

      <!--Footer-->
      <el-footer>
        <el-row type="flex" justify="center" class="m-mobile-hidden">
          <el-col :span="6">
            <div class="footer-title">使用技术</div>
            <div class="footer-content">
              <a>SpringCloud</a>
              <a>MybatisPlus</a>
              <a>Vue2</a>
              <a>ElementUI</a>
            </div>
          </el-col>
          <el-divider direction="vertical"></el-divider>
          <el-col :span="6">
            <div class="footer-title">最新博客</div>
            <div class="footer-content">
              <a v-for="blog in blogs" @click="getBlog(blog.id)">{{ blog.title }}</a>
            </div>
          </el-col>
          <el-divider direction="vertical"></el-divider>
          <el-col :span="6">
            <div class="footer-content">
              <a>Drowning, that's my first life, Kinda depressed but now I don't mind</a>
              <a>I stop to regret that I saw your sapphire eyes</a>
            </div>
          </el-col>
        </el-row>
        <div class="m-mobile-show">
          <div>
            <div class="footer-title">使用技术</div>
            <div class="footer-content">
              <a>SpringCloud</a>
              <a>MybatisPlus</a>
              <a>Vue2</a>
              <a>ElementUI</a>
            </div>
          </div>
          <div>
            <div class="footer-title">最新博客</div>
            <div class="footer-content">
              <a v-for="blog in blogs" :key="blog.id">{{ blog.title }}</a>
            </div>
          </div>
          <div>
            <div class="footer-content">
              <a>Drowning, that's my first life, Kinda depressed but now I don't mind</a>
              <a>I stop to regret that I saw your sapphire eyes</a>
            </div>
          </div>
        </div>
        <el-row type="flex" justify="center">
          <el-col :span="18">
            <el-divider></el-divider>
          </el-col>
        </el-row>
        <div class="footer-copyright">
          <a>
            Copyright © SiYu'S Blog Designed By LJX
          </a>
          <a>-----</a>
          <a href="https://beian.miit.gov.cn/">
            赣ICP备2022011177号
          </a>
        </div>
      </el-footer>

    </el-container>
  </div>
</template>
<script>
import { scrollTo } from "@/utils/scroll-to";
import { getIndex } from '@/api/layout';
import banner from '@/components/banner.vue'
import characterCard from '@/components/character-card.vue';
import typeCard from '@/components/type-card.vue';
import tagCard from '@/components/tag-card.vue';

  export default {
    name: 'index',
    components: {banner, characterCard, typeCard, tagCard},
    data() {
      return {
        activeIndex: '/home',
        search_input: '',
        backgroundColor: 'black',
        hoverColor: 'rgb(20, 20, 20)',
        sidebarShow: false,
        blogs: [],
        tags: [],
        types: [],
        home_data: {}
      }
    },
    methods: {
      checkTop() {
        var curHeight = document.documentElement.scrollTop || document.body.scrollTop
        if(curHeight > 100) {
          this.backgroundColor = 'rgb(27,28,29)'
          this.hoverColor = 'rgb(45,46,47)'
        } else {
          this.backgroundColor = 'black'
          this.hoverColor = 'rgb(20,20,20)'
        }
      },
      getIndexData() {
        getIndex().then((res) => {
          let data = res.data
          this.blogs = data.blogs
          this.tags = data.tags
          this.types = data.types
        });
      },
      getBlogListByQuery() {
        if(this.search_input == undefined || this.search_input == null || this.search_input.trim() == '') {
          this.search_input = ''
          return;
        } else {
          let query = this.search_input
          this.sidebarShow = false
          this.search_input = ''
          return this.$router.push({
            name: 'search',
            params: {'mode': 'search', 'query': query, 'page': 1}
          })  
        }

      },
      getBlog(id) {
        return this.$router.push({
          name: 'blog',
          params: {'id': id}
        })
      },
      scroll() { 
        scrollTo('main')
      },
      login() {
        window.location.href = 'http://admin.siyu.site'
      }
    },
    computed: {
      cssVars() {
        return {
          "--backgroundColor": this.backgroundColor,
          "--hoverColor": this.hoverColor
        };
      }
    },
    watch: {
      $route() {
          this.activeIndex =  '/' + this.$route.path.split('/')[1]
          this.scroll()
      }
    },
    created() {
      this.activeIndex = this.$route.path
      this.getIndexData()
    },
    mounted() {
      this.$nextTick(function() {
        window.addEventListener('scroll', this.checkTop)
      })
    }

  }
</script>
<style lang="scss" scoped>
@import "../style/m.css";
	.whole {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
	}
  .el-menu {
    border: 0;
    border-bottom: 0 !important;
  }
  .el-menu-item.is-active {
    background-color: transparent !important;
  }
  //header
  .el-header {
    padding: 0 !important;
    background-color: var(--backgroundColor);
    position: fixed;
    width: 100%;
    z-index: 10;
  }
  .logo {
    float: left;
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 18px;
    color: white;
    font-size: 20px;
    font-weight: bold;
    cursor: default;
  }
  .menu {
    float: left;
  }
  .menu .el-menu-item:hover {
    background-color: var(--hoverColor) !important;
  }
  .header-right {
    height: 100%;
    float: right;
  }
  .header-right .m-button{
    float: right;
    background-color: transparent;
    border: 0;
    color: white;
    margin-top: 10px;
  }
  .header-right .m-button:hover {
    background-color: var(--hoverColor) !important;
  }
  .header-right .m-input{
    float: right;
    margin-top: 10px;
    margin-right: 20px;
    width: 50%;
  }
  .header-right .m-input-icon{
    cursor: pointer;
  }
  /deep/.el-input__inner {
    background-color: transparent !important;
    border: 0;
    color: white;
  }

  //sidebar
  ::v-deep .el-drawer {
    background-color: rgb(27, 28, 29) !important;
    min-width: 250px;
  }
  .sidebar .el-menu-item {
    width: 100%;
  }
  .sidebar .m-item-login {
    width: 100%;
    height: 56px;
    line-height: 56px;
    padding: 0 20px;
    cursor: pointer;
    color: white;
  }
  .sidebar .m-item-login:hover {
    background-color: rgb(45,46,47)
  }
  .sidebar .m-item-search {
    width: 100%;
    height: 56px;
    line-height: 56px;
    padding: 0 20px;
    color: white;
  }
  .sidebar .m-item-icon {
    margin-right: 5px;
    width: 24px;
    font-size: 18px;
    text-align: center;
    cursor: pointer;
    vertical-align: middle;
  }
  .sidebar .el-menu-item:hover {
    background-color: rgb(45,46,47) !important;
  }
  .sidebar .m-input{
    width: 50%;
  }
  /deep/ .sidebar .el-input__inner {
    padding: 0 !important;
  }

  //footer
  .el-footer {
    padding: 0 !important;
    height: 100% !important;
    background-color: rgb(27, 28, 29);
  }
  .footer-title {
    color: white;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    margin-top: 15px;
  }
  .footer-content {
    text-align: center;
    margin-top: 15px;
  }
  .footer-content a {
    color: gray;
    font-size: 13px;
    display: block;
    margin-top: 3px;
    cursor: pointer;
  }
  .footer-content a:hover {
    color: white;
  }
  .el-footer .el-divider{
    background-color: gray;
  }
  .el-footer .el-divider--vertical {
    height: 130px;
  }
  .footer-copyright {
    text-align: center;
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .footer-copyright a {
    color: gray;
    font-size: 13px;
    cursor: pointer;
  }
  .footer-copyright a:hover {
    color: white;
  }
  .el-icon-search:hover {
    color: white;
  }
</style>