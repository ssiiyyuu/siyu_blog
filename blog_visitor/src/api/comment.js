import request from '@/utils/request'

export function getCommentByBlogId(id, pageNum) {
  return request({
    url: `/service_blog/comment/${id}/${pageNum}`,
    method: 'get'
  })
}
export function commitComment(commentDto, token) {
  return request({
    url: `/service_blog/comment`,
    method: 'post',
    data: commentDto,
    params: {
      'token': token
    }
  })
}