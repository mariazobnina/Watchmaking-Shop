require('dotenv').config();
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const hbs = require('hbs');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const contactsRouter = require('./routes/contactsRouter');

const { addLocals } = require('./midlewares/checkAuth');
const logout = require('./routes/logout');

const loginRouter = require('./routes/login.route');

const adminRouter = require('./routes/admin.route');

const PORT = process.env.PORT || 3001;
const app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(path.join(process.env.PWD, 'views/partials'));

const sessionConfig = {
  name: 'auth',
  secret: 'catdog',
  store: new FileStore(),
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, // COOKIE'S LIFETIME — 1 DAY
  },
  resave: false,
  saveUninitialized: false,
};

app.use(session(sessionConfig));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(process.env.PWD, 'public')));
app.use(morgan('dev'));
app.use(cookieParser());

app.use(addLocals);
app.use('/', contactsRouter);
app.use('/login', loginRouter);
app.use('/out', logout);

app.use('/admin', adminRouter);

app.listen(PORT, () => console.log(`server has been started on PORT ${PORT}`));
