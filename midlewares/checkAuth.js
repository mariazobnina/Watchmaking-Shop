const checkAuth = (req, res, next) => {
  if (req.session.userId) {
    return res.redirect('/');
  }
  return next();
};

const addLocals = (req, res, next) => {
  res.locals.userId = req.session?.userId;
  res.locals.userName = req.session?.userName;
  next();
};

module.exports = { checkAuth, addLocals };
