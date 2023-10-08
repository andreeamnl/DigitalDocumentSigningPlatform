// MongoDB connection via mongoose
const mongoose = require("mongoose");

const server = '127.0.0.1:27017'; 
const database = 'MyDB'; 
class Database {
  constructor() {
    this._connect();
  }
  _connect() {
    mongoose
      .connect(`mongodb://${server}/${database}`)
      .then(() => {
        console.log('Database connection successful');
      })
      .catch((err) => {
        console.error('Database connection failed');
      });
  }
}

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

// const User = mongoose.model('User', userSchema);
// const newUser = new User({
//     name: 'Elena John',
//     email: 'elena.john@example.com',
//     age: 22,
// });

// newUser.save()
// .then(() => {
//   console.log('Save User at MongoDB');
// })
// .catch((error) => {
//   console.error(error);
// });

module.exports = {
    database: new Database(),
    userSchema: userSchema,
    mongoose: mongoose,
}