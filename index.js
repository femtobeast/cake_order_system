
const express = require("express"); //server framework
const bodyparser = require("body-parser");//packages body-parser
const app = express(); //express method 
const path = require("path");
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const flash = require('express-flash');
//--------------------------------------
const userRoute = require('./route/userroute');//userroute for url path
const adminRoute = require('./route/adminroute');//adminroute url


//------------------------
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,PATCH,DELETE');
  res.setHeader("Access-Control-Allow-Headers", "content-type,X-Requested-With,authorization,ERR_HTTP_HEADERS_SENT");
  next();
});

app.set("views", __dirname + "/views");//set view folder
app.set("view engine", "ejs");//set the view engine as ejs
app.use(bodyparser.urlencoded({ extended: true })); //multipart data for image video giving true
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, "resources")));//hosting public folder 

// -- SESSION CODE BELOW START
const TWO_HOURS = 1000 * 60;
// const TWO_HOURS = 1000*60*60*1; 
const {
  PORT = process.env.PORT,
  SESS_NAME = 'sid',
  SESS_SECRET = 'JHGF>,./?;;LJ8#$?,KL:>>>,,KJJJDHE',
  NODE_ENV = 'development',
  SESS_LIFETIME = TWO_HOURS
} = process.env
const IN_PROD = NODE_ENV === 'production'
const users = [
  { id: 1, name: 'Rishav', email: 'reshav@gmail.com', password: 'rishav' },
  { id: 2, name: 'Maskey', email: 'maskey@gmail.com', password: 'secret' },
  { id: 3, name: 'Apple', email: 'apple@gmail.com', password: 'secret' }
]
app.use(cookieParser());
app.use(expressSession({
  // genid: function (req) {
  //   return i++ // use UUIDs for session IDs
  // },
  name: SESS_NAME,
  resave: false,
  secret: 'max',
  saveUninitialized: false,
  cookie: { maxAge: SESS_LIFETIME, sameSite: true, secure: IN_PROD }
}))
app.use(flash());
//JSON object to be added to cookie 
let student = {
  name: "Rishav",
  Age: "18"
}

//Route for adding cookie 
app.get('/setuser', (req, res) => {
  res.cookie("student", users);
  res.send('user data added to cookie');
});
//Iterate users data from cookie 
app.get('/getuser', (req, res) => {
  //shows all the cookies 
  res.send(req.cookies.student);
});

const redirectToLogin = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect('/login');
  } else {
    next();
  }
}

const redirectToHome = (req, res, next) => {
  if (req.session.userId) {
    res.redirect('/home');
  } else {
    next();
  }
}

app.use((req, res, next) => {
  res.locals.session = req.session;
  const { userId } = res.locals.session;
  if (userId) {
    res.locals.user = users.find(
      user => user.id === userId
    )
  }
  next();
})

// app.use(function (err, req, res, next) {
//   return res.status(404).send({ status: 500, message: err.message, type: req.url });
// });


//----route defination
app.get("/", (req, res) => {
  const { userId } = req.session;
  console.log(userId)
  const wt = "Yummy Cake";
  const redirect = [{
    title: "WARNING!!! Redirect to login: [server address: localhost:1234/, port: 1234]",
    login: "http://localhost:1234/user/login",
    subtitle: "this is root page!!!"
    // userid: `${userId}`
  }];
  res.render('welcome', { wt, redirect, userId });
  // var sess = req.session;
  // if (sess.views) {
  //   sess.views++
  //   res.setHeader('Content-Type', 'text/html');
  //   res.write('<p>' + sess.views + '</p>');
  //   res.write('<p>expries in ' + (sess.cookie.maxAge / 1000) + 's</p>');
  //   res.end();
  // } else {
  //   sess.views = 1;
  //   res.end('Welcome to the session demo.refresh!!!' + req.sessionID)
  // }

});

app.get('/home', (req, res) => {
  const { user } = res.locals;
  // const user = users.find(user => user.id === req.session.userId)
  console.log(req.session)
  if (req.sessionId) {
    console.log('yes')
  } else {
    console.log('no')
  }
  res.send(`
  <h1>Home</h1>
  <a href="/"> Main </a>
  <ul>
  <li>Name: ${user.name}</li>
  <li>Email: ${user.email}</li>
  <form method="POST" action="/logout">
    <button>Logout</button>
  </form>
  </ul>`
  );
})
app.get('/profile', redirectToLogin, (req, res) => {
  // const user = users.find(user => user.id === req.session.userId)
  const { user } = res.locals;
  res.json(user)

})
app.get('/login', redirectToHome, (req, res) => {
  res.send(`
  <h1>Login</h1>
  <form method="post" action="/login">
  <input type="email" name="email" placeHolder="email" required />
  <input type="password" name="password" placeHolder="password" required />
  <input type="submit" />
  </form>
  <a href="/register">Register</a>
  `);
})
app.get('/register', redirectToHome, (req, res) => {
  res.send(`
  <h1>Register</h1>
  <form method="post" action="/register">
  <input type="text" name="name" placeHolder="name" required />
  <input type="email" name="email" placeHolder="email" required />
  <input type="password" name="password" placeHolder="password" required />
  <input type="submit" />
  </form>
  <a href="/login">Login</a>

  `);
})

app.post('/login', redirectToHome, (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const user = users.find(
      user => user.email === email && user.password === password
    )
    console.log(user);
    if (user) {
      req.session.userId = user.id;
      return res.redirect('/home');
    }

  }

})
app.post('/register', redirectToHome, (req, res) => {
  const { name, email, password } = req.body;

  if (name && email && password) {
    const exists = users.some(
      user => user.email === email
    )
    if (!exists) {
      const user = {
        id: users.length + 1,
        name,
        email,
        password
      }
      users.push(user);
      req.session.userId = user.id
      return res.redirect('/home')

    }
  }
  res.redirect('/register');

})
app.post('/logout', redirectToLogin, (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.redirect('/home');
    }
    res.clearCookie(SESS_NAME);
    res.redirect('/login')

  })
})

//---------SESSION CODE END 








app.use("/user", userRoute);
app.use("/admin", adminRoute);


//---error defining 
app.use((err, req, res, next) => {
  res.locals.error = err;
  if (err.status >= 100 && err.status < 600) res.status(err.status);
  else res.status(500);
  res.send({ "status": err.status, "message": err.message });
});
//--------------------------


function redirectToWelcomePage(req, res) {
  const wt = "Yummy Cake";
  const redirect = [{
    title: "WARNING!!! Redirect to login: [server address: localhost:1234/, port: 1234]",
    login: "http://localhost:1234/user/login",
    subtitle: "this is root page!!!"
  }];
  res.render('welcome', { wt, redirect });
}

//route for upload folders
//Serves all the request which includes /images in the url from Images folder
var publicDir = require('path').join(__filename, '/resources/uploads');
app.use(express.static(publicDir));

app.use(express.static('public'));
app.use('/upload', express.static(__dirname + '/resources/uploads'));
app.get("/upload", function (req, res, next) {
  res.send(publicDir)
})
//end of route for upload folders



//ignore favicon problem
function ignoreFavicon(req, res, next) {
  if (req.originalUrl == './favicon.ico') {
    res.status(204).json({ nope: true });

  } else if (req.originalUrl == '/map-red.png') {
    res.status(204).json({ nope: true });
  } else if (req.originalUrl == '/Roboto-Bold.woff2') {
    res.status(204).json({ nope: true });
  } else {
    next();
  }
}
app.use(ignoreFavicon);
//----------------------------------------------


// const port =1234;//set port
// curl -X GET http://localhost:1234/user/login -v
app.listen(PORT, () => {
  try {
    console.log(`server running on port:  ${PORT}`)
  } catch (err) {
    console.log(`server not running on port:  ${PORT} `)
  }
});//port listen function



module.exports = app;