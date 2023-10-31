<template>
  <div class="banner">
    <vue-typed-js
      class="type"
      :strings="text"
      :loop="true"
      :startDelay="500"
      :backDelay="500"
      :showCursor="true"
      :cursorChar="'|'"
      :autoInsertCss="true"
      :typeSpeed="125"
      :backSpeed="25">
      <span style="color: white; margin: 0 auto; font-size: 18px;line-height:120vh; min-height: 20px;" class="typing"></span>
    </vue-typed-js>
    <div class="jump">
			<i class="el-icon-arrow-down" @click="scroll"></i>
		</div>
  </div>
</template>
<script>
import { scrollTo } from "@/utils/scroll-to";
export default {
  name: 'banner',
  methods: {
    scroll() {
      scrollTo('main')
    }
  },
  data() {
    return {
      text: [
      "Welcome To SiYu's Blog..",
      "刍狗何幸兮 逢此良辰",
    ],
    }
  },
}
</script>
<style scoped>
.banner {
  background-size: cover;
  background-position: center center;
  background-color: black;
  background-image: url("http://img.siyu.site/banner/bg.jpg");
  height: 100vh;
}
.jump {
		position: absolute;
		width: 100px;
		bottom: 180px;
		left: 0;
		right: 0;
		margin: auto;
		font-size: 25px;
		z-index: 100;
	}
	@keyframes opener {
		100% {
			top: 50px
		}
	}
	.jump i {
    color: white;
		font-size: 50px;
		opacity: 0.7;
		cursor: pointer;
		position: absolute;
		top: 35px;
		left: 30px;
		animation: opener .5s ease-in-out alternate infinite;
		transition: opacity .2s ease-in-out, transform .5s ease-in-out .2s;
	}

	.jump i:hover {
		opacity: 1;
	}
</style>