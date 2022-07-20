const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'banuibadova8912@gmail.com',
    pass: 'gvysigwoqjvublwc',
  },
});

async function sendMail({ to }) {
  await transporter.sendMail({
    from: 'banuibadova8912@gmail.com',
    to,
    subject: 'Магазин часов',
    text: 'Благодарим за заявку!',

  });
}
module.exports = sendMail;
