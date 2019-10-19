
app.get('/home', (req, res) => {
    const { user } = res.locals;
    // const user = users.find(user => user.id === req.session.userId)

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
  <a href="/login">Login</a>`);
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
