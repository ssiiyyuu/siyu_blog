<template>
  <div>
    <div v-if="comments == undefined || comments.length <= 0" class="warn">
        <el-tag effect="dark" class="t" type="success">TIPS</el-tag>
        <span class="content">当前评论区为空</span>
    </div>
    <div class="list">
    <div class="item" v-for="comment in comments">
      <div class="main-comment-item">
          <img :src="comment.avatar" class="avatar">
          <div class="info">
              <p class="name">{{ comment.name }}<el-tag class="tag" size="mini" v-if="comment.isAdmin">admin</el-tag></p>
              <p class="text">{{ comment.content }}</p>
              <p><span class="time">{{ comment.gmtCreate }}</span>&nbsp&nbsp<span class="reply" @click="reply(comment)">回复</span></p>
          </div>
      </div>
      <div class="sub-comment-item" v-for="child in comment.childs">
        <img :src="child.avatar" class="avatar">
        <div class="info">
          <p class="name">{{ child.name }}<el-tag class="tag" size="mini" v-if="child.isAdmin">admin</el-tag></p>
          <p class="text">{{ child.content }}</p>
          <p><span class="time">{{ child.gmtCreate }}</span>&nbsp&nbsp<span class="reply" @click="reply(child)">回复</span></p>
        </div>
      </div>
      <el-divider></el-divider>
    </div>
    </div>      
    <div class="page">
        <el-pagination
          :hide-on-single-page="true"
          layout="total, prev, pager, next"
          :page-size="2"
          :current-page="curPage"
          :total="total"
          @current-change="changePage">
        </el-pagination>
    </div>
    <div class="reply-wrapper">
      <div class="name">{{ visitor_name }}</div>
      <textarea id="reply" :placeholder="placeholder" rows="1" maxlength="100" v-model="reply_input"></textarea>
      <div class="button">
        <el-tag effect="dark" @click="commitWrapper()">REPLY</el-tag>
        <el-tag effect="dark" style="margin-left: 10px;" type="danger" v-if="reply_id != '-1'" @click="cancel">CANCEL</el-tag>
      </div>
    </div>
  </div>
</template>
<script>
import { getCommentByBlogId, commitComment } from '@/api/comment'
import { throttle } from "@/utils/my-util";
import { Message } from 'element-ui'
export default {
  name: 'comment',
  props: {
    blog_id: String
  },
  data() {
    return {
      reply_id: '-1',
      reply_input: '',
      placeholder: '发一条友善的评论..',
      visitor_name: '访客' + window.localStorage.getItem('identifier'),
      comments: [],
      total: 0,
      curPage: 0,
      commentDto: {
        'blogId': '',
        'parentId': '',
        'name': '',
        'content': ''
      },
      commitWrapper: null
    }
  },
  methods: {
    reply(comment) {
      document.getElementById('reply').focus()
      this.reply_input = ''
      this.placeholder = '@' + comment.name + ": "
      //如果是主评论
      if(comment.parentId == '-1') {
        this.reply_id = comment.id
      } else {
        this.reply_id = comment.parentId
      }
    },
    cancel() {
      this.reply_input = ''
      this.placeholder = '发一条友善的评论..',
      this.reply_id = '-1'
    },
    commit() {
      if(this.reply_input == undefined || this.reply_input.trim() == '') {
        return
      }
      let token = window.sessionStorage.getItem('X-token')
      this.commentDto.blogId = this.blog_id
      this.commentDto.parentId = this.reply_id
      this.commentDto.name = this.visitor_name
      this.commentDto.content = this.reply_id == "-1" ? this.reply_input : '回复' + this.placeholder + this.reply_input
      commitComment(this.commentDto, token).then(res => {
        Message({
          message: '回复成功',
          type: 'success',
          duration: 5 * 1000
        })
        this.reply_input = ''
        this.getComment(1)
      })
    },
    getComment(pageNum) {
      getCommentByBlogId(this.blog_id, pageNum).then(res => {
        let data = res.data
        if(data == null || data == undefined) {
          return
        }
        this.comments = data.records
        this.total = data.total
        this.curPage = data.curPage
      })
    },
    changePage(val) {
      this.getComment(val)
    }
  },
  created() {
    this.getComment(1)
    this.commitWrapper = throttle(this.commit, 1000)
  },
  watch: {

  }
}
</script>
<style>
.list {
  padding: 10px 20px;
}
.list .main-comment-item {
  width: 100%;
  display: flex;
}
.list .info {
  margin-left: 10px;
  width: 100%;
}
.list .info p {
  margin: 0;
}

.list .name {
  color: #FB7299;
  font-size: 13px;
  font-weight: bold;
  line-height: 2em;
}
.list .tag {
  color: white;
  background-color: #409EFF;
  cursor: pointer;
  margin-left: 5px;
}
.list .text {
  color: #333;
  font-size: 13px;
  padding: 10px 0;
}

.list .time {
  color: #999;
  font-size: 12px;
}
.list .reply{
  cursor: pointer;
  font-size: 12px;
  color: #409EFF;
  opacity: 0.7;
}
.list .reply:hover{
  opacity: 1;
  text-decoration: underline;
  text-decoration-color: #409EFF;
}
.list .sub-comment-item {
  display: flex;
  margin-left: 45px;
  margin-top: 10px;
}

img.avatar {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  flex-shrink: 0;
  border: 1px solid #FB7299;
}
.page {
  text-align: center;
}
.reply-wrapper {
    width: 100%;
    margin-top: 30px;
}
.reply-wrapper .name {
  margin: 0 10px;
  font-size: 12px;
  color: #999;
}
.reply-wrapper textarea {
  width: 100%;
  outline: none;
  border-color: transparent;
  resize: none;
  background: #f5f5f5;
  border-radius: 4px;
  flex: 1;
  padding: 10px;
  height: 50px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
}
.reply-wrapper .button {
  margin-top: 5px;
}
.reply-wrapper .button .el-tag {
  width: 70px;
  text-align: center;
  font-weight: bold;
  font-size: 12px;
  opacity: 0.8;
  cursor: pointer;
}
.reply-wrapper .button .el-tag:hover {
  opacity: 1;
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
 
 