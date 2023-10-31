<template>
  <el-card :body-style="{ padding: '0px' }" class="m-hover">
    <img src="http://img.siyu.site/avatar/siyu.jpg" class="image">
    <div class="content">
      <h3 class="header">SiYu</h3>
      <div class="description">
          <p class="m-text-style">刍狗何幸兮，逢此良辰</p>
      </div>
      <div class="icons">
        <a href="mailto:1520213436@mail.jxust.edu.cn"><img src="../assets/icon/envelope.svg" class="icon"></a>
        <a href="tencent://AddContact/?fromId=50&fromSubId=1&subcmd=all&uin=504826715"><img src="../assets/icon/qq.svg" class="icon"></a>
        <a href="https://steamcommunity.com/profiles/76561199024976099/" target="_blank"><img src="../assets/icon/steam.svg" class="icon"></a>
      </div>
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="关于我" name="1">
          <div class="collapse-description-item">什么都想会一点结果导致什么都学不会的普通在校生</div>
        </el-collapse-item>
        <el-collapse-item title="关于博客" name="2">
          <div class="collapse-description-item">大二时期学习spring boot的练手项目，项目基于ctrl cv开发，面向github编程</div>
        </el-collapse-item>
        <el-collapse-item title="提示" name="3">
          <div class="collapse-description-item">由于本人技术有限，访问本博客时如遇跳转错误、服务器访问错误等，十分抱歉</div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </el-card>
</template>
<script>
export default {
  name: 'character-card',
  methods: {
  },
  data() {
    return {
      activeName: '0'
    }
  },
}
</script>
<style lang="scss" scoped>
@import "../style/m.css";
  .image {
    width: 100%;
    display: block;
  }

  .content .header {
    text-align: center;
  }

  .content .description {
    text-align: center;
    color: gray;
    font-size: small;
    font-weight: bold;
    letter-spacing: 2px;
    cursor: pointer;
  }
  .content .description:hover {
    color: black;
  }
  .content .icons {
    text-align: center;
  }
  .content .icon {
    width: 16px;
    padding: 0 10px;
    cursor: pointer;
    opacity: 0.5;
  }
  .content .icon:hover{
    opacity: 1;
  }
  /deep/ .el-collapse-item__header {
    font-weight: bold !important;
    font-size: 14px;
    padding: 0 20px;
    letter-spacing: 2px;
  }
  .collapse-description-item {
    padding: 0 20px;
    color: gray;
  }
</style>