const express = require('express');
const database = require('../data/database');
const path = require('path');
const multer = require('multer');
const app = express()
const port = 3001
const bcrypt = require('bcrypt'); // for password hashing



// Define the storage configuration for multer
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  // The destination function determines where uploaded files will be stored
	  cb(null, 'uploads/'); // 'uploads/' is the directory where files will be stored
	},
	filename: function (req, file, cb) {
	  // The filename function determines how the uploaded files will be named
	  cb(null, file.originalname); // Use the original filename for the stored file
	},
  });
  
  // Create a multer instance with the defined storage configuration
  const upload = multer({ storage: storage });
  

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../view')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../view', 'index.html'));
});

app.get('/home', (req, res) => {
	res.sendFile(path.join(__dirname, '../view', 'home.html'));
  });

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../view', 'register.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../view', 'login.html'));
});

app.get('/upload', (req, res) => {
	res.sendFile(path.join(__dirname, '../view', 'upload.html'));
  });

app.post('/register', async (req, res) => {
  const userModel = database.mongoose.model('User', database.userSchema);
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({ name, email, password: hashedPassword });

    await newUser.save();

    const registeredUser = await userModel.findOne({ email });

    if (registeredUser) {
      res.redirect('/login');
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
	const { email, password } = req.body; // Ensure password is correctly received
  
	try {
	  const user = await userModel.findOne({ email });
	  if (!user) {
		return res.status(404).send('User not found');
	  }
  
	  const isPasswordValid = await bcrypt.compare(password, user.password); // Verify password comparison
  
	  if (isPasswordValid) {
		
		res.redirect('/home');
	  } else {
		res.status(401).send('Invalid password');
	  }
	} catch (error) {
	  console.error(error);
	  res.status(500).send('Login failed');
	}
  });
  
app.post('/upload', upload.single('document'), async (req, res) => {
  const Document = database.mongoose.model('Document', database.documentSchema);

  // Check if no file was uploaded in the request
  if (!req.file) {
    return res.status(400).send('No file was uploaded.');
  }

  const userModel = database.mongoose.model('User', database.userSchema);
  const user = await userModel.findOne({ /* specify the user later */ });

  if (!user) {
    return res.status(404).send('User not found.');
  }
// Create a new document using the Document model
  const document = new Document({
    filename: req.file.originalname,
    path: req.file.path,
    user: user._id,
  });

  try {
	// Save the document to the database
    await document.save();
    res.status(200).send('Document uploaded successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to upload the document.');
  }
});

app.get('/download/:documentId', async (req, res) => {
	const Document = database.mongoose.model('Document', database.documentSchema);

	try {
	  // try to find the document in the database by its ID
	  const document = await Document.findById(req.params.documentId);

	  // Check if the document was not found
	  if (!document) {
		return res.status(404).send('Document not found');
	  }

	  // Set the appropriate response headers for downloading the file
	  res.setHeader('Content-disposition', 'attachment; filename=' + document.filename);
	  res.setHeader('Content-type', 'application/pdf'); // You may need to set the appropriate content type based on the file type

	  // Send the file as a response
	  res.download(document.path, document.filename, (error) => {
	    if (error) {
	      console.error(error);
	      res.status(500).send('Failed to download the document');
	    } else {
	      console.log('Document downloaded successfully');
	    }
	  });
	} catch (error) {
	  console.error(error);
	  res.status(500).send('Failed to download the document');
	}
});

app.get("/users", async (request, response) => {
	const userModel = database.mongoose.model('User', database.userSchema);
	const users = await userModel.find({});
	try {
		response.send(users);
	} catch (error) {
		response.status(500).send(error);
	}
})

  

app.get("/docs", async (request, response) => {
	const Document = database.mongoose.model('Document',database.documentSchema);
	const docs = await Document.find({});
	try {
		response.send(docs);
	} catch (error) {
		response.status(500).send(error);
	}
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  dbConnection = database.database
});
