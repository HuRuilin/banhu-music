import request from '@/utils/request'
// 查询 首页 banner
export const getBanner = () => {
  return request({
    url: '/banner',
    method: 'get'
  })
}
