import request from '@/utils/request'
// 查询 首页 banner
export const getBanner = () => {
  return request({
    url: '/banner',
    method: 'get'
  })
}

// 查询 首页 banner
export const getRecommendList = (params = {}) => {
  return request({
    url: '/personalized',
    method: 'get',
    params
  })
}

/**
 * @method 获取歌单详情
 */
export const getPlayListDetail = (params) => {
  return request({
    url: '/playlist/detail',
    params
  })
}

/**
 * @method 获取歌曲详情
 */
export const getSongDetail = ({ ids, time }) => {
  return request({
    method: 'post',
    url: '/song/detail',
    params: {
      timestamp: time
    },
    data: {
      ids
    }
  })
}

/**
 * @method 相关歌单推荐
 */
export const getRelatedPlaylist = id => {
  return request({
    method: 'get',
    url: '/related/playlist',
    params: { id }
  })
}

/**
 * @method 歌单收藏者
 * @params id 歌单 id
 * @params limit 取出评论数量 默认为 20
 * @params offset 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
 */
export const getSubscribersPlaylist = params => {
  return request({
    method: 'get',
    url: '/playlist/subscribers',
    params
  })
}

/**
 * @method 歌单评论
 * @params id 歌单 id
 * @params limit 取出评论数量 默认为 20
 * @params offset 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
 * @params before 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)
 */
export const getCommentPlaylist = params => {
  return request({
    method: 'get',
    url: '/comment/playlist',
    params
  })
}

/**
 * @method 收藏/取消收藏歌单
 */
export const collectPlaylist = (t, id) => {
  return request({
    method: 'get',
    url: '/playlist/subscribe',
    params: { t, id }
  })
}

/**
 * @method 获取热门歌单分类
 */
export const getHotlist = () => {
  return request({
    method: 'get',
    url: '/playlist/hot'
  })
}

/**
 * @method 获取歌单
 */
export const getPlayList = (params) => {
  return request({
    method: 'get',
    url: '/top/playlist',
    params
  })
}

/**
 * @method 获取歌单分类
 */
export const getCatList = () => {
  return request({
    url: '/playlist/catlist',
    method: 'get'
  })
}
