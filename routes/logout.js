const router = require('express').Router();

router.route('/')
  .get((req, res) => {
    req.session.destroy();
    res.clearCookie('auth');
    res.redirect('/');
  });

module.exports = router;
