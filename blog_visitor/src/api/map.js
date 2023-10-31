import request from '@/utils/request'

export function getMap() {
    return request({
      url: `/service_blog/map`,
      method: 'get'
    })
}