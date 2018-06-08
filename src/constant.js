// 常量
const path = require('path');

// 图片保存目录
const DIR_PATH = path.resolve('./pictures');

// 图片后缀
const PREV_PICTURE_SUFFIX = 'prev';
const NEXT_PICTURE_SUFFIX = 'next';

// 图片是否相等判断标准,大于这个值就不相等
const PICTURE_TOLERANCE = 0.001;

// noteMap 小说的map数据机构。小说名为key，url为value
const NOTE_MAP = {
  星辰之主: 'http://www.booktxt.net/2_2982/',
  打开你的任务日志: 'http://www.biqugev.com/27_27360/',
  诡秘之主: 'https://www.biquge.com.tw/19_19485/',
  黑龙法典: 'http://www.biquge.com.tw/19_19575/'
};

// 定时任务的时间间隔
const CHECK_INTERVAL = '59 30 * * * *';

module.exports = {
  DIR_PATH,
  PREV_PICTURE_SUFFIX,
  NEXT_PICTURE_SUFFIX,
  NOTE_MAP,
  PICTURE_TOLERANCE,
  CHECK_INTERVAL,
}

