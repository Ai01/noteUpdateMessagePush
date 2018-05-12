const fs = require('fs');
const path = require('path');

const pictures_folder_path = path.resolve('./pictures');

const exist = fs.existsSync(pictures_folder_path);

if (!exist) {
  fs.mkdir(pictures_folder_path, err => {
    if (!err) {
      console.log('pictures文件夹创建成功');
    }
    conso.log('创建pictures文件夹发生错误', err);
  });
} else {
  console.log('pictures文件已存在');
}
