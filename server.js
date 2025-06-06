require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(session({
  secret: 'secret123',
  resave: false,
  saveUninitialized: true
}));

// Routes
const routes = require('./routes/index');
const authRoutes = require('./routes/auth');      
const postRoutes = require('./routes/posts');   
const userRoutes = require('./routes/user');


app.use('/', routes);
app.use('/auth', authRoutes);                     
app.use('/posts', postRoutes);   
app.use('/uploads', express.static('uploads'));
app.use('/api', userRoutes);

                

const db = require('./config/db');

app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});

// Đường dẫn đến các mụcmục
app.get('/Trangchu.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'Trangchu.html'));
});

app.get('/Baiviet.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'Baiviet.html')); 
});

app.get('/Dangky.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'Dangky.html')); 
});

app.get('/Dangnhap.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'Dangnhap.html')); 
});

app.get('/Search.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'Search.html'));
});

app.get('/Taikhoan.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'Taikhoan.html')); 
});

app.get('/Tinnhan.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'Tinnhan.html')); 
});

app.get('/Thongbao.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'Thongbao.html')); 
});

