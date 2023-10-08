const express = require('express');
const database = require('./database');
const path = require('path'); 
const app = express()
const port = 3000
const bcrypt = require('bcrypt');


app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'view')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'view', 'index.html'));
  });
  
  app.get('/register', (req, res) => {
	res.sendFile(path.join(__dirname, 'view', 'register.html'));
  });

  app.get('/login', (req, res) => {
	res.sendFile(path.join(__dirname, 'view', 'login.html'));
  });

  app.post('/register', async (req, res) => {
	const userModel = database.mongoose.model('User', database.userSchema);
	const { name, email, password } = req.body;
  
	try {
	  // hash password
	  const hashedPassword = await bcrypt.hash(password, 10);

	  const newUser = new userModel({ name, email, password: hashedPassword });
  
	  await newUser.save();
  
	  const registeredUser = await userModel.findOne({ email });
  
	  if (registeredUser) {
		res.redirect('/login')
	  } else {
		res.status(500).send('User registration failed');
	  }
	} catch (error) {
	  console.error(error);
	  res.status(500).send('User registration failed');
	}
  });
  
  app.post('/login', async (req, res) => {
	const userModel = database.mongoose.model('User', database.userSchema);
	const { email, password } = req.body;
  
	try {
	  const user = await userModel.findOne({ email });
	  if (!user) {
		return res.status(404).send('User not found');
	  }
  
	  // Compare the provided password with the stored hashed password
	  const isPasswordValid = await bcrypt.compare(password, user.password);
  
	  if (isPasswordValid) {
		res.redirect('/')
	  } else {
		res.status(401).send('Invalid password');
	  }
	} catch (error) {
	  console.error(error);
	  res.status(500).send('Login failed');
	}
  });
  
  
// app.get('/register', (req, res) => {
// 	res.send('register.ejs')
// })

// app.post("User", async (request, response) => {
// 	const user = new User(request.body);
// 	try {
// 	  await user.save();
// 	  response.send(user);
// 	} catch (error) {
// 	  response.status(500).send(error);
// 	}
// })

  
  
  app.get("/users", async (request, response) => {
	const userModel = database.mongoose.model('User', database.userSchema);
	const users = await userModel.find({});
	try {
		response.send(users);
	} catch (error) {
		response.status(500).send(error);
	}
})

  

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
	dbConnection = database.database
})