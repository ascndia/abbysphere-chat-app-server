const express = require('express');
const cors = require('cors')
const app = express();
const connectDB = require('./config/database')
require('dotenv').config()

app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: [
        'http://localhost:3000'
    ]
  }))
app.use(express.json());
// export routes
const auth_routes = require('./src/routes/authentication');
const user_routes = require('./src/routes/user')
const room_routes = require('./src/routes/room')
const chat_routes = require('./src/routes/chat')
connectDB()


app.use(auth_routes);
app.use(user_routes);
app.use(room_routes)
app.use(chat_routes)

module.exports = app;
// app.listen(process.env.PORT,() => console.log(`Server running on port ${process.env.PORT}`));

