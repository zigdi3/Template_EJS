
require('dotenv').config();

var port= process.env.PORT||3000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/meumiddleware');

//correçao de cross site require forgery attack
const csrf = require('csurf');
const helmet = require('helmet');

//tratamento para o servidor MongoDb
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

//connectar
mongoose.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.emit('pronto');
  })
  .catch(e => console.log(e));


const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flashMessage = require('connect-flash');

const routes = require('./src/routers/routes');
const path = require('path');

app.use(helmet());

//tratamento do frontend
app.use(express.urlencoded( {extended: true}));
app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
secret: 'vddsfvavof $3 axs', 
store: new MongoStore({mongooseConnection: mongoose.connection}),
resave: false,
saveUninitialized: false,
cookie: {
  maxAge: 1000*60*60*24*7,
  httpOnly: true
        }

});
app.use(sessionOptions);
app.use(flashMessage());


//rotas globais
//app.use();

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine' , 'ejs');


app.use(csrf());
//rotas da aplicação
app.use(routes);


app.use(middlewareGlobal);
app.use(csrfMiddleware);
app.use(checkCsrfError);

app.on('pronto', () => {
  app.listen(3000, () => {
    console.log('Acessar http://localhost:3000');
    console.log('Servidor executando na porta 3000');
  });
});
