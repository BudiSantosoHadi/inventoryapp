const http = require('http');
const path = require('path');
const express = require('express');
const session = require('express-session');
const hbs = require('hbs');


const app = express();
app.use(express.json());

// function for session
// app.use (function (req,res,next){
//     res.locals.message = req.session.message;
//     delete req.session.message;
//     next();
// });

app.use(
    session({
        cookie: {
            maxAge: 1000 * 60 * 60 * 2,
        },
        store: new session.MemoryStore(),
        resave: false,
        saveUninitialized: true, 
        secret: 'session',

    })
);
// connection
const dbConection = require('./connection/db_connection');

// deklarasi atau Url dari public,styleesheet,js,img
app.set('view engine','hbs');
app.use('/public', express.static(path.join(__dirname,'public')));
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/js', express.static(path.join(__dirname,'js')));

hbs.registerPartials(__dirname + '/views/partials');

// ---------------------------------

//  deklarasi atau Url dari main page
app.get('/', function (request, response){
    const title = 'Inventory App'
    response.render('index',{
        title: title,
    });

});
// deklarasi atau url dari page-page
app.get('/login', function (request, response){
    const title = 'Login page'
    response.render('login', {
        title: title,
    });

});
app.get('/registerpage',function(request, response){
    const title = 'Register page'
    response.render('register', {
        title: title,
    });
});

//  register
app.post('/register', function (request, response){
    const {inpemail,inppass} = request.body;

    if (inpemail == '' | inppass == ''){
        request.session.message = {
            type: 'danger',
            message: 'please insert all field!!'
        };
        return response.redirect('/registerpage')
    }

    const query = `INSERT INTO tb_user (email,password) VALUES ("${inpemail}","${inppass}")`     
       dbConection.getConnection(function(err, conn){
           if(err) throw err;
           conn.query(query, function(err, result){
            if(err) throw err ;
            
             request.session.message = {
             type: 'success',
             message: 'successfully added data...'
         };
             response.redirect('/registerpage');
      });
    });                 
  });

const port = 8000;
const server = http.createServer(app);
server.listen(port);
console.debug(`Server Listening on port ${port}!`);