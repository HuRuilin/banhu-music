export interface Banner {
  imageUrl: string,
}
export interface State {
  list: Banner[]
}

/**
 * 收听人员
 */
export interface Subscriber {
  /** 用户id */
  userId: string;
  // 用户头像
  avatarUrl: string;
  // 用户昵称
  nickname: string;
}

// 歌单创建人
interface Creator {
  nickname: string
}

// 相关歌单推荐
export interface RelatedRecommends {
  // 歌单id
  id: string;
  // 歌单名称
  name: string;
  // 封面地址
  coverImgUrl: string;
  nickname: string;
  // 歌单创建者
  creator: Creator;
}

// 歌单详情
export interface SongListInfo {
  // 封面地址
  coverImgUrl: string;
  // 歌单名字
  name: string;
  // 创建时间
  createTime: number;
  // 标签
  tags: string[];
  // 歌单介绍
  description: string;
  // 该歌单是否已经收藏
  subscribed: boolean;
}

// 歌单创建者
export interface SongListCreator {
  // 用户id
  userId: string;
  // 用户头像
  avatarUrl: string;
  // 用户名称
  nickname: string;
}

// 歌曲标准对象
export interface Song {
  // 歌曲id
  id: string;
  // 歌曲头像
  image: string;
  // 歌曲名
  name:string;
  // 歌手名
  singer:string;
  // 专辑名
  album:string;
  // 歌曲时长
  duration:number | string;
  // 评分
  score:number | string;
  // 播放次数
  playCount:number;
  // 音乐地址
  url:string;
}

// 歌单详情页状态对象
export interface PlayListInfo{
  detail: SongListInfo | { [key: string]: any };
  creator: SongListCreator | { [key: string]: any };
  songs: Song[];
  artistId: string;
  loading: boolean;
  ordered: boolean;
}
