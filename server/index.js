const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const config = require("./config/key");

const mongoose = require("mongoose");
const connect = mongoose.connect(config.mongoURI,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use(cors())


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(cookieParser());

app.use('/api/users', require('./routes/users'));
app.use('/api/descriptions', require('./routes/descriptions'))

app.listen(port, () => console.log(`Server is on: port ${port}`))