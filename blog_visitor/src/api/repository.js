import request from '@/utils/request'

export function getRepository() {
  return request({
    url: `/service_blog/blog/repository`,
    method: 'get'
  })
}