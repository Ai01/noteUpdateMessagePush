/*
*
从逻辑流程看出的代码组成

1. noteMap
2. 文件存在检查
3. 拉取图片
4. 保存图片
5. 比较图片
6. 发送通知
7. 定时任务
*
* */

const puppeteer = require('puppeteer');
const schedule = require('node-schedule');

const { rename_picture, compare_picture, check_picture_exist, delete_picture } = require('./src/picture_utils');
const { log, create_base_error, create_base_info } = require('./src/log');
const { send_mail, get_mail_option } = require('./src/mail');
const { CHECK_INTERVAL, NOTE_MAP, NEXT_PICTURE_SUFFIX, PREV_PICTURE_SUFFIX, DIR_PATH } = require('./src/constant');

// 拉取picture
const get_picture = async (name, url) => {
  try {
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.goto(url);

    await page.screenshot({
      path: `${DIR_PATH}/${name}`,
      type: 'png',
      fullPage: true,
    });

    await browser.close();
  } catch (e) {
    log(create_base_error('获取图片错误', e));
  }
};

const main = () => {
  Object.entries(NOTE_MAP).forEach(async ([note_name, note_url]) => {

    // 常量
    const prev_picture_name = `${note_name}${PREV_PICTURE_SUFFIX}.png`;
    const next_picture_name = `${note_name}${NEXT_PICTURE_SUFFIX}.png`;
    const next_picture_path = `${DIR_PATH}/${next_picture_name}`;
    const prev_picture_path = `${DIR_PATH}/${prev_picture_name}`;

    // 检查prev picture照片是否存在
    const is_prev_picture_exist = check_picture_exist(prev_picture_path);

    // prevPage存在，拉nextPage
    if (is_prev_picture_exist) {
      await get_picture(next_picture_name, note_url);

      const _cb = is_picture_equal => {
        // 如果picture相同，说明没有更新,删除nextPage
        if (is_picture_equal) {
          log(create_base_info(`<<${note_name}>>没有更新`));
          delete_picture(next_picture_path);
        }

        // 如果picture不相同，说明更新
        // 发送mail，通知我小说更新了
        // 删除prevPicture
        // 将nextPicture改名为prevPicture
        if(!is_picture_equal){
          log(create_base_info(`<<${note_name}>>更新了`));

          const mail_option = get_mail_option(null, {
            subject: `<<${note_name}>>更新了`,
            html: `<a href="${note_url}" >${note_name}</a>`,
            attachments: {
              filename: `${note_name}.png`,
              path: next_picture_path,
            },
          });
          send_mail(mail_option, () => {
            delete_picture(prev_picture_path);
            rename_picture(next_picture_path, prev_picture_path);
          });
        }
      };

      // 比较照片
      compare_picture(next_picture_path, prev_picture_path, _cb);
    }

    // prevPage不存在，拉prevPage,并通知
    if(!is_prev_picture_exist){
      await get_picture(prev_picture_name, note_url);

      log(create_base_info(`新小说<<${note_name}>>`));

      const mail_option = get_mail_option(null, {
        subject: `新小说<<${note_name}>>`,
        html: `<a href="${note_url}" >${note_name}</a>`,
        attachments: {
          filename: `${note_name}.png`,
          path: prev_picture_path,
        },
      });
      send_mail(mail_option);
    }
  });
};

//main定时执行
schedule.scheduleJob(CHECK_INTERVAL, () => {
  const now = new Date();
  log(create_base_info(`${now} 检查更新`));
  main();
});
