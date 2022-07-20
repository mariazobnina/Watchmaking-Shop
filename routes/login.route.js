const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');

const { User } = require('../db/models');

router.get('/', (req, res) => {
  res.render('login', { title: 'Пожалуйста, введите вашу почту и пароль' });
});

router.post('/', async (req, res) => {
  console.log('hello');
  try {
    const inputPassword = req.body.password;
    console.log(inputPassword);
    const admin = await User.findOne({ where: { id: 1 }, raw: true });
    console.log('admin', admin);
    const match = await bcrypt.compare(inputPassword, admin.password);
    console.log(match);
    const acsessDenied = 'Вы ввели неверные данные!';

    if (match) {
      req.session.userId = admin.id;
      req.session.userEmail = admin.email;
      return res.redirect('/admin');
    }
    return res.render('login', { acsessDenied });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

module.exports = router;
