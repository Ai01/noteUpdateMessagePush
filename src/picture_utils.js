const fs = require('fs');
const gm = require('gm');

const { PICTURE_TOLERANCE } = require('./constant');

const {
  log,
  create_base_error,
} = require('./log');



// 比较图片是否相等
const compare_picture = (prevPicturePath, nextPicturePath, cb) => {

  // 图片差距容忍值。如果大于这个值就说明，不是同一张图片。
  const tolerance = PICTURE_TOLERANCE;

  gm.compare(
    prevPicturePath,
    nextPicturePath,
    tolerance,
    (err, isEqual, equality, raw, path1, path2) => {
      if (err) {
        log(create_base_error('比较图片出错', err))
        return;
      }
      // console.log('isEqual', isEqual);
      // console.log('equality', equality);
      // console.log('raw', raw);
      // console.log('path1', path1);
      // console.log('path2', path2);
      cb(isEqual);
    },
  );

}

// 检查picture是不是存在
const check_picture_exit = picture_url => {
  if (!picture_url) return null;
  return fs.existsSync(picture_url);
};

// 删除picture
const delete_picture = picture_url => {
  if (!picture_url) return null;
  fs.unlinkSync(picture_url, err => {
    if (err) log(create_base_error('删除图片错误', err));
  });
};

// 重命名图片
const rename_picture = (old_picture_url, new_picture_url) => {
  if(!old_picture_url || !new_picture_url) return;
  fs.renameSync(old_picture_url, new_picture_url);
};


module.exports = {
  compare_picture,
  delete_picture,
  check_picture_exit,
  rename_picture,
};
