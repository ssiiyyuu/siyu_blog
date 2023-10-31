<template>
  <div class="blog-slider m-hover">
    <div class="blog-slider_item swiper-slide">
      <div class="blog-slider_img">
          <img :src="blog.cover">
      </div>
      <div class="blog-slider_content">
          <span class="blog-slider_code">
              <span>{{ blog.gmtUpdate }}</span>    
              <span> Post By {{blog.author}}</span>
              &nbsp
              <i class="el-icon-view"></i><span>{{blog.view}}</span>
          </span>
          <div class="blog-slider_title">{{blog.title}}</div>
          <div class="blog-slider_text">
              <span>
                {{ blog.description }}
              </span> 
              <div class="tags">
                <el-tag v-for="tag in blog.tags" :key="tag.id" class="tag" size="small" effect="dark" :color="colors[Math.round(Math.random() * 12)]">
                  {{ tag.title }}
                </el-tag>
              </div>
          </div>
          <a class="blog-slider_button" @click="getBlog(blog.id)">READ MORE</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'article-card',
  props: {
    blog: Object
  },
  data() {
    return {
      colors: ["rgb(219,40,40)", "rgb(242,98,2)", "rgb(251,189,8)", "rgb(181,204,24)", "rgb(33,186,69)", "rgb(0,181,173)", "rgb(33,133,208)", "rgb(100,53,201)", "rgb(163,51,200)", "rgb(224,57,151)", "rgb(158,97,57)", "rgb(122,122,122)", "rgb(27,28,29)"]
    }
  },
  methods: {
    getBlog(id) {
      return this.$router.push({
          name: 'blog',
          params: {'id': id}
      })
    },
  },
}
</script>
<style scoped>
@import "../style/m.css";
@import "../style/article-card/swiper-bundle.min.css";
@import "../style/article-card/font.css";
* {
  box-sizing: border-box;
}
.tags {
  margin-top: 10px;
}
.tag {
  margin: 5px 5px;
}
.el-tag {
  border: 0;
}

.blog-slider {
  width: 95%;
  position: relative;
  max-width: 800px;
  margin: auto;
  background: #fff;
  border: solid;
  border-width: 1px;
  border-color: gray;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 25px;
  border-radius: 5px;
  height: 300px;
  transition: all 0.3s;
}

@media screen and (max-width: 992px) {
  .blog-slider {
    max-width: 680px;
    height: 400px;
  }
}

@media screen and (max-width: 768px) {
  .blog-slider {
    min-height: 500px;
    height: auto;
    margin: 180px auto;
  }
}

@media screen and (max-height: 500px) and (min-width: 992px) {
  .blog-slider {
    height: 350px;
  }
}

.blog-slider_item {
  display: flex;
  align-items: center;
}

@media screen and (max-width: 768px) {
  .blog-slider_item {
    flex-direction: column;
  }
}

.blog-slider_item.swiper-slide-active .blog-slider_img img {
  opacity: 1;
  transition-delay: 0.3s;
}

.blog-slider_item.swiper-slide-active .blog-slider_content > * {
  opacity: 1;
  transform: none;
}


.blog-slider_img {
  width: 250px;
  flex-shrink: 0;
  height: 250px;
  background-image: linear-gradient(147deg, #7e71f3 0%, #8bb5f3 74%);
  box-shadow: 4px 13px 30px 1px rgba(11, 39, 100, 0.2);
  border-radius: 10px;
  transform: translateX(-80px);
  overflow: hidden;
}


.blog-slider_img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  opacity: 1;
  border-radius: 10px;
  transition: all 0.3s;
}

@media screen and (max-width: 768px) {
  .blog-slider_img {
    transform: translateY(-50%);
    width: 90%;
  }
}

@media screen and (max-width: 576px) {
  .blog-slider_img {
    width: 95%;
  }
}

@media screen and (max-height: 500px) and (min-width: 992px) {
  .blog-slider_img {
    height: 270px;
  }
}

.blog-slider_content {
  padding-right: 25px;
}

@media screen and (max-width: 768px) {
  .blog-slider_content {
    margin-top: -80px;
    text-align: center;
    padding: 0 30px;
  }
}

@media screen and (max-width: 576px) {
  .blog-slider_content {
    padding: 0;
  }
}

.blog-slider_code {
  color: #7b7992;
  margin-bottom: 10px;
  display: block;
  font-weight: 500;
  font-size: 13.5px;
}

.blog-slider_title {
  font-size: 20px;
  font-weight: 700;
  color: #0d0925;
  margin-bottom: 20px;
}

.blog-slider_text {
  color: #4e4a67;
  margin-bottom: 20px;
  line-height: 1.3em;
  font-size: 14px;
}

.blog-slider_button {
  display: inline-flex;
  background-image: linear-gradient(147deg, #7e71f3 0%, #8bb5f3 74%);
  padding: 15px 35px;
  border-radius: 30px;
  color: #fff;
  box-shadow: 0px 14px 80px rgba(11, 39, 100, 0.2);
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  justify-content: center;
  text-align: center;
  letter-spacing: 1px;
  cursor: pointer;
}
@media screen and (max-width: 576px) {
  .blog-slider_button {
    width: 100%;
  }
}

.blog-slider .swiper-container-horizontal > .swiper-pagination-bullets, .blog-slider .swiper-pagination-custom, .blog-slider .swiper-pagination-fraction {
  bottom: 10px;
  left: 0;
  width: 100%;
}

</style>