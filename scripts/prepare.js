const fs = require('fs');
const path = require('path');


// 判断图片存储文件是否存在
const pictures_folder_path = path.resolve('./pictures');
const exist = fs.existsSync(pictures_folder_path);

if (!exist) {
  fs.mkdir(pictures_folder_path, err => {
    if (!err) {
      console.log('pictures文件夹创建成功');
    }
    console.log('创建pictures文件夹发生错误', err);
  });
} else {
  console.log('pictures文件已存在');
}

// 配置文件写入
const CONFIG_FILE_PATH = path.resolve('./config.json');

const is_config_file_exist = fs.existsSync(CONFIG_FILE_PATH);
if (is_config_file_exist) {
  fs.createReadStream(CONFIG_FILE_PATH, {encoding: 'utf8'}).pipe(
    fs.createWriteStream(path.resolve('./src/config.json'))
  )
}
