import request from '@/utils/request'

export function getBlogById(id) {
  return request({
    url: `/service_blog/blog/${id}`,
    method: 'get'
  })
}