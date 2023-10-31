import request from '@/utils/request'

export function getIndex() {
    return request({
      url: `/service_blog/index`,
      method: 'get'
    })
}