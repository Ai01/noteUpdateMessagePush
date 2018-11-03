const config = require('./config.json');
const path = require('path');

// 图片保存目录
const DIR_PATH = path.resolve('./pictures');

// 图片后缀
const PREV_PICTURE_SUFFIX = 'prev';
const NEXT_PICTURE_SUFFIX = 'next';

// 图片是否相等判断标准,大于这个值就不相等
const PICTURE_TOLERANCE = 0.001;

// noteMap 小说的map数据机构。小说名为key，url为value
const NOTE_MAP = config ? config.NOTE_MAP : {};

// 邮件信息
const TARGET_MAIL = config ? config.TARGET_MAIL : {};
const SOURCE_MAIL = config ? config.SOURCE_MAIL : {}

// 定时任务的时间间隔
const CHECK_INTERVAL = '41 * * * * *';


module.exports = {
  DIR_PATH,
  PREV_PICTURE_SUFFIX,
  NEXT_PICTURE_SUFFIX,
  NOTE_MAP,
  PICTURE_TOLERANCE,
  CHECK_INTERVAL,
  CONFIG_FILE_PATH,
  TARGET_MAIL,
  SOURCE_MAIL
}

