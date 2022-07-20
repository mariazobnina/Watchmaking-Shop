const upload = require('../midlewares/multer.middleware');
const { Orders } = require('../db/models');
const sendMail = require('../utils/mailer');
const bcrypt = require('bcrypt');

const router = require('express').Router();

router.route('/')
  .get((req, res) => {
    res.render('index');
  })
  .post(upload.single('photo'), async (req, res) => {
    try {
      const {
        name, email, phone, description,
      } = req.body;
      const photo = req.file.filename;
      // console.log(req.body);
      console.log(req.file);
      const response = await Orders.create({
        name, email, phone, photo, description,
      });
      sendMail({ to: email });
      console.log(response);
      res.redirect('/');
    } catch (error) {
      console.log(error);
    }
  });

module.exports = router;
