const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const app = express();
const path = require("path");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI), ({
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB successfully!');
});

app.use('/', userRoutes);

// //static files
// app.use(express.static(path.join(__dirname, "./user-management-system/dist")));

// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "./user-management-system/dist/user-management-system/index.html"));
// });

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
