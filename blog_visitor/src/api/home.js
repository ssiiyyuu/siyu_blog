import request from '@/utils/request'

export function getBlogList(pageNum) {
  return request({
    url: `/service_blog/blog/list`,
    method: 'get',
    params: {
      "pageNum": pageNum
    }
  })
}

export function getBlogListByQuery(pageNum, query) {
    return request({
      url: `/service_blog/blog/list/query`,
      method: 'get',
      params: {
        "pageNum": pageNum,
        "query": query
      }
    })
}

export function getBlogListByTypeTitle(pageNum, id) {
  return request({
    url: `/service_blog/blog/type/${id}`,
    method: 'get',
    params: {
      "pageNum": pageNum
    }
  })
}

export function getBlogListByTagTitle(pageNum, id) {
  return request({
    url: `/service_blog/blog/tag/${id}`,
    method: 'get',
    params: {
      "pageNum": pageNum
    }
  })
}