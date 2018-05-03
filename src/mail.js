const node_mailer = require('nodemailer');

const { log, create_base_error, create_base_info } = require('./log');

const transport = node_mailer.createTransport({
  host: 'smtp.qq.com',
  port: 465,
  debug: true,
  secure: true,
  secureConnection: true,
  auth: {
    user: '2911403289@qq.com',
    pass: 'xprcknnjjgdqdfij', // qq邮箱授权码，不是密码
  },
});

const send_mail = mail_option => {
  transport.sendMail(mail_option, (err, info) => {
    if (err) {
      log(create_base_error('发送邮件错误', err));
      return;
    }
    // log(create_base_info(info))
    log(create_base_info(`发送邮件成功`));
  });
};

const get_mail_option = (content, target_mail) => {
  const base_mail_option = {
    from: '2911403289@qq.com',
    subject: '小说更新推送',
  };

  return Object.assign({}, base_mail_option, {
    to: target_mail || 'baihaihui131225@gmail.com',
    text: content.toString(),
  });
};

module.exports = {
  send_mail,
  get_mail_option,
};
