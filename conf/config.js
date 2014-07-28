module.exports = {
  'mongo_host': '127.0.0.1',
  'mongo_port': '27017',
  'mongo_database': 'outkept',

  'mail_host': process.env.MAIL_HOST,
  'mail_user': process.env.MAIL_USER,
  'mail_password': process.env.MAIL_PASSWORD,
  'mail_from': process.env.MAIL_FROM,
  'mail_to': process.env.MAIL_TO,
};
